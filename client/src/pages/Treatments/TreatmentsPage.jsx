import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";

const TreatmentsPage = () => {
  const [patientId, setPatientId] = useState("");
  const [treatmentType, setTreatmentType] = useState("Acne Scar Laser");
  const [diagnosis, setDiagnosis] = useState("");
  const [beforeFiles, setBeforeFiles] = useState([]);
  const [afterFiles, setAfterFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("patient", patientId);
    formData.append("treatmentType", treatmentType);
    formData.append("diagnosis", diagnosis);

    for (let i = 0; i < beforeFiles.length; i++) {
      formData.append("beforeImages", beforeFiles[i]);
    }
    for (let i = 0; i < afterFiles.length; i++) {
      formData.append("afterImages", afterFiles[i]);
    }

    try {
      await API.post("/treatments", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Treatment record with Before/After images uploaded successfully! ✅");
    } catch (err) {
      setMessage("Upload failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🔬 Treatment Tracking & Before/After Image Analysis</h2>
        <Link to="/dashboard" className="btn btn-outline-secondary">← Back to Dashboard</Link>
      </div>

      {message && <div className="alert alert-info">{message}</div>}

      <div className="card shadow-sm p-4">
        <form onSubmit={handleSubmit}>
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label">Patient MongoDB ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Patient ID"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Treatment Type</label>
              <select className="form-select" value={treatmentType} onChange={(e) => setTreatmentType(e.target.value)}>
                <option value="Acne Scar Laser">Acne Scar Laser</option>
                <option value="Hair PRP Therapy">Hair PRP Therapy</option>
                <option value="Chemical Peel">Chemical Peel</option>
                <option value="Hair Transplant Followup">Hair Transplant Followup</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Clinical Diagnosis & Notes</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Clinical observations and progress details..."
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label">📸 Before Treatment Images</label>
              <input
                type="file"
                multiple
                className="form-control"
                onChange={(e) => setBeforeFiles(e.target.files)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">📸 After Treatment Images</label>
              <input
                type="file"
                multiple
                className="form-control"
                onChange={(e) => setAfterFiles(e.target.files)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Uploading to Cloudinary & Saving..." : "Save Treatment Session"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TreatmentsPage;