import { useState } from "react";
import { Link } from "react-router-dom";
import {
  teams,
  byTheme,
  byStatus,
  daily,
  dailyMeta,
  totals,
  filterLabels,
} from "../data/registrations";
import {
  StatusPill, StatusDot, JudgeChip, AddJudge, Delta, Spark, Segmented, ViewToggle, TrackDot, useMediaQuery, Icon,
} from "../components/ui";
import AppShell from "../components/AppShell";
import { useRole } from "../state/role";
import { trackBy } from "../data/content";

/* Cumulative entries read better than a 0/1 spike series, and it is the number
   organisers actually watch: how many are in so far. */
const cumulative = daily.reduce((acc, d) => [...acc, (acc.at(-1) ?? 0) + d.count], []);

export default function Dashboard() {
  const { role } = useRole();
  const [range, setRange] = useState("7d");

  /* Cards are the default below lg, where a seven-column table can only be read
     by scrolling sideways. null means "follow the viewport" until someone picks. */
  const narrow = useMediaQuery("(max-width: 1023px)");
  const [picked, setPicked] = useState(null);
  const view = picked ?? (narrow ? "card" : "table");

  if (role === "Judge") return <JudgeView />;

  return (
    <AppShell>
      <nav className="flex items-center gap-2 text-[13px] text-ink-4">
        <span>Workspace</span>
        <Icon.chevron className="h-3.5 w-3.5 -rotate-90" />
        <span>gIGNITE 2026</span>
        <Icon.chevron className="h-3.5 w-3.5 -rotate-90" />
        <span className="font-medium text-ink">Registrations</span>
      </nav>

      {/* ---------- KPI row ---------- */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Kpi
          label="Teams registered"
          value={totals.teams}
          delta="+1 today"
          tone="pos"
          points={cumulative}
          stroke="var(--color-viz-pink)"
        />
        <Kpi
          label="Awaiting a judge"
          value={totals.needJudge}
          delta="2 of 3"
          tone="neg"
          points={[0, 1, 2, 2, 2, 2, 2]}
          stroke="var(--color-viz-purple)"
        />
        <Kpi
          label="Shortlisted"
          value={1}
          delta="+1 this week"
          tone="pos"
          points={[0, 0, 0, 1, 1, 1, 1]}
          stroke="var(--color-viz-orange)"
        />
      </div>

      {/* ---------- main chart ---------- */}
      <section className="card mt-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-start gap-4">
          <div>
            <h2 className="text-[17px] font-semibold tracking-[-0.02em]">Entries to date</h2>
            <p className="mt-1 text-[13.5px] text-ink-3">
              {dailyMeta.month} · cumulative · all tracks
            </p>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-4">
            <Segmented options={["7d", "30d", "All"]} value={range} onChange={setRange} />
            <div className="flex items-center gap-4 text-[12.5px]">
              <Legend color="var(--color-viz-pink)" label="Entries" />
              <Legend color="#D8D8DE" label="Target" dashed />
            </div>
          </div>
        </div>

        <EntriesChart />
      </section>

      {/* ---------- theme share ---------- */}
      <section className="card mt-4">
        <div className="flex flex-wrap items-center gap-3 px-5 py-4 sm:px-6">
          <h2 className="text-[17px] font-semibold tracking-[-0.02em]">Entries by track</h2>
          <span className="text-[13px] text-ink-4">5 tracks</span>
          <button className="ml-auto flex h-9 items-center gap-2 rounded-[10px] border-[0.8px] border-line px-3 text-[13px] font-medium text-ink-2 transition hover:bg-sunk">
            <Icon.download className="h-4 w-4" />
            Export
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse">
            <thead>
              <tr className="border-y-[0.8px] border-line">
                <th className="lbl px-5 py-2.5 text-left font-medium sm:px-6">Track</th>
                <th className="lbl px-5 py-2.5 text-right font-medium sm:px-6">Teams</th>
                <th className="lbl px-5 py-2.5 text-right font-medium sm:px-6">Share</th>
                <th className="lbl px-5 py-2.5 text-right font-medium sm:px-6">%</th>
              </tr>
            </thead>
            <tbody>
              {byTheme.map((t, i) => {
                const share = (t.count / totals.teams) * 100;
                return (
                  <tr key={t.label} className="border-b-[0.8px] border-line last:border-0">
                    <td className="px-5 py-3.5 sm:px-6">
                      <span className="flex items-center gap-2.5">
                        <span
                          className="h-[7px] w-[7px] shrink-0 rounded-full"
                          style={{
                            background: t.count
                              ? `var(--color-viz-${trackBy(t.label).hue})`
                              : "#DEDEE3",
                          }}
                        />
                        <span className={`text-[14px] ${t.count ? "" : "text-ink-4"}`}>{t.label}</span>
                      </span>
                    </td>
                    <td className={`tnum px-5 py-3.5 text-right text-[14px] sm:px-6 ${t.count ? "" : "text-ink-4"}`}>
                      {t.count}
                    </td>
                    <td className="px-5 py-3.5 sm:px-6">
                      <span className="ml-auto flex h-[6px] w-[150px] overflow-hidden rounded-full bg-sunk">
                        {share > 0 && (
                          <span
                            className="h-full rounded-full"
                            style={{
                              width: `${share}%`,
                              background: `var(--color-viz-${trackBy(t.label).hue})`,
                            }}
                          />
                        )}
                      </span>
                    </td>
                    <td className="tnum w-[76px] px-5 py-3.5 text-right text-[14px] font-medium sm:px-6">
                      {share ? `${share.toFixed(1)}%` : <span className="text-ink-4">—</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* ---------- teams ---------- */}
      <section className="card mt-4">
        <div className="flex flex-wrap items-center gap-3 px-5 py-4 sm:px-6">
          <h2 className="text-[17px] font-semibold tracking-[-0.02em]">All teams</h2>
          <span className="text-[13px] text-ink-4">{totals.shown}</span>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <div className="flex h-9 min-w-0 items-center gap-2 rounded-[10px] bg-sunk px-3">
              <Icon.search className="h-4 w-4 shrink-0 text-ink-4" />
              <input
                placeholder={filterLabels.search}
                className="w-full min-w-0 bg-transparent text-[13px] outline-none placeholder:text-ink-4 sm:w-[190px]"
              />
            </div>
            {[filterLabels.statuses, filterLabels.themes].map((f) => (
              <button
                key={f}
                className="flex h-9 items-center gap-1.5 rounded-[10px] border-[0.8px] border-line px-3 text-[13px] text-ink-2 transition hover:bg-sunk"
              >
                {f}
                <Icon.chevron className="h-3.5 w-3.5 text-ink-4" />
              </button>
            ))}
            <ViewToggle value={view} onChange={setPicked} />
          </div>
        </div>

        {view === "table" ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse">
            <thead>
              <tr className="border-y-[0.8px] border-line">
                {["Team", "Track", "Team lead", "Size", "Judges", "Status", "Entered"].map((h) => (
                  <th key={h} className="lbl px-5 py-2.5 text-left font-medium sm:px-6">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teams.map((t, i) => (
                <tr
                  key={t.name}
                  className="border-b-[0.8px] border-line transition last:border-0 hover:bg-ground"
                >
                  <td className="px-5 py-4 sm:px-6">
                    <Link
                      to={`/dashboard/teams/${encodeURIComponent(t.name)}`}
                      className="flex items-center gap-2.5 text-[14px] font-medium tracking-[-0.01em]"
                    >
                      <TrackDot track={trackBy(t.theme)} />
                      {t.name}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-[13.5px] text-ink-3 sm:px-6">{t.theme}</td>
                  <td className="px-5 py-4 text-[13.5px] sm:px-6">{t.leader}</td>
                  <td className="tnum px-5 py-4 text-[13.5px] text-ink-3 sm:px-6">{t.members}</td>
                  <td className="px-5 py-4 sm:px-6">
                    {t.judges.length ? (
                      <span className="flex flex-wrap gap-1.5">
                        {t.judges.map((j) => (
                          <JudgeChip key={j} name={j} />
                        ))}
                      </span>
                    ) : (
                      <AddJudge />
                    )}
                  </td>
                  <td className="px-5 py-4 sm:px-6">
                    <StatusPill status={t.status} />
                  </td>
                  <td className="tnum px-5 py-4 text-[13px] text-ink-4 sm:px-6">{t.submittedShort}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 border-t-[0.8px] border-line p-5 sm:grid-cols-2 sm:p-6 2xl:grid-cols-3">
            {teams.map((t, i) => (
              <article
                key={t.name}
                className="flex flex-col rounded-[13px] border-[0.8px] border-line p-5 transition hover:border-line-2 hover:shadow-[0_2px_10px_rgba(14,14,20,0.06)]"
              >
                <div className="flex items-start gap-3">
                  <Link
                    to={`/dashboard/teams/${encodeURIComponent(t.name)}`}
                    className="flex min-w-0 items-center gap-2.5 text-[16px] font-semibold tracking-[-0.02em]"
                  >
                    <TrackDot track={trackBy(t.theme)} />
                    <span className="truncate">{t.name}</span>
                  </Link>
                  <span className="ml-auto shrink-0">
                    <StatusPill status={t.status} />
                  </span>
                </div>

                <p className="mt-2 flex items-center gap-2 text-[13.5px] text-ink-3">
                  <TrackDot track={trackBy(t.theme)} />
                  {t.theme}
                </p>

                <dl className="mt-4 flex flex-col gap-2 text-[13px]">
                  <div className="flex gap-3">
                    <dt className="w-[74px] shrink-0 text-ink-4">Team lead</dt>
                    <dd className="truncate">{t.leader}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-[74px] shrink-0 text-ink-4">Size</dt>
                    <dd className="tnum">{t.members} members</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-[74px] shrink-0 text-ink-4">Entered</dt>
                    <dd className="tnum">{t.submitted}</dd>
                  </div>
                </dl>

                <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t-[0.8px] border-line pt-4">
                  {t.judges.length ? (
                    t.judges.map((j) => <JudgeChip key={j} name={j} />)
                  ) : (
                    <AddJudge />
                  )}
                  <Link
                    to={`/dashboard/teams/${encodeURIComponent(t.name)}`}
                    className="ml-auto flex items-center gap-1.5 text-[13px] font-medium text-sub transition hover:gap-2.5"
                  >
                    Open
                    <Icon.arrow className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ---------- status strip ---------- */}
      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {byStatus.map((s) => (
          <div key={s.key} className="card p-5">
            <div className="flex items-center gap-2">
              {s.count ? (
                <StatusDot status={s.label} />
              ) : (
                <span className="h-[7px] w-[7px] rounded-full bg-[#DEDEE3]" />
              )}
              <span className="lbl !text-ink-3">{s.label}</span>
            </div>
            <div
              className={`tnum mt-3 text-[30px] font-semibold tracking-[-0.03em] ${
                s.count ? "" : "text-ink-4"
              }`}
            >
              {s.count}
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

/* ------------------------------------------------------------------ */

function Kpi({ label, value, delta, tone, points, stroke }) {
  return (
    <div className="card flex items-start gap-4 p-5">
      <div className="min-w-0 flex-1">
        <div className="whitespace-nowrap text-[13.5px] text-ink-3">{label}</div>
        <div className="tnum mt-2 text-[32px] font-semibold leading-none tracking-[-0.035em]">
          {value}
        </div>
        <div className="mt-3">
          <Delta value={delta} tone={tone} />
        </div>
      </div>
      <div className="shrink-0 pt-1">
        <Spark points={points} stroke={stroke} />
      </div>
    </div>
  );
}

function Legend({ color, label, dashed = false }) {
  return (
    <span className="flex items-center gap-2 text-ink-3">
      <span
        className="h-[7px] w-[7px] rounded-full"
        style={{
          background: dashed ? "transparent" : color,
          boxShadow: dashed ? `inset 0 0 0 1.5px ${color}` : "none",
        }}
      />
      {label}
    </span>
  );
}

function EntriesChart() {
  const [hover, setHover] = useState(null);
  const W = 1000;
  const H = 260;
  const PAD = { t: 20, r: 14, b: 34, l: 14 };
  const max = 4;

  const pts = cumulative.map((v, i) => ({
    x: PAD.l + (i / (cumulative.length - 1)) * (W - PAD.l - PAD.r),
    y: PAD.t + (1 - v / max) * (H - PAD.t - PAD.b),
    v,
    day: daily[i].day,
  }));

  const line = pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const target = [0, 1, 2, 2, 3, 3, 4]
    .map((v, i) => {
      const x = PAD.l + (i / 6) * (W - PAD.l - PAD.r);
      const y = PAD.t + (1 - v / max) * (H - PAD.t - PAD.b);
      return `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="relative mt-6">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 260 }} onMouseLeave={() => setHover(null)}>
        <defs>
          <linearGradient id="entriesStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-viz-orange)" />
            <stop offset="55%" stopColor="var(--color-viz-pink)" />
            <stop offset="100%" stopColor="var(--color-viz-purple)" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3, 4].map((v) => {
          const y = PAD.t + (1 - v / max) * (H - PAD.t - PAD.b);
          return <line key={v} x1={PAD.l} y1={y} x2={W - PAD.r} y2={y} stroke="#F0F0F3" strokeWidth="1" />;
        })}

        <path d={target} fill="none" stroke="#D8D8DE" strokeWidth="2" strokeDasharray="3 5" strokeLinecap="round" />
        <path d={line} fill="none" stroke="url(#entriesStroke)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {pts.map((p, i) => (
          <g key={p.day}>
            <rect
              x={p.x - W / cumulative.length / 2}
              y={0}
              width={W / cumulative.length}
              height={H}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
            />
            {hover === i && (
              <>
                <line x1={p.x} y1={PAD.t} x2={p.x} y2={H - PAD.b} stroke="#DEDEE3" strokeWidth="1" />
                <circle cx={p.x} cy={p.y} r="5.5" fill="#fff" stroke="var(--color-viz-pink)" strokeWidth="3" />
              </>
            )}
            <text
              x={p.x}
              y={H - 10}
              textAnchor="middle"
              fill="#9B9BA5"
              style={{ fontSize: 13, fontFamily: "Inter, sans-serif" }}
            >
              {p.day} Sep
            </text>
          </g>
        ))}
      </svg>

      {hover !== null && (
        <div
          className="pointer-events-none absolute z-10 rounded-[11px] border-[0.8px] border-line bg-paper px-3.5 py-2.5 shadow-[0_8px_24px_rgba(14,14,20,0.10)]"
          style={{
            left: `${(pts[hover].x / W) * 100}%`,
            top: `${(pts[hover].y / H) * 100}%`,
            transform: "translate(-50%,-125%)",
          }}
        >
          <div className="whitespace-nowrap text-[13px] font-semibold">
            {pts[hover].day} September 2026
          </div>
          <div className="mt-2 flex items-center gap-3 whitespace-nowrap text-[13px]">
            <span className="h-[7px] w-[7px] rounded-full bg-viz-pink" />
            <span className="text-ink-3">Entries to date</span>
            <span className="tnum ml-auto font-medium">{pts[hover].v}</span>
          </div>
          <div className="mt-1 flex items-center gap-3 whitespace-nowrap text-[13px]">
            <span className="h-[7px] w-[7px] rounded-full" style={{ boxShadow: "inset 0 0 0 1.5px #D8D8DE" }} />
            <span className="text-ink-3">New that day</span>
            <span className="tnum ml-auto font-medium">{daily[hover].count}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function JudgeView() {
  const mine = teams.filter((t) => t.judges.includes("Barry Allen"));
  return (
    <AppShell>
      <h1 className="text-[24px] font-semibold tracking-[-0.03em]">Your submissions</h1>
      <p className="mt-1.5 text-[14px] text-ink-3">
        {mine.length} assigned to you · editable until the round closes
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {mine.map((t) => (
          <Link
            key={t.name}
            to={`/dashboard/teams/${encodeURIComponent(t.name)}`}
            className="card flex flex-col p-5 transition hover:shadow-[0_4px_16px_rgba(14,14,20,0.08)]"
          >
            <div className="flex items-start gap-3">
              <h3 className="text-[18px] font-semibold tracking-[-0.02em]">{t.name}</h3>
              <span className="ml-auto">
                <StatusPill status={t.status} />
              </span>
            </div>
            <p className="mt-1.5 text-[13.5px] text-ink-3">{t.theme}</p>
            <p className="mt-4 text-[13px] text-ink-4">
              {t.leader} · {t.members} members
            </p>
            <div className="mt-5 flex items-center gap-2 border-t-[0.8px] border-line pt-4">
              <span className="rounded-full bg-sunk px-2.5 py-1 text-[12px] font-medium text-ink-3">
                Not scored
              </span>
              <span className="ml-auto flex items-center gap-1.5 text-[13px] font-medium text-sub">
                Score it
                <Icon.arrow className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
        {mine.length === 0 && (
          <div className="card col-span-full px-6 py-16 text-center">
            <h2 className="text-[17px] font-semibold">Nothing assigned yet</h2>
            <p className="mx-auto mt-2 max-w-[44ch] text-[14px] text-ink-3">
              An organiser will assign submissions to you before the round opens.
            </p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
