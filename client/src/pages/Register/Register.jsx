import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "receptionist",
    qualification: "MD- DERMATOLOGIST",
    specialty: "Clinical Dermatology & Acne",
    consultationFee: "₹900",
    shift: "Morning (9:00 AM - 5:00 PM)",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      setErrorMsg("Please complete all required fields (Name, Phone, Email, Password).");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/auth/register", formData);
      if (res.data && res.data.token) {
        login(res.data.user, res.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5" style={{ minHeight: "85vh", backgroundColor: "#f8f6f2" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
              
              <div className="text-center mb-4">
                <span className="badge bg-warning text-dark rounded-pill px-3 py-1 fw-bold small mb-2">
                  DermCare Portal Access
                </span>
                <h3 className="fw-bold text-dark mb-1">Create an Account</h3>
                <p className="text-muted small">
                  Register as a Patient, Dermatologist, Receptionist, or Administrator.
                </p>
              </div>

              {errorMsg && (
                <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Role Switcher */}
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: "0.72rem" }}>
                    Select Account Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="form-select rounded-3 py-2 fw-semibold"
                  >
                    <option value="receptionist">Receptionist / Front Desk Staff</option>
                    <option value="doctor">Doctor / Dermatologist Specialist</option>
                    <option value="patient">Patient (Skin / Hair Care)</option>
                    <option value="admin">Clinic Administrator</option>
                  </select>
                </div>

                {/* Name */}
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: "0.72rem" }}>
                    {formData.role === "doctor"
                      ? "Doctor Full Name (with Title)"
                      : formData.role === "receptionist"
                      ? "Staff / Receptionist Name"
                      : "Full Name"}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={
                      formData.role === "doctor"
                        ? "DR. ANKIT PANDEY"
                        : formData.role === "receptionist"
                        ? "e.g. Pooja Sharma (Front Desk)"
                        : "e.g. Neha Verma"
                    }
                    className="form-control rounded-3 py-2"
                    required
                  />
                </div>

                {/* Phone Contact */}
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: "0.72rem" }}>
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number (e.g. 9876543210)"
                    className="form-control rounded-3 py-2"
                    required
                  />
                </div>

                {/* Receptionist Shift Field */}
                {formData.role === "receptionist" && (
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: "0.72rem" }}>
                      Front Desk Shift
                    </label>
                    <select
                      name="shift"
                      value={formData.shift}
                      onChange={handleChange}
                      className="form-select rounded-3 py-2 small"
                    >
                      <option value="Morning (9:00 AM - 5:00 PM)">Morning (9:00 AM - 5:00 PM)</option>
                      <option value="Evening (1:00 PM - 9:00 PM)">Evening (1:00 PM - 9:00 PM)</option>
                      <option value="Full Day (9:00 AM - 8:00 PM)">Full Day (9:00 AM - 8:00 PM)</option>
                    </select>
                  </div>
                )}

                {/* Doctor-Specific Fields */}
                {formData.role === "doctor" && (
                  <>
                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: "0.7rem" }}>
                          Qualification
                        </label>
                        <input
                          type="text"
                          name="qualification"
                          value={formData.qualification}
                          onChange={handleChange}
                          placeholder="MD- DERMATOLOGIST"
                          className="form-control rounded-3 py-2 small"
                          required
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: "0.7rem" }}>
                          Fee
                        </label>
                        <input
                          type="text"
                          name="consultationFee"
                          value={formData.consultationFee}
                          onChange={handleChange}
                          placeholder="₹900"
                          className="form-control rounded-3 py-2 small"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: "0.72rem" }}>
                        Primary Specialty
                      </label>
                      <select
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        className="form-select rounded-3 py-2 small"
                      >
                        <option value="Clinical Dermatology & Acne">Clinical Dermatology & Acne</option>
                        <option value="Advanced Hair Restoration & PRP">Advanced Hair Restoration & PRP</option>
                        <option value="Lasers, Melasma & Anti-Ageing">Lasers, Melasma & Anti-Ageing</option>
                        <option value="Trichology & Scalp Health">Trichology & Scalp Health</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: "0.72rem" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="staff@dermcare.com"
                    className="form-control rounded-3 py-2"
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: "0.72rem" }}>
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="form-control rounded-3 py-2"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn w-100 py-2 rounded-pill fw-bold text-white shadow-sm"
                  style={{ backgroundColor: "#0b2e2b" }}
                >
                  {loading ? "Creating Account..." : `Register as ${formData.role.toUpperCase()} →`}
                </button>
              </form>

              <div className="text-center mt-4 small text-muted">
                Already have an account?{" "}
                <Link to="/login" className="fw-bold text-dark text-decoration-none">
                  Sign In
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;