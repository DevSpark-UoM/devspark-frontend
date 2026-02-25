import React from "react";
import { Link } from "react-router-dom";
import "./RequestForm.css"; // reuse same styling

import BrandLogo from "../assets/logo.jpeg";
import ConfirmImg from "../assets/request-confirm.png"; // add image

const RequestConfirmed = () => {
  return (
    <div className="rf-page">
      <header className="rf-topbar">
        <div className="rf-brand">
          <img className="rf-logo" src={BrandLogo} alt="Sprouty logo" />
          <span className="rf-name">Sprouty</span>
        </div>

        <Link className="rf-top-link" to="/">
          Back to Login
        </Link>
      </header>

      <main className="rf-wrap">
        <section className="rf-card">
          <div className="rf-left" style={{ textAlign: "center" }}>
            <div style={{
              width: 54, height: 54, borderRadius: "50%",
              background: "rgba(17,183,214,0.15)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              marginBottom: 14
            }}>
              <span style={{ fontSize: 24, color: "#11b7d6", fontWeight: 900 }}>✓</span>
            </div>

            <h1 className="rf-title">Request Submitted!</h1>
            <p className="rf-subtitle" style={{ maxWidth: 520, margin: "0 auto 18px" }}>
              Thank you for requesting access. The childcare administrator has been
              notified and will review your details shortly.</p>
         <p className="rf-subtitle" style={{ maxWidth: 520, margin: "0 auto 18px" }}>
         You will receive an email confirmation with log In instructions once
                your request is approved </p>

            <Link to="/" style={{ display: "inline-block" }}>
              <button className="rf-btn" style={{ width: 220 }}>
                Back to Log in
              </button>
            </Link>
          </div>

          <div className="rf-right">
            <img className="rf-side-img" src={ConfirmImg} alt="Confirmed" />
          </div>
        </section>
      </main>
    </div>
  );
};