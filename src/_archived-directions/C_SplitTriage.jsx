import { useState } from "react";
import {
  account,
  teams,
  byStatus,
  totals,
  filterLabels,
  judgePool,
} from "../data/registrations";
import {
  GigniteMark,
  SponsorRibbon,
  StatusPill,
  StatusDot,
  JudgeChip,
  Avatar,
  Icon,
} from "../components/ui";

export default function SplitTriage() {
  const [sel, setSel] = useState(2); // "test 1"
  const team = teams[sel];

  return (
    <div className="flex min-h-full flex-col bg-paper">
      {/* slim header */}
      <header className="flex flex-wrap items-center gap-4 border-b border-line px-5 py-3">
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
          <span className="hidden items-center gap-2 rounded-full border border-line px-2.5 py-1 text-[11px] text-ink-2 sm:inline-flex">
            <span className="h-[6px] w-[6px] rounded-full bg-shl" />
            Registration open
          </span>
          <Avatar initials={account.initials} size={28} />
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* list */}
        <aside className="flex w-[286px] shrink-0 flex-col border-r border-line bg-ground">
          <div className="border-b border-line px-4 py-3">
            <div className="flex items-baseline gap-2">
              <h2 className="text-[15px] font-bold tracking-[-0.011em]">Registrations</h2>
              <span className="lbl ml-auto">{totals.shown}</span>
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-lg border border-line bg-paper px-2.5 py-1.5">
              <Icon.search className="h-3.5 w-3.5 text-ink-3" />
              <input
                placeholder={filterLabels.search}
                className="w-full bg-transparent text-[12px] outline-none placeholder:text-ink-3"
              />
            </div>
            <div className="mt-2 flex gap-1.5">
              {byStatus.map((s) => (
                <button
                  key={s.key}
                  className={`flex-1 rounded-md border px-1.5 py-1 text-center transition ${
                    s.count > 0
                      ? "border-line bg-paper hover:border-ink-3/40"
                      : "border-transparent bg-sunk/60"
                  }`}
                  title={s.label}
                >
                  <div className={`tnum text-[13px] font-bold ${s.count ? "text-ink" : "text-ink-3"}`}>
                    {s.count}
                  </div>
                  <div className="lbl mt-0.5 truncate text-[8.5px]">{s.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            {teams.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setSel(i)}
                className={`w-full border-b border-line-2 px-4 py-3 text-left transition ${
                  i === sel ? "bg-paper shadow-[inset_2px_0_0_var(--color-navy-2)]" : "hover:bg-paper/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="truncate text-[13px] font-semibold">{t.name}</span>
                  <span className="lbl ml-auto shrink-0">{t.submittedShort}</span>
                </div>
                <div className="mt-1 truncate text-[11.5px] text-ink-2">{t.theme}</div>
                <div className="mt-2 flex items-center gap-2">
                  <StatusDot status={t.status} />
                  <span className="lbl">{t.status}</span>
                  {t.judges.length === 0 && (
                    <span className="lbl ml-auto text-orange">No judge</span>
                  )}
                </div>
              </button>
            ))}
            <div className="px-4 py-5 text-center text-[11.5px] leading-relaxed text-ink-3">
              End of list · {totals.teams} teams
            </div>
          </div>
        </aside>

        {/* detail */}
        <section className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-start gap-4 border-b border-line px-6 py-4">
            <div className="min-w-0">
              <h1 className="text-[22px] font-extrabold tracking-[-0.018em]">{team.name}</h1>
              <p className="mt-1.5 text-[13px] text-ink-2">
                {team.leader} · {team.members} members · {team.theme}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <StatusPill status={team.status} size="md" />
              <button className="rounded-lg border border-line px-3 py-1.5 text-[12.5px] font-medium text-ink-2 transition hover:border-ink-3/40">
                Message team
              </button>
            </div>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-8 overflow-y-auto px-6 py-6 lg:grid-cols-[1fr_286px]">
            <div className="flex flex-col gap-7">
              <Block label="Stage 1 deck">
                <div className="flex items-center gap-3 rounded-xl border border-line bg-ground p-3.5">
                  <div className="grid h-[44px] w-[36px] shrink-0 place-items-center rounded-md border border-line bg-paper">
                    <Icon.doc className="h-4 w-4 text-rej" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-[13px] font-semibold">Stage 1 deck (PDF)</div>
                    <div className="lbl mt-1">Signed link · expires in 60 minutes</div>
                  </div>
                  <button className="ml-auto shrink-0 rounded-lg border border-line bg-paper px-3 py-1.5 text-[12px] font-medium transition hover:border-ink-3/40">
                    Preview
                  </button>
                </div>
              </Block>

              <Block label="Team">
                <div className="grid gap-2 sm:grid-cols-2">
                  <Member name={team.leader} role="Team leader" />
                  <Member name="Member 2" role="Member" muted />
                </div>
              </Block>

              <Block label="Stage 1 submission">
                <div className="flex flex-col gap-4">
                  {[
                    "Problem statement",
                    "Proposed solution",
                    "AI approach / technology",
                    "Expected impact",
                  ].map((h) => (
                    <div key={h}>
                      <div className="text-[12.5px] font-semibold">{h}</div>
                      <div className="mt-1.5 h-[3px] w-full rounded-full bg-sunk" />
                      <div className="mt-1.5 h-[3px] w-[82%] rounded-full bg-sunk" />
                      <div className="mt-1.5 h-[3px] w-[54%] rounded-full bg-sunk" />
                    </div>
                  ))}
                  <p className="text-[11.5px] text-ink-3">
                    Full answers render here — no navigation away from the list.
                  </p>
                </div>
              </Block>
            </div>

            {/* right rail */}
            <aside className="flex flex-col gap-6">
              <Block label="Registration status">
                <div className="flex flex-col gap-1">
                  {byStatus.map((s) => (
                    <button
                      key={s.key}
                      className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[12.5px] transition ${
                        s.label === team.status
                          ? "bg-navy-soft font-semibold text-ink"
                          : "text-ink-2 hover:bg-ground"
                      }`}
                    >
                      <StatusDot status={s.label} />
                      {s.label}
                      {s.label === team.status && (
                        <Icon.check className="ml-auto h-3.5 w-3.5 text-navy-2" />
                      )}
                    </button>
                  ))}
                </div>
              </Block>

              <Block label="Assigned judges">
                <div className="flex flex-wrap gap-1.5">
                  {team.judges.map((j) => (
                    <JudgeChip key={j} name={j} removable />
                  ))}
                </div>
                <div className="mt-3 flex flex-col gap-1">
                  {judgePool
                    .filter((j) => !team.judges.includes(j))
                    .map((j) => (
                      <button
                        key={j}
                        className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[12.5px] text-ink-2 transition hover:bg-ground"
                      >
                        <span className="text-ink-3">+</span>
                        {j}
                      </button>
                    ))}
                  {judgePool.filter((j) => !team.judges.includes(j)).length === 0 && (
                    <p className="text-[11.5px] text-ink-3">All judges assigned.</p>
                  )}
                </div>
              </Block>

              <Block label="Record">
                <dl className="flex flex-col gap-2 text-[12.5px]">
                  <Row k="Submitted" v={team.submitted} />
                  <Row k="Members" v={`${team.members}`} />
                  <Row k="Deck" v="Uploaded" />
                  <Row k="Declarations" v="3 of 3 accepted" />
                </dl>
              </Block>
            </aside>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-line px-6 py-3">
            <SponsorRibbon compact />
            <span className="lbl ml-auto">J / K to move between teams</span>
          </div>
        </section>
      </div>
    </div>
  );
}

function Block({ label, children }) {
  return (
    <div>
      <div className="lbl mb-3">{label}</div>
      {children}
    </div>
  );
}

function Member({ name, role, muted = false }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-line px-3 py-2.5">
      <span
        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full font-mono text-[10px] font-semibold ${
          muted ? "bg-sunk text-ink-3" : "bg-navy-soft text-navy"
        }`}
      >
        {name.slice(0, 1).toUpperCase()}
      </span>
      <div className="min-w-0">
        <div className={`truncate text-[12.5px] font-semibold ${muted ? "text-ink-3" : ""}`}>{name}</div>
        <div className="lbl mt-0.5">{role}</div>
      </div>
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-line-2 pb-2 last:border-0">
      <dt className="text-ink-3">{k}</dt>
      <dd className="text-right font-medium">{v}</dd>
    </div>
  );
}
