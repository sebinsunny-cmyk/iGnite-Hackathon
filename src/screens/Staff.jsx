import AppShell from "../components/AppShell";
import { staffMembers } from "../data/content";
import { Avatar, Icon } from "../components/ui";
import { useRole } from "../state/role";
import { Link } from "react-router-dom";

const roleTone = {
  "Super Admin": "bg-sub-soft text-sub",
  Admin: "bg-sub-soft text-sub",
  Judge: "bg-shl-soft text-shl",
  Volunteer: "bg-rev-soft text-rev",
};

export default function Staff() {
  const { role } = useRole();

  if (role !== "Super Admin") return <Denied />;

  return (
    <AppShell>
      <div className="flex flex-wrap items-end justify-between gap-5 pb-8">
        <div>
          <h1 className="text-[27px] font-extrabold leading-none tracking-[-0.022em] sm:text-[34px]">Staff</h1>
          <p className="mt-2.5 max-w-[60ch] text-[14px] text-ink-2">
            Organisers, judges and volunteers. Accounts are created here — there is no public
            sign-up for staff.
          </p>
        </div>
        <button className="min-h-[48px] w-full rounded-full bg-primary px-5 text-[14px] font-bold text-white transition hover:bg-primary-600 sm:w-auto">
          Create account
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <section className="overflow-hidden rounded-[16px] border-[0.8px] border-line bg-paper">
          <div className="border-b-[0.8px] border-line px-5 py-4 sm:px-7">
            <span className="text-[13px] text-ink-4">{staffMembers.length} accounts</span>
          </div>
          <div className="divide-y divide-line-2">
            {staffMembers.map((s) => (
              <div
                key={s.email}
                className="flex flex-wrap items-center gap-x-5 gap-y-3 px-5 py-5 transition hover:bg-ground/50 sm:px-7 sm:gap-x-6"
              >
                <Avatar
                  initials={s.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                  size={38}
                />
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold">{s.name}</p>
                  <p className="mt-0.5 font-mono text-[12px] text-ink-3">{s.email}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.07em] ${roleTone[s.role]}`}
                >
                  {s.role}
                </span>
                <span className="w-full text-[13px] text-ink-4 sm:ml-auto sm:w-auto">Added {s.added}</span>
                <button className="min-h-[44px] w-full rounded-[10px] border-[0.8px] border-line px-3.5 text-[13px] font-medium text-ink-2 transition hover:border-line-2 sm:w-auto">
                  Reset password
                </button>
              </div>
            ))}
          </div>
        </section>

        <aside className="flex flex-col gap-4">
          <section className="rounded-[16px] border-[0.8px] border-line bg-paper p-5 sm:p-7">
            <span className="lbl">Create an account</span>
            <form className="mt-5 flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label htmlFor="new-name" className="lbl">
                  Name
                </label>
                <input
                  id="new-name"
                  placeholder="Full name"
                  className="rounded-[11px] border-[0.8px] border-line px-4 py-3 text-[14.5px] outline-none transition placeholder:text-ink-3 focus:border-primary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="new-email" className="lbl">
                  Email
                </label>
                <input
                  id="new-email"
                  type="email"
                  placeholder="name@fisat.ac.in"
                  className="rounded-[11px] border-[0.8px] border-line px-4 py-3 text-[14.5px] outline-none transition placeholder:text-ink-3 focus:border-primary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="new-role" className="lbl">
                  Role
                </label>
                <select
                  id="new-role"
                  defaultValue="Judge"
                  className="rounded-[11px] border-[0.8px] border-line bg-paper px-4 py-3 text-[14.5px] outline-none focus:border-primary"
                >
                  {["Super Admin", "Admin", "Judge", "Volunteer"].map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
              <button className="mt-1 rounded-full bg-primary px-5 py-3 text-[14.5px] font-bold text-white transition hover:bg-primary-600">
                Send invitation
              </button>
              <p className="text-[12.5px] leading-relaxed text-ink-3">
                They receive a sign-in link and set their own password. Every account created is
                written to the audit log.
              </p>
            </form>
          </section>

          <section className="rounded-[16px] bg-primary p-5 text-white sm:p-7">
            <span className="lbl !text-white/55">What each role sees</span>
            <dl className="mt-5 flex flex-col gap-4 text-[13.5px] leading-relaxed">
              <div>
                <dt className="font-semibold">Super Admin</dt>
                <dd className="mt-1 text-white/70">Everything, plus staff accounts and audit logs.</dd>
              </div>
              <div>
                <dt className="font-semibold">Admin</dt>
                <dd className="mt-1 text-white/70">Registrations, judging assignment, exports.</dd>
              </div>
              <div>
                <dt className="font-semibold">Judge</dt>
                <dd className="mt-1 text-white/70">Only the submissions assigned to them.</dd>
              </div>
              <div>
                <dt className="font-semibold">Volunteer</dt>
                <dd className="mt-1 text-white/70">Look-up only, for the venue floor.</dd>
              </div>
            </dl>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}

export function Denied() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[52ch] rounded-[16px] border-[0.8px] border-dashed border-line bg-paper px-8 py-20 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-rev-soft">
          <Icon.settings className="h-5 w-5 text-rev" />
        </span>
        <h1 className="mt-6 text-[24px] font-extrabold tracking-[-0.018em]">
          Super Admin only
        </h1>
        <p className="mt-3 text-[14.5px] leading-relaxed text-ink-2">
          This page is restricted. Switch the preview role in the header to Super Admin to see it, or
          go back to registrations.
        </p>
        <Link
          to="/dashboard"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-[14px] font-bold text-white transition hover:bg-primary-600"
        >
          Back to registrations
          <Icon.arrow className="h-4 w-4" />
        </Link>
      </div>
    </AppShell>
  );
}
