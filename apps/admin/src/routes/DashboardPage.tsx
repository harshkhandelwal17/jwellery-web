import { useQuery } from "@tanstack/react-query";
import { Package, Coins, Gem, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.js";
import { getProducts } from "@jwell/api-client";
import { getGoldPrice } from "@jwell/api-client";
import { formatCurrency, normalizeImageUrl } from "@jwell/utils";

const API_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost:4000/api";

export default function DashboardPage() {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(API_URL),
  });

  const { data: goldPrice } = useQuery({
    queryKey: ["gold-price"],
    queryFn: () => getGoldPrice(API_URL),
  });

  const totalProducts = products?.length ?? 0;
  const ringCount = products?.filter((p) => p.category === "rings").length ?? 0;
  const necklaceCount = products?.filter((p) => p.category === "necklaces").length ?? 0;
  const currentRate = goldPrice?.pricePerGram ?? 0;

  const stats = [
    {
      label: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "var(--color-blush)",
      bg: "var(--color-blush-light)",
    },
    {
      label: "Gold Rate / gram",
      value: formatCurrency(currentRate),
      icon: Coins,
      color: "var(--color-gold)",
      bg: "#fef9ee",
    },
    {
      label: "Rings",
      value: ringCount,
      icon: Gem,
      color: "var(--color-blush-mid)",
      bg: "var(--color-blush-light)",
    },
    {
      label: "Necklaces",
      value: necklaceCount,
      icon: Sparkles,
      color: "var(--color-text-mid)",
      bg: "var(--color-blush-light)",
    },
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-8">
        <p className="admin-section-label mb-2">Overview</p>
        <h1 className="admin-page-title">
          Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
          Overview of your jewellery store
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="group">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>
                  {label}
                </CardTitle>
                <div
                  className="h-9 w-9 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: bg }}
                >
                  <Icon size={18} style={{ color }} strokeWidth={1.8} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold font-display2" style={{ color: "var(--color-text)" }}>
                {value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent products */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ background: "var(--color-blush-light)" }}>
              <Package size={18} style={{ color: "var(--color-blush)" }} strokeWidth={1.8} />
            </div>
            <div>
              <CardTitle className="font-display2 text-base">Recent Products</CardTitle>
              <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                Latest additions to your catalogue
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!products || products.length === 0 ? (
            <p className="text-sm py-8 text-center" style={{ color: "var(--color-text-muted)" }}>
              No products yet. Add your first product to get started.
            </p>
          ) : (
            <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
              {products.slice(0, 5).map((p) => (
                <div key={p.id} className="flex items-center gap-4 py-3 transition-colors hover:bg-[var(--color-bg-warm)] rounded-lg px-2 -mx-2">
                  <img
                    src={normalizeImageUrl(p.image)}
                    alt={p.name}
                    className="h-11 w-11 rounded-xl object-cover shrink-0 border border-[var(--color-border)]"
                    onError={(e) => { e.currentTarget.src = "/fallback.jpg"; }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "var(--color-text)" }}>
                      {p.name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                      <span className="capitalize">{p.category}</span> · {p.weight}g
                    </p>
                  </div>
                  <p className="text-sm font-medium font-display2" style={{ color: "var(--color-gold)" }}>
                    {formatCurrency(p.calculatedPrice)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
