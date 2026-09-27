import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import Toast from "../components/Toast.jsx";
import { useToast } from "../hooks/useToast.js";

const initialChairs = [
  {
    id: "chair-1",
    number: "Chair 01",
    bay: "Bay A - High-Flow Infusion",
    patientName: "Alineti Banda",
    patientId: "KCH-4092",
    regimen: "AC-T Cycle 3 • Paclitaxel 175mg/m²",
    timeSlot: "08:30 AM - 11:30 AM",
    status: "in-chair", // in-chair, ready, completed, reserved
    progress: 70,
    elapsed: "1h 45m / 2h 30m",
    corridor: "Salima Lakeshore",
    minibusSync: true,
    nurse: "Sr Grace Phiri",
  },
  {
    id: "chair-2",
    number: "Chair 02",
    bay: "Bay A - High-Flow Infusion",
    patientName: "Chimwemwe Phiri",
    patientId: "KCH-3881",
    regimen: "FAC Cycle 2 • 5-FU + Doxorubicin",
    timeSlot: "09:00 AM - 12:00 PM",
    status: "in-chair",
    progress: 45,
    elapsed: "1h 10m / 3h 00m",
    corridor: "Dedza Escarpment",
    minibusSync: true,
    nurse: "Nurse Mwale",
  },
  {
    id: "chair-3",
    number: "Chair 03",
    bay: "Bay A - High-Flow Infusion",
    patientName: "Kondwani Nkhoma",
    patientId: "KCH-5120",
    regimen: "CHOP Cycle 4 • Cyclophosphamide",
    timeSlot: "08:00 AM - 10:30 AM",
    status: "completed",
    progress: 100,
    elapsed: "Finished 10:25 AM",
    corridor: "Lilongwe Urban",
    minibusSync: true,
    nurse: "Sr Grace Phiri",
  },
  {
    id: "chair-4",
    number: "Chair 04",
    bay: "Bay B - Standard Unit",
    patientName: "Tiyanjane Tembo",
    patientId: "KCH-2904",
    regimen: "Carboplatin + Paclitaxel",
    timeSlot: "11:30 AM - 02:30 PM",
    status: "awaiting-lab",
    progress: 0,
    elapsed: "Waiting CBC Bloods",
    corridor: "Kasungu North",
    minibusSync: true,
    nurse: "Nurse Chisi",
  },
  {
    id: "chair-5",
    number: "Chair 05",
    bay: "Bay B - Standard Unit",
    patientName: "Mercy Kaunda",
    patientId: "KCH-6198",
    regimen: "Folfox-4 Cycle 1",
    timeSlot: "12:00 PM - 03:30 PM",
    status: "reserved",
    progress: 0,
    elapsed: "Arriving 11:45 AM",
    corridor: "Nkhotakota Corridor",
    minibusSync: false,
    nurse: "Sr Grace Phiri",
  },
  {
    id: "chair-6",
    number: "Chair 06",
    bay: "Bay B - Standard Unit",
    patientName: "Limbani Mtambo",
    patientId: "KCH-7031",
    regimen: "ABVD Cycle 3 • Hodgkin Lymphoma",
    timeSlot: "01:00 PM - 03:30 PM",
    status: "reserved",
    progress: 0,
    elapsed: "Scheduled Afternoon",
    corridor: "Ntcheu South",
    minibusSync: true,
    nurse: "Nurse Mwale",
  },
];

const wardBeds = [
  { id: "bed-1", number: "Bed 3B-01", patient: "Doreen Zimba", status: "Occupied", condition: "Post-Chemo Observation", turnTime: "Overnight" },
  { id: "bed-2", number: "Bed 3B-02", patient: "Available", status: "Sanitized", condition: "Ready for Admission", turnTime: "Immediate" },
  { id: "bed-3", number: "Bed 3B-03", patient: "Evelyn Kampila", status: "Occupied", condition: "Neutropenic Fever Protocol", turnTime: "24h Monitor" },
  { id: "bed-4", number: "Bed 3B-04", patient: "Sanitizing", status: "Turnaround", condition: "Cleaning & Linens", turnTime: "15 mins left" },
];

const corridorBatches = [
  { corridor: "Salima Lakeshore", minibus: "Minibus #04 (Airtel Voucher)", arrival: "08:15 AM", returnDep: "03:45 PM", patients: 6, status: "On Site" },
  { corridor: "Dedza Escarpment", minibus: "Minibus #02 (TNM Voucher)", arrival: "08:45 AM", returnDep: "04:00 PM", patients: 5, status: "On Site" },
  { corridor: "Kasungu Corridor", minibus: "Express Shuttle #01", arrival: "09:30 AM", returnDep: "04:30 PM", patients: 4, status: "In Transit" },
];

export default function AppointmentSchedule() {
  const [activeNav, setActiveNav] = useState("schedule");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [chairs, setChairs] = useState(initialChairs);
  const [showBookModal, setShowBookModal] = useState(false);
  const { toast, showToast } = useToast();
  const navigate = useNavigate();

  const handleNavigate = (key) => {
    setActiveNav(key);
    if (key === "triage") {
      navigate("/");
    } else if (key === "ussd") {
      navigate("/telemetry");
    } else if (key === "schedule") {
      navigate("/schedule");
    } else if (key === "reports") {
      navigate("/reports");
    } else if (key === "approvals" || key === "staff-approvals") {
      navigate("/staff-approvals");
    }
  };

  const handleCompleteSession = (chairId, patientName) => {
    setChairs((prev) =>
      prev.map((c) =>
        c.id === chairId
          ? { ...c, status: "completed", progress: 100, elapsed: "Finished just now" }
          : c
      )
    );
    showToast(`Chemotherapy infusion completed for ${patientName}. Chair ready for sanitization.`, "check_circle");
  };

  const handleQuickBookSubmit = (e) => {
    e.preventDefault();
    setShowBookModal(false);
    showToast("New infusion session scheduled for Chair 05 & transport voucher generated.", "event_available");
  };

  const filteredChairs = chairs.filter((c) => {
    const matchesSearch =
      c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.number.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterStatus === "all") return matchesSearch;
    return matchesSearch && c.status === filterStatus;
  });

  return (
    <div className="bg-background font-body-md text-on-surface min-h-screen">
      <Toast toast={toast} />
      <Sidebar active={activeNav} onNavigate={handleNavigate} />
      <div className="pl-72 flex flex-col min-h-screen">
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <main className="w-full pt-20 px-8 flex-1 bg-background">
          <div className="flex flex-col w-full pb-16">
            
            {/* Top Title & Header Banner */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 bg-surface-container-lowest rounded-2xl shadow-sm mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[28px]">calendar_month</span>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                      Oncology Clinic Schedule & Ward 3B Bed Management
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" /> Live Operational Sync
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Kamuzu Central Hospital • Day Chemotherapy Infusion Chairs & Rural Minibus Corridor Logistics
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                <button
                  onClick={() => setShowBookModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container shadow-sm active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  <span>Book Infusion Session</span>
                </button>
                <button
                  onClick={() => showToast("Exporting today's Ward 3B clinic roster PDF...", "download")}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors shadow-sm active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span>Export Roster</span>
                </button>
                <button
                  onClick={() => showToast("Synchronizing minibus transport vouchers with Airtel gateway...", "sync")}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md hover:opacity-95 shadow-sm active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">directions_bus</span>
                  <span>Sync Minibus Timetable</span>
                </button>
              </div>
            </div>

            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="p-5 bg-surface-container-lowest rounded-2xl shadow-sm flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                      Today's Infusions
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline-xl text-headline-xl text-primary font-bold">24</span>
                      <span className="font-label-sm text-label-sm text-secondary font-semibold">18 Completed</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary-container/15 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[22px]">medication</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 bg-surface-container-low rounded-xl px-3 py-2 flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Active In-Chair</span>
                  <span className="font-label-md text-label-md text-secondary font-semibold">4 Patients</span>
                </div>
              </div>

              <div className="p-5 bg-surface-container-lowest rounded-2xl shadow-sm flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                      Infusion Chair Occupancy
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline-xl text-headline-xl text-on-surface font-bold">85%</span>
                      <span className="font-label-sm text-label-sm text-secondary font-semibold">12 / 14 Active</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[22px]">airline_seat_recline_extra</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 bg-surface-container-low rounded-xl px-3 py-2 flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Turnaround Time</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">12 mins avg</span>
                </div>
              </div>

              <div className="p-5 bg-surface-container-lowest rounded-2xl shadow-sm flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                      Ward 3B Beds Available
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline-xl text-headline-xl text-secondary font-bold">4</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">of 8 Beds</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-secondary-container/40 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[22px]">single_bed</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 bg-surface-container-low rounded-xl px-3 py-2 flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Cleaned & Sanitized</span>
                  <span className="font-label-md text-label-md text-secondary font-semibold">Ready for Admission</span>
                </div>
              </div>

              <div className="p-5 bg-surface-container-lowest rounded-2xl shadow-sm flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                      Rural Minibus Sync
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline-xl text-headline-xl text-primary font-bold">100%</span>
                      <span className="font-label-sm text-label-sm text-secondary font-semibold">15 Patients</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[22px]">directions_bus</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 bg-surface-container-low rounded-xl px-3 py-2 flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Return Minibus</span>
                  <span className="font-label-md text-label-md text-tertiary font-semibold">Departs 03:45 PM</span>
                </div>
              </div>
            </div>

            {/* Filter & View Control Bar */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                <button
                  onClick={() => setFilterStatus("all")}
                  className={`px-4 py-2 rounded-full font-label-sm text-label-sm transition-all whitespace-nowrap ${
                    filterStatus === "all"
                      ? "bg-primary text-on-primary font-semibold shadow-sm"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                  }`}
                >
                  All Chairs ({chairs.length})
                </button>
                <button
                  onClick={() => setFilterStatus("in-chair")}
                  className={`px-4 py-2 rounded-full font-label-sm text-label-sm transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    filterStatus === "in-chair"
                      ? "bg-primary text-on-primary font-semibold shadow-sm"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
                  In-Chair (2)
                </button>
                <button
                  onClick={() => setFilterStatus("awaiting-lab")}
                  className={`px-4 py-2 rounded-full font-label-sm text-label-sm transition-all whitespace-nowrap ${
                    filterStatus === "awaiting-lab"
                      ? "bg-primary text-on-primary font-semibold shadow-sm"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                  }`}
                >
                  Awaiting Lab (1)
                </button>
                <button
                  onClick={() => setFilterStatus("completed")}
                  className={`px-4 py-2 rounded-full font-label-sm text-label-sm transition-all whitespace-nowrap ${
                    filterStatus === "completed"
                      ? "bg-primary text-on-primary font-semibold shadow-sm"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                  }`}
                >
                  Completed (1)
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-low rounded-full">
                  <span className="material-symbols-outlined text-[18px] text-primary">calendar_today</span>
                  <span className="font-label-sm text-label-sm font-semibold text-on-surface">Thursday, 24 Oct 2024</span>
                </div>
              </div>
            </div>

            {/* Main Content Layout (Chairs Grid + Right Panels) */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              
              {/* Infusion Chairs Grid (8 Cols) */}
              <div className="xl:col-span-8 flex flex-col gap-4">
                <div className="flex items-center justify-between px-1">
                  <h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">event_seat</span>
                    Day Infusion Unit - Bay A & B Allocations
                  </h2>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Supervised by Sr Grace Phiri, RN
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredChairs.map((chair) => (
                    <div
                      key={chair.id}
                      className="p-5 bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container-high flex flex-col justify-between hover:shadow-md transition-shadow"
                    >
                      <div>
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div>
                            <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider block">
                              {chair.bay}
                            </span>
                            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                              {chair.number}
                            </h3>
                          </div>
                          {chair.status === "in-chair" && (
                            <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" /> In-Chair
                            </span>
                          )}
                          {chair.status === "completed" && (
                            <span className="px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-semibold flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">check_circle</span> Finished
                            </span>
                          )}
                          {chair.status === "awaiting-lab" && (
                            <span className="px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">hourglass_top</span> Lab Pending
                            </span>
                          )}
                          {chair.status === "reserved" && (
                            <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">schedule</span> Reserved
                            </span>
                          )}
                        </div>

                        {/* Patient Details */}
                        <div className="p-3 bg-surface-container-low rounded-xl mb-3 flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <span className="font-label-md text-label-md font-bold text-on-surface">
                              {chair.patientName}
                            </span>
                            <span className="font-mono text-label-sm text-primary font-semibold">
                              {chair.patientId}
                            </span>
                          </div>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            {chair.regimen}
                          </span>
                        </div>

                        {/* Time & Progress */}
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

                        {/* Corridor Info */}
                        <div className="flex items-center justify-between text-body-sm text-on-surface-variant pt-2 border-t border-surface-container">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-primary">directions_bus</span>
                            <span className="font-label-sm text-label-sm">{chair.corridor}</span>
                          </div>
                          <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                            {chair.nurse}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-4 pt-3 flex items-center justify-end gap-2">
                        {chair.status === "in-chair" && (
                          <button
                            onClick={() => handleCompleteSession(chair.id, chair.patientName)}
                            className="w-full py-2 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm hover:opacity-90 transition-opacity font-semibold flex items-center justify-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[16px]">task_alt</span>
                            <span>Complete Infusion</span>
                          </button>
                        )}
                        {chair.status === "completed" && (
                          <button
                            onClick={() => showToast(`Chair ${chair.number} marked clean & sanitized.`, "cleaning_services")}
                            className="w-full py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors font-semibold flex items-center justify-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[16px]">sanitizer</span>
                            <span>Mark Sanitized</span>
                          </button>
                        )}
                        {chair.status === "awaiting-lab" && (
                          <button
                            onClick={() => showToast(`Paging Kamuzu Central Lab for ${chair.patientName} CBC bloods...`, "biotech")}
                            className="w-full py-2 rounded-full bg-error text-on-error font-label-sm text-label-sm hover:opacity-90 transition-opacity font-semibold flex items-center justify-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[16px]">priority_high</span>
                            <span>Escalate Blood Count</span>
                          </button>
                        )}
                        {chair.status === "reserved" && (
                          <button
                            onClick={() => {
                              setChairs((prev) =>
                                prev.map((c) => (c.id === chair.id ? { ...c, status: "in-chair" } : c))
                              );
                              showToast(`Patient ${chair.patientName} seated in ${chair.number}.`, "event_seat");
                            }}
                            className="w-full py-2 rounded-full bg-primary text-on-primary font-label-sm text-label-sm hover:bg-primary-container transition-all font-semibold flex items-center justify-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                            <span>Start Session</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side Column (4 Cols) */}
              <div className="xl:col-span-4 flex flex-col gap-6">
                
                {/* Ward 3B Bed Turnaround Track */}
                <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-5 flex flex-col">
                  <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[22px]">hotel</span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">Ward 3B Turnaround Track</h2>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                      Inpatient Monitor
                    </span>
                  </div>

                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-3 mb-4">
                    Real-time bed availability for post-chemo overnight observation & toxicity management.
                  </p>

                  <div className="flex flex-col gap-3">
                    {wardBeds.map((bed) => (
                      <div key={bed.id} className="p-3.5 bg-surface-container-low rounded-xl flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md font-bold text-on-surface">
                            {bed.number}
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            {bed.patient} • {bed.condition}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className={`font-label-sm text-label-sm font-bold block ${
                            bed.status === "Sanitized" ? "text-secondary" : bed.status === "Occupied" ? "text-primary" : "text-tertiary"
                          }`}>
                            {bed.status}
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            {bed.turnTime}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rural Minibus Corridor Logistics */}
                <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-5 flex flex-col">
                  <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[22px]">directions_bus</span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">Corridor Batches Today</h2>
                    </div>
                    <span className="font-label-sm text-label-sm text-secondary font-semibold">
                      Mayendedwe Sync
                    </span>
                  </div>

                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-3 mb-4">
                    Synchronizing clinic chair slots with rural public minibuses prevents missed cycles.
                  </p>

                  <div className="flex flex-col gap-3">
                    {corridorBatches.map((batch, idx) => (
                      <div key={idx} className="p-3.5 bg-surface-container-low rounded-xl flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md font-bold text-on-surface">
                            {batch.corridor}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                            {batch.status}
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {batch.minibus} • {batch.patients} Patients
                        </p>
                        <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface pt-1 border-t border-surface-container-highest">
                          <span>Arr: {batch.arrival}</span>
                          <span className="font-semibold text-primary">Return Dep: {batch.returnDep}</span>
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

      {/* Quick Booking Modal */}
      {showBookModal && (
        <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-xl max-w-md w-full p-6 flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container">
              <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">event_available</span>
                Book Infusion Session
              </h3>
              <button
                onClick={() => setShowBookModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleQuickBookSubmit} className="flex flex-col gap-4">
              <div>
                <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">
                  Patient Health ID / KCH Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. KCH-4092 or Alineti Banda"
                  className="w-full h-11 px-3 bg-surface-container-low rounded-xl text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">
                  Chemotherapy Regimen & Cycle
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AC-T Cycle 3, Paclitaxel 175mg/m²"
                  className="w-full h-11 px-3 bg-surface-container-low rounded-xl text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">
                    Select Chair
                  </label>
                  <select className="w-full h-11 px-3 bg-surface-container-low rounded-xl text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="chair-5">Chair 05 (Bay B)</option>
                    <option value="chair-6">Chair 06 (Bay B)</option>
                    <option value="chair-7">Chair 07 (Bay B)</option>
                  </select>
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold block mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    defaultValue="12:00"
                    className="w-full h-11 px-3 bg-surface-container-low rounded-xl text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="p-3 bg-secondary-container/20 rounded-xl flex items-center gap-3 mt-1">
                <span className="material-symbols-outlined text-secondary">confirmation_number</span>
                <p className="font-body-sm text-body-sm text-on-secondary-container">
                  Automatically issues Airtel Money minibus transport voucher upon confirmation.
                </p>
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
                  className="px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all font-semibold shadow-sm"
                >
                  Confirm & Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
