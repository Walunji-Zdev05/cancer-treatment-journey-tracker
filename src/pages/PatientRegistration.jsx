import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import Toast from "../components/Toast.jsx";
import { useToast } from "../hooks/useToast.js";

/* ---------- static options ---------- */
const DISTRICTS = [
  ["Salima", "Salima (104 km)", 104],
  ["Dedza", "Dedza (85 km)", 85],
  ["Dowa", "Dowa (55 km)", 55],
  ["Lilongwe_Rural", "Lilongwe Rural (Mitundu)", 30],
  ["Lilongwe_Urban", "Lilongwe Urban (Area 25, Kawale)", 12],
  ["Mchinji", "Mchinji (110 km)", 110],
  ["Kasungu", "Kasungu (130 km)", 130],
  ["Ntcheu", "Ntcheu (150 km)", 150],
];

const CANCER_SITES = [
  "Breast Carcinoma",
  "Cervical Carcinoma",
  "Esophageal Carcinoma",
  "Kaposi Sarcoma",
  "Prostate Adenocarcinoma",
  "Lymphoma",
  "Pediatric Wilms Tumor",
  "Colorectal Carcinoma",
];

const STAGES = ["Stage I", "Stage IIB", "Stage III", "Stage IV"];
const LANGUAGES = ["Chichewa", "Tumbuka", "Yao", "English"];
const RELATIONSHIPS = ["Spouse", "Daughter", "Son", "Sister", "Brother", "Village Head / Elder"];

const REMINDER_OFFSETS = [
  { days: 7, label: "1 week before" },
  { days: 2, label: "2 days before" },
  { days: 1, label: "1 day before" },
  { days: 0, label: "Morning of visit" },
];

const REMINDER_CHANNELS = [
  { key: "sms", label: "SMS", icon: "sms" },
  { key: "voice", label: "Voice call", icon: "call" },
  { key: "ussd", label: "USSD prompt", icon: "dialpad" },
];

const inputCls =
  "w-full h-12 px-4 bg-surface-container-low text-on-surface rounded-DEFAULT font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary transition-all";

/* ---------- helpers ---------- */
const makeMasterId = () => `KCH-ONC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

const ageFromDob = (dob) => {
  if (!dob) return "";
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (365.25 * 24 * 3600 * 1000));
};

// Turns the cycle date + chosen offsets into real send dates
const buildReminderSchedule = (cycleDate, offsets) => {
  if (!cycleDate) return [];
  return offsets
    .map((d) => {
      const when = new Date(cycleDate);
      when.setDate(when.getDate() - d);
      return { days: d, date: when };
    })
    .sort((a, b) => a.date - b.date);
};

const fmt = (d) => d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });

/* ---------- small building blocks ---------- */
function Section({ icon, iconWrap, title, caption, children, right }) {
  return (
    <section className="p-6 md:p-8 bg-surface-container-lowest rounded-DEFAULT shadow-sm flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-surface-container-low">
        <div className="flex items-center gap-3">
          <span className={`w-8 h-8 rounded-full flex items-center justify-center ${iconWrap}`}>
            <span className="material-symbols-outlined text-[20px]">{icon}</span>
          </span>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">{title}</h2>
            <p className="font-bilingual-caption text-bilingual-caption text-on-surface-variant">{caption}</p>
          </div>
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}

function Field({ label, local, required, className = "", children }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="font-label-md text-label-md text-on-surface flex items-center justify-between">
        <span>
          {label} {required && <span className="text-error">*</span>}
        </span>
        {local && <span className="font-label-sm text-label-sm text-on-surface-variant italic">{local}</span>}
      </label>
      {children}
    </div>
  );
}

function Chips({ options, value, onChange, multi = false }) {
  const isOn = (o) => (multi ? value.includes(o.key ?? o) : value === (o.key ?? o));
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const k = o.key ?? o;
        return (
          <button
            key={k}
            type="button"
            onClick={() =>
              onChange(multi ? (value.includes(k) ? value.filter((v) => v !== k) : [...value, k]) : k)
            }
            className={`px-4 h-11 rounded-full font-label-md text-label-md flex items-center gap-1.5 transition-colors ${
              isOn(o)
                ? "bg-primary-container text-on-primary-container font-semibold"
                : "bg-surface-container-low text-on-surface hover:bg-surface-container"
            }`}
          >
            {o.icon && <span className="material-symbols-outlined text-[18px]">{o.icon}</span>}
            {o.label ?? o}
          </button>
        );
      })}
    </div>
  );
}

/* ---------- page ---------- */
const initialForm = {
  name: "",
  nationalId: "",
  passport: "",
  dob: "",
  sex: "Female",
  language: "Chichewa",
  phone: "",
  feature2G: true,
  district: "Salima",
  village: "",
  healthCentre: "",
  guardianName: "",
  guardianRelation: "Spouse",
  guardianPhone: "",
  cancerSite: CANCER_SITES[0],
  stage: "Stage IIB",
  specimenId: "",
  cycleDate: "",
  transportGrant: true,
  wallet: "",
  lodging: "transit_needed",
  // reminders
  remindersOn: true,
  reminderOffsets: [7, 1, 0],
  reminderChannels: ["sms"],
  remindGuardian: true,
  remindHsa: true,
};

export default function PatientRegistration() {
  const [activeNav, setActiveNav] = useState("registry");
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState(initialForm);
  const [masterId] = useState(makeMasterId);
  const [done, setDone] = useState(false);
  const { toast, showToast } = useToast();
  const navigate = useNavigate();

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target ? e.target.value : e }));
  const setVal = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const district = DISTRICTS.find((d) => d[0] === form.district);
  const schedule = useMemo(
    () => buildReminderSchedule(form.cycleDate, form.reminderOffsets),
    [form.cycleDate, form.reminderOffsets]
  );

  const firstName = form.name.trim().split(" ")[0] || "wodwala";
  const reminderText = `Moni ${firstName}, mwakumbutsidwa kuti tsiku la mankhwala anu ku KCH Ward 3B ndi ${
    form.cycleDate ? fmt(new Date(form.cycleDate)) : "[tsiku]"
  }. Tikuyembekezerani. Kusintha tsiku imbani *384*265#.`;

  const handleNavigate = (key) => {
    setActiveNav(key);
    if (key === "triage") navigate("/");
    else if (key === "schedule") navigate("/schedule");
    else if (key === "reports") navigate("/reports");
    else if (key === "community") navigate("/community");
    else if (key === "approvals") navigate("/approvals");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.remindersOn && !form.cycleDate) {
      showToast("Pick the Cycle 1 date so reminders can be scheduled", "event");
      return;
    }

  
    const payload = {
      masterId,
      ...form,
      reminders: form.remindersOn
        ? {
            channels: form.reminderChannels,
            language: form.language,
            notify: { patient: true, guardian: form.remindGuardian, hsa: form.remindHsa },
            sendAt: schedule.map((s) => s.date.toISOString()),
            template: reminderText,
          }
        : null,
    };
    console.log("Register patient payload:", payload);
    // TODO: await fetch("/api/patients", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(payload) });

    setDone(true);
  };

  const reset = () => setForm(initialForm);

  return (
    <div className="bg-background font-body-md text-on-surface min-h-screen">
      <Sidebar active={activeNav} onNavigate={handleNavigate} />
      <div className="pl-72 flex flex-col min-h-screen">
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <main className="w-full pt-20 px-8 flex-1 bg-background">
          <div className="flex flex-col w-full">
            {/* Title bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 pt-1 border-b border-surface-container-high">
              <div className="flex flex-col gap-1">
               
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  New Patient Registration
                </h1>
                <p className="font-bilingual-caption text-bilingual-caption text-on-surface-variant">
                  Lembetsani Wodwala Watsopano • Kamuzu Central Hospital Ward 3B
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => showToast("Draft saved", "bookmark")}
                  className="h-11 px-4 rounded-full bg-surface-container hover:bg-surface-container-high font-label-md text-label-md flex items-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">bookmark_border</span>
                  Save draft
                </button>
                <button
                  type="submit"
                  form="intakeForm"
                  className="h-11 px-6 rounded-full bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md shadow-sm flex items-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                  Register patient
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 py-8 items-start">
              {/* ---------- FORM ---------- */}
              <form id="intakeForm" onSubmit={handleSubmit} className="xl:col-span-8 flex flex-col gap-8">
                {/* 1. Identity */}
                <Section
                  icon="badge"
                  iconWrap="bg-primary-fixed text-primary"
                  title="1. Patient identity & Yellow Passport"
                  caption="Dzina la wodwala ndi chiphaso cha chipatala"
                  right={
                    <span className="self-start bg-surface-container-low px-3 py-1.5 rounded-full font-label-sm text-label-sm text-on-surface-variant">
                      Master ID: <b className="text-primary">{masterId}</b>
                    </span>
                  }
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="Full name" local="Dzina Lonse" required className="md:col-span-2">
                      <input required className={inputCls} value={form.name} onChange={set("name")} placeholder="e.g. Alinane Beatrice Banda" />
                    </Field>
                    <Field label="National ID (NRIS)" local="Nambala ya Khadi">
                      <input className={inputCls} value={form.nationalId} onChange={set("nationalId")} placeholder="e.g. 7N8Y-K49X-02" />
                    </Field>
                    <Field label="Health Passport (Yellow Book #)" local="Bukhu la Zaumoyo" required>
                      <div className="flex gap-2">
                        <input required className={inputCls} value={form.passport} onChange={set("passport")} placeholder="e.g. YP-91042-KCH" />
                        <button
                          type="button"
                          onClick={() => {
                            const code = `YP-${Math.floor(10000 + Math.random() * 90000)}-KCH`;
                            setVal("passport", code);
                            showToast(`Scanned ${code}`, "document_scanner");
                          }}
                          className="h-12 px-4 rounded-DEFAULT bg-primary-fixed text-on-primary-fixed hover:bg-primary-fixed-dim flex items-center gap-1.5 font-label-sm text-label-sm shrink-0"
                        >
                          <span className="material-symbols-outlined text-[20px]">document_scanner</span>
                          Scan
                        </button>
                      </div>
                    </Field>
                    <Field label="Date of birth" local="Tsiku Lobadwa" required>
                      <div className="grid grid-cols-2 gap-2">
                        <input required type="date" className={inputCls} value={form.dob} onChange={set("dob")} />
                        <div className="flex items-center px-4 h-12 bg-surface-container-low rounded-DEFAULT text-on-surface-variant font-label-md text-label-md">
                          {form.dob ? `${ageFromDob(form.dob)} years old` : "Age"}
                        </div>
                      </div>
                    </Field>
                    <Field label="Sex" local="Mwamuna kapena Mkazi" required>
                      <Chips options={["Female", "Male"]} value={form.sex} onChange={(v) => setVal("sex", v)} />
                    </Field>
                    <Field label="Preferred language" local="Chilankhulo">
                      <select className={inputCls} value={form.language} onChange={set("language")}>
                        {LANGUAGES.map((l) => (
                          <option key={l}>{l}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </Section>

                {/* 2. Contact */}
                <Section
                  icon="explore"
                  iconWrap="bg-secondary-fixed text-secondary"
                  title="2. Location & contact"
                  caption="Komwe amakhala ndi nambala zoyankhulira"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="Patient phone" local="Nambala ya Foni" required>
                      <input required type="tel" className={inputCls} value={form.phone} onChange={set("phone")} placeholder="+265 99 123 4567" />
                      <label className="flex items-center gap-2.5 pt-1.5 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 accent-primary" checked={form.feature2G} onChange={(e) => setVal("feature2G", e.target.checked)} />
                        <span className="font-body-sm text-body-sm text-on-surface-variant">Basic feature phone only (no WhatsApp)</span>
                      </label>
                    </Field>
                    <Field label="District" local="Boma" required>
                      <select className={inputCls} value={form.district} onChange={set("district")}>
                        {DISTRICTS.map(([k, label]) => (
                          <option key={k} value={k}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="T/A & Village" local="Mfumu & Mudzi" required>
                      <input required className={inputCls} value={form.village} onChange={set("village")} placeholder="e.g. T/A Maganga, Chitala Village" />
                    </Field>
                    <Field label="Nearest health centre" local="Chipatala Chapafupi" required>
                      <input required className={inputCls} value={form.healthCentre} onChange={set("healthCentre")} placeholder="e.g. Chipoka Health Centre" />
                    </Field>

                    <div className="md:col-span-2 p-4 rounded-DEFAULT bg-surface-container-low flex flex-col gap-3">
                      <span className="font-label-md text-label-md font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px] text-primary">diversity_1</span>
                        Caregiver / guardian (Msamaliri)
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input className={inputCls} value={form.guardianName} onChange={set("guardianName")} placeholder="Guardian name" />
                        <select className={inputCls} value={form.guardianRelation} onChange={set("guardianRelation")}>
                          {RELATIONSHIPS.map((r) => (
                            <option key={r}>{r}</option>
                          ))}
                        </select>
                        <input type="tel" className={inputCls} value={form.guardianPhone} onChange={set("guardianPhone")} placeholder="+265 88 234 5678" />
                      </div>
                    </div>
                  </div>
                </Section>

                {/* 3. Diagnosis */}
                <Section
                  icon="monitor_heart"
                  iconWrap="bg-primary-fixed text-primary"
                  title="3. Diagnosis & first treatment"
                  caption="Kufufuza za khansa ndi ndondomeko yamankhwala"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="Primary cancer site" local="Mtundu wa Khansa" required>
                      <select className={inputCls} value={form.cancerSite} onChange={set("cancerSite")}>
                        {CANCER_SITES.map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Pathology specimen ID" local="Nambala ya Spezimen">
                      <input className={inputCls} value={form.specimenId} onChange={set("specimenId")} placeholder="e.g. UNC-PATH-24-8841" />
                    </Field>
                    <Field label="Clinical stage (TNM 8th Ed)" local="Gawo la Khansa" required>
                      <Chips options={STAGES} value={form.stage} onChange={(v) => setVal("stage", v)} />
                    </Field>
                    <Field label="Cycle 1 chemotherapy session" local="Tsiku Loyamba Mankhwala" required>
                      <input required type="date" className={inputCls} value={form.cycleDate} onChange={set("cycleDate")} />
                    </Field>
                  </div>
                </Section>


                {/* 5. Reminders */}
                <Section
                  icon="notifications_active"
                  iconWrap="bg-secondary-container text-on-secondary-container"
                  title="5. Treatment reminders"
                  caption="Kukumbutsa wodwala tsiku la mankhwala"
                  right={
                    <label className="flex items-center gap-2 cursor-pointer self-start">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">Send automatically</span>
                      <input type="checkbox" className="w-5 h-5 accent-primary" checked={form.remindersOn} onChange={(e) => setVal("remindersOn", e.target.checked)} />
                    </label>
                  }
                >
                  {form.remindersOn ? (
                    <div className="flex flex-col gap-5">
                      <Field label="When to remind">
                        <Chips
                          multi
                          options={REMINDER_OFFSETS.map((o) => ({ key: o.days, label: o.label }))}
                          value={form.reminderOffsets}
                          onChange={(v) => setVal("reminderOffsets", v)}
                        />
                      </Field>
                      <Field label="How to reach the patient">
                        <Chips multi options={REMINDER_CHANNELS} value={form.reminderChannels} onChange={(v) => setVal("reminderChannels", v)} />
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Use voice call for patients who cannot read. Messages go out in {form.language}.
                        </p>
                      </Field>
                      <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2.5 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 accent-primary" checked={form.remindGuardian} onChange={(e) => setVal("remindGuardian", e.target.checked)} />
                          <span className="font-body-sm text-body-sm">Also remind the caregiver</span>
                        </label>
                        <label className="flex items-center gap-2.5 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 accent-primary" checked={form.remindHsa} onChange={(e) => setVal("remindHsa", e.target.checked)} />
                          <span className="font-body-sm text-body-sm">Also notify the community HSA for follow-up</span>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Reminders are off. This patient will only get messages when staff send them.
                    </p>
                  )}
                </Section>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-surface-container-lowest rounded-DEFAULT shadow-sm">
                  <button type="button" onClick={reset} className="h-12 px-6 rounded-full text-on-surface-variant hover:bg-surface-container font-label-md text-label-md flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                    Reset form
                  </button>
                  <button type="submit" className="h-12 px-8 rounded-full bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md shadow-md flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                    Register patient &amp; schedule reminders
                  </button>
                </div>
              </form>

              {/* ---------- SIDE PREVIEW ---------- */}
              <aside className="xl:col-span-4 flex flex-col gap-6 sticky top-24">
                <div className="p-6 bg-surface-container-lowest rounded-DEFAULT shadow-sm flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-headline-sm text-headline-sm font-bold">
                      {(form.name.trim()[0] || "?").toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-label-md text-label-md font-bold truncate">{form.name || "New patient"}</p>
                      <p className="font-label-sm text-label-sm text-primary font-bold">{masterId}</p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">Bukhu: {form.passport || "—"}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-surface-container-high">
                    <div>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">Diagnosis</p>
                      <p className="font-label-sm text-label-sm font-semibold">{form.cancerSite}</p>
                    </div>
                    <div>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">Residence</p>
                      <p className="font-label-sm text-label-sm font-semibold">{district[1]}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-surface-container-lowest rounded-DEFAULT shadow-sm flex flex-col gap-4">
                  <h3 className="font-headline-sm text-headline-sm font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[20px]">schedule_send</span>
                    Reminder schedule
                  </h3>
                  {!form.remindersOn ? (
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Reminders are off.</p>
                  ) : schedule.length === 0 ? (
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Choose the Cycle 1 date to see when messages will be sent.
                    </p>
                  ) : (
                    <ul className="flex flex-col gap-2">
                      {schedule.map((s) => (
                        <li key={s.days} className="flex items-center justify-between p-3 bg-surface-container-low rounded-DEFAULT">
                          <span className="font-label-md text-label-md">{fmt(s.date)}</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            {s.days === 0 ? "Day of visit" : `${s.days} day${s.days > 1 ? "s" : ""} before`}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="p-4 bg-surface-container-low rounded-DEFAULT font-body-sm text-body-sm leading-relaxed">
                    {reminderText}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>

      {/* Success modal */}
      {done && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest rounded-DEFAULT max-w-lg w-full p-8 shadow-2xl flex flex-col items-center text-center gap-5">
            <div className="w-16 h-16 rounded-full bg-secondary-container text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <div>
              <h2 className="font-headline-lg text-headline-lg font-bold">Patient registered</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                {form.remindersOn
                  ? `${schedule.length} reminder${schedule.length === 1 ? "" : "s"} scheduled for ${form.name}.`
                  : "Reminders are off for this patient."}
              </p>
            </div>
            <div className="w-full p-4 rounded-DEFAULT bg-surface-container-low text-left flex flex-col gap-2">
              <Row k="Master ID" v={masterId} />
              <Row k="Yellow Passport" v={form.passport} />
              <Row k="First chemo" v={form.cycleDate ? fmt(new Date(form.cycleDate)) : "Not set"} />
            </div>
            <div className="flex gap-3 w-full">
              <button onClick={() => navigate("/schedule")} className="flex-1 h-12 rounded-full bg-surface-container hover:bg-surface-container-high font-label-md text-label-md">
                View schedule
              </button>
              <button
                onClick={() => {
                  setDone(false);
                  reset();
                }}
                className="flex-1 h-12 rounded-full bg-primary text-on-primary font-label-md text-label-md"
              >
                Register another
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast visible={toast.visible} message={toast.message} icon={toast.icon} />
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div className="flex justify-between items-center">
      <span className="font-label-sm text-label-sm text-on-surface-variant">{k}</span>
      <span className="font-label-md text-label-md font-bold">{v || "—"}</span>
    </div>
  );
}
