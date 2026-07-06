import DashboardCard from "../../shared/components/DashboardCard";
import PageHeader from "../../shared/components/PageHeader";
import QuickActionCard from "../../shared/components/QuickActionCard";
import { quickActions } from "../../mockData/dashboard";
import { overviewStats } from "../../mockData/dashboard";
import DashboardSection from "../../shared/components/DashboardSection";
import { COLORS } from "../../shared/theme/colors";
import { useNavigate } from "react-router-dom";
import jobs from "../../mockData/jobs";

const sectionTitleStyle = {
  margin: "0 0 18px",
  color: COLORS.text,
  fontSize: "24px",
  lineHeight: 1.2,
  fontWeight: 800,
};

const cardStyle = {
  background: COLORS.surface,
  border: `1px solid ${COLORS.border}`,
  borderRadius: "18px",
  padding: "24px",
  boxShadow: "0 18px 42px rgba(15, 23, 42, 0.07)",
};

const buttonStyle = {
  border: "none",
  borderRadius: "12px",
  background: COLORS.primary,
  color: "#FFFFFF",
  padding: "10px 16px",
  fontSize: "13px",
  fontWeight: 700,
  cursor: "pointer",
  fontFamily: "inherit",
  boxShadow: "0 10px 20px rgba(37, 99, 235, 0.20)",
};

const notifications = [
  "Verification request approved",
  "Annual Alumni Meet registrations open",
  "June newsletter published",
  "Referral status updated",
];

const activities = [
  "Downloaded Experience Certificate",
  "Employment Verification Approved",
  "Applied for Senior Software Engineer",
  "Registered for Alumni Meet",
  "Referral Submitted Successfully",
];

function Glyph({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-grid",
        placeItems: "center",
        width: "22px",
        height: "22px",
        fontSize: "11px",
        lineHeight: 1,
        fontWeight: 850,
      }}
    >
      {label}
    </span>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        paddingBottom: "44px",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      <PageHeader
        title="Welcome back, John"
        subtitle="Access your employment records, verification services, career opportunities, referrals and alumni engagement updates."
      />

      {/* Hero Header Section */}
      <section
        style={{
          minHeight: "280px",
          borderRadius: "24px",
          overflow: "hidden",
          background:
            "linear-gradient(120deg, #0A1B3D 0%, #123A7A 45%, #2563EB 78%, #38BDF8 100%)",
          color: "#FFFFFF",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.35fr) minmax(280px, 0.65fr)",
          alignItems: "stretch",
          boxShadow: "0 24px 60px rgba(15, 27, 61, 0.28)",
        }}
      >
        <div style={{ padding: "38px 42px" }}>
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              opacity: 0.82,
            }}
          >
            PalC Networks Alumni
          </p>

          <h2
            style={{
              margin: "14px 0 0",
              maxWidth: "720px",
              color: "#FFFFFF",
              fontSize: "42px",
              lineHeight: 1.08,
              fontWeight: 850,
            }}
          >
            Your connected alumni workspace
          </h2>

          <p
            style={{
              margin: "16px 0 0",
              maxWidth: "680px",
              color: "rgba(255,255,255,0.86)",
              fontSize: "15px",
              lineHeight: 1.7,
            }}
          >
            Stay connected with PalC through records, verification, referrals,
            career opportunities, benefits and alumni programs.
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              marginTop: "36px", // Balanced top margin to center buttons between the text above and lower container border
            }}
          >
            {[
              {
                title: "My Documents",
                route: "/documents",
              },
              {
                title: "Employment Verification",
                route: "/verification",
              },
              {
                title: "Raise Support Ticket",
                route: "/helpdesk",
              },
            ].map((item) => (
              <button
                key={item.title}
                onClick={() => navigate(item.route)}
                style={{
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.18)",
                  border: "1px solid rgba(255,255,255,0.28)",
                  padding: "13px 22px",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "white",
                  gap: "18px",
                  cursor: "pointer",
                  transition: "background 0.2s ease, border-color 0.2s ease, transform 0.15s ease",
                  outline: "none",
                  boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.3)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.18)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {item.title}
              </button>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "28px",
            }}
          >
            {[
              {
                title: "Secure Login",
                value: "Enabled",
                color: "#16A34A",
              },
              {
                title: "Portal Access",
                value: "24 Months",
                color: "#2563EB",
              },
              {
                title: "Profile",
                value: "90% Complete",
                color: "#D97706",
              },
              {
                title: "Support",
                value: "24×7 Available",
                color: "#9333EA",
              },
            ].map((pill) => (
              <div
                key={pill.title}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 18px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: pill.color,
                    boxShadow: `0 0 10px ${pill.color}`,
                  }}
                />

                <span
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.82)",
                    fontWeight: 600,
                  }}
                >
                  {pill.title}
                </span>

                <span
                  style={{
                    fontSize: "13px",
                    color: "#FFFFFF",
                    fontWeight: 700,
                  }}
                >
                  {pill.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Right Panel */}
        <div
          style={{
            padding: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "320px",
              borderRadius: "22px",
              background: "rgba(255,255,255,0.95)",
              color: COLORS.text,
              padding: "24px",
              boxShadow: "0 20px 45px rgba(15,23,42,0.18)",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: "20px",
                fontSize: "20px",
              }}
            >
              Account Summary
            </h3>

            {[
              ["Last Login", "25 Jun 2026"],
              ["Portal Access", "11 Months Remaining"],
              ["Documents", "12 Available"],
              ["Profile Completion", "90%"],
              ["Support", "24 × 7"],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom: `1px solid ${COLORS.border}`,
                }}
              >
                <span style={{ color: COLORS.textSecondary, fontSize: "14px" }}>
                  {label}
                </span>
                <strong style={{ color: COLORS.text, fontSize: "14px" }}>
                  {value}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
  style={{
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "24px",
  }}
>
  <div
    style={{
      background: "#FFFFFF",
      borderRadius: "18px",
      border: `1px solid ${COLORS.border}`,
      padding: "24px",
      boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
    }}
  >
    <h3
      style={{
        marginTop: 0,
        marginBottom: "18px",
      }}
    >
      Since Your Last Visit
    </h3>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        gap: "16px",
      }}
    >
      {[
        "2 New Employment Documents",
        "1 Verification Approved",
        "5 New Career Opportunities",
        "Annual Alumni Meet Registration Open",
      ].map((item) => (
        <div
          key={item}
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            background: "#F8FBFF",
            padding: "14px",
            borderRadius: "12px",
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "10px",
              background: COLORS.primaryLight,
              color: COLORS.primary,
              display: "grid",
              placeItems: "center",
              fontWeight: 700,
            }}
          >
            ✓
          </div>

          <span
            style={{
              fontSize: "14px",
              color: COLORS.text,
              fontWeight: 600,
            }}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  </div>

  <div
    style={{
      background: "#EFF6FF",
      borderRadius: "18px",
      border: "1px solid #BFDBFE",
      padding: "24px",
    }}
  >
    <h3
      style={{
        marginTop: 0,
        color: COLORS.primary,
      }}
    >
      Reminder
    </h3>

    <p
      style={{
        lineHeight: 1.8,
        color: COLORS.text,
        fontSize: "14px",
      }}
    >
      Keep your personal details updated to continue receiving employment
      verification updates, referral notifications, alumni events and career
      opportunities.
    </p>

    <button
  style={{
    ...buttonStyle,
    marginTop: "12px",
    width: "100%",
  }}
  onClick={() => navigate("/profile")}
>
  Update Profile
</button>
  </div>
</section>

  {/* Quick Actions */}
    <section>

  <h2 style={sectionTitleStyle}>
    Quick Actions
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(220px,1fr))",
      gap: "16px",
    }}
  >
    {quickActions.map((item) => (
      <QuickActionCard
        key={item.title}
        title={item.title}
        subtitle={item.description}
        onClick={() => navigate(item.route)}
      />
    ))}
  </div>

</section>

      {/* Overview */}
      <section>

  <h2 style={sectionTitleStyle}>
    Overview
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(280px,1fr))",
      gap: "20px",
    }}
  >
    {overviewStats.map((item) => (
      <DashboardCard
        key={item.id}
        title={item.title}
        value={item.value}
        status={item.status}
        description={item.description}
        buttonText={item.buttonText}
        color={item.color}
        onClick={() => navigate(item.route)}
      />
    ))}
  </div>

</section>

      {/* Employment Verification Section */}
      <DashboardSection
        title="Employment Verification"
        subtitle="Manage employment verification requests, download digitally verified certificates and track request progress."
        actionText="Open Verification Center"
        onActionClick={() => navigate("/verification")}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "18px" }}>
          {[
            { title: "Pending Requests", value: "2", color: "#2563EB", bg: "#F5F9FF" },
            { title: "Completed", value: "9", color: "#16A34A", bg: "#F4FCF6" },
            { title: "Digital Certificates", value: "5", color: "#D97706", bg: "#FFF9EC" },
            { title: "Avg. Processing", value: "2 Days", color: "#DC2626", bg: "#FFF5F5" },
          ].map((item) => (
            <div key={item.title} style={{ background: item.bg, border: `1px solid ${COLORS.border}`, borderRadius: "16px", padding: "22px" }}>
              <p style={{ margin: 0, color: COLORS.textSecondary, fontSize: "13px" }}>{item.title}</p>
              <h2 style={{ marginTop: "12px", marginBottom: 0, fontSize: "30px", color: item.color }}>{item.value}</h2>
            </div>
          ))}
        </div>
      </DashboardSection>

      {/* Career Opportunities Section */}
      <DashboardSection
        title="Career Opportunities"
        subtitle="Latest opportunities from the PalC Careers Portal."
        actionText="View All"
        onActionClick={() => navigate("/careers")}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {jobs.slice(0, 3).map((job) => (
            <div key={job.id} style={{ border: `1px solid ${COLORS.border}`, borderRadius: "16px", padding: "24px", background: "#FBFDFF" }}>
              <h3 style={{ margin: 0, color: COLORS.text, fontSize: "21px" }}>{job.title}</h3>
              <p style={{ color: COLORS.primary, marginTop: "8px", marginBottom: "22px", fontSize: "14px", fontWeight: 600 }}>
                {job.department} • {job.location} • {job.employmentType}
              </p>
              <p style={{ color: COLORS.textSecondary, fontSize: "13px", lineHeight: 1.6, marginBottom: "16px" }}>
                {job.summary.length > 140 ? job.summary.substring(0, 140) + "..." : job.summary}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <span style={{ background: "#E8F1FF", color: COLORS.primary, padding: "7px 14px", borderRadius: "18px", fontSize: "13px", fontWeight: 600 }}>
                    {job.experience}
                  </span>
                  <span style={{ background: "#EEF8F1", color: "#15803D", padding: "5px 10px", borderRadius: "18px", fontSize: "12px", fontWeight: 600 }}>
                    {job.workMode}
                  </span>
                </div>
                <button
                  style={{ ...buttonStyle, padding: "11px 22px", borderRadius: "10px", fontWeight: 600 }}
                  onClick={() => window.open(job.applyUrl, "_blank")}
                >
                  View & Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </DashboardSection>

      {/* Notifications Section */}
      <DashboardSection
        title="Notifications"
        actionText="View All →"
        onActionClick={() => navigate("/notifications")}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "16px" }}>
          {notifications.map((notification) => (
            <div
              key={notification}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "18px",
                background: "#FFFFFF",
                border: `1px solid ${COLORS.border}`,
                borderRadius: "14px",
                boxShadow: "0 2px 8px rgba(15,23,42,0.05)",
                transition: "0.2s ease",
                cursor: "pointer",
              }}
            >
              <Glyph label="NT" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "15px", fontWeight: 600, color: COLORS.text, marginBottom: "4px" }}>
                  {notification}
                </div>
                <div style={{ fontSize: "13px", color: COLORS.textSecondary }}>
                  Click to view more details
                </div>
              </div>
            </div>
          ))}
        </div>
      </DashboardSection>

      {/* Alumni Engagement Hub */}
      <section>
        <h2 style={sectionTitleStyle}>Alumni Engagement Hub</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
          {[
            { icon: <Glyph label="LD" />, title: "Leadership Message", text: "A note from PalC leadership on alumni programs, community support and professional growth.", action: "Read More" },
            { icon: <Glyph label="AN" />, title: "Announcements", text: "Annual Alumni Meet registrations, referral policy updates and new learning partners.", action: "View Updates" },
            { icon: <Glyph label="EV" />, title: "Upcoming Events", text: "Leadership Summit, networking sessions and annual alumni community events.", action: "Explore Events" },
            { icon: <Glyph label="SS" />, title: "Success Stories", text: "Stories from former PalC engineers leading AI, cloud and enterprise technology teams.", action: "Explore Stories" },
          ].map((item) => (
            <div key={item.title} style={cardStyle}>
              <div style={{ width: "46px", height: "46px", borderRadius: "15px", background: COLORS.primaryLight, color: COLORS.primary, display: "grid", placeItems: "center", marginBottom: "18px" }}>
                {item.icon}
              </div>
              <h3 style={{ margin: 0, color: COLORS.text, fontSize: "17px", fontWeight: 800 }}>{item.title}</h3>
              <p style={{ margin: "10px 0 18px", color: COLORS.textSecondary, lineHeight: 1.65, fontSize: "14px" }}>{item.text}</p>
              <button type="button" style={{ ...buttonStyle, background: "#EFF6FF", color: COLORS.primary, boxShadow: "none" }}>
                {item.action}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Block */}
      <section>
        <h2 style={sectionTitleStyle}>Stay Connected with PalC</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "18px" }}>
          {["Healthcare Benefits", "Learning & Certifications", "Corporate Discounts", "Insurance Partners", "Travel Benefits", "Wellness Programs"].map((benefit) => (
            <div key={benefit} style={{ ...cardStyle, padding: "20px", display: "flex", alignItems: "center", gap: "14px" }}>
              <span style={{ width: "42px", height: "42px", borderRadius: "14px", background: COLORS.primaryLight, color: COLORS.primary, display: "grid", placeItems: "center", flex: "0 0 auto" }}>
                <Glyph label="BN" />
              </span>
              <span style={{ color: COLORS.text, fontSize: "14px", fontWeight: 800 }}>{benefit}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Helpdesk Summary Section */}
      <DashboardSection
        title="Helpdesk Summary"
        subtitle="Current alumni support request performance."
        actionText="Raise Request"
        onActionClick={() =>
          alert("Backend Integration Pending\n\nDetailed job descriptions and applications will be available after backend integration.")
        }
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "20px", alignItems: "center" }}>
          {[["3", "Open Requests"], ["18", "Resolved"], ["96%", "SLA"]].map(([value, label]) => (
            <div key={label} style={{ borderRadius: "16px", background: "#F8FAFC", border: `1px solid ${COLORS.border}`, padding: "16px" }}>
              <h3 style={{ margin: 0, color: COLORS.text, fontSize: "26px", lineHeight: 1 }}>{value}</h3>
              <p style={{ margin: "6px 0 0", color: COLORS.textSecondary, fontSize: "13px" }}>{label}</p>
            </div>
          ))}
        </div>
      </DashboardSection>

      {/* Recent Activity Section */}
      <DashboardSection title="Recent Activity">
        <div style={{ display: "flex", flexDirection: "column" }}>
          {activities.map((item, index) => (
            <div key={item} style={{ display: "flex", gap: "14px", padding: "16px 0", borderBottom: index === activities.length - 1 ? "none" : `1px solid ${COLORS.border}` }}>
              <div style={{ width: "34px", height: "34px", borderRadius: "12px", background: "#EFF6FF", color: COLORS.primary, display: "grid", placeItems: "center", flex: "0 0 auto" }}>
                <Glyph label="OK" />
              </div>
              <div>
                <strong style={{ color: COLORS.text, fontSize: "14px" }}>{item}</strong>
                <p style={{ margin: "4px 0 0", fontSize: "13px", color: COLORS.textSecondary }}>{index + 1} day(s) ago</p>
              </div>
            </div>
          ))}
        </div>
      </DashboardSection>
    </div>
  );
}