import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AcceptInvite.css";

import BrandLogo from "../../../../assets/logo.png";

export default function AcceptInvite() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("token");
  }, [location.search]);

  const [status, setStatus] = useState("loading");
  // loading | invalid | ready | activating | activated

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [cpw, setCpw] = useState("");
  const [msg, setMsg] = useState("");
  const currentLogo = BrandLogo;

  // ✅ demo: token -> email mapping (frontend only)
  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      setMsg("Invalid invitation link (token missing).");
      return;
    }

    // For frontend demo: We simulate validating the token generated from Admin Dashboard
    // e.g. "token_abc123_1" -> extract the "1" to simulate fetching user data
    const parts = token.split("_");
    const demoEmail = parts.length === 3 ? `teacher_${parts[2]}@sprouty.com` : "new.staff@sprouty.com";

    setEmail(demoEmail);

    setStatus("ready");
    setMsg("");
  }, [token]);

  const validate = () => {
    if (pw.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(pw)) return "Password must include at least 1 uppercase letter.";
    if (!/[0-9]/.test(pw)) return "Password must include at least 1 number.";
    if (pw !== cpw) return "Passwords do not match.";
    return null;
  };

  const onActivate = async (e) => {
    e.preventDefault();
    setMsg("");

    const err = validate();
    if (err) {
      setMsg(err);
      return;
    }

    try {
      setStatus("activating");

      // ✅ FRONTEND DEMO: simulate API delay
      // Later backend: POST /invite/accept { token, password }
      await new Promise((r) => setTimeout(r, 700));

      // User requested to completely bypass the success log in screen
      // and directly log the user into the dashboard.
      navigate("/staff/dashboard");
    } catch {
      setStatus("ready");
      setMsg("Something went wrong. Please try again.");
    }
  };

  if (status === "loading") {
    return (
      <div className="ai-page">
        <header className="ai-topbar">
          <div className="ai-brand">
            <img className="ai-logo" src={BrandLogo} alt="Sprouty" />
            <span className="ai-brand-name">SPROUTY</span>
          </div>
        </header>
        <div className="ai-card">
          <h2>Checking invitation...</h2>
        </div>
      </div>
    );
  }

  if (status === "invalid") {
    return (
      <div className="ai-page">
        <header className="ai-topbar">
          <div className="ai-brand">
            <img className="ai-logo" src={BrandLogo} alt="Sprouty" />
            <span className="ai-brand-name">Sprouty</span>
          </div>
        </header>
        <div className="ai-card">
          <h1 className="ai-title">Invitation Error</h1>
          <p className="ai-alert error">{msg}</p>
          <button className="ai-btn ghost" onClick={() => navigate("/login")}>
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-page">
      <header className="ai-topbar">
        <div className="ai-brand">
          <img className="ai-logo" src={BrandLogo} alt="Sprouty" />
          <span className="ai-brand-name">Sprouty</span>
        </div>
      </header>

      <div className="ai-card">
        <h1 className="ai-title">Welcome! You’ve been invited as Staff</h1>
        <p className="ai-sub">
          Please set your new password to activate your staff account.
        </p>

        <div className="ai-field">
          <label>Email (readonly)</label>
          <input value={email} disabled />
        </div>

        {status !== "activated" ? (
          <form onSubmit={onActivate} className="ai-form">
            <div className="ai-field">
              <label>New Password</label>
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="Enter new password"
              />
              <small className="ai-hint">
                Min 8 chars, include 1 uppercase & 1 number.
              </small>
            </div>

            <div className="ai-field">
              <label>Confirm Password</label>
              <input
                type="password"
                value={cpw}
                onChange={(e) => setCpw(e.target.value)}
                placeholder="Re-enter password"
              />
            </div>

            {msg && <div className="ai-alert error">{msg}</div>}

            <button className="ai-btn" type="submit" disabled={status === "activating"}>
              {status === "activating" ? "Activating..." : "Activate Account"}
            </button>

            <button className="ai-btn ghost" type="button" onClick={() => navigate("/login")}>
              Back to Login
            </button>
          </form>
        ) : (
          <>
            <div className="ai-alert ok">{msg}</div>
            <button className="ai-btn" onClick={() => navigate("/login")}>
              Log In
            </button>
          </>
        )}
      </div>
    </div>
  );
}