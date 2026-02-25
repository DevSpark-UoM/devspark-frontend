import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { login as doLogin } from "../utils/auth";
import { FiSettings } from "react-icons/fi";

import BabyImage from "../assets/login.png";
import BrandLogo from "../assets/logo.jpeg";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const res = doLogin(email, password);

    if (res.ok) {
      navigate("/dashboard");
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="login-page">

      {/* ===== Top Bar ===== */}
      <header className="topbar">
        <div className="brand">
          <img className="brand-logo" src={BrandLogo} alt="Sprouty logo" />
          <span className="brand-name">SPROUTY</span>
        </div>

        <button className="icon-btn">
          <FiSettings size={20} />
        </button>
      </header>

      {/* ===== Main Section ===== */}
      <main className="login-main">

        {/* Left: Form */}
        <section className="login-left">
          <h1 className="title">Welcome back</h1>
          <p className="subtitle">
            Please enter your details to access your dashboard.
          </p>

          <form className="form" onSubmit={handleSubmit}>

            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              placeholder="admin@sprouty.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              placeholder="Sprouty@123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Error message */}
            {error && (
              <p style={{ color: "crimson", fontSize: "12px" }}>
                {error}
              </p>
            )}

            <div className="row">
              <span />
              <Link className="link" to="/forgot-password">
                Forgot password?
              </Link>
            </div>

            <button className="login-btn" type="submit">
              Log In
            </button>

            <p className="bottom-text">
              Don’t have an account?{" "}
              <Link className="link" to="/request-access">
                Sign Up
              </Link>
            </p>

            <div className="info">
              <span className="info-icon">i</span>
              <span>
                This sign-in page is intended exclusively for users within your organization.
              </span>
            </div>

          </form>
        </section>

        {/* Right: Image */}
        <section className="login-right">
          <img className="baby-img" src={BabyImage} alt="Baby illustration" />
        </section>

      </main>
    </div>
  );
};

export default Login;