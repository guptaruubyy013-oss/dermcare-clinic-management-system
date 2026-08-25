import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const clinicServiceOffers = [
  {
    id: "off-1",
    title: "Laser Hair Reduction (Full Body & Face)",
    category: "Laser & Body",
    discountTag: "FLAT 40% OFF",
    originalPrice: 18000,
    offerPrice: 10800,
    badge: "Most Popular",
    sessions: "6 Sessions Package",
    code: "LASER40",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
    desc: "US-FDA approved painless diode & Alexandrite lasers for permanent hair reduction with zero downtime.",
    benefits: [
      "Targeted follicle destruction with cooling chill-tip",
      "Safe for Indian skin types (Fitzpatrick IV-VI)",
      "Free post-session soothing aloe protocol",
    ],
  },
  {
    id: "off-2",
    title: "Anti-Ageing Collagen Boost (HIFU + Peels)",
    category: "Anti-Ageing",
    discountTag: "UP TO 30% OFF",
    originalPrice: 22000,
    offerPrice: 15400,
    badge: "Doctor's Choice",
    sessions: "3 Sessions Package",
    code: "AGELESS30",
    img: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80",
    desc: "High-Intensity Focused Ultrasound combined with glycolic fruit peels to tighten skin and lift fine lines.",
    benefits: [
      "Non-surgical face-lifting & contouring",
      "Stimulates deep SMAS layer collagen production",
      "Immediate plumping & radiance boost",
    ],
  },
  {
    id: "off-3",
    title: "Acne Scar Resurfacing & Carbon Peel",
    category: "Acne & Scars",
    discountTag: "BUY 2 GET 1 FREE",
    originalPrice: 14500,
    offerPrice: 9600,
    badge: "Clinical Favorite",
    sessions: "3 Sessions Trio",
    code: "CLEARSKIN",
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    desc: "Q-Switched Hollywood Carbon Peel combined with TCA Cross micro-peeling for textured pits and scars.",
    benefits: [
      "Deeply unclogs and shrinks enlarged pores",
      "Flattens crater scars and post-acne pigmentation",
      "Includes dermatologist skin analysis",
    ],
  },
  {
    id: "off-4",
    title: "Luxury Medical Hydra-Facial & Glow Infusion",
    category: "Facial & Glow",
    discountTag: "BUY 1 GET 1 FREE",
    originalPrice: 12000,
    offerPrice: 6000,
    badge: "Limited Period",
    sessions: "2 Sessions Duo",
    code: "HYDRABOGO",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    desc: "9-step vortex cleansing, lymphatic drainage, and antioxidant serum infusion for camera-ready luminous skin.",
    benefits: [
      "Vortex pore vacuuming & blackhead removal",
      "Hyaluronic & Vitamin C trans-epidermal infusion",
      "Cryo-cooling skin firming therapy",
    ],
  },
  {
    id: "off-5",
    title: "Scalp Growth Factor (GFC) & Hair PRP Package",
    category: "Hair Restoration",
    discountTag: "FLAT 25% OFF",
    originalPrice: 24000,
    offerPrice: 18000,
    badge: "Trichology High-Result",
    sessions: "4 Sessions Complete Plan",
    code: "GROWTH25",
    img: "https://images.unsplash.com/photo-1608248597359-0a69a4e0be88?auto=format&fit=crop&w=600&q=80",
    desc: "Autologous high-concentration growth factor concentrate injections to reverse thinning and hair fall.",
    benefits: [
      "High concentration of bioactive platelet growth factors",
      "Activates dormant hair roots in thinning areas",
      "Trichoscan digital scalp analysis included",
    ],
  },
  {
    id: "off-6",
    title: "Q-Switched Nd:YAG Laser Melasma & Toning",
    category: "Pigmentation",
    discountTag: "FLAT 35% OFF",
    originalPrice: 16000,
    offerPrice: 10400,
    badge: "Sun & Spot Shield",
    sessions: "4 Sessions Regimen",
    code: "TONING35",
    img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80",
    desc: "Targeted laser wavelengths that break deep melanin deposits and fade hormonal melasma.",
    benefits: [
      "Breaks down deep dermal pigment without burns",
      "Balances uneven complexion and sun damage",
      "No recovery downtime needed",
    ],
  },
];

const ServiceOffers = () => {
  const [filterCat, setFilterCat] = useState("All");
  const [copiedCode, setCopiedCode] = useState("");
  const navigate = useNavigate();

  const categories = [
    "All",
    "Laser & Body",
    "Anti-Ageing",
    "Acne & Scars",
    "Facial & Glow",
    "Hair Restoration",
    "Pigmentation",
  ];

  const filtered = clinicServiceOffers.filter(
    (off) => filterCat === "All" || off.category === filterCat
  );

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2500);
  };

  const handleBook = (offer) => {
    navigate("/appointment", { state: { selectedOffer: offer } });
  };

  return (
    <div style={{ backgroundColor: "#f8fafb", minHeight: "88vh", padding: "2.5rem 0 5rem 0" }}>
      <div className="container">
        
        {/* Kaya Style Hero Banner */}
        <div
          className="p-4 p-md-5 rounded-4 shadow-sm mb-4 text-white position-relative"
          style={{
            background: "linear-gradient(135deg, #0e3b43 0%, #175a66 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div>
              <span className="badge bg-warning text-dark rounded-pill px-3 py-1 mb-2 fw-bold">
                ⚡ Limited-Period Clinical Offers
              </span>
              <h2 className="fw-bold mb-2">Dermatologist-Led Clinical Service Offers</h2>
              <p className="text-white-50 mb-0" style={{ maxWidth: "680px" }}>
                Book exclusive bundled treatment plans with US-FDA approved technologies, certified dermatologists, and guaranteed transparent pricing.
              </p>
            </div>
            <div className="bg-white bg-opacity-10 p-3 rounded-4 border text-center">
              <div className="small text-white-50">Toll-Free Booking Desk</div>
              <h5 className="fw-bold mb-0 text-warning">1800-209-5292</h5>
              <div className="small text-white-50">9:00 AM - 8:00 PM IST</div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="d-flex flex-wrap gap-2 mb-4 pb-2 border-bottom">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`btn btn-sm rounded-pill px-4 fw-semibold ${
                filterCat === cat ? "btn-dark shadow-sm" : "btn-light border text-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Offers Grid */}
        <div className="row g-4">
          {filtered.map((offer) => (
            <div key={offer.id} className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 rounded-4 shadow-sm bg-white overflow-hidden d-flex flex-column">
                
                {/* Image & Badges */}
                <div className="position-relative" style={{ height: "220px", overflow: "hidden", backgroundColor: "#f2f5f6" }}>
                  <span
                    className="position-absolute top-0 start-0 badge bg-danger m-3 shadow-sm"
                    style={{ fontSize: "0.8rem", letterSpacing: "0.5px" }}
                  >
                    {offer.discountTag}
                  </span>
                  <span
                    className="position-absolute top-0 end-0 badge bg-dark m-3 shadow-sm"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {offer.badge}
                  </span>
                  <img
                    src={offer.img}
                    alt={offer.title}
                    className="w-100 h-100 object-fit-cover"
                    style={{ transition: "transform 0.3s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>

                {/* Content */}
                <div className="p-4 d-flex flex-column flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-light text-primary border">{offer.category}</span>
                    <span className="small text-muted fw-semibold">📅 {offer.sessions}</span>
                  </div>

                  <h5 className="fw-bold text-dark mb-2">{offer.title}</h5>
                  <p className="small text-muted mb-3">{offer.desc}</p>

                  {/* Highlights Checklist */}
                  <div className="bg-light p-3 rounded-3 mb-3 border">
                    <div className="small fw-bold text-dark mb-1">✨ Package Inclusions:</div>
                    <ul className="list-unstyled mb-0 small text-secondary">
                      {offer.benefits.map((b, idx) => (
                        <li key={idx} className="d-flex align-items-center gap-1 mb-1">
                          <span className="text-success">✔</span> {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Promo Code Pill */}
                  <div className="d-flex justify-content-between align-items-center bg-white p-2 rounded-3 border mb-3">
                    <span className="small text-muted">Promo Code: <strong className="text-dark">{offer.code}</strong></span>
                    <button
                      onClick={() => handleCopy(offer.code)}
                      className="btn btn-sm btn-outline-dark rounded-pill px-3 py-1"
                      style={{ fontSize: "0.72rem" }}
                    >
                      {copiedCode === offer.code ? "✓ Copied" : "Copy Code"}
                    </button>
                  </div>

                  {/* Price & Action */}
                  <div className="d-flex justify-content-between align-items-center pt-3 border-top mt-auto">
                    <div>
                      <div className="text-muted text-decoration-line-through small" style={{ fontSize: "0.75rem" }}>
                        ₹{offer.originalPrice}
                      </div>
                      <h4 className="fw-bold text-dark mb-0">₹{offer.offerPrice}</h4>
                    </div>
                    <button
                      onClick={() => handleBook(offer)}
                      className="btn rounded-pill px-4 fw-bold text-white shadow-sm"
                      style={{ backgroundColor: "#0e3b43" }}
                    >
                      Book Offer →
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ServiceOffers;