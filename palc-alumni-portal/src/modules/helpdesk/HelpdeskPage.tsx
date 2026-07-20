import { useRef, useState } from "react";
import HeroBanner from "../../shared/components/HeroBanner";
import PrimaryButton from "../../shared/components/PrimaryButton";
import StatsCard from "../../shared/components/StatsCard";

const tickets = [
  {
    id: "TKT001",
    subject: "Unable to access VPN",
    category: "IT",
    priority: "High",
    status: "Open",
    createdOn: "08 Jul 2026",
    updatedOn: "08 Jul 2026",
  },
  {
    id: "TKT002",
    subject: "Payslip not available",
    category: "Payroll",
    priority: "Medium",
    status: "Resolved",
    createdOn: "05 Jul 2026",
    updatedOn: "07 Jul 2026",
  },
  {
    id: "TKT003",
    subject: "Email password reset",
    category: "IT",
    priority: "Low",
    status: "In Progress",
    createdOn: "04 Jul 2026",
    updatedOn: "06 Jul 2026",
  }
];
const helpdeskStats = {
  totalTickets: tickets.length,
  openTickets: tickets.filter(ticket => ticket.status === "Open").length,
  inProgressTickets: tickets.filter(ticket => ticket.status === "In Progress").length,
  resolvedTickets: tickets.filter(ticket => ticket.status === "Resolved").length,
};

const statsCards = [
  {
    title: "Total Tickets",
    value: helpdeskStats.totalTickets.toString(),
    subtitle: "Support requests submitted",
    accentColor: "#2563EB",
  },
  {
    title: "Open Tickets",
    value: helpdeskStats.openTickets.toString(),
    subtitle: "Awaiting resolution",
    accentColor: "#D97706",
  },
  {
    title: "In Progress",
    value: helpdeskStats.inProgressTickets.toString(),
    subtitle: "Currently being worked on",
    accentColor: "#0891B2",
  },
  {
    title: "Resolved",
    value: helpdeskStats.resolvedTickets.toString(),
    subtitle: "Successfully completed",
    accentColor: "#16A34A",
  },
];

export default function HelpdeskPage() {
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const ticketsSectionRef = useRef<HTMLDivElement>(null);

  const openCreateTicket = () => setShowCreateTicket(true);

  const scrollToTickets = () => {
    ticketsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <HeroBanner
        badge="Employee Helpdesk"
        title="Support When You Need It"
        subtitle="Submit support requests, track ticket progress, communicate with support teams, and quickly find answers through the knowledge base—all from one centralized workspace."
        actions={[
          { title: "Create Ticket", onClick: openCreateTicket },
          { title: "View My Tickets", onClick: scrollToTickets },
        ]}
        pills={[
          { title: "Response SLA", value: "< 24 Hours", color: "#22C55E" },
          { title: "Support", value: "IT • HR • Payroll", color: "#3B82F6" },
        ]}
        summaryCard={
          <>
            <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: ".06em" }}>
              Support Overview
            </p>

            <h3 style={{ margin: "10px 0 6px", fontSize: "36px", fontWeight: 800 }}>96%</h3>

            <p style={{ margin: 0, color: "#64748B", lineHeight: 1.6 }}>
              First-response SLA achieved across all employee support requests this month.
            </p>

            <div style={{ marginTop: "22px", paddingTop: "18px", borderTop: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "13px", color: "#64748B" }}>Avg. Resolution</div>
                <div style={{ fontSize: "18px", fontWeight: 700 }}>18 hrs</div>
              </div>

              <div>
                <div style={{ fontSize: "13px", color: "#64748B" }}>Satisfaction</div>
                <div style={{ fontSize: "18px", fontWeight: 700 }}>4.9 / 5</div>
              </div>
            </div>
          </>
        }
      />
     <div style={{display: "grid",gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",gap: "20px", }}
       >{statsCards.map((card) => (
          <StatsCard
            key={card.title}
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
            accentColor={card.accentColor}
          />
        ))}
      </div>
    </div>
  );
}