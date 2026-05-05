import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar.js";

interface Props {
  onLogout: () => void;
}

export default function AdminLayout({ onLogout }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-bg)]">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          style={{ animation: "backdrop-in 0.2s ease" }}
        />
      )}

      {/* Sidebar — hidden on mobile unless open */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-60 shrink-0 flex flex-col h-full
          border-r border-[var(--color-border)] bg-[var(--color-bg-card)]
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <img src="/logo.jpeg" alt="Shreeva Jewellers" width={40} height={40} style={{ borderRadius: "0.4rem", objectFit: "cover" }} />
            <div className="flex flex-col">
              <span className="font-display2 text-sm font-semibold" style={{ color: "var(--color-gold)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Shreeva
              </span>
              <span className="text-[10px] font-medium tracking-widest uppercase" style={{ color: "var(--color-text-muted)" }}>
                Admin
              </span>
            </div>
          </div>
          <button
            className="lg:hidden p-1 rounded-md hover:bg-[var(--color-bg-warm)] transition-colors"
            onClick={() => setMobileOpen(false)}
            style={{ color: "var(--color-text)" }}
          >
            <X size={20} />
          </button>
        </div>
        <Sidebar onNavigate={() => setMobileOpen(false)} onLogout={onLogout} />
        <div className="px-5 py-3 border-t border-[var(--color-border)] text-xs" style={{ color: "var(--color-text-muted)" }}>
          Shreeva Admin v1.0
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top header bar — mobile hamburger + branding */}
        <header
          className="flex lg:hidden items-center gap-3 px-4 py-3 border-b border-[var(--color-border)]"
          style={{ background: "var(--color-bg-card)", backdropFilter: "blur(12px)" }}
        >
          <button
            className="p-2 rounded-lg hover:bg-[var(--color-bg-warm)] transition-colors"
            onClick={() => setMobileOpen(true)}
            style={{ color: "var(--color-text)" }}
          >
            <Menu size={20} />
          </button>
          <img src="/logo.jpeg" alt="Shreeva Jewellers" width={36} height={36} style={{ borderRadius: "0.4rem", objectFit: "cover" }} />
          <span className="font-display2 text-sm" style={{ color: "var(--color-gold)", letterSpacing: "0.1em" }}>
            Shreeva Jewellers
          </span>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
