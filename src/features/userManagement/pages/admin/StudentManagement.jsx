import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdSearch, MdEdit, MdSchool, MdFilterList } from "react-icons/md";
import "./StudentManagement.css";

const ClassSection = ({ className, students, onEdit, onViewProfile }) => {
  const [searchTermMale, setSearchTermMale] = useState("");
  const [searchTermFemale, setSearchTermFemale] = useState("");

  const maleStudents = students.filter(s => s.gender === "Male");
  const femaleStudents = students.filter(s => s.gender === "Female");

  const filteredMale = maleStudents.filter(s => 
    s.name.toLowerCase().includes(searchTermMale.toLowerCase())
  );
  const filteredFemale = femaleStudents.filter(s => 
    s.name.toLowerCase().includes(searchTermFemale.toLowerCase())
  );

  return (
    <div className="class-section">
      <div className="class-header">
        <h2 className="class-title">
          <MdSchool className="class-icon" />
          Class {className}
          <span className="student-count">{students.length} Students</span>
        </h2>
      </div>

      <div className="gender-tables-grid">
        {/* Male Students Table */}
        <div className="gender-table-container">
          <div className="table-header-row">
            <h3 className="gender-title male"><span className="dot"></span> Male Students</h3>
            <div className="search-box">
              <MdSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search male students..." 
                value={searchTermMale}
                onChange={(e) => setSearchTermMale(e.target.value)}
              />
            </div>
          </div>
          <div className="table-wrapper">
            <table className="management-table">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>ID</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredMale.length > 0 ? filteredMale.map(student => (
                  <tr key={student.id}>
                    <td 
                      className="name-cell clickable" 
                      onClick={() => onViewProfile(student.id)}
                    >
                      {student.name}
                    </td>
                    <td>#{student.id.toString().slice(-4)}</td>
                    <td className="actions-cell">
                      <button className="edit-mini-btn" onClick={() => onEdit(student.id)}>
                        <MdEdit size={14} /> Edit
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="3" className="empty-row">No male students found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Female Students Table */}
        <div className="gender-table-container">
          <div className="table-header-row">
            <h3 className="gender-title female"><span className="dot"></span> Female Students</h3>
            <div className="search-box">
              <MdSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search female students..." 
                value={searchTermFemale}
                onChange={(e) => setSearchTermFemale(e.target.value)}
              />
            </div>
          </div>
          <div className="table-wrapper">
            <table className="management-table">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>ID</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredFemale.length > 0 ? filteredFemale.map(student => (
                  <tr key={student.id}>
                    <td 
                      className="name-cell clickable" 
                      onClick={() => onViewProfile(student.id)}
                    >
                      {student.name}
                    </td>
                    <td>#{student.id.toString().slice(-4)}</td>
                    <td className="actions-cell">
                      <button className="edit-mini-btn" onClick={() => onEdit(student.id)}>
                        <MdEdit size={14} /> Edit
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="3" className="empty-row">No female students found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function StudentManagement() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("admissions_students");
    if (saved) {
      // Show ALL students (current school body usually refers to Approved students)
      const allStudents = JSON.parse(saved).filter(s => s.status === "Approved");
      setStudents(allStudents);
    }
  }, []);

  const handleEdit = (id) => navigate(`/admin/admissions/edit/${id}`);
  const handleViewProfile = (id) => navigate(`/parent/children/${id}`);

  const studentsByClass = {
    A: students.filter(s => s.className === "A"),
    B: students.filter(s => s.className === "B"),
    C: students.filter(s => s.className === "C"),
  };

  return (
    <div className="student-management-page anim-fade-in">
      <header className="management-page-header">
        <div className="header-text">
          <h1>Student Management</h1>
          <p className="breadcrumbs">My School | <span>Students</span></p>
        </div>
        <div className="header-actions">
          <button className="filter-btn">
            <MdFilterList size={20} /> Filter Classes
          </button>
        </div>
      </header>

      <div className="management-content">
        <ClassSection 
          className="A" 
          students={studentsByClass.A} 
          onEdit={handleEdit} 
          onViewProfile={handleViewProfile} 
        />
        <ClassSection 
          className="B" 
          students={studentsByClass.B} 
          onEdit={handleEdit} 
          onViewProfile={handleViewProfile} 
        />
        <ClassSection 
          className="C" 
          students={studentsByClass.C} 
          onEdit={handleEdit} 
          onViewProfile={handleViewProfile} 
        />
      </div>
    </div>
  );
}
