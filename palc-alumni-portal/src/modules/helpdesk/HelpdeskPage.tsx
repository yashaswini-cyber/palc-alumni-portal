import PageHeader from "../../shared/components/PageHeader";
import SectionCard from "../../shared/components/SectionCard";
import StatusBadge from "../../shared/components/StatusBadge";

const tickets = [
  {
    id: "HD001",
    subject: "Unable to download Experience Letter",
    priority: "High",
    status: "Pending",
  },
  {
    id: "HD002",
    subject: "Verification request clarification",
    priority: "Medium",
    status: "Approved",
  },
  {
    id: "HD003",
    subject: "Profile update issue",
    priority: "Low",
    status: "Pending",
  },
];

export default function HelpdeskPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <PageHeader
        title="Helpdesk"
        subtitle="Raise support requests and track ticket progress."
      />

      <SectionCard title="My Tickets">
        <div style={{ marginBottom: "20px" }}>
          <button>Create New Ticket</button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Subject</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td style={{ fontWeight: 800 }}>{ticket.id}</td>

                  <td>{ticket.subject}</td>

                  <td>
                    <StatusBadge status={ticket.priority} />
                  </td>

                  <td>
                    <StatusBadge status={ticket.status} />
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
