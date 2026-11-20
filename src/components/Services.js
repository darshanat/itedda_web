import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  // Cards show icon and title only; the modal carries `description` plus the
  // labelled `points` beneath it.
  const subcategoryGroups = [
    {
      number: "01",
      group: "Electronic Product Development",
      pillarTitle: "Hardware Engineering & Industrial Design",
      intro:
        "The physical foundation of your product. From a napkin sketch to a physical device, we design high-performance circuit boards and engineer beautiful, durable enclosures built to withstand real-world conditions and scale seamlessly in manufacturing.",
      items: [
        {
          icon: "🔧",
          title: "PCB Design & Hardware Engineering",
          description:
            "The printed circuit board (PCB) is the backbone of any electronic product. Our hardware engineers design optimized, reliable, and cost-effective PCBs tailored to your product's form factor.",
          points: [
            {
              label: "Schematic Capture",
              text: "Mapping out the electronic blueprint with precision component selection."
            },
            {
              label: "Multi-Layer Layout",
              text: "Expert routing for high-speed signals, power distribution, and minimal noise."
            },
            {
              label: "DFM & EMI Compliance",
              text: "Designing with Design for Manufacturing (DFM) principles to ensure seamless factory production, while minimizing Electromagnetic Interference (EMI) for regulatory approvals (FCC/CE)."
            }
          ]
        },
        {
          icon: "⚡",
          title: "Firmware Development",
          description:
            "Hardware is only as smart as the software driving it. Our firmware developers write clean, efficient, and secure low-level code that allows your hardware to communicate seamlessly with the digital world.",
          points: [
            {
              label: "Microcontroller Architecture",
              text: "Architecture design for ARM, ESP32, STM32, and PIC platforms."
            },
            {
              label: "Real-Time Operating Systems (RTOS)",
              text: "Developing deterministic, ultra-reliable code for complex systems."
            },
            {
              label: "Connectivity Stacks",
              text: "Implementing secure wireless protocols including Bluetooth (BLE), Wi-Fi, Zigbee, LoRaWAN, and cellular IoT."
            }
          ]
        },
        {
          icon: "📐",
          title: "3D Product Modeling & Industrial Design",
          description:
            "A great product must look, feel, and function beautifully in the real world. We enclose your electronics in stunning, ergonomic, and highly functional mechanical designs.",
          points: [
            {
              label: "Enclosure Design",
              text: "Crafting 3D CAD models that perfectly house the internal PCB while optimizing thermal management and user ergonomics."
            },
            {
              label: "Rapid Prototyping",
              text: "Utilizing 3D printing and CNC machining to quickly iterate look-and-feel prototypes."
            },
            {
              label: "Production Preparation",
              text: "Designing molds for injection molding or sheet metal fabrication to ensure scalable mass production."
            }
          ]
        },
        {
          icon: "🧪",
          title: "Rigorous Testing & Validation",
          description:
            "We don't just build products; we ensure they endure. Our comprehensive testing phase guarantees that your product complies with industry standards and performs flawlessly.",
          points: [
            {
              label: "Functional Validation",
              text: "Verifying that every feature operates exactly as intended in the design specification."
            },
            {
              label: "Environmental & Stress Testing",
              text: "Testing hardware limits against temperature extremes, moisture, and vibration."
            },
            {
              label: "Pre-Compliance Screening",
              text: "Identifying and resolving potential compliance bottlenecks before final regulatory submissions, saving you time and capital."
            }
          ]
        }
      ]
    },
    {
      number: "02",
      group: "Software Development",
      pillarTitle: "Software & Digital Ecosystems",
      intro:
        "The digital engine driving your innovation. From cloud infrastructures that process millions of data points to sleek user interfaces, we build the backends, intuitive applications, and data pipelines that connect your physical device to the digital world — empowering your business and captivating your users.",
      items: [
        {
          icon: "📱",
          title: "Web & Mobile Application Development",
          description:
            "We create modern cross-platform mobile apps and dynamic web applications focused on premium user experience (UX) and high performance.",
          points: [
            {
              label: "Mobile Apps (iOS & Android)",
              text: "Native and cross-platform (Flutter/React Native) development for seamless on-the-go access."
            },
            {
              label: "Web Portals & Dashboards",
              text: "Building intuitive, responsive user interfaces for data visualization, user management, and administrative control."
            },
            {
              label: "Responsive UI/UX Design",
              text: "Crafting intuitive, beautiful user journeys that make complex software simple to navigate."
            }
          ]
        },
        {
          icon: "☁️",
          title: "Cloud Architecture & Backend Infrastructure",
          description:
            "Behind every great application is a powerful, secure backend. We engineer cloud infrastructures designed to scale effortlessly as your user base grows.",
          points: [
            {
              label: "Scalable Cloud Services",
              text: "Leveraging AWS, Google Cloud, or Azure to build resilient microservices and API gateways."
            },
            {
              label: "Database Management",
              text: "Structuring relational and non-relational databases (SQL/NoSQL) optimized for speed, data integrity, and complex queries."
            },
            {
              label: "IoT Data Pipelines",
              text: "Building real-time data ingestion pipelines capable of handling, processing, and analyzing high-volume streams from connected devices."
            }
          ]
        },
        {
          icon: "🔌",
          title: "API Integration & System Architecture",
          description:
            "We ensure your software doesn't live in a silo. We build secure, robust Application Programming Interfaces (APIs) that allow different platforms to communicate fluidly.",
          points: [
            {
              label: "Custom API Development",
              text: "Building secure, well-documented RESTful and GraphQL APIs."
            },
            {
              label: "Third-Party Integrations",
              text: "Connecting your platform smoothly with payment gateways (Stripe, PayPal), CRMs (Salesforce), ERPs, and enterprise systems."
            },
            {
              label: "Enterprise Architecture",
              text: "Designing decoupled, modular software systems that adapt easily to future technology shifts."
            }
          ]
        },
        {
          icon: "🚀",
          title: "QA Automation & DevOps",
          description:
            "We deploy quickly, securely, and without downtime. Our engineering practices ensure that software updates are continuous, thoroughly tested, and stable.",
          points: [
            {
              label: "CI/CD Pipelines",
              text: "Automated Continuous Integration and Continuous Deployment for rapid, risk-free code releases."
            },
            {
              label: "Comprehensive Software Testing",
              text: "Utilizing automated unit testing, integration testing, and manual QA to catch bugs before they ever reach a user."
            },
            {
              label: "Cybersecurity & Compliance",
              text: "Implementing end-to-end encryption, OAuth data protection, and aligning with standard data regulations (GDPR/HIPAA)."
            }
          ]
        }
      ]
    }
  ];

  const capabilities = [
    {
      icon: "📋",
      title: "Project Management",
      description:
        "We keep your timeline tight and your budget predictable. Utilizing agile methodologies, we mitigate risks, manage vendor relationships, and ensure transparent communication from day one to product launch."
    },
    {
      icon: "🧭",
      title: "Systems Engineering",
      description:
        "The bridge between requirements and reality. We define the overall product architecture, map out technical boundaries, and ensure that hardware, software, and mechanics work in absolute harmony without performance bottlenecks."
    },
    {
      icon: "⚙️",
      title: "Electronic Design",
      description:
        "The core electronics architecture. Our engineers specialize in component selection, schematic capture, power management, and signal integrity to create efficient, stable electronic systems."
    },
    {
      icon: "🧠",
      title: "Embedded Systems",
      description:
        "Where hardware meets code. We specialize in bringing physical devices to life with edge computing capabilities, real-time operating systems (RTOS), low-power optimization, and robust machine-to-machine communication."
    },
    {
      icon: "💻",
      title: "Software Development",
      description:
        "Full-stack digital engineering. We build secure backend infrastructures, interactive web dashboards, and sleek mobile apps (iOS & Android) that allow users to control, monitor, and extract value from your device.",
      detail:
        "We specialize in developing, testing, and maintaining software tailored to your specific requirements. Our team ensures your software performs as expected while providing ongoing support and updates to resolve issues, improve efficiency, and enhance user experience in line with evolving technologies."
    },
    {
      icon: "🏭",
      title: "Product Manufacturing",
      description:
        "Bridging development and mass production. We prepare full Design for Manufacturing (DFM) documentation, build custom test fixtures for the assembly line, and manage the handoff to manufacturing partners for a seamless scale-up.",
      detail:
        "iTEDDA (Pvt) Ltd uses extensive advanced technology to help you create and assemble electronic components into exceptional finished products, with rigorous testing to ensure every detail meets your high standards."
    }
  ];

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedService(null);
      }
    };
    if (selectedService) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedService]);

  const openModal = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <section id="services" className="services">
      <div className="container">
        <h2 className="section-title fade-in">
          Product Design &amp; Development
        </h2>
        <p className="services-intro fade-in">
          We turn complex concepts into market-ready, intelligent physical
          products. By blending state-of-the-art hardware engineering with
          scalable digital ecosystems, we provide a unified design and
          development pipeline. From initial architecture to mass production, we
          deliver reliable, compliant, and cutting-edge electronic solutions
          tailored to your business goals.
        </p>

        <h3 className="services-subtitle fade-in">
          Transforming Ideas into Intelligent Ecosystems
        </h3>
        <p className="services-intro fade-in">
          We deliver end-to-end engineering solutions that bridge the physical
          and digital worlds. By combining cutting-edge Electronic Product
          Development with robust, scalable Software Development, we provide a
          unified pipeline to design, build, and deploy your next innovation.
          Whether you need a standalone hardware device, a powerful software
          platform, or a seamlessly integrated IoT ecosystem, our
          multi-disciplinary team turns your vision into a market-ready reality.
        </p>

        <div className="category-columns">
          {subcategoryGroups.map((group) => (
            <div key={group.group} className="subcategory-group">
              <div className="category-header fade-in">
                <span className="category-number">{group.number}</span>
                <h4 className="category-name">{group.group}</h4>
                <span className="category-pillar">{group.pillarTitle}</span>
                <p>{group.intro}</p>
              </div>
              <div className="services-grid">
                {group.items.map((item) => (
                  <div
                    key={item.title}
                    className="service-card fade-in clickable"
                    onClick={() => openModal(item)}
                  >
                    <span className="service-icon">{item.icon}</span>
                    <h3>{item.title}</h3>
                    <span className="service-read-more">Read more →</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="synergy-callout fade-in">
          <h4>The Power of Full-Stack Synergy</h4>
          <p>
            When you combine our hardware and software capabilities, magic
            happens. We eliminate the traditional friction of working with
            separate hardware and software agencies. Our teams collaborate on
            day one, meaning the firmware layout aligns perfectly with the cloud
            architecture, and the mobile app talks flawlessly to the physical
            device. The result? A faster time-to-market, lower development
            costs, and a unified product ecosystem.
          </p>
        </div>

        <h3 className="services-subtitle fade-in">Our Development Capabilities</h3>
        <p className="services-intro fade-in">
          To execute these categories flawlessly, our multidisciplinary team
          brings deep expertise across six core engineering disciplines:
        </p>
        <div className="capabilities-grid">
          {capabilities.map((capability) => (
            <div
              key={capability.title}
              // These cards already show their full description, so only the
              // two with extra copy are worth opening - clicking through to
              // the same text you just read is a dead end.
              className={`capability-card fade-in ${capability.detail ? "clickable" : ""}`}
              onClick={capability.detail ? () => openModal(capability) : undefined}
            >
              <span className="capability-icon">{capability.icon}</span>
              <div>
                <h4>{capability.title}</h4>
                <p>{capability.description}</p>
                {capability.detail && (
                  <span className="service-read-more">Read more →</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*
        Rendered into document.body rather than inline. This section sets
        `backdrop-filter`, which makes it a containing block for position:fixed
        descendants - a modal nested inside it would size and place itself
        against the section box instead of the viewport, opening far off-screen
        once the section grew tall.
      */}
      {selectedService &&
        createPortal(
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content service-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>&times;</button>
              <div className="service-modal-content">
                <div className="service-modal-icon">{selectedService.icon}</div>
                <h3>{selectedService.title}</h3>
                <p>{selectedService.description}</p>
                {selectedService.points && (
                  <ul className="service-modal-points">
                    {selectedService.points.map((point) => (
                      <li key={point.label}>
                        <strong>{point.label}:</strong> {point.text}
                      </li>
                    ))}
                  </ul>
                )}
                {selectedService.detail && <p>{selectedService.detail}</p>}
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};

export default Services;
