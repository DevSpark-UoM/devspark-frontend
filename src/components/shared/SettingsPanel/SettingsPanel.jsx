import React from "react";
import "./SettingsPanel.css";
import { useTheme } from "../../../context/ThemeContext";

// Icons
import {
  MdClear,
  MdNightsStay,
  MdNotifications,
  MdLock,
  MdSecurity,
  MdPerson,
  MdHelpOutline,
  MdInfoOutline,
  MdChevronRight,
} from "react-icons/md";

/**
 * Common SettingsPanel component for all user types.
 * 
 * @param {boolean} isOpen - Whether the panel is open.
 * @param {function} onClose - Function to close the panel.
 * @param {object} user - User information { name, role, avatar, location }.
 * @param {boolean} notificationsEnabled - Whether notifications are enabled.
 * @param {function} onToggleNotifications - Function to toggle notifications.
 * @param {string} notificationDesc - Description for the notification setting.
 */
export default function SettingsPanel({
  isOpen,
  onClose,
  user,
  notificationsEnabled,
  onToggleNotifications,
  twoFactorEnabled,
  onToggle2FA,
  notificationDesc = "Receive alerts for important updates"
}) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`settings-overlay ${isOpen ? "open" : ""}`} onClick={onClose}>

      {/* 
        Prevent clicks inside the panel from closing the overlay 
      */}
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>

        {/* Header & Avatar */}
        <div className="settings-header">
          <button className="settings-close-btn" onClick={onClose} aria-label="Close settings">
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>&times;</span>
          </button>

          <div className="profile-avatar-wrapper">
            {user?.avatar ? (
              <img src={user.avatar} alt="User Avatar" className="profile-avatar" />
            ) : (
              <div className="ps-avatar-placeholder">
                <MdPerson size={32} color="#94a3b8" />
              </div>
            )}
          </div>
          <h2 className="profile-name">{user?.name || "User Name"}</h2>
          {user?.location && (
            <div className="profile-location">
              <MdPerson style={{ fontSize: '12px', marginRight: '4px' }} /> {user.location}
            </div>
          )}
          <div className="profile-role">{user?.role || "User"}</div>
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
            <li className="settings-list-item" onClick={onToggleNotifications}>
              <div className="settings-item-left">
                <div className="icon-circle icon-notifications">
                  <MdNotifications />
                </div>
                <div className="settings-text-column">
                  <span>Notifications</span>
                  <p className="settings-item-desc">{notificationDesc}</p>
                </div>
              </div>
              <div className="settings-item-right">
                <span className={`status-text ${notificationsEnabled ? "on" : "off"}`}>
                  &lt;{notificationsEnabled ? "ON" : "OFF"}&gt;
                </span>
                <MdChevronRight size={20} />
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

            {/* Security & 2FA */}
            <li className="settings-list-item">
              <div className="settings-item-left">
                <div className="icon-circle icon-security">
                  <MdSecurity />
                </div>
                <div className="settings-text-column">
                  <span>Two-Factor Auth (2FA)</span>
                  <p className="settings-item-desc">Extra layer of security for your account</p>
                </div>
              </div>
              <div className="settings-item-right">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={twoFactorEnabled}
                    onChange={onToggle2FA}
                  />
                  <span className="toggle-slider"></span>
                </label>
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
