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
import AppHeader from '../components/AppHeader';

export default function MedicinesScreen({ navigation }) {
  const [ondansetronEveningTaken, setOndansetronEveningTaken] = useState(false);

  const handleMarkTaken = () => {
    setOndansetronEveningTaken(true);
    Alert.alert('Zikomo', 'Ondansetron evening dose marked as taken.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <AppHeader
          navigation={navigation}
          title="Mankhwala a Lero"
          showSos={true}
        />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Progress Banner */}
        <View style={styles.progressCard}>
          <View style={styles.progressTop}>
            <View>
              <View style={styles.dateRow}>
                <View style={styles.greenDot} />
                <Text style={styles.dateText}>Lolemba, 21 Oct</Text>
              </View>
              <Text style={styles.progressTitle}>Mankhwala a Lero</Text>
              <Text style={styles.progressSub}>Your Medicines Today • 2 of 3 taken</Text>
            </View>

            {/* Simple progress circle */}
            <View style={styles.progressCircle}>
              <Text style={styles.progressPercent}>67%</Text>
              <Text style={styles.progressLeft}>Yatsala 1</Text>
            </View>
          </View>

          {/* Audio Guidance */}
          <View style={styles.audioCard}>
            <TouchableOpacity style={styles.audioBtn}>
              <Ionicons name="volume-high" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={styles.audioTitle}>Mverani Malangizo a Mankhwala</Text>
              <Text style={styles.audioSub}>
                Listen to Nurse Mary explain your doses (1:45 min)
              </Text>
            </View>
            <View style={styles.chichewaBadge}>
              <Text style={styles.chichewaText}>Chichewa</Text>
            </View>
          </View>
        </View>

        {/* Daily Medications Title */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <MaterialCommunityIcons name="pill" size={22} color="#0058be" />
            <Text style={styles.sectionTitle}>Mankhwala a Tsiku Lililonse</Text>
          </View>
          <Text style={styles.sectionLabel}>Active Doses</Text>
        </View>

        {/* 1. Ondansetron */}
        <View style={styles.medCard}>
          <View style={styles.medHeader}>
            <View style={styles.medLeft}>
              <View style={[styles.pillVisual, { backgroundColor: '#ffdad6' }]}>
                <View style={styles.pinkPill} />
              </View>
              <View>
                <Text style={styles.medCategory}>Kuchepetsa Kusanza • Anti-Nausea</Text>
                <Text style={styles.medName}>Ondansetron 8mg</Text>
                <Text style={styles.medDesc}>1 piritsi lofiira • 1 pink round tablet</Text>
              </View>
            </View>
            <View style={styles.takenBadge}>
              <Ionicons name="checkmark-circle" size={14} color="#006c49" />
              <Text style={styles.takenBadgeText}>1/2</Text>
            </View>
          </View>

          <View style={styles.guidanceBox}>
            <Ionicons name="water" size={18} color="#0058be" />
            <Text style={styles.guidanceText}>
              Imwani ndi madzi ambiri mukamaliza kudya chakudya. (Take with 1 full glass of water after food).
            </Text>
          </View>

          <View style={styles.doseRow}>
            {/* Morning - Taken */}
            <View style={styles.doseCardTaken}>
              <View style={styles.doseHeader}>
                <Text style={styles.doseTime}>M'mawa (08:00 AM)</Text>
                <Ionicons name="checkmark-circle" size={18} color="#006c49" />
              </View>
              <Text style={styles.doseStatusTaken}>Tamwa kale (8:15 AM)</Text>
              <Text style={styles.doseNote}>Taken with porridge</Text>
            </View>

            {/* Evening - Pending or Taken */}
            <View style={ondansetronEveningTaken ? styles.doseCardTaken : styles.doseCardPending}>
              <View style={styles.doseHeader}>
                <Text style={styles.doseTime}>Madzulo (08:00 PM)</Text>
                <Ionicons
                  name={ondansetronEveningTaken ? 'checkmark-circle' : 'time'}
                  size={18}
                  color={ondansetronEveningTaken ? '#006c49' : '#825100'}
                />
              </View>
              <Text
                style={
                  ondansetronEveningTaken
                    ? styles.doseStatusTaken
                    : styles.doseStatusPending
                }
              >
                {ondansetronEveningTaken ? 'Tamwa kale' : 'Ikudikirira (In 4 hrs)'}
              </Text>

              {!ondansetronEveningTaken && (
                <TouchableOpacity style={styles.takeBtn} onPress={handleMarkTaken}>
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  <Text style={styles.takeBtnText}>Tamwa Lino</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/* 2. Paracetamol */}
        <View style={styles.medCard}>
          <View style={styles.medHeader}>
            <View style={styles.medLeft}>
              <View style={[styles.pillVisual, { backgroundColor: '#dee8ff' }]}>
                <View style={styles.whitePill} />
              </View>
              <View>
                <Text style={[styles.medCategory, { color: '#825100' }]}>
                  Kuthetsa Ululu • Pain Relief
                </Text>
                <Text style={styles.medName}>Paracetamol 500mg</Text>
                <Text style={styles.medDesc}>
                  Mapiritsi 2 oyera aatali • 2 oblong white tablets
                </Text>
              </View>
            </View>
            <View style={styles.prnBadge}>
              <Text style={styles.prnText}>Pakafunika</Text>
            </View>
          </View>

          <View style={styles.timerBox}>
            <View style={styles.timerRow}>
              <Text style={styles.timerLabel}>
                Munatenga nthawi: <Text style={{ fontWeight: '700' }}>12:30 PM</Text>
              </Text>
              <View style={styles.lockRow}>
                <Ionicons name="lock-closed" size={14} color="#006c49" />
                <Text style={styles.lockText}>Dikirani 06:30 PM</Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '70%' }]} />
            </View>
            <Text style={styles.timerNote}>
              Nthawi yoyenera kumweranso: Patapita maola 6 (Allow 6 hours between doses)
            </Text>
          </View>

          <View style={styles.warningBox}>
            <Ionicons name="warning" size={18} color="#825100" />
            <Text style={styles.warningText}>
              <Text style={{ fontWeight: '700' }}>Chenjezo:</Text> Musamwe zoposa mapiritsi 8
              patsiku lathunthu (Do not exceed 8 tablets in 24 hours).
            </Text>
          </View>

          <TouchableOpacity style={styles.disabledBtn} disabled>
            <Ionicons name="hourglass" size={18} color="#6B7380" />
            <Text style={styles.disabledBtnText}>
              Nthawi Silinakwane (Available after 6:30 PM)
            </Text>
          </TouchableOpacity>
        </View>

        {/* 3. Dexamethasone */}
        <View style={styles.medCard}>
          <View style={styles.medHeader}>
            <View style={styles.medLeft}>
              <View style={[styles.pillVisual, { backgroundColor: '#dee8ff' }]}>
                <View style={styles.smallWhitePill} />
              </View>
              <View>
                <Text style={styles.medCategory}>Kupewa Kutupa • Anti-Inflammatory</Text>
                <Text style={styles.medName}>Dexamethasone 4mg</Text>
                <Text style={styles.medDesc}>
                  Piritsi laling'ono loyera • Small white scored pill
                </Text>
              </View>
            </View>
            <View style={styles.takenBadge}>
              <Ionicons name="checkmark" size={14} color="#006c49" />
              <Text style={styles.takenBadgeText}>Tamwa</Text>
            </View>
          </View>

          <View style={styles.dexaBox}>
            <View style={styles.dexaLeft}>
              <Ionicons name="calendar" size={18} color="#006c49" />
              <Text style={styles.dexaText}>Tsiku 2 pa Masiku 3 a Chemo</Text>
            </View>
            <Text style={styles.dexaTime}>08:00 AM ndi chakudya</Text>
          </View>
        </View>

        {/* Pharmacy / Refill */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="medical" size={22} color="#0058be" />
            <Text style={styles.sectionTitle}>Malo Otengera Mankhwala</Text>
          </View>
          <View style={styles.availableBadge}>
            <Text style={styles.availableText}>Mankhwala Alipo</Text>
          </View>
        </View>

        <View style={styles.pharmacyCard}>
          <View style={styles.pharmacyHeader}>
            <View>
              <Text style={styles.pharmacyName}>Chipoka Health Centre</Text>
              <Text style={styles.pharmacySub}>
                Boma la Salima • Salima District Health Link
              </Text>
            </View>
            <View style={styles.pharmacyIcon}>
              <Ionicons name="business" size={20} color="#0058be" />
            </View>
          </View>

          <View style={styles.pharmacyDetails}>
            <View style={styles.detailRow}>
              <Ionicons name="calendar" size={16} color="#0058be" />
              <Text style={styles.detailText}>
                Tsiku Lolandira: <Text style={{ fontWeight: '700' }}>Lolemba, 28 October 2024</Text>
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="checkmark-circle" size={16} color="#006c49" />
              <Text style={[styles.detailText, { color: '#006c49', fontWeight: '600' }]}>
                Phukusi lanu lakonzedwa kale ndi KCH Pharmacy
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.refillBtn}
            onPress={() =>
              Alert.alert('Pempho Latumizidwa', 'SMS will be sent when ready at Chipoka.')
            }
          >
            <Ionicons name="chatbubble" size={18} color="#FFFFFF" />
            <Text style={styles.refillBtnText}>Funsani Kuti Akonzeretu Mankhwala</Text>
          </TouchableOpacity>
          <Text style={styles.refillNote}>
            Mupeza uthenga wa SMS phukusi likakhala lokonzeka ku Chipoka dispensary.
          </Text>
        </View>

        {/* Urgent Warning */}
        <View style={styles.urgentCard}>
          <View style={styles.urgentHeader}>
            <View style={styles.urgentIcon}>
              <Ionicons name="alert-circle" size={22} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.urgentLabel}>Chofunika Kwambiri • Urgent Warning</Text>
              <Text style={styles.urgentTitle}>
                Mukumva kulephera kumeza kapena kutentha thupi kwambiri?
              </Text>
            </View>
          </View>
          <Text style={styles.urgentBody}>
            Ngati thupi latenga moto (Fever &gt; 38°C), kusanza kosalekeza, kapena kumeza
            kukuvutani kwambiri, musadikire.
          </Text>

          <TouchableOpacity
            style={styles.sosBtnFull}
            onPress={() => navigation?.navigate?.('Triage')}
          >
            <Ionicons name="medkit" size={18} color="#FFFFFF" />
            <Text style={styles.sosBtnText}>Kufunika Thandizo Mwachangu (SOS Triage)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.callBtn}
            onPress={() => Alert.alert('Calling', 'Connecting to Sister Grace...')}
          >
            <Ionicons name="call" size={18} color="#ba1a1a" />
            <Text style={styles.callBtnText}>Imbirani Sister Grace (KCH Oncology Hotline)</Text>
          </TouchableOpacity>
        </View>

        {/* Footer note */}
        <View style={styles.footerNote}>
          <Ionicons name="people" size={16} color="#0058be" />
          <Text style={styles.footerText}>
            Tikondane: Wosamalira wanu <Text style={{ fontWeight: '700' }}>John Banda</Text>{' '}
            amalandiranso mauthenga a mankhwalawa.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f9f9ff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(249,249,255,0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#e7eeff',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d8e2ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  brandName: { fontSize: 16, fontWeight: '700', color: '#0058be' },
  careBadge: {
    backgroundColor: '#6cf8bb',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  careBadgeText: { fontSize: 10, fontWeight: '700', color: '#002113' },
  patientRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  patientName: { fontSize: 12, color: '#6B7380', fontWeight: '500' },
  dot: { fontSize: 10, color: '#9AA3AF' },
  kchNumber: { fontSize: 12, color: '#0058be', fontWeight: '600' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  langBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dee8ff',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 2,
  },
  langActive: { fontSize: 12, fontWeight: '700', color: '#0058be' },
  langSlash: { fontSize: 12, color: '#9AA3AF' },
  langInactive: { fontSize: 12, color: '#6B7380' },
  sosBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ba1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0058be',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: { padding: 16, paddingBottom: 40 },

  // Progress Card
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  progressTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  greenDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#006c49' },
  dateText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#006c49',
    textTransform: 'uppercase',
  },
  progressTitle: { fontSize: 20, fontWeight: '700', color: '#111c2d', marginTop: 4 },
  progressSub: { fontSize: 13, color: '#6B7380', marginTop: 2 },
  progressCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 6,
    borderColor: '#6cf8bb',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f3ff',
  },
  progressPercent: { fontSize: 16, fontWeight: '700', color: '#111c2d' },
  progressLeft: { fontSize: 9, color: '#6B7380', fontWeight: '600' },
  audioCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d8e2ff',
    borderRadius: 14,
    padding: 12,
    gap: 10,
  },
  audioBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0058be',
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioTitle: { fontSize: 14, fontWeight: '700', color: '#001a42' },
  audioSub: { fontSize: 12, color: '#004395' },
  chichewaBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  chichewaText: { fontSize: 11, fontWeight: '700', color: '#0058be' },

  // Section
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#111c2d' },
  sectionLabel: { fontSize: 12, color: '#6B7380' },

  // Med Card
  medCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  medHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  medLeft: { flexDirection: 'row', gap: 12, flex: 1 },
  pillVisual: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinkPill: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fca5a5',
  },
  whitePill: {
    width: 32,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#c2c6d6',
  },
  smallWhitePill: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#c2c6d6',
  },
  medCategory: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0058be',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  medName: { fontSize: 17, fontWeight: '700', color: '#111c2d', marginTop: 2 },
  medDesc: { fontSize: 12, color: '#6B7380', marginTop: 2 },
  takenBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#6cf8bb',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  takenBadgeText: { fontSize: 12, fontWeight: '700', color: '#002113' },
  prnBadge: {
    backgroundColor: '#dee8ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  prnText: { fontSize: 12, fontWeight: '700', color: '#111c2d' },
  guidanceBox: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#f0f3ff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  guidanceText: { flex: 1, fontSize: 13, color: '#424754', lineHeight: 18 },
  doseRow: { flexDirection: 'row', gap: 10 },
  doseCardTaken: {
    flex: 1,
    backgroundColor: 'rgba(108,248,187,0.25)',
    borderRadius: 12,
    padding: 12,
  },
  doseCardPending: {
    flex: 1,
    backgroundColor: '#dee8ff',
    borderRadius: 12,
    padding: 12,
  },
  doseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  doseTime: { fontSize: 12, fontWeight: '700', color: '#111c2d' },
  doseStatusTaken: { fontSize: 12, fontWeight: '700', color: '#006c49' },
  doseStatusPending: { fontSize: 12, fontWeight: '600', color: '#825100' },
  doseNote: { fontSize: 11, color: '#6B7380', marginTop: 2 },
  takeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#0058be',
    borderRadius: 20,
    paddingVertical: 8,
    marginTop: 8,
  },
  takeBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },

  // Paracetamol extras
  timerBox: {
    backgroundColor: '#f0f3ff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  timerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timerLabel: { fontSize: 13, color: '#424754' },
  lockRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  lockText: { fontSize: 12, fontWeight: '700', color: '#006c49' },
  progressBar: {
    height: 6,
    backgroundColor: '#dee8ff',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: { height: '100%', backgroundColor: '#0058be', borderRadius: 3 },
  timerNote: { fontSize: 11, color: '#6B7380' },
  warningBox: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#ffddb8',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  warningText: { flex: 1, fontSize: 13, color: '#653e00', lineHeight: 18 },
  disabledBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#dee8ff',
    borderRadius: 24,
    paddingVertical: 14,
    opacity: 0.8,
  },
  disabledBtnText: { fontSize: 14, fontWeight: '700', color: '#6B7380' },

  // Dexamethasone
  dexaBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f3ff',
    borderRadius: 12,
    padding: 12,
  },
  dexaLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dexaText: { fontSize: 13, fontWeight: '600', color: '#111c2d' },
  dexaTime: { fontSize: 12, color: '#6B7380' },

  // Pharmacy
  availableBadge: {
    backgroundColor: '#6cf8bb',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  availableText: { fontSize: 11, fontWeight: '700', color: '#002113' },
  pharmacyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  pharmacyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  pharmacyName: { fontSize: 17, fontWeight: '700', color: '#111c2d' },
  pharmacySub: { fontSize: 13, color: '#6B7380', marginTop: 2 },
  pharmacyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d8e2ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pharmacyDetails: { gap: 8, marginBottom: 16 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  detailText: { fontSize: 13, color: '#111c2d', flex: 1 },
  refillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#0058be',
    borderRadius: 28,
    paddingVertical: 14,
    marginBottom: 8,
  },
  refillBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  refillNote: {
    fontSize: 12,
    color: '#6B7380',
    textAlign: 'center',
  },

  // Urgent
  urgentCard: {
    backgroundColor: '#ffdad6',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  urgentHeader: { flexDirection: 'row', gap: 12, marginBottom: 10 },
  urgentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ba1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  urgentLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ba1a1a',
    textTransform: 'uppercase',
  },
  urgentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#410002',
    marginTop: 2,
    lineHeight: 22,
  },
  urgentBody: {
    fontSize: 13,
    color: '#410002',
    lineHeight: 19,
    marginBottom: 14,
  },
  sosBtnFull: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#ba1a1a',
    borderRadius: 24,
    paddingVertical: 14,
    marginBottom: 10,
  },
  sosBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 14,
  },
  callBtnText: { color: '#ba1a1a', fontSize: 14, fontWeight: '700' },

  // Footer
  footerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#6B7380',
    textAlign: 'center',
    flex: 1,
  },
});