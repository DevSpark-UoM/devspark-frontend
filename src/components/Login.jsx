import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Welcome to Sprouty</h2>
                <p>Select your role to view the dashboard</p>

                <div className="role-buttons">
                    <button
                        className="role-btn admin-btn"
                        onClick={() => navigate('/admin/progress')}
                    >
                        <span role="img" aria-label="admin">👨‍💼</span>
                        Login as Admin
                    </button>

                    <button
                        className="role-btn parent-btn"
                        onClick={() => navigate('/parent/progress')}
                    >
                        <span role="img" aria-label="parent">👨‍👩‍👧</span>
                        Login as Parent
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
