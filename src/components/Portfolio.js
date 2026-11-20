import React, { useRef, useState } from "react";
import BoardViewer from "./BoardViewer";

const Portfolio = () => {
  const scrollRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("photos");

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

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    // Prefer photos: the 3D tab mounts the viewer, and nobody should pay for
    // that download until they ask for it. Model-only projects have no photos
    // to fall back to, so they open straight into the viewer.
    setActiveTab(project.gallery ? "photos" : "3d");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    setActiveTab("photos");
    document.body.style.overflow = "auto";
  };

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
        <h2 className="section-title fade-in">Recent Projects</h2>
        <div className="portfolio-wrapper">
          <button
            className="scroll-btn scroll-left"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            &#8249;
          </button>
          <div className="portfolio-scroll" ref={scrollRef}>
            {projects.map((project, index) => (
              <div
                key={index}
                className="portfolio-item fade-in"
                onClick={() => openModal(project)}
              >
                <div className="portfolio-image">
                  {project.image ? (
                    <img src={project.image} alt={project.title} />
                  ) : (
                    <div className="portfolio-image-placeholder">
                      <span className="placeholder-icon">◈</span>
                      <span className="placeholder-label">3D Model</span>
                    </div>
                  )}
                </div>
                <div className="portfolio-content">
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <span className="view-details">
                    {project.gallery
                      ? "Click to view details"
                      : "Click to view in 3D"}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button
            className="scroll-btn scroll-right"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            &#8250;
          </button>
        </div>
      </div>

      {/* Modal Popup */}
      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>

            {selectedProject.model && selectedProject.gallery && (
              <div className="modal-tabs">
                <button
                  className={`modal-tab ${activeTab === "photos" ? "active" : ""}`}
                  onClick={() => setActiveTab("photos")}
                >
                  Photos
                </button>
                <button
                  className={`modal-tab ${activeTab === "3d" ? "active" : ""}`}
                  onClick={() => setActiveTab("3d")}
                >
                  3D View
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
                    <button className="gallery-btn gallery-prev" onClick={prevImage}>
                      &#8249;
                    </button>
                  )}
                  <img
                    src={selectedProject.gallery[currentImageIndex]}
                    alt={selectedProject.title}
                    className="modal-image"
                  />
                  {selectedProject.gallery.length > 1 && (
                    <button className="gallery-btn gallery-next" onClick={nextImage}>
                      &#8250;
                    </button>
                  )}
                </div>

                {selectedProject.gallery.length > 1 && (
                  <div className="gallery-dots">
                    {selectedProject.gallery.map((_, index) => (
                      <span
                        key={index}
                        className={`dot ${index === currentImageIndex ? "active" : ""}`}
                        onClick={() => setCurrentImageIndex(index)}
                      ></span>
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
        </div>
      )}
    </section>
  );
};

export default Portfolio;
