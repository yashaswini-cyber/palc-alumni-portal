import React, { useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../../shared/components/Toast";
import HeroBanner from "../../shared/components/HeroBanner";
import StatsCard from "../../shared/components/StatsCard";
import PrimaryButton from "../../shared/components/PrimaryButton";
import InfoCard from "../../shared/components/InfoCard";
import SectionCard from "../../shared/components/SectionCard";
import StatusBadge from "../../shared/components/StatusBadge";
import { COLORS } from "../../shared/theme/colors";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type PageHeaderProps = {
  title: string;
  subtitle: string;
};

function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div style={{ marginBottom: "8px" }}>
      <h1 style={{ color: COLORS.text, margin: "0 0 8px 0", fontSize: "28px" }}>{title}</h1>
      <p style={{ color: COLORS.textSecondary, margin: 0, fontSize: "16px", lineHeight: 1.5 }}>{subtitle}</p>
    </div>
  );
}

const secondaryButtonStyle = {
  background: "#EFF6FF",
  color: COLORS.primary,
  boxShadow: "none",
  border: `1px solid ${COLORS.border}`,
  padding: "8px 16px",
  borderRadius: "8px",
  cursor: "pointer",
};

// Type-safe Ref-forwarding Input element for React-Datepicker
const CustomDateInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => (
    <input
      {...props}
      ref={ref}
      style={{
        width: "100%",
        padding: "12px 14px",
        borderRadius: "10px",
        border: `1px solid ${COLORS.border}`,
        backgroundColor: "#fff",
      }}
    />
  )
);
CustomDateInput.displayName = "CustomDateInput";

export default function VerificationPage() {
  const navigate = useNavigate();

  // 1. Core Component States
  const [requests, setRequests] = useState([
    {
      id: "VR001",
      company: "Microsoft",
      requester: "HR Team",
      date: "10 June 2026",
      type: "Employment Verification",
      stage: "HR Review",
      status: "Approved",
    },
    {
      id: "VR002",
      company: "Google",
      requester: "Background Verification Agency",
      date: "18 June 2026",
      type: "Background Verification",
      stage: "Processing",
      status: "Pending",
    },
    {
      id: "VR003",
      company: "Amazon",
      requester: "Recruitment Team",
      date: "20 June 2026",
      type: "Employment Verification",
      stage: "Completed",
      status: "Approved",
    },
  ]);

  const [showSuccess, setShowSuccess] = useState(false);
  const [requiredBy, setRequiredBy] = useState<Date | null>(null);

  const [formData, setFormData] = useState({
    verificationType: "Employment Verification",
    organisation: "",
    purpose: "New Employment",
    notes: "",
  });

  // 2. Event Handlers
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatDisplayDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleCreateRequest = () => {
    if (!formData.organisation || !requiredBy) {
      alert("Please complete all mandatory fields.");
      return;
    }

    const newRequest = {
      id: `VR${String(requests.length + 1).padStart(3, "0")}`,
      company: formData.organisation,
      requester: "Self",
      date: formatDisplayDate(requiredBy),
      type: formData.verificationType,
      stage: "Submitted",
      status: "Pending",
    };

    setRequests([newRequest, ...requests]);
    setShowSuccess(true);

    // Reset form fields cleanly
    setFormData({
      verificationType: "Employment Verification",
      organisation: "",
      purpose: "New Employment",
      notes: "",
    });
    setRequiredBy(null);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", padding: "20px" }}>
      <PageHeader
        title="Employment Verification Center"
        subtitle="Securely verify your employment with PalC through digital verification workflows, QR-enabled certificates and authorised third-party verification."
      />

      <Toast
        show={showSuccess}
        type="success"
        title="Verification Request Created"
        message="Your verification request has been submitted successfully. You can now track its progress under 'Manage Verification Requests'."
        onClose={() => setShowSuccess(false)}
      />

      <HeroBanner
        badge="Digital Verification Services"
        title="Employment Verification Center"
        subtitle="Submit employment verification requests, download QR-enabled employment certificates, securely share verification records with authorised organisations and track the complete verification lifecycle."
        actions={[
          { title: "New Verification Request", onClick: () => scrollToSection("request-verification") },
          { title: "View Requests", onClick: () => scrollToSection("verification-requests") },
          { title: "How Verification Works", onClick: () => scrollToSection("verification-process") },
        ]}
        pills={[
          { title: "Digital Verification", value: "Enabled", color: "#16A34A" },
          { title: "QR Certificates", value: "12 Available", color: "#2563EB" },
          { title: "Processing Time", value: "2 Days", color: "#D97706" },
        ]}
        summaryCard={
          <>
            <h3 style={{ marginTop: 0, marginBottom: "20px", fontSize: "20px", color: COLORS.text }}>
              Welcome Back! Verification Checklist available below
            </h3>
            {[
              ["Employment Records", "Available"],
              ["Digital Verification ", "Enabled"],
              ["QR Certificate", "Ready"],
              ["Secure Sharing", "Supported"],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom: `1px solid ${COLORS.border}`,
                }}
              >
                <span style={{ color: COLORS.textSecondary, fontSize: "14px" }}>{label}</span>
                <strong style={{ color: COLORS.text, fontSize: "14px" }}>{value}</strong>
              </div>
            ))}
          </>
        }
      />

      {/* Metrics Section */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
        <StatsCard title="Pending Requests" value="2" subtitle="Awaiting HR Review" accentColor="#2563EB" />
        <StatsCard title="Completed" value="18" subtitle="Successfully Verified" accentColor="#16A34A" />
        <StatsCard title="QR Certificates" value="12" subtitle="Ready to Download" accentColor="#D97706" />
        <StatsCard title="Average Processing" value="2 Days" subtitle="Current Turnaround" accentColor="#DC2626" />
      </div>

      {/* Creation Form */}
      <div id="request-verification">
        <SectionCard
          title="Start a New Verification"
          subtitle="Provide the details below to initiate a new employment verification request."
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: COLORS.text }}>
                Verification Type *
              </label>
              <select
                value={formData.verificationType}
                onChange={(e) => handleInputChange("verificationType", e.target.value)}
                style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, background: "#fff" }}
              >
                <option>Employment Verification</option>
                <option>Background Verification</option>
                <option>Higher Education</option>
                <option>Visa Processing</option>
                <option>Financial Verification</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: COLORS.text }}>
                Organisation / Institution *
              </label>
              <input
                type="text"
                placeholder="e.g. Microsoft, Stanford University"
                value={formData.organisation}
                onChange={(e) => handleInputChange("organisation", e.target.value)}
                style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: `1px solid ${COLORS.border}` }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: COLORS.text }}>
                Purpose *
              </label>
              <select
                value={formData.purpose}
                onChange={(e) => handleInputChange("purpose", e.target.value)}
                style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, background: "#fff" }}
              >
                <option>New Employment</option>
                <option>Higher Education</option>
                <option>Visa Processing</option>
                <option>Bank Loan</option>
                <option>Background Verification</option>
                <option>Other</option>
              </select>
            </div>
            <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: 600,
                color: COLORS.text,
              }}
            >
              Required By *
            </label>

            <div
              style={{
                width: "100%",
                marginTop: "8px",
              }}
            >
              <DatePicker
                selected={requiredBy}
                onChange={(date: Date | null) => setRequiredBy(date)}
                minDate={new Date()}
                dateFormat="d MMMM yyyy"
                placeholderText="Select required completion date"
                wrapperClassName="verification-datepicker"
              />
            </div>
          </div>
            
          </div>

          <div style={{ marginTop: "24px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: COLORS.text }}>
              Additional Notes (Optional)
            </label>
            <textarea
              rows={4}
              placeholder="Provide any additional information that may help process your request."
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              style={{ width: "100%", padding: "14px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, resize: "vertical" }}
            />
          </div>

          <div style={{ marginTop: "28px", background: "#F8FAFC", border: `1px solid ${COLORS.border}`, borderRadius: "14px", padding: "18px" }}>
            <h4 style={{ marginTop: 0, marginBottom: "10px", color: COLORS.text }}>Processing Information</h4>
            <ul style={{ margin: 0, paddingLeft: "18px", color: COLORS.textSecondary, lineHeight: 1.8 }}>
              <li>Typical processing time: <strong>2 business days</strong></li>
              <li>You will receive status updates in the portal.</li>
              <li>Approved requests generate a digitally verified certificate with a QR code validation.</li>
            </ul>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginTop: "28px" }}>
            <span style={{ color: "#DC2626", fontSize: "14px", fontWeight: 600 }}>Fields marked * are mandatory.</span>
            <PrimaryButton onClick={handleCreateRequest}>Create Verification Request</PrimaryButton>
          </div>
        </SectionCard>
      </div>

      {/* History List */}
      <div id="verification-requests">
        <SectionCard title="Manage Verification Requests">
          <div style={{ marginBottom: "20px" }}>
            <PrimaryButton>Export History</PrimaryButton>
          </div>

          <div style={{ overflowX: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
              <input
                placeholder="Search verification requests..."
                style={{ width: "320px", padding: "12px 16px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, outline: "none" }}
              />
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {["All", "Pending", "Approved", "Rejected"].map((status) => (
                  <button
                    key={status}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "999px",
                      border: `1px solid ${COLORS.border}`,
                      background: status === "All" ? COLORS.primary : "#fff",
                      color: status === "All" ? "#fff" : COLORS.text,
                      cursor: "pointer",
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead style={{ background: "#F8FAFC" }}>
                <tr>
                  <th style={{ padding: "12px" }}>Request ID</th>
                  <th style={{ padding: "12px" }}>Requested By</th>
                  <th style={{ padding: "12px" }}>Company</th>
                  <th style={{ padding: "12px" }}>Verification Type</th>
                  <th style={{ padding: "12px" }}>Submitted</th>
                  <th style={{ padding: "12px" }}>Current Stage</th>
                  <th style={{ padding: "12px" }}>Status</th>
                  <th style={{ padding: "12px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                    <td style={{ padding: "12px" }}>{req.id}</td>
                    <td style={{ padding: "12px" }}>{req.requester}</td>
                    <td style={{ padding: "12px" }}>{req.company}</td>
                    <td style={{ padding: "12px" }}>{req.type}</td>
                    <td style={{ padding: "12px" }}>{req.date}</td>
                    <td style={{ padding: "12px" }}>{req.stage}</td>
                    <td style={{ padding: "12px" }}><StatusBadge status={req.status} /></td>
                    <td style={{ padding: "12px" }}>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        <button style={secondaryButtonStyle}>View Details</button>
                        <button style={secondaryButtonStyle}>Track</button>
                        <PrimaryButton>Download</PrimaryButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      {/* Documents */}
      <SectionCard title="Digital Employment Certificates" subtitle="Access digitally signed documents.">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          <InfoCard title="Employment Certificate" subtitle="QR verification enabled." action={<PrimaryButton>Download PDF</PrimaryButton>} />
          <InfoCard title="Experience Letter" subtitle="Secure employment history." action={<PrimaryButton>Preview</PrimaryButton>} />
          <InfoCard title="Relieving Letter" subtitle="Official relieving documentation." action={<PrimaryButton>Download</PrimaryButton>} />
        </div>
      </SectionCard>

      {/* Third Party Support */}
      <SectionCard title="Third-Party Verification" subtitle="Allow trusted companies to check your context records.">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", alignItems: "center" }}>
          <div>
            <ul style={{ lineHeight: 2, color: COLORS.textSecondary, paddingLeft: "20px" }}>
              <li>Verification through secure Verification ID</li>
              <li>QR-enabled certificate validation</li>
              <li>Authorised HR verification workflow</li>
            </ul>
          </div>
          <div style={{ background: "#F8FAFC", borderRadius: "18px", padding: "20px", border: `1px solid ${COLORS.border}`, textAlign: "center" }}>
            <h3 style={{ marginTop: 0 }}>Verification ID</h3>
            <h2 style={{ color: COLORS.primary, letterSpacing: "2px", margin: "14px 0" }}>PALC-VER-2026-001</h2>
            <PrimaryButton>Copy Verification ID</PrimaryButton>
          </div>
        </div>
      </SectionCard>

      {/* Workflow Information */}
      <div id="verification-process">
        <SectionCard title="Verification Process" subtitle="Understand how requests clear validation lifecycle steps.">
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {[
              { title: "Request Submitted", description: "Your verification request has been successfully submitted." },
              { title: "HR Review", description: "The HR team validates your history archives." },
              { title: "Verification Generation", description: "A secure digital certificate is minted." },
              { title: "Employer Verification", description: "The platform provides seamless lookup via Secure Hash ID or QR scan." },
              { title: "Completed", description: "The verified record moves to structural history storage." },
            ].map((step, index) => (
              <div key={step.title} style={{ display: "flex", gap: "18px", alignItems: "flex-start" }}>
                <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: COLORS.primary, marginTop: "4px", flexShrink: 0 }} />
                <div style={{ flex: 1, paddingBottom: "18px", borderBottom: index !== 4 ? `1px solid ${COLORS.border}` : "none" }}>
                  <h4 style={{ margin: 0, color: COLORS.text }}>{step.title}</h4>
                  <p style={{ marginTop: "8px", color: COLORS.textSecondary, lineHeight: 1.7 }}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Help & Support */}
      <SectionCard title="Need Assistance?" subtitle="Our Alumni Support Team is available to assist with verification queries.">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <div style={{ maxWidth: "650px" }}>
            <h3 style={{ marginTop: 0, marginBottom: "10px", color: COLORS.text }}>Verification Support</h3>
            <p style={{ margin: 0, color: COLORS.textSecondary, lineHeight: 1.7 }}>
              If your request requires manual background review or supplemental paperwork overrides, ping our systems team directly.
            </p>
          </div>
          <PrimaryButton onClick={() => navigate("/helpdesk")}>Contact Helpdesk</PrimaryButton>
        </div>
      </SectionCard>
    </div>
  );
}