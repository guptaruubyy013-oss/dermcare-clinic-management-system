import "./TreatmentJourney.css";

import {
  FaUserMd,
  FaClipboardCheck,
  FaSyringe,
  FaChartLine,
  FaSmile,
} from "react-icons/fa";

const journeySteps = [
  {
    id: 1,
    icon: <FaUserMd />,
    number: "01",
    title: "Consultation",
    description:
      "Meet our experienced specialists and discuss your skin or hair concerns in detail.",
  },
  {
    id: 2,
    icon: <FaClipboardCheck />,
    number: "02",
    title: "Diagnosis",
    description:
      "Get a detailed assessment and personalized diagnosis based on your individual needs.",
  },
  {
    id: 3,
    icon: <FaSyringe />,
    number: "03",
    title: "Treatment",
    description:
      "Receive advanced and personalized treatments designed by our medical specialists.",
  },
  {
    id: 4,
    icon: <FaChartLine />,
    number: "04",
    title: "Track Progress",
    description:
      "Monitor your treatment journey with visit history, progress images and treatment updates.",
  },
  {
    id: 5,
    icon: <FaSmile />,
    number: "05",
    title: "Visible Results",
    description:
      "See your transformation and achieve healthier skin, hair and renewed confidence.",
  },
];

function TreatmentJourney() {
  return (
    <section className="treatment-journey">

      <div className="container">

        {/* Section Heading */}

        <div className="journey-heading">

          <span className="journey-label">
            YOUR JOURNEY TO BETTER SKIN
          </span>

          <h2>
            Personalized Care,
            <span> Every Step of the Way</span>
          </h2>

          <p>
            From your first consultation to visible results, we make
            your treatment journey simple, transparent and personalized.
          </p>

        </div>


        {/* Journey Steps */}

        <div className="journey-container">

          {journeySteps.map((step, index) => (

            <div
              className="journey-step"
              key={step.id}
            >

              {/* Connecting Line */}

              {index !== journeySteps.length - 1 && (
                <div className="journey-line"></div>
              )}


              {/* Icon */}

              <div className="journey-icon">

                {step.icon}

              </div>


              {/* Number */}

              <span className="journey-number">
                {step.number}
              </span>


              {/* Content */}

              <div className="journey-content">

                <h3>
                  {step.title}
                </h3>

                <p>
                  {step.description}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default TreatmentJourney;