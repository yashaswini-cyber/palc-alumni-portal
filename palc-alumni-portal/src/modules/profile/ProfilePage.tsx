import HeroBanner from "../../shared/components/HeroBanner";
import StatsCard from "../../shared/components/StatsCard";
import SectionCard from "../../shared/components/SectionCard";
import PrimaryButton from "../../shared/components/PrimaryButton";
import { COLORS } from "../../shared/theme/colors";
import { useNavigate } from "react-router-dom";

const personalInfo = [
  ["Name", "John Doe"],
  ["Email", "john.doe@email.com"],
  ["Phone", "+91 9876543210"],
  ["Location", "Bangalore"],
];

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
const ProfileRow=({label,value,status}:{label:string;value:string;status?:boolean})=>(
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 0",borderBottom:`1px solid ${COLORS.border}`}}>
  <span style={{color:COLORS.textSecondary,fontSize:"14px"}}>{label}</span>
  {status?
  <div style={{padding:"5px 12px",borderRadius:"999px",background:"#EAF7EC",color:"#15803D",fontSize:"12px",fontWeight:700}}>
  {value}
  </div>
  :
  <strong style={{color:COLORS.text,fontWeight:600,fontSize:"14px"}}>{value}</strong>}
  </div>
  );

export default function ProfilePage() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("palcAuth");
    navigate("/login", { replace: true });
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

      <HeroBanner
        badge="ALUMNI PROFILE"
        title="Welcome, John Doe"
        subtitle="Manage your personal details, employment information, communication preferences and account security."
        actions={[
          { title: "Edit Profile", onClick: () => {} },
          { title: "Download Profile", onClick: () => {} }
        ]}
        summaryCard={
          <div style={{display:"flex",alignItems:"flex-start",gap:"14px"}}>
          <div style={{width:"54px",height:"54px",borderRadius:"50%",background:"linear-gradient(135deg,#0A1B3D 0%,#123A7A 45%,#2563EB 80%)",display:"flex",alignItems:"center",justifyContent:"center",color:"#FFF",fontSize:"21px",fontWeight:800,flexShrink:0,marginTop:"2px"}}>
          JD
          </div>
          <div style={{display:"flex",flexDirection:"column",flex:1,gap:"6px"}}>
          <div style={{fontSize:"24px",fontWeight:800,color:COLORS.text,lineHeight:1}}>
          John Doe
          </div>
          <div style={{fontSize:"15px",fontWeight:500,color:COLORS.textSecondary}}>
          Senior Software Engineer
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap",marginTop:"2px"}}>
          <div style={{padding:"5px 12px",borderRadius:"999px",background:"#EAF7EC",color:"#15803D",fontSize:"12px",fontWeight:700}}>
          ● Active
          </div>
          <div style={{padding:"5px 12px",borderRadius:"999px",background:"#EFF6FF",color:"#2563EB",fontSize:"12px",fontWeight:700}}>
          EMP12345
          </div>
          </div>
          <div style={{fontSize:"13px",color:COLORS.textSecondary}}>
          PalC Alumni since Apr 2026
          </div>
          </div>
          </div>
          }
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "22px" }}>
        {stats.map((card) => (
          <StatsCard
            key={card.title}
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
          />
        ))}
      </div>

      <>
  <SectionCard title="Personal Information">
    {personalInfo.map(([label, value]) => (
      <ProfileRow key={label} label={label} value={value} />
    ))}
  </SectionCard>

  <SectionCard title="Employment Information">
    {employmentInfo.map(([label, value]) => (
      <ProfileRow key={label} label={label} value={value} />
    ))}
  </SectionCard>

  <SectionCard title="Communication Preferences">
      <ProfileRow label="Email Notifications" value="Enabled" status />
      <ProfileRow label="Event Invitations" value="Enabled" status />
      <ProfileRow label="Career Alerts" value="Enabled" status />
      <ProfileRow label="Newsletter Subscription" value="Subscribed" status />

      <div style={{display:"flex",justifyContent:"flex-end",marginTop:"24px"}}>
        <PrimaryButton>Edit Preferences</PrimaryButton>
      </div>
  </SectionCard>

    <SectionCard title="Account & Security">
      <ProfileRow label="Password" value="••••••••" />
      <ProfileRow label="Multi-Factor Authentication" value="Enabled" status />
      <ProfileRow label="Portal Access" value="Active" status />
      <ProfileRow label="Last Login" value="22 Jul 2026" />
      <div style={{display:"flex",justifyContent:"flex-end",marginTop:"24px",gap:"12px"}}>
        <PrimaryButton>Change Password</PrimaryButton>
      </div>
    </SectionCard>
  </>

      </div>
  );
}