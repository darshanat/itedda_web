import React from "react";
import Icon from "./Icon";

const Contact = () => {
  // Contact information - Update these with your actual details
  const contactInfo = {
    phone: "+94 71 283 8291",
    email: "info@itedda.lk",
    whatsapp: "+94 71 283 8291",
    facebook: "https://www.facebook.com/share/17xNWX5n7T/",
    address: "TMIC Thennakoon, Mawathagama, Sri Lanka",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.123!2d80.4667!3d7.4083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3398b4a9d1e8d%3A0x1234567890abcdef!2sMawathagama!5e0!3m2!1sen!2slk!4v1700000000000",
    mapLink: "https://maps.app.goo.gl/4bANHN95pCAwqse8A",
  };

  const cards = [
    { icon: "phone", title: "Phone", text: contactInfo.phone, href: `tel:${contactInfo.phone}` },
    { icon: "mail", title: "Email", text: contactInfo.email, href: `mailto:${contactInfo.email}` },
    {
      icon: "chat",
      title: "WhatsApp",
      text: contactInfo.whatsapp,
      href: `https://wa.me/${contactInfo.whatsapp.replace(/[\s+]+/g, "")}`,
      external: true,
      cls: "whatsapp",
    },
    { icon: "globe", title: "Website", text: "www.itedda.lk", href: "https://www.itedda.lk", external: true },
    { icon: "facebook", title: "Facebook", text: "iTEDDA", href: contactInfo.facebook, external: true, cls: "facebook" },
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-hero fade-in" data-spot>
          <span className="eyebrow">
            <i className="eyebrow-dot" />
            <span className="eyebrow-index">07</span>
            <span className="eyebrow-label">Contact</span>
          </span>
          <h2 className="contact-title">
            Let's build something <span className="grad-text">remarkable</span> together.
          </h2>
          <p>
            Whether you need a smart electronic device, a powerful software
            application, or a result-driven digital marketing strategy, we are
            here to help.
          </p>
          <div className="contact-actions">
            <a href={`mailto:${contactInfo.email}`} className="btn btn-primary btn-lg" data-magnet>
              Email Us <Icon name="arrow" size={18} />
            </a>
            <a
              href={cards[2].href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-lg"
              data-magnet
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="contact-info-grid">
          {cards.map((c, i) => (
            <a
              key={c.title}
              href={c.href}
              className={`contact-info-card fade-in ${c.cls || ""} tone-${i % 2 ? "r" : "g"}`}
              style={{ "--d": `${i * 70}ms` }}
              data-spot
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className="contact-icon"><Icon name={c.icon} size={22} /></span>
              <h4>{c.title}</h4>
              <p>{c.text}</p>
            </a>
          ))}
        </div>

        <div className="location-section fade-in">
          <div className="map-container">
            <iframe
              src={contactInfo.mapEmbedUrl}
              width="100%"
              height="320"
              style={{ border: 0 }}
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
            <span className="contact-icon"><Icon name="pin" size={20} /></span>
            <p>{contactInfo.address}</p>
            <Icon name="arrowUpRight" size={18} className="address-arrow" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
