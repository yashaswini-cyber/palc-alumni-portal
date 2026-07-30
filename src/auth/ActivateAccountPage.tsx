import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/images/palc-logo.svg";
import { COLORS } from "../shared/theme/colors";
import PrimaryButton from "../shared/components/PrimaryButton";

const mockEmployees = [
  {
    employeeId: "PALC001",
    email: "pawar.rvu@gmail.com",
    name: "Yashaswini Pawar",
    activated: false,
  },
];

export default function ActivateAccountPage() {
  const navigate = useNavigate();

  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (employeeId.trim() === "" || email.trim() === "") {
      setError("Please enter your Employee ID and Email Address.");
      return;
    }

    const employee = mockEmployees.find(
      (emp) =>
        emp.employeeId.toLowerCase() === employeeId.toLowerCase() &&
        emp.email.toLowerCase() === email.toLowerCase()
    );

    if (!employee) {
      setError(
        "We couldn't verify your employment details. Please check your information or contact HR."
      );
      return;
    }

    if (employee.activated) {
      setError("This account has already been activated.");
      return;
    }

    setSuccess(
      `Identity verified for ${employee.name}. You can continue to email verification.`
    );

    // STEP 2:
    // OTP generation will happen here.
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px",
        background:
          "linear-gradient(120deg,#0A1B3D 0%,#123A7A 45%,#2563EB 78%,#38BDF8 100%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "#fff",
          borderRadius: "24px",
          padding: "42px",
          boxShadow: "0 24px 60px rgba(15,23,42,.25)",
        }}
      >
        <form
          onSubmit={handleContinue}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
            Activate Alumni Account
          </h1>

          <p
            style={{
              margin: "14px 0 36px",
              color: COLORS.textSecondary,
              textAlign: "center",
              lineHeight: 1.7,
            }}
          >
            Verify your identity before activating your Alumni Portal account.
          </p>

          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginBottom: "22px",
            }}
          >
            <label
              style={{
                fontWeight: 600,
                color: COLORS.text,
              }}
            >
              Employee ID
            </label>

            <input
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="Enter your Employee ID"
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "12px",
                border: `1px solid ${COLORS.border}`,
                fontSize: "15px",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginBottom: "24px",
            }}
          >
            <label
              style={{
                fontWeight: 600,
                color: COLORS.text,
              }}
            >
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "12px",
                border: `1px solid ${COLORS.border}`,
                fontSize: "15px",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          {error && (
            <div
              style={{
                width: "100%",
                background: "#FEF2F2",
                border: "1px solid #FECACA",
                color: "#DC2626",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "20px",
                fontWeight: 600,
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              style={{
                width: "100%",
                background: "#ECFDF5",
                border: "1px solid #BBF7D0",
                color: "#15803D",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "20px",
                fontWeight: 600,
              }}
            >
              {success}
            </div>
          )}

          <PrimaryButton
            type="submit"
            fullWidth
            style={{
              height: "52px",
              borderRadius: "12px",
              marginBottom: "24px",
            }}
          >
            Continue
          </PrimaryButton>

          <Link
            to="/login"
            style={{
              color: "#2563EB",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            ← Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
}