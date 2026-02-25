import "./StatCard.css";

export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="stat-card">
      <p className="stat-title">{title}</p>
      <h2>{value}</h2>
      <small>{subtitle}</small>
    </div>
  );
}