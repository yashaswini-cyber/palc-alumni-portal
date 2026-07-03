import { Outlet } from "react-router-dom";
import AdminHeader from "../shared/components/AdminHeader";

export default function AdminLayout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F9FF",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AdminHeader />

      <main
        style={{
          flex: 1,
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "32px",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}