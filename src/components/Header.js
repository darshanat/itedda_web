import React, { useEffect, useState } from 'react';
import Icon from './Icon';

const links = [
  ['home', 'Home'],
  ['services', 'Services'],
  ['portfolio', 'Portfolio'],
  ['gallery', 'Gallery'],
  ['about', 'About'],
  ['contact', 'Contact'],
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: highlight the section currently crossing the viewport middle.
  useEffect(() => {
    const ids = [...links.map(([id]) => id), 'process', 'values'];
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const current = active === 'process' ? 'services' : active === 'values' ? 'about' : active;

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
        <nav aria-label="Primary">
          <a href="#home" className="logo" onClick={() => setOpen(false)}>
            <img src="/iTEDDA.png" alt="" className="logo-mark" />
            <span className="logo-word">
              <span className="logo-i">i</span>TEDDA
            </span>
          </a>

          <ul className="nav-links">
            {links.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className={current === id ? 'active' : ''}>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#contact" className="btn btn-sm btn-primary nav-cta">
            Start a Project
            <Icon name="arrow" size={16} />
          </a>

          <button
            className="menu-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span />
          </button>
        </nav>
      </header>

      <div className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <ul>
          {links.map(([id, label], i) => (
            <li key={id} style={{ '--i': i }}>
              <a href={`#${id}`} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                <span className="mm-index">0{i + 1}</span>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="btn btn-primary" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
          Start Your Project <Icon name="arrow" size={18} />
        </a>
      </div>
    </>
  );
};

export default Header;
