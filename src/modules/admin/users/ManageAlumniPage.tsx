import { useEffect, useMemo, useRef, useState } from "react";
import HeroBanner from "../../../shared/components/HeroBanner";
import StatsCard from "../../../shared/components/StatsCard";
import PrimaryButton from "../../../shared/components/PrimaryButton";
import PageHeader from "../../../shared/components/PageHeader";
import SectionCard from "../../../shared/components/SectionCard";
import StatusBadge from "../../../shared/components/StatusBadge";
import SearchBar from "../../../shared/components/SearchBar";
import { COLORS } from "../../../shared/theme/colors";
import ReferralFormModal from "../../../shared/components/ReferralFormModal";
import DetailsModal from "../../../shared/components/DetailsModal";
import { getReferrals as getAlumni, saveReferrals as saveAlumni, getRewardHistory, saveRewardHistory } from "../../../shared/utils/storage";

interface Alumni {
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

interface RewardHistory {
  id: string;
  alumniId: string;
  candidate: string;
  amount: number;
  status: "Pending" | "Paid";
  earnedOn: string;
  paymentDate?: string;
  remarks?: string;
}

const initialAlumni: Alumni[] = [
  { id: "ALM001", candidate: "John Doe", position: "john.doe@example.com", date: "20 Jun 2024", updated: "21 Jun 2026", status: "Activated" },
  { id: "ALM002", candidate: "Sarah Smith", position: "sarah.smith@example.com", date: "18 Jun 2023", updated: "20 Jun 2026", status: "Pending Activation" },
  { id: "ALM003", candidate: "Rahul Sharma", position: "rahul.sharma@example.com", date: "15 Jun 2022", updated: "19 Jun 2026", status: "Inactive" }
];

const initialRewards: RewardHistory[] = [
  { id: "RW001", alumniId: "ALM002", candidate: "Sarah Smith", amount: 3000, status: "Paid", earnedOn: "20 Jun 2026", paymentDate: "25 Jun 2026", remarks: "Reward successfully credited after verification." }
];

export default function ManageAlumniPage() {
  const [alumni, setAlumni] = useState<Alumni[]>(() => getAlumni(initialAlumni));
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [sortBy, setSortBy] = useState("Latest");
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [withdrawTarget, setWithdrawTarget] = useState<Alumni | null>(null);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [showAllAlumni, setShowAllAlumni] = useState(false);
  const [rewardHistory, setRewardHistory] = useState<RewardHistory[]>(() => getRewardHistory(initialRewards));
  const [selectedReward, setSelectedReward] = useState<RewardHistory | null>(null);
  const [rewardDetailsOpen, setRewardDetailsOpen] = useState(false);

  const alumniSectionRef = useRef<HTMLDivElement>(null);
  const rewardsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToAlumni = () => alumniSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const scrollToVerifications = () => alumniSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const scrollToTickets = () => rewardsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const closeAlumniForm = () => setFormOpen(false);

  const handleAlumniSubmitted = (formData: Omit<Alumni, "id" | "date" | "updated" | "status"> & { candidate: string; email: string; phone: string; company: string; experience: string; position: string; linkedin: string; notes: string; }) => {
    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const newAlumni: Alumni = {
      id: `ALM${String(alumni.length + 1).padStart(3, "0")}`,
      candidate: formData.candidate,
      position: formData.position,
      date: today,
      updated: today,
      status: "Pending Activation",
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      experience: formData.experience,
      linkedin: formData.linkedin,
      notes: formData.notes,
    };
    setAlumni((prev) => {
      const updated = [newAlumni, ...prev];
      saveAlumni(updated);
      return updated;
    });
    setFormOpen(false);
  };

  const openAlumniDetails = (item: Alumni) => {
    setSelectedAlumni(item);
    setDetailsOpen(true);
  };

  const closeWithdrawDialog = () => {
    setWithdrawTarget(null);
    setWithdrawOpen(false);
  };

  const confirmWithdrawAlumni = () => {
    if (!withdrawTarget) return;
    setAlumni(prev => {
      const updated = prev.filter(r => r.id !== withdrawTarget.id);
      saveAlumni(updated);
      return updated;
    });
    closeWithdrawDialog();
  };

  const syncRewardsFromAlumni = () => {
    const existingRewardIds = new Set(rewardHistory.map(reward => reward.alumniId));
    const generatedRewards = alumni
      .filter(item => item.status === "Activated" && !existingRewardIds.has(item.id))
      .map((item, index) => ({
        id: `RW${String(rewardHistory.length + existingRewardIds.size + index + 1).padStart(3, "0")}`,
        alumniId: item.id,
        candidate: item.candidate,
        amount: 3000,
        status: "Pending" as const,
        earnedOn: item.updated,
        remarks: "Reward is awaiting HR payout approval.",
      }));

    if (generatedRewards.length === 0) return;

    setRewardHistory(prev => {
      const updated = [...prev, ...generatedRewards];
      saveRewardHistory(updated);
      return updated;
    });
  };

  useEffect(() => {
    syncRewardsFromAlumni();
  }, [alumni]);

  const filteredAlumni = useMemo(() => {
    let data = alumni.filter(item => {
      const search = searchText.toLowerCase();
      const matchesSearch = item.id.toLowerCase().includes(search) || item.candidate.toLowerCase().includes(search) || item.position.toLowerCase().includes(search);
      const matchesStatus = selectedStatus === "All Statuses" || selectedStatus === "All Alumni" || item.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });

    if (sortBy === "Candidate" || sortBy === "Alphabetical") {
      data.sort((a, b) => a.candidate.localeCompare(b.candidate));
    } else if (sortBy === "Oldest") {
      data = [...data].reverse();
    }
    return data;
  }, [alumni, searchText, selectedStatus, sortBy]);

  const visibleAlumni = useMemo(
    () => (showAllAlumni ? filteredAlumni : filteredAlumni.slice(0, 5)),
    [filteredAlumni, showAllAlumni]
  );

  const alumniStats = useMemo(() => ({
    total: alumni.length,
    pending: alumni.filter(r => r.status === "Pending Activation" || r.status === "Pending").length,
    hired: alumni.filter(r => r.status === "Activated").length,
    rewards: `₹${(alumni.filter(r => r.status === "Activated").length * 3000).toLocaleString()}`
  }), [alumni]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <PageHeader title="Manage Alumni" subtitle="View, monitor and manage alumni portal accounts and activity." />

      <HeroBanner
        badge="Alumni Administration"
        title="Manage Alumni Accounts"
        subtitle="Monitor alumni account activity, login history, document downloads, HR verification requests and support tickets from a single dashboard."
        actions={[
          { title: "View Alumni", onClick: scrollToAlumni },
          { title: "Verification Requests", onClick: scrollToVerifications },
        ]}
        pills={[
            {
                title: "Registered Alumni",
                value: String(alumniStats.total),
                color: "#38BDF8",
            },
            {
                title: "Pending Verifications",
                value: String(alumniStats.pending),
                color: "#F59E0B",
            },
            ]}
        summaryCard={
          <>
            <div style={{ fontSize: "14px", color: "#64748B", fontWeight: 600 }}>Portal Activity</div>
            <div style={{ fontSize: "44px", fontWeight: 800, color: "#2563EB", marginTop: "8px" }}>{alumniStats.total} Registered Alumni</div>
            <div style={{ marginTop: "14px", fontSize: "14px", color: "#475569", lineHeight: 1.6 }}>Administrators can monitor account activation, login history, downloads, HR requests and Helpdesk tickets.</div>
            <div style={{ marginTop: "24px", display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "12px", color: "#94A3B8" }}>Last Login Today</div>
                <div style={{ fontSize: "18px", fontWeight: 700 }}>42 Active Users</div>
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#94A3B8" }}>Active Alumni</div>
                <div style={{ fontSize: "18px", fontWeight: 700 }}>{alumniStats.hired}</div>
              </div>
            </div>
          </>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "20px" }}>
        <StatsCard title="Total Alumni" value={String(alumniStats.total)} subtitle="Registered alumni profiles" accentColor="#2563EB" />
        <StatsCard title="Pending Verification Requests" value={String(alumniStats.pending)} subtitle="Awaiting administrative review" accentColor="#D97706" />
        <StatsCard title="Open Helpdesk Tickets" value={String(alumniStats.hired)} subtitle="Active alumni tickets" accentColor="#16A34A" />
        <StatsCard title="Documents Downloaded" value={alumniStats.rewards} subtitle="Issued document records" accentColor="#9333EA" />
      </div>

      <div ref={alumniSectionRef}>
        <SectionCard title="Alumni Directory">
          <div style={{ display: "flex", gap: "18px", flexWrap: "wrap", marginBottom: "24px" }}>
            <div style={{ flex: 1, minWidth: "320px" }}><SearchBar value={searchText} onChange={(e) => setSearchText(e.target.value)} /></div>

            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} style={{ padding: "12px 16px", borderRadius: "12px", border: `1px solid ${COLORS.border}`, minWidth: "210px", background: COLORS.surface, color: COLORS.text }}>
              <option>All Alumni</option>
              <option>Activated</option>
              <option>Pending Activation</option>
              <option>Inactive</option>
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: "12px 16px", borderRadius: "12px", border: `1px solid ${COLORS.border}`, minWidth: "180px", background: COLORS.surface, color: COLORS.text }}>
              <option>Latest</option>
              <option>Oldest</option>
              <option>Alphabetical</option>
            </select>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${COLORS.border}` }}>
                  <th style={{ padding: "14px", textAlign: "left", color: COLORS.text }}>Employee ID</th>
                  <th style={{ padding: "14px", textAlign: "left", color: COLORS.text }}>Alumni Name</th>
                  <th style={{ padding: "14px", textAlign: "left", color: COLORS.text }}>Email</th>
                  <th style={{ padding: "14px", textAlign: "left", color: COLORS.text }}>Documents Downloaded</th>
                  <th style={{ padding: "14px", textAlign: "left", color: COLORS.text }}>HR Verification</th>
                  <th style={{ padding: "14px", textAlign: "left", color: COLORS.text }}>Tickets</th>
                  <th style={{ padding: "14px", textAlign: "left", color: COLORS.text }}>Status</th>
                  <th style={{ padding: "14px", textAlign: "left", color: COLORS.text }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAlumni.length === 0 ? (
                  <tr><td colSpan={8} style={{ padding: "48px", textAlign: "center", color: COLORS.textSecondary }}>No alumni found.</td></tr>
                ) : (
                  visibleAlumni.map((item) => (
                    <tr key={item.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                      <td style={{ padding: "14px", color: COLORS.text }}>{item.id}</td>
                      <td style={{ padding: "14px", color: COLORS.text, fontWeight: 500 }}>{item.candidate}</td>
                      <td style={{ padding: "14px", color: COLORS.text }}>{item.position}</td>
                      <td style={{ padding: "14px", color: COLORS.textSecondary }}>{item.date}</td>
                      <td style={{ padding: "14px", color: COLORS.textSecondary }}>{item.updated}</td>
                      <td style={{ padding: "14px", color: COLORS.textSecondary }}>-</td>
                      <td style={{ padding: "14px" }}><StatusBadge status={item.status} /></td>
                      <td style={{ padding: "14px" }}>
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                          <PrimaryButton onClick={() => openAlumniDetails(item)}>View Profile</PrimaryButton>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {filteredAlumni.length > 5 && (
              <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
                <PrimaryButton onClick={() => setShowAllAlumni((prev) => !prev)}>
                  {showAllAlumni ? "Show Less" : `View (${filteredAlumni.length}) More Alumni`}
                </PrimaryButton>
              </div>
            )}
          </div>
        </SectionCard>
      </div>

      <ReferralFormModal open={formOpen} onClose={closeAlumniForm} onSubmit={handleAlumniSubmitted} />

      <DetailsModal open={detailsOpen} title="Alumni Details" onClose={() => setDetailsOpen(false)}>
        {selectedAlumni && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "20px", marginBottom: "28px" }}>
              <DetailItem label="Employee ID" value={selectedAlumni.id} />
              <DetailItem label="Name" value={selectedAlumni.candidate} />
              <DetailItem label="Email" value={selectedAlumni.position} />
              <DetailItem label="Activation Status" value={selectedAlumni.status} />
              <DetailItem label="Date Joined" value={selectedAlumni.date} />
              <DetailItem label="Last Login" value={selectedAlumni.updated} />
              <DetailItem label="Email Address" value={selectedAlumni.email || "-"} />
              <DetailItem label="Contact Phone" value={selectedAlumni.phone || "-"} />
              <DetailItem label="Company" value={selectedAlumni.company || "-"} />
              <DetailItem label="Experience" value={selectedAlumni.experience || "-"} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: COLORS.textSecondary }}>Additional Notes</div>
              <div style={{ padding: "16px", border: `1px solid ${COLORS.border}`, borderRadius: "12px", background: COLORS.surface, color: COLORS.text }}>
                {selectedAlumni.notes || "No notes provided."}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ fontSize: "13px", fontWeight: 600, color: COLORS.textSecondary }}>Resume / Documents</div>
                <div style={{ color: COLORS.text }}>{selectedAlumni.resumeName || "No documents uploaded"}</div>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <PrimaryButton disabled={!selectedAlumni.resumeName} onClick={() => {}}>Download Resume</PrimaryButton>
                <button onClick={() => setDetailsOpen(false)} style={{ padding: "12px 24px", borderRadius: "8px", border: `1px solid ${COLORS.border}`, background: COLORS.surface, color: COLORS.text, fontWeight: 600, cursor: "pointer" }}>Close</button>
              </div>
            </div>
          </>
        )}
      </DetailsModal>

      <DetailsModal open={withdrawOpen} title="Remove Alumni Record" onClose={closeWithdrawDialog}>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ color: COLORS.textSecondary, lineHeight: 1.7 }}>
            Are you sure you want to remove the alumni profile for <strong>{withdrawTarget?.candidate}</strong>? This action removes the account from the directory.
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
            <button onClick={closeWithdrawDialog} style={{ padding: "12px 20px", borderRadius: "8px", border: `1px solid ${COLORS.border}`, background: COLORS.surface, color: COLORS.text, cursor: "pointer", fontWeight: 600 }}>Cancel</button>
            <PrimaryButton onClick={confirmWithdrawAlumni}>Remove Record</PrimaryButton>
          </div>
        </div>
      </DetailsModal>

      <DetailsModal open={rewardDetailsOpen} title="Reward Details" onClose={() => setRewardDetailsOpen(false)}>
        {selectedReward && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "20px", marginBottom: "28px" }}>
              <DetailItem label="Reward ID" value={selectedReward.id} />
              <DetailItem label="Alumni ID" value={selectedReward.alumniId} />
              <DetailItem label="Candidate Name" value={selectedReward.candidate} />
              <DetailItem label="Reward Amount" value={`₹${selectedReward.amount.toLocaleString()}`} />
              <DetailItem label="Payout Status" value={selectedReward.status} />
              <DetailItem label="Reward Earned On" value={selectedReward.earnedOn} />
              <DetailItem label="Payment Date" value={selectedReward.paymentDate || "-"} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: COLORS.textSecondary }}>Remarks</div>
              <div style={{ padding: "16px", border: `1px solid ${COLORS.border}`, borderRadius: "12px", background: COLORS.surface, color: COLORS.text }}>
                {selectedReward.remarks || "No remarks available for this reward."}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setRewardDetailsOpen(false)} style={{ padding: "12px 24px", borderRadius: "8px", border: `1px solid ${COLORS.border}`, background: COLORS.surface, color: COLORS.text, fontWeight: 600, cursor: "pointer" }}>Close</button>
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