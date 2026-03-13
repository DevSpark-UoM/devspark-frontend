import React from "react";
import "./AdminSettingsPanel.css";
import { useTheme } from "../../../../context/ThemeContext";

// Icons
import {
  MdClose,
  MdNightsStay,
  MdNotifications,
  MdLock,
  MdSecurity,
  MdPerson,
  MdHelpOutline,
  MdInfoOutline,
  MdChevronRight,
} from "react-icons/md";

// Example Avatar (can be replaced with actual user avatar)
import AvatarImage from "../../../../assets/admin-avatar.jpeg";

export default function AdminSettingsPanel({ isOpen, onClose }) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`settings-overlay ${isOpen ? "open" : ""}`} onClick={onClose}>

      {/* 
        Prevent clicks inside the panel from closing the overlay 
      */}
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>

        {/* Header & Avatar */}
        <div className="settings-header">
          <button className="settings-close-btn" onClick={onClose}>
            <MdClose />
          </button>

          <div className="profile-avatar-wrapper">
            <img src={AvatarImage} alt="User Avatar" className="profile-avatar" />
          </div>
          <h2 className="profile-name">Anu Agarwal</h2>
          <div className="profile-location">
            <MdPerson style={{ fontSize: '12px' }} /> Sprouty Daycare Center
          </div>
          <div className="profile-role">Administrator</div>


        </div>

        {/* Settings List Card */}
        <div className="settings-menu-card">
          <h3 className="settings-menu-title">Settings</h3>

          <ul className="settings-list">

            {/* Dark Mode Toggle Item */}
            <li className="settings-list-item">
              <div className="settings-item-left">
                <div className="icon-circle icon-darkmode">
                  <MdNightsStay />
                </div>
                <span>Dark Mode</span>
              </div>
              <div className="settings-item-right">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={toggleTheme}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </li>

            {/* Notifications */}
            <li className="settings-list-item">
              <div className="settings-item-left">
                <div className="icon-circle icon-notifications">
                  <MdNotifications />
                </div>
                <span>Notifications</span>
              </div>
              <div className="settings-item-right">
                On <MdChevronRight size={20} />
              </div>
            </li>

            {/* Privacy */}
            <li className="settings-list-item">
              <div className="settings-item-left">
                <div className="icon-circle icon-privacy">
                  <MdLock />
                </div>
                <span>Privacy</span>
              </div>
              <div className="settings-item-right">
                <MdChevronRight size={20} />
              </div>
            </li>

            {/* Security */}
            <li className="settings-list-item">
              <div className="settings-item-left">
                <div className="icon-circle icon-security">
                  <MdSecurity />
                </div>
                <span>Security</span>
              </div>
              <div className="settings-item-right">
                <MdChevronRight size={20} />
              </div>
            </li>

            {/* Account */}
            <li className="settings-list-item">
              <div className="settings-item-left">
                <div className="icon-circle icon-account">
                  <MdPerson />
                </div>
                <span>Account</span>
              </div>
              <div className="settings-item-right">
                <MdChevronRight size={20} />
              </div>
            </li>

            {/* Help */}
            <li className="settings-list-item">
              <div className="settings-item-left">
                <div className="icon-circle icon-help">
                  <MdHelpOutline />
                </div>
                <span>Help</span>
              </div>
              <div className="settings-item-right">
                <MdChevronRight size={20} />
              </div>
            </li>

            {/* About */}
            <li className="settings-list-item">
              <div className="settings-item-left">
                <div className="icon-circle icon-about">
                  <MdInfoOutline />
                </div>
                <span>About</span>
              </div>
              <div className="settings-item-right">
                <MdChevronRight size={20} />
              </div>
            </li>

          </ul>
        </div>

      </div>
    </div>
  );
}