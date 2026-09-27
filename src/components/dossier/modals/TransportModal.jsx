import ModalShell from "./ModalShell.jsx";

export default function TransportModal({ open, onClose, patient, fund, onAuthorize }) {
  return (
    <ModalShell open={open} onClose={onClose} icon="payments" iconColorClass="text-tertiary" title="Confirm Travel Voucher">
      <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
        You are authorizing an instant mobile money transfer from the{" "}
        <strong className="text-on-surface">Community Transport Fund</strong> to enable patient attendance for the
        next chemo cycle.
      </p>
      <div className="p-4 bg-surface-container-low rounded space-y-2 mb-4">
        <div className="flex justify-between font-body-sm text-body-sm">
          <span className="text-on-surface-variant">Beneficiary:</span>
          <span className="font-semibold text-on-surface">{patient.name} (Patient)</span>
        </div>
        <div className="flex justify-between font-body-sm text-body-sm">
          <span className="text-on-surface-variant">Carrier:</span>
          <span className="font-semibold text-on-surface">
            {fund.mobileMoney.provider} ({fund.mobileMoney.phone})
          </span>
        </div>
        <div className="flex justify-between font-body-sm text-body-sm">
          <span className="text-on-surface-variant">Route:</span>
          <span className="font-semibold text-on-surface">Chipoka ↔ Lilongwe KCH (Return)</span>
        </div>
        <div className="pt-2 flex justify-between font-headline-sm text-headline-sm text-tertiary font-bold">
          <span>Total Authorized:</span>
          <span>MWK {fund.fareMwk.toLocaleString()}</span>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 h-12 rounded-full bg-surface-container text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-high transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onAuthorize}
          className="flex-1 h-12 rounded-full bg-tertiary text-on-tertiary font-label-md text-label-md font-bold hover:opacity-90 transition-opacity"
        >
          Authorize & Send
        </button>
      </div>
    </ModalShell>
  );
}
