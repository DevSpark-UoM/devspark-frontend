import React, { useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import { adminChildrenData } from '../../mockData/progress';
import { ProgressBarChart, ProgressPieChart, DailyProgressStackedBarChart } from '../../components/shared/ProgressChart';
import './AdminprogressPage.css';

const AdminprogressPage = () => {
    const [selectedChildId, setSelectedChildId] = useState('');
    const [dateRange, setDateRange] = useState({
        from: '',
        to: '',
    });
    const [dailyDate, setDailyDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [showReport, setShowReport] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const daysPerPage = 7;

    const currentChild = selectedChildId ? adminChildrenData[selectedChildId] : null;

    const getAttendancePercentage = () => {
        if (!currentChild || currentChild.totalDays === 0) return 0;
        return ((currentChild.attendance / currentChild.totalDays) * 100).toFixed(1);
    };

    // Helper to extract days between range
    const getDatesInRange = (start, end) => {
        const dates = [];
        let curr = new Date(start);
        const stop = new Date(end);
        while (curr <= stop) {
            dates.push(new Date(curr).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' }));
            curr.setDate(curr.getDate() + 1);
        }
        return dates;
    };

    const allDatesInRange = (dateRange.from && dateRange.to && showReport) ? getDatesInRange(dateRange.from, dateRange.to) : [];

    // Pagination slicing
    const startIndex = currentPage * daysPerPage;
    const visibleLabels = allDatesInRange.slice(startIndex, startIndex + daysPerPage);

    // Mock engagement cyclic data mapping
    const visibleData = currentChild && visibleLabels.length > 0 ? visibleLabels.map((_, idx) => {
        // Guarantee every day has a bar between 8 and 19 for visual demonstration purposes
        const seedValue = currentChild.engagement[idx % currentChild.engagement.length] || 0;
        return seedValue > 0 ? seedValue : 8 + (idx % 12);
    }) : [];

    // Simulate dynamic data changing based on the selected date
    const selectedDateStr = new Date(dailyDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const daySeed = new Date(dailyDate).getDate() || 1;

    // Base numbers altered slightly by the day to simulate real data
    const excellentCount = 30 + (daySeed % 20); // 30-49
    const veryGoodCount = 20 + (daySeed % 15);  // 20-34
    const goodCount = 10 + (daySeed % 10);      // 10-19
    const weakCount = 2 + (daySeed % 7);        // 2-8

    const dailyProgressData = {
        labels: [selectedDateStr],
        datasets: [
            {
                label: 'Excellent',
                data: [excellentCount],
                backgroundColor: '#20c997',
                borderRadius: 4,
                barPercentage: 0.8,
                categoryPercentage: 0.8
            },
            {
                label: 'Very Good',
                data: [veryGoodCount],
                backgroundColor: '#3b82f6',
                borderRadius: 4,
                barPercentage: 0.8,
                categoryPercentage: 0.8
            },
            {
                label: 'Good',
                data: [goodCount],
                backgroundColor: '#f59e0b',
                borderRadius: 4,
                barPercentage: 0.8,
                categoryPercentage: 0.8
            },
            {
                label: 'Weak',
                data: [weakCount],
                backgroundColor: '#ef4444',
                borderRadius: 4,
                barPercentage: 0.8,
                categoryPercentage: 0.8
            },
        ]
    };

    // Engagement for simple bar matches date range slicing
    const engagementData = currentChild ? {
        labels: visibleLabels.length > 0 ? visibleLabels : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Hours Spent',
            data: visibleData.length > 0 ? visibleData : (currentChild.engagement || [12, 19, 15, 17, 14, 0, 0]),
            backgroundColor: '#3d8f8f', // Matched color with ParentPage
            borderRadius: 5,
            barPercentage: 0.6,
        }]
    } : { labels: [], datasets: [] };

    // Attendance Pie Chart matching screenshot
    const pieChartData = currentChild ? {
        labels: ['Present', 'Absent'],
        datasets: [{
            data: [currentChild.attendance, currentChild.totalDays - currentChild.attendance],
            backgroundColor: ['#3d8f8f', '#edf2f7'],
            borderWidth: 0
        }]
    } : { labels: [], datasets: [] };

    return (
        <div className="admin-layout">
            <Sidebar />
            <div className="admin-dashboard">
                <header className="dashboard-header">
                    <div className="header-title">
                        <span className="header-icon" role="img" aria-label="chart">📊</span>
                        <h1>Learning Progress</h1>
                    </div>
                    <p>Track Student Development &amp; Analytics</p>
                </header>

                <div className="top-dashboard-grid">
                    <div className="chart-card">
                        <div className="chart-header-flex">
                            <h2>Daily Progress</h2>
                            <input
                                type="date"
                                value={dailyDate}
                                onChange={(e) => setDailyDate(e.target.value)}
                                className="styled-input date-picker-icon"
                                style={{ padding: '6px 10px', minWidth: '135px', fontSize: '12px' }}
                            />
                        </div>
                        <div className="chart-box-fix admin-daily-chart">
                            <DailyProgressStackedBarChart data={dailyProgressData} />
                        </div>
                    </div>

                    <div className="chart-card daily-activity-card">
                        <div className="daily-activity-header">
                            <h2>Daily Activity List</h2>
                            <p>Activities for {new Date(dailyDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                        <div className="daily-activity-list">
                            <div className="daily-activity-item">
                                <div className="activity-title">Mathematics Quiz</div>
                                <div className="activity-details">
                                    <div className="activity-col">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> 09:00 AM
                                    </div>
                                    <div className="activity-col">
                                        <span>Teacher: Sarah</span>
                                        <span className="sub-text">Teacher</span>
                                    </div>
                                    <div className="activity-col">
                                        <span>5 Students</span>
                                        <span className="sub-text">Participated</span>
                                    </div>
                                </div>
                            </div>

                            <div className="daily-activity-item">
                                <div className="activity-title">Reading Comprehension</div>
                                <div className="activity-details">
                                    <div className="activity-col">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> 10:30 AM
                                    </div>
                                    <div className="activity-col">
                                        <span>Teacher: Mike</span>
                                        <span className="sub-text">Instructor</span>
                                    </div>
                                    <div className="activity-col">
                                        <span>5 Students</span>
                                        <span className="sub-text">Participated</span>
                                    </div>
                                </div>
                            </div>

                            <div className="daily-activity-item">
                                <div className="activity-title">Science Activity</div>
                                <div className="activity-details">
                                    <div className="activity-col">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> 02:00 PM
                                    </div>
                                    <div className="activity-col">
                                        <span>Teacher: Sarah</span>
                                        <span className="sub-text">Teacher</span>
                                    </div>
                                    <div className="activity-col">
                                        <span>5 Students</span>
                                        <span className="sub-text">Participated</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {errorMessage && (
                    <div className="error-message" style={{ marginTop: 12 }}>{errorMessage}</div>
                )}

                <div className="date-filter-container">
                    <div className="filter-row">
                        <div className="filter-group">
                            <label>Child Name:</label>
                            <select
                                value={selectedChildId}
                                onChange={(e) => { setSelectedChildId(e.target.value); setErrorMessage(''); setShowReport(false); }}
                                className="styled-select"
                            >
                                <option value="" disabled>Select a child</option>
                                {Object.keys(adminChildrenData).map((id) => (
                                    <option key={id} value={id}>
                                        {adminChildrenData[id].name}
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
                                className="styled-input date-picker-icon"
                            />
                        </div>

                        <div className="filter-group">
                            <label>To:</label>
                            <input
                                type="date"
                                value={dateRange.to}
                                onChange={(e) => { setDateRange({ ...dateRange, to: e.target.value }); setErrorMessage(''); setShowReport(false); }}
                                className="styled-input date-picker-icon"
                            />
                        </div>

                        <button onClick={() => {
                            if (!selectedChildId) {
                                setErrorMessage('Please select a child to view their specific report.');
                                setShowReport(false);
                                return;
                            }
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

                {showReport ? (
                    <div className="admin-charts-grid">
                        <div className="chart-card">
                            <div className="chart-header-flex">
                                <h2>Activity Engagement - {currentChild.name}</h2>
                                {allDatesInRange.length > daysPerPage && (
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
                                )}
                            </div>
                            <div className="chart-box-fix admin-engagement-chart">
                                <ProgressBarChart data={engagementData} />
                            </div>
                        </div>

                        <div className="chart-card">
                            <h2>Attendance Rate - {currentChild.name}</h2>
                            <div className="pie-container-fix admin-attendance-chart">
                                <ProgressPieChart data={pieChartData} />
                                <div className="pie-center-label">
                                    <span className="percent-num adaptive-title">{getAttendancePercentage()}%</span>
                                    <span className="sub-text adaptive-text">Present</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="admin-empty-state">
                        <div className="empty-icon">📊</div>
                        <h3>No Report Selected</h3>
                        <p>Please select a child's name and a valid date range from the filters above, then click <b>View Report</b> to generate their progress analytics.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminprogressPage;
