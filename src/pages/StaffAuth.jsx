import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Toast from "../components/Toast.jsx";
import { useToast } from "../hooks/useToast.js";

export default function StaffAuth({ initialTab }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast, showToast } = useToast();

  const [authTab, setAuthTab] = useState(
    initialTab || (location.pathname === "/register" ? "signup" : "signin")
  );
  const [showPassword, setShowPassword] = useState(false);

  // Sync tab state with route path
  useEffect(() => {
    if (location.pathname === "/register") {
      setAuthTab("signup");
    } else if (location.pathname === "/login") {
      setAuthTab("signin");
    }
  }, [location.pathname]);

  const handleTabSwitch = (tab) => {
    setAuthTab(tab);
    if (tab === "signin") {
      navigate("/login");
    } else {
      navigate("/register");
    }
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    showToast(
      "Nurse Navigator Sr. Grace Phiri verified. Launching Ward 3B Triage Board...",
      "check_circle"
    );
    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    showToast(
      "Staff accreditation submitted to Hospital Matron. Verification SMS sent to work phone.",
      "how_to_reg"
    );
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="bg-surface font-sans text-on-surface min-h-screen flex flex-col justify-between antialiased">
      <Toast toast={toast} />

      {/* Top Navigation Header */}
      <header className="w-full bg-surface-container-lowest/90 backdrop-blur border-b border-surface-container-high px-8 py-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <Link to="/" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold shadow-sm hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-[24px]">local_hospital</span>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <Link to="/" className="font-bold text-lg text-primary tracking-tight hover:underline">
                Tikondane
              </Link>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-semibold">
                Clinician & Navigator Portal
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">Ministry of Health Malawi • Oncology Navigation Network</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low text-xs text-on-surface font-medium">
            <span className="material-symbols-outlined text-primary text-[16px]">domain</span>
            <span>Kamuzu Central (KCH) & QECH Blantyre</span>
          </div>
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container text-xs font-semibold text-on-surface">
            <span className="material-symbols-outlined text-primary text-[16px]">translate</span>
            <span>EN / Chichewa</span>
          </div>
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary text-on-primary hover:bg-primary-container text-xs font-semibold shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">dashboard</span>
            <span>Return to Dashboard</span>
          </Link>
          <a
            href="tel:+2651756000"
            className="hidden md:flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"
          >
            <span className="material-symbols-outlined text-[16px]">support_agent</span>
            <span>Ward 3B IT Helpdesk (+265 1 756 000)</span>
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
        {/* Ambient Background Blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-5xl bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container-high/60 overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-primary to-[#004395] text-on-primary p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-semibold tracking-wide mb-6">
                <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
                <span>MoH OpenMRS & DHIS2 Sync</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight leading-tight mb-3">
                Oncology Navigation & Clinical Registry
              </h1>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                Empowering ward navigators, oncologists, and district health officers across Malawi with real-time patient tracking, automated transport aid, and USSD telemetry.
              </p>

              {/* Metric Pills */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur border border-white/10">
                  <span className="material-symbols-outlined text-secondary-container text-[24px]">verified_user</span>
                  <div className="text-xs">
                    <span className="font-bold block text-white">Encrypted Health Data</span>
                    <span className="text-blue-100">National Cancer Control Programme compliance</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur border border-white/10">
                  <span className="material-symbols-outlined text-yellow-300 text-[24px]">payments</span>
                  <div className="text-xs">
                    <span className="font-bold block text-white">Chikondi Minibus Aid</span>
                    <span className="text-blue-100">Direct mobile money travel vouchers</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur border border-white/10">
                  <span className="material-symbols-outlined text-teal-300 text-[24px]">cell_tower</span>
                  <div className="text-xs">
                    <span className="font-bold block text-white">Toll-Free Telemetry</span>
                    <span className="text-blue-100">USSD *384*265# live gateway integration</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-8 border-t border-white/15 mt-6 text-xs text-blue-100 flex items-center justify-between">
              <span>Kamuzu Central Hospital (Ward 3B)</span>
              <span>Queen Elizabeth Hospital</span>
            </div>
          </div>

          {/* Right Form Column: Tabbed Sign In / Register */}
          <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center">
            
            {/* Auth Mode Switcher */}
            <div className="flex items-center justify-between border-b border-surface-container-high pb-4 mb-6">
              <div className="flex gap-2 p-1 bg-surface-container-low rounded-full">
                <button
                  type="button"
                  onClick={() => handleTabSwitch("signin")}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                    authTab === "signin"
                      ? "bg-primary text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Clinician Sign In
                </button>
                <button
                  type="button"
                  onClick={() => handleTabSwitch("signup")}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                    authTab === "signup"
                      ? "bg-secondary text-on-secondary shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Staff Registration
                </button>
              </div>
              <span className="text-xs text-on-surface-variant font-medium hidden sm:inline">Role-Based Access</span>
            </div>

            {/* 1. SIGN IN FORM */}
            {authTab === "signin" ? (
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-bold text-on-surface tracking-tight">Welcome Back, Clinician</h2>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Sign in with your MoH credentials or hospital PIN to open your active triage duty board.
                  </p>
                </div>

                <form onSubmit={handleSignInSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                      Hospital Staff Email or ID Number
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                        badge
                      </span>
                      <input
                        required
                        type="text"
                        defaultValue="grace.phiri@kch.health.gov.mw"
                        placeholder="e.g. grace.phiri@kch.health.gov.mw or KCH-NURSE-402"
                        className="w-full h-11 pl-10 pr-4 bg-surface-container-low rounded-xl border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary text-xs text-on-surface placeholder:text-outline font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                        Hospital Access Password / PIN
                      </label>
                      <a href="#" onClick={(e) => { e.preventDefault(); showToast("Contact IT Helpdesk at +265 1 756 000 for PIN reset.", "help"); }} className="text-xs text-primary font-semibold hover:underline">
                        Forgot credentials?
                      </a>
                    </div>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                        lock
                      </span>
                      <input
                        required
                        type={showPassword ? "text" : "password"}
                        defaultValue="Tikondane2025#"
                        placeholder="••••••••••••"
                        className="w-full h-11 pl-10 pr-10 bg-surface-container-low rounded-xl border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary text-xs text-on-surface font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {showPassword ? "visibility_off" : "visibility"}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-on-surface mb-1">Assigned Facility</label>
                      <select className="w-full h-10 px-3 bg-surface-container-low rounded-xl border border-surface-container-high text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-medium">
                        <option value="kch">Kamuzu Central Hospital (Lilongwe)</option>
                        <option value="qech">Queen Elizabeth Central (Blantyre)</option>
                        <option value="mzuzu">Mzuzu Central Hospital</option>
                        <option value="salima">Salima District Hospital</option>
                        <option value="dedza">Dedza District Health Office</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface mb-1">Duty Shift / Station</label>
                      <select className="w-full h-10 px-3 bg-surface-container-low rounded-xl border border-surface-container-high text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-medium">
                        <option value="ward3b">Ward 3B Day Chemotherapy Infusion</option>
                        <option value="triage">Oncology Nurse Triage & Task Board</option>
                        <option value="transport">Community Transport & Voucher Desk</option>
                        <option value="pathology">Pathology & Biopsy Registry</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary focus:ring-primary" />
                      <span className="text-xs text-on-surface-variant font-medium">Keep workstation authenticated for this shift (8h)</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 rounded-full bg-primary hover:bg-primary-container text-on-primary font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    <span className="material-symbols-outlined text-[20px]">login</span>
                    <span>Sign In to Clinical Workstation</span>
                  </button>
                </form>

                {/* Smartcard note */}
                <div className="p-3 rounded-xl bg-surface-container-low flex items-center gap-3 border border-surface-container-high">
                  <span className="material-symbols-outlined text-secondary text-[20px]">security</span>
                  <div className="text-xs text-on-surface-variant">
                    <span className="font-semibold text-on-surface">Biometric or Smartcard Access?</span>{" "}
                    Swipe your Ministry of Health identification card at the Ward 3B terminal reader for instant sign in.
                  </div>
                </div>

                <div className="pt-2 text-center border-t border-surface-container">
                  <span className="text-xs text-on-surface-variant font-medium">Need a new staff account? </span>
                  <button
                    type="button"
                    onClick={() => handleTabSwitch("signup")}
                    className="text-xs text-secondary font-bold hover:underline"
                  >
                    Go to Staff Registration
                  </button>
                </div>
              </div>
            ) : (
              /* 2. REGISTRATION / SIGN UP FORM */
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-bold text-on-surface tracking-tight">Register Staff Member</h2>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Request accredited access to the Tikondane Cancer Navigation Network. Verified by MoH Hospital Administration.
                  </p>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-on-surface mb-1">Full Legal Name</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">person</span>
                        <input required type="text" placeholder="e.g. Sister Grace Phiri" className="w-full h-11 pl-10 pr-3 bg-surface-container-low rounded-xl border border-surface-container-high text-xs text-on-surface font-medium focus:ring-2 focus:ring-primary focus:outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface mb-1">Professional Cadre / Title</label>
                      <select className="w-full h-11 px-3 bg-surface-container-low rounded-xl border border-surface-container-high text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-medium">
                        <option value="nurse">Nurse Navigator (Registered Nurse)</option>
                        <option value="oncologist">Clinical Oncologist / Medical Doctor</option>
                        <option value="hsa">Community Health Worker / Senior HSA</option>
                        <option value="pharmacist">Oncology Clinical Pharmacist</option>
                        <option value="social_worker">Hospital Social Worker / Transport Officer</option>
                        <option value="admin">District Health Records Officer (DHIS2)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-on-surface mb-1">Official MoH / Hospital Email</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">mail</span>
                        <input required type="email" placeholder="name@kch.health.gov.mw" className="w-full h-11 pl-10 pr-3 bg-surface-container-low rounded-xl border border-surface-container-high text-xs text-on-surface font-medium focus:ring-2 focus:ring-primary focus:outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface mb-1">Official Mobile / TNM/Airtel Work Phone</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">call</span>
                        <input required type="tel" placeholder="+265 999 000 000" className="w-full h-11 pl-10 pr-3 bg-surface-container-low rounded-xl border border-surface-container-high text-xs text-on-surface font-medium focus:ring-2 focus:ring-primary focus:outline-none" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-on-surface mb-1">Malawi Medical Council / NMCM Pin</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">verified</span>
                        <input required type="text" placeholder="e.g. RN-KCH-819" className="w-full h-11 pl-10 pr-3 bg-surface-container-low rounded-xl border border-surface-container-high text-xs text-on-surface font-medium focus:ring-2 focus:ring-primary focus:outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface mb-1">Primary Base Hospital</label>
                      <select className="w-full h-11 px-3 bg-surface-container-low rounded-xl border border-surface-container-high text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-medium">
                        <option value="kch">Kamuzu Central Hospital (Lilongwe)</option>
                        <option value="qech">Queen Elizabeth Central (Blantyre)</option>
                        <option value="salima">Salima District Health Office</option>
                        <option value="dedza">Dedza District Hospital</option>
                        <option value="dowa">Dowa District Hospital</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-on-surface mb-1">Create Workstation Password</label>
                      <input required type="password" placeholder="At least 8 characters" className="w-full h-11 px-3 bg-surface-container-low rounded-xl border border-surface-container-high text-xs text-on-surface font-medium focus:ring-2 focus:ring-primary focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface mb-1">Supervisor Approval Attestation</label>
                      <input required type="text" placeholder="Lead Oncologist / Matron Name" className="w-full h-11 px-3 bg-surface-container-low rounded-xl border border-surface-container-high text-xs text-on-surface font-medium focus:ring-2 focus:ring-primary focus:outline-none" />
                    </div>
                  </div>

                  <div className="pt-1">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input type="checkbox" required className="w-4 h-4 rounded text-primary focus:ring-primary mt-0.5" />
                      <span className="text-xs text-on-surface-variant font-medium">I pledge adherence to the Malawi Patient Privacy Charter & National Cancer Registry protocols.</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 rounded-full bg-secondary hover:bg-[#005a3c] text-on-secondary font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                    <span>Submit Staff Verification Request</span>
                  </button>

                  <div className="pt-2 text-center border-t border-surface-container">
                    <span className="text-xs text-on-surface-variant font-medium">Already have an endorsed account? </span>
                    <button
                      type="button"
                      onClick={() => handleTabSwitch("signin")}
                      className="text-xs text-primary font-bold hover:underline"
                    >
                      Sign In to Clinician Workstation
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-lowest border-t border-surface-container-high py-4 px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-on-surface-variant gap-2">
        <div className="flex items-center gap-4">
          <span>© 2025 Ministry of Health Malawi (Unduna wa Zaumoyo)</span>
          <span>•</span>
          <span>National Cancer Control Programme</span>
          <span>•</span>
          <span className="text-primary font-semibold">DHIS2 & OpenMRS Connected</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-secondary" /> Server Status: Lilongwe Ward 3B Gateway 99.98%
          </span>
          <a href="#" className="hover:text-primary underline">IT Security Protocol</a>
        </div>
      </footer>
    </div>
  );
}
