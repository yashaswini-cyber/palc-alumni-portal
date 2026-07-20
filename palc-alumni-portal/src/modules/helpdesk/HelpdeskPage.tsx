import { useRef, useState } from "react";
import HeroBanner from "../../shared/components/HeroBanner";
import PrimaryButton from "../../shared/components/PrimaryButton";

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
    </div>
  );
}