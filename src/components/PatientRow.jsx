const statusStyles = {
  urgent: "bg-error-container text-on-error-container",
  toxicity: "bg-error-container text-on-error-container",
  missed1: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  callback: "bg-secondary-container text-on-secondary-container",
  ontrack: "bg-secondary-container text-on-secondary-container",
};

const barrierStyles = {
  urgent: "bg-surface-container text-on-surface",
  toxicity: "bg-error-container text-on-error-container",
  missed1: "bg-primary-fixed text-on-primary-fixed-variant font-semibold",
  callback: "bg-surface-container text-on-surface",
  ontrack: "bg-surface-container text-on-surface",
};

export default function PatientRow({ patient, onCall, onPrimaryAction, onOpenDossier }) {
  return (
    <tr className="hover:bg-surface-container-low/60 transition-colors group">
      <td className="py-4 px-4 align-top">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full font-headline-sm text-headline-sm flex items-center justify-center font-bold ${patient.avatarClass}`}
          >
            {patient.initials}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="font-label-md text-label-md text-on-surface font-semibold truncate">{patient.name}</p>
              <span className="text-[11px] px-1.5 py-0.2 rounded bg-surface-container text-on-surface-variant font-medium">
                {patient.district}
              </span>
            </div>
            <p className="text-on-surface-variant font-bilingual-caption text-bilingual-caption">{patient.meta}</p>
            <p className="text-on-surface-variant text-[11px] truncate">{patient.contact}</p>
          </div>
        </div>
      </td>

      <td className="py-4 px-4 align-top">
        <p className="font-label-sm text-label-sm text-on-surface font-semibold">{patient.diagnosis}</p>
        <p className="text-on-surface-variant font-body-sm text-body-sm">{patient.regimen}</p>
        <span className="inline-flex items-center gap-1 text-[11px] text-on-surface-variant font-medium">
          {patient.due}
        </span>
      </td>

      <td className="py-4 px-4 align-top">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold ${statusStyles[patient.status]}`}
        >
          {patient.statusLabel}
        </span>
        <p className="text-[11px] mt-1 font-medium text-on-surface-variant">{patient.statusNote}</p>
      </td>

      <td className="py-4 px-4 align-top">
        <p className="text-on-surface font-label-sm text-label-sm">{patient.touchpoint}</p>
        <p className="text-on-surface-variant text-bilingual-caption text-bilingual-caption">
          {patient.touchpointNote}
        </p>
        <span className="inline-flex items-center gap-1 text-[11px] text-on-surface-variant mt-0.5">
          {patient.touchpointFlag}
        </span>
      </td>

      <td className="py-4 px-4 align-top">
        <span
          className={`inline-block px-2 py-0.5 rounded font-label-sm text-label-sm mb-1 ${barrierStyles[patient.status]}`}
        >
          {patient.barrier}
        </span>
        <p className="text-[11px] text-on-surface-variant">{patient.barrierNote}</p>
      </td>

      <td className="py-4 px-4 align-top text-right whitespace-nowrap">
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => onPrimaryAction(patient)}
            className="h-9 px-3 rounded-full bg-primary text-on-primary font-label-sm text-label-sm flex items-center gap-1 shadow-sm hover:opacity-90 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">{patient.primaryAction.icon}</span>
            <span>{patient.primaryAction.label}</span>
          </button>
          <button
            onClick={() => onCall(patient)}
            title="Call"
            className="w-9 h-9 rounded-full bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">phone</span>
          </button>
          <button
            onClick={() => onOpenDossier(patient)}
            title="Open Dossier"
            className="w-9 h-9 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">folder_shared</span>
          </button>
        </div>
      </td>
    </tr>
  );
}
