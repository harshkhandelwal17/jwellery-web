import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  Package,
  Calendar,
  MoreHorizontal,
  Loader2,
  Trash2,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button.js";
import { Badge } from "@/components/ui/badge.js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.js";
import { toast } from "@/hooks/use-toast.js";
import { updateEnquiryStatus } from "@jwell/api-client";
import type { Enquiry } from "@jwell/types";

const API_URL = import.meta.env.VITE_API_URL as string;
const ADMIN_KEY = import.meta.env.VITE_ADMIN_API_KEY as string;

interface Props {
  enquiries: Enquiry[];
}

export default function EnquiryTable({ enquiries }: Props) {
  const queryClient = useQueryClient();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "new" | "contacted" | "closed" }) =>
      updateEnquiryStatus(API_URL, id, { status }, ADMIN_KEY),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
      toast({ title: "Status updated" });
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: err instanceof Error ? err.message : "Something went wrong.",
      });
    },
  });

  const statusConfig: Record<
    string,
    { label: string; variant: "destructive" | "gold" | "default"; icon: React.ReactNode }
  > = {
    new: {
      label: "New",
      variant: "destructive",
      icon: <div className="w-2 h-2 rounded-full bg-red-500" />,
    },
    contacted: {
      label: "Contacted",
      variant: "gold",
      icon: <div className="w-2 h-2 rounded-full bg-amber-500" />,
    },
    closed: {
      label: "Closed",
      variant: "default",
      icon: <div className="w-2 h-2 rounded-full bg-emerald-500" />,
    },
  };

  const viewingEnquiry = enquiries.find((e) => e.id === viewingId);

  return (
    <>
      {/* Table */}
      <div className="border border-[var(--color-border)] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead
            className="border-b border-[var(--color-border)]"
            style={{ background: "var(--color-bg-warm)" }}
          >
            <tr>
              <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--color-text-mid)" }}>
                Name
              </th>
              <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--color-text-mid)" }}>
                Phone
              </th>
              <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--color-text-mid)" }}>
                Product
              </th>
              <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--color-text-mid)" }}>
                Status
              </th>
              <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--color-text-mid)" }}>
                Date
              </th>
              <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--color-text-mid)" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <>
                <tr
                  key={enquiry.id}
                  className="border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-bg-warm)] transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium" style={{ color: "var(--color-text)" }}>
                      {enquiry.name}
                    </div>
                    {enquiry.email && (
                      <div
                        className="text-xs flex items-center gap-1 mt-0.5"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        <Mail size={10} />
                        {enquiry.email}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Phone size={14} style={{ color: "var(--color-blush)" }} />
                      <span style={{ color: "var(--color-text)" }}>{enquiry.phone}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {enquiry.productName ? (
                      <div
                        className="flex items-center gap-2 text-xs"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        <Package size={14} />
                        <span className="truncate max-w-[150px]">{enquiry.productName}</span>
                      </div>
                    ) : (
                      <span
                        className="text-xs italic"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        General enquiry
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {statusConfig[enquiry.status].icon}
                      <Badge variant={statusConfig[enquiry.status].variant}>
                        {statusConfig[enquiry.status].label}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div
                      className="flex items-center gap-2 text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      <Calendar size={12} />
                      {new Date(enquiry.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setViewingId(enquiry.id)}
                        className="h-8 w-8"
                      >
                        <Eye size={14} />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              statusMutation.mutate({ id: enquiry.id, status: "new" })
                            }
                          >
                            Mark as New
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              statusMutation.mutate({ id: enquiry.id, status: "contacted" })
                            }
                          >
                            Mark as Contacted
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              statusMutation.mutate({ id: enquiry.id, status: "closed" })
                            }
                          >
                            Mark as Closed
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
                {expandedId === enquiry.id && enquiry.message && (
                  <tr className="bg-[var(--color-bg-warm)]">
                    <td colSpan={6} className="px-4 py-3">
                      <div
                        className="text-sm"
                        style={{ color: "var(--color-text)" }}
                      >
                        <span className="font-medium">Message:</span>
                        <p className="mt-1" style={{ color: "var(--color-text-muted)" }}>
                          {enquiry.message}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Details Dialog */}
      <Dialog open={!!viewingId} onOpenChange={(open) => !open && setViewingId(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display2">Enquiry Details</DialogTitle>
          </DialogHeader>
          {viewingEnquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                    Name
                  </p>
                  <p className="font-medium" style={{ color: "var(--color-text)" }}>
                    {viewingEnquiry.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                    Phone
                  </p>
                  <p className="font-medium" style={{ color: "var(--color-text)" }}>
                    {viewingEnquiry.phone}
                  </p>
                </div>
              </div>

              {viewingEnquiry.email && (
                <div>
                  <p className="text-xs uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                    Email
                  </p>
                  <p style={{ color: "var(--color-text)" }}>{viewingEnquiry.email}</p>
                </div>
              )}

              {viewingEnquiry.productName && (
                <div>
                  <p className="text-xs uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                    Product
                  </p>
                  <p style={{ color: "var(--color-text)" }}>{viewingEnquiry.productName}</p>
                </div>
              )}

              <div>
                <p className="text-xs uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                  Status
                </p>
                <div className="mt-1">
                  <Badge variant={statusConfig[viewingEnquiry.status].variant}>
                    {statusConfig[viewingEnquiry.status].label}
                  </Badge>
                </div>
              </div>

              {viewingEnquiry.message && (
                <div>
                  <p className="text-xs uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                    Message
                  </p>
                  <p
                    className="mt-1 p-3 rounded-lg text-sm"
                    style={{
                      background: "var(--color-bg-warm)",
                      color: "var(--color-text)",
                    }}
                  >
                    {viewingEnquiry.message}
                  </p>
                </div>
              )}

              <div>
                <p className="text-xs uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                  Submitted On
                </p>
                <p style={{ color: "var(--color-text)" }}>
                  {new Date(viewingEnquiry.createdAt).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    statusMutation.mutate({ id: viewingEnquiry.id, status: "contacted" })
                  }
                  disabled={statusMutation.isPending || viewingEnquiry.status === "contacted"}
                >
                  {statusMutation.isPending && <Loader2 size={14} className="animate-spin mr-2" />}
                  Mark Contacted
                </Button>
                <Button
                  onClick={() =>
                    statusMutation.mutate({ id: viewingEnquiry.id, status: "closed" })
                  }
                  disabled={statusMutation.isPending || viewingEnquiry.status === "closed"}
                >
                  {statusMutation.isPending && <Loader2 size={14} className="animate-spin mr-2" />}
                  Mark Closed
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
