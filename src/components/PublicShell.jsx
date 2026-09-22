import { Link, useLocation } from "react-router-dom";
import { PartnerBand } from "./Brand";
import { Icon } from "./ui";

const NAV = [
  { to: "/", label: "Overview" },
  { to: "/register", label: "Register" },
  { to: "/register/entry", label: "How it works" },
];

export default function PublicShell({ children, action = null, bare = false }) {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-full flex-col bg-paper">
      <header className="sticky top-0 z-30 border-b-[0.8px] border-line bg-paper/85 backdrop-blur">
        <div className="flex items-center gap-4 px-4 py-3 sm:gap-7 sm:px-6 xl:px-10">
          <Link to="/" aria-label="gIGNITE 2026 home" className="flex shrink-0 items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-ink">
              <Icon.board className="h-4 w-4 text-white" />
            </span>
            <span className="text-[16.5px] font-semibold tracking-[-0.02em]">gIGNITE</span>
          </Link>

          {!bare && (
            <nav className="hidden gap-6 md:flex">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`text-[14px] transition ${
                    pathname === n.to ? "font-medium text-ink" : "text-ink-3 hover:text-ink"
                  }`}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          )}

          <div className="ml-auto flex items-center gap-2 sm:gap-2.5">
            {action}
            {!bare && (
              <Link
                to="/login"
                className="flex h-10 items-center gap-2 rounded-full border-[0.8px] border-line px-4 text-[13.5px] font-medium text-ink-2 transition hover:bg-sunk"
              >
                <Icon.logout className="hidden h-4 w-4 sm:block" />
                <span className="sm:hidden">Staff</span>
                <span className="hidden sm:inline">Staff sign-in</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <PartnerBand />
    </div>
  );
}
