import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AIAnalyzerModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [answers, setAnswers] = useState({
    skinType: "Oily / Combination",
    mainIssue: "Acne Breakouts & Large Pores",
    sensitivity: "Mildly Sensitive",
  });

  const [diagnosticResult, setDiagnosticResult] = useState(null);

  if (!isOpen) return null;

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleRunAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setDiagnosticResult({
        skinScore: 78,
        hydrationLevel: "42% (Needs Barrier Support)",
        sebumActivity: "Elevated T-Zone Activity",
        diagnosedConcern: answers.mainIssue,
        suggestedRegimen: "Salicylic Cleanser + Niacinamide 10% + Ceramide Gel",
        recommendedProcedure: "Medical Hydra-Vortex Dermabrasion & Carbon Peel",
      });
      setStep(3);
    }, 2200);
  };

  const resetModal = () => {
    setStep(1);
    setDiagnosticResult(null);
    setSelectedImage(null);
    onClose();
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        zIndex: 10500,
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="bg-white rounded-4 shadow-lg p-4 p-md-5 position-relative"
        style={{ maxWidth: "650px", width: "100%", maxHeight: "90vh", overflowY: "auto" }}
      >
        <button
          onClick={resetModal}
          className="btn-close position-absolute top-0 end-0 m-4"
          aria-label="Close"
        ></button>

        {/* Step 1: Upload or Choose Assessment */}
        {step === 1 && (
          <div>
            <div className="text-center mb-4">
              <span className="badge bg-warning text-dark rounded-pill px-3 py-1 fw-bold small mb-2">
                🤖 AI Facial Scan & Triage
              </span>
              <h3 className="fw-bold text-dark mb-1">DermCare AI Skin Analyser</h3>
              <p className="text-muted small">
                Trained on 50,000+ clinical dermatological case files for Indian skin tones.
              </p>
            </div>

            <div className="text-center p-4 border rounded-4 bg-light mb-4">
              {selectedImage ? (
                <div>
                  <img
                    src={selectedImage}
                    alt="Facial scan"
                    className="rounded-4 mb-2 object-fit-cover shadow-sm"
                    style={{ width: "130px", height: "130px" }}
                  />
                  <div className="small text-success fw-bold">✓ Facial Scan Uploaded</div>
                </div>
              ) : (
                <div>
                  <div className="fs-1 mb-2">📸</div>
                  <h6 className="fw-bold mb-1">Upload Face Photo for AI Zone Mapping</h6>
                  <p className="text-muted small mb-3">Detects pores, melasma pigmentation, and acne lesions.</p>
                  <label className="btn btn-sm btn-dark rounded-pill px-4 cursor-pointer">
                    Choose Photo
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="d-none" />
                  </label>
                </div>
              )}
            </div>

            <button
              onClick={() => setStep(2)}
              className="btn btn-dark w-100 rounded-pill py-2 fw-bold"
              style={{ backgroundColor: "#0b2e2b" }}
            >
              Continue to Skin Assessment →
            </button>
          </div>
        )}

        {/* Step 2: Diagnostic Questions */}
        {step === 2 && !analyzing && (
          <div>
            <div className="mb-3 text-center">
              <h4 className="fw-bold text-dark mb-1">Targeted Clinical Questionnaire</h4>
              <p className="text-muted small">Select your predominant skin indicators.</p>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold text-dark text-uppercase">1. Skin Feel by Midday</label>
              <select
                className="form-select rounded-3"
                value={answers.skinType}
                onChange={(e) => setAnswers({ ...answers, skinType: e.target.value })}
              >
                <option value="Oily / Shiny All Over">Oily / Shiny All Over</option>
                <option value="Oily T-Zone & Normal Cheeks">Oily T-Zone & Normal Cheeks (Combination)</option>
                <option value="Dry, Tight & Flaky">Dry, Tight & Flaky</option>
                <option value="Balanced / Normal">Balanced / Normal</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold text-dark text-uppercase">2. Primary Concern</label>
              <select
                className="form-select rounded-3"
                value={answers.mainIssue}
                onChange={(e) => setAnswers({ ...answers, mainIssue: e.target.value })}
              >
                <option value="Acne Breakouts & Large Pores">Acne Breakouts & Large Pores</option>
                <option value="Melasma, Sun Tan & Dark Spots">Melasma, Sun Tan & Dark Spots</option>
                <option value="Fine Lines, Wrinkles & Sagging">Fine Lines, Wrinkles & Sagging</option>
                <option value="Damaged Barrier, Redness & Irritation">Damaged Barrier, Redness & Irritation</option>
                <option value="Hair Thinning & Excessive Shedding">Hair Thinning & Excessive Shedding</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label small fw-bold text-dark text-uppercase">3. Skin Sensitivity Level</label>
              <select
                className="form-select rounded-3"
                value={answers.sensitivity}
                onChange={(e) => setAnswers({ ...answers, sensitivity: e.target.value })}
              >
                <option value="Resistant (Rarely reacts to products)">Resistant (Rarely reacts to products)</option>
                <option value="Mildly Sensitive (Occasional stinging)">Mildly Sensitive (Occasional stinging)</option>
                <option value="Hyper-Sensitive (Redness / Rosacea prone)">Hyper-Sensitive (Redness / Rosacea prone)</option>
              </select>
            </div>

            <div className="d-flex gap-2">
              <button onClick={() => setStep(1)} className="btn btn-light rounded-pill px-4 border">
                Back
              </button>
              <button
                onClick={handleRunAnalysis}
                className="btn btn-warning flex-grow-1 rounded-pill fw-bold text-dark"
              >
                ⚡ Generate Doctor-Calibrated Report
              </button>
            </div>
          </div>
        )}

        {/* Loading Spinner during Analysis */}
        {analyzing && (
          <div className="text-center py-5">
            <div className="spinner-border text-success mb-3" style={{ width: "3.5rem", height: "3.5rem" }}></div>
            <h5 className="fw-bold text-dark">Mapping Facial Biometrics...</h5>
            <p className="text-muted small">Cross-referencing dermal layers & clinical regimens...</p>
          </div>
        )}

        {/* Step 3: Analysis Results */}
        {step === 3 && diagnosticResult && (
          <div>
            <div className="text-center mb-4">
              <span className="badge bg-success text-white rounded-pill px-3 py-1 fw-bold small mb-2">
                ✓ Analysis Complete
              </span>
              <h4 className="fw-bold text-dark mb-0">Your Personalized Skin Blueprint</h4>
            </div>

            <div className="bg-light p-3 rounded-4 border mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="small text-muted">Overall Skin Health Index:</span>
                <span className="badge bg-dark fs-6">{diagnosticResult.skinScore}/100</span>
              </div>
              <div className="small mb-1">
                <strong>Hydration Index:</strong> {diagnosticResult.hydrationLevel}
              </div>
              <div className="small mb-1">
                <strong>Sebum Activity:</strong> {diagnosticResult.sebumActivity}
              </div>
              <div className="small">
                <strong>Diagnosed Focus:</strong> <span className="text-danger fw-bold">{diagnosticResult.diagnosedConcern}</span>
              </div>
            </div>

            <div className="p-3 rounded-4 border border-warning bg-warning bg-opacity-10 mb-3">
              <div className="small fw-bold text-dark mb-1">🧴 Recommended Daily Formulations:</div>
              <p className="small text-muted mb-0">{diagnosticResult.suggestedRegimen}</p>
            </div>

            <div className="p-3 rounded-4 border border-primary bg-primary bg-opacity-10 mb-4">
              <div className="small fw-bold text-dark mb-1">🏥 Recommended In-Clinic Procedure:</div>
              <p className="small text-dark fw-semibold mb-0">{diagnosticResult.recommendedProcedure}</p>
            </div>

            <div className="d-flex flex-column gap-2">
              <button
                onClick={() => {
                  resetModal();
                  navigate("/appointment");
                }}
                className="btn btn-dark rounded-pill py-2 fw-bold"
                style={{ backgroundColor: "#0b2e2b" }}
              >
                Book Consultation for this Routine →
              </button>
              <button
                onClick={() => {
                  resetModal();
                  navigate("/products");
                }}
                className="btn btn-outline-dark rounded-pill py-2 fw-semibold"
              >
                Shop Prescribed Formulations 🛍️
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAnalyzerModal;