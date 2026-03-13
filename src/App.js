import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* User Management Pages */
import Login from "./features/userManagement/pages/Login";
import ForgotPassword from "./features/userManagement/pages/ForgotPassword";
import RequestForm from "./features/userManagement/pages/RequestForm";
import RequestConfirmed from "./features/userManagement/pages/RequestConfirmed";
import Landing from "./features/userManagement/pages/Landing";


/* Admin Pages */
import AdminLayout from "./features/userManagement/pages/admin/AdminLayout";
import AdminDashboard from "./features/userManagement/pages/admin/AdminDashboard";
import AdminProfile from "./features/userManagement/pages/admin/AdminProfile";

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

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Parent Request */}
        <Route path="/request-access" element={<RequestForm />} />
        <Route path="/request-confirmed" element={<RequestConfirmed />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* Staff */}
        <Route path="/accept-invite" element={<AcceptInvite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;