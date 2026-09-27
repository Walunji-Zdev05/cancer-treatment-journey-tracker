import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";

export default function TelemetryDashboard() {
  const [activeNav, setActiveNav] = useState("ussd");
  const [searchTerm, setSearchTerm] = useState("");
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

  const triggerPingTest = () => {
    console.log("Ping test triggered");
  };

  const selectTrace = (id) => {
    console.log("Selected trace:", id);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <div className="bg-background font-body-md text-on-surface min-h-screen">
      <Sidebar active={activeNav} onNavigate={handleNavigate} />
      <div className="pl-72 flex flex-col min-h-screen">
        <Header searchTerm={searchTerm} onSearchChange={handleSearch} />

        <main className="w-full pt-20 px-8 flex-1 bg-background">
          <div className="flex flex-col w-full pb-16">
            {/* Top Live Gateway Status Banner */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 bg-surface-container-lowest rounded-2xl shadow-sm mb-6">
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-fixed text-primary">
                    <span className="material-symbols-outlined text-[22px]">cell_tower</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Cellular Communications Audit & Gateway Telemetry</h1>
                      <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm flex items-center gap-1 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span> Live Link
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Mauthenga a USSD ndi Ma SMS • Real-Time Packet Switching & Rural Cell Tower Audit</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2 pt-2">
                  <div className="flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full text-on-surface">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="font-label-sm text-label-sm font-semibold">Airtel MW SMPP v3.4:</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Connected • 142ms</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full text-on-surface">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="font-label-sm text-label-sm font-semibold">TNM USSD *384*265#:</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Active • 0 Dropped Sessions</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full text-on-surface">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">swap_calls</span>
                    <span className="font-label-sm text-label-sm">SMPP Throughput: 42 msg/sec</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors shadow-sm active:scale-95" onClick={triggerPingTest}>
                  <span className="material-symbols-outlined text-[18px] text-primary" id="pingIcon">sensors</span>
                  <span>Test Gateway Ping</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors shadow-sm active:scale-95">
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span>Export Telemetry CSV</span>
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-error text-on-error font-label-md text-label-md hover:opacity-95 shadow-md active:scale-95 transition-all">
                  <span className="material-symbols-outlined text-[18px]">podcasts</span>
                  <span>Broadcast Corridor Alert</span>
                </button>
              </div>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Card 1 */}
              <div className="p-5 bg-surface-container-lowest rounded-2xl shadow-sm relative overflow-hidden flex flex-col justify-between">
                <div className="absolute -right-3 -top-3 w-16 h-16 rounded-full bg-primary-fixed/40 pointer-events-none"></div>
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Total USSD Sessions (24h)</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline-xl text-headline-xl text-primary font-bold">342</span>
                      <span className="font-label-sm text-label-sm text-secondary font-semibold flex items-center">
                        <span className="material-symbols-outlined text-[14px]">trending_up</span> 98.4%
                      </span>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-primary-container/15 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">dialpad</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 bg-surface-container-low rounded-xl px-3 py-2 flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Avg. Duration</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">46 sec / session</span>
                </div>
              </div>
              {/* Card 2 */}
              <div className="p-5 bg-surface-container-lowest rounded-2xl shadow-sm relative overflow-hidden flex flex-col justify-between">
                <div className="absolute -right-3 -top-3 w-16 h-16 rounded-full bg-error-container/40 pointer-events-none"></div>
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Symptom & Barrier Triage</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline-xl text-headline-xl text-on-surface font-bold">48</span>
                      <span className="font-label-sm text-label-sm text-error font-semibold flex items-center">
                        <span className="material-symbols-outlined text-[14px]">warning</span> 6 Urgent
                      </span>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-error-container flex items-center justify-center text-error">
                    <span className="material-symbols-outlined text-[20px]">medical_services</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 bg-surface-container-low rounded-xl px-3 py-2 flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Escalated</span>
                  <span className="font-label-md text-label-md text-error font-semibold">To Sr Grace Phiri</span>
                </div>
              </div>
              {/* Card 3 */}
              <div className="p-5 bg-surface-container-lowest rounded-2xl shadow-sm relative overflow-hidden flex flex-col justify-between">
                <div className="absolute -right-3 -top-3 w-16 h-16 rounded-full bg-secondary-container/40 pointer-events-none"></div>
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Outbound SMS Delivery</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline-xl text-headline-xl text-secondary font-bold">99.1%</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">814 sent</span>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[20px]">mark_email_read</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 bg-surface-container-low rounded-xl px-3 py-2 flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Retried / Tower Queued</span>
                  <span className="font-label-md text-label-md text-tertiary font-semibold">7 in rural transit</span>
                </div>
              </div>
              {/* Card 4 */}
              <div className="p-5 bg-surface-container-lowest rounded-2xl shadow-sm relative overflow-hidden flex flex-col justify-between">
                <div className="absolute -right-3 -top-3 w-16 h-16 rounded-full bg-tertiary-fixed/30 pointer-events-none"></div>
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Reverse-Billed Toll (MoH)</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline-xl text-headline-xl text-on-surface font-bold">MWK 84.2k</span>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                    <span className="material-symbols-outlined text-[20px]">payments</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 bg-surface-container-low rounded-xl px-3 py-2 flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Zero Patient Cost</span>
                  <span className="font-label-md text-label-md text-secondary font-semibold">100% Subsidized</span>
                </div>
              </div>
            </div>

            {/* Interactive Filtering & Search Bar */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm mb-6 flex flex-col gap-3">
              <div className="flex flex-col lg:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
                  <input className="w-full h-11 pl-11 pr-4 bg-surface-container-low text-on-surface placeholder:text-outline rounded-full font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary" id="logSearchInput" onChange={(e) => handleSearch(e.target.value)} placeholder="Filter by phone number (+265...), Health ID (KCH-...), session ID, or message text..." type="text"/>
                </div>
                <div className="flex items-center gap-2 w-full lg:w-auto">
                  <div className="flex items-center gap-2 px-3 py-2 bg-surface-container-low rounded-full w-full lg:w-auto">
                    <span className="material-symbols-outlined text-[18px] text-primary">map</span>
                    <select className="bg-transparent font-label-sm text-label-sm text-on-surface focus:outline-none cursor-pointer pr-3">
                      <option value="all">All Corridors (Lilongwe, Salima, Dedza...)</option>
                      <option value="salima">Salima Lakeshore Minibus Corridor</option>
                      <option value="dedza">Dedza Escarpment Zone</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-surface-container-low rounded-full shrink-0">
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">calendar_today</span>
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold">Today (24 Oct 2024)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
                <button className="px-3.5 py-1.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm whitespace-nowrap shadow-sm transition-all">All Logs (1,156)</button>
                <button className="px-3.5 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm whitespace-nowrap transition-all">USSD Session Traces (*384*265#)</button>
                <button className="px-3.5 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm whitespace-nowrap transition-all">Two-Way SMS Reminders</button>
                <button className="px-3.5 py-1.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm whitespace-nowrap font-semibold transition-all flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-error"></span> Clinical Alerts (6)
                </button>
              </div>
            </div>

            {/* High-Density Telemetry Workspace */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              <div className="xl:col-span-8 flex flex-col gap-4">
                <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col">
                  <div className="p-4 bg-surface-container-low flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">rss_feed</span>
                      <span className="font-headline-sm text-headline-sm text-on-surface">Live Inbound & Outbound Telemetry Stream</span>
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-semibold">Real-time Buffer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Auto-polling (2s)</span>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-surface-container/60 text-on-surface-variant font-label-sm text-label-sm">
                          <th className="py-3 px-4 font-semibold">Time & Carrier</th>
                          <th className="py-3 px-4 font-semibold">Channel</th>
                          <th className="py-3 px-4 font-semibold">Patient & Phone</th>
                          <th className="py-3 px-4 font-semibold">Session Keystroke / Payload Content</th>
                          <th className="py-3 px-4 font-semibold">Delivery State</th>
                          <th className="py-3 px-4 text-right font-semibold">Audit</th>
                        </tr>
                      </thead>
                      <tbody className="font-body-sm text-body-sm divide-y-0" id="telemetryTableBody">
                        {/* Row 1 */}
                        <tr className="hover:bg-surface-container-low/70 transition-colors cursor-pointer group bg-surface-container-lowest" onClick={() => selectTrace('alineti')}>
                          <td className="py-3.5 px-4 align-top">
                            <div className="flex flex-col">
                              <span className="font-label-md text-label-md text-on-surface font-mono font-semibold">17:15:02</span>
                              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
                                <span className="w-2 h-2 rounded-full bg-primary"></span> Airtel MW
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 align-top">
                            <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold flex items-center gap-1 w-max">
                              <span className="material-symbols-outlined text-[14px]">dialpad</span> USSD
                            </span>
                          </td>
                          <td className="py-3.5 px-4 align-top">
                            <div className="flex flex-col">
                              <span className="font-label-md text-label-md text-on-surface font-semibold">Alineti Banda</span>
                              <span className="font-body-sm text-body-sm text-primary font-mono">KCH-4092</span>
                              <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">+265 99 412 8820</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 align-top max-w-xs">
                            <div className="flex flex-col gap-1">
                              <span className="font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1">
                                <span className="px-1.5 py-0.5 rounded bg-surface-container-high font-mono text-[11px] text-primary">Menu 2 &gt; 1</span>
                                Ndalama yamayendedwe sinakwanire
                              </span>
                              <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                                Reported bus fare shortfall MWK 14,000 for Salima Minibus • Auto-triggered transport voucher dispatch task.
                              </p>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 align-top">
                            <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1 w-max">
                              <span className="material-symbols-outlined text-[14px]">done_all</span> Session Complete
                            </span>
                            <span className="block text-[11px] text-on-surface-variant mt-1 font-mono">RC=0 (46s duration)</span>
                          </td>
                          <td className="py-3.5 px-4 align-top text-right">
                            <button className="px-3 py-1.5 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface font-label-sm text-label-sm transition-colors flex items-center gap-1 ml-auto">
                              <span>Inspect</span>
                              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Showing 1 of 1,156 communications logged today</span>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-sm text-label-sm disabled:opacity-40 transition-colors">Previous</button>
                      <span className="px-3 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-bold">1</span>
                      <button className="px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-sm text-label-sm transition-colors">Next</button>
                    </div>
                  </div>
                </div>

                {/* SVG Graph */}
                <div className="p-5 bg-surface-container-lowest rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">ssid_chart</span>
                      <span className="font-headline-sm text-headline-sm text-on-surface">Telecom SMPP & USSD Throughput Pulse</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Carrier packet load across Malawi 4G/3G/2G BTS nodes over last 60 minutes</p>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="w-64 h-12 bg-surface-container-low rounded-xl p-1 flex items-center">
                      <svg className="w-full h-full text-primary" fill="none" viewBox="0 0 240 40" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 30 C 20 28, 30 15, 50 18 C 70 21, 80 8, 100 12 C 120 16, 130 35, 150 25 C 170 15, 180 5, 200 14 C 220 23, 230 20, 240 22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
                        <path d="M0 30 C 20 28, 30 15, 50 18 C 70 21, 80 8, 100 12 C 120 16, 130 35, 150 25 C 170 15, 180 5, 200 14 C 220 23, 230 20, 240 22 L 240 40 L 0 40 Z" fill="currentColor" fillOpacity="0.1"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col shrink-0">
                      <span className="font-label-md text-label-md text-secondary font-bold font-mono">0.02% Err</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">SLA Compliant</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="xl:col-span-4 flex flex-col gap-6">
                <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-5 flex flex-col" id="traceViewerCard">
                  <div className="flex items-center justify-between pb-3 bg-surface-container-low -mx-5 -mt-5 p-5 rounded-t-2xl">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px]">terminal</span>
                      </div>
                      <div>
                        <h2 className="font-label-lg text-label-lg text-on-surface font-bold leading-tight">USSD Session Deep Inspector</h2>
                        <span className="font-body-sm text-body-sm text-on-surface-variant font-mono" id="inspectorSessionId">SESSION #USSD-MW-89410</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">Active View</span>
                  </div>
                  <div className="p-3.5 bg-surface-container-low rounded-xl my-4 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-semibold" id="inspectPatientName">Alineti Banda (KCH-4092)</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant font-mono" id="inspectPhone">+265 99 412 8820 • Salima Rural</span>
                    </div>
                    <span className="material-symbols-outlined text-primary text-[22px]">contact_phone</span>
                  </div>
                  <div className="flex flex-col gap-3 relative pl-3">
                    <div className="absolute left-6 top-3 bottom-3 w-0.5 bg-surface-container-highest"></div>
                    <div className="flex items-start gap-3 relative z-10">
                      <div className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 font-label-sm text-label-sm font-bold">1</div>
                      <div className="flex-1 bg-surface-container-low rounded-xl p-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm font-mono text-primary font-bold">*384*265#</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">17:15:02</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Dialed shortcode from Airtel MW SIM. Session initiated.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 relative z-10">
                      <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 font-label-sm text-label-sm font-bold">2</div>
                      <div className="flex-1 bg-surface-container-low rounded-xl p-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm font-mono text-on-surface font-bold">Key '2' [Barrier Check]</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">17:15:18</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Prompt: "1. Tsiku lakumana 2. Zovuta paulendo"</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 relative z-10">
                      <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 font-label-sm text-label-sm font-bold">3</div>
                      <div className="flex-1 bg-surface-container-low rounded-xl p-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm font-mono text-on-surface font-bold">Key '1' [Ndalama Transport]</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">17:15:33</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Shortfall indicated: Minibus fare Salima → Lilongwe</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 relative z-10">
                      <div className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 font-label-sm text-label-sm font-bold">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      </div>
                      <div className="flex-1 bg-secondary-container/30 rounded-xl p-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm font-bold text-on-secondary-container">Dispatched Webhook</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">17:15:48</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-secondary-container mt-0.5">
                          Session Terminated Cleanly (RC=0). Created voucher dispatch task #TF-881.
                        </p>
                      </div>
                    </div>
                  </div>
                  <details className="mt-4 pt-3 group">
                    <summary className="font-label-sm text-label-sm text-primary font-semibold cursor-pointer flex items-center justify-between hover:underline">
                      <span>Show Raw GSM PDU / SMPP Handshake</span>
                      <span className="material-symbols-outlined text-[18px] group-open:rotate-180 transition-transform">expand_more</span>
                    </summary>
                    <div className="p-3 bg-inverse-surface text-inverse-on-surface rounded-xl font-mono text-[11px] mt-2 leading-relaxed overflow-x-auto">
                      0000004c 00000004 00000000 00000001<br/>
                      74696b6f 6e64616e 65000101 32363539<br/>
                      39343132 38383230 00000000 00000000<br/>
                      [SMPP submit_sm_resp: ESME_ROK status=0x0]
                    </div>
                  </details>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-5 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">network_cell</span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">Corridor Tower Health</h2>
                    </div>
                    <span className="font-label-sm text-label-sm text-secondary font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span> 4 Corridors Live
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                          <span className="material-symbols-outlined text-[18px]">signal_cellular_4_bar</span>
                        </div>
                        <div>
                          <span className="font-label-md text-label-md text-on-surface font-semibold">Lilongwe Central</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant block">KCH Base Station • 99.9%</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-label-sm text-label-sm text-secondary font-bold font-mono">118ms</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant block">Queue: 0</span>
                      </div>
                    </div>
                    <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                          <span className="material-symbols-outlined text-[18px]">signal_cellular_4_bar</span>
                        </div>
                        <div>
                          <span className="font-label-md text-label-md text-on-surface font-semibold">Salima Lakeshore</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant block">Salima BTS • 98.2%</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-label-sm text-label-sm text-secondary font-bold font-mono">180ms</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant block">Queue: 2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
