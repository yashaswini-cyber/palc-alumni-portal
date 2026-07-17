import { useMemo, useRef, useState } from "react";
import HeroBanner from "../../shared/components/HeroBanner";
import StatsCard from "../../shared/components/StatsCard";
import PrimaryButton from "../../shared/components/PrimaryButton";
import PageHeader from "../../shared/components/PageHeader";
import SectionCard from "../../shared/components/SectionCard";
import StatusBadge from "../../shared/components/StatusBadge";
import SearchBar from "../../shared/components/SearchBar";
import { COLORS } from "../../shared/theme/colors";
import ReferralFormModal from "../../shared/components/ReferralFormModal";
import DetailsModal from "../../shared/components/DetailsModal";

interface Referral {
  id: string;
  candidate: string;
  position: string;
  date: string;
  updated: string;
  status: string;
  email?: string;
  phone?: string;
  company?: string;
  experience?: string;
  linkedin?: string;
  notes?: string;
  resumeName?: string;
}

const initialReferrals: Referral[] = [
  { id: "REF001", candidate: "John Doe", position: "AI Engineer", date: "20 Jun 2026", updated: "21 Jun 2026", status: "Pending" },
  { id: "REF002", candidate: "Sarah Smith", position: "Software Engineer", date: "18 Jun 2026", updated: "20 Jun 2026", status: "Approved" },
  { id: "REF003", candidate: "Rahul Sharma", position: "Frontend Developer", date: "15 Jun 2026", updated: "19 Jun 2026", status: "Interview Scheduled" }
];

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState<Referral[]>(initialReferrals);
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [sortBy, setSortBy] = useState("Latest");
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const referralsSectionRef = useRef<HTMLDivElement>(null);
  const scrollToReferrals = () => referralsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  
  const openReferralForm = () => setFormOpen(true);
  const closeReferralForm = () => setFormOpen(false);

  const handleReferralSubmitted = (formData: {
    candidate: string;
    email: string;
    phone: string;
    company: string;
    experience: string;
    position: string;
    linkedin: string;
    notes: string;
  }) => {
    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const referral: Referral = {
      id: `REF${String(referrals.length + 1).padStart(3, "0")}`,
      candidate: formData.candidate,
      position: formData.position,
      date: today,
      updated: today,
      status: "Pending",
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      experience: formData.experience,
      linkedin: formData.linkedin,
      notes: formData.notes,
    };
    setReferrals((prev) => [referral, ...prev]);
    setFormOpen(false);
  };

  const openReferralDetails = (referral: Referral) => {
    setSelectedReferral(referral);
    setDetailsOpen(true);
  };

  const filteredReferrals = useMemo(() => {
    let data = referrals.filter(referral => {
      const search = searchText.toLowerCase();
      const matchesSearch = referral.id.toLowerCase().includes(search) || 
                            referral.candidate.toLowerCase().includes(search) || 
                            referral.position.toLowerCase().includes(search);
      const matchesStatus = selectedStatus === "All Statuses" || referral.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });

    if (sortBy === "Candidate") {
      data.sort((a, b) => a.candidate.localeCompare(b.candidate));
    } else if (sortBy === "Oldest") {
      data.reverse();
    }
    return data;
  }, [referrals, searchText, selectedStatus, sortBy]);

  const referralStats = useMemo(() => ({
    total: referrals.length,
    pending: referrals.filter(r => r.status === "Pending").length,
    hired: referrals.filter(r => r.status === "Hired").length,
    rewards: `₹${(referrals.filter(r => r.status === "Hired").length * 3000).toLocaleString()}`
  }), [referrals]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <PageHeader title="Referral Management" subtitle="Manage and track your candidate referrals." />

      <HeroBanner
        badge="Talent Referral Program"
        title="Help Build the Future of PalC"
        subtitle="Refer skilled professionals from your network, monitor every referral throughout the hiring process, and earn rewards for successful hires."
        actions={[
          { title: "Submit Referral", onClick: openReferralForm },
          { title: "View My Referrals", onClick: scrollToReferrals },
        ]}
        pills={[
          { title: "Active Referrals", value: "12", color: "#38BDF8" },
          { title: "Success Rate", value: "78%", color: "#22C55E" },
        ]}
        summaryCard={
          <>
            <div style={{ fontSize: "14px", color: "#64748B", fontWeight: 600 }}>Referral Success Rate</div>
            <div style={{ fontSize: "44px", fontWeight: 800, color: "#2563EB", marginTop: "8px" }}>78%</div>
            <div style={{ marginTop: "14px", fontSize: "14px", color: "#475569", lineHeight: 1.6 }}>Successful referrals converted into PalC employees.</div>
            <div style={{ marginTop: "24px", display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "12px", color: "#94A3B8" }}>Rewards Earned</div>
                <div style={{ fontSize: "18px", fontWeight: 700 }}>₹18,000</div>
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#94A3B8" }}>Successful Hires</div>
                <div style={{ fontSize: "18px", fontWeight: 700 }}>6</div>
              </div>
            </div>
          </>
        }
      />

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "20px" }}>
        <StatsCard title="Total Referrals" value={String(referralStats.total)} subtitle="Submitted referrals" accentColor="#2563EB" />
        <StatsCard title="Pending" value={String(referralStats.pending)} subtitle="Awaiting recruiter review" accentColor="#D97706" />
        <StatsCard title="Successful Hires" value={String(referralStats.hired)} subtitle="Converted to employees" accentColor="#16A34A" />
        <StatsCard title="Rewards Earned" value={referralStats.rewards} subtitle="Referral incentives" accentColor="#9333EA" />
      </div>

      <div ref={referralsSectionRef}>
        <SectionCard title="My Referrals">
          <div style={{ display: "flex", gap: "18px", flexWrap: "wrap", marginBottom: "24px" }}>
            <div style={{ flex: 1, minWidth: "320px" }}>
              <SearchBar value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            </div>

            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} style={{ padding: "12px 16px", borderRadius: "12px", border: `1px solid ${COLORS.border}`, minWidth: "210px", background: COLORS.surface, color: COLORS.text }}>
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Interview Scheduled</option>
              <option>Approved</option>
              <option>Rejected</option>
              <option>Hired</option>
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: "12px 16px", borderRadius: "12px", border: `1px solid ${COLORS.border}`, minWidth: "180px", background: COLORS.surface, color: COLORS.text }}>
              <option>Latest</option>
              <option>Oldest</option>
              <option>Candidate</option>
            </select>

            <PrimaryButton onClick={openReferralForm}>Submit Referral</PrimaryButton>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${COLORS.border}` }}>
                  <th style={{ padding: "14px", textAlign: "left", color: COLORS.text }}>Referral ID</th>
                  <th style={{ padding: "14px", textAlign: "left", color: COLORS.text }}>Candidate</th>
                  <th style={{ padding: "14px", textAlign: "left", color: COLORS.text }}>Position</th>
                  <th style={{ padding: "14px", textAlign: "left", color: COLORS.text }}>Submitted</th>
                  <th style={{ padding: "14px", textAlign: "left", color: COLORS.text }}>Last Updated</th>
                  <th style={{ padding: "14px", textAlign: "left", color: COLORS.text }}>Status</th>
                  <th style={{ padding: "14px", textAlign: "left", color: COLORS.text }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReferrals.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: "48px", textAlign: "center", color: COLORS.textSecondary }}>No referrals found.</td>
                  </tr>
                ) : (
                  filteredReferrals.map((referral) => (
                    <tr key={referral.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                      <td style={{ padding: "14px", color: COLORS.text }}>{referral.id}</td>
                      <td style={{ padding: "14px", color: COLORS.text, fontWeight: 500 }}>{referral.candidate}</td>
                      <td style={{ padding: "14px", color: COLORS.text }}>{referral.position}</td>
                      <td style={{ padding: "14px", color: COLORS.textSecondary }}>{referral.date}</td>
                      <td style={{ padding: "14px", color: COLORS.textSecondary }}>{referral.updated}</td>
                      <td style={{ padding: "14px" }}><StatusBadge status={referral.status} /></td>
                      <td style={{ padding: "14px" }}>
                        <PrimaryButton onClick={() => openReferralDetails(referral)}>View Details</PrimaryButton>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      <ReferralFormModal open={formOpen} onClose={closeReferralForm} onSubmit={handleReferralSubmitted} />

      <DetailsModal open={detailsOpen} title="Referral Details" onClose={() => setDetailsOpen(false)}>
        {selectedReferral && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "20px", marginBottom: "28px" }}>
              <DetailItem label="Referral ID" value={selectedReferral.id} />
              <DetailItem label="Candidate Name" value={selectedReferral.candidate} />
              <DetailItem label="Position" value={selectedReferral.position} />
              <DetailItem label="Status" value={selectedReferral.status} />
              <DetailItem label="Submitted On" value={selectedReferral.date} />
              <DetailItem label="Last Updated" value={selectedReferral.updated} />
              <DetailItem label="Email" value={selectedReferral.email || "-"} />
              <DetailItem label="Phone" value={selectedReferral.phone || "-"} />
              <DetailItem label="Current Company" value={selectedReferral.company || "-"} />
              <DetailItem label="Experience" value={selectedReferral.experience || "-"} />
              <DetailItem label="LinkedIn" value={selectedReferral.linkedin || "-"} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: COLORS.textSecondary }}>Additional Notes</div>
              <div style={{ padding: "16px", border: `1px solid ${COLORS.border}`, borderRadius: "12px", background: COLORS.surface }}>
                {selectedReferral.notes || "No notes provided."}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ fontSize: "13px", fontWeight: 600, color: COLORS.textSecondary }}>Resume</div>
                <div style={{ color: COLORS.text }}>{selectedReferral.resumeName || "No resume uploaded"}</div>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <PrimaryButton disabled={!selectedReferral.resumeName} onClick={() => { /* Download logic later */ }}>
                  Download Resume
                </PrimaryButton>
                <button onClick={() => setDetailsOpen(false)} style={{ padding: "12px 24px", borderRadius: "8px", border: `1px solid ${COLORS.border}`, background: COLORS.surface, color: COLORS.text, fontWeight: 600, cursor: "pointer" }}>
                  Close
                </button>
              </div>
            </div>
          </>
        )}
      </DetailsModal>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <div style={{ fontSize: "13px", fontWeight: 600, color: COLORS.textSecondary }}>{label}</div>
      <div style={{ fontSize: "15px", fontWeight: 500, color: COLORS.text }}>{value || "-"}</div>
    </div>
  );
}