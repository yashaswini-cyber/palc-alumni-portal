import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../auth/authService";
import Logo from "./Logo";

export default function AdminHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <header
      style={{
        background: "#FFFFFF",
        height: "76px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 32px",
        borderBottom: "1px solid #E2E8F0",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Left Side */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <Logo size={38} variant="light" />

        <div
          style={{
            width: "1px",
            height: "32px",
            background: "#E2E8F0",
          }}
        />

        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "20px",
              color: "#0F172A",
              fontWeight: 800,
              lineHeight: 1.2,
            }}
          >
            HR Admin Portal
          </h2>

          <p
            style={{
              margin: "3px 0 0",
              color: "#64748B",
              fontSize: "13px",
            }}
          >
            Manage alumni records and platform operations
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div
        style={{
          position: "relative",
        }}
      >
        <div
          onClick={() => setShowMenu(!showMenu)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
            background: "#F8FAFC",
            padding: "8px 14px 8px 8px",
            borderRadius: "999px",
            border: "1px solid #E2E8F0",
            transition: "border-color 160ms ease, box-shadow 160ms ease",
            boxShadow: showMenu ? "0 0 0 3px rgba(37,99,235,0.12)" : "none",
            borderColor: showMenu ? "#93C5FD" : "#E2E8F0",
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 800,
              fontSize: "14px",
              flex: "0 0 auto",
            }}
          >
            A
          </div>

          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: "14px",
                color: "#0F172A",
                lineHeight: 1.2,
              }}
            >
              Admin User
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "#64748B",
                lineHeight: 1.2,
                marginTop: "2px",
              }}
            >
              HR Administrator
            </div>
          </div>

          <span style={{ color: "#94A3B8", fontSize: "11px", marginLeft: "2px" }}>▼</span>
        </div>

        {showMenu && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "60px",
              width: "260px",
              background: "white",
              borderRadius: "16px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 18px 42px rgba(15,23,42,0.14)",
              overflow: "hidden",
              zIndex: 999,
            }}
          >
            <div
              style={{
                padding: "16px 18px",
                borderBottom: "1px solid #E2E8F0",
                fontWeight: 700,
                fontSize: "14px",
                color: "#0F172A",
                background: "#F8FAFC",
              }}
            >
              Admin User
              <div
                style={{
                  fontSize: "12px",
                  color: "#64748B",
                  fontWeight: 500,
                  marginTop: "4px",
                }}
              >
                HR Administrator
              </div>
            </div>

            <div
              onClick={() => {
                setShowMenu(false);
                AuthService.logout();
                navigate("/login", { replace: true });
              }}
              style={{padding: "14px 18px",cursor: "pointer",fontSize: "13px",fontWeight: 700,color: "#2563EB",transition: "background 140ms ease",}}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F8FAFC";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
              }}
            >
              Switch to Alumni Portal
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #E2E8F0", margin: 0 }} />

            <div
              onClick={() => {
                setShowMenu(false);
                AuthService.logout();
                navigate("/login", { replace: true });
              }}
              style={{
                padding: "14px 18px",
                cursor: "pointer",
                fontSize: "13px",
                color: "#EF4444",
                transition: "background 140ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#FEF2F2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
              }}
            >  Logout
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
