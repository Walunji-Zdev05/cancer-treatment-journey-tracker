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

export default function ShareStoryScreen({ navigation }) {
  const [postType, setPostType] = useState('survivor'); // 'survivor' | 'question'
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [displayName, setDisplayName] = useState('');
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [p3, setP3] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);

  const insertChip = (field, text) => {
    const setters = { p1: setP1, p2: setP2, p3: setP3 };
    const values = { p1, p2, p3 };
    const current = values[field];
    setters[field](current.trim() ? `${current}, ${text}` : text);
  };

  const handleSubmit = () => {
    if (!p1.trim() && !p2.trim() && !p3.trim() && !hasRecording) {
      Alert.alert('Incomplete', 'Please answer at least one prompt or record a voice note.');
      return;
    }
    Alert.alert(
      'Zikomo!',
      'Nkhani yanu yalandiridwa ndipo alangizi adzaiwunika posachedwa.\n\n(Thank you! Your story has been submitted for review.)',
      [{ text: 'OK', onPress: () => navigation?.goBack?.() }]
    );
  };

  const handleDraft = () => {
    Alert.alert('Draft Saved', 'Nkhani yanu yasungidwa pa foni yanu.');
  };

  const toggleRecord = () => {
    if (!isRecording && !hasRecording) {
      setIsRecording(true);
      // Simulate recording finish after a short time in real app
    } else if (isRecording) {
      setIsRecording(false);
      setHasRecording(true);
    } else {
      // Replay or re-record
      setHasRecording(false);
      setIsRecording(false);
    }
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
            Share Story / Lembani Nkhani
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* Welcome Banner */}
          <View style={styles.banner}>
            <View style={styles.bannerTop}>
              <View style={styles.heartCircle}>
                <Ionicons name="heart" size={24} color="#0058be" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.bannerLabel}>Tikondane Community</Text>
                <Text style={styles.bannerTitle}>Gawani Ulendo Wanu</Text>
                <Text style={styles.bannerSub}>Share Your Journey</Text>
              </View>
            </View>
            <Text style={styles.bannerBody}>
              Nkhani yanu ingathe kupulumutsa mtima wa munthu amene wayamba lero.
              Simufunika kulemba zambiri — yankhani mafunso osavuta amene ali pansipa.
            </Text>
            <Text style={styles.bannerEn}>
              Your story brings light and courage to someone beginning care today.
              You don't need long essays — gentle reflections are enough.
            </Text>
          </View>

          {/* Post Type Selector */}
          <Text style={styles.sectionLabel}>
            Sankhani Mtundu wa Uthenga / Select Post Type
          </Text>
          <View style={styles.typeRow}>
            <TouchableOpacity
              style={[
                styles.typeCard,
                postType === 'survivor' && styles.typeCardActive,
              ]}
              onPress={() => setPostType('survivor')}
            >
              <View
                style={[
                  styles.typeIcon,
                  postType === 'survivor' && styles.typeIconActive,
                ]}
              >
                <Ionicons
                  name="hand-left"
                  size={18}
                  color={postType === 'survivor' ? '#FFFFFF' : '#6B7380'}
                />
              </View>
              <Text
                style={[
                  styles.typeTitle,
                  postType === 'survivor' && styles.typeTitleActive,
                ]}
              >
                Nkhani ya Chiyembekezo
              </Text>
              <Text
                style={[
                  styles.typeSub,
                  postType === 'survivor' && styles.typeSubActive,
                ]}
              >
                Survivor Story
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeCard,
                postType === 'question' && styles.typeCardActive,
              ]}
              onPress={() => setPostType('question')}
            >
              <View
                style={[
                  styles.typeIcon,
                  postType === 'question' && styles.typeIconActive,
                ]}
              >
                <Ionicons
                  name="help-circle"
                  size={18}
                  color={postType === 'question' ? '#FFFFFF' : '#6B7380'}
                />
              </View>
              <Text
                style={[
                  styles.typeTitle,
                  postType === 'question' && styles.typeTitleActive,
                ]}
              >
                Funso kwa Anzathu
              </Text>
              <Text
                style={[
                  styles.typeSub,
                  postType === 'question' && styles.typeSubActive,
                ]}
              >
                Ask Community
              </Text>
            </TouchableOpacity>
          </View>

          {/* Privacy / Anonymity */}
          <View style={styles.privacyCard}>
            <View style={styles.privacyTop}>
              <View style={{ flex: 1 }}>
                <View style={styles.privacyTitleRow}>
                  <Ionicons name="shield-checkmark" size={20} color="#006c49" />
                  <Text style={styles.privacyTitle}>Gawanani Mosadziwika</Text>
                </View>
                <Text style={styles.privacySub}>Post Anonymously</Text>
                <Text style={styles.privacyBody}>
                  Dzina ndi nambala yanu ya foni sizidzaonekera. Chidziwitso chokha
                  chidzakhala mtundu wa matenda ndi malo anu.
                </Text>
                <Text style={styles.privacyEn}>
                  Your personal identity is strictly safe. Only clinical journey
                  tags will be visible.
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.toggle, isAnonymous && styles.toggleOn]}
                onPress={() => setIsAnonymous(!isAnonymous)}
              >
                <View
                  style={[
                    styles.toggleKnob,
                    isAnonymous && styles.toggleKnobOn,
                  ]}
                />
              </TouchableOpacity>
            </View>

            {/* Preview */}
            <View style={styles.previewBox}>
              <View style={styles.previewIcon}>
                <Ionicons name="shield" size={16} color="#006c49" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.previewLabel}>
                  Momwe mudzaonekere / Showing as:
                </Text>
                <Text style={styles.previewText}>
                  {isAnonymous
                    ? 'Wodwala waku Lilongwe • Breast Ca, Stage II'
                    : displayName.trim()
                    ? `${displayName.trim()} • Breast Ca, Stage II`
                    : 'Dzina Lanu / Your Name • Breast Ca, Stage II'}
                </Text>
              </View>
            </View>

            {/* Optional name */}
            <View style={[styles.nameField, isAnonymous && { opacity: 0.45 }]}>
              <Text style={styles.nameLabel}>
                Dzina Lokonda Kutchulidwa (Mukafuna kudziwika)
              </Text>
              <TextInput
                style={styles.nameInput}
                placeholder="Mwachitsanzo: Amayi Mary / Bambo Phiri"
                placeholderTextColor="#9AA3AF"
                value={displayName}
                onChangeText={setDisplayName}
                editable={!isAnonymous}
              />
            </View>
          </View>

          {/* Guided Prompts */}
          <View style={styles.promptsHeader}>
            <View style={styles.promptsTitleRow}>
              <Ionicons name="book" size={20} color="#0058be" />
              <Text style={styles.promptsTitle}>Mafunso Othandiza</Text>
            </View>
            <View style={styles.stepBadge}>
              <Text style={styles.stepText}>Gawo 3/3</Text>
            </View>
          </View>
          <Text style={styles.promptsSub}>
            Answer any or all gentle prompt cards
          </Text>

          {/* Prompt 1 */}
          <View style={styles.promptCard}>
            <View style={styles.promptHeader}>
              <View style={[styles.promptNum, { backgroundColor: '#d8e2ff' }]}>
                <Text style={[styles.promptNumText, { color: '#0058be' }]}>1</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.promptQ}>
                  Chomwe chinali chovuta kwambiri pachiyambi?
                </Text>
                <Text style={styles.promptQen}>
                  What was hardest at diagnosis or start?
                </Text>
              </View>
            </View>
            <View style={styles.chips}>
              {[
                'Mantha a Chemo',
                'Mtengo wa Galimoto',
                'Kusanza / Nausea',
                'Banja Kudandaula',
              ].map((chip) => (
                <TouchableOpacity
                  key={chip}
                  style={styles.chip}
                  onPress={() => insertChip('p1', chip)}
                >
                  <Text style={styles.chipText}>+ {chip}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.textarea}
              multiline
              numberOfLines={3}
              placeholder="Mwachitsanzo: Sindinadziwe zomwe ziyenera kuchitika..."
              placeholderTextColor="#9AA3AF"
              value={p1}
              onChangeText={setP1}
              textAlignVertical="top"
            />
          </View>

          {/* Prompt 2 */}
          <View style={styles.promptCard}>
            <View style={styles.promptHeader}>
              <View style={[styles.promptNum, { backgroundColor: '#6ffbbe' }]}>
                <Text style={[styles.promptNumText, { color: '#002113' }]}>2</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.promptQ}>
                  Kodi n'chiyani chinakuthandizani kupitiriza?
                </Text>
                <Text style={styles.promptQen}>What helped you keep going?</Text>
              </View>
            </View>
            <View style={styles.chips}>
              {[
                'Kupemphera',
                'Mawu a Anzanga',
                'Madzi a Mandimu',
                'Alangizi a Chipatala',
              ].map((chip) => (
                <TouchableOpacity
                  key={chip}
                  style={styles.chip}
                  onPress={() => insertChip('p2', chip)}
                >
                  <Text style={styles.chipText}>+ {chip}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.textarea}
              multiline
              numberOfLines={3}
              placeholder="Mwachitsanzo: Kukambirana ndi adokotala..."
              placeholderTextColor="#9AA3AF"
              value={p2}
              onChangeText={setP2}
              textAlignVertical="top"
            />
          </View>

          {/* Prompt 3 */}
          <View style={styles.promptCard}>
            <View style={styles.promptHeader}>
              <View style={[styles.promptNum, { backgroundColor: '#ffddb8' }]}>
                <Text style={[styles.promptNumText, { color: '#653e00' }]}>3</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.promptQ}>
                  Chinthu chimodzi chimene mungauze munthu watsopano:
                </Text>
                <Text style={styles.promptQen}>
                  One thing you'd tell someone just starting:
                </Text>
              </View>
            </View>
            <TextInput
              style={styles.textarea}
              multiline
              numberOfLines={3}
              placeholder="Mwachitsanzo: Musabise matenda anu, mankhwala alipo..."
              placeholderTextColor="#9AA3AF"
              value={p3}
              onChangeText={setP3}
              textAlignVertical="top"
            />
          </View>

          {/* Voice Record Option */}
          <View style={styles.voiceCard}>
            <View style={styles.voiceIconCircle}>
              <Ionicons name="pulse" size={26} color="#0058be" />
            </View>
            <Text style={styles.voiceTitle}>
              Kodi mumakonda kulankhula m'malo molemba?
            </Text>
            <Text style={styles.voiceSub}>Prefer to record your voice instead?</Text>

            <View style={styles.waveRow}>
              {[4, 8, 12, 6, 10, 4, 7].map((h, i) => (
                <View
                  key={i}
                  style={[
                    styles.waveBar,
                    {
                      height: h * 2,
                      backgroundColor: isRecording ? '#ba1a1a' : '#0058be',
                    },
                  ]}
                />
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.recordBtn,
                isRecording && styles.recordBtnActive,
                hasRecording && !isRecording && styles.recordBtnDone,
              ]}
              onPress={toggleRecord}
            >
              <Ionicons
                name={
                  isRecording ? 'stop' : hasRecording ? 'checkmark-circle' : 'mic'
                }
                size={22}
                color={
                  isRecording || hasRecording ? '#FFFFFF' : '#0058be'
                }
              />
              <Text
                style={[
                  styles.recordText,
                  (isRecording || hasRecording) && { color: '#FFFFFF' },
                ]}
              >
                {isRecording
                  ? 'Kujambula... Dinani Kusiya'
                  : hasRecording
                  ? 'Mawu Ajambulidwa – Mvetserani'
                  : 'Jambulani Mawu (mpaka 2 mins)'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.voiceHint}>
              Record voice in Chichewa or English
            </Text>
          </View>

          {/* Care Review Notice */}
          <View style={styles.reviewCard}>
            <View style={styles.reviewIcon}>
              <Ionicons name="shield-checkmark" size={20} color="#0058be" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.reviewTitle}>
                Chitetezo ndi Chitsimikizo / Care Review
              </Text>
              <Text style={styles.reviewBody}>
                Tikondane Care Review: Nkhani yanu idzawunikidwa ndi alangizi a
                chipatala (Nurse Navigators) pofuna kuteteza mtendere wa onse
                musanaonekere pagulu. Musalembe manambala a chinsinsi kapena
                ndalama.
              </Text>
              <Text style={styles.reviewEn}>
                Reviewed by nurse navigators before publishing to keep our space
                safe and supportive.
              </Text>
            </View>
          </View>

          {/* Submit */}
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>Tumizani Nkhani Yanu</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.submitHint}>Submit Story for Gentle Review</Text>

          <TouchableOpacity style={styles.draftBtn} onPress={handleDraft}>
            <Ionicons name="save-outline" size={16} color="#0058be" />
            <Text style={styles.draftText}>
              Sungani ngati Tsamba Loyembekezera (Save Draft)
            </Text>
          </TouchableOpacity>
        </ScrollView>
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
  scroll: { padding: 16, paddingBottom: 40 },

  // Banner
  banner: {
    backgroundColor: '#e7eeff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  bannerTop: { flexDirection: 'row', gap: 12, marginBottom: 10 },
  heartCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#d8e2ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0058be',
    textTransform: 'uppercase',
  },
  bannerTitle: { fontSize: 18, fontWeight: '700', color: '#111c2d' },
  bannerSub: { fontSize: 13, color: '#6B7380' },
  bannerBody: { fontSize: 14, color: '#424754', lineHeight: 20 },
  bannerEn: {
    fontSize: 13,
    color: '#6B7380',
    fontStyle: 'italic',
    marginTop: 6,
  },

  // Type selector
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111c2d',
    marginBottom: 10,
  },
  typeRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  typeCard: {
    flex: 1,
    backgroundColor: '#f0f3ff',
    borderRadius: 14,
    padding: 14,
  },
  typeCardActive: { backgroundColor: '#d8e2ff' },
  typeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#dee8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeIconActive: { backgroundColor: '#0058be' },
  typeTitle: { fontSize: 13, fontWeight: '700', color: '#111c2d' },
  typeTitleActive: { color: '#001a42' },
  typeSub: { fontSize: 11, color: '#6B7380', marginTop: 2 },
  typeSubActive: { color: '#004395' },

  // Privacy
  privacyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  privacyTop: { flexDirection: 'row', gap: 12 },
  privacyTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  privacyTitle: { fontSize: 15, fontWeight: '700', color: '#111c2d' },
  privacySub: { fontSize: 12, color: '#006c49', fontWeight: '600', marginTop: 2 },
  privacyBody: { fontSize: 13, color: '#6B7380', lineHeight: 18, marginTop: 6 },
  privacyEn: { fontSize: 12, color: '#9AA3AF', marginTop: 4 },
  toggle: {
    width: 52,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#c2c6d6',
    padding: 3,
    justifyContent: 'center',
  },
  toggleOn: { backgroundColor: '#006c49' },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  toggleKnobOn: { alignSelf: 'flex-end' },
  previewBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#f0f3ff',
    borderRadius: 12,
    padding: 12,
    marginTop: 14,
  },
  previewIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6cf8bb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewLabel: { fontSize: 11, color: '#6B7380' },
  previewText: { fontSize: 13, fontWeight: '700', color: '#111c2d' },
  nameField: { marginTop: 14 },
  nameLabel: { fontSize: 12, fontWeight: '600', color: '#111c2d', marginBottom: 6 },
  nameInput: {
    height: 44,
    backgroundColor: '#f0f3ff',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#111c2d',
  },

  // Prompts
  promptsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  promptsTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  promptsTitle: { fontSize: 17, fontWeight: '700', color: '#111c2d' },
  stepBadge: {
    backgroundColor: '#d8e2ff',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  stepText: { fontSize: 11, fontWeight: '700', color: '#0058be' },
  promptsSub: { fontSize: 13, color: '#6B7380', marginBottom: 14 },
  promptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  promptHeader: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  promptNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promptNumText: { fontSize: 13, fontWeight: '700' },
  promptQ: { fontSize: 15, fontWeight: '700', color: '#111c2d', lineHeight: 20 },
  promptQen: { fontSize: 12, color: '#6B7380', marginTop: 2 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  chip: {
    backgroundColor: '#e7eeff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  chipText: { fontSize: 12, fontWeight: '600', color: '#111c2d' },
  textarea: {
    backgroundColor: '#f0f3ff',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#111c2d',
    minHeight: 80,
  },

  // Voice
  voiceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  voiceIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e7eeff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  voiceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111c2d',
    textAlign: 'center',
  },
  voiceSub: { fontSize: 13, color: '#6B7380', marginTop: 4 },
  waveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 32,
    marginVertical: 14,
  },
  waveBar: { width: 4, borderRadius: 2 },
  recordBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#e7eeff',
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '100%',
    justifyContent: 'center',
  },
  recordBtnActive: { backgroundColor: '#ba1a1a' },
  recordBtnDone: { backgroundColor: '#006c49' },
  recordText: { fontSize: 14, fontWeight: '700', color: '#0058be' },
  voiceHint: { fontSize: 11, color: '#9AA3AF', marginTop: 8 },

  // Review
  reviewCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#dee8ff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
  },
  reviewIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewTitle: { fontSize: 14, fontWeight: '700', color: '#111c2d' },
  reviewBody: { fontSize: 13, color: '#424754', lineHeight: 18, marginTop: 4 },
  reviewEn: { fontSize: 12, color: '#6B7380', marginTop: 4 },

  // Actions
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#0058be',
    borderRadius: 28,
    paddingVertical: 16,
    marginBottom: 6,
  },
  submitText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  submitHint: {
    textAlign: 'center',
    fontSize: 12,
    color: '#6B7380',
    marginBottom: 12,
  },
  draftBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  draftText: { fontSize: 14, fontWeight: '600', color: '#0058be' },
});