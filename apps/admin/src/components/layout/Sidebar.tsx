import { NavLink } from "react-router-dom";
import { LayoutDashboard, Coins, Package, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils.js";

const links = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/gold-price", icon: Coins, label: "Gold Price" },
  { to: "/products", icon: Package, label: "Products" },
  { to: "/products/new", icon: PlusCircle, label: "Add Product" },
];

export interface SidebarProps {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
      {links.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onNavigate}
          end={to === "/products"}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-[var(--color-blush)] text-white shadow-sm"
                : "text-[var(--color-text-mid)] hover:bg-[var(--color-blush-light)] hover:text-[var(--color-blush)]"
            )
          }
        >
          <Icon size={16} strokeWidth={1.8} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
