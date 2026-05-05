import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.js";
import { createAdminSession } from "@/lib/admin-auth.js";
import { ADMIN_API_URL } from "@/lib/api-config.js";
import { toast } from "@/hooks/use-toast.js";

interface Props {
  onLoginSuccess: () => void;
}

export default function LoginPage({ onLoginSuccess }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const fromPath = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || "/dashboard";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${ADMIN_API_URL}/admin-auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const json = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !json.success) {
        throw new Error(json.error ?? "Invalid admin username or password.");
      }
    } catch (err) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: err instanceof Error ? err.message : "Invalid admin username or password.",
      });
      return;
    }

    createAdminSession();
    onLoginSuccess();
    toast({
      title: "Logged in",
      description: "Welcome back. Session valid for 7 days.",
    });
    navigate(fromPath, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--color-bg)" }}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <p className="admin-section-label mb-2">Admin Access</p>
          <CardTitle className="admin-page-title text-2xl">Sign in</CardTitle>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
            Login required to open admin panel.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="text-xs mb-1.5 block" style={{ color: "var(--color-text-muted)" }}>
                Username
              </span>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-text-muted)" }} />
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  className="w-full h-10 rounded-lg border pl-9 pr-3 bg-transparent"
                  style={{ borderColor: "var(--color-border)" }}
                />
              </div>
            </label>

            <label className="block">
              <span className="text-xs mb-1.5 block" style={{ color: "var(--color-text-muted)" }}>
                Password
              </span>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-text-muted)" }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full h-10 rounded-lg border pl-9 pr-3 bg-transparent"
                  style={{ borderColor: "var(--color-border)" }}
                />
              </div>
            </label>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
