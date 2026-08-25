import "./FAQ.css";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const questions = [
  {
    id: 1,
    question: "How do I book an appointment?",
    answer:
      "You can book an appointment online through our appointment form. Select your preferred treatment category, date and time, then submit your request.",
  },
  {
    id: 2,
    question: "Do I need a consultation before treatment?",
    answer:
      "Yes. A consultation helps our specialists understand your concerns, evaluate your condition and recommend the most suitable treatment plan.",
  },
  {
    id: 3,
    question: "What skin and hair treatments do you provide?",
    answer:
      "We provide a range of dermatology and hair-care services including acne treatment, pigmentation care, skin rejuvenation, hair restoration and other personalized treatments.",
  },
  {
    id: 4,
    question: "Can I track my treatment progress?",
    answer:
      "Yes. DermCare is designed to maintain treatment history and progress images so that patients and authorized doctors can monitor changes over multiple visits.",
  },
  {
    id: 5,
    question: "Can I reschedule my appointment?",
    answer:
      "Yes. Appointment details can be managed through the system. Rescheduling options depend on appointment status and available time slots.",
  },
  {
    id: 6,
    question: "Is my medical information secure?",
    answer:
      "DermCare uses role-based access and authenticated accounts to help ensure that patient information is accessible only to authorized users.",
  },
];

function FAQ() {
  const [active, setActive] = useState(null);

  const toggleFAQ = (id) => {
    setActive(active === id ? null : id);
  };

  return (
    <section className="faq-section">
      <div className="container">

        <div className="faq-heading">
          <span>HAVE QUESTIONS?</span>

          <h2>
            Frequently Asked
            <span> Questions</span>
          </h2>

          <p>
            Find answers to some of the most common questions
            about our clinic and treatments.
          </p>
        </div>

        <div className="faq-list">

          {questions.map((item) => (

            <div
              className={`faq-item ${
                active === item.id ? "active" : ""
              }`}
              key={item.id}
            >

              <button
                className="faq-question"
                onClick={() => toggleFAQ(item.id)}
              >

                <span>{item.question}</span>

                <span className="faq-icon">
                  {active === item.id ? (
                    <FaMinus />
                  ) : (
                    <FaPlus />
                  )}
                </span>

              </button>

              {active === item.id && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default FAQ;