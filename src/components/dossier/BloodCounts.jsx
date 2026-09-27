export default function BloodCounts({ labs }) {
  return (
    <div className="bg-surface-container-lowest rounded shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">biotech</span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Latest Blood Counts</h3>
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant">{labs.date}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {labs.readings.map((r) => (
          <div key={r.label} className="p-3 bg-surface-container-low rounded">
            <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
              <span>{r.label}</span>
              <span className="w-2 h-2 rounded-full bg-secondary" />
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{r.value}</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">{r.unit}</span>
            </div>
            <div className="mt-1 font-label-sm text-label-sm text-secondary font-semibold">{r.note}</div>
          </div>
        ))}
      </div>

      <div className="p-3 rounded bg-primary-fixed/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">health_and_safety</span>
          <span className="font-label-sm text-label-sm text-on-surface font-semibold">{labs.clearanceNote}</span>
        </div>
        <span className="font-label-sm text-label-sm text-primary font-bold">Ready</span>
      </div>
    </div>
  );
}
