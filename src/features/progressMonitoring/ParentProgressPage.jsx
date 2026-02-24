import React, { useState } from 'react';
import ParentNavbar from '../../components/parent/ParentNavbar';
import { ProgressBarChart, ProgressPieChart } from '../../components/shared/ProgressChart';
import { childrenData } from '../../mockData/progressData';
import './ParentProgressPage.css';

const ParentProgressPage = () => {
  const [activeNav, setActiveNav] = useState("Progress");
  const [selectedChildId, setSelectedChildId] = useState("C1");
  const [showData, setShowData] = useState(false);
  const [showSignOut, setShowSignOut] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  // New State for dynamic calculation
  const [totalDaysInRange, setTotalDaysInRange] = useState(0);

  const currentChild = childrenData[selectedChildId];

  const handleUpdateView = () => {
    if (!startDate || !endDate) {
      alert("Please select both Start and End dates first!");
      return;
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      alert("Invalid Date Range: Please select valid range!");
      setShowData(false);
      return;
    }

    // Dynamic Logic: Calculating total days in selected range
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
    
    setTotalDaysInRange(diffDays);
    setShowData(true);
  };

  // Logic to calculate dynamic percentage for the pie chart label
  const getAttendancePercentage = () => {
    if (totalDaysInRange === 0) return 0;
    // attendance represents number of days present
    return ((currentChild.attendance / totalDaysInRange) * 100).toFixed(1);
  };

  return (
    <div className="dashboard-wrapper">
      <ParentNavbar 
        activeNav={activeNav} setActiveNav={setActiveNav} 
        setShowData={setShowData} showSignOut={showSignOut} 
        setShowSignOut={setShowSignOut} 
      />

      <main className="main-content">
        <header className="top-header">
          <div className="adaptive-breadcrumb">Dashboard / {activeNav} Report</div>
          <div className="child-switch-container">
            {Object.keys(childrenData).map(id => (
              <button key={id} className={selectedChildId === id ? "active" : "inactive"}
                onClick={() => { setSelectedChildId(id); setShowData(false); setStartDate(""); setEndDate(""); }}>
                {childrenData[id].name}
              </button>
            ))}
          </div>
        </header>

        {activeNav !== "Progress" ? (
          <div className="empty-state">
            <h2 className="adaptive-title">{activeNav} Section</h2>
            <p className="adaptive-text">Redirecting to {activeNav} module...</p>
          </div>
        ) : (
          <>
            <section className="report-title-section">
              <h1 className="adaptive-title main-heading">Progress Report</h1>
              <div className="date-filter">
                <span className="adaptive-label">Range: </span>
                <input type="date" className="date-input adaptive-input" value={startDate} onChange={(e) => setStartDate(e.target.value)} /> 
                <span className="adaptive-label">to</span> 
                <input type="date" className="date-input adaptive-input" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <button className="btn-view margin-left-fix" onClick={handleUpdateView}>Update View</button>
              </div>
            </section>

            {!showData ? (
              <div className="empty-state">
                <div className="empty-icon">📊</div>
                <p className="adaptive-text">Select a date range and click <b>Update View</b> to see {currentChild.name}'s report.</p>
              </div>
            ) : (
              <div className="data-area-spaced">
                <section className="stats-grid-horizontal">
                  <div className="stat-card"><p className="adaptive-card-title">Days Present</p><h2 className="teal-text">{currentChild.attendance}</h2></div>
                  <div className="stat-card"><p className="adaptive-card-title">Activities</p><h2 className="teal-text">{currentChild.activities}</h2></div>
                  <div className="stat-card"><p className="adaptive-card-title">Avg. Mood</p><h2 className="teal-text">{currentChild.mood}</h2></div>
                  <div className="stat-card"><p className="adaptive-card-title">Meals Provided</p><h2 className="teal-text">{currentChild.meals}</h2></div>
                </section>

                <section className="charts-grid-horizontal">
                  <div className="chart-item">
                    <h3 className="adaptive-card-title chart-head">Activity Engagement</h3>
                    <div className="chart-box-fix">
                      <ProgressBarChart data={{
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                        datasets: [{ label: 'Hours', data: currentChild.engagement, backgroundColor: '#3d8f8f', borderRadius: 5 }]
                      }} />
                    </div>
                  </div>
                  <div className="chart-item pie-item">
                    <h3 className="adaptive-card-title chart-head">Attendance Rate</h3>
                    <div className="pie-container-fix">
                      <ProgressPieChart data={{
                        labels: ['Present', 'Absent'],
                        datasets: [{ 
                          // Present Percentage vs (100 - Present Percentage)
                          data: [
                            getAttendancePercentage(), 
                            (100 - getAttendancePercentage())
                          ], 
                          backgroundColor: ['#3d8f8f', '#edf2f7'], 
                          borderWidth: 0 
                        }]
                      }} />
                      <div className="pie-center-label">
                        <span className="percent-num adaptive-title">{getAttendancePercentage()}%</span>
                        <span className="sub-text adaptive-text">Present</span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default ParentProgressPage;