import React from 'react';

const Header = () => {
  return (
    <header>
      <nav>
        <a href="#" className="logo">
            <img 
              src="/iTEDDA.png" 
              alt="iTEDDA Logo" 
              style={{ 
                height: '50px', 
                width: 'auto', 
                marginRight: '8px',
                verticalAlign: 'middle'
              }} 
            />
            <span style={{ color: "#FF3B30", fontFamily: "Calibri, sans-serif" }}>i</span><span style={{ color: "#fff", fontFamily: "Calibri, sans-serif" }}>TEDDA</span>
        </a>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
