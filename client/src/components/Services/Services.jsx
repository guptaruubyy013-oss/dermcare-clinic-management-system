import "./Services.css";
import {
  FaUserMd,
  FaCut,
  FaSpa,
  FaMagic,
  FaLeaf,
  FaSmile,
} from "react-icons/fa";

const services = [
  {
    icon: <FaSmile />,
    title: "Acne Treatment",
    description:
      "Advanced acne solutions with personalized treatment plans for clear and healthy skin.",
  },
  {
    icon: <FaCut />,
    title: "Hair Fall Treatment",
    description:
      "Effective hair restoration treatments to reduce hair fall and improve hair growth.",
  },
  {
    icon: <FaMagic />,
    title: "Laser Treatment",
    description:
      "Safe and advanced laser procedures for skin rejuvenation and hair removal.",
  },
  {
    icon: <FaSpa />,
    title: "Chemical Peel",
    description:
      "Improve skin texture, remove pigmentation, and restore natural glow.",
  },
  {
    icon: <FaLeaf />,
    title: "Skin Rejuvenation",
    description:
      "Anti-aging treatments that help keep your skin youthful and radiant.",
  },
  {
    icon: <FaUserMd />,
    title: "Dermatology Consultation",
    description:
      "Consult experienced dermatologists for accurate diagnosis and treatment.",
  },
];

function Services() {
  return (
    <section className="services-section">
      <div className="container">

        <div className="section-heading">
          <span>Our Services</span>

          <h2>Comprehensive Skin & Hair Care Solutions</h2>

          <p>
            We offer a wide range of dermatology and hair care treatments
            using advanced technology and personalized care.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>

              <div className="service-icon">
                {service.icon}
              </div>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <button className="service-btn">
                Learn More
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Services;