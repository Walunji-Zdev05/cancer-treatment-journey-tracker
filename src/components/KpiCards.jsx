const cards = [
  {
    label: "Urgent 2+ Missed",
    value: "6",
    unit: "patients",
    icon: "warning",
    accent: "bg-error",
    iconWrap: "bg-error-container text-on-error-container",
    valueClass: "text-error",
    footer: "Requires home visit / CHW dispatch",
    footerClass: "text-error flex items-center gap-1",
    pulse: true,
  },
  {
    label: "Missed 1 Visit",
    value: "11",
    unit: "patients",
    icon: "event_busy",
    accent: "bg-tertiary",
    iconWrap: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    valueClass: "text-on-surface",
    footer: "Call or SMS prompt needed",
    footerClass: "text-on-surface-variant",
  },
  {
    label: "Severe Toxicities",
    value: "4",
    unit: "in 24 hours",
    icon: "medical_services",
    accent: "bg-error",
    iconWrap: "bg-error-container text-on-error-container",
    valueClass: "text-error",
    footer: "Fever > 38.5°C or Grade 3+ emesis",
    footerClass: "text-error",
  },
  {
    label: "Transport Aid",
    value: "8",
    unit: "vouchers pending",
    icon: "directions_bus",
    accent: "bg-primary",
    iconWrap: "bg-primary-fixed text-on-primary-fixed-variant",
    valueClass: "text-primary",
    footer: "Chikondi Fund active",
    footerClass: "text-on-surface-variant",
  },
];

export default function KpiCards({ attendance = 84, attended = 38, total = 45 }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-7">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-surface-container-lowest p-5 rounded shadow-[0_4px_16px_-2px_rgba(59,130,246,0.06)] flex flex-col justify-between relative overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className={`absolute top-0 left-0 w-1.5 h-full ${card.accent}`} />
          <div className="flex items-start justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold tracking-wider uppercase">
              {card.label}
            </span>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center ${card.iconWrap}`}>
              <span className="material-symbols-outlined text-[18px]">{card.icon}</span>
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className={`font-headline-xl text-headline-xl font-bold ${card.valueClass}`}>{card.value}</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">{card.unit}</span>
          </div>
          <p className={`font-bilingual-caption text-bilingual-caption mt-1 ${card.footerClass}`}>
            {card.pulse ? <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse" /> : null}
            {card.footer}
          </p>
        </div>
      ))}

      <div className="bg-surface-container-lowest p-5 rounded shadow-[0_4px_16px_-2px_rgba(59,130,246,0.06)] flex flex-col justify-between relative overflow-hidden hover:shadow-md transition-shadow">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary" />
        <div className="flex items-start justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold tracking-wider uppercase">
            Today's Attendance
          </span>
          <span className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">verified</span>
          </span>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-headline-xl text-headline-xl text-secondary font-bold">{attendance}%</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {attended} / {total}
          </span>
        </div>
        <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-2 overflow-hidden">
          <div className="bg-secondary h-full rounded-full" style={{ width: `${attendance}%` }} />
        </div>
      </div>
    </section>
  );
}
