import { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { GigniteLogo, PartnerBand } from "./Brand";
import { Avatar, Icon } from "./ui";
import { account } from "../data/registrations";
import { useRole } from "../state/role";

const NAV = [
  { to: "/dashboard", label: "Registrations", roles: ["Admin", "Super Admin", "Judge"] },
  { to: "/dashboard/settings", label: "Registration window", roles: ["Admin", "Super Admin"] },
  { to: "/dashboard/staff", label: "Staff", roles: ["Super Admin"] },
  { to: "/dashboard/audit-logs", label: "Audit logs", roles: ["Super Admin"] },
];

export default function AppShell({ children }) {
  const { role, setRole, roles } = useRole();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);

  // a route change should never leave the drawer hanging open
  useEffect(() => setMenu(false), [pathname]);

  const visible = NAV.filter((n) => n.roles.includes(role));

  return (
    <div className="flex min-h-full flex-col bg-ground">
      <header className="sticky top-0 z-30 border-b border-line bg-paper">
        {/* one row on every screen — the logo shrinks, the rest collapses */}
        <div className="flex items-center gap-3 px-4 py-3 sm:gap-5 sm:px-6 lg:gap-8 lg:py-4 xl:px-10">
          <button
            onClick={() => navigate("/dashboard")}
            className="shrink-0"
            aria-label="gIGNITE dashboard"
          >
            <GigniteLogo className="h-8 sm:h-10 lg:h-14" />
          </button>

          <span className="hidden h-10 w-px bg-line lg:block" />

          {/* desktop nav */}
          <nav className="hidden flex-wrap gap-1 lg:flex">
            {visible.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/dashboard"}
                className={({ isActive }) =>
                  `rounded-lg px-3.5 py-2 text-[14px] transition ${
                    isActive ? "bg-ink font-semibold text-white" : "text-ink-2 hover:bg-sunk"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <button className="flex items-center gap-2 rounded-lg px-3.5 py-2 text-[14px] text-ink-2 transition hover:bg-sunk">
              <Icon.download className="h-4 w-4" />
              Export
            </button>
          </nav>

          <div className="ml-auto flex items-center gap-2 sm:gap-4">
            <label className="hidden items-center gap-2 rounded-lg border border-dashed border-line px-2.5 py-1.5 lg:flex">
              <span className="lbl">Preview as</span>
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

            <div className="flex items-center gap-3">
              <div className="hidden text-right leading-tight lg:block">
                <div className="text-[13.5px] font-semibold">{account.name}</div>
                <div className="lbl">{role}</div>
              </div>
              <Avatar initials={account.initials} size={36} />
            </div>

            <button
              onClick={() => navigate("/login")}
              className="hidden items-center gap-2 rounded-lg border border-line px-3 py-2 text-[13px] font-medium text-ink-2 transition hover:border-ink-3/40 lg:flex"
            >
              <Icon.logout className="h-4 w-4" />
              Sign out
            </button>

            {/* mobile / tablet trigger */}
            <button
              onClick={() => setMenu((v) => !v)}
              aria-expanded={menu}
              aria-label={menu ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-line text-ink-2 transition hover:border-ink-3/40 lg:hidden"
            >
              {menu ? (
                <span className="text-[20px] leading-none">×</span>
              ) : (
                <span className="flex flex-col gap-[4px]">
                  <span className="block h-[2px] w-[18px] rounded bg-current" />
                  <span className="block h-[2px] w-[18px] rounded bg-current" />
                  <span className="block h-[2px] w-[18px] rounded bg-current" />
                </span>
              )}
            </button>
          </div>
        </div>

        {/* drawer */}
        {menu && (
          <div className="border-t border-line bg-paper px-4 pb-5 pt-3 sm:px-6 lg:hidden">
            <div className="mb-4 flex items-center gap-3 rounded-xl bg-ground px-4 py-3">
              <Avatar initials={account.initials} size={34} />
              <div>
                <div className="text-[14px] font-semibold">{account.name}</div>
                <div className="lbl">{role}</div>
              </div>
            </div>

            <nav className="flex flex-col gap-1">
              {visible.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.to === "/dashboard"}
                  className={({ isActive }) =>
                    `flex min-h-[48px] items-center rounded-xl px-4 text-[15px] transition ${
                      isActive ? "bg-ink font-semibold text-white" : "text-ink-2 hover:bg-ground"
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              ))}
              <button className="flex min-h-[48px] items-center gap-2.5 rounded-xl px-4 text-left text-[15px] text-ink-2 transition hover:bg-ground">
                <Icon.download className="h-4 w-4" />
                Export
              </button>
            </nav>

            <label className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-line px-4 py-2.5">
              <span className="lbl shrink-0">Preview as</span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="min-h-[40px] flex-1 bg-transparent text-[15px] font-medium outline-none"
              >
                {roles.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </label>

            <button
              onClick={() => navigate("/login")}
              className="mt-3 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-line text-[15px] font-medium text-ink-2"
            >
              <Icon.logout className="h-4 w-4" />
              Sign out
            </button>
          </div>
        )}
      </header>

      <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 xl:px-10">{children}</main>

      <PartnerBand />
    </div>
  );
}
