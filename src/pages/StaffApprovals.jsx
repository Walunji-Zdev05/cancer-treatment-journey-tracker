import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import Toast from "../components/Toast.jsx";
import { useToast } from "../hooks/useToast.js";

const initialApplicants = [
  {
    id: 1,
    name: "Sister Beatrice Nkhoma, RN",
    title: "Senior Oncology Nurse Navigator • Ward 3B Chemotherapy Day Clinic",
    pin: "NMCM-RN-88319",
    email: "b.nkhoma@kch.health.gov.mw",
    phone: "+265 999 314 201",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAClUSwC2NezXvF3iye1cOFYXpHX7Db6nQIjREXEnkVRODiolLi0l3yBA7kEdZUxtAaM9wPmj2oalprXmSpvHRJKIDrpTlREk2-DtnIUQkUm404xg7SMWbrj0z_cmlbmmJfYptC6TDS_nhfng7HpYJhRRZOWenO10TOpkQ3KyGfFUkHh9GqVwWPtA4jWgVnYacfFf5nU7PCr5BWPKlMcmOHqRrLGXYje1hziwJm8ku_u-32D6-8pkOTLQ",
    priority: "Ward 3B Priority",
    submitted: "Submitted 2h ago",
    supervisor: "Matron E. Banda (KCH Nursing Directorate)",
    endorsementStatus: "Endorsed",
    cadre: "nurse",
    station: "kch",
    councilMatch: "100% Match",
    councilName: "Beatrice M. Nkhoma",
    statedName: "Beatrice M. Nkhoma",
    expiry: "31-Dec-2025",
    status: "verified",
    permissions: {
      openmrs: true,
      chemoLog: true,
      transport: true,
      ussdDesk: true,
      biometric: false,
    },
  },
  {
    id: 2,
    name: "Dr. Tione Mphande, MBChB, MMed",
    title: "Attending Clinical Oncologist • Ward 3B & Inpatient Chemotherapy Unit",
    pin: "MCM-MD-4109",
    email: "tione.mphande@kch.health.gov.mw",
    phone: "+265 888 200 451",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLWlcAWeQPJxphi5AbX3HcLBt75rxKYTBOZOeP-fl6r3As4DwKmeivmsFeG2L1SPlqLVEn1_quPdg9IrJ9Y9_7G0zG4_RtH0HvAjmat4ZJoLXbBTcI2n-BX-u_NOyZTWJ41dCEzjn5Nm6InZBoJFP-7Rp7un626V6E1kFFkLKBlM_e0Ys5HB6Rqn4W3CFBqcRDWHDbPlZ4Br4sBxoeGZEYI0ZQgqapV0RaWjj3xl80hO_xjRohM5AhZw",
    priority: "Specialist Fast-Track",
    submitted: "Submitted 4h ago",
    supervisor: "Dr. L. Chanza (HOD Oncology KCH)",
    endorsementStatus: "Signed Electronic",
    cadre: "doctor",
    station: "kch",
    councilMatch: "100% Match",
    councilName: "Tione Mphande",
    statedName: "Tione Mphande",
    expiry: "31-Dec-2025",
    status: "verified",
    permissions: {
      openmrs: true,
      chemoLog: true,
      transport: true,
      ussdDesk: true,
      biometric: true,
    },
  },
  {
    id: 3,
    name: "Chisomo Zgambo, Senior HSA",
    title: "District Cancer Follow-up Coordinator • Salima DHO & Chipoka Health Centre",
    pin: "MoH-HSA-5512",
    email: "c.zgambo@salima.health.gov.mw",
    phone: "+265 881 440 293",
    avatar: null,
    initials: "CZ",
    priority: "Community Lead",
    submitted: "Submitted Yesterday",
    supervisor: "Dr. K. Mvula (District Health Officer, Salima)",
    endorsementStatus: "Endorsed",
    cadre: "hsa",
    station: "salima",
    councilMatch: "100% Match",
    councilName: "Chisomo Zgambo",
    statedName: "Chisomo Zgambo",
    expiry: "31-Dec-2025",
    status: "verified",
    permissions: {
      openmrs: true,
      chemoLog: false,
      transport: true,
      ussdDesk: true,
      biometric: false,
    },
  },
  {
    id: 4,
    name: "Limbani Gondwe",
    title: "Ward 3B Social Work & Minibus Fund Disbursement Lead",
    pin: "SWAM-901",
    email: "l.gondwe@kch.health.gov.mw",
    phone: "+265 991 800 112",
    avatar: null,
    initials: "LG",
    priority: "Fund Custodian",
    submitted: "Submitted Yesterday",
    supervisor: "Kamuzu Central Hospital Board",
    endorsementStatus: "Endorsed",
    cadre: "transport",
    station: "kch",
    councilMatch: "100% Match",
    councilName: "Limbani Gondwe",
    statedName: "Limbani Gondwe",
    expiry: "31-Dec-2025",
    status: "verified",
    permissions: {
      openmrs: false,
      chemoLog: false,
      transport: true,
      ussdDesk: false,
      biometric: true,
    },
  },
  {
    id: 5,
    name: "Patrick Phiri, CO",
    title: "General Clinical Officer • Dedza DHO Surgical Oncology Referral",
    pin: "MCM-CO-1992 (Lapsed)",
    email: "p.phiri@dedza.health.gov.mw",
    phone: "+265 888 710 994",
    avatar: null,
    initials: "PP",
    priority: "Review Required",
    submitted: "Submitted 3d ago",
    supervisor: "Dedza District Health Office",
    endorsementStatus: "Pending CPD",
    cadre: "flagged",
    station: "dedza",
    councilMatch: "Lapsed CPD (12/30 pts)",
    councilName: "Patrick Phiri",
    statedName: "Patrick Phiri",
    expiry: "Expired Nov 2024",
    status: "flagged",
    permissions: {
      openmrs: false,
      chemoLog: false,
      transport: false,
      ussdDesk: false,
      biometric: false,
    },
  },
];

export default function StaffApprovals() {
  const [activeNav, setActiveNav] = useState("approvals");
  const [searchTerm, setSearchTerm] = useState("");
  const [applicantSearch, setApplicantSearch] = useState("");
  const [facilityFilter, setFacilityFilter] = useState("kch");
  const [cadreTab, setCadreTab] = useState("all");
  const [applicants, setApplicants] = useState(initialApplicants);
  const [selectedId, setSelectedId] = useState(1);

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
    } else if (key === "approvals") {
      navigate("/staff-approvals");
    }
  };

  const selectedApplicant = applicants.find((a) => a.id === selectedId) || applicants[0];

  const handlePermissionToggle = (permKey) => {
    setApplicants((prev) =>
      prev.map((a) =>
        a.id === selectedId
          ? {
              ...a,
              permissions: {
                ...a.permissions,
                [permKey]: !a.permissions[permKey],
              },
            }
          : a
      )
    );
  };

  const handleApproveApplicant = (name, phone) => {
    showToast(
      `Authorized credentials for ${name}. Temporary 4-digit duty PIN dispatched via SMS to ${phone}.`,
      "how_to_reg"
    );
  };

  const filteredApplicants = applicants.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(applicantSearch.toLowerCase()) ||
      app.pin.toLowerCase().includes(applicantSearch.toLowerCase()) ||
      app.email.toLowerCase().includes(applicantSearch.toLowerCase());

    const matchesFacility =
      facilityFilter === "all" || app.station === facilityFilter;

    const matchesCadre =
      cadreTab === "all" ||
      (cadreTab === "flagged" ? app.status === "flagged" : app.cadre === cadreTab);

    return matchesSearch && matchesFacility && matchesCadre;
  });

  return (
    <div className="bg-background font-body-md text-on-surface min-h-screen">
      <Toast toast={toast} />
      <Sidebar active={activeNav} onNavigate={handleNavigate} />
      <div className="pl-72 flex flex-col min-h-screen">
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <main className="w-full pt-20 px-8 flex-1 bg-background">
          <div className="flex flex-col w-full pb-16">
            
            {/* Top Governance Banner */}
            <div className="bg-surface-container-lowest rounded-DEFAULT p-6 shadow-sm mb-6 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[15px]">verified_user</span>
                    Republic of Malawi • Ministry of Health (Unduna wa Zaumoyo)
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.75 rounded-full bg-secondary-container/50 text-on-secondary-container font-label-sm text-label-sm">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    National Cancer Control Programme (NCCP)
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                  Staff Approvals & Credentialing Authority
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
                  <span>KCH & QECH Central Oncology Network • Form MoH-ONC-REG Gatekeeper Station</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-outline-variant" />
                  <span className="font-bilingual-caption text-bilingual-caption text-primary">
                    Kuvomereza Ogwira Ntchito Zachipatala
                  </span>
                </p>
              </div>

              {/* Council Registry Heartbeats */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-3 px-3.5 py-2 rounded-DEFAULT bg-surface-container-low">
                  <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">domain_verification</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-sm text-label-sm text-on-surface font-bold">MCM Registry</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Live (Synced 12m ago)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-3.5 py-2 rounded-DEFAULT bg-surface-container-low">
                  <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">medical_services</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-sm text-label-sm text-on-surface font-bold">NMCM Gateway</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Active • 100% Match</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-3.5 py-2 rounded-DEFAULT bg-surface-container-low">
                  <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-tertiary shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">sync_alt</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-sm text-label-sm text-on-surface font-bold">iHRIS OpenMRS</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">DHIS2 Linked</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Operational Quick Controls Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => showToast("Running automated batch check against MCM & NMCM servers... 5 licenses verified.", "rule")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md shadow-sm transition-colors"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">rule</span>
                  <span>Batch Verify Council Licences</span>
                </button>
                <button
                  onClick={() => showToast("Audit trail generated: 38 credential operations logged today across Ward 3B.", "history_toggle_off")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md shadow-sm transition-colors"
                >
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px]">history_toggle_off</span>
                  <span>Audit Logs (Tsiku ndi Tsiku)</span>
                </button>
                <button
                  onClick={() => showToast("MoH Compliance Report compiled (PDF/CSV ready for Dr. Chanza download).", "download")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md shadow-sm transition-colors"
                >
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px]">download_for_offline</span>
                  <span>Export MoH Report</span>
                </button>
              </div>

              {/* Active Supervisor Stamp */}
              <div className="flex items-center gap-2.5 self-end sm:self-auto px-4 py-2 rounded-full bg-surface-container-high/60">
                <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                <span className="font-label-sm text-label-sm text-on-surface">
                  Reviewing Authority: <strong className="font-semibold text-primary">Dr. L. Chanza (HOD Oncology KCH)</strong>
                </span>
              </div>
            </div>

            {/* Credentialing KPI Grid (5 Metrics) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <div className="bg-surface-container-lowest p-5 rounded-DEFAULT shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Pending Verification</span>
                  <span className="w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">pending_actions</span>
                  </span>
                </div>
                <div>
                  <div className="font-headline-xl text-headline-xl font-bold text-on-surface">5</div>
                  <p className="font-body-sm text-body-sm text-error font-medium mt-1">3 High Priority (Ward 3B shift)</p>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-5 rounded-DEFAULT shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Auto-Verified Licences</span>
                  <span className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">task_alt</span>
                  </span>
                </div>
                <div>
                  <div className="font-headline-xl text-headline-xl font-bold text-on-surface">12</div>
                  <p className="font-body-sm text-body-sm text-secondary font-medium mt-1">100% PIN council match</p>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-5 rounded-DEFAULT shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Active Clinical Staff</span>
                  <span className="w-8 h-8 rounded-full bg-surface-container text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">group</span>
                  </span>
                </div>
                <div>
                  <div className="font-headline-xl text-headline-xl font-bold text-on-surface">142</div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">KCH, QECH & DHO Units</p>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-5 rounded-DEFAULT shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Flagged / Suspended</span>
                  <span className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">warning</span>
                  </span>
                </div>
                <div>
                  <div className="font-headline-xl text-headline-xl font-bold text-on-surface">2</div>
                  <p className="font-body-sm text-body-sm text-tertiary font-medium mt-1">Lapsed CPD & email check</p>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-5 rounded-DEFAULT shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Turnaround Speed</span>
                  <span className="w-8 h-8 rounded-full bg-surface-container-high text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">speed</span>
                  </span>
                </div>
                <div>
                  <div className="font-headline-xl text-headline-xl font-bold text-on-surface">4.2h</div>
                  <p className="font-body-sm text-body-sm text-secondary font-medium mt-1">Target &lt;24h (Roster active)</p>
                </div>
              </div>
            </div>

            {/* Main Workstation Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              
              {/* LEFT PANEL: Worklist & Filters (7 cols) */}
              <div className="xl:col-span-7 flex flex-col gap-6">
                
                {/* Search & Segment Filters */}
                <div className="bg-surface-container-lowest rounded-DEFAULT p-5 shadow-sm flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="relative flex-1 w-full">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                        search
                      </span>
                      <input
                        type="text"
                        value={applicantSearch}
                        onChange={(e) => setApplicantSearch(e.target.value)}
                        placeholder="Search by Clinician Name, PIN (NMCM-RN-...), National ID, or Facility..."
                        className="w-full h-12 pl-11 pr-4 bg-surface-container-low text-on-surface placeholder:text-outline rounded-full font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="w-full sm:w-auto flex items-center gap-2 px-4 py-2.5 bg-surface-container-low rounded-full">
                      <span className="material-symbols-outlined text-primary text-[18px]">apartment</span>
                      <select
                        value={facilityFilter}
                        onChange={(e) => setFacilityFilter(e.target.value)}
                        className="bg-transparent font-label-md text-label-md text-on-surface focus:outline-none cursor-pointer"
                      >
                        <option value="all">All Healthcare Stations</option>
                        <option value="kch">Kamuzu Central Hospital (KCH)</option>
                        <option value="qech">Queen Elizabeth Central (QECH)</option>
                        <option value="salima">Salima District Hospital / DHO</option>
                        <option value="dedza">Dedza District Hospital</option>
                      </select>
                    </div>
                  </div>

                  {/* Filter Cadre Tabs */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-none">
                    <button
                      onClick={() => setCadreTab("all")}
                      className={`px-4 py-2 rounded-full font-label-sm text-label-sm transition-all whitespace-nowrap ${
                        cadreTab === "all"
                          ? "bg-primary-container text-on-primary-container font-semibold"
                          : "bg-surface-container-low text-on-surface-variant hover:text-on-surface"
                      }`}
                    >
                      All Pending ({applicants.length})
                    </button>
                    <button
                      onClick={() => setCadreTab("nurse")}
                      className={`px-4 py-2 rounded-full font-label-sm text-label-sm transition-all whitespace-nowrap ${
                        cadreTab === "nurse"
                          ? "bg-primary-container text-on-primary-container font-semibold"
                          : "bg-surface-container-low text-on-surface-variant hover:text-on-surface"
                      }`}
                    >
                      Oncology Nurses (1)
                    </button>
                    <button
                      onClick={() => setCadreTab("doctor")}
                      className={`px-4 py-2 rounded-full font-label-sm text-label-sm transition-all whitespace-nowrap ${
                        cadreTab === "doctor"
                          ? "bg-primary-container text-on-primary-container font-semibold"
                          : "bg-surface-container-low text-on-surface-variant hover:text-on-surface"
                      }`}
                    >
                      Medical Oncologists (1)
                    </button>
                    <button
                      onClick={() => setCadreTab("hsa")}
                      className={`px-4 py-2 rounded-full font-label-sm text-label-sm transition-all whitespace-nowrap ${
                        cadreTab === "hsa"
                          ? "bg-primary-container text-on-primary-container font-semibold"
                          : "bg-surface-container-low text-on-surface-variant hover:text-on-surface"
                      }`}
                    >
                      Community HSAs (1)
                    </button>
                    <button
                      onClick={() => setCadreTab("transport")}
                      className={`px-4 py-2 rounded-full font-label-sm text-label-sm transition-all whitespace-nowrap ${
                        cadreTab === "transport"
                          ? "bg-primary-container text-on-primary-container font-semibold"
                          : "bg-surface-container-low text-on-surface-variant hover:text-on-surface"
                      }`}
                    >
                      Transport & Admin (1)
                    </button>
                    <button
                      onClick={() => setCadreTab("flagged")}
                      className={`px-4 py-2 rounded-full font-label-sm text-label-sm transition-all whitespace-nowrap ${
                        cadreTab === "flagged"
                          ? "bg-error-container text-on-error-container font-semibold"
                          : "bg-surface-container-low text-error hover:bg-error-container/40"
                      }`}
                    >
                      Flagged Review (1)
                    </button>
                  </div>
                </div>

                {/* Applicant Cards */}
                <div className="flex flex-col gap-4">
                  {filteredApplicants.map((app) => {
                    const isSelected = app.id === selectedId;
                    return (
                      <div
                        key={app.id}
                        onClick={() => setSelectedId(app.id)}
                        className={`applicant-card cursor-pointer p-5 rounded-DEFAULT bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col gap-4 ${
                          isSelected ? "ring-2 ring-primary" : ""
                        } ${app.status === "flagged" ? "border-l-4 border-error" : ""}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3.5">
                            <div className="relative">
                              {app.avatar ? (
                                <img
                                  src={app.avatar}
                                  alt={app.name}
                                  className="w-12 h-12 rounded-full object-cover shadow-sm"
                                />
                              ) : (
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-headline-sm font-bold shadow-sm ${
                                  app.status === "flagged"
                                    ? "bg-error-container text-on-error-container"
                                    : "bg-secondary-container text-on-secondary-container"
                                }`}>
                                  {app.initials}
                                </div>
                              )}
                              <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${
                                app.status === "flagged" ? "bg-error" : "bg-secondary"
                              }`}>
                                <span className="material-symbols-outlined text-white text-[10px]">
                                  {app.status === "flagged" ? "close" : "check"}
                                </span>
                              </span>
                            </div>

                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                                  {app.name}
                                </h3>
                                {app.status === "verified" ? (
                                  <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[13px]">verified</span>
                                    Verified
                                  </span>
                                ) : (
                                  <span className="px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[13px]">warning</span>
                                    Flagged
                                  </span>
                                )}
                              </div>
                              <p className="font-body-sm text-body-sm text-on-surface-variant">
                                {app.title}
                              </p>
                              <div className="flex flex-wrap items-center gap-3 mt-1 font-body-sm text-body-sm text-outline">
                                <span className="flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[15px]">badge</span> {app.pin}
                                </span>
                                <span className="flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[15px]">mail</span> {app.email}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold ${
                              app.status === "flagged" ? "bg-error-container text-on-error-container font-bold" : "bg-primary-fixed text-on-primary-fixed"
                            }`}>
                              {app.priority}
                            </span>
                            <p className="font-label-sm text-label-sm text-on-surface-variant mt-1.5">
                              {app.submitted}
                            </p>
                          </div>
                        </div>

                        {app.status === "flagged" ? (
                          <div className="p-3 bg-error-container/20 rounded-DEFAULT text-on-surface flex items-start gap-2.5">
                            <span className="material-symbols-outlined text-error text-[20px] mt-0.5">
                              report_problem
                            </span>
                            <div className="flex flex-col font-body-sm text-body-sm">
                              <span className="font-semibold text-error">Automated Flag: Continuous Professional Development (CPD) deficit.</span>
                              <span className="text-on-surface-variant">
                                Medical Council record shows 12/30 CPD points logged. Requires DHO renewal letter before clinical prescribing authority can be granted.
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="p-3 bg-surface-container-low rounded-DEFAULT flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-on-surface">
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
                              <span className="font-body-sm text-body-sm">
                                <strong className="font-semibold">Supervisor Endorsement:</strong> {app.supervisor}
                              </span>
                            </div>
                            <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-surface-container-lowest text-secondary font-semibold">
                              {app.endorsementStatus}
                            </span>
                          </div>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-surface-container">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
                              Patient Triage Board
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
                              USSD Callback Desk
                            </span>
                          </div>
                          {app.status === "verified" ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleApproveApplicant(app.name, app.phone);
                              }}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold transition-colors shadow-sm"
                            >
                              <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                              <span>Approve & Issue PIN</span>
                            </button>
                          ) : (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  showToast(`CPD submission link dispatched to ${app.email}`, "mail");
                                }}
                                className="px-3.5 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-colors"
                              >
                                Request CPD
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  showToast(`Case for ${app.name} escalated to Medical Council Registrar.`, "gavel");
                                }}
                                className="px-3.5 py-1.5 rounded-full bg-error text-on-error font-label-sm text-label-sm font-semibold transition-colors"
                              >
                                Escalate
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT PANEL: Inspection Drawer (5 cols) */}
              <div className="xl:col-span-5 sticky top-24 flex flex-col gap-6">
                <div className="bg-surface-container-lowest rounded-DEFAULT p-6 shadow-sm flex flex-col gap-6">
                  
                  {/* Header with Selected Candidate Identity */}
                  <div className="flex items-center justify-between pb-4 border-b border-surface-container">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold">
                        <span className="material-symbols-outlined text-[22px]">policy</span>
                      </div>
                      <div>
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold block">
                          MoH Form Dossier Review
                        </span>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          {selectedApplicant.name}
                        </h2>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full font-label-sm text-label-sm font-semibold ${
                      selectedApplicant.status === "flagged"
                        ? "bg-error-container text-on-error-container"
                        : "bg-secondary-container text-on-secondary-container"
                    }`}>
                      {selectedApplicant.councilMatch}
                    </span>
                  </div>

                  {/* Council Verification Box */}
                  <div className="bg-surface-container-low p-4 rounded-DEFAULT flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-on-surface font-bold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
                        NMCM / MCM Dual Verification
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold">
                        Synced Live
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-body-sm font-body-sm pt-1">
                      <div className="flex flex-col p-2.5 rounded-DEFAULT bg-surface-container-lowest">
                        <span className="text-on-surface-variant font-label-sm text-label-sm">Applicant Stated Data</span>
                        <span className="font-semibold text-on-surface mt-1">{selectedApplicant.statedName}</span>
                        <span className="text-primary font-mono text-[12px]">{selectedApplicant.pin}</span>
                        <span className="text-on-surface-variant text-[11px] mt-0.5">Expiry: {selectedApplicant.expiry}</span>
                      </div>
                      <div className="flex flex-col p-2.5 rounded-DEFAULT bg-surface-container-lowest">
                        <span className="text-secondary font-label-sm text-label-sm font-semibold">Council Record</span>
                        <span className="font-semibold text-on-surface mt-1">{selectedApplicant.councilName}</span>
                        <span className={`font-mono text-[12px] ${selectedApplicant.status === 'flagged' ? 'text-error' : 'text-secondary'}`}>
                          {selectedApplicant.status === 'flagged' ? 'Lapsed CPD' : 'Status: Active / Clear'}
                        </span>
                        <span className="text-on-surface-variant text-[11px] mt-0.5">Good Standing</span>
                      </div>
                    </div>
                  </div>

                  {/* Role Permissions Grant */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-label-lg text-label-lg font-bold text-on-surface">Role-Based Access Grant</h3>
                      <span className="font-bilingual-caption text-bilingual-caption text-on-surface-variant">Malamulo Ogwirira Ntchito</span>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <label className="flex items-center justify-between p-3 rounded-DEFAULT bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
                        <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">medical_information</span>
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md font-semibold text-on-surface">Electronic Health Passports (OpenMRS)</span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">View patient diagnosis history & Yellow Passport intake</span>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedApplicant.permissions.openmrs}
                          onChange={() => handlePermissionToggle("openmrs")}
                          className="w-5 h-5 rounded accent-primary cursor-pointer"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-DEFAULT bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
                        <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">vaccines</span>
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md font-semibold text-on-surface">Chemotherapy Administration Logging</span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">Record Day Clinic infusion cycles & vitals</span>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedApplicant.permissions.chemoLog}
                          onChange={() => handlePermissionToggle("chemoLog")}
                          className="w-5 h-5 rounded accent-secondary cursor-pointer"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-DEFAULT bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
                        <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-tertiary text-[20px] mt-0.5">directions_bus</span>
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md font-semibold text-on-surface">Minibus Transport Fund Authorization</span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">Approve village patient travel vouchers (&le; MWK 50,000/day)</span>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedApplicant.permissions.transport}
                          onChange={() => handlePermissionToggle("transport")}
                          className="w-5 h-5 rounded accent-primary cursor-pointer"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-DEFAULT bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
                        <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">call</span>
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md font-semibold text-on-surface">USSD *384*265# Urgent Callback Desk</span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">Direct audio callback to distressed cancer outpatients</span>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedApplicant.permissions.ussdDesk}
                          onChange={() => handlePermissionToggle("ussdDesk")}
                          className="w-5 h-5 rounded accent-primary cursor-pointer"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Supervisor Approval Stamp */}
                  <div className="p-4 rounded-DEFAULT bg-surface-container-high/40 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-on-surface font-bold">Supervisor Sign-Off</span>
                      <span className="font-mono text-outline text-[11px]">AUTHSIG-KCH-2025-081</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">
                        LC
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md font-semibold text-on-surface">Dr. L. Chanza, MD</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">Head of Oncology KCH • Designated MoH Credentialer</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <button
                    onClick={() => handleApproveApplicant(selectedApplicant.name, selectedApplicant.phone)}
                    className="w-full py-3.5 rounded-full bg-secondary hover:bg-secondary/90 text-on-secondary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
                  >
                    <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                    <span>Authorize Staff & Dispatch Duty PIN</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
