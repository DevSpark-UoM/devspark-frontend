import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ChildProfile.css";
import { MdArrowBack, MdCake, MdPeople, MdSchool, MdWarning, MdPhone, MdInfoOutline, MdCalendarToday, MdLock } from "react-icons/md";
import { CHILDREN, formatDOB, calcAge } from "./MyChildren";
import BoyAvatar from "../../../../assets/boy.jpg";
import GirlAvatar from "../../../../assets/girl.jpeg";

export default function ChildProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const child = CHILDREN.find((c) => c.id === parseInt(id));

  if (!child) {
    return (
      <div className="cp-not-found">
        <h2>Child not found.</h2>
        <button onClick={() => navigate("/parent/children")}>← Back</button>
      </div>
    );
  }

  return (
    <div className="cp-container">
      {/* Back Button */}
      <button className="cp-back-btn" onClick={() => navigate("/parent/children")}>
        <MdArrowBack size={18} /> Back to My Children
      </button>

      {/* Hero Card */}
      <div className="cp-hero">
        <div className="cp-avatar-wrap">
          <img
            src={child.gender === "Female" ? GirlAvatar : BoyAvatar}
            alt={child.name}
            className="cp-avatar"
          />
          <span className={`cp-status-badge ${child.status === "Checked In" ? "in" : "out"}`}>
            {child.status}
          </span>
        </div>

        <div className="cp-hero-info">
          <h1 className="cp-name">{child.name}</h1>
          <p className="cp-group">{child.group}</p>
          <p className="cp-teacher">👩‍🏫 Class Teacher: <strong>{child.teacher}</strong></p>
        </div>

        <div className="cp-readonly-badge">
          <MdLock size={14} /> View Only
        </div>
      </div>

      {/* Details Grid */}
      <div className="cp-details-grid">

        {/* Personal Info */}
        <div className="cp-section">
          <h3 className="cp-section-title">
            <MdCake size={18} /> Personal Details
          </h3>
          <div className="cp-detail-row">
            <span className="cp-detail-label">Full Name</span>
            <span className="cp-detail-value">{child.name}</span>
          </div>
          <div className="cp-detail-row">
            <span className="cp-detail-label">Date of Birth</span>
            <span className="cp-detail-value">{formatDOB(child.dob)}</span>
          </div>
          <div className="cp-detail-row">
            <span className="cp-detail-label">Age</span>
            <span className="cp-detail-value">{calcAge(child.dob)}</span>
          </div>
          <div className="cp-detail-row">
            <span className="cp-detail-label">Gender</span>
            <span className="cp-detail-value">{child.gender}</span>
          </div>
        </div>

        {/* Enrollment Info */}
        <div className="cp-section">
          <h3 className="cp-section-title">
            <MdSchool size={18} /> Enrollment Details
          </h3>
          <div className="cp-detail-row">
            <span className="cp-detail-label">Group / Class</span>
            <span className="cp-detail-value">{child.group}</span>
          </div>
          <div className="cp-detail-row">
            <span className="cp-detail-label">Class Teacher</span>
            <span className="cp-detail-value">{child.teacher}</span>
          </div>
          <div className="cp-detail-row">
            <span className="cp-detail-label">Enrolled Date</span>
            <span className="cp-detail-value">{formatDOB(child.enrolledDate)}</span>
          </div>
          <div className="cp-detail-row">
            <span className="cp-detail-label">Today's Status</span>
            <span className={`cp-inline-badge ${child.status === "Checked In" ? "in" : "out"}`}>
              {child.status}
            </span>
          </div>
        </div>

        {/* Health & Safety */}
        <div className="cp-section">
          <h3 className="cp-section-title">
            <MdWarning size={18} /> Health & Safety
          </h3>
          <div className="cp-detail-row">
            <span className="cp-detail-label">Known Allergies</span>
            <span className={`cp-detail-value ${child.allergies !== "None" ? "cp-alert" : ""}`}>
              {child.allergies}
            </span>
          </div>
          <div className="cp-detail-row">
            <span className="cp-detail-label">Emergency Contact</span>
            <span className="cp-detail-value">{child.emergencyContact}</span>
          </div>
        </div>

        {/* Notes */}
        <div className="cp-section cp-full-width">
          <h3 className="cp-section-title">
            <MdInfoOutline size={18} /> Teacher Notes
          </h3>
          <p className="cp-notes">{child.notes}</p>
        </div>
      </div>

      {/* Read-only notice */}
      <div className="cp-readonly-notice">
        <MdLock size={16} />
        <span>Child profile details are managed by the administrator. Contact the centre to request any changes.</span>
      </div>
    </div>
  );
}
