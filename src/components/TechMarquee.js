import React from 'react';

const items = [
  'Altium Designer', 'KiCad', 'ESP32', 'STM32', 'LoRaWAN', 'Bluetooth LE',
  'RTOS', 'Signal Integrity', 'EMI / EMC', 'AWS', 'Flutter', 'React Native',
  'MQTT', 'REST & GraphQL', 'CI / CD', 'DFM',
];

const TechMarquee = () => (
  <div className="tech-marquee" aria-label="Technologies we work with">
    <div className="marquee-track">
      {[0, 1].map((n) => (
        <ul key={n} aria-hidden={n === 1}>
          {items.map((t) => (
            <li key={t}>
              <i />
              {t}
            </li>
          ))}
        </ul>
      ))}
    </div>
  </div>
);

export default TechMarquee;
