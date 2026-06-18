import { Link, useRouterState } from "@tanstack/react-router";
import { Activity, LayoutDashboard, Bot, FlaskConical, BarChart3, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Overview", icon: Activity },
  { to: "/dashboard", label: "NOC", icon: LayoutDashboard },
  { to: "/copilot", label: "Copilot", icon: Bot },
  { to: "/simulator", label: "Simulator", icon: FlaskConical },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
] as const;

export function TopNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div className="glass-strong mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-2.5">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative h-8 w-8 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
            <ShieldCheck className="h-4 w-4 text-white" />
            <span className="absolute inset-0 rounded-xl bg-gradient-primary opacity-40 blur-md group-hover:opacity-70 transition" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-semibold text-sm tracking-tight">Street Forge™</div>
            <div className="text-[10px] text-muted-foreground -mt-0.5 font-mono">SECUREOPS</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {nav.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                  active
                    ? "bg-gradient-primary text-primary-foreground shadow-elegant"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/50"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <span className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-accent animate-pulse-ring" />
              <span className="relative h-2 w-2 rounded-full bg-accent" />
            </span>
            AIR-GAPPED
          </span>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 px-4 pb-8">
      <div className="glass mx-auto max-w-7xl rounded-2xl px-8 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-gradient-primary grid place-items-center">
                <ShieldCheck className="h-4 w-4 text-white" />
              </div>
              <div className="font-display font-semibold">Street Forge™ Intelligence Systems</div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground italic">"Engineering Resilient Intelligence."</p>
          </div>
          <div className="text-sm">
            <div className="font-display font-semibold mb-2">Platform</div>
            <ul className="space-y-1 text-muted-foreground">
              <li>NOC Dashboard</li>
              <li>AI Copilot</li>
              <li>Incident Simulator</li>
              <li>Analytics</li>
            </ul>
          </div>
          <div className="text-sm">
            <div className="font-display font-semibold mb-2">Compliance</div>
            <ul className="space-y-1 text-muted-foreground">
              <li>Air-Gapped Deployment</li>
              <li>MPLS Certified</li>
              <li>ISO 27001 Ready</li>
              <li>SOC 2 Type II</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border/60 flex flex-wrap justify-between text-xs text-muted-foreground font-mono">
          <span>© {new Date().getFullYear()} STREET FORGE</span>
          <span>BUILD 2026.06 // SECURE</span>
        </div>
      </div>
    </footer>
  );
}

export function BlurBlobs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-mesh">
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/25 blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-accent/25 blur-3xl animate-blob" style={{ animationDelay: "-6s" }} />
      <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-[oklch(0.78_0.16_75/0.25)] blur-3xl animate-blob" style={{ animationDelay: "-12s" }} />
    </div>
  );
}
