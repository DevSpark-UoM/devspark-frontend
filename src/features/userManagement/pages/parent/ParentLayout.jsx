import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ParentSidebar from '../../../../components/parent/ParentSidebar.jsx';
import SettingsPanel from '../../../../components/shared/SettingsPanel/SettingsPanel.jsx';
import './ParentLayout.css';

export default function ParentLayout() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const saved = localStorage.getItem('parent_notifications_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(() => {
    const saved = localStorage.getItem('parent_2fa_enabled');
    return saved !== null ? JSON.parse(saved) : false;
  });

  const handleToggleNotifications = () => {
    setNotificationsEnabled(prev => {
      const newState = !prev;
      localStorage.setItem('parent_notifications_enabled', JSON.stringify(newState));
      return newState;
    });
  };

  const handleToggle2FA = () => {
    setTwoFactorEnabled(prev => {
      const newState = !prev;
      localStorage.setItem('parent_2fa_enabled', JSON.stringify(newState));
      if (newState) {
        alert("Two-Factor Authentication enabled! 🛡️ In a real app, you would now set up your phone or authenticator app.");
      }
      return newState;
    });
  };

  return (
    <div className="parent-layout">
      <ParentSidebar onOpenSettings={() => setIsSettingsOpen(true)} />
      <main className="parent-main">
        <Outlet />
      </main>

      <SettingsPanel 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        user={{
          name: "Sarah Jenkins",
          role: "Parent",
          avatar: localStorage.getItem('parentAvatar')
        }}
        notificationsEnabled={notificationsEnabled}
        onToggleNotifications={handleToggleNotifications}
        twoFactorEnabled={twoFactorEnabled}
        onToggle2FA={handleToggle2FA}
        notificationDesc="Receive alerts for your children's activities"
      />
    </div>
  );
}
