// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminprogressPage from './features/progressMonitoring/AdminprogressPage';
import ParentProgressPage from './features/progressMonitoring/ParentProgressPage';
import TeacherProgressPage from './features/progressMonitoring/TeacherProgressPage';
import Login from './components/shared/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/progress" element={<AdminprogressPage />} />
          <Route path="/parent/progress" element={<ParentProgressPage />} />
          <Route path="/teacher/progress" element={<TeacherProgressPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;