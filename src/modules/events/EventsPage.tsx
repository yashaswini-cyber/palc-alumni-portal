import { useState } from "react";
import PageHeader from "../../shared/components/PageHeader";
import StatsCard from "../../shared/components/StatsCard";
import StatusBadge from "../../shared/components/StatusBadge";
import PrimaryButton from "../../shared/components/PrimaryButton";
import DetailsModal from "../../shared/components/DetailsModal";
import { COLORS } from "../../shared/theme/colors";

const events = [
  {
    id: "EV001",
    title: "Annual Alumni Meet 2026",
    date: "15 Aug 2026",
    location: "Bangalore",
    status: "Open",
    type: "Networking",
    description:
      "Reconnect with fellow alumni through keynote sessions, networking opportunities and cultural activities.",
  },
  {
    id: "EV002",
    title: "Tech Networking Session",
    date: "05 Sep 2026",
    location: "Virtual",
    status: "Open",
    type: "Technology",
    description:
      "Meet industry professionals and alumni working across AI, Cloud and Software Engineering.",
  },
  {
    id: "EV003",
    title: "Leadership Summit",
    date: "20 Oct 2026",
    location: "Mumbai",
    status: "Upcoming",
    type: "Leadership",
    description:
      "Interactive leadership sessions with senior executives and distinguished alumni speakers.",
  },
];

const secondaryButtonStyle = {
  minHeight: "48px",
  padding: "12px 22px",
  borderRadius: "12px",
  border: `1px solid ${COLORS.border}`,
  background: COLORS.surface,
  color: COLORS.primary,
  fontWeight: 700,
  fontSize: "14px",
  cursor: "pointer",
  transition: ".2s",
};

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All Events");
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const filteredEvents = events.filter((event) => {
  const matchesSearch =
    event.title.toLowerCase().includes(search.toLowerCase()) ||
    event.location.toLowerCase().includes(search.toLowerCase()) ||
    event.type.toLowerCase().includes(search.toLowerCase());

  let matchesFilter = true;

  switch (selectedFilter) {
    case "Open":
      matchesFilter = event.status === "Open";
      break;
    case "Upcoming":
      matchesFilter = event.status === "Upcoming";
      break;
    case "Virtual":
      matchesFilter = event.location === "Virtual";
      break;
    case "In Person":
      matchesFilter = event.location !== "Virtual";
      break;
    default:
      matchesFilter = true;
  }
  return matchesSearch && matchesFilter;
});
 const handleViewDetails = (event: (typeof events)[0]) => {
      setSelectedEvent(event);
      setDetailsOpen(true);
    };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <PageHeader
        title="Alumni Events"
        subtitle="Stay connected through networking, professional development and alumni engagement activities."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "18px",
        }}
      >
        <StatsCard
          title="Upcoming Events"
          value="3"
          subtitle="Available for registration"
        />

        <StatsCard
          title="Registered"
          value="2"
          subtitle="Events you've joined"
          accentColor={COLORS.success}
        />

        <StatsCard
          title="This Year"
          value="8"
          subtitle="Total alumni events"
        />

        <StatsCard
          title="Cities"
          value="3"
          subtitle="Bangalore • Mumbai • Virtual"
          accentColor={COLORS.secondary}
        />
      </div>

      <div
        style={{
          background: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: "18px",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
          boxShadow: "0 14px 34px rgba(15,23,42,.05)",
        }}
      >
        <input
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: "260px",
            padding: "14px 16px",
            borderRadius: "12px",
            border: `1px solid ${COLORS.border}`,
            outline: "none",
            fontSize: "14px",
          }}
        />

        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          style={{
            minWidth: "180px",
            padding: "14px",
            borderRadius: "12px",
            border: `1px solid ${COLORS.border}`,
            fontSize: "14px",
            background: "#fff",
          }}
        >
          <option>All Events</option>
          <option>Open</option>
          <option>Upcoming</option>
          <option>Virtual</option>
          <option>In Person</option>
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gap: "20px",
        }}
      >
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            style={{
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: "18px",
              padding: "24px",
              boxShadow: "0 14px 34px rgba(15,23,42,.06)",
              transition: ".2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow =
                "0 20px 40px rgba(15,23,42,.10)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 14px 34px rgba(15,23,42,.06)";
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "18px",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: "0 0 10px",
                    color: COLORS.text,
                    fontSize: "20px",
                    fontWeight: 700,
                  }}
                >
                  {event.title}
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: COLORS.textSecondary,
                    fontSize: "14px",
                    lineHeight: 1.7,
                  }}
                >
                  {event.description}
                </p>
              </div>

              <StatusBadge status={event.status} />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
                gap: "16px",
                marginTop: "22px",
              }}
            >
                         <div
                style={{
                  background: COLORS.background,
                  borderRadius: "14px",
                  padding: "16px",
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                <p
                  style={{
                    margin: "0 0 6px",
                    fontSize: "12px",
                    color: COLORS.textSecondary,
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  Date
                </p>

                <p
                  style={{
                    margin: 0,
                    color: COLORS.text,
                    fontWeight: 600,
                  }}
                >
                  {event.date}
                </p>
              </div>

              <div
                style={{
                  background: COLORS.background,
                  borderRadius: "14px",
                  padding: "16px",
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                <p
                  style={{
                    margin: "0 0 6px",
                    fontSize: "12px",
                    color: COLORS.textSecondary,
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  Location
                </p>

                <p
                  style={{
                    margin: 0,
                    color: COLORS.text,
                    fontWeight: 600,
                  }}
                >
                  {event.location}
                </p>
              </div>

              <div
                style={{
                  background: COLORS.background,
                  borderRadius: "14px",
                  padding: "16px",
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                <p
                  style={{
                    margin: "0 0 6px",
                    fontSize: "12px",
                    color: COLORS.textSecondary,
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  Category
                </p>

                <p
                  style={{
                    margin: 0,
                    color: COLORS.text,
                    fontWeight: 600,
                  }}
                >
                  {event.type}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
                marginTop: "26px",
                paddingTop: "22px",
                borderTop: `1px solid ${COLORS.border}`,
              }}
            >
              <span
                style={{
                  color: COLORS.textSecondary,
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Event ID: <strong style={{ color: COLORS.text }}>{event.id}</strong>
              </span>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  style={secondaryButtonStyle}
                  onClick={() => handleViewDetails(event)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = COLORS.primaryLight;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = COLORS.surface;
                  }}
                >
                  View Details
                </button>

                <PrimaryButton>
                  Register Now
                </PrimaryButton>
              </div>
            </div>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <div
            style={{
              background: COLORS.surface,
              border: `1px dashed ${COLORS.border}`,
              borderRadius: "18px",
              padding: "60px 20px",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                margin: "0 0 10px",
                color: COLORS.text,
              }}
            >
              No events found
            </h3>

            <p
              style={{
                margin: 0,
                color: COLORS.textSecondary,
              }}
            >
              Try searching with a different keyword.
            </p>
          </div>
        )}
      </div>
      <DetailsModal
  open={detailsOpen}
  title={selectedEvent?.title ?? ""}
  onClose={() => setDetailsOpen(false)}
>
  {selectedEvent && (
    <div
      style={{
        display: "grid",
        gap: "20px",
      }}
    >
      <div>
        <h3
          style={{
            margin: "0 0 8px",
            color: COLORS.text,
          }}
        >
          Description
        </h3>

        <p
          style={{
            margin: 0,
            color: COLORS.textSecondary,
            lineHeight: 1.7,
          }}
        >
          {selectedEvent.description}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: "16px",
        }}
      >
        <div
          style={{
            background: COLORS.background,
            padding: "16px",
            borderRadius: "12px",
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <strong>Date</strong>
          <p style={{ margin: "8px 0 0" }}>{selectedEvent.date}</p>
        </div>

        <div
          style={{
            background: COLORS.background,
            padding: "16px",
            borderRadius: "12px",
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <strong>Location</strong>
          <p style={{ margin: "8px 0 0" }}>{selectedEvent.location}</p>
        </div>

        <div
          style={{
            background: COLORS.background,
            padding: "16px",
            borderRadius: "12px",
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <strong>Category</strong>
          <p style={{ margin: "8px 0 0" }}>{selectedEvent.type}</p>
        </div>

        <div
          style={{
            background: COLORS.background,
            padding: "16px",
            borderRadius: "12px",
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <strong>Status</strong>
          <p style={{ margin: "8px 0 0" }}>{selectedEvent.status}</p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          marginTop: "10px",
        }}
      >
        <button
          style={secondaryButtonStyle}
          onClick={() => setDetailsOpen(false)}
        >
          Close
        </button>

        <PrimaryButton>
          Register Now
        </PrimaryButton>
      </div>
    </div>
  )}
</DetailsModal>
    </div>
  );
}   
