import React, { useState, useEffect } from "react";
import API from "../../api/axios";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("queue");
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Clinical Consultation Form
  const [rxForm, setRxForm] = useState({
    diagnosis: "",
    treatmentType: "Chemical Peel & Laser Toning",
    procedureNotes: "",
    medicines: [{ medicineName: "Clindamycin Gel 1%", dosage: "Once at night", duration: "14 Days" }],
  });

  useEffect(() => {
    const loadQueue = async () => {
      try {
        const { data } = await API.get("/appointments");
        setAppointments(data.appointments || []);
      } catch {
        setAppointments([
          { _id: "1", patientName: "Aarav Mehta", concern: "Acne Vulgaris & Scarring", timeSlot: "10:00 AM - 11:00 AM", status: "confirmed" },
          { _id: "2", patientName: "Simran Kaur", concern: "Hyperpigmentation (Melasma)", timeSlot: "11:00 AM - 12:00 PM", status: "in-consultation" },
        ]);
      }
    };
    loadQueue();
  }, []);

  const addMedRow = () => {
    setRxForm({
      ...rxForm,
      medicines: [...rxForm.medicines, { medicineName: "", dosage: "", duration: "" }],
    });
  };

  return (
    <div>
      {/* Metrics Row */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="kpi-stat-card d-flex align-items-center gap-3">
            <div className="kpi-stat-icon" style={{ background: "#e8f4f5", color: "#0e3b43" }}>🩺</div>
            <div>
              <div className="small text-muted fw-bold text-uppercase">Today's Patient Queue</div>
              <h3 className="fw-bold mb-0 text-dark">{appointments.length} Consultations</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="kpi-stat-card d-flex align-items-center gap-3">
            <div className="kpi-stat-icon" style={{ background: "#fbf3ea", color: "#c5a880" }}>📸</div>
            <div>
              <div className="small text-muted fw-bold text-uppercase">Photo Comparisons</div>
              <h3 className="fw-bold mb-0 text-dark">12 Active Cases</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="kpi-stat-card d-flex align-items-center gap-3">
            <div className="kpi-stat-icon" style={{ background: "#eaf7ee", color: "#198754" }}>✅</div>
            <div>
              <div className="small text-muted fw-bold text-uppercase">Procedures Completed</div>
              <h3 className="fw-bold mb-0 text-dark">8 Sessions</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Left: Patient Queue List */}
        <div className="col-lg-5">
          <div className="clinic-card h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0" style={{ color: "var(--derm-teal)" }}>Today's Clinical Queue</h5>
              <span className="badge bg-light text-dark border">Live Feed</span>
            </div>

            <div className="d-flex flex-column gap-3">
              {appointments.map((item) => (
                <div
                  key={item._id}
                  onClick={() => setSelectedPatient(item)}
                  className={`p-3 rounded-4 border cursor-pointer ${
                    selectedPatient?._id === item._id ? "border-primary bg-primary bg-opacity-10" : "bg-light"
                  }`}
                  style={{ cursor: "pointer", transition: "0.2s ease" }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <h6 className="fw-bold mb-0 text-dark">{item.patientName || "Walk-In Patient"}</h6>
                    <span className="badge bg-secondary-subtle text-secondary small">{item.timeSlot}</span>
                  </div>
                  <p className="small text-muted mb-2">Concern: <strong>{item.concern}</strong></p>
                  <button className="btn btn-sm btn-outline-primary rounded-pill px-3">
                    Open Consultation Room →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: E-Prescription & Treatment Logger */}
        <div className="col-lg-7">
          <div className="clinic-card">
            <div className="border-bottom pb-3 mb-3">
              <span className="badge bg-light text-primary border rounded-pill mb-1">E-Prescription & Clinical Notes</span>
              <h5 className="fw-bold mb-0 text-dark">
                {selectedPatient ? `Consulting: ${selectedPatient.patientName}` : "Select a Patient from Queue"}
              </h5>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert("Prescription and Clinical Timeline Updated!"); }}>
              <div className="mb-3">
                <label className="form-label small fw-bold">Primary Diagnosis</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  placeholder="e.g. Grade 2 Comedonal Acne with Post-Inflammatory Erythema"
                  value={rxForm.diagnosis}
                  onChange={(e) => setRxForm({ ...rxForm, diagnosis: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">Prescribed Procedure / Treatment Type</label>
                <select
                  className="form-select rounded-3"
                  value={rxForm.treatmentType}
                  onChange={(e) => setRxForm({ ...rxForm, treatmentType: e.target.value })}
                >
                  <option value="Salicylic Acid Clinical Peel">Salicylic Acid 20% Chemical Peel</option>
                  <option value="Q-Switched Nd:YAG Laser">Q-Switched Nd:YAG Laser Toning</option>
                  <option value="Scalp GFC / PRP Therapy">Scalp Growth Factor (GFC) PRP</option>
                  <option value="Hydra-Dermabrasion Facial">Medical Hydra-Facial Deep Cleanse</option>
                </select>
              </div>

              {/* Medicine Prescription Table */}
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="form-label small fw-bold mb-0">Medications & Regimen</label>
                  <button type="button" onClick={addMedRow} className="btn btn-sm btn-light border rounded-pill">
                    + Add Drug
                  </button>
                </div>
                {rxForm.medicines.map((med, idx) => (
                  <div key={idx} className="row g-2 mb-2">
                    <div className="col-5">
                      <input
                        type="text"
                        className="form-control form-control-sm rounded-2"
                        placeholder="Medicine name"
                        value={med.medicineName}
                        onChange={(e) => {
                          const updated = [...rxForm.medicines];
                          updated[idx].medicineName = e.target.value;
                          setRxForm({ ...rxForm, medicines: updated });
                        }}
                      />
                    </div>
                    <div className="col-4">
                      <input
                        type="text"
                        className="form-control form-control-sm rounded-2"
                        placeholder="Dosage (e.g. 1-0-1)"
                        value={med.dosage}
                        onChange={(e) => {
                          const updated = [...rxForm.medicines];
                          updated[idx].dosage = e.target.value;
                          setRxForm({ ...rxForm, medicines: updated });
                        }}
                      />
                    </div>
                    <div className="col-3">
                      <input
                        type="text"
                        className="form-control form-control-sm rounded-2"
                        placeholder="Duration"
                        value={med.duration}
                        onChange={(e) => {
                          const updated = [...rxForm.medicines];
                          updated[idx].duration = e.target.value;
                          setRxForm({ ...rxForm, medicines: updated });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold">Doctor's Clinical Instructions</label>
                <textarea
                  className="form-control rounded-3"
                  rows="2"
                  placeholder="Strictly apply mineral SPF 50 every 3 hours. Avoid direct active sun exposure for 48h."
                  value={rxForm.procedureNotes}
                  onChange={(e) => setRxForm({ ...rxForm, procedureNotes: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2 rounded-pill fw-bold">
                Save & Issue Clinical E-Rx →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;