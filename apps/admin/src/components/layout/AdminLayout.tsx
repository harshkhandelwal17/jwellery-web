import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.js";

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#f8f7f5" }}>
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
