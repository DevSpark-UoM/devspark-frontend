import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  MdDashboard,
  MdPeople,
  MdTrendingUp,
  MdPayment,
  MdNotifications,
  MdChat,
  MdPerson
} from 'react-icons/md';
import './ParentSidebar.css';
import Logo from "../../assets/logo.png";
import DefaultAvatar from "../../assets/parent1.jpg";

export default function ParentSidebar({ onOpenSettings }) {
  const [open, setOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null);

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

  // Sync avatar from localStorage
  useEffect(() => {
    const savedAvatar = localStorage.getItem('parentAvatar');
    if (savedAvatar) {
      setUserAvatar(savedAvatar);
    }
  }, []);


  const goProfile = () => {
    setOpen(false);
    navigate("/parent/profile");
  };

  const signOut = () => {
    setOpen(false);
    navigate("/"); // back to login
  };

  return (
    <aside className="ps-sidebar">
      {/* Brand */}
      <div className="ps-brand">
        <img src={Logo} alt="Sprouty" />
        <span className="ps-brand-text">SPROUTY</span>
      </div>

      {/* Menu */}
      <nav className="ps-menu">
        <NavLink to="/parent/dashboard" className={({ isActive }) => isActive ? "ps-link active" : "ps-link"}>
          <MdDashboard size={18} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/parent/children" className={({ isActive }) => isActive ? "ps-link active" : "ps-link"}>
          <MdPeople size={18} />
          <span>My Children</span>
        </NavLink>
        <NavLink to="/parent/progress" className={({ isActive }) => isActive ? "ps-link active" : "ps-link"}>
          <MdTrendingUp size={18} />
          <span>Progress</span>
        </NavLink>
        <NavLink to="/parent/payments" className={({ isActive }) => isActive ? "ps-link active" : "ps-link"}>
          <MdPayment size={18} />
          <span>Payments</span>
        </NavLink>
        <NavLink to="/parent/notifications" className={({ isActive }) => isActive ? "ps-link active" : "ps-link"}>
          <MdNotifications size={18} />
          <span>Notifications</span>
        </NavLink>
        <NavLink to="/parent/messaging" className={({ isActive }) => isActive ? "ps-link active" : "ps-link"}>
          <MdChat size={18} />
          <span>Messaging</span>
        </NavLink>

      </nav>

      <div className="ps-divider" />

      {/* Footer user card */}
      <div className="ps-footer">
        <div className="ps-user-wrap" ref={menuRef}>
          <button
            type="button"
            className="ps-usercard"
            onClick={() => setOpen((v) => !v)}
          >
            <div className="ps-avatar">
              <img
                src={userAvatar || DefaultAvatar}
                alt="Sarah Jenkins"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
              />
            </div>

            <div className="ps-usertext">
              <div className="ps-user-name">Sarah Jenkins</div>
              <div className="ps-user-role">Parent</div>
            </div>

            <div className={`ps-caret ${open ? "up" : ""}`}>▾</div>
          </button>

          {open && (
            <div className="ps-dropdown">
              <button className="ps-dd-item" onClick={goProfile}>
                Profile
              </button>
              <button
                className="ps-dd-item"
                onClick={() => {
                  setOpen(false);
                  if (onOpenSettings) onOpenSettings();
                }}
              >
                Settings
              </button>
              <button className="ps-dd-item danger" onClick={signOut}>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
