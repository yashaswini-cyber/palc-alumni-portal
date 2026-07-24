import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: "DB" },
  { name: "Documents", path: "/dashboard/documents", icon: "DC" },
  { name: "Verification", path: "/dashboard/verification", icon: "VR" },
  { name: "Careers", path: "/dashboard/careers", icon: "CR" },
  { name: "Referrals", path: "/dashboard/referrals", icon: "RF" },
  { name: "Events", path: "/dashboard/events", icon: "EV" },
  { name: "Helpdesk", path: "/dashboard/helpdesk", icon: "HD" },
  { name: "Profile", path: "/dashboard/profile", icon: "PR" },
  { name: "Notifications", path: "/dashboard/notifications", icon: "NT" },
];

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "272px",
        background: "#FFFFFF",
        padding: "24px 18px",
        borderRight: "1px solid #E5EAF3",
        minHeight: "100vh",
        boxSizing: "border-box",
        position: "sticky",
        top: 0,
        alignSelf: "flex-start",
      }}
    >
      <div
        style={{
          padding: "0 10px 24px",
          borderBottom: "1px solid #EEF2F7",
          marginBottom: "22px",
        }}
      >
        <Logo size={40} variant="light" />
        <p
          style={{
            margin: "12px 0 0",
            fontSize: "11px",
            color: "#64748B",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Alumni Portal
        </p>
      </div>

      <nav
        aria-label="Primary navigation"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        {menuItems.map((item) => {
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#0F6CBD" : "#475569",
                background: isActive
                  ? "linear-gradient(135deg, #EFF6FF 0%, #E0F2FE 100%)"
                  : "transparent",
                border: isActive ? "1px solid #BFDBFE" : "1px solid transparent",
                borderRadius: "14px",
                padding: "12px 14px",
                fontSize: "14px",
                fontWeight: isActive ? 700 : 600,
                display: "flex",
                alignItems: "center",
                gap: "12px",
                transition: "background 160ms ease, color 160ms ease, border-color 160ms ease, transform 120ms ease",
                boxShadow: isActive ? "0 10px 24px rgba(37, 99, 235, 0.10)" : "none",
              })}
              onMouseEnter={(e) => {
                if (e.currentTarget.style.background === "transparent") {
                  e.currentTarget.style.background = "#F8FAFC";
                }
              }}
              onMouseLeave={(e) => {
                if (e.currentTarget.getAttribute("aria-current") !== "page") {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {({ isActive }) => (
                <>
                  <span
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "12px",
                      display: "grid",
                      placeItems: "center",
                      background: isActive
                        ? "linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)"
                        : "#F8FAFC",
                      color: isActive ? "#FFFFFF" : "#64748B",
                      transition: "background 160ms ease, color 160ms ease",
                      flex: "0 0 auto",
                    }}
                  >
                    <span style={{ fontSize: "11px", fontWeight: 850 }}>
                      {item.icon}
                    </span>
                  </span>
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
