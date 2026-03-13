import { useMemo, useRef, useState } from "react";
import "./AdminProfile.css";
import AdminSettingsPanel from "../../pages/admin/AdminSettingsPanel";
import DefaultAvatar from "../../../../assets/admin-avatar.jpeg";

export default function AdminProfile() {
  const initial = useMemo(
    () => ({
      firstName: "Anu",
      lastName: "Agarwal",
      email: "anu21@gmail.com",
      phone: "+94 74 367 6521",
      role: "Administrator",
      employeeId: "ADM-001",
      bio: "",
    }),
    []
  );

  // load saved avatar if exists (optional)
  const savedAvatar =
    typeof window !== "undefined" ? localStorage.getItem("adminAvatar") : null;

  const [form, setForm] = useState(initial);
  const [avatar, setAvatar] = useState(savedAvatar || DefaultAvatar);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const fileRef = useRef(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onPickImage = () => fileRef.current?.click();

  const onAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (jpg/png).");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setAvatar(base64);
      localStorage.setItem("adminAvatar", base64);
    };
    reader.readAsDataURL(file);

    // allow selecting same file again
    e.target.value = "";
  };

  const onCancel = () => setForm(initial);

  const onSave = (e) => {
    e.preventDefault();
    // later: send form + avatar to backend
    alert("Saved (demo) ✅");
  };

  return (
    <div className="ap-wrap">
      <div className="ap-header">
        <div>
          <h1 className="ap-title">Profile Management</h1>
          <p className="ap-subtitle">
            Manage your personal information and account settings.
          </p>
        </div>

        {/* Settings button (top-right) */}
        <button
          className="ap-gear"
          type="button"
          aria-label="Settings"
          onClick={() => setSettingsOpen(true)}
        >
          ⚙
        </button>
      </div>

      <div className="ap-divider" />

      <div className="ap-card">
        {/* Top section */}
        <div className="ap-top">
          <div className="ap-avatar">
            <img className="ap-avatar-img" src={avatar} alt="Admin avatar" />
            <span className="ap-avatar-dot" />

            {/* Hidden file input */}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={onAvatarChange}
              style={{ display: "none" }}
            />
          </div>

          <div className="ap-top-meta">
            <div className="ap-name">
              {form.firstName} {form.lastName}
            </div>
            <div className="ap-role">{form.role}</div>

            <div className="ap-badges">
              <span className="ap-badge ap-badge-blue">Admin Access</span>
              <span className="ap-badge ap-badge-green">Verified</span>
            </div>

            <button
              type="button"
              className="ap-change-photo"
              onClick={onPickImage}
            >
              Change photo
            </button>
          </div>
        </div>

        <div className="ap-inner-divider" />

        <form onSubmit={onSave} className="ap-form">
          <div className="ap-grid">
            <Field
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={onChange}
            />
            <Field
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={onChange}
            />
            <Field
              label="Email Address"
              name="email"
              value={form.email}
              onChange={onChange}
              type="email"
            />
            <Field
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={onChange}
            />
            <Field
              label="Job Title / Role"
              name="role"
              value={form.role}
              onChange={onChange}
            />
            <Field
              label="Employee ID"
              name="employeeId"
              value={form.employeeId}
              onChange={onChange}
            />
          </div>

          <div className="ap-textarea">
            <label className="ap-label">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={onChange}
              rows={5}
            />
          </div>

          <div className="ap-actions">
            <button
              type="button"
              className="ap-btn ap-btn-ghost"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button type="submit" className="ap-btn ap-btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* ✅ Settings Drawer */}
      <AdminSettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text" }) {
  return (
    <div className="ap-field">
      <label className="ap-label">{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} />
    </div>
  );
}