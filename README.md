# PalC Alumni Portal

Alumni networking and HR self-service portal for PalC Networks. Enables former employees to stay connected, access employment documents, submit verification requests, refer candidates, and explore boomerang hiring opportunities.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + TypeScript, Vite 8 |
| UI Library | Fluent UI (Microsoft) |
| Routing | React Router 7 |
| Charts | Recharts |
| Backend | Express 5 + TypeScript |
| Email | Microsoft Graph API (Azure) |
| Data | localStorage (mock) — no DB yet |

## Project Structure

```
PalC-Alumni/
├── src/
│   ├── app/routes.tsx              # All route definitions
│   ├── auth/                       # Login, OTP, activation, forgot password
│   ├── layouts/                    # AlumniLayout, AdminLayout
│   ├── modules/
│   │   ├── dashboard/              # Alumni dashboard
│   │   ├── documents/              # Employment document downloads
│   │   ├── verification/           # Employment verification requests
│   │   ├── careers/                # Job board + boomerang hiring
│   │   ├── referrals/              # Candidate referral program
│   │   ├── events/                 # Alumni events
│   │   ├── helpdesk/               # Support tickets
│   │   ├── profile/                # Profile management
│   │   ├── notifications/          # Notification center
│   │   └── admin/                  # Admin dashboard modules
│   ├── shared/
│   │   ├── components/             # 20 reusable components
│   │   ├── theme/                  # Design system (colors, spacing, typography)
│   │   └── utils/                  # Utility functions
│   └── mockData/                   # localStorage wrappers + seed data
├── backend/
│   ├── server.ts                   # Express server (port 5000)
│   └── emailService.ts            # Azure Graph API OTP email
├── data/
│   └── mockEmployeeData.tsx        # 14 alumni + 1 admin account
└── public/                         # Static assets
```

## Current Features (V1 — Frontend Prototype)

### Alumni Portal
- **Dashboard** — Welcome banner, quick actions, stats, engagement hub, YouTube feeds
- **Employment Verification** — Submit/track verification requests (5 types), QR-enabled certificates, third-party verification with unique IDs, CSV export
- **Documents** — Browse, filter, download employment documents (certificates, letters, payslips, tax forms)
- **Career Opportunities** — Job board with filters (department, location, work mode), job alerts, boomerang hiring
- **Referral Program** — Submit referrals, track status, leaderboard, reward history (Rs 3000/successful hire)
- **Events** — Browse/register for alumni events (Networking, Technology, Leadership)
- **Helpdesk** — Submit/track support tickets with conversation history, attachments
- **Profile** — Edit personal info, view employment history, profile completion %
- **Notifications** — Filterable notification center

### Admin Portal
- **Dashboard** — Active alumni count, portal metrics, pending work queue, KPI tracking
- **Document Management** — Generate/upload employment documents
- **Verification Management** — Review/approve/reject verification requests
- **Helpdesk Admin** — Ticket queue management
- **Alumni Management** — Account activation/deactivation, reward management

### Authentication
- Username/Employee ID or email login
- OTP verification via Azure/Microsoft Graph email
- Password reset, account activation workflow

## Running Locally

```bash
# Frontend (port 5173)
npm install
npm run dev

# Backend (port 5000)
cd backend
npm install
npx ts-node server.ts
```

### Environment Variables

**Root `.env`:**
```
VITE_API_URL=http://localhost:5000
```

**`backend/.env`:**
```
AZURE_TENANT_ID=<your-tenant-id>
AZURE_CLIENT_ID=<your-client-id>
AZURE_CLIENT_SECRET=<your-client-secret>
MAIL_FROM=<sender-email>
```

## Key Metrics (Mock Data)

| Metric | Value |
|--------|-------|
| Active Alumni | 286 |
| Portal Activation Rate | 75% |
| Document Self-Service Adoption | 86% |
| Verification Automation | 90% |
| Referral Participation | 28-30% |
| Monthly Logins | ~1,400 |
