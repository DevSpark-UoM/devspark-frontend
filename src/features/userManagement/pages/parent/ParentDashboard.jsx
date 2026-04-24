import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ParentDashboard.css';

export default function ParentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="pd-container">
      <header className="pd-header">
        <h1 className="pd-title">Welcome back, Sarah!</h1>
        <p className="pd-subtitle">Here's what's happening with your little ones today.</p>
      </header>

      <div className="pd-grid">
        {/* My Children Card */}
        <section
          className="pd-card pd-children-card"
          onClick={() => navigate('/parent/children')}
          style={{ cursor: 'pointer' }}
        >
          <h2 className="pd-card-title">My Children</h2>
          <div className="pd-child-pill">
            <div className="pd-child-info">
              <span className="pd-child-name">Leo Jenkins</span>
              <span className="pd-child-group">Toddler Group A</span>
            </div>
            <div className="pd-status-badge">Checked in</div>
          </div>
          <p className="pd-card-hint">Tap to view all children →</p>
        </section>

        {/* Upcoming Payments Card */}
        <section className="pd-card pd-payments-card">
          <h2 className="pd-card-title">Upcoming Payments</h2>
          <div className="pd-payment-info">
            <div className="pd-payment-label">October Tuition</div>
            <div className="pd-payment-amount">Rs 20,000.00</div>
            <button className="pd-pay-btn">Pay Now</button>
          </div>
        </section>
      </div>

      <section className="pd-quick-actions">
        <h2 className="pd-section-title">Quick Actions</h2>
        <div className="pd-actions-row">
          <button className="pd-action-btn">Message Teacher</button>
          <button className="pd-action-btn">Report Absence</button>
          <button className="pd-action-btn">Update Profile</button>
        </div>
      </section>
    </div>
  );
}
