import PageHeader from "../../shared/components/PageHeader";
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
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <PageHeader
        title="Career Opportunities"
        subtitle="Explore current opportunities available for PalC Networks alumni, including referral and rehire pathways."
      />

      <div>
        {jobs.map((job) => (
          <div
            key={job.id}
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow =
                "0 24px 50px rgba(15,23,42,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 18px 42px rgba(15,23,42,0.07)";
            }}
          >
            <h2
              style={{
                margin: 0,
                color: COLORS.text,
                fontSize: "22px",
              }}
            >
              {job.title}
            </h2>

            <p
              style={{
                color: COLORS.primary,
                fontWeight: 600,
                marginTop: "10px",
                marginBottom: "12px",
                fontSize: "15px",
              }}
            >
              {job.department} • {job.location} • {job.employmentType}
            </p>

            <p
              style={{
                color: COLORS.textSecondary,
                lineHeight: 1.7,
                fontSize: "14px",
                marginBottom: "20px",
              }}
            >
              {job.summary}
            </p>

            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
                marginBottom: "20px",
              }}
            >
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

            <button
              onClick={() => window.open(job.applyUrl, "_blank")}
              style={{
                background: COLORS.primary,
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "12px 22px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              View & Apply →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}