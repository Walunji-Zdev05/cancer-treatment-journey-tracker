# Tikondane Navigator Portal

React + Tailwind CSS conversion of the navigator triage dashboard and patient dossier page
(frontend only — backend/API integration to be added later). Routed with React Router.

## Structure

```
src/
  components/               Shared UI pieces used across pages
    Sidebar, Header, Toast              — persistent shell (both pages)
    KpiCards, PatientRow, PatientWorklist,
    QuickLogForm, SmsTemplates,
    TransportFund, SidePanel            — triage dashboard only
    dossier/                            — single patient dossier page
      AlertBanner, DossierTopBar, PatientProfileHeader,
      ChemoPathway, BloodCounts, MedicationRegimen,
      OmnichannelStream, StreamEvent,
      TransportFundCard, NavigatorNotes, CareTeam
      modals/ModalShell, TransportModal, SmsModal, RescheduleModal
  data/
    patients.js    Mock patient list + SMS templates for the dashboard
    dossier.js      Mock dossier data, keyed by patient id (e.g. "KCH-4092")
  hooks/useToast.js Toast notification state/logic (shared by both pages)
  pages/
    NavigatorDashboard.jsx   Route "/" — the triage & task queue dashboard
    PatientDossier.jsx        Route "/patients/:patientId" — single patient view
  App.jsx    Sets up React Router routes
  main.jsx   Entry point
tailwind.config.js   Carries over the original design tokens (colors, type scale, spacing, radii)
```

## Routing

- `/` → `NavigatorDashboard` (the triage queue you saw first)
- `/patients/:patientId` → `PatientDossier` (the detailed single-patient view)

Clicking "Open Dossier" (folder icon) on any patient row in the dashboard now navigates to
`/patients/<that patient's id>`. Only `KCH-4092` (Alineti Banda) has full mock dossier data in
`src/data/dossier.js` right now — visiting any other id falls back to showing hers, as a
placeholder until real data/API is wired in. Add more entries to the `dossiers` object,
keyed by patient id, to give other patients their own dossier.

## Setup

```bash
npm install
npm run dev       # start local dev server
npm run build      # production build
```

## Notes for backend integration later

- `src/data/patients.js` and `src/data/dossier.js` currently hold static mock data. Replace
  with fetch/query hooks (e.g. React Query or a simple `useEffect` + `fetch` keyed by
  `patientId` from `useParams()`) once the API exists.
- All interactive actions (call, SMS dispatch, CHW dispatch, fare approval, contact log,
  transport disbursement, reschedule) currently just show a toast or update local state —
  wire these up to real API calls in the handler functions inside
  `src/pages/NavigatorDashboard.jsx` and `src/pages/PatientDossier.jsx`.
- Material Symbols and Plus Jakarta Sans are loaded via Google Fonts `<link>` tags in
  `index.html`.
