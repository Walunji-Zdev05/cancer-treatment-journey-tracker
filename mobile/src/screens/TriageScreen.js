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


const nauseaOptions = [
  { value: 1, emoji: '😊', label: 'None' },
  { value: 2, emoji: '😐', label: 'Mild' },
  { value: 3, emoji: '🤢', label: 'Mod.' },
  { value: 4, emoji: '🤮', label: '1 Vomit', severe: true },
  { value: 5, emoji: '⚠️', label: 'Urgent', severe: true, urgent: true },
];

const painOptions = [
  { value: 0, emoji: '😀', label: 'No hurt' },
  { value: 2, emoji: '🙂', label: 'Little' },
  { value: 4, emoji: '😐', label: 'More' },
  { value: 6, emoji: '😣', label: 'Even...' },
  { value: 8, emoji: '😭', label: 'Whole..', severe: true },
  { value: 10, emoji: '🛑', label: 'Worst', severe: true, urgent: true },
];

const energyOptions = [
  { value: 'good', icon: 'battery-full', bg: '#B7F5D6', color: '#0E7A4B', title: 'Good Energy', sub: 'Up & doing tasks' },
  { value: 'moderate', icon: 'battery-half', bg: '#FFE0C2', color: '#B45309', title: 'Moderate Fatigue', sub: 'Frequent rests' },
  { value: 'bed', icon: 'battery-dead', bg: '#FFD9D9', color: '#B91C1C', title: 'Resting in Bed', sub: 'Most of day' },
];


function SymptomCard({ icon, title, chichewa, answered, children }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardIconCircle}>{icon}</View>
        <View style={styles.cardHeaderText}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardChichewa}>{chichewa}</Text>
        </View>
        <View style={[styles.selectBadge, answered && styles.selectBadgeDone]}>
          <Text style={[styles.selectBadgeText, answered && styles.selectBadgeTextDone]}>
            {answered ? 'Done' : 'Select'}
          </Text>
        </View>
      </View>
      {children}
    </View>
  );
}


function EmojiScale({ options, selected, onSelect }) {
  return (
    <View style={styles.scaleRow}>
      {options.map((opt) => {
        const isSelected = selected === opt.value;
        return (
          <TouchableOpacity
            key={opt.value}
            style={[
              styles.scaleChip,
              opt.urgent && styles.scaleChipUrgent,
              isSelected && styles.scaleChipSelected,
            ]}
            onPress={() => onSelect(opt.value)}
            activeOpacity={0.7}
          >
            <View style={styles.scaleEmojiCircle}>
              <Text style={styles.scaleEmoji}>{opt.emoji}</Text>
            </View>
            <Text style={[styles.scaleValue, opt.urgent && styles.scaleUrgentText]}>{opt.value}</Text>
            <Text style={[styles.scaleLabel, opt.urgent && styles.scaleUrgentText]} numberOfLines={1}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TriageScreen({ navigation }) {
  const [nausea, setNausea] = useState(null);
  const [pain, setPain] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [fever, setFever] = useState(null); // 'no' | 'yes'

  const isSevere =
    nauseaOptions.find((o) => o.value === nausea)?.severe ||
    painOptions.find((o) => o.value === pain)?.severe ||
    fever === 'yes';

  function handleSend() {
    const missing = [];
    if (nausea === null) missing.push('Nausea & Vomiting');
    if (pain === null) missing.push('Pain Scale');
    if (energy === null) missing.push('Energy Level');
    if (fever === null) missing.push('Fever or Chills');

    if (missing.length > 0) {
      Alert.alert('Please answer all questions', `Still missing:\n• ${missing.join('\n• ')}`);
      return;
    }

    
    const report = { nausea, pain, energy, fever, severe: !!isSevere };
    console.log('Triage report:', report);

    Alert.alert(
      isSevere ? 'Nurse alerted' : 'Update sent',
      isSevere
        ? 'Your nurse has been sent an SMS and will phone you within 2 hours.'
        : 'Thank you. Your care team has received your update.'
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation && navigation.goBack && navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color="#2F6FE0" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Emergency Triage</Text>
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
        {/* Intro block */}
        <View style={styles.introCard}>
          <View style={styles.introTopRow}>
            <View style={styles.todayBadge}>
              <View style={styles.todayDot} />
              <Text style={styles.todayBadgeText}>Lero • Today</Text>
            </View>
            <Text style={styles.clinicName}>Kamuzu Oncology Care</Text>
          </View>
          <Text style={styles.introTitle}>Kodi Mukumva Bwanji?</Text>
          <Text style={styles.introText}>
            Help your care team catch problems early. Tell us how your body feels today.
          </Text>
          <TouchableOpacity style={styles.audioButton}>
            <Ionicons name="volume-medium" size={18} color="#0B4DB3" />
            <Text style={styles.audioButtonText}>Mverani Malangizo (Listen in Chichewa)</Text>
            <Text style={styles.audioDuration}>1:12{'\n'}min</Text>
          </TouchableOpacity>
        </View>

        {/* 1. Nausea */}
        <SymptomCard
          icon={<MaterialCommunityIcons name="cup-water" size={18} color="#2F6FE0" />}
          title="Nausea & Vomiting"
          chichewa="Kusanza kapena kusowa chilakolako"
          answered={nausea !== null}
        >
          <EmojiScale options={nauseaOptions} selected={nausea} onSelect={setNausea} />
        </SymptomCard>

        {/* 2. Pain */}
        <SymptomCard
          icon={<MaterialCommunityIcons name="bandage" size={18} color="#2F6FE0" />}
          title="Pain Scale"
          chichewa="Ululu wathupi lonse"
          answered={pain !== null}
        >
          <EmojiScale options={painOptions} selected={pain} onSelect={setPain} />
        </SymptomCard>

        {/* 3. Energy */}
        <SymptomCard
          icon={<MaterialCommunityIcons name="battery-charging-60" size={18} color="#2F6FE0" />}
          title="Energy Level"
          chichewa="Kutopa kwambiri kapena mphamvu"
          answered={energy !== null}
        >
          {energyOptions.map((opt) => {
            const isSelected = energy === opt.value;
            return (
              <TouchableOpacity
                key={opt.value}
                style={[styles.energyRow, isSelected && styles.energyRowSelected]}
                onPress={() => setEnergy(opt.value)}
                activeOpacity={0.7}
              >
                <View style={[styles.energyIcon, { backgroundColor: opt.bg }]}>
                  <MaterialCommunityIcons name={opt.icon} size={20} color={opt.color} />
                </View>
                <View>
                  <Text style={styles.energyTitle}>{opt.title}</Text>
                  <Text style={styles.energySub}>{opt.sub}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </SymptomCard>

        {/* 4. Fever */}
        <SymptomCard
          icon={<MaterialCommunityIcons name="thermometer" size={18} color="#2F6FE0" />}
          title="Fever or Chills?"
          chichewa="Kutentha thupi kapena kunjenjemera"
          answered={fever !== null}
        >
          <View style={styles.feverWarning}>
            <Ionicons name="information-circle-outline" size={18} color="#8A4B0F" />
            <Text style={styles.feverWarningText}>
              <Text style={styles.feverWarningBold}>Malangizo Othandiza: </Text>
              A fever during cancer treatment needs quick attention from your nurse!
            </Text>
          </View>
          <View style={styles.feverRow}>
            <TouchableOpacity
              style={[styles.feverButton, fever === 'no' && styles.feverButtonSelected]}
              onPress={() => setFever('no')}
            >
              <Ionicons name="checkmark-circle-outline" size={20} color="#1E8449" />
              <Text style={styles.feverButtonText}>Ayi (No Fever)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.feverButton, fever === 'yes' && styles.feverButtonDanger]}
              onPress={() => setFever('yes')}
            >
              <Ionicons name="warning-outline" size={20} color="#C62828" />
              <Text style={styles.feverButtonText}>Inde (I Have Fever)</Text>
            </TouchableOpacity>
          </View>
        </SymptomCard>

        {/* Alert info card */}
        <View style={styles.alertCard}>
          <View style={styles.alertIcon}>
            <Ionicons name="speedometer-outline" size={20} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.alertTitle}>Mukaona ululu kapena zovuta zazikulu</Text>
            <Text style={styles.alertText}>
              If you log any severe symptom (level 4 or 5), Sister Mercy and the Lilongwe oncology navigation
              unit receive an instant SMS alert and will phone you directly within 2 hours.
            </Text>
          </View>
        </View>

        {/* Send button */}
        <TouchableOpacity style={styles.sendButton} onPress={handleSend} activeOpacity={0.85}>
          <Ionicons name="send-outline" size={20} color="#FFFFFF" />
          <Text style={styles.sendButtonText}>Tumizani Zomwe Mukumva (Send Update)</Text>
        </TouchableOpacity>
        <Text style={styles.privacyNote}>
          Zosungidwa mwachinsinsi • Encrypted for your health record
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F6FC' },
  scrollContent: { paddingBottom: 32 },

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
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#E8EFFC', justifyContent: 'center', alignItems: 'center',
  },
  headerTitleWrap: { flex: 1 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937' },
  headerSubtitle: { fontSize: 11, color: '#6B7380' },
  langButton: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: '#E8EFFC', justifyContent: 'center', alignItems: 'center',
  },
  avatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#E5E9EF', justifyContent: 'center', alignItems: 'center',
  },

  // Intro
  introCard: { backgroundColor: '#FFFFFF', padding: 16, marginBottom: 16 },
  introTopRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10,
  },
  todayBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#B7F5D6', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4,
  },
  todayDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#0E7A4B' },
  todayBadgeText: { fontSize: 12, fontWeight: '700', color: '#0E5A3A' },
  clinicName: { fontSize: 12, color: '#4B5563' },
  introTitle: { fontSize: 24, fontWeight: '800', color: '#111827', marginBottom: 6 },
  introText: { fontSize: 14, color: '#4B5563', lineHeight: 20, marginBottom: 14 },
  audioButton: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#E8EFFC', borderRadius: 26, paddingHorizontal: 16, paddingVertical: 12,
  },
  audioButtonText: { flex: 1, fontSize: 13, fontWeight: '700', color: '#0B4DB3', textAlign: 'center' },
  audioDuration: { fontSize: 11, color: '#4B5563', textAlign: 'center' },

  // Symptom card
  card: {
    backgroundColor: '#FFFFFF', padding: 16, marginBottom: 16,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 14 },
  cardIconCircle: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#E8EFFC', justifyContent: 'center', alignItems: 'center',
  },
  cardHeaderText: { flex: 1 },
  cardTitle: { fontSize: 17, fontWeight: '700', color: '#111827' },
  cardChichewa: { fontSize: 12, color: '#4B5563', marginTop: 2 },
  selectBadge: {
    backgroundColor: '#EEF1F6', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 5,
  },
  selectBadgeDone: { backgroundColor: '#DCF3E4' },
  selectBadgeText: { fontSize: 12, fontWeight: '600', color: '#4B5563' },
  selectBadgeTextDone: { color: '#1E8449' },

  // Emoji scale
  scaleRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 6 },
  scaleChip: {
    flex: 1, alignItems: 'center', paddingVertical: 10, paddingHorizontal: 2,
    backgroundColor: '#EEF3FC', borderRadius: 28, borderWidth: 2, borderColor: 'transparent',
  },
  scaleChipUrgent: { backgroundColor: '#FDECEC' },
  scaleChipSelected: { borderColor: '#2F6FE0', backgroundColor: '#DCE8FB' },
  scaleEmojiCircle: {
    width: 34, height: 34, borderRadius: 17, backgroundColor: '#FFFFFF',
    justifyContent: 'center', alignItems: 'center', marginBottom: 6,
  },
  scaleEmoji: { fontSize: 18 },
  scaleValue: { fontSize: 13, fontWeight: '700', color: '#111827' },
  scaleLabel: { fontSize: 10, color: '#6B7380', marginTop: 1 },
  scaleUrgentText: { color: '#C62828' },

  // Energy
  energyRow: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: '#EEF3FC', padding: 10, marginBottom: 10,
    borderRadius: 4, borderWidth: 2, borderColor: 'transparent',
  },
  energyRowSelected: { borderColor: '#2F6FE0', backgroundColor: '#DCE8FB' },
  energyIcon: {
    width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center',
  },
  energyTitle: { fontSize: 14, fontWeight: '700', color: '#111827' },
  energySub: { fontSize: 12, color: '#4B5563' },

  // Fever
  feverWarning: {
    flexDirection: 'row', gap: 8, backgroundColor: '#E8EFFC',
    padding: 12, marginBottom: 14, borderRadius: 4,
  },
  feverWarningText: { flex: 1, fontSize: 12, color: '#4B5563', lineHeight: 17 },
  feverWarningBold: { color: '#8A4B0F', fontWeight: '600' },
  feverRow: { flexDirection: 'row', gap: 10 },
  feverButton: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: '#EEF3FC', borderRadius: 28, paddingVertical: 14, paddingHorizontal: 10,
    borderWidth: 2, borderColor: 'transparent',
  },
  feverButtonSelected: { borderColor: '#1E8449', backgroundColor: '#E2F5EA' },
  feverButtonDanger: { borderColor: '#C62828', backgroundColor: '#FDECEC' },
  feverButtonText: { fontSize: 14, fontWeight: '600', color: '#111827', flexShrink: 1, textAlign: 'center' },

  // Alert info
  alertCard: {
    flexDirection: 'row', gap: 12, backgroundColor: '#E8EFFC',
    padding: 16, marginBottom: 16,
  },
  alertIcon: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#0B4DB3',
    justifyContent: 'center', alignItems: 'center',
  },
  alertTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 4 },
  alertText: { fontSize: 12, color: '#4B5563', lineHeight: 17 },

  // Send
  sendButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: '#0B4DB3', borderRadius: 30, paddingVertical: 16, marginHorizontal: 16,
  },
  sendButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700', flexShrink: 1, textAlign: 'center' },
  privacyNote: {
    fontSize: 11, color: '#4B5563', textAlign: 'center', marginTop: 10, paddingHorizontal: 16,
  },
});