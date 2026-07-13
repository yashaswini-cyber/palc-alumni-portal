import StatsCard from "../../shared/components/StatsCard";
import PrimaryButton from "../../shared/components/PrimaryButton";
import PageHeader from "../../shared/components/PageHeader";
import SearchBar from "../../shared/components/SearchBar";
import SectionCard from "../../shared/components/SectionCard";
import StatusBadge from "../../shared/components/StatusBadge";
import { COLORS } from "../../shared/theme/colors";
import { useEffect, useMemo, useState } from "react";
import DocumentPreviewModal from "../../shared/components/DocumentPreviewModal";

const documents = [
  {
    id: "DOC-001",
    name: "Experience Certificate",
    category: "Employment Record",
    date: "12-Jan-2025",
    format: "PDF",
    status: "Available",
    path: "/downloads/Form16.pdf",
  },
  {
    id: "DOC-002",
    name: "Relieving Letter",
    category: "Employment Record",
    date: "15-Jan-2025",
    format: "PDF",
    status: "Available",
    path: "/downloads/Form16.pdf",
  },
  {
    id: "DOC-003",
    name: "Form 16",
    category: "Tax Document",
    date: "30-Mar-2025",
    format: "PDF",
    status: "Available",
    path: "/downloads/Form16.pdf",
  },
  {
    id: "DOC-004",
    name: "Last Payslip",
    category: "Payroll",
    date: "31-Dec-2024",
    format: "PDF",
    status: "Available",
    path: "/downloads/Form16.pdf",
  },
  {
    id: "DOC-005",
    name: "Full & Final (F&F) Settlement Statement",
    category: "Settlement",
    date: "18-Jan-2025",
    format: "PDF",
    status: "Available",
    path: "/downloads/Form16.pdf",
  },
  {
    id: "DOC-006",
    name: "PF Transfer Documents",
    category: "Provident Fund",
    date: "20-Jan-2025",
    format: "PDF",
    status: "Available",
    path: "/downloads/Form16.pdf",
  },
];

const secondaryButtonStyle = {
  background: "#EFF6FF",
  color: COLORS.primary,
  boxShadow: "none",
  border: `1px solid ${COLORS.border}`,
  padding: "10px 18px",
  borderRadius: "10px",
  cursor: "pointer",
};

const primaryButtonStyle = {
  background: COLORS.primary,
  color: "white",
  border: "none",
  borderRadius: "10px",
  padding: "10px 18px",
  cursor: "pointer",
};

function formatRecentTime(time: number) {
  const diff = Date.now() - time;
  const minutes = Math.floor(diff / (1000 * 60));

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hr ago`;
  }

  return new Date(time).toLocaleDateString("en-GB");
}

export default function DocumentsPage() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("Latest"); /*for sorting state*/
  const [fileSizes, setFileSizes] = useState<Record<string, string>>({}); /*dynamic downloaded file size*/
  const filteredDocuments = useMemo(() => {
  return documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchText.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchText.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchText.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories" ||
      doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
}, [searchText, selectedCategory]);

const sortedDocuments = useMemo(() => {
  return [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case "A-Z":
        return a.name.localeCompare(b.name);
      case "Z-A":
        return b.name.localeCompare(a.name);
      case "Oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "Latest":
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });
}, [filteredDocuments, sortBy]);

  const [selectedDocument, setSelectedDocument] = useState({
    title: "",
    path: "",
  });
  const [recentDownloads, setRecentDownloads] = useState<
    {
      name: string;
      time: number;
    }[]
  >([]);

  useEffect(() => {
    const stored = localStorage.getItem("recentDownloads");
    if (stored) {
      setRecentDownloads(
        JSON.parse(stored) as {
          name: string;
          time: number;
        }[]
      );
    }
  }, []);
  useEffect(() => {
  async function loadSizes() {
    const sizes: Record<string, string> = {};
    for (const doc of documents) {
      try {
        const response = await fetch(doc.path);
        const blob = await response.blob();
        const kb = blob.size / 1024;
        sizes[doc.id] =
          kb >= 1024
            ? `${(kb / 1024).toFixed(2)} MB`
            : `${kb.toFixed(0)} KB`;
      } catch {
        sizes[doc.id] = "--";
      }
    }
    setFileSizes(sizes);
  }
  loadSizes();
}, []);

  const handleDownload = (doc: any) => {
    const link = document.createElement("a");
    link.href = doc.path;
    link.download = doc.name + ".pdf";
    link.click();

    const newDownload = {
      name: doc.name,
      time: Date.now(),
    };

    const updatedDownloads = [newDownload, ...recentDownloads].slice(0, 5);
    setRecentDownloads(updatedDownloads);
    localStorage.setItem("recentDownloads", JSON.stringify(updatedDownloads));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <PageHeader
        title="Document Repository"
        subtitle="Download and manage your employment records, tax documents and settlement statements — available for up to 24 months after separation."
      />

      {/* Metrics Grid */}
      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    marginBottom: "32px",
  }}
>
  <StatsCard
    title="Available Documents"
    value="12"
    subtitle="Employment records"
    accentColor="#2563EB"
  />

  <StatsCard
    title="Recently Added"
    value="2"
    subtitle="New this month"
    accentColor="#16A34A"
  />

  <StatsCard
    title="Downloads"
    value="18"
    subtitle="This month"
    accentColor="#D97706"
  />

  <StatsCard
    title="Last Updated"
    value="30 Mar"
    subtitle="Latest upload"
    accentColor="#9333EA"
  />
</div>

      {/* Main Repository Section */}
      <SectionCard title="My Documents">
        <div style={{ marginBottom: "22px" }}>
          <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "320px" }}>
              <SearchBar
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: "12px 16px",
                borderRadius: "12px",
                border: `1px solid ${COLORS.border}`,
                minWidth: "220px",
                background: COLORS.surface,
                color: COLORS.text,
              }}
            >
             <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
  <div style={{ flex: 1, minWidth: "320px" }}>
    <SearchBar
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  </div>

  {/* Category Filter */}
  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    style={{
      padding: "12px 16px",
      borderRadius: "12px",
      border: `1px solid ${COLORS.border}`,
      minWidth: "220px",
      background: COLORS.surface,
      color: COLORS.text,
    }}
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
    style={{
      padding: "12px 16px",
      borderRadius: "12px",
      border: `1px solid ${COLORS.border}`,
      minWidth: "180px",
      background: COLORS.surface,
      color: COLORS.text,
    }}
  >
    <option value="Latest">Latest</option>
    <option value="Oldest">Oldest</option>
    <option value="A-Z">A-Z</option>
    <option value="Z-A">Z-A</option>
  </select>
</div> 
      <option value="All Categories">All Categories</option>
      <option value="Employment Record">Employment Record</option>
      <option value="Payroll">Payroll</option>
      <option value="Tax Document">Tax Document</option>
   </select>
  </div>
</div>
        {/* Data Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
           <thead>
              <tr
                style={{ textAlign: "left", borderBottom: `1px solid ${COLORS.border}`,  }}>         
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
              {filteredDocuments.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      textAlign: "center",
                      padding: "40px",
                      color: COLORS.textSecondary,
                    }}
                  >
                    No documents found.
                  </td>
                </tr>
              ) : (
                sortedDocuments.map((doc) => (
                  <tr key={doc.name} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                    <td style={{ padding: "12px" }}>{doc.id}</td>
                    <td style={{ padding: "12px", fontWeight: 700 }}> {doc.name}</td>                   
                    <td style={{ padding: "12px" }}> {doc.category}</td>               
                    <td style={{ padding: "12px" }}>{doc.date}</td>{fileSizes[doc.id] ?? "--"}                                       <td style={{ padding: "12px" }}>
                      </td>
                    <td style={{ padding: "12px" }}>   {doc.format}   
                      </td>                 
                    <td style={{ padding: "12px" }}>
                        <StatusBadge status={doc.status} />
                      </td>
                    <td style={{ padding: "12px" }}>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          style={secondaryButtonStyle}
                          onClick={() => {
                            setSelectedDocument({
                              title: doc.name,
                              path: doc.path,
                            });
                            setPreviewOpen(true);
                          }}
                        >
                          Preview
                        </button>
                        <PrimaryButton
                          onClick={() => handleDownload(doc)}
                          >
                              Download
                          </PrimaryButton>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Recent Downloads Section */}
      <SectionCard title="Recent Downloads">
        {recentDownloads.length === 0 ? (
          <p style={{ color: COLORS.textSecondary }}>No recent downloads.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {recentDownloads.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: `1px solid ${COLORS.border}`,
                  paddingBottom: "12px",
                }}
              >
                <div>
                  <strong style={{ color: COLORS.text }}>{item.name}</strong>
                </div>

                <span
                  style={{
                    color: COLORS.textSecondary,
                    fontSize: "13px",
                  }}
                >
                  {formatRecentTime(item.time)}
                </span>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Document Preview Overlay Panel */}
      <DocumentPreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        pdfPath={selectedDocument.path}
        title={selectedDocument.title}
      />
    </div>
  );
}