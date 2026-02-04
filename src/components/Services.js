import { useState, useEffect } from 'react';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      icon: "🔧",
      title: "PCB Design",
      description: "We specialize in designing a wide range of PCBs, including solid PCBs, aluminum-clad PCBs, and flexible PCBs, all adhering to industry standards. Our expert team creates custom PCB layouts, schematics, and simulations based on your specific requirements. We utilize industry-leading design tools such as KiCad and Altium to ensure precision, reliability, and quality in every PCB design."
    },
    {
      icon: "⚡",
      title: "Firmware Development",
      description: "Our team is highly experienced in firmware development, supporting every stage of your project lifecycle using industry-standard programming languages. We work with platforms such as ESP-IDF, STM32, Arduino, and MSP430 to develop IoT solutions, embedded systems, and microcontroller-based projects. We ensure that all firmware meets industry standards and delivers reliable performance."
    },
    {
      icon: "💻",
      title: "Software Development",
      description: "We specialize in developing, testing, and maintaining software tailored to your specific requirements. Our team ensures your software performs as expected while providing ongoing support and updates to resolve issues, improve efficiency, and enhance user experience in line with evolving technologies."
    },
    {
      icon: "📐",
      title: "3D Product Modeling",
      description: "We specialize in model and enclosure design. Our team carefully analyzes product functionality and related factors to ensure each design meets performance standards while exceeding manufacturing expectations."
    },
    {
      icon: "🏭",
      title: "Manufacturing",
      description: "iTEDDA (Pvt)Ltd use extensive advanced technology to help you create and assembly of electronic components into expectional finished products. And we provide rigorous testing to ensure every detail meets your high standards. We specialize in model and enclosure design. Our team carefully analyzes product functionality and related factors to ensure each design meets performance standards while exceeding manufacturing expectations."
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
        <h2 className="section-title fade-in">My Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card fade-in clickable"
              onClick={() => openModal(service)}
            >
              <span className="service-icon">{service.icon}</span>
              <h3>{service.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Service Modal */}
      {selectedService && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content service-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>&times;</button>
            <div className="service-modal-content">
              <div className="service-modal-icon">{selectedService.icon}</div>
              <h3>{selectedService.title}</h3>
              <p>{selectedService.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
