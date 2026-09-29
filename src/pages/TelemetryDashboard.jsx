import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";

const INITIAL_ALERTS = [
  {
    id: "a1",
    level: "critical",
    patient: "Alineti Banda",
    patientId: "KCH-4092",
    phone: "+265 99 412 8820",
    area: "Salima",
    minutesAgo: 4,
    message: "Chifuwa chikundipweteka, ndikupuma movutikira",
    meaning: "Chest pain and difficulty breathing",
    channel: "Phone menu",
    handledBy: null,
  },
  {
    id: "a2",
    level: "urgent",
    patient: "Chikondi Phiri",
    patientId: "KCH-3318",
    phone: "+265 88 201 5544",
    area: "Dedza",
    minutesAgo: 18,
    message: "Kutentha thupi masiku atatu, ndikusanza",
    meaning: "Fever for 3 days with vomiting",
    channel: "Text message",
    handledBy: null,
  },
  {
    id: "a3",
    level: "urgent",
    patient: "Yamikani Mwale",
    patientId: "KCH-5120",
    phone: "+265 99 770 3091",
    area: "Lilongwe",
    minutesAgo: 41,
    message: "Bala likutuluka magazi",
    meaning: "Wound is bleeding",
    channel: "Phone menu",
    handledBy: null,
  },
];

const LEVELS = {
  critical: {
    label: "Critical",
    chip: "bg-error text-on-error",
    bar: "bg-error",
    icon: "emergency",
  },
  urgent: {
    label: "Urgent",
    chip: "bg-error-container text-on-error-container",
    bar: "bg-tertiary",
    icon: "warning",
  },
};

const waitText = (m) => (m < 60 ? `${m} min ago` : `${Math.floor(m / 60)} h ${m % 60} min ago`);

export default function UrgentAlerts() {
  const [activeNav, setActiveNav] = useState("ussd");
  const [searchTerm, setSearchTerm] = useState("");
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [tab, setTab] = useState("open");
  const [selectedId, setSelectedId] = useState(INITIAL_ALERTS[0].id);
  const navigate = useNavigate();

  const handleNavigate = (key) => {
    setActiveNav(key);
    if (key === "triage") navigate("/");
    else if (key === "ussd") navigate("/telemetry");
    else if (key === "schedule") navigate("/schedule");
    else if (key === "reports") navigate("/reports");
    else if (key === "approvals" || key === "staff-approvals") navigate("/staff-approvals");
  };

  const markHandled = (id) =>
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, handledBy: "You" } : a)));

  const openCount = alerts.filter((a) => !a.handledBy).length;
  const handledCount = alerts.length - openCount;

  const visible = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return alerts
      .filter((a) => (tab === "open" ? !a.handledBy : !!a.handledBy))
      .filter(
        (a) =>
          !q ||
          [a.patient, a.patientId, a.phone, a.message, a.meaning].some((v) =>
            v.toLowerCase().includes(q)
          )
      )
      .sort(
        (a, b) =>
          (a.level === "critical" ? 0 : 1) - (b.level === "critical" ? 0 : 1) ||
          a.minutesAgo - b.minutesAgo
      );
  }, [alerts, tab, searchTerm]);

  const selected = alerts.find((a) => a.id === selectedId) || visible[0];

  return (
    <div className="bg-background font-body-md text-on-surface min-h-screen">
      <Sidebar active={activeNav} onNavigate={handleNavigate} />
      <div className="pl-72 flex flex-col min-h-screen">
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <main className="w-full pt-20 px-8 flex-1 bg-background">
          <div className="flex flex-col w-full pb-16 gap-6">
            {/* Title and counts */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 bg-surface-container-lowest rounded-2xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-error-container text-error">
                  <span className="material-symbols-outlined text-[22px]">notification_important</span>
                </div>
                <div>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                    Patients who need help now
                  </h1>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Symptoms patients reported by phone menu or text message. Routine activity is not shown here.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-2xl bg-error-container text-on-error-container">
                  <span className="font-headline-lg text-headline-lg font-bold mr-2">{openCount}</span>
                  <span className="font-label-md text-label-md">waiting for review</span>
                </div>
                <div className="px-4 py-2 rounded-2xl bg-surface-container text-on-surface">
                  <span className="font-headline-lg text-headline-lg font-bold mr-2">{handledCount}</span>
                  <span className="font-label-md text-label-md">handled today</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              {/* Alert list */}
              <div className="xl:col-span-7 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  {[
                    ["open", `Needs action (${openCount})`],
                    ["handled", `Handled (${handledCount})`],
                  ].map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setTab(key)}
                      className={`px-4 py-2 rounded-full font-label-md text-label-md transition-colors ${
                        tab === key
                          ? "bg-primary text-on-primary shadow-sm"
                          : "bg-surface-container-lowest text-on-surface hover:bg-surface-container"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {visible.length === 0 ? (
                  <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-10 flex flex-col items-center text-center gap-2">
                    <span className="material-symbols-outlined text-[36px] text-secondary">check_circle</span>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">
                      {tab === "open" ? "No patients are waiting" : "Nothing handled yet"}
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
                      {tab === "open"
                        ? "New urgent symptom reports will appear here as soon as a patient sends one."
                        : "Alerts you mark as handled will be listed here."}
                    </p>
                  </div>
                ) : (
                  visible.map((a) => {
                    const lv = LEVELS[a.level];
                    const isSel = selected && selected.id === a.id;
                    return (
                      <div
                        key={a.id}
                        onClick={() => setSelectedId(a.id)}
                        className={`flex bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden cursor-pointer transition-shadow ${
                          isSel ? "ring-2 ring-primary" : "hover:shadow-md"
                        }`}
                      >
                        <div className={`w-1.5 shrink-0 ${lv.bar}`}></div>
                        <div className="flex-1 p-4 flex flex-col gap-2 min-w-0">
                          <div className="flex items-center justify-between gap-3 flex-wrap">
                            <div className="flex items-center gap-2">
                              <span className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-bold flex items-center gap-1 ${lv.chip}`}>
                                <span className="material-symbols-outlined text-[14px]">{lv.icon}</span>
                                {lv.label}
                              </span>
                              <span className="font-label-md text-label-md text-on-surface font-semibold">{a.patient}</span>
                              <span className="font-body-sm text-body-sm text-primary font-mono">{a.patientId}</span>
                            </div>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              {waitText(a.minutesAgo)}
                            </span>
                          </div>
                          <p className="font-body-md text-body-md text-on-surface">{a.meaning}</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant italic">“{a.message}”</p>
                          <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              {a.area} • {a.channel}
                            </span>
                            {a.handledBy ? (
                              <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">done_all</span>
                                Handled by {a.handledBy}
                              </span>
                            ) : (
                              <div className="flex items-center gap-2">
                                <a
                                  href={`tel:${a.phone.replace(/\s/g, "")}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="px-3.5 py-1.5 rounded-full bg-error text-on-error font-label-sm text-label-sm font-semibold flex items-center gap-1 active:scale-95 transition-transform"
                                >
                                  <span className="material-symbols-outlined text-[16px]">call</span>
                                  Call patient
                                </a>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markHandled(a.id);
                                  }}
                                  className="px-3.5 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold active:scale-95 transition-transform"
                                >
                                  Mark as handled
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Detail panel */}
              <div className="xl:col-span-5 flex flex-col gap-6">
                {selected ? (
                  <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-5 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">Patient details</h2>
                      <span className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-bold ${LEVELS[selected.level].chip}`}>
                        {LEVELS[selected.level].label}
                      </span>
                    </div>
                    <div className="p-3.5 bg-surface-container-low rounded-xl flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          {selected.patient} ({selected.patientId})
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant font-mono">
                          {selected.phone} • {selected.area}
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-primary text-[22px]">contact_phone</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                        What the patient reported
                      </span>
                      <p className="font-body-md text-body-md text-on-surface">{selected.meaning}</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant italic">“{selected.message}”</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                        Received
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface">
                        {waitText(selected.minutesAgo)} by {selected.channel.toLowerCase()}
                      </p>
                    </div>
                    {!selected.handledBy && (
                      <div className="flex flex-col gap-2 pt-1">
                        <a
                          href={`tel:${selected.phone.replace(/\s/g, "")}`}
                          className="w-full py-2.5 rounded-full bg-error text-on-error font-label-md text-label-md font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform"
                        >
                          <span className="material-symbols-outlined text-[18px]">call</span>
                          Call {selected.patient.split(" ")[0]}
                        </a>
                        <button
                          onClick={() => markHandled(selected.id)}
                          className="w-full py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold active:scale-95 transition-transform"
                        >
                          Mark as handled
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-5 text-on-surface-variant font-body-sm text-body-sm">
                    Select an alert to see the patient's details.
                  </div>
                )}

                <div className="bg-surface-container-low rounded-2xl p-4 flex items-start gap-3">
                  <span className="material-symbols-outlined text-[20px] text-on-surface-variant">info</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Regular phone menu use and appointment reminders are still recorded. See them in{" "}
                    <button className="text-primary font-semibold underline" onClick={() => navigate("/reports")}>
                      Reports
                    </button>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}