import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdSearch, MdFilterList, MdAdd } from "react-icons/md";
import StatCard from "../../../../components/admin/StatCard";
import "./AdmissionsDashboard.css";

export default function AdmissionsDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname.endsWith("/status") ? "Student Status" : "Select Student";
  
  const [activeStatus, setActiveStatus] = useState("Approved");
  const [searchQuery, setSearchQuery] = useState("");
  const [allStudents, setAllStudents] = useState(() => {
    const saved = localStorage.getItem("admissions_students");
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, name: "Aaliyah Jones", gender: "Female", className: "A", date: "Feb 07, 2025", time: "10:30 AM", status: "Approved" },
      { id: 2, name: "Liam Brown", gender: "Male", className: "B", date: "Feb 06, 2025", time: "02:15 PM", status: "Approved" },
      { id: 3, name: "Mei Lin", gender: "Female", className: "C", date: "Feb 05, 2025", time: "09:45 AM", status: "Approved" },
      { id: 4, name: "Carlos Ruiz", gender: "Male", className: "A", date: "Feb 05, 2025", time: "11:00 AM", status: "Approved" },
      { id: 5, name: "Zara Ahmed", gender: "Female", className: "B", date: "Feb 08, 2025", time: "08:30 AM", status: "Waitlist" },
      { id: 6, name: "Ethan Hunt", gender: "Male", className: "C", date: "Feb 09, 2025", time: "09:00 AM", status: "Waitlist" },
    ];
  });

  useEffect(() => {
    localStorage.setItem("admissions_students", JSON.stringify(allStudents));
  }, [allStudents]);

  const [openActionId, setOpenActionId] = useState(null);

  const handleApprove = (id) => {
    setAllStudents(prev => prev.map(s => 
      s.id === id ? { ...s, status: "Approved" } : s
    ));
    setOpenActionId(null);
  };

  const handleReject = (id) => {
    setAllStudents(prev => prev.filter(s => s.id !== id));
    setOpenActionId(null);
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this student?")) {
      setAllStudents(prev => prev.filter(s => s.id !== id));
    }
    setOpenActionId(null);
  };

  const stats = {
    total: allStudents.length,
    approved: allStudents.filter(s => s.status === "Approved").length,
    waitlist: allStudents.filter(s => s.status === "Waitlist").length,
  };

  const filteredStudents = allStudents.filter(s => 
    (activeStatus === "All" || s.status === activeStatus) && 
    (s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.className.includes(searchQuery))
  );

  const maleStudents = filteredStudents.filter(s => s.gender === "Male");
  const femaleStudents = filteredStudents.filter(s => s.gender === "Female");
  const otherStudents = filteredStudents.filter(s => s.gender !== "Male" && s.gender !== "Female");

  return (
    <div className="admissions-dashboard">
      <header className="dashboard-header">
        <div className="title-section">
          <h1>Admission Dashboard</h1>
          <p className="breadcrumbs">Admissions | <span>{activeStatus}</span></p>
        </div>
        <button className="new-student-btn" onClick={() => navigate("/admin/admissions/add")}>
          <MdAdd size={20} /> New Student
        </button>
      </header>

      <div className="stats-grid">
        <div className="stat-item total" onClick={() => setActiveStatus("All")}>
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Students</div>
        </div>
        <div 
          className={`stat-item approved ${activeStatus === "Approved" ? "active" : ""}`}
          onClick={() => setActiveStatus("Approved")}
        >
          <div className="stat-value">{stats.approved}</div>
          <div className="stat-label">Approved</div>
        </div>
        <div 
          className={`stat-item waitlist ${activeStatus === "Waitlist" ? "active" : ""}`}
          onClick={() => setActiveStatus("Waitlist")}
        >
          <div className="stat-value">{stats.waitlist}</div>
          <div className="stat-label">Waitlist</div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === "Select Student" ? "active" : ""}`}
              onClick={() => navigate("/admin/admissions")}
            >
              Select Student
            </button>
            <button 
              className={`tab ${activeTab === "Student Status" ? "active" : ""}`}
              onClick={() => navigate("/admin/admissions/status")}
            >
              Student Status
            </button>
          </div>
          <div className="search-bar">
            <MdSearch size={20} />
            <input 
              type="text" 
              placeholder="Search students..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="tables-scroll-area">
          {/* Male Students Table */}
          <div className="gender-section">
            <h3 className="gender-title male"><span className="dot"></span> Male Students ({maleStudents.length})</h3>
            <table className="student-table">
              <thead>
                <tr>
                  <th><input type="checkbox" /></th>
                  <th>STUDENT NAME</th>
                  <th>CLASS</th>
                  <th>GENDER</th>
                  <th>REGISTRATION DATE</th>
                  <th>TIME</th>
                  {activeTab === "Student Status" && (
                    <>
                      <th className="status-header">STATUS</th>
                      <th>ACTIONS</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {maleStudents.length > 0 ? maleStudents.map(student => (
                  <tr key={student.id}>
                    <td><input type="checkbox" /></td>
                    <td 
                      className="student-name-cell clickable"
                      onClick={() => navigate(`/admin/admissions/edit/${student.id}`)}
                    >
                      <div className="student-avatar-container">
                        {student.photo ? (
                          <img src={student.photo} alt={student.name} className="student-avatar-img" />
                        ) : (
                          <div className="student-avatar-icon">
                            {student.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <span className="student-name-text">{student.name}</span>
                    </td>
                    <td>Class {student.className}</td>
                    <td>{student.gender}</td>
                    <td>{student.date}</td>
                    <td>{student.time}</td>
                    {activeTab === "Student Status" && (
                      <>
                        <td className="status-cell">
                          <span className={`status-tag ${student.status.toLowerCase()}`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="action-cell">
                          <div className="action-wrapper">
                            <button 
                              className="status-action-trigger" 
                              onClick={() => setOpenActionId(openActionId === student.id ? null : student.id)}
                            >
                              <MdFilterList size={14} /> Actions
                            </button>
                            {openActionId === student.id && (
                              <div className="action-popup">
                                <button className="edit-item-btn" onClick={() => navigate(`/admin/admissions/edit/${student.id}`)}>Edit Student</button>
                                {student.status === "Approved" ? (
                                  <button className="remove-item-btn" onClick={() => handleRemove(student.id)}>Remove Student</button>
                                ) : (
                                  <>
                                    <button className="approve-item-btn" onClick={() => handleApprove(student.id)}>Approve Student</button>
                                    <button className="reject-item-btn" onClick={() => handleReject(student.id)}>Reject Student</button>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )) : (
                  <tr><td colSpan="8" className="empty-row">No male students found</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Female Students Table */}
          <div className="gender-section">
            <h3 className="gender-title female"><span className="dot"></span> Female Students ({femaleStudents.length})</h3>
            <table className="student-table">
              <thead>
                <tr>
                  <th><input type="checkbox" /></th>
                  <th>STUDENT NAME</th>
                  <th>CLASS</th>
                  <th>GENDER</th>
                  <th>REGISTRATION DATE</th>
                  <th>TIME</th>
                  {activeTab === "Student Status" && (
                    <>
                      <th className="status-header">STATUS</th>
                      <th>ACTIONS</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {femaleStudents.length > 0 ? femaleStudents.map(student => (
                  <tr key={student.id}>
                    <td><input type="checkbox" /></td>
                    <td 
                      className="student-name-cell clickable"
                      onClick={() => navigate(`/admin/admissions/edit/${student.id}`)}
                    >
                      <div className="student-avatar-container">
                        {student.photo ? (
                          <img src={student.photo} alt={student.name} className="student-avatar-img" />
                        ) : (
                          <div className="student-avatar-icon">
                            {student.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <span className="student-name-text">{student.name}</span>
                    </td>
                    <td>Class {student.className}</td>
                    <td>{student.gender}</td>
                    <td>{student.date}</td>
                    <td>{student.time}</td>
                    {activeTab === "Student Status" && (
                      <>
                        <td className="status-cell">
                          <span className={`status-tag ${student.status.toLowerCase()}`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="action-cell">
                          <div className="action-wrapper">
                            <button 
                              className="status-action-trigger" 
                              onClick={() => setOpenActionId(openActionId === student.id ? null : student.id)}
                            >
                              <MdFilterList size={14} /> Actions
                            </button>
                            {openActionId === student.id && (
                              <div className="action-popup">
                                <button className="edit-item-btn" onClick={() => navigate(`/admin/admissions/edit/${student.id}`)}>Edit Student</button>
                                {student.status === "Approved" ? (
                                  <button className="remove-item-btn" onClick={() => handleRemove(student.id)}>Remove Student</button>
                                ) : (
                                  <>
                                    <button className="approve-item-btn" onClick={() => handleApprove(student.id)}>Approve Student</button>
                                    <button className="reject-item-btn" onClick={() => handleReject(student.id)}>Reject Student</button>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )) : (
                  <tr><td colSpan="8" className="empty-row">No female students found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="table-footer">
          Total: {filteredStudents.length} students <button className="clear-filter" onClick={() => {setSearchQuery(""); setActiveStatus("Approved")}}>Clear Filter</button>
        </div>
      </div>
    </div>
  );
}
