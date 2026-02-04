import React from "react";

const About = () => {
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
  ];

  const stats = [
    { number: "20+", label: "Projects Completed" },
    { number: "20+", label: "Happy Clients" },
    { number: "8+", label: "Years Experience" },
    { number: "99%", label: "First-Pass Success" },
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text fade-in">
            <h2>About Us</h2>
            <p>
              <strong>iTEDDA (Pvt)Ltd</strong> is a professional designing
              company, which provides developments and manufacturing services.
            </p>
            <p>
              We execute all services based on <strong>schematic design</strong>
              , <strong>PCB layout</strong>, <strong>PCB simulation</strong>,{" "}
              <strong>3D modeling</strong>,{" "}
              <strong>Firmware development</strong> and{" "}
              <strong>Software development</strong>.
            </p>
            <p>
              Our team is well experienced in bringing your ideas to innovative
              and accomplished outcomes.
            </p>

            <div className="skills">
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="stats fade-in">
            {stats.map((stat, index) => (
              <div key={index} className="stat">
                <div className="stat-number">{stat.number}</div>
                <div>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
