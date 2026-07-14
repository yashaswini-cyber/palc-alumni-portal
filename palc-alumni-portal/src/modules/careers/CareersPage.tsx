import PrimaryButton from "../../shared/components/PrimaryButton";
import PageHeader from "../../shared/components/PageHeader";
import { useMemo, useRef } from "react";
import HeroBanner from "../../shared/components/HeroBanner";
import StatsCard from "../../shared/components/StatsCard";
import { COLORS } from "../../shared/theme/colors";
import jobs from "../../mockData/jobs";

const cardStyle = {
  background: COLORS.surface,
  border: `1px solid ${COLORS.border}`,
  borderRadius: "18px",
  padding: "24px",
  marginBottom: "20px",
  boxShadow: "0 18px 42px rgba(15, 23, 42, 0.07)",
  transition: "all 0.2s ease",
  cursor: "pointer",
};

export default function CareersPage() {
  const jobsSectionRef = useRef<HTMLDivElement>(null);

const careerStats = useMemo(() => {
  const departments = new Set(jobs.map((job) => job.department));
  const locations = new Set(jobs.map((job) => job.location));

  const flexibleRoles = jobs.filter(
    (job) =>
      job.workMode.toLowerCase() === "remote" ||
      job.workMode.toLowerCase() === "hybrid"
  ).length;

  return {
    openPositions: jobs.length,
    departments: departments.size,
    locations: locations.size,
    flexibleRoles,
  };
}, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <PageHeader
  title="Career Opportunities"
  subtitle="Explore current opportunities available for PalC Networks alumni and discover your next opportunity."
/>

<HeroBanner
  badge="PALC CAREERS"
  title="Reconnect. Rejoin. Grow with PalC."
  subtitle="Explore career opportunities across PalC Networks. Browse current openings, discover new teams, and continue your professional journey with an organization you already know."
  actions={[
    {
      title: "View Open Positions",
      onClick: () =>
        jobsSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
    },
    {
      title: "Rehire Opportunities",
      onClick: () => {},
    },
    {
      title: "Job Alerts",
      onClick: () => {},
    }
  ]}
  pills={[
    {
      title: "Open Roles",
      value: `${careerStats.openPositions}`,
      color: "#38BDF8",
    },
    {
      title: "Departments",
      value: `${careerStats.departments}`,
      color: "#22C55E",
    },
  ]}
  summaryCard={
    <>
      <h3
        style={{
          margin: 0,
          fontSize: "20px",
          color: COLORS.text,
        }}
      >
        Career Snapshot
      </h3>

      <p
        style={{
          marginTop: "10px",
          color: COLORS.textSecondary,
          lineHeight: 1.6,
        }}
      >
        Continue your journey with PalC by exploring current openings across
        multiple departments and work models.
      </p>

      <div
        style={{
          marginTop: "24px",
          display: "grid",
          gap: "14px",
        }}
      >
        <div>
          <strong>{careerStats.openPositions}</strong> Active Opportunities
        </div>

        <div>
          <strong>{careerStats.departments}</strong> Hiring Departments
        </div>

        <div>
          <strong>{careerStats.flexibleRoles}</strong> Remote / Hybrid Roles
        </div>
      </div>
    </>
  }
/>

{/*Statistics Grid*/}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
  }}
>
  <StatsCard
    title="Open Positions"
    value={careerStats.openPositions.toString()}
    subtitle="Current opportunities"
    accentColor="#2563EB"
  />

  <StatsCard
    title="Hiring Departments"
    value={careerStats.departments.toString()}
    subtitle="Across the organization"
    accentColor="#16A34A"
  />

  <StatsCard
    title="Locations"
    value={careerStats.locations.toString()}
    subtitle="Hiring locations"
    accentColor="#9333EA"
  />

  <StatsCard
    title="Remote / Hybrid"
    value={careerStats.flexibleRoles.toString()}
    subtitle="Flexible opportunities"
    accentColor="#D97706"
  />
</div>

<div>
  {jobs.map((job) => (
    <div
      key={job.id}
      style={{...cardStyle,padding: "28px",marginBottom: "24px",  border: `1px solid #BFD7FF`,boxShadow: "0 12px 28px rgba(37,99,235,0.08)",}}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 24px 52px rgba(15,23,42,0.10)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 18px 42px rgba(15,23,42,0.07)";
      }}
    >
      <p style={{ margin: "0 0 10px", color: COLORS.textSecondary, fontSize: "13px", fontWeight: 500 }}>
        Posted Recently
      </p>

      <h2 style={{ margin: "0 0 12px", color: COLORS.text, fontSize: "22px", lineHeight: 1.35 }}>
        {job.title}
      </h2>

      <p style={{ color: COLORS.primary, fontWeight: 600, margin: "0 0 18px", fontSize: "15px" }}>
        {job.department} • {job.location} • {job.employmentType}
      </p>

      <p style={{ color: COLORS.textSecondary, lineHeight: 1.7, fontSize: "14px", marginBottom: "24px", minHeight: "72px" }}>
        {job.summary}
      </p>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "26px" }}>
        <span
          style={{
            background: "#E8F1FF",
            color: COLORS.primary,
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          {job.experience}
        </span>

        <span
          style={{
            background: "#EEF8F1",
            color: "#15803D",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          {job.workMode}
        </span>

        <span
          style={{
            background: "#FFF7E6",
            color: "#B45309",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          {job.positions} Position(s)
        </span>
      </div>

      <PrimaryButton
        onClick={(e) => {
          e.stopPropagation();
          window.open(job.applyUrl, "_blank");
        }}
      >
        View & Apply
      </PrimaryButton>
    </div>
  ))}
</div>
      </div>
  );
}