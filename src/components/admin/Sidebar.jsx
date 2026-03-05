import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

import Logo from "../../assets/logo.jpeg";
import AvatarImg from "../../assets/admin-avatar.jpeg"; // ✅ add this image file

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // close dropdown when click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goProfile = () => {
    setOpen(false);
    navigate("/admin/profile");
  };

  const signOut = () => {
    setOpen(false);
    // later: clear token/session
    // localStorage.removeItem("token");
    navigate("/"); // back to login
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={Logo} alt="Sprouty" />
        <span>Sprouty</span>
      </div>

      <nav className="sidebar-menu">
        <NavLink to="/admin/dashboard">Home</NavLink>
        <NavLink to="/admin/admissions">Admissions</NavLink>

        <p className="menu-title">MY SCHOOL</p>
        <NavLink to="/admin/students">Students</NavLink>
        <NavLink to="/admin/parents">Parents</NavLink>
        <NavLink to="/admin/staff">Staff</NavLink>

        <p className="menu-title">MANAGEMENT</p>
        <NavLink to="/admin/schedules">Schedules</NavLink>
        <NavLink to="/admin/messaging">Messaging</NavLink>
        <NavLink to="/admin/billing">Billing</NavLink>
        <NavLink to="/admin/payrolls">Staff & Payrolls</NavLink>
        <NavLink to="/admin/progress">Learning</NavLink>
        <NavLink to="/admin/paperwork">Paperwork</NavLink>
      </nav>

      {/* Footer user card */}
      <div className="sb-footer">
        <div className="sb-user-wrap" ref={menuRef}>
          <button
            type="button"
            className="sb-usercard"
            onClick={() => setOpen((v) => !v)}
          >
            <div className="sb-avatar">
              <img src={AvatarImg} alt="Admin" />
            </div>

            <div className="sb-usertext">
              <div className="sb-user-name">Anu Agarwal</div>
              <div className="sb-user-role">Administrator</div>
            </div>

            <div className={`sb-caret ${open ? "up" : ""}`}>▾</div>
          </button>

          {open && (
            <div className="sb-dropdown">
              <button className="sb-dd-item" onClick={goProfile}>
                Profile
              </button>
              <button className="sb-dd-item danger" onClick={signOut}>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}