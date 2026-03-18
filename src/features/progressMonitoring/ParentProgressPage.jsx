import React, { useState } from 'react';
import Sidebar from '../../components/parent/Sidebar';
import { ProgressBarChart, ProgressPieChart } from '../../components/shared/ProgressChart';
import ParentHelpChatbot from '../../components/parent/ParentHelpChatbot';
import { childrenData } from '../../mockData/progress';
import './ParentProgressPage.css';

const ParentProgressPage = () => {
  const [selectedChildId, setSelectedChildId] = useState("C1");
  const [showData, setShowData] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalDaysInRange, setTotalDaysInRange] = useState(0);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(0);
  const daysPerPage = 7;

  const currentChild = childrenData[selectedChildId];

  // Helper function to generate array of dates
  const getDatesInRange = (start, end) => {
    const dates = [];
    let curr = new Date(start);
    const stop = new Date(end);
    while (curr <= stop) {
      // Formatting as DD/MM
      dates.push(new Date(curr).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' }));
      curr.setDate(curr.getDate() + 1);
    }
    return dates;
  };

  const allDatesInRange = (startDate && endDate) ? getDatesInRange(startDate, endDate) : [];

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
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    setTotalDaysInRange(diffDays);
    setCurrentPage(0); // Reset to first page
    setShowData(true);
  };

  const getAttendancePercentage = () => {
    if (totalDaysInRange === 0) return 0;
    return ((currentChild.attendance / totalDaysInRange) * 100).toFixed(1);
  };

  // Pagination Logic for Chart
  const startIndex = currentPage * daysPerPage;
  const visibleLabels = allDatesInRange.slice(startIndex, startIndex + daysPerPage);

  // Mapping engagement data to the current slice
  // (In real backend, you would fetch only the data for these dates)
  const visibleData = visibleLabels.map((_, idx) => {
    return currentChild.engagement[(startIndex + idx) % currentChild.engagement.length];
  });

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <main className="main-content">
        <header className="top-header">
          <div className="adaptive-breadcrumb">Dashboard / Progress Report</div>
          <div className="child-switch-container">
            {Object.keys(childrenData).map(id => (
              <button key={id} className={selectedChildId === id ? "active" : "inactive"}
                onClick={() => { setSelectedChildId(id); setShowData(false); setStartDate(""); setEndDate(""); }}>
                {childrenData[id].name}
              </button>
            ))}
          </div>
        </header>

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
              <div className="stat-card">
                <p className="adaptive-card-title">Days Present</p>
                <h2 className="teal-text">{currentChild.attendance}</h2>
              </div>
              <div className="stat-card">
                <p className="adaptive-card-title">Activities</p>
                <h2 className="teal-text">{currentChild.activities}</h2>
              </div>
              <div className="stat-card">
                <p className="adaptive-card-title">Avg. Mood</p>
                <h2 className="teal-text">{currentChild.mood}</h2>
              </div>
              <div className="stat-card">
                <p className="adaptive-card-title">Meals Provided</p>
                <h2 className="teal-text">{currentChild.meals}</h2>
              </div>
            </section>

            <section className="charts-grid-horizontal">
              <div className="chart-item">
                <div className="chart-header-flex">
                  <h3 className="adaptive-card-title chart-head">Activity Engagement</h3>

                  {/* PAGINATION CONTROLS (Your Arrow Mockup) */}
                  <div className="chart-pagination">
                    <button
                      className="nav-arrow"
                      onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                      disabled={currentPage === 0}
                    > ❮ </button>
                    <span className="page-indicator">
                      {startIndex + 1} - {Math.min(startIndex + daysPerPage, allDatesInRange.length)} of {allDatesInRange.length} Days
                    </span>
                    <button
                      className="nav-arrow"
                      onClick={() => setCurrentPage(prev => prev + 1)}
                      disabled={startIndex + daysPerPage >= allDatesInRange.length}
                    > ❯ </button>
                  </div>
                </div>

                <div className="chart-box-fix">
                  <ProgressBarChart data={{
                    labels: visibleLabels, // Dynamic Dates
                    datasets: [{
                      label: 'Hours Spent',
                      data: visibleData,
                      backgroundColor: '#3d8f8f',
                      borderRadius: 5
                    }]
                  }} />
                </div>
              </div>

              <div className="chart-item pie-item">
                <h3 className="adaptive-card-title chart-head">Attendance Rate</h3>
                <div className="pie-container-fix">
                  <ProgressPieChart data={{
                    labels: ['Present', 'Absent'],
                    datasets: [{
                      data: [getAttendancePercentage(), (100 - getAttendancePercentage())],
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
      </main>

      <ParentHelpChatbot />
    </div>
  );
};

export default ParentProgressPage;