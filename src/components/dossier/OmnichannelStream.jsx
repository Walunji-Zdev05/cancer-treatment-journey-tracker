import { useMemo, useState } from "react";
import StreamEvent from "./StreamEvent.jsx";

const channels = [
  { key: "all", label: "All Channels", icon: null },
  { key: "ussd", label: "USSD", icon: "dialpad" },
  { key: "sms", label: "SMS", icon: "sms" },
  { key: "call", label: "Calls", icon: "call" },
  { key: "ward", label: "Ward Desk", icon: "domain" },
];

export default function OmnichannelStream({ events, ussdGateway, onRefresh }) {
  const [activeChannel, setActiveChannel] = useState("all");

  const visibleEvents = useMemo(() => {
    if (activeChannel === "all") return events;
    return events.filter((e) => e.channel === activeChannel);
  }, [events, activeChannel]);

  return (
    <div className="bg-surface-container-lowest rounded shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">forum</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Omnichannel Stream</h2>
          </div>
          <p className="font-bilingual-caption text-bilingual-caption text-on-surface-variant mt-0.5">
            Live telemetry: USSD ({ussdGateway}), 2G SMS, Ward Kiosks & Voice Calls
          </p>
        </div>
        <button
          onClick={onRefresh}
          title="Refresh Feed"
          className="text-primary hover:text-on-primary-fixed-variant p-2 rounded-full hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">sync</span>
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 mb-5 text-label-sm font-label-sm">
        {channels.map((c) => {
          const isActive = activeChannel === c.key;
          return (
            <button
              key={c.key}
              onClick={() => setActiveChannel(c.key)}
              className={`px-3 py-1.5 rounded-full shrink-0 flex items-center gap-1 transition-colors ${
                isActive
                  ? "bg-primary text-on-primary font-semibold"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {c.icon && <span className="material-symbols-outlined text-[15px]">{c.icon}</span>}
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {visibleEvents.map((event) => (
          <StreamEvent key={event.id} event={event} />
        ))}
        {visibleEvents.length === 0 && (
          <p className="text-on-surface-variant font-body-sm text-body-sm text-center py-6">
            No events on this channel yet.
          </p>
        )}
      </div>
    </div>
  );
}
