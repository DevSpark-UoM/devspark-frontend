import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

import BrandLogo from "../../../assets/logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const currentLogo = BrandLogo;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset request for:", email);
  };

  return (
    <div className="fp-page">

      {/* ===== TOP BAR (Same as Login) ===== */}
      <header className="fp-topbar">
        <div className="fp-brand">
          <img src={BrandLogo} alt="Sprouty logo" className="fp-logo" />
          <span className="fp-brand-name">SPROUTY</span>
        </div>
      </header>

      {/* ===== CENTER CARD ===== */}
      <div className="fp-center">
        <div className="fp-card">

          <h1 className="fp-title">Forgot your password?</h1>
          <p className="fp-subtitle">
            Enter the email address you use to sign In.
          </p>

          <form onSubmit={handleSubmit} className="fp-form">

            <label className="fp-label">Email</label>
            <input
              type="email"
              className="fp-input"
              placeholder="abc@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" className="fp-btn">
              Request Reset
            </button>
          </form>

          <Link to="/" className="fp-back">
            Back to sign in
          </Link>

        </div>
      </div>

    </div>
  );
};

export default ForgotPassword;