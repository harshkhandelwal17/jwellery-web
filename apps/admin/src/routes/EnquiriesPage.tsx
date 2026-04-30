import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MessageSquare, Search } from "lucide-react";
import { Input } from "@/components/ui/input.js";
import EnquiryTable from "@/components/enquiries/EnquiryTable.js";
import { getEnquiries } from "@jwell/api-client";
import type { Enquiry } from "@jwell/types";

const API_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost:4000/api";
const ADMIN_KEY = import.meta.env.VITE_ADMIN_API_KEY as string;

export default function EnquiriesPage() {
  const [search, setSearch] = useState("");
  const { data: enquiries, isLoading } = useQuery({
    queryKey: ["enquiries"],
    queryFn: () => getEnquiries(API_URL, ADMIN_KEY),
  });

  const filteredEnquiries = enquiries?.filter((e: Enquiry) => {
    if (!search) return true;
    const query = search.toLowerCase();
    return (
      e.name.toLowerCase().includes(query) ||
      e.phone.toLowerCase().includes(query) ||
      (e.productName?.toLowerCase().includes(query) ?? false)
    );
  });

  const newCount = enquiries?.filter((e: Enquiry) => e.status === "new").length ?? 0;

  return (
    <div className="p-6 lg:p-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <p className="admin-section-label mb-2">Customer Enquiries</p>
          <h1 className="admin-page-title">Enquiries</h1>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
            {enquiries ? `${enquiries.length} enquiries` : "Loading…"}
            {newCount > 0 && (
              <span className="ml-2 text-red-500 font-medium">({newCount} new)</span>
            )}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: "var(--color-text-muted)" }}
        />
        <Input
          type="text"
          placeholder="Search by name, phone, or product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-16 rounded-xl animate-pulse"
              style={{ background: "var(--color-blush-light)" }}
            />
          ))}
        </div>
      ) : !filteredEnquiries || filteredEnquiries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-5">
          <div
            className="h-20 w-20 rounded-2xl flex items-center justify-center border border-[var(--color-border)]"
            style={{ background: "var(--color-bg-card)" }}
          >
            <MessageSquare
              size={32}
              style={{ color: "var(--color-blush)" }}
              strokeWidth={1.5}
            />
          </div>
          <div className="text-center">
            <p
              className="font-medium font-display2"
              style={{ color: "var(--color-text)" }}
            >
              No enquiries yet
            </p>
            <p
              className="text-sm mt-1 max-w-xs mx-auto"
              style={{ color: "var(--color-text-muted)" }}
            >
              Customer enquiries will appear here when submitted
            </p>
          </div>
        </div>
      ) : (
        <EnquiryTable enquiries={filteredEnquiries} />
      )}
    </div>
  );
}
