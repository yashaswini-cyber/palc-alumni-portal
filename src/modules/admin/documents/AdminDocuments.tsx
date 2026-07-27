import StatsCard from "../../../shared/components/StatsCard";
import PrimaryButton from "../../../shared/components/PrimaryButton";
import PageHeader from "../../../shared/components/PageHeader";
import SearchBar from "../../../shared/components/SearchBar";
import SectionCard from "../../../shared/components/SectionCard";
import StatusBadge from "../../../shared/components/StatusBadge";
import InfoCard from "../../../shared/components/InfoCard";
import DetailsModal from "../../../shared/components/DetailsModal";
import { COLORS } from "../../../shared/theme/colors";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DocumentPreviewModal from "../../../shared/components/DocumentPreviewModal";
import HeroBanner from "../../../shared/components/HeroBanner";
import { getDocuments, addDocument } from "../../../mockData/localStorage";

const secondaryButtonStyle = { background: "#EFF6FF", color: COLORS.primary, boxShadow: "none", border: `1px solid ${COLORS.border}`, padding: "10px 18px", borderRadius: "10px", cursor: "pointer" };
function formatRecentTime(time: number) {
  const diff = Date.now() - time;
  const minutes = Math.floor(diff / (1000 * 60));
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  return new Date(time).toLocaleDateString("en-GB");
}

export default function DocumentsPage() {
  const navigate = useNavigate();
  const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
  const [previewOpen, setPreviewOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("Latest");
  const [fileSizes, setFileSizes] = useState<Record<string, string>>({});
  const [selectedDocument, setSelectedDocument] = useState({ title: "", path: "" });
  const [recentActivity, setRecentActivity] = useState<{ name: string; action: "Uploaded" | "Updated" | "Deleted" | "Previewed"; time: number; }[]>([]);
  const uploadsToday = useMemo(() => recentActivity.filter(item => item.action === "Uploaded").length, [recentActivity]);
  const [employeeId, setEmployeeId] = useState("");
const [employeeName, setEmployeeName] = useState("");
const [documentName, setDocumentName] = useState("Experience Certificate");
const [category, setCategory] = useState("Employment Record");
const [issueDate, setIssueDate] = useState("");
const [expiryDate, setExpiryDate] = useState("");
const [remarks, setRemarks] = useState("");
const [selectedFile, setSelectedFile] = useState<File | null>(null);
const today = new Date().toISOString().split("T")[0];
const [documents, setDocuments] = useState(getDocuments());
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const search = searchText.toLowerCase();
      const matchesSearch =
        doc.employeeId.toLowerCase().includes(search) ||
        doc.employeeName.toLowerCase().includes(search) ||
        doc.name.toLowerCase().includes(search) ||
        doc.category.toLowerCase().includes(search) ||
        doc.uploadedBy.toLowerCase().includes(search) ||
        doc.id.toLowerCase().includes(search) ||
        doc.status.toLowerCase().includes(search);
      const matchesCategory = selectedCategory === "All Categories" || doc.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchText, selectedCategory]);

  const sortedDocuments = useMemo(() => {
    return [...filteredDocuments].sort((a, b) => {
      switch (sortBy) {
        case "A-Z": return a.name.localeCompare(b.name);
        case "Z-A": return b.name.localeCompare(a.name);
        case "Oldest": return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "Latest":
        default: return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  }, [filteredDocuments, sortBy]);

  const latestDocument = useMemo(() => {
  return [...documents].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];
}, []);

  useEffect(() => {
    const stored = localStorage.getItem("recentActivity");
    if (stored) setRecentActivity(JSON.parse(stored));
  }, []);
  
  useEffect(() => {
    async function loadSizes() {
      const sizes: Record<string, string> = {};
      for (const doc of documents) {
        try {
          const response = await fetch(doc.path);
          const blob = await response.blob();
          const kb = blob.size / 1024;
          sizes[doc.id] = kb >= 1024 ? `${(kb / 1024).toFixed(2)} MB` : `${kb.toFixed(0)} KB`;
        } catch {
          sizes[doc.id] = "--";
        }
      }
      setFileSizes(sizes);
    }
    loadSizes();
  }, []);

  const logActivity = (name: string, action: "Uploaded" | "Updated" | "Deleted" | "Previewed") => {
    const activity = { name, action, time: Date.now() };
    const updated = [activity, ...recentActivity].slice(0, 5);
    setRecentActivity(updated);
    localStorage.setItem("recentActivity", JSON.stringify(updated));
  };
  const handleDownload = (doc: any) => {
    const link = document.createElement("a");
    link.href = doc.path;
    link.download = doc.name + ".pdf";
    link.click();
    logActivity(doc.name, "Previewed");
  };

const handleUploadDocument = () => {
  if (!employeeId || !employeeName || !selectedFile || !issueDate) {
    alert("Please fill all required fields.");
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    const newDocument = {
      id: `DOC-${Date.now()}`,
      employeeId,
      employeeName,
      name: documentName,
      category,
      uploadedBy: "HR Administrator",
      version: "v1.0",
      date: issueDate,
      format: "PDF",
      status: "Available",
      path: reader.result as string
    };
    addDocument(newDocument);
    setDocuments(getDocuments());
    logActivity(documentName, "Uploaded");
    setEmployeeId("");
    setEmployeeName("");
    setDocumentName("Experience Certificate");
    setCategory("Employment Record");
    setIssueDate("");
    setExpiryDate("");
    setRemarks("");
    setSelectedFile(null);
    alert("Document uploaded successfully.");
  };
  reader.readAsDataURL(selectedFile);
};
const [bulkUploadModalOpen, setBulkUploadModalOpen] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <HeroBanner
            badge="HR Document Management"
            title="Employment Document Repository"
            subtitle="Manage employment records, upload official documents, maintain version history and securely distribute employment records to alumni through a centralized repository."
            actions={[
            {
                title: "Upload Document",
                onClick: () => scrollToSection("upload-document"),
            },
            {
            title: "Bulk Upload",
            onClick: () => setBulkUploadModalOpen(true),
            },
            {
            title: "Repository Report",
            onClick: () => scrollToSection("repository-summary"),
            },
        ]}
        pills={[
            {
            title: "Documents Managed",
            value: "286",
            color: "#16A34A",
            },
            {
            title: "Pending Uploads",
            value: "18",
            color: "#2563EB",
            },
            {
            title: "Repository Health",
            value: "Healthy",
            color: "#D97706",
            },
        ]}
        summaryCard={
            <>
            <h3
                style={{
                marginTop: 0,
                marginBottom: "20px",
                fontSize: "20px",
                color: COLORS.text,
                }}
            >
                Repository Overview
            </h3>

            {[
                ["Today's Uploads", "14"],
                ["Latest Version", "v2.3"],
                ["Storage Used", "2.8 GB"],
                ["Repository Status", "Operational"],
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
                <span
                    style={{
                    color: COLORS.textSecondary,
                    fontSize: "14px",
                    }}
                >
                    {label}
                </span>

                <strong
                    style={{
                    color: COLORS.text,
                    fontSize: "14px",
                    }}
                >
                    {value}
                </strong>
                </div>
            ))}
            </>
        }
        />

      {/* Metrics Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "32px" }}>
        <StatsCard title="Available Documents" value={documents.length.toString()} subtitle="Employment records" accentColor="#2563EB" />
        <StatsCard title="Latest Upload"value={latestDocument.name}subtitle={new Date(latestDocument.date).toLocaleDateString("en-GB", {day: "2-digit",month: "short",year: "numeric", })} accentColor="#16A34A"/>
        <StatsCard title="Pending Uploads" value="18" subtitle="Awaiting processing" accentColor="#D97706" />
        <StatsCard title="Latest Upload" value="30 Mar" subtitle="Latest upload" accentColor="#9333EA" />
      </div>

{/*Upload Document*/}
    <section id="upload-document">
        <SectionCard
        title="Upload Employment Document"
        subtitle="Upload employment records and assign them to alumni. Uploaded documents will automatically become available in the Alumni Portal."
        >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "20px" }}>

            <div>
            <label style={{ display: "block", marginBottom: "8px", color: COLORS.text }}>Employee ID</label>
            <input value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} type="text" placeholder="Enter Employee ID" style={{ width: "100%", padding: "12px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, background: COLORS.surface, color: COLORS.text }} />
            </div>

            <div>
            <label style={{ display: "block", marginBottom: "8px", color: COLORS.text }}>Employee Name</label>
            <input value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} type="text" placeholder="Enter Employee Name" style={{ width: "100%", padding: "12px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, background: COLORS.surface, color: COLORS.text }} />
            </div>

            <div>
            <label style={{ display: "block", marginBottom: "8px", color: COLORS.text }}>Document Type</label>
            <select
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                style={{ width: "100%", padding: "12px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, background: COLORS.surface, color: COLORS.text }}>
                    <option value="Experience Certificate">Experience Certificate</option>
                    <option value="Relieving Letter">Relieving Letter</option>
                    <option value="Form 16">Form 16</option>
                    <option value="Last Payslip">Last Payslip</option>
                    <option value="Full & Final (F&F) Settlement Statement">Full & Final (F&F) Settlement Statement</option>
                    <option value="PF Transfer Documents">PF Transfer Documents</option>
            </select>
            </div>

            <div>
            <label style={{ display: "block", marginBottom: "8px", color: COLORS.text }}>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, background: COLORS.surface, color: COLORS.text }}>
                <option>Employment Record</option>
                <option>Payroll</option>
                <option>Tax Document</option>
                <option>Settlement</option>
                <option>Provident Fund</option>
            </select>
            </div>

            <div>
            <label style={{ display: "block", marginBottom: "8px", color: COLORS.text }}>Issue Date</label>
            <input
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                type="date"
                min={today}
                style={{ width: "100%", padding: "12px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, background: COLORS.surface, color: COLORS.text }}
                />
            </div>

            <div>
                <label style={{ display: "block", marginBottom: "8px", color: COLORS.text }}>Expiry Date (Optional)</label>  
                <input
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                type="date"
                min={issueDate || today}
                style={{ width: "100%", padding: "12px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, background: COLORS.surface, color: COLORS.text }}
                />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", marginBottom: "8px", color: COLORS.text }}>Upload PDF Document</label>
            <input type="file" accept=".pdf" onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)} style={{ width: "100%", padding: "12px", borderRadius: "10px", border: `1px dashed ${COLORS.border}`, background: COLORS.surface, color: COLORS.text }} />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", marginBottom: "8px", color: COLORS.text }}>Remarks</label>
            <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={4} placeholder="Additional notes..." style={{ width: "100%", padding: "12px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, background: COLORS.surface, color: COLORS.text, resize: "vertical" }} />
            </div>

        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "16px", marginTop: "28px" }}>
            <button
    style={secondaryButtonStyle}
    onClick={() => {
        setEmployeeId("");
        setEmployeeName("");
        setDocumentName("Experience Certificate");
        setCategory("Employment Record");
        setIssueDate("");
        setExpiryDate("");
        setRemarks("");
        setSelectedFile(null);
    }}>Clear Form
</button>

            <PrimaryButton onClick={handleUploadDocument}>
                Upload Document
            </PrimaryButton>
        </div>
        </SectionCard>
        </section>
      {/* Employment Documents Section */}
     <SectionCard title="Employment Document Repository">
        <div style={{ marginBottom: "22px" }}>
          <div style={{ display: "flex", gap: "18px", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ flex: 1, minWidth: "320px" }}>
              <SearchBar value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ padding: "12px 16px", borderRadius: "12px", border: `1px solid ${COLORS.border}`, minWidth: "220px", background: COLORS.surface, color: COLORS.text }}
            >
              <option value="All Categories">All Categories</option>
              <option value="Employment Record">Employment Record</option>
              <option value="Payroll">Payroll</option>
              <option value="Tax Document">Tax Document</option>
              <option value="Settlement">Settlement</option>
              <option value="Provident Fund">Provident Fund</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: "12px 16px", borderRadius: "12px", border: `1px solid ${COLORS.border}`, minWidth: "180px", background: COLORS.surface, color: COLORS.text }}
            >
              <option value="Latest">Latest</option>
              <option value="Oldest">Oldest</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: `1px solid ${COLORS.border}` }}>
                <th style={{ padding: "12px" }}>Employee ID</th>
                <th style={{ padding: "12px" }}>Employee Name</th>
                <th style={{ padding: "12px" }}>Document</th>
                <th style={{ padding: "12px" }}>Category</th>
                <th style={{ padding: "12px" }}>Uploaded By</th>
                <th style={{ padding: "12px" }}>Version</th>
                <th style={{ padding: "12px" }}>Status</th>
                <th style={{ padding: "12px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedDocuments.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: "40px", color: COLORS.textSecondary }}>
                    No documents match your current search or filter criteria.
                  </td>
                </tr>
              ) : (
                sortedDocuments.map((doc) => (
                  <tr key={doc.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                    <td style={{ padding: "12px", fontWeight: 700 }}>{doc.employeeId}</td>
                    <td style={{ padding: "12px" }}>{doc.employeeName}</td>
                    <td style={{ padding: "12px" }}>{doc.name}</td>
                    <td style={{ padding: "12px" }}>{doc.category}</td>
                    <td style={{ padding: "12px" }}>{doc.uploadedBy}</td>
                    <td style={{ padding: "12px" }}>{doc.version}</td>
                    <td style={{ padding: "12px" }}><StatusBadge status={doc.status} /></td>
                    <td style={{ padding: "12px" }}>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button style={secondaryButtonStyle} onClick={() => { setSelectedDocument({ title: doc.name, path: doc.path }); logActivity(doc.name, "Previewed"); setPreviewOpen(true); }}>
                            Preview
                        </button>

                        <PrimaryButton onClick={() => handleDownload(doc)}>Download</PrimaryButton>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div style={{ marginTop: "20px", paddingTop: "18px", borderTop: `1px solid ${COLORS.border}`, color: COLORS.textSecondary, fontSize: "14px" }}>
            All employment documents are centrally managed by HR. Uploaded records become available to authorized alumni through the Alumni Portal and every update is tracked for audit and compliance purposes.
          </div>
        </div>
      </SectionCard>

      {/* Repository Summary */}
<section id="repository-summary">
<SectionCard title="Repository Summary">
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "18px" }}>
    
    <div style={{ padding: "18px", border: `1px solid ${COLORS.border}`, borderRadius: "12px", background: COLORS.surface }}>
      <div style={{ color: COLORS.textSecondary, fontSize: "14px" }}>Documents Managed</div>
      <div style={{ marginTop: "8px", fontSize: "28px", fontWeight: 700, color: COLORS.primary }}>
        {documents.length}
      </div>
    </div>

    <div style={{ padding: "18px", border: `1px solid ${COLORS.border}`, borderRadius: "12px", background: COLORS.surface }}>
      <div style={{ color: COLORS.textSecondary, fontSize: "14px" }}>Today's Uploads</div>
      <div style={{ marginTop: "8px", fontSize: "28px", fontWeight: 700, color: "#D97706" }}>14</div>
    </div>

    <div style={{ padding: "18px", border: `1px solid ${COLORS.border}`, borderRadius: "12px", background: COLORS.surface }}>
      <div style={{ color: COLORS.textSecondary, fontSize: "14px" }}>Repository Health</div>
      <div style={{ marginTop: "8px", fontSize: "20px", fontWeight: 700, color: "#16A34A" }}>
        {documents.filter(doc => doc.status === "Available").length} Active
      </div>
    </div>
    <div style={{ padding: "18px", border: `1px solid ${COLORS.border}`, borderRadius: "12px", background: COLORS.surface }}>
        <div style={{ color: COLORS.textSecondary, fontSize: "14px" }}>Storage Used</div>
        <div style={{ marginTop: "8px", fontSize: "28px", fontWeight: 700, color: "#2563EB" }}>2.8 GB</div>
    </div>

  </div>
</SectionCard>
</section>

  {/* Repository Information */}
    <SectionCard title="Repository Information">
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "18px" }}>
    <InfoCard
      hoverable
      title="Version Control"
      subtitle="Every uploaded document maintains version history to ensure previous revisions can be restored whenever required."
    />
    <InfoCard
      hoverable
      title="Role-Based Access"
      subtitle="Only authorized HR administrators can upload, replace or remove employment documents from the repository."
    />
    <InfoCard
      hoverable
      title="Audit Trail"
      subtitle="Every upload, replacement, download and deletion is recorded for compliance and operational visibility."
    />
  </div>
</SectionCard>
      
      {/* Recent Activity Section */}
      <SectionCard title="Recent Activity">
        {recentActivity.length === 0 ? (
          <p style={{ color: COLORS.textSecondary }}>No document activity yet. Preview or download a document to see your recent activity.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {recentActivity.map((item, index) => (
              <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${COLORS.border}`, paddingBottom: "12px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                  <span style={{ color: COLORS.primary, fontWeight: 600, fontSize: "13px" }}>{item.action}</span>
                  <strong style={{ color: COLORS.text }}>{item.name}</strong>
                </div>
                <span style={{ color: COLORS.textSecondary, fontSize: "13px" }}>{formatRecentTime(item.time)}</span>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

    {/* Help & Support */}
    <SectionCard
      title="Document Management Guidelines"
      subtitle="Best practices for managing employment documents, maintaining repository integrity and ensuring secure document distribution.">
      <div
        style={{ display: "grid",gridTemplateColumns: "2fr 1fr",gap: "24px",}}>
      
        {/* Left Column */}
        <div
          style={{display: "grid",gap: "18px"}}>
          {[
            { title: "Uploading Documents", description: "Upload employment records only after they have been reviewed and approved." },
            { title: "Replacing Documents", description: "Always upload a new version instead of overwriting historical employment records." },
            { title: "Retention Policy", description: "Maintain documents according to PalC retention and compliance requirements." },
            { title: "Repository Security", description: "Only authorized HR personnel should manage employment documents." }
            ].map((item) => (
            <InfoCard
                key={item.title}
                hoverable
                title={item.title}
                subtitle={item.description}
            />
            ))}
        </div>

        {/* Right Column */}
        <div
          style={{
            border: `1px solid ${COLORS.border}`,
            borderRadius: "18px",
            padding: "24px",
            background: "#F8FBFF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3
              style={{
                marginTop: 0,
                marginBottom: "12px",
                color: COLORS.text,
              }}
            >
              Need Repository Assistance?
            </h3>

            <p
              style={{
                color: COLORS.textSecondary,
                lineHeight: 1.7,
                marginBottom: "20px",
              }}
            >
              For storage issues, permission errors or repository maintenance requests, contact the IT Administration team.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "24px",
                color: COLORS.text,
              }}
            >
              <span>• Upload failures</span>
              <span>• Storage capacity </span>
              <span>• Permission issues</span>
              <span>• Repository maintenance</span>
            </div>
          </div>

          <PrimaryButton onClick={() => navigate("/dashboard/helpdesk")}>
            Contact IT Administrator
          </PrimaryButton>
        </div>
      </div>
    </SectionCard>

    {/* Structural Modal Mount Component */}
    {previewOpen && (
      <DetailsModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title={selectedDocument.title}
      >
        {/* Pass the preview frame as children right here! */}
        <div style={{ width: "100%", height: "500px" }}>
          <iframe
            src={selectedDocument.path}
            title={selectedDocument.title}
            style={{ width: "100%", height: "100%", border: "none", borderRadius: "8px" }}
          />
        </div>
      </DetailsModal>
    )}
{bulkUploadModalOpen && (
  <DetailsModal
    open={bulkUploadModalOpen}
    onClose={() => setBulkUploadModalOpen(false)}
    title="Bulk Upload Documents"
  >
    <div style={{ padding: "24px" }}>
      <p style={{ color: COLORS.text }}>
        Bulk Upload functionality will be implemented here.
      </p>
    </div>
  </DetailsModal>
)}
    </div>
  );
}