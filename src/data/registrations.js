// Exact content pulled from the live gIGNITE dashboard (22 Sept 2026).
// Nothing here is invented — names, counts, timestamps and labels match the product.

export const account = {
  event: "gIGNITE",
  name: "Deepak Sreeraj",
  role: "ADMIN",
  initials: "DS",
};

export const nav = [
  { key: "teams", label: "Teams" },
  { key: "export", label: "Export" },
];

export const teams = [
  {
    name: "Neural Nadi",
    theme: "AI for Smart Cities",
    themeShort: "Smart Cities",
    leader: "Gregory Kurien",
    members: 2,
    submitted: "22 Sept 2026, 2:34 am",
    submittedShort: "22 Sept",
    submittedTime: "02:34",
    status: "Submitted",
    judges: [],
  },
  {
    name: "team 1",
    theme: "AI for Disaster Management",
    themeShort: "Disaster Management",
    leader: "richu steephan",
    members: 2,
    submitted: "18 Sept 2026, 3:14 pm",
    submittedShort: "18 Sept",
    submittedTime: "15:14",
    status: "Submitted",
    judges: [],
  },
  {
    name: "test 1",
    theme: "AI for Disaster Management",
    themeShort: "Disaster Management",
    leader: "Vishnu",
    members: 2,
    submitted: "17 Sept 2026, 11:46 am",
    submittedShort: "17 Sept",
    submittedTime: "11:46",
    status: "Shortlisted",
    judges: ["Barry Allen", "Govind"],
  },
];

export const byTheme = [
  { label: "Disaster Management", full: "AI for Disaster Management", count: 2 },
  { label: "Healthcare", full: "AI for Healthcare", count: 0 },
  { label: "Mobility & Transportation", full: "AI for Mobility & Transportation", count: 0 },
  { label: "Smart Cities", full: "AI for Smart Cities", count: 1 },
  { label: "Open Innovation Track", full: "Open Innovation Track", count: 0 },
];

export const byStatus = [
  { label: "Submitted", count: 2, key: "sub" },
  { label: "Under review", count: 0, key: "rev" },
  { label: "Shortlisted", count: 1, key: "shl" },
  { label: "Rejected", count: 0, key: "rej" },
];

export const daily = [
  { day: 16, count: 0 },
  { day: 17, count: 1 },
  { day: 18, count: 1 },
  { day: 19, count: 0 },
  { day: 20, count: 0 },
  { day: 21, count: 0 },
  { day: 22, count: 1, today: true },
];

export const dailyMeta = {
  month: "September 2026",
  today: 1,
  delta: "+1 vs yesterday",
};

export const totals = {
  teams: 3,
  shown: "3 of 3 teams shown",
  needJudge: 2,
};

export const judgePool = ["Barry Allen", "Govind"];

export const filterLabels = {
  search: "Search by team name or theme...",
  statuses: "All statuses",
  themes: "All themes",
  districts: "All districts",
};

export const registrationWindow = {
  status: "Open",
  closesAtPlaceholder: "dd-mm-yyyy --:--",
  closesAtHelp: "Leave blank for no scheduled closing date. Your local time.",
  closedMessagePlaceholder: "Registration for gIGNITE 2026 is no longer open.",
  closedMessageHelp: "Shown to participants at /register once closed. A sensible default is used if left blank.",
  blurb:
    "Controls whether new teams can submit at /register. A scheduled closing date takes effect on its own — no need to flip the toggle at the exact time.",
};

export const statusTone = {
  Submitted: { text: "text-sub", bg: "bg-sub-soft", dot: "bg-sub" },
  "Under review": { text: "text-rev", bg: "bg-rev-soft", dot: "bg-rev" },
  Shortlisted: { text: "text-shl", bg: "bg-shl-soft", dot: "bg-shl" },
  Rejected: { text: "text-rej", bg: "bg-rej-soft", dot: "bg-rej" },
};
