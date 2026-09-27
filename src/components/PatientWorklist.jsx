import { useMemo, useState } from "react";
import PatientRow from "./PatientRow.jsx";
import { filterChips } from "../data/patients.js";

export default function PatientWorklist({ patients, searchTerm, onSearchChange, onCall, onPrimaryAction, onOpenDossier }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("risk-desc");

  const visiblePatients = useMemo(() => {
    let list = patients;

    if (activeFilter !== "all") {
      list = list.filter((p) => p.category.includes(activeFilter));
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      list = list.filter((p) =>
        [p.name, p.id, p.district, p.diagnosis, p.phone].join(" ").toLowerCase().includes(term)
      );
    }

    return list;
  }, [patients, activeFilter, searchTerm]);

  return (
    <div className="xl:col-span-8 flex flex-col gap-4">
      <div className="bg-surface-container-lowest p-4 rounded shadow-[0_4px_16px_-2px_rgba(59,130,246,0.06)] flex flex-col gap-3.5">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              search
            </span>
            <input
              className="w-full h-11 pl-10 pr-4 bg-surface-container-low text-on-surface placeholder:text-outline rounded-full font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Search by patient name, KCH ID, yellow passport #, or phone number..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="material-symbols-outlined text-outline text-[18px] hidden sm:inline">sort</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 px-4 bg-surface-container-low text-on-surface font-label-sm text-label-sm rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-auto"
            >
              <option value="risk-desc">Sort by: Risk Severity (High to Low)</option>
              <option value="missed-desc">Sort by: Days Since Missed Visit</option>
              <option value="cycle-asc">Sort by: Treatment Stage</option>
              <option value="name-asc">Sort by: Patient Alphabetical</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-1 border-t border-surface-container-low">
          {filterChips.map((chip) => {
            const isActive = activeFilter === chip.key;
            return (
              <button
                key={chip.key}
                onClick={() => setActiveFilter(chip.key)}
                className={`px-3.5 py-1.5 rounded-full font-label-sm text-label-sm flex items-center gap-1.5 transition-colors ${
                  isActive
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-low text-on-surface hover:bg-surface-container"
                }`}
              >
                {chip.dotClass ? <span className={`w-2 h-2 rounded-full ${chip.dotClass}`} /> : null}
                <span>{chip.label}</span>
                <span className={isActive ? "font-bold text-[10px]" : ""}>{chip.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded shadow-[0_4px_16px_-2px_rgba(59,130,246,0.06)] overflow-hidden">
        <div className="px-5 py-3.5 bg-surface-container-low flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">queue_play_next</span>
            <span className="font-headline-sm text-headline-sm text-on-surface">Prioritized Queue</span>
            <span className="text-bilingual-caption font-bilingual-caption text-on-surface-variant font-normal">
              (Mndandanda Othandiza)
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            {visiblePatients.length} displaying of 14 high risk
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                <th className="py-3 px-4">Patient Information</th>
                <th className="py-3 px-4">Stage & Regimen</th>
                <th className="py-3 px-4">Triage Status</th>
                <th className="py-3 px-4">Last Touchpoint</th>
                <th className="py-3 px-4">Identified Barriers</th>
                <th className="py-3 px-4 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low font-body-sm text-body-sm">
              {visiblePatients.map((patient) => (
                <PatientRow
                  key={patient.id}
                  patient={patient}
                  onCall={onCall}
                  onPrimaryAction={onPrimaryAction}
                  onOpenDossier={onOpenDossier}
                />
              ))}
              {visiblePatients.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 px-4 text-center text-on-surface-variant font-body-sm text-body-sm">
                    No patients match this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3.5 bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Showing active tasks for today's morning triage round
          </span>
          <div className="flex items-center gap-2">
            <button className="h-8 px-3 rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm hover:bg-surface-container transition-all">
              Previous
            </button>
            <button className="h-8 px-3 rounded-full bg-primary text-on-primary font-label-sm text-label-sm shadow-sm">
              1
            </button>
            <button className="h-8 px-3 rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm hover:bg-surface-container transition-all">
              2
            </button>
            <button className="h-8 px-3 rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm hover:bg-surface-container transition-all">
              Next
            </button>
          </div>
        </div>
      </div>

      <RetentionPipeline />
    </div>
  );
}

function RetentionPipeline() {
  return (
    <div className="bg-surface-container-lowest p-5 rounded shadow-[0_4px_16px_-2px_rgba(59,130,246,0.06)] flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex flex-col gap-1 max-w-sm">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">analytics</span>
          <span className="font-headline-sm text-headline-sm text-on-surface">Weekly Retention Pipeline</span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          92.4% of high-risk patients retained across Cycle 1 through Cycle 6 via active nurse navigation and
          transport vouchers.
        </p>
      </div>

      <div className="flex-1 w-full max-w-md">
        <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant mb-1.5">
          <span>Biopsy → Chemo C1</span>
          <span>C2 - C4</span>
          <span>C5 - C6 Follow-up</span>
        </div>
        <div className="w-full flex h-3 rounded-full overflow-hidden bg-surface-container-high gap-1">
          <div className="bg-secondary h-full rounded-l-full" style={{ width: "58%" }} title="Completed on time (58%)" />
          <div className="bg-primary h-full" style={{ width: "26%" }} title="Retained via navigation aid (26%)" />
          <div className="bg-tertiary h-full" style={{ width: "10%" }} title="Rescheduled (10%)" />
          <div className="bg-error h-full rounded-r-full" style={{ width: "6%" }} title="Lost to follow-up (6%)" />
        </div>
        <div className="flex items-center gap-4 mt-2 text-[11px] text-on-surface-variant">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-secondary" /> On-Time
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary" /> Saved by Navigator
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-tertiary" /> Rescheduled
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-error" /> Default Risk
          </span>
        </div>
      </div>
    </div>
  );
}
