import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import API from "../../api/axios";

// 1. Clinical In-Clinic Procedures
const CLINICAL_PROCEDURES = [
  { id: "proc-0", name: "None (Consultation Only)", price: 0 },
  { id: "proc-1", name: "Salicylic & Glycolic Acne Chemical Peel", price: 1500 },
  { id: "proc-2", name: "Q-Switched Nd:YAG Laser Melasma Toning", price: 3500 },
  { id: "proc-3", name: "Medical Hydra-Vortex Dermabrasion", price: 2800 },
  { id: "proc-4", name: "Diode Laser Hair Reduction (Face/Underarms)", price: 2200 },
  { id: "proc-5", name: "Autologous Platelet PRP / GFC Scalp Therapy", price: 6500 },
  { id: "proc-6", name: "CO2 Fractional Laser for Acne Scar Resurfacing", price: 4500 },
];

// 2. Prescribable Formulations & Hampers Categorized
const CLINICAL_PRODUCTS = [
  // SKIN CARE
  { id: "skin-1", category: "skin", name: "DermCare Mattifying Gel Sunscreen SPF 50", price: 650 },
  { id: "skin-2", category: "skin", name: "Niacinamide 10% + Zinc Blemish Serum", price: 599 },
  { id: "skin-3", category: "skin", name: "Salicylic 2% Foaming Skin Cleanser", price: 480 },
  { id: "skin-4", category: "skin", name: "Ceramide + Hyaluronic Barrier Repair Cream", price: 750 },
  { id: "skin-5", category: "skin", name: "Azelaic Acid 10% Anti-Pigmentation Gel", price: 550 },
  { id: "skin-6", category: "skin", name: "Retinol 0.3% Night Rejuvenation Elixir", price: 899 },

  // HAIR CARE
  { id: "hair-1", category: "hair", name: "Redensyl + Procapil Follicle Scalp Tonic", price: 950 },
  { id: "hair-2", category: "hair", name: "Anti-Dandruff Ketoconazole 2% Scalp Wash", price: 490 },
  { id: "hair-3", category: "hair", name: "Anagain Dense Hair Growth Serum", price: 1100 },
  { id: "hair-4", category: "hair", name: "Biotin & Keratin Nourishing Hair Mask", price: 650 },
  { id: "hair-5", category: "hair", name: "Peptide Scalp Revitalizing Mist", price: 580 },

  // HAMPERS / COMPLETE CLINICAL KITS
  {
    id: "hamper-1",
    category: "hamper",
    name: "🎁 Complete Acne Clear Regimen Hamper (Cleanser + Serum + SPF 50)",
    price: 1550,
    bundledIds: ["skin-1", "skin-2", "skin-3"],
  },
  {
    id: "hamper-2",
    category: "hamper",
    name: "🎁 Advanced Hair Fall Defense Hamper (Scalp Tonic + Shampoo + Biotin)",
    price: 1890,
    bundledIds: ["hair-1", "hair-2", "hair-4"],
  },
  {
    id: "hamper-3",
    category: "hamper",
    name: "🎁 Melasma & Glow Clinical Hamper (Azelaic Gel + Ceramide + SPF 50)",
    price: 1750,
    bundledIds: ["skin-1", "skin-4", "skin-5"],
  },
];

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Normalize User Role
  const rawRole = (user?.role || "patient").toString().toLowerCase().trim();
  const userRole = ["admin", "doctor", "receptionist", "patient"].includes(rawRole)
    ? rawRole
    : "patient";

  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminTab, setAdminTab] = useState("appointments");

  // Category Filter States (for Modals & Panels)
  const [billingCategoryTab, setBillingCategoryTab] = useState("all");
  const [doctorCategoryTab, setDoctorCategoryTab] = useState("all");

  // Doctor Consultation Workspace State
  const [selectedPatientApt, setSelectedPatientApt] = useState(null);
  const [docPrescription, setDocPrescription] = useState({
    diagnosis: "",
    medicines: "",
    instructions: "Apply broad spectrum SPF 50 every 3 hours.",
    selectedProcedure: "proc-0",
    prescribedProductIds: [],
    beforeImage: "",
    afterImage: "",
  });

  // Receptionist / Admin Billing Modal State
  const [billingApt, setBillingApt] = useState(null);
  const [billingConfig, setBillingConfig] = useState({
    consultationFee: 900,
    selectedProcedureId: "proc-0",
    selectedProductIds: [],
    discountAmount: 0,
    paymentMethod: "UPI / QR Code",
  });

  // Walk-in Registration Modal
  const [showWalkinModal, setShowWalkinModal] = useState(false);
  const [walkinForm, setWalkinForm] = useState({
    patientName: "",
    phone: "",
    email: "",
    concern: "Acne Breakouts & Open Pores",
    doctorName: "DR. NEHA YADAV",
    timeSlot: "11:30 AM",
    date: new Date().toISOString().split("T")[0],
    consultationFee: 900,
  });

  // Fetch Dashboard Data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [aptRes, docRes] = await Promise.allSettled([
        API.get("/appointments"),
        API.get("/auth/doctors"),
      ]);

      if (aptRes.status === "fulfilled") {
        setAppointments(Array.isArray(aptRes.value.data) ? aptRes.value.data : []);
      }
      if (docRes.status === "fulfilled") {
        setDoctors(Array.isArray(docRes.value.data) ? docRes.value.data : []);
      }
    } catch (err) {
      console.warn("Dashboard sync warning:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  // Status Change Helper
  const handleStatusUpdate = async (aptId, newStatus, extraData = {}) => {
    try {
      await API.put(`/appointments/${aptId}`, { status: newStatus, ...extraData });
      setAppointments((prev) =>
        prev.map((a) => (a._id === aptId ? { ...a, status: newStatus, ...extraData } : a))
      );
    } catch (err) {
      alert("Failed to update status: " + err.message);
    }
  };

  // Open Billing Modal Preloaded with Doctor's Selection
  const handleOpenBilling = (apt) => {
    setBillingApt(apt);
    setBillingConfig({
      consultationFee: apt.consultationFee || 900,
      selectedProcedureId: apt.selectedProcedureId || "proc-0",
      selectedProductIds: apt.prescribedProductIds || [],
      discountAmount: 0,
      paymentMethod: "UPI / QR Code",
    });
  };

  // Product Selection Toggle (Supports Bundle/Hamper selection)
  const toggleProductSelection = (prod, targetState, setTargetState) => {
    const isCurrentlySelected = targetState.selectedProductIds.includes(prod.id);
    let updatedIds = [...targetState.selectedProductIds];

    if (prod.category === "hamper" && prod.bundledIds) {
      if (isCurrentlySelected) {
        updatedIds = updatedIds.filter((id) => id !== prod.id && !prod.bundledIds.includes(id));
      } else {
        updatedIds = Array.from(new Set([...updatedIds, prod.id, ...prod.bundledIds]));
      }
    } else {
      if (isCurrentlySelected) {
        updatedIds = updatedIds.filter((id) => id !== prod.id);
      } else {
        updatedIds.push(prod.id);
      }
    }

    setTargetState((prev) => ({ ...prev, selectedProductIds: updatedIds }));
  };

  // Live Billing Calculations
  const selectedProc =
    CLINICAL_PROCEDURES.find((p) => p.id === billingConfig.selectedProcedureId) ||
    CLINICAL_PROCEDURES[0];
  const selectedProds = CLINICAL_PRODUCTS.filter((p) =>
    billingConfig.selectedProductIds.includes(p.id)
  );
  const productsSubtotal = selectedProds.reduce((sum, item) => sum + item.price, 0);

  const subtotal =
    Number(billingConfig.consultationFee) +
    Number(selectedProc.price) +
    Number(productsSubtotal) -
    Number(billingConfig.discountAmount || 0);

  const gstTax = Math.round(subtotal * 0.18);
  const grandTotal = Math.max(0, subtotal + gstTax);

  // Finalize Billing & Check-Out
  const handleFinalizeBillAndCheckout = async () => {
    if (!billingApt) return;
    try {
      await handleStatusUpdate(billingApt._id, "Checked-Out", {
        paymentStatus: "Paid",
        consultationFee: Number(billingConfig.consultationFee),
        treatmentFee: selectedProc.price,
        procedureName: selectedProc.name,
        purchasedProducts: selectedProds.map((p) => `${p.name} (₹${p.price})`).join(", "),
        tax: gstTax,
        totalAmount: grandTotal,
        paymentMethod: billingConfig.paymentMethod,
      });

      alert(`Invoice ${billingApt.invoiceNumber || "INV-001"} processed for ₹${grandTotal.toLocaleString()}. Patient Checked-Out!`);
      setBillingApt(null);
      fetchDashboardData();
    } catch (err) {
      alert("Error finalizing bill: " + err.message);
    }
  };

  // Doctor: Save Case, Procedure, Categorized Products & Photos
  const handleDoctorSaveCase = async (e) => {
    e.preventDefault();
    if (!selectedPatientApt) return;

    try {
      const proc = CLINICAL_PROCEDURES.find((p) => p.id === docPrescription.selectedProcedure);
      const prods = CLINICAL_PRODUCTS.filter((p) =>
        docPrescription.prescribedProductIds.includes(p.id)
      );

      const payload = {
        diagnosis: docPrescription.diagnosis,
        prescription: `${docPrescription.diagnosis} | Rx: ${docPrescription.medicines} | Advice: ${docPrescription.instructions}`,
        selectedProcedureId: docPrescription.selectedProcedure,
        procedureName: proc?.name || "None",
        prescribedProductIds: docPrescription.prescribedProductIds,
        prescribedProductsText: prods.map((p) => `${p.name} (₹${p.price})`).join(", "),
        beforeImage: docPrescription.beforeImage,
        afterImage: docPrescription.afterImage,
        status: "Completed",
      };

      await API.put(`/appointments/${selectedPatientApt._id}`, payload);
      alert("Consultation, procedure, products, and progress photos recorded!");
      setSelectedPatientApt(null);
      fetchDashboardData();
    } catch (err) {
      alert("Failed to save consultation: " + err.message);
    }
  };

  // Walk-in Registration
  const handleWalkinSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/appointments", {
        ...walkinForm,
        status: "Checked-In",
      });
      alert("Walk-in patient registered and marked Checked-In!");
      setShowWalkinModal(false);
      fetchDashboardData();
    } catch (err) {
      alert("Registration failed: " + err.message);
    }
  };

  // Revenue & Stats
  const todayStr = new Date().toISOString().split("T")[0];
  const todayApts = appointments.filter((a) => a.date === todayStr);
  const completedApts = appointments.filter((a) => a.status === "Completed" || a.status === "Checked-Out");
  const totalRevenue = appointments
    .filter((a) => a.paymentStatus === "Paid")
    .reduce((sum, a) => sum + (Number(a.totalAmount) || 2832), 0);

  // Filtered Products for Billing Modal
  const filteredBillingProducts =
    billingCategoryTab === "all"
      ? CLINICAL_PRODUCTS
      : CLINICAL_PRODUCTS.filter((p) => p.category === billingCategoryTab);

  // Filtered Products for Doctor Workspace
  const filteredDoctorProducts =
    doctorCategoryTab === "all"
      ? CLINICAL_PRODUCTS
      : CLINICAL_PRODUCTS.filter((p) => p.category === doctorCategoryTab);

  return (
    <div className="py-4" style={{ minHeight: "90vh", backgroundColor: "#f8f6f2" }}>
      <div className="container">

        {/* 1. Workspace Header Banner */}
        <div
          className="p-4 p-md-5 rounded-4 text-white shadow-sm mb-4"
          style={{ background: "linear-gradient(135deg, #0b2e2b 0%, #17534d 100%)" }}
        >
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div>
              <span className="badge bg-warning text-dark px-3 py-1 rounded-pill fw-bold small mb-2 text-uppercase">
                {userRole === "admin" && "🛡️ Administrator Module"}
                {userRole === "receptionist" && "💼 Receptionist Front Desk"}
                {userRole === "doctor" && "🩺 Doctor Consultation Module"}
                {userRole === "patient" && "👤 Patient Treatment Portal"}
              </span>
              <h2 className="fw-bold mb-1">Welcome Back, {user?.name || "Staff"}</h2>
              <p className="text-white-50 small mb-0">
                {user?.email} • DermCare Integrated Clinical Operating System
              </p>
            </div>

            <div className="d-flex gap-2">
              <button onClick={fetchDashboardData} className="btn btn-sm btn-outline-light rounded-pill px-3">
                🔄 Refresh Queue
              </button>
              <Link to="/" className="btn btn-sm btn-outline-light rounded-pill px-3">
                Public Site
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="btn btn-sm btn-light rounded-pill px-3 fw-bold text-dark"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* =================================================================
            2. ADMINISTRATOR DASHBOARD
        ================================================================== */}
        {userRole === "admin" && (
          <div>
            <div className="row g-3 mb-4">
              <div className="col-md-3">
                <div className="bg-white p-4 rounded-4 shadow-sm border">
                  <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: "0.7rem" }}>
                    Total Realized Revenue
                  </span>
                  <h3 className="fw-bold text-success mb-0 mt-1">₹{totalRevenue.toLocaleString()}</h3>
                  <small className="text-muted">{completedApts.length} Completed Consultations</small>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bg-white p-4 rounded-4 shadow-sm border">
                  <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: "0.7rem" }}>
                    Appointments Registry
                  </span>
                  <h3 className="fw-bold text-dark mb-0 mt-1">{appointments.length} Total</h3>
                  <small className="text-primary">{todayApts.length} Scheduled Today</small>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bg-white p-4 rounded-4 shadow-sm border">
                  <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: "0.7rem" }}>
                    Specialist Doctors
                  </span>
                  <h3 className="fw-bold text-dark mb-0 mt-1">{doctors.length || 3} Active</h3>
                  <small className="text-muted">Dermatology & Trichology</small>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bg-white p-4 rounded-4 shadow-sm border">
                  <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: "0.7rem" }}>
                    System Status
                  </span>
                  <h3 className="fw-bold text-dark mb-0 mt-1">100% Operational</h3>
                  <small className="text-success">MongoDB Atlas Synced</small>
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4 pb-2 border-bottom">
                <div>
                  <h5 className="fw-bold text-dark mb-1">Administrative Oversight & Master Billing</h5>
                  <p className="text-muted small mb-0">Oversee all bookings, adjust invoices, and audit products & procedures.</p>
                </div>
                <div className="btn-group btn-group-sm">
                  <button
                    onClick={() => setAdminTab("appointments")}
                    className={`btn ${adminTab === "appointments" ? "btn-dark" : "btn-outline-dark"}`}
                  >
                    Appointments ({appointments.length})
                  </button>
                  <button
                    onClick={() => setAdminTab("catalog")}
                    className={`btn ${adminTab === "catalog" ? "btn-dark" : "btn-outline-dark"}`}
                  >
                    Skin, Hair & Hamper Catalog
                  </button>
                </div>
              </div>

              {adminTab === "appointments" && (
                <div className="table-responsive">
                  <table className="table align-middle small">
                    <thead className="table-light">
                      <tr>
                        <th>Patient</th>
                        <th>Contact</th>
                        <th>Concern</th>
                        <th>Doctor</th>
                        <th>Date & Slot</th>
                        <th>Status</th>
                        <th>Master Billing Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((a) => (
                        <tr key={a._id}>
                          <td><strong>{a.patientName || a.name}</strong></td>
                          <td>{a.phone}</td>
                          <td><span className="badge bg-light text-dark border">{a.concern}</span></td>
                          <td>{a.doctorName}</td>
                          <td>{a.date} • {a.timeSlot}</td>
                          <td>
                            <span className={`badge ${
                              a.status === "Checked-Out" ? "bg-dark" :
                              a.status === "Completed" ? "bg-success" :
                              a.status === "In-Consultation" ? "bg-warning text-dark" : "bg-primary"
                            }`}>
                              {a.status}
                            </span>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button
                                onClick={() => handleOpenBilling(a)}
                                className="btn btn-outline-success py-0"
                              >
                                🧾 Bill / Add Products
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(a._id, "Cancelled")}
                                className="btn btn-outline-danger py-0"
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {adminTab === "catalog" && (
                <div className="row g-4">
                  <div className="col-md-5">
                    <h6 className="fw-bold text-dark border-bottom pb-2">Clinical Procedures</h6>
                    <ul className="list-group list-group-flush small">
                      {CLINICAL_PROCEDURES.map((p) => (
                        <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
                          <span>{p.name}</span>
                          <strong>₹{p.price.toLocaleString()}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-md-7">
                    <h6 className="fw-bold text-dark border-bottom pb-2">Skin, Hair & Hamper Formulations</h6>
                    <ul className="list-group list-group-flush small">
                      {CLINICAL_PRODUCTS.map((prod) => (
                        <li key={prod.id} className="list-group-item d-flex justify-content-between align-items-center">
                          <div>
                            <span className={`badge me-2 ${prod.category === "skin" ? "bg-info text-dark" : prod.category === "hair" ? "bg-warning text-dark" : "bg-success"}`}>
                              {prod.category.toUpperCase()}
                            </span>
                            <span>{prod.name}</span>
                          </div>
                          <strong>₹{prod.price.toLocaleString()}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =================================================================
            3. RECEPTIONIST DASHBOARD
        ================================================================== */}
        {userRole === "receptionist" && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h4 className="fw-bold text-dark mb-0">Reception Queue & Patient Intake</h4>
                <p className="text-muted small">Check in arrivals, assign specialists, and create categorized bills.</p>
              </div>
              <button onClick={() => setShowWalkinModal(true)} className="btn btn-success rounded-pill px-4 fw-bold shadow-sm">
                + Register Walk-In Patient
              </button>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
              <div className="table-responsive">
                <table className="table align-middle small">
                  <thead className="table-light">
                    <tr>
                      <th>Patient Name</th>
                      <th>Phone</th>
                      <th>Concern</th>
                      <th>Assigned Specialist</th>
                      <th>Time Slot</th>
                      <th>Status</th>
                      <th>Front Desk Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((a) => (
                      <tr key={a._id}>
                        <td><strong>{a.patientName || a.name}</strong></td>
                        <td>{a.phone}</td>
                        <td><span className="badge bg-light text-dark border">{a.concern}</span></td>
                        <td>{a.doctorName}</td>
                        <td>{a.date} at <strong>{a.timeSlot}</strong></td>
                        <td>
                          <span className={`badge ${
                            a.status === "Checked-In" ? "bg-info text-dark" :
                            a.status === "In-Consultation" ? "bg-warning text-dark" :
                            a.status === "Completed" ? "bg-success" :
                            a.status === "Checked-Out" ? "bg-dark" : "bg-primary"
                          }`}>
                            {a.status}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button
                              onClick={() => handleStatusUpdate(a._id, "Checked-In")}
                              className="btn btn-outline-primary"
                              disabled={a.status !== "Confirmed"}
                            >
                              Check-In
                            </button>
                            <button
                              onClick={() => handleOpenBilling(a)}
                              className="btn btn-outline-success fw-bold"
                            >
                              Billing & Exit 🧾
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
            4. DOCTOR WORKSPACE (With Skin/Hair/Hamper Categorized Checkboxes)
        ================================================================== */}
        {userRole === "doctor" && (
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <h5 className="fw-bold text-dark mb-3">Live Consultation Queue</h5>
                <div className="table-responsive">
                  <table className="table align-middle small">
                    <thead className="table-light">
                      <tr>
                        <th>Patient</th>
                        <th>Concern</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((a) => (
                        <tr key={a._id}>
                          <td>
                            <strong>{a.patientName || a.name}</strong>
                            <div className="text-muted" style={{ fontSize: "0.75rem" }}>{a.phone}</div>
                          </td>
                          <td><span className="badge bg-light text-dark border">{a.concern}</span></td>
                          <td>
                            <span className={`badge ${
                              a.status === "Completed" ? "bg-success" :
                              a.status === "Checked-Out" ? "bg-dark" :
                              a.status === "In-Consultation" ? "bg-warning text-dark" : "bg-primary"
                            }`}>
                              {a.status}
                            </span>
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                setSelectedPatientApt(a);
                                handleStatusUpdate(a._id, "In-Consultation");
                                setDocPrescription({
                                  diagnosis: a.diagnosis || "",
                                  medicines: a.prescription ? a.prescription.split("|")[1] || "" : "",
                                  instructions: "Apply sunscreen SPF 50 every 3 hours.",
                                  selectedProcedure: a.selectedProcedureId || "proc-0",
                                  prescribedProductIds: a.prescribedProductIds || [],
                                  beforeImage: a.beforeImage || "",
                                  afterImage: a.afterImage || "",
                                });
                              }}
                              className="btn btn-sm btn-dark rounded-pill px-3"
                            >
                              Consult ✍️
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Doctor Prescription & Categorized Product Selector */}
            <div className="col-lg-7">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <h5 className="fw-bold text-dark mb-2">Prescription, Procedure & Regimen Suite</h5>
                {selectedPatientApt ? (
                  <form onSubmit={handleDoctorSaveCase}>
                    <div className="p-3 bg-light rounded-3 mb-3 border">
                      <strong>Patient:</strong> {selectedPatientApt.patientName || selectedPatientApt.name} •{" "}
                      <span className="text-muted">{selectedPatientApt.phone}</span><br />
                      <strong>Chief Concern:</strong> {selectedPatientApt.concern}
                    </div>

                    <div className="mb-2">
                      <label className="small fw-bold">Clinical Diagnosis</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="e.g. Dandruff, Seborrheic Dermatitis / Acne"
                        required
                        value={docPrescription.diagnosis}
                        onChange={(e) => setDocPrescription({ ...docPrescription, diagnosis: e.target.value })}
                      />
                    </div>

                    <div className="mb-2">
                      <label className="small fw-bold">Prescribed Actives & Medicines</label>
                      <textarea
                        rows="2"
                        className="form-control form-control-sm"
                        placeholder="e.g. Ketoconazole Scalp Wash (AM), Follicle Peptide Tonic (PM)"
                        required
                        value={docPrescription.medicines}
                        onChange={(e) => setDocPrescription({ ...docPrescription, medicines: e.target.value })}
                      />
                    </div>

                    <div className="mb-2">
                      <label className="small fw-bold text-primary">Performed Procedure</label>
                      <select
                        className="form-select form-select-sm"
                        value={docPrescription.selectedProcedure}
                        onChange={(e) => setDocPrescription({ ...docPrescription, selectedProcedure: e.target.value })}
                      >
                        {CLINICAL_PROCEDURES.map((proc) => (
                          <option key={proc.id} value={proc.id}>
                            {proc.name} {proc.price > 0 ? `(₹${proc.price})` : ""}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Prescribed Products by Category */}
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <label className="small fw-bold text-primary mb-0">Recommend Products & Hampers</label>
                        <div className="btn-group btn-group-sm">
                          <button
                            type="button"
                            onClick={() => setDoctorCategoryTab("all")}
                            className={`btn btn-xs py-0 px-2 ${doctorCategoryTab === "all" ? "btn-dark" : "btn-outline-dark"}`}
                          >
                            All
                          </button>
                          <button
                            type="button"
                            onClick={() => setDoctorCategoryTab("skin")}
                            className={`btn btn-xs py-0 px-2 ${doctorCategoryTab === "skin" ? "btn-info text-dark" : "btn-outline-dark"}`}
                          >
                            Skin Care
                          </button>
                          <button
                            type="button"
                            onClick={() => setDoctorCategoryTab("hair")}
                            className={`btn btn-xs py-0 px-2 ${doctorCategoryTab === "hair" ? "btn-warning text-dark" : "btn-outline-dark"}`}
                          >
                            Hair Care
                          </button>
                          <button
                            type="button"
                            onClick={() => setDoctorCategoryTab("hamper")}
                            className={`btn btn-xs py-0 px-2 ${doctorCategoryTab === "hamper" ? "btn-success" : "btn-outline-dark"}`}
                          >
                            🎁 Hampers
                          </button>
                        </div>
                      </div>

                      <div className="p-2 border rounded-3 bg-light" style={{ maxHeight: "140px", overflowY: "auto" }}>
                        {filteredDoctorProducts.map((prod) => (
                          <div key={prod.id} className="form-check d-flex justify-content-between align-items-center mb-1">
                            <div>
                              <input
                                type="checkbox"
                                id={`doc-prod-${prod.id}`}
                                className="form-check-input"
                                checked={docPrescription.prescribedProductIds.includes(prod.id)}
                                onChange={() => toggleProductSelection(prod, { selectedProductIds: docPrescription.prescribedProductIds }, (cb) => {
                                  const res = cb({ selectedProductIds: docPrescription.prescribedProductIds });
                                  setDocPrescription((p) => ({ ...p, prescribedProductIds: res.selectedProductIds }));
                                })}
                              />
                              <label htmlFor={`doc-prod-${prod.id}`} className="form-check-label small ms-2">
                                {prod.name}
                              </label>
                            </div>
                            <strong className="small">₹{prod.price}</strong>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Before & After Photo URLs */}
                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <label className="small fw-bold text-muted">Before Photo URL</label>
                        <input
                          type="url"
                          className="form-control form-control-sm"
                          placeholder="https://.../before.jpg"
                          value={docPrescription.beforeImage}
                          onChange={(e) => setDocPrescription({ ...docPrescription, beforeImage: e.target.value })}
                        />
                      </div>
                      <div className="col-6">
                        <label className="small fw-bold text-muted">After Photo URL</label>
                        <input
                          type="url"
                          className="form-control form-control-sm"
                          placeholder="https://.../after.jpg"
                          value={docPrescription.afterImage}
                          onChange={(e) => setDocPrescription({ ...docPrescription, afterImage: e.target.value })}
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn btn-success w-100 rounded-pill py-2 fw-bold">
                      Save Case & Push to Billing Queue ✓
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-5 text-muted">
                    <div className="fs-1">🩺</div>
                    <p className="small mb-0">Select a patient from the queue to start consultation and prescribe skincare/haircare regimens.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
            5. PATIENT PORTAL
        ================================================================== */}
        {userRole === "patient" && (
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold text-dark mb-0">My Consultations & Prescriptions</h5>
                  <Link to="/appointment" className="btn btn-dark btn-sm rounded-pill px-3 fw-bold">+ Book Slot</Link>
                </div>

                <div className="table-responsive">
                  <table className="table align-middle small">
                    <thead className="table-light">
                      <tr>
                        <th>Doctor</th>
                        <th>Date</th>
                        <th>Prescribed Regimen</th>
                        <th>Status</th>
                        <th>Invoice</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((a) => (
                        <tr key={a._id}>
                          <td><strong>{a.doctorName}</strong><br /><span className="text-muted">{a.concern}</span></td>
                          <td>{a.date}</td>
                          <td>
                            {a.prescription ? (
                              <div>
                                <span className="text-success fw-semibold">{a.prescription}</span>
                                {a.purchasedProducts && (
                                  <div className="text-muted small mt-1"><strong>Products:</strong> {a.purchasedProducts}</div>
                                )}
                              </div>
                            ) : (
                              <span className="text-muted">Awaiting doctor consultation</span>
                            )}
                          </td>
                          <td><span className="badge bg-success">{a.status}</span></td>
                          <td>
                            {a.paymentStatus === "Paid" ? (
                              <button onClick={() => window.print()} className="btn btn-sm btn-outline-dark py-0">
                                🧾 Receipt
                              </button>
                            ) : (
                              <span className="text-muted small">Pending</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                <h5 className="fw-bold text-dark mb-2">📸 My Treatment Progress</h5>
                <p className="small text-muted mb-3">Dermatologist-verified Before & After progress timeline.</p>

                {appointments.some((a) => a.beforeImage || a.afterImage) ? (
                  appointments
                    .filter((a) => a.beforeImage || a.afterImage)
                    .map((apt) => (
                      <div key={apt._id} className="p-3 bg-light rounded-3 border mb-3">
                        <h6 className="fw-bold small text-dark mb-2">{apt.concern} ({apt.date})</h6>
                        <div className="row g-2 text-center">
                          {apt.beforeImage && (
                            <div className="col-6">
                              <span className="badge bg-secondary mb-1">Before</span>
                              <img src={apt.beforeImage} alt="Before" className="w-100 rounded border object-fit-cover" style={{ height: "100px" }} />
                            </div>
                          )}
                          {apt.afterImage && (
                            <div className="col-6">
                              <span className="badge bg-success mb-1">After</span>
                              <img src={apt.afterImage} alt="After" className="w-100 rounded border object-fit-cover" style={{ height: "100px" }} />
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="p-4 bg-light rounded-3 text-center text-muted small">
                    <div className="fs-2 mb-1">✨</div>
                    Your progress comparison photos will appear here after your clinical follow-up session.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
            MODAL: BILLING & CHECKOUT (Skin, Hair, & Hamper Selectors)
        ================================================================== */}
        {billingApt && (
          <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content rounded-4 border-0 p-3">
                <div className="modal-header border-0 pb-0">
                  <h5 className="modal-title fw-bold">🧾 Final Invoice & Patient Check-Out</h5>
                  <button onClick={() => setBillingApt(null)} className="btn-close"></button>
                </div>
                <div className="modal-body small">
                  
                  {/* Patient Info */}
                  <div className="p-3 bg-light rounded-3 border mb-3">
                    <div className="row">
                      <div className="col-md-6">
                        <strong>Invoice #:</strong> {billingApt.invoiceNumber || "INV-021641"}<br />
                        <strong>Patient:</strong> {billingApt.patientName || billingApt.name} ({billingApt.phone})<br />
                        <strong>Doctor:</strong> {billingApt.doctorName}
                      </div>
                      <div className="col-md-6">
                        <strong>Diagnosis:</strong> {billingApt.diagnosis || "Dermatology Care"}<br />
                        <strong>Prescription:</strong> {billingApt.prescription || "Standard Clinical Care"}
                      </div>
                    </div>
                  </div>

                  {/* 1. Clinical Procedure */}
                  <div className="mb-3">
                    <label className="fw-bold text-dark">1. Select Performed Clinical Procedure</label>
                    <select
                      className="form-select form-select-sm"
                      value={billingConfig.selectedProcedureId}
                      onChange={(e) => setBillingConfig({ ...billingConfig, selectedProcedureId: e.target.value })}
                    >
                      {CLINICAL_PROCEDURES.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} — ₹{p.price.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 2. Categorized Products Selector */}
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label className="fw-bold text-dark mb-0">2. Add Skincare, Haircare & Hampers to Bill</label>
                      <div className="btn-group btn-group-sm">
                        <button
                          type="button"
                          onClick={() => setBillingCategoryTab("all")}
                          className={`btn btn-xs py-0 px-2 ${billingCategoryTab === "all" ? "btn-dark" : "btn-outline-dark"}`}
                        >
                          All
                        </button>
                        <button
                          type="button"
                          onClick={() => setBillingCategoryTab("skin")}
                          className={`btn btn-xs py-0 px-2 ${billingCategoryTab === "skin" ? "btn-info text-dark" : "btn-outline-dark"}`}
                        >
                          Skin Care
                        </button>
                        <button
                          type="button"
                          onClick={() => setBillingCategoryTab("hair")}
                          className={`btn btn-xs py-0 px-2 ${billingCategoryTab === "hair" ? "btn-warning text-dark" : "btn-outline-dark"}`}
                        >
                          Hair Care
                        </button>
                        <button
                          type="button"
                          onClick={() => setBillingCategoryTab("hamper")}
                          className={`btn btn-xs py-0 px-2 ${billingCategoryTab === "hamper" ? "btn-success" : "btn-outline-dark"}`}
                        >
                          🎁 Hampers
                        </button>
                      </div>
                    </div>

                    <div className="p-2 border rounded-3 bg-light" style={{ maxHeight: "150px", overflowY: "auto" }}>
                      {filteredBillingProducts.map((prod) => (
                        <div key={prod.id} className="form-check d-flex justify-content-between align-items-center mb-1">
                          <div>
                            <input
                              type="checkbox"
                              id={`bill-prod-${prod.id}`}
                              className="form-check-input"
                              checked={billingConfig.selectedProductIds.includes(prod.id)}
                              onChange={() => toggleProductSelection(prod, billingConfig, setBillingConfig)}
                            />
                            <label htmlFor={`bill-prod-${prod.id}`} className="form-check-label small ms-2">
                              {prod.name}
                            </label>
                          </div>
                          <strong>₹{prod.price.toLocaleString()}</strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Calculation Summary */}
                  <div className="card p-3 bg-light border-0 rounded-3">
                    <div className="d-flex justify-content-between py-1">
                      <span>Doctor Consultation Fee:</span>
                      <strong>₹{billingConfig.consultationFee}</strong>
                    </div>
                    <div className="d-flex justify-content-between py-1">
                      <span>Procedure ({selectedProc.name}):</span>
                      <strong>₹{selectedProc.price.toLocaleString()}</strong>
                    </div>
                    <div className="d-flex justify-content-between py-1">
                      <span>Products & Hampers ({selectedProds.length} items):</span>
                      <strong>₹{productsSubtotal.toLocaleString()}</strong>
                    </div>
                    <div className="d-flex justify-content-between py-1 border-bottom">
                      <span>GST Tax (18%):</span>
                      <strong>₹{gstTax.toLocaleString()}</strong>
                    </div>
                    <div className="d-flex justify-content-between py-2 fs-5 fw-bold text-success">
                      <span>Grand Total:</span>
                      <span>₹{grandTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mt-3">
                    <label className="fw-bold">Payment Method</label>
                    <select
                      className="form-select form-select-sm"
                      value={billingConfig.paymentMethod}
                      onChange={(e) => setBillingConfig({ ...billingConfig, paymentMethod: e.target.value })}
                    >
                      <option value="UPI / QR Code">UPI (GPay / PhonePe / Paytm)</option>
                      <option value="Credit / Debit Card">Credit / Debit Card (POS)</option>
                      <option value="Cash">Cash at Front Desk</option>
                    </select>
                  </div>

                </div>
                <div className="modal-footer border-0">
                  <button onClick={() => setBillingApt(null)} className="btn btn-light rounded-pill px-3">
                    Cancel
                  </button>
                  <button onClick={handleFinalizeBillAndCheckout} className="btn btn-dark rounded-pill px-4 fw-bold">
                    Confirm Payment & Check-Out (₹{grandTotal.toLocaleString()}) ✓
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
            MODAL: WALK-IN PATIENT INTAKE
        ================================================================== */}
        {showWalkinModal && (
          <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4 border-0 p-3">
                <div className="modal-header border-0">
                  <h5 className="modal-title fw-bold">Walk-In Patient Intake</h5>
                  <button onClick={() => setShowWalkinModal(false)} className="btn-close"></button>
                </div>
                <form onSubmit={handleWalkinSubmit}>
                  <div className="modal-body small">
                    <div className="mb-2">
                      <label className="fw-bold">Patient Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={walkinForm.patientName}
                        onChange={(e) => setWalkinForm({ ...walkinForm, patientName: e.target.value })}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="fw-bold">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        required
                        value={walkinForm.phone}
                        onChange={(e) => setWalkinForm({ ...walkinForm, phone: e.target.value })}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="fw-bold">Primary Concern</label>
                      <select
                        className="form-select"
                        value={walkinForm.concern}
                        onChange={(e) => setWalkinForm({ ...walkinForm, concern: e.target.value })}
                      >
                        <option value="Acne Breakouts & Open Pores">Acne Breakouts & Open Pores</option>
                        <option value="Dandruff & Scalp Itch">Dandruff & Scalp Itch</option>
                        <option value="Melasma & Dark Spots">Melasma & Dark Spots</option>
                        <option value="Excessive Hair Fall & PRP">Excessive Hair Fall & PRP</option>
                      </select>
                    </div>
                    <div className="mb-2">
                      <label className="fw-bold">Assign Doctor</label>
                      <select
                        className="form-select"
                        value={walkinForm.doctorName}
                        onChange={(e) => setWalkinForm({ ...walkinForm, doctorName: e.target.value })}
                      >
                        <option value="DR. NEHA YADAV">DR. NEHA YADAV</option>
                        <option value="DR. ANKIT PANDEY">DR. ANKIT PANDEY</option>
                        <option value="DR. PRIYA SHARMA">DR. PRIYA SHARMA</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer border-0">
                    <button type="button" onClick={() => setShowWalkinModal(false)} className="btn btn-light rounded-pill px-3">
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-dark rounded-pill px-4">
                      Check-In Patient
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;