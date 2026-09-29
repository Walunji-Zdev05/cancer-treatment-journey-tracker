import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import Toast from "../components/Toast.jsx";
import { useToast } from "../hooks/useToast.js";

const complianceIndicators = [
  {
    code: "ONC-MOH-01",
    description: "Completing all 6 chemotherapy rounds",
    subtext: "All 6 rounds finished within 180 days of a lab-confirmed diagnosis",
    target: "> 85.0%",
    actual: "91.2%",
    status: "Exceeded (+6.2%)",
    statusType: "success",
    source: "Cancer ward chemotherapy register (paper + national health data system)",
  },
  {
    code: "PIH-RET-04",
    description: "Keeping patients from being lost to follow-up (30 days)",
    subtext: "Patients who miss an appointment by more than 30 days without telling the clinic",
    target: "< 8.0%",
    actual: "3.8%",
    status: "On Track (among the best)",
    statusType: "success",
    source: "Phone menu records & community health worker visit records",
  },
  {
    code: "MOH-SURV-08",
    description: "Diagnosis confirmed by lab test",
    subtext: "Percentage of registered cancer patients with a biopsy-confirmed diagnosis",
    target: "> 90.0%",
    actual: "94.8%",
    status: "Target Met",
    statusType: "success",
    source: "Kamuzu Central Hospital laboratory records",
  },
  {
    code: "PEP-ADHER-12",
    description: "Phone check-ins on symptoms and treatment",
    subtext: "Weekly automatic check-in response rate for patients in rural areas",
    target: "> 80.0%",
    actual: "89.2%",
    status: "Exceeded (+9.2%)",
    statusType: "success",
    source: "Airtel Malawi & TNM phone menu records",
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


            {/* Header and report controls */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-semibold uppercase tracking-wider">
                    National Cancer Monitoring
                  </span>
                  <span className="text-outline text-sm">/</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Kamuzu Central Hospital Unit
                  </span>
                </div>
                <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                  Cancer Programme Results & Reporting Dashboard
                </h1>
                <p className="font-bilingual-caption text-bilingual-caption text-on-surface-variant mt-1">
                  Malipoti a Unduna wa Zaumoyo ndi Othandizira — KCH Cancer Monitoring & Grant Reporting Portal
                </p>
              </div>

              {/* Action toolbar */}
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
                    <option value="Q3/Q4 2026">Q3/Q4 2026 • Jan–Oct so far (10 months)</option>
                    <option value="Q3 2026">Q3 2026 (Jul - Sep)</option>
                    <option value="Q2 2026">Q2 2026 (Apr - Jun)</option>
                    <option value="FY2025-2026">Full year 2025–2026 (starting point)</option>
                  </select>
                </div>
                <button
                  onClick={() => showToast("Preparing Ministry of Health report file for upload...", "cloud_download")}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container-lowest hover:bg-surface-container-high text-primary font-label-md text-label-md shadow-sm transition-all duration-200"
                >
                  <span className="material-symbols-outlined text-[18px]">cloud_download</span>
                  <span>Ministry of Health Report (MoH-501)</span>
                </button>
                <button
                  onClick={() => showToast("Generating funder report PDF...", "picture_as_pdf")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md shadow-md transition-all duration-200"
                >
                  <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                  <span>Funder Report</span>
                </button>
              </div>
            </div>

            {/* Headline result cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              {/* Card 1 */}
              <div className="bg-surface-container-lowest p-5 rounded-DEFAULT shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 right-0 h-1 bg-secondary" />
                <div className="flex items-start justify-between mb-3">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                    Chemotherapy Rounds 1–6 Completed
                  </span>
                  <span className="p-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant">
                    <span className="material-symbols-outlined text-[18px]">medication</span>
                  </span>
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-xl text-headline-xl font-bold text-on-surface">91.2%</span>
                    <span className="font-label-sm text-label-sm text-secondary font-bold flex items-center">
                      <span className="material-symbols-outlined text-[16px]">arrow_upward</span>+62.8 pts
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">vs 28.4% before Tikondane (2022)</p>
                </div>
                <div className="mt-4 pt-3 bg-surface-container-low -mx-5 -mb-5 px-5 py-2.5 flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Ministry target &gt; 85%</span>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">Target Met</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-surface-container-lowest p-5 rounded-DEFAULT shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
                <div className="flex items-start justify-between mb-3">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                    Patients Lost to Follow-up (30 Days)
                  </span>
                  <span className="p-1.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant">
                    <span className="material-symbols-outlined text-[18px]">person_pin_circle</span>
                  </span>
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-xl text-headline-xl font-bold text-on-surface">3.8%</span>
                    <span className="font-label-sm text-label-sm text-secondary font-bold flex items-center">
                      <span className="material-symbols-outlined text-[16px]">trending_down</span>-30.8 pts
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Down from 34.6% before Tikondane</p>
                </div>
                <div className="mt-4 pt-3 bg-surface-container-low -mx-5 -mb-5 px-5 py-2.5 flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Global standard &lt; 8%</span>
                  <span className="font-label-sm text-label-sm text-primary font-bold">Target Met</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-surface-container-lowest p-5 rounded-DEFAULT shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 right-0 h-1 bg-tertiary-container" />
                <div className="flex items-start justify-between mb-3">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                    Phone Reminder Reach
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
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">14,892 automatic reminders sent</p>
                </div>
                <div className="mt-4 pt-3 bg-surface-container-low -mx-5 -mb-5 px-5 py-2.5 flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Patients responding</span>
                  <span className="font-label-sm text-label-sm text-on-surface font-bold">89.2%</span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-surface-container-lowest p-5 rounded-DEFAULT shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary-container" />
                <div className="flex items-start justify-between mb-3">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                    1-Year Patients Still in Care
                  </span>
                  <span className="p-1.5 rounded-full bg-primary-fixed-dim text-on-primary-fixed-variant">
                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                  </span>
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-xl text-headline-xl font-bold text-on-surface">87.6%</span>
                    <span className="font-label-sm text-label-sm text-secondary font-bold flex items-center">Stages I–III</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Patients followed for one year</p>
                </div>
                <div className="mt-4 pt-3 bg-surface-container-low -mx-5 -mb-5 px-5 py-2.5 flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Follow-ups complete</span>
                  <span className="font-label-sm text-label-sm text-primary font-bold">375 / 428</span>
                </div>
              </div>
            </div>

            {/* Chemotherapy completion chart */}
            <div className="grid grid-cols-1 gap-8 mb-8">
              <div className="bg-surface-container-lowest p-6 rounded-DEFAULT shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[22px]">waterfall_chart</span>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface">
                          Patients Completing All 6 Chemotherapy Rounds
                        </h2>
                      </div>
                      <p className="font-bilingual-caption text-bilingual-caption text-on-surface-variant mt-0.5">
                        Ulendo wa Mankhwala — Fewer patients dropping out compared with before Tikondane (428 patients)
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                        <span className="w-3 h-3 rounded-full bg-primary" /> Tikondane 2024
                      </span>
                      <span className="flex items-center gap-1.5 font-label-sm text-label-sm text-outline">
                        <span className="w-3 h-3 rounded-full bg-outline-variant" /> 2022 (before Tikondane)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3.5 my-4">
                    {/* Step 0 */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-label-md text-label-md text-on-surface flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm flex items-center justify-center font-bold">0</span>
                          Registered at the hospital (Kamuzu Central Hospital cancer ward)
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-on-surface">428 patients (100%)</span>
                          <span className="font-mono text-outline text-xs">Before: 100%</span>
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
                          Round 1 chemotherapy & phone confirmation
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-on-surface">422 patients (98.6%)</span>
                          <span className="font-mono text-outline text-xs">Before: 82.1%</span>
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
                          Round 2 chemotherapy (follow-up at day 21)
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-on-surface">411 patients (96.0%)</span>
                          <span className="font-mono text-outline text-xs">Before: 54.3%</span>
                        </div>
                      </div>
                      <div className="h-3.5 w-full bg-surface-container-high rounded-full overflow-hidden flex">
                        <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "96.0%" }} />
                      </div>
                    </div>

                    {/* Step 3 (mid-point) */}
                    <div className="p-3 bg-secondary-fixed/30 rounded-DEFAULT space-y-1.5">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm flex items-center justify-center font-bold">3</span>
                          <span className="font-label-md text-label-md text-on-secondary-fixed-variant font-bold">
                            Round 3 — Mid-point check
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm text-[11px] font-semibold">
                            Key Milestone
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-secondary">400 patients (93.5%)</span>
                          <span className="font-mono text-error font-semibold text-xs">Before: 28.4% (big drop)</span>
                        </div>
                      </div>
                      <div className="h-3.5 w-full bg-surface-container rounded-full overflow-hidden flex">
                        <div className="h-full bg-secondary rounded-full transition-all duration-500" style={{ width: "93.5%" }} />
                      </div>
                      <p className="font-body-sm text-body-sm text-on-secondary-fixed-variant pt-1 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-secondary">lightbulb</span>
                        <em>Key point: this is where most patients used to drop out. Automatic reminders and follow-up contact help keep them in treatment.</em>
                      </p>
                    </div>

                    {/* Step 4 */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-label-md text-label-md text-on-surface flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm flex items-center justify-center font-bold">4</span>
                          Round 4 chemotherapy
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-on-surface">397 patients (92.8%)</span>
                          <span className="font-mono text-outline text-xs">Before: 22.0%</span>
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
                          Round 5 chemotherapy
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-on-surface">393 patients (91.9%)</span>
                          <span className="font-mono text-outline text-xs">Before: 18.2%</span>
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
                          Round 6 — Treatment completed, moving to regular check-ups
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-secondary">390 patients (91.2%)</span>
                          <span className="font-mono text-outline text-xs">Before: 14.8%</span>
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
                    Patients who completed all 6 rounds: <strong className="text-on-surface">390</strong>
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary font-semibold">
                    The difference from before is statistically significant (p &lt; 0.0001)
                  </span>
                </div>
              </div>
            </div>

            {/* Cancer types */}
            <div className="grid grid-cols-1 gap-8 mb-8">
              <div className="bg-surface-container-lowest p-6 rounded-DEFAULT shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[22px]">pie_chart</span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">
                          Types of Cancer Among Enrolled Patients
                        </h3>
                      </div>
                      <p className="font-bilingual-caption text-bilingual-caption text-on-surface-variant mt-0.5">
                        Magulu a Khansa — Kamuzu Central Hospital patient records
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface font-semibold">
                      428 patients enrolled
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
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Found through screening</span>
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
                          <span className="font-label-md text-label-md text-on-surface font-semibold">Breast Cancer (Khansa ya M'berewere)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Hormone-receptor testing</span>
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
                          <span className="font-label-md text-label-md text-on-surface font-semibold">Oesophageal (Food Pipe) Cancer (Khansa ya Mmero)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Swallowing support procedures</span>
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
                          <span className="font-label-md text-label-md text-on-surface font-semibold">Kaposi Sarcoma & Lymphoma</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-sm text-label-sm text-on-surface-variant">HIV treatment alongside cancer care</span>
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
                          <span className="font-label-md text-label-md text-on-surface font-semibold">Prostate Cancer & Childhood Tumours</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Hormone therapy / children's care</span>
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
                    Patients with a lab-confirmed diagnosis (biopsy): <strong className="text-on-surface">94.8%</strong>
                  </span>
                  <button
                    onClick={() => showToast("Loading detailed laboratory test results...", "biotech")}
                    className="font-label-sm text-label-sm text-primary font-bold hover:underline flex items-center gap-1"
                  >
                    Detailed Lab Test Results <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Targets table */}
            <div className="w-full bg-surface-container-lowest rounded-DEFAULT shadow-sm overflow-hidden mb-8">
              <div className="p-6 bg-surface-container-low flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[22px]">assignment_turned_in</span>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">
                      Ministry of Health & Funder Targets
                    </h2>
                  </div>
                  <p className="font-bilingual-caption text-bilingual-caption text-on-surface-variant mt-0.5">
                    Quarterly targets set by the Ministry of Health and funders
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
                      placeholder="Search targets..."
                      className="pl-9 pr-3 py-1.5 bg-surface-container-lowest rounded-full font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none shadow-sm"
                    />
                  </div>
                  <button
                    onClick={() => showToast("Downloading targets spreadsheet...", "download")}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-surface-container rounded-full text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-label-sm font-semibold"
                  >
                    <span className="material-symbols-outlined text-[16px]">file_download</span>
                    <span>Download Spreadsheet</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      <th className="py-3.5 px-6 font-semibold">Reference Code</th>
                      <th className="py-3.5 px-6 font-semibold">What Is Measured</th>
                      <th className="py-3.5 px-4 font-semibold text-center">Target</th>
                      <th className="py-3.5 px-4 font-semibold text-center">Oct 2024 Result</th>
                      <th className="py-3.5 px-6 font-semibold text-center">Status</th>
                      <th className="py-3.5 px-6 font-semibold">Where the Data Comes From</th>
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