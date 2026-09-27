import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import Toast from "../components/Toast.jsx";
import DossierTopBar from "../components/dossier/DossierTopBar.jsx";
import AlertBanner from "../components/dossier/AlertBanner.jsx";
import PatientProfileHeader from "../components/dossier/PatientProfileHeader.jsx";
import ChemoPathway from "../components/dossier/ChemoPathway.jsx";
import BloodCounts from "../components/dossier/BloodCounts.jsx";
import MedicationRegimen from "../components/dossier/MedicationRegimen.jsx";
import OmnichannelStream from "../components/dossier/OmnichannelStream.jsx";
import TransportFundCard from "../components/dossier/TransportFundCard.jsx";
import NavigatorNotes from "../components/dossier/NavigatorNotes.jsx";
import CareTeam from "../components/dossier/CareTeam.jsx";
import TransportModal from "../components/dossier/modals/TransportModal.jsx";
import SmsModal from "../components/dossier/modals/SmsModal.jsx";
import RescheduleModal from "../components/dossier/modals/RescheduleModal.jsx";
import { useToast } from "../hooks/useToast.js";
import { dossiers } from "../data/dossier.js";

export default function PatientDossier() {
  const { patientId } = useParams();
  const patient = dossiers[patientId] ?? Object.values(dossiers)[0];

  const [searchTerm, setSearchTerm] = useState("");
  const [activeNav, setActiveNav] = useState("registry");
  const [notes, setNotes] = useState(patient.notes);
  const [transportModalOpen, setTransportModalOpen] = useState(false);
  const [smsModalOpen, setSmsModalOpen] = useState(false);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const { toast, showToast } = useToast();

  const disbursementNote = useMemo(
    () => ({
      body: `Disbursed MWK ${patient.transportFund.fareMwk.toLocaleString()} travel allowance via Airtel Money directly to patient phone. Rescheduled for Monday 28 Oct. SMS notification sent.`,
      highlight: true,
    }),
    [patient]
  );

  const handleDirectDisburse = () => {
    setNotes((prev) => [
      {
        id: `auto-${Date.now()}`,
        author: "Sister Grace Phiri, RN (Automated Grant)",
        time: "Just now",
        body: disbursementNote.body,
        highlight: true,
        tags: [],
      },
      ...prev,
    ]);
  };

  const handleModalAuthorize = () => {
    setTransportModalOpen(false);
    handleDirectDisburse();
    showToast("Travel voucher authorized and dispatched.", "verified");
  };

  const handleAddNote = ({ body, tags }) => {
    setNotes((prev) => [
      { id: `note-${Date.now()}`, author: "Sister Grace Phiri, RN", time: "Just now", body, tags },
      ...prev,
    ]);
  };

  const handleSendSms = (body) => {
    setSmsModalOpen(false);
    showToast("SMS dispatched via Malawian Airtel SMS Gateway.", "send");
  };

  const handleConfirmReschedule = ({ date }) => {
    setRescheduleModalOpen(false);
    showToast(`Chemo session rescheduled to ${date} at Kamuzu Central Ward 3B.`, "event_available");
  };

  const navigate = useNavigate();

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
    }
  };

  return (
    <div className="bg-background font-body-md text-on-surface min-h-screen">
      <Sidebar active={activeNav} onNavigate={handleNavigate} />
      <div className="pl-72 flex flex-col min-h-screen">
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <main className="w-full pt-20 px-8 flex-1 bg-background">
          <div className="flex flex-col w-full pb-16">
            <DossierTopBar patient={patient} onPrintSummary={() => showToast("Preparing clinical summary PDF...", "print")} />

            <div className="bg-surface-container-lowest rounded shadow-sm p-6 mb-6 relative overflow-hidden">
              <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary-fixed opacity-40 blur-3xl pointer-events-none" />
              <AlertBanner alert={patient.alert} onResolve={() => setTransportModalOpen(true)} />
              <PatientProfileHeader
                patient={patient}
                onCallPatient={() => showToast(`Calling ${patient.name} at ${patient.contacts.primaryPhone}...`, "phone_in_talk")}
                onOpenSms={() => setSmsModalOpen(true)}
                onOpenReschedule={() => setRescheduleModalOpen(true)}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-4 flex flex-col gap-6">
                <ChemoPathway pathway={patient.pathway} />
                <BloodCounts labs={patient.labs} />
                <MedicationRegimen medications={patient.medications} adherencePercent={patient.adherencePercent} />
              </div>

              <div className="lg:col-span-5 flex flex-col gap-6">
                <OmnichannelStream
                  events={patient.stream}
                  ussdGateway={patient.ussdGateway}
                  onRefresh={() => showToast("Refreshing omnichannel feed...", "sync")}
                />
              </div>

              <div className="lg:col-span-4 flex flex-col gap-6">
                <TransportFundCard
                  fund={patient.transportFund}
                  onDisbursed={handleDirectDisburse}
                  onOpenModal={() => showToast("Loading voucher ledger history...", "receipt_long")}
                />
                <NavigatorNotes notes={notes} onAddNote={handleAddNote} />
                <CareTeam
                  team={patient.careTeam}
                  onCall={(member) => showToast(`Calling ${member.name} at ${member.phone}...`, "call")}
                  onMail={(member) => showToast(`Opening internal referral message to ${member.name}...`, "mail")}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      <TransportModal
        open={transportModalOpen}
        onClose={() => setTransportModalOpen(false)}
        patient={patient}
        fund={patient.transportFund}
        onAuthorize={handleModalAuthorize}
      />
      <SmsModal
        open={smsModalOpen}
        onClose={() => setSmsModalOpen(false)}
        templates={patient.smsTemplates}
        onSend={handleSendSms}
      />
      <RescheduleModal
        open={rescheduleModalOpen}
        onClose={() => setRescheduleModalOpen(false)}
        onConfirm={handleConfirmReschedule}
      />

      <Toast visible={toast.visible} message={toast.message} icon={toast.icon} />
    </div>
  );
}
