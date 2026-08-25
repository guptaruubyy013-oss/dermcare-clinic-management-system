import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../api/axios";
import ImageComparison from "../../components/ImageComparison";
import { AuthContext } from "../../context/AuthContext";

const PatientHistory = () => {
  const { patientId: paramId } = useParams();
  const { user } = useContext(AuthContext);
  const targetId = paramId || user?.id || user?._id;

  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        if (!targetId) return;
        const { data } = await API.get(`/treatments/patient/${targetId}`);
        setTreatments(data.treatments || []);
      } catch (err) {
        setError(err.response?.data?.message || "No treatment records found yet.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [targetId]);

  return (
    <div className="container-fluid py-2">
      {loading && <div className="text-center py-4">Loading clinical history...</div>}
      {error && <div className="alert alert-light border">{error}</div>}

      {!loading && treatments.length === 0 && !error && (
        <div className="alert alert-info">
          No treatment sessions recorded yet. Once your doctor uploads clinical consultation records and photos, they will appear here.
        </div>
      )}

      <div className="row">
        {treatments.map((session) => (
          <div key={session._id} className="col-lg-6 mb-4">
            <div className="card shadow-sm h-100 p-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="fw-bold mb-0">
                  Session #{session.sessionNumber || 1} — {session.treatmentType || "Dermatology Consultation"}
                </h5>
                <span className="badge bg-secondary">
                  {new Date(session.createdAt || Date.now()).toLocaleDateString()}
                </span>
              </div>

              <p className="text-muted mb-2">
                <strong>Attending Doctor:</strong> Dr. {session.doctor?.name || "Specialist"} ({session.doctor?.specialization || "Dermatologist"})
              </p>

              <div className="mb-2">
                <strong>Clinical Diagnosis:</strong>
                <p className="text-dark bg-light p-2 rounded mb-0 mt-1">{session.diagnosis || "Under Evaluation"}</p>
              </div>

              {session.procedureNotes && (
                <div className="mb-2">
                  <strong>Procedure / Clinical Notes:</strong>
                  <p className="text-secondary small mb-0 mt-1">{session.procedureNotes}</p>
                </div>
              )}

              {/* Prescriptions Breakdown */}
              {session.prescriptions && session.prescriptions.length > 0 && (
                <div className="mb-3">
                  <strong>Prescribed Medicines:</strong>
                  <ul className="list-group list-group-flush mt-1">
                    {session.prescriptions.map((med, idx) => (
                      <li key={idx} className="list-group-item px-0 py-1 small">
                        💊 <strong>{med.medicineName}</strong> — {med.dosage} ({med.duration})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Before/After Image Comparison Component */}
              {session.beforeImages?.[0]?.url && session.afterImages?.[0]?.url ? (
                <div className="mt-2">
                  <ImageComparison
                    beforeUrl={session.beforeImages[0].url}
                    afterUrl={session.afterImages[0].url}
                    title={`Session ${session.sessionNumber || 1} Analysis`}
                  />
                </div>
              ) : (
                <div className="alert alert-secondary py-2 small mt-2">
                  Clinical photos for this session will appear once uploaded by the attending dermatologist.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientHistory;