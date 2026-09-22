import { createContext, useContext, useMemo, useState } from "react";

const ROLES = ["Super Admin", "Admin", "Judge", "Volunteer"];
const RoleCtx = createContext(null);
const STORE = "gignite.role";

export function RoleProvider({ children }) {
  const [role, setRoleState] = useState(() => {
    try {
      return localStorage.getItem(STORE) ?? "Admin";
    } catch {
      return "Admin";
    }
  });

  const setRole = (r) => {
    setRoleState(r);
    try {
      localStorage.setItem(STORE, r);
    } catch {
      /* ignore */
    }
  };

  const value = useMemo(() => ({ role, setRole, roles: ROLES }), [role]);
  return <RoleCtx.Provider value={value}>{children}</RoleCtx.Provider>;
}

export function useRole() {
  const ctx = useContext(RoleCtx);
  if (!ctx) throw new Error("useRole must be used inside RoleProvider");
  return ctx;
}
