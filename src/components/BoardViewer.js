import React, { useEffect, useRef, useState } from "react";

/**
 * Interactive 3D view of a PCB, loaded from a Draco-compressed .glb in
 * public/models/ (produced by scripts/wrl-to-glb.mjs from the KiCad .wrl
 * exports).
 *
 * three.js is pulled in with a dynamic import so it stays out of the main
 * bundle - the site should not pay ~600 KB for a viewer most visitors never
 * open.
 */
const BoardViewer = ({ src, title }) => {
  const mountRef = useRef(null);
  const [status, setStatus] = useState("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!src) return undefined;

    const mount = mountRef.current;
    let disposed = false;

    // Everything the cleanup needs to tear down, filled in as setup proceeds.
    const teardown = {
      frame: null,
      renderer: null,
      controls: null,
      resizeObserver: null,
      scene: null,
      dracoLoader: null,
    };

    setStatus("loading");
    setProgress(0);

    (async () => {
      const [THREE, { GLTFLoader }, { DRACOLoader }, { OrbitControls }, { RoomEnvironment }] =
        await Promise.all([
          import("three"),
          import("three/examples/jsm/loaders/GLTFLoader.js"),
          import("three/examples/jsm/loaders/DRACOLoader.js"),
          import("three/examples/jsm/controls/OrbitControls.js"),
          import("three/examples/jsm/environments/RoomEnvironment.js"),
        ]);

      // The user may have closed the modal while three.js was downloading.
      if (disposed || !mountRef.current) return;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0a0a0a);
      teardown.scene = scene;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      mount.appendChild(renderer.domElement);
      teardown.renderer = renderer;

      // Metal pins and pads need something to reflect or they read as flat
      // grey. A generated room is cheaper than shipping an HDR file.
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      pmrem.dispose();

      // Key light picks out the silkscreen; the fill keeps the shadowed side
      // of tall components from going solid black.
      const key = new THREE.DirectionalLight(0xffffff, 2.2);
      key.position.set(4, 8, 6);
      scene.add(key);

      const fill = new THREE.DirectionalLight(0xffffff, 0.7);
      fill.position.set(-5, -2, -4);
      scene.add(fill);

      scene.add(new THREE.AmbientLight(0xffffff, 0.35));

      const camera = new THREE.PerspectiveCamera(
        45,
        mount.clientWidth / mount.clientHeight,
        0.1,
        5000
      );

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.rotateSpeed = 0.6;
      controls.panSpeed = 0.6;
      teardown.controls = controls;

      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(`${process.env.PUBLIC_URL}/draco/`);
      teardown.dracoLoader = dracoLoader;

      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);

      loader.load(
        src,
        (gltf) => {
          if (disposed) return;

          const board = gltf.scene;

          // The .wrl files carry KiCad's own units and origin, which differ
          // per board. Recentre on the bounding box and frame the camera from
          // its size so every board arrives looking the same.
          const box = new THREE.Box3().setFromObject(board);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());
          board.position.sub(center);
          scene.add(board);

          const maxDimension = Math.max(size.x, size.y, size.z) || 1;
          const distance =
            (maxDimension / 2 / Math.tan((camera.fov * Math.PI) / 360)) * 1.6;

          // Slightly above and off-axis, the angle a board is usually shown at.
          camera.position.set(distance * 0.5, distance * 0.6, distance * 0.75);
          camera.near = distance / 100;
          camera.far = distance * 100;
          camera.updateProjectionMatrix();

          controls.target.set(0, 0, 0);
          controls.minDistance = maxDimension * 0.25;
          controls.maxDistance = distance * 4;
          controls.update();

          setStatus("ready");
        },
        (event) => {
          // Only fires with a Content-Length; skip the bar when chunked.
          if (event.lengthComputable) {
            setProgress(Math.round((event.loaded / event.total) * 100));
          }
        },
        () => {
          if (!disposed) setStatus("error");
        }
      );

      const resize = () => {
        if (!mountRef.current) return;
        const { clientWidth, clientHeight } = mountRef.current;
        if (clientWidth === 0 || clientHeight === 0) return;
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(clientWidth, clientHeight);
      };

      teardown.resizeObserver = new ResizeObserver(resize);
      teardown.resizeObserver.observe(mount);

      const animate = () => {
        teardown.frame = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();
    })().catch(() => {
      if (!disposed) setStatus("error");
    });

    return () => {
      disposed = true;

      if (teardown.frame !== null) cancelAnimationFrame(teardown.frame);
      if (teardown.resizeObserver) teardown.resizeObserver.disconnect();
      if (teardown.controls) teardown.controls.dispose();
      if (teardown.dracoLoader) teardown.dracoLoader.dispose();

      // Board geometry runs to hundreds of thousands of triangles; leaving it
      // on the GPU across a few modal opens is a real leak.
      if (teardown.scene) {
        teardown.scene.traverse((child) => {
          if (!child.isMesh) return;
          child.geometry?.dispose();
          const materials = Array.isArray(child.material)
            ? child.material
            : [child.material];
          materials.forEach((material) => material?.dispose());
        });
        teardown.scene.environment?.dispose();
      }

      if (teardown.renderer) {
        teardown.renderer.dispose();
        teardown.renderer.domElement.remove();
      }
    };
  }, [src]);

  return (
    <div className="board-viewer">
      <div className="board-viewer-canvas" ref={mountRef} />

      {status === "loading" && (
        <div className="board-viewer-overlay">
          <div className="board-viewer-spinner" />
          <p>Loading 3D board{progress > 0 ? ` — ${progress}%` : "…"}</p>
        </div>
      )}

      {status === "error" && (
        <div className="board-viewer-overlay">
          <p>Could not load the 3D model for {title}.</p>
        </div>
      )}

      {status === "ready" && (
        <div className="board-viewer-hint">
          Drag to rotate · Scroll to zoom · Right-drag to pan
        </div>
      )}
    </div>
  );
};

export default BoardViewer;
