const navItems = [
  { key: "triage", label: "Triage & Task Queue", icon: "checklist", badge: 14 },
  { key: "registry", label: "Patient Registry", icon: "groups" },
  { key: "schedule", label: "Appointment Schedule", icon: "calendar_today" },
  { key: "approvals", label: "Staff Approvals & Credentialing", icon: "badge", badge: 5 },
  { key: "ussd", label: "USSD & SMS Logs", icon: "sms" },
  { key: "transport", label: "Community Transport Fund", icon: "directions_bus" },
  { key: "reports", label: "Reports & Analytics", icon: "monitoring" },
];

export default function Sidebar({ active, onNavigate }) {
  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="h-20 flex items-center px-6 gap-3 bg-surface-container-low">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline-sm text-headline-sm">
            T
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-primary leading-tight">Tikondane</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Cancer Care Portal</span>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="p-3 bg-surface-container-low rounded">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
              <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">
                Active Shift
              </span>
            </div>
            <p className="font-label-md text-label-md text-on-surface font-semibold truncate">
              Sister Grace Phiri, RN
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
              Kamuzu Central Unit • On Duty
            </p>
          </div>
        </div>

        <nav className="flex flex-col gap-1 px-4">
          {navItems.map((item) => {
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onNavigate?.(item.key)}
                className={`flex items-center justify-between px-4 py-3 rounded-full transition-colors text-left ${
                  isActive
                    ? "bg-primary-container text-on-primary-container font-semibold shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span className="font-label-md text-label-md">{item.label}</span>
                </div>
                {item.badge ? (
                  <span className="px-2 py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 mx-4 mb-6 rounded bg-surface-container">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-primary text-[20px]">support_agent</span>
          <span className="font-label-sm text-label-sm text-primary font-bold">Urgent Triage Line</span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">National Oncology Support</p>
        <p className="font-label-md text-label-md text-on-surface mt-1">+265 1 756 000</p>
      </div>
    </aside>
  );
}
