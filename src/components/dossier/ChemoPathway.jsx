const stateStyles = {
  done: { dot: "bg-secondary text-on-secondary", icon: "check" },
  current: { dot: "bg-error-container text-error animate-pulse", icon: "schedule" },
  upcoming: { dot: "bg-surface-container text-outline", icon: null },
};

export default function ChemoPathway({ pathway }) {
  return (
    <div className="bg-surface-container-lowest rounded shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">timeline</span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Chemo Pathway</h2>
        </div>
        <span className="px-2.5 py-1 bg-primary-fixed text-on-primary-fixed rounded-full font-label-sm text-label-sm font-bold">
          {pathway.progressPercent}% Completed
        </span>
      </div>

      <div className="mb-5 bg-surface-container-low p-4 rounded">
        <div className="flex justify-between items-end mb-2">
          <div>
            <div className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
              Cumulative Dose Progress
            </div>
            <div className="font-headline-md text-headline-md text-primary mt-0.5">{pathway.regimenLabel}</div>
          </div>
          <div className="text-right">
            <span className="font-label-md text-label-md text-on-surface font-bold">{pathway.cyclesDone}</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant"> / {pathway.cyclesTotal} Cycles</span>
          </div>
        </div>
        <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${pathway.progressPercent}%` }}
          />
        </div>
      </div>

      <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-highest">
        {pathway.milestones.map((m) => {
          const style = stateStyles[m.state];
          const isCurrent = m.state === "current";
          return (
            <div key={m.id} className={`relative ${m.state === "upcoming" ? "opacity-60" : ""}`}>
              <div
                className={`absolute ${isCurrent ? "-left-[25px] top-0 w-6 h-6" : "-left-[23px] top-0.5 w-5 h-5"} rounded-full flex items-center justify-center ${style.dot}`}
              >
                {style.icon ? (
                  <span className="material-symbols-outlined text-[13px] font-bold">{style.icon}</span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-outline" />
                )}
              </div>
              <div className="flex items-baseline justify-between">
                <span
                  className={`font-label-md text-label-md font-semibold ${
                    isCurrent ? "text-error font-bold" : "text-on-surface"
                  }`}
                >
                  {m.title}
                </span>
                {isCurrent ? (
                  <span className="px-2 py-0.5 bg-error text-on-error rounded-full font-label-sm text-label-sm font-bold">
                    {m.statusLabel}
                  </span>
                ) : (
                  <span
                    className={`font-label-sm text-label-sm font-bold ${
                      m.state === "done" ? "text-secondary" : "text-outline"
                    }`}
                  >
                    {m.statusLabel}
                  </span>
                )}
              </div>
              <p
                className={`font-body-sm text-body-sm mt-0.5 ${
                  isCurrent ? "text-on-surface font-medium" : "text-on-surface-variant"
                }`}
              >
                {m.note}
              </p>
              {m.warning && (
                <div className="mt-2 text-bilingual-caption font-bilingual-caption text-error bg-error-container/40 p-2 rounded-lg">
                  {m.warning}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
