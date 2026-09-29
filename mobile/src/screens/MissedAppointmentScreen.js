import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// ---------------------------------------------------------------------------
// MOCK DATA
// ---------------------------------------------------------------------------
const reasons = [
  {
    id: 'transport',
    icon: 'bus',
    english: 'Bus / Transport fare problem',
    chichewa: 'Ndalama yamayendedwe sinekwenire',
  },
  {
    id: 'sick',
    icon: 'medkit-outline',
    english: 'Felt too sick or weak',
    chichewa: 'Kumva kutopa kapena kudwala kwa...',
  },
  {
    id: 'family',
    icon: 'people-outline',
    english: 'Family or childcare duty',
    chichewa: 'Zochitika zapakhomo kapena kusamalira...',
  },
  {
    id: 'scared',
    icon: 'heart-outline',
    english: 'Scared of treatment',
    chichewa: 'Mantha ndi zotsatira za mankhwala',
  },
  {
    id: 'other',
    icon: 'chatbubble-outline',
    english: 'Other reason / Chifukwa china',
    chichewa: 'Tikambirane patelefoni (We can talk...)',
  },
];

const availableDates = [
  {
    id: 'mon28',
    day: 'Monday, 28 Oct',
    chichewaDay: 'Lolemba',
    time: '08:30 AM',
    seats: '6 seats open',
  },
  {
    id: 'thu31',
    day: 'Thursday, 31 Oct',
    chichewaDay: 'Lachinayi',
    time: '08:30 AM',
    seats: '8 seats open',
  },
];

// ---------------------------------------------------------------------------
// MAIN SCREEN
// ---------------------------------------------------------------------------
export default function MissedAppointmentScreen({ navigation }) {
  const [selectedReason, setSelectedReason] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  function handleRequestCallback() {
    Alert.alert(
      'Callback Requested',
      'Nurse Grace will call you today to help with transport and a new appointment time.'
    );
  }

  function handleConfirmDate() {
    if (!selectedDate) {
      Alert.alert('Please choose a date', 'Select one of the available clinic days first.');
      return;
    }
    const date = availableDates.find((d) => d.id === selectedDate);
    Alert.alert(
      'Date Confirmed',
      `Your next visit is set for ${date.day} at ${date.time}. See you then!`
    );
  }

  function handleCallHelpline() {
    Alert.alert('Calling Helpline', 'Connecting to KCH Oncology Helpline (Toll-Free 800-265)...');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack?.()}
        >
          <Ionicons name="arrow-back" size={20} color="#2F6FE0" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Missed Appointment</Text>
          <Text style={styles.headerSubtitle}>Tikondane Health • Lilongwe</Text>
        </View>
        <TouchableOpacity style={styles.langButton}>
          <Ionicons name="language" size={18} color="#2F6FE0" />
        </TouchableOpacity>
        <View style={styles.avatar}>
          <Ionicons name="person" size={16} color="#5B6472" />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top supportive card */}
        <View style={styles.topCard}>
          <View style={styles.topCardHeader}>
            <View style={styles.safeBadge}>
              <Text style={styles.safeBadgeText}>Tikondane • Safe Care Space</Text>
            </View>
            <View style={styles.missedBadge}>
              <Text style={styles.missedBadgeText}>Taphonya Tsiku Lanu</Text>
            </View>
          </View>

          <View style={styles.titleRow}>
            <Text style={styles.mainTitle}>
              We missed you at{'\n'}Kamuzu Central{'\n'}Hospital yesterday
            </Text>
            <View style={styles.checkCircle}>
              <Ionicons name="checkmark" size={20} color="#FFFFFF" />
            </View>
          </View>

          <Text style={styles.chichewaTitle}>
            Taphonya kukuonanani ku chipatala dzulo
          </Text>

          <Text style={styles.supportText}>
            We know that coming to the hospital can be very difficult. Please do not
            worry or be afraid. Your treatment is still waiting for you, and we are
            here to help you get back on track.
          </Text>
          <Text style={styles.supportTextChichewa}>
            Tikudziwa kuti kubwera ku chipatala kumakhala kovuta nthawi zina. Musade
            nkhawa kapena kuchita mantha. Mankhwala anu akadali pano, ndipo tili
            okonzeka kukuthandizani.
          </Text>
        </View>

        {/* Appointment Details */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.sectionEyebrow}>APPOINTMENT DETAILS / TSATANETSATANE</Text>
            <View style={styles.needsBadge}>
              <Text style={styles.needsBadgeText}>Needs Reschedule</Text>
            </View>
          </View>

          <View style={styles.appointmentRow}>
            <View style={styles.dropIcon}>
              <Ionicons name="water" size={18} color="#2F6FE0" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.appointmentTitle}>Chemotherapy Cycle 3</Text>
              <Text style={styles.appointmentSub}>
                Scheduled for 24 Oct • Kamuzu Central
              </Text>
            </View>
          </View>

          <View style={styles.infoChips}>
            <View style={styles.infoChip}>
              <Ionicons name="people-outline" size={14} color="#2F6FE0" />
              <Text style={styles.infoChipText}>Team Oncology Care</Text>
            </View>
            <View style={styles.infoChip}>
              <Ionicons name="location-outline" size={14} color="#2F6FE0" />
              <Text style={styles.infoChipText}>Location Ward 3B Clinic</Text>
            </View>
          </View>
        </View>

        {/* Reasons */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>What made it hard to come?</Text>
          <Text style={styles.sectionChichewa}>
            Chinalakwikan'chiyani? Sankhani kamodzi kuti tikuthandizeni bwino.
          </Text>

          {reasons.map((item) => {
            const isSelected = selectedReason === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.reasonRow, isSelected && styles.reasonRowSelected]}
                onPress={() => setSelectedReason(item.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.reasonIcon, isSelected && styles.reasonIconSelected]}>
                  <Ionicons
                    name={item.icon}
                    size={18}
                    color={isSelected ? '#FFFFFF' : '#2F6FE0'}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.reasonEnglish}>{item.english}</Text>
                  <Text style={styles.reasonChichewa}>{item.chichewa}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Nurse card */}
        <View style={styles.nurseCard}>
          <View style={styles.nurseRow}>
            <View style={styles.nurseAvatar}>
              <Ionicons name="person" size={22} color="#4A5FD9" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.nurseName}>Nurse Grace • Oncology Navigator</Text>
              <Text style={styles.nurseLocation}>Kamuzu Central Cancer Centre</Text>
            </View>
          </View>
          <Text style={styles.nurseMessage}>
            Nurse Grace will call your phone today to arrange a new date and help
            with transport options.
          </Text>
          <Text style={styles.nurseMessageChichewa}>
            Nesi Grace adzakuimbirani lero kukuthandizani ndatso tsiku lina ndi
            ndalama zamayendedwe.
          </Text>

          <TouchableOpacity style={styles.callbackButton} onPress={handleRequestCallback}>
            <Ionicons name="call" size={18} color="#FFFFFF" />
            <Text style={styles.callbackButtonText}>Request Free Nurse Callback</Text>
          </TouchableOpacity>
        </View>

        {/* Pick a new date */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Pick a New Clinic Date</Text>
          <Text style={styles.sectionChichewa}>Sankhani Tsiku</Text>
          <Text style={styles.dateNote}>
            Ward 3B Chemotherapy sessions take place every Monday and Thursday.
            Choose what suits your travel.
          </Text>

          <View style={styles.datesRow}>
            {availableDates.map((date) => {
              const isSelected = selectedDate === date.id;
              return (
                <TouchableOpacity
                  key={date.id}
                  style={[styles.dateCard, isSelected && styles.dateCardSelected]}
                  onPress={() => setSelectedDate(date.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.seatsText}>{date.seats}</Text>
                  <Text style={styles.dateDay}>{date.day}</Text>
                  <Text style={styles.dateChichewa}>
                    {date.chichewaDay} • {date.time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmDate}>
            <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
            <Text style={styles.confirmButtonText}>Confirm Next Available Date</Text>
          </TouchableOpacity>
        </View>

        {/* Helpline */}
        <View style={styles.helplineCard}>
          <View style={styles.helplineHeader}>
            <Ionicons name="headset-outline" size={18} color="#2F6FE0" />
            <Text style={styles.helplineTitle}>Need immediate advice?</Text>
          </View>
          <Text style={styles.helplineText}>
            Speak directly with on-duty oncology clinicians at Kamuzu Central
            Hospital. Calls are 100% toll-free across all Malawi networks (TNM & Airtel).
          </Text>
          <Text style={styles.helplineChichewa}>
            Kuyimbana ndi ma adoto a pamy a zonse ku Malawi.
          </Text>

          <TouchableOpacity style={styles.helplineButton} onPress={handleCallHelpline}>
            <Ionicons name="call" size={18} color="#FFFFFF" />
            <Text style={styles.helplineButtonText}>
              Call KCH Helpline (Toll-Free 800-265)
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// STYLES
// ---------------------------------------------------------------------------
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F6FC',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8EFFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleWrap: { flex: 1 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937' },
  headerSubtitle: { fontSize: 11, color: '#6B7380' },
  langButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#E8EFFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E5E9EF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Top supportive card
  topCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
  },
  topCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  safeBadge: {
    backgroundColor: '#E8EFFC',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  safeBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2F6FE0',
  },
  missedBadge: {
    backgroundColor: '#FDF0E4',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  missedBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#C2650B',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 28,
    flex: 1,
  },
  checkCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2E9E5B',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  chichewaTitle: {
    fontSize: 13,
    color: '#5B6472',
    marginBottom: 12,
  },
  supportText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 8,
  },
  supportTextChichewa: {
    fontSize: 13,
    color: '#6B7380',
    lineHeight: 19,
    fontStyle: 'italic',
  },

  // Generic card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionEyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8A93A3',
    letterSpacing: 0.3,
  },
  needsBadge: {
    backgroundColor: '#FDF0E4',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  needsBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#C2650B',
  },
  appointmentRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  dropIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EAF0FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  appointmentSub: {
    fontSize: 13,
    color: '#6B7380',
    marginTop: 2,
  },
  infoChips: {
    flexDirection: 'row',
    gap: 10,
  },
  infoChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  infoChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },

  // Reasons
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  sectionChichewa: {
    fontSize: 13,
    color: '#6B7380',
    marginBottom: 14,
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F5F7FA',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  reasonRowSelected: {
    backgroundColor: '#EAF0FB',
    borderColor: '#2F6FE0',
  },
  reasonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8EFFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reasonIconSelected: {
    backgroundColor: '#2F6FE0',
  },
  reasonEnglish: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  reasonChichewa: {
    fontSize: 12,
    color: '#6B7380',
    marginTop: 2,
  },

  // Nurse card
  nurseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
  },
  nurseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  nurseAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8EFFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nurseName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  nurseLocation: {
    fontSize: 12,
    color: '#6B7380',
    marginTop: 2,
  },
  nurseMessage: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 19,
    marginBottom: 6,
  },
  nurseMessageChichewa: {
    fontSize: 12,
    color: '#6B7380',
    lineHeight: 17,
    marginBottom: 14,
  },
  callbackButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1E8449',
    borderRadius: 14,
    paddingVertical: 14,
  },
  callbackButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },

  // Dates
  dateNote: {
    fontSize: 13,
    color: '#6B7380',
    marginBottom: 14,
    lineHeight: 18,
  },
  datesRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  dateCard: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    borderRadius: 14,
    padding: 14,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dateCardSelected: {
    backgroundColor: '#EAF0FB',
    borderColor: '#2F6FE0',
  },
  seatsText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2E9E5B',
    marginBottom: 6,
  },
  dateDay: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  dateChichewa: {
    fontSize: 12,
    color: '#6B7380',
  },
  confirmButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#2F6FE0',
    borderRadius: 14,
    paddingVertical: 14,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },

  // Helpline
  helplineCard: {
    backgroundColor: '#EAF0FB',
    borderRadius: 18,
    padding: 16,
  },
  helplineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  helplineTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  helplineText: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 19,
    marginBottom: 6,
  },
  helplineChichewa: {
    fontSize: 12,
    color: '#6B7380',
    marginBottom: 14,
  },
  helplineButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1E8449',
    borderRadius: 14,
    paddingVertical: 14,
  },
  helplineButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },
});