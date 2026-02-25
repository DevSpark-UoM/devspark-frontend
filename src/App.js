// src/App.js
import React from 'react';
import ParentProgressPage from './features/progressMonitoring/ParentProgressPage';
// Import New  Dashboard
import ActivityDashboard from './features/activityManagement/ActivityDashboard';

function App() {
  return (
    <div className="App">
      {/* The command for view in Dashboard  */}
      <ActivityDashboard />
      
      {/* Parent Progress page */}
      <ParentProgressPage />
    </div>
  );
}

export default App;