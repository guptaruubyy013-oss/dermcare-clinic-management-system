import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#000000", color: "#ffffff", paddingTop: "4rem", paddingBottom: "2rem" }}>
      <div className="container">
        <div className="row g-4 border-bottom pb-5 border-secondary border-opacity-25 small">
          
          {/* 1. Services Column */}
          <div className="col-6 col-md-4 col-lg-2">
            <h6 className="fw-bold text-white mb-3 text-uppercase" style={{ fontSize: "0.85rem", letterSpacing: "0.5px" }}>
              Services
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 text-white-50 mb-0">
              <li><Link to="/services" className="text-decoration-none text-white-50 hover-white">Laser Hair Reduction</Link></li>
              <li><Link to="/services" className="text-decoration-none text-white-50 hover-white">Acne Scar Treatment</Link></li>
              <li><Link to="/services" className="text-decoration-none text-white-50 hover-white">Anti-Ageing Facials</Link></li>
              <li><Link to="/services" className="text-decoration-none text-white-50 hover-white">Hair Loss (GFC/PRP)</Link></li>
              <li><Link to="/services" className="text-decoration-none text-white-50 hover-white">Skin Brightening</Link></li>
              <li><Link to="/services" className="text-decoration-none text-white-50 hover-white">HydraFacial Vortex</Link></li>
              <li><Link to="/services" className="text-decoration-none text-white-50 hover-white">Chemical Peels</Link></li>
              <li><Link to="/services" className="text-decoration-none text-white-50 hover-white">Ultracel HIFU Lift</Link></li>
            </ul>
          </div>

          {/* 2. Products Column */}
          <div className="col-6 col-md-4 col-lg-2">
            <h6 className="fw-bold text-white mb-3 text-uppercase" style={{ fontSize: "0.85rem", letterSpacing: "0.5px" }}>
              Products
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 text-white-50 mb-0">
              <li><Link to="/products" className="text-decoration-none text-white-50 hover-white">Face Wash</Link></li>
              <li><Link to="/products" className="text-decoration-none text-white-50 hover-white">Face Cleansers</Link></li>
              <li><Link to="/products" className="text-decoration-none text-white-50 hover-white">Toners & Mists</Link></li>
              <li><Link to="/products" className="text-decoration-none text-white-50 hover-white">Moisturizers & Creams</Link></li>
              <li><Link to="/products" className="text-decoration-none text-white-50 hover-white">Active Serums</Link></li>
              <li><Link to="/products" className="text-decoration-none text-white-50 hover-white">Scalp & Hair Care</Link></li>
              <li><Link to="/products" className="text-decoration-none text-white-50 hover-white">Sunscreen Gel SPF 50</Link></li>
            </ul>
          </div>

          {/* 3. Popular Formulations */}
          <div className="col-6 col-md-4 col-lg-2">
            <h6 className="fw-bold text-white mb-3 text-uppercase" style={{ fontSize: "0.85rem", letterSpacing: "0.5px" }}>
              Popular Products
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 text-white-50 mb-0">
              <li><Link to="/products" className="text-decoration-none text-white-50 hover-white">Oily Skin Regimen</Link></li>
              <li><Link to="/products" className="text-decoration-none text-white-50 hover-white">Sensitive Barrier Kit</Link></li>
              <li><Link to="/products" className="text-decoration-none text-white-50 hover-white">Collagen Boost Powder</Link></li>
              <li><Link to="/products" className="text-decoration-none text-white-50 hover-white">Collagen Peptide Serum</Link></li>
              <li><Link to="/products" className="text-decoration-none text-white-50 hover-white">Hair Growth Redensyl Serum</Link></li>
              <li><Link to="/products" className="text-decoration-none text-white-50 hover-white">Dry Skin Ceramide Kit</Link></li>
            </ul>
          </div>

          {/* 4. Skin Concern */}
          <div className="col-6 col-md-4 col-lg-2">
            <h6 className="fw-bold text-white mb-3 text-uppercase" style={{ fontSize: "0.85rem", letterSpacing: "0.5px" }}>
              Skin Concern
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 text-white-50 mb-0">
              <li><Link to="/services" className="text-decoration-none text-white-50 hover-white">Acne Prone</Link></li>
              <li><Link to="/services" className="text-decoration-none text-white-50 hover-white">Anti Ageing</Link></li>
              <li><Link to="/services" className="text-decoration-none text-white-50 hover-white">Pigmentation</Link></li>
              <li><Link to="/services" className="text-decoration-none text-white-50 hover-white">Dullness & Tanning</Link></li>
              <li><Link to="/services" className="text-decoration-none text-white-50 hover-white">Dryness & Flaking</Link></li>
              <li><Link to="/services" className="text-decoration-none text-white-50 hover-white">Dark Circle Treatment</Link></li>
              <li><Link to="/services" className="text-decoration-none text-white-50 hover-white">Microneedling RF</Link></li>
            </ul>
          </div>

          {/* 5. City Locator */}
          <div className="col-6 col-md-4 col-lg-2">
            <h6 className="fw-bold text-white mb-3 text-uppercase" style={{ fontSize: "0.85rem", letterSpacing: "0.5px" }}>
              City Locator
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 text-white-50 mb-0">
              <li><span className="text-white-50">Dermatologist in Delhi</span></li>
              <li><span className="text-white-50">Dermatologist in Mumbai</span></li>
              <li><span className="text-white-50">Dermatologist in Bangalore</span></li>
              <li><span className="text-white-50">Dermatologist in Chennai</span></li>
              <li><span className="text-white-50">Dermatologist in Hyderabad</span></li>
              <li><span className="text-white-50">Dermatologist in Pune</span></li>
              <li><span className="text-white-50">Dermatologist in Kolkata</span></li>
            </ul>
          </div>

          {/* 6. Company Info */}
          <div className="col-6 col-md-4 col-lg-2">
            <h6 className="fw-bold text-white mb-3 text-uppercase" style={{ fontSize: "0.85rem", letterSpacing: "0.5px" }}>
              Company
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 text-white-50 mb-0">
              <li><Link to="/" className="text-decoration-none text-white-50 hover-white">About Us</Link></li>
              <li><Link to="/" className="text-decoration-none text-white-50 hover-white">Clinical Team</Link></li>
              <li><Link to="/service-offers" className="text-decoration-none text-white-50 hover-white">Service Offers</Link></li>
              <li><Link to="/" className="text-decoration-none text-white-50 hover-white">Careers</Link></li>
              <li><Link to="/" className="text-decoration-none text-white-50 hover-white">Terms & Conditions</Link></li>
              <li><Link to="/" className="text-decoration-none text-white-50 hover-white">Privacy Policy</Link></li>
              <li><Link to="/" className="text-decoration-none text-white-50 hover-white">Operational Clinics</Link></li>
            </ul>
          </div>

        </div>

        <div className="d-flex flex-wrap justify-content-between align-items-center pt-4 small text-white-50">
          <div>© 2026 DermCare Clinics India. All Rights Reserved. US-FDA Protocols.</div>
          <div>Dermatologist Helpline: <strong>1800-209-5292</strong></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;