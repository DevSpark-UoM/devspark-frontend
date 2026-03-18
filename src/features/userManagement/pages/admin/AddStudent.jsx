import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBack, MdCameraAlt, MdAdd } from "react-icons/md";
import "./AddStudent.css";

export default function AddStudent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [showParentInfo, setShowParentInfo] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    address: "",
    parentFullName: "",
    parentEmail: "",
    parentPhone: "",
    parentId: "",
    parentOccupation: "",
    relationship: "",
    emergencyContact: "",
    className: "A"
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      const saved = localStorage.getItem("admissions_students");
      const students = saved ? JSON.parse(saved) : [];
      const student = students.find(s => s.id === parseInt(id));
      
      if (student) {
        setFormData({
          firstName: student.firstName || student.name?.split(" ")[0] || "",
          lastName: student.lastName || student.name?.split(" ").slice(1).join(" ") || "",
          dob: student.dob || "",
          gender: student.gender || "",
          address: student.address || "",
          parentFullName: student.parentFullName || "",
          parentEmail: student.parentEmail || "",
          parentPhone: student.parentPhone || "",
          parentId: student.parentId || "",
          parentOccupation: student.parentOccupation || "",
          relationship: student.relationship || "",
          emergencyContact: student.emergencyContact || "",
          className: student.className || "A"
        });
        setPhotoPreview(student.photo);
        if (student.parentFullName) setShowParentInfo(true);
      }
    }
  }, [id, isEditMode]);

  const validatePhone = (phone) => {
    // Sri Lankan phone regex (07XXXXXXXX)
    const slRegex = /^(?:0|94|\+94)?7(?:[01245678]\d)\d{6}$/;
    return slRegex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === "parentPhone") {
      if (value && !validatePhone(value)) {
        setErrors(prev => ({ ...prev, parentPhone: "Invalid Sri Lankan phone number" }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.parentPhone;
          return newErrors;
        });
      }
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.parentPhone) return;

    const saved = localStorage.getItem("admissions_students");
    const students = saved ? JSON.parse(saved) : [];

    if (isEditMode) {
      const updatedStudents = students.map(s => {
        if (s.id === parseInt(id)) {
          return {
            ...s,
            ...formData,
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            photo: photoPreview
          };
        }
        return s;
      });
      localStorage.setItem("admissions_students", JSON.stringify(updatedStudents));
      alert("Student information updated successfully!");
    } else {
      const newStudent = {
        id: Date.now(),
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        age: "N/A",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status: "Approved",
        photo: photoPreview,
        ...formData
      };
      localStorage.setItem("admissions_students", JSON.stringify([...students, newStudent]));
      alert("Student successfully added to Approved list!");
    }

    navigate("/admin/admissions");
  };

  return (
    <div className="add-student-page anim-fade-in">
      <header className="add-student-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <MdArrowBack size={24} />
          </button>
          <div className="title-section">
            <h1>{isEditMode ? "Edit student" : "New student"}</h1>
            <p className="breadcrumbs">Admissions | <span>{isEditMode ? "Edit" : "Add"} Student</span></p>
          </div>
        </div>
      </header>

      <form className={`add-student-content ${showParentInfo ? "split-view" : ""}`} onSubmit={handleSubmit}>
        {/* Student Registration Section */}
        <section className={`registration-card student-card ${showParentInfo ? "shifted" : ""}`}>
          <div className="card-header">
            <h2 className="card-title">Student Registration</h2>
            {!showParentInfo && (
              <button 
                type="button" 
                className="add-info-btn"
                onClick={() => setShowParentInfo(true)}
              >
                <MdAdd size={16} /> Parent Info
              </button>
            )}
          </div>
          
          <div className="photo-upload-section">
            <div className="photo-container" onClick={() => document.getElementById('photo-input').click()}>
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="photo-preview-img" />
              ) : (
                <div className="photo-placeholder">
                  <MdCameraAlt size={32} />
                  <span>Upload Photo</span>
                </div>
              )}
            </div>
            <input 
              id="photo-input"
              type="file" 
              accept="image/*" 
              onChange={handlePhotoChange} 
              style={{ display: 'none' }}
            />
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
                type="date" 
                name="dob" 
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select 
                name="gender" 
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Class Name</label>
              <select name="className" value={formData.className} onChange={handleChange} required>
                <option value="A">Class A</option>
                <option value="B">Class B</option>
                <option value="C">Class C</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label>Address</label>
              <textarea 
                name="address" 
                placeholder="Enter home address" 
                value={formData.address}
                onChange={handleChange}
                rows="2"
                required
              />
            </div>
          </div>
        </section>

        {/* Parent Information Section */}
        <section className={`registration-card parent-card ${showParentInfo ? "visible" : "hidden"}`}>
          <div className="parent-info-header">
            <h2 className="card-title">Parent Information</h2>
            <button 
              type="button" 
              className="close-info-btn"
              onClick={() => setShowParentInfo(false)}
            >
              Close
            </button>
          </div>

          <div className="form-grid">
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
              <label>ID Number</label>
              <input 
                type="text" 
                name="parentId" 
                placeholder="Enter parent ID number" 
                value={formData.parentId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Relationship</label>
              <select name="relationship" value={formData.relationship} onChange={handleChange} required>
                <option value="">Select Relationship</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Guardian">Guardian</option>
              </select>
            </div>
            <div className="form-group">
              <label>Occupation</label>
              <input 
                type="text" 
                name="parentOccupation" 
                placeholder="e.g. Teacher, Engineer" 
                value={formData.parentOccupation}
                onChange={handleChange}
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
              <label>Contact No (Sri Lanka)</label>
              <input 
                type="text" 
                name="parentPhone" 
                placeholder="07XXXXXXXX" 
                value={formData.parentPhone}
                onChange={handleChange}
                className={errors.parentPhone ? "input-error" : ""}
                required
              />
              {errors.parentPhone && <span className="error-msg">{errors.parentPhone}</span>}
            </div>
            <div className="form-group full-width">
              <label>Emergency Contact</label>
              <input 
                type="text" 
                name="emergencyContact" 
                placeholder="Name & Relationship - 07XXXXXXXX" 
                value={formData.emergencyContact}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <p className="invite-text">Auto-invite parent to Sprouty app upon registration.</p>
        </section>

        <div className="actions-footer">
          <button type="submit" className="submit-btn" disabled={Object.keys(errors).length > 0}>
            {isEditMode ? "Update Details" : "Add Student"}
          </button>
        </div>
      </form>
    </div>
  );
}
