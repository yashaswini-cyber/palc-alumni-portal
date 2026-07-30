import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/images/palc-logo.svg";
import { COLORS } from "../shared/theme/colors";
import PrimaryButton from "../shared/components/PrimaryButton";
import { alumniAccounts } from "../../data/mockEmployeeData";
import {getAlumniAccounts,updateAlumniAccount,} from "../mockData/localStorage"; 
import emailjs from "@emailjs/browser";
import Toast from "../shared/components/Toast";
import {isEmailActivated,activateEmail} from "../mockData/localStorage";    
    

export default function ActivateAccountPage() {
  const navigate = useNavigate();

  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [enteredOTP, setEnteredOTP] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");
  const [showOTPSection, setShowOTPSection] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verifiedEmployee, setVerifiedEmployee] = useState<(typeof alumniAccounts)[0] | null>(null);

  const sendOTPEmail = async (email: string, otp: string) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { email, otp },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      return true;
    } catch (error) {
      console.error("Email Error:", error);
      return false;
    }
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setOtpError("");
    setOtpSuccess("");
    setOtpVerified(false);
    setEnteredOTP(["", "", "", "", "", ""]);
    setPassword("");
    setConfirmPassword("");

    if (employeeId.trim() === "" || email.trim() === "") {
      setError("Please enter your Employee ID and Email Address.");
      return;
    }

    const employee = getAlumniAccounts().find(
    (emp) =>
      emp.employeeId.toLowerCase() === employeeId.toLowerCase()
  );
    setVerifiedEmployee(employee || null);

    if (!employee) {
      setError("We couldn't verify your employment details. Please check your information or contact HR.");
      return;
    }

    if (isEmailActivated(email)) {
      setError("This account has already been activated.");
      return;
  }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(otp);
    const sent = await sendOTPEmail(email, otp);
    if (!sent) {
      setError("Unable to send verification email. Please try again.");
      return;
    }

    setShowOTPSection(true);
    setToastTitle("Identity Verified");
    setToastMessage(
    `${employee.name} has been successfully verified. A verification code has been sent to ${email}.`
  );
    setShowToast(true);
  };

  const verifyOTP = () => {
    setOtpError("");
    setOtpSuccess("");
    const otp = enteredOTP.join("");
    if (otp === "") {
      setOtpError("Please enter the verification code.");
      return;
    }
    if (otp !== generatedOTP) {
      setOtpVerified(false);
      setOtpSuccess("");
      setOtpError("Invalid verification code.");
      return;
    }
    setOtpVerified(true);
    setToastTitle("OTP Verified");
    setToastMessage("Identity verification completed successfully.");
    setShowToast(true);
    setTimeout(() => {
      setShowOTPSection(false);
      setShowPasswordSection(true);
    }, 1200);
  };

  const handleOTPChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const updatedOTP = [...enteredOTP];
    updatedOTP[index] = value;
    setEnteredOTP(updatedOTP);

    if (value && index < 5) {
      (document.getElementById(`otp-${index + 1}`) as HTMLInputElement)?.focus();
    }
  };

  const activateAccount = () => {
    setOtpError("");
    setError("");

    if (password.trim() === "" || confirmPassword.trim() === "") {
      setOtpError("Please enter and confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setOtpError("Passwords do not match.");
      return;
    }

    const strongPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!strongPassword.test(password)) {
      setOtpError("Password does not meet the required criteria.");
      return;
    }

    setToastTitle("Account Activated");
    setToastMessage(`${verifiedEmployee?.name}, your Alumni Portal account has been activated successfully.`);
    setShowToast(true);

    setTimeout(() => {
      if (verifiedEmployee) {
      updateAlumniAccount(
          verifiedEmployee.employeeId,
          password
      );
      activateEmail(email);
  }
      navigate("/login");
    }, 2000);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "32px", background: "linear-gradient(120deg,#0A1B3D 0%,#123A7A 45%,#2563EB 78%,#38BDF8 100%)" }}>
      <div style={{ width: "100%", maxWidth: "500px", background: "#fff", borderRadius: "24px", padding: "42px", boxShadow: "0 24px 60px rgba(15,23,42,.25)" }}>
        <form onSubmit={handleContinue} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img src={logo} alt="PalC" style={{ width: "90px", marginBottom: "22px" }} />
          <h1 style={{ margin: 0, fontSize: "30px", fontWeight: 800, color: COLORS.text }}>Activate Alumni Account</h1>
          <p style={{ margin: "14px 0 36px", color: COLORS.textSecondary, textAlign: "center", lineHeight: 1.7 }}>Verify your identity before activating your Alumni Portal account.</p>

          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px", marginBottom: "22px" }}>
            <label style={{ fontWeight: 600, color: COLORS.text }}>Employee ID</label>
            <input value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} placeholder="Enter your Employee ID" style={{ width: "100%", padding: "14px 16px", borderRadius: "12px", border: `1px solid ${COLORS.border}`, fontSize: "15px", boxSizing: "border-box", outline: "none" }} />
          </div>

          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
            <label style={{ fontWeight: 600, color: COLORS.text }}>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your registered email" style={{ width: "100%", padding: "14px 16px", borderRadius: "12px", border: `1px solid ${COLORS.border}`, fontSize: "15px", boxSizing: "border-box", outline: "none" }} />
          </div>

          {error && <div style={{ width: "100%", background: "#FEF2F2", border: "1px solid #FECACA", color: "#DC2626", padding: "12px", borderRadius: "10px", marginBottom: "20px", fontWeight: 600 }}>{error}</div>}
          
          <PrimaryButton type="submit" fullWidth style={{ height: "52px", borderRadius: "12px", marginBottom: "24px" }}>Continue</PrimaryButton>
        </form>

        {showOTPSection && (
          <div style={{ width: "100%", marginTop: "28px", borderTop: `1px solid ${COLORS.border}`, paddingTop: "24px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: COLORS.text }}>Enter Verification Code</label>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "18px" }}>
              {enteredOTP.map((digit, index) => (
                <input key={index} id={`otp-${index}`} value={digit} maxLength={1} inputMode="numeric" onChange={(e) => handleOTPChange(index, e.target.value)} style={{ width: "52px", height: "54px", textAlign: "center", fontSize: "22px", fontWeight: 700, borderRadius: "12px", border: `1px solid ${COLORS.border}`, outline: "none" }} />
              ))}
            </div>
            <PrimaryButton type="button" fullWidth onClick={verifyOTP} style={{ height: "50px", borderRadius: "12px" }}>Verify OTP</PrimaryButton>
          </div>
        )}

        {showPasswordSection && (
          <div style={{ width: "100%", marginTop: "28px", borderTop: `1px solid ${COLORS.border}`, paddingTop: "24px" }}>
            <h3 style={{ margin: "0 0 20px", color: COLORS.text }}>Create Password</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div>
                <label style={{ fontWeight: 600 }}>New Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" style={{ width: "100%", marginTop: "8px", padding: "14px", borderRadius: "12px", border: `1px solid ${COLORS.border}`, boxSizing: "border-box" }} />
              </div>

              <div>
                <label style={{ fontWeight: 600 }}>Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" style={{ width: "100%", marginTop: "8px", padding: "14px", borderRadius: "12px", border: `1px solid ${COLORS.border}`, boxSizing: "border-box" }} />
              </div>

              <div style={{ background: "#F8FAFC", border: `1px solid ${COLORS.border}`, borderRadius: "12px", padding: "14px", fontSize: "14px", lineHeight: "1.8", color: COLORS.textSecondary }}>
                Password must contain:<br />
                • Minimum 8 characters<br />
                • One uppercase letter<br />
                • One number<br />
                • One special character
              </div>

              <PrimaryButton type="button" fullWidth onClick={activateAccount} style={{ height: "50px", borderRadius: "12px" }}>Activate Account</PrimaryButton>
            </div>
          </div>
        )}

        {otpError && <div style={{ width: "100%", marginTop: "18px", background: "#FEF2F2", border: "1px solid #FECACA", color: "#DC2626", padding: "12px", borderRadius: "10px", fontWeight: 600 }}>{otpError}</div>}

        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <Link to="/login" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>← Back to Login</Link>
        </div>
      </div>

      <Toast show={showToast} type="success" title={toastTitle} message={toastMessage} onClose={() => setShowToast(false)} />
    </div>
  );
}