import { useQuery } from "@tanstack/react-query";
import { Package, Coins, TrendingUp, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.js";
import { getProducts } from "@jwell/api-client";
import { getGoldPrice } from "@jwell/api-client";
import { formatCurrency } from "@jwell/utils";

const API_URL = import.meta.env.VITE_API_URL as string;

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
      icon: TrendingUp,
      color: "#7c6b9e",
      bg: "#f3f0f9",
    },
    {
      label: "Necklaces",
      value: necklaceCount,
      icon: ShoppingBag,
      color: "#2e7d6b",
      bg: "#edf7f4",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold" style={{ color: "var(--color-text)" }}>
          Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
          Overview of your jewellery store
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>
                  {label}
                </CardTitle>
                <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: bg }}>
                  <Icon size={16} style={{ color }} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold" style={{ color: "var(--color-text)" }}>
                {value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Products</CardTitle>
        </CardHeader>
        <CardContent>
          {!products || products.length === 0 ? (
            <p className="text-sm py-8 text-center" style={{ color: "var(--color-text-muted)" }}>
              No products yet. Add your first product to get started.
            </p>
          ) : (
            <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
              {products.slice(0, 5).map((p) => (
                <div key={p.id} className="flex items-center gap-4 py-3">
                  <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "var(--color-text)" }}>
                      {p.name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                      {p.category} · {p.weight}g
                    </p>
                  </div>
                  <p className="text-sm font-medium" style={{ color: "var(--color-gold)" }}>
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
