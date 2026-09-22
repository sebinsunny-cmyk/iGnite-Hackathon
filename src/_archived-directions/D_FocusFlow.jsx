import { useState } from "react";
import {
  account,
  teams,
  byTheme,
  byStatus,
  daily,
  dailyMeta,
  totals,
  filterLabels,
} from "../data/registrations";
import {
  GigniteMark,
  SponsorRibbon,
  StatusPill,
  JudgeChip,
  AddJudge,
  Avatar,
  RankBar,
  Icon,
} from "../components/ui";

export default function FocusFlow() {
  const [showFilters, setShowFilters] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  return (
    <div className="min-h-full bg-paper">
      <header className="sticky top-0 z-10 border-b border-line bg-paper/85 backdrop-blur">
        <div className="mx-auto flex max-w-[940px] items-center gap-4 px-6 py-4">
          <GigniteMark />
          <nav className="ml-3 hidden gap-5 sm:flex">
            {["Teams", "Export"].map((t, i) => (
              <button
                key={t}
                className={`text-[13.5px] transition ${
                  i === 0
                    ? "font-semibold text-ink"
                    : "text-ink-3 hover:text-ink-2"
                }`}
              >
                {t}
              </button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden items-center gap-2 text-[12px] text-ink-2 sm:inline-flex">
              <span className="h-[6px] w-[6px] rounded-full bg-shl" />
              Registration open
            </span>
            <Avatar initials={account.initials} size={28} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[940px] px-6 pb-20">
        {/* the one sentence that matters */}
        <section className="border-b border-line py-14">
          <p className="lbl">{dailyMeta.month}</p>
          <h1 className="mt-5 max-w-[19ch] text-[40px] font-extrabold leading-[1.08] tracking-[-0.014em] sm:text-[46px]">
            <span className="tnum">{totals.teams}</span> teams registered,{" "}
            <span className="text-orange">
              <span className="tnum">{totals.needJudge}</span> still need a judge.
            </span>
          </h1>
          <p className="mt-5 max-w-[56ch] text-[15px] leading-relaxed text-ink-2">
            One arrived today, up one on yesterday. Neural Nadi and team 1 are waiting to be
            assigned — everything else is handled.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-[13.5px] font-semibold text-white transition hover:bg-ink/90">
              Assign judges
              <Icon.arrow className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-[13.5px] font-medium text-ink-2 transition hover:border-ink-3/40">
              <Icon.download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </section>

        {/* rhythm, disclosed on request */}
        <section className="border-b border-line py-9">
          <div className="flex flex-wrap items-end gap-8">
            <div>
              <div className="lbl mb-4">Last seven days</div>
              <div className="flex items-end gap-2" style={{ height: 46 }}>
                {daily.map((d) => (
                  <div key={d.day} className="flex w-[30px] flex-col items-center gap-2">
                    <div className="flex w-full flex-1 items-end">
                      <div
                        className={`w-full rounded-[3px] ${
                          d.today ? "bg-orange" : d.count > 0 ? "bg-navy-2/60" : "bg-line"
                        }`}
                        style={{ height: d.count === 0 ? 3 : "100%" }}
                      />
                    </div>
                    <span className="lbl tnum">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-x-9 gap-y-4">
              {byStatus.map((s) => (
                <div key={s.key}>
                  <div
                    className={`tnum text-[22px] font-extrabold leading-none tracking-[-0.018em] ${
                      s.count ? "text-ink" : "text-ink-3"
                    }`}
                  >
                    {s.count}
                  </div>
                  <div className="lbl mt-2">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowBreakdown((v) => !v)}
            className="mt-7 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-navy-2 transition hover:underline"
          >
            {showBreakdown ? "Hide" : "Show"} breakdown by theme
            <Icon.chevron
              className={`h-3.5 w-3.5 transition ${showBreakdown ? "rotate-180" : ""}`}
            />
          </button>

          {showBreakdown && (
            <div className="mt-5 flex max-w-[460px] flex-col gap-3">
              {byTheme.map((t) => (
                <RankBar
                  key={t.label}
                  label={t.label}
                  count={t.count}
                  max={2}
                  tone={t.count === 2 ? "bg-navy" : "bg-orange"}
                />
              ))}
            </div>
          )}
        </section>

        {/* the teams */}
        <section className="py-9">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-[17px] font-bold tracking-[-0.011em]">All teams</h2>
            <span className="lbl">{totals.shown}</span>
            <div className="ml-auto flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-xl border border-line px-3 py-2">
                <Icon.search className="h-3.5 w-3.5 text-ink-3" />
                <input
                  placeholder={filterLabels.search}
                  className="w-[170px] bg-transparent text-[12.5px] outline-none placeholder:text-ink-3 sm:w-[200px]"
                />
              </div>
              <button
                onClick={() => setShowFilters((v) => !v)}
                className={`rounded-xl border px-3 py-2 text-[12.5px] font-medium transition ${
                  showFilters
                    ? "border-ink bg-ink text-white"
                    : "border-line text-ink-2 hover:border-ink-3/40"
                }`}
              >
                Filters
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 flex flex-wrap gap-2 rounded-xl bg-ground p-3">
              {[filterLabels.statuses, filterLabels.themes, filterLabels.districts].map((f) => (
                <button
                  key={f}
                  className="flex items-center gap-1.5 rounded-lg border border-line bg-paper px-3 py-1.5 text-[12.5px] text-ink-2 transition hover:border-ink-3/40"
                >
                  {f}
                  <Icon.chevron className="h-3 w-3 text-ink-3" />
                </button>
              ))}
            </div>
          )}

          <div className="mt-5 flex flex-col">
            {teams.map((t) => (
              <article
                key={t.name}
                className="group grid grid-cols-1 gap-y-4 border-t border-line py-6 last:border-b sm:grid-cols-[1fr_auto] sm:gap-x-8"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-[19px] font-bold tracking-[-0.014em]">{t.name}</h3>
                    <StatusPill status={t.status} />
                  </div>
                  <p className="mt-2 text-[13.5px] text-ink-2">{t.theme}</p>
                  <p className="mt-3 text-[12.5px] text-ink-3">
                    Led by <span className="font-medium text-ink-2">{t.leader}</span> ·{" "}
                    {t.members} members · submitted {t.submitted}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-2.5 sm:items-end">
                  <div className="lbl">Judges</div>
                  <div className="flex flex-wrap gap-1.5 sm:justify-end">
                    {t.judges.length ? (
                      t.judges.map((j) => <JudgeChip key={j} name={j} removable />)
                    ) : (
                      <AddJudge />
                    )}
                  </div>
                  <button className="mt-1 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-navy-2 opacity-0 transition group-hover:opacity-100 focus-visible:opacity-100">
                    Open team
                    <Icon.arrow className="h-3.5 w-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-7">
          <SponsorRibbon />
          <span className="lbl">gIGNITE 2026</span>
        </footer>
      </main>
    </div>
  );
}
