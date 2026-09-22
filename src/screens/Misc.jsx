import { Link } from "react-router-dom";
import PublicShell from "../components/PublicShell";
import { GigniteLogo } from "../components/Brand";
import { Icon } from "../components/ui";
import { closedMessage } from "../data/content";
import { Field } from "./StaffLogin";

/* ---------------- registration closed ---------------- */

export function RegisterClosed() {
  return (
    <PublicShell bare>
      <div className="grid grid-cols-1 items-center gap-10 px-4 py-14 sm:gap-14 sm:px-6 sm:py-20 xl:grid-cols-[1.1fr_1fr] xl:gap-24 xl:px-10 xl:py-28">
        <div>
          <span className="inline-flex items-center gap-2.5 rounded-full bg-rej-soft px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-rej">
            <span className="h-2 w-2 rounded-full bg-rej" />
            Registration closed
          </span>
          <h1 className="mt-8 max-w-[16ch] text-[clamp(32px,4.8vw,60px)] font-extrabold leading-[1.0] tracking-[-0.028em]">
            {closedMessage}
          </h1>
          <p className="mt-6 max-w-[54ch] text-[16.5px] leading-relaxed text-ink-2">
            Entries are no longer being accepted. Teams that already submitted keep their place —
            judging results go out by email to the team leader.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/"
              className="flex min-h-[52px] items-center justify-center rounded-full bg-ink px-5 text-[15px] font-bold text-white transition hover:bg-ink/90"
            >
              Back to gIGNITE
            </Link>
            <Link
              to="/login"
              className="flex min-h-[52px] items-center justify-center rounded-[11px] border-[0.8px] border-line px-5 text-[15px] font-medium text-ink-2 transition hover:border-line-2"
            >
              Staff sign-in
            </Link>
          </div>
        </div>

        <div className="rounded-[16px] bg-ink p-6 text-white sm:p-10">
          <GigniteLogo size="lg" className="brightness-0 invert" />
          <p className="mt-8 text-[15.5px] leading-relaxed text-white/75">
            Already registered? Nothing more to do. Watch the inbox of the address your team leader
            verified — that is where everything lands.
          </p>
        </div>
      </div>
    </PublicShell>
  );
}

/* ---------------- 404 ---------------- */

export function NotFound() {
  return (
    <PublicShell>
      <div className="flex flex-col items-start gap-7 px-4 py-16 sm:gap-8 sm:px-6 sm:py-24 xl:px-10 xl:py-32">
        <span className="tnum font-mono text-[13px] tracking-[0.14em] text-ink-3">404</span>
        <h1 className="max-w-[15ch] text-[clamp(38px,6vw,84px)] font-extrabold leading-[0.96] tracking-[-0.018em]">
          Page not found
        </h1>
        <p className="max-w-[52ch] text-[16.5px] leading-relaxed text-ink-2">
          That address does not exist. If you were partway through an entry, it is still saved —
          head back to registration and pick up where you left off.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/register"
            className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-ink px-6 text-[15px] font-bold text-white transition hover:bg-ink/90"
          >
            Go to registration
            <Icon.arrow className="h-4.5 w-4.5" />
          </Link>
          <Link
            to="/"
            className="flex min-h-[52px] items-center justify-center rounded-[11px] border-[0.8px] border-line px-5 text-[15px] font-medium text-ink-2 transition hover:border-line-2"
          >
            Home
          </Link>
        </div>
      </div>
    </PublicShell>
  );
}

/* ---------------- reset password ---------------- */

export function ResetPassword() {
  return (
    <PublicShell bare>
      <div className="grid grid-cols-1 gap-10 px-4 py-14 sm:gap-14 sm:px-6 sm:py-20 xl:grid-cols-2 xl:gap-24 xl:px-10 xl:py-28">
        <div>
          <h1 className="max-w-[16ch] text-[clamp(30px,4.2vw,52px)] font-extrabold leading-[1.02] tracking-[-0.026em]">
            Reset your staff password
          </h1>
          <p className="mt-6 max-w-[52ch] text-[16px] leading-relaxed text-ink-2">
            Enter the address your account uses. If it exists, we send a reset link that works once
            and expires in 30 minutes.
          </p>
          <p className="mt-8 text-[13.5px] text-ink-3">
            Participants do not have passwords — if you are registering a team,{" "}
            <Link to="/register" className="font-medium text-sub hover:underline">
              sign in here instead
            </Link>
            .
          </p>
        </div>

        <div className="rounded-[16px] border-[0.8px] border-line bg-paper p-6 sm:p-8 xl:p-10">
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <Field id="reset-email" label="Email" type="email" placeholder="you@fisat.ac.in" />
            <button className="flex min-h-[52px] items-center justify-center rounded-full bg-ink px-5 text-[15px] font-bold text-white transition hover:bg-ink/90">
              Send reset link
            </button>
            <Link
              to="/login"
              className="text-center text-[13.5px] font-medium text-ink-3 transition hover:text-ink-2"
            >
              Back to sign-in
            </Link>
          </form>
        </div>
      </div>
    </PublicShell>
  );
}
