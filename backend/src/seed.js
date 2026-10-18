// Fills the database with demo data matching the mobile app screens.
// Run:  npm run seed      (only runs on an empty database)
const bcrypt = require('bcryptjs');
const {
  User, Navigator, Patient, TreatmentPlan, Appointment, Medication, MedicationLog, SupportContact,
} = require('./models');
const { todayLocal, atMalawiTime } = require('./utils/time');

async function seed() {
  if ((await User.countDocuments()) > 0) {
    console.log('Database already has data. Skipping seed.');
    return false;
  }
  const passwordHash = bcrypt.hashSync('password123', 10);

  const navUser = await User.create({ role: 'navigator', phone: '+265999111111', passwordHash, fullName: 'Nurse Grace Phiri', language: 'en' });
  const nav = await Navigator.create({ user: navUser._id, title: 'Oncology Navigator', hospital: 'Kamuzu Central Hospital • Ward 3B' });

  const patUser = await User.create({ role: 'patient', phone: '+265999000001', passwordHash, fullName: 'Alineti B.', language: 'ny' });
  const pat = await Patient.create({
    user: patUser._id, navigator: nav._id, diagnosis: 'Breast cancer', hospital: 'Kamuzu Central Hospital',
    ward: 'Cancer Care Ward 3B', guardianName: 'Chikondi B.', guardianPhone: '+265999000002',
  });

  const plan = await TreatmentPlan.create({
    patient: pat._id, protocolName: 'Chemotherapy Protocol', planName: 'Breast Cancer Care Plan',
    detail: '6 Infusion Cycles • Kamuzu Central Hospital', totalCycles: 6, currentCycle: 3,
  });

  const appt = (days, kind, title, detail, location, status) =>
    ({ patient: pat._id, plan: plan._id, kind, title, detail, location, status, scheduledAt: atMalawiTime(days) });
  await Appointment.create([
    appt(-42, 'chemo', 'Cycle 1 Chemotherapy Infusion', 'Completed at Day Care Unit', 'Oncology Day Care Unit', 'attended'),
    appt(-21, 'chemo', 'Cycle 2 Chemotherapy & Blood Tests', 'Full blood counts checked', 'Oncology Day Care Unit', 'attended'),
    appt(3, 'chemo', 'Cycle 3 Chemotherapy & Navigator Review', 'Paclitaxel & Carboplatin infusion', 'KCH Oncology Day Clinic • Ward 4 Unit', 'scheduled'),
    appt(24, 'scan', 'Mid-Treatment Ultrasound Scan', 'Response assessment', 'Radiology, KCH', 'scheduled'),
    appt(38, 'chemo', 'Cycle 4 Chemotherapy Infusion', null, 'Oncology Day Clinic, KCH', 'scheduled'),
    appt(70, 'review', 'Post-Chemo Surgical Review', 'Consultation with surgical oncology team', 'KCH Surgical Clinic', 'scheduled'),
  ]);

  const [ondansetron] = await Medication.create([
    { patient: pat._id, name: 'Ondansetron 8mg', purpose: 'Anti-nausea', instructions: 'Pofuna kupewa kusanza', scheduledTime: '07:00' },
    { patient: pat._id, name: 'Paracetamol 500mg', purpose: 'Pain relief', instructions: 'Imwani ndi madzi ambiri (Take with water)', scheduledTime: '14:00' },
    { patient: pat._id, name: 'Dexamethasone 4mg', purpose: 'Steroid', instructions: 'Kumwa mutadya', scheduledTime: '20:00' },
  ]);
  await MedicationLog.create({ medication: ondansetron._id, patient: pat._id, logDate: todayLocal() });

  await SupportContact.create([
    { kind: 'hotline', name: 'Oncology Navigation Hotline', description: 'Free toll-free line for patients', phone: '+265999111111' },
    { kind: 'counsellor', name: 'Counselling Unit, KCH', description: 'Talk to a trained counsellor' },
    { kind: 'peer_group', name: 'Lilongwe Survivors Circle', description: 'Weekly peer support group' },
  ]);

  console.log('Seeded. Demo login: phone +265999000001 / password password123');
  return true;
}

module.exports = { seed };

if (require.main === module) {
  require('dotenv').config();
  const { connect, disconnect } = require('./db');
  connect().then(seed).catch((e) => { console.error(e.message); process.exitCode = 1; }).finally(disconnect);
}
