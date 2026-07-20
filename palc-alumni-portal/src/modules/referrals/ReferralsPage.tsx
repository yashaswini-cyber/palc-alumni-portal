import { useEffect, useMemo, useRef, useState } from "react";
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
import { getReferrals, saveReferrals, getRewardHistory, saveRewardHistory } from "../../shared/utils/storage";

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

interface RewardHistory {
  id: string;
  referralId: string;
  candidate: string;
  amount: number;
  status: "Pending" | "Paid";
  earnedOn: string;
  paymentDate?: string;
  remarks?: string;
}

const initialReferrals: Referral[] = [
  { id: "REF001", candidate: "John Doe", position: "AI Engineer", date: "20 Jun 2026", updated: "21 Jun 2026", status: "Pending" },
  { id: "REF002", candidate: "Sarah Smith", position: "Software Engineer", date: "18 Jun 2026", updated: "20 Jun 2026", status: "Approved" },
  { id: "REF003", candidate: "Rahul Sharma", position: "Frontend Developer", date: "15 Jun 2026", updated: "19 Jun 2026", status: "Interview Scheduled" }
];

const leaderboardData = [
  { rank: 1, name: "Priya Sharma", successfulReferrals: 24, rewards: 72000 },
  { rank: 2, name: "Amit Verma", successfulReferrals: 20, rewards: 60000 },
  { rank: 3, name: "Neha Rao", successfulReferrals: 18, rewards: 54000 },
  { rank: 4, name: "Karthik Iyer", successfulReferrals: 15, rewards: 45000 },
  { rank: 5, name: "Sneha Kulkarni", successfulReferrals: 12, rewards: 36000 },
  { rank: 6, name: "Rahul Mehta", successfulReferrals: 9, rewards: 27000 },
  { rank: 7, name: "You", successfulReferrals: 6, rewards: 18000 }
];

const initialRewards: RewardHistory[] = [
  { id: "RW001", referralId: "REF002", candidate: "Sarah Smith", amount: 3000, status: "Paid", earnedOn: "20 Jun 2026", paymentDate: "25 Jun 2026", remarks: "Reward successfully credited after candidate completed joining formalities." }
];

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState<Referral[]>(() => getReferrals(initialReferrals));
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [sortBy, setSortBy] = useState("Latest");
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [withdrawTarget, setWithdrawTarget] = useState<Referral | null>(null);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [showAllReferrals, setShowAllReferrals] = useState(false);
  const [rewardHistory, setRewardHistory] = useState<RewardHistory[]>(() => getRewardHistory(initialRewards));
  const [selectedReward, setSelectedReward] = useState<RewardHistory | null>(null);
  const [rewardDetailsOpen, setRewardDetailsOpen] = useState(false);

  const referralsSectionRef = useRef<HTMLDivElement>(null);
  const rewardsSectionRef = useRef<HTMLDivElement>(null);
  const scrollToReferrals = () => referralsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const scrollToRewards = () =>rewardsSectionRef.current?.scrollIntoView({behavior: "smooth",block: "start",});

  const openReferralForm = () => setFormOpen(true);
  const closeReferralForm = () => setFormOpen(false);

  const handleReferralSubmitted = (formData: Omit<Referral, "id" | "date" | "updated" | "status"> & { candidate: string; email: string; phone: string; company: string; experience: string; position: string; linkedin: string; notes: string; }) => {
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
    setReferrals((prev) => {
      const updated = [referral, ...prev];
      saveReferrals(updated);
      return updated;
    });
    setFormOpen(false);
  };

  const openReferralDetails = (referral: Referral) => {
    setSelectedReferral(referral);
    setDetailsOpen(true);
  };

  const openWithdrawDialog = (referral: Referral) => {
    setWithdrawTarget(referral);
    setWithdrawOpen(true);
  };

  const closeWithdrawDialog = () => {
    setWithdrawTarget(null);
    setWithdrawOpen(false);
  };

  const confirmWithdrawReferral = () => {
    if (!withdrawTarget) return;
    setReferrals(prev => {
      const updated = prev.filter(r => r.id !== withdrawTarget.id);
      saveReferrals(updated);
      return updated;
    });
    closeWithdrawDialog();
  };

  const openRewardDetails = (reward: RewardHistory) => {
    setSelectedReward(reward);
    setRewardDetailsOpen(true);
  };

  const syncRewardsFromReferrals = () => {
    const existingRewardIds = new Set(rewardHistory.map(reward => reward.referralId));
    const generatedRewards = referrals
      .filter(referral => referral.status === "Hired" && !existingRewardIds.has(referral.id))
      .map((referral, index) => ({
        id: `RW${String(rewardHistory.length + existingRewardIds.size + index + 1).padStart(3, "0")}`,
        referralId: referral.id,
        candidate: referral.candidate,
        amount: 3000,
        status: "Pending" as const,
        earnedOn: referral.updated,
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
    syncRewardsFromReferrals();
  }, [referrals]);

  const filteredReferrals = useMemo(() => {
    let data = referrals.filter(referral => {
      const search = searchText.toLowerCase();
      const matchesSearch = referral.id.toLowerCase().includes(search) || referral.candidate.toLowerCase().includes(search) || referral.position.toLowerCase().includes(search);
      const matchesStatus = selectedStatus === "All Statuses" || referral.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });

    if (sortBy === "Candidate") {
      data.sort((a, b) => a.candidate.localeCompare(b.candidate));
    } else if (sortBy === "Oldest") {
      data = [...data].reverse();
    }
    return data;
  }, [referrals, searchText, selectedStatus, sortBy]);

  const visibleReferrals = useMemo(
    () => (showAllReferrals ? filteredReferrals : filteredReferrals.slice(0, 5)),
    [filteredReferrals, showAllReferrals]
  );

  const referralStats = useMemo(() => ({
    total: referrals.length,
    pending: referrals.filter(r => r.status === "Pending").length,
    hired: referrals.filter(r => r.status === "Hired").length,
    rewards: `₹${(referrals.filter(r => r.status === "Hired").length * 3000).toLocaleString()}`
  }), [referrals]);

  const rewardSummary = useMemo(() => ({
    totalAmount: rewardHistory.reduce((sum, reward) => sum + reward.amount, 0),
    paidCount: rewardHistory.filter(reward => reward.status === "Paid").length,
    pendingCount: rewardHistory.filter(reward => reward.status === "Pending").length,
  }), [rewardHistory]);

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
          { title: "Referral Rewards", onClick: scrollToRewards },
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
                  visibleReferrals.map((referral) => (
                    <tr key={referral.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                      <td style={{ padding: "14px", color: COLORS.text }}>{referral.id}</td>
                      <td style={{ padding: "14px", color: COLORS.text, fontWeight: 500 }}>{referral.candidate}</td>
                      <td style={{ padding: "14px", color: COLORS.text }}>{referral.position}</td>
                      <td style={{ padding: "14px", color: COLORS.textSecondary }}>{referral.date}</td>
                      <td style={{ padding: "14px", color: COLORS.textSecondary }}>{referral.updated}</td>
                      <td style={{ padding: "14px" }}><StatusBadge status={referral.status} /></td>
                      <td style={{ padding: "14px" }}>
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                          <PrimaryButton onClick={() => openReferralDetails(referral)}>View Details</PrimaryButton>
                          {referral.status === "Pending" && (
                            <button onClick={() => openWithdrawDialog(referral)} style={{ padding: "10px 16px", borderRadius: "8px", border: "1px solid #EF4444", background: "#FEF2F2", color: "#DC2626", cursor: "pointer", fontWeight: 600 }}>Withdraw</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {filteredReferrals.length > 5 && (
              <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
                <PrimaryButton onClick={() => setShowAllReferrals((prev) => !prev)}>
                  {showAllReferrals ? "Show Less" : `View (${filteredReferrals.length}) More Referrals `}
                </PrimaryButton>
              </div>
            )}
          </div>
        </SectionCard>
      </div>

      {/* Referral Rewards */}
      <div ref={rewardsSectionRef}>
      <SectionCard title="Referral Rewards">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "20px", marginBottom: "32px" }}>
          <div style={{ padding: "22px", border: `1px solid ${COLORS.border}`, borderRadius: "16px", background: COLORS.surface, display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ fontSize: "13px", color: COLORS.textSecondary, fontWeight: 600 }}>Total Rewards Earned</div>
            <div style={{ fontSize: "32px", fontWeight: 700, color: "#16A34A" }}>₹{rewardSummary.totalAmount.toLocaleString()}</div>
            <div style={{ fontSize: "13px", color: COLORS.textSecondary }}>Total rewards credited from successful referrals.</div>
          </div>

          <div style={{ padding: "22px", border: `1px solid ${COLORS.border}`, borderRadius: "16px", background: COLORS.surface, display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ fontSize: "13px", color: COLORS.textSecondary, fontWeight: 600 }}>Paid Rewards</div>
            <div style={{ fontSize: "32px", fontWeight: 700, color: "#2563EB" }}>{rewardSummary.paidCount}</div>
            <div style={{ fontSize: "13px", color: COLORS.textSecondary }}>Rewards successfully credited.</div>
          </div>

          <div style={{ padding: "22px", border: `1px solid ${COLORS.border}`, borderRadius: "16px", background: COLORS.surface, display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ fontSize: "13px", color: COLORS.textSecondary, fontWeight: 600 }}>Pending Rewards</div>
            <div style={{ fontSize: "32px", fontWeight: 700, color: "#D97706" }}>{rewardSummary.pendingCount}</div>
            <div style={{ fontSize: "13px", color: COLORS.textSecondary }}>Awaiting payout approval.</div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: COLORS.text }}>Reward History</div>
            <div style={{ fontSize: "14px", color: COLORS.textSecondary, marginTop: "4px" }}>View all referral rewards earned through successful hires.</div>
          </div>
        </div>

        <div style={{ overflowX: "auto", border: `1px solid ${COLORS.border}`, borderRadius: "14px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: COLORS.surface, borderBottom: `1px solid ${COLORS.border}` }}>
                <th style={{ padding: "14px", textAlign: "left" }}>Reward ID</th>
                <th style={{ padding: "14px", textAlign: "left" }}>Referral ID</th>
                <th style={{ padding: "14px", textAlign: "left" }}>Candidate</th>
                <th style={{ padding: "14px", textAlign: "left" }}>Reward</th>
                <th style={{ padding: "14px", textAlign: "left" }}>Earned On</th>
                <th style={{ padding: "14px", textAlign: "left" }}>Status</th>
                <th style={{ padding: "14px", textAlign: "left" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rewardHistory.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: COLORS.textSecondary }}>No rewards available.</td>
                </tr>
              ) : (
                rewardHistory.map((reward) => (
                  <tr key={reward.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                    <td style={{ padding: "14px", fontWeight: 600 }}>{reward.id}</td>
                    <td style={{ padding: "14px" }}>{reward.referralId}</td>
                    <td style={{ padding: "14px" }}>{reward.candidate}</td>
                    <td style={{ padding: "14px", fontWeight: 600, color: "#16A34A" }}>₹{reward.amount.toLocaleString()}</td>
                    <td style={{ padding: "14px" }}>{reward.earnedOn}</td>
                    <td style={{ padding: "14px" }}><StatusBadge status={reward.status} /></td>
                    <td style={{ padding: "14px" }}>
                      <PrimaryButton onClick={() => openRewardDetails(reward)}>Details</PrimaryButton>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>

      <SectionCard title="Referral Leaderboard" subtitle="See how your successful referrals compare with other alumni.">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${COLORS.border}` }}>
                <th style={{ padding: "14px", textAlign: "left", color: COLORS.text }}>Rank</th>
                <th style={{ padding: "14px", textAlign: "left", color: COLORS.text }}>Alumni</th>
                <th style={{ padding: "14px", textAlign: "left", color: COLORS.text }}>Successful Referrals</th>
                <th style={{ padding: "14px", textAlign: "left", color: COLORS.text }}>Rewards Earned</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: "40px", textAlign: "center", color: COLORS.textSecondary }}>Leaderboard data is currently unavailable.</td>
                </tr>
              ) : (
                leaderboardData.map((member) => (
                  <tr key={member.rank} style={{ borderBottom: `1px solid ${COLORS.border}`, background: member.name === "You" ? "linear-gradient(90deg,#DBEAFE,#EFF6FF)" : "transparent" }}>
                    <td style={{ padding: "14px", fontWeight: 700, color: COLORS.text }}>#{member.rank}</td>
                    <td style={{ padding: "14px", color: COLORS.text, fontWeight: member.name === "You" ? 700 : 500 }}>
                      {member.name}
                      {member.name === "You" && (
                        <span style={{ marginLeft: "10px", padding: "3px 10px", borderRadius: "999px", background: "#2563EB", color: "#FFFFFF", fontSize: "12px", fontWeight: 600 }}>You</span>
                      )}
                    </td>
                    <td style={{ padding: "14px", color: COLORS.text }}>{member.successfulReferrals}</td>
                    <td style={{ padding: "14px", color: COLORS.text }}>₹{member.rewards.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div style={{ marginTop: "20px", fontSize: "13px", color: COLORS.textSecondary, lineHeight: 1.7 }}>
            Rankings are based on successful referrals and total rewards earned. The leaderboard will automatically reflect the latest data once the HR Portal and backend are integrated.
          </div>
        </div>
      </SectionCard>
{/*Referral Guidelines*/}
      <SectionCard
        title="Referral Guidelines"
        subtitle="Everything you need to know before submitting and tracking referrals."
      ><div style={{ marginBottom: "28px", color: COLORS.textSecondary, lineHeight: 1.7, maxWidth: "900px" }}>
          The PalC Referral Program enables alumni to recommend qualified professionals from their network.
          Review the eligibility criteria, referral process, reward policy and common questions before submitting a referral.
        </div>

        <div
          style={{display: "grid",gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))",gap: "24px",marginBottom: "28px"}}>
          <div style={{ padding: "26px", border: `1px solid ${COLORS.border}`, borderRadius: "16px", background: COLORS.surface }}>
            <div style={{ fontSize: "19px", fontWeight: 700, color: COLORS.text, marginBottom: "20px" }}>
              Who Can Be Referred?
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", color: COLORS.textSecondary, lineHeight: 1.7 }}>
              <div>• Refer experienced professionals who match the job requirements.</div>
              <div>• Candidates should not already exist in the recruitment pipeline.</div>
              <div>• Employees cannot refer themselves for open positions.</div>
              <div>• Ensure all candidate information is accurate before submission.</div>
            </div>
          </div>

          <div style={{ padding: "26px", border: `1px solid ${COLORS.border}`, borderRadius: "16px", background: COLORS.surface }}>
            <div style={{ fontSize: "19px", fontWeight: 700, color: COLORS.text, marginBottom: "20px" }}>
              Referral Process
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div><strong>1.</strong> Submit your referral.</div>
              <div><strong>2.</strong> Recruitment reviews the application.</div>
              <div><strong>3.</strong> Eligible candidates proceed through interviews.</div>
              <div><strong>4.</strong> Hiring status is updated in your referral dashboard.</div>
              <div><strong>5.</strong> Rewards are processed after successful onboarding.</div>
            </div>
          </div>
        </div>

        <div
          style={{padding: "28px",border: `1px solid ${COLORS.border}`,borderRadius: "16px",background: COLORS.surface,marginBottom: "28px"}}>
            <div style={{ fontSize: "19px", fontWeight: 700, color: COLORS.text, marginBottom: "20px" }}>
            Reward Eligibility
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "18px" }}>
            <div style={{ color: COLORS.textSecondary }}>✓ Rewards are issued after the referred candidate successfully joins PalC.</div>
            <div style={{ color: COLORS.textSecondary }}>✓ Reward amounts follow the company's referral policy.</div>
            <div style={{ color: COLORS.textSecondary }}>✓ One reward is applicable for each successful referral.</div>
            <div style={{ color: COLORS.textSecondary }}>✓ Payment is processed after HR verification and approval.</div>
          </div>
        </div>

        <div style={{padding: "28px",border: `1px solid ${COLORS.border}`,borderRadius: "16px",background: COLORS.surface}}>
            <div style={{ fontSize: "19px", fontWeight: 700, color: COLORS.text, marginBottom: "24px" }}>
            Frequently Asked Questions
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            <div>
              <div style={{ fontWeight: 700, color: COLORS.text, marginBottom: "8px" }}>
                How can I track my referral?
              </div>

              <div style={{ color: COLORS.textSecondary, lineHeight: 1.7 }}>
                Track the latest referral status anytime from the <strong>My Referrals</strong> section.
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${COLORS.border}` }} />
            <div>
              <div style={{ fontWeight: 700, color: COLORS.text, marginBottom: "8px" }}>
                When will I receive my reward?
              </div>

              <div style={{ color: COLORS.textSecondary, lineHeight: 1.7 }}>
                Rewards are processed after the referred candidate successfully joins and completes HR verification.
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${COLORS.border}` }} />
            <div>
              <div style={{ fontWeight: 700, color: COLORS.text, marginBottom: "8px" }}>
                Can I edit or withdraw a referral?
              </div>

              <div style={{ color: COLORS.textSecondary, lineHeight: 1.7 }}>
                Pending referrals can be withdrawn. Submitted referral information cannot be edited once it has been sent for review.
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      <ReferralFormModal open={formOpen} onClose={closeReferralForm} onSubmit={handleReferralSubmitted} />
      
      {/* Referral Details Modal */}
      <DetailsModal open={detailsOpen} title="Referral Details" onClose={() => setDetailsOpen(false)}>
        {selectedReferral && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "20px", marginBottom: "28px" }}>
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
              <div style={{ padding: "16px", border: `1px solid ${COLORS.border}`, borderRadius: "12px", background: COLORS.surface, color: COLORS.text }}>
                {selectedReferral.notes || "No notes provided."}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ fontSize: "13px", fontWeight: 600, color: COLORS.textSecondary }}>Resume</div>
                <div style={{ color: COLORS.text }}>{selectedReferral.resumeName || "No resume uploaded"}</div>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <PrimaryButton disabled={!selectedReferral.resumeName} onClick={() => { /* Download logic later */ }}>Download Resume</PrimaryButton>
                <button onClick={() => setDetailsOpen(false)} style={{ padding: "12px 24px", borderRadius: "8px", border: `1px solid ${COLORS.border}`, background: COLORS.surface, color: COLORS.text, fontWeight: 600, cursor: "pointer" }}>Close</button>
              </div>
            </div>
          </>
        )}
      </DetailsModal>

      {/* Withdraw Modal */}
      <DetailsModal open={withdrawOpen} title="Withdraw Referral" onClose={closeWithdrawDialog}>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ color: COLORS.textSecondary, lineHeight: 1.7 }}>
            Are you sure you want to withdraw the referral for <strong>{withdrawTarget?.candidate}</strong>? This action removes the referral from your referral history.
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
            <button onClick={closeWithdrawDialog} style={{ padding: "12px 20px", borderRadius: "8px", border: `1px solid ${COLORS.border}`, background: COLORS.surface, color: COLORS.text, cursor: "pointer", fontWeight: 600 }}>Cancel</button>
            <PrimaryButton onClick={confirmWithdrawReferral}>Withdraw Referral</PrimaryButton>
          </div>
        </div>
      </DetailsModal>

      {/* Reward Details Modal */}
      <DetailsModal open={rewardDetailsOpen} title="Reward Details" onClose={() => setRewardDetailsOpen(false)}>
        {selectedReward && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "20px", marginBottom: "28px" }}>
              <DetailItem label="Reward ID" value={selectedReward.id} />
              <DetailItem label="Referral ID" value={selectedReward.referralId} />
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