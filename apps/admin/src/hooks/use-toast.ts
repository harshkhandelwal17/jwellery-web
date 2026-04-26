import { useState, useCallback } from "react";

type ToastVariant = "default" | "destructive";

interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  duration?: number;
}

let toastListeners: Array<(toasts: Toast[]) => void> = [];
let toastList: Toast[] = [];

function emitChange(toasts: Toast[]) {
  toastList = toasts;
  toastListeners.forEach((l) => l(toasts));
}

export function toast(opts: Omit<Toast, "id" | "open" | "onOpenChange">) {
  const id = Math.random().toString(36).slice(2);
  const duration = opts.duration ?? 4000;

  const newToast: Toast = {
    ...opts,
    id,
    open: true,
    onOpenChange: (open) => {
      if (!open) emitChange(toastList.filter((t) => t.id !== id));
    },
  };

  emitChange([...toastList, newToast]);
  setTimeout(() => emitChange(toastList.filter((t) => t.id !== id)), duration);
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>(toastList);

  const subscribe = useCallback((listener: (t: Toast[]) => void) => {
    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== listener);
    };
  }, []);

  useState(() => {
    const unsub = subscribe(setToasts);
    return unsub;
  });

  return { toasts };
}
