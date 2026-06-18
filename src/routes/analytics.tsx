import { createFileRoute } from "@tanstack/react-router";
import { TopNav, Footer, BlurBlobs } from "@/components/shell";
import { Counter } from "@/components/counter";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { useMemo } from "react";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — Street Forge SecureOps" },
      { name: "description", content: "Network health scores, throughput trends and incident analytics across your secure infrastructure." },
    ],
  }),
  component: Analytics,
});

function Analytics() {
  const traffic = useMemo(() => Array.from({length: 30}, (_, i) => ({ d: `D${i+1}`, v: 180 + Math.sin(i/3)*60 + Math.random()*40 })), []);
  const incidents = useMemo(() => Array.from({length: 12}, (_, i) => ({ m: ["J","F","M","A","M","J","J","A","S","O","N","D"][i], v: Math.round(Math.random()*8 + 2) })), []);
  const score = [{ name: "score", value: 98.4, fill: "url(#radial)" }];

  return (
    <>
      <BlurBlobs />
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 pt-10">
        <div className="mb-6">
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Analytics</div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold mt-1">Network Intelligence</h1>
        </div>

        <div className="grid lg:grid-cols-4 gap-4">
          {[
            { l: "Uptime (30d)", v: 99.998, s: "%", d: 3 },
            { l: "Incidents resolved", v: 142, s: "" },
            { l: "Mean MTTR", v: 47, s: "s" },
            { l: "Threats blocked", v: 1284, s: "" },
          ].map((k) => (
            <div key={k.l} className="glass rounded-2xl p-5 hover-lift">
              <div className="text-xs text-muted-foreground">{k.l}</div>
              <div className="mt-2 text-3xl font-display font-semibold text-gradient-primary">
                <Counter to={k.v} suffix={k.s} decimals={k.d ?? 0} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid lg:grid-cols-3 gap-4">
          <div className="glass rounded-2xl p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-semibold">Throughput Trend · 30 days</h3>
              <span className="text-xs font-mono text-muted-foreground">Gbps</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer>
                <AreaChart data={traffic}>
                  <defs>
                    <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.585 0.21 277)" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="oklch(0.585 0.21 277)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="d" stroke="oklch(0.55 0.03 257)" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.55 0.03 257)" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.7)", borderRadius: 12, backdropFilter: "blur(12px)" }} />
                  <Area type="monotone" dataKey="v" stroke="oklch(0.585 0.21 277)" strokeWidth={2} fill="url(#ga)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <h3 className="font-display font-semibold">Health Score</h3>
            <div className="h-56 relative">
              <ResponsiveContainer>
                <RadialBarChart innerRadius="70%" outerRadius="100%" data={score} startAngle={210} endAngle={-30}>
                  <defs>
                    <linearGradient id="radial" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="oklch(0.585 0.21 277)" />
                      <stop offset="100%" stopColor="oklch(0.72 0.13 185)" />
                    </linearGradient>
                  </defs>
                  <PolarAngleAxis type="number" domain={[0,100]} tick={false} />
                  <RadialBar dataKey="value" cornerRadius={20} background={{ fill: "oklch(0.92 0.02 260)" }} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 grid place-items-center pointer-events-none">
                <div className="text-center">
                  <div className="text-4xl font-display font-semibold text-gradient-primary"><Counter to={98.4} decimals={1} /></div>
                  <div className="text-xs text-muted-foreground font-mono">/ 100</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-5 lg:col-span-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-semibold">Incidents by month</h3>
              <span className="text-xs font-mono text-muted-foreground">last 12 months</span>
            </div>
            <div className="h-56">
              <ResponsiveContainer>
                <BarChart data={incidents}>
                  <defs>
                    <linearGradient id="gb" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.72 0.13 185)" />
                      <stop offset="100%" stopColor="oklch(0.585 0.21 277)" />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="m" stroke="oklch(0.55 0.03 257)" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.55 0.03 257)" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.7)", borderRadius: 12 }} />
                  <Bar dataKey="v" fill="url(#gb)" radius={[8,8,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
