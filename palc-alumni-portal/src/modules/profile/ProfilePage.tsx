import PageHeader from "../../shared/components/PageHeader";
import { COLORS } from "../../shared/theme/colors";

const cardStyle = {
  background: "white",
  padding: "28px",
  borderRadius: "18px",
  border: `1px solid ${COLORS.border}`,
  boxShadow: "0 18px 42px rgba(15, 23, 42, 0.07)",
};

const sectionTitleStyle = {
  margin: "0 0 16px",
  color: COLORS.text,
  fontSize: "18px",
  fontWeight: 800,
};

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0",
  borderBottom: `1px solid #EEF2F7`,
  fontSize: "14px",
};

const personalInfo = [
  ["Name", "John Doe"],
  ["Email", "john.doe@email.com"],
  ["Phone", "+91 9876543210"],
  ["Location", "Bangalore"],
];

const employmentInfo = [
  ["Employee ID", "EMP12345"],
  ["Department", "Engineering"],
  ["Last Designation", "Senior Software Engineer"],
  ["Date of Joining", "01-Jan-2020"],
  ["Date of Exit", "30-Apr-2026"],
];

export default function ProfilePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <PageHeader
        title="Profile Management"
        subtitle="View and manage your alumni profile information."
      />

      <div style={cardStyle}>
        <h3 style={sectionTitleStyle}>Personal Information</h3>

        {personalInfo.map(([label, value], i) => (
          <div
            key={label}
            style={{
              ...rowStyle,
              borderBottom: i === personalInfo.length - 1 ? "none" : rowStyle.borderBottom,
            }}
          >
            <span style={{ color: COLORS.textSecondary }}>{label}</span>
            <strong style={{ color: COLORS.text }}>{value}</strong>
          </div>
        ))}

        <div style={{ height: "1px", background: COLORS.border, margin: "24px 0" }} />

        <h3 style={sectionTitleStyle}>Employment Information</h3>

        {employmentInfo.map(([label, value], i) => (
          <div
            key={label}
            style={{
              ...rowStyle,
              borderBottom: i === employmentInfo.length - 1 ? "none" : rowStyle.borderBottom,
            }}
          >
            <span style={{ color: COLORS.textSecondary }}>{label}</span>
            <strong style={{ color: COLORS.text }}>{value}</strong>
          </div>
        ))}

        <div style={{ height: "1px", background: COLORS.border, margin: "24px 0" }} />

        <h3 style={sectionTitleStyle}>Preferences</h3>

        <div style={{ ...rowStyle, borderBottom: rowStyle.borderBottom }}>
          <span style={{ color: COLORS.textSecondary }}>Email Notifications</span>
          <strong style={{ color: COLORS.success }}>Enabled</strong>
        </div>

        <div style={{ ...rowStyle, borderBottom: "none" }}>
          <span style={{ color: COLORS.textSecondary }}>Event Notifications</span>
          <strong style={{ color: COLORS.success }}>Enabled</strong>
        </div>

        <div style={{ marginTop: "24px" }}>
          <button>Edit Profile</button>
        </div>
      </div>
    </div>
  );
}
