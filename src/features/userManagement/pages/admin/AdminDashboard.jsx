import { useState, useEffect } from "react";
import StatCard from "../../../../components/admin/StatCard";
import { MdSettings as Settings, MdAdd as Plus, MdMoreVert as MoreVertical, MdCalendarMonth as CalendarIcon, MdChat as MessageSquare } from "react-icons/md";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  // Simulated backend state for pending teacher requests
  const [pendingRequests, setPendingRequests] = useState([
    { id: 1, name: "Liam's Dad (Parent)", type: "Parent", detail: "Submitted enrollment forms", status: "New", statusClass: "new" },
    { id: 2, name: "Sarah Miller (Staff)", type: "Staff", detail: "Requested time off for Friday", status: "Pending", statusClass: "pending" },
    { id: 3, name: "Monthly Billing", type: "System", detail: "Invoices generated for October", status: "System", statusClass: "system" },
  ]);

  // Actual staff requests that need approval/rejection (from previous implementation)
  const [staffRequests, setStaffRequests] = useState([
    { id: 101, name: "Amaya Silva", email: "amaya.s@example.com", role: "Teacher" },
    { id: 102, name: "Kasun Perera", email: "kasun.p@example.com", role: "Teacher" }
  ]);

  const [generatedLink, setGeneratedLink] = useState("");
  const [parentRequests, setParentRequests] = useState([]);

  // Load parent requests from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("pending_parent_requests") || "[]");
    setParentRequests(saved);
  }, []);

  const logAction = (action) => {
    const log = {
      user: "Admin Anu",
      action: action,
      timestamp: new Date().toLocaleString()
    };
    const logs = JSON.parse(localStorage.getItem('auditLogs') || '[]');
    logs.unshift(log);
    localStorage.setItem('auditLogs', JSON.stringify(logs.slice(0, 50)));
  };

  const approveTeacher = (req) => {
    const mockToken = `token_${Math.random().toString(36).substr(2, 9)}_${req.id}`;
    const link = `http://localhost:3000/accept-invite?token=${mockToken}`;
    setGeneratedLink(`Success! Invitation sent to ${req.email}: ${link}`);
    setStaffRequests(staffRequests.filter(r => r.id !== req.id));
    logAction(`Approved teacher invitation for ${req.name} (${req.role})`);
  };

  const approveParent = (req) => {
    // 1. Generate temp password
    const tempPassword = `Sprouty${Math.floor(1000 + Math.random() * 9000)}!`;

    // 2. Save to "approved_users" for Login.jsx to use
    const approvedUsers = JSON.parse(localStorage.getItem("approved_users") || "[]");
    const newUser = {
      email: req.email,
      password: tempPassword,
      role: "Parent",
      name: req.name
    };

    // Remove if user already exists (update) or just push
    const filteredUsers = approvedUsers.filter(u => u.email !== req.email);
    localStorage.setItem("approved_users", JSON.stringify([...filteredUsers, newUser]));

    // 3. Remove from pending
    const remainingRequests = parentRequests.filter(r => r.id !== req.id);
    setParentRequests(remainingRequests);
    localStorage.setItem("pending_parent_requests", JSON.stringify(remainingRequests));

    // 4. Show simulation message
    setGeneratedLink(`SMTP Simulation: Credentials sent to ${req.email}. Temp Password: ${tempPassword}`);
    
    // 5. Log action
    logAction(`Approved parent admission for ${req.name} (${req.email})`);
  };

  const rejectParent = (id) => {
    const req = parentRequests.find(r => r.id === id);
    const name = req ? req.name : "Unknown Parent";
    const remainingRequests = parentRequests.filter(r => r.id !== id);
    setParentRequests(remainingRequests);
    localStorage.setItem("pending_parent_requests", JSON.stringify(remainingRequests));
    logAction(`Rejected parent admission for ${name}`);
  };

  const rejectTeacher = (id) => {
    const req = staffRequests.find(r => r.id === id);
    const name = req ? req.name : "Unknown Teacher";
    setStaffRequests(staffRequests.filter(r => r.id !== id));
    logAction(`Rejected teacher invitation for ${name}`);
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="header-text">
          <h1>Welcome Anu Agarwal!</h1>
          <p>Today is, February 8</p>
        </div>

      </header>

      <div className="stats-grid">
        <StatCard title="Total Students" value="124" subtitle="+3 new this week" colorClass="green" />
        <StatCard title="Staff on Duty" value="18" subtitle="2 on leave" colorClass="blue" />
        <StatCard title="Pending Inquiries" value="7" subtitle="Action required" colorClass="orange" />
        <StatCard title="Revenue (M)" value="Rs 1K" subtitle="Monthly" colorClass="purple" />
      </div>

      <div className="dashboard-content-grid">
        <section className="dashboard-card recent-activities">
          <div className="card-header">
            <h3>Recent Activities</h3>
            <button className="view-all">View All</button>
          </div>
          <div className="activities-list">
            {pendingRequests.map(item => (
              <div key={item.id} className="activity-item">
                <div className="activity-icon"></div>
                <div className="activity-info">
                  <h4>{item.name}</h4>
                  <p>{item.detail}</p>
                </div>
                <span className={`status-badge ${item.statusClass}`}>{item.status}</span>
              </div>
            ))}


            {/* Staff Requests section integrated */}
            {staffRequests.length > 0 && (
              <div className="staff-requests-sub">
                <h4 className="sub-title">Staff Requests</h4>
                {staffRequests.map(req => (
                  <div key={req.id} className="activity-item staff-req">
                    <div className="activity-icon staff"></div>
                    <div className="activity-info">
                      <h4>{req.name}</h4>
                      <p>{req.role} • {req.email}</p>
                    </div>
                    <div className="request-actions">
                      <button className="approve-btn" onClick={() => approveTeacher(req)}>Approve</button>
                      <button className="reject-btn" onClick={() => rejectTeacher(req.id)}>Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Parent Admissions Requests */}
            {parentRequests.length > 0 && (
              <div className="parent-requests-sub">
                <h4 className="sub-title">Parent Requests</h4>
                {parentRequests.map(req => (
                  <div key={req.id} className="activity-item parent-req">
                    <div className="activity-icon parent"></div>
                    <div className="activity-info">
                      <h4>{req.name}</h4>
                      <p>{req.detail} • {req.email}</p>
                    </div>
                    <div className="request-actions">
                      <button className="approve-btn" onClick={() => approveParent(req)}>Approve</button>
                      <button className="reject-btn" onClick={() => rejectParent(req.id)}>Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {generatedLink && (
              <div className="generated-link-alert">
                <p>{generatedLink}</p>
              </div>
            )}
          </div>
        </section>

        <section className="dashboard-card upcoming-schedule">
          <div className="card-header">
            <h3>Upcoming Schedule</h3>
          </div>
          <div className="schedule-list">
            <div className="schedule-item">
              <div className="date-box">
                <span className="day">08</span>
                <span className="label">Today</span>
              </div>
              <div className="schedule-info">
                <h4>Morning Circle Time</h4>
                <p>09:00 AM - 10:30 AM • Main Hall</p>
              </div>
            </div>
            <div className="schedule-item">
              <div className="date-box">
                <span className="day">08</span>
                <span className="label">Today</span>
              </div>
              <div className="schedule-info">
                <h4>Staff Meeting</h4>
                <p>12:30 PM - 01:30 PM • Staff Room</p>
              </div>
            </div>
            <div className="schedule-item">
              <div className="date-box tomorrow">
                <span className="day">09</span>
                <span className="label">Tomorrow</span>
              </div>
              <div className="schedule-info">
                <h4>Parent Teacher Conference</h4>
                <p>All Day • Classrooms 1-4</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="daily-vibe-banner">
        <div className="vibe-content">
          <h3>Daily Vibe</h3>
          <p>Everything is running smoothly!</p>
          <button className="chat-btn">
            <MessageSquare size={18} /> Chat with us
          </button>
        </div>
        <div className="vibe-decoration">
          <div className="circle c1"></div>
          <div className="circle c2"></div>
        </div>
      </div>
    </div>
  );
}