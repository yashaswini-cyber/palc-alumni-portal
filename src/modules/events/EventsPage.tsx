import PageHeader from "../../shared/components/PageHeader";
import StatusBadge from "../../shared/components/StatusBadge";
import { COLORS } from "../../shared/theme/colors";

const events = [
  {
    id: "EV001",
    title: "Annual Alumni Meet 2026",
    date: "15 Aug 2026",
    location: "Bangalore",
    status: "Open",
  },
  {
    id: "EV002",
    title: "Tech Networking Session",
    date: "05 Sep 2026",
    location: "Virtual",
    status: "Open",
  },
  {
    id: "EV003",
    title: "Leadership Summit",
    date: "20 Oct 2026",
    location: "Mumbai",
    status: "Upcoming",
  },
];

const secondaryButtonStyle = {
  background: "#EFF6FF",
  color: COLORS.primary,
  boxShadow: "none",
  border: `1px solid ${COLORS.border}`,
};

export default function EventsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <PageHeader
        title="Alumni Events"
        subtitle="Stay connected through networking, learning, and alumni engagement events."
      />

      <div
        style={{
          display: "grid",
          gap: "20px",
        }}
      >
        {events.map((event) => (
          <div
            key={event.id}
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "18px",
              border: `1px solid ${COLORS.border}`,
              boxShadow: "0 18px 42px rgba(15, 23, 42, 0.07)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 22px 50px rgba(15,23,42,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 18px 42px rgba(15, 23, 42, 0.07)";
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "16px",
              }}
            >
              <h3 style={{ margin: 0, color: COLORS.text, fontSize: "18px" }}>{event.title}</h3>

              <StatusBadge status={event.status} />
            </div>

            <p style={{ marginTop: "14px", marginBottom: "6px", color: COLORS.textSecondary, fontSize: "14px" }}>
              <strong style={{ color: COLORS.text }}>Date:</strong> {event.date}
            </p>

            <p style={{ margin: 0, color: COLORS.textSecondary, fontSize: "14px" }}>
              <strong style={{ color: COLORS.text }}>Location:</strong> {event.location}
            </p>

            <div
              style={{
                marginTop: "20px",
              }}
            >
              <button style={secondaryButtonStyle}>View Details</button>

              <button>Register</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
