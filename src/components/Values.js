import React from "react";

const values = [
  { icon: "💡", title: "Innovation", text: "We turn ideas into impactful solutions." },
  { icon: "🛡️", title: "Reliability", text: "Quality and trust in every project." },
  { icon: "👥", title: "Customer Focus", text: "Your success is our priority." },
  { icon: "📈", title: "Long-Term Partnership", text: "We grow together with you." },
];

const Values = () => (
  <section id="values" className="values">
    <div className="container">
      <h2 className="section-title fade-in">Our Values</h2>
      <div className="values-grid">
        {values.map((v) => (
          <div key={v.title} className="value-item fade-in">
            <div className="value-icon">{v.icon}</div>
            <h4>{v.title}</h4>
            <p>{v.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Values;
