import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const concernKnowledgeBase = {
  acne: {
    analysis: "Possible Acne Vulgaris or Comedonal Breakouts.",
    recommendations: [
      "Use a gentle 2% Salicylic Acid or Benzoyl Peroxide cleanser.",
      "Avoid heavy oil-based cosmetics and touching the face.",
      "Apply non-comedogenic gel-based sunscreen daily.",
    ],
    recommendedClinicalTreatment: "Salicylic Acid Peel & Blue Light Therapy",
  },
  pigmentation: {
    analysis: "Possible Melasma, Sunspots, or Post-Inflammatory Hyperpigmentation (PIH).",
    recommendations: [
      "Strict broad-spectrum SPF 50+ application every 3 hours.",
      "Incorporate Vitamin C, Niacinamide, or Azelaic Acid in your routine.",
      "Avoid direct harsh UV exposure during peak hours (11 AM - 4 PM).",
    ],
    recommendedClinicalTreatment: "Q-Switched Nd:YAG Laser Toning",
  },
  hairfall: {
    analysis: "Early Telogen Effluvium or Pattern Hair Thinning.",
    recommendations: [
      "Ensure adequate intake of Iron, Ferritin, Vitamin D3, and Biotin.",
      "Use sulfate-free mild scalp cleansers.",
      "Avoid excessive heat styling and tight hairstyles.",
    ],
    recommendedClinicalTreatment: "Scalp Growth Factor (GFC) / PRP Therapy",
  },
  aging: {
    analysis: "Fine Lines, Collagen Depletion, and Loss of Skin Elasticity.",
    recommendations: [
      "Introduce Retinol/Retinoids into your night regimen gradually.",
      "Use Hyaluronic Acid and Ceramide-rich moisturizers to support the skin barrier.",
      "Stay well hydrated and ensure consistent sunscreen protection.",
    ],
    recommendedClinicalTreatment: "Hydra-Dermabrasion & Collagen Induction Therapy",
  },
};

const AIConsultant = () => {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am your DermCare AI Skin & Hair Consultant. Tell me about your symptoms or upload a clear photo for an instant preliminary analysis.",
    },
  ]);
  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, analyzing]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: "Uploaded photo for clinical AI assessment", image: imageUrl },
      ]);
      runAIAnalysis("photo");
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");
    runAIAnalysis(userText.toLowerCase());
  };

  const runAIAnalysis = (query) => {
    setAnalyzing(true);

    setTimeout(() => {
      let key = "acne";
      if (query.includes("hair") || query.includes("fall") || query.includes("dandruff") || query.includes("bald")) {
        key = "hairfall";
      } else if (query.includes("spot") || query.includes("dark") || query.includes("pigment") || query.includes("tan")) {
        key = "pigmentation";
      } else if (query.includes("wrinkle") || query.includes("age") || query.includes("line") || query.includes("dull")) {
        key = "aging";
      }

      const match = concernKnowledgeBase[key];

      const aiReply = {
        sender: "ai",
        isReport: true,
        data: match,
        text: `Based on your inputs, here is your preliminary assessment:`,
      };

      setMessages((prev) => [...prev, aiReply]);
      setAnalyzing(false);
    }, 1200);
  };

  return (
    <div style={{ backgroundColor: "#f8fafb", minHeight: "90vh", padding: "2rem 0 4rem 0" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9 col-xl-8">
            
            {/* Header Card */}
            <div
              className="p-4 rounded-4 shadow-sm mb-3 text-white d-flex justify-content-between align-items-center"
              style={{ background: "linear-gradient(135deg, #0e3b43 0%, #1a5e6b 100%)" }}
            >
              <div>
                <span className="badge bg-white text-dark rounded-pill px-3 py-1 mb-2 fw-semibold">
                  🤖 24/7 AI Virtual Triage
                </span>
                <h3 className="fw-bold mb-1">DermCare AI Skin & Hair Doctor</h3>
                <p className="small text-white-50 mb-0">
                  Instant smart assessment for patients unable to visit clinic in person
                </p>
              </div>
              <Link to="/appointment" className="btn btn-light rounded-pill px-3 py-2 btn-sm fw-bold">
                Book Live Doctor
              </Link>
            </div>

            {/* Chat Viewport */}
            <div
              className="card border-0 rounded-4 shadow-sm p-4 bg-white"
              style={{ minHeight: "520px", display: "flex", flexDirection: "column" }}
            >
              <div className="flex-grow-1 overflow-auto pe-2" style={{ maxHeight: "500px" }}>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`d-flex mb-3 ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}
                  >
                    <div
                      className={`p-3 rounded-4 shadow-sm ${
                        msg.sender === "user" ? "bg-primary text-white" : "bg-light text-dark border"
                      }`}
                      style={{ maxWidth: "80%" }}
                    >
                      {msg.image && (
                        <img
                          src={msg.image}
                          alt="Patient Scan"
                          className="img-fluid rounded-3 mb-2 d-block"
                          style={{ maxHeight: "180px" }}
                        />
                      )}
                      <div>{msg.text}</div>

                      {/* Render Structured AI Assessment Card */}
                      {msg.isReport && msg.data && (
                        <div className="mt-3 p-3 bg-white rounded-3 border">
                          <div className="fw-bold text-danger mb-1 small">
                            🩺 Assessment: {msg.data.analysis}
                          </div>
                          <div className="small fw-bold text-dark mt-2 mb-1">Self-Care Measures:</div>
                          <ul className="small ps-3 text-secondary mb-2">
                            {msg.data.recommendations.map((r, i) => (
                              <li key={i}>{r}</li>
                            ))}
                          </ul>
                          <div className="small bg-light p-2 rounded border">
                            <strong>Recommended In-Clinic Protocol:</strong>{" "}
                            <span className="text-primary">{msg.data.recommendedClinicalTreatment}</span>
                          </div>
                          <Link
                            to="/appointment"
                            className="btn btn-sm btn-primary w-100 mt-2 rounded-pill fw-bold"
                          >
                            Schedule Consultation for this Protocol →
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {analyzing && (
                  <div className="d-flex justify-content-start mb-3">
                    <div className="p-3 rounded-4 bg-light border text-muted small">
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      AI Doctor is analyzing dermatological parameters...
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat & Upload Input Bar */}
              <form onSubmit={handleSend} className="mt-3 pt-3 border-top d-flex gap-2 align-items-center">
                <label
                  htmlFor="photo-upload"
                  className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "42px", height: "42px", cursor: "pointer" }}
                  title="Upload Skin/Hair Photo"
                >
                  📷
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="d-none"
                    onChange={handleImageUpload}
                  />
                </label>

                <input
                  type="text"
                  className="form-control rounded-pill py-2 px-3"
                  placeholder="Describe your skin/hair concern (e.g. breakouts on forehead, dry patches)..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />

                <button type="submit" className="btn btn-primary rounded-pill px-4 py-2 fw-bold">
                  Analyze
                </button>
              </form>
            </div>

            <p className="text-center text-muted small mt-2">
              ⚠️ <em>Disclaimer: DermCare AI provides informational preliminary screening and does not replace certified clinical diagnosis.</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIConsultant;