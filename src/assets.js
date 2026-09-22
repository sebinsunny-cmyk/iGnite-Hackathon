// Asset URLs must go through Vite's BASE_URL, not absolute "/" paths.
//
// GitHub Pages serves this project at /iGnite-Hackathon/, so "/gignite-logo.png"
// would resolve to the domain root and 404. BASE_URL is "./" here, which — because
// the app uses hash routing, so the document path never changes — resolves against
// whatever directory index.html sits in: the dev server root, a Pages subpath, or a
// local folder opened from disk.
const base = import.meta.env.BASE_URL;

export const LOGO = {
  gignite: `${base}gignite-logo.png`,
  gadgeon: `${base}gadgeon-logo.png`,
  fisat: `${base}fisat-sb-logo.png`,
  ieee: `${base}ieee_sps_kc_logo.png`,
};

export const LOGO_ALT = {
  gignite: "gIGNITE 2026 — Fueling India's AI Future",
  gadgeon: "Gadgeon — Engineering Smartness",
  fisat: "FISAT IEEE Student Branch",
  ieee: "IEEE Signal Processing Society, Kerala Chapter",
};
