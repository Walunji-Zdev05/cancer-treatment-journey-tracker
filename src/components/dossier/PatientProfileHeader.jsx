export default function PatientProfileHeader({ patient, onCallPatient, onOpenSms, onOpenReschedule }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
      <div className="xl:col-span-4 flex items-start gap-4">
        <div className="relative">
          <div
            className="w-20 h-20 rounded-2xl shadow-sm bg-surface-container-high flex items-center justify-center font-headline-lg text-headline-lg text-on-surface-variant"
            aria-label={patient.photoAlt}
          >
            {patient.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold shadow-sm">
            {patient.connectivity}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-headline-lg text-headline-lg text-on-surface truncate">{patient.name}</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
              {patient.patientId}
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            {patient.age} yrs • {patient.sex} • Yellow Passport:{" "}
            <span className="text-on-surface font-semibold">{patient.passport}</span>
          </p>
          <div className="flex items-center gap-2 mt-2 font-body-sm text-body-sm text-on-surface-variant flex-wrap">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">pin_drop</span>
              {patient.village}
            </span>
            <span className="text-outline-variant">•</span>
            <span className="font-label-sm text-label-sm text-primary font-semibold">
              {patient.distanceKm} km to KCH
            </span>
          </div>
          <div className="mt-2 text-bilingual-caption font-bilingual-caption text-on-surface-variant">
            Chiyankhulo: {patient.language}
          </div>
        </div>
      </div>

      <div className="xl:col-span-5 bg-surface-container-low rounded p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
            Clinical Oncology Record
          </span>
          <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm">
            {patient.staging.stage}
          </span>
        </div>
        <div className="font-label-lg text-label-lg text-on-surface font-semibold leading-snug">
          {patient.staging.diagnosis}
        </div>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {patient.staging.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-3 pt-3 flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
          <div>
            <span className="font-label-sm font-semibold text-on-surface">Protocol:</span> {patient.staging.protocol}
          </div>
          <div className="font-label-sm font-bold text-primary">{patient.staging.cycleLabel}</div>
        </div>
      </div>

      <div className="xl:col-span-3 flex flex-col justify-between gap-3">
        <div className="p-3 bg-surface-container-low rounded">
          <div className="flex items-center justify-between text-body-sm font-body-sm">
            <span className="text-on-surface-variant">Primary Handset:</span>
            <span className="font-label-sm font-semibold text-on-surface">{patient.contacts.primaryPhone}</span>
          </div>
          <div className="flex items-center justify-between text-body-sm font-body-sm mt-1">
            <span className="text-on-surface-variant">Guardian ({patient.contacts.guardianName}):</span>
            <span className="font-label-sm font-semibold text-on-surface">{patient.contacts.guardianPhone}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onCallPatient}
            className="h-11 px-3 bg-primary text-on-primary rounded-full font-label-sm text-label-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>Call Patient</span>
          </button>
          <button
            onClick={onOpenSms}
            className="h-11 px-3 bg-primary-fixed text-on-primary-fixed rounded-full font-label-sm text-label-sm hover:bg-primary-fixed-dim transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">sms</span>
            <span>Send SMS</span>
          </button>
          <button
            onClick={onOpenReschedule}
            className="col-span-2 h-10 px-3 bg-surface-container text-on-surface rounded-full font-label-sm text-label-sm hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
            <span>Reschedule Oncology Session</span>
          </button>
        </div>
      </div>
    </div>
  );
}
