import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import AlumniLayout from "../layouts/AlumniLayout";
import DashboardPage from "../modules/dashboard/DashboardPage";
import DocumentsPage from "../modules/documents/DocumentsPage";
import VerificationPage from "../modules/verification/VerificationPage";
import CareersPage from "../modules/careers/CareersPage";
import ReferralsPage from "../modules/referrals/ReferralsPage";
import EventsPage from "../modules/events/EventsPage";
import HelpdeskPage from "../modules/helpdesk/HelpdeskPage";
import ProfilePage from "../modules/profile/ProfilePage";
import NotificationsPage from "../modules/notifications/NotificationsPage";
import AdminDashboardPage from "../modules/admin/dashboard/AdminDashboardPage";
import AdminLayout from "../layouts/AdminLayout";
import AlumniLoginPage from "../auth/LoginPage";
import { AuthService } from "../auth/authService";
import AdminDocuments from "../modules/admin/documents/AdminDocuments";
import AdminVerification from "../modules/admin/verification/AdminVerification";

function RequireAlumniAuth() {
  return AuthService.isAuthenticated()
    ? <Outlet />
    : <Navigate to="/login" replace />;
}
function RequireAdminAuth() {
  return AuthService.isAdminAuthenticated()
    ? <Outlet />
    : <Navigate to="/login" replace />;
}

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <AlumniLoginPage /> },
  {
    element: <RequireAlumniAuth />,
    children: [
      {
        path: "/dashboard",
        element: <AlumniLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "documents", element: <DocumentsPage /> },
          { path: "verification", element: <VerificationPage /> },
          { path: "careers", element: <CareersPage /> },
          { path: "referrals", element: <ReferralsPage /> },
          { path: "events", element: <EventsPage /> },
          { path: "helpdesk", element: <HelpdeskPage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "notifications", element: <NotificationsPage /> },
        ],
      },
    ],
  },
  {
  element: <RequireAdminAuth />,
  children: [
  {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    {
      index: true,
      element: <AdminDashboardPage />,
    },
    {
      path: "documents",
      element: <AdminDocuments />,
    },
    {
    path: "verification",
    element: <AdminVerification />
    }
  ],
},
  ],
},
]);