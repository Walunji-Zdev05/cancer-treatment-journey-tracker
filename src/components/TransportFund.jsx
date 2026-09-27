export default function TransportFund({ onOpenLedger }) {
  const available = 340000;
  const total = 500000;
  const percent = Math.round((available / total) * 100);

  return (
    <div className="bg-surface-container-lowest p-5 rounded shadow-[0_4px_16px_-2px_rgba(59,130,246,0.06)] flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">account_balance_wallet</span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Chikondi Transport Fund</h2>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-bold">
          MoH Partnered
        </span>
      </div>

      <p className="font-body-sm text-body-sm text-on-surface-variant">
        Emergency transport vouchers for rural patients traveling to Lilongwe KCH oncology unit.
      </p>

      <div className="flex items-baseline justify-between mt-1">
        <span className="font-headline-lg text-headline-lg font-bold text-on-surface">
          MWK {available.toLocaleString()}
        </span>
        <span className="font-label-sm text-label-sm text-on-surface-variant">
          of MWK {total.toLocaleString()} weekly pool
        </span>
      </div>

      <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-secondary h-full rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
        <span>Dispatched this week: 16 vouchers</span>
        <span className="text-secondary font-semibold">{percent}% Available</span>
      </div>

      <button
        onClick={onOpenLedger}
        className="mt-2 w-full h-10 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-surface-container transition-colors"
      >
        <span className="material-symbols-outlined text-[16px]">receipt_long</span>
        <span>View Full Voucher Ledger</span>
      </button>
    </div>
  );
}
