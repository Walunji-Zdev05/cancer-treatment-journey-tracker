import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import Toast from "../components/Toast.jsx";
import { useToast } from "../hooks/useToast.js";

const complianceIndicators = [
  {
    code: "ONC-MOH-01",
    description: "6-Cycle Chemotherapy Protocol Completion",
    subtext: "Full completion of 6 cycles within 180 days from histological diagnosis",
    target: "> 85.0%",
    actual: "91.2%",
    status: "Exceeded (+6.2%)",
    statusType: "success",
    source: "Ward 3B Chemotherapy Registry (Paper + DHIS2)",
  },
  {
    code: "PIH-RET-04",
    description: "30-Day Lost to Follow-Up (LTFU) Mitigation",
    subtext: "Patients missing scheduled appointment by > 30 days without notification",
    target: "< 8.0%",
    actual: "3.8%",
    status: "On Track (Top Decile)",
    statusType: "success",
    source: "USSD Telemetry Gateway & CHW Dispatch Records",
  },
  {
    code: "GF-TRN-02",
    description: "Chikondi Transport Subsidy Audit & Verification",
    subtext: "Biometric and physical ticket validation prior to Mobile Money disbursement",
    target: "100.0%",
    actual: "100.0%",
    status: "Fully Compliant",
    statusType: "success",
    source: "Airtel Money / TNM Mpamba Disbursement Logs",
  },
  {
    code: "MOH-SURV-08",
    description: "Histopathology Confirmation Rate",
    subtext: "Percentage of registered oncology patients with biopsy-proven diagnosis",
    target: "> 90.0%",
    actual: "94.8%",
    status: "Target Met",
    statusType: "success",
    source: "Kamuzu Central Hospital Pathology Lab Registry",
  },
  {
    code: "PEP-ADHER-12",
    description: "2G/USSD Symptom & Adherence Monitoring",
    subtext: "Weekly automated check-in response rate across rural telecom corridors",
    target: "> 80.0%",
    actual: "89.2%",
    status: "Exceeded (+9.2%)",
    statusType: "success",
    source: "Airtel MW & TNM National Shortcode Gateway",
  },
];

export default function ReportsAnalytics() {
  const [activeNav, setActiveNav] = useState("reports");
  const [searchTerm, setSearchTerm] = useState("");
  const [indicatorSearch, setIndicatorSearch] = useState("");
  const [periodFilter, setPeriodFilter] = useState("Q3/Q4 2024");
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

  const filteredIndicators = complianceIndicators.filter(
    (item) =>
      item.code.toLowerCase().includes(indicatorSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(indicatorSearch.toLowerCase()) ||
      item.source.toLowerCase().includes(indicatorSearch.toLowerCase())
  );

  return (
    <div className="bg-background font-body-md text-on-surface min-h-screen">
      <Toast toast={toast} />
      <Sidebar active={activeNav} onNavigate={handleNavigate} />
      <div className="pl-72 flex flex-col min-h-screen">
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <main className="w-full pt-20 px-8 flex-1 bg-background">
          <div className="flex flex-col w-full pb-16">
            
            {/* Governance & Sync Notification Bar */}
            <div className="w-full bg-surface-container-low rounded-DEFAULT px-6 py-3.5 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary" />
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">
                    MoH DHIS2 API Gateway
                  </span>
                  <span className="text-outline text-xs">•</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Central Registry Endpoint:{" "}
                    <span className="font-mono text-on-surface font-semibold">
                      https://dhis2.health.gov.mw/api/v40/oncology
                    </span>
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold">
                  Sync Live: 14m ago
                </span>
              </div>
              <div className="flex items-center gap-4 text-on-surface-variant font-label-sm text-label-sm">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                  <span>PEPFAR Grant #GH002341</span>
                </div>
                <span className="text-outline text-xs">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">gavel</span>
                  <span>PIH-Tikondane Protocol v4.2 Approved</span>
                </div>
              </div>
            </div>

            {/* Header & Compliance Controls Row */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-semibold uppercase tracking-wider">
                    National Oncology Surveillance
                  </span>
                  <span className="text-outline text-sm">/</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Kamuzu Central Hospital Unit
                  </span>
                </div>
                <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                  Oncology Programme Analytics & Compliance Dashboard
                </h1>
                <p className="font-bilingual-caption text-bilingual-caption text-on-surface-variant mt-1">
                  Malipoti a Unduna wa Zaumoyo ndi Othandizira — KCH Oncology Surveillance & Grant Audit Portal
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-surface-container px-3.5 py-2 rounded-full shadow-sm">
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                    calendar_today
                  </span>
                  <select
                    value={periodFilter}
                    onChange={(e) => {
                      setPeriodFilter(e.target.value);
                      showToast(`Report view updated to ${e.target.value}`, "calendar_month");
                    }}
                    className="bg-transparent font-label-md text-label-md text-on-surface focus:outline-none cursor-pointer pr-2"
                  >
                    <option value="Q3/Q4 2024">Q3/Q4 2024 • Oct YTD (10 Mos)</option>
                    <option value="Q3 2024">Q3 2024 (Jul - Sep)</option>
                    <option value="Q2 2024">Q2 2024 (Apr - Jun)</option>
                    <option value="FY2023-2024">Full FY2023-2024 Baseline</option>
                  </select>
                </div>
                <button
                  onClick={() => showToast("Exporting MoH-501 XML/CSV package for DHIS2 server upload...", "cloud_download")}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container-lowest hover:bg-surface-container-high text-primary font-label-md text-label-md shadow-sm transition-all duration-200"
                >
                  <span className="material-symbols-outlined text-[18px]">cloud_download</span>
                  <span>MoH-501 XML/CSV</span>
                </button>
                <button
                  onClick={() => showToast("Generating PEPFAR / Global Fund Donor Audit Dossier PDF...", "picture_as_pdf")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md shadow-md transition-all duration-200"
                >
                  <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                  <span>Donor Audit Dossier</span>
                </button>
              </div>
            </div>

            {/* Top-line KPI Cards (5 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
              {/* KPI 1 */}
              <div className="bg-surface-container-lowest p-5 rounded-DEFAULT shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 right-0 h-1 bg-secondary" />
                <div className="flex items-start justify-between mb-3">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                    Chemo Cycle 1–6
                  </span>
                  <span className="p-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant">
                    <span className="material-symbols-outlined text-[18px]">medication</span>
                  </span>
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-xl text-headline-xl font-bold text-on-surface">91.2%</span>
                    <span className="font-label-sm text-label-sm text-secondary font-bold flex items-center">
                      <span className="material-symbols-outlined text-[16px]">arrow_upward</span>+62.8%
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">vs 28.4% 2022 baseline</p>
                </div>
                <div className="mt-4 pt-3 bg-surface-container-low -mx-5 -mb-5 px-5 py-2.5 flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">MoH Target &gt; 85%</span>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">Target Met</span>
                </div>
              </div>

              {/* KPI 2 */}
              <div className="bg-surface-container-lowest p-5 rounded-DEFAULT shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
                <div className="flex items-start justify-between mb-3">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                    30-Day LTFU Rate
                  </span>
                  <span className="p-1.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant">
                    <span className="material-symbols-outlined text-[18px]">person_pin_circle</span>
                  </span>
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-xl text-headline-xl font-bold text-on-surface">3.8%</span>
                    <span className="font-label-sm text-label-sm text-secondary font-bold flex items-center">
                      <span className="material-symbols-outlined text-[16px]">trending_down</span>-30.8%
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Down from 34.6% baseline</p>
                </div>
                <div className="mt-4 pt-3 bg-surface-container-low -mx-5 -mb-5 px-5 py-2.5 flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Global Standard &lt; 8%</span>
                  <span className="font-label-sm text-label-sm text-primary font-bold">WHO Met</span>
                </div>
              </div>

              {/* KPI 3 */}
              <div className="bg-surface-container-lowest p-5 rounded-DEFAULT shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 right-0 h-1 bg-secondary-fixed-dim" />
                <div className="flex items-start justify-between mb-3">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                    Transport Voucher
                  </span>
                  <span className="p-1.5 rounded-full bg-secondary-container text-on-secondary-container">
                    <span className="material-symbols-outlined text-[18px]">directions_bus</span>
                  </span>
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-headline-lg text-headline-lg font-bold text-on-surface">MWK 14.2k</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">($8.10)</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">1,428 patient vouchers YTD</p>
                </div>
                <div className="mt-4 pt-3 bg-surface-container-low -mx-5 -mb-5 px-5 py-2.5 flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Ward 3B Match</span>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">100% Audited</span>
                </div>
              </div>

              {/* KPI 4 */}
              <div className="bg-surface-container-lowest p-5 rounded-DEFAULT shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 right-0 h-1 bg-tertiary-container" />
                <div className="flex items-start justify-between mb-3">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                    2G/USSD Reach
                  </span>
                  <span className="p-1.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant">
                    <span className="material-symbols-outlined text-[18px]">cell_tower</span>
                  </span>
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-xl text-headline-xl font-bold text-on-surface">98.4%</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Airtel / TNM</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">14,892 auto-prompts fired</p>
                </div>
                <div className="mt-4 pt-3 bg-surface-container-low -mx-5 -mb-5 px-5 py-2.5 flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Prompt Adherence</span>
                  <span className="font-label-sm text-label-sm text-on-surface font-bold">89.2% Active</span>
                </div>
              </div>

              {/* KPI 5 */}
              <div className="bg-surface-container-lowest p-5 rounded-DEFAULT shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary-container" />
                <div className="flex items-start justify-between mb-3">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                    1-Yr Solid Retention
                  </span>
                  <span className="p-1.5 rounded-full bg-primary-fixed-dim text-on-primary-fixed-variant">
                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                  </span>
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-xl text-headline-xl font-bold text-on-surface">87.6%</span>
                    <span className="font-label-sm text-label-sm text-secondary font-bold flex items-center">Stage I–III</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">A. Banda & T. Chirwa cohorts</p>
                </div>
                <div className="mt-4 pt-3 bg-surface-container-low -mx-5 -mb-5 px-5 py-2.5 flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Follow-up Complete</span>
                  <span className="font-label-sm text-label-sm text-primary font-bold">375 / 428</span>
                </div>
              </div>
            </div>

            {/* Primary Analytics Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-8">
              
              {/* Module A: 6-Cycle Retention Funnel (7 Cols) */}
              <div className="xl:col-span-7 bg-surface-container-lowest p-6 rounded-DEFAULT shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[22px]">waterfall_chart</span>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface">
                          6-Cycle Chemotherapy Retention Funnel
                        </h2>
                      </div>
                      <p className="font-bilingual-caption text-bilingual-caption text-on-surface-variant mt-0.5">
                        Ulendo wa Mankhwala — Cohort Drop-off Prevention vs Historical Baseline (N = 428)
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                        <span className="w-3 h-3 rounded-full bg-primary" /> Tikondane 2024
                      </span>
                      <span className="flex items-center gap-1.5 font-label-sm text-label-sm text-outline">
                        <span className="w-3 h-3 rounded-full bg-outline-variant" /> 2022 Pre-Nav
                      </span>
                    </div>
                  </div>

                  {/* Funnel Steps */}
                  <div className="space-y-3.5 my-4">
                    {/* Step 0 */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-label-md text-label-md text-on-surface flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm flex items-center justify-center font-bold">0</span>
                          Intake & Yellow Passport Registration (KCH Ward 3B)
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-on-surface">428 pts (100%)</span>
                          <span className="font-mono text-outline text-xs">Pre: 100%</span>
                        </div>
                      </div>
                      <div className="h-3.5 w-full bg-surface-container-high rounded-full overflow-hidden flex">
                        <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "100%" }} />
                      </div>
                    </div>

                    {/* Step 1 */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-label-md text-label-md text-on-surface flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm flex items-center justify-center font-bold">1</span>
                          Cycle 1 Infusion & USSD Confirmation
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-on-surface">422 pts (98.6%)</span>
                          <span className="font-mono text-outline text-xs">Pre: 82.1%</span>
                        </div>
                      </div>
                      <div className="h-3.5 w-full bg-surface-container-high rounded-full overflow-hidden flex">
                        <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "98.6%" }} />
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-label-md text-label-md text-on-surface flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm flex items-center justify-center font-bold">2</span>
                          Cycle 2 Infusion (Day 21 Follow-up)
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-on-surface">411 pts (96.0%)</span>
                          <span className="font-mono text-outline text-xs">Pre: 54.3%</span>
                        </div>
                      </div>
                      <div className="h-3.5 w-full bg-surface-container-high rounded-full overflow-hidden flex">
                        <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "96.0%" }} />
                      </div>
                    </div>

                    {/* Step 3 (Mid-point milestone) */}
                    <div className="p-3 bg-secondary-fixed/30 rounded-DEFAULT space-y-1.5">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm flex items-center justify-center font-bold">3</span>
                          <span className="font-label-md text-label-md text-on-secondary-fixed-variant font-bold">
                            Cycle 3 — Critical Barrier Mid-Point Check
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm text-[11px] font-semibold">
                            Subsidy Milestone
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-secondary">400 pts (93.5%)</span>
                          <span className="font-mono text-error font-semibold text-xs">Pre: 28.4% (Severe Drop)</span>
                        </div>
                      </div>
                      <div className="h-3.5 w-full bg-surface-container rounded-full overflow-hidden flex">
                        <div className="h-full bg-secondary rounded-full transition-all duration-500" style={{ width: "93.5%" }} />
                      </div>
                      <p className="font-body-sm text-body-sm text-on-secondary-fixed-variant pt-1 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-secondary">lightbulb</span>
                        <em>Critical inflection: Chikondi Minibus transport subsidy disbursed here prevents 74.2% historical drop-out.</em>
                      </p>
                    </div>

                    {/* Step 4 */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-label-md text-label-md text-on-surface flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm flex items-center justify-center font-bold">4</span>
                          Cycle 4 Infusion
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-on-surface">397 pts (92.8%)</span>
                          <span className="font-mono text-outline text-xs">Pre: 22.0%</span>
                        </div>
                      </div>
                      <div className="h-3.5 w-full bg-surface-container-high rounded-full overflow-hidden flex">
                        <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "92.8%" }} />
                      </div>
                    </div>

                    {/* Step 5 */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-label-md text-label-md text-on-surface flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm flex items-center justify-center font-bold">5</span>
                          Cycle 5 Infusion
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-on-surface">393 pts (91.9%)</span>
                          <span className="font-mono text-outline text-xs">Pre: 18.2%</span>
                        </div>
                      </div>
                      <div className="h-3.5 w-full bg-surface-container-high rounded-full overflow-hidden flex">
                        <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "91.9%" }} />
                      </div>
                    </div>

                    {/* Step 6 */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-label-md text-label-md text-secondary font-bold flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-secondary-fixed text-secondary font-label-sm text-label-sm flex items-center justify-center font-bold">6</span>
                          Cycle 6 Protocol Completion & Surveillance Transition
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-secondary">390 pts (91.2%)</span>
                          <span className="font-mono text-outline text-xs">Pre: 14.8%</span>
                        </div>
                      </div>
                      <div className="h-3.5 w-full bg-surface-container-high rounded-full overflow-hidden flex">
                        <div className="h-full bg-secondary rounded-full transition-all duration-500" style={{ width: "91.2%" }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 flex flex-wrap items-center justify-between bg-surface-container-low p-3 rounded-DEFAULT gap-2">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Complete Curative Protocols Delivered: <strong class="text-on-surface">390 Patients</strong>
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary font-semibold">
                    Statistical Significance: Chi² = 184.2 (p &lt; 0.0001)
                  </span>
                </div>
              </div>

              {/* Module B: Catchment Corridor Equity (5 Cols) */}
              <div className="xl:col-span-5 bg-surface-container-lowest p-6 rounded-DEFAULT shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[22px]">route</span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">
                        Catchment Equity & Transit Impact
                      </h2>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface font-semibold">
                      Central Region
                    </span>
                  </div>
                  <p className="font-bilingual-caption text-bilingual-caption text-on-surface-variant mb-5">
                    Decoupling travel distance from oncology retention via Chikondi micro-grants
                  </p>

                  <div className="space-y-3">
                    <div className="p-3.5 bg-surface-container-low rounded-DEFAULT flex flex-col gap-2 hover:bg-surface-container transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px]">location_city</span>
                          <span className="font-label-md text-label-md text-on-surface font-bold">Lilongwe Rural & Peri-Urban</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">93.1% Retained</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-on-surface-variant font-mono">
                        <span>Avg Distance: 45 km</span>
                        <span>144 Patients</span>
                        <span>MWK 7,500 / visit</span>
                      </div>
                      <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: "93.1%" }} />
                      </div>
                    </div>

                    <div className="p-3.5 bg-surface-container-low rounded-DEFAULT flex flex-col gap-2 hover:bg-surface-container transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px]">water</span>
                          <span className="font-label-md text-label-md text-on-surface font-bold">Salima Lakeshore Corridor</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">92.4% Retained</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-on-surface-variant font-mono">
                        <span>Avg Distance: 95 km</span>
                        <span>86 Patients</span>
                        <span>MWK 14,000 / visit</span>
                      </div>
                      <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: "92.4%" }} />
                      </div>
                    </div>

                    <div className="p-3.5 bg-surface-container-low rounded-DEFAULT flex flex-col gap-2 hover:bg-surface-container transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px]">agriculture</span>
                          <span className="font-label-md text-label-md text-on-surface font-bold">Dowa / Mponela Corridor</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">91.2% Retained</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-on-surface-variant font-mono">
                        <span>Avg Distance: 60 km</span>
                        <span>34 Patients</span>
                        <span>MWK 9,500 / visit</span>
                      </div>
                      <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: "91.2%" }} />
                      </div>
                    </div>

                    <div className="p-3.5 bg-surface-container-low rounded-DEFAULT flex flex-col gap-2 hover:bg-surface-container transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px]">terrain</span>
                          <span className="font-label-md text-label-md text-on-surface font-bold">Dedza Highlands Corridor</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">89.8% Retained</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-on-surface-variant font-mono">
                        <span>Avg Distance: 82 km</span>
                        <span>112 Patients</span>
                        <span>MWK 16,500 / visit</span>
                      </div>
                      <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: "89.8%" }} />
                      </div>
                    </div>

                    <div className="p-3.5 bg-surface-container-low rounded-DEFAULT flex flex-col gap-2 hover:bg-surface-container transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px]">share_location</span>
                          <span className="font-label-md text-label-md text-on-surface font-bold">Mchinji Border Corridor</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">88.5% Retained</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-on-surface-variant font-mono">
                        <span>Avg Distance: 110 km</span>
                        <span>52 Patients</span>
                        <span>MWK 16,000 / visit</span>
                      </div>
                      <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: "88.5%" }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-primary-fixed/40 rounded-DEFAULT flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[24px]">insights</span>
                  <p className="font-body-sm text-body-sm text-on-primary-fixed-variant leading-tight">
                    <strong>Key Research Finding:</strong> Transport subsidy fully decouples travel distance from cycle drop-out (<span className="font-mono font-bold">Pearson r = -0.04, p = 0.62</span>).
                  </p>
                </div>
              </div>
            </div>

            {/* Secondary Analytics Row */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-8">
              
              {/* Secondary Card A: Financial Reconciliation (6 Cols) */}
              <div className="xl:col-span-6 bg-surface-container-lowest p-6 rounded-DEFAULT shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[22px]">account_balance</span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">
                          Chikondi Transport & USSD Reconciliation
                        </h3>
                      </div>
                      <p className="font-bilingual-caption text-bilingual-caption text-on-surface-variant mt-0.5">
                        Ndondomeko ya Ndalama za Thandizo la Maulendo (Global Fund / PIH Grant Pool)
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">verified</span> Clean Audit
                    </span>
                  </div>

                  <div className="p-4 bg-surface-container-low rounded-DEFAULT mb-5">
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                          Total Grant Allocation
                        </span>
                        <div className="font-headline-lg text-headline-lg font-bold text-on-surface">
                          MWK 87,500,000{" "}
                          <span className="font-body-md text-body-md text-on-surface-variant font-normal">
                            ($50,000 USD)
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-label-sm text-label-sm text-secondary font-bold">70.2% Disbursed</span>
                        <div className="font-mono text-body-sm text-body-sm text-on-surface-variant">MWK 61,420,000 Expended</div>
                      </div>
                    </div>

                    <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden flex">
                      <div className="bg-primary h-full" style={{ width: "70.2%" }} />
                      <div className="bg-secondary h-full" style={{ width: "2.1%" }} />
                      <div className="bg-surface-container-highest h-full" style={{ width: "27.7%" }} />
                    </div>
                    <div className="flex justify-between items-center text-xs text-on-surface-variant font-mono mt-2">
                      <span>Airtel / TNM Transit: 68.1%</span>
                      <span>USSD Tolls: 2.1%</span>
                      <span>Reserve: 27.7% (MWK 24.2M)</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-DEFAULT bg-surface-container">
                      <div className="flex items-center gap-3">
                        <span className="p-2 rounded-full bg-primary-fixed text-primary">
                          <span className="material-symbols-outlined text-[18px]">phone_android</span>
                        </span>
                        <div>
                          <p className="font-label-md text-label-md text-on-surface font-semibold">Mobile Money Disbursed</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">4,320 micro-vouchers via Airtel Money & TNM Mpamba</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-on-surface">MWK 59,580,000</span>
                        <p className="font-label-sm text-label-sm text-secondary">0.0% Fee Leakage</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-DEFAULT bg-surface-container">
                      <div className="flex items-center gap-3">
                        <span className="p-2 rounded-full bg-secondary-fixed text-secondary">
                          <span className="material-symbols-outlined text-[18px]">contactless</span>
                        </span>
                        <div>
                          <p className="font-label-md text-label-md text-on-surface font-semibold">Reverse-Billed USSD / SMS Gateway</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">Free-to-patient shortcode *384*25# bundle</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-on-surface">MWK 1,840,000</span>
                        <p className="font-label-sm text-label-sm text-primary font-medium">MoH Telecom Bundle</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-DEFAULT bg-surface-container">
                      <div className="flex items-center gap-3">
                        <span className="p-2 rounded-full bg-tertiary-fixed text-tertiary">
                          <span className="material-symbols-outlined text-[18px]">fingerprint</span>
                        </span>
                        <div>
                          <p className="font-label-md text-label-md text-on-surface font-semibold">Ward 3B Biometric Match Rate</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">Physical clinic presence verified prior to disbursement</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-secondary">100.0%</span>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">0 duplicate claims</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 flex items-center justify-between text-xs text-on-surface-variant border-t border-surface-container">
                  <span>Current Runway: Projected through end of Q1 2025</span>
                  <span className="font-semibold text-primary">Unqualified Donor Audit</span>
                </div>
              </div>

              {/* Secondary Card B: Cancer Pathology Breakdown (6 Cols) */}
              <div className="xl:col-span-6 bg-surface-container-lowest p-6 rounded-DEFAULT shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[22px]">pie_chart</span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">
                          Primary Cancer Types & Pathology Registry
                        </h3>
                      </div>
                      <p className="font-bilingual-caption text-bilingual-caption text-on-surface-variant mt-0.5">
                        Magulu a Khansa mu DHIS2 Registry (Kamuzu Central Hospital Surveillance Cohort)
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface font-semibold">
                      N = 428 Enrolled
                    </span>
                  </div>

                  <div className="space-y-3.5 my-2">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-primary" />
                          <span className="font-label-md text-label-md text-on-surface font-semibold">Cervical Cancer (Khansa ya Khomo la Chiberekero)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-sm text-label-sm text-on-surface-variant">VIA/HPV Triage</span>
                          <span className="font-mono font-bold text-on-surface">146 (34.2%)</span>
                        </div>
                      </div>
                      <div className="h-2.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: "34.2%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-secondary" />
                          <span className="font-label-md text-label-md text-on-surface font-semibold">Breast Carcinoma (Khansa ya M'berewere)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-sm text-label-sm text-on-surface-variant">ER/PR IHC Track</span>
                          <span className="font-mono font-bold text-on-surface">113 (26.4%)</span>
                        </div>
                      </div>
                      <div className="h-2.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                        <div className="bg-secondary h-full rounded-full" style={{ width: "26.4%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-tertiary" />
                          <span className="font-label-md text-label-md text-on-surface font-semibold">Esophageal SCC (Khansa ya Mmero)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Stent / Dilatation</span>
                          <span className="font-mono font-bold text-on-surface">69 (16.1%)</span>
                        </div>
                      </div>
                      <div className="h-2.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                        <div className="bg-tertiary h-full rounded-full" style={{ width: "16.1%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-primary-container" />
                          <span className="font-label-md text-label-md text-on-surface font-semibold">Kaposi Sarcoma & NHL Lymphoma</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-sm text-label-sm text-on-surface-variant">ART Co-management</span>
                          <span className="font-mono font-bold text-on-surface">62 (14.5%)</span>
                        </div>
                      </div>
                      <div className="h-2.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                        <div className="bg-primary-container h-full rounded-full" style={{ width: "14.5%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-outline" />
                          <span className="font-label-md text-label-md text-on-surface font-semibold">Prostate & Pediatric Solid Tumors</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Endocrine / Peds</span>
                          <span className="font-mono font-bold text-on-surface">38 (8.8%)</span>
                        </div>
                      </div>
                      <div className="h-2.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                        <div className="bg-outline h-full rounded-full" style={{ width: "8.8%" }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-surface-container-low rounded-DEFAULT flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Histopathology Confirmation Rate: <strong className="text-on-surface">94.8%</strong> (KCH Pathology Lab)
                  </span>
                  <button
                    onClick={() => showToast("Loading detailed IHC marker panel data...", "biotech")}
                    className="font-label-sm text-label-sm text-primary font-bold hover:underline flex items-center gap-1"
                  >
                    Detailed IHC Panel <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Compliance Table: MoH-501 & Donor Indicator Matrix */}
            <div className="w-full bg-surface-container-lowest rounded-DEFAULT shadow-sm overflow-hidden mb-8">
              <div className="p-6 bg-surface-container-low flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[22px]">assignment_turned_in</span>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">
                      MoH-501 & Donor Indicator Performance Matrix
                    </h2>
                  </div>
                  <p className="font-bilingual-caption text-bilingual-caption text-on-surface-variant mt-0.5">
                    Quarterly Reporting Standards for Ministry of Health, PEPFAR & Global Fund Compliance
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                      filter_list
                    </span>
                    <input
                      type="text"
                      value={indicatorSearch}
                      onChange={(e) => setIndicatorSearch(e.target.value)}
                      placeholder="Filter indicator code..."
                      className="pl-9 pr-3 py-1.5 bg-surface-container-lowest rounded-full font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none shadow-sm"
                    />
                  </div>
                  <button
                    onClick={() => showToast("Downloading MoH-501 indicator CSV dataset...", "download")}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-surface-container rounded-full text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-label-sm font-semibold"
                  >
                    <span className="material-symbols-outlined text-[16px]">file_download</span>
                    <span>Download CSV</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      <th className="py-3.5 px-6 font-semibold">Indicator Code</th>
                      <th className="py-3.5 px-6 font-semibold">Indicator Description</th>
                      <th className="py-3.5 px-4 font-semibold text-center">MoH/Donor Target</th>
                      <th className="py-3.5 px-4 font-semibold text-center">Oct 2024 Actual</th>
                      <th className="py-3.5 px-6 font-semibold text-center">Compliance Status</th>
                      <th className="py-3.5 px-6 font-semibold">Data Verification Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-0 text-body-sm text-body-sm text-on-surface">
                    {filteredIndicators.map((row, idx) => (
                      <tr
                        key={row.code}
                        className={`hover:bg-surface-container-low transition-colors ${
                          idx % 2 === 1 ? "bg-surface-bright" : ""
                        }`}
                      >
                        <td className="py-4 px-6 font-mono font-bold text-primary">{row.code}</td>
                        <td className="py-4 px-6">
                          <span className="font-label-md text-label-md text-on-surface block font-semibold">
                            {row.description}
                          </span>
                          <span className="text-on-surface-variant text-xs">{row.subtext}</span>
                        </td>
                        <td className="py-4 px-4 font-mono font-medium text-center">{row.target}</td>
                        <td className="py-4 px-4 font-mono font-bold text-center text-secondary text-base">
                          {row.actual}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-bold">
                            <span className="material-symbols-outlined text-[14px]">check_circle</span> {row.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-mono text-xs bg-surface-container px-2 py-1 rounded text-on-surface-variant">
                            {row.source}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
