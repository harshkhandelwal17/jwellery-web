import { useQuery } from "@tanstack/react-query";
import { Coins, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card.js";
import GoldPriceForm from "@/components/gold-price/GoldPriceForm.js";
import { useGoldPriceStore } from "@/store/goldPriceStore.js";
import { getGoldPrice } from "@jwell/api-client";
import { formatCurrency } from "@jwell/utils";
import { ADMIN_API_URL } from "@/lib/api-config.js";

const API_URL = ADMIN_API_URL;

export default function GoldPricePage() {
  const { data: goldPrice, isLoading } = useQuery({
    queryKey: ["gold-price"],
    queryFn: () => getGoldPrice(API_URL),
  });

  const optimisticRates = useGoldPriceStore((s) => s.optimisticRates);
  const displayGoldRate = optimisticRates?.goldPricePerGram ?? goldPrice?.goldPricePerGram ?? goldPrice?.pricePerGram ?? 0;
  const displaySilverRate = optimisticRates?.silverPricePerGram ?? goldPrice?.silverPricePerGram ?? 0;
  const displayDiamondRate = optimisticRates?.diamondPricePerGram ?? goldPrice?.diamondPricePerGram ?? 0;

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      {/* Page header */}
      <div className="mb-8">
        <p className="admin-section-label mb-2">Pricing</p>
        <h1 className="admin-page-title">
          Metal Rates
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
          Updating rates instantly recalculates product prices by category
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Current rate card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center border border-[var(--color-border)]"
                style={{ background: "#fef9ee" }}
              >
                <Coins size={20} style={{ color: "var(--color-gold)" }} strokeWidth={1.8} />
              </div>
              <div>
                <CardTitle className="font-display2 text-base">Current Rate</CardTitle>
                <CardDescription>Live rates used for gold, silver and diamond products</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <div className="h-6 w-44 rounded animate-pulse" style={{ background: "var(--color-blush-light)" }} />
                <div className="h-6 w-44 rounded animate-pulse" style={{ background: "var(--color-blush-light)" }} />
                <div className="h-6 w-44 rounded animate-pulse" style={{ background: "var(--color-blush-light)" }} />
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm w-24" style={{ color: "var(--color-text-muted)" }}>Gold</span>
                  <span className="text-xl font-semibold font-display2" style={{ color: "var(--color-gold)" }}>
                    {formatCurrency(displayGoldRate)}
                  </span>
                  <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>/g</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm w-24" style={{ color: "var(--color-text-muted)" }}>Silver</span>
                  <span className="text-xl font-semibold font-display2" style={{ color: "#a0a7b7" }}>
                    {formatCurrency(displaySilverRate)}
                  </span>
                  <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>/g</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm w-24" style={{ color: "var(--color-text-muted)" }}>Diamond</span>
                  <span className="text-xl font-semibold font-display2" style={{ color: "#4aa6d6" }}>
                    {formatCurrency(displayDiamondRate)}
                  </span>
                  <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>/g</span>
                </div>
                {optimisticRates && (
                  <span
                    className="inline-block text-xs px-2.5 py-0.5 rounded-full font-medium"
                    style={{ background: "var(--color-blush-light)", color: "var(--color-blush)" }}
                  >
                    saving…
                  </span>
                )}
              </div>
            )}
            {goldPrice?.updatedAt && (
              <p className="text-xs mt-2" style={{ color: "var(--color-text-muted)" }}>
                Last updated: {new Date(goldPrice.updatedAt).toLocaleString("en-IN")}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Update rate card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center border border-[var(--color-border)]"
                style={{ background: "var(--color-blush-light)" }}
              >
                <TrendingUp size={20} style={{ color: "var(--color-blush)" }} strokeWidth={1.8} />
              </div>
              <div>
                <CardTitle className="font-display2 text-base">Update Rate</CardTitle>
                <CardDescription>Enter updated per-gram rates for all three metals</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <GoldPriceForm currentPrice={goldPrice} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
