import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "./Icon";
import SectionHead from "./SectionHead";
import { useModal } from "../hooks/useInteractions";

const images = Array.from({ length: 19 }, (_, i) => `/gallery/design-${i + 1}.jpg`);
const rows = [images.slice(0, 10), images.slice(10)];

const Gallery = () => {
  const [selected, setSelected] = useState(null); // index into images

  const close = useCallback(() => setSelected(null), []);
  useModal(selected !== null, close);

  const step = useCallback(
    (dir) =>
      setSelected((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    []
  );

  useEffect(() => {
    if (selected === null) return undefined;
    const onKey = (e) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selected, step]);

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <SectionHead
          index="04"
          label="Gallery"
          title={<>Design <span className="grad-text">gallery</span></>}
        >
          Explore our collection of PCB designs and electronic projects.
        </SectionHead>
      </div>

      <div className="gallery-rows">
        {rows.map((row, r) => (
          <div key={r} className={`gallery-row ${r === 1 ? "reverse" : ""}`}>
            <div className="gallery-track">
              {[0, 1].map((copy) => (
                <div className="gallery-set" key={copy} aria-hidden={copy === 1}>
                  {row.map((src) => (
                    <button
                      type="button"
                      key={src}
                      className="gallery-item"
                      tabIndex={copy === 1 ? -1 : 0}
                      aria-label="Open design image"
                      onClick={() => setSelected(images.indexOf(src))}
                    >
                      <img src={src} alt="" loading="lazy" draggable="false" />
                      <span className="gallery-overlay">
                        <Icon name="expand" size={22} />
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selected !== null &&
        createPortal(
          <div className="lightbox" onClick={close} role="dialog" aria-modal="true" aria-label="Design gallery">
            <button className="lightbox-close icon-btn" onClick={close} aria-label="Close">
              <Icon name="close" size={20} />
            </button>
            <button
              className="lightbox-nav lightbox-prev icon-btn"
              onClick={(e) => { e.stopPropagation(); step(-1); }}
              aria-label="Previous image"
            >
              <Icon name="left" size={22} />
            </button>
            <img
              key={selected}
              src={images[selected]}
              alt={`PCB design ${selected + 1}`}
              className="lightbox-image"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="lightbox-nav lightbox-next icon-btn"
              onClick={(e) => { e.stopPropagation(); step(1); }}
              aria-label="Next image"
            >
              <Icon name="right" size={22} />
            </button>
            <div className="lightbox-counter">
              {String(selected + 1).padStart(2, "0")} / {images.length}
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};

export default Gallery;
