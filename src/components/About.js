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
    "SEO",
    "Social Media Marketing",
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
              <strong>iTEDDA (Pvt)Ltd</strong> is a technology company based
              in Sri Lanka, specializing in{" "}
              <strong>electronic product development</strong>,{" "}
              <strong>software development</strong> and{" "}
              <strong>digital marketing</strong>.
            </p>
            <p>
              We execute all services based on <strong>schematic design</strong>
              , <strong>PCB layout</strong>, <strong>PCB simulation</strong>,{" "}
              <strong>3D modeling</strong>,{" "}
              <strong>Firmware development</strong> and{" "}
              <strong>Software development</strong>.
            </p>
            <p>
              We help businesses turn innovative ideas into scalable, reliable and
              result-driven technology solutions.
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
