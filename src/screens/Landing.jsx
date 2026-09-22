import { Link } from "react-router-dom";
import PublicShell from "../components/PublicShell";
import { GigniteLogo } from "../components/Brand";
import { themes } from "../data/content";
import { Icon } from "../components/ui";

const facts = [
  { k: "Team size", v: "2–5", note: "all from one college" },
  { k: "Stage 1", v: "Deck", note: "no prototype needed" },
  { k: "Open to", v: "Students", note: "across Kerala" },
  { k: "Entry", v: "Free", note: "one entry per team" },
];

const steps = [
  { n: "Register", body: "The team leader verifies their email, then adds the rest of the team. Nobody else needs an account." },
  { n: "Submit an idea", body: "Four written answers and a deck. Those answers are your Stage 1 entry." },
  { n: "Get judged", body: "Judges score five criteria. Shortlisted teams move to the build round." },
];

export default function Landing() {
  return (
    <PublicShell
      action={
        <Link
          to="/register"
          className="flex min-h-[44px] items-center rounded-xl bg-orange px-4 text-[13px] font-bold text-white transition hover:bg-orange-2 sm:px-5 sm:text-[13.5px]"
        >
          Register your team
        </Link>
      }
    >
      {/* hero — full bleed, left aligned */}
      <section className="border-b border-line bg-paper">
        <div className="grid grid-cols-1 gap-12 px-4 py-12 sm:px-6 sm:py-16 xl:grid-cols-[1.25fr_1fr] xl:gap-20 xl:px-10 xl:py-24">
          <div>
            <span className="lbl">Kerala · 2026 · FISAT</span>
            <h1 className="mt-6 max-w-[17ch] text-[clamp(38px,6vw,76px)] font-extrabold leading-[0.96] tracking-[-0.028em]">
              Build something with AI that actually{" "}
              <span className="text-orange-2">matters.</span>
            </h1>
            <p className="mt-7 max-w-[58ch] text-[17px] leading-relaxed text-ink-2">
              gIGNITE 2026 is a student hackathon for teams across Kerala. Pick a theme, send us the
              idea, and if it is shortlisted you build it. No prototype required to enter — just four
              honest answers and a deck.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/register"
                className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2.5 rounded-xl bg-ink px-6 text-[15px] font-bold text-white transition hover:bg-ink/90 sm:flex-none"
              >
                Register your team
                <Icon.arrow className="h-4.5 w-4.5" />
              </Link>
              <a
                href="#how"
                className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl border border-line px-5 text-[15px] font-medium text-ink-2 transition hover:border-ink-3/40 sm:flex-none"
              >
                How it works
              </a>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 sm:mt-14 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-7">
              {facts.map((f) => (
                <div key={f.k}>
                  <dt className="lbl">{f.k}</dt>
                  <dd className="mt-2.5 text-[26px] font-extrabold leading-none tracking-[-0.018em]">
                    {f.v}
                  </dd>
                  <dd className="mt-1.5 text-[12.5px] text-ink-3">{f.note}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col justify-between gap-6">
            <div className="rounded-2xl bg-navy p-6 text-white sm:p-9">
              <GigniteLogo size="lg" className="brightness-0 invert" />
              <p className="mt-7 text-[15px] leading-relaxed text-white/75">
                Fueling India's AI future — run by the FISAT IEEE Student Branch with the IEEE Signal
                Processing Society Kerala Chapter, and powered by Gadgeon.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-ground p-6 sm:p-7">
              <span className="lbl">Registration</span>
              <p className="mt-3 flex items-center gap-2.5 text-[17px] font-bold">
                <span className="h-2.5 w-2.5 rounded-full bg-shl" />
                Open now
              </p>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-2">
                Entries close when the organisers close the window. Start early — you can save a
                draft and come back.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* themes */}
      <section className="border-b border-line px-4 py-12 sm:px-6 sm:py-16 xl:px-10 xl:py-20">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="lbl">Five tracks</span>
            <h2 className="mt-4 text-[clamp(26px,3.4vw,40px)] font-extrabold tracking-[-0.022em]">
              Pick the one your idea belongs to
            </h2>
          </div>
          <p className="max-w-[46ch] text-[14px] leading-relaxed text-ink-2">
            One theme per entry. If nothing fits, the Open Innovation Track exists for exactly that.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {themes.map((t, i) => (
            <article
              key={t}
              className="flex min-h-[124px] flex-col rounded-2xl border border-line bg-paper p-5 transition hover:border-navy/40 sm:min-h-[188px] sm:p-6"
            >
              <span className="tnum font-mono text-[11px] text-ink-3">0{i + 1}</span>
              <h3 className="mt-auto text-[19px] font-bold leading-tight tracking-[-0.014em]">
                {t.replace("AI for ", "")}
              </h3>
              {t.startsWith("AI for") && (
                <span className="mt-2 text-[12.5px] text-ink-3">AI for …</span>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* how */}
      <section id="how" className="px-4 py-12 sm:px-6 sm:py-16 xl:px-10 xl:py-20">
        <span className="lbl">How it works</span>
        <h2 className="mt-4 max-w-[20ch] text-[clamp(26px,3.4vw,40px)] font-extrabold tracking-[-0.022em]">
          Three steps, and the first one takes a minute
        </h2>

        <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.n} className="bg-paper p-6 sm:p-8">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-navy font-mono text-[13px] font-semibold text-white">
                {i + 1}
              </span>
              <h3 className="mt-6 text-[20px] font-bold tracking-[-0.014em]">{s.n}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-2">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col gap-6 rounded-2xl bg-ink px-6 py-7 text-white sm:flex-row sm:flex-wrap sm:items-center sm:gap-5 sm:px-8 sm:py-8">
          <div>
            <h3 className="text-[22px] font-extrabold tracking-[-0.018em]">Ready when you are.</h3>
            <p className="mt-2 text-[14px] text-white/70">
              You can save a draft at any point and finish later.
            </p>
          </div>
          <Link
            to="/register"
            className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl bg-orange px-6 text-[15px] font-bold text-white transition hover:bg-orange-2 sm:ml-auto"
          >
            Register your team
            <Icon.arrow className="h-4.5 w-4.5" />
          </Link>
        </div>
      </section>
    </PublicShell>
  );
}
