import { useState } from "react";
import { patients } from "../data/patients.js";

const outcomes = [
  { value: "answered-rescheduled", label: "Call Answered - Rescheduled Visit" },
  { value: "answered-reassured", label: "Call Answered - Reassured / Symptom Advised" },
  { value: "guardian-reached", label: "Guardian Reached (Relative Answering)" },
  { value: "no-answer-sms", label: "No Answer - Follow-up SMS Dispatched" },
  { value: "transport-approved", label: "Minibus Fare Dispatched (Airtel/TNM)" },
  { value: "in-hospital", label: "Patient Already in Ward / Hospital" },
  { value: "chw-dispatched", label: "CHW Village Visit Dispatched" },
];

export default function QuickLogForm({ onLog }) {
  const [patientName, setPatientName] = useState(patients[0]?.name ?? "");
  const [outcome, setOutcome] = useState(outcomes[0].value);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const outcomeLabel = outcomes.find((o) => o.value === outcome)?.label ?? outcome;
    onLog(`Log recorded for ${patientName}: ${outcomeLabel}`);
    setNotes("");
  };

  return (
    <div className="bg-surface-container-lowest p-5 rounded shadow-[0_4px_16px_-2px_rgba(59,130,246,0.06)] relative overflow-hidden">
      <div className="flex items-center justify-between pb-3 border-b border-surface-container-low mb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">phone_in_talk</span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Quick Call & Contact Log</h2>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
          Active Shift
        </span>
      </div>

      <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
        <div>
          <label className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1">
            Select Patient
          </label>
          <select
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full h-11 px-3.5 rounded bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {patients.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name} ({p.id} - {p.district})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1">
            Contact Outcome / Zotsatira
          </label>
          <select
            value={outcome}
            onChange={(e) => setOutcome(e.target.value)}
            className="w-full h-11 px-3.5 rounded bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {outcomes.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1">
            Navigator Clinical Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 rounded bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="e.g. Guardian agreed patient will travel Thursday 7am, bus fare approved..."
            rows={2}
          />
        </div>

        <button
          type="submit"
          className="w-full h-12 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 shadow-sm hover:bg-primary-container transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">save</span>
          <span>Record Contact Log (Sungani)</span>
        </button>
      </form>
    </div>
  );
}
