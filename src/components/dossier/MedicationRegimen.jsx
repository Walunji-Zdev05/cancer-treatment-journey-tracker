export default function MedicationRegimen({ medications, adherencePercent }) {
  return (
    <div className="bg-surface-container-lowest rounded shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[22px]">medication</span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Medication Regimen</h3>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1 bg-secondary-container text-on-secondary-container rounded-full font-label-sm text-label-sm font-bold">
          <span className="material-symbols-outlined text-[14px]">thumb_up</span>
          <span>{adherencePercent}% Adherence</span>
        </div>
      </div>

      <p className="font-bilingual-caption text-bilingual-caption text-on-surface-variant mb-4">
        Logged via daily 2G USSD prompts. Past 30 days compliance verified.
      </p>

      <div className="space-y-3">
        {medications.map((med) => (
          <div key={med.name} className="flex items-start justify-between p-3 bg-surface-container-low rounded">
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded bg-secondary/10 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[16px]">pill</span>
              </div>
              <div>
                <div className="font-label-md text-label-md text-on-surface font-semibold">{med.name}</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">{med.detail}</div>
              </div>
            </div>
            <span
              className={`font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-lowest font-bold ${
                med.status === "Active" ? "text-secondary" : "text-on-surface-variant"
              }`}
            >
              {med.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
