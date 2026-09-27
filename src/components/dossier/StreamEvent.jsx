const channelIcon = {
  ward: { icon: "domain_disabled", bg: "bg-error text-on-error" },
  ussd: { icon: "dialpad", bg: "bg-tertiary text-on-tertiary" },
  sms: { icon: "sms", bg: "bg-primary text-on-primary" },
};

const toneClass = { ok: "text-secondary", primary: "text-primary" };

export default function StreamEvent({ event }) {
  const isCritical = event.critical;
  const iconCfg = channelIcon[event.channel] ?? { icon: "forum", bg: "bg-surface-container-highest text-on-surface" };

  return (
    <div className={`p-4 rounded ${isCritical ? "bg-error-container/30" : "bg-surface-container-low"}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${iconCfg.bg}`}>
            <span className="material-symbols-outlined text-[16px]">{iconCfg.icon}</span>
          </span>
          <div>
            <span className={`font-label-md text-label-md font-bold ${isCritical ? "text-error" : "text-on-surface"}`}>
              {event.title}
            </span>
            {event.subtitle && event.channel === "ussd" && (
              <span className="font-label-sm text-label-sm text-tertiary ml-2 font-semibold">{event.subtitle}</span>
            )}
            {event.subtitle && event.channel !== "ussd" && (
              <div className="font-body-sm text-body-sm text-on-surface-variant">{event.subtitle}</div>
            )}
          </div>
        </div>
        <span className="font-bilingual-caption text-bilingual-caption text-on-surface-variant font-medium whitespace-nowrap">
          {event.time}
        </span>
      </div>

      {event.body && (
        <div className="mt-2 text-body-sm font-body-sm text-on-surface">{event.body}</div>
      )}

      {event.bodyPrefix && (
        <div className="mt-2 text-body-sm font-body-sm text-on-surface">
          {event.bodyPrefix}
          <strong className="text-error">{event.bodyHighlight}</strong>
          {event.bodySuffix}
        </div>
      )}

      {event.sessionDump && (
        <div className="mt-2 p-3 bg-surface-container-lowest rounded-md">
          <div className="text-label-sm font-label-sm text-on-surface-variant font-bold mb-1">USSD Session Dump:</div>
          <div className="font-mono text-body-sm text-on-surface bg-surface-container-low p-2 rounded whitespace-pre-line">
            {event.sessionDump}
          </div>
        </div>
      )}

      {event.footnote && (
        <div className="mt-2 text-bilingual-caption font-bilingual-caption text-primary flex items-center gap-1 font-semibold">
          <span className="material-symbols-outlined text-[14px]">verified</span>
          {event.footnote}
        </div>
      )}

      {event.symptomCheck && (
        <>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Automated morning routine answered from Airtel 2G phone:
          </p>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {event.symptomCheck.map((s) => (
              <div key={s.label} className="bg-surface-container-lowest p-2 rounded text-center">
                <div className="font-label-sm text-label-sm text-on-surface-variant">{s.label}</div>
                <div className={`font-label-md text-label-md font-bold mt-0.5 ${toneClass[s.tone] ?? "text-on-surface"}`}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {event.smsBody && (
        <>
          <div className="mt-2 p-3 bg-surface-container-lowest rounded-md text-body-sm font-body-sm text-on-surface italic">
            {event.smsBody}
          </div>
          <div className="mt-2 flex items-center justify-between text-bilingual-caption font-bilingual-caption text-on-surface-variant flex-wrap gap-1">
            <span>Delivery Status: {event.deliveryStatus}</span>
            <span className="font-bold text-secondary">{event.reply}</span>
          </div>
        </>
      )}
    </div>
  );
}
