import "./BeforeAfter.css";

import before1 from "../../assets/images/before-after/before1.jpeg";
import after1 from "../../assets/images/before-after/after1.jpeg";
import before2 from "../../assets/images/before-after/before2.jpeg";
import after2 from "../../assets/images/before-after/after2.jpeg";

import { FaArrowRight } from "react-icons/fa";

const treatments = [
  {
    id: 1,
    before: before1,
    after: after1,
    title: "Acne Treatment",
    category: "Skin Care",
  },
  {
    id: 2,
    before: before2,
    after: after2,
    title: "Hair Restoration",
    category: "Hair Care",
  },
];

function BeforeAfter() {
  return (
    <section className="before-after-section">

      <div className="container">

        {/* Heading */}

        <div className="before-after-heading">

          <span className="section-label">
            REAL TREATMENT JOURNEYS
          </span>

          <h2>
            See the
            <span> Difference</span>
          </h2>

          <p>
            Every treatment journey is unique. Explore examples of
            transformations achieved through personalized care and
            advanced dermatological treatments.
          </p>

        </div>


        {/* Gallery */}

        <div className="before-after-grid">

          {treatments.map((treatment) => (

            <BeforeAfterCard
              key={treatment.id}
              treatment={treatment}
            />

          ))}

        </div>

      </div>

    </section>
  );
}


/* =========================
   CARD
========================= */

function BeforeAfterCard({ treatment }) {

  return (
    <div className="before-after-card">

      <div className="comparison">

        {/* BEFORE */}

        <div className="comparison-side">

          <img
            src={treatment.before}
            alt={`${treatment.title} before treatment`}
          />

          <span className="comparison-label">
            Before
          </span>

        </div>


        {/* AFTER */}

        <div className="comparison-side">

          <img
            src={treatment.after}
            alt={`${treatment.title} after treatment`}
          />

          <span className="comparison-label after-label">
            After
          </span>

        </div>

      </div>


      {/* Information */}

      <div className="before-after-info">

        <div>

          <span>
            {treatment.category}
          </span>

          <h3>
            {treatment.title}
          </h3>

        </div>

        <button
          aria-label={`View ${treatment.title}`}
        >
          <FaArrowRight />
        </button>

      </div>

    </div>
  );
}

export default BeforeAfter;