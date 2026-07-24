export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  experience: string;
  positions: number;
  workMode: string;
  shift: string;
  availability: string;
  summary: string;

  // Internal Alumni Portal page
  detailsUrl: string;

  // Official PalC Careers page
  applyUrl: string;
}

const jobs: Job[] = [
  {
    id: "JD-005",
    title: "Technical Architect / Principal Engineer",
    department: "Engineering",
    location: "Remote",
    employmentType: "Full-time",
    experience: "8+ Years",
    positions: 4,
    workMode: "Remote",
    shift: "US Shift",
    availability: "Immediate - 45 Days",
    summary:
      "Design, implement and optimize dataplane and forwarding features on high-performance networking platforms while working closely with switch/router ASICs, SDKs and network operating systems.",

    detailsUrl: "/careers/JD-005",

    applyUrl:
      "https://palcnetworks.com/job-openings/technical-architect-principal-engineer/",
  },

  {
    id: "JD-004",
    title: "Dataplane / Forwarding Engineer",
    department: "Engineering",
    location: "Bengaluru, India",
    employmentType: "Full-time",
    experience: "5+ Years",
    positions: 2,
    workMode: "Work from Office",
    shift: "Standard",
    availability: "Immediate",
    summary:
      "Develop dataplane forwarding solutions, optimize networking performance and collaborate with hardware and software teams for enterprise networking products.",

    detailsUrl: "/careers/JD-004",

    applyUrl:
      "https://palcnetworks.com/job-openings/dataplane-forwarding-engineer/",
  },

  {
    id: "JD-003",
    title: "Technical Leader – Software Engineer",
    department: "Engineering",
    location: "Bengaluru / Chennai",
    employmentType: "Full-time",
    experience: "8 - 10 Years",
    positions: 1,
    workMode: "Work from Office",
    shift: "Standard",
    availability: "Immediate - 60 Days",
    summary:
      "Lead software engineering initiatives, mentor development teams and deliver scalable enterprise networking software solutions.",

    detailsUrl: "/careers/JD-003",

    applyUrl:
      "https://palcnetworks.com/job-openings/technical-leader-software-engineer/",
  },

  {
    id: "JD-002",
    title: "S/W Engineer / SSE / Tech Lead",
    department: "Engineering",
    location: "Bengaluru / Chennai",
    employmentType: "Full-time",
    experience: "4+ Years",
    positions: 3,
    workMode: "Work from Office",
    shift: "Standard",
    availability: "Immediate",
    summary:
      "Design, develop and maintain high-performance C++ networking software, implement Layer 2/Layer 3 protocols and optimize forwarding pipelines.",

    detailsUrl: "/careers/JD-002",

    applyUrl:
      "https://palcnetworks.com/job-openings/s-w-engineer-sse-tech-lead/",
  },

  {
    id: "JD-001",
    title: "Platform / BSP Engineer",
    department: "Engineering",
    location: "Chennai / Bengaluru",
    employmentType: "Full-time",
    experience: "7 - 20 Years",
    positions: 4,
    workMode: "Hybrid",
    shift: "Standard",
    availability: "Immediate",
    summary:
      "Develop Board Support Packages (BSP), platform software and hardware enablement for enterprise networking devices and next-generation switching platforms.",

    detailsUrl: "/careers/JD-001",

    applyUrl:
      "https://palcnetworks.com/job-openings/job2/",
  },
];

export default jobs;