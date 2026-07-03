import PageHeader from "../../shared/components/PageHeader";
import SearchBar from "../../shared/components/SearchBar";
import SectionCard from "../../shared/components/SectionCard";
import StatusBadge from "../../shared/components/StatusBadge";
import { COLORS } from "../../shared/theme/colors";

const documents = [
  {
    name: "Experience Certificate",
    category: "Employment Record",
    date: "12-Jan-2025",
    format: "PDF",
    status: "Available",
  },
  {
    name: "Relieving Letter",
    category: "Employment Record",
    date: "15-Jan-2025",
    format: "PDF",
    status: "Available",
  },
  {
    name: "Form 16",
    category: "Tax Document",
    date: "30-Mar-2025",
    format: "PDF",
    status: "Available",
  },
  {
    name: "Last Payslip",
    category: "Payroll",
    date: "31-Dec-2024",
    format: "PDF",
    status: "Available",
  },
];

const secondaryButtonStyle = {
  background: "#EFF6FF",
  color: COLORS.primary,
  boxShadow: "none",
  border: `1px solid ${COLORS.border}`,
};

export default function DocumentsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <PageHeader
        title="Document Repository"
        subtitle="Download and manage your employment records, tax documents and settlement statements — available for up to 24 months after separation."
      />
        <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "18px",
        }}
      >
        {[
          {
            title: "Available Documents",
            value: "4",
          },
          {
            title: "Recently Added",
            value: "1",
          },
          {
            title: "Downloaded This Month",
            value: "3",
          },
          {
            title: "Last Updated",
            value: "30 Mar 2025",
          },
        ].map((card) => (
          <div
            key={card.title}
            style={{
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: "18px",
              padding: "22px",
              boxShadow:
                "0 8px 18px rgba(15,23,42,.06)",
            }}
          >
            <p
              style={{
                margin: 0,
                color: COLORS.textSecondary,
                fontSize: "13px",
              }}
            >
              {card.title}
            </p>

            <h2
              style={{
                marginTop: "12px",
                marginBottom: 0,
                color: COLORS.text,
              }}
            >
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      <SectionCard title="My Documents">
        <div style={{ marginBottom: "20px" }}>
          <div
  style={{
    display: "flex",
    gap: "18px",
    flexWrap: "wrap",
    marginBottom: "22px",
  }}
>
  <div
    style={{
      flex: 1,
      minWidth: "320px",
    }}
  >
    <SearchBar />
      </div>

      <select
        style={{
          padding: "12px 16px",
          borderRadius: "12px",
          border: `1px solid ${COLORS.border}`,
          minWidth: "220px",
        }}
      >
        <option>All Categories</option>

        <option>Employment Record</option>

        <option>Payroll</option>

        <option>Tax Document</option>
      </select>
    </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Document</th>
                <th>Category</th>
                <th>Issue Date</th>
                <th>Format</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
  {documents.map((doc) => (
    <tr key={doc.name}>
      <td style={{ fontWeight: 700 }}>{doc.name}</td>

      <td>{doc.category}</td>

      <td>{doc.date}</td>

      <td>{doc.format}</td>

      <td>
        <StatusBadge status={doc.status} />
      </td>

      <td>
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button style={secondaryButtonStyle}>
            Preview
          </button>

          <button>
            Download
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
