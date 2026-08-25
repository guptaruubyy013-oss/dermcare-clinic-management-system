import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const roles = [
  { id: "patient", label: "Patient", icon: "👤", desc: "View records, book visits & photos" },
  { id: "doctor", label: "Doctor", icon: "🩺", desc: "Clinical queues, E-Rx & diagnosis" },
  { id: "receptionist", label: "Front Desk", icon: "📋", desc: "Registrations & billing pos" },
  { id: "admin", label: "Clinic Admin", icon: "🛡️", desc: "Staff onboarding & revenue KPIs" },
];

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("patient");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(formData.email, formData.password, selectedRole);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid credentials. Please verify your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-xl-7">
          <div className="card shadow border-0 rounded-4 p-4 p-md-5 bg-white">
            <div className="text-center mb-4">
              <span className="badge bg-light text-primary border px-3 py-2 rounded-pill fw-semibold mb-2">
                DermCare Portal Authentication
              </span>
              <h3 className="fw-bold text-dark">Sign In to Your Account</h3>
              <p className="text-muted small">Choose your role to access your personalized clinic workspace.</p>
            </div>

            {error && <div className="alert alert-danger py-2 small">{error}</div>}

            {/* Role Selection Cards */}
            <label className="form-label fw-bold small text-secondary">Select Your Portal Role</label>
            <div className="row g-2 mb-4">
              {roles.map((r) => {
                const isSelected = selectedRole === r.id;
                return (
                  <div key={r.id} className="col-6 col-md-3">
                    <div
                      onClick={() => setSelectedRole(r.id)}
                      className={`p-3 text-center rounded-3 border h-100 cursor-pointer transition-all ${
                        isSelected
                          ? "border-primary bg-primary bg-opacity-10 shadow-sm"
                          : "bg-light border-light-subtle text-muted"
                      }`}
                      style={{ cursor: "pointer", transition: "0.2s ease" }}
                    >
                      <div className="fs-3 mb-1">{r.icon}</div>
                      <div className={`fw-bold small ${isSelected ? "text-primary" : "text-dark"}`}>
                        {r.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold small">Email Address</label>
                <input
                  type="email"
                  className="form-control py-2 rounded-3"
                  placeholder={`Enter your ${selectedRole} email`}
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold small">Password</label>
                <input
                  type="password"
                  className="form-control py-2 rounded-3"
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-bold rounded-3 shadow-sm"
                disabled={loading}
              >
                {loading ? "Authenticating..." : `Sign In as ${roles.find((r) => r.id === selectedRole)?.label}`}
              </button>
            </form>

            <div className="text-center mt-4 pt-3 border-top">
              <span className="small text-muted">Don't have a patient account yet? </span>
              <Link to="/register" className="small fw-bold text-decoration-none">
                Register Here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;