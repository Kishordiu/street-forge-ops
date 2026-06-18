export function NetworkGlobe({ className = "" }: { className?: string }) {
  // Animated network globe — pure SVG, lightweight
  const nodes = [
    { x: 200, y: 90 }, { x: 320, y: 140 }, { x: 110, y: 180 },
    { x: 260, y: 220 }, { x: 380, y: 250 }, { x: 80, y: 300 },
    { x: 210, y: 340 }, { x: 340, y: 360 }, { x: 160, y: 250 },
  ];
  const links: Array<[number, number]> = [
    [0,1],[0,2],[1,3],[2,8],[8,3],[3,4],[3,6],[6,7],[5,6],[2,5],[1,4],[4,7],[8,6],
  ];
  return (
    <svg viewBox="0 0 460 460" className={className} aria-hidden>
      <defs>
        <radialGradient id="globe" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="oklch(0.585 0.21 277 / 0.25)" />
          <stop offset="60%" stopColor="oklch(0.72 0.13 185 / 0.15)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="link" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.585 0.21 277)" />
          <stop offset="100%" stopColor="oklch(0.72 0.13 185)" />
        </linearGradient>
        <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <circle cx="230" cy="230" r="200" fill="url(#globe)" />
      <g className="animate-spin-slow" style={{ transformOrigin: "230px 230px" }}>
        {[180, 140, 100].map((r, i) => (
          <ellipse key={i} cx="230" cy="230" rx={r} ry={r * 0.42} fill="none" stroke="oklch(0.585 0.21 277 / 0.25)" strokeWidth="1" strokeDasharray="2 6" />
        ))}
        {[180, 140, 100].map((r, i) => (
          <ellipse key={`v${i}`} cx="230" cy="230" rx={r * 0.42} ry={r} fill="none" stroke="oklch(0.72 0.13 185 / 0.25)" strokeWidth="1" strokeDasharray="2 6" />
        ))}
      </g>
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="url(#link)" strokeWidth="1.4" strokeLinecap="round"
          className="animate-route" opacity="0.7"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="10" fill="oklch(0.585 0.21 277 / 0.25)" filter="url(#soft)" />
          <circle cx={n.x} cy={n.y} r="4" fill="white" stroke="oklch(0.585 0.21 277)" strokeWidth="1.5" />
          {i % 3 === 0 && (
            <circle cx={n.x} cy={n.y} r="6" fill="none" stroke="oklch(0.72 0.13 185)" strokeWidth="1.2" className="animate-pulse-ring" style={{ transformOrigin: `${n.x}px ${n.y}px` }} />
          )}
        </g>
      ))}
    </svg>
  );
}
