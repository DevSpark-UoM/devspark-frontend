import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLayers, MdFlashOn as Zap, MdFavorite as Heart, MdPlayCircleFilled as PlayCircle } from "react-icons/md";
import "./Landing.css";

import BrandLogo from "../../../assets/logo.png";

export default function LandingPage() {
  const navigate = useNavigate();

  const currentLogo = BrandLogo;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="lp">
      {/* ===== Topbar ===== */}
      <header className="lp-nav">
        <div className="lp-brand">
          <img src={BrandLogo} alt="Sprouty" className="lp-logo" />
          <span className="lp-name">SPROUTY</span>
        </div>

        <nav className="lp-menu">

          <button className="lp-navlink" onClick={() => scrollTo("why")}>Why</button>
          <button className="lp-navlink" onClick={() => scrollTo("features")}>Features</button>
          <button className="lp-navlink" onClick={() => scrollTo("safety")}>Safety</button>
          <button className="lp-navlink" onClick={() => scrollTo("discover")}>Discover</button>
        </nav>

        <div className="lp-actions">
          <Link className="lp-link" to="/login">Log In</Link>
          <button className="lp-btn" onClick={() => navigate("/get-started")}>Get Started</button>
        </div>
      </header>

      {/* ===== 1) HERO ===== */}
      <section id="hero" className="hero">
        <div className="wrap hero-grid">
          <div className="hero-left">
            <span className="badge">✨ An Early Childhood Platform </span>

            <h1 className="hero-title">
              Less Paperwork,
              <br />
              More Playtime
            </h1>

            <p className="hero-text">
              SproutyTeam saves everything for your nursery and childcare service into one online,
              organized space so you can stay
              present with every child.
            </p>

            <div className="hero-cta">
              <button className="btn primary" onClick={() => navigate("/get-started")}>
                Try It Out
              </button>

              <button className="btn secondary" onClick={() => scrollTo("discover")}>
                <PlayCircle size={18} />
                Watch Demo
              </button>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-img">
              <img
                src="https://images.unsplash.com/photo-1770096679916-2cd9c720d400?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
                alt="Teachers and children playing"
              />
            </div>
            <div className="dot" />
          </div>
        </div>
      </section>

      {/* ===== 2) WHY ===== */}
      <section id="why" className="why">
        <div className="mock-bg">
          {/* blurred background image */}
          <img
            className="mock-bg-img"
            src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
            alt=""
            aria-hidden="true"
          />
          {/* dark overlay */}
          <div className="mock-dim" />
          {/* content on top */}
          <div className="mock-overlay">
            <div className="wrap mock-content">
              <h2 className="h2 mock-heading">Why Choose SPROUTY?</h2>
              <p className="p mock-para">
                The nursery and childcare management app that does almost everything.
                So you get more time with children.
              </p>
              <button className="btn primary" onClick={() => navigate("/learn-more")}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3) SWAP ADMIN ===== */}
      <section id="features" className="band">
        <div className="wrap center">
          <h2 className="h2 white">Swap Admin For Playtime</h2>
          <p className="p white soft">
            Everything you need to run your center smoothly.
          </p>

          <div className="cards">
            <Card icon={<MdLayers size={32} />} title="All-In-One"
              text="Everything you need to manage your centre in one powerful platform." />
            <Card icon={<Zap size={32} />} title="Easy to use"
              text="Intuitive design that anyone can master. No complex training required." />
            <Card icon={<Heart size={32} />} title="Child-Centered"
              text="Built with children’s wellbeing and development at the heart." />
          </div>

          <Link className="btn whitebtn" to="/features">See All</Link>
        </div>
      </section>

      {/* ===== 4) SAFETY ===== */}
      <section id="safety" className="safety">
        <div className="wrap two-col">
          <div className="dash">
            <div className="dash-top">
              <span className="dash-label">27th Of February 2026</span>
              <div className="dash-stat">
                <div className="dash-val">75%</div>
                <div className="dash-sub">Attendance Rate</div>
              </div>
            </div>

            <img
              className="dash-img"
              src="https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
              alt="Dashboard"
            />

            <div className="dots">
              <span className="d green" />
              <span className="d yellow" />
              <span className="d pink" />
            </div>
          </div>

          <div>
            <h2 className="h2">Safety & Compliance - Effortlessly Archived</h2>
            <p className="p">
              Managing all of your reports in one place. Save countless hours on paperwork
              and ensure compliance with ease.
            </p>
            <p className="p small">
              Our system keeps everything organized, secure, and accessible whenever you need it.
            </p>

            <button className="btn primary" onClick={() => navigate("/contact")}>
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* ===== 5) DISCOVER ===== */}
      <section id="discover" className="discover">
        <div className="wrap discover-box">
          <span className="discover-badge">
            EDUCATORS CHANGE LIVES, WE'RE JUST CHEERLEADERS
          </span>

          <h2 className="discover-title">
            Discover <span className="hl">Sprouty</span>!
          </h2>

          <p className="discover-text">
            Ready to transform your service with streamlined paperwork, enhanced
            family engagement and safety features?

            Begin your journey to simplified management today.
          </p>

          <button className="btn whitebtn" onClick={() => navigate("/login")}>
            Try It Out
          </button>

        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="footer">
        <div className="wrap footer-grid">
          <div>
            <h4>Resources</h4>
            <a href="#hero">Getting Started</a>
            <a href="#features">Pricing</a>
            <a href="#safety">Help Centre</a>
          </div>
          <div>
            <h4>Features</h4>
            <a href="#features">Attendance</a>
            <a href="#features">Daily Logs</a>
            <a href="#features">Reports</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#why">About</a>
            <a href="#discover">Contact</a>
          </div>
          <div>
            <h4>Legal</h4>
            <a href="#discover">Privacy</a>
            <a href="#discover">Terms</a>
          </div>
        </div>

        <div className="wrap copy">
          ©2026_Sprouty.com — All rights reserved
        </div>
      </footer>
    </div>
  );
}

function Card({ icon, title, text }) {
  return (
    <div className="card">
      <div className="card-ic">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}