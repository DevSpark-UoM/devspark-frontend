import "./StatCard.css";

export default function StatCard({ title, value, subtitle, colorClass }) {
  return (
    <div className="stat-card">
      <div className="stat-info">
        <p className="stat-title">{title}</p>
        <h2 className="stat-value">{value}</h2>
        <small className="stat-subtitle">{subtitle}</small>
      </div>
      <div className={`stat-decoration ${colorClass}`}></div>
    </div>
  );
}