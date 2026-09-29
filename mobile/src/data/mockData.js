

export const patient = {
  name: 'Alineti',
  language: 'EN', // or 'NY' for Chichewa
  facility: 'Kamuzu Central Hospital',
  ward: 'Cancer Care Ward 3B',
  navigator: {
    name: 'Nurse Grace Phiri',
    role: 'Oncology Navigator',
    phone: '+265 800 265 000', // placeholder toll-free style number
  },
};

export const nextVisit = {
  date: 'Thursday, 24 October 2024',
  time: '08:30 AM',
  daysAway: 3,
  location: 'Cancer Care Ward 3B, Kamuzu Central Hospital, Lilongwe',
  cycleLabel: 'Chemotherapy Cycle 3 of 6',
  regimen: 'Paclitaxel & Carboplatin infusion',
  percentComplete: 50,
};

export const medicines = [
  { id: '1', name: 'Ondansetron 8mg', note: 'Anti-nausea', due: '7:00 AM', taken: true },
  { id: '2', name: 'Paracetamol 500mg', note: 'Pain relief — take with water', due: '2:00 PM', taken: false },
  { id: '3', name: 'Dexamethasone 4mg', note: 'Steroid — take with food', due: '8:00 PM', taken: false },
];

export const careSteps = [
  { id: 'c1', title: 'Cycle 1 Chemotherapy Infusion', date: '12 Sept 2024', status: 'completed', note: 'Tolerated well with mild fatigue' },
  { id: 'c2', title: 'Cycle 2 Chemotherapy & Blood Tests', date: '03 Oct 2024', status: 'completed', note: 'White cell recovery stable' },
  { id: 'c3', title: 'Cycle 3 Chemotherapy & Navigator Review', date: '24 Oct 2024', status: 'next', note: 'Morning clinic — Ward 4 Unit' },
  { id: 'c4', title: 'Mid-Treatment Ultrasound Scan', date: '14 Nov 2024', status: 'upcoming', note: 'Response assessment' },
  { id: 'c5', title: 'Cycle 4 Chemotherapy Infusion', date: '28 Nov 2024', status: 'upcoming', note: 'Oncology Day Clinic' },
];

export const symptomOptions = [
  { id: 'nausea', label: 'Nausea & Vomiting', icon: '🤢' },
  { id: 'pain', label: 'Pain', icon: '😣' },
  { id: 'fatigue', label: 'Fatigue', icon: '😴' },
  { id: 'appetite', label: 'Appetite loss', icon: '🍽️' },
  { id: 'fever', label: 'Fever or chills', icon: '🌡️' },
  { id: 'other', label: 'Other', icon: '➕' },
];

export const severityFaces = [
  { level: 1, label: 'None', emoji: '😊' },
  { level: 2, label: 'Mild', emoji: '🙂' },
  { level: 3, label: 'Moderate', emoji: '😐' },
  { level: 4, label: 'Severe', emoji: '😖' },
  { level: 5, label: 'Urgent', emoji: '⚠️' },
];

export const symptomHistory = [
  { id: 's1', label: 'Pain (Aches or hurts)', severity: 'Moderate', time: 'Today, 2:15 PM', note: 'Started in lower joints after morning walk.' },
  { id: 's2', label: 'Nausea (Queasy)', severity: 'Mild', time: 'Today, 8:30 AM', note: 'Settled after ginger tea.' },
  { id: 's3', label: 'Fatigue', severity: 'Moderate', time: 'Yesterday, 4:00 PM', note: 'Rested after clinic visit.' },
];

export const missedVisitReasons = [
  { id: 'transport', label: 'Bus / Transport fare problem' },
  { id: 'sick', label: 'Felt too sick or weak' },
  { id: 'family', label: 'Family or childcare duty' },
  { id: 'scared', label: 'Scared of treatment' },
  { id: 'other', label: 'Other reason' },
];
