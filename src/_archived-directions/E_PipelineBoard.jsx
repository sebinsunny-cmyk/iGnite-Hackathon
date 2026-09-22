import {
  account,
  teams,
  byStatus,
  daily,
  dailyMeta,
  totals,
  filterLabels,
} from "../data/registrations";
import {
  GigniteMark,
  SponsorRibbon,
  JudgeChip,
  AddJudge,
  Avatar,
  Icon,
} from "../components/ui";

const laneTone = {
  Submitted: { dot: "bg-sub", head: "text-sub" },
  "Under review": { dot: "bg-rev", head: "text-rev" },
  Shortlisted: { dot: "bg-shl", head: "text-shl" },
  Rejected: { dot: "bg-rej", head: "text-rej" },
};

const emptyCopy = {
  "Under review": {
    title: "Nothing in review",
    body: "Move a team here when a judge picks it up.",
  },
  Rejected: {
    title: "Nothing rejected",
    body: "Rejected teams stay visible here until the event closes.",
  },
};

export default function PipelineBoard() {
  return (
    <div className="flex min-h-full flex-col bg-ground">
      <header className="flex flex-wrap items-center gap-4 border-b border-line bg-paper px-6 py-3.5">
        <GigniteMark />
        <nav className="ml-2 flex gap-1">
          {["Teams", "Export"].map((t, i) => (
            <button
              key={t}
              className={`rounded-lg px-3 py-1.5 text-[13px] transition ${
                i === 0 ? "bg-sunk font-semibold text-ink" : "text-ink-2 hover:bg-sunk"
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
          <Avatar initials={account.initials} size={30} />
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-3 border-b border-line bg-paper px-6 py-3">
        <div>
          <h1 className="text-[19px] font-extrabold leading-none tracking-[-0.018em]">
            Registrations
          </h1>
          <p className="lbl mt-2">
            {totals.shown} · {dailyMeta.today} today {dailyMeta.delta}
          </p>
        </div>

        {/* the chart is the board, so this is all the chart you need */}
        <div className="ml-4 hidden items-end gap-[5px] lg:flex" style={{ height: 30 }}>
          {daily.map((d) => (
            <div key={d.day} className="flex w-[9px] items-end" style={{ height: "100%" }}>
              <div
                className={`w-full rounded-[2px] ${
                  d.today ? "bg-orange" : d.count > 0 ? "bg-navy-2/50" : "bg-line"
                }`}
                style={{ height: d.count === 0 ? 3 : "100%" }}
                title={`${d.day} Sept — ${d.count}`}
              />
            </div>
          ))}
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-line px-2.5 py-1.5">
            <Icon.search className="h-3.5 w-3.5 text-ink-3" />
            <input
              placeholder={filterLabels.search}
              className="w-[180px] bg-transparent text-[12.5px] outline-none placeholder:text-ink-3"
            />
          </div>
          {[filterLabels.themes, filterLabels.districts].map((f) => (
            <button
              key={f}
              className="flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-[12.5px] text-ink-2 transition hover:border-ink-3/40"
            >
              {f}
              <Icon.chevron className="h-3 w-3 text-ink-3" />
            </button>
          ))}
          <div className="flex overflow-hidden rounded-lg border border-line">
            <button className="flex items-center gap-1.5 bg-ink px-2.5 py-1.5 text-[12.5px] font-medium text-white">
              <Icon.board className="h-3.5 w-3.5" />
              Board
            </button>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-[12.5px] text-ink-2 transition hover:bg-sunk">
              <Icon.list className="h-3.5 w-3.5" />
              List
            </button>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-[12.5px] font-medium text-ink-2 transition hover:border-ink-3/40">
            <Icon.download className="h-3.5 w-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* lanes */}
      <div className="flex-1 overflow-x-auto px-6 py-5">
        <div className="grid min-w-[880px] grid-cols-4 gap-4">
          {byStatus.map((lane) => {
            const inLane = teams.filter((t) => t.status === lane.label);
            const tone = laneTone[lane.label];
            return (
              <section key={lane.key} className="flex flex-col rounded-2xl bg-sunk/70 p-3">
                <div className="flex items-center gap-2 px-1.5 pb-3">
                  <span className={`h-[7px] w-[7px] rounded-full ${tone.dot}`} />
                  <h2 className="lbl !text-ink-2">{lane.label}</h2>
                  <span className="tnum ml-auto rounded-full bg-paper px-2 py-0.5 font-mono text-[10px] text-ink-2">
                    {lane.count}
                  </span>
                </div>

                <div className="flex min-h-[260px] flex-col gap-2.5">
                  {inLane.map((t) => (
                    <article
                      key={t.name}
                      className="cursor-grab rounded-xl border border-line bg-paper p-3.5 transition hover:shadow-[0_2px_10px_rgba(20,24,31,0.06)]"
                    >
                      <h3 className="text-[14px] font-bold tracking-[-0.008em]">{t.name}</h3>
                      <p className="mt-1 text-[12px] text-ink-2">{t.theme}</p>
                      <p className="mt-2.5 text-[11.5px] text-ink-3">
                        {t.leader} · {t.members} members · {t.submittedShort}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5 border-t border-line-2 pt-3">
                        {t.judges.length ? (
                          t.judges.map((j) => <JudgeChip key={j} name={j} />)
                        ) : (
                          <AddJudge full />
                        )}
                      </div>
                    </article>
                  ))}

                  {inLane.length === 0 && emptyCopy[lane.label] && (
                    <div className="rounded-xl border border-dashed border-line px-4 py-7 text-center">
                      <div className="text-[12.5px] font-semibold text-ink-2">
                        {emptyCopy[lane.label].title}
                      </div>
                      <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-3">
                        {emptyCopy[lane.label].body}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <footer className="flex flex-wrap items-center gap-4 border-t border-line bg-paper px-6 py-3">
        <SponsorRibbon compact />
        <span className="lbl ml-auto">Drag a card to change status · or press S on a selected card</span>
      </footer>
    </div>
  );
}
