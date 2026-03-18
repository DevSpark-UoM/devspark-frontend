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

    // --- MOCK FALLBACK (Check localStorage first for evaluation) ---
    const approvedUsers = JSON.parse(localStorage.getItem("approved_users") || "[]");
    const mockUser = approvedUsers.find(u => u.email === email && u.password === password);
    
    // Also check for the hardcoded Admin for convenience
    if (email === "sprouty@gmail.com" && password === "abc@123") {
      localStorage.setItem("user", JSON.stringify({ email, firstName: "Anu", lastName: "Agarwal", role: "Admin" }));
      navigate("/admin/dashboard");
      return;
    }

    if (mockUser) {
      localStorage.setItem("user", JSON.stringify(mockUser));
      if (mockUser.role === "Admin") navigate("/admin/dashboard");
      else if (mockUser.role === "Parent") navigate("/parent/dashboard");
      else navigate("/home");
      return;
    }

    // --- REAL BACKEND LOGIN ---
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        const { role } = response.data.user;
        if (role === "Admin" || role === "Owner") {
          navigate("/admin/dashboard");
        } else if (role === "Parent") {
          navigate("/parent/dashboard");
        } else {
          navigate("/home");
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError("Backend not reachable. Falling back to mock data failed.");
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