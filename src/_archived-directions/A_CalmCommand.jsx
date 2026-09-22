import { useEffect, useState } from "react";
import {
  account,
  teams,
  byStatus,
  daily,
  dailyMeta,
  totals,
  filterLabels,
  registrationWindow,
} from "../data/registrations";
import {
  GigniteMark,
  SponsorRibbon,
  StatusDot,
  JudgeChip,
  AddJudge,
  Avatar,
  Icon,
} from "../components/ui";

const railItems = [
  { key: "teams", label: "Teams", icon: Icon.users, on: true },
  { key: "export", label: "Export", icon: Icon.download },
  { key: "settings", label: "Settings", icon: Icon.settings },
];

const commands = [
  { group: "Assign", label: "Assign Barry Allen to Neural Nadi", hint: "↵" },
  { group: "Assign", label: "Assign Govind to Neural Nadi" },
  { group: "Status", label: "Set Neural Nadi → Shortlisted", hint: "⌘S" },
  { group: "Status", label: "Set Neural Nadi → Under review" },
  { group: "Data", label: "Export CSV — current filter", hint: "⌘E" },
  { group: "Settings", label: "Close registration window" },
];

export default function CalmCommand() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const h = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="flex min-h-full bg-paper">
      {/* rail */}
      <aside className="flex w-[196px] shrink-0 flex-col border-r border-line bg-ground px-3 py-5">
        <div className="px-2 pb-6">
          <GigniteMark />
          <div className="lbl mt-2 pl-8">Admin</div>
        </div>

        <nav className="flex flex-col gap-0.5">
          {railItems.map(({ key, label, icon: I, on }) => (
            <button
              key={key}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition ${
                on ? "bg-paper text-ink shadow-[0_1px_2px_rgba(20,24,31,0.05)]" : "text-ink-2 hover:bg-paper/70"
              }`}
            >
              <I className="h-[15px] w-[15px]" />
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3 px-1">
          <button className="flex items-center gap-2.5 rounded-lg px-1.5 py-2 text-[13px] text-ink-2 transition hover:text-ink">
            <Icon.logout className="h-[15px] w-[15px]" />
            Sign out
          </button>
          <div className="flex items-center gap-2.5 rounded-lg border border-line bg-paper px-2.5 py-2">
            <Avatar initials={account.initials} size={26} />
            <div className="min-w-0">
              <div className="truncate text-[12px] font-semibold leading-tight">{account.name}</div>
              <div className="lbl">{account.role}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* main */}
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-line px-6 py-3">
          <div className="text-[13px] text-ink-3">
            gIGNITE 2026 <span className="px-1 text-line">/</span>
            <span className="font-semibold text-ink">Registrations</span>
          </div>

          <span className="ml-3 inline-flex items-center gap-2 rounded-full border border-line px-2.5 py-1 text-[11px] text-ink-2">
            <span className="h-[6px] w-[6px] rounded-full bg-shl" />
            Registration {registrationWindow.status.toLowerCase()}
            <button className="font-medium text-navy-2 hover:underline">Edit</button>
          </span>

          <button
            onClick={() => setOpen(true)}
            className="ml-auto flex items-center gap-2 rounded-lg border border-line bg-ground px-3 py-1.5 font-mono text-[11px] text-ink-3 transition hover:border-ink-3/40 hover:text-ink-2"
          >
            <Icon.search className="h-3.5 w-3.5" />
            Search or run a command
            <kbd className="ml-2 rounded border border-line bg-paper px-1.5 py-0.5 text-[10px] text-ink-3">⌘K</kbd>
          </button>
        </header>

        {/* numbers, not charts */}
        <section className="flex flex-wrap items-end gap-x-10 gap-y-5 border-b border-line px-6 py-5">
          <Stat value={totals.teams} label="Teams" lead />
          {byStatus.map((s) => (
            <Stat key={s.key} value={s.count} label={s.label} muted={s.count === 0} />
          ))}
          <div className="ml-auto flex items-end gap-4">
            <div className="w-[132px]">
              <div className="flex items-end gap-[5px]" style={{ height: 34 }}>
                {daily.map((d) => (
                  <div
                    key={d.day}
                    className={`flex-1 rounded-[2px] ${
                      d.today ? "bg-ink" : d.count > 0 ? "bg-ink/25" : "bg-line"
                    }`}
                    style={{ height: d.count === 0 ? 3 : "100%" }}
                    title={`${d.day} Sept — ${d.count}`}
                  />
                ))}
              </div>
            </div>
            <div className="pb-0.5">
              <div className="text-[12px] font-semibold leading-none">{dailyMeta.today} today</div>
              <div className="lbl mt-1.5">16–22 Sept · {dailyMeta.delta}</div>
            </div>
          </div>
        </section>

        {/* filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-line px-6 py-3">
          <div className="flex items-center gap-2 rounded-lg border border-line px-2.5 py-1.5">
            <Icon.search className="h-3.5 w-3.5 text-ink-3" />
            <input
              placeholder={filterLabels.search}
              className="w-[210px] bg-transparent text-[12.5px] outline-none placeholder:text-ink-3"
            />
          </div>
          {[filterLabels.statuses, filterLabels.themes, filterLabels.districts].map((f) => (
            <button
              key={f}
              className="flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-[12.5px] text-ink-2 transition hover:border-ink-3/40"
            >
              {f}
              <Icon.chevron className="h-3 w-3 text-ink-3" />
            </button>
          ))}
          <span className="lbl ml-2">{totals.shown}</span>
          <button className="ml-auto flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-[12.5px] font-medium text-ink-2 transition hover:border-ink-3/40">
            <Icon.download className="h-3.5 w-3.5" />
            Export CSV
          </button>
        </div>

        {/* table */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse">
            <thead>
              <tr className="border-b border-line">
                {["Team", "Theme", "Leader", "Size", "Judges", "Status", "Submitted"].map((h) => (
                  <th key={h} className="lbl px-6 py-2.5 text-left font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teams.map((t) => (
                <tr key={t.name} className="border-b border-line-2 transition hover:bg-ground/70">
                  <td className="px-6 py-3.5 text-[13px] font-semibold">{t.name}</td>
                  <td className="px-6 py-3.5 text-[13px] text-ink-2">{t.theme}</td>
                  <td className="px-6 py-3.5 text-[13px]">{t.leader}</td>
                  <td className="tnum px-6 py-3.5 text-[13px] text-ink-2">{t.members}</td>
                  <td className="px-6 py-3.5">
                    {t.judges.length ? (
                      <span className="flex flex-wrap gap-1">
                        {t.judges.map((j) => (
                          <JudgeChip key={j} name={j} />
                        ))}
                      </span>
                    ) : (
                      <AddJudge />
                    )}
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="inline-flex items-center gap-2 text-[12.5px]">
                      <StatusDot status={t.status} />
                      {t.status}
                    </span>
                  </td>
                  <td className="tnum px-6 py-3.5 font-mono text-[11.5px] text-ink-3">
                    {t.submittedShort} · {t.submittedTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="flex flex-wrap items-center gap-4 border-t border-line px-6 py-3">
          <SponsorRibbon compact />
          <span className="lbl ml-auto">Press ⌘K for any action</span>
        </footer>
      </main>

      {/* command palette */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink/20 px-4 pt-[14vh]"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-[520px] overflow-hidden rounded-xl border border-line bg-paper shadow-[0_24px_60px_rgba(20,24,31,0.18)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
              <Icon.search className="h-4 w-4 text-ink-3" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Assign a judge, change a status, export…"
                className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-ink-3"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-ink-3">esc</kbd>
            </div>
            <div className="max-h-[300px] overflow-y-auto py-1.5">
              {filtered.length === 0 && (
                <div className="px-4 py-6 text-center text-[13px] text-ink-3">No command matches “{q}”.</div>
              )}
              {filtered.map((c, i) => (
                <button
                  key={c.label}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] transition ${
                    i === 0 ? "bg-navy-soft text-ink" : "text-ink-2 hover:bg-ground"
                  }`}
                >
                  <span className="lbl w-[54px] shrink-0">{c.group}</span>
                  <span className="flex-1">{c.label}</span>
                  {c.hint && (
                    <kbd className="rounded border border-line bg-paper px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
                      {c.hint}
                    </kbd>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ value, label, lead = false, muted = false }) {
  return (
    <div>
      <div
        className={`tnum font-extrabold leading-none tracking-[-0.018em] ${
          lead ? "text-[30px]" : "text-[24px]"
        } ${muted ? "text-ink-3" : "text-ink"}`}
      >
        {value}
      </div>
      <div className="lbl mt-2">{label}</div>
    </div>
  );
}
