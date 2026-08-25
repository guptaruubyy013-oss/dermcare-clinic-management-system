import React from "react";
import { useLocation, Link, useSearchParams } from "react-router-dom";

const ThankYou = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Extract booking metadata if passed via state or query params
  const bookingData = location.state || {};
  const submitID =
    searchParams.get("submitID") ||
    bookingData.referenceId ||
    `DC-${Math.floor(1000000 + Math.random() * 9000000)}`;

  return (
    <div className="py-5" style={{ backgroundColor: "#f8fafb", minHeight: "85vh" }}>
      <div className="container py-lg-4">
        <div className="row justify-content-center">
          <div className="col-lg-7 text-center">
            {/* Confirmation Card */}
            <div className="card shadow-sm border-0 rounded-4 p-4 p-md-5 bg-white">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#eaf7ee",
                  color: "#198754",
                  fontSize: "2.5rem",
                }}
              >
                ✓
              </div>

              <span className="badge bg-light text-success border px-3 py-2 rounded-pill fw-semibold mx-auto mb-3">
                Booking Request Confirmed
              </span>

              <h2 className="fw-bold mb-2" style={{ color: "#0e3b43" }}>
                Thank You for Choosing DermCare!
              </h2>
              <p className="text-muted mb-4">
                We have received your appointment request. Our clinical front desk team will call you shortly to confirm your consultation schedule.
              </p>

              {/* Reference ID Pill */}
              <div className="bg-light border rounded-3 p-3 mb-4 text-start">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="text-muted small">Appointment Reference ID:</span>
                  <span className="badge bg-dark font-monospace">{submitID}</span>
                </div>
                {bookingData.appointmentDate && (
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="text-muted small">Preferred Date:</span>
                    <span className="fw-bold small text-dark">{bookingData.appointmentDate}</span>
                  </div>
                )}
                {bookingData.timeSlot && (
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted small">Time Slot:</span>
                    <span className="fw-bold small text-dark">{bookingData.timeSlot}</span>
                  </div>
                )}
              </div>

              {/* Clinic Care Guidelines / Next Steps */}
              <div className="text-start border-top pt-4 mb-4">
                <h6 className="fw-bold text-dark mb-3">What happens next?</h6>
                <div className="d-flex gap-3 mb-2">
                  <span className="text-primary fw-bold">1.</span>
                  <p className="small text-muted mb-0">
                    A clinical coordinator will reach out to confirm your doctor availability.
                  </p>
                </div>
                <div className="d-flex gap-3 mb-2">
                  <span className="text-primary fw-bold">2.</span>
                  <p className="small text-muted mb-0">
                    You'll receive an SMS/WhatsApp confirmation with map directions and clinic guidelines.
                  </p>
                </div>
                <div className="d-flex gap-3">
                  <span className="text-primary fw-bold">3.</span>
                  <p className="small text-muted mb-0">
                    Arrive 10 minutes prior to your slot for initial skin analysis and profile onboarding.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                <Link to="/dashboard" className="btn btn-primary rounded-pill px-4 py-2 fw-semibold">
                  Go to Patient Portal
                </Link>
                <Link to="/" className="btn btn-outline-secondary rounded-pill px-4 py-2 fw-semibold">
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;