import { useState } from "react";
import AppShell from "../components/AppShell";
import { auditLog, auditWindows } from "../data/content";
import { useRole } from "../state/role";
import { Denied } from "./Staff";

const tone = {
  sub: "bg-sub-soft text-sub",
  rev: "bg-rev-soft text-rev",
  shl: "bg-shl-soft text-shl",
  rej: "bg-rej-soft text-rej",
};

export default function AuditLogs() {
  const { role } = useRole();
  const [win, setWin] = useState("Last 30 days");

  if (role !== "Super Admin") return <Denied />;

  // "Today" is 22 Sept 2026 — only one event falls in it.
  const rows = win === "Today" ? auditLog.filter((r) => r.when.startsWith("22 Sept")) : auditLog;

  return (
    <AppShell>
      <div className="flex flex-wrap items-end justify-between gap-5 pb-8">
        <div>
          <h1 className="text-[27px] font-extrabold leading-none tracking-[-0.022em] sm:text-[34px]">
            Audit logs
          </h1>
          <p className="mt-2.5 max-w-[62ch] text-[14px] text-ink-2">
            Every action that changes a registration, a score or an account. Read-only, and it cannot
            be edited from the product.
          </p>
        </div>

        <div className="-mx-4 flex gap-1 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:rounded-[11px] sm:border sm:border-line sm:bg-paper sm:p-1 sm:px-1">
          {auditWindows.map((w) => (
            <button
              key={w}
              onClick={() => setWin(w)}
              className={`min-h-[44px] shrink-0 rounded-[10px] border px-3.5 text-[13px] transition sm:border-0 ${
                w === win
                  ? "border-ink bg-ink font-semibold text-white"
                  : "border-line bg-paper text-ink-2 hover:bg-sunk"
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      <section className="overflow-hidden rounded-[16px] border-[0.8px] border-line bg-paper">
        <div className="flex items-center gap-3 border-b-[0.8px] border-line px-5 py-4 sm:px-7">
          <span className="lbl">
            {rows.length} {rows.length === 1 ? "entry" : "entries"} · {win.toLowerCase()}
          </span>
        </div>

        {rows.length === 0 ? (
          <div className="px-8 py-20 text-center">
            <h2 className="text-[18px] font-bold">No activity in this window.</h2>
            <p className="mx-auto mt-2.5 max-w-[46ch] text-[14px] leading-relaxed text-ink-2">
              Widen the range above to see earlier events.
            </p>
          </div>
        ) : (
          <div className="hidden overflow-x-auto sm:block">
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr className="border-b-[0.8px] border-line">
                  {["When", "Activity", "Details"].map((h) => (
                    <th key={h} className="lbl px-7 py-3 text-left font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-b-[0.8px] border-line-2 transition hover:bg-ground/50">
                    <td className="tnum whitespace-nowrap px-7 py-4 font-mono text-[12.5px] text-ink-3">
                      {r.when}
                    </td>
                    <td className="px-7 py-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.07em] ${tone[r.tone]}`}
                      >
                        {r.activity}
                      </span>
                    </td>
                    <td className="px-7 py-4 text-[13.5px] text-ink-2">{r.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* phone: the same rows, stacked, no sideways scrolling */}
        {rows.length > 0 && (
          <ul className="divide-y divide-line-2 sm:hidden">
            {rows.map((r, i) => (
              <li key={i} className="px-5 py-4">
                <span
                  className={`inline-block rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.07em] ${tone[r.tone]}`}
                >
                  {r.activity}
                </span>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-2">{r.detail}</p>
                <p className="tnum mt-2 font-mono text-[11.5px] text-ink-3">{r.when}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="mt-5 max-w-[80ch] text-[12.5px] leading-relaxed text-ink-3">
        Tracked actions: team registered · status changed · judge assigned or unassigned · score
        submitted · staff account created · CSV exported · signed in · password reset.
      </p>
    </AppShell>
  );
}
