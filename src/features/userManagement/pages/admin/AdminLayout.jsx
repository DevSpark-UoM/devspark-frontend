/*side bar(left)
main content(right)
works with nested routes */

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../../components/admin/Sidebar";// adjust path if needed
import SettingsPanel from "../../../../components/shared/SettingsPanel/SettingsPanel.jsx";
import "./AdminLayout.css";

export default function AdminLayout() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const saved = localStorage.getItem('admin_notifications_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(() => {
    const saved = localStorage.getItem('admin_2fa_enabled');
    return saved !== null ? JSON.parse(saved) : false;
  });

  const handleToggleNotifications = () => {
    setNotificationsEnabled(prev => {
      const newState = !prev;
      localStorage.setItem('admin_notifications_enabled', JSON.stringify(newState));
      return newState;
    });
  };

  const handleToggle2FA = () => {
    setTwoFactorEnabled(prev => {
      const newState = !prev;
      localStorage.setItem('admin_2fa_enabled', JSON.stringify(newState));
      if (newState) {
        alert("Two-Factor Authentication enabled! 🛡️ Access to administrative tools is now more secure.");
      }
      return newState;
    });
  };

  return (
    <div className="admin-layout">
      <Sidebar onOpenSettings={() => setIsSettingsOpen(true)} />
      <main className="admin-main">
        <Outlet />
      </main>

      <SettingsPanel 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        user={{
          name: "Anu Agarwal",
          role: "Administrator",
          avatar: localStorage.getItem('adminAvatar') || require("../../../../assets/admin-avatar.jpeg"),
          location: "Sprouty Daycare Center"
        }}
        notificationsEnabled={notificationsEnabled}
        onToggleNotifications={handleToggleNotifications}
        twoFactorEnabled={twoFactorEnabled}
        onToggle2FA={handleToggle2FA}
        notificationDesc="Receive alerts for new staff requests"
      />
    </div>
  );
}