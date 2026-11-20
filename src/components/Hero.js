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
              filter: 'drop-shadow(0 0 20px rgba(34, 177, 76, 0.35))'
            }} 
          />
        </div>
        <p className="hero-tagline">
          Turning Ideas<br />Into Technology<br />Solutions
        </p>
        <h1>
          Technology Solutions<br />
          For <span className="g">Business</span>{' '}
          <span className="r">Growth</span>
        </h1>
        <p>
          We are a technology company based in Sri Lanka, specializing in
          electronic product development, software development and digital
          marketing. We help businesses turn innovative ideas into scalable,
          reliable and result-driven technology solutions.
        </p>
        <a href="#contact" className="cta-button">Start Your Project</a>
      </div>
    </section>
  );
};

export default Hero;
