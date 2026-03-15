import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import BabyImage from "../../../assets/login.png"; // Fallback
import ModernHero from "../../../assets/login.png";
import BrandLogo from "../../../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();

  const currentLogo = BrandLogo;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Hardcoded login for frontend testing
      if (email === "sprouty@gmail.com" && password === "abc@123") {
        localStorage.setItem("admin", JSON.stringify({ email: email, role: "Admin" }));
        navigate("/admin/dashboard");
        return;
      }

      // Check for approved parents in localStorage (Simulated Backend)
      const approvedUsers = JSON.parse(localStorage.getItem("approved_users") || "[]");
      const user = approvedUsers.find(u => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        if (user.role === "Parent") {
          navigate("/parent/dashboard");
        } else {
          navigate("/admin/dashboard");
        }
        return;
      }

      const response = await axios.post("http://localhost:8080/admin/login", {
        email,
        password,
      });

      if (response.data) {
        localStorage.setItem("admin", JSON.stringify(response.data));
        navigate("/admin/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        setError(`Login failed: ${err.response.status}`);
      } else {
        setError("Backend not reachable. Use sprouty@gmail.com / abc@123");
      }
    }
  };

  return (
    <div className="login-page">
      <header className="topbar">
        <div className="brand">
          <img className="brand-logo" src={BrandLogo} alt="Sprouty logo" />
          <span className="brand-name">SPROUTY</span>
        </div>
      </header>

      <main className="login-main">
        <section className="login-left">
          <h1 className="title">Welcome Back!</h1>
          <p className="subtitle">
            Please enter your details to access your dashboard.
          </p>

          <form className="form" onSubmit={handleSubmit}>
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              placeholder="sprouty@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              placeholder="abc@123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <p style={{ color: "crimson", fontSize: "12px" }}>{error}</p>
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
              <Link className="link" to="/get-started">
                Sign Up
              </Link>
            </p>

            <div className="info">
              <span className="info-icon">i</span>
              <span>
                This sign-in page is intended exclusively for users within your
                organization.
              </span>
            </div>
          </form>
        </section>

        <section className="login-right">
          <img className="baby-img" src={ModernHero} alt="Sprouty Education" />
        </section>
      </main>
    </div>
  );
};

export default Login;