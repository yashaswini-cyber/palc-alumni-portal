# PalC Alumni Portal

## What This Is
Alumni networking and HR self-service portal for PalC Networks. Former employees use it for employment verification, document downloads, referrals, job opportunities, and staying connected.

## Current State
**V1 Frontend Prototype** — all data in localStorage, no database. Only real backend integration is OTP email via Azure Graph API.

## Tech Stack
- Frontend: React 19 + TypeScript + Vite 8 + Fluent UI + React Router 7
- Backend: Express 5 (port 5000) — OTP email only
- Data: localStorage (mock) — PostgreSQL + Prisma planned for P0
- Email: Microsoft Graph API (Azure)

## Key Directories
- `src/modules/` — Feature modules (dashboard, verification, documents, careers, referrals, events, helpdesk, profile, admin)
- `src/shared/components/` — 20 reusable UI components
- `src/shared/theme/` — Design system tokens
- `src/mockData/` — localStorage wrappers + seed data
- `src/auth/` — Login, OTP, activation flows
- `backend/` — Express server + email service
- `data/mockEmployeeData.tsx` — 14 alumni + 1 admin account

## Rules
- Do NOT change the design language — current Fluent UI theme stays
- All mock data must use realistic PalC Networks context (real employee names from mockEmployeeData, real department names)
- When replacing localStorage with API calls, keep the UI components unchanged — swap only the data layer
- Port 5000 for backend, port 5173 for frontend dev server
- See ROADMAP.md for P0 priorities and full feature roadmap
