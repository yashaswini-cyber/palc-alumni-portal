import { useRef, useState } from "react";
import HeroBanner from "../../shared/components/HeroBanner";
import PrimaryButton from "../../shared/components/PrimaryButton";
import StatsCard from "../../shared/components/StatsCard";
import { useMemo } from "react";
import SectionCard from "../../shared/components/SectionCard";
import SearchBar from "../../shared/components/SearchBar";
import StatusBadge from "../../shared/components/StatusBadge";
import { COLORS } from "../../shared/theme/colors";

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
/*Can be used to make Secondary Button later on*/
const secondaryButtonStyle = {
  padding: "10px 18px",
  borderRadius: "10px",
  border: "1px solid #CBD5E1",
  background: "#FFFFFF",
  color: "#1E293B",
  fontWeight: 600,
  cursor: "pointer",
  transition: ".2s",
};

const getPriorityStyle = (priority: string) => {
  switch (priority) {
    case "Critical":
      return { background: "#FEE2E2", color: "#B91C1C" };
    case "High":
      return { background: "#FEF3C7", color: "#B45309" };
    case "Medium":
      return { background: "#DBEAFE", color: "#1D4ED8" };
    default:
      return { background: "#DCFCE7", color: "#15803D" };
  }
};

export default function HelpdeskPage() {
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
const [statusFilter, setStatusFilter] = useState("All Statuses");
const [categoryFilter, setCategoryFilter] = useState("All Categories");
const [priorityFilter, setPriorityFilter] = useState("All Priorities");
const [sortBy, setSortBy] = useState("Latest");
  const ticketsSectionRef = useRef<HTMLDivElement>(null);

  const openCreateTicket = () => setShowCreateTicket(true);
  const openTicketDetails = (ticket: typeof tickets[number]) => {
  console.log(ticket);
};
  const [ticketList, setTicketList] = useState(tickets);

const reopenTicket = (ticketId: string) => {
    console.log(ticketId);
};
  const scrollToTickets = () => {
    ticketsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const filteredTickets = tickets
      .filter((ticket) => {
        const matchesSearch =
          ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
          statusFilter === "All Statuses" ||
          ticket.status === statusFilter;
        const matchesCategory =
          categoryFilter === "All Categories" ||
          ticket.category === categoryFilter;
        const matchesPriority =
          priorityFilter === "All Priorities" ||
          ticket.priority === priorityFilter;
       
        return (
          matchesSearch &&
          matchesStatus &&
          matchesCategory &&
          matchesPriority
        );
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "Oldest":
            return new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime();
          case "Priority": {
            const order = {
              Critical: 4,
              High: 3,
              Medium: 2,
              Low: 1,
            };
            return (
              (order[b.priority as keyof typeof order] || 0) -
              (order[a.priority as keyof typeof order] || 0)
            );
          }
          case "Status":
            return a.status.localeCompare(b.status);
          default:
            return new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime();
        }
      });

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
      <SectionCard title="My Support Tickets">
        <div style={{ marginBottom: "22px" }}>
          <div style={{ display: "flex", gap: "18px", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ flex: 1, minWidth: "320px" }}>
              <SearchBar value={searchQuery} placeholder="Search Ticket, ID, Name, or Category" onChange={(e) => setSearchQuery(e.target.value)}/>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: "12px 16px", borderRadius: "12px", border: `1px solid ${COLORS.border}`, minWidth: "180px", background: COLORS.surface, color: COLORS.text }}
            > <option value="All Statuses">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Waiting for User">Waiting for User</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              style={{ padding: "12px 16px", borderRadius: "12px", border: `1px solid ${COLORS.border}`, minWidth: "170px", background: COLORS.surface, color: COLORS.text }}
            > <option value="All Priorities">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ padding: "12px 16px", borderRadius: "12px", border: `1px solid ${COLORS.border}`, minWidth: "190px", background: COLORS.surface, color: COLORS.text }}
            > <option value="All Categories">All Categories</option>
              <option value="IT Support">IT Support</option>
              <option value="HR">HR</option>
              <option value="Payroll">Payroll</option>
              <option value="Documents">Documents</option>
              <option value="Employment Verification">Employment Verification</option>
              <option value="Benefits">Benefits</option>
              <option value="Accounts">Accounts</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: "12px 16px", borderRadius: "12px", border: `1px solid ${COLORS.border}`, minWidth: "170px", background: COLORS.surface, color: COLORS.text }}
            > <option value="Latest">Latest</option>
              <option value="Oldest">Oldest</option>
              <option value="Priority">Priority</option>
              <option value="Status">Status</option>
            </select>
            <PrimaryButton onClick={openCreateTicket}>
              Create Ticket
            </PrimaryButton>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: `1px solid ${COLORS.border}` }}>
                <th style={{ padding: "12px" }}>Ticket ID</th>
                <th style={{ padding: "12px" }}>Subject</th>
                <th style={{ padding: "12px" }}>Category</th>
                <th style={{ padding: "12px" }}>Priority</th>
                <th style={{ padding: "12px" }}>Status</th>
                <th style={{ padding: "12px" }}>Created</th>
                <th style={{ padding: "12px" }}>Last Updated</th>
                <th style={{ padding: "12px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: "40px", color: COLORS.textSecondary }}>
                    No support tickets match your current search or filter criteria.
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket) => (
                  <tr key={ticket.id}
                    style={{ borderBottom: `1px solid ${COLORS.border}`, transition: "background .2s ease" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#F8FAFC";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <td style={{ padding: "16px 12px" }}><span style={{ color: "#2563EB", fontWeight: 700 }}>{ticket.id} </span></td>
                    <td style={{ padding: "16px 12px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}><span style={{ fontWeight: 600 }}>{ticket.subject} </span>
                        <span style={{ fontSize: "12px", color: COLORS.textSecondary }}>
                          {ticket.category}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "12px" }}>
                      {ticket.category}
                    </td>
                    <td style={{ padding: "16px 12px" }}>
                      <span
                        style={{display: "inline-flex",alignItems: "center",justifyContent: "center",minWidth: "82px",padding: "6px 12px",borderRadius: "999px",fontSize: "12px",fontWeight: 700,
                           ...getPriorityStyle(ticket.priority),}}>{ticket.priority}
                      </span>
                    </td>
                    <td style={{ padding: "12px" }}>
                      <StatusBadge status={ticket.status} />
                    </td>
                   <td style={{ padding: "12px" }}>
                      {ticket.createdOn}
                    </td>
                    <td style={{ padding: "12px" }}>
                      {ticket.updatedOn}
                    </td>
                    <td style={{ padding: "12px" }}>
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        <button
                          style={secondaryButtonStyle}
                          onClick={() => openTicketDetails(ticket)}
                        >
                          View Details
                        </button>
                        {ticket.status === "Resolved" && (
                          <PrimaryButton onClick={() => reopenTicket(ticket.id)}>
                            Reopen
                          </PrimaryButton>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div style={{ marginTop: "20px", paddingTop: "18px", borderTop: `1px solid ${COLORS.border}`, color: COLORS.textSecondary, fontSize: "14px" }}>
            Track every support request submitted to PalC. View ticket progress, communicate with support teams, and monitor issue resolution from a single centralized workspace.
          </div>
        </div>
      </SectionCard>
    </div>
  );
}