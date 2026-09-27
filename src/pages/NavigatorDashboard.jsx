import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import KpiCards from "../components/KpiCards.jsx";
import PatientWorklist from "../components/PatientWorklist.jsx";
import SidePanel from "../components/SidePanel.jsx";
import Toast from "../components/Toast.jsx";
import { useToast } from "../hooks/useToast.js";
import { patients } from "../data/patients.js";

export default function NavigatorDashboard() {
  const [activeNav, setActiveNav] = useState("triage");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast, showToast } = useToast();
  const navigate = useNavigate();

  const handleCall = (patient) => {
    if (patient.status === "toxicity") {
      showToast(`Escalating urgent clinical call to ${patient.name}...`, "emergency");
    } else {
      showToast(`Calling ${patient.name} at ${patient.phone}...`, "phone_in_talk");
    }
  };

  const handlePrimaryAction = (patient) => {
    const action = patient.primaryAction;
    switch (action.type) {
      case "dispatch-chw":
        showToast(`Dispatched Community Health Worker visit for ${patient.name} (${patient.id})`, "local_shipping");
        break;
      case "emergency-call":
        showToast(`Escalating urgent clinical call to ${patient.name}...`, "emergency");
        break;
      case "approve-fare":
        showToast(
          `Dispatched ${action.amount} Minibus Voucher to ${patient.name} (${patient.phone}) via Airtel Money`,
          "credit_score"
        );
        break;
      case "call":
        showToast(`Calling ${patient.name} at ${patient.phone}...`, "phone_in_talk");
        break;
      case "log-note":
        showToast(`Logged adherence note for ${patient.name}`, "task_alt");
        break;
      default:
        showToast(`Action recorded for ${patient.name}`, "check_circle");
    }
  };

  const handleOpenDossier = (patient) => {
    navigate(`/patients/${patient.id}`);
  };

  const handleNavigate = (key) => {
    setActiveNav(key);
    if (key === "ussd") {
      navigate("/telemetry");
    } else if (key === "schedule") {
      navigate("/schedule");
    } else if (key === "reports") {
      navigate("/reports");
    } else if (key === "triage") {
      navigate("/");
    } else if (key === "approvals" || key === "staff-approvals") {
      navigate("/staff-approvals");
    }
  };

  return (
    <div className="bg-background font-body-md text-on-surface min-h-screen">
      <Sidebar active={activeNav} onNavigate={handleNavigate} />
      <div className="pl-72 flex flex-col min-h-screen">
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <main className="w-full pt-20 px-8 flex-1 bg-background">
          <div className="flex flex-col w-full">
            <div className="relative w-full overflow-hidden">
              <div className="absolute -top-24 right-1/4 w-96 h-96 bg-primary-fixed-dim/20 rounded-full blur-3xl pointer-events-none -z-10" />
              <div className="absolute top-1/2 -left-20 w-80 h-80 bg-secondary-container/15 rounded-full blur-3xl pointer-events-none -z-10" />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 pt-1">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Kamuzu Central Hospital • Oncology Unit 3B
                    </span>
                    <span className="font-bilingual-caption text-bilingual-caption text-on-surface-variant hidden sm:inline">
                      Triage & Navigation Workspace (Gulu Loyang'anira Odwala)
                    </span>
                  </div>
                  <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                    Triage & Task Queue
                  </h1>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => showToast("Opening Broadcast SMS Alert composer for Ward 3B...", "forward_to_inbox")}
                    className="flex items-center gap-2 h-11 px-4 rounded-full bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">forward_to_inbox</span>
                    <span className="font-label-md text-label-md">Broadcast SMS Alert</span>
                  </button>
                  <button
                    onClick={() => showToast("Opening Yellow Passport Rapid Intake form...", "person_add")}
                    className="flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-on-primary shadow-sm hover:bg-primary-container transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">person_add</span>
                    <span className="font-label-md text-label-md">Intake Yellow Passport</span>
                  </button>
                </div>
              </div>

              <KpiCards />

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start pb-12">
                <PatientWorklist
                  patients={patients}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  onCall={handleCall}
                  onPrimaryAction={handlePrimaryAction}
                  onOpenDossier={handleOpenDossier}
                />
                <SidePanel
                  onLog={(msg) => showToast(msg, "save")}
                  onSend={(msg) => showToast(msg, "send")}
                  onOpenLedger={() => showToast("Loading Chikondi Transport Fund detailed audit ledger...", "receipt_long")}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      <Toast visible={toast.visible} message={toast.message} icon={toast.icon} />
    </div>
  );
}
