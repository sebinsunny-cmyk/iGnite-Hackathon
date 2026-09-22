import { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Icon } from "./ui";
import { account, teams, totals } from "../data/registrations";
import { useRole } from "../state/role";
import { LOGO, LOGO_ALT } from "../assets";

const GROUPS = [
  {
    label: "Overview",
    items: [
      { to: "/dashboard", label: "Registrations", icon: Icon.board, badge: totals.teams, roles: ["Admin", "Super Admin", "Judge"] },
      { to: "/dashboard/teams", label: "Teams", icon: Icon.users, children: true, roles: ["Admin", "Super Admin", "Judge"] },
    ],
  },
  {
    label: "Admin",
    items: [
      { to: "/dashboard/settings", label: "Registration window", icon: Icon.settings, roles: ["Admin", "Super Admin"] },
      { to: "/dashboard/staff", label: "Staff", icon: Icon.users, roles: ["Super Admin"] },
      { to: "/dashboard/audit-logs", label: "Audit logs", icon: Icon.list, roles: ["Super Admin"] },
    ],
  },
];

export default function AppShell({ children }) {
  const { role, setRole, roles } = useRole();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [drawer, setDrawer] = useState(false);
  const [openTeams, setOpenTeams] = useState(true);

  useEffect(() => setDrawer(false), [pathname]);

  const judged = teams.filter((t) => t.judges.length > 0).length;
  const pct = Math.round((judged / teams.length) * 100);

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="px-3.5 pb-1 pt-4">
        <div className="flex h-10 items-center gap-2.5 rounded-[11px] border-[0.8px] border-line bg-paper px-3">
          <Icon.search className="h-4 w-4 shrink-0 text-ink-4" />
          <input
            placeholder="Search..."
            className="min-w-0 flex-1 bg-transparent text-[13.5px] outline-none placeholder:text-ink-4"
          />
          <kbd className="shrink-0 rounded-[6px] bg-sunk px-1.5 py-0.5 text-[10.5px] font-medium text-ink-4">
            ⌘K
          </kbd>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3.5 pt-4">
        {GROUPS.map((g) => {
          const items = g.items.filter((i) => i.roles.includes(role));
          if (!items.length) return null;
          return (
            <div key={g.label} className="pb-6">
              <div className="lbl px-2.5 pb-2">{g.label}</div>
              {items.map((it) => {
                const I = it.icon;
                if (it.children) {
                  return (
                    <div key={it.label}>
                      <button
                        onClick={() => setOpenTeams((v) => !v)}
                        className="flex h-9 w-full items-center gap-2.5 rounded-[9px] px-2.5 text-[13.5px] text-ink-2 transition hover:bg-sunk"
                      >
                        <I className="h-[17px] w-[17px] text-ink-3" />
                        {it.label}
                        <Icon.chevron
                          className={`ml-auto h-3.5 w-3.5 text-ink-4 transition ${openTeams ? "" : "-rotate-90"}`}
                        />
                      </button>
                      {openTeams &&
                        teams.map((t) => (
                          <NavLink
                            key={t.name}
                            to={`/dashboard/teams/${encodeURIComponent(t.name)}`}
                            className={({ isActive }) =>
                              `flex h-8 items-center truncate rounded-[9px] pl-[38px] pr-2.5 text-[13px] transition ${
                                isActive ? "bg-sunk font-medium text-ink" : "text-ink-3 hover:text-ink-2"
                              }`
                            }
                          >
                            {t.name}
                          </NavLink>
                        ))}
                    </div>
                  );
                }
                return (
                  <NavLink
                    key={it.to}
                    to={it.to}
                    end={it.to === "/dashboard"}
                    className={({ isActive }) =>
                      `flex h-9 items-center gap-2.5 rounded-[9px] px-2.5 text-[13.5px] transition ${
                        isActive ? "bg-sunk font-medium text-ink" : "text-ink-2 hover:bg-sunk"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <I className={`h-[17px] w-[17px] ${isActive ? "text-ink" : "text-ink-3"}`} />
                        {it.label}
                        {it.badge != null && (
                          <span className="tnum ml-auto text-[12px] text-ink-4">{it.badge}</span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          );
        })}
      </nav>

      <div className="p-3.5">
        <div className="rounded-[13px] border-[0.8px] border-line bg-paper p-3.5">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[12.5px] font-medium text-ink-2">Judges assigned</span>
            <span className="tnum text-[12.5px] font-semibold">{pct}%</span>
          </div>
          <div className="mt-2.5 h-[5px] overflow-hidden rounded-full bg-sunk">
            <div
              className="h-full rounded-full"
              style={{
                width: `${pct}%`,
                background: "linear-gradient(90deg,var(--color-viz-orange),var(--color-viz-pink))",
              }}
            />
          </div>
          <p className="mt-2.5 text-[11.5px] leading-relaxed text-ink-4">
            {judged} of {teams.length} teams · window open
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full flex-col bg-ground">
      {/* ---------- top bar ---------- */}
      <header className="z-30 flex h-[60px] shrink-0 items-center gap-3 border-b-[0.8px] border-line bg-paper px-3 sm:gap-4 sm:px-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex shrink-0 items-center gap-2.5"
          aria-label="gIGNITE"
        >
          <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-ink">
            <Icon.board className="h-4 w-4 text-white" />
          </span>
          <span className="hidden text-[16.5px] font-semibold tracking-[-0.02em] sm:block">
            gIGNITE
          </span>
        </button>

        <div className="ml-1 hidden h-9 min-w-0 flex-1 max-w-[340px] items-center gap-2.5 rounded-[10px] bg-sunk px-3 lg:flex">
          <Icon.search className="h-4 w-4 shrink-0 text-ink-4" />
          <input
            placeholder="Search teams, themes, judges..."
            className="min-w-0 flex-1 bg-transparent text-[13.5px] outline-none placeholder:text-ink-4"
          />
        </div>

        <div className="mx-auto hidden text-center xl:block">
          <div className="text-[15px] font-semibold tracking-[-0.01em]">
            Registration open
          </div>
          <div className="text-[12px] text-ink-4">
            {totals.teams} teams · {totals.needJudge} awaiting a judge
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <label className="hidden items-center gap-2 rounded-[10px] border-[0.8px] border-line px-2.5 py-1.5 lg:flex">
            <span className="lbl">Role</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-transparent text-[13px] font-medium outline-none"
            >
              {roles.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>

          <button className="relative grid h-9 w-9 place-items-center rounded-[10px] text-ink-3 transition hover:bg-sunk">
            <Icon.bell className="h-[18px] w-[18px]" />
            <span className="absolute right-2 top-2 h-[6px] w-[6px] rounded-full bg-viz-pink ring-2 ring-white" />
          </button>

          <div className="flex items-center gap-2.5">
            <span
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[12.5px] font-semibold text-white"
              style={{ background: "linear-gradient(135deg,var(--color-viz-pink),var(--color-viz-purple))" }}
            >
              {account.initials}
            </span>
            <div className="hidden leading-tight sm:block">
              <div className="text-[13.5px] font-semibold tracking-[-0.01em]">{account.name}</div>
              <div className="text-[12px] text-ink-4">{role}</div>
            </div>
          </div>

          <button
            onClick={() => setDrawer((v) => !v)}
            aria-label={drawer ? "Close menu" : "Open menu"}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] border-[0.8px] border-line text-ink-2 lg:hidden"
          >
            {drawer ? (
              <span className="text-[18px] leading-none">×</span>
            ) : (
              <span className="flex flex-col gap-[3.5px]">
                <span className="block h-[1.6px] w-[16px] rounded bg-current" />
                <span className="block h-[1.6px] w-[16px] rounded bg-current" />
                <span className="block h-[1.6px] w-[16px] rounded bg-current" />
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-[248px] shrink-0 border-r-[0.8px] border-line bg-paper lg:block">
          {sidebar}
        </aside>

        {drawer && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-ink/25" onClick={() => setDrawer(false)} />
            <aside className="absolute bottom-0 left-0 top-[60px] w-[264px] max-w-[84vw] border-r-[0.8px] border-line bg-paper">
              {sidebar}
            </aside>
          </div>
        )}

        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="px-4 py-5 sm:px-6 sm:py-7 xl:px-8">{children}</div>

          <div className="mt-2 border-t-[0.8px] border-line px-4 py-6 sm:px-6 xl:px-8">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <span className="lbl">Presented by</span>
              <img src={LOGO.gadgeon} alt={LOGO_ALT.gadgeon} className="h-8 w-auto sm:h-9" />
              <img src={LOGO.fisat} alt={LOGO_ALT.fisat} className="h-8 w-auto sm:h-9" />
              <img src={LOGO.ieee} alt={LOGO_ALT.ieee} className="h-8 w-auto sm:h-9" />
              <img src={LOGO.gignite} alt={LOGO_ALT.gignite} className="ml-auto hidden h-9 w-auto sm:block" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
