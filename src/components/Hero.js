import React, { useEffect, useState } from 'react';
import Icon from './Icon';

const words = ['Hardware', 'Firmware', 'Cloud Platforms', 'Mobile Apps', 'IoT Products'];

// Right-angle + 45° routes, like a real board. Each is drawn three times: a dim
// copper trace, a blurred glow and a bright "signal" pulse travelling along it.
const traces = [
  { d: 'M190 222 H122 L92 192 V112 H50', c: 'g', t: 3.4, s: 0 },
  { d: 'M190 262 H64', c: 'r', t: 2.8, s: 0.6 },
  { d: 'M190 302 H132 L102 332 V422 H58', c: 'g', t: 3.8, s: 1.2 },
  { d: 'M330 222 H398 L428 192 V92 H472', c: 'r', t: 3.2, s: 0.3 },
  { d: 'M330 262 H462', c: 'g', t: 2.6, s: 1.5 },
  { d: 'M330 302 H388 L418 332 V432 H470', c: 'r', t: 3.6, s: 0.9 },
  { d: 'M232 190 V132 L262 102 V48', c: 'g', t: 3, s: 0.4 },
  { d: 'M292 190 V70', c: 'r', t: 2.4, s: 1.1 },
  { d: 'M232 332 V402 L262 432 V482', c: 'r', t: 3.3, s: 0.2 },
  { d: 'M292 332 V462', c: 'g', t: 2.7, s: 1.4 },
];

const pads = [
  [50, 112], [64, 262], [58, 422], [472, 92], [462, 262],
  [470, 432], [262, 48], [292, 70], [262, 482], [292, 462],
];

const chips = [
  { label: 'ESP32', cls: 'chip-a' },
  { label: 'LoRa', cls: 'chip-b' },
  { label: 'BLE 5', cls: 'chip-c' },
  { label: 'STM32', cls: 'chip-d' },
];

const stats = [
  ['8+', 'Years building'],
  ['20+', 'Projects completed'],
  ['99%', 'First-pass success'],
];

const Hero = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="hero-badge">
            <i className="pulse-dot" />
            Turning Ideas Into Technology Solutions
          </span>

          <h1 className="hero-title">
            <span className="line">
              <span className="word" style={{ '--w': 0 }}>Technology</span>{' '}
              <span className="word" style={{ '--w': 1 }}>Solutions</span>
            </span>
            <span className="line">
              <span className="word" style={{ '--w': 2 }}>For</span>{' '}
              <span className="word grad-g" style={{ '--w': 3 }}>Business</span>{' '}
              <span className="word grad-r" style={{ '--w': 4 }}>Growth</span>
            </span>
          </h1>

          <p className="hero-rotator" aria-live="polite">
            <span className="mono-prompt">&gt;</span> we engineer&nbsp;
            <span className="rotator">
              {words.map((w, n) => (
                <span key={w} className={n === i ? 'on' : ''}>{w}</span>
              ))}
            </span>
            <span className="caret" />
          </p>

          <p className="hero-lead">
            We are a technology company based in Sri Lanka, specializing in
            electronic product development, software development and digital
            marketing. We help businesses turn innovative ideas into scalable,
            reliable and result-driven technology solutions.
          </p>

          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary btn-lg" data-magnet>
              Start Your Project
              <Icon name="arrow" size={18} />
            </a>
            <a href="#portfolio" className="btn btn-ghost btn-lg" data-magnet>
              View Our Work
            </a>
          </div>

          <dl className="hero-stats">
            {stats.map(([n, l]) => (
              <div key={l}>
                <dt>{n}</dt>
                <dd>{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-visual" data-tilt="7" aria-hidden="true">
          <div className="board">
            <div className="board-halo" />
            <svg viewBox="0 0 520 520" className="board-svg">
              <defs>
                <filter id="traceBlur" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3.2" />
                </filter>
              </defs>

              <rect x="14" y="14" width="492" height="492" rx="30" className="board-pcb" />
              <rect x="14" y="14" width="492" height="492" rx="30" className="board-edge" />

              {traces.map((t, k) => (
                <g key={k} className={`trace trace-${t.c}`}>
                  <path d={t.d} className="trace-base" />
                  <path
                    d={t.d}
                    className="trace-glow"
                    pathLength="100"
                    filter="url(#traceBlur)"
                    style={{ animationDuration: `${t.t}s`, animationDelay: `${t.s}s` }}
                  />
                  <path
                    d={t.d}
                    className="trace-pulse"
                    pathLength="100"
                    style={{ animationDuration: `${t.t}s`, animationDelay: `${t.s}s` }}
                  />
                </g>
              ))}

              {pads.map(([x, y], k) => (
                <g key={k} className="pad" style={{ animationDelay: `${k * 0.25}s` }}>
                  <circle cx={x} cy={y} r="9" className="pad-ring" />
                  <circle cx={x} cy={y} r="4" className="pad-core" />
                </g>
              ))}

              <g className="soc">
                <rect x="170" y="170" width="180" height="180" rx="20" className="soc-halo" />
                {[...Array(6)].map((_, k) => (
                  <g key={k}>
                    <rect x={196 + k * 24} y="178" width="6" height="12" rx="1.5" className="pin" />
                    <rect x={196 + k * 24} y="330" width="6" height="12" rx="1.5" className="pin" />
                    <rect x="178" y={196 + k * 24} width="12" height="6" rx="1.5" className="pin" />
                    <rect x="330" y={196 + k * 24} width="12" height="6" rx="1.5" className="pin" />
                  </g>
                ))}
                <rect x="190" y="190" width="140" height="140" rx="14" className="soc-body" />
                <rect x="204" y="204" width="112" height="112" rx="8" className="soc-die" />
                <circle cx="214" cy="214" r="3" className="soc-dot" />
                <text x="260" y="256" textAnchor="middle" className="soc-logo">
                  <tspan className="soc-i">i</tspan>TEDDA
                </text>
                <text x="260" y="280" textAnchor="middle" className="soc-sub">REV 5.2 · ARM</text>
                <rect x="204" y="204" width="112" height="112" rx="8" className="soc-scan" />
              </g>
            </svg>

            {chips.map((c) => (
              <span key={c.label} className={`float-chip ${c.cls}`}>
                <i /> {c.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <a href="#services" className="scroll-cue" aria-label="Scroll to services">
        <span className="scroll-cue-mouse"><i /></span>
        Scroll
      </a>
    </section>
  );
};

export default Hero;
