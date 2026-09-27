import { useState } from "react";
import ModalShell from "./ModalShell.jsx";

export default function RescheduleModal({ open, onClose, onConfirm }) {
  const [date, setDate] = useState("2024-10-28");
  const [slot, setSlot] = useState("Kamuzu Central - Oncology Day Unit Ward 3B (08:30 Morning Slot)");
  const [reason, setReason] = useState("Travel barrier resolved via Emergency Minibus Voucher");

  return (
    <ModalShell open={open} onClose={onClose} icon="calendar_today" title="Reschedule Session">
      <div className="space-y-4 mb-5">
        <div>
          <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold block mb-1">
            New Target Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 bg-surface-container-low rounded-xl text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold block mb-1">
            Clinic Station & Slot
          </label>
          <select
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            className="w-full p-3 bg-surface-container-low rounded-xl text-on-surface font-body-sm text-body-sm focus:outline-none"
          >
            <option>Kamuzu Central - Oncology Day Unit Ward 3B (08:30 Morning Slot)</option>
            <option>Kamuzu Central - Oncology Day Unit Ward 3B (11:30 Midday Slot)</option>
          </select>
        </div>
        <div>
          <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold block mb-1">
            Primary Justification
          </label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-3 bg-surface-container-low rounded-xl text-on-surface font-body-sm text-body-sm focus:outline-none"
          />
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 h-12 rounded-full bg-surface-container text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-high transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => onConfirm({ date, slot, reason })}
          className="flex-1 h-12 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold hover:opacity-90 transition-opacity"
        >
          Confirm New Slot
        </button>
      </div>
    </ModalShell>
  );
}
