/*side bar(left)
main content(right)
works with nested routes */

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../../components/admin/Sidebar";// adjust path if needed
import AdminSettingsPanel from "./AdminSettingsPanel";
import "./AdminLayout.css";

export default function AdminLayout() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="admin-layout">
      <Sidebar onOpenSettings={() => setIsSettingsOpen(true)} />
      <main className="admin-main">
        <Outlet />
      </main>

      <AdminSettingsPanel 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
}