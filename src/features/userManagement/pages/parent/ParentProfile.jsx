import React, { useState, useRef, useEffect } from 'react';
import {
  MdCameraAlt,
  MdInfo,
  MdChevronRight,
  MdVisibility,
  MdVisibilityOff
} from 'react-icons/md';
import './ParentProfile.css';
import DefaultAvatar from '../../../../assets/parent1.jpg';
import BoyAvatarFile from '../../../../assets/boy.jpg';
import GirlAvatarFile from '../../../../assets/girl.jpeg';

// Child Avatars (Using local assets)
const BoyAvatar = BoyAvatarFile;
const GirlAvatar = GirlAvatarFile;

export default function ParentProfile() {
  console.log("ParentProfile: Rendering component");

  const [profile, setProfile] = useState({
    fullName: "Sarah Jenkins",
    language: "English",
    phone1: "0771234567",
    phone2: "",
    relationship: "Mother",
    email: "sarah.parent@example.com",
    dailyReport: true
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("Sarah@123");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fileInputRef = useRef(null);


  // Load profile and avatar from localStorage on mount
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('parentProfile');
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }

      const savedAvatar = localStorage.getItem('parentAvatar');
      if (savedAvatar) {
        setAvatar(savedAvatar);
      }

      const savedPass = localStorage.getItem('parentPassword');
      if (savedPass) {
        setCurrentPassword(savedPass);
      }
    } catch (e) {
      console.error("Error loading profile from localStorage:", e);
    }
  }, []);

  const [children] = useState([
    {
      id: 1,
      name: "Leo Jenkins",
      dob: "April 12, 2020",
      specialNeeds: "Peanut Allergy, Lactose Intolerant",
      image: BoyAvatar
    },
    {
      id: 2,
      name: "Mia Jenkins",
      dob: "June 24, 2018",
      specialNeeds: "Mild Asthma",
      image: GirlAvatar
    }
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setAvatar(base64String);
        localStorage.setItem('parentAvatar', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const validatePhone = (phone) => {
    // Sri Lankan Phone Regex: +947xxxxxxxx or 07xxxxxxxx
    const slRegex = /^(?:\+947|07)[0-9]{8}$/;
    return slRegex.test(phone.replace(/\s/g, ''));
  };

  const validatePassword = (pass) => {
    // Min 8 chars, at least one uppercase, one lowercase, and one number
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passRegex.test(pass);
  };

  const handleSave = () => {

    setError("");

    if (!validatePhone(profile.phone1)) {
      setError("Please enter a valid Sri Lankan phone number (e.g., 0771234567 or +94771234567)");
      return;
    }

    if (isChangingPassword) {
      if (!newPassword) {
        setError("Please enter a new password.");
        return;
      }
      if (!validatePassword(newPassword)) {
        setError("New password must be at least 8 characters long and include uppercase, lowercase, and numbers.");
        return;
      }
      if (newPassword !== confirmPassword) {
        setError("New password and confirm password do not match.");
        return;
      }

      setCurrentPassword(newPassword);
      localStorage.setItem('parentPassword', newPassword);
      setNewPassword("");
      setConfirmPassword("");
      setIsChangingPassword(false);
    }

    localStorage.setItem('parentProfile', JSON.stringify(profile));
    alert("Profile changes saved successfully! ✅");
  };



  return (
    <div className="pp-container">
      {/* Header */}
      <header className="pp-header">
        <div className="pp-welcome">
          <h1>Hello, {(profile?.fullName || "Sarah").split(' ')[0]}!</h1>
          <p>Here you can manage your profile, linked children, and security settings.</p>
        </div>
      </header>

      {/* 1. Personal Info Card */}
      <section className="pp-card">
        <div className="pp-card-header">
          <h2 className="pp-card-title">Personal Info</h2>
          <button className="pp-edit-btn" onClick={handleSave}>Save Changes</button>
        </div>

        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#b91c1c',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px',
            border: '1px solid #fecaca'
          }}>
            {error}
          </div>
        )}

        <div className="pp-profile-row">
          <div className="pp-avatar-container" onClick={triggerFileInput} style={{ cursor: 'pointer' }}>
            <div className="pp-avatar">
              <img
                src={avatar || DefaultAvatar}
                alt="Profile"
                className="pp-avatar-img"
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
              />
            </div>
            <div className="pp-camera-icon">
              <MdCameraAlt size={12} />
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
            accept="image/*"
          />
          <div className="pp-user-meta">
            <h3>{profile.fullName}</h3>
            <p>Parent Account</p>
            <button className="pp-change-photo" onClick={triggerFileInput}>Change Photo</button>
          </div>
        </div>

        <div className="pp-input-grid">
          <div className="pp-form-group">
            <label className="pp-label">Full Name</label>
            <input
              className="pp-input"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="pp-form-group">
            <label className="pp-label">Language</label>
            <select
              className="pp-select"
              name="language"
              value={profile.language}
              onChange={handleChange}
            >
              <option value="English">English</option>
              <option value="Sinhala">Sinhala</option>
              <option value="Tamil">Tamil</option>
            </select>
          </div>
          <div className="pp-form-group">
            <label className="pp-label">Phone 1</label>
            <input
              className="pp-input"
              name="phone1"
              value={profile.phone1}
              onChange={handleChange}
            />
          </div>
          <div className="pp-form-group">
            <label className="pp-label">Phone 2</label>
            <input
              className="pp-input"
              name="phone2"
              placeholder="Add another number"
              value={profile.phone2}
              onChange={handleChange}
            />
          </div>
          <div className="pp-form-group full-width">
            <label className="pp-label">Relationship*</label>
            <select
              className="pp-select"
              name="relationship"
              value={profile.relationship}
              onChange={handleChange}
            >
              <option value="Mother">Mother</option>
              <option value="Father">Father</option>
              <option value="Guardian">Guardian</option>
            </select>
          </div>
        </div>
      </section>

      {/* 2. Account Info Card */}
      <section className="pp-card">
        <div className="pp-card-header">
          <h2 className="pp-card-title">Account Info</h2>

        </div>

        <div className="pp-form-group">
          <label className="pp-label">Email Address</label>
          <input
            className="pp-input"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </div>

        <div className="pp-toggle-row">
          <div className="pp-toggle-text">
            <h4>Send Monthly Report Email</h4>
            <p>Receive a summary of activities monthly</p>
          </div>
          <label className="pp-switch">
            <input
              type="checkbox"
              name="dailyReport"
              checked={profile.dailyReport}
              onChange={handleChange}
            />
            <span className="pp-slider"></span>
          </label>
        </div>
      </section>
      <section className="pp-card">
        <div className="pp-card-header">
          <h2 className="pp-card-title">Security</h2>
          {!isChangingPassword ? (
            <button className="pp-edit-btn" onClick={() => setIsChangingPassword(true)}>Change Password</button>
          ) : (
            <button className="pp-edit-btn" style={{ color: '#64748b' }} onClick={() => setIsChangingPassword(false)}>Cancel</button>
          )}
        </div>

        <div className="pp-input-grid">
          <div className="pp-form-group">
            <label className="pp-label">Current Password</label>
            <div className="pp-password-wrapper">
              <input
                className="pp-input"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                readOnly
                style={{ backgroundColor: '#f1f5f9' }}
              />
              <button
                type="button"
                className="pp-password-toggle"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
              </button>
            </div>
          </div>

          {isChangingPassword && (
            <>
              <div className="pp-form-group">
                <label className="pp-label">New Password</label>
                <div className="pp-password-wrapper">
                  <input
                    className="pp-input"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Min 8 chars, A-Z, a-z, 0-9"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="pp-password-toggle"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                  </button>
                </div>
              </div>
              <div className="pp-form-group">
                <label className="pp-label">Confirm Password</label>
                <div className="pp-password-wrapper">
                  <input
                    className="pp-input"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="pp-password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* 4. Linked Children Card */}
      <section className="pp-card">
        <div className="pp-card-header">
          <h2 className="pp-card-title">Linked Children</h2>
          <span className="pp-read-only">Read Only</span>
        </div>

        <div className="pp-child-list">
          {children.map(child => (
            <div className="pp-child-card" key={child.id}>
              <img src={child.image} alt={child.name} className="pp-child-image" />
              <div className="pp-child-grid">
                <div className="pp-child-info-group">
                  <span className="pp-child-label">Child Name</span>
                  <span className="pp-child-value">{child.name}</span>
                </div>
                <div className="pp-child-info-group">
                  <span className="pp-child-label">Date of Birth</span>
                  <span className="pp-child-value">{child.dob}</span>
                </div>
                <div className="pp-child-info-group">
                  <span className="pp-child-label">Special Needs</span>
                  <span className="pp-child-value">{child.specialNeeds}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pp-footer-note">
          <p>
            <MdInfo size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
            Child information is managed by administrators. Contact support to request changes.
          </p>
        </div>
      </section>

      <div className="pp-global-save-wrapper">
        <button className="pp-save-btn" onClick={handleSave}>
          Save All Changes
        </button>
      </div>
    </div>
  );
}


