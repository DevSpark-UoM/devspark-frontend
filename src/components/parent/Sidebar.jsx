import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

import Logo from "../../assets/logo.jpeg";
import AvatarImg from "../../assets/parent_avatar.jpg";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={Logo} alt="Sprouty" />
        <span>Sprouty</span>
      </div>

      <nav className="sidebar-menu">
        {/* Icons removed for a cleaner look matching your mockup */}
        <NavLink to="/parent/dashboard">Home</NavLink>
        <NavLink to="/parent/children">My Children</NavLink>
        <NavLink to="/parent/progress">Progress</NavLink>
        <NavLink to="/parent/payments">Payments</NavLink>
        <NavLink to="/parent/notifications">Notifications</NavLink>
        <NavLink to="/parent/messaging">Messaging</NavLink>
        <NavLink to="/parent/profile">My Profile</NavLink>
      </nav>

      <div className="sb-footer">
        <div className="sb-user-wrap" ref={menuRef}>
          <button type="button" className="sb-usercard" onClick={() => setOpen((v) => !v)}>
            <div className="sb-avatar">
              <img src={AvatarImg} alt="Parent" />
            </div>
            <div className="sb-usertext">
              <div className="sb-user-name">Sarah Jenkins</div>
              <div className="sb-user-role">Parent</div>
            </div>
            <div className={`sb-caret ${open ? "up" : ""}`}>▾</div>
          </button>
          {open && (
            <div className="sb-dropdown">
              <button className="sb-dd-item" onClick={() => navigate("/parent/profile")}>Profile</button>
              <button className="sb-dd-item danger" onClick={() => navigate("/")}>Sign out</button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}