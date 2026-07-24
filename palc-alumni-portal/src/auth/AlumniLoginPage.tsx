import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/palc-logo.svg";
import { COLORS } from "../shared/theme/colors";
import PrimaryButton from "../shared/components/PrimaryButton";
import { AuthService } from "./authService";

export default function AlumniLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
        navigate("/dashboard");
    }}, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if(username.trim()==="" || password.trim()===""){
        setError("Please enter your username and password.");
        return;
    }
    setLoading(true);
    setTimeout(()=>{
        if (AuthService.validateCredentials(username, password)) {
          AuthService.login(username);
          navigate("/dashboard");
      }else{
            setError("Invalid username or password.");
        }
        setLoading(false);
    },800);
};

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px", background: "linear-gradient(120deg,#0A1B3D 0%,#123A7A 45%,#2563EB 78%,#38BDF8 100%)" }}>
      <div style={{ width: "100%", maxWidth: "460px", background: "#FFFFFF", borderRadius: "24px", padding: "42px", boxShadow: "0 24px 60px rgba(15,23,42,.25)" }}>
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <img src={logo} alt="PalC" style={{ width: "90px", marginBottom: "22px" }} />
          <h1 style={{ margin: 0, fontSize: "30px", fontWeight: 800, color: COLORS.text }}>Welcome Back</h1>
          <p style={{ margin: "14px 0 36px", textAlign: "center", color: COLORS.textSecondary, lineHeight: 1.7 }}>Sign in to access your PalC Alumni Portal.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "22px", width: "100%" }}>
            <label style={{ fontWeight: 600, color: COLORS.text }}>Username or Email</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              style={{ width: "100%", padding: "14px 16px", borderRadius: "12px", border: `1px solid ${COLORS.border}`, fontSize: "15px", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "14px", width: "100%" }}>
            <label style={{ fontWeight: 600, color: COLORS.text }}>Password</label>
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{ width: "100%", padding: "14px 50px 14px 16px", borderRadius: "12px", border: `1px solid ${COLORS.border}`, fontSize: "15px", outline: "none", boxSizing: "border-box" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", border: "none", background: "transparent", cursor: "pointer", fontWeight: 600, color: "#2563EB" }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", marginBottom: "28px" }}>
            <Link to="/forgot-password" style={{ fontSize: "14px", color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>Forgot Password?</Link>
          </div>
          {error && (
          <div style={{width:"100%",background:"#FEF2F2",border:"1px solid #FECACA",color:"#DC2626",padding:"12px 14px",borderRadius:"10px",marginBottom:"20px",fontSize:"14px",fontWeight:600}}>
              {error}
          </div>)}

          <PrimaryButton type="submit"disabled={loading} fullWidth style={{height:"52px",borderRadius:"12px",marginBottom:"24px"}}>{loading ? "Signing In..." : "Login"}</PrimaryButton>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "14px", color: COLORS.textSecondary }}>New Alumni?</span>
            <Link to="/register" style={{ fontWeight: 700, color: "#2563EB", textDecoration: "none" }}>Activate Alumni Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}