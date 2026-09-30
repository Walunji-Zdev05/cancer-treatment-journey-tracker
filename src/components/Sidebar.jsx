import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


const navItems = [
  { key: "triage", label: "Triage & Task Queue", icon: "checklist", badge: 2, path: "/" },
  { key: "registry", label: "Patient Registry", icon: "groups", path: null },
  { key: "schedule", label: "Appointment Schedule", icon: "calendar_today", path: "/schedule" },
  { key: "approvals", label: "Staff Approvals & Credentialing", icon: "badge", badge: 5, path: "/approvals" },
  { key: "ussd", label: "Urgent Alerts", icon: "sms", path: null },
  {
    key: "community",
    label: "Survivor Stories",
    icon: "forum",
    badge: "1 new",
    badgeClass: "bg-secondary-container text-on-secondary-container",
    path: "/community",
  },
  { key: "reports", label: "Reports & Analytics", icon: "monitoring", path: "/reports" },
];

export default function Sidebar({ active, onNavigate, onConnectivityChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [connectivity, setConnectivity] = useState("online");

 
  const activeKey = active ?? navItems.find((item) => item.path === location.pathname)?.key;

  const handleClick = (item) => {
    onNavigate?.(item.key);
    if (item.path) navigate(item.path);
  };

  const handleConnectivitySwitch = (mode) => {
    setConnectivity(mode);
    onConnectivityChange?.(mode);
  };

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

        <nav className="flex flex-col gap-1 px-4">
          {navItems.map((item) => {
            const isActive = activeKey === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleClick(item)}
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
                  <span
                    className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm ${
                      item.badgeClass ?? "bg-error text-on-error"
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 mx-4 mb-6 rounded bg-surface-container">
        <div className="flex items-center justify-between mb-1">
          <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold uppercase tracking-wider">
            Connection Mode
          </span>
          <span
            className={`w-2 h-2 rounded-full ${connectivity === "online" ? "bg-secondary animate-pulse" : "bg-tertiary"}`}
          />
        </div>
        <div className="flex gap-1 p-1 bg-surface-container-low rounded-full">
          <button
            type="button"
            onClick={() => handleConnectivitySwitch("online")}
            className={`flex-1 px-3 py-1.5 rounded-full font-label-sm text-label-sm font-bold transition-all ${
              connectivity === "online"
                ? "bg-primary text-on-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Online
          </button>
          <button
            type="button"
            onClick={() => handleConnectivitySwitch("offline")}
            className={`flex-1 px-3 py-1.5 rounded-full font-label-sm text-label-sm font-bold transition-all ${
              connectivity === "offline"
                ? "bg-secondary text-on-secondary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Offline
          </button>
        </div>
      </div>
    </aside>
  );
}

