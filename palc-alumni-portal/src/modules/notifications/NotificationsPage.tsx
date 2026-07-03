import PageHeader from "../../shared/components/PageHeader";
import StatusBadge from "../../shared/components/StatusBadge";
import { COLORS } from "../../shared/theme/colors";

const notifications = [
  {
    id: "N001",
    title: "Verification Request Approved",
    date: "25 Jun 2026",
    status: "Approved",
  },
  {
    id: "N002",
    title: "Referral Submitted Successfully",
    date: "24 Jun 2026",
    status: "Pending",
  },
  {
    id: "N003",
    title: "New Alumni Event Available",
    date: "23 Jun 2026",
    status: "Open",
  },
  {
    id: "N004",
    title: "Helpdesk Ticket Updated",
    date: "22 Jun 2026",
    status: "Pending",
  },
];

export default function NotificationsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <PageHeader
        title="Notifications"
        subtitle="Stay informed about updates and activities."
      />

      <div
        style={{
          display: "grid",
          gap: "16px",
        }}
      >
        {notifications.map((notification) => (
          <div
            key={notification.id}
            style={{
              background: "white",
              padding: "20px 24px",
              borderRadius: "18px",
              border: `1px solid ${COLORS.border}`,
              boxShadow: "0 18px 42px rgba(15, 23, 42, 0.07)",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 22px 50px rgba(15,23,42,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 18px 42px rgba(15, 23, 42, 0.07)";
            }}
          >
            <span
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "12px",
                background: "#EFF6FF",
                color: COLORS.primary,
                display: "grid",
                placeItems: "center",
                flex: "0 0 auto",
                fontSize: "11px",
                fontWeight: 850,
              }}
            >
              NT
            </span>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <h3 style={{ margin: 0, color: COLORS.text, fontSize: "15px" }}>{notification.title}</h3>

                <StatusBadge status={notification.status} />
              </div>

              <p style={{ margin: "6px 0 0", color: COLORS.textSecondary, fontSize: "13px" }}>
                {notification.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
