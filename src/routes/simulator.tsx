import { createFileRoute } from "@tanstack/react-router";
import { TopNav, Footer, BlurBlobs } from "@/components/shell";
import { Zap, Flame, ShieldAlert, Waves, Play, RotateCcw, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/simulator")({
  head: () => ({
    meta: [
      { title: "Incident Simulator — Street Forge SecureOps" },
      { name: "description", content: "Stress-test your network on the digital twin. Simulate link failure, router overheating, unauthorized devices and congestion safely." },
    ],
  }),
  component: Simulator,
});

const scenarios = [
  { id: "link", icon: Zap, title: "Link Failure", desc: "Sever a backbone path and watch convergence.", color: "from-primary to-primary-glow",
    steps: ["BGP withdrawal detected on MPLS-3", "Traffic rerouted via TE-2 backup", "Convergence achieved in 4.2s", "Predicted SLA impact: 0.001%"] },
  { id: "heat", icon: Flame, title: "Router Overheating", desc: "Push Core-01 thermal envelope past threshold.", color: "from-[oklch(0.78_0.16_75)] to-destructive",
    steps: ["Inlet temp rising: 38°C → 52°C", "Fan curve auto-adjusted to 84%", "Throttling preempted via load shift", "Maintenance ticket auto-created"] },
  { id: "rogue", icon: ShieldAlert, title: "Unauthorized Device", desc: "Inject a rogue MAC on the access fabric.", color: "from-destructive to-primary",
    steps: ["Unknown MAC 4a:f1:… observed on DC-Alpha:23", "Behavioral score: 0.91 (anomalous)", "Port quarantined automatically", "Forensic snapshot captured"] },
  { id: "cong", icon: Waves, title: "Congestion", desc: "Burst traffic to 140% capacity on Edge-APAC.", color: "from-accent to-primary",
    steps: ["Queue depth >85% on Edge-APAC", "QoS reprioritization activated", "Low-priority flows shaped", "Headroom restored in 2.1s"] },
];

function Simulator() {
  const [active, setActive] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);

  const run = (id: string) => {
    setActive(id); setStep(0); setRunning(true);
    const sc = scenarios.find((s) => s.id === id)!;
    sc.steps.forEach((_, i) => {
      setTimeout(() => {
        setStep(i + 1);
        if (i === sc.steps.length - 1) setRunning(false);
      }, (i + 1) * 800);
    });
  };
  const reset = () => { setActive(null); setStep(0); setRunning(false); };

  const current = scenarios.find((s) => s.id === active);

  return (
    <>
      <BlurBlobs />
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 pt-10">
        <div className="mb-6">
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Digital Twin</div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold mt-1">Incident Simulator</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">Run failure scenarios on the digital twin. Production stays untouched.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {scenarios.map((s) => (
            <div key={s.id} className={`glass rounded-2xl p-6 hover-lift relative overflow-hidden ${active === s.id ? "ring-2 ring-primary/40" : ""}`}>
              <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${s.color} opacity-20 blur-2xl`} />
              <div className="relative flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${s.color} text-white grid place-items-center shadow-elegant`}>
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold">{s.title}</h3>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => run(s.id)}
                  disabled={running}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold shadow-elegant disabled:opacity-50"
                >
                  <Play className="h-3 w-3" /> Run
                </button>
              </div>
              {active === s.id && (
                <div className="relative mt-5 space-y-2">
                  {s.steps.map((st, i) => (
                    <div key={i} className={`flex items-start gap-2 text-sm transition-opacity ${i < step ? "opacity-100" : "opacity-30"}`}>
                      {i < step ? <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                        : <span className="h-4 w-4 rounded-full border border-border mt-0.5 shrink-0" />}
                      <span className="font-mono text-xs">{st}</span>
                    </div>
                  ))}
                  {step === s.steps.length && (
                    <button onClick={reset} className="mt-3 inline-flex items-center gap-1.5 text-xs text-primary hover:underline">
                      <RotateCcw className="h-3 w-3" /> Reset scenario
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {current && step === current.steps.length && (
          <div className="mt-6 glass-strong rounded-2xl p-6 animate-fade-up">
            <div className="text-xs font-mono text-accent uppercase tracking-wider">Simulation Complete</div>
            <h3 className="font-display text-xl font-semibold mt-1">{current.title} — Resolved</h3>
            <p className="text-sm text-muted-foreground mt-2">The copilot's autonomous response held the network within SLA. Review the playbook before promoting to production.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
