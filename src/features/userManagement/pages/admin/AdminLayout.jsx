/*side bar(left)
main content(right)
works with nested routes */

import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../../components/admin/Sidebar";// adjust path if needed
import "./AdminLayout.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}