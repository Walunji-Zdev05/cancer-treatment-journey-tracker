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
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '../components/AppHeader';

const FILTERS = [
  { id: 'all', label: 'All Stories (Zonse)', icon: 'book' },
  { id: 'breast', label: 'Breast Ca (Monga Ine)' },
  { id: 'new', label: 'Angoyamba (Newly Diagnosed)' },
  { id: 'treatment', label: 'Ali pa Mankhwala (In Treatment)' },
  { id: 'survivor', label: 'Opulumuka 5+ Yrs' },
  { id: 'caregiver', label: 'Asamaliri (Caregivers)' },
  { id: 'qa', label: 'Mafunso (Q&A)' },
];

export default function CommunityScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [liked, setLiked] = useState({});

  const toggleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <AppHeader
    navigation={navigation}
    title="Community / Gulu"
    //showSearch={true}
    showNotifications={true}
    //showSos={true}
  />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Welcome Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerBadge}>
            <Ionicons name="hand-left" size={14} color="#0058be" />
            <Text style={styles.bannerBadgeText}>Banja la Tikondane</Text>
          </View>
          <Text style={styles.bannerTitle}>
            Nkhani za Opulumuka & Thandizo
          </Text>
          <Text style={styles.bannerSub}>
            Stories of Hope, Strength & Honest Journeys. Simuli nokha
            m'ulendowu—werengani nkhani za anzanji kapena funsani mwaufulu.
          </Text>

          <View style={styles.bannerActions}>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => navigation.navigate('ShareStory')}
            >
              <Ionicons name="create-outline" size={18} color="#FFFFFF" />
              <Text style={styles.primaryBtnText}>Gawani Nkhani</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => navigation.navigate('ShareStory')}
            >
              <Ionicons name="help-circle-outline" size={18} color="#0058be" />
              <Text style={styles.secondaryBtnText}>Funsani Gulu</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Privacy Notice */}
        <View style={styles.privacyBox}>
          <Ionicons name="shield-checkmark" size={18} color="#0058be" />
          <View style={{ flex: 1 }}>
            <Text style={styles.privacyTitle}>Chitetezo Chanu (Safe Peer Space)</Text>
            <Text style={styles.privacyText}>
              Posts are peer-supported & gently reviewed by nurse navigators. No
              clinical records are shared. Emergency? Imbani kwaulere:{' '}
              <Text style={styles.privacyLink}>800-265</Text>.
            </Text>
          </View>
        </View>

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f.id}
              style={[
                styles.chip,
                activeFilter === f.id && styles.chipActive,
              ]}
              onPress={() => setActiveFilter(f.id)}
            >
              {f.icon && (
                <Ionicons
                  name={f.icon}
                  size={14}
                  color={activeFilter === f.id ? '#FFFFFF' : '#111c2d'}
                />
              )}
              <Text
                style={[
                  styles.chipText,
                  activeFilter === f.id && styles.chipTextActive,
                ]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ========== STORY 1: Mercy K. ========== */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('StoryDetail')}
        >
          <View style={styles.authorRow}>
            <View style={styles.avatarMK}>
              <Text style={styles.avatarText}>MK</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.nameRow}>
                <Text style={styles.authorName}>Mercy K.</Text>
                <Ionicons name="checkmark-circle" size={14} color="#0058be" />
              </View>
              <Text style={styles.authorMeta}>Breast Ca, Stage IIB • Salima</Text>
            </View>
            <View style={styles.survivorBadge}>
              <Ionicons name="leaf" size={12} color="#006c49" />
              <Text style={styles.survivorText}>Survivor 3+ Yrs</Text>
            </View>
          </View>

          <Text style={styles.storyBody}>
            “Lachinayi loyamba la chemo ndinali ndi mantha kwambiri ku Ward 3B ku
            Chipatala. Koma Sister Grace anandiuza kuti mpweya uliwonse ndi
            sitepe ya moyo. Lero ndikudya bwino ndipo tsitsi langa likubwerera
            mwamphamvu...”
          </Text>
          <Text style={styles.storyEn}>
            “First Thursday of chemo I was terrified at Ward 3B. But another
            mother laughed with me and gave me courage. Today my hair is
            returning.”
          </Text>

          <View style={styles.audioRow}>
            <TouchableOpacity style={styles.playBtn}>
              <Ionicons name="play" size={18} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <View style={styles.audioMeta}>
                <Text style={styles.audioLabel}>Mverani Nkhani (Chichewa Voice)</Text>
                <Text style={styles.audioTime}>1:30 min</Text>
              </View>
              <View style={styles.waveform}>
                {[2, 3, 1.5, 2.5, 3.5, 2, 1.5, 3, 1].map((h, i) => (
                  <View
                    key={i}
                    style={[
                      styles.waveBar,
                      { height: h * 4, opacity: i < 5 ? 1 : 0.4 },
                    ]}
                  />
                ))}
              </View>
            </View>
          </View>

          <View style={styles.tags}>
            {['#FirstCycleFears', '#SalimaJourney', '#FoodAfterChemo'].map((t) => (
              <View key={t} style={styles.tag}>
                <Text style={styles.tagText}>{t}</Text>
              </View>
            ))}
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.likeBtn, liked['mercy'] && styles.likeBtnActive]}
              onPress={() => toggleLike('mercy')}
            >
              <Ionicons
                name="heart"
                size={16}
                color={liked['mercy'] ? '#FFFFFF' : '#0058be'}
              />
              <Text
                style={[
                  styles.likeText,
                  liked['mercy'] && styles.likeTextActive,
                ]}
              >
                Zandilimbikitsa (42)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.commentBtn}>
              <Ionicons name="chatbubble-outline" size={16} color="#6B7380" />
              <Text style={styles.commentText}>14 mayankho</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareBtn}>
              <Ionicons name="share-outline" size={18} color="#6B7380" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* ========== STORY 2: Question ========== */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('StoryDetail')}
        >
          <View style={styles.authorRow}>
            <View style={styles.avatarShield}>
              <Ionicons name="shield" size={22} color="#0058be" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.authorName}>Wodwala Wachinsinsi</Text>
              <Text style={styles.authorMeta}>
                Cervical Ca, Cycle 2 • Lilongwe
              </Text>
            </View>
            <View style={styles.questionBadge}>
              <Ionicons name="help-circle" size={12} color="#653e00" />
              <Text style={styles.questionText}>Funso / Question</Text>
            </View>
          </View>

          <Text style={styles.questionTitle}>
            Kodi alipo amene anasowa chilakolako chodya pa Cycle 2?
          </Text>
          <Text style={styles.storyBody}>
            “Phala la mgaiwa silikulowa bwino, pakamwa pakumva kukoma ngati
            chitsulo. Kodi mumatani kuti mupeze mphamvu m'thupi popanda kusanza?”
          </Text>
          <Text style={styles.storyEn}>
            “Porridge tastes like metal and won't go down. How do you keep your
            energy up without nausea?”
          </Text>

          <View style={styles.replyBox}>
            <View style={styles.replyHeader}>
              <Ionicons name="checkmark-circle" size={14} color="#006c49" />
              <Text style={styles.replyAuthor}>
                Sister Chifundo (Nurse Navigator) & 2 survivors:
              </Text>
            </View>
            <Text style={styles.replyBody}>
              “Yesesani kudya nthochi yakupsa kapena mbatata yophika
              pang'onopang'ono. Osadya chakudya chotentha kwambiri, dikirani
              chizizire kaye.”
            </Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.likeBtn}>
              <Ionicons name="thumbs-up-outline" size={16} color="#111c2d" />
              <Text style={styles.likeTextDark}>Zandithandiza (18)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.replyBtn}>
              <Ionicons name="arrow-undo" size={16} color="#0058be" />
              <Text style={styles.replyBtnText}>Yankhani (8 replies)</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* ========== STORY 3: Caregiver ========== */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('StoryDetail')}
        >
          <View style={styles.authorRow}>
            <View style={styles.avatarBJ}>
              <Text style={styles.avatarTextGreen}>BJ</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.nameRow}>
                <Text style={styles.authorName}>Baba James</Text>
                <Text style={styles.caregiverLabel}>(Msamaliri)</Text>
              </View>
              <Text style={styles.authorMeta}>Dedza • KCH Referral</Text>
            </View>
            <View style={styles.caregiverBadge}>
              <Ionicons name="handshake" size={12} color="#0058be" />
              <Text style={styles.caregiverBadgeText}>Caregiver Voice</Text>
            </View>
          </View>

          <Text style={styles.storyBody}>
            “Kusamalira mkazi wanga pamene akudwala kunandiphunzitsa kukoma mtima
            kwambiri. Tikamabwera ku chipatala, ndimanyamula madzi a m'botolo
            ozizira ndi chitenge chowunda choti afunde pa infusion...”
          </Text>
          <Text style={styles.storyEn}>
            “Caring for my wife taught me deep gentleness. When traveling to the
            referral center, packing cold water and a soft warm chitenge makes
            all the difference.”
          </Text>

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.likeBtn, liked['james'] && styles.likeBtnActive]}
              onPress={() => toggleLike('james')}
            >
              <Ionicons
                name="heart"
                size={16}
                color={liked['james'] ? '#FFFFFF' : '#0058be'}
              />
              <Text
                style={[
                  styles.likeText,
                  liked['james'] && styles.likeTextActive,
                ]}
              >
                Zandilimbikitsa (31)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.commentBtn}>
              <Ionicons name="chatbubble-outline" size={16} color="#6B7380" />
              <Text style={styles.commentText}>9 comments</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* ========== STORY 4: Audio Spotlight ========== */}
        <TouchableOpacity
          style={[styles.card, styles.spotlightCard]}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('StoryDetail')}
        >
          <View style={styles.authorRow}>
            <View style={styles.avatarSpotlight}>
              <Ionicons name="person" size={22} color="#0058be" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.authorName}>Mai Alineti</Text>
              <Text style={styles.authorMeta}>Survivor 4 Yrs • Mzimba</Text>
            </View>
            <View style={styles.spotlightBadge}>
              <Ionicons name="headset" size={12} color="#FFFFFF" />
              <Text style={styles.spotlightText}>Spotlight</Text>
            </View>
          </View>

          <Text style={styles.spotlightTitle}>
            “Mmene Ndinagonjetsera Mantha a Opaleshoni”
          </Text>
          <Text style={styles.spotlightSub}>
            Overcoming fear of mastectomy surgery and finding self-worth through
            my village choir.
          </Text>

          <View style={styles.bigAudio}>
            <TouchableOpacity style={styles.bigPlayBtn}>
              <Ionicons name="volume-high" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <View style={styles.audioMeta}>
                <Text style={styles.bigAudioLabel}>Mverani Nkhani m'Chichewa</Text>
                <Text style={styles.audioTime}>2:45</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: '33%' }]} />
              </View>
            </View>
          </View>

          <View style={styles.actions}>
            <View style={styles.listens}>
              <Ionicons name="ear-outline" size={14} color="#6B7380" />
              <Text style={styles.listensText}>184 anthu amvera</Text>
            </View>
            <TouchableOpacity style={styles.saveBtn}>
              <Ionicons name="bookmark-outline" size={16} color="#0058be" />
              <Text style={styles.saveText}>Sungani (Save)</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerIcon}>
            <Ionicons name="leaf" size={16} color="#0058be" />
          </View>
          <Text style={styles.footerTitle}>
            Tikondane: Ndife Amodzi m'Ulendowu
          </Text>
          <Text style={styles.footerSub}>
            Muli ndi nkhani yomwe ingalimbikitse mnzanu lero? Tili okonzeka
            kumvera.
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
    backgroundColor: 'rgba(249,249,255,0.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#e7eeff',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#d8e2ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  brandName: { fontSize: 14, fontWeight: '700', color: '#0058be' },
  brandCare: { fontSize: 12, color: '#6B7380' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#111c2d' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  langBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e7eeff',
    borderRadius: 16,
    padding: 4,
  },
  langActive: {
    backgroundColor: '#0058be',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  langActiveText: { fontSize: 11, fontWeight: '700', color: '#FFFFFF' },
  langInactive: { fontSize: 11, color: '#6B7380', paddingHorizontal: 6 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f3ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0058be',
  },
  scroll: { paddingBottom: 40 },

  banner: {
    margin: 16,
    backgroundColor: '#e7eeff',
    borderRadius: 16,
    padding: 16,
  },
  bannerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#dee8ff',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10,
  },
  bannerBadgeText: { fontSize: 11, fontWeight: '700', color: '#0058be' },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111c2d',
    marginBottom: 6,
  },
  bannerSub: { fontSize: 13, color: '#6B7380', lineHeight: 19, marginBottom: 14 },
  bannerActions: { flexDirection: 'row', gap: 10 },
  primaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#0058be',
    borderRadius: 24,
    paddingVertical: 12,
  },
  primaryBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  secondaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#dee8ff',
    borderRadius: 24,
    paddingVertical: 12,
  },
  secondaryBtnText: { color: '#0058be', fontSize: 13, fontWeight: '700' },

  privacyBox: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#f0f3ff',
    borderRadius: 12,
    padding: 12,
  },
  privacyTitle: { fontSize: 12, fontWeight: '700', color: '#111c2d' },
  privacyText: { fontSize: 12, color: '#6B7380', lineHeight: 17, marginTop: 2 },
  privacyLink: { color: '#0058be', fontWeight: '700', textDecorationLine: 'underline' },

  filters: { paddingHorizontal: 16, paddingVertical: 8, gap: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#e7eeff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
  },
  chipActive: { backgroundColor: '#0058be' },
  chipText: { fontSize: 12, fontWeight: '600', color: '#111c2d' },
  chipTextActive: { color: '#FFFFFF' },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  avatarMK: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffddb8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontSize: 16, fontWeight: '700', color: '#653e00' },
  avatarShield: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#dee8ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarBJ: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6ffbbe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarTextGreen: { fontSize: 16, fontWeight: '700', color: '#002113' },
  avatarSpotlight: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#d8e2ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  authorName: { fontSize: 14, fontWeight: '700', color: '#111c2d' },
  authorMeta: { fontSize: 12, color: '#6B7380' },
  caregiverLabel: { fontSize: 12, color: '#6B7380' },
  survivorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#6cf8bb',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  survivorText: { fontSize: 11, fontWeight: '700', color: '#002113' },
  questionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ffddb8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  questionText: { fontSize: 11, fontWeight: '700', color: '#653e00' },
  caregiverBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#dee8ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  caregiverBadgeText: { fontSize: 11, fontWeight: '700', color: '#0058be' },
  storyBody: {
    fontSize: 15,
    color: '#111c2d',
    lineHeight: 22,
    marginBottom: 6,
  },
  storyEn: {
    fontSize: 13,
    color: '#6B7380',
    fontStyle: 'italic',
    lineHeight: 18,
    marginBottom: 12,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111c2d',
    marginBottom: 8,
  },

  audioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#f0f3ff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },
  playBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0058be',
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  audioLabel: { fontSize: 12, fontWeight: '600', color: '#111c2d' },
  audioTime: { fontSize: 11, color: '#6B7380' },
  waveform: { flexDirection: 'row', alignItems: 'center', gap: 3, height: 14 },
  waveBar: { width: 3, borderRadius: 2, backgroundColor: '#0058be' },

  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  tag: {
    backgroundColor: '#e7eeff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  tagText: { fontSize: 11, fontWeight: '600', color: '#0058be' },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  likeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f0f3ff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  likeBtnActive: { backgroundColor: '#0058be' },
  likeText: { fontSize: 12, fontWeight: '600', color: '#0058be' },
  likeTextActive: { color: '#FFFFFF' },
  likeTextDark: { fontSize: 12, fontWeight: '600', color: '#111c2d' },
  commentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
  },
  commentText: { fontSize: 12, color: '#6B7380' },
  shareBtn: { padding: 8 },
  replyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#dee8ff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  replyBtnText: { fontSize: 12, fontWeight: '600', color: '#0058be' },

  replyBox: {
    backgroundColor: '#f0f3ff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  replyHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  replyAuthor: { fontSize: 12, fontWeight: '700', color: '#111c2d', flex: 1 },
  replyBody: { fontSize: 13, color: '#6B7380', lineHeight: 18 },

  spotlightCard: { backgroundColor: '#dee8ff' },
  spotlightBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#0058be',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  spotlightText: { fontSize: 11, fontWeight: '700', color: '#FFFFFF' },
  spotlightTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111c2d',
    marginBottom: 4,
  },
  spotlightSub: { fontSize: 13, color: '#6B7380', marginBottom: 12 },
  bigAudio: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  bigPlayBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0058be',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigAudioLabel: { fontSize: 13, fontWeight: '700', color: '#111c2d' },
  progressTrack: {
    height: 4,
    backgroundColor: '#e7eeff',
    borderRadius: 2,
    marginTop: 6,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: '#0058be', borderRadius: 2 },
  listens: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  listensText: { fontSize: 12, color: '#6B7380' },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
  },
  saveText: { fontSize: 12, fontWeight: '600', color: '#0058be' },

  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 32,
  },
  footerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e7eeff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  footerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111c2d',
    marginBottom: 4,
  },
  footerSub: {
    fontSize: 13,
    color: '#6B7380',
    textAlign: 'center',
    lineHeight: 18,
  },
});