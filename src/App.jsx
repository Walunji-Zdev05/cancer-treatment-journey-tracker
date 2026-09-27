import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigatorDashboard from "./pages/NavigatorDashboard.jsx";
import PatientDossier from "./pages/PatientDossier.jsx";
import TelemetryDashboard from "./pages/TelemetryDashboard.jsx";
import AppointmentSchedule from "./pages/AppointmentSchedule.jsx";
import ReportsAnalytics from "./pages/ReportsAnalytics.jsx";
import StaffApprovals from "./pages/StaffApprovals.jsx";
import StaffAuth from "./pages/StaffAuth.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavigatorDashboard />} />
        <Route path="/telemetry" element={<TelemetryDashboard />} />
        <Route path="/schedule" element={<AppointmentSchedule />} />
        <Route path="/reports" element={<ReportsAnalytics />} />
        <Route path="/staff-approvals" element={<StaffApprovals />} />
        <Route path="/approvals" element={<StaffApprovals />} />
        <Route path="/login" element={<StaffAuth initialTab="signin" />} />
        <Route path="/register" element={<StaffAuth initialTab="signup" />} />
        <Route path="/patients/:patientId" element={<PatientDossier />} />
      </Routes>
    </BrowserRouter>
  );
}

