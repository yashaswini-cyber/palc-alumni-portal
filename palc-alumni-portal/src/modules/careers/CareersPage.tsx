import { useMemo, useState, useRef } from "react";
import PrimaryButton from "../../shared/components/PrimaryButton";
import PageHeader from "../../shared/components/PageHeader";
import HeroBanner from "../../shared/components/HeroBanner";
import StatsCard from "../../shared/components/StatsCard";
import SectionCard from "../../shared/components/SectionCard";
import SearchBar from "../../shared/components/SearchBar";
import { COLORS } from "../../shared/theme/colors";
import jobs from "../../mockData/jobs";

const cardStyle = {
  background: COLORS.surface,
  border: `1px solid ${COLORS.border}`,
  borderRadius: "18px",
  padding: "24px",
  marginBottom: "20px",
  boxShadow: "0 18px 42px rgba(15, 23, 42, 0.07)",
  transition: "all 0.2s ease",
  cursor: "pointer",
};

export default function CareersPage() {
  const jobsSectionRef = useRef<HTMLDivElement>(null);
  const rehireSectionRef = useRef<HTMLDivElement>(null);
  const alertsSectionRef = useRef<HTMLDivElement>(null);
  const [searchText, setSearchText] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedWorkMode, setSelectedWorkMode] = useState("All Work Modes");
  const [selectedEmploymentType, setSelectedEmploymentType] = useState("All Types");
  const [sortBy, setSortBy] = useState("Newest");
  const [alertDepartment, setAlertDepartment] = useState("All Departments");
  const [alertWorkMode, setAlertWorkMode] = useState("All Work Modes");
  const [alertFrequency, setAlertFrequency] = useState("Weekly");
  const [jobAlert, setJobAlert] = useState<{
    department: string;
    workMode: string;
    frequency: string;
    active: boolean;
  } | null>(null);
  const [isEditingAlert, setIsEditingAlert] = useState(false);
const [alertMessage, setAlertMessage] = useState("");

  // Cache static options to avoid unnecessary recalculations on state changes
  const departmentOptions = useMemo(() => ["All Departments", ...new Set(jobs.map((job) => job.department))], []);
  const locationOptions = useMemo(() => ["All Locations", ...new Set(jobs.map((job) => job.location))], []);
  const workModeOptions = useMemo(() => ["All Work Modes", ...new Set(jobs.map((job) => job.workMode))], []);
  const employmentTypeOptions = useMemo(() => ["All Types", ...new Set(jobs.map((job) => job.employmentType))], []);

  const careerStats = useMemo(() => {
    const departments = new Set(jobs.map((job) => job.department));
    const locations = new Set(jobs.map((job) => job.location));
    const flexibleRoles = jobs.filter(
      (job) => job.workMode.toLowerCase() === "remote" || job.workMode.toLowerCase() === "hybrid"
    ).length;

    return {
      openPositions: jobs.length,
      departments: departments.size,
      locations: locations.size,
      flexibleRoles,
    };
  }, []);

  const filteredJobs = useMemo(() => {
    const query = searchText.toLowerCase().trim();
    
    let filtered = jobs.filter((job) => {
      const matchesSearch = !query || 
        job.title.toLowerCase().includes(query) ||
        job.department.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query);
      const matchesDepartment = selectedDepartment === "All Departments" || job.department === selectedDepartment;
      const matchesLocation = selectedLocation === "All Locations" || job.location === selectedLocation;
      const matchesWorkMode = selectedWorkMode === "All Work Modes" || job.workMode === selectedWorkMode;
      const matchesEmploymentType = selectedEmploymentType === "All Types" || job.employmentType === selectedEmploymentType;

      return matchesSearch && matchesDepartment && matchesLocation && matchesWorkMode && matchesEmploymentType;
    });

    if (sortBy === "A-Z") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "Department") {
      filtered.sort((a, b) => a.department.localeCompare(b.department));
    }
    
    return filtered;
  }, [searchText, selectedDepartment, selectedLocation, selectedWorkMode, selectedEmploymentType, sortBy]);

  const handleClearFilters = () => {
    setSearchText("");
    setSelectedDepartment("All Departments");
    setSelectedLocation("All Locations");
    setSelectedWorkMode("All Work Modes");
    setSelectedEmploymentType("All Types");
    setSortBy("Newest");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <PageHeader
        title="Career Opportunities"
        subtitle="Explore current opportunities available for PalC Networks alumni and discover your next opportunity."
      />

      <HeroBanner
        badge="PALC CAREERS"
        title="Reconnect. Rejoin. Grow with PalC."
        subtitle="Explore career opportunities across PalC Networks. Browse current openings, discover new teams, and continue your professional journey with an organization you already know."
        actions={[
          {
            title: "View Open Positions",
            onClick: () => jobsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
          },
          {
            title: "Continue Your Journey with PalC",
            onClick: () => rehireSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
          },
          {
            title: "Job Alerts",
            onClick: () => alertsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
          },
        ]}
        pills={[
          { title: "Open Roles", value: `${careerStats.openPositions}`, color: "#38BDF8" },
          { title: "Departments", value: `${careerStats.departments}`, color: "#22C55E" },
        ]}
        summaryCard={
          <>
            <h3 style={{ margin: 0, fontSize: "20px", color: COLORS.text }}>Career Snapshot</h3>
            <p style={{ marginTop: "10px", color: COLORS.textSecondary, lineHeight: 1.6 }}>
              Continue your journey with PalC by exploring current openings across multiple departments and work models.
            </p>
            <div style={{ marginTop: "24px", display: "grid", gap: "14px" }}>
              <div><strong>{careerStats.openPositions}</strong> Active Opportunities</div>
              <div><strong>{careerStats.departments}</strong> Hiring Departments</div>
              <div><strong>{careerStats.flexibleRoles}</strong> Remote / Hybrid Roles</div>
            </div>
          </>
        }
      />

      {/* Statistics Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
        <StatsCard title="Open Positions" value={careerStats.openPositions.toString()} subtitle="Current opportunities" accentColor="#2563EB" />
        <StatsCard title="Hiring Departments" value={careerStats.departments.toString()} subtitle="Across the organization" accentColor="#16A34A" />
        <StatsCard title="Locations" value={careerStats.locations.toString()} subtitle="Hiring locations" accentColor="#9333EA" />
        <StatsCard title="Remote / Hybrid" value={careerStats.flexibleRoles.toString()} subtitle="Flexible opportunities" accentColor="#D97706" />
      </div>

      {/* Current Opportunities */}
      <SectionCard
        title="Current Opportunities"
        subtitle="Explore active openings across PalC Networks. Use search and filters to quickly find roles that match your interests and experience."
      >
        {/* Filters Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr repeat(5, 1fr)", gap: "16px", marginBottom: "24px", alignItems: "center" }}>
          <SearchBar value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search Name of Roles" />
          <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
            {departmentOptions.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
            {locationOptions.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select value={selectedWorkMode} onChange={(e) => setSelectedWorkMode(e.target.value)}>
            {workModeOptions.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select value={selectedEmploymentType} onChange={(e) => setSelectedEmploymentType(e.target.value)}>
            {employmentTypeOptions.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option>Newest</option>
            <option>A-Z</option>
            <option>Department</option>
          </select>
        </div>
        {alertMessage && (
        <div
          style={{
            background: "#EFFAF3",
            border: "1px solid #B7E4C7",
            color: "#166534",
            padding: "14px 18px",
            borderRadius: "12px",
            marginBottom: "22px",
            fontWeight: 500,
          }}
        >
          {alertMessage}
        </div>
      )}

        {/* Counter and Clear Filters Row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <span style={{ color: COLORS.textSecondary, fontWeight: 500 }}>
            Showing {filteredJobs.length} of {jobs.length} opportunities
          </span>
          <button
  onClick={handleClearFilters}
  style={{
    border: `1px solid ${COLORS.border}`,
    background: "#fff",
    color: COLORS.primary,
    borderRadius: "10px",
    padding: "10px 18px",
    cursor: "pointer",
    fontWeight: 600,
    transition: "all 0.2s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "#EFF6FF";
    e.currentTarget.style.borderColor = COLORS.primary;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "#fff";
    e.currentTarget.style.borderColor = COLORS.border;
  }}
>
  Clear Filters
</button>
        </div>

        {/* Jobs List Container */}
        <div ref={jobsSectionRef}>
          {filteredJobs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", border: `1px dashed ${COLORS.border}`, borderRadius: "16px", background: "#FAFBFC" }}>
              <h3 style={{ margin: 0, color: COLORS.text }}>No matching opportunities found</h3>
              <p style={{ marginTop: "10px", color: COLORS.textSecondary }}>
                Try adjusting your search or filters to explore more career opportunities.
              </p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                style={{ ...cardStyle, padding: "28px", marginBottom: "24px", border: "1px solid #BFD7FF", boxShadow: "0 12px 28px rgba(37,99,235,0.08)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 24px 52px rgba(15,23,42,0.10)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 18px 42px rgba(15, 23, 42, 0.07)";
                }}
              >
                <p style={{ margin: "0 0 10px", color: COLORS.textSecondary, fontSize: "13px", fontWeight: 500 }}>
                  Posted Recently
                </p>
                <h2 style={{ margin: "0 0 12px", color: COLORS.text, fontSize: "22px", lineHeight: 1.35 }}>
                  {job.title}
                </h2>
                <p style={{ color: COLORS.primary, fontWeight: 600, margin: "0 0 18px", fontSize: "15px" }}>
                  {job.department} • {job.location} • {job.employmentType}
                </p>
                <p style={{ color: COLORS.textSecondary, lineHeight: 1.7, fontSize: "14px", marginBottom: "24px", minHeight: "72px" }}>
                  {job.summary}
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "26px" }}>
                  <span style={{ background: "#E8F1FF", color: COLORS.primary, padding: "6px 12px", borderRadius: "20px", fontSize: "13px", fontWeight: 600 }}>
                    {job.experience}
                  </span>
                  <span style={{ background: "#EEF8F1", color: "#15803D", padding: "6px 12px", borderRadius: "20px", fontSize: "13px", fontWeight: 600 }}>
                    {job.workMode}
                  </span>
                  <span style={{ background: "#FFF7E6", color: "#B45309", padding: "6px 12px", borderRadius: "20px", fontSize: "13px", fontWeight: 600 }}>
                    {job.positions} Position(s)
                  </span>
                </div>
                <PrimaryButton
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(job.applyUrl, "_blank");
                  }}
                >
                  View & Apply
                </PrimaryButton>
              </div>
            ))
          )}
        </div>
      </SectionCard>

      {/* Rehire Opportunities */}
      <SectionCard
        title="Continue Your Journey with PalC"
        subtitle="Explore new opportunities and reconnect with the teams, culture, and values that helped shape your professional journey."
      >
        <div ref={rehireSectionRef}>
          <p
            style={{
              margin: "0 0 36px",
              color: COLORS.textSecondary,
              fontSize: "15px",
              lineHeight: 1.8,
              maxWidth: "900px",
            }}
          >
            Your experience with PalC is part of your professional story, and we'd be
            delighted to welcome you back. Explore exciting opportunities across teams
            and discover where your next chapter could begin.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: "22px",
              marginBottom: "36px",
            }}
          >
            <div
              style={{
                background: "#fff",
                border: `1px solid ${COLORS.border}`,
                borderRadius: "16px",
                padding: "24px",
              }}
            >
              <h3
                style={{
                  marginTop: 0,
                  color: COLORS.primary,
                }}
              >
                Already Familiar
              </h3>
              <p
                style={{
                  marginBottom: 0,
                  color: COLORS.textSecondary,
                  lineHeight: 1.7,
                }}
              >
                Your understanding of PalC's culture, values and ways of working allows
                you to settle into new opportunities with confidence.
              </p>
            </div>

            <div
              style={{
                background: "#fff",
                border: `1px solid ${COLORS.border}`,
                borderRadius: "16px",
                padding: "24px",
              }}
            >
              <h3
                style={{
                  marginTop: 0,
                  color: COLORS.primary,
                }}
              >
                Build on Your Experience
              </h3>
              <p
                style={{
                  marginBottom: 0,
                  color: COLORS.textSecondary,
                  lineHeight: 1.7,
                }}
              >
                Continue growing your career while working on innovative technologies,
                exciting projects and meaningful business challenges.
              </p>
            </div>

            <div
              style={{
                background: "#fff",
                border: `1px solid ${COLORS.border}`,
                borderRadius: "16px",
                padding: "24px",
              }}
            >
              <h3
                style={{
                  marginTop: 0,
                  color: COLORS.primary,
                }}
              >
                Stay Connected
              </h3>
              <p
                style={{
                  marginBottom: 0,
                  color: COLORS.textSecondary,
                  lineHeight: 1.7,
                }}
              >
                Whether you're exploring opportunities today or in the future, we're
                always delighted to stay connected with our alumni community.
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "18px",
            }}
          >
            <PrimaryButton
              onClick={() =>
                jobsSectionRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
            >
              Explore Current Opportunities
            </PrimaryButton>
            
            <p
              style={{
                margin: 0,
                textAlign: "left",
                alignSelf: "stretch",
                color: COLORS.textSecondary,
                lineHeight: 1.7,
              }}
            >
              New opportunities are added regularly. Stay connected, explore current
              openings, and continue growing your career with PalC whenever the time is
              right.
            </p>
          </div>
          
        </div>
      </SectionCard>

{/* Job Alerts Section */}
      <div ref={alertsSectionRef}>
      <SectionCard
        title="Stay Updated with New Opportunities"
        subtitle="Create personalized job alerts and stay informed whenever opportunities matching your interests become available."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "18px", marginBottom: "28px" }}>
          <select value={alertDepartment} onChange={(e) => setAlertDepartment(e.target.value)}>
            {departmentOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select value={alertWorkMode} onChange={(e) => setAlertWorkMode(e.target.value)}>
            {workModeOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select value={alertFrequency} onChange={(e) => setAlertFrequency(e.target.value)}>
            <option>Immediately</option>
            <option>Daily</option>
            <option>Weekly</option>
          </select>
          <PrimaryButton
            onClick={() => {
              if (
                alertDepartment === "All Departments" &&
                alertWorkMode === "All Work Modes"
              ) {
                setAlertMessage(
                  "Please select at least a department or work mode before creating an alert."
                );
                return;
              }
              setJobAlert({
                department: alertDepartment,
                workMode: alertWorkMode,
                frequency: alertFrequency,
                active: true,
              });
              setAlertMessage(
                isEditingAlert
                  ? "Your job alert has been updated successfully."
                  : "Your personalized job alert has been created successfully."
              );
              setIsEditingAlert(false);
            }}>
            {isEditingAlert ? "Update Job Alert" : "Create Job Alert"}
          </PrimaryButton>
        </div>

        {jobAlert ? (
          <div style={{ background: "#F8FBFF", border: `1px solid ${COLORS.border}`, borderRadius: "18px", padding: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <div>
                <h3 style={{ margin: 0, color: COLORS.text }}>
                  Your Job Alert
                </h3>

                <p style={{ marginTop: "8px", color: COLORS.textSecondary }}>
                  We'll notify you whenever matching opportunities become available.
                </p>
              </div>

              <span
                style={{
                  background: jobAlert.active ? "#DCFCE7" : "#F3F4F6",
                  color: jobAlert.active ? "#15803D" : "#6B7280",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  fontWeight: 600,
                  fontSize: "13px",
                }}
              >
                {jobAlert.active ? "Active" : "Disabled"}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "18px", marginBottom: "28px" }}>
              <div>
                <strong>Department</strong>
                <p>{jobAlert.department}</p>
              </div>

              <div>
                <strong>Work Mode</strong>
                <p>{jobAlert.workMode}</p>
              </div>

              <div>
                <strong>Frequency</strong>
                <p>{jobAlert.frequency}</p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <PrimaryButton
              onClick={() => {
                setAlertDepartment(jobAlert.department);
                setAlertWorkMode(jobAlert.workMode);
                setAlertFrequency(jobAlert.frequency);
                setIsEditingAlert(true);
                alertsSectionRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            > Edit Alert
            </PrimaryButton>

            <button
              onClick={() =>
                setJobAlert({
                  ...jobAlert,
                  active: !jobAlert.active,
                })
              }
              style={{
                padding: "11px 20px",
                borderRadius: "10px",
                border: `1px solid ${COLORS.border}`,
                background: "#fff",
                color: COLORS.primary,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {jobAlert.active ? "Disable Alert" : "Enable Alert"}
            </button>

            <button
              onClick={() => {
                setJobAlert(null);
                setAlertDepartment("All Departments");
                setAlertWorkMode("All Work Modes");
                setAlertFrequency("Weekly");
                setAlertMessage("Job alert deleted successfully.");
                setIsEditingAlert(false);
              }}
              style={{
                padding: "11px 20px",
                borderRadius: "10px",
                border: "1px solid #FECACA",
                background: "#FEF2F2",
                color: "#B91C1C",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Delete Alert
            </button>
          </div>
          </div>
        ) : (
          <div style={{ background: "#FAFBFC", border: `1px dashed ${COLORS.border}`, borderRadius: "18px", padding: "40px", textAlign: "center" }}>
            <h3 style={{ marginTop: 0 }}>
              No Job Alerts Created
            </h3>

            <p style={{ color: COLORS.textSecondary, marginBottom: 0 }}>
              Create a personalized alert to stay informed about opportunities that
              match your skills and career interests.
            </p>
          </div>
        )}
      </SectionCard>

  {/*Need Career Assistance Section*/}
    <SectionCard
    title="Need Career Assistance?"
    subtitle="Our team is here to help if you have questions about career opportunities, applications, or returning to PalC."
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "32px", flexWrap: "wrap", background: "#F8FBFF", border: `1px solid ${COLORS.border}`, borderRadius: "18px", padding: "32px" }}>
      
      <div style={{ flex: 1, minWidth: "300px" }}>
        <h3 style={{ margin: "0 0 14px", color: COLORS.text }}>
          We're Happy to Help
        </h3>
        <p style={{ margin: 0, color: COLORS.textSecondary, lineHeight: 1.8 }}>
          Whether you have questions about current opportunities, your application, or returning to PalC, our Helpdesk is here to assist you. Reach out anytime and we'll guide you in the right direction.
        </p>
      </div>
      <PrimaryButton
        onClick={() => window.location.href = "/dashboard/helpdesk"}
      >
        Go to Helpdesk
      </PrimaryButton>

    </div>
  </SectionCard>
    </div>
      </div>
  );
}