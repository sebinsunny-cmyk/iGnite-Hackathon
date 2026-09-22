import { Link } from "react-router-dom";
import {
  teams,
  byTheme,
  byStatus,
  daily,
  dailyMeta,
  totals,
  filterLabels,
  registrationWindow,
} from "../data/registrations";
import {
  StatusPill,
  JudgeChip,
  AddJudge,
  DailyBars,
  RankBar,
  Icon,
} from "../components/ui";
import AppShell from "../components/AppShell";
import { useRole } from "../state/role";

export default function Dashboard() {
  const { role } = useRole();
  const isJudge = role === "Judge";
  const list = isJudge ? teams.filter((t) => t.judges.includes("Barry Allen")) : teams;

  return (
    <AppShell>
      <div className="flex flex-wrap items-end justify-between gap-5 pb-7">
        <div>
          <h1 className="text-[27px] sm:text-[34px] font-extrabold leading-none tracking-[-0.022em]">
            {isJudge ? "Your submissions" : "Registrations"}
          </h1>
          <p className="mt-2.5 text-[14px] text-ink-2">
            {isJudge
              ? `${list.length} team${list.length === 1 ? "" : "s"} assigned to you · editable until the round closes`
              : `${dailyMeta.month} · registration ${registrationWindow.status.toLowerCase()} · ${totals.shown}`}
          </p>
        </div>

        {!isJudge && (
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
            <Link
              to="/dashboard/settings"
              className="flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-paper px-3.5 text-[13.5px] font-medium text-ink-2 transition hover:border-ink-3/40 sm:flex-none"
            >
              <Icon.settings className="h-4 w-4" />
              <span className="sm:hidden">Window</span>
              <span className="hidden sm:inline">Registration window</span>
            </Link>
            <button className="flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-paper px-3.5 text-[13.5px] font-medium text-ink-2 transition hover:border-ink-3/40 sm:flex-none">
              <Icon.download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        )}
      </div>

      {isJudge ? (
        <JudgeList list={list} />
      ) : (
        <>
          {/* ---------- bento ---------- */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-6 xl:grid-cols-12">
            {/* hero */}
            <section className="rounded-2xl border border-line bg-paper p-5 sm:p-7 md:col-span-6 xl:col-span-5">
              <div className="lbl">Registered · {dailyMeta.month}</div>
              <div className="mt-5 flex items-end gap-5">
                <span className="tnum text-[60px] sm:text-[86px] font-extrabold leading-[0.8] tracking-[-0.018em]">
                  {totals.teams}
                </span>
                <div className="pb-2.5">
                  <div className="text-[15px] font-semibold leading-tight">teams registered</div>
                  <div className="mt-1.5 text-[13.5px] text-ink-2">
                    <span className="font-semibold text-ink">{dailyMeta.today} today</span>{" "}
                    <span className="text-shl">{dailyMeta.delta}</span>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <DailyBars data={daily} max={1} height={76} />
              </div>
            </section>

            {/* themes */}
            <section className="rounded-2xl border border-line bg-paper p-5 sm:p-7 md:col-span-6 xl:col-span-4">
              <div className="lbl mb-5">By theme</div>
              <div className="flex flex-col gap-3.5">
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
              <p className="mt-6 border-t border-line-2 pt-4 text-[12px] leading-relaxed text-ink-3">
                Three themes have no entries yet — bars keep the zeros visible where a donut would
                hide them.
              </p>
            </section>

            {/* action */}
            <section className="flex flex-col rounded-2xl bg-navy p-5 text-white sm:p-7 md:col-span-3 xl:col-span-3">
              <div className="lbl !text-white/55">Needs a judge</div>
              <div className="tnum mt-4 text-[54px] sm:mt-5 sm:text-[76px] font-extrabold leading-[0.8] tracking-[-0.018em]">
                {totals.needJudge}
              </div>
              <p className="mt-4 text-[13.5px] leading-relaxed text-white/75">
                Neural Nadi and team 1 have no judge assigned yet.
              </p>
              <button className="mt-auto inline-flex items-center gap-2 self-start rounded-xl bg-white/15 px-4 py-2.5 text-[13px] font-semibold transition hover:bg-white/25">
                Assign judges
                <Icon.arrow className="h-4 w-4" />
              </button>
            </section>

            {/* status strip */}
            <section className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:col-span-3 xl:col-span-12 xl:grid-cols-4">
              {byStatus.map((s) => (
                <div key={s.key} className="bg-paper px-5 py-4 sm:px-7 sm:py-5">
                  <div
                    className={`tnum text-[30px] font-extrabold leading-none tracking-[-0.022em] ${
                      s.count ? "text-ink" : "text-ink-3"
                    }`}
                  >
                    {s.count}
                  </div>
                  <div className="lbl mt-2.5">{s.label}</div>
                </div>
              ))}
            </section>
          </div>

          {/* ---------- teams ---------- */}
          <section className="mt-4 rounded-2xl border border-line bg-paper">
            <div className="flex flex-col gap-3 border-b border-line px-5 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:px-7">
              <h2 className="text-[16px] font-bold tracking-[-0.011em]">All teams</h2>
              <span className="lbl">{totals.shown}</span>
              <div className="flex w-full flex-wrap items-center gap-2 sm:ml-auto sm:w-auto">
                <div className="flex min-h-[44px] w-full items-center gap-2 rounded-lg bg-sunk px-3 sm:w-auto">
                  <Icon.search className="h-4 w-4 text-ink-3" />
                  <input
                    placeholder={filterLabels.search}
                    className="w-full min-w-0 bg-transparent text-[13px] outline-none placeholder:text-ink-3 sm:w-[200px]"
                  />
                </div>
                {[filterLabels.statuses, filterLabels.themes, filterLabels.districts].map((f) => (
                  <button
                    key={f}
                    className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-sunk px-3 text-[13px] text-ink-2 transition hover:bg-line-2 sm:flex-none sm:justify-start"
                  >
                    {f}
                    <Icon.chevron className="h-3.5 w-3.5 text-ink-3" />
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-line-2">
              {teams.map((t) => (
                <div
                  key={t.name}
                  className="grid grid-cols-1 items-center gap-y-3 px-5 py-5 transition hover:bg-ground/50 sm:px-7 md:grid-cols-[1.3fr_1.2fr_1fr_auto_auto_auto] md:gap-x-7"
                >
                  <div>
                    <Link
                      to={`/dashboard/teams/${encodeURIComponent(t.name)}`}
                      className="inline-flex min-h-[32px] items-center text-[18px] font-bold tracking-[-0.011em] hover:text-navy sm:text-[17px]"
                    >
                      {t.name}
                    </Link>
                    <div className="lbl mt-1.5">{t.members} members</div>
                  </div>
                  <div className="text-[13.5px] text-ink-2">{t.theme}</div>
                  <div className="text-[13.5px]">
                    {t.leader}
                    <div className="mt-1 font-mono text-[11px] text-ink-3">{t.submitted}</div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {t.judges.length ? (
                      t.judges.map((j) => <JudgeChip key={j} name={j} removable />)
                    ) : (
                      <AddJudge />
                    )}
                  </div>
                  <StatusPill status={t.status} size="md" />
                  <Link
                    to={`/dashboard/teams/${encodeURIComponent(t.name)}`}
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-medium text-navy transition hover:gap-2.5 md:justify-self-end"
                  >
                    Open
                    <Icon.arrow className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </AppShell>
  );
}

function JudgeList({ list }) {
  if (list.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-paper px-8 py-20 text-center">
        <h2 className="text-[19px] font-bold">Nothing assigned yet</h2>
        <p className="mx-auto mt-2.5 max-w-[46ch] text-[14px] leading-relaxed text-ink-2">
          An organiser will assign submissions to you before the round opens. You will see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
      {list.map((t) => (
        <Link
          key={t.name}
          to={`/dashboard/teams/${encodeURIComponent(t.name)}`}
          className="flex flex-col rounded-2xl border border-line bg-paper p-5 transition hover:border-navy/40 sm:p-7"
        >
          <div className="flex items-start gap-3">
            <h3 className="text-[20px] font-bold tracking-[-0.014em]">{t.name}</h3>
            <span className="ml-auto">
              <StatusPill status={t.status} />
            </span>
          </div>
          <p className="mt-2 text-[13.5px] text-ink-2">{t.theme}</p>
          <p className="mt-5 text-[13px] text-ink-3">
            {t.leader} · {t.members} members
          </p>
          <div className="mt-6 flex items-center gap-2 border-t border-line-2 pt-5">
            <span className="rounded-full bg-sunk px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-2">
              Not scored
            </span>
            <span className="ml-auto flex items-center gap-1.5 text-[13px] font-semibold text-navy">
              Score it
              <Icon.arrow className="h-4 w-4" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
