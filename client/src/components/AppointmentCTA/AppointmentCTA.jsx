import "./AppointmentCTA.css";
import {
  FaCalendarCheck,
  FaArrowRight,
  FaPhoneAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AppointmentCTA() {
  const navigate = useNavigate();

  return (
    <section className="appointment-cta">
      <div className="container">

        <div className="cta-content">

          <div className="cta-text">

            <span className="cta-label">
              START YOUR JOURNEY TODAY
            </span>

            <h2>
              Ready for Healthier Skin
              <span> & Hair?</span>
            </h2>

            <p>
              Take the first step towards personalized dermatology
              and hair care with our experienced specialists.
            </p>

            <div className="cta-buttons">

              <button
                className="cta-primary"
                onClick={() => navigate("/appointment")}
              >
                <FaCalendarCheck />
                Book Appointment
                <FaArrowRight />
              </button>

              <button className="cta-phone">
                <FaPhoneAlt />
                <span>
                  <small>Need help?</small>
                  Call our clinic
                </span>
              </button>

            </div>

          </div>

          <div className="cta-decoration">

            <div className="cta-circle circle-one"></div>
            <div className="cta-circle circle-two"></div>

            <div className="cta-icon">
              <FaCalendarCheck />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default AppointmentCTA;