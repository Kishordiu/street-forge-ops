import { createFileRoute } from "@tanstack/react-router";
import { TopNav, Footer, BlurBlobs } from "@/components/shell";
import { Bot, Send, Sparkles, User2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export const Route = createFileRoute("/copilot")({
  head: () => ({
    meta: [
      { title: "AI Copilot — Street Forge SecureOps" },
      { name: "description", content: "Ask the offline AI copilot about your network. Get root-cause insights, health diagnostics and recommended actions — fully air-gapped." },
    ],
  }),
  component: Copilot,
});

type Msg = { id: string; role: "user" | "assistant"; text: string; cards?: Card[]; recs?: string[] };
type Card = { title: string; value: string; tone: "ok" | "warn" | "crit"; note: string };

const suggestions = [
  "Which router is unhealthy?",
  "Show predicted outages in the next 24 hours",
  "Why did latency spike on Edge-EU?",
  "Recommend a safe maintenance window",
];

function synth(q: string): Msg {
  const lower = q.toLowerCase();
  if (lower.includes("unhealthy") || lower.includes("router")) {
    return {
      id: crypto.randomUUID(), role: "assistant",
      text: "I've scanned 142 nodes across the MPLS core. One node is in a critical state and one is degraded.",
      cards: [
        { title: "MPLS-7", value: "CRITICAL", tone: "crit", note: "Optical signal degrading · predicted failure in ~6h" },
        { title: "Edge-EU", value: "DEGRADED", tone: "warn", note: "Memory pressure at 87% · trending upward" },
        { title: "Core-01", value: "STABLE", tone: "ok", note: "Minor fan RPM drift · low priority" },
      ],
      recs: [
        "Reroute MPLS-7 sessions through TE-3 backup path",
        "Open a low-priority ticket for Edge-EU memory analysis",
        "No action required for Core-01 — monitor only",
      ],
    };
  }
  if (lower.includes("latency") || lower.includes("spike")) {
    return {
      id: crypto.randomUUID(), role: "assistant",
      text: "The Edge-EU latency spike at 14:22Z correlates with a BGP route flap originating from peer AS-65021. Causal chain identified.",
      cards: [
        { title: "Trigger", value: "BGP FLAP", tone: "warn", note: "Peer AS-65021 withdrew 412 routes" },
        { title: "Impact", value: "+87ms p99", tone: "crit", note: "Sustained 4m 18s" },
        { title: "Mitigation", value: "AUTO", tone: "ok", note: "Convergence completed via TE backup" },
      ],
      recs: ["Apply route dampening profile to AS-65021", "Notify upstream operator of repeated flap pattern"],
    };
  }
  return {
    id: crypto.randomUUID(), role: "assistant",
    text: "Analyzing your query against the live digital twin and 18 months of telemetry. The network is operating within nominal parameters; no immediate intervention recommended.",
    recs: ["Continue monitoring", "Run predictive sweep on edge fleet"],
  };
}

function Copilot() {
  const [messages, setMessages] = useState<Msg[]>([
    { id: "0", role: "assistant", text: "Hello, Operator. I'm running locally on this node — no telemetry leaves the perimeter. What would you like to investigate?" },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, thinking]);

  const send = (text?: string) => {
    const q = (text ?? input).trim();
    if (!q || thinking) return;
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: "user", text: q }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, synth(q)]);
      setThinking(false);
    }, 900);
  };

  return (
    <>
      <BlurBlobs />
      <TopNav />
      <main className="mx-auto max-w-5xl px-4 pt-10">
        <div className="mb-6">
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Copilot</div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold mt-1 flex items-center gap-3">
            Offline Intelligence
            <span className="inline-flex items-center gap-1.5 glass-subtle rounded-full px-2.5 py-1 text-[10px] font-mono text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" /> LOCAL MODEL
            </span>
          </h1>
        </div>

        <div className="glass rounded-3xl p-4 md:p-6 min-h-[60vh] flex flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto max-h-[60vh] pr-1">
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-3 animate-fade-up ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`h-8 w-8 shrink-0 grid place-items-center rounded-xl ${m.role === "user" ? "bg-secondary" : "bg-gradient-primary text-white shadow-elegant"}`}>
                  {m.role === "user" ? <User2 className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`max-w-[85%] ${m.role === "user" ? "items-end" : ""} flex flex-col gap-2`}>
                  <div className={`rounded-2xl px-4 py-2.5 text-sm ${m.role === "user" ? "bg-gradient-primary text-primary-foreground" : ""}`}>
                    {m.text}
                  </div>
                  {m.cards && (
                    <div className="grid sm:grid-cols-3 gap-2">
                      {m.cards.map((c) => (
                        <div key={c.title} className="glass-subtle rounded-xl p-3">
                          <div className="flex items-center justify-between">
                            <div className="font-mono text-xs text-muted-foreground">{c.title}</div>
                            {c.tone === "ok" ? <CheckCircle2 className="h-3.5 w-3.5 text-[oklch(0.7_0.16_155)]" />
                              : <AlertTriangle className={`h-3.5 w-3.5 ${c.tone === "crit" ? "text-destructive" : "text-[oklch(0.78_0.16_75)]"}`} />}
                          </div>
                          <div className={`mt-1 font-display text-sm font-semibold ${c.tone === "crit" ? "text-destructive" : c.tone === "warn" ? "text-[oklch(0.55_0.16_75)]" : "text-[oklch(0.5_0.16_155)]"}`}>{c.value}</div>
                          <div className="text-[11px] text-muted-foreground mt-1 leading-snug">{c.note}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {m.recs && (
                    <div className="glass-subtle rounded-xl p-3">
                      <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1"><Sparkles className="h-3 w-3 text-primary" /> Recommended Actions</div>
                      <ul className="space-y-1.5">
                        {m.recs.map((r, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="mt-0.5 h-5 w-5 grid place-items-center rounded bg-gradient-primary text-white text-[10px] font-mono shrink-0">{i+1}</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex gap-3 animate-fade-up">
                <div className="h-8 w-8 grid place-items-center rounded-xl bg-gradient-primary text-white"><Bot className="h-4 w-4" /></div>
                <div className="rounded-2xl px-4 py-3 glass-subtle text-sm text-muted-foreground flex items-center gap-2">
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: "120ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: "240ms" }} />
                  </span>
                  Analyzing telemetry…
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {messages.length <= 2 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button key={s} onClick={() => send(s)} className="glass-subtle hover-lift rounded-full px-3 py-1.5 text-xs">{s}</button>
              ))}
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="mt-4 glass-strong rounded-2xl p-2 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Which router is unhealthy?"
              className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button type="submit" disabled={thinking || !input.trim()} className="h-9 w-9 grid place-items-center rounded-xl bg-gradient-primary text-white shadow-elegant disabled:opacity-50">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
