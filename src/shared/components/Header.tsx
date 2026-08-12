import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../auth/authService";

export default function Header() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };
  return (
    <header
      style={{
        height: "76px",
        borderBottom: "1px solid #E5EAF3",
        background: "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(18px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        position: "sticky",
        top: 0,
        zIndex: 10,
        boxSizing: "border-box",
      }}
    >
      <div>
        <p
          style={{
            margin: 0,
            color: "#64748B",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          Enterprise Alumni Services
        </p>

        <h3
          style={{
            margin: "3px 0 0",
            color: "#0F172A",
            fontSize: "20px",
            lineHeight: 1.2,
            fontWeight: 800,
          }}
        >
          Alumni Portal
        </h3>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
       >
        <label
          style={{
            width: "340px",
            height: "42px",
            borderRadius: "999px",
            border: "1px solid #D9E2EF",
            background: "#F8FAFC",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "0 16px",
            boxSizing: "border-box",
            transition: "border-color 160ms ease, box-shadow 160ms ease, background 160ms ease",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#93C5FD";
            e.currentTarget.style.background = "#FFFFFF";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.12)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#D9E2EF";
            e.currentTarget.style.background = "#F8FAFC";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <span style={{ color: "#64748B", fontSize: "12px", fontWeight: 850 }}>
            SR
          </span>
          <input
            type="search"
            placeholder="Search services, documents, requests"
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              width: "100%",
              color: "#0F172A",
              fontSize: "14px",
              fontFamily: "inherit",
            }}
          />
        </label>

       <button
  aria-label="Notifications"
  type="button"
  onClick={() => navigate("/dashboard/notifications")}
  style={{
    width: "42px",
    height: "42px",
    borderRadius: "14px",
    border: "1px solid #D9E2EF",
    background: "#FFFFFF",
    color: "#475569",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
    position: "relative",
    boxShadow: "none",
    transition: "background 160ms ease, border-color 160ms ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "#F8FAFC";
    e.currentTarget.style.borderColor = "#BFDBFE";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "#FFFFFF";
    e.currentTarget.style.borderColor = "#D9E2EF";
  }}
>
  <svg
    width="21"
    height="21"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M18 8C18 5.79 16.21 4 14 4H10C7.79 4 6 5.79 6 8V12.5C6 14.1 5.4 15.1 4.5 16.2L3.5 17.5C3.2 17.9 3.5 18.5 4 18.5H20C20.5 18.5 20.8 17.9 20.5 17.5L19.5 16.2C18.6 15.1 18 14.1 18 12.5V8Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 21C10.1 21.6 10.9 22 12 22C13.1 22 13.9 21.6 14.5 21"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>

  <span
    style={{
      width: "8px",
      height: "8px",
      borderRadius: "999px",
      background: "#2563EB",
      position: "absolute",
      top: "8px",
      right: "8px",
      boxShadow: "0 0 0 3px #FFFFFF",
    }}
  />
</button>

        <div
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          style={{
            height: "42px",
            borderRadius: "999px",
            border: "1px solid #D9E2EF",
            background: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "0 12px 0 8px",
            cursor: "pointer",
            position: "relative",
            transition: "border-color 160ms ease, box-shadow 160ms ease",
            boxShadow: showProfileMenu ? "0 0 0 3px rgba(37,99,235,0.12)" : "none",
            borderColor: showProfileMenu ? "#93C5FD" : "#D9E2EF",
          }}
        >
          <span
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "999px",
              background: "linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)",
              color: "#FFFFFF",
              display: "grid",
              placeItems: "center",
              fontSize: "12px",
              fontWeight: 850,
            }}
          >
            JA
          </span>
          <div>
            <p
              style={{
                margin: 0,
                color: "#0F172A",
                fontSize: "13px",
                lineHeight: 1.1,
                fontWeight: 700,
              }}
            >
              John Alumni
            </p>
            <p
              style={{
                margin: "2px 0 0",
                color: "#64748B",
                fontSize: "12px",
                lineHeight: 1.1,
              }}
            >
              Alumni Member
            </p>
          </div>
        </div>
        {showProfileMenu && (
  <div
    style={{
      position: "absolute",
      top: "54px",
      right: 0,
      width: "240px",
      background: "#FFFFFF",
      borderRadius: "16px",
      border: "1px solid #E2E8F0",
      boxShadow: "0 12px 28px rgba(15,23,42,0.12)",
      padding: "12px 0",
      zIndex: 999,
    }}
  >
    <div
  onClick={() => {
    setShowProfileMenu(false);
    navigate("/dashboard/profile");
  }}
  style={{
    padding: "10px 18px",
    fontWeight: 700,
    fontSize: "13px",
    color: "#0F172A",
    cursor: "pointer",
    transition: "background 140ms ease",
  }}
  onMouseEnter={(e) => { e.currentTarget.style.background = "#F8FAFC"; }}
  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
>
  My Profile
</div>

    <div
      onClick={() => {
      setShowProfileMenu(false);
      navigate("/dashboard/helpdesk");
    }}
      style={{
        padding: "10px 18px",
        fontSize: "13px",
        color: "#475569",
        cursor: "pointer",
        transition: "background 140ms ease",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "#F8FAFC"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
    >
      Help
    </div>
    
    <div
    onClick={handleLogout}
    style={{
      padding: "10px 18px",
      color: "#EF4444",
      fontSize: "13px",
      fontWeight: 600,
      cursor: "pointer",
      transition: "background 140ms ease",
    }}
    onMouseEnter={(e) => { e.currentTarget.style.background = "#FEF2F2"; }}
    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
  >
    Logout
  </div>
    
  </div>
)}
      </div>
    </header>
  );
}
