import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import BoardViewer from "./BoardViewer";
import Icon from "./Icon";
import SectionHead from "./SectionHead";
import { useModal } from "../hooks/useInteractions";

const Portfolio = () => {
  const scrollRef = useRef(null);
  const drag = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("photos");
  const [progress, setProgress] = useState(0);
  const [canScroll, setCanScroll] = useState({ left: false, right: true });

  const projects = [
    {
      image: "/projects/health-monitor.png",
      title: "Health Monitoring System",
      description:
        "A tiny wearable device for testing body temperature, ECG and SpO2. Includes remote monitoring and two-way communication with doctor & patient.",
      gallery: [
        "/projects/health-monitor.png",
        "/projects/health-monitor-2.png",
        "/projects/health-monitor-3.png",
      ],
      model: "/models/health-monitor-enclosure.glb",
    },
    {
      image: "/projects/agriculture-monitor.png",
      title: "Agriculture Monitoring System",
      description:
        "ESP32 based system that monitors soil moisture, water quality, temperature & humidity, and light intensity wirelessly. Low-power consuming design.",
      gallery: [
        "/projects/agriculture-monitor.png",
        "/projects/agriculture-monitor-2.png",
        "/projects/agriculture-monitor-3.png",
      ],
      model: "/models/esp32-smart-agri-tx.glb",
    },
    {
      image: "/projects/greenhouse-automation.png",
      title: "Greenhouse Automation System",
      description:
        "Automated greenhouse control with soil moisture, pH, light intensity, temperature sensors. Automates watering, lighting, and temperature control.",
      gallery: [
        "/projects/greenhouse-automation.png",
        "/projects/greenhouse-automation-2.png",
        "/projects/greenhouse-automation-3.png",
      ],
      model: "/models/greenhouse-temperature-and-humidity-controller.glb",
    },
    {
      image: "/projects/aprs-tracker.png",
      title: "APRS Tracking Device",
      description:
        "GPS receiver with radio modem for real-time location, speed, and weather data over radio frequencies. Used for tracking vehicles, balloons, and RC aircraft.",
      gallery: ["/projects/aprs-tracker.png"],
    },
    {
      title: "E-Bike Controller",
      description:
        "A compact and reliable electronic controller designed for electric bicycles. It manages motor power, acceleration, and key electrical functions while providing efficient and stable operation. The custom-designed enclosure protects the electronics and makes the controller suitable for practical e-bike applications.",
      model: "/models/e-bike-controller.glb",
    },
    {
      title: "LoRa GPS Tracker",
      description:
        "A compact GPS tracking device combining GPS positioning with LoRa wireless communication for long-range, low-power location tracking. Ideal for vehicles, assets, agriculture, and remote monitoring applications.",
      model: "/models/lora-gps-tracker.glb",
    },
    {
      title: "ESP8266 Home Automation",
      description:
        "A compact IoT-based home automation controller built around the ESP8266 platform. It enables wireless control and monitoring of household electrical devices, providing a practical and cost-effective solution for smart home applications.",
      model: "/models/esp8266-home-automation.glb",
    },
    {
      title: "Crop Monitoring System",
      description:
        "An IoT-based agricultural monitoring solution designed to track important crop and environmental conditions. The system enables real-time monitoring of field parameters, helping farmers make better decisions and improve crop management.",
      model: "/models/crop-monitoring-system.glb",
    },
    {
      title: "DIN Rail Enclosure",
      description:
        "A professionally designed DIN-rail-mount enclosure developed for industrial electronic control and automation systems. Its compact and practical design provides secure protection for PCBs while allowing easy installation inside electrical control panels.",
      model: "/models/din-rail-enclosure-full.glb",
    },
  ];

  // One converted model is still unassigned: wireless-charger.glb. Add an entry
  // above with `model: "/models/wireless-charger.glb"` to surface it.

  const updateProgress = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setCanScroll({ left: el.scrollLeft > 4, right: el.scrollLeft < max - 4 });
  }, []);

  useEffect(() => {
    updateProgress();
    window.addEventListener("resize", updateProgress);
    return () => window.removeEventListener("resize", updateProgress);
  }, [updateProgress]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector(".portfolio-item");
    const amount = (card ? card.offsetWidth : 340) + 24;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  // Click-and-drag to scroll on desktop; touch devices already scroll natively.
  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse") return;
    const el = scrollRef.current;
    drag.current = { x: e.clientX, left: el.scrollLeft, moved: false };
    el.classList.add("is-dragging");
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 5) d.moved = true;
    scrollRef.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    if (!drag.current) return;
    scrollRef.current.classList.remove("is-dragging");
    // Keep `moved` readable for the click that follows this pointerup.
    setTimeout(() => (drag.current = null), 0);
  };

  const openModal = (project) => {
    if (drag.current && drag.current.moved) return;
    setSelectedProject(project);
    setCurrentImageIndex(0);
    // Prefer photos: the 3D tab mounts the viewer, and nobody should pay for
    // that download until they ask for it. Model-only projects have no photos
    // to fall back to, so they open straight into the viewer.
    setActiveTab(project.gallery ? "photos" : "3d");
  };

  const closeModal = useCallback(() => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    setActiveTab("photos");
  }, []);
  useModal(Boolean(selectedProject), closeModal);

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.gallery.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
      );
    }
  };

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <SectionHead
          index="03"
          label="Portfolio"
          title={<>Recent <span className="grad-text">projects</span></>}
        >
          Real boards, real enclosures. Open any project to explore photos or spin
          the 3D model.
        </SectionHead>
      </div>

      <div className="portfolio-wrapper">
        <div
          className="portfolio-scroll"
          ref={scrollRef}
          onScroll={updateProgress}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
        >
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="portfolio-item"
              data-spot
              tabIndex={0}
              role="button"
              aria-label={`Open ${project.title}`}
              onClick={() => openModal(project)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), openModal(project))}
            >
              <div className="portfolio-image">
                {project.image ? (
                  <img src={project.image} alt={project.title} loading="lazy" draggable="false" />
                ) : (
                  <div className="portfolio-image-placeholder">
                    <Icon name="cube" size={46} />
                    <span className="placeholder-label">3D Model</span>
                  </div>
                )}
                <span className="portfolio-index">{String(index + 1).padStart(2, "0")}</span>
                <div className="portfolio-tags">
                  {project.gallery && <span><Icon name="image" size={13} /> Photos</span>}
                  {project.model && <span className="is-3d"><Icon name="rotate3d" size={13} /> 3D</span>}
                </div>
              </div>
              <div className="portfolio-content">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <span className="view-details">
                  {project.gallery ? "View project" : "View in 3D"}
                  <Icon name="arrowUpRight" size={15} />
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="container portfolio-controls">
          <div className="progress-rail" aria-hidden="true">
            <i style={{ transform: `scaleX(${0.12 + progress * 0.88})` }} />
          </div>
          <div className="carousel-btns">
            <button
              className="icon-btn"
              onClick={() => scroll("left")}
              disabled={!canScroll.left}
              aria-label="Previous projects"
            >
              <Icon name="left" size={20} />
            </button>
            <button
              className="icon-btn"
              onClick={() => scroll("right")}
              disabled={!canScroll.right}
              aria-label="Next projects"
            >
              <Icon name="right" size={20} />
            </button>
          </div>
        </div>
      </div>

      {selectedProject &&
        createPortal(
          <div className="modal-overlay" onClick={closeModal} role="dialog" aria-modal="true" aria-label={selectedProject.title}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal} aria-label="Close">
                <Icon name="close" size={18} />
              </button>

              {selectedProject.model && selectedProject.gallery && (
                <div className="modal-tabs">
                  <button
                    className={`modal-tab ${activeTab === "photos" ? "active" : ""}`}
                    onClick={() => setActiveTab("photos")}
                  >
                    <Icon name="image" size={16} /> Photos
                  </button>
                  <button
                    className={`modal-tab ${activeTab === "3d" ? "active" : ""}`}
                    onClick={() => setActiveTab("3d")}
                  >
                    <Icon name="rotate3d" size={16} /> 3D View
                  </button>
                </div>
              )}

              {(activeTab === "3d" || !selectedProject.gallery) &&
              selectedProject.model ? (
                <BoardViewer
                  src={selectedProject.model}
                  title={selectedProject.title}
                />
              ) : (
                <>
                  <div className="modal-gallery">
                    {selectedProject.gallery.length > 1 && (
                      <button className="gallery-btn gallery-prev" onClick={prevImage} aria-label="Previous image">
                        <Icon name="left" size={20} />
                      </button>
                    )}
                    <img
                      key={currentImageIndex}
                      src={selectedProject.gallery[currentImageIndex]}
                      alt={selectedProject.title}
                      className="modal-image"
                    />
                    {selectedProject.gallery.length > 1 && (
                      <button className="gallery-btn gallery-next" onClick={nextImage} aria-label="Next image">
                        <Icon name="right" size={20} />
                      </button>
                    )}
                  </div>

                  {selectedProject.gallery.length > 1 && (
                    <div className="gallery-dots">
                      {selectedProject.gallery.map((_, index) => (
                        <button
                          key={index}
                          aria-label={`Image ${index + 1}`}
                          className={`dot ${index === currentImageIndex ? "active" : ""}`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}

              <div className="modal-info">
                <h3>{selectedProject.title}</h3>
                <p>{selectedProject.description}</p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};

export default Portfolio;
