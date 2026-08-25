import React from "react";

const AdminDashboard = () => {
  return (
    <div>
      {/* Executive KPI Row */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="kpi-stat-card">
            <div className="small text-muted fw-bold">TOTAL MONTHLY REVENUE</div>
            <h3 className="fw-bold text-dark mb-1">₹8,42,000</h3>
            <span className="text-success small fw-bold">↑ 18.4% vs last month</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-stat-card">
            <div className="small text-muted fw-bold">TOTAL PATIENTS TREATED</div>
            <h3 className="fw-bold text-dark mb-1">1,240</h3>
            <span className="text-primary small fw-bold">94% Retention Rate</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-stat-card">
            <div className="small text-muted fw-bold">ACTIVE CLINICIANS</div>
            <h3 className="fw-bold text-dark mb-1">8 Doctors</h3>
            <span className="text-muted small">2 On Leave</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-stat-card">
            <div className="small text-muted fw-bold">AVG. RATING (GOOGLE)</div>
            <h3 className="fw-bold text-dark mb-1">4.9 ★</h3>
            <span className="text-success small fw-bold">340+ Verified Reviews</span>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Procedure Revenue Breakdown */}
        <div className="col-lg-6">
          <div className="clinic-card h-100">
            <h5 className="fw-bold text-dark mb-3">Top Revenue Treatments (This Month)</h5>
            
            <div className="d-flex flex-column gap-3">
              <div>
                <div className="d-flex justify-content-between small fw-bold mb-1">
                  <span>US-FDA Laser Hair Reduction</span>
                  <span>₹3,40,000 (40%)</span>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div className="progress-bar bg-primary" style={{ width: "40%" }}></div>
                </div>
              </div>

              <div>
                <div className="d-flex justify-content-between small fw-bold mb-1">
                  <span>Acne Scar Subcision & TCA Cross</span>
                  <span>₹2,10,000 (25%)</span>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div className="progress-bar bg-success" style={{ width: "25%" }}></div>
                </div>
              </div>

              <div>
                <div className="d-flex justify-content-between small fw-bold mb-1">
                  <span>Scalp Growth Factor (GFC) PRP</span>
                  <span>₹1,85,000 (22%)</span>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div className="progress-bar bg-warning" style={{ width: "22%" }}></div>
                </div>
              </div>

              <div>
                <div className="d-flex justify-content-between small fw-bold mb-1">
                  <span>Chemical Peels & Hydra Glow</span>
                  <span>₹1,07,000 (13%)</span>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div className="progress-bar bg-info" style={{ width: "13%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Staff Performance & Roster Management */}
        <div className="col-lg-6">
          <div className="clinic-card h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold text-dark mb-0">Clinician Performance</h5>
              <button className="btn btn-sm btn-outline-primary rounded-pill">+ Onboard Doctor</button>
            </div>

            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3">
                <div>
                  <div className="fw-bold text-dark">Dr. Aditi Rao</div>
                  <div className="small text-muted">Senior Cosmetic Dermatologist</div>
                </div>
                <div className="text-end">
                  <div className="fw-bold text-success">142 Consultations</div>
                  <span className="badge bg-white border text-dark small">4.9 ★ Rating</span>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3">
                <div>
                  <div className="fw-bold text-dark">Dr. Kabir Roy</div>
                  <div className="small text-muted">Trichologist & Hair Transplant Specialist</div>
                </div>
                <div className="text-end">
                  <div className="fw-bold text-success">98 Consultations</div>
                  <span className="badge bg-white border text-dark small">4.8 ★ Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;