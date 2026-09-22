/**
 * Brand lockups.
 *
 * Two of the four supplied PNGs (FISAT, IEEE SPS) ship with a baked-in white
 * background, so every sponsor mark sits on a white chip. That keeps the row
 * consistent instead of one logo showing a white rectangle on the warm ground.
 *
 * Sizes are responsive by default — pass `className` to override per screen.
 */

/** The gIGNITE event wordmark — the primary identity on every screen. */
export function GigniteLogo({ className = "h-9 sm:h-11 lg:h-14" }) {
  return (
    <img
      src="/gignite-logo.png"
      alt="gIGNITE 2026 — Fueling India's AI Future"
      className={`w-auto max-w-full ${className}`}
    />
  );
}

/** A single sponsor mark on its own white chip. */
export function LogoChip({ src, alt, className = "h-7 sm:h-9" }) {
  return (
    <span className="inline-flex items-center rounded-xl bg-white px-3 py-2 ring-1 ring-line sm:px-4 sm:py-2.5">
      <img src={src} alt={alt} className={`w-auto ${className}`} />
    </span>
  );
}

const PARTNERS = [
  { src: "/gadgeon-logo.png", alt: "Gadgeon — Engineering Smartness" },
  { src: "/fisat-sb-logo.png", alt: "FISAT IEEE Student Branch" },
  { src: "/ieee_sps_kc_logo.png", alt: "IEEE Signal Processing Society, Kerala Chapter" },
];

/** The three organiser marks, given real room. */
export function PartnerLogos({ className = "", label }) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {label && <span className="lbl">{label}</span>}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        {PARTNERS.map((p) => (
          <LogoChip key={p.src} src={p.src} alt={p.alt} />
        ))}
      </div>
    </div>
  );
}

/** Full-bleed footer band carrying the organiser marks at scale. */
export function PartnerBand({ className = "" }) {
  return (
    <footer className={`border-t border-line bg-paper ${className}`}>
      <div className="flex flex-col gap-7 px-4 py-7 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-8 xl:px-10">
        <div className="flex flex-col gap-4">
          <span className="lbl">Presented by</span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-8">
            {PARTNERS.map((p) => (
              <img
                key={p.src}
                src={p.src}
                alt={p.alt}
                className="h-9 w-auto sm:h-11 lg:h-14"
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 border-t border-line-2 pt-6 lg:border-t-0 lg:pt-0">
          <GigniteLogo className="h-9 sm:h-11" />
          <span className="lbl max-w-[18ch] leading-relaxed">Fueling India's AI future</span>
        </div>
      </div>
    </footer>
  );
}
