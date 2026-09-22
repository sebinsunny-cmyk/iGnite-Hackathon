/**
 * Direction A — INSTRUMENT
 *
 * Concept: the organiser is the IEEE *Signal Processing* Society, and the
 * gIGNITE mark is drawn from circuit traces. So the interface behaves like a
 * measurement instrument rather than a dashboard: graph-paper ground, hairline
 * rules, crosshair ticks, and submissions drawn as a signal trace instead of
 * a bar chart. Zero radius, zero shadow, nothing floats.
 *
 * Type: Familjen Grotesk (a Nordic grotesk with real quirks in the g and a)
 *       over Spline Sans Mono for every readout.
 */
import { teams, byTheme, byStatus, daily, dailyMeta, totals } from "../data/registrations";
import { LOGO, LOGO_ALT } from "../assets";

const INK = "#0E1116";
const PAPER = "#FBFBF8";
const RULE = "#D8D9D2";
const TRACE = "#F4590B";
const COOL = "#27459B";

const grid = {
  backgroundImage:
    `linear-gradient(${RULE} 1px, transparent 1px), linear-gradient(90deg, ${RULE} 1px, transparent 1px)`,
  backgroundSize: "24px 24px",
  backgroundPosition: "-1px -1px",
};

export default function Instrument() {
  const max = 1;
  const pts = daily.map((d, i) => {
    const x = 5 + (i / (daily.length - 1)) * 90; // inset so the end marks are not clipped
    const y = 100 - (d.count / max) * 82 - 9;
    return [x, y, d];
  });
  const path = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ");

  return (
    <div style={{ background: PAPER, color: INK, fontFamily: "'Familjen Grotesk', sans-serif" }}>
      {/* ---- instrument header ---- */}
      <header style={{ borderBottom: `1px solid ${INK}` }}>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 px-5 py-4 lg:px-8">
          <img src={LOGO.gignite} alt={LOGO_ALT.gignite} className="h-9 w-auto lg:h-12" />
          <Mono className="hidden text-[11px] lg:block" style={{ color: "#6B6F74" }}>
            CH1 · REGISTRATIONS · 2026-09-22 · WINDOW OPEN
          </Mono>
          <div className="ml-auto flex items-center gap-5">
            <Mono className="text-[11px]" style={{ color: "#6B6F74" }}>
              DEEPAK SREERAJ / ADMIN
            </Mono>
            <span
              className="grid h-9 w-9 place-items-center"
              style={{ background: INK, color: PAPER, fontSize: 11, fontFamily: "'Spline Sans Mono', monospace" }}
            >
              DS
            </span>
          </div>
        </div>
        <nav className="flex" style={{ borderTop: `1px solid ${RULE}` }}>
          {["REGISTRATIONS", "STAFF", "AUDIT", "EXPORT"].map((t, i) => (
            <button
              key={t}
              className="px-5 py-2.5 text-left lg:px-8"
              style={{
                borderRight: `1px solid ${RULE}`,
                background: i === 0 ? INK : "transparent",
                color: i === 0 ? PAPER : "#6B6F74",
                fontFamily: "'Spline Sans Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.08em",
              }}
            >
              {t}
            </button>
          ))}
        </nav>
      </header>

      <main className="px-5 py-8 lg:px-8">
        {/* ---- readout row ---- */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Mono className="text-[11px]" style={{ color: TRACE }}>
              ▸ ACQUIRING
            </Mono>
            <h1
              className="mt-3 text-[40px] leading-[0.94] lg:text-[62px]"
              style={{ fontWeight: 700, letterSpacing: "-0.03em", maxWidth: "14ch" }}
            >
              Three entries on the line.
            </h1>
          </div>
          <div className="flex gap-10">
            {[
              ["TOTAL", totals.teams],
              ["UNJUDGED", totals.needJudge],
              ["TODAY", dailyMeta.today],
            ].map(([k, v]) => (
              <div key={k}>
                <div
                  className="tnum text-[46px] leading-none"
                  style={{ fontFamily: "'Spline Sans Mono', monospace", fontWeight: 700 }}
                >
                  {String(v).padStart(2, "0")}
                </div>
                <Mono className="mt-2 block text-[10px]" style={{ color: "#6B6F74" }}>
                  {k}
                </Mono>
              </div>
            ))}
          </div>
        </div>

        {/* ---- the trace ---- */}
        <section className="mt-8" style={{ border: `1px solid ${INK}` }}>
          <div
            className="flex flex-wrap items-center gap-x-6 gap-y-1 px-4 py-2"
            style={{ borderBottom: `1px solid ${RULE}` }}
          >
            <Mono className="text-[10px]">SUBMISSIONS / DAY</Mono>
            <Mono className="text-[10px]" style={{ color: "#6B6F74" }}>
              SPAN 16–22 SEP
            </Mono>
            <Mono className="text-[10px]" style={{ color: "#6B6F74" }}>
              PEAK 1
            </Mono>
            <Mono className="ml-auto text-[10px]" style={{ color: TRACE }}>
              Δ +1 VS PREV
            </Mono>
          </div>

          <div className="relative" style={{ ...grid, height: 180 }}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <path d={path} fill="none" stroke={TRACE} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
            </svg>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              {pts.map(([x, y, d]) => (
                <g key={d.day}>
                  <line x1={x} y1="0" x2={x} y2="100" stroke={RULE} strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
                  {d.count > 0 && (
                    <rect
                      x={x - 0.9}
                      y={y - 2.2}
                      width="1.8"
                      height="4.4"
                      fill={d.today ? TRACE : INK}
                      vectorEffect="non-scaling-stroke"
                    />
                  )}
                </g>
              ))}
            </svg>
          </div>

          <div className="flex" style={{ borderTop: `1px solid ${RULE}` }}>
            {daily.map((d) => (
              <div
                key={d.day}
                className="flex-1 px-2 py-1.5 text-center"
                style={{ borderRight: `1px solid ${RULE}` }}
              >
                <Mono className="text-[10px]" style={{ color: d.today ? TRACE : "#6B6F74" }}>
                  {d.day}
                </Mono>
              </div>
            ))}
          </div>
        </section>

        {/* ---- channels ---- */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_1fr]">
          <section style={{ border: `1px solid ${INK}`, borderRight: "none" }} className="max-lg:!border-r max-lg:border-b-0">
            <Head>CHANNEL / THEME</Head>
            {byTheme.map((t) => (
              <div
                key={t.label}
                className="flex items-center gap-4 px-4 py-3"
                style={{ borderBottom: `1px solid ${RULE}` }}
              >
                <Mono className="w-6 text-[11px]" style={{ color: "#6B6F74" }}>
                  {String(t.count).padStart(2, "0")}
                </Mono>
                <span className="text-[15px]">{t.label}</span>
                <span className="ml-auto flex h-[3px] w-[120px]" style={{ background: RULE }}>
                  <span
                    style={{ width: `${(t.count / 2) * 100}%`, background: t.count ? TRACE : "transparent" }}
                  />
                </span>
              </div>
            ))}
          </section>

          <section style={{ border: `1px solid ${INK}` }}>
            <Head>CHANNEL / STATUS</Head>
            {byStatus.map((s) => (
              <div
                key={s.key}
                className="flex items-center gap-4 px-4 py-3"
                style={{ borderBottom: `1px solid ${RULE}` }}
              >
                <Mono className="w-6 text-[11px]" style={{ color: "#6B6F74" }}>
                  {String(s.count).padStart(2, "0")}
                </Mono>
                <span className="text-[15px]">{s.label}</span>
                {s.count === 0 && (
                  <Mono className="ml-auto text-[10px]" style={{ color: "#9A9E9F" }}>
                    NO SIGNAL
                  </Mono>
                )}
              </div>
            ))}
          </section>
        </div>

        {/* ---- entries ---- */}
        <section className="mt-8" style={{ border: `1px solid ${INK}` }}>
          <Head>
            ENTRIES <span style={{ color: "#6B6F74" }}>— 3 OF 3 SHOWN</span>
          </Head>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr style={{ borderBottom: `1px solid ${INK}` }}>
                  {["#", "TEAM", "THEME", "LEAD", "JUDGES", "STATUS", "LOGGED"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2 text-left"
                      style={{ fontFamily: "'Spline Sans Mono', monospace", fontSize: 10, letterSpacing: "0.08em", fontWeight: 500, color: "#6B6F74" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {teams.map((t, i) => (
                  <tr key={t.name} style={{ borderBottom: `1px solid ${RULE}` }}>
                    <td className="px-4 py-3.5">
                      <Mono className="text-[11px]" style={{ color: "#9A9E9F" }}>
                        {String(i + 1).padStart(2, "0")}
                      </Mono>
                    </td>
                    <td className="px-4 py-3.5 text-[16px]" style={{ fontWeight: 600 }}>
                      {t.name}
                    </td>
                    <td className="px-4 py-3.5 text-[14px]" style={{ color: "#4A4E52" }}>
                      {t.theme}
                    </td>
                    <td className="px-4 py-3.5 text-[14px]">{t.leader}</td>
                    <td className="px-4 py-3.5">
                      {t.judges.length ? (
                        <Mono className="text-[11px]" style={{ color: COOL }}>
                          {t.judges.join(" · ")}
                        </Mono>
                      ) : (
                        <Mono
                          className="inline-block px-2 py-1 text-[10px]"
                          style={{ border: `1px dashed ${TRACE}`, color: TRACE }}
                        >
                          ASSIGN
                        </Mono>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <Mono
                        className="inline-block px-2 py-1 text-[10px]"
                        style={{
                          background: t.status === "Shortlisted" ? INK : "transparent",
                          color: t.status === "Shortlisted" ? PAPER : INK,
                          border: `1px solid ${INK}`,
                        }}
                      >
                        {t.status.toUpperCase()}
                      </Mono>
                    </td>
                    <td className="px-4 py-3.5">
                      <Mono className="text-[11px]" style={{ color: "#6B6F74" }}>
                        {t.submittedShort} {t.submittedTime}
                      </Mono>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="mt-8 flex flex-wrap items-center gap-6" style={{ borderTop: `1px solid ${INK}`, paddingTop: 20 }}>
          <Mono className="text-[10px]" style={{ color: "#6B6F74" }}>
            PRESENTED BY
          </Mono>
          <img src={LOGO.gadgeon} alt={LOGO_ALT.gadgeon} className="h-8 w-auto lg:h-10" />
          <img src={LOGO.fisat} alt={LOGO_ALT.fisat} className="h-8 w-auto lg:h-10" />
          <img src={LOGO.ieee} alt={LOGO_ALT.ieee} className="h-8 w-auto lg:h-10" />
        </footer>
      </main>
    </div>
  );
}

function Mono({ children, className = "", style = {} }) {
  return (
    <span
      className={className}
      style={{ fontFamily: "'Spline Sans Mono', monospace", letterSpacing: "0.08em", ...style }}
    >
      {children}
    </span>
  );
}

function Head({ children }) {
  return (
    <div className="px-4 py-2" style={{ borderBottom: `1px solid ${INK}` }}>
      <span
        style={{ fontFamily: "'Spline Sans Mono', monospace", fontSize: 10, letterSpacing: "0.1em" }}
      >
        {children}
      </span>
    </div>
  );
}
