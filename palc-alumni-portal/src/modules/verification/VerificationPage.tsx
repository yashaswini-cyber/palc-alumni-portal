import PageHeader from "../../shared/components/PageHeader";
import SectionCard from "../../shared/components/SectionCard";
import StatusBadge from "../../shared/components/StatusBadge";
import { COLORS } from "../../shared/theme/colors";

const requests = [
  {
    id: "VR001",
    company: "Microsoft",
    date: "10-Jun-2026",
    type: "Employment Check",
    status: "Approved",
  },
  {
    id: "VR002",
    company: "Google",
    date: "18-Jun-2026",
    type: "Background Verification",
    status: "Pending",
  },
];

const secondaryButtonStyle = {
  background: "#EFF6FF",
  color: COLORS.primary,
  boxShadow: "none",
  border: `1px solid ${COLORS.border}`,
};

export default function VerificationPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <PageHeader
  title="Employment Verification Center"
  subtitle="Securely verify your employment with PalC through digital verification workflows, QR-enabled certificates and authorised third-party verification."
/>

  <div
    style={{
      background:
        "linear-gradient(135deg,#0F3D91,#2563EB)",
      borderRadius: "22px",
      padding: "34px",
      color: "white",
      marginBottom: "32px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "32px",
      flexWrap: "wrap",
    }}
  >
    <div style={{ flex: 2 }}>
      <p
        style={{
          textTransform: "uppercase",
          letterSpacing: "1px",
          opacity: .85,
          fontWeight: 700,
          margin: 0,
        }}
      >
        Digital Verification Services
      </p>

      <h2
        style={{
          marginTop: "14px",
          marginBottom: "16px",
          color: "white",
          fontSize: "34px",
        }}
      >
        Verify your employment instantly.
      </h2>
      <p
        style={{
          maxWidth: "650px",
          lineHeight: 1.7,
          opacity: .9,
        }}
      >
        Submit employment verification requests,
        download digitally verified certificates,
        and share secure QR-enabled credentials
        with employers and authorised verification partners.
      </p>
      <div
        style={{
          display: "flex",
          gap: "14px",
          marginTop: "24px",
          flexWrap: "wrap",
        }}
      >
        <button>New Verification Request</button>
        <button style={secondaryButtonStyle}>
          Download Certificate
        </button>
      </div>
    </div>

    <div
      style={{
        background: "rgba(255,255,255,.15)",
        padding: "24px",
        borderRadius: "18px",
        minWidth: "260px",
        backdropFilter: "blur(8px)",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          color: "white",
        }}
      >
        Account Summary
      </h3>
      <p>✔ Digital Verification Enabled</p>
      <p>✔ QR Certificates Available</p>
      <p>✔ Third-Party Verification Supported</p>
      <p>✔ Average Processing: 2 Business Days</p>
    </div>
  </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          {[
            {
              title: "Pending Requests",
              value: "2",
              color: "#2563EB",
            },
            {
              title: "Completed",
              value: "18",
              color: "#16A34A",
            },
            {
              title: "QR Certificates",
              value: "12",
              color: "#D97706",
            },
            {
              title: "Average Processing",
              value: "2 Days",
              color: "#DC2626",
            },
          ].map((card) => (
            <div
              key={card.title}
              style={{
                background: "#FFFFFF",
                borderRadius: "18px",
                padding: "24px",
                border: `1px solid ${COLORS.border}`,
                boxShadow:
                  "0 12px 30px rgba(15,23,42,.05)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: COLORS.textSecondary,
                  fontWeight: 600,
                }}
              >
                {card.title}
              </p>

              <h2
                style={{
                  color: card.color,
                  marginTop: "12px",
                  marginBottom: 0,
                }}
              >
                {card.value}
              </h2>
            </div>
          ))}
        </div>

        <SectionCard
      title="Request Employment Verification"
    >
      <p
        style={{
          color: COLORS.textSecondary,
          marginBottom: "24px",
          lineHeight: 1.7,
        }}
      >
        Start a new employment verification request
        for background verification, higher education,
        visa processing or financial documentation.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "18px",
        }}
      >
        <div>
          <label>Verification Type</label>
          <select
            style={{
              width: "100%",
              marginTop: "8px",
            }}
          >
            <option>Employment Verification</option>
            <option>Background Verification</option>
            <option>Higher Education</option>
            <option>Visa Processing</option>
            <option>Financial Verification</option>
          </select>
        </div>

        <div>
          <label>Organisation</label>
          <input
            placeholder="Company Name"
            style={{
              width: "100%",
              marginTop: "8px",
            }}
          />
        </div>

        <div>
          <label>Purpose</label>
          <input
            placeholder="Purpose"
            style={{
              width: "100%",
              marginTop: "8px",
            }}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: "24px",
        }}
      >
        <button>
          Submit Verification Request
        </button>
      </div>
    </SectionCard>

      <SectionCard title="Verification Requests">
        <div style={{ marginBottom: "20px" }}>
          <button>New Verification Request</button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Company</th>
                <th>Date</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td style={{ fontWeight: 800 }}>{req.id}</td>
                  <td>{req.company}</td>
                  <td>{req.date}</td>
                  <td>{req.type}</td>

                  <td>
                    <StatusBadge status={req.status} />
                  </td>

                  <td>
                    <button style={secondaryButtonStyle}>Track</button>
                    <button>Download Letter</button>
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
