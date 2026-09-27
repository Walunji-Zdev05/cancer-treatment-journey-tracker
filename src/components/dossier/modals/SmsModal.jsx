import { useState } from "react";
import ModalShell from "./ModalShell.jsx";

export default function SmsModal({ open, onClose, templates, onSend }) {
  const [templateKey, setTemplateKey] = useState("voucher");
  const [body, setBody] = useState(templates.voucher);

  const handleTemplateChange = (key) => {
    setTemplateKey(key);
    if (key !== "custom" && templates[key]) setBody(templates[key]);
  };

  return (
    <ModalShell open={open} onClose={onClose} icon="sms" title="Direct SMS to Patient">
      <div className="mb-3">
        <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold block mb-1">
          Pre-translated Quick Template
        </label>
        <select
          value={templateKey}
          onChange={(e) => handleTemplateChange(e.target.value)}
          className="w-full p-2.5 bg-surface-container-low rounded-xl text-on-surface font-body-sm text-body-sm focus:outline-none"
        >
          <option value="custom">Custom Message...</option>
          <option value="voucher">Transport Voucher Alert (Chichewa)</option>
          <option value="reschedule">Rescheduled Appointment (Chichewa)</option>
          <option value="nurse">Nurse Grace Callback Request (Chichewa)</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold block mb-1">
          Message Body (Standard 160 GSM)
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          className="w-full p-3 bg-surface-container-low rounded-xl text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 h-12 rounded-full bg-surface-container text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-high transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => onSend(body)}
          className="flex-1 h-12 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold hover:opacity-90 transition-opacity"
        >
          Send SMS Now
        </button>
      </div>
    </ModalShell>
  );
}
