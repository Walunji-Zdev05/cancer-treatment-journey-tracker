import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AppHeader from '../components/AppHeader';

export default function SupportScreen({ navigation }) {
  const [showTicket, setShowTicket] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rsvp, setRsvp] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
    navigation={navigation}
    title="Thandizo & Chithandizo"
    showSos={true}
  />

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Page Title */}
        <View style={styles.titleBlock}>
          <View style={styles.supportBadge}>
            <Ionicons name="hand-left" size={14} color="#006c49" />
            <Text style={styles.supportBadgeText}>Thandizo • Support Aid</Text>
          </View>
          <Text style={styles.pageTitle}>Thandizo & Chithandizo Cha Anthu</Text>
          <Text style={styles.pageSub}>
            Travel subsidies, clinical navigators, and community love for Alineti Banda.
          </Text>
          <Text style={styles.pageSubHighlight}>
            Tikukondani ndipo sitikusiyani nokha. (You are not alone).
          </Text>
        </View>

        {/* ========== 1. CHIKONDI TRAVEL FUND ========== */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="bus" size={22} color="#0058be" />
            <Text style={styles.sectionTitle}>Chikondi Travel Fund</Text>
          </View>
          <View style={styles.approvedBadge}>
            <Ionicons name="checkmark-circle" size={14} color="#006c49" />
            <Text style={styles.approvedText}>Yavomerezedwa</Text>
          </View>
        </View>

        <View style={styles.card}>
          {/* Route + Amount */}
          <View style={styles.routeHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.routeLabel}>Ulendo / Round Trip</Text>
              <Text style={styles.routeTitle}>Salima → KCH Ward 3B</Text>
              <Text style={styles.routeSub}>Lilongwe Oncology Centre</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.routeLabel}>Ndalama / Amount</Text>
              <Text style={styles.amount}>MWK 14,000</Text>
              <Text style={styles.paidText}>Ulendowu Walipidwa</Text>
            </View>
          </View>

          {/* Route Visual */}
          <View style={styles.routeVisual}>
            <View style={styles.routePoint}>
              <View style={styles.pointCircleBlue}>
                <Ionicons name="location" size={16} color="#0058be" />
              </View>
              <Text style={styles.pointName}>Salima</Text>
              <Text style={styles.pointSub}>Chipoka Stage</Text>
            </View>

            <View style={styles.routeLine}>
              <View style={styles.line} />
              <Ionicons name="bus" size={18} color="#0058be" />
              <View style={styles.line} />
              <Text style={styles.distance}>110 km • Minibus</Text>
            </View>

            <View style={styles.routePoint}>
              <View style={styles.pointCircleGreen}>
                <Ionicons name="medkit" size={16} color="#006c49" />
              </View>
              <Text style={styles.pointName}>KCH</Text>
              <Text style={styles.pointSub}>Ward 3B Day Clinic</Text>
            </View>
          </View>

          {/* Airtel Money */}
          <View style={styles.moneyRow}>
            <View style={styles.walletIcon}>
              <Ionicons name="wallet" size={20} color="#ba1a1a" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.moneyTitle}>Sent to Airtel Money</Text>
              <Text style={styles.moneyNumber}>+265 999 412 804 (Alineti Banda)</Text>
            </View>
            <Ionicons name="checkmark-circle" size={20} color="#006c49" />
          </View>

          {/* Digital Bus Pass */}
          <View style={styles.ticketBox}>
            <View style={styles.ticketCodeRow}>
              <Text style={styles.ticketLabel}>Digital Bus Pass Code:</Text>
              <View style={styles.codeBadge}>
                <Text style={styles.codeText}>TKD-7702-SLM</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.showTicketBtn}
              onPress={() => setShowTicket(!showTicket)}
            >
              <Ionicons name="qr-code" size={20} color="#FFFFFF" />
              <Text style={styles.showTicketText}>
                {showTicket ? 'Hide Ticket' : 'Onetsani Tikiti la Basi (Show Ticket)'}
              </Text>
            </TouchableOpacity>

            {showTicket && (
              <View style={styles.ticketModal}>
                <Text style={styles.ticketModalTitle}>Chikondi Bus Voucher</Text>
                <View style={styles.qrBox}>
                  <Ionicons name="qr-code" size={80} color="#111c2d" />
                  <Text style={styles.qrCode}>TKD-7702-SLM</Text>
                </View>
                <Text style={styles.ticketName}>Alineti Banda • KCH-4092</Text>
                <Text style={styles.ticketNote}>
                  Tikiti lothandizidwa ndi Ministry of Health & Tikondane Care Fund.
                  Musalipire ndalama yowonjezera.
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={styles.rescheduleBtn}
            onPress={() => Alert.alert('Request Sent', 'Travel aid for new date requested.')}
          >
            <Ionicons name="calendar" size={16} color="#0058be" />
            <Text style={styles.rescheduleText}>
              Pemphani Thandizo la Ulendo Watsopano
            </Text>
          </TouchableOpacity>
        </View>

        {/* ========== 2. CARE TEAM ========== */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="medkit" size={22} color="#0058be" />
            <Text style={styles.sectionTitle}>Otsogolera Kuchipatala</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.nurseRow}>
            <View style={styles.nurseAvatar}>
              <Ionicons name="person" size={28} color="#0058be" />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.nurseNameRow}>
                <Text style={styles.nurseName}>Sister Grace Phiri, RN</Text>
                <View style={styles.leadBadge}>
                  <Text style={styles.leadText}>Lead Navigator</Text>
                </View>
              </View>
              <Text style={styles.nurseRole}>Ward 3B Chemotherapy Day Clinic • KCH</Text>
              <Text style={styles.onDuty}>Ikupezeka lero (On Duty Today)</Text>
            </View>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.callBtn}
              onPress={() => Alert.alert('Calling', 'Connecting to 800-265...')}
            >
              <Ionicons name="call" size={18} color="#FFFFFF" />
              <Text style={styles.callBtnText}>Imbani Foni (800-265)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.smsBtn}
              onPress={() => {
                setSmsSent(true);
                Alert.alert('Uthenga Watumizidwa', 'Sister Grace will call you soon.');
              }}
            >
              <Ionicons name="chatbubble" size={18} color="#0058be" />
              <Text style={styles.smsBtnText}>Tumizani Uthenga</Text>
            </TouchableOpacity>
          </View>

          {smsSent && (
            <View style={styles.smsBanner}>
              <Ionicons name="checkmark-circle" size={16} color="#006c49" />
              <Text style={styles.smsBannerText}>
                Uthenga watumizidwa kwa Sister Grace. Akuyimbirani posachedwa!
              </Text>
            </View>
          )}

          {/* HSA */}
          <View style={styles.hsaRow}>
            <View style={styles.hsaLeft}>
              <View style={styles.hsaIcon}>
                <Ionicons name="navigate" size={18} color="#0058be" />
              </View>
              <View>
                <Text style={styles.hsaLabel}>HSA Wanu wa m'Dera (Salima)</Text>
                <Text style={styles.hsaName}>Emmanuel Zimba</Text>
                <Text style={styles.hsaZone}>Chipoka Health Zone</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.hsaCallBtn}
              onPress={() => Alert.alert('Calling', 'Connecting to Emmanuel Zimba...')}
            >
              <Ionicons name="call" size={14} color="#0058be" />
              <Text style={styles.hsaCallText}>Imbani</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ========== 3. PEER SUPPORT ========== */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="people" size={22} color="#0058be" />
            <Text style={styles.sectionTitle}>Gulu la Tikondane Salima</Text>
          </View>
          <Text style={styles.everySaturday}>Sautere iliyonse</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.communityImage}>
            <Ionicons name="people-circle" size={48} color="#0058be" />
            <Text style={styles.communityLabel}>Amayi ndi Abale Othandizana</Text>
          </View>

          <View style={styles.meetingHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.meetingTitle}>Msonkhano wa Sabata Ino</Text>
              <Text style={styles.meetingPlace}>Chipoka Catholic Parish Hall, Salima</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <View style={styles.dayBadge}>
                <Text style={styles.dayText}>Loweruka (Sat)</Text>
              </View>
              <Text style={styles.meetingTime}>10:00 AM</Text>
            </View>
          </View>

          <Text style={styles.meetingDesc}>
            Bwerani tidzakambirane za kapezedwe ka chakudya chabwino pa nthawi ya
            mankhwala, komanso kulimbikitsana mitima mu mpingo.
          </Text>

          {/* Audio Story */}
          <View style={styles.audioCard}>
            <View style={styles.audioHeader}>
              <View style={styles.audioTitleRow}>
                <Ionicons name="mic" size={18} color="#0058be" />
                <Text style={styles.audioTitle}>Uthenga wa Chiyembekezo</Text>
              </View>
              <Text style={styles.audioDuration}>03:45 mins</Text>
            </View>

            <View style={styles.audioPlayer}>
              <TouchableOpacity
                style={styles.playBtn}
                onPress={() => setIsPlaying(!isPlaying)}
              >
                <Ionicons
                  name={isPlaying ? 'pause' : 'play'}
                  size={22}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <Text style={styles.storyTitle}>Mverani Nkhani ya Mai Mwale</Text>
                <Text style={styles.storySub}>
                  "Momwe ndinagonjetsera nthendayi ku KCH"
                </Text>
                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: isPlaying ? '65%' : '25%' },
                    ]}
                  />
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.rsvpBtn, rsvp && styles.rsvpBtnActive]}
            onPress={() => setRsvp(!rsvp)}
          >
            <Ionicons
              name={rsvp ? 'checkmark-circle' : 'person-add'}
              size={18}
              color={rsvp ? '#006c49' : '#111c2d'}
            />
            <Text style={[styles.rsvpText, rsvp && styles.rsvpTextActive]}>
              {rsvp
                ? 'Mwalembetsa! Tidzakulandirani'
                : 'Ndidzapezekapo (I will attend this Saturday)'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ========== 4. URGENT BANNER ========== */}
        <View style={styles.urgentCard}>
          <View style={styles.urgentHeader}>
            <View style={styles.urgentIcon}>
              <Ionicons name="warning" size={22} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.urgentTitle}>
                Mukufuna Thandizo Lofunika Kwambiri?
              </Text>
              <Text style={styles.urgentBody}>
                Kodi mukuwona kutentha kwambiri thupi (fever &gt; 38°C), kusanza
                kosalekeza, kapena kufooka kwambiri?
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.emergencyBtn}
            onPress={() => navigation?.navigate?.('Triage')}
          >
            <Ionicons name="alert-circle" size={20} color="#FFFFFF" />
            <Text style={styles.emergencyBtnText}>
              ZADZIDZIDZI (Emergency Triage)
            </Text>
          </TouchableOpacity>

          <Text style={styles.tollFreeNote}>
            Izi ndi zaulere ndipo sizifuna ma unit (Toll-Free Call)
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

  // Title
  titleBlock: { marginBottom: 20 },
  supportBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#6cf8bb',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10,
  },
  supportBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#002113',
    textTransform: 'uppercase',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111c2d',
    marginBottom: 6,
  },
  pageSub: { fontSize: 13, color: '#6B7380', lineHeight: 19 },
  pageSubHighlight: {
    fontSize: 13,
    color: '#0058be',
    fontWeight: '600',
    marginTop: 4,
  },

  // Section
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#111c2d' },
  approvedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#6cf8bb',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  approvedText: { fontSize: 11, fontWeight: '700', color: '#002113' },
  everySaturday: { fontSize: 12, fontWeight: '600', color: '#0058be' },

  // Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  // Travel Fund
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  routeLabel: {
    fontSize: 11,
    color: '#6B7380',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  routeTitle: { fontSize: 16, fontWeight: '700', color: '#111c2d', marginTop: 2 },
  routeSub: { fontSize: 12, color: '#6B7380' },
  amount: { fontSize: 20, fontWeight: '800', color: '#0058be', marginTop: 2 },
  paidText: { fontSize: 11, fontWeight: '600', color: '#006c49' },
  routeVisual: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f3ff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  routePoint: { alignItems: 'center', width: 70 },
  pointCircleBlue: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#d8e2ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointCircleGreen: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6cf8bb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointName: { fontSize: 12, fontWeight: '700', color: '#111c2d', marginTop: 4 },
  pointSub: { fontSize: 10, color: '#6B7380' },
  routeLine: { flex: 1, alignItems: 'center' },
  line: { height: 2, backgroundColor: 'rgba(0,88,190,0.3)', width: '100%' },
  distance: { fontSize: 10, color: '#6B7380', marginTop: 4 },
  moneyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#dee8ff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  walletIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffdad6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moneyTitle: { fontSize: 13, fontWeight: '600', color: '#111c2d' },
  moneyNumber: { fontSize: 12, color: '#6B7380', fontFamily: 'monospace' },
  ticketBox: {
    backgroundColor: '#f0f3ff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  ticketCodeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  ticketLabel: { fontSize: 12, color: '#6B7380' },
  codeBadge: {
    backgroundColor: '#d8e2ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  codeText: { fontSize: 12, fontWeight: '700', color: '#0058be', fontFamily: 'monospace' },
  showTicketBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#0058be',
    borderRadius: 24,
    paddingVertical: 12,
  },
  showTicketText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  ticketModal: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  ticketModalTitle: { fontSize: 16, fontWeight: '700', color: '#111c2d', marginBottom: 12 },
  qrBox: {
    width: 140,
    height: 140,
    backgroundColor: '#f0f3ff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  qrCode: { fontSize: 11, fontFamily: 'monospace', color: '#6B7380', marginTop: 4 },
  ticketName: { fontSize: 14, fontWeight: '700', color: '#111c2d' },
  ticketNote: {
    fontSize: 12,
    color: '#6B7380',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 17,
  },
  rescheduleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#e7eeff',
    borderRadius: 22,
    paddingVertical: 11,
  },
  rescheduleText: { fontSize: 13, fontWeight: '600', color: '#0058be' },

  // Care Team
  nurseRow: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  nurseAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#d8e2ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nurseNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  nurseName: { fontSize: 16, fontWeight: '700', color: '#111c2d' },
  leadBadge: {
    backgroundColor: '#d8e2ff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  leadText: { fontSize: 10, fontWeight: '700', color: '#0058be' },
  nurseRole: { fontSize: 12, color: '#6B7380', marginTop: 2 },
  onDuty: { fontSize: 11, fontWeight: '600', color: '#006c49', marginTop: 2 },
  actionRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  callBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#006c49',
    borderRadius: 24,
    paddingVertical: 12,
  },
  callBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  smsBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#e7eeff',
    borderRadius: 24,
    paddingVertical: 12,
  },
  smsBtnText: { color: '#0058be', fontSize: 13, fontWeight: '700' },
  smsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#6cf8bb',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  smsBannerText: { flex: 1, fontSize: 12, color: '#002113', fontWeight: '500' },
  hsaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f3ff',
    borderRadius: 12,
    padding: 12,
  },
  hsaLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  hsaIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dee8ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hsaLabel: { fontSize: 11, color: '#6B7380' },
  hsaName: { fontSize: 14, fontWeight: '700', color: '#111c2d' },
  hsaZone: { fontSize: 11, color: '#6B7380' },
  hsaCallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  hsaCallText: { fontSize: 12, fontWeight: '700', color: '#0058be' },

  // Peer Support
  communityImage: {
    height: 120,
    backgroundColor: '#d8e2ff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  communityLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0058be',
    marginTop: 6,
  },
  meetingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  meetingTitle: { fontSize: 16, fontWeight: '700', color: '#111c2d' },
  meetingPlace: { fontSize: 12, color: '#6B7380', marginTop: 2 },
  dayBadge: {
    backgroundColor: '#ffddb8',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  dayText: { fontSize: 11, fontWeight: '700', color: '#653e00' },
  meetingTime: { fontSize: 13, fontWeight: '600', color: '#111c2d', marginTop: 4 },
  meetingDesc: {
    fontSize: 13,
    color: '#6B7380',
    lineHeight: 19,
    marginBottom: 14,
  },
  audioCard: {
    backgroundColor: '#f0f3ff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  audioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  audioTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  audioTitle: { fontSize: 13, fontWeight: '600', color: '#111c2d' },
  audioDuration: { fontSize: 11, color: '#6B7380', fontFamily: 'monospace' },
  audioPlayer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  playBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0058be',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyTitle: { fontSize: 13, fontWeight: '700', color: '#111c2d' },
  storySub: { fontSize: 11, color: '#6B7380', marginTop: 2 },
  progressTrack: {
    height: 4,
    backgroundColor: '#dee8ff',
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: '#0058be', borderRadius: 2 },
  rsvpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#e7eeff',
    borderRadius: 22,
    paddingVertical: 12,
  },
  rsvpBtnActive: { backgroundColor: '#6cf8bb' },
  rsvpText: { fontSize: 13, fontWeight: '600', color: '#111c2d' },
  rsvpTextActive: { color: '#002113' },

  // Urgent
  urgentCard: {
    backgroundColor: '#ffdad6',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  urgentHeader: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  urgentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ba1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  urgentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#410002',
    marginBottom: 4,
  },
  urgentBody: { fontSize: 13, color: '#410002', lineHeight: 19 },
  emergencyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#ba1a1a',
    borderRadius: 24,
    paddingVertical: 14,
    marginBottom: 8,
  },
  emergencyBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  tollFreeNote: {
    fontSize: 11,
    color: '#410002',
    textAlign: 'center',
    fontWeight: '500',
  },
});