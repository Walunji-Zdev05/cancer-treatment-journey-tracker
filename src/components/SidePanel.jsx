import QuickLogForm from "./QuickLogForm.jsx";
import SmsTemplates from "./SmsTemplates.jsx";
import TransportFund from "./TransportFund.jsx";

export default function SidePanel({ onLog, onSend, onOpenLedger }) {
  return (
    <div className="xl:col-span-4 flex flex-col gap-5">
      <QuickLogForm onLog={onLog} />
      <SmsTemplates onSend={onSend} />
      <TransportFund onOpenLedger={onOpenLedger} />

      <div className="p-4 rounded bg-primary-fixed/30 flex items-start gap-3">
        <span className="material-symbols-outlined text-primary text-[22px] mt-0.5">favorite</span>
        <div className="flex flex-col">
          <p className="font-label-sm text-label-sm text-on-primary-fixed-variant font-semibold">
            "Tikondane: Palibe wodwala amene ayenera kuyenda ulendo uno yekha."
          </p>
          <p className="font-bilingual-caption text-bilingual-caption text-on-surface-variant mt-0.5">
            No oncology patient should walk this pathway alone.
          </p>
        </div>
      </div>
    </div>
  );
}
