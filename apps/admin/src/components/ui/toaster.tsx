import * as ToastPrimitives from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { cn } from "@/lib/utils.js";
import { useToast } from "@/hooks/use-toast.js";

export function Toaster() {
  const { toasts } = useToast();
  return (
    <ToastPrimitives.Provider swipeDirection="right">
      {toasts.map(({ id, title, description, variant, ...props }) => (
        <ToastPrimitives.Root
          key={id}
          className={cn(
            "group pointer-events-auto relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-xl border p-4 shadow-lg transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-bottom-full",
            variant === "destructive"
              ? "border-red-200 bg-red-50 text-red-900"
              : "border-[var(--color-border)] bg-white text-[var(--color-text)]"
          )}
          {...props}
        >
          <div className="flex flex-col gap-1">
            {title && <ToastPrimitives.Title className="text-sm font-semibold">{title}</ToastPrimitives.Title>}
            {description && <ToastPrimitives.Description className="text-sm opacity-80">{description}</ToastPrimitives.Description>}
          </div>
          <ToastPrimitives.Close className="rounded-md p-1 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/10">
            <X className="h-4 w-4" />
          </ToastPrimitives.Close>
        </ToastPrimitives.Root>
      ))}
      <ToastPrimitives.Viewport className="fixed bottom-4 right-4 z-[100] flex max-h-screen w-full max-w-sm flex-col gap-2" />
    </ToastPrimitives.Provider>
  );
}
