import React, { useState, useEffect } from "react";
import "./AuditLogs.css";
import { MdHistory, MdFilterList, MdRefresh, MdDeleteOutline } from "react-icons/md";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Load logs from localStorage
    const savedLogs = JSON.parse(localStorage.getItem('auditLogs') || '[]');
    setLogs(savedLogs);
  }, []);

  const clearLogs = () => {
    if (window.confirm("Are you sure you want to clear all audit logs?")) {
      localStorage.setItem('auditLogs', '[]');
      setLogs([]);
    }
  };

  const refreshLogs = () => {
    const savedLogs = JSON.parse(localStorage.getItem('auditLogs') || '[]');
    setLogs(savedLogs);
  };

  return (
    <div className="al-container">
      <div className="al-header">
        <div className="al-header-left">
          <h1>Audit Logs</h1>
          <p>Track sensitive administrative actions and security-related changes.</p>
        </div>
        <div className="al-header-actions">
          <button className="al-refresh-btn" onClick={refreshLogs}>
            <MdRefresh size={20} /> Refresh
          </button>
          <button className="al-clear-btn" onClick={clearLogs}>
            <MdDeleteOutline size={20} /> Clear Logs
          </button>
        </div>
      </div>

      <div className="al-card">
        {logs.length === 0 ? (
          <div className="al-empty">
            <MdHistory size={48} />
            <p>No system actions recorded yet.</p>
          </div>
        ) : (
          <table className="al-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Administrator</th>
                <th>Action Performed</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index}>
                  <td className="al-time">{log.timestamp}</td>
                  <td>
                    <span className="al-user-tag">{log.user}</span>
                  </td>
                  <td className="al-action">{log.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
