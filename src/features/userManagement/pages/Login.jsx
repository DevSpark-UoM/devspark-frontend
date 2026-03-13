import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import axios from "axios";

import BabyImage from "../../../assets/login.png";
import BrandLogo from "../../../assets/logo.jpeg";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
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
    setError("Backend not reachable");
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

        <button className="icon-btn" type="button">
          <FiSettings size={20} />
        </button>
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
              <Link className="link" to="/request-access">
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
          <img className="baby-img" src={BabyImage} alt="Baby illustration" />
        </section>
      </main>
    </div>
  );
};

export default Login;