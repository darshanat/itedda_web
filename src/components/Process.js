import React from 'react';
import SectionHead from './SectionHead';
import Icon from './Icon';

const steps = [
  { icon: 'compass', title: 'Concept & Architecture', text: 'We define requirements, map technical boundaries and choose the right platform for your idea.' },
  { icon: 'circuit', title: 'Schematic & Simulation', text: 'Precision component selection, power management and signal-integrity checks before a single board is made.' },
  { icon: 'chip', title: 'PCB Layout & DFM', text: 'Multi-layer routing designed for manufacturing and for FCC / CE approval from day one.' },
  { icon: 'code', title: 'Firmware & Software', text: 'Embedded code, cloud backends and apps built in parallel so every layer fits the others.' },
  { icon: 'flask', title: 'Prototype & Validate', text: '3D-printed enclosures, functional and environmental testing, pre-compliance screening.' },
  { icon: 'factory', title: 'Manufacture & Scale', text: 'DFM documentation, test fixtures and a clean handoff to production partners.' },
];

const Process = () => (
  <section id="process" className="process">
    <div className="container">
      <SectionHead
        index="02"
        label="Process"
        title={<>From idea to <span className="grad-text">production</span></>}
      >
        One unified pipeline. Our hardware and software teams collaborate from
        day one, so nothing gets lost in translation between concept and launch.
      </SectionHead>

      <ol className="process-track">
        {steps.map((s, i) => (
          <li key={s.title} className="process-step fade-in" style={{ '--d': `${i * 90}ms` }}>
            <div className="step-node" data-spot>
              <Icon name={s.icon} size={26} />
              <span className="step-no">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Process;
