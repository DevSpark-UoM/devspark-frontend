import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RequestForm.css";

import BrandLogo from "../assets/logo.jpeg";
import SideImage from "../assets/request-side.png";

const RequestForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    childName: "",
    dob: "",
    groupRoom: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: later connect to backend API
    console.log("Request Form Data:", form);

    // Navigate to confirmation page (if you created it)
    navigate("/request-confirmed");
  };

  return (
    <div className="rf-page">
      {/* Top Bar */}
      <header className="rf-topbar">
        <div className="rf-brand">
          <img className="rf-logo" src={BrandLogo} alt="Sprouty" />
          <span className="rf-brand-name">Sprouty</span>
        </div>

        <Link className="rf-back" to="/login">
          Back to Login
        </Link>
      </header>

      {/* Center Wrapper */}
      <div className="rf-wrap">
        <div className="rf-card">
          {/* LEFT */}
          <section className="rf-left">
            <h1 className="rf-title">Join your community</h1>
            <p className="rf-subtitle">
              Request access to your childcare center. Your administrator will review and approve
              your profile.
            </p>

            <form className="rf-form" onSubmit={handleSubmit}>
              {/* Row: First + Last */}
              <div className="rf-row2">
                <div>
                  <label className="rf-label">First Name</label>
                  <input
                    className="rf-input"
                    type="text"
                    name="firstName"
                    placeholder="Jane"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="rf-label">Last Name</label>
                  <input
                    className="rf-input"
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="rf-label">Email Address</label>
                <input
                  className="rf-input"
                  type="email"
                  name="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Child name */}
              <div>
                <label className="rf-label">Child&apos;s Full Name</label>
                <input
                  className="rf-input"
                  type="text"
                  name="childName"
                  placeholder="e.g., Leo Doe"
                  value={form.childName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Row: DOB + Group */}
              <div className="rf-row2">
                <div>
                  <label className="rf-label">Date of Birth</label>
                  <input
                    className="rf-input"
                    type="text"
                    name="dob"
                    placeholder="mm/dd/yyyy"
                    value={form.dob}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="rf-label">Group / Room</label>
                  <input
                    className="rf-input"
                    type="text"
                    name="groupRoom"
                    placeholder="e.g., Toddlers"
                    value={form.groupRoom}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="rf-label">Message to Admin (Optional)</label>
                <textarea
                  className="rf-textarea"
                  name="message"
                  placeholder="Any specific notes or questions?"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              <button className="rf-btn" type="submit">
                Submit Request
              </button>

              <p className="rf-bottom">
                Don&apos;t have an account?{" "}
                <Link className="rf-link" to="/request-form">
                  Sign up here
                </Link>
              </p>
            </form>
          </section>

          {/* RIGHT */}
          <section className="rf-right">
            <img src={SideImage} alt="Request illustration" />
          </section>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;