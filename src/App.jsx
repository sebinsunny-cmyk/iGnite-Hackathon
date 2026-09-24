import { useState } from "react";
import { HashRouter, Routes, Route, Navigate, NavLink, useLocation } from "react-router-dom";
import { RoleProvider } from "./state/role";

import Landing from "./screens/Landing";
import StaffLogin from "./screens/StaffLogin";
import RegisterGate from "./screens/RegisterGate";
import RegisterWizard from "./screens/RegisterWizard";
import Dashboard from "./screens/Dashboard";
import TeamDetail from "./screens/TeamDetail";
import Settings from "./screens/Settings";
import Staff from "./screens/Staff";
import AuditLogs from "./screens/AuditLogs";
import { RegisterClosed, NotFound, ResetPassword } from "./screens/Misc";

const SCREENS = [
  { group: "Public", to: "/", label: "Landing" },
  { group: "Public", to: "/register", label: "Register — sign-in gate" },
  { group: "Public", to: "/register/entry", label: "Register — 4-step wizard" },
  { group: "Public", to: "/register/closed", label: "Register — closed" },
  { group: "Public", to: "/login", label: "Staff sign-in" },
  { group: "Public", to: "/reset-password", label: "Reset password" },
  { group: "Public", to: "/nowhere", label: "404" },
  { group: "Dashboard", to: "/dashboard", label: "Registrations" },
  { group: "Dashboard", to: "/dashboard/teams/test%201", label: "Team detail" },
  { group: "Dashboard", to: "/dashboard/settings", label: "Registration window" },
  { group: "Dashboard", to: "/dashboard/staff", label: "Staff" },
  { group: "Dashboard", to: "/dashboard/audit-logs", label: "Audit logs" },
];

export default function App() {
  return (
    <HashRouter>
      <RoleProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<StaffLogin />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/register" element={<RegisterGate />} />
          <Route path="/register/entry" element={<RegisterWizard />} />
          <Route path="/register/closed" element={<RegisterClosed />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/teams/:teamId" element={<TeamDetail />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/staff" element={<Staff />} />
          <Route path="/dashboard/audit-logs" element={<AuditLogs />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ScreenIndex />
      </RoleProvider>
    </HashRouter>
  );
}

/** Review aid — lists every screen so nothing has to be found by guessing a URL. */
function ScreenIndex() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const groups = [...new Set(SCREENS.map((s) => s.group))];

  return (
    <div
      className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-3 sm:bottom-5 sm:left-auto sm:right-5 sm:items-end print:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      {open && (
        <div className="w-[min(260px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_18px_50px_rgba(20,24,31,0.16)]">
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <span className="lbl">All screens</span>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto text-[16px] leading-none text-ink-3 hover:text-ink"
              aria-label="Close screen index"
            >
              ×
            </button>
          </div>
          <div className="max-h-[60vh] overflow-y-auto py-2">
            {groups.map((g) => (
              <div key={g} className="pb-2">
                <div className="lbl px-4 py-2">{g}</div>
                {SCREENS.filter((s) => s.group === g).map((s) => (
                  <NavLink
                    key={s.to}
                    to={s.to}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-2 text-[13px] transition ${
                      pathname === s.to.split("%20").join(" ")
                        ? "bg-primary-soft font-semibold text-primary"
                        : "text-ink-2 hover:bg-ground"
                    }`}
                  >
                    {s.label}
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-full bg-primary px-5 py-3 text-[13px] font-semibold text-white shadow-[0_8px_24px_rgba(20,24,31,0.22)] transition hover:bg-primary-600"
      >
        {open ? "Hide screens" : "All screens"}
      </button>
    </div>
  );
}
