import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import Toast from "../components/Toast.jsx";
import { useToast } from "../hooks/useToast.js";


const APPOINTMENTS = [
  { id: "ap1", patientId: "KCH-4092", name: "Alineti Banda", phone: "+265 99 412 8820", day: "today", time: "08:30", reason: "Chemotherapy", bookedVia: "Phone menu", status: "confirmed", note: "" },
  { id: "ap2", patientId: "KCH-3318", name: "Chikondi Phiri", phone: "+265 88 201 5544", day: "today", time: "09:15", reason: "Doctor review", bookedVia: "Text message", status: "booked", note: "Fever for 3 days, vomiting" },
  { id: "ap3", patientId: "KCH-5120", name: "Yamikani Mwale", phone: "+265 99 770 3091", day: "today", time: "10:00", reason: "Wound dressing", bookedVia: "Nurse", status: "arrived", note: "Wound is bleeding" },
  { id: "ap4", patientId: "KCH-2764", name: "Mercy Chirwa", phone: "+265 88 645 1207", day: "today", time: "11:30", reason: "Blood tests", bookedVia: "Phone menu", status: "booked", note: "" },
  { id: "ap5", patientId: "KCH-6031", name: "Peter Kachingwe", phone: "+265 99 318 9942", day: "tomorrow", time: "08:00", reason: "Radiotherapy", bookedVia: "Nurse", status: "confirmed", note: "" },
  { id: "ap6", patientId: "KCH-1987", name: "Grace Nyirenda", phone: "+265 88 902 7315", day: "tomorrow", time: "10:45", reason: "CT scan", bookedVia: "Phone menu", status: "booked", note: "" },
  { id: "ap7", patientId: "KCH-4450", name: "Joseph Msiska", phone: "+265 99 556 0183", day: "week", time: "09:00", reason: "Medicine refill", bookedVia: "Text message", status: "booked", note: "" },
  { id: "ap8", patientId: "KCH-2904", name: "Tiyanjane Tembo", phone: "+265 99 234 6671", day: "earlier", dateLabel: "Mon 28 Sep", dateSort: 28, time: "09:30", reason: "Chemotherapy", bookedVia: "Phone menu", status: "missed", note: "", followUp: "" },
  { id: "ap9", patientId: "KCH-6198", name: "Mercy Kaunda", phone: "+265 88 417 5029", day: "earlier", dateLabel: "Mon 28 Sep", dateSort: 28, time: "12:00", reason: "Chemotherapy", bookedVia: "Nurse", status: "missed", note: "", followUp: "Called, no answer" },
  { id: "ap10", patientId: "KCH-3775", name: "Esther Banda", phone: "+265 99 863 4102", day: "earlier", dateLabel: "Sun 27 Sep", dateSort: 27, time: "10:15", reason: "Doctor review", bookedVia: "Text message", status: "missed", note: "", followUp: "Rebooked for 1 Oct" },
];

const DAY_TABS = [
  ["today", "Today"],
  ["tomorrow", "Tomorrow"],
  ["week", "Later this week"],
  ["missed", "Missed"],
  ["all", "All"],
];

const DAY_ORDER = { earlier: -1, today: 0, tomorrow: 1, week: 2 };

const STATUS = {
  booked: { label: "Booked", cls: "bg-surface-container-high text-on-surface", icon: "event" },
  confirmed: { label: "Patient confirmed", cls: "bg-primary-fixed text-on-primary-fixed", icon: "event_available" },
  arrived: { label: "Arrived", cls: "bg-secondary-container text-on-secondary-container", icon: "how_to_reg" },
  missed: { label: "Missed", cls: "bg-error-container text-on-error-container", icon: "event_busy" },
};

export default function NavigatorDashboard() {
  const [activeNav, setActiveNav] = useState("triage");
  const [searchTerm, setSearchTerm] = useState("");
  const [day, setDay] = useState("today");
  const [reason, setReason] = useState("all");
  const [contacted, setContacted] = useState({});
  const { toast, showToast } = useToast();
  const navigate = useNavigate();

  const handleNavigate = (key) => {
    setActiveNav(key);
    if (key === "ussd") navigate("/telemetry");
    else if (key === "schedule") navigate("/schedule");
    else if (key === "reports") navigate("/reports");
    else if (key === "triage") navigate("/");
    else if (key === "approvals" || key === "staff-approvals") navigate("/staff-approvals");
  };

  const reasons = useMemo(() => [...new Set(APPOINTMENTS.map((a) => a.reason))].sort(), []);

  const visible = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return APPOINTMENTS.filter((a) => day === "all" || (day === "missed" ? a.status === "missed" : a.day === day))
      .filter((a) => reason === "all" || a.reason === reason)
      .filter(
        (a) =>
          !q ||
          [a.name, a.patientId, a.phone, a.reason, a.note].some((v) => v.toLowerCase().includes(q))
      )
      .sort(
        (a, b) =>
          DAY_ORDER[a.day] - DAY_ORDER[b.day] ||
          (a.dateSort || 0) - (b.dateSort || 0) ||
          a.time.localeCompare(b.time)
      );
  }, [day, reason, searchTerm]);

  const count = (key) =>
    key === "all"
      ? APPOINTMENTS.length
      : key === "missed"
      ? APPOINTMENTS.filter((a) => a.status === "missed").length
      : APPOINTMENTS.filter((a) => a.day === key).length;

  return (
    <div className="bg-background font-body-md text-on-surface min-h-screen">
      <Sidebar active={activeNav} onNavigate={handleNavigate} />
      <div className="pl-72 flex flex-col min-h-screen">
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <main className="w-full pt-20 px-8 flex-1 bg-background">
          <div className="flex flex-col w-full pb-12 gap-6">
            {/* Title and actions */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
              <div className="flex flex-col">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mb-1 w-max rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Kamuzu Central Hospital • Cancer Unit
                </span>
                <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Booked appointments</h1>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Who is coming, when, what for, and who missed their visit. If a patient reports a symptom, a clinician decides how urgent it is.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => showToast("Opening group text message form for the cancer ward...", "forward_to_inbox")}
                  className="flex items-center gap-2 h-11 px-4 rounded-full bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container transition-all"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">forward_to_inbox</span>
                  <span className="font-label-md text-label-md">Send Group Text Message</span>
                </button>
                <button
                  onClick={() => navigate("/registry")}
                  className="flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-on-primary shadow-sm hover:bg-primary-container transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">person_add</span>
                  <span className="font-label-md text-label-md">Register New Patient</span>
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto">
                {DAY_TABS.map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setDay(key)}
                    className={`px-4 py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-colors ${
                      day === key
                        ? "bg-primary text-on-primary shadow-sm"
                        : "bg-surface-container-low text-on-surface hover:bg-surface-container"
                    }`}
                  >
                    {label} ({count(key)})
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-surface-container-low rounded-full w-full lg:w-auto">
                <span className="material-symbols-outlined text-[18px] text-primary">filter_list</span>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="bg-transparent font-label-sm text-label-sm text-on-surface focus:outline-none cursor-pointer pr-3"
                >
                  <option value="all">All appointment types</option>
                  {reasons.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Appointments table */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
                      <th className="py-3 px-4 font-semibold">Time</th>
                      <th className="py-3 px-4 font-semibold">Patient</th>
                      <th className="py-3 px-4 font-semibold">Appointment for</th>
                      <th className="py-3 px-4 font-semibold">Booked by</th>
                      <th className="py-3 px-4 font-semibold">Status</th>
                      <th className="py-3 px-4 text-right font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="font-body-sm text-body-sm">
                    {visible.map((a) => {
                      const st = STATUS[a.status];
                      return (
                        <tr key={a.id} className="hover:bg-surface-container-low/70 transition-colors">
                          <td className="py-3.5 px-4 align-top">
                            <span className="font-label-md text-label-md text-on-surface font-semibold font-mono">{a.time}</span>
                            {(day === "all" || day === "missed") && (
                              <span className="block font-label-sm text-label-sm text-on-surface-variant capitalize">
                                {a.dateLabel || (a.day === "week" ? "Later this week" : a.day)}
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 align-top">
                            <div className="flex flex-col">
                              <span className="font-label-md text-label-md text-on-surface font-semibold">{a.name}</span>
                              <span className="font-body-sm text-body-sm text-primary font-mono">{a.patientId}</span>
                              <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">{a.phone}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 align-top max-w-xs">
                            <span className="font-label-md text-label-md text-on-surface font-semibold">{a.reason}</span>
                            {a.note && (
                              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                                Patient reported: {a.note}
                              </p>
                            )}
                          </td>
                          <td className="py-3.5 px-4 align-top text-on-surface-variant">{a.bookedVia}</td>
                          <td className="py-3.5 px-4 align-top">
                            <span className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1 w-max ${st.cls}`}>
                              <span className="material-symbols-outlined text-[14px]">{st.icon}</span>
                              {st.label}
                            </span>
                            {a.status === "missed" && (
                              <span className="block text-[11px] text-on-surface-variant mt-1">
                                {contacted[a.id] || a.followUp || "Not contacted yet"}
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 align-top">
                            <div className="flex items-center justify-end gap-2">
                              {a.status === "missed" && (
                                <button
                                  onClick={() => showToast(`Opening rebooking for ${a.name}...`, "event_repeat")}
                                  className="px-3 py-1.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm flex items-center gap-1 transition-colors hover:bg-primary-container"
                                >
                                  <span className="material-symbols-outlined text-[16px]">event_repeat</span>
                                  Rebook
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  showToast(`Calling ${a.name} at ${a.phone}...`, "phone_in_talk");
                                  if (a.status === "missed") setContacted((c) => ({ ...c, [a.id]: "Called today" }));
                                }}
                                className="px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm flex items-center gap-1 transition-colors"
                              >
                                <span className="material-symbols-outlined text-[16px]">call</span>
                                Call
                              </button>
                              <button
                                onClick={() => navigate(`/patients/${a.patientId}`)}
                                className="px-3 py-1.5 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface font-label-sm text-label-sm flex items-center gap-1 transition-colors"
                              >
                                Patient file
                                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {visible.length === 0 && (
                <div className="p-10 flex flex-col items-center text-center gap-2">
                  <span className="material-symbols-outlined text-[36px] text-on-surface-variant">event_busy</span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">No appointments found</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
                    Try a different day, appointment type or search.
                  </p>
                </div>
              )}

              <div className="p-4 bg-surface-container-low">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Showing {visible.length} of {APPOINTMENTS.length} booked appointments, in time order
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Toast visible={toast.visible} message={toast.message} icon={toast.icon} />
    </div>
  );
}