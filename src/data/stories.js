// Sample survivor stories (placeholder content, replace with your API/database data).
// Every story has the same shape so one <StoryCard /> can render them all.

export const pendingStories = [
  {
    id: "s1",
    status: "pending",
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
  },
];

export const publishedStories = [
  {
    id: "p1",
    status: "published",
    timeLabel: "Published 3h ago",
    authorName: "Chimwemwe Banda",
    verified: true,
    meta: "Cervical Cancer Survivor (2 Years Remission) \u2022 Lilongwe",
    title: "\"Ndinapita msanga, ndipo zinandithandiza.\"",
    body:
      "\u201cNditapezeka ndi zizindikiro, sindinadikire. Ndinapita ku chipatala, ndipo chithandizo chinayamba mwamsanga. Lero ndili bwino ndipo ndimalimbikitsa amayi anzanga kuyezetsa.\u201d",
    summary:
      "English summary: Credits early screening and prompt treatment for her recovery and encourages other women to get tested.",
    reactions: 63,
    approvedBy: "Sr. Phiri",
  },
  {
    id: "p2",
    status: "published",
    timeLabel: "Published yesterday",
    authorName: "Grace Mwale",
    verified: true,
    meta: "Caregiver \u2022 Dedza Boma",
    title: "\"Kusamalira mayi anga pa nthawi ya chemo.\"",
    body:
      "\u201cNdinaphunzira kuti chakudya chofewa ndi madzi ambiri zimathandiza mayi anga akamaona kukoma kwachitsulo mkamwa. Gulu la anzathu pa pulogalamuyi linatithandiza kwambiri.\u201d",
    summary:
      "English summary: A caregiver shares practical tips for managing metallic taste and appetite loss during chemotherapy.",
    reactions: 41,
    approvedBy: "Sr. Phiri",
  },
  {
    id: "p3",
    status: "published",
    timeLabel: "Published 2 days ago",
    authorName: "Esau Mwale",
    verified: true,
    meta: "Prostate Cancer Survivor (1 Year Remission) \u2022 Mchinji",
    title: "\"Ndinasiya manyazi, ndinayamba chithandizo.\"",
    body:
      "\u201cAmuna ambiri amabisa matenda awa chifukwa cha manyazi. Ine ndinaganiza zoyankhula, ndipo lero ndikuthokoza. Musachedwe, pitani mukayezetse.\u201d",
    summary:
      "English summary: Encourages men to overcome stigma and seek screening and treatment early.",
    reactions: 57,
    approvedBy: "Sr. Grace Phiri",
  },
];
