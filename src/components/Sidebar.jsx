import {useNavigate} from "react-router-dom";

const navItems = [
  { key: "triage", label: "Triage & Task Queue", icon: "checklist", badge: 14 },
  { key: "registry", label: "Patient Registry", icon: "groups" },
  { key: "schedule", label: "Appointment Schedule", icon: "calendar_today" },
  { key: "approvals", label: "Staff Approvals & Credentialing", icon: "badge", badge: 5 },
  { key: "ussd", label: "Urgent Alerts", icon: "sms" },
  { key: "reports", label: "Reports & Analytics", icon: "monitoring" },
];



export default function Sidebar({ active, onNavigate }) {
   {/*const navigate = useNavigate();
    const { toast, showToast } = useToast();
  
    const [authTab, setAuthTab] = useState(
      initialTab || (location.pathname === "/offline" ? "online" : "online")
    );
   
  
    // Sync tab state with route path
    useEffect(() => {
      if (location.pathname === "/offline") {
        setAuthTab("offline");
      } else if (location.pathname === "/online") {
        setAuthTab("online");
      }
    }, [location.pathname]);

  const handleTabSwitch = (tab) => {
    setAuthTab(tab);
    if (tab === "online") {
      navigate("offline");
    } else {
      navigate("/online");
    }
  };
*/}
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
     
            
            {/* Auth Mode Switcher 
            <div className="flex items-center justify-between border-b border-surface-container-high pb-4 mb-6">
              <div className="flex gap-2 p-1 bg-surface-container-low rounded-full">
                <button
                  type="button"
                  onClick={() => handleTabSwitch("online")}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                    authTab === "online"
                      ? "bg-primary text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Online
                </button>
                <button
                  type="button"
                  onClick={() => handleTabSwitch("offline")}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                    authTab === "offline"
                      ? "bg-secondary text-on-secondary shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Offline
                </button>
              </div>
             </div>*/}
 
      </div>
    </aside>
  );
}
