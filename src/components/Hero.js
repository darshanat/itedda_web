import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div style={{ marginBottom: '2rem' }}>
          <img 
            src="/iTEDDA.png" 
            alt="iTEDDA Logo" 
            style={{ 
              height: '150px', 
              width: 'auto', 
              maxWidth: '100%',
              filter: 'drop-shadow(0 0 20px rgba(6, 30, 18, 0.5))'
            }} 
          />
        </div>
        <p>Expert PCB Designer</p>
        <p>
          Transforming circuit concepts into manufacturable reality with
          precision and innovation
        </p>
        <a href="#contact" className="cta-button">Start Your Project</a>
      </div>
    </section>
  );
};

export default Hero;
