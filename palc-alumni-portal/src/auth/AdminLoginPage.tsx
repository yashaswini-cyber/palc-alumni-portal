import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/palc-logo.svg";
import { COLORS } from "../shared/theme/colors";
import PrimaryButton from "../shared/components/PrimaryButton";
import { AuthService } from "./authService";

export default function AdminLoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (AuthService.isAdminAuthenticated()) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();

  setError("");
  if (username.trim() === "" || password.trim() === "") {
    setError("Please enter your administrator credentials.");
    return;
  }
  
  setLoading(true);
  setTimeout(() => {
    if (AuthService.validateAdminCredentials(username, password)) {
      AuthService.loginAdmin(username);
      navigate("/admin");
    } else {
      setError("Invalid administrator username or password.");
    }
    setLoading(false);
  }, 800);
};

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px",
        background: "linear-gradient(120deg,#07152F 0%,#0F2C5F 45%,#164CA8 78%,#2563EB 100%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#FFFFFF",
          borderRadius: "24px",
          padding: "42px",
          boxShadow: "0 24px 60px rgba(15,23,42,.25)",
        }}
      >
        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <img
            src={logo}
            alt="PalC"
            style={{
              width: "90px",
              marginBottom: "22px",
            }}
          />

          <h1
            style={{
              margin: 0,
              fontSize: "30px",
              fontWeight: 800,
              color: COLORS.text,
            }}
          >
            HR Admin Portal
          </h1>

          <p
            style={{
              margin: "14px 0 36px",
              textAlign: "center",
              color: COLORS.textSecondary,
              lineHeight: 1.7,
            }}
          >
            Sign in using your HR administrator credentials to manage the PalC Alumni Portal.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "100%",
              marginBottom: "22px",
            }}
          >
            <label
              style={{
                fontWeight: 600,
                color: COLORS.text,
              }}
            >
              Administrator Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter administrator username"
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "12px",
                border: `1px solid ${COLORS.border}`,
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "100%",
              marginBottom: "24px",
            }}
          >
            <label
              style={{
                fontWeight: 600,
                color: COLORS.text,
              }}
            >
              Password
            </label>

            <div
              style={{
                position: "relative",
                width: "100%",
              }}
            >
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                style={{
                  width: "100%",
                  padding: "14px 50px 14px 16px",
                  borderRadius: "12px",
                  border: `1px solid ${COLORS.border}`,
                  fontSize: "15px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontWeight: 600,
                  color: COLORS.primary,
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <div
              style={{
                width: "100%",
                background: "#FEF2F2",
                border: "1px solid #FECACA",
                color: "#DC2626",
                padding: "12px 14px",
                borderRadius: "10px",
                marginBottom: "20px",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              {error}
            </div>
          )}

          <PrimaryButton
            type="submit"
            loading={loading}
            fullWidth
            style={{
              height: "52px",
              borderRadius: "12px",
              marginBottom: "28px",
            }}
          >
            Sign In
          </PrimaryButton>

          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: COLORS.primary,
              fontWeight: 700,
              fontSize: "14px",
            }}
          >
            ← Back to Alumni Login
          </Link>
        </form>
      </div>
    </div>
  );
}