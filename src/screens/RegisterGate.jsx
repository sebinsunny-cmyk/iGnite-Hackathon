import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PublicShell from "../components/PublicShell";
import { Icon } from "../components/ui";

export default function RegisterGate() {
  const [mode, setMode] = useState("choose"); // choose | email | sent
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <PublicShell bare>
      <div className="grid grid-cols-1 gap-10 px-4 py-12 sm:gap-14 sm:px-6 sm:py-16 xl:grid-cols-[1fr_1fr] xl:gap-24 xl:px-10 xl:py-24">
        <div>
          <span className="lbl">Step zero</span>
          <h1 className="mt-5 max-w-[16ch] text-[clamp(32px,4.6vw,56px)] font-extrabold leading-[1.02] tracking-[-0.014em]">
            Sign in to register your team
          </h1>
          <p className="mt-6 max-w-[54ch] text-[16px] leading-relaxed text-ink-2">
            The team leader verifies their email with Google or a sign-in link, so we know it is
            really theirs. Everyone else on the team is added by the leader — they do not need an
            account.
          </p>

          <ul className="mt-10 flex flex-col gap-4">
            {[
              "One account per team, held by the leader",
              "Your progress saves as you go",
              "You can finish the entry later from the same link",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-[14.5px] text-ink-2">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-shl-soft">
                  <Icon.check className="h-3 w-3 text-shl" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[16px] border-[0.8px] border-line bg-paper p-6 sm:p-8 xl:p-10">
          {mode === "sent" ? (
            <div>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-shl-soft">
                <Icon.check className="h-5 w-5 text-shl" />
              </span>
              <h2 className="mt-6 text-[24px] font-extrabold tracking-[-0.018em]">Check your inbox</h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink-2">
                We sent a sign-in link to{" "}
                <span className="font-semibold text-ink">{email || "your email"}</span>. The link
                works once and expires in 15 minutes.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <button
                  onClick={() => navigate("/register/entry")}
                  className="min-h-[52px] rounded-full bg-primary px-5 text-[15px] font-bold text-white transition hover:bg-primary-600"
                >
                  Open the link (prototype)
                </button>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px]">
                  <span className="text-ink-3">Resend available in 0:42</span>
                  <button
                    onClick={() => setMode("email")}
                    className="font-medium text-sub hover:underline"
                  >
                    Use a different email
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-[24px] font-extrabold tracking-[-0.018em]">Sign in to register</h2>
              <p className="mt-2.5 text-[14px] text-ink-2">
                Use the address you check most — everything about your entry goes there.
              </p>

              <button
                onClick={() => navigate("/register/entry")}
                className="mt-8 flex min-h-[52px] w-full items-center justify-center gap-3 rounded-[11px] border-[0.8px] border-line px-5 text-[15px] font-semibold transition hover:border-line-2"
              >
                <GoogleG />
                Continue with Google
              </button>

              {mode === "choose" ? (
                <>
                  <Divider />
                  <button
                    onClick={() => setMode("email")}
                    className="flex min-h-[52px] w-full items-center justify-center rounded-[11px] border-[0.8px] border-line px-5 text-[15px] font-semibold transition hover:border-line-2"
                  >
                    Continue with email
                  </button>
                </>
              ) : (
                <>
                  <Divider />
                  <form
                    className="flex flex-col gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setMode("sent");
                    }}
                  >
                    <div className="flex flex-col gap-2">
                      <label htmlFor="gate-email" className="lbl">
                        Email
                      </label>
                      <input
                        id="gate-email"
                        type="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@college.edu"
                        className="rounded-[11px] border-[0.8px] border-line px-4 py-3 text-[15px] outline-none transition placeholder:text-ink-3 focus:border-primary"
                      />
                    </div>
                    <button
                      type="submit"
                      className="min-h-[52px] rounded-full bg-primary px-5 text-[15px] font-bold text-white transition hover:bg-primary-600"
                    >
                      Send sign-in link
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode("choose")}
                      className="text-[13.5px] font-medium text-ink-3 transition hover:text-ink-2"
                    >
                      Back
                    </button>
                  </form>
                </>
              )}

              <p className="mt-8 border-t-[0.8px] border-line pt-6 text-[13px] text-ink-3">
                Organiser, judge or volunteer?{" "}
                <Link to="/login" className="font-medium text-sub hover:underline">
                  Staff sign-in
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </PublicShell>
  );
}

function Divider() {
  return (
    <div className="my-6 flex items-center gap-4">
      <span className="h-px flex-1 bg-line" />
      <span className="lbl">or</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2.5 24 .5 14.6.5 6.5 5.9 2.6 13.7l7.8 6.1C12.3 13.9 17.6 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 6.9-10 6.9-17.3z" />
      <path fill="#FBBC05" d="M10.4 28.2c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.8-6.1C1 15.9 0 19.8 0 23.5s1 7.6 2.6 10.8l7.8-6.1z" />
      <path fill="#34A853" d="M24 47.5c6.2 0 11.5-2 15.4-5.6l-7.5-5.8c-2.1 1.4-4.8 2.2-7.9 2.2-6.4 0-11.7-4.4-13.6-10.3l-7.8 6.1C6.5 42.1 14.6 47.5 24 47.5z" />
    </svg>
  );
}
