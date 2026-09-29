import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function StoryDetailScreen({ navigation, route }) {
  // You can later pass story data via route.params
  const [bookmarked, setBookmarked] = useState(false);
  const [empathyGiven, setEmpathyGiven] = useState(false);
  const [empathyCount, setEmpathyCount] = useState(54);
  const [isPlaying, setIsPlaying] = useState(false);
  const [comment, setComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      name: 'Alineti B.',
      meta: 'Cycle 3 Chemo',
      time: 'Maola 4 apitawo',
      text: 'Zikomo kwambiri Mai Mercy. Lero ndinali kulira panyumba ndikuganiza za chemo yanga ya mawa. Mawu anu andipatsa mphamvu zobwerera ku KCH m\'mawa kwambiri.',
      likes: 12,
      liked: false,
      isNurse: false,
      nurseNote: 'Nurse Grace ndi ena 3 anayamikira',
    },
    {
      id: 2,
      name: 'Sister Grace Phiri, RN',
      meta: 'Oncology Patient Navigator • KCH',
      time: '',
      text: 'Tikukuthokozani Mercy chifukwa chogawana nkhaniyi. Kutsatira uphungu wa mandimu ndi kumwa madzi ambiri kumateteza kwambiri impso ndi nseru panthawi ya doxorubicin! Pitirizani kukhala chitsanzo.',
      likes: 29,
      liked: false,
      isNurse: true,
    },
    {
      id: 3,
      name: 'Anonymous Caregiver',
      meta: 'Salima',
      time: 'Dzulo',
      text: 'Kodi munachita bwanji pamene tsitsi linayamba kuthothoka? Mkazi wanga akuvutika maganizo ndi zimenezi ndipo akukana kupita kumalo ochezera.',
      likes: 8,
      liked: false,
      isNurse: false,
      reply: {
        name: 'Mercy Kachepa (Author)',
        text: 'Ndinavala nduwira yokongola ya chitenge chamitundu yowala! Muuzeni kuti tsitsi limabweranso labwino kwambiri pambuyo pa mankhwala. Tsopano langa lakula bwino kwambiri.',
      },
    },
  ]);

  const handleEmpathy = () => {
    if (!empathyGiven) {
      setEmpathyCount((c) => c + 1);
      setEmpathyGiven(true);
    } else {
      setEmpathyCount((c) => c - 1);
      setEmpathyGiven(false);
    }
  };

  const handleLikeComment = (id) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              liked: !c.liked,
              likes: c.liked ? c.likes - 1 : c.likes + 1,
            }
          : c
      )
    );
  };

  const handleSubmitComment = () => {
    if (!comment.trim()) return;
    const newComment = {
      id: Date.now(),
      name: isAnonymous ? 'Anonymous Caregiver' : 'Inu (You)',
      meta: 'Tikondane Community Member',
      time: 'Tsopano lino',
      text: comment.trim(),
      likes: 1,
      liked: false,
      isNurse: false,
    };
    setComments((prev) => [...prev, newComment]);
    setComment('');
    Alert.alert('Zikomo', 'Your encouragement has been shared.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => navigation?.goBack?.()}
          >
            <Ionicons name="arrow-back" size={20} color="#111c2d" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            Survivor Story Details
          </Text>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => Alert.alert('Share', 'Story link copied!')}
          >
            <Ionicons name="share-outline" size={20} color="#111c2d" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Badge + actions */}
          <View style={styles.topRow}>
            <View style={styles.storyBadge}>
              <Ionicons name="sparkles" size={14} color="#0058be" />
              <Text style={styles.storyBadgeText}>
                Nkhani ya Opulumuka / Survivor Story
              </Text>
            </View>
            <View style={styles.topActions}>
              <TouchableOpacity
                style={styles.iconCircle}
                onPress={() => setBookmarked(!bookmarked)}
              >
                <Ionicons
                  name={bookmarked ? 'bookmark' : 'bookmark-outline'}
                  size={18}
                  color={bookmarked ? '#0058be' : '#111c2d'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconCircle}
                onPress={() => Alert.alert('Share', 'Story link copied!')}
              >
                <Ionicons name="share-outline" size={18} color="#111c2d" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileRow}>
              <View style={styles.avatarWrap}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>MK</Text>
                </View>
                <View style={styles.verifiedDot}>
                  <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.nameRow}>
                  <Text style={styles.profileName}>Mercy Kachepa</Text>
                  <View style={styles.survivorPill}>
                    <Ionicons name="checkmark-circle" size={12} color="#006c49" />
                    <Text style={styles.survivorPillText}>Wopulumuka</Text>
                  </View>
                </View>
                <Text style={styles.profileMeta}>42 yrs • Salima District (Chipoka)</Text>
                <View style={styles.hospitalRow}>
                  <Ionicons name="medkit" size={13} color="#0058be" />
                  <Text style={styles.hospitalText}>
                    KCH Oncology Ward 3B Graduate
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.diagnosisBox}>
              <View style={styles.diagnosisRow}>
                <Text style={styles.diagnosisLabel}>
                  Khansa ya M'berewere (Stage IIB)
                </Text>
                <View style={styles.freeBadge}>
                  <Ionicons name="leaf" size={13} color="#006c49" />
                  <Text style={styles.freeText}>Zaka 3 Zaulere</Text>
                </View>
              </View>
              <Text style={styles.treatmentText}>
                Treated with Neoadjuvant Chemo, Mastectomy & Tamoxifen (2020–2021)
              </Text>
            </View>
          </View>

          {/* Audio Player */}
          <View style={styles.audioCard}>
            <View style={styles.audioHeader}>
              <View style={styles.audioLeft}>
                <View style={styles.micCircle}>
                  <Ionicons name="mic" size={16} color="#FFFFFF" />
                </View>
                <View>
                  <Text style={styles.audioTitle}>Mverani Mercy akufotokoza</Text>
                  <Text style={styles.audioSub}>Listen to her voice (2:45 min)</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.playCircle}
                onPress={() => setIsPlaying(!isPlaying)}
              >
                <Ionicons
                  name={isPlaying ? 'pause' : 'play'}
                  size={22}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.progressRow}>
              <Text style={styles.timeText}>0:00</Text>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: isPlaying ? '40%' : '0%' },
                  ]}
                />
              </View>
              <Text style={styles.timeText}>2:45</Text>
            </View>
          </View>

          {/* Story Content */}
          <View style={styles.storySection}>
            <Text style={styles.storyHeadline}>
              Zomwe ndinaphunzira pamene ndinamva za matenda
            </Text>
            <Text style={styles.storyHeadlineEn}>
              What I learned when I heard my cancer diagnosis
            </Text>

            <Text style={styles.storyPara}>
              Nthawi yoyamba imene adokotala ku Chipoka Health Centre anandiuza
              kuti ndikayezetse mwachangu ku chipatala chachikulu cha KCH ku
              Lilongwe, mtima wanga unagwa pansi. Ndinaganiza kuti ndiye mapeto a
              moyo wanga ndipo ana anga atatu adzakhala amasiye opanda mayi.
            </Text>

            {/* Image placeholder */}
            <View style={styles.storyImage}>
              <Ionicons name="people" size={40} color="#0058be" />
              <Text style={styles.imageCaption}>
                Benchi ya Ward 3B ku KCH komwe tinakumana ndi abwenzi olimbikitsa.
              </Text>
            </View>

            <Text style={styles.storyPara}>
              Tsiku loyamba kulowa mu chipinda cholandirira mankhwala
              (Chemotherapy Cycle 1), ndinachita mantha kwambiri ndi mtundu
              wofiira wa mankhwala otchedwa doxorubicin. Manja anali kunjenjemera
              ndipo ndinkafuna kuthawa.
            </Text>

            <Text style={styles.storyPara}>
              Koma chinthu chomwe chinandipulumutsa kwambiri sanali mankhwala
              okha — inali mayi wina dzina lake Mai Phiri amene tinakumana naye
              pa benchi ya Ward 3B. Anandigawira mtedza wowotcha ndi mandimu oti
              ndiluma ndikamva nseru panjira yobwerera ku Salima ndi minibus.
            </Text>

            {/* Quote */}
            <View style={styles.quoteBox}>
              <Ionicons name="chatbubble-ellipses" size={28} color="#0058be" />
              <Text style={styles.quoteText}>
                “Chomwe ndingauze aliyense amene akuyamba lero: Osabisa mantha
                anu, ndipo musalole mtengo wa galimoto kukulepheretsani. Funsani
                thandizo la Minibus mwachangu kwa anansi kapena alangizi a
                Tikondane.”
              </Text>
              <Text style={styles.quoteAuthor}>
                Uphungu wa Mercy kwa amene ayamba kumene chemo
              </Text>
            </View>

            <Text style={styles.storyPara}>
              Mankhwala amatha kufooketsa thupi, koma chikhulupiriro ndi kukhala
              ndi mnzanu woti muziyankhula naye zimabwezeretsa moyo. Musalole
              kukhala nokha ndi nkhawa. Lero ndikugulitsabe nsomba zanga pa
              msika ndipo ana anga ali kusukulu bwinobwino.
            </Text>
          </View>

          {/* Empathy Section */}
          <View style={styles.empathyCard}>
            <View style={styles.empathyHeader}>
              <Text style={styles.empathyLabel}>
                Kodi nkhaniyi yakulimbikitsani?
              </Text>
              <Text style={styles.empathyCount}>
                {empathyCount} odwala alimbikitsidwa
              </Text>
            </View>
            <View style={styles.empathyActions}>
              <TouchableOpacity
                style={[
                  styles.empathyBtn,
                  empathyGiven && styles.empathyBtnActive,
                ]}
                onPress={handleEmpathy}
              >
                <Ionicons
                  name="heart"
                  size={20}
                  color={empathyGiven ? '#FFFFFF' : '#006c49'}
                />
                <Text
                  style={[
                    styles.empathyBtnText,
                    empathyGiven && styles.empathyBtnTextActive,
                  ]}
                >
                  Zandilimbikitsa
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.replyBtn}>
                <Ionicons name="chatbubble-outline" size={18} color="#111c2d" />
                <Text style={styles.replyBtnText}>Yankhani</Text>
              </TouchableOpacity>
            </View>
            {empathyGiven && (
              <View style={styles.toast}>
                <Text style={styles.toastText}>
                  Zikomo chifukwa chogawana chikondi! Ndife amodzi mu ulendowu.
                </Text>
              </View>
            )}
          </View>

          {/* Comments */}
          <View style={styles.commentsHeader}>
            <View style={styles.commentsTitleRow}>
              <Text style={styles.commentsTitle}>Zokambirana ndi Alangizi</Text>
              <View style={styles.countCircle}>
                <Text style={styles.countText}>{comments.length}</Text>
              </View>
            </View>
            <Text style={styles.threadLabel}>Community Thread</Text>
          </View>

          {comments.map((c) => (
            <View key={c.id} style={styles.commentCard}>
              <View style={styles.commentTop}>
                <View style={styles.commentAuthor}>
                  <View
                    style={[
                      styles.commentAvatar,
                      c.isNurse && styles.nurseAvatar,
                    ]}
                  >
                    {c.isNurse ? (
                      <Ionicons name="shield" size={16} color="#FFFFFF" />
                    ) : (
                      <Text style={styles.commentAvatarText}>
                        {c.name.slice(0, 2).toUpperCase()}
                      </Text>
                    )}
                  </View>
                  <View>
                    <View style={styles.commentNameRow}>
                      <Text style={styles.commentName}>{c.name}</Text>
                      {c.isNurse && (
                        <View style={styles.careTeamBadge}>
                          <Ionicons name="shield" size={10} color="#FFFFFF" />
                          <Text style={styles.careTeamText}>Care Team</Text>
                        </View>
                      )}
                      {c.meta && !c.isNurse && (
                        <Text style={styles.commentMeta}>{c.meta}</Text>
                      )}
                    </View>
                    {c.isNurse ? (
                      <Text style={styles.commentMeta}>{c.meta}</Text>
                    ) : (
                      <Text style={styles.commentTime}>{c.time}</Text>
                    )}
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.likeCommentBtn}
                  onPress={() => handleLikeComment(c.id)}
                >
                  <Ionicons
                    name="thumbs-up"
                    size={14}
                    color={c.liked ? '#0058be' : '#6B7380'}
                  />
                  <Text
                    style={[
                      styles.likeCount,
                      c.liked && { color: '#0058be' },
                    ]}
                  >
                    {c.likes}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.commentText}>{c.text}</Text>
              {c.nurseNote && (
                <View style={styles.nurseNote}>
                  <Ionicons name="heart" size={12} color="#006c49" />
                  <Text style={styles.nurseNoteText}>{c.nurseNote}</Text>
                </View>
              )}
              {c.reply && (
                <View style={styles.replyBox}>
                  <View style={styles.replyAuthorRow}>
                    <View style={styles.replyAvatar}>
                      <Text style={styles.replyAvatarText}>M</Text>
                    </View>
                    <Text style={styles.replyAuthorName}>{c.reply.name}</Text>
                  </View>
                  <Text style={styles.replyText}>{c.reply.text}</Text>
                </View>
              )}
            </View>
          ))}

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Fixed Comment Bar */}
        <View style={styles.commentBar}>
          <View style={styles.anonRow}>
            <TouchableOpacity
              style={styles.anonToggle}
              onPress={() => setIsAnonymous(!isAnonymous)}
            >
              <View
                style={[
                  styles.checkbox,
                  isAnonymous && styles.checkboxChecked,
                ]}
              >
                {isAnonymous && (
                  <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.anonText}>
                Bisa dzina langa (Post Anonymously)
              </Text>
            </TouchableOpacity>
            <Text style={styles.guidelines}>Malangizo a Ulemu</Text>
          </View>
          <View style={styles.inputRow}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Lembani mau olimbikitsa... / Write message"
                placeholderTextColor="#9AA3AF"
                value={comment}
                onChangeText={setComment}
              />
              <TouchableOpacity>
                <Ionicons name="mic" size={20} color="#6B7380" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.sendBtn}
              onPress={handleSubmitComment}
            >
              <Ionicons name="send" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f9f9ff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'rgba(249,249,255,0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#e7eeff',
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e7eeff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#111c2d',
    marginHorizontal: 8,
  },
  scroll: { paddingBottom: 20 },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  storyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#dee8ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  storyBadgeText: { fontSize: 12, fontWeight: '600', color: '#111c2d' },
  topActions: { flexDirection: 'row', gap: 8 },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e7eeff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Profile
  profileCard: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  profileRow: { flexDirection: 'row', gap: 12 },
  avatarWrap: { position: 'relative' },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffddb8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontSize: 20, fontWeight: '700', color: '#653e00' },
  verifiedDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#006c49',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  profileName: { fontSize: 17, fontWeight: '700', color: '#111c2d' },
  survivorPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#6cf8bb',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
  },
  survivorPillText: { fontSize: 11, fontWeight: '700', color: '#002113' },
  profileMeta: { fontSize: 13, color: '#6B7380', marginTop: 2 },
  hospitalRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  hospitalText: { fontSize: 12, color: '#6B7380' },
  diagnosisBox: {
    marginTop: 14,
    backgroundColor: '#f0f3ff',
    borderRadius: 12,
    padding: 12,
  },
  diagnosisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  diagnosisLabel: { fontSize: 13, fontWeight: '600', color: '#111c2d' },
  freeBadge: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  freeText: { fontSize: 12, fontWeight: '700', color: '#006c49' },
  treatmentText: { fontSize: 12, color: '#6B7380', marginTop: 4 },

  // Audio
  audioCard: {
    marginHorizontal: 16,
    backgroundColor: '#dee8ff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
  },
  audioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  audioLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  micCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0058be',
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioTitle: { fontSize: 14, fontWeight: '700', color: '#111c2d' },
  audioSub: { fontSize: 12, color: '#6B7380' },
  playCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0058be',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  timeText: { fontSize: 11, color: '#6B7380', width: 32 },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: '#c2c6d6',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: '#0058be', borderRadius: 2 },

  // Story
  storySection: { paddingHorizontal: 16, paddingTop: 16 },
  storyHeadline: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111c2d',
    lineHeight: 28,
  },
  storyHeadlineEn: {
    fontSize: 13,
    color: '#6B7380',
    marginTop: 4,
    marginBottom: 16,
  },
  storyPara: {
    fontSize: 16,
    color: '#111c2d',
    lineHeight: 26,
    marginBottom: 16,
  },
  storyImage: {
    height: 160,
    backgroundColor: '#d8e2ff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  imageCaption: {
    fontSize: 12,
    color: '#6B7380',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  quoteBox: {
    backgroundColor: '#dee8ff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  quoteText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111c2d',
    lineHeight: 24,
    marginTop: 8,
  },
  quoteAuthor: {
    fontSize: 13,
    color: '#0058be',
    fontWeight: '600',
    marginTop: 10,
  },

  // Empathy
  empathyCard: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },
  empathyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  empathyLabel: { fontSize: 13, color: '#6B7380' },
  empathyCount: { fontSize: 12, fontWeight: '700', color: '#0058be' },
  empathyActions: { flexDirection: 'row', gap: 10 },
  empathyBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#6cf8bb',
    borderRadius: 28,
    paddingVertical: 14,
  },
  empathyBtnActive: { backgroundColor: '#006c49' },
  empathyBtnText: { fontSize: 14, fontWeight: '700', color: '#002113' },
  empathyBtnTextActive: { color: '#FFFFFF' },
  replyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#e7eeff',
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  replyBtnText: { fontSize: 14, fontWeight: '700', color: '#111c2d' },
  toast: {
    marginTop: 12,
    backgroundColor: '#6ffbbe',
    borderRadius: 10,
    padding: 10,
  },
  toastText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#002113',
    textAlign: 'center',
  },

  // Comments
  commentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  commentsTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  commentsTitle: { fontSize: 17, fontWeight: '700', color: '#111c2d' },
  countCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#e7eeff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: { fontSize: 11, fontWeight: '700', color: '#6B7380' },
  threadLabel: { fontSize: 12, color: '#6B7380' },
  commentCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
  },
  commentTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  commentAuthor: { flexDirection: 'row', gap: 10, flex: 1 },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#d8e2ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nurseAvatar: { backgroundColor: '#0058be' },
  commentAvatarText: { fontSize: 12, fontWeight: '700', color: '#001a42' },
  commentNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  commentName: { fontSize: 13, fontWeight: '700', color: '#111c2d' },
  careTeamBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#0058be',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  careTeamText: { fontSize: 10, fontWeight: '700', color: '#FFFFFF' },
  commentMeta: { fontSize: 11, color: '#825100' },
  commentTime: { fontSize: 11, color: '#6B7380' },
  likeCommentBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  likeCount: { fontSize: 12, color: '#6B7380' },
  commentText: { fontSize: 14, color: '#111c2d', lineHeight: 20 },
  nurseNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  nurseNoteText: { fontSize: 12, color: '#006c49', fontWeight: '500' },
  replyBox: {
    marginTop: 10,
    marginLeft: 12,
    backgroundColor: '#f0f3ff',
    borderRadius: 10,
    padding: 10,
  },
  replyAuthorRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  replyAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#006c49',
    justifyContent: 'center',
    alignItems: 'center',
  },
  replyAvatarText: { fontSize: 10, fontWeight: '700', color: '#FFFFFF' },
  replyAuthorName: { fontSize: 12, fontWeight: '700', color: '#111c2d' },
  replyText: { fontSize: 13, color: '#6B7380', lineHeight: 18 },

  // Comment Bar
  commentBar: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderTopWidth: 1,
    borderTopColor: '#e7eeff',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  anonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  anonToggle: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#c2c6d6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: { backgroundColor: '#0058be', borderColor: '#0058be' },
  anonText: { fontSize: 12, color: '#6B7380' },
  guidelines: { fontSize: 12, color: '#0058be', fontWeight: '600' },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  inputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f3ff',
    borderRadius: 24,
    paddingHorizontal: 14,
    height: 44,
  },
  input: { flex: 1, fontSize: 14, color: '#111c2d' },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0058be',
    justifyContent: 'center',
    alignItems: 'center',
  },
});