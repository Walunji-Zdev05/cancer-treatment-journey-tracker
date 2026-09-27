import { useState } from "react";
import { smsTemplates } from "../data/patients.js";

export default function SmsTemplates({ onSend }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-surface-container-lowest p-5 rounded shadow-[0_4px_16px_-2px_rgba(59,130,246,0.06)] flex flex-col gap-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">sms</span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Bilingual SMS Templates</h2>
        </div>
        <span className="font-label-sm text-label-sm text-primary font-semibold">KCH Gateway</span>
      </div>

      <p className="font-bilingual-caption text-bilingual-caption text-on-surface-variant">
        Tap a quick template to populate and dispatch directly to patient or guardian phone.
      </p>

      <div className="flex flex-col gap-2.5">
        {smsTemplates.map((tpl, i) => (
          <button
            key={tpl.key}
            onClick={() => setSelected(tpl)}
            className="text-left p-3 rounded bg-surface-container-low hover:bg-surface-container transition-all flex flex-col gap-1 group"
          >
            <div className="flex items-center justify-between">
              <span
                className={`font-label-sm text-label-sm font-semibold group-hover:underline ${
                  tpl.urgent ? "text-error" : "text-primary"
                }`}
              >
                {i + 1}. {tpl.title}
              </span>
              <span
                className={`material-symbols-outlined text-[16px] ${tpl.urgent ? "text-error" : "text-outline"}`}
              >
                {tpl.urgent ? "priority_high" : "send"}
              </span>
            </div>
            <p className="font-bilingual-caption text-bilingual-caption text-on-surface-variant line-clamp-2">
              "{tpl.body}"
            </p>
          </button>
        ))}
      </div>

      {selected && (
        <div className="mt-2 p-3 bg-surface-container rounded flex flex-col gap-2">
          <span className="font-label-sm text-label-sm font-semibold text-on-surface">{selected.title}</span>
          <p className="font-body-sm text-body-sm text-on-surface-variant">{selected.body}</p>
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              onClick={() => setSelected(null)}
              className="h-8 px-3 rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSend(`SMS "${selected.title}" queued for transmission via KCH Gateway.`);
                setSelected(null);
              }}
              className="h-8 px-4 rounded-full bg-primary text-on-primary font-label-sm text-label-sm flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">send</span> Send SMS Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
