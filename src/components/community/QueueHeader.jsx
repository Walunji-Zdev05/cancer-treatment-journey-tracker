import { useState } from "react";
import { filterTabs } from "../../data/community.js";

export default function QueueHeader({
  onFilterChange,
  title = "Triage Worklist",
  icon = "inbox",
  countLabel = "5 to process",
  tabs = filterTabs,
  defaultTab = "all",
}) {
  const [active, setActive] = useState(defaultTab);

  const handleClick = (key) => {
    setActive(key);
    onFilterChange?.(key);
  };

  return (
    <div className="bg-surface-container-lowest rounded p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
      <div className="flex items-center gap-1">
        <span className="material-symbols-outlined text-primary text-[22px]">{icon}</span>
        <h2 className="font-headline-sm text-headline-sm text-on-surface">{title}</h2>
        <span className="bg-primary-fixed text-primary px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold">
          {countLabel}
        </span>
      </div>

      <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-full overflow-x-auto w-full sm:w-auto">
        {tabs.map((tab) => {
          const isActive = active === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => handleClick(tab.key)}
              className={`px-4 py-1 rounded-full font-label-sm text-label-sm whitespace-nowrap flex items-center gap-1 transition-colors ${
                isActive
                  ? "bg-surface-container-lowest shadow-sm font-semibold " + (tab.tone === "error" ? "text-error" : "text-primary")
                  : (tab.tone === "error" ? "text-error" : "text-on-surface-variant") + " hover:bg-surface-container-high"
              }`}
            >
              {tab.tone === "error" && <span className="w-1.5 h-1.5 rounded-full bg-error" />}
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
