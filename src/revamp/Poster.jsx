/**
 * Direction C — POSTER
 *
 * Concept: a hackathon is an event, and events get posters. Type is the
 * architecture: oversized, tightly set, running off the edge. Flat brand fields
 * in navy and orange, hard edges, no cards, deliberate asymmetry. The data sits
 * inside the composition rather than in containers.
 *
 * Type: Bricolage Grotesque (variable width/optical size — genuinely odd at
 *       display sizes) over Public Sans for anything that has to be read.
 */
import { teams, byTheme, byStatus, daily, dailyMeta, totals } from "../data/registrations";
import { LOGO, LOGO_ALT } from "../assets";

const NAVY = "#1B2E77";
const ORANGE = "#F4590B";
const PAPER = "#F2F0EA";
const INK = "#0B0D12";

const display = "'Bricolage Grotesque', system-ui, sans-serif";
const body = "'Public Sans', system-ui, sans-serif";

export default function Poster() {
  return (
    <div style={{ background: PAPER, color: INK, fontFamily: body }}>
      {/* ---- bar ---- */}
      <header
        className="flex flex-wrap items-center gap-x-8 gap-y-3 px-5 py-3.5 lg:px-8"
        style={{ background: INK, color: PAPER }}
      >
        <img src={LOGO.gignite} alt={LOGO_ALT.gignite} className="h-8 w-auto brightness-0 invert lg:h-10" />
        <nav className="flex flex-wrap gap-x-6">
          {["Register", "Staff", "Audit", "Export"].map((t, i) => (
            <button
              key={t}
              className="text-[13px]"
              style={{
                fontWeight: i === 0 ? 700 : 400,
                color: i === 0 ? ORANGE : "#9DA3B4",
              }}
            >
              {t}
            </button>
          ))}
        </nav>
        <span className="ml-auto text-[12px]" style={{ color: "#9DA3B4" }}>
          Deepak Sreeraj — Admin
        </span>
      </header>

      {/* ---- the poster ---- */}
      <section className="relative overflow-hidden px-5 pb-10 pt-9 lg:px-8 lg:pb-16 lg:pt-14">
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
          <span className="text-[12px] uppercase" style={{ letterSpacing: "0.2em", color: ORANGE, fontWeight: 700 }}>
            Registrations
          </span>
          <span className="text-[12px] uppercase" style={{ letterSpacing: "0.2em", color: "#6A6F7D" }}>
            {dailyMeta.month} — open
          </span>
        </div>

        <h1
          className="mt-5 leading-[0.82]"
          style={{
            fontFamily: display,
            fontSize: "clamp(58px, 15vw, 210px)",
            fontWeight: 800,
            letterSpacing: "-0.045em",
            fontStretch: "88%",
          }}
        >
          THREE
          <br />
          <span style={{ color: ORANGE }}>TEAMS</span> IN.
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-[44ch] text-[16px] leading-relaxed" style={{ color: "#3A3F4C" }}>
            Two of them still have no judge attached. One entry landed today — the first
            since the eighteenth.
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              [totals.needJudge, "need a judge", ORANGE, PAPER],
              [1, "shortlisted", NAVY, PAPER],
              [dailyMeta.today, "today", INK, PAPER],
            ].map(([n, label, bg, fg]) => (
              <div key={label} style={{ background: bg, color: fg }} className="px-6 py-5">
                <div
                  className="tnum leading-none"
                  style={{ fontFamily: display, fontSize: 52, fontWeight: 800, letterSpacing: "-0.04em" }}
                >
                  {n}
                </div>
                <div className="mt-2 text-[11px] uppercase" style={{ letterSpacing: "0.16em", opacity: 0.85 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- week strip, full bleed ---- */}
      <section style={{ background: NAVY, color: PAPER }} className="px-5 py-7 lg:px-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="text-[11px] uppercase" style={{ letterSpacing: "0.2em", opacity: 0.6 }}>
            16 — 22 September
          </span>
          <span className="text-[11px] uppercase" style={{ letterSpacing: "0.2em", color: ORANGE }}>
            +1 vs yesterday
          </span>
        </div>
        <div className="mt-5 flex items-end gap-2" style={{ height: 96 }}>
          {daily.map((d) => (
            <div key={d.day} className="flex flex-1 flex-col items-center gap-2.5">
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full"
                  style={{
                    height: d.count ? "100%" : 3,
                    background: d.today ? ORANGE : d.count ? PAPER : "rgba(242,240,234,0.25)",
                  }}
                />
              </div>
              <span className="tnum text-[12px]" style={{ opacity: d.count ? 1 : 0.5 }}>
                {d.day}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ---- entries as poster listings ---- */}
      <section className="px-5 py-12 lg:px-8">
        <div className="flex items-baseline justify-between gap-4 pb-4" style={{ borderBottom: `2px solid ${INK}` }}>
          <h2 style={{ fontFamily: display, fontSize: 30, fontWeight: 700, letterSpacing: "-0.03em" }}>
            The line-up
          </h2>
          <span className="text-[11px] uppercase" style={{ letterSpacing: "0.18em", color: "#6A6F7D" }}>
            3 of 3
          </span>
        </div>

        {teams.map((t, i) => (
          <article
            key={t.name}
            className="group grid grid-cols-1 items-center gap-x-8 gap-y-3 py-7 lg:grid-cols-[auto_1.5fr_1fr_auto_auto]"
            style={{ borderBottom: `1px solid #CFCCC3` }}
          >
            <span
              className="tnum text-[15px]"
              style={{ fontFamily: display, color: "#A7A49B", fontWeight: 700 }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <h3
              style={{
                fontFamily: display,
                fontSize: "clamp(26px,4vw,40px)",
                fontWeight: 700,
                letterSpacing: "-0.035em",
                lineHeight: 1,
              }}
            >
              {t.name}
            </h3>

            <div className="text-[13.5px] leading-relaxed" style={{ color: "#3A3F4C" }}>
              {t.theme}
              <br />
              <span style={{ color: "#6A6F7D" }}>
                {t.leader} · {t.members} members · {t.submittedShort}
              </span>
            </div>

            <div>
              {t.judges.length ? (
                <span className="text-[12px]" style={{ color: NAVY, fontWeight: 600 }}>
                  {t.judges.join(", ")}
                </span>
              ) : (
                <span
                  className="inline-block px-3 py-1.5 text-[11px] uppercase"
                  style={{ letterSpacing: "0.14em", background: ORANGE, color: PAPER, fontWeight: 700 }}
                >
                  Assign judge
                </span>
              )}
            </div>

            <span
              className="inline-block px-3 py-1.5 text-[11px] uppercase lg:justify-self-end"
              style={{
                letterSpacing: "0.14em",
                fontWeight: 700,
                background: t.status === "Shortlisted" ? NAVY : "transparent",
                color: t.status === "Shortlisted" ? PAPER : INK,
                border: `2px solid ${t.status === "Shortlisted" ? NAVY : INK}`,
              }}
            >
              {t.status}
            </span>
          </article>
        ))}
      </section>

      {/* ---- breakdown ---- */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="px-5 py-10 lg:px-8" style={{ background: INK, color: PAPER }}>
          <h3 className="text-[11px] uppercase" style={{ letterSpacing: "0.2em", opacity: 0.6 }}>
            By theme
          </h3>
          <div className="mt-6 flex flex-col gap-4">
            {byTheme.map((t) => (
              <div key={t.label} className="flex items-baseline gap-4">
                <span
                  className="tnum w-8 text-[24px] leading-none"
                  style={{ fontFamily: display, fontWeight: 700, color: t.count ? ORANGE : "rgba(242,240,234,0.35)" }}
                >
                  {t.count}
                </span>
                <span className="text-[15px]" style={{ opacity: t.count ? 1 : 0.45 }}>
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 py-10 lg:px-8">
          <h3 className="text-[11px] uppercase" style={{ letterSpacing: "0.2em", color: "#6A6F7D" }}>
            By status
          </h3>
          <div className="mt-6 flex flex-col gap-4">
            {byStatus.map((s) => (
              <div key={s.key} className="flex items-baseline gap-4">
                <span
                  className="tnum w-8 text-[24px] leading-none"
                  style={{ fontFamily: display, fontWeight: 700, color: s.count ? NAVY : "#B6B3AA" }}
                >
                  {s.count}
                </span>
                <span className="text-[15px]" style={{ color: s.count ? INK : "#8E8B83" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer
        className="flex flex-wrap items-center gap-7 px-5 py-8 lg:px-8"
        style={{ borderTop: `2px solid ${INK}` }}
      >
        <span className="text-[11px] uppercase" style={{ letterSpacing: "0.18em", color: "#6A6F7D" }}>
          Presented by
        </span>
        <img src={LOGO.gadgeon} alt={LOGO_ALT.gadgeon} className="h-9 w-auto lg:h-12" />
        <img src={LOGO.fisat} alt={LOGO_ALT.fisat} className="h-9 w-auto lg:h-12" />
        <img src={LOGO.ieee} alt={LOGO_ALT.ieee} className="h-9 w-auto lg:h-12" />
      </footer>
    </div>
  );
}
