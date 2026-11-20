import React from 'react';
import Icon from './Icon';

const Footer = () => (
  <footer className="site-footer">
    <div className="container footer-grid">
      <div className="footer-brand">
        <a href="#home" className="logo">
          <img src="/iTEDDA.png" alt="" className="logo-mark" />
          <span className="logo-word"><span className="logo-i">i</span>TEDDA</span>
        </a>
        <p>
          Electronic product design, software development and digital marketing,
          built in Sri Lanka.
        </p>
      </div>

      <nav className="footer-links" aria-label="Footer">
        <a href="#services">Services</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#gallery">Gallery</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>

      <a href="#home" className="to-top" aria-label="Back to top">
        <Icon name="up" size={20} />
      </a>
    </div>
    <div className="container footer-base">
      <p>&copy; {new Date().getFullYear()} iTEDDA (Pvt)Ltd. All rights reserved.</p>
      <p className="mono">Engineered with precision.</p>
    </div>
  </footer>
);

export default Footer;
