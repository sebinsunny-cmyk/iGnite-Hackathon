import { Link } from "react-router-dom";
import { GigniteLogo, PartnerBand } from "./Brand";

export default function PublicShell({ children, action = null, bare = false }) {
  return (
    <div className="flex min-h-full flex-col bg-ground">
      <header className="border-b border-line bg-paper">
        <div className="flex items-center gap-3 px-4 py-3.5 sm:gap-6 sm:px-6 sm:py-5 xl:px-10">
          <Link to="/" aria-label="gIGNITE 2026 home" className="shrink-0">
            <GigniteLogo className="h-10 sm:h-14 lg:h-20" />
          </Link>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            {action}
            {!bare && (
              <Link
                to="/login"
                className="flex min-h-[44px] items-center rounded-xl border border-line px-3.5 text-[13px] font-medium text-ink-2 transition hover:border-ink-3/40 sm:px-4 sm:text-[13.5px]"
              >
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
