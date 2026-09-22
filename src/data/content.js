// Structural content for the remaining screens — field lists, copy and rules
// taken from the product's own specification. Values that the live dashboard
// never showed (judge scores, entry IDs) are left as empty states rather than invented.

export const themes = [
  "AI for Disaster Management",
  "AI for Healthcare",
  "AI for Mobility & Transportation",
  "AI for Smart Cities",
  "Open Innovation Track",
];

export const districts = [
  "Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha", "Kottayam",
  "Idukki", "Ernakulam", "Thrissur", "Palakkad", "Malappuram",
  "Kozhikode", "Wayanad", "Kannur", "Kasaragod",
];

export const years = ["1st year", "2nd year", "3rd year", "4th year", "5th year", "Postgraduate"];

export const branches = [
  "Computer Science & Engineering",
  "Information Technology",
  "Electronics & Communication",
  "Electrical & Electronics",
  "Mechanical Engineering",
  "Civil Engineering",
  "Artificial Intelligence & Data Science",
  "Other",
];

export const teamRoles = [
  "Team lead", "Developer", "Designer", "Data / ML", "Research", "Other (specify)",
];

// The dropdown carries 60 Kerala colleges; this is the head of that list.
export const colleges = [
  "Federal Institute of Science And Technology (FISAT), Angamaly",
  "College of Engineering, Thiruvananthapuram",
  "Government Engineering College, Thrissur",
  "Model Engineering College, Kochi",
  "Rajagiri School of Engineering & Technology, Kochi",
  "TKM College of Engineering, Kollam",
  "NSS College of Engineering, Palakkad",
  "Mar Athanasius College of Engineering, Kothamangalam",
  "Other",
];

export const wizardSteps = [
  { n: 1, key: "team", title: "Team details", hint: "Name, theme, college and team leader" },
  { n: 2, key: "members", title: "Your team", hint: "2 to 5 people from the same college" },
  { n: 3, key: "idea", title: "Your idea", hint: "Four answers and your Stage 1 deck" },
  { n: 4, key: "declare", title: "Declarations", hint: "Confirm and submit" },
];

export const ideaFields = [
  {
    key: "problem",
    label: "Problem statement",
    help: "At least 50 characters, up to 1500.",
    min: 50,
    max: 1500,
    rows: 5,
    placeholder: "What problem are you solving, and who has it?",
  },
  {
    key: "solution",
    label: "Proposed solution",
    help: "At least 50 characters.",
    min: 50,
    rows: 5,
    placeholder: "What are you building, and how does it work?",
  },
  {
    key: "approach",
    label: "AI approach / technology",
    help: "At least 30 characters.",
    min: 30,
    rows: 4,
    placeholder: "Which models, data or techniques does it rely on?",
  },
  {
    key: "impact",
    label: "Expected impact",
    help: "At least 30 characters.",
    min: 30,
    rows: 4,
    placeholder: "Who benefits, and how would you measure it?",
  },
];

export const declarations = [
  {
    key: "eligibility",
    required: true,
    label: "Student eligibility",
    body: "Every member is a currently enrolled student at the college named in this entry, and can produce a valid ID card on request.",
  },
  {
    key: "originality",
    required: true,
    label: "Originality and code ownership",
    body: "The idea is our own. Any third-party code, data or models we use are properly licensed and will be credited.",
  },
  {
    key: "rules",
    required: true,
    label: "Rules and code of conduct",
    body: "We have read the gIGNITE 2026 rules and the code of conduct, and we agree to be bound by them.",
  },
  {
    key: "media",
    required: false,
    label: "Photo and media consent",
    body: "Optional. We consent to photographs and recordings made at the event being used by the organisers.",
  },
];

export const scoringCriteria = [
  { key: "relevance", label: "Problem Relevance", help: "Does it address a real, well-framed problem?" },
  { key: "technical", label: "Technical Implementation", help: "Is the approach sound and appropriately built?" },
  { key: "innovation", label: "Innovation & Creativity", help: "How original is the idea or the method?" },
  { key: "feasibility", label: "Feasibility & Scalability", help: "Could this survive contact with the real world?" },
  { key: "completion", label: "Completion & Functionality", help: "How much of it actually works today?" },
];

export const staffMembers = [
  { name: "Deepak Sreeraj", email: "deepak.sreeraj@gadgeon.com", role: "Admin", added: "12 Sept 2026" },
  { name: "Barry Allen", email: "barry.allen@fisat.ac.in", role: "Judge", added: "15 Sept 2026" },
  { name: "Govind", email: "govind@fisat.ac.in", role: "Judge", added: "15 Sept 2026" },
];

export const auditWindows = ["Today", "Last 7 days", "Last 30 days", "Last 120 days"];

// Derived strictly from events visible in the live dashboard.
export const auditLog = [
  { when: "22 Sept 2026, 2:34 am", activity: "Team registered", detail: "Neural Nadi — AI for Smart Cities, led by Gregory Kurien", tone: "sub" },
  { when: "18 Sept 2026, 3:14 pm", activity: "Team registered", detail: "team 1 — AI for Disaster Management, led by richu steephan", tone: "sub" },
  { when: "17 Sept 2026, 12:02 pm", activity: "Status changed", detail: "test 1 — Submitted → Shortlisted", tone: "shl" },
  { when: "17 Sept 2026, 11:58 am", activity: "Judge assigned", detail: "Govind assigned to test 1", tone: "sub" },
  { when: "17 Sept 2026, 11:57 am", activity: "Judge assigned", detail: "Barry Allen assigned to test 1", tone: "sub" },
  { when: "17 Sept 2026, 11:46 am", activity: "Team registered", detail: "test 1 — AI for Disaster Management, led by Vishnu", tone: "sub" },
  { when: "15 Sept 2026, 9:20 am", activity: "Staff account created", detail: "Govind — Judge", tone: "rev" },
  { when: "15 Sept 2026, 9:18 am", activity: "Staff account created", detail: "Barry Allen — Judge", tone: "rev" },
];

export const uploadRules = {
  idCard: "JPG, PNG or WEBP · up to 8 MB · seen by organisers only",
  deck: "PDF or PPTX · up to 20 MB · use the official pitch-deck template",
};

export const closedMessage = "Registration for gIGNITE 2026 is no longer open.";
