import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* User Management Pages */
import Login from "./features/userManagement/pages/Login";
import ForgotPassword from "./features/userManagement/pages/ForgotPassword";
import RequestConfirmed from "./features/userManagement/pages/RequestConfirmed";
import Landing from "./features/userManagement/pages/Landing";
import GetStarted from "./features/userManagement/pages/GetStarted";


/* Admin Pages */
import AdminLayout from "./features/userManagement/pages/admin/AdminLayout";
import AdminDashboard from "./features/userManagement/pages/admin/AdminDashboard";
import AdminProfile from "./features/userManagement/pages/admin/AdminProfile";
import ManageUsers from "./features/userManagement/pages/admin/ManageUsers";
import AuditLogs from "./features/userManagement/pages/admin/AuditLogs";

/* Parent Pages */
import ParentLayout from "./features/userManagement/pages/parent/ParentLayout.jsx";
import ParentDashboard from "./features/userManagement/pages/parent/ParentDashboard.jsx";
import ParentProfile from "./features/userManagement/pages/parent/ParentProfile.jsx";
import MyChildren from "./features/userManagement/pages/parent/MyChildren.jsx";
import ChildProfile from "./features/userManagement/pages/parent/ChildProfile.jsx";

/* Staff Pages */
import AcceptInvite from "./features/userManagement/pages/staff/AcceptInvite";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Landing */}
        <Route path="/home" element={<Landing />} />
        <Route path="/get-started" element={<GetStarted />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Parent Request */}
        <Route path="/request-confirmed" element={<RequestConfirmed />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="logs" element={<AuditLogs />} />
        </Route>

        {/* Parent */}
        <Route path="/parent" element={<ParentLayout />}>
          <Route path="dashboard" element={<ParentDashboard />} />
          <Route path="profile" element={<ParentProfile />} />
          <Route path="children" element={<MyChildren />} />
          <Route path="children/:id" element={<ChildProfile />} />
        </Route>

        {/* Staff */}
        <Route path="/accept-invite" element={<AcceptInvite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;