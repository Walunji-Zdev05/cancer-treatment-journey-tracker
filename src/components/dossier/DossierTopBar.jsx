import { Link } from "react-router-dom";

export default function DossierTopBar({ patient, onPrintSummary }) {
  return (
    <div className="flex items-center justify-between py-3 mb-2">
      <div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
        <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Patient Registry</span>
        </Link>
        <span className="text-outline">/</span>
        <span>{patient.breadcrumb.region}</span>
        <span className="text-outline">/</span>
        <span className="text-on-surface font-label-sm font-semibold">
          {patient.patientId} ({patient.name})
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full text-on-surface-variant">
          <span className="w-2 h-2 rounded-full bg-secondary" />
          <span className="font-label-sm text-label-sm">USSD Gateway: Connected ({patient.ussdGateway})</span>
        </div>
        <button
          onClick={onPrintSummary}
          className="flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-full text-on-surface hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined text-primary text-[16px]">print</span>
          <span className="font-label-sm text-label-sm">Clinical Summary</span>
        </button>
      </div>
    </div>
  );
}
