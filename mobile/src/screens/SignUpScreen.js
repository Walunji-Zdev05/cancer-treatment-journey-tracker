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

const districts = [
  'Lilongwe',
  'Dedza',
  'Salima',
  'Dowa',
  'Mchinji',
  'Blantyre',
  'Other',
];

const relationships = [
  'Mwana (Daughter / Son)',
  'Mwamuna / Mkazi (Spouse)',
  'Makolo (Mother / Father)',
  'Mchimwene / Mlongo (Sibling)',
  'Wachibale wina (Other)',
];

export default function SignUpScreen({ navigation }) {
  const [role, setRole] = useState('caregiver'); // 'patient' | 'caregiver'
  const [caregiverName, setCaregiverName] = useState('');
  const [relationship, setRelationship] = useState(relationships[0]);
  const [patientName, setPatientName] = useState('');
  const [passport, setPassport] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Lilongwe');
  const [healthCentre, setHealthCentre] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('female');
  const [pin, setPin] = useState(['', '', '', '']);
  const [fareAssist, setFareAssist] = useState(true);
  const [basicPhone, setBasicPhone] = useState(false);

  const pinRefs = [React.useRef(), React.useRef(), React.useRef(), React.useRef()];

  function handlePinChange(text, index) {
    if (text.length > 1) return;
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);
    if (text && index < 3) {
      pinRefs[index + 1].current?.focus();
    }
  }

  function handleRegister() {
    if (!patientName.trim()) {
      Alert.alert('Error', 'Please enter the patient’s full name');
      return;
    }
    if (phone.length < 9) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }
    if (pin.join('').length !== 4) {
      Alert.alert('Error', 'Please create a 4-digit PIN');
      return;
    }

    Alert.alert(
      'Zikomo! Registration Successful',
      'SMS confirmation has been sent. Opening your care dashboard...',
      [
        {
          text: 'OK',
          onPress: () => navigation?.replace?.('Tabs'),
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation?.goBack?.()}
          >
            <Ionicons name="arrow-back" size={22} color="#111c2d" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <View style={styles.logoCircle}>
              <Ionicons name="heart" size={16} color="#FFFFFF" />
            </View>
            <Text style={styles.headerTitle}>Kulembetsa</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* Audio Banner */}
          <View style={styles.audioCard}>
            <View style={styles.audioIcon}>
              <Ionicons name="volume-high" size={20} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.audioTitle}>Mverani Malangizo</Text>
              <Text style={styles.audioSub}>Listen to audio guide (1:15 min)</Text>
            </View>
            <TouchableOpacity style={styles.playBtn}>
              <Ionicons name="play" size={18} color="#FFFFFF" />
              <Text style={styles.playText}>Sewerani</Text>
            </TouchableOpacity>
          </View>

          {/* Welcome */}
          <Text style={styles.mainTitle}>Lembetsani Wodwala kapena Msamaliri</Text>
          <Text style={styles.mainSub}>
            Register Patient or Caregiver • Free Support
          </Text>
          <Text style={styles.desc}>
            Yambani ulendo wanu wamankhwala a khansa mothandizidwa ndi alangizi a
            pachipatala.
          </Text>

          {/* Role Selector */}
          <Text style={styles.sectionLabel}>
            Kodi mukulembetsa ndani? (Who is registering?)
          </Text>
          <View style={styles.roleRow}>
            <TouchableOpacity
              style={[styles.roleCard, role === 'patient' && styles.roleCardActive]}
              onPress={() => setRole('patient')}
            >
              <View style={styles.roleIcon}>
                <Ionicons
                  name="person"
                  size={26}
                  color={role === 'patient' ? '#0058be' : '#6B7380'}
                />
              </View>
              <Text style={styles.roleTitle}>Ndine Wodwala</Text>
              <Text style={styles.roleSub}>I am the Patient</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.roleCard, role === 'caregiver' && styles.roleCardActive]}
              onPress={() => setRole('caregiver')}
            >
              <View style={styles.roleIcon}>
                <Ionicons
                  name="people"
                  size={26}
                  color={role === 'caregiver' ? '#0058be' : '#6B7380'}
                />
              </View>
              <Text style={styles.roleTitle}>Ndine Msamaliri</Text>
              <Text style={styles.roleSub}>Family Guardian</Text>
            </TouchableOpacity>
          </View>

          {/* Caregiver Details (only if caregiver) */}
          {role === 'caregiver' && (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="shield-checkmark" size={18} color="#0058be" />
                <Text style={styles.cardHeaderText}>
                  Zambiri za Msamaliri (Caregiver Details)
                </Text>
              </View>

              <Text style={styles.label}>Dzina la Msamaliri</Text>
              <TextInput
                style={styles.input}
                placeholder="Chifundo Phiri"
                value={caregiverName}
                onChangeText={setCaregiverName}
              />

              <Text style={[styles.label, { marginTop: 12 }]}>
                Ubale wanu ndi Wodwala
              </Text>
              <View style={styles.selectBox}>
                {relationships.map((rel) => (
                  <TouchableOpacity
                    key={rel}
                    style={[
                      styles.selectOption,
                      relationship === rel && styles.selectOptionActive,
                    ]}
                    onPress={() => setRelationship(rel)}
                  >
                    <Text
                      style={[
                        styles.selectText,
                        relationship === rel && styles.selectTextActive,
                      ]}
                    >
                      {rel}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Patient Name */}
          <View style={styles.card}>
            <Text style={styles.labelBold}>Dzina Lonse la Wodwala</Text>
            <Text style={styles.labelSub}>Patient's Full Official Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Mwachitsanzo: Alineti Banda"
              value={patientName}
              onChangeText={setPatientName}
            />
          </View>

          {/* Yellow Passport */}
          <View style={styles.card}>
            <View style={styles.rowBetween}>
              <View>
                <Text style={styles.labelBold}>Bukhu la Zaumoyo / Yellow Passport</Text>
                <Text style={styles.labelSub}>Health Passport # or National ID</Text>
              </View>
              <View style={styles.mohBadge}>
                <Text style={styles.mohText}>MOH</Text>
              </View>
            </View>
            <View style={styles.passportRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="YP-88219 kapena National ID"
                autoCapitalize="characters"
                value={passport}
                onChangeText={setPassport}
              />
              <TouchableOpacity style={styles.scanBtn}>
                <Ionicons name="barcode-outline" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <Text style={styles.hint}>
              Mutha kujambula chizindikiro kapena kusiya ngati mulibe pano.
            </Text>
          </View>

          {/* Phone */}
          <View style={styles.card}>
            <Text style={styles.labelBold}>Nambala ya Foni (Phone Number)</Text>
            <Text style={styles.labelSub}>Airtel kapena TNM</Text>
            <View style={styles.phoneRow}>
              <View style={styles.prefix}>
                <Ionicons name="call" size={16} color="#0058be" />
                <Text style={styles.prefixText}>+265</Text>
              </View>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="888 12 34 56"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>

          {/* District */}
          <View style={styles.card}>
            <Text style={styles.labelBold}>Chigawo / Boma (District)</Text>
            <Text style={styles.labelSub}>Sankhani komwe mukukhala</Text>
            <View style={styles.chipRow}>
              {districts.map((d) => (
                <TouchableOpacity
                  key={d}
                  style={[styles.chip, district === d && styles.chipActive]}
                  onPress={() => setDistrict(d)}
                >
                  <Text
                    style={[styles.chipText, district === d && styles.chipTextActive]}
                  >
                    {d}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Health Centre */}
          <View style={styles.card}>
            <Text style={styles.labelBold}>Chipatala Chapafupi</Text>
            <Text style={styles.labelSub}>Nearest Health Centre</Text>
            <View style={styles.inputWithIcon}>
              <Ionicons name="medkit" size={18} color="#0058be" />
              <TextInput
                style={[styles.input, { flex: 1, marginLeft: 8 }]}
                placeholder="Mwachitsanzo: Chipoka Health Centre"
                value={healthCentre}
                onChangeText={setHealthCentre}
              />
            </View>
          </View>

          {/* Age + Gender */}
          <View style={styles.row}>
            <View style={[styles.card, { flex: 1 }]}>
              <Text style={styles.labelBold}>Zaka (Age)</Text>
              <TextInput
                style={styles.input}
                placeholder="48"
                keyboardType="number-pad"
                value={age}
                onChangeText={setAge}
              />
            </View>
            <View style={[styles.card, { flex: 1 }]}>
              <Text style={styles.labelBold}>Mwamuna / Mkazi</Text>
              <View style={styles.genderRow}>
                <TouchableOpacity
                  style={[
                    styles.genderBtn,
                    gender === 'female' && styles.genderBtnActive,
                  ]}
                  onPress={() => setGender('female')}
                >
                  <Text
                    style={[
                      styles.genderText,
                      gender === 'female' && styles.genderTextActive,
                    ]}
                  >
                    Mkazi
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderBtn,
                    gender === 'male' && styles.genderBtnActive,
                  ]}
                  onPress={() => setGender('male')}
                >
                  <Text
                    style={[
                      styles.genderText,
                      gender === 'male' && styles.genderTextActive,
                    ]}
                  >
                    Mwamuna
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* PIN */}
          <View style={styles.card}>
            <View style={styles.rowBetween}>
              <View>
                <Text style={styles.labelBold}>Pangani PIN Yachinsinsi ya Manambala 4</Text>
                <Text style={styles.labelSub}>Create 4-Digit PIN</Text>
              </View>
              <Ionicons name="lock-closed" size={20} color="#0058be" />
            </View>
            <View style={styles.pinRow}>
              {[0, 1, 2, 3].map((i) => (
                <TextInput
                  key={i}
                  ref={pinRefs[i]}
                  style={styles.pinBox}
                  keyboardType="number-pad"
                  maxLength={1}
                  secureTextEntry
                  value={pin[i]}
                  onChangeText={(text) => handlePinChange(text, i)}
                />
              ))}
            </View>
            <Text style={styles.hint}>
              Gwiritsani ntchito manambala osavuta kukumbukira monga chaka chobadwa.
            </Text>
          </View>

          {/* Support Checkboxes */}
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.checkRow}
              onPress={() => setFareAssist(!fareAssist)}
            >
              <View style={[styles.checkbox, fareAssist && styles.checkboxChecked]}>
                {fareAssist && <Ionicons name="checkmark" size={14} color="#FFF" />}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.checkTitle}>
                  Thandizo la ndalama ya galimoto (Minibus Fare)
                </Text>
                <Text style={styles.checkSub}>
                  Tikondane Navigator can arrange travel assistance.
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.checkRow, { marginTop: 14 }]}
              onPress={() => setBasicPhone(!basicPhone)}
            >
              <View style={[styles.checkbox, basicPhone && styles.checkboxChecked]}>
                {basicPhone && <Ionicons name="checkmark" size={14} color="#FFF" />}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.checkTitle}>
                  Ndilibe foni ya intaneti (Basic 2G Phone)
                </Text>
                <Text style={styles.checkSub}>
                  Send me SMS updates and voice reminders in Chichewa.
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Register Button */}
          <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
            <Text style={styles.registerBtnText}>Lembetsani Tsopano</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.verifiedRow}>
            <Ionicons name="shield-checkmark" size={16} color="#006c49" />
            <Text style={styles.verifiedText}>
              Kulembetsa ndi Kwaulere • MoH Cancer Registry Protected
            </Text>
          </View>

          {/* USSD */}
          <View style={styles.ussdCard}>
            <View style={styles.ussdIcon}>
              <Ionicons name="keypad" size={20} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.ussdTitle}>Mulibe intaneti kapena bando?</Text>
              <Text style={styles.ussdText}>
                Lembetsani pa foni iliyonse ya bampu popanda ndalama kudzera pa{' '}
                <Text style={{ fontWeight: '700' }}>*384*265#</Text>.
              </Text>
            </View>
          </View>

          {/* Already have account */}
          <TouchableOpacity
            style={styles.signInLink}
            onPress={() => navigation?.navigate?.('SignIn')}
          >
            <Text style={styles.signInText}>
              Muli ndi akaunti kale?{' '}
              <Text style={styles.signInBold}>Lowani pano (Sign In)</Text>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#e7eeff',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f3ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0058be',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#111c2d' },
  scroll: { padding: 16, paddingBottom: 40 },
  audioCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e7eeff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    gap: 10,
  },
  audioIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0058be',
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioTitle: { fontSize: 14, fontWeight: '700', color: '#111c2d' },
  audioSub: { fontSize: 12, color: '#6B7380' },
  playBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#2170e4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  playText: { color: '#FFF', fontWeight: '700', fontSize: 12 },
  mainTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111c2d',
    marginBottom: 4,
  },
  mainSub: { fontSize: 13, color: '#0058be', fontWeight: '600', marginBottom: 8 },
  desc: { fontSize: 14, color: '#6B7380', lineHeight: 20, marginBottom: 20 },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111c2d',
    marginBottom: 10,
  },
  roleRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  roleCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e7eeff',
  },
  roleCardActive: {
    backgroundColor: '#d8e2ff',
    borderColor: '#0058be',
  },
  roleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f3ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  roleTitle: { fontSize: 14, fontWeight: '700', color: '#111c2d' },
  roleSub: { fontSize: 12, color: '#6B7380', marginTop: 2 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e7eeff',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cardHeaderText: { fontSize: 14, fontWeight: '700', color: '#0058be' },
  label: { fontSize: 13, fontWeight: '600', color: '#111c2d', marginBottom: 6 },
  labelBold: { fontSize: 14, fontWeight: '700', color: '#111c2d' },
  labelSub: { fontSize: 12, color: '#6B7380', marginBottom: 8 },
  input: {
    height: 48,
    backgroundColor: '#f0f3ff',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#111c2d',
  },
  selectBox: { gap: 6 },
  selectOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#f0f3ff',
  },
  selectOptionActive: { backgroundColor: '#d8e2ff' },
  selectText: { fontSize: 13, color: '#6B7380' },
  selectTextActive: { color: '#0058be', fontWeight: '700' },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  mohBadge: {
    backgroundColor: '#6cf8bb',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  mohText: { fontSize: 11, fontWeight: '700', color: '#002113' },
  passportRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  scanBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#0058be',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hint: { fontSize: 11, color: '#6B7380', marginTop: 8 },
  phoneRow: { flexDirection: 'row', gap: 8 },
  prefix: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#e7eeff',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  prefixText: { fontSize: 14, fontWeight: '700', color: '#111c2d' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f3ff',
  },
  chipActive: { backgroundColor: '#0058be' },
  chipText: { fontSize: 13, fontWeight: '600', color: '#6B7380' },
  chipTextActive: { color: '#FFFFFF' },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f3ff',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  row: { flexDirection: 'row', gap: 12 },
  genderRow: { flexDirection: 'row', gap: 6, marginTop: 4 },
  genderBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#f0f3ff',
    alignItems: 'center',
  },
  genderBtnActive: { backgroundColor: '#0058be' },
  genderText: { fontSize: 13, fontWeight: '600', color: '#6B7380' },
  genderTextActive: { color: '#FFFFFF' },
  pinRow: { flexDirection: 'row', gap: 10, marginVertical: 12 },
  pinBox: {
    flex: 1,
    height: 52,
    backgroundColor: '#f0f3ff',
    borderRadius: 14,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#0058be',
  },
  checkRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#c2c6d6',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxChecked: { backgroundColor: '#0058be', borderColor: '#0058be' },
  checkTitle: { fontSize: 14, fontWeight: '700', color: '#111c2d' },
  checkSub: { fontSize: 12, color: '#6B7380', marginTop: 2 },
  registerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#0058be',
    borderRadius: 30,
    paddingVertical: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  registerBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 20,
  },
  verifiedText: { fontSize: 12, color: '#6B7380' },
  ussdCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#e6f9f0',
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
  },
  ussdIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#006c49',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ussdTitle: { fontSize: 14, fontWeight: '700', color: '#006c49', marginBottom: 2 },
  ussdText: { fontSize: 13, color: '#374151', lineHeight: 18 },
  signInLink: { alignItems: 'center', paddingVertical: 12 },
  signInText: { fontSize: 14, color: '#6B7380' },
  signInBold: { color: '#0058be', fontWeight: '700' },
});