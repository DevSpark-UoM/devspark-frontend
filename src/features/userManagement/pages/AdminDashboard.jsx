import StatCard from "../../components/admin/StatCard";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  return (
    <div>
      <h1>Welcome Anu Agarwal!</h1>
      <p>Today is February 8</p>

      <div className="stats-grid">
        <StatCard title="Total Students" value="124" subtitle="+3 new this week" />
        <StatCard title="Staff on Duty" value="18" subtitle="2 on leave" />
        <StatCard title="Pending Inquiries" value="7" subtitle="Action required" />
        <StatCard title="Revenue (M)" value="Rs 1K" subtitle="Monthly" />
      </div>

      <div className="bottom-card">
        <h3>Daily Vibe</h3>
        <p>Everything is running smoothly!</p>
        <button>Chat with us</button>
      </div>
    </div>
  );
}