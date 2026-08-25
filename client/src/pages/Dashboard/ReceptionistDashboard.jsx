import React, { useState } from "react";

const ReceptionistDashboard = () => {
  const [patients, setPatients] = useState([
    { id: "P-801", name: "Ananya Deshmukh", phone: "9820192831", service: "Hydra Laser Glow", doctor: "Dr. Aditi Rao", bill: "₹4,500", status: "Paid" },
    { id: "P-802", name: "Rohan Varma", phone: "9123849201", service: "Scalp PRP Session #2", doctor: "Dr. Kabir Roy", bill: "₹6,000", status: "Pending" },
    { id: "P-803", name: "Pooja Hegde", phone: "9730198421", service: "TCA Cross Acne Peel", doctor: "Dr. Aditi Rao", bill: "₹3,200", status: "Paid" },
  ]);

  const [walkIn, setWalkIn] = useState({ name: "", phone: "", service: "Acne Consultation", doctor: "Dr. Aditi Rao" });

  const handleWalkInSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: `P-${Math.floor(100 + Math.random() * 900)}`,
      name: walkIn.name,
      phone: walkIn.phone,
      service: walkIn.service,
      doctor: walkIn.doctor,
      bill: "₹1,500",
      status: "In Queue",
    };
    setPatients([newEntry, ...patients]);
    setWalkIn({ name: "", phone: "", service: "Acne Consultation", doctor: "Dr. Aditi Rao" });
  };

  return (
    <div>
      {/* Metric Counters */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="kpi-stat-card">
            <div className="small text-muted fw-bold">TODAY'S REGISTRATIONS</div>
            <h3 className="fw-bold text-dark mb-0">24 Patients</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-stat-card">
            <div className="small text-muted fw-bold">DOCTORS IN CLINIC</div>
            <h3 className="fw-bold text-success mb-0">3 Specialists</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-stat-card">
            <div className="small text-muted fw-bold">POS SETTLEMENTS</div>
            <h3 className="fw-bold text-dark mb-0">₹68,500</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-stat-card">
            <div className="small text-muted fw-bold">WAITING LOUNGE</div>
            <h3 className="fw-bold text-primary mb-0">4 Active</h3>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Quick Walk-In Patient Registration Form */}
        <div className="col-lg-4">
          <div className="clinic-card">
            <h5 className="fw-bold text-dark mb-1">Quick Walk-In Check-In</h5>
            <p className="small text-muted mb-3">Onboard desk patients instantly to the doctor queue.</p>

            <form onSubmit={handleWalkInSubmit}>
              <div className="mb-2">
                <label className="form-label small fw-bold">Patient Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm rounded-3"
                  placeholder="Full name"
                  required
                  value={walkIn.name}
                  onChange={(e) => setWalkIn({ ...walkIn, name: e.target.value })}
                />
              </div>

              <div className="mb-2">
                <label className="form-label small fw-bold">Phone Number</label>
                <input
                  type="tel"
                  className="form-control form-control-sm rounded-3"
                  placeholder="10-digit number"
                  required
                  value={walkIn.phone}
                  onChange={(e) => setWalkIn({ ...walkIn, phone: e.target.value })}
                />
              </div>

              <div className="mb-2">
                <label className="form-label small fw-bold">Requested Service</label>
                <select
                  className="form-select form-select-sm rounded-3"
                  value={walkIn.service}
                  onChange={(e) => setWalkIn({ ...walkIn, service: e.target.value })}
                >
                  <option value="Acne Consultation">Specialist Acne Consultation</option>
                  <option value="Laser Skin Toning">Laser Skin Toning Session</option>
                  <option value="Hydra Facial Glow">Clinical Hydra Glow Treatment</option>
                  <option value="Hair PRP Therapy">Hair Fall Scalp PRP</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">Assign Doctor</label>
                <select
                  className="form-select form-select-sm rounded-3"
                  value={walkIn.doctor}
                  onChange={(e) => setWalkIn({ ...walkIn, doctor: e.target.value })}
                >
                  <option value="Dr. Aditi Rao">Dr. Aditi Rao (Dermatologist)</option>
                  <option value="Dr. Kabir Roy">Dr. Kabir Roy (Trichologist)</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2 rounded-pill fw-bold shadow-sm">
                + Check-In to Doctor Queue
              </button>
            </form>
          </div>
        </div>

        {/* Live Patient Directory & Invoicing Table */}
        <div className="col-lg-8">
          <div className="clinic-card">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0 text-dark">Front Desk Clinical Roster & POS Invoices</h5>
              <button className="btn btn-sm btn-outline-secondary rounded-pill">Export Report</button>
            </div>

            <div className="table-responsive">
              <table className="table clinic-table mb-0">
                <thead>
                  <tr>
                    <th>Patient ID & Name</th>
                    <th>Procedure</th>
                    <th>Consultant</th>
                    <th>Billing</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div className="fw-bold text-dark">{p.name}</div>
                        <div className="small text-muted font-monospace">{p.id} • {p.phone}</div>
                      </td>
                      <td><span className="badge bg-light text-dark border">{p.service}</span></td>
                      <td className="small text-muted">{p.doctor}</td>
                      <td>
                        <div className="fw-bold text-dark">{p.bill}</div>
                        <span className={`badge ${p.status === "Paid" ? "bg-success-subtle text-success" : "bg-warning-subtle text-warning"} small`}>
                          {p.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary rounded-pill px-3">
                          Print Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;