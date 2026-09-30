import { statCards } from "../../data/community.js";

export default function StatsBar({ cards = statCards }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-9">
      {cards.map((card) => {
        const isUrgent = card.variant === "urgent";
        return (
          <div
            key={card.key}
            className={`rounded p-4 shadow-sm flex flex-col justify-between ${
              isUrgent ? "bg-error-container/40 border-l-4 border-error" : "bg-surface-container-lowest"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-1.5">
                <span
                  className={`font-label-md text-label-md ${
                    isUrgent ? "text-on-error-container font-semibold" : "text-on-surface-variant"
                  }`}
                >
                  {card.label}
                </span>
                {isUrgent && <span className="w-2 h-2 rounded-full bg-error animate-ping" />}
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${card.iconWrap}`}>
                <span className="material-symbols-outlined text-[20px]">{card.icon}</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-1">
                <span className={`font-headline-xl text-headline-xl font-bold ${card.valueClass}`}>{card.value}</span>
                {card.unit && <span className="font-body-sm text-body-sm text-outline">{card.unit}</span>}
                {card.unitBadge && (
                  <span className="font-label-sm text-label-sm text-on-error-container font-semibold">
                    {card.unitBadge}
                  </span>
                )}
              </div>
              <p
                className={`font-body-sm text-body-sm mt-1 ${
                  isUrgent ? "text-on-error-container" : "text-on-surface-variant"
                }`}
              >
                {card.note}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
