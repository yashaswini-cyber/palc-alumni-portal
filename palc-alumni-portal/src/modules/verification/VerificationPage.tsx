import PageHeader from "../../shared/components/PageHeader";
import HeroBanner from "../../shared/components/HeroBanner";
import StatsCard from "../../shared/components/StatsCard";
import PrimaryButton from "../../shared/components/PrimaryButton";
import SectionCard from "../../shared/components/SectionCard";
import StatusBadge from "../../shared/components/StatusBadge";
import { COLORS } from "../../shared/theme/colors";

const requests = [
  {
    id: "VR001",
    company: "Microsoft",
    requester: "HR Team",
    date: "10 Jun 2026",
    type: "Employment Verification",
    stage: "HR Review",
    status: "Approved",
  },
  {
    id: "VR002",
    company: "Google",
    requester: "Background Verification Agency",
    date: "18 Jun 2026",
    type: "Background Verification",
    stage: "Processing",
    status: "Pending",
  },
  {
    id: "VR003",
    company: "Amazon",
    requester: "Recruitment Team",
    date: "20 Jun 2026",
    type: "Employment Verification",
    stage: "Completed",
    status: "Approved",
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
      
      <HeroBanner
        badge="Digital Verification Services"
        title="Employment Verification Center"
        subtitle="Submit employment verification requests, download QR-enabled employment certificates, securely share verification records with authorised organisations and track the complete verification lifecycle."
        actions={[
          {
            title: "New Verification Request",
            onClick: () => {},
          },
          {
            title: "Download Certificate",
            onClick: () => {},
          },
          {
            title: "Verification History",
            onClick: () => {},
          },
        ]}
        pills={[
          {
            title: "Digital Verification",
            value: "Enabled",
            color: "#16A34A",
          },
          {
            title: "QR Certificates",
            value: "12 Available",
            color: "#2563EB",
          },
          {
            title: "Processing Time",
            value: "2 Days",
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
              Verification Summary
            </h3>
            {[
              ["Pending Requests", "2"],
              ["Completed", "18"],
              ["QR Certificates", "12"],
              ["Avg. Processing", "2 Days"],
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
      
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        <StatsCard
          title="Pending Requests"
          value="2"
          subtitle="Awaiting HR Review"
          accentColor="#2563EB"
        />

        <StatsCard
          title="Completed"
          value="18"
          subtitle="Successfully Verified"
          accentColor="#16A34A"
        />

        <StatsCard
          title="QR Certificates"
          value="12"
          subtitle="Ready to Download"
          accentColor="#D97706"
        />

        <StatsCard
          title="Average Processing"
          value="2 Days"
          subtitle="Current Turnaround"
          accentColor="#DC2626"
        />
      </div>

      <SectionCard title="Request Employment Verification">
        <p
          style={{
            color: COLORS.textSecondary,
            marginBottom: "24px",
            lineHeight: 1.7,
          }}
        >
          Start a new employment verification request for background verification, higher education, visa processing or financial documentation.
        </p>
        
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
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
          <PrimaryButton>Submit Verification Request</PrimaryButton>
        </div>
      </SectionCard>

      <SectionCard title="Verification Requests">
        <div style={{ marginBottom: "20px" }}>
          <PrimaryButton>New Verification Request</PrimaryButton>
        </div>

        <div style={{ overflowX: "auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            <input
              placeholder="Search verification requests..."
              style={{
                width: "320px",
                padding: "12px 16px",
                borderRadius: "10px",
                border: `1px solid ${COLORS.border}`,
                outline: "none",
              }}
            />

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
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
          
          <table>
            <thead
              style={{
                background: "#F8FAFC",
              }}
            >
              <tr>
                <th>Request ID</th>
                <th>Requested By</th>
                <th>Company</th>
                <th>Verification Type</th>
                <th>Submitted</th>
                <th>Current Stage</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((req) => (
                <tr
                  key={req.id}
                  style={{
                    borderBottom: `1px solid ${COLORS.border}`,
                  }}
                >
                  <td>{req.id}</td>
                  <td>{req.requester}</td>
                  <td>{req.company}</td>
                  <td>{req.type}</td>
                  <td>{req.date}</td>
                  <td>{req.stage}</td>
                  <td>
                    <StatusBadge status={req.status} />
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap",
                      }}
                    >
                      <button style={secondaryButtonStyle}>View Details</button>
                      <button style={secondaryButtonStyle}>Track</button>
                      <button>Download</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: "20px",
              marginTop: "28px",
            }}
          >
            {[
              {
                title: "Approved",
                value: "18",
                color: "#16A34A",
              },
              {
                title: "Pending",
                value: "2",
                color: "#2563EB",
              },
              {
                title: "Rejected",
                value: "1",
                color: "#DC2626",
              },
              {
                title: "Average Processing",
                value: "2 Days",
                color: "#D97706",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: "#F8FAFC",
                  borderRadius: "16px",
                  padding: "18px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: COLORS.textSecondary,
                  }}
                >
                  {item.title}
                </p>

                <h2
                  style={{
                    color: item.color,
                    marginTop: "10px",
                    marginBottom: 0,
                  }}
                >
                  {item.value}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}