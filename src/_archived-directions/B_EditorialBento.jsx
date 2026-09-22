import {
  account,
  teams,
  byTheme,
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
  DailyBars,
  RankBar,
  Icon,
} from "../components/ui";

const tabs = ["Teams", "Judging", "Settings", "Export"];

export default function EditorialBento() {
  return (
    <div className="min-h-full bg-ground">
      {/* top nav */}
      <header className="border-b border-line bg-paper/70 backdrop-blur">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-4 px-6 py-3.5">
          <GigniteMark />
          <nav className="ml-4 flex gap-1">
            {tabs.map((t, i) => (
              <button
                key={t}
                className={`rounded-lg px-3 py-1.5 text-[13px] transition ${
                  i === 0
                    ? "bg-ink text-white font-semibold"
                    : "text-ink-2 hover:bg-sunk"
                }`}
              >
                {t}
              </button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <div className="text-right leading-tight">
              <div className="text-[12.5px] font-semibold">{account.name}</div>
              <div className="lbl">{account.role}</div>
            </div>
            <Avatar initials={account.initials} size={32} />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1240px] px-6 py-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-[30px] font-extrabold leading-none tracking-[-0.022em]">
              Registrations
            </h1>
            <p className="mt-2 text-[13.5px] text-ink-2">
              {dailyMeta.month} · window open · {totals.shown}
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-xl border border-line bg-paper px-3.5 py-2 text-[13px] font-medium text-ink-2 transition hover:border-ink-3/40">
            <Icon.download className="h-4 w-4" />
            Export CSV
          </button>
        </div>

        {/* bento */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
          {/* hero */}
          <div className="rounded-2xl border border-line bg-paper p-6 md:col-span-3">
            <div className="lbl">Registered · {dailyMeta.month}</div>
            <div className="mt-4 flex items-end gap-4">
              <span className="tnum text-[68px] font-extrabold leading-[0.82] tracking-[-0.028em]">
                {totals.teams}
              </span>
              <span className="pb-2 text-[13px] leading-snug text-ink-2">
                teams
                <br />
                registered
              </span>
            </div>
            <div className="mt-1 text-[13px] text-ink-2">
              <span className="font-semibold text-ink">{dailyMeta.today} today</span>{" "}
              <span className="text-shl">{dailyMeta.delta}</span>
            </div>
            <div className="mt-6">
              <DailyBars data={daily} max={1} height={62} />
            </div>
          </div>

          {/* theme ranks */}
          <div className="rounded-2xl border border-line bg-paper p-6 md:col-span-3 lg:col-span-2">
            <div className="lbl mb-4">By theme</div>
            <div className="flex flex-col gap-3">
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
            <p className="mt-5 border-t border-line-2 pt-3 text-[11.5px] leading-relaxed text-ink-3">
              Three themes have no entries yet. Bars keep the zeros honest — a donut hides them.
            </p>
          </div>

          {/* action tile */}
          <div className="flex flex-col rounded-2xl bg-navy p-6 text-white md:col-span-6 lg:col-span-1">
            <div className="lbl text-white/55">Needs a judge</div>
            <div className="tnum mt-3 text-[54px] font-extrabold leading-[0.85] tracking-[-0.014em]">
              {totals.needJudge}
            </div>
            <p className="mt-3 text-[12.5px] leading-relaxed text-white/70">
              Neural Nadi and team 1 have no judge assigned.
            </p>
            <button className="mt-5 inline-flex items-center gap-1.5 self-start rounded-lg bg-white/12 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-white transition hover:bg-white/20">
              Assign now
              <Icon.arrow className="h-3 w-3" />
            </button>
          </div>

          {/* team list */}
          <div className="rounded-2xl border border-line bg-paper md:col-span-6">
            <div className="flex flex-wrap items-center gap-2 border-b border-line px-6 py-3.5">
              <div className="lbl">All teams</div>
              <div className="ml-auto flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 rounded-lg bg-sunk px-2.5 py-1.5">
                  <Icon.search className="h-3.5 w-3.5 text-ink-3" />
                  <input
                    placeholder={filterLabels.search}
                    className="w-[190px] bg-transparent text-[12.5px] outline-none placeholder:text-ink-3"
                  />
                </div>
                {[filterLabels.statuses, filterLabels.themes, filterLabels.districts].map((f) => (
                  <button
                    key={f}
                    className="flex items-center gap-1.5 rounded-lg bg-sunk px-2.5 py-1.5 text-[12.5px] text-ink-2 transition hover:bg-line-2"
                  >
                    {f}
                    <Icon.chevron className="h-3 w-3 text-ink-3" />
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-line-2">
              {teams.map((t) => (
                <div
                  key={t.name}
                  className="grid grid-cols-1 items-center gap-y-3 px-6 py-4 transition hover:bg-ground/60 md:grid-cols-[1.4fr_1.3fr_1fr_auto_auto] md:gap-x-6"
                >
                  <div>
                    <div className="text-[15px] font-bold tracking-[-0.008em]">{t.name}</div>
                    <div className="lbl mt-1">{t.members} members</div>
                  </div>
                  <div className="text-[13px] text-ink-2">{t.theme}</div>
                  <div className="text-[13px]">
                    {t.leader}
                    <div className="mt-1 font-mono text-[10.5px] text-ink-3">{t.submitted}</div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {t.judges.length ? (
                      t.judges.map((j) => <JudgeChip key={j} name={j} removable />)
                    ) : (
                      <AddJudge />
                    )}
                  </div>
                  <div className="md:justify-self-end">
                    <StatusPill status={t.status} size="md" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
          <SponsorRibbon />
          <span className="lbl">gIGNITE 2026 · FISAT</span>
        </footer>
      </div>
    </div>
  );
}
