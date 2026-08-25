import "./Testimonials.css";

import {
  FaStar,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Ananya Shah",
    treatment: "Acne Treatment",
    review:
      "I had struggled with acne for years. The doctors at DermCare understood my concerns and created a treatment plan specifically for my skin. The results have been amazing.",
    initials: "AS",
  },
  {
    id: 2,
    name: "Rohan Patel",
    treatment: "Hair Restoration",
    review:
      "The entire experience was professional and comfortable. My hair treatment progress was regularly monitored and I could actually see the improvement over time.",
    initials: "RP",
  },
  {
    id: 3,
    name: "Meera Joshi",
    treatment: "Skin Rejuvenation",
    review:
      "The staff is extremely friendly and the doctors are very knowledgeable. I finally feel confident about my skin again. Highly recommended.",
    initials: "MJ",
  },
];

function Testimonials() {
  const [active, setActive] = useState(0);

  const previousTestimonial = () => {
    setActive((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const nextTestimonial = () => {
    setActive((current) =>
      current === testimonials.length - 1 ? 0 : current + 1
    );
  };

  const testimonial = testimonials[active];

  return (
    <section className="testimonials-section">
      <div className="container">

        {/* Heading */}

        <div className="testimonials-heading">

          <span className="testimonial-label">
            PATIENT STORIES
          </span>

          <h2>
            Trusted by Patients,
            <span> Loved by Thousands</span>
          </h2>

          <p>
            Hear from patients who trusted our specialists with their
            skin and hair care journey.
          </p>

        </div>


        {/* Testimonial Card */}

        <div className="testimonial-wrapper">

          <button
            className="testimonial-arrow"
            onClick={previousTestimonial}
            aria-label="Previous testimonial"
          >
            <FaChevronLeft />
          </button>


          <div className="testimonial-card">

            <div className="quote-icon">
              <FaQuoteLeft />
            </div>


            <div className="testimonial-stars">

              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} />
              ))}

            </div>


            <p className="testimonial-review">
              "{testimonial.review}"
            </p>


            <div className="testimonial-patient">

              <div className="patient-avatar">
                {testimonial.initials}
              </div>

              <div>
                <h3>
                  {testimonial.name}
                </h3>

                <span>
                  {testimonial.treatment}
                </span>
              </div>

            </div>

          </div>


          <button
            className="testimonial-arrow"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <FaChevronRight />
          </button>

        </div>


        {/* Dots */}

        <div className="testimonial-dots">

          {testimonials.map((item, index) => (

            <button
              key={item.id}
              className={index === active ? "active" : ""}
              onClick={() => setActive(index)}
              aria-label={`View testimonial ${index + 1}`}
            />

          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;