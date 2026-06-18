import { useEffect, useRef, useState } from "react";

export function Counter({ to, suffix = "", decimals = 0, duration = 1400 }: { to: number; suffix?: string; decimals?: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <span ref={ref} className="font-mono tabular-nums">{val.toFixed(decimals)}{suffix}</span>;
}
