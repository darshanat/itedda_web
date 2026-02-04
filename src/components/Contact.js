import React from "react";

const Contact = () => {
  // Contact information - Update these with your actual details
  const contactInfo = {
    phone: "+94 71 283 8291",
    email: "itedda.ict@gmail.com",
    whatsapp: "+94 71 283 8291",
    facebook: "https://www.facebook.com/share/17xNWX5n7T/",
    address: "TMIC Thennakoon, Mawathagama, Sri Lanka",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.123!2d80.4667!3d7.4083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3398b4a9d1e8d%3A0x1234567890abcdef!2sMawathagama!5e0!3m2!1sen!2slk!4v1700000000000",
    mapLink: "https://maps.app.goo.gl/4bANHN95pCAwqse8A",
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-content fade-in">
          <h2 className="section-title">Let's Work Together</h2>
          <p>
            Ready to bring your electronic project to life? Get in touch and
            let's discuss how I can help make your vision a reality.
          </p>

          {/* Contact Info Cards */}
          <div className="contact-info-grid">
            <a href={`tel:${contactInfo.phone}`} className="contact-info-card">
              <div className="contact-icon">📞</div>
              <h4>Phone</h4>
              <p>{contactInfo.phone}</p>
            </a>

            <a
              href={`mailto:${contactInfo.email}`}
              className="contact-info-card"
            >
              <div className="contact-icon">✉️</div>
              <h4>Email</h4>
              <p>{contactInfo.email}</p>
            </a>

            <a
              href={`https://wa.me/${contactInfo.whatsapp.replace(/\s+/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-card whatsapp"
            >
              <div className="contact-icon">💬</div>
              <h4>WhatsApp</h4>
              <p>{contactInfo.whatsapp}</p>
            </a>

            <a
              href={contactInfo.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-card facebook"
            >
              <div className="contact-icon">📘</div>
              <h4>Facebook</h4>
              <p>iTEDDA</p>
            </a>
          </div>

          {/* Location Section */}
          <div className="location-section">
            <div className="map-container">
              <iframe
                src={contactInfo.mapEmbedUrl}
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "15px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              ></iframe>
            </div>
            <a
              href={contactInfo.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="address-card"
            >
              <p>{contactInfo.address}</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
