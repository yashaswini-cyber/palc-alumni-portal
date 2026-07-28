import React, { useState, useEffect, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../../../shared/components/Toast";
import HeroBanner from "../../../shared/components/HeroBanner";
import StatsCard from "../../../shared/components/StatsCard";
import PrimaryButton from "../../../shared/components/PrimaryButton";
import SectionCard from "../../../shared/components/SectionCard";
import StatusBadge from "../../../shared/components/StatusBadge";
import DetailsModal from "../../../shared/components/DetailsModal";
import { COLORS } from "../../../shared/theme/colors";
import { getVerificationRequests, saveVerificationRequests, } from "../../../mockData/localStorage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type PageHeaderProps = { title: string; subtitle: string };

function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div style={{ marginBottom: "8px" }}>
      <h1 style={{ color: COLORS.text, margin: "0 0 8px 0", fontSize: "28px" }}>{title}</h1>
      <p style={{ color: COLORS.textSecondary, margin: 0, fontSize: "16px", lineHeight: 1.5 }}>{subtitle}</p>
    </div>
  );
}

const secondaryButtonStyle = { background: "#EFF6FF", color: COLORS.primary, boxShadow: "none", border: `1px solid ${COLORS.border}`, padding: "8px 16px", borderRadius: "8px", cursor: "pointer" };

const CustomDateInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
  <input {...props} ref={ref} style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, backgroundColor: "#fff" }} />
));
CustomDateInput.displayName = "CustomDateInput";

function StageBadge({ stage }: { stage: string }) {
  const stageColors: Record<string, { bg: string; color: string }> = {
    Submitted: { bg: "#FEF3C7", color: "#92400E" },
    "HR Review": { bg: "#DBEAFE", color: "#1D4ED8" },
    Processing: { bg: "#E0F2FE", color: "#0369A1" },
    Completed: { bg: "#DCFCE7", color: "#166534" },
  };
  const style = stageColors[stage] || { bg: "#F3F4F6", color: "#374151" };
  return <span style={{ display: "inline-flex", alignItems: "center", padding: "6px 12px", borderRadius: "999px", background: style.bg, color: style.color, fontWeight: 600, fontSize: "13px" }}>{stage}</span>;
}

export default function VerificationPage() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(getVerificationRequests());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<(typeof requests)[number] | null>(null);
  const [showDocumentPreview, setShowDocumentPreview] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<{ title: string; category: string; status: string; issued: string; documentId: string; description: string } | null>(null);

  useEffect(() => { setRequests(getVerificationRequests()); }, []);

  const filteredRequests = requests
    .filter((req) => {
      const matchesStatus = selectedStatus === "All" || req.status === selectedStatus;
      const matchesSearch = req.id.toLowerCase().includes(searchTerm.toLowerCase()) || req.company.toLowerCase().includes(searchTerm.toLowerCase()) || req.type.toLowerCase().includes(searchTerm.toLowerCase());
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
  const pendingRequests = requests.filter((req) => req.status === "Pending");
  const approvedRequests = requests.filter((req) => req.status === "Approved");
  const rejectedRequests = requests.filter((req) => req.status === "Rejected");
  const completedRequests = requests.filter((req) => req.stage === "Completed");  
  const handleViewDetails = (request: (typeof requests)[number]) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const handlePreviewDocument = (doc: { title: string; category: string; status: string; issued: string; documentId: string; description: string }) => {
    setSelectedDocument(doc);
    setShowDocumentPreview(true);
  };

  const handleExportHistory = () => {
    const headers = ["Request ID", "Requested By", "Company", "Verification Type", "Required By", "Current Stage", "Status"];
    const rows = requests.map((req) => [req.id, req.requester, req.company, req.type, req.date, req.stage, req.status]);
    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "PalC_Verification_History.csv";
    link.click();
    URL.revokeObjectURL(url);
  };
  const refreshRequests = () => {
    setRequests(getVerificationRequests());
  };
const updateRequestStatus = (
  requestId: string,
  status: "Approved" | "Rejected"
) => {
  const updatedRequests = requests.map((request) => {
    if (request.id !== requestId) {
      return request;
    }
    return {
      ...request,
      status,
      stage: "Completed",
    };
  });
  saveVerificationRequests(updatedRequests);
   setRequests(updatedRequests);
   if (selectedRequest?.id === requestId) {

  const updatedRequest = updatedRequests.find(
    (request) => request.id === requestId
  );
  if (updatedRequest) {
    setSelectedRequest(updatedRequest);
  }
}
};
const handleApprove = (requestId: string) => {
  updateRequestStatus(
    requestId,
    "Approved"
  );
  setShowDetailsModal(false);
};

const handleReject = (requestId: string) => {
  updateRequestStatus(
    requestId,
    "Rejected"
  );
  setShowDetailsModal(false);
};
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", padding: "20px" }}>
      <PageHeader title="Employment Verification Management" subtitle="Manage employment verification requests submitted by alumni, review employment records, approve or reject requests, and maintain secure verification workflows." />

      <HeroBanner
        badge="HR Verification Management"
        title="Employment Verification Requests"
        subtitle="Review employment verification requests submitted by alumni, validate employment records, approve or reject requests, and monitor the complete verification workflow from one place."
        actions={[
          { title: "Pending Requests", onClick: () => scrollToSection("pending-verifications") },
          { title: "All Verification Requests", onClick: () => scrollToSection("verification-requests") },
          { title: "Verification Guidelines", onClick: () => scrollToSection("verification-guidelines") },
        ]}
        pills={[
          { title: "Pending Review", value: "8 Requests", color: "#D97706" },
          { title: "Approved Today", value: "15", color: "#16A34A" },
          { title: "Average Review", value: "1 Day", color: "#2563EB" },
        ]}
        summaryCard={
          <>
            <h3 style={{ marginTop: 0, marginBottom: "20px", fontSize: "20px", color: COLORS.text }}>Today's Verification Overview</h3>
            {[["Pending Requests", "8"], ["Approved Today", "15"], ["Rejected Today", "2"], ["Average Review Time", "1 Day"]].map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                <span style={{ color: COLORS.textSecondary, fontSize: "14px" }}>{label}</span>
                <strong style={{ color: COLORS.text, fontSize: "14px" }}>{value}</strong>
              </div>
            ))}
          </>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
        <StatsCard
          title="Pending Requests"
          value={pendingRequests.length.toString()}
          subtitle="Awaiting HR Review"
          accentColor="#D97706"
        />

        <StatsCard
          title="Approved Requests"
          value={approvedRequests.length.toString()}
          subtitle="Approved by HR"
          accentColor="#16A34A"
        />

        <StatsCard
          title="Rejected Requests"
          value={rejectedRequests.length.toString()}
          subtitle="Rejected by HR"
          accentColor="#DC2626"
        />

        <StatsCard
          title="Completed"
          value={completedRequests.length.toString()}
          subtitle="Verification Completed"
          accentColor="#2563EB"
        />
      </div>

      <div id="pending-verifications">
        <SectionCard
          title="Pending Verification Requests"
          subtitle={`There are ${pendingRequests.length} requests awaiting HR approval.`}
        ><div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ background: "#F8FAFC" }}>
                <tr>
                  <th style={{ padding: "12px" }}>Request ID</th>
                  <th style={{ padding: "12px" }}>Requested By</th>
                  <th style={{ padding: "12px" }}>Company</th>
                  <th style={{ padding: "12px" }}>Verification Type</th>
                  <th style={{ padding: "12px" }}>Submitted</th>
                  <th style={{ padding: "12px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.map((req) => (
                  <tr
                    key={req.id}
                    style={{ borderBottom: `1px solid ${COLORS.border}` }}
                  ><td style={{ padding: "12px" }}>{req.id}</td>
                    <td style={{ padding: "12px" }}>
                      {req.requester}
                    </td>

                    <td style={{ padding: "12px" }}>
                      {req.company}
                    </td>

                    <td style={{ padding: "12px" }}>
                      {req.type}
                    </td>

                    <td style={{ padding: "12px" }}>
                      {req.date}
                    </td>

                    <td style={{ padding: "12px" }}>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        <button
                          style={secondaryButtonStyle}
                          onClick={() => handleViewDetails(req)}
                        >View Details
                        </button>

                        <PrimaryButton
                          onClick={() => handleApprove(req.id)}
                        >
                          Approve
                        </PrimaryButton>

                        <button
                          style={{
                            ...secondaryButtonStyle,
                            background: "#FEE2E2",
                            color: "#B91C1C",
                          }}
                          onClick={() => handleReject(req.id)}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {pendingRequests.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      style={{
                        padding: "30px",
                        textAlign: "center",
                        color: COLORS.textSecondary,
                      }}
                    >
                      No pending verification requests.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      <div id="verification-requests">
        <SectionCard title="Manage Verification Requests" subtitle={`Showing ${Math.min(visibleRequests.length, filteredRequests.length)} of ${filteredRequests.length} verification requests`}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px", marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
              <input placeholder="Search by Request ID, Company or Verification Type..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: "340px", padding: "12px 16px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, outline: "none" }} />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: "12px 16px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, background: "#fff", cursor: "pointer" }}>
                <option>Newest</option>
                <option>Oldest</option>
                <option>Company</option>
                <option>Verification Type</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button style={secondaryButtonStyle} onClick={() => { setSearchTerm(""); setSelectedStatus("All"); }}>View All Requests</button>
              <PrimaryButton onClick={handleExportHistory}>Export History</PrimaryButton>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "24px" }}>
            {["All", "Pending", "Approved", "Rejected", "Completed"].map((status) => (
              <button key={status} onClick={() => setSelectedStatus(status)} style={{ padding: "8px 16px", borderRadius: "999px", border: `1px solid ${COLORS.border}`, background: selectedStatus === status ? COLORS.primary : "#FFFFFF", color: selectedStatus === status ? "#FFFFFF" : COLORS.text, cursor: "pointer", fontWeight: 600, transition: "0.2s ease" }}>
                {status}
              </button>
            ))}
          </div>

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
                  <tr key={req.id} style={{ borderBottom: `1px solid ${COLORS.border}`, transition: "0.2s ease" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <td style={{ padding: "12px" }}>{req.id}</td>
                    <td style={{ padding: "12px" }}>{req.requester}</td>
                    <td style={{ padding: "12px" }}>{req.company}</td>
                    <td style={{ padding: "12px" }}>{req.type}</td>
                    <td style={{ padding: "12px" }}>{req.date}</td>
                    <td style={{ padding: "12px" }}><StageBadge stage={req.stage} /></td>
                    <td style={{ padding: "12px" }}><StatusBadge status={req.status} /></td>
                    <td style={{ padding: "12px" }}>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        <button style={secondaryButtonStyle} onClick={() => handleViewDetails(req)}>View Details</button>
                        <button style={secondaryButtonStyle}>Track Progress</button>
                        {req.status === "Approved" ? (
                          <PrimaryButton>Download</PrimaryButton>
                        ) : (
                          <button disabled style={{ opacity: 0.5, cursor: "not-allowed", padding: "8px 14px", borderRadius: "8px", border: `1px solid ${COLORS.border}`, background: "#F8FAFC", color: COLORS.textSecondary }}>Awaiting Approval</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredRequests.length === 0 && (
                  <tr>
                    <td colSpan={8} style={{ padding: "24px", textAlign: "center", color: COLORS.textSecondary }}>No matching verification requests found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Official Employment Records" subtitle="Access your digitally issued employment records, certificates and letters securely generated by PalC Networks.">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {[
            { title: "Employment Certificate", category: "Employment Record", status: "Available", issued: "12 July 2026", documentId: "EMP-2026-001", description: "Official certificate confirming your employment with PalC Networks." },
            { title: "Experience Letter", category: "Experience Letter", status: "Available", issued: "12 July 2026", documentId: "EXP-2026-001", description: "Digitally signed summary of your professional experience at PalC Networks." },
            { title: "Relieving Letter", category: "Exit Documentation", status: "Available", issued: "12 July 2026", documentId: "REL-2026-001", description: "Official relieving documentation issued after completion of employment." },
          ].map((document) => (
            <SectionCard key={document.documentId} title={document.title}>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ background: "#EFF6FF", color: COLORS.primary, padding: "6px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 700 }}>{document.category}</span>
                  <StatusBadge status={document.status} />
                </div>
                <p style={{ margin: 0, color: COLORS.textSecondary, lineHeight: 1.6 }}>{document.description}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: "12px" }}>
                  <div><small style={{ color: COLORS.textSecondary }}>Document ID</small><div style={{ fontWeight: 700 }}>{document.documentId}</div></div>
                  <div><small style={{ color: COLORS.textSecondary }}>Issued On</small><div style={{ fontWeight: 700 }}>{document.issued}</div></div>
                  <div><small style={{ color: COLORS.textSecondary }}>Security</small><div style={{ fontWeight: 700 }}>Digitally Signed</div></div>
                  <div><small style={{ color: COLORS.textSecondary }}>Verification</small><div style={{ fontWeight: 700 }}>QR Enabled</div></div>
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "6px" }}>
                  <button style={secondaryButtonStyle} onClick={() => handlePreviewDocument(document)}>Preview</button>
                  <PrimaryButton>Download PDF</PrimaryButton>
                  <button style={secondaryButtonStyle}>Share</button>
                </div>
              </div>
            </SectionCard>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Third-Party Verification" subtitle="Securely share your verified employment credentials with authorised employers, universities and verification agencies.">
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.9fr", gap: "32px", alignItems: "start" }}>
          <div>
            <h3 style={{ margin: "0 0 14px", color: COLORS.text }}>How Verification Works</h3>
            <p style={{ color: COLORS.textSecondary, lineHeight: 1.7, marginBottom: "24px" }}>Share your employment credentials confidently using your unique Verification ID or digitally verified employment documents issued by PalC Networks.</p>
            {[
              { title: "Unique Verification ID", text: "Each alumnus receives a unique verification reference recognised by authorised organisations." },
              { title: "QR Enabled Documents", text: "Employment documents include QR verification for authenticity." },
              { title: "Authorised Verification", text: "Only PalC HR can issue and validate official employment records." },
              { title: "Privacy Protected", text: "Your employment information is shared only through authorised verification workflows." },
            ].map((item) => (
              <div key={item.title} style={{ display: "flex", gap: "16px", padding: "16px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                <div style={{ width: "10px", height: "10px", marginTop: "8px", borderRadius: "50%", background: COLORS.primary }} />
                <div>
                  <h4 style={{ margin: 0, color: COLORS.text, fontSize: "16px" }}>{item.title}</h4>
                  <p style={{ margin: "6px 0 0", color: COLORS.textSecondary, lineHeight: 1.6 }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "#FFFFFF", border: `1px solid ${COLORS.border}`, borderRadius: "18px", padding: "24px" }}>
            <h3 style={{ marginTop: 0, color: COLORS.text }}>Verification Credentials</h3>
            <div style={{ display: "grid", gap: "18px", marginTop: "22px" }}>
              {[["Verification ID", "PALC-VER-2026-001"], ["Status", "Active"], ["Method", "Digital"], ["Security", "QR Enabled"]].map(([label, value]) => (
                <div key={label}>
                  <p style={{ margin: 0, color: COLORS.textSecondary, fontSize: "13px" }}>{label}</p>
                  <strong style={{ color: COLORS.text, fontSize: "16px" }}>{value}</strong>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "28px" }}>
              <PrimaryButton>Copy Verification ID</PrimaryButton>
              <button style={secondaryButtonStyle}>Copy Verification Link</button>
            </div>
            <div style={{ marginTop: "24px", padding: "14px", borderRadius: "12px", background: "#EFF6FF", border: `1px solid ${COLORS.border}` }}>
              <strong style={{ color: COLORS.primary }}>Backend Integration Pending</strong>
              <p style={{ margin: "8px 0 0", color: COLORS.textSecondary, lineHeight: 1.6 }}>QR verification, secure links and employer validation will become available after backend integration.</p>
            </div>
          </div>
        </div>
      </SectionCard>

      <div id="verification-process">
        <SectionCard title="Verification Process" subtitle="Understand how your employment verification request is processed, reviewed and securely verified before official documents are issued.">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px,1fr))", gap: "20px", alignItems: "stretch" }}>
            {[
              { title: "Request Submitted", description: "Verification request is successfully created in the Alumni Portal.", color: "#2563EB" },
              { title: "HR Review", description: "PalC HR validates employment records and supporting information.", color: "#0EA5E9" },
              { title: "Certificate Generated", description: "A digitally signed employment certificate is securely generated.", color: "#D97706" },
              { title: "Verification Ready", description: "Authorised organisations verify records using secure credentials.", color: "#9333EA" },
              { title: "Completed", description: "The verification is complete and documents become available.", color: "#16A34A" },
            ].map((step) => (
              <div key={step.title} style={{ position: "relative", background: "#FFFFFF", border: `1px solid ${COLORS.border}`, borderRadius: "18px", padding: "22px", transition: "0.2s ease", cursor: "default" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(37,99,235,0.12)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: step.color, marginBottom: "12px" }} />
                <h4 style={{ margin: "0 0 8px 0", color: COLORS.text, fontSize: "16px" }}>{step.title}</h4>
                <p style={{ margin: 0, color: COLORS.textSecondary, fontSize: "13px", lineHeight: 1.5 }}>{step.description}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <DetailsModal
        open={showDetailsModal}
        title={selectedRequest?.id ?? "Request Details"}
        onClose={() => setShowDetailsModal(false)}
      >
        {selectedRequest && (
          <div style={{ display: "grid", gap: "16px" }}>
            <div><strong>Company:</strong> {selectedRequest.company}</div>
            <div><strong>Requester:</strong> {selectedRequest.requester}</div>
            <div><strong>Type:</strong> {selectedRequest.type}</div>
            <div><strong>Submitted:</strong> {selectedRequest.date}</div>
            <div><strong>Stage:</strong> {selectedRequest.stage}</div>
            <div><strong>Status:</strong> {selectedRequest.status}</div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                marginTop: "24px",
              }}
            >
              {selectedRequest.status === "Pending" && (
                <>
                  <button
                    style={{
                      ...secondaryButtonStyle,
                      background: "#FEE2E2",
                      color: "#B91C1C",
                    }}
                    onClick={() => {
                      handleReject(selectedRequest.id);
                      setShowDetailsModal(false);
                    }}
                  >
                    Reject
                  </button>
                  <PrimaryButton
                    onClick={() => {
                      handleApprove(selectedRequest.id);
                      setShowDetailsModal(false);
                    }}
                  >Approve
                  </PrimaryButton>
                </>
              )}
            </div>
          </div>
        )}
      </DetailsModal>

      <DetailsModal open={showDocumentPreview} title={selectedDocument?.title ?? "Document Preview"} onClose={() => setShowDocumentPreview(false)}>
        {selectedDocument && (
          <div style={{ display: "grid", gap: "16px" }}>
            <p><strong>Category:</strong> {selectedDocument.category}</p>
            <p><strong>Document ID:</strong> {selectedDocument.documentId}</p>
            <p><strong>Issued Date:</strong> {selectedDocument.issued}</p>
            <p>{selectedDocument.description}</p>
          </div>
        )}
      </DetailsModal>
    </div>
  );
}