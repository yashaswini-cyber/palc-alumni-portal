import { useState } from "react";
import PageHeader from "../../shared/components/PageHeader";
import StatsCard from "../../shared/components/StatsCard";
import StatusBadge from "../../shared/components/StatusBadge";
import PrimaryButton from "../../shared/components/PrimaryButton";
import DetailsModal from "../../shared/components/DetailsModal";
import { COLORS } from "../../shared/theme/colors";

const initialNotifications = [
  { id: "N001", title: "Verification Request Approved", description: "Your employment verification request has been approved successfully.", date: "25 Jun 2026", status: "Approved", unread: true },
  { id: "N002", title: "Referral Submitted Successfully", description: "Your employee referral has been submitted successfully.", date: "24 Jun 2026", status: "Pending", unread: true },
  { id: "N003", title: "New Alumni Event Available", description: "Registration has opened for the Annual Alumni Meet 2026.", date: "23 Jun 2026", status: "Open", unread: false },
  { id: "N004", title: "Helpdesk Ticket Updated", description: "HR has responded to your latest helpdesk request.", date: "22 Jun 2026", status: "Pending", unread: false },
];

export default function NotificationsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [notificationList, setNotificationList] = useState(initialNotifications);
  const [selectedNotification, setSelectedNotification] = useState<(typeof initialNotifications)[0] | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const filtered = notificationList.filter((n) => {
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" ? true : filter === "Unread" ? n.unread : n.status === filter;
    return matchesSearch && matchesFilter;
  });

  const markAsRead = (id: string) => {
    setNotificationList((prev) => prev.map((item) => (item.id === id ? { ...item, unread: false } : item)));
  };

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  const openDetails = (notification: (typeof initialNotifications)[0]) => {
    setSelectedNotification(notification);
    setDetailsOpen(true);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <PageHeader title="Notifications" subtitle="Stay informed about employment verification, referrals, events and account activity." />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "18px" }}>
        <StatsCard title="Total Notifications" value={notificationList.length.toString()} subtitle="All time" accentColor="#2563EB" />
        <StatsCard title="Unread" value={notificationList.filter((n) => n.unread).length.toString()} subtitle="Requires attention" accentColor="#D97706" />
        <StatsCard title="Approved" value={notificationList.filter((n) => n.status === "Approved").length.toString()} subtitle="Verified" accentColor="#16A34A" />
        <StatsCard title="Pending Action" value={notificationList.filter((n) => n.status === "Pending").length.toString()} subtitle="In review" accentColor="#DC2626" />
      </div>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: "18px", padding: "18px" }}>
        <input placeholder="Search notifications..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ flex: 1, minWidth: "260px", padding: "13px 16px", borderRadius: "12px", border: `1px solid ${COLORS.border}`, outline: "none" }} />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ minWidth: "200px", padding: "13px", borderRadius: "12px", border: `1px solid ${COLORS.border}` }}>
          <option>All</option>
          <option>Unread</option>
          <option>Approved</option>
          <option>Pending</option>
          <option>Open</option>
        </select>
        <PrimaryButton onClick={markAllAsRead}>Mark All as Read</PrimaryButton>
      </div>

      <div style={{ display: "grid", gap: "18px" }}>
        {filtered.map((notification) => (
          <div key={notification.id} style={{ background: COLORS.surface, borderRadius: "18px", border: `1px solid ${COLORS.border}`, padding: "22px", boxShadow: "0 16px 36px rgba(15,23,42,.06)", transition: ".2s" }} onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")} onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "18px" }}>
              <div style={{ display: "flex", gap: "14px", flex: 1 }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", marginTop: "8px", background: notification.unread ? COLORS.primary : "#CBD5E1" }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, color: COLORS.text, fontSize: "17px" }}>{notification.title}</h3>
                  <p style={{ margin: "8px 0", color: COLORS.textSecondary, lineHeight: 1.6 }}>{notification.description}</p>
                  <span style={{ color: COLORS.textSecondary, fontSize: "13px" }}>{notification.date}</span>
                </div>
              </div>
              <StatusBadge status={notification.status} />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "20px", paddingTop: "18px", borderTop: `1px solid ${COLORS.border}` }}>
              <button onClick={() => markAsRead(notification.id)} disabled={!notification.unread} style={{ padding: "10px 18px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, background: notification.unread ? COLORS.surface : "#F8FAFC", color: COLORS.text, cursor: notification.unread ? "pointer" : "default", fontWeight: 600, fontSize: "14px", transition: ".2s" }}>
                {notification.unread ? "Mark as Read" : "Read"}
              </button>
              <PrimaryButton onClick={() => openDetails(notification)}>View Details</PrimaryButton>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ background: COLORS.surface, border: `1px dashed ${COLORS.border}`, borderRadius: "18px", padding: "60px", textAlign: "center" }}>
            <h3 style={{ margin: 0 }}>No notifications found</h3>
            <p style={{ color: COLORS.textSecondary, marginTop: "10px" }}>Try searching with another keyword.</p>
          </div>
        )}
      </div>

      <DetailsModal open={detailsOpen} title={selectedNotification?.title ?? ""} onClose={() => setDetailsOpen(false)}>
        {selectedNotification && (
          <div style={{ display: "grid", gap: "18px" }}>
            <div>
              <h3 style={{ margin: "0 0 8px", color: COLORS.text }}>Notification</h3>
              <p style={{ margin: 0, lineHeight: 1.8, color: COLORS.textSecondary }}>{selectedNotification.description}</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "16px" }}>
              <div style={{ padding: "16px", borderRadius: "12px", border: `1px solid ${COLORS.border}`, background: COLORS.background }}>
                <strong>Status</strong>
                <p style={{ marginTop: "8px" }}>{selectedNotification.status}</p>
              </div>
              <div style={{ padding: "16px", borderRadius: "12px", border: `1px solid ${COLORS.border}`, background: COLORS.background }}>
                <strong>Date</strong>
                <p style={{ marginTop: "8px" }}>{selectedNotification.date}</p>
              </div>
              <div style={{ padding: "16px", borderRadius: "12px", border: `1px solid ${COLORS.border}`, background: COLORS.background }}>
                <strong>Notification ID</strong>
                <p style={{ marginTop: "8px" }}>{selectedNotification.id}</p>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
              <PrimaryButton onClick={() => setDetailsOpen(false)}>Close</PrimaryButton>
            </div>
          </div>
        )}
      </DetailsModal>
    </div>
  );
}