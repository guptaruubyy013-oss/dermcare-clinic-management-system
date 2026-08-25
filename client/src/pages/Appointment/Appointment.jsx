import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import API from "../../api/axios";

const Appointment = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    phone: "",
    doctorName: "DR. NEHA YADAV",
    concern: "Acne Breakouts & Open Pores",
    date: new Date().toISOString().split("T")[0],
    timeSlot: "11:30 AM",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Auto-fill logged-in patient's verified account credentials
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        patientName: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const payload = {
        ...formData,
        patientName: user ? user.name : formData.patientName,
        email: user ? user.email : formData.email,
        phone: user?.phone ? user.phone : formData.phone,
        status: "Confirmed",
      };

      await API.post("/appointments", payload);
      setSuccessMsg("Consultation booked successfully! Redirecting to your dashboard...");
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Failed to book appointment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5" style={{ minHeight: "85vh", backgroundColor: "#f8f6f2" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
              
              {/* Header Title */}
              <div className="text-center mb-4">
                <span className="badge bg-warning text-dark rounded-pill px-3 py-1 fw-bold small mb-2 text-uppercase">
                  DermCare Clinical Appointment
                </span>
                <h3 className="fw-bold text-dark mb-1">Book Consultation</h3>
                <p className="text-muted small">
                  Schedule your consultation with our board-certified dermatologists.
                </p>
              </div>

              {/* Alert Messages */}
              {successMsg && (
                <div className="alert alert-success py-2 px-3 small rounded-3 mb-3">
                  {successMsg}
                </div>
              )}
              {errorMsg && (
                <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                
                {/* Auto-filled Patient Account Banner */}
                {user ? (
                  <div className="p-3 bg-light rounded-3 border mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted small text-uppercase fw-bold" style={{ fontSize: "0.7rem" }}>
                        Verified Patient Identity
                      </span>
                      <span className="badge bg-success rounded-pill px-2 py-1 small">Active Profile</span>
                    </div>
                    <h5 className="fw-bold text-dark mb-0 mt-1">👤 {user.name}</h5>
                    <div className="text-muted small mt-1">
                      <span>{user.email}</span> • <span>{user.phone || "Phone on file"}</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-3">
                      <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: "0.72rem" }}>
                        Patient Full Name
                      </label>
                      <input
                        type="text"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleChange}
                        placeholder="e.g. Priya Singh"
                        className="form-control rounded-3 py-2"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: "0.72rem" }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="priya@example.com"
                        className="form-control rounded-3 py-2"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: "0.72rem" }}>
                        Contact Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        className="form-control rounded-3 py-2"
                        required
                      />
                    </div>
                  </>
                )}

                {/* Primary Concern */}
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: "0.72rem" }}>
                    Primary Skin / Hair Concern
                  </label>
                  <select
                    name="concern"
                    value={formData.concern}
                    onChange={handleChange}
                    className="form-select rounded-3 py-2"
                  >
                    <option value="Acne Breakouts & Open Pores">Acne Breakouts & Open Pores</option>
                    <option value="Dandruff & Scalp Itch">Dandruff & Scalp Itch</option>
                    <option value="Melasma & Dark Spots">Melasma & Dark Spots</option>
                    <option value="Excessive Hair Fall & PRP">Excessive Hair Fall & PRP</option>
                    <option value="Laser Hair Reduction">Laser Hair Reduction</option>
                    <option value="Anti-Ageing & Fine Lines">Anti-Ageing & Fine Lines</option>
                  </select>
                </div>

                {/* Specialist Doctor */}
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: "0.72rem" }}>
                    Select Specialist Doctor
                  </label>
                  <select
                    name="doctorName"
                    value={formData.doctorName}
                    onChange={handleChange}
                    className="form-select rounded-3 py-2"
                  >
                    <option value="DR. NEHA YADAV">DR. NEHA YADAV (Aesthetic Dermatology)</option>
                    <option value="DR. ANKIT PANDEY">DR. ANKIT PANDEY (Clinical Dermatology)</option>
                    <option value="DR. PRIYA SHARMA">DR. PRIYA SHARMA (Trichology & Scalp Health)</option>
                  </select>
                </div>

                {/* Date & Time Slot */}
                <div className="row g-2 mb-4">
                  <div className="col-6">
                    <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: "0.72rem" }}>
                      Appointment Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="form-control rounded-3 py-2"
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: "0.72rem" }}>
                      Preferred Slot
                    </label>
                    <select
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleChange}
                      className="form-select rounded-3 py-2"
                    >
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="04:30 PM">04:30 PM</option>
                      <option value="06:00 PM">06:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn w-100 py-2 rounded-pill fw-bold text-white shadow-sm"
                  style={{ backgroundColor: "#0b2e2b" }}
                >
                  {loading ? "Confirming Consultation Slot..." : "Confirm & Book Slot →"}
                </button>
              </form>

              {!user && (
                <div className="text-center mt-3 small text-muted">
                  Already have an account?{" "}
                  <Link to="/login" className="fw-bold text-dark text-decoration-none">
                    Log In to Auto-Fill
                  </Link>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;