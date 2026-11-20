import React, { useRef } from "react";
import SectionHead from "./SectionHead";
import { useCountUp, useInView } from "../hooks/useInteractions";

const skills = [
  "Altium Designer",
  "KiCad",
  "Eagle CAD",
  "Signal Integrity",
  "EMI/EMC",
  "High-Speed Digital",
  "RF Design",
  "Power Electronics",
  "Web Development",
  "Mobile Development",
  "SEO",
  "Social Media Marketing",
];

const stats = [
  { value: 20, suffix: "+", label: "Projects Completed" },
  { value: 20, suffix: "+", label: "Happy Clients" },
  { value: 8, suffix: "+", label: "Years Experience" },
  { value: 99, suffix: "%", label: "First-Pass Success" },
];

const Stat = ({ value, suffix, label, play, tone }) => {
  const n = useCountUp(value, play);
  return (
    <div className={`stat tone-${tone}`} data-spot>
      <div className="stat-number">
        {n}
        <span>{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

const About = () => {
  const statsRef = useRef(null);
  const play = useInView(statsRef);

  return (
    <section id="about" className="about">
      <div className="container">
        <SectionHead index="05" label="About" title={<>About <span className="grad-text">us</span></>} align="left" />

        <div className="about-content">
          <div className="about-text fade-in">
            <p className="about-lead">
              <strong>iTEDDA (Pvt)Ltd</strong> is a technology company based in
              Sri Lanka, specializing in{" "}
              <strong>electronic product development</strong>,{" "}
              <strong>software development</strong> and{" "}
              <strong>digital marketing</strong>.
            </p>
            <p>
              We execute all services based on <strong>schematic design</strong>,{" "}
              <strong>PCB layout</strong>, <strong>PCB simulation</strong>,{" "}
              <strong>3D modeling</strong>, <strong>Firmware development</strong>{" "}
              and <strong>Software development</strong>.
            </p>
            <p>
              We help businesses turn innovative ideas into scalable, reliable
              and result-driven technology solutions.
            </p>

            <div className="skills">
              {skills.map((skill, index) => (
                <span key={skill} className="skill-tag" style={{ "--i": index }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="stats fade-in" ref={statsRef} style={{ "--d": "120ms" }}>
            {stats.map((s, i) => (
              <Stat key={s.label} {...s} play={play} tone={i % 2 ? "r" : "g"} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
