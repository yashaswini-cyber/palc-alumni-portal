import React, { useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../../shared/components/Toast";
import HeroBanner from "../../shared/components/HeroBanner";
import StatsCard from "../../shared/components/StatsCard";
import PrimaryButton from "../../shared/components/PrimaryButton";
import InfoCard from "../../shared/components/InfoCard";
import SectionCard from "../../shared/components/SectionCard";
import StatusBadge from "../../shared/components/StatusBadge";
import DetailsModal from "../../shared/components/DetailsModal";
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
function StageBadge({ stage }: { stage: string }) {

  const stageColors: Record<string, { bg: string; color: string }> = {
    Submitted: {
      bg: "#FEF3C7",
      color: "#92400E",
    },
    "HR Review": {
      bg: "#DBEAFE",
      color: "#1D4ED8",
    },
    Processing: {
      bg: "#E0F2FE",
      color: "#0369A1",
    },
    Completed: {
      bg: "#DCFCE7",
      color: "#166534",
    },
  };
  const style = stageColors[stage] || {
    bg: "#F3F4F6",
    color: "#374151",
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "6px 12px",
        borderRadius: "999px",
        background: style.bg,
        color: style.color,
        fontWeight: 600,
        fontSize: "13px",
      }}
    >
      {stage}
    </span>
  );
}
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

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [showSuccess, setShowSuccess] = useState(false);
  const [requiredBy, setRequiredBy] = useState<Date | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<
  (typeof requests)[number] | null >(null);

  const [formData, setFormData] = useState({
    verificationType: "Employment Verification",
    organisation: "",
    purpose: "New Employment",
    notes: "",
  });

  // 2. Filter and Sort Logic Derivation
  const filteredRequests = requests
    .filter((req) => {
      const matchesStatus = selectedStatus === "All" || req.status === selectedStatus;
      const matchesSearch =
        req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.type.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "Newest") return b.id.localeCompare(a.id);
      if (sortBy === "Oldest") return a.id.localeCompare(b.id);
      if (sortBy === "Company") return a.company.localeCompare(b.company);
      if (sortBy === "Verification Type") return a.type.localeCompare(b.type);
      return 0;
    });
    const visibleRequests = filteredRequests.slice(0, 5);

  // 3. Event Handlers
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
const handleViewDetails = (request: (typeof requests)[number]) => {
  setSelectedRequest(request);
  setShowDetailsModal(true);
};
const handleExportHistory = () => {
  const headers = [
    "Request ID",
    "Requested By",
    "Company",
    "Verification Type",
    "Required By",
    "Current Stage",
    "Status",
  ];
  const rows = requests.map((request) => [
    request.id,
    request.requester,
    request.company,
    request.type,
    request.date,
    request.stage,
    request.status,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "PalC_Verification_History.csv";
  link.click();
  URL.revokeObjectURL(url);
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
              <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: COLORS.text }}>
                Required By *
              </label>
              <div style={{ width: "100%", marginTop: "8px" }}>
                <DatePicker
                  selected={requiredBy}
                  onChange={(date: Date | null) => setRequiredBy(date)}
                  minDate={new Date()}
                  dateFormat="d MMMM yyyy"
                  placeholderText="Select required completion date"
                  customInput={<CustomDateInput />}
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

      {/* Manage Verification Requests */}
      <div id="verification-requests">
        <SectionCard
          title="Manage Verification Requests"
          subtitle={`Showing ${Math.min(
  visibleRequests.length,
  filteredRequests.length
)} of ${filteredRequests.length} verification requests`}
        >
          {/* Controls Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px", marginBottom: "24px" }}>
            {/* Left Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
              <input
                placeholder="Search by Request ID, Company or Verification Type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "340px",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: `1px solid ${COLORS.border}`,
                  outline: "none",
                }}
              />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: `1px solid ${COLORS.border}`,
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                <option>Newest</option>
                <option>Oldest</option>
                <option>Company</option>
                <option>Verification Type</option>
              </select>
            </div>

            {/* Right Controls */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button style={secondaryButtonStyle} onClick={() => { setSearchTerm(""); setSelectedStatus("All"); }}>
                View All Requests
              </button>
              <PrimaryButton onClick={handleExportHistory}>  Export History</PrimaryButton>
            </div>
          </div>

          {/* Status Filters */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "24px" }}>
            {["All", "Pending", "Approved", "Rejected", "Completed"].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "999px",
                  border: `1px solid ${COLORS.border}`,
                  background: selectedStatus === status ? COLORS.primary : "#FFFFFF",
                  color: selectedStatus === status ? "#FFFFFF" : COLORS.text,
                  cursor: "pointer",
                  fontWeight: 600,
                  transition: "0.2s ease",
                }}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Table Container */}
          <div style={{ overflowX: "auto" }}>
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
                {visibleRequests.map((req) => (
                  <tr key={req.id} style={{borderBottom: `1px solid ${COLORS.border}`,transition: "0.2s ease",}} onMouseEnter={(e) => {e.currentTarget.style.background = "#F8FBFF"; }}onMouseLeave={(e) => {e.currentTarget.style.background = "transparent";}}
>                   <td style={{ padding: "12px" }}>{req.id}</td>
                    <td style={{ padding: "12px" }}>{req.requester}</td>
                    <td style={{ padding: "12px" }}>{req.company}</td>
                    <td style={{ padding: "12px" }}>{req.type}</td>
                    <td style={{ padding: "12px" }}>{req.date}</td>
                    <td style={{ padding: "12px" }}>
                      <StageBadge stage={req.stage} />
                    </td>
                    <td style={{ padding: "12px" }}><StatusBadge status={req.status} /></td>
                    <td style={{ padding: "12px" }}>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        <button style={secondaryButtonStyle} onClick={() => handleViewDetails(req)}>View Details</button>
                        <button style={secondaryButtonStyle}>Track Progress</button>
                        {req.status === "Approved" ? (
                        <PrimaryButton>Download</PrimaryButton>) : (<button disabled style={{opacity: 0.5,cursor: "not-allowed",padding: "8px 14px",borderRadius: "8px",border: `1px solid ${COLORS.border}`,background: "#F8FAFC",color: COLORS.textSecondary,}}
                        >Awaiting Approval </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredRequests.length === 0 && (
                  <tr>
                    <td colSpan={8} style={{ padding: "24px", textAlign: "center", color: COLORS.textSecondary }}>
                      No matching verification requests found.
                    </td>
                  </tr>
                )}
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
     
        <DetailsModal
          open={showDetailsModal}
          title="Verification Request Details"
          onClose={() => setShowDetailsModal(false)}
        >
          {selectedRequest && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "22px",
              }}
            >
              <div>
                <p style={{ color: COLORS.textSecondary, marginBottom: "6px" }}>
                  Request ID
                </p>
                <strong>{selectedRequest.id}</strong>
              </div>

              <div>
                <p style={{ color: COLORS.textSecondary, marginBottom: "6px" }}>
                  Requested By
                </p>
                <strong>{selectedRequest.requester}</strong>
              </div>

              <div>
                <p style={{ color: COLORS.textSecondary, marginBottom: "6px" }}>
                  Organisation
                </p>
                <strong>{selectedRequest.company}</strong>
              </div>

              <div>
                <p style={{ color: COLORS.textSecondary, marginBottom: "6px" }}>
                  Verification Type
                </p>
                <strong>{selectedRequest.type}</strong>
              </div>

              <div>
                <p style={{ color: COLORS.textSecondary, marginBottom: "6px" }}>
                  Required By
                </p>
                <strong>{selectedRequest.date}</strong>
              </div>

              <div>
                <p style={{ color: COLORS.textSecondary, marginBottom: "6px" }}>
                  Current Stage
                </p>
                <StageBadge stage={selectedRequest.stage} />
              </div>

              <div>
                <p style={{ color: COLORS.textSecondary, marginBottom: "6px" }}>
                  Status
                </p>
                <StatusBadge status={selectedRequest.status} />
              </div>

              <div>
                <p style={{ color: COLORS.textSecondary, marginBottom: "6px" }}>
                  Verification Method
                </p>
                <strong>Digital Verification</strong>
              </div>

              <div
                style={{
                  gridColumn: "1 / -1",
                  marginTop: "10px",
                  padding: "18px",
                  borderRadius: "12px",
                  background: "#F8FAFC",
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                <h4
                  style={{
                    marginTop: 0,
                    marginBottom: "10px",
                    color: COLORS.text,
                  }}
                >
                  Request Summary
                </h4>
                <p
                  style={{
                    margin: 0,
                    lineHeight: 1.7,
                    color: COLORS.textSecondary,
                  }}
                >
                  This request has been created through the PalC Alumni Portal.
                  The verification will be processed by the HR Operations team.
                  Once approved, a digitally signed employment certificate with
                  QR verification will be generated and made available for download.
                </p>
              </div>
              <div
                style={{
                  gridColumn: "1 / -1",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                  marginTop: "12px",
                }}
              >
                <button style={secondaryButtonStyle}onClick={() => setShowDetailsModal(false)}>Close</button>        
                {selectedRequest.status === "Approved" && (
                  <PrimaryButton>
                    Download Certificate
                  </PrimaryButton>
                )}
              </div>
            </div>
          )}

        </DetailsModal>
    </div>
  );
}