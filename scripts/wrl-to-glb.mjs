/**
 * Converts the KiCad VRML (.wrl) board exports in assets/pcb_wrl/ into
 * compressed .glb files under public/models/, which is what the site ships.
 *
 * VRML is plain text and these boards run 4-24 MB each; parsing that in the
 * browser is slow. Converting offline moves the cost to build time.
 *
 *   node scripts/wrl-to-glb.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

import * as THREE from "three";
import { VRMLLoader } from "three/examples/jsm/loaders/VRMLLoader.js";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import {
  mergeGeometries,
  mergeVertices,
} from "three/examples/jsm/utils/BufferGeometryUtils.js";
import gltfPipeline from "gltf-pipeline";

// GLTFExporter assembles the GLB through Blob + FileReader. Node has Blob but
// not FileReader, so stand one up over Blob.arrayBuffer(). It has to resolve
// asynchronously: the exporter assigns onloadend *after* calling read.
if (typeof globalThis.FileReader === "undefined") {
  globalThis.FileReader = class {
    readAsArrayBuffer(blob) {
      blob.arrayBuffer().then((buffer) => {
        this.result = buffer;
        this.onloadend?.();
      });
    }

    readAsDataURL(blob) {
      blob.arrayBuffer().then((buffer) => {
        this.result = `data:${blob.type};base64,${Buffer.from(buffer).toString("base64")}`;
        this.onloadend?.();
      });
    }
  };
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = path.join(ROOT, "assets", "pcb_wrl");
const OUT_DIR = path.join(ROOT, "public", "models");

// Filenames have spaces and mixed case; the site references the slug instead.
const slugify = (name) =>
  name
    .replace(/\.wrl$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(1) + " MB";

/**
 * VRMLLoader emits MeshPhongMaterial, which GLTFExporter can only approximate.
 * Converting to MeshStandardMaterial up front keeps control over how the boards
 * read: solder mask and silkscreen are matte, exposed copper and pins are not.
 */
function toStandardMaterial(material) {
  const std = new THREE.MeshStandardMaterial({
    color: material.color ? material.color.clone() : new THREE.Color(0xcccccc),
    emissive: material.emissive
      ? material.emissive.clone()
      : new THREE.Color(0x000000),
    opacity: material.opacity,
    transparent: material.transparent,
    side: material.side,
  });

  // Phong shininess is the only hint VRML gives us about how glossy a surface
  // is. High shininess on a KiCad export means metal: pins, pads, connectors.
  const shininess = material.shininess ?? 30;
  std.roughness = THREE.MathUtils.clamp(1 - shininess / 120, 0.25, 0.95);
  std.metalness = shininess > 60 ? 0.85 : 0.1;

  return std;
}

/**
 * A KiCad board arrives as one mesh per pad, pin and body - up to ~15,000 of
 * them. Each becomes its own glTF node, mesh and set of accessors, and that
 * bookkeeping dwarfs the actual geometry. Collapsing the tree down to one mesh
 * per distinct material is where most of the size win comes from.
 */
function flatten(root) {
  const stats = { sourceMeshes: 0, triangles: 0 };
  const byMaterial = new Map();

  root.updateMatrixWorld(true);

  root.traverse((child) => {
    if (!child.isMesh || !child.geometry) return;
    stats.sourceMeshes++;

    const source = Array.isArray(child.material) ? child.material[0] : child.material;
    if (!source) return;

    // Boards reuse a handful of colors across thousands of meshes.
    const key = [
      source.color?.getHexString(),
      source.shininess,
      source.opacity,
      source.transparent,
    ].join("|");

    if (!byMaterial.has(key)) {
      byMaterial.set(key, { material: toStandardMaterial(source), geometries: [] });
    }

    const geometry = child.geometry.clone();
    // Strip everything the viewer does not read, so the merge below sees a
    // uniform attribute set - mergeGeometries refuses mismatched inputs.
    for (const name of Object.keys(geometry.attributes)) {
      if (name !== "position" && name !== "normal") geometry.deleteAttribute(name);
    }
    if (!geometry.attributes.normal) geometry.computeVertexNormals();

    // Merging discards the node tree, so bake each mesh's transform in first.
    geometry.applyMatrix4(child.matrixWorld);
    byMaterial.get(key).geometries.push(geometry);
  });

  const scene = new THREE.Scene();

  for (const { material, geometries } of byMaterial.values()) {
    let merged = mergeGeometries(geometries, false);
    if (!merged) continue;
    for (const geometry of geometries) geometry.dispose();

    // KiCad emits every triangle with its own three vertices. Welding them
    // roughly halves the vertex count before Draco ever sees the data.
    // mergeVertices keys on the normal too, so vertices on a hard edge stay
    // split and the board keeps its flat shading - do not recompute normals
    // afterwards, that would average across those edges and round them off.
    merged = mergeVertices(merged);

    const position = merged.attributes.position;
    stats.triangles += (merged.index ? merged.index.count : position.count) / 3;

    scene.add(new THREE.Mesh(merged, material));
  }

  stats.materials = byMaterial.size;
  return { scene, stats };
}

function exportGLB(scene) {
  return new Promise((resolve, reject) => {
    new GLTFExporter().parse(
      scene,
      (result) => resolve(Buffer.from(result)),
      (error) => reject(error),
      { binary: true, onlyVisible: false }
    );
  });
}

/**
 * Draco quantizes and entropy-codes the vertex data. Boards are viewed at
 * arm's length in a modal, so 12 bits of position precision is well past
 * anything the viewer can resolve.
 */
async function compress(glb) {
  const { glb: compressed } = await gltfPipeline.processGlb(glb, {
    dracoOptions: {
      compressionLevel: 10,
      quantizePositionBits: 12,
      quantizeNormalBits: 8,
    },
  });
  return Buffer.from(compressed);
}

/**
 * VRML97 permits a .wrl to be gzipped in place, and KiCad writes that when the
 * "compress" option is on - so a .wrl is either UTF-8 text or a gzip stream.
 * Sniff the magic rather than trusting the extension.
 */
async function readVRML(srcPath) {
  const raw = await fs.readFile(srcPath);
  const gzipped = raw.length > 2 && raw[0] === 0x1f && raw[1] === 0x8b;
  return {
    text: (gzipped ? zlib.gunzipSync(raw) : raw).toString("utf8"),
    srcBytes: raw.length,
    gzipped,
  };
}

async function convert(file) {
  const srcPath = path.join(SRC_DIR, file);
  const { text: source, srcBytes, gzipped } = await readVRML(srcPath);

  const parsed = new VRMLLoader().parse(source, "");
  const before = new THREE.Box3().setFromObject(parsed);
  const { scene, stats } = flatten(parsed);
  const after = new THREE.Box3().setFromObject(scene);

  // Baking transforms during the merge is the step most likely to go wrong,
  // and a misplaced component shows up as a board that changed size. Compare
  // the extents before and after; anything past half a millimetre is a bug.
  const drift = Math.max(
    before.min.distanceTo(after.min),
    before.max.distanceTo(after.max)
  );
  if (drift > 0.5) {
    throw new Error(
      `bounding box drifted ${drift.toFixed(3)} units during merge ` +
        `(${before.getSize(new THREE.Vector3()).toArray().map((n) => n.toFixed(1))} -> ` +
        `${after.getSize(new THREE.Vector3()).toArray().map((n) => n.toFixed(1))})`
    );
  }

  const glb = await compress(await exportGLB(scene));
  const outName = slugify(file) + ".glb";
  await fs.writeFile(path.join(OUT_DIR, outName), glb);

  console.log(
    `  ${file}${gzipped ? " (gzipped)" : ""}\n` +
      `    -> ${outName}  ${mb(srcBytes)} -> ${mb(glb.length)}  ` +
      `(${stats.sourceMeshes.toLocaleString()} meshes merged into ${stats.materials}, ` +
      `${Math.round(stats.triangles).toLocaleString()} tris)`
  );

  return { file, outName, srcBytes, outBytes: glb.length };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const files = (await fs.readdir(SRC_DIR)).filter((f) => /\.wrl$/i.test(f));
  if (files.length === 0) {
    console.error(`No .wrl files found in ${SRC_DIR}`);
    process.exit(1);
  }

  console.log(`Converting ${files.length} board(s):\n`);

  const results = [];
  for (const file of files) {
    try {
      results.push(await convert(file));
    } catch (error) {
      console.error(`  ${file}\n    FAILED: ${error.message}`);
    }
  }

  const totalIn = results.reduce((sum, r) => sum + r.srcBytes, 0);
  const totalOut = results.reduce((sum, r) => sum + r.outBytes, 0);
  console.log(
    `\n${results.length}/${files.length} converted. ` +
      `${mb(totalIn)} -> ${mb(totalOut)} into public/models/`
  );

  if (results.length < files.length) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
