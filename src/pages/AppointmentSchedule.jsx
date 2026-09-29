import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import Toast from "../components/Toast.jsx";
import { useToast } from "../hooks/useToast.js";

// Sample data. In the real app, load this from the same appointments source
// as the Navigator page so both pages always agree.
// Chair status: "in-chair" | "awaiting-lab" | "reserved" (booked, not yet arrived)
//               | "completed" | "missed"
const initialChairs = [
  { id: "chair-1", number: "Chair 01", bay: "Bay A - High-Flow Infusion", patientName: "Alineti Banda", patientId: "KCH-4092", treatment: "Chemotherapy • round 3", timeSlot: "08:30 - 11:30", status: "in-chair", progress: 70, elapsed: "1h 45m / 2h 30m", nurse: "Sr Grace Phiri" },
  { id: "chair-2", number: "Chair 02", bay: "Bay A - High-Flow Infusion", patientName: "Chimwemwe Phiri", patientId: "KCH-3881", treatment: "Chemotherapy • round 2", timeSlot: "09:00 - 12:00", status: "in-chair", progress: 45, elapsed: "1h 10m / 3h 00m", nurse: "Nurse Mwale" },
  { id: "chair-3", number: "Chair 03", bay: "Bay A - High-Flow Infusion", patientName: "Kondwani Nkhoma", patientId: "KCH-5120", treatment: "Chemotherapy • round 4", timeSlot: "08:00 - 10:30", status: "completed", progress: 100, elapsed: "Finished 10:25", nurse: "Sr Grace Phiri" },
  { id: "chair-4", number: "Chair 04", bay: "Bay B - Standard Unit", patientName: "Tiyanjane Tembo", patientId: "KCH-2904", treatment: "Chemotherapy • round 5", timeSlot: "11:30 - 14:30", status: "awaiting-lab", progress: 0, elapsed: "Waiting for CBC bloods", nurse: "Nurse Chisi" },
  { id: "chair-5", number: "Chair 05", bay: "Bay B - Standard Unit", patientName: "Mercy Kaunda", patientId: "KCH-6198", treatment: "Folfox-4 Cycle 1", timeSlot: "12:00 - 15:30", status: "reserved", progress: 0, elapsed: "Expected 11:45", nurse: "Sr Grace Phiri" },
  { id: "chair-6", number: "Chair 06", bay: "Bay B - Standard Unit", patientName: "Limbani Mtambo", patientId: "KCH-7031", treatment: "ABVD Cycle 3 • Hodgkin Lymphoma", timeSlot: "13:00 - 15:30", status: "reserved", progress: 0, elapsed: "Scheduled this afternoon", nurse: "Nurse Mwale" },
  { id: "chair-7", number: "Chair 07", bay: "Bay B - Standard Unit", patientName: "Ruth Gondwe", patientId: "KCH-3346", treatment: "Chemotherapy • round 1", timeSlot: "07:30 - 10:00", status: "missed", progress: 0, elapsed: "Did not arrive", nurse: "Nurse Chisi" },
];

const wardBeds = [
  { id: "bed-1", number: "Bed 3B-01", patient: "Doreen Zimba", status: "Occupied", condition: "Post-Chemo Observation", turnTime: "Overnight" },
  { id: "bed-2", number: "Bed 3B-02", patient: "Available", status: "Sanitized", condition: "Ready for Admission", turnTime: "Immediate" },
  { id: "bed-3", number: "Bed 3B-03", patient: "Evelyn Kampila", status: "Occupied", condition: "Neutropenic Fever Protocol", turnTime: "24h Monitor" },
  { id: "bed-4", number: "Bed 3B-04", patient: "Sanitizing", status: "Turnaround", condition: "Cleaning & Linens", turnTime: "15 mins left" },
];

const ALL_CHAIR_NUMBERS = ["08", "09", "10", "11", "12", "13", "14"];

const STATUS = {
  "in-chair": { label: "Receiving treatment", cls: "bg-secondary-container text-on-secondary-container", icon: "medication" },
  completed: { label: "Finished", cls: "bg-surface-container-highest text-on-surface-variant", icon: "check_circle" },
  "awaiting-lab": { label: "Waiting for blood test results", cls: "bg-tertiary-fixed text-on-tertiary-fixed", icon: "hourglass_top" },
  reserved: { label: "Booked, not yet arrived", cls: "bg-primary-fixed text-on-primary-fixed", icon: "schedule" },
  missed: { label: "Missed", cls: "bg-error-container text-on-error-container", icon: "event_busy" },
};

const FILTERS = [
  ["all", "All chairs"],
  ["in-chair", "Receiving treatment"],
  ["awaiting-lab", "Awaiting lab"],
  ["reserved", "Booked"],
  ["completed", "Completed"],
  ["missed", "Missed"],
];

const addHours = (time, h) => {
  const [hh, mm] = time.split(":").map(Number);
  return `${String((hh + h) % 24).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
};

const EMPTY_FORM = { patient: "", treatment: "", chair: "", start: "12:00" };

export default function AppointmentSchedule() {
  const [activeNav, setActiveNav] = useState("schedule");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [chairs, setChairs] = useState(initialChairs);
  const [showBookModal, setShowBookModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const { toast, showToast } = useToast();
  const navigate = useNavigate();

  const handleNavigate = (key) => {
    setActiveNav(key);
    if (key === "triage") navigate("/");
    else if (key === "ussd") navigate("/telemetry");
    else if (key === "schedule") navigate("/schedule");
    else if (key === "reports") navigate("/reports");
    else if (key === "approvals" || key === "staff-approvals") navigate("/staff-approvals");
  };

  const setStatus = (id, changes) =>
    setChairs((prev) => prev.map((c) => (c.id === id ? { ...c, ...changes } : c)));

  const handleBegin = (chair) => {
    setStatus(chair.id, { status: "in-chair", elapsed: "Just started", progress: 0 });
    showToast(`${chair.patientName} seated in ${chair.number}.`, "event_seat");
  };

  const handleComplete = (chair) => {
    setStatus(chair.id, { status: "completed", progress: 100, elapsed: "Finished just now" });
    showToast(`Infusion completed for ${chair.patientName}. ${chair.number} is ready for cleaning.`, "check_circle");
  };

  const handleMissed = (chair) => {
    setStatus(chair.id, { status: "missed", elapsed: "Did not arrive" });
    showToast(`${chair.patientName} marked as missed. They now appear under Missed appointments.`, "event_busy");
  };

  const usedNumbers = chairs.map((c) => c.number.replace("Chair ", ""));
  const freeChairs = ALL_CHAIR_NUMBERS.filter((n) => !usedNumbers.includes(n));

  const openBookModal = () => {
    setForm({ ...EMPTY_FORM, chair: freeChairs[0] || "" });
    setShowBookModal(true);
  };

  const handleQuickBookSubmit = (e) => {
    e.preventDefault();
    if (!form.chair) return;
    const patient = form.patient.trim();
    const isId = /^KCH-\d+$/i.test(patient);
    setChairs((prev) => [
      ...prev,
      {
        id: `chair-${form.chair}`,
        number: `Chair ${form.chair}`,
        bay: "Bay B - Standard Unit",
        patientName: isId ? "Patient " + patient.toUpperCase() : patient,
        patientId: isId ? patient.toUpperCase() : "Not linked",
        treatment: form.treatment.trim(),
        timeSlot: `${form.start} - ${addHours(form.start, 3)}`,
        status: "reserved",
        progress: 0,
        elapsed: `Expected ${form.start}`,
        nurse: "Not assigned",
      },
    ]);
    setShowBookModal(false);
    showToast(`Treatment booked in Chair ${form.chair} at ${form.start}.`, "event_available");
  };

  const count = (key) => (key === "all" ? chairs.length : chairs.filter((c) => c.status === key).length);

  const q = searchTerm.toLowerCase();
  const filteredChairs = chairs.filter((c) => {
    const matchesSearch =
      c.patientName.toLowerCase().includes(q) ||
      c.patientId.toLowerCase().includes(q) ||
      c.number.toLowerCase().includes(q);
    return matchesSearch && (filterStatus === "all" || c.status === filterStatus);
  });

  // Numbers on the summary cards come from the data above.
  const inUse = count("in-chair");
  const pctInUse = chairs.length ? Math.round((inUse / chairs.length) * 100) : 0;
  const bedsFree = wardBeds.filter((b) => b.status === "Sanitized").length;
  const bedsCleaning = wardBeds.filter((b) => b.status === "Turnaround").length;
  const todayLabel = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-background font-body-md text-on-surface min-h-screen">
      <Toast visible={toast.visible} message={toast.message} icon={toast.icon} />
      <Sidebar active={activeNav} onNavigate={handleNavigate} />
      <div className="pl-72 flex flex-col min-h-screen">
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <main className="w-full pt-20 px-8 flex-1 bg-background">
          <div className="flex flex-col w-full pb-16">
            {/* Title banner */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 bg-surface-container-lowest rounded-2xl shadow-sm mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[28px]">calendar_month</span>
                </div>
                <div>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Cancer Clinic Appointments</h1>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Kamuzu Central Hospital • Day chemotherapy chairs and Ward 3B beds
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                <button
                  onClick={openBookModal}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container shadow-sm active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  <span>Book Treatment Appointment</span>
                </button>
                <button
                  onClick={() => showToast("Exporting today's Ward 3B clinic roster PDF...", "download")}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors shadow-sm active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span>Download Today's List</span>
                </button>
              </div>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="p-5 bg-surface-container-lowest rounded-2xl shadow-sm flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Treatments Today</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline-xl text-headline-xl text-primary font-bold">{chairs.length} booked</span>
                      <span className="font-label-sm text-label-sm text-secondary font-semibold">{count("completed")} completed</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary-container/15 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[22px]">medication</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 bg-surface-container-low rounded-xl px-3 py-2 flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Receiving treatment now</span>
                  <span className="font-label-md text-label-md text-secondary font-semibold">
                    {inUse} {inUse === 1 ? "patient" : "patients"}
                  </span>
                </div>
              </div>

              <div className="p-5 bg-surface-container-lowest rounded-2xl shadow-sm flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Treatment Chairs In Use</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline-xl text-headline-xl text-on-surface font-bold">{pctInUse}%</span>
                      <span className="font-label-sm text-label-sm text-secondary font-semibold">{inUse} / {chairs.length} chairs</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[22px]">airline_seat_recline_extra</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 bg-surface-container-low rounded-xl px-3 py-2 flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Missed today</span>
                  <span className={`font-label-md text-label-md font-semibold ${count("missed") ? "text-error" : "text-on-surface"}`}>
                    {count("missed")}
                  </span>
                </div>
              </div>

              <div className="p-5 bg-surface-container-lowest rounded-2xl shadow-sm flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Overnight Beds Available</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline-xl text-headline-xl text-secondary font-bold">{bedsFree}</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">of {wardBeds.length} beds</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-secondary-container/40 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[22px]">single_bed</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 bg-surface-container-low rounded-xl px-3 py-2 flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Being cleaned</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    {bedsCleaning} {bedsCleaning === 1 ? "bed" : "beds"}
                  </span>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                {FILTERS.map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setFilterStatus(key)}
                    className={`px-4 py-2 rounded-full font-label-sm text-label-sm transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      filterStatus === key
                        ? "bg-primary text-on-primary font-semibold shadow-sm"
                        : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                    }`}
                  >
                    {key === "in-chair" && <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />}
                    {label} ({count(key)})
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-low rounded-full w-max">
                <span className="material-symbols-outlined text-[18px] text-primary">calendar_today</span>
                <span className="font-label-sm text-label-sm font-semibold text-on-surface">{todayLabel}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              {/* Chairs */}
              <div className="xl:col-span-8 flex flex-col gap-4">
                <div className="flex items-center justify-between px-1">
                  <h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">event_seat</span>
                    Day Infusion Unit - Bay A & B
                  </h2>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Supervised by Sr Grace Phiri, RN</span>
                </div>

                {filteredChairs.length === 0 ? (
                  <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-10 flex flex-col items-center text-center gap-2">
                    <span className="material-symbols-outlined text-[36px] text-on-surface-variant">event_seat</span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">No chairs match</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Try a different filter or search.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredChairs.map((chair) => {
                      const st = STATUS[chair.status];
                      return (
                        <div
                          key={chair.id}
                          className="p-5 bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container-high flex flex-col justify-between hover:shadow-md transition-shadow"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-3">
                              <div>
                                <span className="font-label-sm text-label-sm text-primary font-bold block">{chair.bay}</span>
                                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">{chair.number}</h3>
                              </div>
                              <span className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1 text-right ${st.cls}`}>
                                <span className="material-symbols-outlined text-[14px]">{st.icon}</span>
                                {st.label}
                              </span>
                            </div>

                            <div className="p-3 bg-surface-container-low rounded-xl mb-3 flex flex-col gap-1">
                              <div className="flex items-center justify-between">
                                <span className="font-label-md text-label-md font-bold text-on-surface">{chair.patientName}</span>
                                <span className="font-mono text-label-sm text-primary font-semibold">{chair.patientId}</span>
                              </div>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">{chair.treatment}</span>
                            </div>

                            <div className="flex flex-col gap-1 mb-4">
                              <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                                <span>Slot: {chair.timeSlot}</span>
                                <span className="font-mono font-semibold">{chair.elapsed}</span>
                              </div>
                              {chair.status === "in-chair" && (
                                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mt-1">
                                  <div
                                    className="bg-secondary h-full transition-all duration-500 rounded-full"
                                    style={{ width: `${chair.progress}%` }}
                                  />
                                </div>
                              )}
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-surface-container">
                              <span className="font-label-sm text-label-sm text-on-surface-variant">Nurse</span>
                              <span className="font-label-sm text-label-sm text-on-surface font-semibold">{chair.nurse}</span>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 flex items-center justify-end gap-2">
                            {chair.status === "in-chair" && (
                              <button
                                onClick={() => handleComplete(chair)}
                                className="w-full py-2 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm hover:opacity-90 transition-opacity font-semibold flex items-center justify-center gap-1"
                              >
                                <span className="material-symbols-outlined text-[16px]">task_alt</span>
                                <span>Complete Infusion</span>
                              </button>
                            )}
                            {chair.status === "completed" && (
                              <button
                                onClick={() => showToast(`${chair.number} marked clean and sanitized.`, "cleaning_services")}
                                className="w-full py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors font-semibold flex items-center justify-center gap-1"
                              >
                                <span className="material-symbols-outlined text-[16px]">sanitizer</span>
                                <span>Mark Chair as Cleaned</span>
                              </button>
                            )}
                            {chair.status === "awaiting-lab" && (
                              <button
                                onClick={() => showToast(`Alerting the doctor that ${chair.patientName}'s blood test results need review...`, "biotech")}
                                className="w-full py-2 rounded-full bg-error text-on-error font-label-sm text-label-sm hover:opacity-90 transition-opacity font-semibold flex items-center justify-center gap-1"
                              >
                                <span className="material-symbols-outlined text-[16px]">priority_high</span>
                                <span>Alert doctor: blood test result needs review</span>
                              </button>
                            )}
                            {chair.status === "reserved" && (
                              <>
                                <button
                                  onClick={() => handleMissed(chair)}
                                  className="flex-1 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors font-semibold flex items-center justify-center gap-1"
                                >
                                  <span className="material-symbols-outlined text-[16px]">event_busy</span>
                                  <span>Mark as missed</span>
                                </button>
                                <button
                                  onClick={() => handleBegin(chair)}
                                  className="flex-1 py-2 rounded-full bg-primary text-on-primary font-label-sm text-label-sm hover:bg-primary-container transition-all font-semibold flex items-center justify-center gap-1"
                                >
                                  <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                                  <span>Begin Treatment</span>
                                </button>
                              </>
                            )}
                            {chair.status === "missed" && (
                              <>
                                <button
                                  onClick={() => showToast(`Calling ${chair.patientName}...`, "phone_in_talk")}
                                  className="flex-1 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors font-semibold flex items-center justify-center gap-1"
                                >
                                  <span className="material-symbols-outlined text-[16px]">call</span>
                                  <span>Call patient</span>
                                </button>
                                <button
                                  onClick={() => showToast(`Opening rebooking for ${chair.patientName}...`, "event_repeat")}
                                  className="flex-1 py-2 rounded-full bg-primary text-on-primary font-label-sm text-label-sm hover:bg-primary-container transition-all font-semibold flex items-center justify-center gap-1"
                                >
                                  <span className="material-symbols-outlined text-[16px]">event_repeat</span>
                                  <span>Rebook</span>
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Ward beds */}
              <div className="xl:col-span-4 flex flex-col gap-6 mt-10">
                <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-5 flex flex-col">
                  <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[22px]">hotel</span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">Ward 3B Beds</h2>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                      Inpatient
                    </span>
                  </div>

                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-4 mb-4">
                    Which beds are free for overnight observation after chemotherapy.
                  </p>

                  <div className="flex flex-col gap-3">
                    {wardBeds.map((bed) => (
                      <div key={bed.id} className="p-3.5 bg-surface-container-low rounded-xl flex items-center justify-between gap-3">
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md font-bold text-on-surface">{bed.number}</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            {bed.patient} • {bed.condition}
                          </span>
                        </div>
                        <div className="text-right shrink-0">
                          <span
                            className={`font-label-sm text-label-sm font-bold block ${
                              bed.status === "Sanitized" ? "text-secondary" : bed.status === "Occupied" ? "text-primary" : "text-tertiary"
                            }`}
                          >
                            {bed.status}
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">{bed.turnTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Booking modal */}
      {showBookModal && (
        <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-xl max-w-md w-full p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container">
              <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">event_available</span>
                Book Treatment Appointment
              </h3>
              <button
                onClick={() => setShowBookModal(false)}
                aria-label="Close"
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleQuickBookSubmit} className="flex flex-col gap-4">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">Patient KCH number</label>
                <input
                  type="text"
                  required
                  value={form.patient}
                  onChange={(e) => setForm({ ...form, patient: e.target.value })}
                  placeholder="e.g. KCH-4092 or Alineti Banda"
                  className="w-full h-11 px-3 bg-surface-container-low rounded-xl text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">Treatment and cycle</label>
                <input
                  type="text"
                  required
                  value={form.treatment}
                  onChange={(e) => setForm({ ...form, treatment: e.target.value })}
                  placeholder="e.g. Chemotherapy • round 3"
                  className="w-full h-11 px-3 bg-surface-container-low rounded-xl text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">Chair</label>
                  <select
                    value={form.chair}
                    onChange={(e) => setForm({ ...form, chair: e.target.value })}
                    disabled={freeChairs.length === 0}
                    className="w-full h-11 px-3 bg-surface-container-low rounded-xl text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {freeChairs.length === 0 && <option value="">No free chairs</option>}
                    {freeChairs.map((n) => (
                      <option key={n} value={n}>
                        Chair {n} (Bay B)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">Start time</label>
                  <input
                    type="time"
                    value={form.start}
                    onChange={(e) => setForm({ ...form, start: e.target.value })}
                    className="w-full h-11 px-3 bg-surface-container-low rounded-xl text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBookModal(false)}
                  className="px-4 py-2.5 rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={freeChairs.length === 0}
                  className="px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all font-semibold shadow-sm disabled:opacity-40"
                >
                  Confirm and schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}