/**
 * Direction B — BROADSHEET
 *
 * Concept: a competition is a printed programme, not a dashboard. Entries are
 * set like a classified index under a masthead, with column rules, a dateline
 * and running heads. No cards anywhere — the page is held together by rules and
 * typographic hierarchy alone.
 *
 * Type: Instrument Serif at display sizes (a high-contrast face with real
 *       personality, italic for asides) over Archivo for everything functional.
 */
import { teams, byTheme, byStatus, daily, dailyMeta, totals } from "../data/registrations";
import { LOGO, LOGO_ALT } from "../assets";

const INK = "#14120E";
const PAPER = "#FFFDF8";
const RULE = "#14120E";
const HAIR = "#CFCABB";
const RED = "#B0210E";

const serif = "'Instrument Serif', Georgia, serif";
const sans = "'Archivo', system-ui, sans-serif";

export default function Broadsheet() {
  return (
    <div style={{ background: PAPER, color: INK, fontFamily: sans }}>
      {/* ---- masthead ---- */}
      <header className="px-5 pt-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
          <Rule label={`VOL. I · NO. 3 · ${dailyMeta.month.toUpperCase()}`} />
          <Rule label="FEDERAL INSTITUTE OF SCIENCE AND TECHNOLOGY" />
          <Rule label="ADMIN — DEEPAK SREERAJ" />
        </div>
        <div style={{ borderTop: `3px solid ${RULE}`, borderBottom: `1px solid ${RULE}` }}>
          <div className="flex flex-wrap items-end justify-between gap-6 py-5">
            <img src={LOGO.gignite} alt={LOGO_ALT.gignite} className="h-12 w-auto lg:h-20" />
            <p
              className="max-w-[34ch] text-[15px] italic leading-snug"
              style={{ fontFamily: serif, color: "#54514A" }}
            >
              The register of entries for the 2026 hackathon, kept by the organisers
              and revised as each team submits.
            </p>
          </div>
        </div>
        <nav className="flex flex-wrap gap-x-7 py-2.5" style={{ borderBottom: `1px solid ${RULE}` }}>
          {["The Register", "Staff", "Audit", "Export"].map((t, i) => (
            <button
              key={t}
              className="text-[12px] uppercase"
              style={{
                letterSpacing: "0.16em",
                fontWeight: i === 0 ? 700 : 400,
                color: i === 0 ? INK : "#7A756A",
                textDecoration: i === 0 ? "underline" : "none",
                textUnderlineOffset: 5,
              }}
            >
              {t}
            </button>
          ))}
        </nav>
      </header>

      <main className="px-5 lg:px-10">
        {/* ---- lede ---- */}
        <section className="grid grid-cols-1 gap-x-10 gap-y-7 py-9 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <h1
              className="text-[44px] leading-[0.92] lg:text-[76px]"
              style={{ fontFamily: serif, fontWeight: 400, letterSpacing: "-0.01em", maxWidth: "15ch" }}
            >
              Three teams have entered. Two await a judge.
            </h1>
            <p className="mt-6 max-w-[58ch] text-[15.5px] leading-relaxed" style={{ color: "#4A4740" }}>
              One entry arrived today, the first since the eighteenth. Registration remains
              open and no closing date has been set, so the register below is not final.
            </p>
          </div>

          <dl className="grid grid-cols-3 gap-x-6" style={{ borderLeft: `1px solid ${HAIR}`, paddingLeft: 28 }}>
            {[
              ["Entered", totals.teams],
              ["Shortlisted", 1],
              ["Unjudged", totals.needJudge],
            ].map(([k, v]) => (
              <div key={k}>
                <dd className="tnum text-[54px] leading-none" style={{ fontFamily: serif }}>
                  {v}
                </dd>
                <dt
                  className="mt-2 text-[10.5px] uppercase"
                  style={{ letterSpacing: "0.16em", color: "#7A756A" }}
                >
                  {k}
                </dt>
              </div>
            ))}
          </dl>
        </section>

        {/* ---- the register ---- */}
        <section style={{ borderTop: `3px solid ${RULE}` }}>
          <RunningHead left="The Register" right="3 of 3 entries shown" />

          {teams.map((t, i) => (
            <article
              key={t.name}
              className="grid grid-cols-1 gap-x-10 gap-y-3 py-7 lg:grid-cols-[3.5rem_1.6fr_1fr_auto]"
              style={{ borderBottom: `1px solid ${HAIR}` }}
            >
              <div className="tnum text-[26px] leading-none" style={{ fontFamily: serif, color: "#A9A396" }}>
                {String(i + 1).padStart(2, "0")}
              </div>

              <div>
                <h2 className="text-[30px] leading-none" style={{ fontFamily: serif }}>
                  {t.name}
                </h2>
                <p className="mt-2.5 text-[14px] italic" style={{ fontFamily: serif, color: "#54514A" }}>
                  {t.theme}
                </p>
              </div>

              <div className="text-[13.5px] leading-relaxed" style={{ color: "#4A4740" }}>
                Led by <strong style={{ fontWeight: 600 }}>{t.leader}</strong>, {t.members} members.
                <br />
                Entered {t.submitted}.
                <br />
                {t.judges.length ? (
                  <>Judged by {t.judges.join(" and ")}.</>
                ) : (
                  <span style={{ color: RED }}>No judge appointed.</span>
                )}
              </div>

              <div className="lg:text-right">
                <span
                  className="inline-block px-3 py-1 text-[10.5px] uppercase"
                  style={{
                    letterSpacing: "0.16em",
                    border: `1px solid ${INK}`,
                    background: t.status === "Shortlisted" ? INK : "transparent",
                    color: t.status === "Shortlisted" ? PAPER : INK,
                  }}
                >
                  {t.status}
                </span>
              </div>
            </article>
          ))}
        </section>

        {/* ---- tables ---- */}
        <section className="grid grid-cols-1 gap-x-12 py-10 lg:grid-cols-3">
          <div>
            <RunningHead left="By theme" />
            {byTheme.map((t) => (
              <Row key={t.label} k={t.label} v={t.count} />
            ))}
          </div>
          <div>
            <RunningHead left="By status" />
            {byStatus.map((s) => (
              <Row key={s.key} k={s.label} v={s.count} />
            ))}
          </div>
          <div>
            <RunningHead left="Entries by day" />
            <div className="flex items-end gap-2 pt-5" style={{ height: 110 }}>
              {daily.map((d) => (
                <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full flex-1 items-end">
                    <div
                      className="w-full"
                      style={{
                        height: d.count ? "100%" : 2,
                        background: d.today ? RED : d.count ? INK : HAIR,
                      }}
                    />
                  </div>
                  <span className="tnum text-[11px]" style={{ color: "#7A756A" }}>
                    {d.day}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[12.5px] italic" style={{ fontFamily: serif, color: "#7A756A" }}>
              Sixteenth to the twenty-second of September.
            </p>
          </div>
        </section>

        <footer
          className="flex flex-wrap items-center gap-7 py-8"
          style={{ borderTop: `3px solid ${RULE}` }}
        >
          <span className="text-[10.5px] uppercase" style={{ letterSpacing: "0.16em", color: "#7A756A" }}>
            Presented by
          </span>
          <img src={LOGO.gadgeon} alt={LOGO_ALT.gadgeon} className="h-9 w-auto lg:h-11" />
          <img src={LOGO.fisat} alt={LOGO_ALT.fisat} className="h-9 w-auto lg:h-11" />
          <img src={LOGO.ieee} alt={LOGO_ALT.ieee} className="h-9 w-auto lg:h-11" />
        </footer>
      </main>
    </div>
  );
}

function Rule({ label }) {
  return (
    <span className="text-[10px] uppercase" style={{ letterSpacing: "0.18em", color: "#7A756A" }}>
      {label}
    </span>
  );
}

function RunningHead({ left, right }) {
  return (
    <div
      className="flex items-baseline justify-between gap-4 py-2.5"
      style={{ borderBottom: `1px solid ${INK}` }}
    >
      <span className="text-[11px] uppercase" style={{ letterSpacing: "0.18em", fontWeight: 600 }}>
        {left}
      </span>
      {right && (
        <span className="text-[11px] uppercase" style={{ letterSpacing: "0.14em", color: "#7A756A" }}>
          {right}
        </span>
      )}
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div
      className="flex items-baseline justify-between gap-4 py-2.5"
      style={{ borderBottom: `1px solid ${HAIR}` }}
    >
      <span className="text-[14px]" style={{ color: v ? "#14120E" : "#9A9486" }}>
        {k}
      </span>
      <span className="tnum text-[18px]" style={{ fontFamily: "'Instrument Serif', serif", color: v ? "#14120E" : "#9A9486" }}>
        {v}
      </span>
    </div>
  );
}
