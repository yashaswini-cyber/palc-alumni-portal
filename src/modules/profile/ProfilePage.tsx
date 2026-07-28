import React, { useRef, useState } from "react";
import HeroBanner from "../../shared/components/HeroBanner";
import StatsCard from "../../shared/components/StatsCard";
import SectionCard from "../../shared/components/SectionCard";
import PrimaryButton from "../../shared/components/PrimaryButton";
import { COLORS } from "../../shared/theme/colors";

const employmentInfo = [
  ["Employee ID", "EMP12345"],
  ["Department", "Engineering"],
  ["Last Designation", "Senior Software Engineer"],
  ["Date of Joining", "01-Jan-2020"],
  ["Date of Exit", "30-Apr-2026"],
];

const stats = [
  { title: "Years at PalC", value: "6", subtitle: "Service Duration" },
  { title: "Documents", value: "12", subtitle: "Available" },
  { title: "Referrals", value: "4", subtitle: "Submitted" },
  { title: "Helpdesk", value: "2", subtitle: "Open Tickets" },
];

const ProfileRow = ({ label, value, status }: { label: string; value: string; status?: boolean }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", borderBottom: `1px solid ${COLORS.border}` }}>
    <span style={{ color: COLORS.textSecondary, fontSize: "14px" }}>{label}</span>
    {status ? (
      <div style={{ padding: "5px 12px", borderRadius: "999px", background: "#EAF7EC", color: "#15803D", fontSize: "12px", fontWeight: 700 }}>{value}</div>
    ) : (
      <strong style={{ color: COLORS.text, fontWeight: 600, fontSize: "14px" }}>{value}</strong>
    )}
  </div>
);

export default function ProfilePage() {
  const personalInfoRef = useRef<HTMLDivElement>(null);
  const employmentInfoRef = useRef<HTMLDivElement>(null);

  const [editingProfile, setEditingProfile] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+91 9876543210",
    location: "Bangalore",
  });

  const scrollToPersonalInfo = () => {
    setEditingProfile(true);
    personalInfoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToEmploymentInfo = () => employmentInfoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <HeroBanner
        badge="ALUMNI PROFILE"
        title={`Welcome, ${personalInfo.name}`}
        subtitle="Manage your personal details, employment information, communication preferences and account security."

        pills={[
          {
            title: "Profile",
            value: "85% Complete",
            color: "#22C55E",
          },
          {
            title: "Account",
            value: "Active",
            color: "#16A34A",
          },
          {
            title: "Member Since",
            value: "Apr 2026",
            color: "#38BDF8",
          },
        ]}
        actions={[
          { title: "Edit Profile", onClick: scrollToPersonalInfo },
          { title: "View Employment Information", onClick: scrollToEmploymentInfo },
        ]}
        summaryCard={
        <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
        <div>
        <div style={{fontSize:"13px",fontWeight:700,color:COLORS.textSecondary,textTransform:"uppercase"}}>
        Current Profile
        </div>

        <div style={{marginTop:"6px",fontSize:"28px",fontWeight:800,color:COLORS.text}}>
        {personalInfo.name}
        </div>
        <div style={{marginTop:"4px",fontSize:"15px",color:COLORS.textSecondary}}>
        Senior Software Engineer
        </div>
        </div>
        <div>

        <div style={{display:"flex",justifyContent:"space-between",marginBottom:"8px"}}>
        <span style={{fontSize:"13px",color:COLORS.textSecondary}}>
        Profile Completion
        </span>
        <strong style={{color:COLORS.primary}}>
        85%
        </strong>
        </div>

        <div
        style={{
        height:"10px",
        borderRadius:"999px",
        background:"#E5E7EB",
        overflow:"hidden",
        }}
        >
        <div
        style={{
        width:"85%",
        height:"100%",
        background:"linear-gradient(90deg,#22C55E,#2563EB)",
        }}
        />
        </div>
        </div>
        <div style={{display:"grid",gap:"12px"}}>
        <div style={{display:"flex",justifyContent:"space-between"}}>
        <span style={{color:COLORS.textSecondary}}>Employee ID</span>
        <strong>EMP12345</strong>
        </div>

        <div style={{display:"flex",justifyContent:"space-between"}}>
        <span style={{color:COLORS.textSecondary}}>Department</span>
        <strong>Engineering</strong>
        </div>

        <div style={{display:"flex",justifyContent:"space-between"}}>
        <span style={{color:COLORS.textSecondary}}>Years at PalC</span>
        <strong>6 Years</strong>
        </div>
        </div>
        </div>
        }
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "22px" }}>
        {stats.map((card) => (
          <StatsCard key={card.title} title={card.title} value={card.value} subtitle={card.subtitle} />
        ))}
      </div>

      <div ref={personalInfoRef}>
        <SectionCard title="Personal Information">
          {[
            { label: "Name", key: "name" },
            { label: "Email", key: "email" },
            { label: "Phone", key: "phone" },
            { label: "Location", key: "location" },
          ].map((field) => (
            <div key={field.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${COLORS.border}`, gap: "20px" }}>
              <span style={{ color: COLORS.textSecondary, fontSize: "14px" }}>{field.label}</span>
              {editingProfile ? (
                <input
                  value={personalInfo[field.key as keyof typeof personalInfo]}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, [field.key]: e.target.value })}
                  style={{ width: "320px", padding: "10px 14px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, fontSize: "14px" }}
                />
              ) : (
                <strong style={{ color: COLORS.text, fontSize: "14px" }}>{personalInfo[field.key as keyof typeof personalInfo]}</strong>
              )}
            </div>
          ))}
          {editingProfile && (
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
              <button onClick={() => setEditingProfile(false)} style={{ padding: "10px 18px", borderRadius: "10px", border: `1px solid ${COLORS.border}`, background: COLORS.surface, cursor: "pointer" }}>
                Cancel
              </button>
              <PrimaryButton onClick={() => setEditingProfile(false)}>Save Changes</PrimaryButton>
            </div>
          )}
        </SectionCard>
      </div>

      <div ref={employmentInfoRef}>
        <SectionCard title="Employment Information">
          {employmentInfo.map(([label, value]) => (
            <ProfileRow key={label} label={label} value={value} />
          ))}
        </SectionCard>
      </div>

      <SectionCard title="Communication Preferences">
        <ProfileRow label="Email Notifications" value="Enabled" status />
        <ProfileRow label="Event Invitations" value="Enabled" status />
        <ProfileRow label="Career Alerts" value="Enabled" status />
        <ProfileRow label="Newsletter Subscription" value="Subscribed" status />
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}><PrimaryButton>Edit Preferences</PrimaryButton></div>
      </SectionCard>

      <SectionCard title="Account & Security">
        <ProfileRow label="Password" value="••••••••" />
        <ProfileRow label="Multi-Factor Authentication" value="Enabled" status />
        <ProfileRow label="Portal Access" value="Active" status />
        <ProfileRow label="Last Login" value="22 Jul 2026" />
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px", gap: "12px" }}><PrimaryButton>Change Password</PrimaryButton></div>
      </SectionCard>
    </div>
  );
}