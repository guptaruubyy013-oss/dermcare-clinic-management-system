import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AIAnalyzerModal from "../../components/AIAnalyzerModal/AIAnalyzerModal";
import laserArmImg from "../../assets/images/laser-arm.jpg";
import "./Home.css";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80";

const promotionalCards = [
  {
    id: "p1",
    title: "Stubborn acne scars?",
    subtitle: "Try our expert-led DermCare Acne Scars Treatment",
    discount: "Get up to 20% OFF*",
    btnText: "BOOK NOW",
    link: "/appointment",
    img: "https://images.unsplash.com/photo-1512290903671-17adc520970a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p2",
    title: "Worried about aging?",
    subtitle: "Try our expert-led DermCare Anti-Aging Treatment",
    discount: "Get up to 30% OFF*",
    btnText: "BOOK NOW",
    link: "/appointment",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p3",
    title: "Dull skin worries?",
    subtitle: "Try DermCare's Beauty Facial for glowing skin",
    discount: "BUY 1 GET 1 Free*",
    subNote: "On Facial Packages",
    btnText: "BOOK NOW",
    link: "/appointment",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p4",
    title: "Hairfall anxiety?",
    subtitle: "Try DermCare's Hair Care Services",
    discount: "Get FLAT 25% OFF*",
    btnText: "BOOK NOW",
    link: "/appointment",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p5",
    title: "Tired of shaving?",
    subtitle: "Try DermCare's Laser Hair Reduction for smooth skin",
    discount: "BUY 1 GET 1 Free*",
    subNote: "Get a friend and get on Packages",
    btnText: "BOOK NOW",
    link: "/appointment",
    img: laserArmImg,
  },
  {
    id: "p6",
    title: "Block the burn, keep the glow",
    subtitle: "Dermatologist formulated Sunscreens & Barrier Care",
    discount: "FLAT 15% OFF On Skincare Kits",
    btnText: "SHOP NOW",
    link: "/products",
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
  },
];

const skinHairConcerns = [
  {
    title: "Acne & Scars",
    tag: "Skin",
    img: "https://images.unsplash.com/photo-1512290903671-17adc520970a?auto=format&fit=crop&w=300&q=80",
    link: "/services",
  },
  {
    title: "Anti-Ageing & Lift",
    tag: "Skin",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    link: "/services",
  },
  {
    title: "Laser Hair Removal",
    tag: "Body",
    img: laserArmImg,
    link: "/services",
  },
  {
    title: "Pigmentation & Glow",
    tag: "Skin",
    img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=300&q=80",
    link: "/services",
  },
  {
    title: "Hair Fall & PRP",
    tag: "Hair",
    img: "https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&w=300&q=80",
    link: "/services",
  },
  {
    title: "Dandruff & Scalp Detox",
    tag: "Hair",
    img: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=300&q=80",
    link: "/services",
  },
];

const featuredClinicalSolutions = [
  {
    title: "Q-Switched Nd:YAG Laser Melasma Peel",
    category: "Skin Laser Care",
    sessions: "4 Sessions",
    badge: "Most Popular",
    price: "₹3,500",
    img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=700&q=80",
    desc: "Targeted laser wavelengths breaking deep melanin deposits to restore radiant balance.",
  },
  {
    title: "Scalp Growth Factor Concentrate (GFC)",
    category: "Trichology Tech",
    sessions: "3 Sessions",
    badge: "Doctor's Choice",
    price: "₹6,500",
    img: "https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&w=700&q=80",
    desc: "Acellular concentrated platelet growth factors delivered directly to dormant follicles.",
  },
  {
    title: "Medical Hydra-Vortex Dermabrasion",
    category: "Facial Infusion",
    sessions: "Single / Plan",
    badge: "Zero Downtime",
    price: "₹2,800",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=700&q=80",
    desc: "Multi-stage vortex extraction of sebum plugs and antioxidant micro-infusion.",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  const [expertForm, setExpertForm] = useState({
    name: "",
    mobile: "",
    city: "Mumbai",
    agree: true,
  });

  const [quickForm, setQuickForm] = useState({
    fullName: "",
    phone: "",
    concern: "Acne, Breakouts & Open Pores",
  });

  const handleExpertSubmit = (e) => {
    e.preventDefault();
    if (!expertForm.name || !expertForm.mobile) {
      alert("Please provide your name and contact mobile number.");
      return;
    }
    navigate("/appointment", {
      state: {
        quickBooking: {
          patientName: expertForm.name,
          phone: expertForm.mobile,
          concern: `Consultation (${expertForm.city} Clinic)`,
        },
      },
    });
  };

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    if (!quickForm.fullName || !quickForm.phone) {
      alert("Please enter your name and phone number.");
      return;
    }
    navigate("/appointment", {
      state: {
        quickBooking: {
          patientName: quickForm.fullName,
          phone: quickForm.phone,
          concern: quickForm.concern,
        },
      },
    });
  };

  return (
    <div className="kaya-home-root">
      
      {/* 1. Horizontal "Talk to Experts" Bar */}
      <section className="bg-black py-3 border-top border-bottom border-dark text-white">
        <div className="container">
          <form onSubmit={handleExpertSubmit} className="row g-2 align-items-center justify-content-between">
            <div className="col-lg-2">
              <h5 className="fw-bold mb-0 text-white" style={{ letterSpacing: "0.5px" }}>
                Talk to experts
              </h5>
            </div>

            <div className="col-md-3 col-lg-2">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white border-0">👤</span>
                <input
                  type="text"
                  className="form-control border-0 py-2"
                  placeholder="Name"
                  value={expertForm.name}
                  onChange={(e) => setExpertForm({ ...expertForm, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="col-md-3 col-lg-2">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white border-0">📞</span>
                <input
                  type="tel"
                  className="form-control border-0 py-2"
                  placeholder="Mobile"
                  value={expertForm.mobile}
                  onChange={(e) => setExpertForm({ ...expertForm, mobile: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="col-md-3 col-lg-2">
              <select
                className="form-select form-select-sm border-0 py-2"
                value={expertForm.city}
                onChange={(e) => setExpertForm({ ...expertForm, city: e.target.value })}
              >
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Pune">Pune</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
              </select>
            </div>

            <div className="col-auto d-flex align-items-center gap-2">
              <input
                type="checkbox"
                id="agreeTC"
                checked={expertForm.agree}
                onChange={(e) => setExpertForm({ ...expertForm, agree: e.target.checked })}
                className="form-check-input"
              />
              <label htmlFor="agreeTC" className="small text-white-50 mb-0" style={{ fontSize: "0.78rem" }}>
                I agree to T&C
              </label>
            </div>

            <div className="col-md-2 col-lg-2">
              <button
                type="submit"
                className="btn w-100 py-2 fw-bold text-white shadow-sm"
                style={{ backgroundColor: "#bf7b48", borderColor: "#bf7b48" }}
              >
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 2. Hero Section */}
      <section className="kaya-hero-banner py-5">
        <div className="container py-lg-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span className="badge kaya-gold-pill rounded-pill px-3 py-2 mb-3 text-uppercase">
                ✨ Dermatology & Trichology Authority
              </span>
              <h1 className="display-4 fw-bold text-white kaya-serif mb-3" style={{ lineHeight: "1.2" }}>
                Targeted Skin & Hair Solutions <br />
                <span style={{ color: "#c5a880" }}>Formulated By Doctors.</span>
              </h1>
              <p className="lead text-white-50 mb-4" style={{ fontSize: "1.1rem", maxWidth: "600px" }}>
                Over two decades of clinical expertise with US-FDA approved technologies and custom dermatological formulations tailored for Indian skin & hair types.
              </p>

              <div className="d-flex flex-wrap gap-2 mb-4">
                <span className="badge bg-white bg-opacity-10 text-white border border-white border-opacity-25 rounded-pill px-3 py-2">
                  ✓ 100+ Board-Certified Dermatologists
                </span>
                <span className="badge bg-white bg-opacity-10 text-white border border-white border-opacity-25 rounded-pill px-3 py-2">
                  ✓ 100% US-FDA Certified Protocols
                </span>
                <span className="badge bg-white bg-opacity-10 text-white border border-white border-opacity-25 rounded-pill px-3 py-2">
                  ✓ 50,000+ Treated Patients
                </span>
              </div>

              <div className="d-flex flex-wrap gap-3">
                <Link
                  to="/appointment"
                  className="btn rounded-pill px-4 py-2 fw-bold text-dark shadow-sm"
                  style={{ backgroundColor: "#c5a880", borderColor: "#c5a880" }}
                >
                  Book Expert Consultation →
                </Link>
                <Link to="/services" className="btn btn-outline-light rounded-pill px-4 py-2 fw-semibold">
                  Explore Clinical Procedures
                </Link>
                <Link to="/service-offers" className="btn btn-warning rounded-pill px-4 py-2 fw-bold text-dark">
                  Seasonal Offers ⚡
                </Link>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="kaya-quick-card p-4 p-md-5">
                <div className="text-center mb-3">
                  <span className="badge bg-light text-dark border rounded-pill px-3 py-1 small fw-semibold">
                    1-on-1 Consultation
                  </span>
                  <h4 className="fw-bold text-dark kaya-serif mt-2 mb-1">Book Clinic Visit</h4>
                  <p className="text-muted small mb-0">Doctor skin & hair analysis</p>
                </div>

                <form onSubmit={handleHeroSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: "0.72rem" }}>
                      Patient Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-3 py-2"
                      placeholder="e.g. Ruby Gupta"
                      value={quickForm.fullName}
                      onChange={(e) => setQuickForm({ ...quickForm, fullName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: "0.72rem" }}>
                      10-Digit Mobile Number
                    </label>
                    <input
                      type="tel"
                      className="form-control rounded-3 py-2"
                      placeholder="e.g. 9876543210"
                      value={quickForm.phone}
                      onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: "0.72rem" }}>
                      Primary Concern
                    </label>
                    <select
                      className="form-select rounded-3 py-2"
                      value={quickForm.concern}
                      onChange={(e) => setQuickForm({ ...quickForm, concern: e.target.value })}
                    >
                      <option value="Acne, Breakouts & Open Pores">Acne, Breakouts & Open Pores</option>
                      <option value="Melasma, Dark Spots & Tanning">Melasma, Dark Spots & Tanning</option>
                      <option value="Excessive Hair Fall & Thinning">Excessive Hair Fall & Thinning</option>
                      <option value="Dandruff & Scalp Itch">Dandruff & Scalp Itch</option>
                      <option value="Fine Lines, Wrinkles & Anti-Ageing">Fine Lines, Wrinkles & Anti-Ageing</option>
                      <option value="Unwanted Facial / Body Hair">Unwanted Facial / Body Hair</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn w-100 rounded-pill py-2 fw-bold text-white shadow-sm"
                    style={{ backgroundColor: "#0b2e2b" }}
                  >
                    Confirm Clinic Visit →
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Kaya 6-Card Peach Promo Grid */}
      <section className="py-5" style={{ backgroundColor: "#fffdfa" }}>
        <div className="container">
          <div className="row g-4">
            {promotionalCards.map((card) => (
              <div key={card.id} className="col-md-6">
                <div className="kaya-promo-card">
                  
                  {/* Left Content */}
                  <div className="promo-left-content">
                    <div>
                      <h4 className="promo-title">{card.title}</h4>
                      <p className="promo-subtitle">{card.subtitle}</p>
                      <div className="promo-divider"></div>
                      <div className="promo-discount">{card.discount}</div>
                      {card.subNote && (
                        <div className="text-muted small mb-2" style={{ fontSize: "0.75rem", marginTop: "-6px" }}>
                          {card.subNote}
                        </div>
                      )}
                    </div>

                    <Link to={card.link} className="btn-promo-action">
                      {card.btnText}
                    </Link>
                  </div>

                  {/* Right Curved Visual */}
                  <div className="promo-right-visual">
                    <img
                      src={card.img}
                      alt={card.title}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = FALLBACK_IMG;
                      }}
                    />
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AI Skin Analyser Full-Width Banner with Face Scan Grid */}
      <section className="kaya-ai-skin-banner">
        <div className="container">
          <div className="row align-items-center g-4">
            
            <div className="col-md-6 text-center position-relative">
              <div className="ai-scanner-visual-wrapper mx-auto">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
                  alt="AI Skin Diagnostic Face Scan"
                  className="ai-scanner-base-img"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_IMG;
                  }}
                />

                <svg className="ai-face-mesh-svg" viewBox="0 0 400 400">
                  <path
                    d="M 140,90 Q 200,65 260,90 Q 200,115 140,90 Z"
                    fill="rgba(255, 255, 255, 0.08)"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    className="ai-pulse-path"
                  />
                  <circle cx="200" cy="88" r="3" fill="#ffffff" />
                  <text x="208" y="92" fill="#ffffff" fontSize="10" fontFamily="sans-serif">01</text>

                  <path
                    d="M 195,115 L 210,115 L 205,170 L 190,170 Z"
                    fill="rgba(255, 255, 255, 0.08)"
                    stroke="#ffffff"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                  />
                  <text x="214" y="145" fill="#ffffff" fontSize="9" fontFamily="sans-serif">02</text>

                  <path
                    d="M 120,165 Q 165,150 175,200 Q 160,255 125,235 Q 105,200 120,165 Z"
                    fill="rgba(255, 255, 255, 0.12)"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeDasharray="5 3"
                    className="ai-pulse-path"
                  />
                  <circle cx="150" cy="205" r="3.5" fill="#ffffff" />
                  <text x="157" y="210" fill="#ffffff" fontSize="10" fontFamily="sans-serif">03</text>

                  <path
                    d="M 170,270 Q 200,260 230,270 Q 215,300 185,295 Z"
                    fill="rgba(255, 255, 255, 0.08)"
                    stroke="#ffffff"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                  />
                  <circle cx="200" cy="282" r="3" fill="#ffffff" />
                  <text x="208" y="286" fill="#ffffff" fontSize="9" fontFamily="sans-serif">04</text>
                </svg>

                <div className="ai-laser-scanner-line"></div>
              </div>
            </div>

            <div className="col-md-6 text-center text-md-start">
              <h1 className="display-4 fw-normal kaya-serif text-dark mb-3">AI Skin Analyser</h1>
              
              <div className="d-flex flex-column gap-2 mb-3 align-items-center align-items-md-start">
                <span className="ai-tag-beige">Curated by 100+ Dermatologists</span>
                <span className="ai-tag-soft">Powered by Artificial Intelligence</span>
              </div>

              <p className="text-secondary mb-4" style={{ fontSize: "1.05rem" }}>
                Click to unveil a personalised skincare routine based on dermal AI analysis.
              </p>

              <button onClick={() => setIsAIModalOpen(true)} className="btn-ai-start shadow-sm">
                Start Analysis
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Concern-Based Visual Category Circles */}
      <section className="py-5 bg-white border-bottom">
        <div className="container">
          <div className="text-center mb-4">
            <span className="badge bg-light text-primary border rounded-pill px-3 py-1 fw-semibold small">
              Specialized Care
            </span>
            <h3 className="fw-bold text-dark kaya-serif mt-2 mb-1">Explore By Concern</h3>
            <p className="text-muted small">Select your primary aesthetic concern to view verified medical regimens.</p>
          </div>

          <div className="row g-4 text-center justify-content-center">
            {skinHairConcerns.map((c, idx) => (
              <div key={idx} className="col-4 col-md-2">
                <Link to={c.link} className="concern-circle-card">
                  <div className="concern-circle-img-wrap">
                    <img
                      src={c.img}
                      alt={c.title}
                      className="w-100 h-100 object-fit-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = FALLBACK_IMG;
                      }}
                    />
                  </div>
                  <h6 className="fw-bold text-dark small mb-0">{c.title}</h6>
                  <span className="badge bg-light text-muted border mt-1" style={{ fontSize: "0.68rem" }}>
                    {c.tag}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Featured Clinical Procedures Strip */}
      <section className="py-5" style={{ backgroundColor: "#fbf9f5" }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <span className="badge bg-white text-dark border rounded-pill px-3 py-1 small fw-semibold">
                Clinical Technologies
              </span>
              <h3 className="fw-bold text-dark kaya-serif mt-2 mb-0">Doctor-Led Procedures</h3>
            </div>
            <Link to="/services" className="btn btn-outline-dark btn-sm rounded-pill px-4 fw-bold">
              View All 16 Procedures →
            </Link>
          </div>

          <div className="row g-4">
            {featuredClinicalSolutions.map((item, idx) => (
              <div key={idx} className="col-md-4">
                <div className="kaya-proc-card h-100 d-flex flex-column overflow-hidden">
                  <div className="proc-img-box">
                    <span className="position-absolute top-0 start-0 badge bg-dark m-3 shadow-sm" style={{ fontSize: "0.75rem" }}>
                      {item.badge}
                    </span>
                    <span className="position-absolute top-0 end-0 badge bg-warning text-dark m-3 shadow-sm fw-bold">
                      {item.sessions}
                    </span>
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-100 h-100 object-fit-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = FALLBACK_IMG;
                      }}
                    />
                  </div>

                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <span className="badge bg-light text-secondary border align-self-start mb-2 small">
                      {item.category}
                    </span>
                    <h5 className="fw-bold text-dark mb-2">{item.title}</h5>
                    <p className="small text-muted mb-3">{item.desc}</p>
                    
                    <div className="d-flex justify-content-between align-items-center pt-3 border-top mt-auto">
                      <div>
                        <span className="text-muted small d-block" style={{ fontSize: "0.72rem" }}>Starting from</span>
                        <h5 className="fw-bold text-dark mb-0">{item.price}</h5>
                      </div>
                      <Link
                        to="/services"
                        className="btn btn-sm rounded-pill px-3 fw-bold text-white"
                        style={{ backgroundColor: "#0b2e2b" }}
                      >
                        Explore →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Welcome to Clinic Editorial Section */}
      <section className="py-5 bg-white border-top">
        <div className="container text-center py-4" style={{ maxWidth: "900px" }}>
          <h2 className="kaya-serif fw-bold text-dark mb-3" style={{ fontSize: "2.4rem" }}>
            DermCare Clinic
          </h2>
          <h4 className="fw-bold text-dark mb-3">
            Welcome to DermCare Clinics – India’s Leading Skin & Hair Care Clinic
          </h4>
          <p className="text-secondary leading-relaxed mb-4" style={{ fontSize: "0.95rem", lineHeight: "1.8" }}>
            Looking for the best skin clinic near you? DermCare Clinics is your trusted partner for advanced skin and hair treatments in India. With state-of-the-art clinics in every major city, we bring world-class dermatology care closer to you. At DermCare Clinics, our team of expert skin specialists and dermatologists understand the unique needs of Indian skin. Whether you're dealing with acne, pigmentation, hair loss, or signs of aging, we offer customized treatments backed by science and technology.
          </p>

          <h5 className="fw-bold text-dark mb-3">Why Choose DermCare Clinics for Your Skin & Hair Needs?</h5>
          <div className="row g-3 text-start justify-content-center">
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 border">
                <strong>✔ India’s most trusted network</strong> of skin clinics and certified dermatologists.
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 border">
                <strong>✔ Personalized consultation</strong> with experienced skin doctors near you.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Clinic Skincare Authority Section */}
      <section className="py-5 border-top" style={{ backgroundColor: "#fcfbf9" }}>
        <div className="container text-center py-4" style={{ maxWidth: "900px" }}>
          <h2 className="kaya-serif fw-bold text-dark mb-3" style={{ fontSize: "2.4rem" }}>
            DermCare Skin Care
          </h2>
          <p className="text-secondary leading-relaxed mb-4" style={{ fontSize: "0.95rem", lineHeight: "1.8" }}>
            With <strong>18+ years of dermatology expertise</strong>, DermCare brings you a premium range of <strong>dermatologist-recommended skincare products</strong> designed specifically for Indian skin tones and concerns. From <strong>acne and pigmentation</strong> to <strong>anti-aging and hydration</strong>, DermCare offers <strong>science-backed skincare solutions</strong> for both men and women.
          </p>
          <p className="text-secondary leading-relaxed mb-4" style={{ fontSize: "0.95rem", lineHeight: "1.8" }}>
            Shop the <strong>best skin care products in India</strong> online with ease — each formula is developed by dermatologists using advanced technology to target your unique skin needs. Experience the confidence that comes with truly healthy, radiant skin — powered by DermCare.
          </p>
          <Link to="/products" className="btn btn-dark rounded-pill px-4 py-2 fw-bold">
            Shop Dermatology Formulations →
          </Link>
        </div>
      </section>

      {/* Pop-up AI Skin & Scalp Analyser Modal */}
      <AIAnalyzerModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} />
    </div>
  );
};

export default Home;