import { createFileRoute, Link } from "@tanstack/react-router";
import { TopNav, Footer, BlurBlobs } from "@/components/shell";
import { NetworkGlobe } from "@/components/network-globe";
import { Counter } from "@/components/counter";
import {
  Brain, Network, Bot, ShieldAlert, GitBranch, ArrowRight, Sparkles, CheckCircle2, Activity,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Street Forge™ SecureOps — Predict. Protect. Operate." },
      { name: "description", content: "An AI-powered offline copilot for secure MPLS and air-gapped network operations. Predictive intelligence, digital twin, and threat detection — engineered for resilience." },
      { property: "og:title", content: "Street Forge™ SecureOps" },
      { property: "og:description", content: "Predict. Protect. Operate. The enterprise NOC for air-gapped networks." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Brain, title: "Predictive Failure Intelligence", desc: "Forecast link degradation 48 hours before impact with onboard ML models — no cloud round-trip required.", tone: "from-primary to-primary-glow" },
  { icon: Network, title: "Network Digital Twin", desc: "A live, queryable replica of every MPLS path, BGP peer, and physical interface. Test changes before they touch production.", tone: "from-accent to-primary" },
  { icon: Bot, title: "Offline AI Copilot", desc: "A locally-hosted LLM trained on your topology, runbooks, and historical incidents. Operates fully air-gapped.", tone: "from-primary-glow to-accent" },
  { icon: ShieldAlert, title: "Threat Detection", desc: "Behavioral anomaly engine flags unauthorized devices, lateral movement, and protocol drift in real time.", tone: "from-[oklch(0.78_0.16_75)] to-primary" },
  { icon: GitBranch, title: "Root Cause Analysis", desc: "Causal graphs trace an incident from a single alert to the upstream change — in seconds, not hours.", tone: "from-accent to-primary-glow" },
  { icon: Activity, title: "Live Health Telemetry", desc: "Sub-second polling across thousands of nodes with adaptive sampling that respects bandwidth budgets.", tone: "from-primary to-accent" },
];

function Landing() {
  return (
    <>
      <BlurBlobs />
      <TopNav />
      <main className="mx-auto max-w-7xl px-4">
        {/* Hero */}
        <section className="relative pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 glass-subtle rounded-full px-3 py-1.5 text-xs font-mono text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary" />
                v2026.06 · OFFLINE INTELLIGENCE RELEASE
              </div>
              <h1 className="mt-6 font-display text-5xl md:text-7xl font-semibold leading-[1.02] tracking-tight">
                Predict. <span className="text-gradient-primary">Protect.</span> Operate.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
                Street Forge™ SecureOps is the mission-critical operations platform for secure MPLS, defense-grade, and air-gapped networks — powered by a copilot that never leaves your perimeter.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/dashboard" className="group inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant hover:shadow-glow transition-all">
                  Launch NOC
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
                </Link>
                <Link to="/copilot" className="inline-flex items-center gap-2 glass rounded-xl px-6 py-3 text-sm font-semibold hover-lift">
                  Talk to Copilot
                </Link>
              </div>
              <dl className="mt-12 grid grid-cols-3 gap-6 max-w-md">
                {[
                  { k: "Uptime SLA", v: 99.999, suffix: "%", dec: 3 },
                  { k: "Nodes managed", v: 12480, suffix: "" },
                  { k: "Avg. MTTR", v: 47, suffix: "s" },
                ].map((s) => (
                  <div key={s.k}>
                    <div className="text-2xl font-display font-semibold text-gradient-primary">
                      <Counter to={s.v} suffix={s.suffix} decimals={s.dec ?? 0} />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{s.k}</div>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative animate-fade-up" style={{ animationDelay: "120ms" }}>
              <div className="glass rounded-3xl p-6 shadow-elegant">
                <NetworkGlobe className="w-full h-auto" />
                <div className="mt-2 grid grid-cols-3 gap-2 text-[10px] font-mono text-muted-foreground">
                  <div className="glass-subtle rounded-lg p-2"><div className="text-foreground font-semibold">142ms</div>LATENCY</div>
                  <div className="glass-subtle rounded-lg p-2"><div className="text-foreground font-semibold">0.02%</div>PKT LOSS</div>
                  <div className="glass-subtle rounded-lg p-2"><div className="text-foreground font-semibold">98.4%</div>HEALTH</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs font-mono text-primary uppercase tracking-widest">Capabilities</div>
            <h2 className="mt-3 text-4xl md:text-5xl font-display font-semibold">A complete operations stack, sealed inside your perimeter.</h2>
            <p className="mt-4 text-muted-foreground">Six engines working in concert — built for environments where the cloud isn't an option.</p>
          </div>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={f.title} className="glass rounded-2xl p-6 hover-lift animate-fade-up" style={{ animationDelay: `${i * 70}ms` }}>
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${f.tone} text-white shadow-elegant`}>
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA strip */}
        <section className="py-20">
          <div className="glass-strong rounded-3xl p-10 md:p-14 overflow-hidden relative">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gradient-primary opacity-30 blur-3xl" />
            <div className="absolute -left-10 -bottom-20 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
            <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-semibold">Built for the networks that cannot fail.</h2>
                <p className="mt-4 text-muted-foreground max-w-xl">From sovereign telecom backbones to forward-deployed command posts, Street Forge runs where uptime is not negotiable and connectivity to the cloud is not assumed.</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {["100% offline inference", "Tamper-evident audit ledger", "FIPS 140-3 cryptography", "Deterministic latency profile"].map((b) => (
                    <li key={b} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> {b}</li>
                  ))}
                </ul>
                <Link to="/dashboard" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant">
                  Enter Operations Center <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="glass rounded-2xl p-6 font-mono text-xs">
                <div className="flex items-center gap-2 text-muted-foreground"><div className="h-2 w-2 rounded-full bg-accent animate-pulse" /> sf-noc · core-01 · secure</div>
                <pre className="mt-4 text-[11px] leading-relaxed overflow-x-auto">
{`$ sf status --core
✔ digital_twin       : SYNCED (lag 12ms)
✔ copilot            : ONLINE (local-llm/8b)
✔ predictor          : 3 forecasts active
⚠ threat_engine      : 1 anomaly investigating
─────────────────────────────────────
NETWORK HEALTH       98.4 / 100
SLA BURN (24h)       0.001%`}
                </pre>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
