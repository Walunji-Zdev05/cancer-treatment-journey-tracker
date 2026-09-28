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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function SignInScreen({ navigation }) {
  const [loginMethod, setLoginMethod] = useState('phone'); // 'phone' | 'passport'
  const [phone, setPhone] = useState('');
  const [passport, setPassport] = useState('');
  const [pin, setPin] = useState(['', '', '', '']);
  const [isCaregiver, setIsCaregiver] = useState(false);
  const [lang, setLang] = useState('ny'); // 'ny' | 'en'

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

  function handleLogin() {
    const fullPin = pin.join('');
    if (loginMethod === 'phone' && phone.length < 9) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }
    if (loginMethod === 'passport' && passport.length < 4) {
      Alert.alert('Error', 'Please enter your Yellow Passport number');
      return;
    }
    if (fullPin.length !== 4) {
      Alert.alert('Error', 'Please enter your 4-digit PIN');
      return;
    }

    // Temporary success – later this will call your backend
    Alert.alert(
      lang === 'ny' ? 'Mwalowa bwino!' : 'Welcome!',
      lang === 'ny'
        ? 'Tikukutsegulirani tsamba la Lero...'
        : 'Opening your care dashboard...',
      [
        {
          text: 'OK',
          onPress: () => {
            // Go to the main app (Tabs)
            navigation?.replace?.('Tabs');
          },
        },
      ]
    );
  }

  const t = {
    title: lang === 'ny' ? 'Kulowa mu Akaunti Yanu' : 'Sign In to Your Account',
    subtitle:
      lang === 'ny'
        ? 'Lowani ndi nambala yanu ya foni kapena Bukhu la Zaumoyo (Yellow Passport).'
        : 'Sign in using your mobile phone number or Yellow Passport ID.',
    phoneTab: lang === 'ny' ? 'Nambala ya Foni' : 'Phone Number',
    passportTab: 'Yellow Passport',
    phoneLabel: lang === 'ny' ? 'Nambala ya Foni (Airtel kapena TNM)' : 'Phone Number',
    passportLabel: lang === 'ny' ? 'Nambala ya Bukhu la Zaumoyo' : 'Yellow Passport Number',
    pinLabel: lang === 'ny' ? 'PIN Yanu ya Manambala 4' : 'Your 4-Digit PIN',
    forgotPin: lang === 'ny' ? 'Mwayiwala PIN?' : 'Forgot PIN?',
    caregiver: lang === 'ny' ? 'Ndine Msamaliri (Caregiver)' : 'I am a Caregiver',
    caregiverSub: lang === 'ny' ? 'Accessing for family member' : 'Accessing for family member',
    loginBtn: lang === 'ny' ? 'Lowani mu Tikondane' : 'Enter Tikondane',
    ussdTitle: lang === 'ny' ? 'Mulibe intaneti kapena data?' : 'No internet or data?',
    ussdText:
      lang === 'ny'
        ? 'Mutha kugwiritsa ntchito foni iliyonse poyimba *384*265# kwaulere.'
        : 'You can use any basic phone by dialing *384*265# for free.',
    helpTitle: lang === 'ny' ? 'Mufuna Thandizo?' : 'Need Help?',
    helpSub: 'Toll-free Chimwemwe line',
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logoCircle}>
              <Ionicons name="heart" size={18} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.brandName}>Tikondane</Text>
              <Text style={styles.brandSub}>Ulendo wa Zaumoyo • Cancer Care</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.langBtn}
            onPress={() => setLang(lang === 'ny' ? 'en' : 'ny')}
          >
            <Ionicons name="language" size={14} color="#0058be" />
            <Text style={styles.langText}>{lang === 'ny' ? 'Chichewa' : 'English'}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {/* Audio Guidance */}
          <View style={styles.audioCard}>
            <View style={styles.audioLeft}>
              <View style={styles.audioIcon}>
                <Ionicons name="volume-high" size={20} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.audioTitle}>Mverani Malangizo a Mawu</Text>
                <Text style={styles.audioSub}>Listen to spoken Chichewa sign in help</Text>
              </View>
            </View>
            <View style={styles.audioDuration}>
              <Text style={styles.audioDurationText}>0:45 min</Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>{t.title}</Text>
          <Text style={styles.subtitle}>{t.subtitle}</Text>

          {/* Method Selector */}
          <View style={styles.methodRow}>
            <TouchableOpacity
              style={[styles.methodBtn, loginMethod === 'phone' && styles.methodBtnActive]}
              onPress={() => setLoginMethod('phone')}
            >
              <Ionicons
                name="call"
                size={16}
                color={loginMethod === 'phone' ? '#0058be' : '#6B7380'}
              />
              <Text
                style={[
                  styles.methodText,
                  loginMethod === 'phone' && styles.methodTextActive,
                ]}
              >
                {t.phoneTab}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.methodBtn, loginMethod === 'passport' && styles.methodBtnActive]}
              onPress={() => setLoginMethod('passport')}
            >
              <Ionicons
                name="book"
                size={16}
                color={loginMethod === 'passport' ? '#0058be' : '#6B7380'}
              />
              <Text
                style={[
                  styles.methodText,
                  loginMethod === 'passport' && styles.methodTextActive,
                ]}
              >
                {t.passportTab}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Phone Field */}
          {loginMethod === 'phone' && (
            <View style={styles.fieldCard}>
              <Text style={styles.label}>{t.phoneLabel}</Text>
              <View style={styles.phoneRow}>
                <View style={styles.prefixBox}>
                  <Text style={styles.prefixText}>+265</Text>
                </View>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="999 412 804"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                  maxLength={12}
                />
              </View>
              <View style={styles.hintRow}>
                <Ionicons name="flash" size={14} color="#006c49" />
                <Text style={styles.hintText}>
                  Tidzakutumizirani uthenga wa nambala (Free SMS OTP)
                </Text>
              </View>
            </View>
          )}

          {/* Passport Field */}
          {loginMethod === 'passport' && (
            <View style={styles.fieldCard}>
              <Text style={styles.label}>{t.passportLabel}</Text>
              <View style={styles.passportRow}>
                <Ionicons name="card" size={18} color="#6B7380" style={{ marginRight: 8 }} />
                <TextInput
                  style={styles.passportInput}
                  placeholder="YP-88219 kapena KCH-4092"
                  autoCapitalize="characters"
                  value={passport}
                  onChangeText={setPassport}
                />
                <TouchableOpacity>
                  <Ionicons name="qr-code" size={22} color="#0058be" />
                </TouchableOpacity>
              </View>
              <Text style={styles.hintText}>
                Impezeka patsamba loyamba la Bukhu lanu la Zaumoyo ku KCH.
              </Text>
            </View>
          )}

          {/* PIN */}
          <View style={styles.fieldCard}>
            <View style={styles.pinHeader}>
              <Text style={styles.label}>{t.pinLabel}</Text>
              <TouchableOpacity>
                <Text style={styles.forgotText}>{t.forgotPin}</Text>
              </TouchableOpacity>
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
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace' && !pin[i] && i > 0) {
                      pinRefs[i - 1].current?.focus();
                    }
                  }}
                />
              ))}
            </View>
          </View>

          {/* Caregiver Toggle */}
          <TouchableOpacity
            style={styles.caregiverCard}
            onPress={() => setIsCaregiver(!isCaregiver)}
            activeOpacity={0.7}
          >
            <View style={styles.caregiverLeft}>
              <Ionicons name="people" size={20} color="#0058be" />
              <View>
                <Text style={styles.caregiverTitle}>{t.caregiver}</Text>
                <Text style={styles.caregiverSub}>{t.caregiverSub}</Text>
              </View>
            </View>
            <View style={[styles.checkbox, isCaregiver && styles.checkboxChecked]}>
              {isCaregiver && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
            </View>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} activeOpacity={0.85}>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            <Text style={styles.loginBtnText}>{t.loginBtn}</Text>
          </TouchableOpacity>

          {/* USSD Banner */}
          <View style={styles.ussdCard}>
            <View style={styles.ussdIcon}>
              <Ionicons name="cellular" size={18} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.ussdTitle}>{t.ussdTitle}</Text>
              <Text style={styles.ussdText}>{t.ussdText}</Text>
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
         style={{ alignItems: 'center', marginTop: 16 }}
         onPress={() => navigation.navigate('SignUp')} >
            <Text style={{ fontSize: 14, color: '#6B7380' }}>
                 Mulibe akaunti?{' '}
            <Text style={{ color: '#0058be', fontWeight: '700' }}>
                 Lembetsani pano (Sign Up)
             </Text>
            </Text>
        </TouchableOpacity>

        {/* Bottom Help Bar */}
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Ionicons name="call" size={18} color="#0058be" />
            <View>
              <Text style={styles.footerTitle}>{t.helpTitle}</Text>
              <Text style={styles.footerSub}>{t.helpSub}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.helplineBtn}
            onPress={() => Alert.alert('Calling', 'Connecting to 800-265 (Toll-Free)...')}
          >
            <Ionicons name="call" size={14} color="#FFFFFF" />
            <Text style={styles.helplineText}>800-265 (Free)</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9ff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#e7eeff',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0058be',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0058be',
  },
  brandSub: {
    fontSize: 11,
    color: '#6B7380',
  },
  langBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#e7eeff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  langText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0058be',
  },
  scroll: {
    padding: 20,
    paddingBottom: 30,
  },
  audioCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f3ff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
  },
  audioLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  audioIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0058be',
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111c2d',
  },
  audioSub: {
    fontSize: 11,
    color: '#6B7380',
  },
  audioDuration: {
    backgroundColor: '#d8e2ff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  audioDurationText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#001a42',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111c2d',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7380',
    lineHeight: 19,
    marginBottom: 20,
  },
  methodRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  methodBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: '#f0f3ff',
    borderWidth: 1.5,
    borderColor: '#e7eeff',
  },
  methodBtnActive: {
    backgroundColor: '#d8e2ff',
    borderColor: '#0058be',
  },
  methodText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7380',
  },
  methodTextActive: {
    color: '#0058be',
    fontWeight: '700',
  },
  fieldCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e7eeff',
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111c2d',
    marginBottom: 8,
  },
  phoneRow: {
    flexDirection: 'row',
    gap: 8,
  },
  prefixBox: {
    backgroundColor: '#e7eeff',
    borderRadius: 12,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  prefixText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111c2d',
  },
  phoneInput: {
    flex: 1,
    height: 48,
    backgroundColor: '#f0f3ff',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    fontWeight: '600',
    color: '#111c2d',
  },
  passportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f3ff',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  passportInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#111c2d',
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  hintText: {
    fontSize: 11,
    color: '#6B7380',
    flex: 1,
  },
  pinHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  forgotText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0058be',
  },
  pinRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
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
  caregiverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f3ff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e7eeff',
  },
  caregiverLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  caregiverTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111c2d',
  },
  caregiverSub: {
    fontSize: 11,
    color: '#6B7380',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#c2c6d6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#0058be',
    borderColor: '#0058be',
  },
  loginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#0058be',
    borderRadius: 30,
    paddingVertical: 16,
    marginBottom: 16,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  ussdCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#e6f9f0',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#b7f5d6',
  },
  ussdIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#006c49',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ussdTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#006c49',
    marginBottom: 2,
  },
  ussdText: {
    fontSize: 12,
    color: '#374151',
    lineHeight: 17,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#f0f3ff',
    borderTopWidth: 1,
    borderTopColor: '#e7eeff',
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111c2d',
  },
  footerSub: {
    fontSize: 10,
    color: '#6B7380',
  },
  helplineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#0058be',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  helplineText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});