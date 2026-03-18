import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

import Logo from "../../assets/logo.jpeg";
import AvatarImg from "../../assets/teacher_avatar.jpg";

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    // close dropdown when click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const goProfile = () => {
        setOpen(false);
        navigate("/teacher/profile");
    };

    const signOut = () => {
        setOpen(false);
        navigate("/");
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <img src={Logo} alt="Sprouty" />
                <span>Sprouty</span>
            </div>

            <nav className="sidebar-menu">
                <NavLink to="/teacher/progress">Dashboard</NavLink>
                <NavLink to="/teacher/students">My Students</NavLink>
                <NavLink to="/teacher/attendance">Attendance</NavLink>
                <NavLink to="/teacher/lesson-plans">Lesson Plans</NavLink>
                <NavLink to="/teacher/activity-logs">Activity Logs</NavLink>
                <NavLink to="/teacher/messages">Messages</NavLink>
                <NavLink to="/teacher/events">Events</NavLink>
            </nav>

            {/* Footer user card */}
            <div className="sb-footer">
                <div className="sb-user-wrap" ref={menuRef}>
                    <button
                        type="button"
                        className="sb-usercard"
                        onClick={() => setOpen((v) => !v)}
                    >
                        <div className="sb-avatar">
                            <img src={AvatarImg} alt="Ms. Hernandez" />
                        </div>

                        <div className="sb-usertext">
                            <div className="sb-user-name">Ms. Hernandez</div>
                            <div className="sb-user-role">Lead Teacher</div>
                        </div>

                        <div className={`sb-caret ${open ? "up" : ""}`}>▾</div>
                    </button>

                    {open && (
                        <div className="sb-dropdown">
                            <button className="sb-dd-item" onClick={goProfile}>
                                Profile
                            </button>
                            <button className="sb-dd-item danger" onClick={signOut}>
                                Sign out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}