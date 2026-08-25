import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const concernKnowledgeBase = {
  acne: {
    analysis: "Possible Acne Vulgaris or Comedonal Breakouts.",
    recommendations: [
      "Use a gentle 2% Salicylic Acid or Benzoyl Peroxide cleanser.",
      "Avoid touching your face and use oil-free moisturizers.",
      "Apply non-comedogenic SPF 50 daily.",
    ],
    recommendedProtocol: "Salicylic Peel & Blue Light Therapy",
  },
  pigmentation: {
    analysis: "Possible Melasma, Sunspots, or Post-Inflammatory Hyperpigmentation.",
    recommendations: [
      "Re-apply broad-spectrum SPF 50 every 3 hours.",
      "Incorporate Niacinamide or Vitamin C serums.",
      "Avoid harsh physical scrubs on affected areas.",
    ],
    recommendedProtocol: "Q-Switched Nd:YAG Laser Toning",
  },
  hairfall: {
    analysis: "Early Telogen Effluvium or Pattern Hair Thinning.",
    recommendations: [
      "Check Iron, Ferritin, Vitamin D3, and Biotin levels.",
      "Switch to a mild, sulfate-free scalp cleanser.",
      "Avoid excessive heat styling or tight tying.",
    ],
    recommendedProtocol: "Scalp Growth Factor (GFC) / PRP Therapy",
  },
  aging: {
    analysis: "Fine Lines, Collagen Depletion, and Dull Skin Texture.",
    recommendations: [
      "Introduce a beginner Retinol serum at night.",
      "Use Hyaluronic Acid and Ceramide-rich moisturizers.",
      "Maintain consistent UV protection.",
    ],
    recommendedProtocol: "Medical Hydra-Facial & Peels",
  },
};

const AIAssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hi! I'm DermCare AI. Ask me about your skin or hair symptoms for instant advice!",
    },
  ]);
  const [input, setInput] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, analyzing, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");
    setAnalyzing(true);

    setTimeout(() => {
      const q = userText.toLowerCase();
      let key = "acne";
      if (q.includes("hair") || q.includes("fall") || q.includes("dandruff") || q.includes("bald")) {
        key = "hairfall";
      } else if (q.includes("spot") || q.includes("dark") || q.includes("pigment") || q.includes("tan")) {
        key = "pigmentation";
      } else if (q.includes("wrinkle") || q.includes("age") || q.includes("line") || q.includes("dull")) {
        key = "aging";
      }

      const match = concernKnowledgeBase[key];

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          isReport: true,
          data: match,
          text: `Here is a quick preliminary assessment:`,
        },
      ]);
      setAnalyzing(false);
    }, 1000);
  };

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 9999 }}>
      {/* Floating Chat Window */}
      {isOpen && (
        <div
          className="card border-0 shadow-lg rounded-4 overflow-hidden mb-3"
          style={{
            width: "350px",
            height: "480px",
            display: "flex",
            flexDirection: "column",
            animation: "fadeIn 0.2s ease-in-out",
          }}
        >
          {/* Header */}
          <div
            className="p-3 text-white d-flex justify-content-between align-items-center"
            style={{ background: "linear-gradient(135deg, #0e3b43 0%, #165662 100%)" }}
          >
            <div className="d-flex align-items-center gap-2">
              <span className="fs-5">🤖</span>
              <div>
                <div className="fw-bold small">DermCare AI Assistant</div>
                <div className="text-white-50" style={{ fontSize: "0.72rem" }}>
                  Instant Skin & Hair Triage
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="btn-close btn-close-white"
              style={{ fontSize: "0.75rem" }}
            ></button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow-1 p-3 overflow-auto bg-light" style={{ fontSize: "0.85rem" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`d-flex mb-2 ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}
              >
                <div
                  className={`p-2 px-3 rounded-4 shadow-sm ${
                    msg.sender === "user"
                      ? "bg-primary text-white"
                      : "bg-white text-dark border"
                  }`}
                  style={{ maxWidth: "85%" }}
                >
                  <div>{msg.text}</div>

                  {msg.isReport && msg.data && (
                    <div className="mt-2 pt-2 border-top">
                      <div className="fw-bold text-danger mb-1" style={{ fontSize: "0.78rem" }}>
                        🩺 {msg.data.analysis}
                      </div>
                      <div className="fw-bold text-dark mb-1" style={{ fontSize: "0.75rem" }}>
                        Tips:
                      </div>
                      <ul className="ps-3 mb-2 text-secondary" style={{ fontSize: "0.75rem" }}>
                        {msg.data.recommendations.map((rec, idx) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                      <Link
                        to="/appointment"
                        onClick={() => setIsOpen(false)}
                        className="btn btn-sm btn-primary w-100 rounded-pill py-1 fw-bold"
                        style={{ fontSize: "0.72rem" }}
                      >
                        Book In-Clinic Protocol →
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {analyzing && (
              <div className="d-flex justify-content-start mb-2">
                <div className="p-2 px-3 rounded-4 bg-white border text-muted small">
                  <span className="spinner-border spinner-border-sm me-1" role="status"></span>
                  AI analyzing...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSend} className="p-2 bg-white border-top d-flex gap-2">
            <input
              type="text"
              className="form-control form-control-sm rounded-pill px-3"
              placeholder="Type skin/hair issue..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-sm btn-primary rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "32px", height: "32px", backgroundColor: "#0e3b43", borderColor: "#0e3b43" }}
            >
              ➤
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn rounded-circle shadow-lg d-flex align-items-center justify-content-center text-white border-0"
        style={{
          width: "56px",
          height: "56px",
          background: "linear-gradient(135deg, #0e3b43, #196f7e)",
          fontSize: "1.6rem",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        title="Chat with AI Consultant"
      >
        {isOpen ? "✕" : "🤖"}
      </button>
    </div>
  );
};

export default AIAssistantWidget;