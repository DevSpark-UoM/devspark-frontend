import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherProgressPage.css';
import Sidebar from '../../components/teacher/Sidebar';

import { SCHEDULE_DATA, LOGS_DATA } from '../../mockData/progress';

const TeacherProgressPage = () => {
    const navigate = useNavigate();
    const [showFullSchedule, setShowFullSchedule] = useState(false);

    // Logs State
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [sortOption, setSortOption] = useState("Time (Newest)");
    const [activeFilter, setActiveFilter] = useState("All");
    const [showAllLogs, setShowAllLogs] = useState(false);

    const fullLogsSet = useMemo(() => {
        let filtered = [...LOGS_DATA];

        // Search
        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(log =>
                log.studentName.toLowerCase().includes(query) ||
                log.tag.toLowerCase().includes(query) ||
                log.actionText.toLowerCase().includes(query)
            );
        }

        // Filter
        if (activeFilter !== "All") {
            filtered = filtered.filter(log => log.tag === activeFilter.toUpperCase());
        }

        // Sort
        if (sortOption === "Name (A-Z)") {
            filtered.sort((a, b) => a.studentName.localeCompare(b.studentName));
        } else if (sortOption === "Time (Newest)") {
            filtered.sort((a, b) => b.timestamp - a.timestamp);
        } else if (sortOption === "Time (Oldest)") {
            filtered.sort((a, b) => a.timestamp - b.timestamp);
        }

        return filtered;
    }, [searchQuery, activeFilter, sortOption]);

    const displayedLogs = showAllLogs ? fullLogsSet : fullLogsSet.slice(0, 3);

    const toggleFilterMenu = () => {
        setShowFilterMenu(!showFilterMenu);
        if (showSearch) setShowSearch(false);
    };

    const toggleSearch = () => {
        setShowSearch(!showSearch);
        if (showFilterMenu) setShowFilterMenu(false);
    };

    const displayedSchedule = showFullSchedule ? SCHEDULE_DATA : SCHEDULE_DATA.slice(0, 3);

    return (
        <div className="teacher-dashboard">
            <Sidebar />

            {/* Main Content */}
            <main className="main-content">
                <header className="header">
                    <div className="greeting">
                        <h1>Welcome back, Ms. Hernandez!
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px', verticalAlign: 'text-bottom' }}>
                                <path d="M12.44 2.87a2.25 2.25 0 0 0-3.18 0L3.6 8.52a2.25 2.25 0 0 0 0 3.18l6.19 6.19c.88.88 2.3.88 3.18 0l8.11-8.11a2.25 2.25 0 0 0 0-3.18l-8.64-3.73z" fill="#FCD34D" />
                                <path d="M14.56 1.81a2.25 2.25 0 0 0-3.18 0l-1.06 1.06 3.18 3.18 1.06-1.06a2.25 2.25 0 0 0 0-3.18z" fill="#F59E0B" />
                                <path d="M6 14s1 2 3 2 3-2 3-2" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M22 17c-1.5 2-4 3-7 3s-5.5-1-7-3" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 4" />
                                <path d="M20 14c-1 1-2.5 1.5-4 1.5" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </h1>
                        <p>Your classroom "The Little Sprouts" is looking busy today.</p>
                    </div>
                    <div className="header-actions">
                        <button className="icon-btn" aria-label="notifications" onClick={() => navigate('/teacher/messages')}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C10.3431 2 9 3.34315 9 5C9 5.61748 9.18697 6.19128 9.50504 6.67499C8.03158 7.64333 7 9.30906 7 11.2353V15.2941C7 16.3268 6.68069 17.3338 6.0963 18.1724C5.59021 18.8986 6.12604 20 7.00508 20H16.9949C17.874 20 18.4098 18.8986 17.9037 18.1724C17.3193 17.3338 17 16.3268 17 15.2941V11.2353C17 9.30906 15.9684 7.64333 14.495 6.67499C14.813 6.19128 15 5.61748 15 5C15 3.34315 13.6569 2 12 2Z" fill="#F59E0B" />
                                <path d="M10 21H14C14 22.1046 13.1046 23 12 23C10.8954 23 10 22.1046 10 21Z" fill="#F59E0B" />
                            </svg>
                        </button>
                        <button className="primary-btn" onClick={() => navigate('/teacher/activity-logs')}>
                            Quick Log
                        </button>
                    </div>
                </header>

                <div className="dashboard-grid">
                    {/* Top Row Cards */}
                    <div className="top-row">
                        <div className="card class-status-card">
                            <div className="card-header">
                                <h3>Class Status</h3>
                                <span className="tag live">LIVE</span>
                            </div>
                            <div className="card-body status-body">
                                <div className="circular-progress">
                                    <div className="inner-circle">
                                        <span className="number">12</span>
                                        <span className="label">IN CLASS</span>
                                    </div>
                                </div>
                                <div className="status-details">
                                    <div className="detail-item checked-in">
                                        <span className="dot blue"></span> 12 Checked-in
                                    </div>
                                    <div className="detail-item expected">
                                        <span className="dot gray"></span> 3 Expected
                                    </div>
                                    <div className="attendance-rate">80% Attendance</div>
                                </div>
                            </div>
                        </div>

                        <div className="card safety-alerts-card">
                            <div className="card-header">
                                <h3>Safety Alerts</h3>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L2 21H22L12 2Z" fill="#FBBF24" stroke="#FBBF24" strokeWidth="2" strokeLinejoin="round" />
                                    <path d="M12 9V14" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
                                    <circle cx="12" cy="18" r="1" fill="#B45309" />
                                </svg>
                            </div>
                            <div className="card-body alerts-body">
                                <div className="alert-item allergy">
                                    <span className="dot orange"></span> Leo M. - Peanut Allergy (Severe)
                                </div>
                                <div className="alert-item medication">
                                    <span className="dot blue"></span> Medication due for Sophie at 12:00
                                </div>
                            </div>
                        </div>

                        <div className="card parent-comms-card">
                            <div className="card-header">
                                <h3>Parent Comms</h3>
                            </div>
                            <div className="card-body comms-body">
                                <div className="comm-item">
                                    <div className="avatar small" style={{ backgroundColor: 'transparent' }}>
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="16" cy="16" r="16" fill="#FDE68A" />
                                            <circle cx="16" cy="12" r="6" fill="#F59E0B" />
                                            <path d="M8 26C8 22.6863 10.6863 20 14 20H18C21.3137 20 24 22.6863 24 26C24 28.2091 22.2091 30 20 30H12C9.79086 30 8 28.2091 8 26Z" fill="#D97706" />
                                        </svg>
                                    </div>
                                    <div className="comm-content">
                                        <span className="sender">MRS. GELLAR</span>
                                        <span className="message">Will be 15 mins late for pick-up...</span>
                                    </div>
                                </div>
                                <div className="comm-item">
                                    <div className="avatar small" style={{ backgroundColor: 'transparent' }}>
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="16" cy="16" r="16" fill="#E2E8F0" />
                                            <circle cx="16" cy="12" r="6" fill="#94A3B8" />
                                            <path d="M8 26C8 22.6863 10.6863 20 14 20H18C21.3137 20 24 22.6863 24 26C24 28.2091 22.2091 30 20 30H12C9.79086 30 8 28.2091 8 26Z" fill="#64748B" />
                                        </svg>
                                    </div>
                                    <div className="comm-content">
                                        <span className="sender">MR. THOMPSON</span>
                                        <span className="message">Did Oliver sleep okay last night?</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="bottom-row">
                        <div className="card upcoming-activities-card">
                            <div className="card-header">
                                <h3>Upcoming Activities</h3>
                                <span
                                    className="link pointer"
                                    style={{ color: "var(--accent-blue)", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}
                                    onClick={() => setShowFullSchedule(!showFullSchedule)}
                                >
                                    {showFullSchedule ? "Show Less" : "Full Schedule"}
                                </span>
                            </div>
                            <div className={`card-body activities-body ${showFullSchedule ? 'activities-scrollable' : ''}`}>
                                {displayedSchedule.length > 0 && <div className="activities-connecting-line"></div>}
                                {displayedSchedule.map((item) => (
                                    <div className="activity-item" key={item.id}>
                                        <div className={`time-icon ${item.colorType}`} style={{ fontSize: '20px' }}>
                                            {item.icon}
                                        </div>
                                        <div className="activity-content">
                                            <span className={`time ${item.colorType}-text`} style={{ fontSize: '11px', fontWeight: '800' }}>
                                                {item.time}
                                            </span>
                                            <span className="title" style={{ fontSize: '15px', color: '#334155', marginTop: '2px', fontWeight: '700' }}>
                                                {item.title}
                                            </span>
                                            <span className="desc" style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
                                                {item.desc}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="card recent-logs-card">
                            <div className="card-header">
                                <h3>Recent Activity Logs</h3>
                                <div className="header-icons" style={{ position: 'relative' }}>
                                    <span role="img" aria-label="filter" onClick={toggleFilterMenu} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6H20M4 12H16M4 18H12" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span role="img" aria-label="search" onClick={toggleSearch} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="11" cy="11" r="8" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16.5 16.5L22 22" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>

                                    {showFilterMenu && (
                                        <div className="filter-dropdown">
                                            <h4>Sort By</h4>
                                            <ul>
                                                <li className={sortOption === "Time (Newest)" ? "active" : ""} onClick={() => { setSortOption("Time (Newest)"); setShowFilterMenu(false); }}>Time (Newest)</li>
                                                <li className={sortOption === "Time (Oldest)" ? "active" : ""} onClick={() => { setSortOption("Time (Oldest)"); setShowFilterMenu(false); }}>Time (Oldest)</li>
                                                <li className={sortOption === "Name (A-Z)" ? "active" : ""} onClick={() => { setSortOption("Name (A-Z)"); setShowFilterMenu(false); }}>Name (A-Z)</li>
                                            </ul>
                                            <h4>Filter By</h4>
                                            <ul>
                                                <li className={activeFilter === "All" ? "active" : ""} onClick={() => { setActiveFilter("All"); setShowFilterMenu(false); setShowAllLogs(true); }}>All</li>
                                                <li className={activeFilter === "Meals" ? "active" : ""} onClick={() => { setActiveFilter("Meals"); setShowFilterMenu(false); setShowAllLogs(true); }}>Meals</li>
                                                <li className={activeFilter === "Activity" ? "active" : ""} onClick={() => { setActiveFilter("Activity"); setShowFilterMenu(false); setShowAllLogs(true); }}>Activity</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {showSearch && (
                                <div className="search-bar-container">
                                    <input
                                        type="text"
                                        placeholder="Search by student, tag, or word..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="logs-search-input"
                                        autoFocus
                                    />
                                    <span className="clear-search" onClick={() => { setSearchQuery(""); setShowSearch(false); }}>✖</span>
                                </div>
                            )}

                            <div className={`card-body logs-body ${showAllLogs ? 'logs-body-scrollable' : ''}`}>
                                {showAllLogs && fullLogsSet.length > 0 && <div className="logs-connecting-line"></div>}
                                {!showAllLogs && displayedLogs.length > 0 && <div className="logs-connecting-line"></div>}
                                {displayedLogs.length === 0 ? (
                                    <div className="empty-state">
                                        <div className="empty-icon">📭</div>
                                        <p>No activity logs found.</p>
                                        <span className="reset-link" onClick={() => { setSearchQuery(""); setActiveFilter("All"); setSortOption("Time (Newest)"); }}>Reset Search & Filters</span>
                                    </div>
                                ) : (
                                    displayedLogs.map(log => (
                                        <div className="log-pill-item" key={log.id}>
                                            <div className="log-pill-left">
                                                <div className="teal-check">✓</div>
                                                <div className="log-pill-icon" style={{ color: log.iconColor }}>{log.icon}</div>
                                                <div className="log-pill-text-group">
                                                    <span className="log-pill-name">{log.studentName}</span>
                                                    <span className="log-pill-action">{log.actionText}</span>
                                                </div>
                                            </div>
                                            <span className="log-pill-time">{log.time}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="card-footer">
                                <span className="link view-all pointer" onClick={() => setShowAllLogs(!showAllLogs)}>
                                    {showAllLogs ? "View Less Logs ↑" : "View All Today's Logs →"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TeacherProgressPage;
