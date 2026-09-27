export default function Toast({ visible, message, icon }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 flex items-center gap-3 p-4 rounded-full bg-inverse-surface text-inverse-on-surface shadow-xl max-w-md ${
        visible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
      }`}
    >
      <span className="material-symbols-outlined text-secondary-fixed text-[20px]">{icon}</span>
      <span className="font-label-sm text-label-sm">{message}</span>
    </div>
  );
}
