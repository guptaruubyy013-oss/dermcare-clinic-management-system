import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [quickForm, setQuickForm] = useState({
    name: "",
    phone: "",
    concern: "Acne & Scars",
  });

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    navigate("/appointment", { state: { prefill: quickForm } });
  };

  return (
    <section
      className="position-relative py-5"
      style={{
        background: "linear-gradient(180deg, #edf4f5 0%, #f8fafb 100%)",
      }}
    >
      <div className="container py-lg-4">
        <div className="row align-items-center g-5">
          {/* Left Hero Content */}
          <div className="col-lg-7">
            <span
              className="badge px-3 py-2 rounded-pill mb-3"
              style={{
                backgroundColor: "#e0ecee",
                color: "#0e3b43",
                fontWeight: 600,
              }}
            >
              🌿 Advanced Clinical Dermatology & Aesthetic Care
            </span>
            <h1
              className="display-4 fw-bold mb-3"
              style={{ color: "#0e3b43", lineHeight: 1.2 }}
            >
              Targeted Skin & Hair Solutions Tailored for You
            </h1>
            <p className="lead mb-4 text-muted" style={{ fontSize: "1.15rem" }}>
              Experience US-FDA approved technologies, personalized treatment
              regimens, and certified specialist consultations for glowing, healthy skin.
            </p>

            <div className="d-flex flex-wrap gap-2 mb-4">
              <div className="bg-white px-3 py-2 rounded-pill shadow-sm border small fw-semibold text-dark">
                <span className="text-success me-1">✔</span> 100+ Board-Certified Doctors
              </div>
              <div className="bg-white px-3 py-2 rounded-pill shadow-sm border small fw-semibold text-dark">
                <span className="text-success me-1">✔</span> US-FDA Approved Equipment
              </div>
              <div className="bg-white px-3 py-2 rounded-pill shadow-sm border small fw-semibold text-dark">
                <span className="text-success me-1">✔</span> 50,000+ Happy Patients
              </div>
            </div>

            <div className="d-flex flex-wrap gap-3">
              <Link
                to="/appointment"
                className="btn btn-primary rounded-pill px-4 py-3 fw-bold text-decoration-none shadow-sm"
              >
                Book Expert Consultation →
              </Link>
              <a
                href="#services"
                className="btn btn-outline-dark rounded-pill px-4 py-3 fw-semibold"
              >
                Explore Services
              </a>
            </div>
          </div>

          {/* Right Lead Capture Card */}
          <div className="col-lg-5">
            <div className="card shadow border-0 rounded-4 p-4 p-md-5 bg-white">
              <h4 className="fw-bold mb-1" style={{ color: "#0e3b43" }}>
                Book Your First Visit
              </h4>
              <p className="small text-muted mb-4">
                Schedule a one-on-one specialist skin assessment session.
              </p>

              <form onSubmit={handleQuickSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Full Name</label>
                  <input
                    type="text"
                    className="form-control rounded-3 py-2"
                    placeholder="e.g. Neha Sharma"
                    required
                    value={quickForm.name}
                    onChange={(e) =>
                      setQuickForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control rounded-3 py-2"
                    placeholder="10-digit mobile number"
                    required
                    value={quickForm.phone}
                    onChange={(e) =>
                      setQuickForm((prev) => ({ ...prev, phone: e.target.value }))
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-bold">Primary Skin/Hair Concern</label>
                  <select
                    className="form-select rounded-3 py-2"
                    value={quickForm.concern}
                    onChange={(e) =>
                      setQuickForm((prev) => ({ ...prev, concern: e.target.value }))
                    }
                  >
                    <option value="Acne & Scars">Acne, Pores & Scars</option>
                    <option value="Pigmentation & Melasma">Pigmentation & Dark Spots</option>
                    <option value="Laser Hair Reduction">Laser Hair Reduction</option>
                    <option value="Hair Fall & Scalp PRP">Hair Fall & Scalp PRP</option>
                    <option value="Anti-Ageing & Glow">Anti-Ageing & Clinical Peels</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-3 shadow-sm rounded-pill fw-bold"
                >
                  Schedule Appointment →
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;