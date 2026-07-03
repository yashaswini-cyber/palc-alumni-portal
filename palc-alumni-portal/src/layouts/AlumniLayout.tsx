import { Outlet } from "react-router-dom";
import Sidebar from "../shared/components/Sidebar";
import Header from "../shared/components/Header";

export default function AlumniLayout() {
  return (
    <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: "#F5F9FF",
        }}
      >
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <Header />

        <main
          style={{
            padding: "32px",
            width: "100%",
            maxWidth: "1440px",
            margin: "0 auto",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
