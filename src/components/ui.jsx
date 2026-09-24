import { useEffect, useId, useState } from "react";
import { statusTone } from "../data/registrations";
import { LOGO, LOGO_ALT } from "../assets";

/* ---------------- brand ---------------- */

export function GigniteMark({ className = "", tone = "dark" }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="grid h-6 w-6 place-items-center rounded-[6px] bg-ink">
        <span className="h-2 w-2 rounded-[2px] bg-white" />
      </span>
      <span
        className={`text-[15px] font-extrabold tracking-[-0.011em] ${
          tone === "dark" ? "text-ink" : "text-white"
        }`}
      >
        gIGNITE
      </span>
    </span>
  );
}

export function SponsorRibbon({ className = "", compact = false }) {
  const h = compact ? "h-5" : "h-7";
  return (
    <div className={`flex flex-wrap items-center gap-x-7 gap-y-3 ${className}`}>
      <img src={LOGO.gadgeon} alt={LOGO_ALT.gadgeon} className={`${h} w-auto opacity-80`} />
      <span className="h-4 w-px bg-line" />
      <img src={LOGO.fisat} alt={LOGO_ALT.fisat} className={`${h} w-auto opacity-80`} />
      <span className="h-4 w-px bg-line" />
      <img src={LOGO.ieee} alt={LOGO_ALT.ieee} className={`${h} w-auto opacity-80`} />
    </div>
  );
}

/* ---------------- atoms ---------------- */

export function StatusPill({ status, size = "sm" }) {
  const t = statusTone[status] ?? statusTone.Submitted;
  const pad = size === "sm" ? "px-2 py-[3px] text-[11.5px]" : "px-2.5 py-1 text-[12px]";
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${pad} ${t.bg} ${t.text}`}>
      {status}
    </span>
  );
}

/** Soft delta chip — green for gains, red for losses, in the reference style. */
export function Delta({ value, tone = "pos" }) {
  const c = tone === "pos" ? "bg-shl-soft text-shl" : "bg-rej-soft text-rej";
  return (
    <span className={`tnum inline-flex items-center whitespace-nowrap rounded-full px-2 py-[3px] text-[12px] font-medium ${c}`}>
      {value}
    </span>
  );
}

/** Pastel rounded-square icon tile. */
export function IconTile({ tint = "orange", children }) {
  return (
    <span
      className="grid h-10 w-10 place-items-center rounded-[11px]"
      style={{ background: `var(--color-tint-${tint})`, color: `var(--color-on-${tint === "blue" ? "purple" : tint})` }}
    >
      {children}
    </span>
  );
}

/** Gradient sparkline, stroke only, as used beside each KPI. */
export function Spark({ points, stroke = "var(--color-viz-pink)", w = 120, h = 40 }) {
  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const span = max - min || 1;
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - 4 - ((p - min) / span) * (h - 8);
      return `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <path d={d} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StatusDot({ status, className = "" }) {
  const t = statusTone[status] ?? statusTone.Submitted;
  return <span className={`inline-block h-[7px] w-[7px] shrink-0 rounded-full ${t.dot} ${className}`} />;
}

export function JudgeChip({ name, removable = false }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-sub-soft px-2.5 py-1 text-[12px] font-medium text-sub">
      {name}
      {removable && <span className="opacity-45">×</span>}
    </span>
  );
}

export function AddJudge({ full = false }) {
  return (
    <button
      type="button"
      className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-full border-[0.8px] border-dashed border-line-2 px-3.5 text-[12px] font-medium text-ink-4 transition hover:border-primary hover:text-sub lg:min-h-[30px] lg:px-2.5 ${
        full ? "w-full justify-center" : ""
      }`}
    >
      + Assign judge
    </button>
  );
}

export function Avatar({ initials, size = 32 }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full font-semibold text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.34,
        background: "linear-gradient(135deg,var(--color-viz-pink),var(--color-viz-purple))",
      }}
    >
      {initials}
    </span>
  );
}

/** Segmented control — the one control style used for every range/window switch. */
export function Segmented({ options, value, onChange }) {
  return (
    <div className="flex shrink-0 rounded-[10px] bg-sunk p-[3px]">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`h-9 whitespace-nowrap rounded-[8px] px-3 text-[12.5px] font-medium transition ${
            o === value ? "bg-paper text-ink shadow-[0_1px_2px_rgba(14,14,20,0.06)]" : "text-ink-3"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

/* ---------------- charts ---------------- */

export function DailyBars({ data, max = 1, height = 56, accent = "bg-ink", rest = "bg-line", showDays = true }) {
  return (
    <div>
      <div className="flex items-stretch gap-1.5" style={{ height }}>
        {data.map((d) => {
          const pct = d.count === 0 ? 3 : (d.count / max) * 100;
          return (
            <div key={d.day} className="flex flex-1 flex-col justify-end">
              <div
                className={`w-full rounded-[3px] ${d.today ? accent : d.count > 0 ? "bg-ink-2/70" : rest}`}
                style={{ height: `${pct}%` }}
                title={`${d.day} Sept — ${d.count}`}
              />
            </div>
          );
        })}
      </div>
      {showDays && (
        <div className="mt-2 flex gap-1.5">
          {data.map((d) => (
            <span key={d.day} className="lbl tnum flex-1 text-center">
              {d.day}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function RankBar({ label, count, max = 2, tone = "bg-ink" }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-[120px] shrink-0 truncate text-[12px] text-ink-2">{label}</span>
      <span className="h-[6px] flex-1 overflow-hidden rounded-full bg-sunk">
        {count > 0 && (
          <span
            className={`block h-full rounded-full ${tone}`}
            style={{ width: `${(count / max) * 100}%` }}
          />
        )}
      </span>
      <span className="tnum w-4 text-right font-mono text-[11px] text-ink-2">{count}</span>
    </div>
  );
}

/* ---------------- icons ---------------- */

export const Icon = {
  users: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  download: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  ),
  logout: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
    </svg>
  ),
  search: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  chevron: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  arrow: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  settings: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6h.08A1.65 1.65 0 0 0 10.6 3.09V3a2 2 0 1 1 4 0v.09A1.65 1.65 0 0 0 16.1 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 20.4 9v.08a1.65 1.65 0 0 0 1.51 1.51H22a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  ),
  board: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="3" width="6" height="18" rx="1.5" />
      <rect x="15" y="3" width="6" height="11" rx="1.5" />
    </svg>
  ),
  list: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  ),
  info: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9.25" />
      <path d="M12 16v-4.5M12 8.2h.01" />
    </svg>
  ),
  bold: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6.5 4h6a4 4 0 0 1 0 8h-6zM6.5 12h7a4 4 0 0 1 0 8h-7z" />
    </svg>
  ),
  italic: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M15 4h4M5 20h4M14.5 4 9.5 20" />
    </svg>
  ),
  bullets: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />
    </svg>
  ),
  numbers: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M10 6h10M10 12h10M10 18h10M4 6V4h-.8M3.4 18H5.4M3.4 18c0-1.2 2-1.4 2-2.6 0-.6-.6-1-1.2-.8" />
    </svg>
  ),
  grid: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.6" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.6" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.6" />
    </svg>
  ),
  rows: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="4" width="18" height="4.5" rx="1.4" />
      <rect x="3" y="12" width="18" height="4.5" rx="1.4" />
      <path d="M3 20h18" />
    </svg>
  ),
  bell: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
    </svg>
  ),
  check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  doc: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  ),
};


/* ---------------- tooltip ---------------- */

/**
 * Info tooltip. Opens on hover and on focus for pointer users, and on tap for
 * touch users (where hover does not exist). Escape closes it.
 */
export function InfoTip({ text, label = "More about this field" }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-describedby={open ? id : undefined}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className={`grid h-5 w-5 place-items-center rounded-full transition ${
          open ? "bg-sub-soft text-sub" : "text-ink-4 hover:text-ink-3"
        }`}
      >
        <Icon.info className="h-[15px] w-[15px]" />
      </button>

      {open && (
        <span
          id={id}
          role="tooltip"
          className="absolute left-1/2 top-[calc(100%+9px)] z-30 w-[min(280px,72vw)] -translate-x-1/2 rounded-[11px] border-[0.8px] border-line bg-paper px-3.5 py-3 text-[13px] font-normal normal-case leading-relaxed tracking-normal text-ink-2 shadow-[0_10px_28px_rgba(14,14,20,0.13)]"
        >
          <span
            className="absolute -top-[5px] left-1/2 h-[9px] w-[9px] -translate-x-1/2 rotate-45 border-l-[0.8px] border-t-[0.8px] border-line bg-paper"
            aria-hidden="true"
          />
          {text}
        </span>
      )}
    </span>
  );
}


/** Subscribes to a media query. Returns false during SSR-less first paint. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);
  return matches;
}

/** Table / card switch for a collection. */
export function ViewToggle({ value, onChange }) {
  const opts = [
    { key: "table", label: "Table view", I: Icon.rows },
    { key: "card", label: "Card view", I: Icon.grid },
  ];
  return (
    <div className="flex shrink-0 rounded-[10px] bg-sunk p-[3px]">
      {opts.map(({ key, label, I }) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          title={label}
          aria-label={label}
          aria-pressed={value === key}
          className={`grid h-9 w-9 place-items-center rounded-[8px] transition ${
            value === key
              ? "bg-paper text-ink shadow-[0_1px_2px_rgba(14,14,20,0.06)]"
              : "text-ink-3 hover:text-ink-2"
          }`}
        >
          <I className="h-[17px] w-[17px]" />
        </button>
      ))}
    </div>
  );
}
