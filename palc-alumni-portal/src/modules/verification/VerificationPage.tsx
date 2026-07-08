import PageHeader from "../../shared/components/PageHeader";
import HeroBanner from "../../shared/components/HeroBanner";
import StatsCard from "../../shared/components/StatsCard";
import PrimaryButton from "../../shared/components/PrimaryButton";
import InfoCard from "../../shared/components/InfoCard";
import SectionCard from "../../shared/components/SectionCard";
import StatusBadge from "../../shared/components/StatusBadge";
import { COLORS } from "../../shared/theme/colors";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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

    {/* Verification Requests*/}
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
                      <PrimaryButton>Download</PrimaryButton>
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

    {/* Digital Employment Certificates*/}
      <SectionCard
        title="Digital Employment Certificates"
        subtitle="Access digitally signed employment documents with QR-based verification."
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "20px",
          }}
        >
          <InfoCard
            title="Employment Certificate"
            subtitle="Digitally signed certificate with QR verification."
            action ={<PrimaryButton> Download PDF</PrimaryButton>}
          />
          <InfoCard
            title="Experience Letter"
            subtitle="Secure employment experience document."
            action ={<PrimaryButton> Preview</PrimaryButton>}
          />
          <InfoCard
            title="Relieving Letter"
            subtitle="Official relieving confirmation with verification ID."
            action ={<PrimaryButton> Download </PrimaryButton>}
          />
        </div>
      </SectionCard>  

{/* Third-Party Verification */}
          <SectionCard
  title="Third-Party Verification"
  subtitle="Allow authorised organisations to verify your employment securely."
>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "24px",
      alignItems: "center",
    }}
  >
    <div>
      <ul
        style={{
          lineHeight: 2,
          color: COLORS.textSecondary,
          paddingLeft: "20px",
        }}
      >
        <li>Verification through secure Verification ID</li>
        <li>QR-enabled certificate validation</li>
        <li>Authorised HR verification workflow</li>
        <li>Tamper-resistant digital documents</li>
      </ul>
    </div>

    <div
      style={{
        background: "#F8FAFC",
        borderRadius: "18px",
        padding: "20px",
        border: `1px solid ${COLORS.border}`,
        textAlign: "center",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Verification ID</h3>

      <h2
        style={{
          color: COLORS.primary,
          letterSpacing: "2px",
        }}
      >
        PALC-VER-2026-001
      </h2>

      <PrimaryButton>Copy Verification ID</PrimaryButton>
    </div>
  </div>
</SectionCard>

 {/* Certificate Security*/}
        <SectionCard
  title="Certificate Security"
  subtitle="Every verification document generated by the portal includes enterprise-grade security."
>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
      gap: "18px",
    }}
  >
    {[
      "Digital Signature",
      "QR Verification",
      "Tamper Protection",
      "Unique Verification ID",
    ].map((item) => (
      <InfoCard
        key={item}
        icon="🔒"
        title={item}
        subtitle="Enabled for all generated certificates."
      />
    ))}
  </div>
</SectionCard>

{/* Verification Process*/}
<SectionCard
  title="Verification Process"
  subtitle="Understand how every verification request is processed from submission to completion."
>
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "18px",
    }}
  >
    {[
      {
        title: "Request Submitted",
        description:
          "Your verification request has been successfully submitted through the Alumni Portal.",
      },
      {
        title: "HR Review",
        description:
          "The HR team validates your employment records and supporting information.",
      },
      {
        title: "Verification Generation",
        description:
          "A digitally signed employment verification certificate is generated.",
      },
      {
        title: "Employer Verification",
        description:
          "The requesting organisation can verify the certificate using the Verification ID or QR Code.",
      },
      {
        title: "Completed",
        description:
          "Verification is completed and remains available in your verification history.",
      },
    ].map((step, index) => (
      <div
        key={step.title}
        style={{
          display: "flex",
          gap: "18px",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            background: COLORS.primary,
            marginTop: "4px",
            flexShrink: 0,
          }}
        />

        <div
          style={{
            flex: 1,
            paddingBottom: "18px",
            borderBottom:
              index !== 4
                ? `1px solid ${COLORS.border}`
                : "none",
          }}
        >
          <h4
            style={{
              margin: 0,
              color: COLORS.text,
            }}
          >
            {step.title}
          </h4>

          <p
            style={{
              marginTop: "8px",
              color: COLORS.textSecondary,
              lineHeight: 1.7,
            }}
          >
            {step.description}
          </p>
        </div>
      </div>
    ))}
  </div>
</SectionCard>

{/* Verification Guidelines*/}
<SectionCard
  title="Verification Guidelines"
  subtitle="Important information before requesting employment verification."
>
  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(280px,1fr))",
      gap: "24px",
    }}
  >
    {[
      {
        title: "Who can request verification?",
        text:
          "Employment verification can be requested for recruitment, higher education, visa processing, financial institutions or any authorised verification purpose.",
      },
      {
        title: "Processing Time",
        text:
          "Most requests are completed within two business days. Additional verification may require further documentation.",
      },
      {
        title: "Verification Methods",
        text:
          "Verification is supported through digitally signed certificates, Verification ID and QR validation.",
      },
      {
        title: "Privacy",
        text:
          "Verification information is shared only with authorised organisations after completing the required verification workflow.",
      },
    ].map((item) => (
      <div
        key={item.title}
        style={{
          background: "#F8FAFC",
          border: `1px solid ${COLORS.border}`,
          borderRadius: "16px",
          padding: "22px",
        }}
      >
        <h4
          style={{
            marginTop: 0,
            color: COLORS.text,
          }}
        >
          {item.title}
        </h4>

        <p
          style={{
            color: COLORS.textSecondary,
            lineHeight: 1.7,
            marginBottom: 0,
          }}
        >
          {item.text}
        </p>
      </div>
    ))}
  </div>
</SectionCard>

{/* Need Assistance? */}
<SectionCard
  title="Need Assistance?"
  subtitle="Our Alumni Support Team is available to assist with verification-related queries."
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "20px",
    }}
  >
    <div
      style={{
        maxWidth: "650px",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: "10px",
          color: COLORS.text,
        }}
      >
        Verification Support
      </h3>

      <p
        style={{
          margin: 0,
          color: COLORS.textSecondary,
          lineHeight: 1.7,
        }}
      >
        If your verification request requires additional information,
        supporting documents or manual review, you can contact the
        Alumni Helpdesk. Our team will guide you through the verification
        process and provide status updates.
      </p>
    </div>

    <PrimaryButton
      onClick={() => navigate("/helpdesk")}
    >
      Contact Helpdesk
    </PrimaryButton>
  </div>
</SectionCard>
  </div>
  );
}