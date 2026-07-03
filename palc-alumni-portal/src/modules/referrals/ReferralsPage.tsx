import PageHeader from "../../shared/components/PageHeader";
import SectionCard from "../../shared/components/SectionCard";
import StatusBadge from "../../shared/components/StatusBadge";

const referrals = [
  {
    id: "REF001",
    candidate: "John Doe",
    position: "AI Engineer",
    date: "20 Jun 2026",
    status: "Pending",
  },
  {
    id: "REF002",
    candidate: "Sarah Smith",
    position: "Software Engineer",
    date: "18 Jun 2026",
    status: "Approved",
  },
];

export default function ReferralsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <PageHeader
        title="Referral Program"
        subtitle="Refer talented professionals and track referral progress."
      />

      <SectionCard title="My Referrals">
        <div style={{ marginBottom: "20px" }}>
          <button>Submit New Referral</button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Candidate</th>
                <th>Position</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {referrals.map((referral) => (
                <tr key={referral.id}>
                  <td style={{ fontWeight: 800 }}>{referral.id}</td>
                  <td>{referral.candidate}</td>
                  <td>{referral.position}</td>
                  <td>{referral.date}</td>

                  <td>
                    <StatusBadge status={referral.status} />
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
