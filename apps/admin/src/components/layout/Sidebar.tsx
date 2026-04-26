import { NavLink } from "react-router-dom";
import { LayoutDashboard, Coins, Package, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils.js";

const links = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/gold-price", icon: Coins, label: "Gold Price" },
  { to: "/products", icon: Package, label: "Products" },
  { to: "/products/new", icon: PlusCircle, label: "Add Product" },
];

export default function Sidebar() {
  return (
    <aside
      style={{ background: "var(--color-bg-card)", borderRight: "1px solid var(--color-border)" }}
      className="w-56 shrink-0 flex flex-col h-full"
    >
      <div className="flex items-center gap-2 px-6 py-5 border-b" style={{ borderColor: "var(--color-border)" }}>
        <span className="font-display text-3xl" style={{ color: "var(--color-blush)", lineHeight: 1 }}>
          Jwell
        </span>
        <span className="text-xs font-medium tracking-widest uppercase mt-1" style={{ color: "var(--color-text-muted)" }}>
          Admin
        </span>
      </div>

      <nav className="flex-1 py-4 px-3 flex flex-col gap-0.5">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "text-white"
                  : "text-[var(--color-text-mid)] hover:bg-[var(--color-blush-light)] hover:text-[var(--color-blush)]"
              )
            }
            style={({ isActive }) =>
              isActive ? { background: "var(--color-blush)", color: "white" } : {}
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-6 py-4 border-t text-xs" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>
        JWELL Admin v1.0
      </div>
    </aside>
  );
}
