import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PublicShell from "../components/PublicShell";
import { Icon, InfoTip, TrackMark } from "../components/ui";
import {
  wizardSteps,
  tracks,
  colleges,
  districts,
  years,
  branches,
  teamRoles,
  ideaFields,
  declarations,
  uploadRules,
} from "../data/content";

export default function RegisterWizard() {
  const [step, setStep] = useState(1);
  const [theme, setTheme] = useState(tracks[3].name);
  const [members, setMembers] = useState([{ id: 1 }, { id: 2 }]);
  const [checks, setChecks] = useState({});
  const [done, setDone] = useState(false);

  const required = declarations.filter((d) => d.required);
  const allChecked = required.every((d) => checks[d.key]);

  if (done) return <Submitted theme={theme} />;

  return (
    <PublicShell
      bare
      action={
        <span className="flex items-center gap-2.5 rounded-[11px] bg-shl-soft px-3.5 py-2 text-[13px] font-medium text-shl">
          <Icon.check className="h-3.5 w-3.5" />
          Saved just now
        </span>
      }
    >
      <div className="grid grid-cols-1 xl:grid-cols-[280px_minmax(0,1fr)_300px]">
        {/* ---- step rail ---- */}
        <aside className="border-b-[0.8px] border-line bg-paper px-4 py-4 sm:px-6 sm:py-5 xl:border-b-0 xl:border-r xl:px-8 xl:py-10">
          <span className="lbl hidden xl:block">Your entry</span>

          {/* phone / tablet: a compact horizontal stepper that never pushes the form down */}
          <ol className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 xl:hidden">
            {wizardSteps.map((s) => {
              const state = s.n < step ? "done" : s.n === step ? "now" : "todo";
              return (
                <li key={s.key} className="shrink-0">
                  <button
                    onClick={() => setStep(s.n)}
                    aria-current={state === "now" ? "step" : undefined}
                    className={`flex min-h-[44px] items-center gap-2.5 rounded-full border px-3.5 text-[13.5px] transition ${
                      state === "now"
                        ? "border-viz-purple bg-sub-soft font-semibold text-sub"
                        : state === "done"
                          ? "border-line bg-paper text-ink-2"
                          : "border-line bg-paper text-ink-3"
                    }`}
                  >
                    <span
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full font-mono text-[10px] font-semibold ${
                        state === "done"
                          ? "bg-shl text-white"
                          : state === "now"
                            ? "bg-primary text-white"
                            : "border-[0.8px] border-line text-ink-3"
                      }`}
                    >
                      {state === "done" ? <Icon.check className="h-3 w-3" /> : s.n}
                    </span>
                    {s.title}
                  </button>
                </li>
              );
            })}
          </ol>

          {/* desktop: the full rail with hints */}
          <ol className="mt-6 hidden flex-col gap-1 xl:flex">
            {wizardSteps.map((s) => {
              const state = s.n < step ? "done" : s.n === step ? "now" : "todo";
              return (
                <li key={s.key}>
                  <button
                    onClick={() => setStep(s.n)}
                    className={`flex w-full items-start gap-3.5 rounded-[11px] px-3 py-3 text-left transition ${
                      state === "now" ? "bg-ground" : "hover:bg-ground/60"
                    }`}
                  >
                    <span
                      className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full font-mono text-[12px] font-semibold ${
                        state === "done"
                          ? "bg-shl text-white"
                          : state === "now"
                            ? "bg-primary text-white"
                            : "border-[0.8px] border-line text-ink-3"
                      }`}
                    >
                      {state === "done" ? <Icon.check className="h-3.5 w-3.5" /> : s.n}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block text-[14.5px] ${
                          state === "todo" ? "text-ink-3" : "font-semibold text-ink"
                        }`}
                      >
                        {s.title}
                      </span>
                      <span className="mt-1 block text-[12.5px] leading-snug text-ink-3">
                        {s.hint}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="mt-8 hidden rounded-[11px] border-[0.8px] border-line bg-ground p-5 xl:block">
            <p className="text-[13px] font-semibold">Saves as you go</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-ink-2">
              Close the tab and come back from the same link — nothing is lost, and you can edit any
              step until you submit.
            </p>
          </div>
        </aside>

        {/* ---- form ---- */}
        <section className="px-4 py-8 sm:px-6 sm:py-10 xl:px-12">
          <div className="flex flex-wrap items-baseline gap-4">
            <span className="lbl">Step {step} of 4</span>
            <div className="flex flex-1 gap-1.5">
              {wizardSteps.map((s) => (
                <span
                  key={s.key}
                  className={`h-1 flex-1 rounded-full ${s.n <= step ? "bg-primary" : "bg-line"}`}
                />
              ))}
            </div>
          </div>

          <h1 className="mt-6 text-[clamp(28px,3.6vw,42px)] font-extrabold tracking-[-0.014em]">
            {wizardSteps[step - 1].title}
          </h1>

          <div className="mt-9">
            {step === 1 && <StepTeam theme={theme} setTheme={setTheme} />}
            {step === 2 && <StepMembers members={members} setMembers={setMembers} />}
            {step === 3 && <StepIdea />}
            {step === 4 && (
              <StepDeclare theme={theme} members={members} checks={checks} setChecks={setChecks} />
            )}
          </div>

          <div className="safe-b sticky bottom-0 z-20 -mx-4 mt-10 flex flex-wrap items-center gap-2.5 border-t-[0.8px] border-line bg-paper/95 px-4 pt-3 backdrop-blur sm:-mx-6 sm:px-6 xl:static xl:mx-0 xl:mt-12 xl:gap-3 xl:bg-transparent xl:px-0 xl:pb-0 xl:pt-7 xl:backdrop-blur-none">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="min-h-[48px] rounded-[11px] border-[0.8px] border-line px-5 text-[14.5px] font-medium text-ink-2 transition hover:border-line-2"
              >
                Back
              </button>
            )}
            <button className="min-h-[48px] rounded-[11px] border-[0.8px] border-line px-5 text-[14.5px] font-medium text-ink-2 transition hover:border-line-2">
              Save draft
            </button>
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="ml-auto inline-flex min-h-[48px] flex-1 items-center justify-center gap-2.5 rounded-full bg-primary px-6 text-[14.5px] font-bold text-white transition hover:bg-primary-600 sm:flex-none"
              >
                Continue
                <Icon.arrow className="h-4 w-4" />
              </button>
            ) : (
              <button
                disabled={!allChecked}
                onClick={() => setDone(true)}
                className="ml-auto inline-flex min-h-[48px] flex-1 items-center justify-center gap-2.5 rounded-full bg-primary px-6 text-[14.5px] font-bold text-white transition enabled:hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-3 sm:flex-none"
              >
                Submit registration
                <Icon.arrow className="h-4 w-4" />
              </button>
            )}
          </div>
        </section>

        {/* ---- summary rail ---- */}
        <aside className="border-t-[0.8px] border-line bg-paper px-4 py-6 sm:px-6 sm:py-8 xl:border-l xl:border-t-0 xl:px-7 xl:py-10">
          <span className="lbl">Entry so far</span>
          <dl className="mt-5 flex flex-col gap-4 text-[13.5px]">
            <Sum k="Theme" v={theme} />
            <Sum k="Team size" v={`${members.length + 1} of 5`} />
            <Sum k="Deck" v={step >= 3 ? "Not uploaded" : "—"} muted={step < 3} />
            <Sum k="Declarations" v={`${Object.values(checks).filter(Boolean).length} of 4`} />
          </dl>
          <p className="mt-7 border-t-[0.8px] border-line pt-5 text-[12.5px] leading-relaxed text-ink-3">
            Everything here is editable until you press submit. After that, contact the organisers to
            change an entry.
          </p>
        </aside>
      </div>
    </PublicShell>
  );
}

/* ------------------------- steps ------------------------- */

function StepTeam({ theme, setTheme }) {
  return (
    <div className="flex flex-col gap-10">
      <Group title="Team">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Text id="team-name" label="Team name" placeholder="Neural Nadi" help="Must be unique. We also flag names that are too similar to an existing team." />
          <Select id="team-college" label="College" options={colleges} help="All members must be from this college. 60 Kerala colleges listed." />
        </div>
      </Group>

      <Group title="Theme" help="One theme per entry.">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-3">
          {tracks.map((t) => {
            const on = theme === t.name;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTheme(t.name)}
                aria-pressed={on}
                className={`flex items-start gap-3.5 rounded-[13px] border p-4 text-left transition ${
                  on
                    ? "border-[1.5px] bg-paper shadow-[0_2px_10px_rgba(14,14,20,0.06)]"
                    : "border-[0.8px] border-line bg-paper hover:border-line-2 hover:shadow-[0_2px_8px_rgba(14,14,20,0.05)]"
                }`}
                style={on ? { borderColor: `var(--color-viz-${t.hue})` } : undefined}
              >
                <TrackMark track={t} size={38} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-[14.5px] font-semibold">{t.short}</span>
                    {on && (
                      <span
                        className="ml-auto grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full text-white"
                        style={{ background: `var(--color-viz-${t.hue})` }}
                      >
                        <Icon.check className="h-2.5 w-2.5" />
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block text-[12.5px] leading-relaxed text-ink-3">
                    {t.promise}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </Group>

      <Group title="Team leader" help="This is you — the email is already verified.">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
          <Text id="ld-name" label="Full name" placeholder="Gregory Kurien" />
          <Verified id="ld-email" label="Email" value="verified@college.edu" />
          <Text id="ld-phone" label="Phone" type="tel" placeholder="+91 " />
          <Select id="ld-branch" label="Branch" options={branches} />
          <Select id="ld-year" label="Year of study" options={years} />
          <Select id="ld-district" label="District" options={districts} />
        </div>
        <Upload label="ID card" rule={uploadRules.idCard} className="mt-6" />
      </Group>
    </div>
  );
}

function StepMembers({ members, setMembers }) {
  return (
    <div className="flex flex-col gap-6">
      <p className="max-w-[62ch] text-[14.5px] leading-relaxed text-ink-2">
        Between 2 and 5 people, all from the same college as the team. You are member 1 — add the
        rest below. We check emails and phone numbers against every other entry, so nobody ends up
        on two teams.
      </p>

      <div className="flex items-center gap-3.5 rounded-[11px] border-[0.8px] border-line bg-paper px-5 py-4">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-shl text-white">
          <Icon.check className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[14.5px] font-semibold">Member 1 — team leader</p>
          <p className="mt-0.5 text-[12.5px] text-ink-3">Added in step 1 · edit there</p>
        </div>
      </div>

      {members.map((m, i) => (
        <fieldset key={m.id} className="rounded-[16px] border-[0.8px] border-line bg-paper p-6 xl:p-7">
          <legend className="flex w-full items-center gap-3 px-1">
            <span className="lbl">Member {i + 2}</span>
            {members.length > 2 && (
              <button
                onClick={() => setMembers(members.filter((x) => x.id !== m.id))}
                className="ml-auto text-[12.5px] font-medium text-rej hover:underline"
              >
                Remove
              </button>
            )}
          </legend>
          <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
            <Text id={`m${m.id}-name`} label="Full name" placeholder="Full name" />
            <Text id={`m${m.id}-email`} label="Email" type="email" placeholder="name@college.edu" />
            <Text id={`m${m.id}-phone`} label="Phone" type="tel" placeholder="+91 " />
            <Select id={`m${m.id}-branch`} label="Branch" options={branches} />
            <Select id={`m${m.id}-year`} label="Year of study" options={years} />
            <Select id={`m${m.id}-role`} label="Role in team" options={teamRoles} />
          </div>
          <label className="mt-5 flex items-center gap-3 text-[14px]">
            <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#A78CF7]" />
            Same college as the team
          </label>
          <Upload label="ID card" rule={uploadRules.idCard} className="mt-5" />
        </fieldset>
      ))}

      {members.length < 4 && (
        <button
          onClick={() => setMembers([...members, { id: Date.now() }])}
          className="rounded-[11px] border-[0.8px] border-dashed border-line px-5 py-5 text-[14.5px] font-semibold text-ink-2 transition hover:border-primary hover:text-sub"
        >
          + Add member {members.length + 2}
        </button>
      )}
    </div>
  );
}

function StepIdea() {
  const [vals, setVals] = useState({});
  const refs = useRef({});

  const setVal = (key, v) => setVals((p) => ({ ...p, [key]: v }));

  /* Selection has to be restored AFTER React commits the new value, or the
     re-render drops the caret at the end and the next click formats the wrong
     thing. A layout effect runs at exactly the right moment; rAF does not. */
  const pending = useRef(null);
  const restore = (key, from, to) => {
    pending.current = { key, from, to };
  };

  useLayoutEffect(() => {
    const p = pending.current;
    if (!p) return;
    pending.current = null;
    const el = refs.current[p.key];
    if (!el) return;
    el.focus();
    el.setSelectionRange(p.from, p.to);
  });

  const format = (key, kind) => {
    const el = refs.current[key];
    if (!el) return;
    const value = vals[key] ?? "";
    const { selectionStart: a, selectionEnd: b } = el;

    if (kind === "bold" || kind === "italic") {
      const mark = kind === "bold" ? "**" : "_";
      const sel = value.slice(a, b) || (kind === "bold" ? "bold text" : "italic text");
      setVal(key, value.slice(0, a) + mark + sel + mark + value.slice(b));
      restore(key, a + mark.length, a + mark.length + sel.length);
      return;
    }

    // lists act on every line the selection touches, and toggle off if already applied
    const lineStart = value.lastIndexOf("\n", a - 1) + 1;
    const nextBreak = value.indexOf("\n", b);
    const lineEnd = nextBreak === -1 ? value.length : nextBreak;
    const lines = value.slice(lineStart, lineEnd).split("\n");
    const strip = (l) => l.replace(/^\s*(?:\d+\.\s|-\s)?/, "");
    const isBullets = lines.every((l) => /^\s*-\s/.test(l));
    const isNumbers = lines.every((l) => /^\s*\d+\.\s/.test(l));

    let out;
    if (kind === "bullets") {
      out = isBullets ? lines.map(strip) : lines.map((l) => `- ${strip(l)}`);
    } else {
      out = isNumbers ? lines.map(strip) : lines.map((l, i) => `${i + 1}. ${strip(l)}`);
    }
    const block = out.join("\n");
    setVal(key, value.slice(0, lineStart) + block + value.slice(lineEnd));
    restore(key, lineStart, lineStart + block.length);
  };

  return (
    <div className="flex flex-col gap-9">
      <p className="rounded-[11px] bg-sub-soft px-5 py-4 text-[14px] leading-relaxed text-sub">
        These four answers become your Stage 1 deck. <strong>No prototype needed</strong> — we are
        judging the thinking at this stage.
      </p>

      <div className="grid grid-cols-1 gap-7 2xl:grid-cols-2">
        {ideaFields.map((f) => {
          const v = vals[f.key] ?? "";
          const len = v.length;
          const over = f.max && len > f.max;
          const met = len >= f.min && !over;
          return (
            <div key={f.key} className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                <label htmlFor={f.key} className="lbl">
                  {f.label}
                </label>
                <InfoTip text={f.info} label={`About ${f.label}`} />

                <div className="ml-auto flex items-center gap-0.5 rounded-[9px] bg-sunk p-[3px]">
                  <FmtBtn onClick={() => format(f.key, "bold")} title="Bold">
                    <Icon.bold className="h-[13px] w-[13px]" />
                  </FmtBtn>
                  <FmtBtn onClick={() => format(f.key, "italic")} title="Italic">
                    <Icon.italic className="h-[13px] w-[13px]" />
                  </FmtBtn>
                  <span className="mx-0.5 h-4 w-px bg-line-2" />
                  <FmtBtn onClick={() => format(f.key, "bullets")} title="Bulleted list">
                    <Icon.bullets className="h-[14px] w-[14px]" />
                  </FmtBtn>
                  <FmtBtn onClick={() => format(f.key, "numbers")} title="Numbered list">
                    <Icon.numbers className="h-[14px] w-[14px]" />
                  </FmtBtn>
                </div>
              </div>

              <textarea
                id={f.key}
                ref={(el) => (refs.current[f.key] = el)}
                rows={f.rows}
                value={v}
                onChange={(e) => setVal(f.key, e.target.value)}
                placeholder={f.placeholder}
                className={`resize-y rounded-[11px] border-[0.8px] bg-paper px-4 py-3.5 text-[15px] leading-relaxed outline-none transition placeholder:text-ink-4 focus:border-primary ${
                  over ? "border-rej" : "border-line"
                }`}
              />

              <div className="flex items-center justify-between gap-3 text-[12.5px]">
                <span className={over ? "text-rej" : "text-ink-4"}>
                  {over ? `${len - f.max} characters over the limit.` : f.help}
                </span>
                <span
                  className={`tnum shrink-0 ${
                    over ? "text-rej" : met ? "text-shl" : "text-ink-4"
                  }`}
                >
                  {len} / {f.max ?? f.min}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-7 2xl:grid-cols-2">
        <Text
          id="link"
          label="Supporting link (optional)"
          placeholder="https://"
          help="A repo, a demo video, a doc — anything that helps."
        />
        <Upload label="Stage 1 deck" rule={uploadRules.deck} />
      </div>
    </div>
  );
}

function FmtBtn({ onClick, title, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      className="grid h-[26px] w-[26px] place-items-center rounded-[6px] text-ink-3 transition hover:bg-paper hover:text-ink hover:shadow-[0_1px_2px_rgba(14,14,20,0.06)]"
    >
      {children}
    </button>
  );
}

function StepDeclare({ theme, members, checks, setChecks }) {
  return (
    <div className="flex flex-col gap-9">
      <section className="rounded-[16px] border-[0.8px] border-line bg-paper p-7">
        <span className="lbl">Your entry</span>
        <dl className="mt-5 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2 2xl:grid-cols-4">
          <Sum k="Theme" v={theme} />
          <Sum k="Team size" v={`${members.length + 1} members`} />
          <Sum k="Stage 1 answers" v="4 of 4" />
          <Sum k="Deck" v="Not uploaded" muted />
        </dl>
      </section>

      <div className="flex flex-col gap-3">
        {declarations.map((d) => (
          <label
            key={d.key}
            className={`flex cursor-pointer items-start gap-4 rounded-[11px] border px-5 py-4 transition ${
              checks[d.key] ? "border-viz-purple bg-sub-soft" : "border-line bg-paper hover:border-line-2"
            }`}
          >
            <input
              type="checkbox"
              checked={!!checks[d.key]}
              onChange={(e) => setChecks({ ...checks, [d.key]: e.target.checked })}
              className="mt-0.5 h-4.5 w-4.5 accent-[#A78CF7]"
            />
            <span>
              <span className="flex flex-wrap items-center gap-2.5">
                <span className="text-[14.5px] font-semibold">{d.label}</span>
                <span className={`lbl ${d.required ? "!text-rej" : ""}`}>
                  {d.required ? "Required" : "Optional"}
                </span>
              </span>
              <span className="mt-1.5 block max-w-[72ch] text-[13.5px] leading-relaxed text-ink-2">
                {d.body}
              </span>
            </span>
          </label>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-[11px] border-[0.8px] border-line bg-ground px-4 py-5 sm:px-6">
        <div>
          <span className="lbl">Quick check</span>
          <p className="mt-2 text-[15px] font-semibold">
            How many members are on your team, including you?
          </p>
        </div>
        <input
          id="challenge"
          inputMode="numeric"
          placeholder="—"
          className="tnum ml-auto w-20 rounded-[11px] border-[0.8px] border-line bg-paper px-4 py-3 text-center text-[16px] font-bold outline-none focus:border-primary"
        />
      </div>
    </div>
  );
}

function Submitted({ theme }) {
  return (
    <PublicShell bare>
      <div className="grid grid-cols-1 items-center gap-10 px-4 py-14 sm:gap-14 sm:px-6 sm:py-20 xl:grid-cols-[1.1fr_1fr] xl:gap-24 xl:px-10 xl:py-28">
        <div>
          <span className="grid h-14 w-14 place-items-center rounded-full bg-shl-soft">
            <Icon.check className="h-6 w-6 text-shl" />
          </span>
          <h1 className="mt-8 max-w-[15ch] text-[clamp(34px,5vw,62px)] font-extrabold leading-[1.0] tracking-[-0.028em]">
            Registration submitted.
          </h1>
          <p className="mt-6 max-w-[54ch] text-[16.5px] leading-relaxed text-ink-2">
            Your entry is in. We have emailed a copy to the team leader. Judges review Stage 1 decks
            after the window closes — you will hear from us either way.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/"
              className="rounded-full border-[0.8px] border-line px-5 py-3.5 text-[15px] font-medium text-ink-2 transition hover:border-line-2"
            >
              Back to gIGNITE
            </Link>
          </div>
        </div>

        <div className="rounded-[16px] border-[0.8px] border-line bg-paper p-8">
          <span className="lbl">What we received</span>
          <dl className="mt-6 flex flex-col gap-4">
            <Sum k="Theme" v={theme} />
            <Sum k="Stage 1 answers" v="4 of 4" />
            <Sum k="Declarations" v="3 required, accepted" />
            <Sum k="Status" v="Submitted" />
          </dl>
        </div>
      </div>
    </PublicShell>
  );
}

/* ------------------------- field atoms ------------------------- */

function Group({ title, help, children }) {
  return (
    <section>
      <div className="flex flex-wrap items-baseline gap-3">
        <h2 className="text-[19px] font-bold tracking-[-0.014em]">{title}</h2>
        {help && <p className="text-[13px] text-ink-3">{help}</p>}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Text({ id, label, help, type = "text", placeholder }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="lbl">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="rounded-[11px] border-[0.8px] border-line bg-paper px-4 py-3 text-[15px] outline-none transition placeholder:text-ink-3 focus:border-primary"
      />
      {help && <p className="text-[12.5px] leading-relaxed text-ink-3">{help}</p>}
    </div>
  );
}

function Select({ id, label, options, help }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="lbl">
        {label}
      </label>
      <select
        id={id}
        defaultValue=""
        className="rounded-[11px] border-[0.8px] border-line bg-paper px-4 py-3 text-[15px] outline-none transition focus:border-primary"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      {help && <p className="text-[12.5px] leading-relaxed text-ink-3">{help}</p>}
    </div>
  );
}

function Verified({ id, label, value }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="lbl">
        {label}
      </label>
      <div className="flex items-center gap-3 rounded-[11px] border-[0.8px] border-line bg-ground px-4 py-3">
        <span className="truncate text-[15px] text-ink-2">{value}</span>
        <span className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full bg-shl-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.07em] text-shl">
          <Icon.check className="h-3 w-3" />
          Verified
        </span>
      </div>
    </div>
  );
}

function Upload({ label, rule, className = "" }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <span className="lbl">{label}</span>
      <button className="flex items-center gap-4 rounded-[11px] border-[0.8px] border-dashed border-line bg-paper px-5 py-4 text-left transition hover:border-primary">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-sunk">
          <Icon.download className="h-4 w-4 rotate-180 text-ink-2" />
        </span>
        <span>
          <span className="block text-[14px] font-semibold">Choose a file or take a photo</span>
          <span className="mt-0.5 block text-[12.5px] text-ink-3">{rule}</span>
        </span>
      </button>
    </div>
  );
}

function Sum({ k, v, muted = false }) {
  return (
    <div>
      <dt className="lbl">{k}</dt>
      <dd className={`mt-1.5 text-[14px] font-semibold ${muted ? "text-ink-3" : ""}`}>{v}</dd>
    </div>
  );
}
