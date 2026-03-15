import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyChildren.css";
import { MdChildCare, MdArrowForwardIos } from "react-icons/md";
import BoyAvatar from "../../../../assets/boy.jpg";
import GirlAvatar from "../../../../assets/girl.jpeg";

// Mock children data - in a real app this would come from an API
const CHILDREN = [
  {
    id: 1,
    name: "Leo Jenkins",
    dob: "2020-03-14",
    gender: "Male",
    group: "Toddler Group A",
    teacher: "Ms. Amaya Silva",
    status: "Checked In",
    avatar: null, // will fall back to BoyAvatar
    allergies: "None",
    emergencyContact: "Michael Jenkins — +94 77 123 4567",
    notes: "Leo loves painting and outdoor play.",
    enrolledDate: "2022-01-10",
  },
  {
    id: 2,
    name: "Mia Jenkins",
    dob: "2022-07-22",
    gender: "Female",
    group: "Infant Group B",
    teacher: "Ms. Kasun Perera",
    status: "Checked Out",
    avatar: null,
    allergies: "Peanuts",
    emergencyContact: "Michael Jenkins — +94 77 123 4567",
    notes: "Mia enjoys music sessions and storytelling.",
    enrolledDate: "2023-08-01",
  },
];

function formatDOB(dob) {
  const d = new Date(dob);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function calcAge(dob) {
  const today = new Date();
  const birth = new Date(dob);
  let years = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) years--;
  if (years === 0) {
    const months = today.getMonth() - birth.getMonth() + (years < 0 ? 12 : 0);
    return `${Math.abs(months)} month${Math.abs(months) !== 1 ? "s" : ""} old`;
  }
  return `${years} year${years !== 1 ? "s" : ""} old`;
}

export default function MyChildren() {
  const navigate = useNavigate();

  return (
    <div className="mc-container">
      <div className="mc-header">
        <h1>My Children</h1>
        <p>View your children's profiles and enrollment details.</p>
      </div>

      <div className="mc-grid">
        {CHILDREN.map((child) => (
          <div
            key={child.id}
            className="mc-card"
            onClick={() => navigate(`/parent/children/${child.id}`)}
          >
            <div className="mc-avatar-wrap">
              <img
                src={child.gender === "Female" ? GirlAvatar : BoyAvatar}
                alt={child.name}
                className="mc-avatar"
              />
              <span className={`mc-status-dot ${child.status === "Checked In" ? "in" : "out"}`} />
            </div>

            <div className="mc-info">
              <h2 className="mc-name">{child.name}</h2>
              <p className="mc-dob">🎂 {formatDOB(child.dob)} · {calcAge(child.dob)}</p>
              <p className="mc-group">🏫 {child.group}</p>
              <span className={`mc-badge ${child.status === "Checked In" ? "in" : "out"}`}>
                {child.status}
              </span>
            </div>

            <MdArrowForwardIos className="mc-arrow" size={18} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Export children data for use on the child profile page
export { CHILDREN, formatDOB, calcAge };
