import { NavLink } from "react-router-dom";
import { LayoutDashboard, Coins, Package, PlusCircle, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils.js";

const links = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/gold-price", icon: Coins, label: "Gold Price" },
  { to: "/products", icon: Package, label: "Products" },
  { to: "/products/new", icon: PlusCircle, label: "Add Product" },
  { to: "/enquiries", icon: MessageSquare, label: "Enquiries" },
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
                ? "text-black shadow-sm"
                : "text-[var(--color-text-mid)] hover:bg-[var(--color-bg-warm)] hover:text-[var(--color-gold)]"
            )
          }
          style={
            ({ isActive }) =>
              isActive
                ? {
                    background:
                      "linear-gradient(90deg, var(--color-gold), var(--color-gold-light))",
                  }
                : undefined
          }
        >
          <Icon size={16} strokeWidth={1.8} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
