import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// ---------------------------------------------------------------------------
// 1. MOCK DATA
// ---------------------------------------------------------------------------
const mockPatientData = {
  patientName: 'Alineti B.',
  comfortMessage: {
    english: 'You are not walking this path alone. You are doing well, Alineti.',
    chichewa: 'Simuli nokha pa ulendo umenewu. Mukuyesetsa kwambiri.',
  },
  nextVisit: {
    daysAway: 3,
    date: 'Thursday, 24 October 2024',
    dateLocal: 'Lachinayi',
    time: '08:30 AM',
    timeNote: 'Bwera m’mawa kwambiri',
    ward: 'Cancer Care Ward 3B',
    hospital: 'Kamuzu Central Hospital (KCH), Lilongwe',
    treatment: 'Chemotherapy Cycle 3 of 6',
    treatmentDetail: 'Paclitaxel & Carboplatin infusion',
    progressPercent: 50,
  },
  medicines: [
    {
      id: 1,
      name: 'Ondansetron 8mg',
      status: 'taken',
      statusLabel: 'Taken 7:00 AM',
      detail: 'Anti-nausea • Pofuna kupewa …',
    },
    {
      id: 2,
      name: 'Paracetamol 500mg',
      status: 'due',
      statusLabel: 'Due 2:00 PM',
      detail: 'Pain relief • Imwani ndi madzi ambiri (Take with water)',
    },
    {
      id: 3,
      name: 'Dexamethasone 4mg',
      status: 'upcoming',
      statusLabel: 'Due 8:00 PM',
      detail: 'Steroid • Kumwa mutadya …',
    },
  ],
  nurse: {
    name: 'Nurse Grace Phiri',
    role: 'Oncology Navigator',
    location: 'Kamuzu Central Hospital • Ward 3B',
  },
};

const moods = [
  { key: 'great', emoji: '😊', englishLabel: 'Very Good', chichewaLabel: 'Bwino' },
  { key: 'okay', emoji: '🙂', englishLabel: 'Okay', chichewaLabel: "Pang'ono" },
  { key: 'tired', emoji: '😔', englishLabel: 'Tired', chichewaLabel: 'Wofooka' },
  { key: 'pain', emoji: '😣', englishLabel: 'In Pain', chichewaLabel: 'Kuwawa' },
];

// ---------------------------------------------------------------------------
// 2. SMALL REUSABLE PIECES
// ---------------------------------------------------------------------------

function ComfortCard({ message, onListen, author }) {
  return (
    <View style={styles.comfortCard}>
      <View style={styles.comfortHeaderRow}>
        <View style={styles.comfortHeaderLeft}>
          <Ionicons name="heart" size={16} color="#4A5FD9" />
          <Text style={styles.comfortEyebrow}>MAWU A LERO • TODAY'S COMFORT</Text>
        </View>
        <View style={styles.kchBadge}>
          <Text style={styles.kchBadgeText}>KCH{'\n'}Care</Text>
        </View>
      </View>

      <Text style={styles.comfortQuoteEnglish}>"{message.english}"</Text>
      <Text style={styles.comfortQuoteChichewa}>"{message.chichewa}"</Text>

      <View style={styles.comfortFooterRow}>
        <TouchableOpacity style={styles.listenButton} onPress={onListen}>
          <Ionicons name="volume-medium" size={18} color="#4A5FD9" />
          <View>
            <Text style={styles.listenButtonTitle}>Mverani m'Chichewa</Text>
            <Text style={styles.listenButtonSubtitle}>Listen to voice audio</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.authorRow}>
          <Ionicons name="checkmark-circle" size={14} color="#2E9E5B" />
          <Text style={styles.authorText}>{author}</Text>
        </View>
      </View>
    </View>
  );
}

function VisitCard({ visit, onConfirm, onTransportHelp }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <View style={styles.cardHeaderLeft}>
          <Ionicons name="calendar-outline" size={18} color="#2F6FE0" />
          <View>
            <Text style={styles.cardEyebrow}>ULENDO WOTSATIRA</Text>
            <Text style={styles.cardTitle}>Next Clinic Visit</Text>
          </View>
        </View>
        <View style={styles.daysBadge}>
          <Text style={styles.daysBadgeText}>In {visit.daysAway} Days</Text>
        </View>
      </View>

      <View style={styles.visitDetailBlock}>
        <View style={styles.visitDetailRow}>
          <Ionicons name="calendar" size={16} color="#5B6472" style={styles.visitIcon} />
          <View>
            <Text style={styles.visitDetailPrimary}>{visit.date}</Text>
            <Text style={styles.visitDetailSecondary}>
              {visit.dateLocal} • {visit.time} ({visit.timeNote})
            </Text>
          </View>
        </View>

        <View style={styles.visitDetailRow}>
          <Ionicons name="business" size={16} color="#5B6472" style={styles.visitIcon} />
          <View>
            <Text style={styles.visitDetailPrimary}>{visit.ward}</Text>
            <Text style={styles.visitDetailSecondary}>{visit.hospital}</Text>
          </View>
        </View>

        <View style={styles.visitDetailRow}>
          <MaterialCommunityIcons name="medical-bag" size={16} color="#5B6472" style={styles.visitIcon} />
          <View style={{ flex: 1 }}>
            <View style={styles.treatmentRow}>
              <Text style={styles.visitDetailPrimary}>{visit.treatment}</Text>
              <Text style={styles.progressLabel}>{visit.progressPercent}%{'\n'}Halfway</Text>
            </View>
            <Text style={styles.visitDetailSecondary}>{visit.treatmentDetail}</Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${visit.progressPercent}%` }]} />
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
        <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
        <Text style={styles.confirmButtonText}>Ndzabwera • Confirm I Will Come</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.transportButton} onPress={onTransportHelp}>
        <Ionicons name="bus" size={16} color="#2F6FE0" />
        <Text style={styles.transportButtonText}>
          Mufuna Thandizo Loyendera? • Need Help with Transport?
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function MedicineRow({ medicine, onToggle }) {
  const isTaken = medicine.status === 'taken';
  const isDue = medicine.status === 'due';

  const iconName = isTaken ? 'checkmark' : isDue ? 'time-outline' : 'moon-outline';
  const iconBg = isTaken ? '#2E9E5B' : isDue ? '#E7EEFB' : '#E7EEFB';
  const iconColor = isTaken ? '#FFFFFF' : '#5B6472';

  return (
    <View style={[styles.medicineRow, isDue && styles.medicineRowDue]}>
      <View style={[styles.medicineIconCircle, { backgroundColor: iconBg }]}>
        <Ionicons name={iconName} size={16} color={iconColor} />
      </View>

      <View style={styles.medicineInfo}>
        <Text style={styles.medicineName}>{medicine.name}</Text>
        <View
          style={[
            styles.medicineStatusPill,
            isTaken && styles.medicineStatusPillTaken,
            isDue && styles.medicineStatusPillDue,
          ]}
        >
          <Text
            style={[
              styles.medicineStatusPillText,
              isTaken && styles.medicineStatusPillTextTaken,
              isDue && styles.medicineStatusPillTextDue,
            ]}
          >
            {medicine.statusLabel}
          </Text>
        </View>
        <Text style={styles.medicineDetail}>{medicine.detail}</Text>
      </View>

      <TouchableOpacity onPress={() => onToggle(medicine.id)}>
        <View
          style={[
            styles.medicineCheckbox,
            isTaken && styles.medicineCheckboxTaken,
          ]}
        >
          {isTaken && <Ionicons name="checkmark" size={14} color="#2E9E5B" />}
        </View>
      </TouchableOpacity>
    </View>
  );
}

function MoodCheckIn({ selectedMood, onSelect }) {
  return (
    <View style={styles.card}>
      <View style={styles.moodHeaderRow}>
        <Text style={styles.cardEyebrow}>KADZIFUFUZE MWACHIDULE</Text>
        <View style={styles.sharedRow}>
          <Ionicons name="location-outline" size={12} color="#2E9E5B" />
          <Text style={styles.sharedText}>Shared with Nurse Grace</Text>
        </View>
      </View>
      <Text style={styles.moodQuestion}>How are you feeling right now?</Text>
      <Text style={styles.moodSubtext}>Takes 10 seconds • Mukumva bwanji m'thupi panopa?</Text>

      <View style={styles.moodRow}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.key}
            style={[
              styles.moodButton,
              selectedMood === mood.key && styles.moodButtonSelected,
            ]}
            onPress={() => onSelect(mood.key)}
          >
            <Text style={styles.moodEmoji}>{mood.emoji}</Text>
            <Text style={styles.moodLabelEnglish}>{mood.englishLabel}</Text>
            <Text style={styles.moodLabelChichewa}>{mood.chichewaLabel}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function NurseCard({ nurse, onCall }) {
  return (
    <View style={styles.nurseCard}>
      <View style={styles.nurseInfoRow}>
        <View style={styles.nurseAvatarWrap}>
          <View style={styles.nurseAvatarPlaceholder}>
            <Ionicons name="person" size={22} color="#4A5FD9" />
          </View>
          <View style={styles.onlineDot} />
        </View>
        <View>
          <View style={styles.navigatorBadge}>
            <Text style={styles.navigatorBadgeText}>Oncology Navigator</Text>
          </View>
          <Text style={styles.nurseName}>{nurse.name}</Text>
          <Text style={styles.nurseLocation}>{nurse.location}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.callButton} onPress={onCall}>
        <Ionicons name="call" size={16} color="#FFFFFF" />
        <Text style={styles.callButtonText}>Imbani kwa Nasi Grace (Kwaulere)</Text>
      </TouchableOpacity>
      <Text style={styles.callFootnote}>
        Free Toll-Free Hotline • Osawononga ndalama iliyonse
      </Text>
    </View>
  );
}

// ---------------------------------------------------------------------------
// 3. THE MAIN SCREEN
// ---------------------------------------------------------------------------
export default function HomeScreen({ navigation }) {
  const [medicines, setMedicines] = useState(mockPatientData.medicines);
  const [selectedMood, setSelectedMood] = useState(null);

  function handleToggleMedicine(id) {
    setMedicines((prev) =>
      prev.map((med) =>
        med.id === id
          ? { ...med, status: med.status === 'taken' ? 'due' : 'taken' }
          : med
      )
    );
  }

  const takenCount = medicines.filter((m) => m.status === 'taken').length;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoCircle}>
            <Ionicons name="shield-checkmark" size={18} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.headerTitle}>Tikondane</Text>
            <Text style={styles.headerSubtitle}>Tikondane Health • ...</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.langPill}>
            <Ionicons name="language" size={14} color="#2F6FE0" />
            <Text style={styles.langPillText}>EN | Chichewa</Text>
          </TouchableOpacity>
          <View style={styles.profileCircle}>
            <Ionicons name="person" size={16} color="#5B6472" />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ComfortCard
          message={mockPatientData.comfortMessage}
          author={mockPatientData.patientName}
          onListen={() => alert('Playing Chichewa audio...')}
        />

        <VisitCard
          visit={mockPatientData.nextVisit}
          onConfirm={() => alert('Visit confirmed!')}
          onTransportHelp={() => alert('Opening transport help...')}
        />

        <View style={styles.card}>
          <View style={styles.medsHeaderRow}>
            <View style={styles.cardHeaderLeft}>
              <Ionicons name="medical" size={18} color="#2E9E5B" />
              <View>
                <Text style={styles.cardEyebrow}>MANKHWALA A LERO</Text>
                <Text style={styles.cardTitle}>Today's Medicines</Text>
              </View>
            </View>
            <View style={styles.takenBadge}>
              <Text style={styles.takenBadgeText}>
                {takenCount} of {medicines.length} Taken
              </Text>
            </View>
          </View>

          {medicines.map((med) => (
            <MedicineRow key={med.id} medicine={med} onToggle={handleToggleMedicine} />
          ))}
        </View>

        <MoodCheckIn selectedMood={selectedMood} onSelect={setSelectedMood} />

       

        <TouchableOpacity
          style={styles.missedButton}
          onPress={() => navigation.navigate('MissedAppointment')}
        >
          <Ionicons name="calendar-outline" size={18} color="#FFFFFF" />
          <Text style={styles.missedButtonText}>
            Missed Appointment • Taphonya Tsiku
          </Text>
        </TouchableOpacity>
        {/* ======================================== */}

        <NurseCard
          nurse={mockPatientData.nurse}
          onCall={() => alert('Calling hotline...')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// 4. STYLES
// ---------------------------------------------------------------------------
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAF0FB',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2F6FE0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2F6FE0',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#8A93A3',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  langPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EAF0FB',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  langPillText: {
    fontSize: 11,
    color: '#2F6FE0',
    fontWeight: '600',
  },
  profileCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E9EF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Comfort Card
  comfortCard: {
    backgroundColor: '#DCE6FA',
    borderRadius: 18,
    padding: 16,
  },
  comfortHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  comfortHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  comfortEyebrow: {
    fontSize: 11,
    color: '#4A5FD9',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  kchBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  kchBadgeText: {
    fontSize: 10,
    color: '#2F6FE0',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 13,
  },
  comfortQuoteEnglish: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1F2937',
    lineHeight: 24,
    marginBottom: 6,
  },
  comfortQuoteChichewa: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#5B6472',
    marginBottom: 14,
  },
  comfortFooterRow: {
    gap: 10,
  },
  listenButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  listenButtonTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
  },
  listenButtonSubtitle: {
    fontSize: 11,
    color: '#8A93A3',
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  authorText: {
    fontSize: 12,
    color: '#5B6472',
  },

  // Generic Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  cardEyebrow: {
    fontSize: 11,
    color: '#2F6FE0',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 2,
  },
  daysBadge: {
    backgroundColor: '#EAF0FB',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  daysBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2F6FE0',
  },

  // Visit Card details
  visitDetailBlock: {
    gap: 14,
    marginBottom: 16,
  },
  visitDetailRow: {
    flexDirection: 'row',
    gap: 10,
  },
  visitIcon: {
    marginTop: 2,
  },
  visitDetailPrimary: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  visitDetailSecondary: {
    fontSize: 12,
    color: '#8A93A3',
    marginTop: 2,
  },
  treatmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  progressLabel: {
    fontSize: 11,
    color: '#2E9E5B',
    fontWeight: '700',
    textAlign: 'right',
    lineHeight: 13,
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#E5E9EF',
    borderRadius: 3,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2E9E5B',
    borderRadius: 3,
  },
  confirmButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1E8449',
    borderRadius: 14,
    paddingVertical: 14,
    marginBottom: 10,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  transportButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#EAF0FB',
    borderRadius: 14,
    paddingVertical: 12,
  },
  transportButtonText: {
    color: '#2F6FE0',
    fontWeight: '600',
    fontSize: 13,
    textAlign: 'center',
  },

  // Medicines
  medsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  takenBadge: {
    backgroundColor: '#EAF0FB',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  takenBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2F6FE0',
  },
  medicineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  medicineRowDue: {
    backgroundColor: '#EEF3FC',
    borderRadius: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 0,
  },
  medicineIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  medicineInfo: {
    flex: 1,
    gap: 4,
  },
  medicineName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  medicineStatusPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E9EF',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  medicineStatusPillTaken: {
    backgroundColor: '#DCF3E4',
  },
  medicineStatusPillDue: {
    backgroundColor: '#1E3A8A',
  },
  medicineStatusPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#5B6472',
  },
  medicineStatusPillTextTaken: {
    color: '#1E8449',
  },
  medicineStatusPillTextDue: {
    color: '#FFFFFF',
  },
  medicineDetail: {
    fontSize: 11,
    color: '#8A93A3',
  },
  medicineCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#C7CEDA',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  medicineCheckboxTaken: {
    borderColor: '#2E9E5B',
    backgroundColor: '#DCF3E4',
  },

  // Mood
  moodHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sharedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sharedText: {
    fontSize: 11,
    color: '#2E9E5B',
    fontWeight: '600',
  },
  moodQuestion: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  moodSubtext: {
    fontSize: 12,
    color: '#8A93A3',
    marginBottom: 14,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  moodButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: '#F5F7FA',
  },
  moodButtonSelected: {
    backgroundColor: '#DCE6FA',
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  moodLabelEnglish: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1F2937',
  },
  moodLabelChichewa: {
    fontSize: 10,
    color: '#8A93A3',
  },

  // Nurse Card
  nurseCard: {
    backgroundColor: '#DCE6FA',
    borderRadius: 18,
    padding: 16,
  },
  nurseInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  nurseAvatarWrap: {
    position: 'relative',
  },
  nurseAvatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2E9E5B',
    borderWidth: 2,
    borderColor: '#DCE6FA',
  },
  navigatorBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#DCF3E4',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 4,
  },
  navigatorBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1E8449',
  },
  nurseName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  nurseLocation: {
    fontSize: 11,
    color: '#5B6472',
  },
  callButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1E8449',
    borderRadius: 14,
    paddingVertical: 14,
    marginBottom: 8,
  },
  callButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  callFootnote: {
    fontSize: 11,
    color: '#5B6472',
    textAlign: 'center',
  },

  // New buttons
  triageButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#C62828',
    borderRadius: 14,
    paddingVertical: 14,
  },
  triageButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },
  missedButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#C2650B',
    borderRadius: 14,
    paddingVertical: 14,
  },
  missedButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },
});