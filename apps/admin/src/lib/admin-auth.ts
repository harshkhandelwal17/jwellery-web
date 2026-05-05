const SESSION_KEY = "jwell_admin_session_v1";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

type AdminSession = {
  token: string;
  expiresAt: number;
};

function safeNow(): number {
  return Date.now();
}

export function hasValidAdminSession(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as AdminSession;
    if (!parsed?.token || !parsed?.expiresAt) return false;
    if (parsed.expiresAt <= safeNow()) {
      clearAdminSession();
      return false;
    }
    return true;
  } catch {
    clearAdminSession();
    return false;
  }
}

export function createAdminSession(): void {
  if (typeof window === "undefined") return;
  const payload: AdminSession = {
    token: `${safeNow()}-${Math.random().toString(36).slice(2)}`,
    expiresAt: safeNow() + SEVEN_DAYS_MS,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(payload));
}

export function clearAdminSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}
