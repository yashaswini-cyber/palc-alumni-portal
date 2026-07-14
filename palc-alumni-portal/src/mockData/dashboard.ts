export const quickActions = [
  {
    title: "Document Repository",
    description:
      "Access employment documents including Experience Letters, Payslips and Form 16.",
    icon: "📄",
    route: "/documents",
  },

  {
    title: "Employment Verification",
    description:
      "Request and track employment verification certificates.",
    icon: "✔️",
    route: "/verification",
  },

  {
    title: "Career Opportunities",
    description:
      "Explore internal openings and rehire opportunities.",
    icon: "💼",
    route: "/careers",
  },

  {
    title: "Referral Program",
    description:
      "Submit referrals and monitor referral progress.",
    icon: "🤝",
    route: "/referrals",
  },
  {
    title: "Helpdesk",
    description:
      "Raise support requests and monitor ticket status.",
    icon: "🎫",
    route: "/helpdesk",
  },
  {
    title: "Engagement Hub",
    description:
      "Announcements, newsletters, leadership messages and alumni events.",
    icon: "🌐",
    route: "",
    action: "engagementHub",
  },
];
export const overviewStats = [
  {
    id: 1,
    title: "Employment Documents",
    value: "12",
    status: "Available",
    description: "Latest: Experience Certificate",
    buttonText: "Open Repository",
    route: "/documents",
    color: "#2563EB",
  },
  {
    id: 2,
    title: "Verification Requests",
    value: "2",
    status: "Pending",
    description: "Last Approved: 15 Jun 2026",
    buttonText: "Open Verification",
    route: "/verification",
    color: "#16A34A",
  },
  {
    id: 3,
    title: "Career Opportunities",
    value: "18",
    status: "5 New This Week",
    description: "Jobs matching your experience",
    buttonText: "Explore Jobs",
    route: "/careers",
    color: "#0EA5E9",
  },
  {
    id: 4,
    title: "Referral Program",
    value: "1",
    status: "Active Referral",
    description: "Referral under review",
    buttonText: "View Referrals",
    route: "/referrals",
    color: "#9333EA",
  },
  {
    id: 5,
    title: "Helpdesk",
    value: "3",
    status: "Open Requests",
    description: "Average SLA: 2 Days",
    buttonText: "View Tickets",
    route: "/helpdesk",
    color: "#DC2626",
  },
  {
    id: 6,
    title: "Announcements",
    value: "5",
    status: "New",
    description: "Latest company & alumni updates",
    buttonText: "Read Updates",
    route: "/engagement",
    color: "#2563EB",
  },
];