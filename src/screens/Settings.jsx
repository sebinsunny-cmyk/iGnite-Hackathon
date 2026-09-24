import { useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "../components/AppShell";
import { registrationWindow } from "../data/registrations";
import { Icon } from "../components/ui";

export default function Settings() {
  const [status, setStatus] = useState(registrationWindow.status);

  return (
    <AppShell>
      <nav className="flex items-center gap-2 text-[13px] text-ink-3">
        <Link to="/dashboard" className="hover:text-ink-2">
          Registrations
        </Link>
        <span>/</span>
        <span className="font-medium text-ink-2">Registration window</span>
      </nav>

      <header className="mt-5 pb-8">
        <h1 className="text-[27px] font-extrabold leading-none tracking-[-0.022em] sm:text-[34px]">
          Registration window
        </h1>
        <p className="mt-3 max-w-[70ch] text-[14.5px] leading-relaxed text-ink-2">
          {registrationWindow.blurb}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section className="rounded-[16px] border-[0.8px] border-line bg-paper p-5 sm:p-7 xl:p-9">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="lbl">Status</span>
              <div className="flex w-full max-w-[380px] gap-1 rounded-[11px] border-[0.8px] border-line bg-ground p-1">
                {["Open", "Closed"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`flex flex-1 items-center justify-center gap-2.5 rounded-[10px] px-4 py-3 text-[14.5px] transition ${
                      status === s
                        ? "bg-paper font-bold shadow-[0_1px_3px_rgba(20,24,31,0.08)]"
                        : "text-ink-2 hover:text-ink"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        status === s ? (s === "Open" ? "bg-shl" : "bg-rej") : "bg-line"
                      }`}
                    />
                    {s}
                  </button>
                ))}
              </div>
              <p className="text-[12.5px] text-ink-3">
                {status === "Open"
                  ? "Teams can submit new entries at /register right now."
                  : "New entries are blocked. Drafts already started stay editable until the deadline."}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="closes-at" className="lbl">
                Closes at (optional)
              </label>
              <input
                id="closes-at"
                type="datetime-local"
                className="w-full max-w-[380px] rounded-[11px] border-[0.8px] border-line px-4 py-3 text-[15px] outline-none transition focus:border-primary"
              />
              <p className="text-[12.5px] text-ink-3">{registrationWindow.closesAtHelp}</p>
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="closed-message" className="lbl">
                Closed message (optional)
              </label>
              <textarea
                id="closed-message"
                rows={3}
                placeholder={registrationWindow.closedMessagePlaceholder}
                className="w-full resize-y rounded-[11px] border-[0.8px] border-line px-4 py-3.5 text-[15px] leading-relaxed outline-none transition placeholder:text-ink-3 focus:border-primary"
              />
              <p className="text-[12.5px] text-ink-3">{registrationWindow.closedMessageHelp}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t-[0.8px] border-line pt-7">
              <button className="min-h-[48px] w-full rounded-full bg-primary px-6 text-[14.5px] font-bold text-white transition hover:bg-primary-600 sm:w-auto">
                Save
              </button>
              <Link
                to="/register/closed"
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[11px] border-[0.8px] border-line px-5 text-[14.5px] font-medium text-ink-2 transition hover:border-line-2 sm:w-auto"
              >
                Preview the closed page
                <Icon.arrow className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <aside className="rounded-[16px] border-[0.8px] border-line bg-paper p-5 sm:p-7">
          <span className="lbl">Right now</span>
          <p className="mt-4 flex items-center gap-3 text-[20px] font-extrabold tracking-[-0.018em]">
            <span className={`h-3 w-3 rounded-full ${status === "Open" ? "bg-shl" : "bg-rej"}`} />
            {status}
          </p>
          <p className="mt-3 text-[13.5px] leading-relaxed text-ink-2">
            No scheduled closing date is set, so the window stays as it is until someone changes it
            here.
          </p>
          <p className="mt-6 border-t-[0.8px] border-line-2 pt-5 text-[12.5px] leading-relaxed text-ink-3">
            Changing this is written to the audit log with your name against it.
          </p>
        </aside>
      </div>
    </AppShell>
  );
}
