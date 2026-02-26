// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import ParentProgressPage from './features/progressMonitoring/ParentProgressPage';

function App() {
  return (
    <Router> {/* Inga use pannuna warning poyidum */}
      <div className="App">
        <ParentProgressPage />
      </div>
    </Router>
  );
}

export default App;