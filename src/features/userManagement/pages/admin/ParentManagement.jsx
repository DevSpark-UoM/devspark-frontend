import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdSearch, MdEdit, MdEmail, MdPhone, MdPeople } from "react-icons/md";
import "./ParentManagement.css";

// Sample parent image if none exists
import DefaultAvatar from "../../../../assets/parent1.jpg";

export default function ParentManagement() {
  const navigate = useNavigate();
  const [parents, setParents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("admissions_students");
    if (saved) {
      const allStudents = JSON.parse(saved).filter(s => s.status === "Approved");
      
      // Group by parent name (or ID if we had one, for now we use ParentFullName)
      const parentMap = new Map();
      
      allStudents.forEach(student => {
        const pKey = student.parentFullName || student.parentName;
        if (!pKey) return;
        
        if (!parentMap.has(pKey)) {
          parentMap.set(pKey, {
            name: pKey,
            studentId: student.id,
            childName: student.name,
            relationship: student.relationship,
            email: student.parentEmail,
            phone: student.parentPhone,
            photo: student.parentPhoto || DefaultAvatar,
            id: student.id // Use student ID as reference for editing
          });
        }
      });
      
      setParents(Array.from(parentMap.values()));
    }
  }, []);

  const filteredParents = parents.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.childName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id) => navigate(`/admin/parents/edit/${id}`);

  return (
    <div className="parent-management-page anim-fade-in">
      <header className="management-page-header">
        <div className="header-text">
          <h1>Parent Directory</h1>
          <p className="breadcrumbs">My School | <span>Parents</span></p>
        </div>
        <div className="search-bar-container">
          <div className="search-box">
            <MdSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search parents or children..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="parent-grid">
        {filteredParents.length > 0 ? filteredParents.map(parent => (
          <div className="parent-card" key={parent.id}>
            <div className="parent-card-main">
              <div className="parent-avatar-wrap">
                <img src={parent.photo} alt={parent.name} className="parent-avatar-img" />
              </div>
              <div className="parent-info">
                <h3>{parent.name}</h3>
                <p className="parent-relation">{parent.relationship} of {parent.childName}</p>
                <div className="parent-contact-strip">
                  <div className="contact-item">
                    <MdEmail size={14} /> <span>{parent.email}</span>
                  </div>
                  <div className="contact-item">
                    <MdPhone size={14} /> <span>{parent.phone}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="parent-card-footer">
              <button className="edit-parent-btn" onClick={() => handleEdit(parent.id)}>
                <MdEdit size={16} /> Edit Details
              </button>
            </div>
          </div>
        )) : (
          <div className="empty-state">
            <MdPeople size={48} />
            <p>No parents found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
