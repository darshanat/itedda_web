import React from "react";
import SectionHead from "./SectionHead";

const expectations = [
  { label: "Business-focused thinking", text: "Solutions planned around your objectives and users." },
  { label: "Tailored development", text: "Scope and features shaped to the requirements of each project." },
  { label: "Connected capabilities", text: "Access to complementary electronic, software, mobile, and marketing services." },
  { label: "Clear collaboration", text: "Discussion of requirements, deliverables, timelines, and costs before work begins." },
  { label: "Long-term perspective", text: "Options for maintenance, improvements, and future development where agreed." },
];

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <SectionHead
          index="05"
          label="Who We Are"
          title={<>An integrated technology partner for <span className="grad-text">modern business challenges.</span></>}
          align="left"
        />

        <div className="about-content">
          <div className="about-text fade-in">
            <p className="about-lead">
              <strong>iTEDDA</strong> is a technology solutions company focused
              on helping businesses turn ideas into practical products,
              efficient software systems, and effective digital experiences.
            </p>
            <p>
              We bring together <strong>electronic product development</strong>,{" "}
              <strong>software development</strong>,{" "}
              <strong>mobile applications</strong>, and{" "}
              <strong>digital marketing</strong> to support business objectives
              from concept through implementation and promotion.
            </p>
            <p>
              We aim to understand each client&rsquo;s goals before recommending
              a solution. Whether the requirement is a new product, a more
              efficient internal process, a customer-facing application, or
              stronger online visibility, our approach is to match the
              technology to the business need.
            </p>
          </div>

          <div className="about-purpose fade-in" style={{ "--d": "120ms" }} data-spot>
            <span className="about-purpose-label">Our purpose</span>
            <p>
              Help businesses solve practical problems, unlock opportunities,
              and grow through thoughtfully designed technology.
            </p>
          </div>
        </div>

        <div className="about-expect">
          <h3 className="fade-in">What clients can expect</h3>
          <div className="about-expect-grid">
            {expectations.map((e, i) => (
              <div
                key={e.label}
                className={`about-expect-card fade-in tone-${i % 2 ? "r" : "g"}`}
                style={{ "--d": `${i * 70}ms` }}
                data-spot
              >
                <strong>{e.label}</strong>
                <span>{e.text}</span>
              </div>
            ))}
          </div>
          <p className="about-commitment fade-in">
            Our commitment is to communicate clearly, define expectations, and
            work with clients toward practical, measurable business outcomes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
