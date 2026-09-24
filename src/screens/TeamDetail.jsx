import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import { teams, byStatus, judgePool } from "../data/registrations";
import { scoringCriteria, ideaFields, uploadRules, trackBy } from "../data/content";
import { StatusPill, StatusDot, JudgeChip, TrackChip, Icon } from "../components/ui";
import { useRole } from "../state/role";

export default function TeamDetail() {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const { role } = useRole();
  const team = teams.find((t) => t.name === decodeURIComponent(teamId ?? "")) ?? teams[0];

  const isJudge = role === "Judge";
  const isAdmin = role === "Admin" || role === "Super Admin";
  const [scores, setScores] = useState({});
  const scored = Object.keys(scores).length;

  return (
    <AppShell>
      {/* breadcrumb + title */}
      <nav className="flex items-center gap-2 text-[13px] text-ink-3">
        <Link to="/dashboard" className="hover:text-ink-2">
          Registrations
        </Link>
        <span>/</span>
        <span className="font-medium text-ink-2">{team.name}</span>
      </nav>

      <header className="mt-5 flex flex-wrap items-start gap-6 pb-8">
        <div className="min-w-0">
          <h1 className="text-[clamp(30px,3.6vw,44px)] font-extrabold tracking-[-0.014em]">
            {team.name}
          </h1>
          <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[14.5px] text-ink-2">
            <TrackChip track={trackBy(team.theme)} showIcon />
            <span className="text-line">·</span>
            <span>{team.members} members</span>
            <span className="text-line">·</span>
            <span>led by {team.leader}</span>
          </p>
          <p className="mt-2 font-mono text-[12px] text-ink-3">Submitted {team.submitted}</p>
        </div>

        <div className="flex w-full flex-wrap items-center gap-2.5 sm:w-auto sm:ml-auto">
          <StatusPill status={team.status} size="md" />
          <button className="min-h-[44px] flex-1 rounded-[11px] border-[0.8px] border-line bg-paper px-4 text-[13.5px] font-medium text-ink-2 transition hover:border-line-2 sm:flex-none">
            Message team
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="min-h-[44px] flex-1 rounded-[11px] border-[0.8px] border-line bg-paper px-4 text-[13.5px] font-medium text-ink-2 transition hover:border-line-2 sm:flex-none"
          >
            <span className="sm:hidden">Next &rarr;</span>
            <span className="hidden sm:inline">Next submission &rarr;</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* ---- main column ---- */}
        <div className="flex flex-col gap-4">
          {/* deck */}
          <section className="rounded-[16px] border-[0.8px] border-line bg-paper p-5 sm:p-7">
            <div className="flex flex-wrap items-center gap-4">
              <span className="lbl">Stage 1 deck</span>
              <button className="ml-auto min-h-[44px] rounded-[10px] border-[0.8px] border-line px-3.5 text-[13px] font-medium text-ink-2 transition hover:border-line-2">
                Download
              </button>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-5 rounded-[11px] border-[0.8px] border-line bg-ground p-5">
              <span className="grid h-16 w-13 shrink-0 place-items-center rounded-[10px] border-[0.8px] border-line bg-paper px-4">
                <Icon.doc className="h-6 w-6 text-rej" />
              </span>
              <div className="min-w-0">
                <p className="text-[15px] font-semibold">Stage 1 deck</p>
                <p className="mt-1 text-[12.5px] text-ink-3">
                  {uploadRules.deck.split("·")[0].trim()} · signed link, expires in 60 minutes
                </p>
              </div>
              <div className="ml-auto h-24 w-40 shrink-0 rounded-[10px] border-[0.8px] border-line bg-paper p-3">
                <div className="h-2 w-2/3 rounded-full bg-sunk" />
                <div className="mt-2 h-1.5 w-full rounded-full bg-line-2" />
                <div className="mt-1.5 h-1.5 w-5/6 rounded-full bg-line-2" />
                <div className="mt-3 h-8 w-full rounded bg-sunk" />
              </div>
            </div>
          </section>

          {/* judge scoring */}
          {isJudge && (
            <section className="rounded-[16px] border-[1.5px] border-primary bg-paper p-5 sm:p-7">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-[19px] font-bold tracking-[-0.014em]">Your evaluation</h2>
                <span className="lbl">{scored} of 5 scored</span>
                <span className="ml-auto rounded-full bg-rev-soft px-3 py-1 font-mono text-[10px] uppercase tracking-[0.07em] text-rev">
                  Editable until the round closes
                </span>
              </div>

              <div className="mt-7 flex flex-col gap-6">
                {scoringCriteria.map((c) => (
                  <div key={c.key}>
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className="text-[14.5px] font-semibold">{c.label}</span>
                      <span className="text-[12.5px] text-ink-3">{c.help}</span>
                      <span className="tnum ml-auto font-mono text-[12px] text-ink-3">
                        {scores[c.key] ? `${scores[c.key]} / 10` : "not scored"}
                      </span>
                    </div>
                    <div className="mt-2.5 grid grid-cols-5 gap-1.5 sm:grid-cols-10">
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                        <button
                          key={n}
                          onClick={() => setScores({ ...scores, [c.key]: n })}
                          className={`tnum h-11 rounded-[10px] border text-[13px] font-semibold transition sm:h-10 ${
                            scores[c.key] === n
                              ? "border-viz-purple bg-primary text-white"
                              : "border-line bg-paper text-ink-3 hover:border-primary/50 hover:text-sub"
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <label htmlFor="judge-comments" className="lbl">
                    Comments
                  </label>
                  <textarea
                    id="judge-comments"
                    rows={3}
                    placeholder="Visible to organisers, not to the team."
                    className="resize-y rounded-[11px] border-[0.8px] border-line px-4 py-3 text-[14.5px] leading-relaxed outline-none transition placeholder:text-ink-3 focus:border-primary"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 border-t-[0.8px] border-line pt-5">
                  <button className="rounded-full bg-primary px-6 py-3 text-[14.5px] font-bold text-white transition hover:bg-primary-600">
                    Save score
                  </button>
                  <button className="rounded-[11px] border-[0.8px] border-line px-5 py-3 text-[14.5px] font-medium text-ink-2 transition hover:border-line-2">
                    Next submission →
                  </button>
                  <span className="lbl ml-auto">Press 1–10 to score the focused criterion</span>
                </div>
              </div>
            </section>
          )}

          {/* members */}
          <section className="rounded-[16px] border-[0.8px] border-line bg-paper p-5 sm:p-7">
            <span className="lbl">Team</span>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-3">
              <MemberCard name={team.leader} role="Team leader" />
              {Array.from({ length: team.members - 1 }, (_, i) => (
                <MemberCard key={i} name={`Member ${i + 2}`} role="Member" muted />
              ))}
            </div>
          </section>

          {/* submission */}
          <section className="rounded-[16px] border-[0.8px] border-line bg-paper p-5 sm:p-7">
            <span className="lbl">Stage 1 submission</span>
            <div className="mt-6 grid grid-cols-1 gap-8 2xl:grid-cols-2">
              {ideaFields.map((f) => (
                <div key={f.key}>
                  <h3 className="text-[14.5px] font-bold">{f.label}</h3>
                  <div className="mt-3 flex flex-col gap-2">
                    <span className="h-2 w-full rounded-full bg-sunk" />
                    <span className="h-2 w-[88%] rounded-full bg-sunk" />
                    <span className="h-2 w-[62%] rounded-full bg-sunk" />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 border-t-[0.8px] border-line-2 pt-4 text-[12.5px] text-ink-3">
              The team's full written answers render here.
            </p>
          </section>

          {/* ID cards — admin only */}
          {isAdmin && (
            <section className="rounded-[16px] border-[0.8px] border-line bg-paper p-5 sm:p-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="lbl">ID cards</span>
                <span className="rounded-full bg-rev-soft px-3 py-1 font-mono text-[10px] uppercase tracking-[0.07em] text-rev">
                  Organisers only
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                {Array.from({ length: team.members }, (_, i) => (
                  <div
                    key={i}
                    className="flex h-24 w-36 flex-col justify-end rounded-[10px] border-[0.8px] border-line bg-ground p-3"
                  >
                    <span className="lbl">Member {i + 1}</span>
                    <span className="mt-1 text-[12px] font-medium text-sub">View</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ---- right rail ---- */}
        <aside className="flex flex-col gap-4">
          {isAdmin && (
            <>
              <section className="rounded-[16px] border-[0.8px] border-line bg-paper p-5 sm:p-6">
                <span className="lbl">Registration status</span>
                <div className="mt-4 flex flex-col gap-1">
                  {byStatus.map((s) => (
                    <button
                      key={s.key}
                      className={`flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-[14px] transition ${
                        s.label === team.status
                          ? "bg-sub-soft font-semibold"
                          : "text-ink-2 hover:bg-ground"
                      }`}
                    >
                      <StatusDot status={s.label} />
                      {s.label}
                      {s.label === team.status && (
                        <Icon.check className="ml-auto h-4 w-4 text-sub" />
                      )}
                    </button>
                  ))}
                </div>
              </section>

              <section className="rounded-[16px] border-[0.8px] border-line bg-paper p-5 sm:p-6">
                <span className="lbl">Assigned judges</span>
                {team.judges.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {team.judges.map((j) => (
                      <JudgeChip key={j} name={j} removable />
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-[13.5px] text-ink-3">No judge assigned yet.</p>
                )}
                <div className="mt-4 flex flex-col gap-1 border-t-[0.8px] border-line-2 pt-4">
                  {judgePool
                    .filter((j) => !team.judges.includes(j))
                    .map((j) => (
                      <button
                        key={j}
                        className="flex items-center gap-2.5 rounded-[10px] px-3 py-2 text-left text-[14px] text-ink-2 transition hover:bg-ground"
                      >
                        <span className="text-ink-3">+</span>
                        {j}
                      </button>
                    ))}
                  {judgePool.filter((j) => !team.judges.includes(j)).length === 0 && (
                    <p className="text-[13px] text-ink-3">Every judge is assigned.</p>
                  )}
                </div>
              </section>
            </>
          )}

          <section className="rounded-[16px] border-[0.8px] border-line bg-paper p-5 sm:p-6">
            <span className="lbl">Judge scores</span>
            <div className="mt-4 flex flex-col gap-3">
              {scoringCriteria.map((c) => (
                <div key={c.key} className="flex items-baseline gap-3 text-[13.5px]">
                  <span className="text-ink-2">{c.label}</span>
                  <span className="tnum ml-auto font-mono text-[12px] text-ink-3">—</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-baseline gap-3 border-t-[0.8px] border-line pt-4">
              <span className="text-[13.5px] font-semibold">Weighted average</span>
              <span className="tnum ml-auto font-mono text-[15px] font-semibold text-ink-3">—</span>
            </div>
            <p className="mt-3 text-[12px] leading-relaxed text-ink-3">
              No scores submitted yet for this team.
            </p>
          </section>

          <section className="rounded-[16px] border-[0.8px] border-line bg-paper p-5 sm:p-6">
            <span className="lbl">Record</span>
            <dl className="mt-4 flex flex-col gap-3 text-[13.5px]">
              <Rec k="Members" v={`${team.members}`} />
              <Rec k="Deck" v="Uploaded" />
              <Rec k="Declarations" v="3 of 3 accepted" />
              <Rec k="Media consent" v="Not given" />
            </dl>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}

function MemberCard({ name, role, muted = false }) {
  return (
    <div className="flex items-center gap-3.5 rounded-[11px] border-[0.8px] border-line px-4 py-3.5">
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full font-mono text-[12px] font-semibold ${
          muted ? "bg-sunk text-ink-3" : "bg-sub-soft text-sub"
        }`}
      >
        {name.slice(0, 1).toUpperCase()}
      </span>
      <div className="min-w-0">
        <p className={`truncate text-[14px] font-semibold ${muted ? "text-ink-3" : ""}`}>{name}</p>
        <p className="mt-0.5 text-[12.5px] text-ink-4">{role}</p>
      </div>
    </div>
  );
}

function Rec({ k, v }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b-[0.8px] border-line-2 pb-2.5 last:border-0 last:pb-0">
      <dt className="text-ink-3">{k}</dt>
      <dd className="text-right font-medium">{v}</dd>
    </div>
  );
}
