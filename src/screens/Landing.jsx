import { Link } from "react-router-dom";
import PublicShell from "../components/PublicShell";
import { tracks, whatNext, faq } from "../data/content";
import { auditLog } from "../data/content";
import { totals, registrationWindow, teams } from "../data/registrations";
import { Icon, TrackMark, TrackDot, RegistrationStatus, CountUp, CircuitField } from "../components/ui";
import { trackBy } from "../data/content";

const facts = [
  { k: "Team size", v: "2–5", note: "all from one college" },
  { k: "Stage 1", v: "A deck", note: "no prototype needed" },
  { k: "Open to", v: "Students", note: "across Kerala" },
  { k: "Entry", v: "Free", note: "one per team" },
];



const steps = [
  {
    t: "Register",
    b: "The team leader verifies their email, then adds everyone else. Nobody else needs an account.",
  },
  {
    t: "Submit an idea",
    b: "Four written answers and a deck. Those answers are your Stage 1 entry.",
  },
  {
    t: "Get judged",
    b: "Judges score five criteria. Shortlisted teams move to the build round.",
  },
];

const recentEntries = teams
  .map((t) => ({ name: t.name, theme: t.theme, when: t.submittedShort }))
  .slice(0, 3);

export default function Landing() {
  return (
    <PublicShell
      action={
        <Link
          to="/register"
          className="flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-[13.5px] font-medium text-white transition hover:bg-primary-600 sm:px-5"
        >
          Start free
          <Icon.arrow className="h-4 w-4" />
        </Link>
      }
    >
      {/* ---------- hero ---------- */}
      <section className="wash grain relative overflow-hidden border-b-[0.8px] border-line">
        <div className="wash-grid absolute inset-0" aria-hidden="true" />
        <CircuitField className="pointer-events-none absolute -bottom-6 left-1/2 h-[240px] w-[min(1100px,120%)] -translate-x-1/2" opacity={0.1} />
        <div className="relative px-4 pb-16 pt-14 text-center sm:px-6 sm:pb-20 sm:pt-20 xl:px-10">
          <nav className="flex items-center justify-center gap-2 text-[13px] text-ink-4">
            <span>Home</span>
            <Icon.chevron className="h-3.5 w-3.5 -rotate-90" />
            <span className="text-ink-3">gIGNITE 2026</span>
          </nav>

          <div className="mt-6 flex justify-center">
            <RegistrationStatus closesAt={registrationWindow.closesAt} status={registrationWindow.status} />
          </div>

          <h1 className="mx-auto mt-5 max-w-[16ch] text-[clamp(36px,7vw,72px)] font-bold leading-[1.02] tracking-[-0.04em]">
            Build something with AI
            <br className="hidden sm:block" />{" "}
            <span className="grad-text">that actually matters.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[58ch] text-[16.5px] leading-relaxed text-ink-3">
            A student hackathon for teams across Kerala. Pick a track, send us the idea, and if it
            is shortlisted you build it. No prototype required to enter — four honest answers and a
            deck.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/register"
              className="flex h-12 items-center gap-2.5 pressable rounded-full bg-primary px-7 text-[15px] font-medium text-white hover:bg-primary-600"
            >
              Register your team
              <Icon.arrow className="h-4 w-4" />
            </Link>
            <a
              href="#how"
              className="flex h-12 items-center pressable rounded-full border-[0.8px] border-line bg-paper px-7 text-[15px] font-medium text-ink-2 hover:bg-sunk"
            >
              See how it works
            </a>
          </div>

          <div className="mx-auto mt-12 max-w-[640px] rounded-[16px] border-[0.8px] border-line bg-paper/70 p-5 backdrop-blur">
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[14px]">
              <span className="bloom tnum text-[20px] font-semibold tracking-[-0.02em]">
                <CountUp value={totals.teams} duration={900} />
              </span>
              <span className="text-ink-3">
                {totals.teams === 1 ? "team has entered" : "teams have entered"} so far
              </span>
            </div>
            <ul className="mt-4 flex flex-col gap-2 border-t-[0.8px] border-line pt-4">
              {recentEntries.map((e) => (
                <li key={e.name} className="flex items-center gap-2.5 text-[12.5px] text-ink-3">
                  <TrackDot track={trackBy(e.theme)} />
                  <span className="font-medium text-ink-2">{e.name}</span>
                  <span className="truncate">entered {trackBy(e.theme).short}</span>
                  <span className="ml-auto shrink-0 text-ink-4">{e.when}</span>
                </li>
              ))}
            </ul>
          </div>

          <dl className="mx-auto mt-14 grid max-w-[900px] grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.k}>
                <dt className="lbl">{f.k}</dt>
                <dd className="mt-3 text-[26px] font-semibold leading-none tracking-[-0.03em]">
                  {f.v}
                </dd>
                <dd className="mt-2 text-[13px] text-ink-4">{f.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- tracks ---------- */}
      <section className="bg-ground px-4 py-16 sm:px-6 sm:py-20 xl:px-10">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="lbl">Five tracks</div>
            <h2 className="mt-3.5 text-[clamp(26px,3.6vw,40px)] font-semibold tracking-[-0.035em]">
              Pick the one your idea belongs to
            </h2>
          </div>
          <p className="max-w-[44ch] text-[14.5px] leading-relaxed text-ink-3">
            One track per entry. If nothing fits, the Open Innovation Track exists for exactly
            that.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {tracks.map((t, i) => (
            <article
              key={t.key}
              className="card liftable anim-rise group flex min-h-[210px] flex-col p-5"
              style={{ "--d": `${i * 70}ms` }}
            >
              <TrackMark track={t} />
              <h3 className="mt-auto pt-6 text-[17px] font-semibold leading-snug tracking-[-0.02em]">
                {t.short}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-3">{t.promise}</p>
              <span
                className="mt-4 h-[3px] w-10 rounded-full transition-all group-hover:w-16"
                style={{ background: `var(--color-viz-${t.hue})` }}
              />
            </article>
          ))}
        </div>
      </section>

      {/* ---------- how ---------- */}
      <section id="how" className="px-4 py-16 sm:px-6 sm:py-20 xl:px-10">
        <div className="lbl">How it works</div>
        <h2 className="mt-3.5 max-w-[22ch] text-[clamp(26px,3.6vw,40px)] font-semibold tracking-[-0.035em]">
          Three steps, and the first one takes a minute
        </h2>

        <ol className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.t} className="card anim-rise p-6" style={{ "--d": `${i * 80}ms` }}>
              <span
                className="grid h-8 w-8 place-items-center rounded-full text-[13px] font-semibold"
                style={{
                  background: "var(--color-primary-soft)",
                  color: "var(--color-primary)",
                }}
              >
                {i + 1}
              </span>
              <h3 className="mt-6 text-[18px] font-semibold tracking-[-0.02em]">{s.t}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-ink-3">{s.b}</p>
            </li>
          ))}
        </ol>

      </section>

      {/* ---------- what happens next ---------- */}
      <section className="bg-ground px-4 py-16 sm:px-6 sm:py-20 xl:px-10">
        <div className="lbl">After you submit</div>
        <h2 className="mt-3.5 max-w-[20ch] text-[clamp(26px,3.6vw,40px)] font-semibold tracking-[-0.035em]">
          What happens to your entry
        </h2>

        <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {whatNext.map((w, i) => (
            <li key={w.title} className="card anim-rise p-6" style={{ "--d": `${i * 80}ms` }}>
              <span className="lbl tnum">Step {i + 1}</span>
              <h3 className="mt-4 text-[17px] font-semibold leading-snug tracking-[-0.02em]">
                {w.title}
              </h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-ink-3">{w.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 xl:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <div className="lbl">Questions</div>
            <h2 className="mt-3.5 text-[clamp(26px,3.6vw,40px)] font-semibold tracking-[-0.035em]">
              The things teams ask first
            </h2>
            <p className="mt-4 max-w-[38ch] text-[14.5px] leading-relaxed text-ink-3">
              Still stuck? The organisers answer on the address your team leader verified.
            </p>
          </div>

          <div className="divide-y divide-line border-y-[0.8px] border-line">
            {faq.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center gap-4 text-[15.5px] font-medium marker:content-none">
                  {f.q}
                  <Icon.chevron className="ml-auto h-4 w-4 shrink-0 text-ink-4 transition-transform duration-[var(--dur-base)] group-open:rotate-180" />
                </summary>
                <p className="mt-2.5 max-w-[62ch] text-[14px] leading-relaxed text-ink-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-20 xl:px-10">
        <div className="card flex flex-col gap-6 overflow-hidden p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h3 className="text-[24px] font-semibold tracking-[-0.03em]">Ready when you are.</h3>
            <p className="mt-2 text-[14.5px] text-ink-3">
              Save a draft at any point and finish later — nothing is lost.
            </p>
          </div>
          <Link
            to="/register"
            className="flex h-12 shrink-0 items-center gap-2.5 pressable rounded-full bg-primary px-7 text-[15px] font-medium text-white hover:bg-primary-600 sm:ml-auto"
          >
            Register your team
            <Icon.arrow className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PublicShell>
  );
}
