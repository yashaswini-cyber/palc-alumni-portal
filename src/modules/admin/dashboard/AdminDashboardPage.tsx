import DashboardCard from "../../../shared/components/DashboardCard";
import PageHeader from "../../../shared/components/PageHeader";
import StatusBadge from "../../../shared/components/StatusBadge";
import { COLORS } from "../../../shared/theme/colors";

type MetricItem = {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
};

type AutomationItem = {
  name: string;
  owner: string;
  status: string;
  nextRun: string;
};

type QueueItem = {
  id: string;
  request: string;
  owner: string;
  priority: string;
  status: string;
  sla: string;
};

type TrendItem = {
  label: string;
  value: string;
  width: string;
};

const cardStyle = {
  background: COLORS.surface,
  border: `1px solid ${COLORS.border}`,
  borderRadius: "18px",
  padding: "24px",
  boxShadow: "0 18px 42px rgba(15, 23, 42, 0.07)",
};

const sectionTitleStyle = {
  margin: "0 0 6px",
  color: COLORS.text,
  fontSize: "22px",
  lineHeight: 1.2,
  fontWeight: 850,
};

const mutedTextStyle = {
  margin: 0,
  color: COLORS.textSecondary,
  fontSize: "14px",
  lineHeight: 1.6,
};

const buttonStyle = {
  border: "none",
  borderRadius: "12px",
  background: COLORS.primary,
  color: "#FFFFFF",
  padding: "10px 16px",
  fontSize: "13px",
  fontWeight: 800,
  cursor: "pointer",
  fontFamily: "inherit",
  boxShadow: "0 10px 20px rgba(37, 99, 235, 0.20)",
};

const secondaryButtonStyle = {
  ...buttonStyle,
  background: "#EFF6FF",
  color: COLORS.primary,
  boxShadow: "none",
  border: `1px solid ${COLORS.border}`,
};

const metrics: MetricItem[] = [
  {
    title: "Active Alumni",
    value: "4,286",
    subtitle: "75% portal activation",
    icon: "AA",
  },
  {
    title: "Portal Logins",
    value: "18.4K",
    subtitle: "Last 30 days",
    icon: "PL",
  },
  {
    title: "Downloads",
    value: "9,742",
    subtitle: "Document self-service",
    icon: "DD",
  },
  {
    title: "Verifications",
    value: "1,126",
    subtitle: "90% automated",
    icon: "VR",
  },
  {
    title: "Referrals",
    value: "342",
    subtitle: "30% participation target",
    icon: "RF",
  },
  {
    title: "Rehire Pipeline",
    value: "64",
    subtitle: "10% annual hiring target",
    icon: "RH",
  },
];

const automations: AutomationItem[] = [
  {
    name: "Generate exit document package",
    owner: "HR Operations",
    status: "Active",
    nextRun: "On separation approval",
  },
  {
    name: "Upload exit documents to archive",
    owner: "Document Admin",
    status: "Active",
    nextRun: "Every 2 hours",
  },
  {
    name: "Send alumni login credentials",
    owner: "IT Administrator",
    status: "Active",
    nextRun: "Daily at 09:00",
  },
  {
    name: "Account expiry notifications",
    owner: "Compliance",
    status: "Pending",
    nextRun: "30/15/7 days before expiry",
  },
  {
    name: "Anniversary greetings",
    owner: "Engagement Team",
    status: "Active",
    nextRun: "Daily at 10:00",
  },
];

const serviceQueue: QueueItem[] = [
  {
    id: "SR-1042",
    request: "Missing Form 16 document",
    owner: "Finance",
    priority: "High",
    status: "Open",
    sla: "4h remaining",
  },
  {
    id: "VR-991",
    request: "Third-party employment verification",
    owner: "HR Ops",
    priority: "Medium",
    status: "Pending",
    sla: "1d remaining",
  },
  {
    id: "DOC-782",
    request: "Relieving letter version update",
    owner: "Document Admin",
    priority: "Medium",
    status: "Open",
    sla: "2d remaining",
  },
  {
    id: "PF-318",
    request: "PF transfer assistance",
    owner: "Finance",
    priority: "Low",
    status: "Closed",
    sla: "Completed",
  },
];

const downloadTrends: TrendItem[] = [
  { label: "Experience Certificates", value: "2,840", width: "88%" },
  { label: "Relieving Letters", value: "2,420", width: "76%" },
  { label: "Payslips", value: "1,930", width: "62%" },
  { label: "Form 16", value: "1,164", width: "42%" },
  { label: "F&F Statements", value: "934", width: "34%" },
];

const successMetrics = [
  { kpi: "HR ticket reduction", target: "80%", actual: "72%", status: "Pending" },
  { kpi: "Document self-service adoption", target: "90%", actual: "86%", status: "Pending" },
  { kpi: "Alumni portal activation", target: "75%", actual: "75%", status: "Approved" },
  { kpi: "Referral participation", target: "30%", actual: "28%", status: "Pending" },
  { kpi: "Employment verification automation", target: "90%", actual: "90%", status: "Approved" },
];

const complianceItems = [
  "Role-based access control enabled",
  "MFA enforced for admin users",
  "Document storage encryption active",
  "Audit trails retained for compliance",
  "Data retention policy configured",
  "Consent management reviewed",
];

function Glyph({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-grid",
        placeItems: "center",
        width: "22px",
        height: "22px",
        fontSize: "11px",
        lineHeight: 1,
        fontWeight: 850,
      }}
    >
      {label}
    </span>
  );
}

export default function AdminDashboardPage() {
  // TODO: Replace representative admin dashboard data with API responses from HRIS, document, verification, referral, and audit services.
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        paddingBottom: "44px",
      }}
    >
      <PageHeader
        title="Admin Dashboard"
        subtitle="Monitor alumni operations, document self-service, employment verification, referrals, automations and compliance readiness."
      />

      <section
        style={{
          minHeight: "260px",
          borderRadius: "24px",
          overflow: "hidden",
          background:
            "linear-gradient(120deg, #0A1B3D 0%, #123A7A 42%, #2563EB 78%, #38BDF8 100%)",
          color: "#FFFFFF",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.45fr) minmax(320px, 0.55fr)",
          alignItems: "stretch",
          boxShadow: "0 24px 60px rgba(15, 27, 61, 0.28)",
        }}
      >
        <div style={{ padding: "38px 42px" }}>
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              fontWeight: 850,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              opacity: 0.86,
            }}
          >
            HR Operations Command Center
          </p>

          <h2
            style={{
              margin: "14px 0 0",
              maxWidth: "760px",
              color: "#FFFFFF",
              fontSize: "40px",
              lineHeight: 1.08,
              fontWeight: 850,
            }}
          >
            Keep alumni services measurable, compliant and responsive.
          </h2>

          <p
            style={{
              margin: "16px 0 0",
              maxWidth: "720px",
              color: "rgba(255,255,255,0.88)",
              fontSize: "15px",
              lineHeight: 1.7,
            }}
          >
            Track the PRD success metrics across document access, verification
            automation, referral participation, rehire conversion and HR ticket
            reduction.
          </p>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
        }}
      >
        {metrics.map((metric) => (
          <DashboardCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            subtitle={metric.subtitle}
            icon={<Glyph label={metric.icon} />}
          />
        ))}
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.35fr) minmax(360px, 0.65fr)",
          gap: "24px",
        }}
      >
        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>Service Request & Verification Queue</h2>
          <p style={mutedTextStyle}>
            Operational workload across HR, finance, document administration and verification support.
          </p>

          <div style={{ overflowX: "auto", marginTop: "22px" }}>
            <table>
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Request</th>
                  <th>Owner</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>SLA</th>
                </tr>
              </thead>
              <tbody>
                {serviceQueue.map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 800 }}>{item.id}</td>
                    <td>{item.request}</td>
                    <td>{item.owner}</td>
                    <td><StatusBadge status={item.priority} /></td>
                    <td><StatusBadge status={item.status} /></td>
                    <td>{item.sla}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>Document Download Trends</h2>
          <p style={mutedTextStyle}>
            Self-service usage across the most requested employment documents.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginTop: "24px" }}>
            {downloadTrends.map((trend) => (
              <div key={trend.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <strong style={{ fontSize: "14px" }}>{trend.label}</strong>
                  <span style={{ color: COLORS.textSecondary, fontSize: "13px" }}>{trend.value}</span>
                </div>
                <div style={{ height: "9px", borderRadius: "999px", background: "#EFF6FF" }}>
                  <div
                    style={{
                      width: trend.width,
                      height: "100%",
                      borderRadius: "999px",
                      background: "linear-gradient(90deg, #0F6CBD, #3B82F6)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>Automation Monitor</h2>
          <p style={mutedTextStyle}>
            Automated actions required by the PRD for document generation, account setup and alumni engagement.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "22px" }}>
            {automations.map((automation) => (
              <div
                key={automation.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) auto",
                  gap: "18px",
                  alignItems: "center",
                  padding: "16px",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: "16px",
                  background: "#FBFDFF",
                }}
              >
                <div>
                  <strong style={{ display: "block", color: COLORS.text, fontSize: "14px" }}>
                    {automation.name}
                  </strong>
                  <p style={{ margin: "5px 0 0", color: COLORS.textSecondary, fontSize: "13px" }}>
                    {automation.owner} - {automation.nextRun}
                  </p>
                </div>
                <StatusBadge status={automation.status} />
              </div>
            ))}
          </div>
        </div>

        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>Success Metrics</h2>
          <p style={mutedTextStyle}>
            KPI progress against the PRD targets for adoption, HR efficiency and verification automation.
          </p>

          <div style={{ overflowX: "auto", marginTop: "22px" }}>
            <table>
              <thead>
                <tr>
                  <th>KPI</th>
                  <th>Target</th>
                  <th>Actual</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {successMetrics.map((metric) => (
                  <tr key={metric.kpi}>
                    <td style={{ fontWeight: 800 }}>{metric.kpi}</td>
                    <td>{metric.target}</td>
                    <td>{metric.actual}</td>
                    <td><StatusBadge status={metric.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}