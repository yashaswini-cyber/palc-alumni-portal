import { useEffect, useRef, useState, useMemo, forwardRef } from "react";
import HeroBanner from "../../shared/components/HeroBanner";
import PrimaryButton from "../../shared/components/PrimaryButton";
import StatsCard from "../../shared/components/StatsCard";
import SectionCard from "../../shared/components/SectionCard";
import SearchBar from "../../shared/components/SearchBar";
import StatusBadge from "../../shared/components/StatusBadge";
import { COLORS } from "../../shared/theme/colors";
import { getHelpdeskTickets, saveHelpdeskTickets } from "../../shared/utils/storage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DetailsModal from "../../shared/components/DetailsModal";

type ConversationMessage = {
  id:string;
  sender:"Employee"|"Support";
  message:string;
  time:string;
};

type HelpdeskTicket={
  id:string;
  subject:string;
  category:string;
  priority:string;
  status:string;
  createdOn:string;
  updatedOn:string;
  description?:string;
  attachment?:File|null;
  requiredBy?:Date|null;
  conversation?:ConversationMessage[];
};

const tickets: HelpdeskTicket[] = [
  {
    id: "TKT001",
    subject: "Unable to access VPN",
    category: "IT",
    priority: "High",
    status: "Open",
    createdOn: "08 Jul 2026",
    updatedOn: "08 Jul 2026",
    description: "Unable to establish VPN connection after changing my password.",
    requiredBy: null,
    attachment: null,
    conversation: [
      { id: "1", sender: "Employee", message: "Unable to establish VPN connection after changing my password.", time: "08 Jul 2026 • 09:15 AM" },
      { id: "2", sender: "Support", message: "We've received your request. Our IT team is currently investigating the issue.", time: "08 Jul 2026 • 09:40 AM" }
    ]
  },
  {
    id: "TKT002",
    subject: "Payslip not available",
    category: "Payroll",
    priority: "Medium",
    status: "Resolved",
    createdOn: "05 Jul 2026",
    updatedOn: "07 Jul 2026",
    description: "June payslip is missing from the employee portal.",
    requiredBy: null,
    attachment: null,
    conversation: [
      { id: "1", sender: "Employee", message: "My June payslip is not visible in the portal.", time: "05 Jul 2026 • 11:20 AM" },
      { id: "2", sender: "Support", message: "The payroll system has been refreshed. Please check again.", time: "05 Jul 2026 • 01:05 PM" },
      { id: "3", sender: "Employee", message: "I can see it now. Thank you.", time: "05 Jul 2026 • 01:18 PM" }
    ]
  },
  {
    id: "TKT003",
    subject: "Email password reset",
    category: "IT",
    priority: "Low",
    status: "In Progress",
    createdOn: "04 Jul 2026",
    updatedOn: "06 Jul 2026",
    description: "Need to reset my corporate email password.",
    requiredBy: null,
    attachment: null,
    conversation: [
      { id: "1", sender: "Employee", message: "I forgot my Outlook password.", time: "04 Jul 2026 • 03:40 PM" },
      { id: "2", sender: "Support", message: "Your password reset request has been assigned to the IT team.", time: "04 Jul 2026 • 04:05 PM" }
    ]
  }
];

const helpdeskStats = {
  totalTickets: tickets.length,
  openTickets: tickets.filter((t) => t.status === "Open").length,
  inProgressTickets: tickets.filter((t) => t.status === "In Progress").length,
  resolvedTickets: tickets.filter((t) => t.status === "Resolved").length,
};

const statsCards = [
  { title: "Total Tickets", value: helpdeskStats.totalTickets.toString(), subtitle: "Support requests submitted", accentColor: "#2563EB" },
  { title: "Open Tickets", value: helpdeskStats.openTickets.toString(), subtitle: "Awaiting resolution", accentColor: "#D97706" },
  { title: "In Progress", value: helpdeskStats.inProgressTickets.toString(), subtitle: "Currently being worked on", accentColor: "#0891B2" },
  { title: "Resolved", value: helpdeskStats.resolvedTickets.toString(), subtitle: "Successfully completed", accentColor: "#16A34A" },
];

// Reusable Shared Styles
const inputStyle = { width: "100%", padding: "12px 14px", borderRadius: 10, border: `1px solid ${COLORS.border}`, background: "#FFFFFF" };
const labelStyle = { display: "block", marginBottom: 8, fontWeight: 600, color: COLORS.text };
const sectionGap = { marginTop: 28 };
const selectFilterStyle = { padding: "12px 16px", borderRadius: "12px", border: `1px solid ${COLORS.border}`, background: COLORS.surface, color: COLORS.text };
const secondaryButtonStyle = { padding: "10px 18px", borderRadius: "10px", border: "1px solid #CBD5E1", background: "#FFFFFF", color: "#1E293B", fontWeight: 600, cursor: "pointer", transition: ".2s" };

const CustomDateInput = forwardRef<HTMLInputElement, { value?: string; onClick?: () => void }>(({ value, onClick }, ref) => (
  <input ref={ref} onClick={onClick} value={value} readOnly placeholder="Select required completion date" style={inputStyle} />
));
CustomDateInput.displayName = "CustomDateInput";

const getPriorityStyle = (priority: string) => {
  switch (priority) {
    case "Critical": return { background: "#FEE2E2", color: "#B91C1C" };
    case "High": return { background: "#FEF3C7", color: "#B45309" };
    case "Medium": return { background: "#DBEAFE", color: "#1D4ED8" };
    default: return { background: "#DCFCE7", color: "#15803D" };
  }
};

const relatedArticles: Record<string, string[]> = {
  "IT Support": [
    "VPN Connection Issues",
    "Reset Corporate Password",
    "Configure Outlook",
  ],
  HR: [
    "Leave Policy",
    "Employee Benefits",
    "HR Portal Guide",
  ],
  Payroll: [
    "Payslip Download",
    "Tax Declaration",
    "Salary Credit FAQ",
  ],
  Benefits: [
    "Insurance Enrollment",
    "Medical Claims",
    "Wellness Benefits",
  ],
  Documents: [
    "Download Experience Certificate",
    "Request Form 16",
    "Document Access Guide",
  ],
  "Employment Verification": [
    "Employment Verification Process",
    "Generate Verification Letter",
    "Verification FAQs",
  ],
  Accounts: [
    "Expense Reimbursement",
    "Travel Claims",
    "Finance Help",
  ],
  Other: [
    "General Support",
    "Helpdesk Guidelines",
    "Contact Support",
  ],
};

type DetailItemProps = { label: string; value: React.ReactNode };
const DetailItem = ({ label, value }: DetailItemProps) => (
  <div>
    <div style={{ fontSize: "13px", fontWeight: 600, color: COLORS.textSecondary, marginBottom: "8px" }}>{label}</div>
    <div style={{ fontSize: "16px", fontWeight: 600, color: COLORS.text }}>{value}</div>
  </div>
);

export default function HelpdeskPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [priorityFilter, setPriorityFilter] = useState("All Priorities");
  const [ticketList, setTicketList] = useState(() => getHelpdeskTickets(tickets));
  const [showAllTickets, setShowAllTickets] = useState(false);
  const [requiredBy, setRequiredBy] = useState<Date | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<HelpdeskTicket | null>(null);
  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [replyMessage,setReplyMessage]=useState("");
  const [ticketForm, setTicketForm] = useState({ category: "IT Support", priority: "Medium", subject: "", description: "", attachment: null as File | null });

  const handleTicketChange = (field: keyof typeof ticketForm, value: string | File | null) => {
    setTicketForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetTicketForm = () => {
    setTicketForm({ category: "IT Support", priority: "Medium", subject: "", description: "", attachment: null });
    setRequiredBy(null);
  };

  useEffect(() => { saveHelpdeskTickets(ticketList); }, [ticketList]);
  const ticketsSectionRef = useRef<HTMLDivElement>(null);

  const openCreateTicket = () => {
    document.getElementById("create-ticket")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  
  const cancelCreateTicket = () => { resetTicketForm(); };
  
  const handleSubmitTicket = () => {
    if (!ticketForm.subject.trim() || !ticketForm.description.trim() || !requiredBy) {
      alert("Please complete all mandatory fields.");
      return;
    }

    const ticketId = `HD-${Date.now()}`;
    const newTicket: HelpdeskTicket={
    id:ticketId,
    subject:ticketForm.subject,
    category:ticketForm.category,
    priority:ticketForm.priority,
    description:ticketForm.description,
    attachment:ticketForm.attachment,
    requiredBy,
    status:"Open",
    createdOn:new Date().toLocaleDateString(),
    updatedOn:"Just now",
    conversation:[{
    id:crypto.randomUUID(),
    sender:"Employee",
    message:ticketForm.description,
    time:new Date().toLocaleString()
    }]
    };
    setTicketList((prev) => [newTicket, ...prev]);
    resetTicketForm();
    setSuccessMessage(`✓ Ticket ${ticketId} has been created successfully.`);
    requestAnimationFrame(() =>
      ticketsSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    );
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  const openTicketDetails = (ticket: HelpdeskTicket) => {
    setSelectedTicket(ticket);
    setShowTicketDetails(true);
  };
  const closeTicketDetails=()=>{
    setReplyMessage("");
    setShowTicketDetails(false);
    setSelectedTicket(null);
  };
  const sendReply=()=>{
    if(!selectedTicket||!replyMessage.trim()) return;
      const reply={id:crypto.randomUUID(),sender:"Employee" as const,message:replyMessage.trim(),time:new Date().toLocaleString()};
      const updated=ticketList.map(t=>
        t.id===selectedTicket.id
          ? {...t,conversation:[...(t.conversation||[]),reply],updatedOn:"Just now"}
          : t
      );
      setTicketList(updated);
      setSelectedTicket(updated.find(t=>t.id===selectedTicket.id) || null);
      setReplyMessage("");
    };

  const reopenTicket = (ticketId: string) => { console.log(ticketId); };
  const scrollToTickets = () => { ticketsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); };

  const filteredTickets = useMemo(() => {
    return ticketList.filter((ticket) => {
      const matchesSearch = ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) || ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All Statuses" || ticket.status === statusFilter;
      const matchesCategory = categoryFilter === "All Categories" || ticket.category === categoryFilter;
      const matchesPriority = priorityFilter === "All Priorities" || ticket.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
    });
  }, [ticketList, searchQuery, statusFilter, categoryFilter, priorityFilter]);

  const visibleTickets = useMemo(() => showAllTickets ? filteredTickets : filteredTickets.slice(0, 5), [showAllTickets, filteredTickets]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <HeroBanner
        badge="Employee Helpdesk"
        title="Support When You Need It"
        subtitle="Submit support requests, track ticket progress, communicate with support teams, and quickly find answers through the knowledge base—all from one centralized workspace."
        actions={[
          { title: "Create Ticket", onClick: openCreateTicket },
          { title: "View My Tickets", onClick: scrollToTickets },
        ]}
        pills={[
          { title: "Response SLA", value: "< 24 Hours", color: "#22C55E" },
          { title: "Support", value: "IT • HR • Payroll", color: "#3B82F6" },
        ]}
        summaryCard={
          <>
            <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: ".06em" }}>Support Overview</p>
            <h3 style={{ margin: "10px 0 6px", fontSize: "36px", fontWeight: 800 }}>96%</h3>
            <p style={{ margin: 0, color: "#64748B", lineHeight: 1.6 }}>First-response SLA achieved across all employee support requests this month.</p>
            <div style={{ marginTop: "22px", paddingTop: "18px", borderTop: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "13px", color: "#64748B" }}>Avg. Resolution</div>
                <div style={{ fontSize: "18px", fontWeight: 700 }}>18 hrs</div>
              </div>
              <div>
                <div style={{ fontSize: "13px", color: "#64748B" }}>Satisfaction</div>
                <div style={{ fontSize: "18px", fontWeight: 700 }}>4.9 / 5</div>
              </div>
            </div>
          </>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
        {statsCards.map((card) => (
          <StatsCard key={card.title} title={card.title} value={card.value} subtitle={card.subtitle} accentColor={card.accentColor} />
        ))}
      </div>

      <div id="create-ticket">
        <SectionCard title="Create a New Support Ticket" subtitle="Provide the information below to help our support team understand and resolve your issue efficiently.">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "24px" }}>
            <div>
              <label style={labelStyle}>Category *</label>
              <select value={ticketForm.category} onChange={(e) => handleTicketChange("category", e.target.value)} style={inputStyle}>
                <option>IT Support</option>
                <option>HR</option>
                <option>Payroll</option>
                <option>Benefits</option>
                <option>Documents</option>
                <option>Employment Verification</option>
                <option>Accounts</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Priority *</label>
              <select value={ticketForm.priority} onChange={(e) => handleTicketChange("priority", e.target.value)} style={inputStyle}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Subject *</label>
              <input type="text" placeholder="Briefly describe your issue" value={ticketForm.subject} onChange={(e) => handleTicketChange("subject", e.target.value)} style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Required By *</label>
              <div style={{ width: "100%", marginTop: "8px" }}>
                <DatePicker selected={requiredBy} onChange={(date: Date | null) => setRequiredBy(date)} minDate={new Date()} dateFormat="d MMMM yyyy" customInput={<CustomDateInput />} wrapperClassName="verification-datepicker" />
              </div>
            </div>
          </div>

          <div style={sectionGap}>
            <label style={labelStyle}>Issue Description *</label>
            <textarea rows={5} placeholder="Describe the issue in detail. Include any error messages, steps you've already tried, or additional information that may help the support team resolve your request faster." value={ticketForm.description} onChange={(e) => handleTicketChange("description", e.target.value)} style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit", fontSize: "14px" }} />
          </div>
          

          <div style={sectionGap}>
            <label style={{ ...labelStyle, marginBottom: "10px" }}>Supporting Attachment (Optional)</label>
            <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "160px", border: `2px dashed ${COLORS.border}`, borderRadius: "14px", background: "#F8FAFC", cursor: "pointer", transition: ".2s", textAlign: "center", padding: "28px" }}>
              <div style={{ fontSize: "36px" }}>📎</div>
              <div style={{ fontWeight: 700, color: COLORS.text }}>Click to upload supporting files</div>
              <div style={{ color: COLORS.textSecondary, fontSize: "14px", lineHeight: 1.6 }}>Screenshots, PDFs or documents help us resolve your issue faster.</div>
              {ticketForm.attachment && (
                <div style={{ marginTop: "8px", padding: "8px 14px", borderRadius: "999px", background: "#DBEAFE", color: "#1D4ED8", fontWeight: 600, fontSize: "13px" }}>
                  {ticketForm.attachment.name}
                </div>
              )}
              <input type="file" hidden accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" onChange={(e) => handleTicketChange("attachment", e.target.files?.length ? e.target.files[0] : null)} />
            </label>
            <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", color: COLORS.textSecondary, fontSize: "13px" }}>
              <span>
                <strong>Supported:</strong> PDF, PNG, JPG, DOC, DOCX
              </span>

              <span>
                <strong>Maximum Size:</strong> 10 MB
              </span>
            </div>
          </div>

          <div style={{ marginTop: "30px", border: `1px solid ${COLORS.border}`, borderRadius: "14px", padding: "22px", background: "#FFFFFF" }}>
            <h4 style={{ margin: "0 0 14px", color: COLORS.text, fontSize: "17px" }}>
              Related Help Articles
            </h4>

            <p style={{ margin: "0 0 18px", color: COLORS.textSecondary, lineHeight: 1.6 }}>
              These articles may help resolve your issue before submitting a support request.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {relatedArticles[ticketForm.category]?.map((article) => (
                <div key={article}
                  style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 14px", borderRadius: "10px", background: "#F8FAFC", border: `1px solid ${COLORS.border}`, cursor: "pointer", transition: ".2s" }}>
                  <span style={{ color: "#2563EB" }}>📄</span>
                  <span>{article}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "30px", background: "#F8FAFC", border: `1px solid ${COLORS.border}`, borderRadius: "14px", padding: "20px" }}>
            <h4 style={{ margin: "0 0 12px", color: COLORS.text, fontSize: "17px" }}>Support Guidelines</h4>
            <ul style={{ margin: 0, paddingLeft: "20px", color: COLORS.textSecondary, lineHeight: 1.9 }}>
              <li>Our support team aims to provide an initial response within <strong>24 business hours.</strong></li>
              <li>Attach screenshots or supporting documents whenever possible for quicker resolution.</li>
              <li>Track your ticket status anytime under <strong>My Support Tickets.</strong></li>
              <li>You will receive notifications whenever there is an update or response to your ticket.</li>
            </ul>
          </div>

          <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <span style={{ color: "#DC2626", fontSize: 13 }}>* Fields marked are mandatory.</span>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={cancelCreateTicket} style={{ padding: "10px 22px", borderRadius: 8, border: `1px solid ${COLORS.border}`, background: "#FFF", color: COLORS.text, cursor: "pointer", fontWeight: 600 }}>Cancel</button>
              <PrimaryButton onClick={handleSubmitTicket}>Submit Ticket</PrimaryButton>
            </div>
          </div>
        </SectionCard>
      </div>

      <div ref={ticketsSectionRef}>
        {successMessage && (
          <div style={{ background: "#ECFDF5", border: "1px solid #BBF7D0", color: "#166534", padding: "16px 20px", borderRadius: "14px", fontWeight: 600, display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 6px 18px rgba(22,101,52,.08)" }}>
            <span style={{ fontSize: "18px" }}>✓</span>
            {successMessage}
          </div>
        )}
        <SectionCard title="My Support Tickets">
          <div style={{ marginBottom: "22px" }}>
            <div style={{ display: "flex", gap: "18px", flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ flex: 1, minWidth: "320px" }}>
                <SearchBar value={searchQuery} placeholder="Search Ticket, ID, Name, or Category" onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ ...selectFilterStyle, minWidth: "180px" }}>
                <option value="All Statuses">All Statuses</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Waiting for User">Waiting for User</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>

              <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} style={{ ...selectFilterStyle, minWidth: "170px" }}>
                <option value="All Priorities">All Priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>

              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={{ ...selectFilterStyle, minWidth: "190px" }}>
                <option value="All Categories">All Categories</option>
                <option value="IT Support">IT Support</option>
                <option value="HR">HR</option>
                <option value="Payroll">Payroll</option>
                <option value="Documents">Documents</option>
                <option value="Employment Verification">Employment Verification</option>
                <option value="Benefits">Benefits</option>
                <option value="Accounts">Accounts</option>
              </select>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: `1px solid ${COLORS.border}` }}>
                  <th style={{ padding: "12px" }}>Ticket ID</th>
                  <th style={{ padding: "12px" }}>Subject</th>
                  <th style={{ padding: "12px" }}>Category</th>
                  <th style={{ padding: "12px" }}>Priority</th>
                  <th style={{ padding: "12px" }}>Status</th>
                  <th style={{ padding: "12px" }}>Created</th>
                  <th style={{ padding: "12px" }}>Last Updated</th>
                  <th style={{ padding: "12px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ padding: "56px 24px" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
                        <div style={{ width: "72px", height: "72px", borderRadius: "18px", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px" }} />
                        <h3 style={{ margin: 0, color: COLORS.text }}>No Tickets Found</h3>
                        <p style={{ margin: 0, maxWidth: "420px", textAlign: "center", color: COLORS.textSecondary, lineHeight: 1.7 }}>
                          No support requests match your current search or filter criteria. Try changing the filters or create a new support ticket.
                        </p>
                        <PrimaryButton onClick={openCreateTicket}>Create Ticket</PrimaryButton>
                      </div>
                    </td>
                  </tr>
                ) : (
                  visibleTickets.map((ticket) => (
                    <tr key={ticket.id} style={{ borderBottom: `1px solid ${COLORS.border}`, transition: "background .2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#F8FAFC"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                      <td style={{ padding: "16px 12px" }}><span style={{ color: "#2563EB", fontWeight: 700 }}>{ticket.id}</span></td>
                      <td style={{ padding: "16px 12px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          <span style={{ fontWeight: 600 }}>{ticket.subject}</span>
                          <span style={{ fontSize: "12px", color: COLORS.textSecondary }}>{ticket.category}</span>
                        </div>
                      </td>
                      <td style={{ padding: "12px" }}>{ticket.category}</td>
                      <td style={{ padding: "16px 12px" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "82px", padding: "6px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 700, ...getPriorityStyle(ticket.priority) }}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td style={{ padding: "12px" }}><StatusBadge status={ticket.status} /></td>
                      <td style={{ padding: "12px" }}>{ticket.createdOn}</td>
                      <td style={{ padding: "12px" }}>{ticket.updatedOn}</td>
                      <td style={{ padding: "12px" }}>
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                          <button style={secondaryButtonStyle} onClick={() => openTicketDetails(ticket)}>View Details</button>
                          {ticket.status === "Resolved" && (
                            <PrimaryButton onClick={() => reopenTicket(ticket.id)}>Reopen</PrimaryButton>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {filteredTickets.length > 5 && (
              <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
                <PrimaryButton onClick={() => setShowAllTickets((prev) => !prev)}>
                  {showAllTickets ? "Show Less" : `View (${filteredTickets.length}) More Tickets`}
                </PrimaryButton>
              </div>
            )}
          </div>
        </SectionCard>
      </div>
    <DetailsModal open={showTicketDetails} title="Support Ticket Details" onClose={closeTicketDetails}>
      {selectedTicket && (
        <><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "20px", marginBottom: "28px" }}>
            <DetailItem label="Ticket ID" value={selectedTicket.id} />
            <DetailItem label="Subject" value={selectedTicket.subject} />
            <DetailItem label="Category" value={selectedTicket.category} />
            <DetailItem label="Priority" value={<span style={{ display: "inline-flex", padding: "6px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 700, ...getPriorityStyle(selectedTicket.priority) }}>{selectedTicket.priority}</span>} />
            <DetailItem label="Status" value={<StatusBadge status={selectedTicket.status} />} />
            <DetailItem label="Created On" value={selectedTicket.createdOn} />
            <DetailItem label="Last Updated" value={selectedTicket.updatedOn} />
            <DetailItem label="Required By" value={selectedTicket.requiredBy ? new Date(selectedTicket.requiredBy).toLocaleDateString() : "-"} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "22px" }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: COLORS.textSecondary }}>Issue Description</div>
            <div style={{ padding: "16px", border: `1px solid ${COLORS.border}`, borderRadius: "12px", background: COLORS.surface, color: COLORS.text, lineHeight: 1.7 }}>
              {selectedTicket.description || "No description available."}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: COLORS.textSecondary }}>Supporting Attachment</div>
            <div style={{ padding: "16px", border: `1px solid ${COLORS.border}`, borderRadius: "12px", background: COLORS.surface, color: COLORS.text }}>
              {selectedTicket.attachment ? selectedTicket.attachment.name : "No attachment uploaded."}
            </div>
          </div>

          <div style={{marginBottom:"28px"}}>
          <div style={{fontSize:"16px",fontWeight:700,color:COLORS.text,marginBottom:"10px"}}> Conversation</div>
          <div style={{display:"flex",flexDirection:"column",gap:"14px",maxHeight:"220px",overflowY:"auto"}}>
            {selectedTicket.conversation?.map(msg=>(
              <div key={msg.id} style={{display:"flex",justifyContent:msg.sender==="Employee"?"flex-end":"flex-start"}}>
                <div style={{maxWidth:"78%",padding:"14px 16px",borderRadius:"14px",background:msg.sender==="Employee"?"#E0F2FE":"#F8FAFC",border:`1px solid ${COLORS.border}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",gap:"16px",marginBottom:"6px"}}>
                    <span style={{fontWeight:700,fontSize:"13px"}}>{msg.sender==="Employee"?"You":"PalC Support"}</span>
                    <span style={{fontSize:"11px",color:COLORS.textSecondary}}>{msg.time}</span>
                  </div>
                  <div style={{lineHeight:1.7,color:COLORS.text}}>{msg.message}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
          <div style={{display:"flex",flexDirection:"column",gap:"8px",marginTop:"16px",marginBottom:"20px"}}>
            <div style={{fontSize:"13px",fontWeight:600,color:COLORS.textSecondary}}>Reply to Support Team</div>
            <textarea rows={4} placeholder="Add additional information or respond to the support team..." value={replyMessage} onChange={e=>setReplyMessage(e.target.value)} style={{...inputStyle,resize:"vertical",fontFamily:"inherit"}} />
          </div>

          <div style={{display:"flex",justifyContent:"flex-end",gap:"12px"}}>
          <button
              onClick={closeTicketDetails}
              style={{padding:"12px 24px",borderRadius:"8px",border:`1px solid ${COLORS.border}`,background:"#FFF",color:COLORS.text, cursor:"pointer",fontWeight:600,}}
          >Close</button>
          <PrimaryButton onClick={sendReply}>
              Send Reply
          </PrimaryButton>
      </div>
        </>
      )}
    </DetailsModal>
      
    </div>
  );
}