import { Link } from "react-router-dom";
import PublicShell from "../components/PublicShell";
import { themes } from "../data/content";
import { Icon } from "../components/ui";

const facts = [
  { k: "Team size", v: "2–5", note: "all from one college" },
  { k: "Stage 1", v: "A deck", note: "no prototype needed" },
  { k: "Open to", v: "Students", note: "across Kerala" },
  { k: "Entry", v: "Free", note: "one per team" },
];

const tints = ["orange", "pink", "purple", "blue", "green"];

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

export default function Landing() {
  return (
    <PublicShell
      action={
        <Link
          to="/register"
          className="flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-[13.5px] font-medium text-white transition hover:bg-ink/90 sm:px-5"
        >
          Start free
          <Icon.arrow className="h-4 w-4" />
        </Link>
      }
    >
      {/* ---------- hero ---------- */}
      <section className="wash relative overflow-hidden border-b-[0.8px] border-line">
        <div className="wash-grid absolute inset-0" aria-hidden="true" />
        <div className="relative px-4 pb-16 pt-14 text-center sm:px-6 sm:pb-20 sm:pt-20 xl:px-10">
          <nav className="flex items-center justify-center gap-2 text-[13px] text-ink-4">
            <span>Home</span>
            <Icon.chevron className="h-3.5 w-3.5 -rotate-90" />
            <span className="text-ink-3">gIGNITE 2026</span>
          </nav>

          <div className="lbl mt-6" style={{ color: "var(--color-viz-pink)" }}>
            Kerala · FISAT
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
              className="flex h-12 items-center gap-2.5 rounded-full bg-ink px-7 text-[15px] font-medium text-white transition hover:bg-ink/90"
            >
              Register your team
              <Icon.arrow className="h-4 w-4" />
            </Link>
            <a
              href="#how"
              className="flex h-12 items-center rounded-full border-[0.8px] border-line bg-paper px-7 text-[15px] font-medium text-ink-2 transition hover:bg-sunk"
            >
              See how it works
            </a>
          </div>

          <dl className="mx-auto mt-16 grid max-w-[900px] grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
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
          {themes.map((t, i) => (
            <article key={t} className="card flex min-h-[176px] flex-col p-5">
              <span
                className="grid h-10 w-10 place-items-center rounded-[11px]"
                style={{ background: `var(--color-tint-${tints[i]})` }}
              >
                <span
                  className="h-[9px] w-[9px] rounded-full"
                  style={{ background: `var(--color-viz-${tints[i]})` }}
                />
              </span>
              <h3 className="mt-auto pt-6 text-[17px] font-semibold leading-snug tracking-[-0.02em]">
                {t.replace("AI for ", "")}
              </h3>
              <p className="mt-1.5 text-[13px] text-ink-4">
                {t.startsWith("AI for") ? "AI for …" : "Anything else"}
              </p>
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
            <li key={s.t} className="card p-6">
              <span
                className="grid h-8 w-8 place-items-center rounded-full text-[13px] font-semibold"
                style={{
                  background: `var(--color-tint-${tints[i]})`,
                  color: `var(--color-on-${tints[i] === "blue" ? "purple" : tints[i]})`,
                }}
              >
                {i + 1}
              </span>
              <h3 className="mt-6 text-[18px] font-semibold tracking-[-0.02em]">{s.t}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-ink-3">{s.b}</p>
            </li>
          ))}
        </ol>

        <div className="card mt-6 flex flex-col gap-6 overflow-hidden p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h3 className="text-[24px] font-semibold tracking-[-0.03em]">Ready when you are.</h3>
            <p className="mt-2 text-[14.5px] text-ink-3">
              Save a draft at any point and finish later — nothing is lost.
            </p>
          </div>
          <Link
            to="/register"
            className="flex h-12 shrink-0 items-center gap-2.5 rounded-full bg-ink px-7 text-[15px] font-medium text-white transition hover:bg-ink/90 sm:ml-auto"
          >
            Register your team
            <Icon.arrow className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PublicShell>
  );
}
