

```md
# Tikondane Care — Mobile App

Bilingual (Chichewa / English) React Native mobile app for cancer patients and caregivers in Malawi.

This is the **patient smartphone app**. The nurse dashboard is a separate project maintained by the rest of the team.

---

## What this app does

Patients and caregivers use the app to:

- Track daily medications and mark doses as taken
- See their care path / appointment schedule
- Access travel support (Chikondi Travel Fund) and contact nurse navigators
- Read and share survivor stories in the community feed (Gulu)
- Report urgent symptoms (Emergency Triage)
- Sign in / sign up with phone + PIN

---

## Screens overview

| Tab / Screen | Name (Chichewa) | Purpose |
|--------------|-----------------|---------|
| **Lero** | Today / Home | Daily overview, quick actions, links to Triage & Missed Appointment |
| **Ulendo** | Schedule / Care Path | Upcoming appointments, pre-visit checklist, treatment timeline |
| **Mankhwala** | Medicines | Daily doses, mark as taken, pharmacy status, SOS warning |
| **Gulu** | Community | Survivor stories feed, filters, like/comment, share story |
| **Thandizo** | Support | Travel fund voucher, nurse navigator, HSA, peer group, emergency |
| **Sign In / Sign Up** | — | Phone + 4-digit PIN auth (Patient or Caregiver) |
| **Triage** | Zadzidzidzi | Symptom check-in (nausea, pain, fever) → nurse alert |
| **Missed Appointment** | — | Report why an appointment was missed |
| **Story Detail** | — | Full survivor story + comments thread |
| **Share Story** | Gawani Nkhani | Guided form to post a story or question |

Bottom tabs: **Lero · Ulendo · Mankhwala · Gulu · Thandizo**

---

## Tech stack

- **Expo** (React Native)
- **React Navigation** (bottom tabs + stack)
- **Expo Vector Icons** (Ionicons)
- Functional components + hooks (`useState`)
- StyleSheet (shared theme + components for consistency)

---

## Prerequisites

- Node.js 18+ (recommended)
- npm or yarn
- A physical Android phone **or** Android emulator
- [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) installed on the phone
- USB cable (if using USB debugging)
- ADB (Android Debug Bridge) — usually comes with Android Studio, or install standalone

### Install ADB (if you don’t have it)

**Windows**
1. Download [platform-tools](https://developer.android.com/tools/releases/platform-tools)
2. Extract and add the folder to your system `PATH`

**Mac**
```bash
brew install android-platform-tools
```

**Linux**
```bash
sudo apt install android-tools-adb
```

Check it works:
```bash
adb version
```

---

## Setup

From the repo root (or the `mobile` folder):

```bash
cd mobile
npm install
```

---

## How to run (USB debugging — recommended)

This is the method used during development.

1. **Enable USB debugging** on your phone  
   Settings → About phone → tap Build number 7 times → Developer options → USB debugging ON

2. **Connect the phone** with a USB cable and accept the “Allow USB debugging” prompt

3. **Reverse the Metro port** (so the phone can reach your computer):
   ```bash
   adb reverse tcp:8081 tcp:8081
   ```

4. **Start Expo** (clear cache):
   ```bash
   npx expo start -c
   ```

5. On the phone, open **Expo Go** and connect to:
   ```
   exp://localhost:8081
   ```
   Or scan the QR code if it appears and the phone is on the same network.

The app should load on the device.

---

## Alternative: same Wi‑Fi (no USB)

If phone and computer are on the same Wi‑Fi:

```bash
npx expo start -c
```

Then scan the QR code with Expo Go (Android) or the Camera app (iOS).

If the connection fails, try tunnel mode:

```bash
npx expo start -c --tunnel
```

---

## Project structure

```
mobile/
├── App.js                 # Entry — wraps NavigationContainer
├── AppNavigator.js        # Tabs + Stack navigators
├── theme.js               # Shared colors, spacing, radius
├── package.json
├── src/
│   ├── components/
│   │   ├── AppHeader.js
│   │   ├── Card.js
│   │   ├── PrimaryButton.js
│   │   ├── SecondaryButton.js
│   │   ├── SectionHeader.js
│   │   └── Badge.js
│   └── screens/
│       ├── HomeScreen.js          # Lero
│       ├── CarePathScreen.js      # Ulendo
│       ├── MedicinesScreen.js     # Mankhwala
│       ├── CommunityScreen.js     # Gulu
│       ├── SupportScreen.js       # Thandizo
│       ├── SignInScreen.js
│       ├── SignUpScreen.js
│       ├── TriageScreen.js
│       ├── MissedAppointmentScreen.js
│       ├── StoryDetailScreen.js
│       └── ShareStoryScreen.js
└── README.md
```

---

## Navigation map

```
Stack
├── SignIn          (initial)
├── SignUp
├── Tabs
│   ├── Lero        → HomeScreen
│   ├── Ulendo      → CarePathScreen
│   ├── Mankhwala   → MedicinesScreen
│   ├── Gulu        → CommunityScreen
│   └── Thandizo    → SupportScreen
├── Triage
├── MissedAppointment
├── StoryDetail
└── ShareStory
```

From **Home** you can navigate to Triage and Missed Appointment.  
From **Community** you can open Story Detail and Share Story.

---

## Notes for the team

- This app is **patient-facing**. It does not replace the nurse dashboard.
- Auth is currently mock (PIN only). Real backend / SMS alerts are planned later.
- Emergency Triage currently shows an alert; real nurse notification will need the backend.
- Travel fund, medication adherence, and community posts use local state for now.
- Language toggle (NY / EN) is UI-only at the moment; full i18n can be added later.
- Design system lives in `theme.js` + shared components under `src/components/`. Prefer those over one-off styles when adding new UI.

---

## Common commands

```bash
# Install dependencies
npm install

# Start with clean cache
npx expo start -c

# USB port reverse (run once per phone connection)
adb reverse tcp:8081 tcp:8081

# Check connected devices
adb devices

# Tunnel mode (if LAN fails)
npx expo start -c --tunnel
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| “Unable to resolve module” | Stop Expo, delete `node_modules`, run `npm install`, then `npx expo start -c` |
| Phone can’t connect | Run `adb reverse tcp:8081 tcp:8081` again; confirm USB debugging is on |
| Red screen / syntax error | Check import paths (`theme.js` is in `mobile/` root → use `../../theme` from `src/`) |
| Blank screen after login | Confirm `AppNavigator.js` registers `Tabs`, `SignIn`, `SignUp`, etc. |

---

## Contact / ownership

- **Mobile app (this repo folder):** patient smartphone experience  
- **Nurse dashboard:** separate codebase owned by the rest of the team  

If something is unclear after pulling, ask the person who last worked on the mobile folder or open an issue on the PR.
```

---

### Where to put it

- Prefer: `mobile/README.md`  
- Or: repo root `README.md` if the whole repo is only the mobile app  

After you push, teammates can:

```bash
git pull
cd mobile
npm install
adb reverse tcp:8081 tcp:8081   # if using USB
npx expo start -c
```

