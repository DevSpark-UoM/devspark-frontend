import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack, MdCameraAlt, MdAdd } from "react-icons/md";
import "./Admissions.css";

export default function Admissions() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    address: "",
    parentFullName: "",
    parentLastName: "",
    parentEmail: "",
    parentPhone: "",
    parentId: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Student successfully added! (Simulation)");
    navigate("/admin/dashboard");
  };

  return (
    <div className="admissions-container">
      <header className="admissions-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <MdArrowBack size={24} />
          </button>
          <div className="breadcrumbs">
            Admissions / <span className="current">Add Student</span>
          </div>
        </div>
      </header>

      <form className="admissions-content" onSubmit={handleSubmit}>
        {/* Student Registration Section */}
        <section className="registration-card">
          <h2 className="card-title">Student Registration</h2>
          
          <div className="photo-upload-section">
            <div className="photo-placeholder">
              <MdCameraAlt size={48} />
              <span>Upload Photo</span>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>First Name</label>
              <input 
                type="text" 
                name="firstName" 
                placeholder="Enter first name" 
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input 
                type="text" 
                name="lastName" 
                placeholder="Enter last name" 
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input 
                type="text" 
                name="dob" 
                placeholder="DD / MM / YYYY" 
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <input 
                type="text" 
                name="gender" 
                placeholder="Enter gender" 
                value={formData.gender}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group full-width">
              <label>Address</label>
              <input 
                type="text" 
                name="address" 
                placeholder="Enter home address" 
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </section>

        {/* Parent Information Section */}
        <section className="registration-card">
          <div className="parent-info-header">
            <h2 className="card-title">Parent Information</h2>
            <button type="button" className="add-parent-btn">
              <MdAdd size={16} /> Parent Info
            </button>
          </div>

          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              name="parentFullName" 
              placeholder="Parent's full name" 
              value={formData.parentFullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input 
              type="text" 
              name="parentLastName" 
              placeholder="Parent's last name" 
              value={formData.parentLastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="parentEmail" 
              placeholder="example@email.com" 
              value={formData.parentEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Contact No</label>
            <input 
              type="text" 
              name="parentPhone" 
              placeholder="+1 (555) 000-0000" 
              value={formData.parentPhone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Parent ID Number</label>
            <input 
              type="text" 
              name="parentId" 
              placeholder="Enter parent ID number" 
              value={formData.parentId}
              onChange={handleChange}
              required
            />
          </div>
          
          <p className="invite-text">Invite parent to Sprouty</p>
        </section>

        <div className="actions-footer">
          <button type="submit" className="submit-btn">
            Add Student
          </button>
        </div>
      </form>
    </div>
  );
}
