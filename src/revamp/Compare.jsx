import { useEffect, useState } from "react";
import Instrument from "./Instrument";
import Broadsheet from "./Broadsheet";
import Poster from "./Poster";

const OPTIONS = [
  {
    key: "instrument",
    name: "Instrument",
    type: "Familjen Grotesk + Spline Sans Mono",
    idea: "Built like a measurement instrument, because the organiser is the IEEE Signal Processing Society. Graph-paper ground, hairline rules, submissions drawn as a signal trace.",
    Component: Instrument,
  },
  {
    key: "broadsheet",
    name: "Broadsheet",
    type: "Instrument Serif + Archivo",
    idea: "A printed competition programme. Entries set as a register under a masthead, held together by column rules and hierarchy alone. No cards anywhere.",
    Component: Broadsheet,
  },
  {
    key: "poster",
    name: "Poster",
    type: "Bricolage Grotesque + Public Sans",
    idea: "Type as architecture. Oversized headline running to the edge, flat navy and orange fields, hard edges, deliberate asymmetry.",
    Component: Poster,
  },
];

const STORE = "gignite.revamp";

export default function Compare() {
  const [active, setActive] = useState(() => {
    try {
      return localStorage.getItem(STORE) ?? "instrument";
    } catch {
      return "instrument";
    }
  });
  const [notes, setNotes] = useState(true);

  useEffect(() => {
    try {
      localStorage.setItem(STORE, active);
    } catch {
      /* ignore */
    }
  }, [active]);

  useEffect(() => {
    const h = (e) => {
      if (e.target instanceof HTMLInputElement) return;
      const i = ["1", "2", "3"].indexOf(e.key);
      if (i >= 0) setActive(OPTIONS[i].key);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const current = OPTIONS.find((o) => o.key === active) ?? OPTIONS[0];
  const { Component } = current;

  return (
    <div className="flex min-h-full flex-col">
      <div className="shrink-0 bg-[#0B0D12] text-white">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 sm:px-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
            Revamp
          </span>
          <div className="flex flex-wrap gap-1">
            {OPTIONS.map((o, i) => (
              <button
                key={o.key}
                onClick={() => setActive(o.key)}
                className={`flex min-h-[38px] items-center gap-2 rounded-none px-3 text-[13px] transition ${
                  o.key === active
                    ? "bg-white font-semibold text-[#0B0D12]"
                    : "text-white/65 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="font-mono text-[10px] opacity-50">{i + 1}</span>
                {o.name}
              </button>
            ))}
          </div>
          <button
            onClick={() => setNotes((v) => !v)}
            className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-white/40 hover:text-white/80"
          >
            {notes ? "hide note" : "show note"}
          </button>
        </div>
        {notes && (
          <div className="border-t border-white/10 px-4 py-3 sm:px-6">
            <p className="max-w-[92ch] text-[12.5px] leading-relaxed text-white/60">
              <span className="text-white/90">{current.type}.</span> {current.idea}
            </p>
          </div>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <Component />
      </div>
    </div>
  );
}
