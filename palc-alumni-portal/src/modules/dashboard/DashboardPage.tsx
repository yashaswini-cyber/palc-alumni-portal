import { useState } from "react";
import HeroBanner from "../../shared/components/HeroBanner";
import DashboardCard from "../../shared/components/DashboardCard";
import PageHeader from "../../shared/components/PageHeader";
import QuickActionCard from "../../shared/components/QuickActionCard";
import { quickActions } from "../../mockData/dashboard";
import { overviewStats } from "../../mockData/dashboard";
import DashboardSection from "../../shared/components/DashboardSection";
import { COLORS } from "../../shared/theme/colors";
import { useNavigate } from "react-router-dom";
import jobs from "../../mockData/jobs";
import linkedinLogo from "../../assets/images/linkedin.svg";
import youtubeLogo from "../../assets/images/youtube.svg";
import xLogo from "../../assets/images/x.svg";
import websiteLogo from "../../assets/images/palc-logo.svg";
import ContentCard from "../../shared/components/ContentCard";

import {
  leadershipMessage,
  announcements,
  events,
  successStories,
  technologySpotlight,
  newsletter,
} from "../../mockData/alumniEngagement";

const sectionTitleStyle = {
  margin: "0 0 18px",
  color: COLORS.text,
  fontSize: "24px",
  lineHeight: 1.2,
  fontWeight: 800,
};

const cardStyle = {
  background: COLORS.surface,
  border: `1px solid ${COLORS.border}`,
  borderRadius: "18px",
  padding: "24px",
  boxShadow: "0 18px 42px rgba(15, 23, 42, 0.07)",
};

const buttonStyle = {
  border: "none",
  borderRadius: "12px",
  background: COLORS.primary,
  color: "#FFFFFF",
  padding: "10px 16px",
  fontSize: "13px",
  fontWeight: 700,
  cursor: "pointer",
  fontFamily: "inherit",
  boxShadow: "0 10px 20px rgba(37, 99, 235, 0.20)",
};

const notifications = [
  "Verification request approved",
  "Annual Alumni Meet registrations open",
  "June newsletter published",
  "Referral status updated",
];

const activities = [
  "Downloaded Experience Certificate",
  "Employment Verification Approved",
  "Applied for Senior Software Engineer",
  "Registered for Alumni Meet",
  "Referral Submitted Successfully",
];

const palcVideos = [
  {
    title: "Life at PalC Networks",
    thumbnail: "https://img.youtube.com/vi/sFuKFFQNvpM/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=sFuKFFQNvpM&t=16s",
  },
  {
    title: "PalC Engineering Culture",
    thumbnail: "https://img.youtube.com/vi/94UIAlmWaCk/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=94UIAlmWaCk&t=5s",
  },
  {
    title: "Technology at PalC",
    thumbnail: "https://img.youtube.com/vi/h2tTEc3hkWI/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=h2tTEc3hkWI",
  },
  {
    title: "Innovation Journey",
    thumbnail: "https://img.youtube.com/vi/fdEAdOP5gL4/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=fdEAdOP5gL4",
  },
  {
    title: "PalC Networks",
    thumbnail: "https://img.youtube.com/vi/Z5FrFT7IOW0/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=Z5FrFT7IOW0",
  },
];
function Glyph({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-grid",
        placeItems: "center",
        width: "22px",
        height: "22px",
        fontSize: "11px",
        lineHeight: 1,
        fontWeight: 850,
      }}
    >
      {label}
    </span>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [showLeadership, setShowLeadership] = useState(false);
  return (
    <div
      style={{
        paddingBottom: "44px",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      <PageHeader
        title="Welcome back, John"
        subtitle="Access your employment records, verification services, career opportunities, referrals and alumni engagement updates."
      />
      {/* Hero Header Section */}
        <HeroBanner
  badge="PalC Networks Alumni"
  title="Your connected alumni workspace"
  subtitle="Stay connected with PalC through records, verification, referrals, career opportunities and alumni programs."
  actions={[
    {
      title: "My Documents",
      onClick: () => navigate("/documents"),
    },
    {
      title: "Employment Verification",
      onClick: () => navigate("/verification"),
    },
    {
      title: "Raise Support Ticket",
      onClick: () => navigate("/helpdesk"),
    },
  ]}
  pills={[
    {
      title: "Secure Login",
      value: "Enabled",
      color: "#16A34A",
    },
    {
      title: "Profile",
      value: "90% Complete",
      color: "#D97706",
    },
    {
      title: "Support",
      value: "24×7 Available",
      color: "#9333EA",
    },
  ]}
  summaryCard={
    <>
      <h3
        style={{
          marginTop: 0,
          marginBottom: 20,
        }}
      >
        Account Summary
      </h3>

      {[
        ["Last Login", "25 Jun 2026"],
        ["Documents", "12 Available"],
        ["Profile Completion", "90%"],
        ["Support", "24 × 7"],
      ].map(([label, value]) => (
        <div
          key={label}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 0",
            borderBottom: `1px solid ${COLORS.border}`,
          }}
        >
          <span
            style={{
              color: COLORS.textSecondary,
            }}
          >
            {label}
          </span>

          <strong>{value}</strong>
        </div>
      ))}
    </>
  }
/>
      <section
  style={{
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "24px",
  }}
>
  <div
    style={{
      background: "#FFFFFF",
      borderRadius: "18px",
      border: `1px solid ${COLORS.border}`,
      padding: "24px",
      boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
    }}
  >
    <h3
      style={{
        marginTop: 0,
        marginBottom: "18px",
      }}
    >
      Since Your Last Visit
    </h3>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        gap: "16px",
      }}
    >
      {[
        "2 New Employment Documents",
        "1 Verification Approved",
        "5 New Career Opportunities",
        "Annual Alumni Meet Registration Open",
      ].map((item) => (
        <div
          key={item}
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            background: "#F8FBFF",
            padding: "14px",
            borderRadius: "12px",
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "10px",
              background: COLORS.primaryLight,
              color: COLORS.primary,
              display: "grid",
              placeItems: "center",
              fontWeight: 700,
            }}
          >
            ✓
          </div>

          <span
            style={{
              fontSize: "14px",
              color: COLORS.text,
              fontWeight: 600,
            }}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  </div>

  <div
    style={{
      background: "#EFF6FF",
      borderRadius: "18px",
      border: "1px solid #BFDBFE",
      padding: "24px",
    }}
  >
    <h3
      style={{
        marginTop: 0,
        color: COLORS.primary,
      }}
    >
      Reminder
    </h3>

    <p
      style={{
        lineHeight: 1.8,
        color: COLORS.text,
        fontSize: "14px",
      }}
    >
      Keep your personal details updated to continue receiving employment
      verification updates, referral notifications, alumni events and career
      opportunities.
    </p>

    <button
  style={{
    ...buttonStyle,
    marginTop: "12px",
    width: "100%",
  }}
  onClick={() => navigate("/profile")}
>
  Update Profile
</button>
  </div>
</section>

  {/* Quick Actions */}
    <section>

  <h2 style={sectionTitleStyle}>
    Quick Actions
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(220px,1fr))",
      gap: "16px",
    }}
  >
    {quickActions.map((item) => (
      <QuickActionCard
        key={item.title}
        title={item.title}
        subtitle={item.description}
        onClick={() => navigate(item.route)}
      />
    ))}
  </div>

</section>

      {/* Overview */}
      <section>

  <h2 style={sectionTitleStyle}>
    Overview
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(280px,1fr))",
      gap: "20px",
    }}
  >
    {overviewStats.map((item) => (
      <DashboardCard
        key={item.id}
        title={item.title}
        value={item.value}
        status={item.status}
        description={item.description}
        buttonText={item.buttonText}
        color={item.color}
        onClick={() => navigate(item.route)}
      />
    ))}
  </div>

</section>

      {/* Employment Verification Section */}
      <DashboardSection
        title="Employment Verification"
        subtitle="Manage employment verification requests, download digitally verified certificates and track request progress."
        actionText="Open Verification Center"
        onActionClick={() => navigate("/verification")}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "18px" }}>
          {[
            { title: "Pending Requests", value: "2", color: "#2563EB", bg: "#F5F9FF" },
            { title: "Completed", value: "9", color: "#16A34A", bg: "#F4FCF6" },
            { title: "Digital Certificates", value: "5", color: "#D97706", bg: "#FFF9EC" },
            { title: "Avg. Processing", value: "2 Days", color: "#DC2626", bg: "#FFF5F5" },
          ].map((item) => (
            <div key={item.title} style={{ background: item.bg, border: `1px solid ${COLORS.border}`, borderRadius: "16px", padding: "22px" }}>
              <p style={{ margin: 0, color: COLORS.textSecondary, fontSize: "13px" }}>{item.title}</p>
              <h2 style={{ marginTop: "12px", marginBottom: 0, fontSize: "30px", color: item.color }}>{item.value}</h2>
            </div>
          ))}
        </div>
      </DashboardSection>

      {/* Career Opportunities Section */}
      <DashboardSection
        title="Career Opportunities"
        subtitle="Latest opportunities from the PalC Careers Portal."
        actionText="View All"
        onActionClick={() => navigate("/careers")}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {jobs.slice(0, 3).map((job) => (
            <div key={job.id} style={{ border: `1px solid ${COLORS.border}`, borderRadius: "16px", padding: "24px", background: "#FBFDFF" }}>
              <h3 style={{ margin: 0, color: COLORS.text, fontSize: "21px" }}>{job.title}</h3>
              <p style={{ color: COLORS.primary, marginTop: "8px", marginBottom: "22px", fontSize: "14px", fontWeight: 600 }}>
                {job.department} • {job.location} • {job.employmentType}
              </p>
              <p style={{ color: COLORS.textSecondary, fontSize: "13px", lineHeight: 1.6, marginBottom: "16px" }}>
                {job.summary.length > 140 ? job.summary.substring(0, 140) + "..." : job.summary}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <span style={{ background: "#E8F1FF", color: COLORS.primary, padding: "7px 14px", borderRadius: "18px", fontSize: "13px", fontWeight: 600 }}>
                    {job.experience}
                  </span>
                  <span style={{ background: "#EEF8F1", color: "#15803D", padding: "5px 10px", borderRadius: "18px", fontSize: "12px", fontWeight: 600 }}>
                    {job.workMode}
                  </span>
                </div>
                <button
                  style={{ ...buttonStyle, padding: "11px 22px", borderRadius: "10px", fontWeight: 600 }}
                  onClick={() => window.open(job.applyUrl, "_blank")}
                >
                  View & Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </DashboardSection>

      {/* Notifications Section */}
      <DashboardSection
        title="Notifications"
        actionText="View All →"
        onActionClick={() => navigate("/notifications")}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "16px" }}>
          {notifications.map((notification) => (
            <div
              key={notification}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "18px",
                background: "#FFFFFF",
                border: `1px solid ${COLORS.border}`,
                borderRadius: "14px",
                boxShadow: "0 2px 8px rgba(15,23,42,0.05)",
                transition: "0.2s ease",
                cursor: "pointer",
              }}
            >
              <Glyph label="NT" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "15px", fontWeight: 600, color: COLORS.text, marginBottom: "4px" }}>
                  {notification}
                </div>
                <div style={{ fontSize: "13px", color: COLORS.textSecondary }}>
                  Click to view more details
                </div>
              </div>
            </div>
          ))}
        </div>
      </DashboardSection>

{/* Alumni Engagement Hub */}

<section
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  }}
>
  <PageHeader
    title="Alumni Engagement Hub"
    subtitle="Stay connected with PalC through leadership updates, community news, featured technologies, events and alumni success stories."
  />
  
    {/* Leadership*/}
      <ContentCard badge="Leadership">
  <div
    style={{
      display: "flex",
      gap: "36px",
      alignItems: "flex-start",
    }}
  >
    {/* CEO Image */}

    <img
      src={leadershipMessage.image}
      alt={leadershipMessage.author}
      style={{
        width: "220px",
        height: "280px",
        borderRadius: "18px",
        objectFit: "cover",
        flexShrink: 0,
        boxShadow: "0 12px 30px rgba(15,23,42,0.12)",
      }}
    />

    {/* Right Side */}

    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "24px",
          fontWeight: 800,
          color: COLORS.text,
          lineHeight: 1.2,
        }}
      >
        {leadershipMessage.author}
      </h2>

      <p
        style={{
          marginTop: "10px",
          marginBottom: "24px",
          color: COLORS.primary,
          fontWeight: 600,
          fontSize: "17px",
          lineHeight: 1.5,
        }}
      >
        {leadershipMessage.designation}
      </p>

      <p
        style={{
          margin: 0,
          color: COLORS.textSecondary,
          lineHeight: 1.85,
          fontSize: "15px",
        }}
      >
        {showLeadership
          ? leadershipMessage.fullContent
          : leadershipMessage.preview}
      </p>

      <button
        onClick={() => setShowLeadership(!showLeadership)}
        style={{
          marginTop: "22px",
          alignSelf: "flex-start",
          border: "none",
          background: "transparent",
          color: COLORS.primary,
          fontWeight: 700,
          fontSize: "15px",
          cursor: "pointer",
          padding: 0,
        }}
      >
        {showLeadership ? "Read Less ▲" : "Read More ▼"}
      </button>
    </div>
  </div>
</ContentCard>
    
    {/* Remaining Cards*/}
    <div
      style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: "24px",
      alignItems: "start",
  }}
>
    {/* Announcements */}
      <ContentCard
        badge="Announcements"
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: 22,
            color: COLORS.text,
          }}
        >
          Latest Community Updates
        </h2>

        {announcements.map((item) => (
          <div
            key={item.title}
            style={{
              paddingBottom: 18,
              marginBottom: 18,
              borderBottom: `1px solid ${COLORS.border}`,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: 17,
                color: COLORS.text,
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                marginTop: 10,
                marginBottom: 12,
                lineHeight: 1.7,
                color: COLORS.textSecondary,
              }}
            >
              {item.description}
            </p>

            <span
              style={{
                color: COLORS.primary,
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              {item.date}
            </span>
          </div>
        ))}
      </ContentCard>

      {/* Technology Spotlight */}

<ContentCard badge="Technology">
  <h2
    style={{
      marginTop: 0,
      marginBottom: 24,
      color: COLORS.text,
    }}
  >
    Technology Spotlight
  </h2>

  {[
    {
      title: "SONiC & Open Networking",
      description:
        "Discover how PalC Networks enables next-generation open networking with production-grade SONiC deployments, EVPN/VXLAN fabrics, SRv6, OpenTelemetry, and multi-vendor switching solutions engineered for modern enterprise and data centre environments.",
      link: "https://palcnetworks.com/solutions/sonic-open-networking/",
    },
    {
      title: "AI Data Centre Fabrics",
      description:
        "Explore scalable AI infrastructure built for high-performance workloads using lossless Ethernet, GPU cluster networking, RoCEv2 optimisation, and resilient spine-leaf architectures designed for cloud-scale deployments.",
      link: "https://palcnetworks.com/solutions/data-center-modernization-ai-fabrics/",
    },
  ].map((tech, index) => (
    <div
      key={tech.title}
      style={{
        paddingBottom: index === 0 ? "24px" : "0",
        marginBottom: index === 0 ? "24px" : "0",
        borderBottom:
          index === 0
            ? `1px solid ${COLORS.border}`
            : "none",
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: "18px",
          color: COLORS.text,
          fontWeight: 800,
        }}
      >
        {tech.title}
      </h3>

      <p
        style={{
          marginTop: "12px",
          marginBottom: "16px",
          color: COLORS.textSecondary,
          lineHeight: 1.8,
          fontSize: "14px",
        }}
      >
        {tech.description}
      </p>

      <button
        onClick={() => window.open(tech.link, "_blank")}
        style={{
          border: "none",
          background: "transparent",
          color: COLORS.primary,
          fontWeight: 700,
          cursor: "pointer",
          padding: 0,
          fontSize: "14px",
        }}
      >
        Learn More →
      </button>
    </div>
  ))}
    <div
  style={{
    marginTop: "28px",
    paddingTop: "22px",
    paddingBottom: "18px",   // ← Added whitespace
    borderTop: `1px solid ${COLORS.border}`,
    display: "flex",
    justifyContent: "center",
  }}
>
        <button
      onClick={() =>
        window.open(
          "https://palcnetworks.com/solutions/",
          "_blank"
        )
      }
      style={{
        ...buttonStyle,
        minWidth: "220px",
        justifyContent: "center",
      }}
    >
      Explore All Solutions →
    </button>
  </div>
</ContentCard>
            
      {/*Success Stories*/}
      <ContentCard badge="Success Story">
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    }}
  >
    {/* Description */}
    {/* Section Heading */}

<h2
  style={{
    margin: "0 0 10px",
    color: COLORS.text,
    fontSize: "22px",
    fontWeight: 800,
    lineHeight: 1.2,
  }}
>
  Featured Success Story
</h2>

{/* Description */}

<p
  style={{
    margin: "0 0 16px",
    fontSize: "14px",
    lineHeight: 1.6,
    color: COLORS.textSecondary,
  }}
>
  Watch inspiring stories celebrating PalC Networks' journey,
  engineering excellence, innovation, and the people who continue
  to shape our growing technology community.
</p>

    {/* Video Card */}

    <div
      onClick={() =>
        window.open(
          "https://www.youtube.com/watch?v=knoXGE-YdF4",
          "_blank"
        )
      }
      style={{
        cursor: "pointer",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#FFFFFF",
        border: `1px solid ${COLORS.border}`,
        transition: "0.2s ease",
        boxShadow: "0 6px 18px rgba(15,23,42,0.06)",
      }}
    >
      {/* Thumbnail */}

      <img
        src="https://i.ytimg.com/vi/knoXGE-YdF4/hqdefault.jpg"
        alt="Celebrating 7 Years: Voices of Our Journey"
        style={{
          width: "100%",
          height: "145px",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* Title */}

      <div
        style={{
          padding: "16px",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "17px",
            lineHeight: 1.3,
            color: COLORS.text,
            fontWeight: 800,
          }}
        >
          Celebrating 7 Years: Voices of Our Journey
        </h3>

        <p
          style={{
            marginTop: "10px",
            marginBottom: 0,
            fontSize: "15px",
            fontWeight: 700,
            color: COLORS.primary,
          }}
        >
          ▶ Watch on YouTube
        </p>
      </div>
    </div>
  </div>
</ContentCard>
    {/* Upcoming Event */}

<ContentCard badge="Upcoming Event">
  <h2
    style={{
      marginTop: 0,
      marginBottom: "12px",
      color: COLORS.text,
      fontSize: "22px",
      fontWeight: 800,
    }}
  >
    Alumni Events
  </h2>

  <p
    style={{
      margin: "0 0 22px",
      color: COLORS.textSecondary,
      fontSize: "14px",
      lineHeight: 1.7,
    }}
  >
    Reconnect with fellow alumni through networking events,
    technical sessions and community meetups organised by
    PalC Networks.
  </p>

  <div
    style={{
      border: `1px solid ${COLORS.border}`,
      borderRadius: "16px",
      padding: "16px",
      background: "#FBFDFF",
      marginBottom: "16px",
    }}
  >
    <span
      style={{
        display: "inline-block",
        background: "#E8F1FF",
        color: COLORS.primary,
        padding: "6px 12px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: 700,
        marginBottom: "16px",
      }}
    >
      Featured Event
    </span>

    <h3
      style={{
        margin: 0,
        color: COLORS.text,
        fontSize: "19px",
        fontWeight: 800,
      }}
    >
      Annual Alumni Meet 2026
    </h3>

    <p
      style={{
        marginTop: "14px",
        marginBottom: "10px",
        color: COLORS.textSecondary,
        lineHeight: 1.6,
      }}
    >
    Reconnect with fellow alumni through networking, leadership
    interactions and technology discussions.
    </p>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        marginTop: "10px",
        color: COLORS.text,
        fontSize: "14px",
      }}
    >
      <span>📅 15 August 2026</span>
      <span>📍 Bangalore, India</span>
      <span>🕒 5:00 PM – 8:30 PM</span>
    </div>
  </div>

  <div
    style={{
      display: "flex",
      justifyContent: "center",
    }}
  >
    <button
      onClick={() => navigate("/events")}
      style={{
        ...buttonStyle,
        minWidth: "220px",
      }}
    >
      View All Events →
    </button>
  </div>
</ContentCard> 
</div>
</section>

{/* Stay Connected with PalC */}
<DashboardSection
  title="Stay Connected with PalC"
  subtitle="Stay connected with PalC through engineering insights, company culture, product updates and our official communication channels."
>
  {/* Featured Videos */}

  <h3
    style={{
      marginTop: 0,
      marginBottom: "18px",
      color: COLORS.text,
    }}
  >
    Featured Videos
  </h3>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
      gap: "20px",
      marginBottom: "36px",
    }}
  >
    {[
      {
        title: "Partner Interview: Kingston Smiler Selvaraj, Founder and CEO of PALC Networks",
        id: "sFuKFFQNvpM",
        url: "https://www.youtube.com/watch?v=sFuKFFQNvpM&t=16s",
      },
      {
        title: "PalC Networks at SONiC India Workshop 2025",
        id: "94UIAlmWaCk",
        url: "https://www.youtube.com/watch?v=94UIAlmWaCk&t=5s",
      },
      {
        title: "Network Monitoring with SONiC",
        id: "h2tTEc3hkWI",
        url: "https://www.youtube.com/watch?v=h2tTEc3hkWI",
      },
      {
        title: "Behind-the-Scenes at PalC Networks!",
        id: "fdEAdOP5gL4",
        url: "https://www.youtube.com/watch?v=fdEAdOP5gL4",
      },
      {
        title: "PalC building something extraordinary! Shaping a brighter future through hardwork & success!",
        id: "Z5FrFT7IOW0",
        url: "https://www.youtube.com/watch?v=Z5FrFT7IOW0",
      },
    ].map((video) => (
      <div
        key={video.id}
        onClick={() => window.open(video.url, "_blank")}
        style={{
          cursor: "pointer",
          borderRadius: "18px",
          overflow: "hidden",
          background: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          boxShadow: "0 10px 24px rgba(15,23,42,.08)",
          transition: ".25s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <img
          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
          alt={video.title}
          style={{
            width: "100%",
            height: "170px",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            padding: "18px",
          }}
        >
          <h4
            style={{
              margin: 0,
              color: COLORS.text,
              fontSize: "16px",
            }}
          >
            {video.title}
          </h4>

          <p
            style={{
              marginTop: "10px",
              marginBottom: 0,
              color: COLORS.primary,
              fontWeight: 700,
              fontSize: "14px",
            }}
          >
            ▶ Watch on YouTube
          </p>
        </div>
      </div>
    ))}
  </div>

  {/* Divider */}

  <div
    style={{
      height: "1px",
      background: COLORS.border,
      marginBottom: "28px",
    }}
  />
  {/* Follow PalC */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "20px",
    }}
  >
    <div>
      <h3
        style={{
          margin: 0,
          color: COLORS.text,
        }}
      >
        Follow PalC
      </h3>

      <p
        style={{
          marginTop: "8px",
          marginBottom: 0,
          color: COLORS.textSecondary,
          fontSize: "14px",
          lineHeight: 1.6,
        }}
      >
        Stay connected through our official channels for engineering updates,
        product launches, career opportunities and alumni initiatives.
      </p>
    </div>

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "24px",
      }}
    >
      {[
        {
          logo: linkedinLogo,
          url: "https://www.linkedin.com/company/palcnetworks/posts/?feedView=all",
          alt: "LinkedIn",
        },
        {
          logo: xLogo,
          url: "https://x.com/palcnetworks",
          alt: "X",
        },
        {
          logo: youtubeLogo,
          url: "https://www.youtube.com/@palcnetworks",
          alt: "YouTube",
        },
        {
          logo: websiteLogo,
          url: "https://palcnetworks.com",
          alt: "Website",
        },
      ].map((item) => (
        <div
          key={item.alt}
          onClick={() => window.open(item.url, "_blank")}
          style={{
            width: "58px",
            height: "58px",
            background: "#F8FAFC",
            borderRadius: "16px",
            border: `1px solid ${COLORS.border}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            transition: ".2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#EFF6FF";
            e.currentTarget.style.transform = "translateY(-3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#F8FAFC";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <img
            src={item.logo}
            alt={item.alt}
            style={{
              width: "28px",
              height: "28px",
              objectFit: "contain",
            }}
          />
        </div>
      ))}
    </div>
  </div>
</DashboardSection>
      {/*My Requests and Updates Section */}
      {/*This section is incomplete- must contain info about different modules in the interface*/}
      <DashboardSection title="My Requests and Updates">
        <div style={{ display: "flex", flexDirection: "column" }}>
          {activities.map((item, index) => (
            <div key={item} style={{ display: "flex", gap: "14px", padding: "16px 0", borderBottom: index === activities.length - 1 ? "none" : `1px solid ${COLORS.border}` }}>
              <div style={{ width: "34px", height: "34px", borderRadius: "12px", background: "#EFF6FF", color: COLORS.primary, display: "grid", placeItems: "center", flex: "0 0 auto" }}>
                <Glyph label="OK" />
              </div>
              <div>
                <strong style={{ color: COLORS.text, fontSize: "14px" }}>{item}</strong>
                <p style={{ margin: "4px 0 0", fontSize: "13px", color: COLORS.textSecondary }}>{index + 1} day(s) ago</p>
              </div>
            </div>
          ))}
        </div>
      </DashboardSection>
    </div>
  );
}