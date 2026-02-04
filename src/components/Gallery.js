import React, { useState, useRef } from "react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const scrollRef = useRef(null);

  const images = [
    "/gallery/design-1.jpg",
    "/gallery/design-2.jpg",
    "/gallery/design-3.jpg",
    "/gallery/design-4.jpg",
    "/gallery/design-5.jpg",
    "/gallery/design-6.jpg",
    "/gallery/design-7.jpg",
    "/gallery/design-8.jpg",
    "/gallery/design-9.jpg",
    "/gallery/design-10.jpg",
    "/gallery/design-11.jpg",
    "/gallery/design-12.jpg",
    "/gallery/design-13.jpg",
    "/gallery/design-14.jpg",
    "/gallery/design-15.jpg",
    "/gallery/design-16.jpg",
    "/gallery/design-17.jpg",
    "/gallery/design-18.jpg",
    "/gallery/design-19.jpg",
  ];

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const navigateImage = (direction) => {
    const currentIndex = images.indexOf(selectedImage);
    let newIndex;
    if (direction === "next") {
      newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    }
    setSelectedImage(images[newIndex]);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <h2 className="section-title fade-in">Design Gallery</h2>
        <p className="gallery-subtitle fade-in">
          Explore our collection of PCB designs and electronic projects
        </p>

        <div className="gallery-wrapper">
          <button
            className="gallery-scroll-btn gallery-scroll-left"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            &#8249;
          </button>
          <div className="gallery-scroll" ref={scrollRef}>
            {images.map((image, index) => (
              <div
                key={index}
                className="gallery-item fade-in"
                onClick={() => openLightbox(image)}
              >
                <img src={image} alt={`PCB Design ${index + 1}`} />
                <div className="gallery-overlay">
                  <span>View</span>
                </div>
              </div>
            ))}
          </div>
          <button
            className="gallery-scroll-btn gallery-scroll-right"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            &#8250;
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            &times;
          </button>
          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage("prev");
            }}
          >
            &#8249;
          </button>
          <img
            src={selectedImage}
            alt="PCB Design"
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage("next");
            }}
          >
            &#8250;
          </button>
          <div className="lightbox-counter">
            {images.indexOf(selectedImage) + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
