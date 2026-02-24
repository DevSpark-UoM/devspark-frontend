import React from 'react';
import './ParentNavbar.css';

const ParentNavbar = ({ activeNav, setActiveNav, setShowData, showSignOut, setShowSignOut }) => {
  const menuItems = [
    { name: "Home", icon: "🏠" }, { name: "My Children", icon: "👶" },
    { name: "Progress", icon: "📈" }, { name: "Payments", icon: "💳" },
    { name: "Notifications", icon: "🔔" }, { name: "Messaging", icon: "💬" },
    { name: "My Profile", icon: "👤" }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="logo-box">
          <div className="icon-check">✓</div>
          <h2>Sprouty</h2>
        </div>
        <nav>
          {menuItems.map(item => (
            <div 
              key={item.name} 
              className={`nav-link ${activeNav === item.name ? "active" : ""}`}
              onClick={() => {
                setActiveNav(item.name);
                if(item.name !== "Progress") setShowData(false);
              }}
            >
              <span className="nav-icon">{item.icon}</span> {item.name}
            </div>
          ))}
        </nav>
      </div>
      
      <div className="sidebar-footer">
        {showSignOut && (
          <div className="signout-popup-red" onClick={() => window.location.href = '/login'}>
            🚪 Sign Out
          </div>
        )}
        <div className="user-profile" onClick={() => setShowSignOut(!showSignOut)}>
          <div className="user-avatar-sj">SJ</div>
          <div className="user-info">
            <p className="user-name">Sarah Jenkins</p>
            <p className="user-role">Parent ▾</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ParentNavbar;