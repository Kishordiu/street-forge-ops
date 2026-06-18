import { createFileRoute } from "@tanstack/react-router";
import { TopNav, Footer, BlurBlobs } from "@/components/shell";
import { Counter } from "@/components/counter";
import { AlertTriangle, TrendingUp, Cpu, Wifi, Thermometer, Activity, Zap, ShieldCheck } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { useMemo } from "react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Network Operations Center — Street Forge SecureOps" },
      { name: "description", content: "Live topology, node health, traffic visualization, failure prediction cards and AI recommendations for your secure network." },
    ],
  }),
  component: Dashboard,
});

const nodes = [
  { id: "R1", x: 14, y: 32, status: "ok", label: "Core-01" },
  { id: "R2", x: 38, y: 18, status: "ok", label: "Edge-NA" },
  { id: "R3", x: 62, y: 28, status: "warn", label: "Edge-EU" },
  { id: "R4", x: 84, y: 42, status: "ok", label: "Edge-APAC" },
  { id: "R5", x: 30, y: 64, status: "ok", label: "DC-Alpha" },
  { id: "R6", x: 54, y: 72, status: "crit", label: "MPLS-7" },
  { id: "R7", x: 78, y: 70, status: "ok", label: "Vault" },
];
const links: Array<[number, number]> = [[0,1],[1,2],[2,3],[0,4],[4,5],[5,6],[2,5],[3,6],[1,4]];
const statusColor = (s: string) => s === "ok" ? "oklch(0.7 0.16 155)" : s === "warn" ? "oklch(0.78 0.16 75)" : "oklch(0.62 0.22 25)";

function Topology() {
  return (
    <div className="glass rounded-2xl p-5 lg:col-span-2">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Topology · MPLS Core</div>
          <h3 className="font-display font-semibold text-lg">Live Network Map</h3>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[oklch(0.7_0.16_155)]" /> HEALTHY</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[oklch(0.78_0.16_75)]" /> WARN</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[oklch(0.62_0.22_25)]" /> CRIT</span>
        </div>
      </div>
      <div className="relative aspect-[16/9] rounded-xl bg-gradient-to-br from-white/40 to-white/10 overflow-hidden border border-white/60">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="l" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="oklch(0.585 0.21 277)" />
              <stop offset="100%" stopColor="oklch(0.72 0.13 185)" />
            </linearGradient>
          </defs>
          {links.map(([a,b], i) => (
            <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
              stroke="url(#l)" strokeWidth="0.3" vectorEffect="non-scaling-stroke" className="animate-route" />
          ))}
        </svg>
        {nodes.map((n) => (
          <div key={n.id} className="absolute -translate-x-1/2 -translate-y-1/2 group" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
            <div className="relative">
              <div className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: statusColor(n.status), opacity: 0.4 }} />
              <div className="relative h-3 w-3 rounded-full ring-2 ring-white shadow" style={{ background: statusColor(n.status) }} />
            </div>
            <div className="mt-1 text-[10px] font-mono whitespace-nowrap text-foreground/80 -translate-x-2">{n.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HealthCard() {
  const data = useMemo(() => Array.from({length: 30}, (_, i) => ({ x: i, v: 80 + Math.sin(i / 3) * 8 + Math.random() * 5 })), []);
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Network Health</div>
          <div className="mt-1 text-4xl font-display font-semibold text-gradient-primary"><Counter to={98.4} decimals={1} />%</div>
        </div>
        <ShieldCheck className="h-8 w-8 text-accent" />
      </div>
      <div className="h-20 mt-2">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.585 0.21 277)" stopOpacity={0.5} />
                <stop offset="100%" stopColor="oklch(0.585 0.21 277)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="v" stroke="oklch(0.585 0.21 277)" strokeWidth={2} fill="url(#g1)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, unit, trend }: any) {
  return (
    <div className="glass rounded-2xl p-5 hover-lift">
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 text-primary" />
        <span className="text-[10px] font-mono text-accent">{trend}</span>
      </div>
      <div className="mt-3 text-2xl font-display font-semibold">
        <Counter to={value} decimals={value % 1 ? 1 : 0} suffix={unit} />
      </div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function TrafficChart() {
  const data = useMemo(() => Array.from({length: 24}, (_, i) => ({ h: `${i}:00`, ingress: 200 + Math.sin(i/3)*80 + Math.random()*40, egress: 180 + Math.cos(i/4)*70 + Math.random()*30 })), []);
  return (
    <div className="glass rounded-2xl p-5 lg:col-span-2">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Traffic · 24h</div>
          <h3 className="font-display font-semibold">Ingress / Egress (Gbps)</h3>
        </div>
        <div className="text-xs font-mono text-muted-foreground">avg <span className="text-foreground">214 Gbps</span></div>
      </div>
      <div className="h-56">
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="h" stroke="oklch(0.55 0.03 257)" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="oklch(0.55 0.03 257)" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.7)", borderRadius: 12, backdropFilter: "blur(12px)" }} />
            <Line type="monotone" dataKey="ingress" stroke="oklch(0.585 0.21 277)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="egress" stroke="oklch(0.72 0.13 185)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Predictions() {
  const items = [
    { sev: "high", node: "MPLS-7", title: "Optical degradation predicted", eta: "in 6h 12m", conf: 92 },
    { sev: "med", node: "Edge-EU", title: "Memory pressure approaching threshold", eta: "in 18h", conf: 78 },
    { sev: "low", node: "Core-01", title: "Fan RPM drift detected", eta: "in 3d", conf: 64 },
  ];
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Predictive</div>
          <h3 className="font-display font-semibold">Failure Forecasts</h3>
        </div>
        <TrendingUp className="h-5 w-5 text-primary" />
      </div>
      <div className="space-y-3">
        {items.map((i) => (
          <div key={i.title} className="glass-subtle rounded-xl p-3 hover-lift">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <span className={`px-1.5 py-0.5 rounded ${i.sev === "high" ? "bg-destructive/15 text-destructive" : i.sev === "med" ? "bg-[oklch(0.78_0.16_75/0.18)] text-[oklch(0.5_0.16_75)]" : "bg-accent/15 text-accent"}`}>{i.sev.toUpperCase()}</span>
                  <span className="text-muted-foreground">{i.node}</span>
                </div>
                <div className="text-sm mt-1.5 font-medium">{i.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{i.eta}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-mono font-semibold text-gradient-primary">{i.conf}%</div>
                <div className="text-[10px] text-muted-foreground">confidence</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Recommendations() {
  const recs = [
    "Reroute MPLS-7 traffic via backup path TE-3 to avoid predicted outage.",
    "Schedule firmware refresh for Edge-EU during next maintenance window.",
    "Quarantine unrecognized MAC observed on DC-Alpha port 23.",
  ];
  return (
    <div className="glass rounded-2xl p-5 lg:col-span-2">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">AI Copilot</div>
          <h3 className="font-display font-semibold">Recommended Actions</h3>
        </div>
        <Zap className="h-5 w-5 text-[oklch(0.78_0.16_75)]" />
      </div>
      <div className="space-y-2">
        {recs.map((r, i) => (
          <div key={i} className="flex items-start gap-3 glass-subtle rounded-xl p-3 hover-lift">
            <div className="mt-0.5 h-6 w-6 grid place-items-center rounded-md bg-gradient-primary text-white text-[10px] font-mono">{i+1}</div>
            <div className="text-sm flex-1">{r}</div>
            <button className="text-xs font-medium text-primary hover:underline">Apply</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <>
      <BlurBlobs />
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 pt-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Operations Center</div>
            <h1 className="font-display text-3xl md:text-4xl font-semibold mt-1">Network Operations</h1>
          </div>
          <div className="hidden md:flex items-center gap-2 glass-subtle rounded-full px-3 py-1.5 text-xs font-mono">
            <AlertTriangle className="h-3.5 w-3.5 text-[oklch(0.78_0.16_75)]" /> 1 active prediction
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <Topology />
          <HealthCard />
          <MetricCard icon={Activity} label="Throughput" value={214} unit=" Gbps" trend="+2.1%" />
          <MetricCard icon={Wifi} label="Avg Latency" value={142} unit=" ms" trend="-3ms" />
          <MetricCard icon={Cpu} label="Core Load" value={42} unit="%" trend="stable" />
          <MetricCard icon={Thermometer} label="Hot Nodes" value={3} unit="" trend="watching" />
          <TrafficChart />
          <Predictions />
          <Recommendations />
        </div>
      </main>
      <Footer />
    </>
  );
}
