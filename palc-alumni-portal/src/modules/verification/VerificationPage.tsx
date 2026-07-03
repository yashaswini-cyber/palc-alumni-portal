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
        subtitle="Track verification requests from employers and third parties, and generate QR-verified employment certificates."
      />

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
