export const dossiers = {
  "KCH-4092": {
    patientId: "KCH-4092",
    name: "Alineti Banda",
    age: 44,
    sex: "Female",
    passport: "#YP-88219",
    village: "Chipoka Village, Salima",
    distanceKm: 95,
    language: "Chichewa (Primary) / English (Fair)",
    photoAlt:
      "Portrait of a 44-year-old Malawian woman wearing a patterned Chitenge headwrap",
    connectivity: "2G Active",
    breadcrumb: { region: "Central Region" },
    alert: {
      title: "Critical Care Gap: Missed Appointment",
      date: "24 Oct (Yesterday)",
      body:
        'Chemotherapy Cycle 3 Paclitaxel unfulfilled. Patient identified critical travel distress via USSD check-in: "Ndalama yamayendedwe sinakwanire" (Bus fare deficit).',
      actionLabel: "Resolve Barrier (Send MWK 14k)",
    },
    staging: {
      stage: "Stage IIB (T2N1M0)",
      diagnosis: "Infiltrating Ductal Carcinoma (Left Breast)",
      tags: ["ER+ / PR+", "HER2 Negative", "ECOG Performance: 1"],
      protocol: "AC-T Regimen (4x AC → 4x Paclitaxel)",
      cycleLabel: "Current: Cycle 3 of 6",
    },
    contacts: {
      primaryPhone: "+265 999 412 804",
      guardianName: "James (Mwini)",
      guardianPhone: "+265 888 123 991",
    },
    ussdGateway: "*384*265#",
    pathway: {
      regimenLabel: "Paclitaxel Cycle 3",
      progressPercent: 45,
      cyclesDone: 3,
      cyclesTotal: 6,
      milestones: [
        {
          id: "m1",
          state: "done",
          title: "Doxorubicin / Cyclo (4x)",
          statusLabel: "Completed",
          note: "Ward 3B Day Unit • August 2024",
        },
        {
          id: "m2",
          state: "done",
          title: "Paclitaxel Cycle 1 & 2",
          statusLabel: "Completed",
          note: "Last Infusion: 10 Oct 2024 • Tolerated well",
        },
        {
          id: "m3",
          state: "current",
          title: "Paclitaxel Cycle 3",
          statusLabel: "Due 24 Oct",
          note: "Pending Minibus Fare Disbursement",
          warning: "* Delay warning: Must administer before Day 28 to preserve dose density protocol.",
        },
        {
          id: "m4",
          state: "upcoming",
          title: "Paclitaxel Cycle 4 & 5",
          statusLabel: "Upcoming",
          note: "November 2024",
        },
        {
          id: "m5",
          state: "upcoming",
          title: "Post-Chemo Breast Review",
          statusLabel: "Evaluation",
          note: "Surgical Oncology Clinic (Lilongwe)",
        },
      ],
    },
    labs: {
      date: "10 Oct 2024",
      readings: [
        { label: "WBC Count", value: "4.2", unit: "x10^9/L", note: "Normal (4.0 - 11.0)" },
        { label: "Hemoglobin (Hb)", value: "10.8", unit: "g/dL", note: "Adequate for Infusion" },
        { label: "Platelets", value: "215", unit: "x10^9/L", note: "Safe (>100)" },
        { label: "Creatinine", value: "68", unit: "\u00b5mol/L", note: "Renal Fit" },
      ],
      clearanceNote: "Pre-chemo vitals pre-cleared",
    },
    medications: [
      { name: "Ondansetron 8mg", detail: "Twice daily (M'mawa ndi Madzulo) for nausea", status: "Active" },
      { name: "Dexamethasone 4mg", detail: "Once daily morning with food (masiku atatu)", status: "Active" },
      { name: "Paracetamol 500mg", detail: "2 tabs as needed for bone pain or mild fever", status: "As Needed" },
    ],
    adherencePercent: 89,
    stream: [
      {
        id: "e1",
        channel: "ward",
        title: "KCH Ward 3B Check-in System",
        time: "Yesterday 16:30",
        critical: true,
        bodyPrefix: "Auto-flagged: Patient did not present at reception for scheduled Chemo Cycle 3. Session marked: ",
        bodyHighlight: "ABSENT",
        bodySuffix: ". Triggered urgent navigator task for Sister Grace Phiri.",
      },
      {
        id: "e2",
        channel: "ussd",
        title: "USSD Session Prompt (*384*265#)",
        subtitle: "Self-Reported Barrier",
        time: "Yesterday 17:15",
        sessionDump:
          "Menu > [2] Funso Lokhudza Kufika Ku Chipatala\nSelected: [1] Ndalama yamayendedwe sinakwanire (Transport money unavailable)\nOrigin: Chipoka, Salima | Status: Needs Urgent Travel Grant",
        footnote: "Automated route mapping generated fare voucher requirement: MWK 14,000",
      },
      {
        id: "e3",
        channel: "ussd",
        title: "USSD Daily Symptom Check-in",
        time: "2 Days Ago 08:00",
        symptomCheck: [
          { label: "Nausea (Kusanza)", value: "2 / 5 (Mild)", tone: "ok" },
          { label: "Pain (Kuwawa)", value: "2 / 10", tone: "ok" },
          { label: "Energy (Mphamvu)", value: "Good (Yabwino)", tone: "primary" },
        ],
      },
      {
        id: "e4",
        channel: "sms",
        title: "Automated SMS Reminder Gateway",
        time: "21 Oct 10:14",
        smsBody:
          "\"Tikondane KCH: Moni Mayi Banda, tsiku lanu landondomeko yachithandizo ndi Lachinayi 24 Oct pa 08:30am. Yankhani 1 ngati mubwera, 2 ngati pali vuto.\"",
        deliveryStatus: "Delivered (Airtel MW)",
        reply: 'Patient Replied: "1" (21 Oct 11:02)',
      },
      {
        id: "e5",
        channel: "ward",
        title: "Chemo Cycle 2 Completed",
        subtitle: "Logged by Sr. Chifundo, Ward 3B",
        time: "10 Oct 14:20",
        body:
          "Paclitaxel 175mg/m\u00b2 IV completed over 3 hours without immediate hypersensitivity reaction. Premedications tolerated. Patient discharged with oral antiemetics and transport stipend receipt.",
      },
    ],
    transportFund: {
      program: "Malawi National Cancer Fund & Partners In Health",
      legs: [
        { label: "Leg 1: Chipoka (Salima) \u2192 Lilongwe Bus Depot", detail: "1 hr 45 min minibus (85 km)" },
        { label: "Leg 2: Lilongwe Depot \u2192 KCH Oncology Gate", detail: "Matola / Shared Taxi (10 km)" },
      ],
      fareMwk: 14000,
      fareUsd: 8.1,
      mobileMoney: { provider: "Airtel Money", phone: "+265 999 412 804", verifiedName: "Alineti Banda" },
      remainingFundMwk: 384000,
    },
    notes: [
      {
        id: "n1",
        author: "Sister Grace Phiri, RN (Nurse Navigator)",
        time: "23 Oct 18:00",
        body:
          "Spoke with patient's husband, James. Groundnuts sale delayed in Salima this week; cash reserve depleted. Verified patient is eager and ready for Chemo 3 as soon as minibus fare reaches Airtel wallet.",
        tags: ["Financial Barrier", "Husband Consulted"],
      },
      {
        id: "n2",
        author: "Emmanuel Zimba (Salima HSA)",
        time: "15 Oct 11:20",
        body:
          "Home visit conducted in Chipoka. Alineti recovering well from Cycle 2. Mild peripheral tingling in toes reported. Urged continued hydration and reminded them of KCH emergency line.",
        tags: [],
      },
    ],
    careTeam: [
      {
        id: "t1",
        initials: "GP",
        name: "Sr. Grace Phiri, RN",
        role: "Primary Nurse Navigator \u2022 KCH",
        avatarClass: "bg-primary text-on-primary",
        action: "call",
        phone: "+265 1 756 000",
      },
      {
        id: "t2",
        initials: "CM",
        name: "Dr. C. Mtika, MD",
        role: "Consultant Medical Oncologist",
        avatarClass: "bg-surface-container-highest text-on-surface",
        action: "mail",
      },
      {
        id: "t3",
        initials: "EZ",
        name: "Emmanuel Zimba, HSA",
        role: "Salima District Hospital / Chipoka",
        avatarClass: "bg-secondary-container text-on-secondary-container",
        action: "call",
        phone: "+265 888 333 211",
      },
    ],
    smsTemplates: {
      voucher:
        "Moni Mayi Banda, ndalama zoyendera (MWK 14,000) zatumizidwa pa Airtel Money yanu. Chonde mudze ku KCH Lolemba pa 28 Oct pa 8:00am kuchipatala cha khansala.",
      reschedule:
        "Moni Mayi Banda, tsiku lanu latsopano la mankhwala ku Ward 3B lakonzedwa: Lolemba 28 Oct pa 8:30am. Ngati muli ndi vuto, imbani +265 1 756 000.",
      nurse:
        "Moni Mayi Banda, Ndine Sister Grace waku KCH. Chonde tiyimbireni pa +265 1 756 000 tikambirane za chithandizo chanu.",
    },
  },
};

export const noteTagOptions = ["Transport", "Symptom", "Counselling", "Family Barrier"];
