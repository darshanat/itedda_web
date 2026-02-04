import React, { useRef, useState } from "react";

const Portfolio = () => {
  const scrollRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    },
    {
      image: "/projects/aprs-tracker.png",
      title: "APRS Tracking Device",
      description:
        "GPS receiver with radio modem for real-time location, speed, and weather data over radio frequencies. Used for tracking vehicles, balloons, and RC aircraft.",
      gallery: ["/projects/aprs-tracker.png"],
    },
  ];

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
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
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
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="portfolio-content">
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <span className="view-details">Click to view details</span>
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
