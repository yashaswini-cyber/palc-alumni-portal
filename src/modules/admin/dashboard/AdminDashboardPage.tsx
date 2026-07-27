import QuickActionCard from "../../../shared/components/QuickActionCard";
import PageHeader from "../../../shared/components/PageHeader";
import StatusBadge from "../../../shared/components/StatusBadge";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../../shared/theme/colors";
import StatsCard from "../../../shared/components/StatsCard";
import HeroBanner from "../../../shared/components/HeroBanner";

type MetricItem = { title: string; value: string; subtitle: string; accentColor: string; };
type AutomationItem = { name: string; owner: string; status: string; nextRun: string; };
type QueueItem = { id: string; request: string; owner: string; priority: string; status: string; sla: string; };
type TrendItem = { label: string; value: string; width: string; };
type PendingWorkItem = { title: string; count: string; status: "High" | "Medium" | "Low"; path: string; };

const cardStyle = { background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: "18px", padding: "24px", boxShadow: "0 18px 42px rgba(15, 23, 42, 0.07)" };
const sectionTitleStyle = { margin: "0 0 6px", color: COLORS.text, fontSize: "22px", lineHeight: 1.2, fontWeight: 850 };
const mutedTextStyle = { margin: 0, color: COLORS.textSecondary, fontSize: "14px", lineHeight: 1.6 };

const metrics: MetricItem[] = [
  { title: "Active Alumni", value: "286", subtitle: "75% Portal Activation", accentColor: "#2563EB" },
  { title: "Portal Logins", value: "1.4K", subtitle: "Last 30 Days", accentColor: "#16A34A" },
  { title: "Verification Requests", value: "312", subtitle: "Pending & Completed", accentColor: "#D97706" },
  { title: "Document Downloads", value: "679", subtitle: "Self-Service Access", accentColor: "#DC2626" },
  { title: "Referrals", value: "28", subtitle: "30% Participation", accentColor: "#7C3AED" },
  { title: "Boomerang Hiring", value: "8", subtitle: "Rehire Pipeline", accentColor: "#0891B2" },
];

const pendingWork: PendingWorkItem[] = [
  { title: "Employment Verifications", count: "12", status: "High", path: "/admin/verification" },
  { title: "Document Requests", count: "8", status: "High", path: "/admin/documents" },
  { title: "Helpdesk Tickets", count: "4", status: "Medium", path: "/helpdesk" },
  { title: "Account Activations", count: "3", status: "Low", path: "/admin/alumni" },
  { title: "Referral Reviews", count: "5", status: "Medium", path: "/referrals" },
];

const operationalSnapshot = [
  "86% documents downloaded through self-service",
  "90% employment verification automation achieved",
  "75% alumni portal activation rate",
  "14 referrals received this month",
  "3 alumni accounts expire within the next 30 days",
];

const automations: AutomationItem[] = [
  { name: "Generate exit document package", owner: "HR Operations", status: "Active", nextRun: "On separation approval" },
  { name: "Upload exit documents to archive", owner: "Document Admin", status: "Active", nextRun: "Every 2 hours" },
  { name: "Send alumni login credentials", owner: "IT Administrator", status: "Active", nextRun: "Daily at 09:00" },
  { name: "Account expiry notifications", owner: "Compliance", status: "Pending", nextRun: "30/15/7 days before expiry" },
  { name: "Anniversary greetings", owner: "Engagement Team", status: "Active", nextRun: "Daily at 10:00" },
];

const serviceQueue: QueueItem[] = [
  { id: "SR-1042", request: "Missing Form 16 document", owner: "Finance", priority: "High", status: "Open", sla: "4h remaining" },
  { id: "VR-991", request: "Third-party employment verification", owner: "HR Ops", priority: "Medium", status: "Pending", sla: "1d remaining" },
  { id: "DOC-782", request: "Relieving letter version update", owner: "Document Admin", priority: "Medium", status: "Open", sla: "2d remaining" },
  { id: "PF-318", request: "PF transfer assistance", owner: "Finance", priority: "Low", status: "Closed", sla: "Completed" },
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

const quickActions = [
  { title: "Generate Documents", description: "Create employment documents for alumni.", route: "/admin/documents" },
  { title: "Employment Verification", description: "Review pending verification requests.", route: "/admin/verification" },
  { title: "Manage Alumni", description: "Access alumni records and profiles.", route: "/admin/alumni" },
  { title: "Create Event", description: "Publish alumni events and invitations.", route: "/admin/events" },
  { title: "Broadcast Announcement", description: "Share updates with all alumni.", route: "/admin" },
];

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const scrollToSection = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", paddingBottom: "44px" }}>
      <PageHeader title="Admin Dashboard" subtitle="Monitor alumni operations, document self-service, employment verification, referrals, automations and compliance readiness." />
      <HeroBanner
        badge="HR Operations Command Center"
        title="Manage the Complete PalC Alumni Ecosystem"
        subtitle="Monitor alumni operations, document requests, employment verification, referrals, portal engagement and HR service performance from a single operational dashboard."
        actions={[
          { title: "View Pending Requests", onClick: () => scrollToSection("service-queue") },
          { title: "Automation Monitor", onClick: () => scrollToSection("automation-monitor") },
          { title: "View Reports", onClick: () => scrollToSection("success-metrics") },
        ]}
        pills={[
          { title: "Active Alumni", value: "286", color: "#16A34A" },
          { title: "Pending Requests", value: "24 Open", color: "#2563EB" },
          { title: "Automation", value: "90% Active", color: "#D97706" },
        ]}
        summaryCard={
          <>
            <h3 style={{ marginTop: 0, marginBottom: "20px", fontSize: "20px", color: COLORS.text }}>HR Operations Overview</h3>
            {[
              ["Employment Verification", "12 Pending"],
              ["Document Requests", "8 Open"],
              ["Portal Health", "Operational"],
              ["Compliance Status", "Compliant"],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                <span style={{ color: COLORS.textSecondary, fontSize: "14px" }}>{label}</span>
                <strong style={{ color: COLORS.text, fontSize: "14px" }}>{value}</strong>
              </div>
            ))}
          </>
        }
      />

      <section style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(220px, 1fr))", gap: "20px" }}>
            {metrics.map((metric) => (
              <StatsCard key={metric.title} title={metric.title} value={metric.value} subtitle={metric.subtitle} accentColor={metric.accentColor} />
            ))}
          </div>

          <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: "18px", padding: "22px 24px", boxShadow: "0 18px 42px rgba(15,23,42,0.07)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "22px", color: COLORS.text, fontWeight: 850 }}>Operational Snapshot</h3>
                <p style={{ margin: "6px 0 0", fontSize: "14px", color: COLORS.textSecondary }}>Current operational performance across the alumni platform.</p>
              </div>
              <span style={{ fontSize: "12px", color: COLORS.textSecondary, fontWeight: 600 }}>Updated 5 mins ago</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 28px" }}>
              {operationalSnapshot.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "999px", background: COLORS.primary, flexShrink: 0 }} />
                  <span style={{ color: COLORS.text, fontSize: "14px", lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: "18px", padding: "24px", boxShadow: "0 18px 42px rgba(15,23,42,0.07)", display: "flex", flexDirection: "column", gap: "18px", height: "100%" }}>
          <div>
            <h2 style={{ margin: 0, color: COLORS.text, fontSize: "22px", fontWeight: 850 }}>Today's Pending Work</h2>
            <p style={{ marginTop: "6px", color: COLORS.textSecondary, fontSize: "14px" }}>Review and complete high priority HR activities.</p>
          </div>

          {pendingWork.map((item) => (
            <div
              key={item.title}
              onClick={() => navigate(item.path)}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0px)"; e.currentTarget.style.boxShadow = "none"; }}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", border: `1px solid ${COLORS.border}`, borderRadius: "14px", cursor: "pointer", transition: "0.2s", background: "#FBFDFF" }}
            >
              <div>
                <div style={{ fontWeight: 700, color: COLORS.text, fontSize: "14px" }}>{item.title}</div>
                <div style={{ marginTop: "4px", color: COLORS.textSecondary, fontSize: "13px" }}>{item.count} Pending</div>
              </div>
              <StatusBadge status={item.status} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 style={sectionTitleStyle}>Quick Actions</h2>
        <p style={{ ...mutedTextStyle, marginBottom: "18px" }}>Frequently used HR operations for managing the alumni portal.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "16px" }}>
          {quickActions.map((item) => (
            <QuickActionCard key={item.title} title={item.title} subtitle={item.description} onClick={() => navigate(item.route)} />
          ))}
        </div>
      </section>

      <section id="service-queue" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.35fr) minmax(360px, 0.65fr)", gap: "24px" }}>
        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>Service Request & Verification Queue</h2>
          <p style={mutedTextStyle}>Operational workload across HR, finance, document administration and verification support.</p>
          <div style={{ overflowX: "auto", marginTop: "22px" }}>
            <table>
              <thead>
                <tr>
                  <th>Request ID</th><th>Request</th><th>Owner</th><th>Priority</th><th>Status</th><th>SLA</th>
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
          <p style={mutedTextStyle}>Self-service usage across the most requested employment documents.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginTop: "24px" }}>
            {downloadTrends.map((trend) => (
              <div key={trend.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <strong style={{ fontSize: "14px" }}>{trend.label}</strong>
                  <span style={{ color: COLORS.textSecondary, fontSize: "13px" }}>{trend.value}</span>
                </div>
                <div style={{ height: "9px", borderRadius: "999px", background: "#EFF6FF" }}>
                  <div style={{ width: trend.width, height: "100%", borderRadius: "999px", background: "linear-gradient(90deg, #0F6CBD, #3B82F6)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div id="automation-monitor" style={cardStyle}>
          <h2 style={sectionTitleStyle}>Automation Monitor</h2>
          <p style={mutedTextStyle}>Automated actions required by the PRD for document generation, account setup and alumni engagement.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "22px" }}>
            {automations.map((automation) => (
              <div key={automation.name} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: "18px", alignItems: "center", padding: "16px", border: `1px solid ${COLORS.border}`, borderRadius: "16px", background: "#FBFDFF" }}>
                <div>
                  <strong style={{ display: "block", color: COLORS.text, fontSize: "14px" }}>{automation.name}</strong>
                  <p style={{ margin: "5px 0 0", color: COLORS.textSecondary, fontSize: "13px" }}>{automation.owner} - {automation.nextRun}</p>
                </div>
                <StatusBadge status={automation.status} />
              </div>
            ))}
          </div>
        </div>

        <div id="success-metrics" style={cardStyle}>
          <h2 style={sectionTitleStyle}>Success Metrics</h2>
          <p style={mutedTextStyle}>KPI progress against the PRD targets for adoption, HR efficiency and verification automation.</p>
          <div style={{ overflowX: "auto", marginTop: "22px" }}>
            <table>
              <thead>
                <tr>
                  <th>KPI</th><th>Target</th><th>Actual</th><th>Status</th>
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