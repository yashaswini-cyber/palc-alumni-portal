# PalC Alumni Portal — Roadmap

**Current State:** V1 frontend prototype with localStorage mock data, minimal backend (OTP email only).

---

## P0 — Production Foundation (Must Have)

These are blockers for going live. No production deployment without these.

### 1. Backend API + Database
- **Problem:** All data lives in localStorage. Browser clear = data gone. No multi-user, no persistence, no admin control.
- **Need:** PostgreSQL + Prisma ORM. REST API for all modules (verification, documents, referrals, helpdesk, events, careers, profile, notifications). Replace every localStorage call with API calls.
- **Tables:** Alumni, Documents, VerificationRequests, Referrals, HelpTickets, Events, Notifications, AuditLog
- **Impact:** Without this, nothing else matters — the portal is a demo, not a product.

### 2. Real Authentication + Authorization
- **Problem:** Auth is localStorage-based. No JWT, no sessions, no role enforcement. Anyone can access admin routes by URL.
- **Need:** JWT auth with refresh tokens. Role-based access control (Alumni, Admin, Super Admin). Session management. Protected API routes. Route guards enforced server-side.
- **Impact:** Security baseline for any production system.

### 3. Document Storage + Generation
- **Problem:** Documents are mock entries with no real files. Download buttons don't deliver actual PDFs.
- **Need:** Azure Blob Storage / S3 for document files. Server-side PDF generation for employment certificates, experience letters, relieving letters (from templates + alumni data). QR code generation with verification URLs. Digital signatures.
- **Impact:** Core value prop — alumni come here primarily for documents and verification.

### 4. Employment Verification API
- **Problem:** Verification requests exist in localStorage only. Third-party companies can't actually verify employment.
- **Need:** Public verification endpoint: `GET /verify/:verificationId` returns verified employment details. Admin approval workflow triggers certificate generation. Email notifications to requester + alumni on status changes.
- **Impact:** This is the #1 reason alumni use the portal. Without real verification, the portal has no utility.

### 5. Admin Workflow Engine
- **Problem:** Admin actions (approve verification, generate document, manage tickets) don't persist or trigger downstream effects.
- **Need:** Admin actions hit real APIs. Approval triggers document generation + email notification. Ticket responses send email to alumni. Audit trail for all admin actions.
- **Impact:** HR team can't actually operate without this.

---

## P1 — Core Experience (High Value)

### 6. Email Notification System
- Transactional emails for: verification status changes, document ready, referral updates, ticket responses, event reminders
- Weekly digest: "Your portal activity this week"
- Already have Azure Graph API working (OTP proves it) — extend to all notification types

### 7. Referral Pipeline Integration
- Connect referral submissions to HR's ATS (Applicant Tracking System) or at minimum email HR with structured referral data
- Auto-update referral status when HR acts
- Reward disbursement tracking with finance integration

### 8. Career Board — Real Job Sync
- Pull open positions from company HRMS or careers page
- Auto-expire closed positions
- Application tracking (applied, shortlisted, rejected)
- Boomerang hiring flag for positions especially suited for alumni

### 9. Event Management
- Event creation from admin panel
- RSVP with capacity limits
- Calendar integration (ICS download, Google Calendar link)
- Post-event feedback forms
- Virtual event links (Teams/Zoom integration)

### 10. Search + Filtering Improvements
- Global search across documents, tickets, referrals, events
- Saved filters per module
- Sort by date, status, priority across all list views

---

## P2 — Engagement + Retention

### 11. Alumni Directory
- Searchable directory of opted-in alumni (name, current company, role, batch/year, location)
- Connect/message feature between alumni
- Privacy controls (who can see what)
- Filter by department, year, location

### 12. Alumni Engagement Analytics (Admin)
- Portal usage trends (DAU, MAU, feature adoption)
- Cohort analysis (which batch year is most active)
- Referral conversion funnel
- Document request patterns
- Churn indicators (alumni who stopped logging in)

### 13. Content Management (Admin)
- Admin-managed announcements, leadership messages, success stories
- YouTube/social media feed configuration
- Company news integration
- Push notifications for new content

### 14. Multi-Language Support
- Hindi + English (primary markets)
- Language preference in profile settings
- Translated email templates

### 15. Mobile Responsiveness + PWA
- Current UI is desktop-focused — audit and fix mobile breakpoints
- PWA for home screen install on mobile
- Push notifications via service worker

---

## P3 — Strategic / Long-Term

### 16. Alumni Benefits Program
- Partnerships with learning platforms (Coursera, Udemy), insurance, financial services
- Exclusive discounts for PalC alumni
- Benefits dashboard with redemption tracking

### 17. Mentorship Platform
- Alumni-to-employee mentorship matching
- Session scheduling + tracking
- Feedback and rating system

### 18. Alumni Contribution Tracking
- Track alumni contributions: referrals, event attendance, content sharing, mentoring
- Points/badge system
- Annual "Alumni Champion" recognition

### 19. Integration Hub
- SSO with company's Azure AD / Entra ID
- HRMS integration for auto-provisioning alumni accounts on employee exit
- ATS integration for referral pipeline
- Finance system for reward payouts
- LinkedIn profile sync (with consent)

### 20. AI Features
- Chatbot for common queries (document status, verification process, referral policy)
- Smart job matching based on alumni profile + past role
- Auto-categorization of helpdesk tickets
- Predictive analytics: which alumni are likely to refer or rejoin

---

## Priority Summary

| Priority | Feature | Why First |
|----------|---------|-----------|
| **P0** | Backend API + Database | No persistence = no product |
| **P0** | Real Auth + RBAC | Security baseline |
| **P0** | Document Storage + PDF Gen | #1 alumni use case |
| **P0** | Verification API | Core value proposition |
| **P0** | Admin Workflow Engine | HR can't operate without it |
| **P1** | Email Notifications | User engagement + trust |
| **P1** | Referral Pipeline | Revenue-generating feature |
| **P1** | Real Job Sync | Keeps career board relevant |
| **P1** | Event Management | Community building |
| **P1** | Search + Filtering | Usability at scale |
| **P2** | Alumni Directory | Network effects |
| **P2** | Engagement Analytics | Prove ROI to management |
| **P2** | Content Management | Admin self-service |
| **P2** | Multi-Language | Accessibility |
| **P2** | Mobile + PWA | Reach |
| **P3** | Benefits Program | Retention driver |
| **P3** | Mentorship | Community depth |
| **P3** | Contribution Tracking | Gamification |
| **P3** | Integration Hub | Enterprise readiness |
| **P3** | AI Features | Scale + automation |

---

## Architecture Target (Post-P0)

```
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │   (Vite + Fluent)   │
                    └────────┬────────────┘
                             │ REST API
                    ┌────────▼────────────┐
                    │   Express Backend   │
                    │   JWT + RBAC        │
                    ├─────────────────────┤
                    │   Prisma ORM        │
                    └────────┬────────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
     ┌────────▼──┐   ┌──────▼─────┐  ┌─────▼──────┐
     │ PostgreSQL │   │ Azure Blob │  │ Azure      │
     │ Database   │   │ Storage    │  │ Graph API  │
     └────────────┘   └────────────┘  └────────────┘
```
