import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import Services from './components/Services';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import Gallery from './components/Gallery';
import About from './components/About';
import Values from './components/Values';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useInteractions, useReveal } from './hooks/useInteractions';

function App() {
  useInteractions();
  useReveal();

  return (
    <div className="App">
      <div className="ambient" aria-hidden="true">
        <div className="ambient-grid" />
        <div className="ambient-glow" />
      </div>
      <div className="cursor-glow" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <TechMarquee />
        <Services />
        <Process />
        <Portfolio />
        <Gallery />
        <About />
        <Values />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
