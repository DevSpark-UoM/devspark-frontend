import React, { useState } from 'react';
import {
    DailyProgressChart,
    AttendanceRateChart,
} from '../../components/Charts';
import Sidebar from '../../components/admin/Sidebar';
import { allChildren, studentEngagementData } from '../../mockData/progressData';
import ProgressChart from '../../components/shared/ProgressChart';
import './AdminprogressPage.css';

const StatCard = ({
    title,
    value,
    subtitle,
    icon,
    color = 'blue',
}) => {
    return (
        <div className={`stat-card stat-card-${color}`}>
            <div className="stat-icon">{icon}</div>
            <div className="stat-content">
                <h3>{title}</h3>
                <div className="stat-value">{value}</div>
                <p>{subtitle}</p>
            </div>
        </div>
    );
};

const AdminprogressPage = () => {
    const [selectedChild, setSelectedChild] = useState('Leo Jenkins');
    const [dateRange, setDateRange] = useState({
        from: '2026-02-02',
        to: '2026-03-05',
    });
    const [showReport, setShowReport] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const engagementData = studentEngagementData[selectedChild] || studentEngagementData['Leo Jenkins'];

    const getChildName = () => selectedChild;

    return (
        <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
            <Sidebar />
            <div className="admin-dashboard" style={{ flex: 1, overflowX: 'hidden' }}>
                <header className="dashboard-header">
                    <h1>📊 Admin Dashboard</h1>
                    <p>System Overview & Analytics</p>
                </header>

                <div className="charts-grid">
                    <div className="chart-card">
                        <h2>Daily Progress - {dateRange.from}</h2>
                        <DailyProgressChart />
                    </div>

                    <div className="chart-card">
                        <h2>Latest Activities</h2>
                        <div className="activities-list">
                            <div className="activity-item">
                                <span className="activity-time">09:00 AM</span>
                                <span className="activity-desc">Mathematics Quiz completed</span>
                                <span className="activity-count">5 Students</span>
                            </div>
                            <div className="activity-item">
                                <span className="activity-time">10:30 AM</span>
                                <span className="activity-desc">Finger painting activity</span>
                                <span className="activity-count">Excellent</span>
                            </div>
                            <div className="activity-item">
                                <span className="activity-time">02:00 PM</span>
                                <span className="activity-desc">Potty success milestone</span>
                                <span className="activity-count">1 Student</span>
                            </div>
                        </div>
                    </div>
                </div>

                {errorMessage && (
                    <div className="error-message" style={{ marginTop: 12 }}>{errorMessage}</div>
                )}
                <div className="date-filter">
                    <div className="filter-row">
                        <div className="filter-group">
                            <label>Child Name:</label>
                            <select
                                value={selectedChild}
                                onChange={(e) => { setSelectedChild(e.target.value); setErrorMessage(''); setShowReport(false); }}
                                className="child-select"
                            >
                                {allChildren.map((child) => (
                                    <option key={child} value={child}>
                                        {child}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>From:</label>
                            <input
                                type="date"
                                value={dateRange.from}
                                onChange={(e) => { setDateRange({ ...dateRange, from: e.target.value }); setErrorMessage(''); setShowReport(false); }}
                                className="date-input"
                            />
                        </div>

                        <div className="filter-group">
                            <label>To:</label>
                            <input
                                type="date"
                                value={dateRange.to}
                                onChange={(e) => { setDateRange({ ...dateRange, to: e.target.value }); setErrorMessage(''); setShowReport(false); }}
                                className="date-input"
                            />
                        </div>

                        <button onClick={() => {
                            const fromDate = new Date(dateRange.from);
                            const toDate = new Date(dateRange.to);
                            if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
                                setErrorMessage('Please provide valid From and To dates.');
                                setShowReport(false);
                                return;
                            }
                            if (toDate < fromDate) {
                                setErrorMessage('To date must be the same or after the From date.');
                                setShowReport(false);
                                return;
                            }
                            setErrorMessage('');
                            setShowReport(true);
                        }} className="view-report-btn">
                            View Report
                        </button>
                    </div>
                </div>

                {showReport && (
                    <div className="charts-grid">
                        {/* Activity Engagement Card */}
                        <ProgressChart engagementData={engagementData} childName={getChildName()} />

                        {/* Attendance Record Card */}
                        <div className="chart-card">
                            <h2>Attendance Record - {selectedChild}</h2>
                            <AttendanceRateChart />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminprogressPage;
