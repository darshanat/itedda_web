import React from "react";
import Icon from "./Icon";
import SectionHead from "./SectionHead";

const values = [
  { icon: "bulb", title: "Innovation", text: "We turn ideas into impactful solutions." },
  { icon: "shield", title: "Reliability", text: "Quality and trust in every project." },
  { icon: "users", title: "Customer Focus", text: "Your success is our priority." },
  { icon: "trend", title: "Long-Term Partnership", text: "We grow together with you." },
];

const Values = () => (
  <section id="values" className="values">
    <div className="container">
      <SectionHead index="06" label="Values" title={<>Our <span className="grad-text">values</span></>} />
      <div className="values-grid">
        {values.map((v, i) => (
          <div
            key={v.title}
            className={`value-item fade-in tone-${i % 2 ? "r" : "g"}`}
            style={{ "--d": `${i * 90}ms` }}
            data-spot
            data-tilt="6"
          >
            <span className="value-no">0{i + 1}</span>
            <div className="value-icon"><Icon name={v.icon} size={28} /></div>
            <h4>{v.title}</h4>
            <p>{v.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Values;
