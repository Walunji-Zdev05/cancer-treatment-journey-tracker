export default function ModalShell({ open, onClose, icon, iconColorClass = "text-primary", title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-lg max-w-lg w-full p-6 shadow-xl relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className={`material-symbols-outlined text-[24px] ${iconColorClass}`}>{icon}</span>
            <h3 className="font-headline-md text-headline-md text-on-surface">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
