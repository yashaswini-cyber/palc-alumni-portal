import StatsCard from "../../shared/components/StatsCard";
import PrimaryButton from "../../shared/components/PrimaryButton";
import PageHeader from "../../shared/components/PageHeader";
import SearchBar from "../../shared/components/SearchBar";
import SectionCard from "../../shared/components/SectionCard";
import StatusBadge from "../../shared/components/StatusBadge";
import InfoCard from "../../shared/components/InfoCard";
import DetailsModal from "../../shared/components/DetailsModal";
import { COLORS } from "../../shared/theme/colors";
import { useEffect, useMemo, useState } from "react";
import DocumentPreviewModal from "../../shared/components/DocumentPreviewModal";

const documents = [
  { id: "DOC-001", name: "Experience Certificate", category: "Employment Record", date: "12-Jan-2025", format: "PDF", status: "Available", path: "/downloads/Form16.pdf" },
  { id: "DOC-002", name: "Relieving Letter", category: "Employment Record", date: "15-Jan-2025", format: "PDF", status: "Available", path: "/downloads/Form16.pdf" },
  { id: "DOC-003", name: "Form 16", category: "Tax Document", date: "30-Mar-2025", format: "PDF", status: "Available", path: "/downloads/Form16.pdf" },
  { id: "DOC-004", name: "Last Payslip", category: "Payroll", date: "31-Dec-2024", format: "PDF", status: "Available", path: "/downloads/Form16.pdf" },
  { id: "DOC-005", name: "Full & Final (F&F) Settlement Statement", category: "Settlement", date: "18-Jan-2025", format: "PDF", status: "Available", path: "/downloads/Form16.pdf" },
  { id: "DOC-006", name: "PF Transfer Documents", category: "Provident Fund", date: "20-Jan-2025", format: "PDF", status: "Available", path: "/downloads/Form16.pdf" },
];

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
  const [previewOpen, setPreviewOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("Latest");
  const [fileSizes, setFileSizes] = useState<Record<string, string>>({});
  const [selectedDocument, setSelectedDocument] = useState({ title: "", path: "" });
  const [recentActivity, setRecentActivity] = useState<{ name: string; action: "Downloaded" | "Previewed"; time: number; }[]>([]);
  const downloadsThisMonth = useMemo(() => recentActivity.filter(item => item.action === "Downloaded" && new Date(item.time).getMonth() === new Date().getMonth() && new Date(item.time).getFullYear() === new Date().getFullYear()).length, [recentActivity]);

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const search = searchText.toLowerCase();
      const matchesSearch =
        doc.name.toLowerCase().includes(search) ||
        doc.category.toLowerCase().includes(search) ||
        doc.id.toLowerCase().includes(search) ||
        doc.format.toLowerCase().includes(search) ||
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

  const logActivity = (name: string, action: "Downloaded" | "Previewed") => {
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
    logActivity(doc.name, "Downloaded");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <PageHeader
        title="Document Repository"
        subtitle="Download and manage your employment records, tax documents and settlement statements — available for up to 24 months after separation."
      />

      {/* Metrics Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "32px" }}>
        <StatsCard title="Available Documents" value={documents.length.toString()} subtitle="Employment records" accentColor="#2563EB" />
        <StatsCard title="Latest Upload"value={latestDocument.name}subtitle={new Date(latestDocument.date).toLocaleDateString("en-GB", {day: "2-digit",month: "short",year: "numeric", })} accentColor="#16A34A"/>
        <StatsCard title="Downloads" value={downloadsThisMonth.toString()} subtitle="This month" accentColor="#D97706" />
        <StatsCard title="Latest Upload" value="30 Mar" subtitle="Latest upload" accentColor="#9333EA" />
      </div>

      {/* Main Repository Section */}
      <SectionCard title="My Documents">
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
              <option value="Employment">Employment</option>
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
                <th style={{ padding: "12px" }}>Document ID</th>
                <th style={{ padding: "12px" }}>Document</th>
                <th style={{ padding: "12px" }}>Category</th>
                <th style={{ padding: "12px" }}>Issue Date</th>
                <th style={{ padding: "12px" }}>File Size</th>
                <th style={{ padding: "12px" }}>Format</th>
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
                    <td style={{ padding: "12px" }}>{doc.id}</td>
                    <td style={{ padding: "12px", fontWeight: 700 }}>{doc.name}</td>
                    <td style={{ padding: "12px" }}>{doc.category}</td>
                    <td style={{ padding: "12px" }}>{doc.date}</td>
                    <td style={{ padding: "12px" }}>{fileSizes[doc.id] ?? "--"}</td>
                    <td style={{ padding: "12px" }}>{doc.format}</td>
                    <td style={{ padding: "12px" }}><StatusBadge status={doc.status} /></td>
                    <td style={{ padding: "12px" }}>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          style={secondaryButtonStyle}
                          onClick={() => {
                            setSelectedDocument({ title: doc.name, path: doc.path });
                            logActivity(doc.name, "Previewed");
                            setPreviewOpen(true);
                          }}
                        >
                          Preview
                        </button>
                        <PrimaryButton onClick={() => handleDownload(doc)}>
                          Download
                        </PrimaryButton>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div style={{ marginTop: "20px", paddingTop: "18px", borderTop: `1px solid ${COLORS.border}`, color: COLORS.textSecondary, fontSize: "14px" }}>
            All employment documents displayed in this repository are official records issued by PalC. Downloaded copies should be retained for your personal records.
          </div>
        </div>
      </SectionCard>

      {/* Repository Summary */}
      <SectionCard title="Repository Summary">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "18px" }}>
          <div style={{ padding: "18px", border: `1px solid ${COLORS.border}`, borderRadius: "12px", background: COLORS.surface }}>
            <div style={{ color: COLORS.textSecondary, fontSize: "14px" }}>Documents Available</div>
            <div style={{ marginTop: "8px", fontSize: "28px", fontWeight: 700 }}>{documents.length}</div>
          </div>
          <div style={{ padding: "18px", border: `1px solid ${COLORS.border}`, borderRadius: "12px", background: COLORS.surface }}>
            <div style={{ color: COLORS.textSecondary, fontSize: "14px" }}>Total Activity</div>
            <div style={{ marginTop: "8px", fontSize: "28px", fontWeight: 700 }}>{recentActivity.length}</div>
          </div>
          <div style={{ padding: "18px", border: `1px solid ${COLORS.border}`, borderRadius: "12px", background: COLORS.surface }}>
            <div style={{ color: COLORS.textSecondary, fontSize: "14px" }}>Available Documents</div>
            <div style={{ marginTop: "8px", fontSize: "20px", fontWeight: 700 }}>{documents.filter(doc => doc.status === "Available").length} Active</div>
          </div>
        </div>
      </SectionCard>

  {/* Repository Information */}
    <SectionCard title="Repository Information">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "20px" }}>
    <InfoCard
      hoverable
      title="Document Availability"
      subtitle="Employment documents remain available for up to 24 months after your separation date."/>
    <InfoCard
      hoverable
      title="Supported Formats"
      subtitle="All employment records are provided in PDF format for consistency and long-term accessibility."/>
    <InfoCard
      hoverable
      title="Security"
      subtitle="Documents are securely stored and can only be accessed by authenticated alumni."/>
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
    </div>
  );
}