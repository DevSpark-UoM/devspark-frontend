import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdArrowBack, MdCameraAlt, MdInfo } from "react-icons/md";
import "./AdminParentEdit.css";

// Using the same avatar from ParentProfile or registration
import DefaultAvatar from "../../../../assets/parent1.jpg";

export default function AdminParentEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({
    parentFullName: "",
    parentEmail: "",
    parentPhone: "",
    parentId: "",
    parentOccupation: "",
    relationship: "",
    emergencyContact: "",
    address: ""
  });
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("admissions_students");
    if (saved) {
      const students = JSON.parse(saved);
      const target = students.find(s => s.id === parseInt(id));
      if (target) {
        setStudent(target);
        setFormData({
          parentFullName: target.parentFullName || target.parentName || "",
          parentEmail: target.parentEmail || "",
          parentPhone: target.parentPhone || "",
          parentId: target.parentId || "",
          parentOccupation: target.parentOccupation || "",
          relationship: target.relationship || "",
          emergencyContact: target.emergencyContact || "",
          address: target.address || ""
        });
        setPhoto(target.parentPhoto || DefaultAvatar);
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const saved = localStorage.getItem("admissions_students");
    if (saved) {
      const students = JSON.parse(saved);
      const updated = students.map(s => {
        if (s.id === parseInt(id)) {
          return {
            ...s,
            ...formData,
            parentFullName: formData.parentFullName, // Ensure synchronization
            parentName: formData.parentFullName
          };
        }
        return s;
      });
      localStorage.setItem("admissions_students", JSON.stringify(updated));
      alert("Parent information updated successfully! ✅");
      navigate("/admin/parents");
    }
  };

  if (!student) return <div className="loading">Loading parent data...</div>;

  return (
    <div className="ape-container anim-fade-in">
      <header className="ape-header">
        <div className="ape-header-left">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <MdArrowBack size={24} />
          </button>
          <div className="ape-welcome">
            <h1>Edit Parent Details</h1>
            <p>Managing profile for {formData.parentFullName}</p>
          </div>
        </div>
        <button className="ape-save-btn" onClick={handleSave}>Save Changes</button>
      </header>

      <div className="ape-content-grid">
        {/* Profile Card */}
        <div className="ape-card main-info">
          <div className="ape-card-header">
            <h2 className="ape-card-title">Personal Information</h2>
          </div>
          
          <div className="ape-profile-row">
            <div className="ape-avatar-wrap">
              <img src={photo} alt="Parent" className="ape-avatar-img" />
              <div className="ape-camera-overlay">
                <MdCameraAlt size={16} />
              </div>
            </div>
            <div className="ape-user-meta">
              <h3>{formData.parentFullName}</h3>
              <p>Parent of {student.name}</p>
            </div>
          </div>

          <div className="ape-input-grid">
            <div className="ape-form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="parentFullName" 
                value={formData.parentFullName} 
                onChange={handleChange} 
              />
            </div>
            <div className="ape-form-group">
              <label>ID Number</label>
              <input 
                type="text" 
                name="parentId" 
                value={formData.parentId} 
                onChange={handleChange} 
              />
            </div>
            <div className="ape-form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="parentEmail" 
                value={formData.parentEmail} 
                onChange={handleChange} 
              />
            </div>
            <div className="ape-form-group">
              <label>Mobile Number</label>
              <input 
                type="text" 
                name="parentPhone" 
                value={formData.parentPhone} 
                onChange={handleChange} 
              />
            </div>
            <div className="ape-form-group">
              <label>Occupation</label>
              <input 
                type="text" 
                name="parentOccupation" 
                value={formData.parentOccupation} 
                onChange={handleChange} 
              />
            </div>
            <div className="ape-form-group">
              <label>Relationship</label>
              <select name="relationship" value={formData.relationship} onChange={handleChange}>
                <option value="Mother">Mother</option>
                <option value="Father">Father</option>
                <option value="Guardian">Guardian</option>
              </select>
            </div>
            <div className="ape-form-group full-width">
              <label>Home Address</label>
              <textarea 
                name="address" 
                value={formData.address} 
                onChange={handleChange}
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="ape-sidebar">
          <div className="ape-card children-card">
            <h2 className="ape-card-title">Linked Child</h2>
            <div className="linked-child-item">
              <div className="child-avatar-mini">
                {student.photo ? (
                  <img src={student.photo} alt={student.name} />
                ) : (
                  <span>{student.name.charAt(0)}</span>
                )}
              </div>
              <div className="child-info-mini">
                <p className="child-name">{student.name}</p>
                <p className="child-class">Class {student.className}</p>
              </div>
            </div>
            <p className="read-only-note">
              <MdInfo size={12} /> Student profile must be edited separately.
            </p>
          </div>

          <div className="ape-card security-card read-only">
            <h2 className="ape-card-title">Security Settings</h2>
            <p className="security-notice">
              Admin is restricted from editing parent passwords or security questions for privacy reasons.
            </p>
            <div className="locked-field">
              <span>Account Status</span>
              <span className="status-badge active">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
