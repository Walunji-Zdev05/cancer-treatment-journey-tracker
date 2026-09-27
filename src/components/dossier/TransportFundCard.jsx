import { useState } from "react";

export default function TransportFundCard({ fund, onDisbursed, onOpenModal }) {
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const disburse = () => {
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      onDisbursed?.();
    }, 1200);
  };

  return (
    <div className="bg-surface-container-lowest rounded shadow-md p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-tertiary" />
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary text-[22px]">directions_bus</span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Community Transport Fund</h3>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
          Emergency Grant
        </span>
      </div>

      <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
        Financial distance mitigation supported by <span className="font-semibold text-on-surface">{fund.program}</span>.
      </p>

      <div className="bg-surface-container-low rounded p-4 mb-4">
        <div className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold mb-2">
          Pre-Calculated Minibus Journey
        </div>
        <div className="space-y-2 text-body-sm font-body-sm text-on-surface">
          {fund.legs.map((leg, i) => (
            <div key={leg.label}>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${i === 0 ? "bg-primary" : "bg-secondary"}`} />
                <span>
                  <strong>Leg {i + 1}:</strong> {leg.label.replace(/^Leg \d+: /, "")}
                </span>
              </div>
              <div className="flex items-center gap-2 pl-4 text-on-surface-variant font-label-sm">
                <span className="material-symbols-outlined text-[14px]">schedule</span> {leg.detail}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 flex items-center justify-between">
          <span className="font-label-md text-label-md text-on-surface font-bold">Standard Round-Trip Fare:</span>
          <span className="font-headline-sm text-headline-sm text-tertiary font-bold">
            MWK {fund.fareMwk.toLocaleString()}
          </span>
        </div>
        <div className="font-bilingual-caption text-bilingual-caption text-on-surface-variant mt-0.5">
          Equivalent to ~${fund.fareUsd.toFixed(2)} USD (Pre-cleared subsidy rate)
        </div>
      </div>

      <div className="bg-surface-container-high p-4 rounded mb-3">
        <div className="flex items-center justify-between text-body-sm font-body-sm mb-2">
          <span className="font-semibold text-on-surface">Recipient Mobile Money:</span>
          <span className="font-mono text-primary font-bold">{fund.mobileMoney.phone}</span>
        </div>
        <div className="text-bilingual-caption font-bilingual-caption text-on-surface-variant mb-3">
          Registered: {fund.mobileMoney.provider} (Verified: {fund.mobileMoney.verifiedName})
        </div>

        {status !== "sent" && (
          <button
            onClick={disburse}
            disabled={status === "sending"}
            className="w-full h-12 bg-tertiary hover:opacity-95 text-on-tertiary rounded-full font-label-md text-label-md font-bold transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70"
          >
            <span className={`material-symbols-outlined text-[20px] ${status === "sending" ? "animate-spin" : ""}`}>
              {status === "sending" ? "progress_activity" : "send_money"}
            </span>
            <span>
              {status === "sending"
                ? "Processing Airtel Money API..."
                : `Disburse MWK ${fund.fareMwk.toLocaleString()} via Airtel Money`}
            </span>
          </button>
        )}

        {status === "sent" && (
          <div className="mt-1 p-3 bg-secondary-container text-on-secondary-container rounded text-label-sm font-label-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
            <span>Transaction Ref #AM-99214 Sent Successfully. SMS voucher dispatched to patient.</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-bilingual-caption font-bilingual-caption text-on-surface-variant">
        <span>Remaining Unit Fund: MWK {fund.remainingFundMwk.toLocaleString()}</span>
        <button onClick={onOpenModal} className="text-primary hover:underline font-semibold">
          Ledger History
        </button>
      </div>
    </div>
  );
}
