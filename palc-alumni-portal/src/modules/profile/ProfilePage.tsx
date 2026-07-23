import HeroBanner from "../../shared/components/HeroBanner";
import StatsCard from "../../shared/components/StatsCard";
import SectionCard from "../../shared/components/SectionCard";
import PrimaryButton from "../../shared/components/PrimaryButton";
import { COLORS } from "../../shared/theme/colors";

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

const stats = [
  { title: "Years at PalC", value: "6", subtitle: "Service Duration" },
  { title: "Documents", value: "12", subtitle: "Available" },
  { title: "Referrals", value: "4", subtitle: "Submitted" },
  { title: "Helpdesk", value: "2", subtitle: "Open Tickets" },
];

export default function ProfilePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

      <HeroBanner
        badge="ALUMNI PROFILE"
        title="Welcome, John Doe"
        subtitle="Manage your personal details, employment information, communication preferences and account security."
        actions={[
          { title: "Edit Profile", onClick: () => {} },
          { title: "Download Profile", onClick: () => {} }
        ]}
        summaryCard={
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: COLORS.textSecondary }}>PROFILE STATUS</div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: COLORS.text }}>Active Alumni</div>
            <div style={{ fontSize: "14px", color: COLORS.textSecondary }}>Portal Access Valid</div>
          </div>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "22px" }}>
        {stats.map((card) => (
          <StatsCard
            key={card.title}
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
          />
        ))}
      </div>

      <SectionCard title="Profile Information">

        <h3 style={{ margin: "0 0 18px", fontSize: "18px", fontWeight: 700, color: COLORS.text }}>
          Personal Information
        </h3>

        {personalInfo.map(([label, value], index) => (
          <div
            key={label}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: index === personalInfo.length - 1 ? "none" : `1px solid ${COLORS.border}` }}
          >
            <span style={{ color: COLORS.textSecondary }}>{label}</span>
            <strong style={{ color: COLORS.text }}>{value}</strong>
          </div>
        ))}

        <div style={{ height: "1px", background: COLORS.border, margin: "30px 0" }} />

        <h3 style={{ margin: "0 0 18px", fontSize: "18px", fontWeight: 700, color: COLORS.text }}>
          Employment Information
        </h3>

        {employmentInfo.map(([label, value], index) => (
          <div
            key={label}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: index === employmentInfo.length - 1 ? "none" : `1px solid ${COLORS.border}` }}
          >
            <span style={{ color: COLORS.textSecondary }}>{label}</span>
            <strong style={{ color: COLORS.text }}>{value}</strong>
          </div>
        ))}

        <div style={{ height: "1px", background: COLORS.border, margin: "30px 0" }} />

        <h3 style={{ margin: "0 0 18px", fontSize: "18px", fontWeight: 700, color: COLORS.text }}>
          Communication Preferences
        </h3>

        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${COLORS.border}` }}>
          <span style={{ color: COLORS.textSecondary }}>Email Notifications</span>
          <strong style={{ color: COLORS.success }}>Enabled</strong>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0" }}>
          <span style={{ color: COLORS.textSecondary }}>Event Notifications</span>
          <strong style={{ color: COLORS.success }}>Enabled</strong>
        </div>

        <div style={{ marginTop: "28px", display: "flex", justifyContent: "flex-end" }}>
          <PrimaryButton>
            Edit Profile
          </PrimaryButton>
        </div>

      </SectionCard>

    </div>
  );
}