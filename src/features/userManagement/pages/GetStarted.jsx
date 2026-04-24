import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./GetStarted.css";

import BrandLogo from "../../../assets/logo.png";
import SideImage from "../../../assets/request-side.png";

const GetStarted = () => {
  const navigate = useNavigate();

  // Get today's date in YYYY-MM-DD format for max date validation
  const today = new Date().toISOString().split('T')[0];

  const currentLogo = BrandLogo;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    centerName: "",
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

    // Navigate based on role
    if (form.role === "Owner") {
      navigate("/admin/dashboard");
    } else if (form.role === "Parent") {
      // Simulate Parent Request persistence
      const newRequest = {
        id: Date.now(),
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        type: "Parent",
        detail: `Child: ${form.childName}, DOB: ${form.dob}`,
        status: "New",
        statusClass: "new",
        timestamp: new Date().toLocaleString()
      };

      const existingRequests = JSON.parse(localStorage.getItem("pending_parent_requests") || "[]");
      localStorage.setItem("pending_parent_requests", JSON.stringify([...existingRequests, newRequest]));

      navigate("/request-confirmed");
    } else if (form.role === "Teacher" || form.role === "Other") {
      // Teachers go to a pending confirmation state
      navigate("/request-confirmed");
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="gs-page">
      {/* Top Bar */}
      <header className="gs-topbar">
        <div className="gs-brand">
          <img className="gs-logo" src={BrandLogo} alt="Sprouty" />
          <span className="gs-brand-name">SPROUTY</span>
        </div>

        <div className="gs-actions">
          <span className="gs-top-flag">
            <img src="https://flagcdn.com/w40/lk.png" alt="Sri Lanka Flag" style={{ width: '24px', borderRadius: '2px' }} />
          </span>
          <Link className="gs-back" to="/login">
            Log In
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="gs-wrap">
        <div className="gs-card">
          {/* LEFT: Promotion/Image */}
          <section className="gs-left">
            <h1 className="gs-title">
              Stop chasing paperwork. <br />
              <span className="gs-highlight">Start filling classrooms.</span>
            </h1>
            <p className="gs-subtitle">
              Join the centers worldwide using Sprouty. Get full access and simplify your childcare management.
            </p>

            <img
              src={SideImage}
              alt="Teachers and children playing"
              className="gs-img"
            />
          </section>

          {/* RIGHT: Form */}
          <section className="gs-right">
            <h2 className="gs-form-title">Get Access</h2>

            <form className="gs-form" onSubmit={handleSubmit}>
              {/* Row: First + Last Name */}
              <div className="gs-row2">
                <div>
                  <input
                    className="gs-input"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    className="gs-input"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <input
                  className="gs-input"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone */}
              <div className="gs-phone-container">
                <div className="gs-country-select">
                  <span className="gs-flag">
                    <img src="https://flagcdn.com/w40/lk.png" alt="Sri Lanka Flag" style={{ width: '20px', borderRadius: '2px' }} />
                  </span>
                  <select name="countryCode" className="gs-code-dropdown">
                    <option value="+94">LK +94</option>
                  </select>
                </div>
                <input
                  className="gs-input gs-phone-input"
                  type="text"
                  name="phone"
                  placeholder="e.g. 0712345678"
                  value={form.phone}
                  onChange={(e) => {
                    // Only allow numbers, max 10 digits
                    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setForm((prev) => ({ ...prev, phone: val }));
                  }}
                  minLength={10}
                  maxLength={10}
                  pattern="\d{10}"
                  title="Phone number must be exactly 10 digits"
                  required
                />
              </div>

              {/* Role Dropdown */}
              <div>
                <select
                  className="gs-select"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select your primary role*</option>
                  <option value="Owner">Owner</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Parent">Parent</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Conditional Fields based on Role */}
              {form.role === "Owner" && (
                <div className="gs-conditional">
                  <input
                    className="gs-input"
                    type="text"
                    name="centerName"
                    placeholder="Name of Center*"
                    value={form.centerName}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              {form.role === "Parent" && (
                <div className="gs-conditional gs-parent-group">
                  <h3 className="gs-conditional-title">Parent Request Details</h3>
                  <input
                    className="gs-input"
                    type="text"
                    name="childName"
                    placeholder="Child's Full Name*"
                    value={form.childName}
                    onChange={handleChange}
                    required
                  />

                  <div className="gs-row2">
                    <input
                      className="gs-input"
                      type="date"
                      name="dob"
                      max={today}
                      placeholder="Date of Birth*"
                      value={form.dob}
                      onChange={handleChange}
                      required
                      title="Date of birth cannot be in the future"
                    />
                    <input
                      className="gs-input"
                      type="text"
                      name="groupRoom"
                      placeholder="Group / Room*"
                      value={form.groupRoom}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <textarea
                    className="gs-textarea"
                    name="message"
                    placeholder="Message to Admin (Optional)"
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>
              )}

              <p className="gs-disclaimer">
                By submitting this form, you agree to the Sprouty Terms & Conditions,
                acknowledge the Privacy Policy, and consent to receive emails from Sprouty.
              </p>

              <button className="gs-btn" type="submit">
                Get Started
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
