export const statCards = [
  {
    key: "pending",
    label: "Pending Review",
    value: "5",
    unit: "submissions",
    note: "Submitted in last 24h across mobile & USSD",
    icon: "pending_actions",
    iconWrap: "bg-primary-fixed text-primary",
    valueClass: "text-primary",
  },
  {
    key: "urgent",
    label: "Clinical Urgency Flags",
    value: "2",
    unitBadge: "requires nurse callback",
    note: "Reported acute neutropenic signs / pain crisis",
    icon: "emergency",
    iconWrap: "bg-error-container text-error",
    valueClass: "text-error",
    variant: "urgent",
  },
  {
    key: "approved",
    label: "Approved Stories Live",
    value: "48",
    unit: "verified testimonies",
    note: "Inspiring 320+ actively treated patients",
    icon: "auto_stories",
    iconWrap: "bg-secondary-container text-on-secondary-container",
    valueClass: "text-secondary",
  },
  {
    key: "reactions",
    label: "Weekly Peer Support",
    value: "412",
    unit: '"Mwandilimbikitsa" reactions',
    note: "+18% increase in peer emotional reassurance",
    icon: "favorite",
    iconWrap: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    valueClass: "text-tertiary",
  },
];

export const filterTabs = [
  { key: "all", label: "All Pending (5)" },
  { key: "urgent", label: "Urgent Flags (2)", tone: "error" },
  { key: "stories", label: "Stories (2)" },
  { key: "questions", label: "Questions (1)" },
];

export const storyStatCards = statCards.filter((card) => card.key !== "urgent");

export const storyFilterTabs = [
  { key: "pending", label: "Pending Review (1)" },
  { key: "published", label: "Recently Published (48)" },
];

export const urgentFlag = {
  timeLabel: "28 mins ago via Android App",
  author: "Anonymous Patient",
  fileId: "KCH-5104",
  meta: "Cervical Ca \u2022 Stage II \u2022 Area 25, Lilongwe",
  riskBadge: "Sepsis / Neutropenic Risk",
  originalText:
    "\u201cKodi kutentha thupi kwambiri ndi kunjenjemera pambuyo pa tsiku la 3 la chemo n'kwachilendo? Ndikuzizidwa kwambiri ndipo mutu ukundipweteka mopitirira muyeso...\u201d",
  translation:
    "\u201cIs high fever and shivering after day 3 of chemo normal? Feeling severe chills and uncontrollable headache...\u201d",
  nlpNote: {
    prefix: "Automated Triage NLP: Matched high-risk keywords: ",
    terms: ["'kutentha thupi' (fever)", "'kunjenjemera' (rigors/chills)"],
    suffix: " within post-chemo cycle day 3 window.",
  },
};

export const storyReview = {
  timeLabel: "1 hour ago",
  authorName: "Mercy Kachepa",
  verified: true,
  meta: "Breast Cancer Survivor (3 Years Remission) \u2022 Salima District",
  photoAlt: "Portrait of Mercy Kachepa wearing a patterned chitenge headwrap",
  title: "\"Zomwe ndinaphunzira pamene ndinamva kuti ndili ndi khansa...\"",
  body:
    "\u201cPamene dokotala ku Kamuzu Central anandiuza kuti ndili ndi khansa ya bere, ndinaona ngati moyo wanga watheratu. Koma manesi a ku Ward 3B anandilimbikitsa kwambiri. Lero ndikudya bwino, ndikugwira ntchito m'munda, ndipo ndikufuna kuwuza amayi onse kuti asabise nthenda ino. Pitani ku chipatala msanga...\u201d",
  summary:
    "English summary: Shares personal journey from devastating diagnosis to 3-year survival, praising compassionate oncology nurses at Ward 3B and urging women to report early.",
  checks: [
    { label: "No PII / Phone numbers exposed", icon: "check_circle", tone: "secondary" },
    { label: "Safe medication mention", icon: "check_circle", tone: "secondary" },
    { label: "High Emotional Hope Metric", icon: "sentiment_satisfied", tone: "primary" },
  ],
};

export const peerQuestion = {
  timeLabel: "2 hours ago",
  authorName: "Bambo Phiri",
  roleTag: "Caregiver \u2022 Dedza",
  meta: "Mother scheduled for Chemotherapy Cycle 4 \u2022 Dedza Boma",
  body:
    "\u201cTikufuna thandizo la galimoto lochokera ku Dedza kupita ku KCH Lolemba lino, kodi tingapeze bwanji ndalama zoyendera? Mayi anga sangakwere minibasi yodzaza chifukwa cha ululu...\u201d",
  summary:
    "English summary: Requesting community ambulance / minibus transit voucher assistance from Dedza to KCH for Monday chemo. Patient cannot board crowded public transit due to post-surgical discomfort.",
  matchedResource: {
    icon: "directions_bus",
    text: "Matched to Lilongwe-Dedza Route Fund: 2 vouchers remaining for week 4 (MWK 14,000 allowance).",
    boldPart: "Lilongwe-Dedza Route Fund",
  },
};

export const trendingConcerns = [
  {
    id: "t1",
    title: "Chemo Appetite Loss & Metallic Taste",
    count: "18 inquiries",
    countClass: "text-primary",
    body: "Patients struggling with food intake during AC-T and Cisplatin protocols in Ward 3B.",
    footLeft: "MoH Diet Guide ready",
    footLeftIcon: "check_circle",
    footLeftClass: "text-secondary",
    action: { label: "Push SMS Blast", icon: "send" },
  },
  {
    id: "t2",
    title: "Transport Fare Deficits (Dedza/Salima)",
    count: "14 inquiries",
    countClass: "text-tertiary",
    body: "Rising fuel costs creating appointment no-show risks for Friday infusion clinics.",
    footLeft: "Transport Desk Fund: 68% utilized",
    action: { label: "Review Balances", icon: "arrow_forward" },
  },
  {
    id: "t3",
    title: "Hair Loss Dignity & Chitenge Wraps",
    count: "9 inquiries",
    countClass: "text-secondary",
    body: "Social stigma in rural villages following alopecia from chemotherapy treatment.",
    footLeft: "Scheduled for Thursday Ward 3B Group Circle",
    footRightIcon: "event_available",
  },
];

export const hopeIndex = {
  label: "Patient Hope & Encouragement Index",
  note: "Analyzed across 180 peer comments",
  percent: 84,
};

export const recentApprovals = [
  {
    id: "a1",
    title: "Chimwemwe Banda \u2022 Story Published",
    detail: "Approved by Sr. Phiri \u2022 Removed phone # for privacy",
    time: "3h ago",
    timeClass: "text-secondary",
  },
  {
    id: "a2",
    title: "Esau Mwale \u2022 Transport Fund Connected",
    detail: "Dispatched MWK 9,500 via Airtel Money",
    time: "5h ago",
    timeClass: "text-outline",
  },
  {
    id: "a3",
    title: "Trad. Healer Advice Post \u2022 Flagged & Hidden",
    detail: "Redirected to Oncology clinical education nurse",
    time: "Yesterday",
    timeClass: "text-error",
  },
];
