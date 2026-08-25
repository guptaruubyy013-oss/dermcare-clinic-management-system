import React from "react";

const InvoiceModal = ({ bill, onClose }) => {
  if (!bill) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content border-0 shadow">
          {/* Action Bar (Hidden on Print) */}
          <div className="modal-header d-print-none bg-light">
            <h5 className="modal-title fw-bold">Invoice #{bill.invoiceNumber}</h5>
            <div>
              <button onClick={handlePrint} className="btn btn-sm btn-primary me-2">
                🖨️ Print / Save PDF
              </button>
              <button onClick={onClose} className="btn btn-sm btn-outline-secondary">
                Close
              </button>
            </div>
          </div>

          {/* Printable Invoice Body */}
          <div className="modal-body p-4 p-md-5">
            {/* Clinic Letterhead */}
            <div className="d-flex justify-content-between align-items-center border-bottom pb-4 mb-4">
              <div>
                <h3 className="fw-bold text-primary mb-0">DermCare Clinic</h3>
                <p className="text-muted small mb-0">Advanced Dermatology & Trichology Center</p>
                <p className="text-muted small mb-0">contact@dermcare.com | +91 98765 43210</p>
              </div>
              <div className="text-end">
                <h5 className="fw-bold text-dark mb-1">TAX INVOICE</h5>
                <p className="mb-0 text-muted small"><strong>Invoice No:</strong> {bill.invoiceNumber}</p>
                <p className="mb-0 text-muted small">
                  <strong>Date:</strong> {new Date(bill.createdAt || Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Patient & Doctor Details */}
            <div className="row mb-4">
              <div className="col-6">
                <h6 className="fw-bold text-secondary mb-1">BILLED TO:</h6>
                <p className="fw-bold mb-0">{bill.patient?.name || "Patient"}</p>
                <p className="text-muted small mb-0">Phone: {bill.patient?.phone || "N/A"}</p>
                <p className="text-muted small mb-0">Gender/Age: {bill.patient?.gender || "N/A"}, {bill.patient?.age || "N/A"} yrs</p>
              </div>
              <div className="col-6 text-end">
                <h6 className="fw-bold text-secondary mb-1">CONSULTING DOCTOR:</h6>
                <p className="fw-bold mb-0">Dr. {bill.doctor?.name || "Specialist"}</p>
                <p className="text-muted small mb-0">{bill.doctor?.specialization || "Dermatology"}</p>
              </div>
            </div>

            {/* Itemized Table */}
            <table className="table table-bordered align-middle mb-4">
              <thead className="table-light">
                <tr>
                  <th>Description</th>
                  <th className="text-end" style={{ width: "150px" }}>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Consultation Fee</td>
                  <td className="text-end">₹{bill.consultationFee || 0}</td>
                </tr>
                {bill.treatmentFee > 0 && (
                  <tr>
                    <td>Clinical Treatment / Procedure Charges</td>
                    <td className="text-end">₹{bill.treatmentFee}</td>
                  </tr>
                )}
                {bill.medicineCharges > 0 && (
                  <tr>
                    <td>Prescribed Medicines & Topicals</td>
                    <td className="text-end">₹{bill.medicineCharges}</td>
                  </tr>
                )}
                {bill.discount > 0 && (
                  <tr className="text-success">
                    <td>Promotional Discount</td>
                    <td className="text-end">- ₹{bill.discount}</td>
                  </tr>
                )}
                <tr className="table-light fw-bold">
                  <td className="text-end">Total Amount Paid</td>
                  <td className="text-end text-primary fs-5">₹{bill.totalAmount}</td>
                </tr>
              </tbody>
            </table>

            {/* Payment Meta */}
            <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded">
              <div>
                <small className="text-muted d-block">Payment Method: <strong>{bill.paymentMethod}</strong></small>
                <small className="text-muted d-block">Payment Status: <strong className="text-success">{bill.paymentStatus}</strong></small>
              </div>
              <div className="text-end">
                <small className="text-muted fst-italic">Authorized Signature</small>
                <div style={{ height: "30px" }}></div>
                <small className="fw-bold d-block">DermCare Front Desk</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;