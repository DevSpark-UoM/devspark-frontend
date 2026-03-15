import React, { useState, useEffect } from "react";
import "./ManageUsers.css";
import { MdSearch, MdFilterList, MdMoreVert, MdToggleOn, MdToggleOff } from "react-icons/md";

const MOCK_USERS = [
  { id: 1, name: "Sarah Jenkins", email: "sarah.parent@example.com", role: "Parent", status: "Active", joined: "2023-05-12" },
  { id: 2, name: "Michael Chen", email: "michael.staff@example.com", role: "Staff", status: "Active", joined: "2023-06-01" },
  { id: 3, name: "Emily Davis", email: "emily.parent@example.com", role: "Parent", status: "Active", joined: "2023-08-15" },
  { id: 4, name: "Robert Wilson", email: "robert.staff@example.com", role: "Staff", status: "Deactivated", joined: "2023-04-20" },
  { id: 5, name: "Jessica Taylor", email: "jessica.parent@example.com", role: "Parent", status: "Active", joined: "2023-11-05" },
];

export default function ManageUsers() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleUserStatus = (userId) => {
    setUsers(prevUsers => prevUsers.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === "Active" ? "Deactivated" : "Active";
        
        // Log this action to audit logs (mock)
        const log = {
          user: "Admin Anu",
          action: `${newStatus === "Deactivated" ? "Deactivated" : "Activated"} user ${user.name}`,
          timestamp: new Date().toLocaleString()
        };
        const logs = JSON.parse(localStorage.getItem('auditLogs') || '[]');
        logs.unshift(log);
        localStorage.setItem('auditLogs', JSON.stringify(logs.slice(0, 50)));

        return { ...user, status: newStatus };
      }
      return user;
    }));
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mu-container">
      <div className="mu-header">
        <h1>Manage Users</h1>
        <p>View, search, and manage account statuses for parents and staff.</p>
      </div>

      <div className="mu-controls">
        <div className="mu-search-bar">
          <MdSearch size={20} />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="mu-filter-btn">
          <MdFilterList size={20} /> Filter
        </button>
      </div>

      <div className="mu-card">
        <table className="mu-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="mu-user-name">{user.name}</div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`mu-role-badge ${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
                <td>{user.joined}</td>
                <td>
                  <span className={`mu-status-pill ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className="mu-actions">
                    <button 
                      className={`mu-status-toggle ${user.status.toLowerCase()}`}
                      onClick={() => toggleUserStatus(user.id)}
                      title={user.status === "Active" ? "Deactivate User" : "Activate User"}
                    >
                      {user.status === "Active" ? <MdToggleOn size={32} /> : <MdToggleOff size={32} />}
                    </button>
                    <button className="mu-more-btn">
                      <MdMoreVert size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
