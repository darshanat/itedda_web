import React from "react";

// Shared section header: mono eyebrow, display title, optional lead copy.
const SectionHead = ({ index, label, title, children, align = "center" }) => (
  <div className={`section-head align-${align}`}>
    <span className="eyebrow fade-in">
      <i className="eyebrow-dot" />
      <span className="eyebrow-index">{index}</span>
      <span className="eyebrow-label">{label}</span>
    </span>
    <h2 className="section-title fade-in" style={{ "--d": "80ms" }}>
      {title}
    </h2>
    {children && (
      <p className="section-lead fade-in" style={{ "--d": "160ms" }}>
        {children}
      </p>
    )}
  </div>
);

export default SectionHead;
