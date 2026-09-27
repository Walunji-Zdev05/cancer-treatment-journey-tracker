export default function AlertBanner({ alert, onResolve }) {
  if (!alert) return null;

  return (
    <div className="mb-5 p-4 rounded bg-error-container text-on-error-container flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
      <div className="flex items-start md:items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-error text-on-error flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[22px]">warning</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-label-md text-label-md font-bold uppercase tracking-wide">{alert.title}</span>
            <span className="px-2 py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm font-bold">
              {alert.date}
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-error-container mt-0.5">{alert.body}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
        <button
          onClick={onResolve}
          className="px-4 py-2 bg-error text-on-error rounded-full font-label-sm text-label-sm hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-sm"
        >
          <span className="material-symbols-outlined text-[16px]">payments</span>
          <span>{alert.actionLabel}</span>
        </button>
      </div>
    </div>
  );
}
