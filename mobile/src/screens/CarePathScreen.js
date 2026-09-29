import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

// ---------------------------------------------------------------------------
// MOCK DATA
// Same idea as HomeScreen.js: this stands in for what would later come from
// your backend. Notice `timelineSteps` is an array — that's what lets us
// render the timeline with a single .map() instead of writing each step by
// hand three times.
// ---------------------------------------------------------------------------
const carePathData = {
  protocol: {
    name: 'Chemotherapy Protocol',
    plan: 'Breast Cancer Care Plan',
    detail: '6 Infusion Cycles • Kamuzu Central Hospital',
    currentCycle: 3,
    totalCycles: 6,
    percentComplete: 45,
    summaryNote: 'Mwatsiriza magawo 2 mwa magawo 6 • You have completed 2 cycles',
    milestoneNote: 'Mukamaliza gawo la 3 mudzakhala pakati penipeni pa chithandizo chanu.',
  },
  toBring: [
    { icon: 'card-outline', englishLabel: 'Health Passport', chichewaLabel: 'Buku lachikasu lachipatala' },
    { icon: 'id-card-outline', englishLabel: 'National ID Card', chichewaLabel: 'Chitupa cha boma kapena kalata' },
    { icon: 'nutrition-outline', englishLabel: 'Light Snack & Water', chichewaLabel: 'Zodya zopepuka ndi madzi akumwa' },
    { icon: 'shirt-outline', englishLabel: 'Warm Chitenge Wrap', chichewaLabel: 'Chitenge chofunda nthawi ya mankhwala' },
  ],
  navigator: {
    name: 'Sister Chifundo Banda',
    role: 'Dedicated Oncology Patient Navi...',
  },
};

const timelineSteps = [
  {
    id: 1,
    state: 'completed',
    eyebrow: 'CYCLE 1 • TSIRIZIDWA',
    date: '12 Sept 2024',
    title: 'Cycle 1 Chemotherapy Infusion',
    detail: 'Completed at Day Care Unit • Tolerated well with mild fatigue',
    footnote: 'Care navigator confirmed completion',
  },
  {
    id: 2,
    state: 'completed',
    eyebrow: 'CYCLE 2 • TSIRIZIDWA',
    date: '03 Oct 2024',
    title: 'Cycle 2 Chemotherapy & Blood Tests',
    detail: 'Full blood counts checked • White cell recovery stable',
    pill: 'Normal Bloods',
    pillNote: 'Mwazi unali bwino',
  },
  {
    id: 3,
    state: 'next',
    eyebrow: 'NEXT VISIT • ULENDO WOTSATIRA',
    eyebrowRight: 'This Thursday',
    title: 'Cycle 3 Chemotherapy & Navigator Review',
    subtitle: 'Gawo lachitatu la mankhwala ndi kukambirana ndi namwino',
    visitDate: 'Thursday, 24 October 2024',
    visitTime: '08:30 AM (Morning Clinic)',
    visitLocation: 'KCH Oncology Day Clinic • Ward 4 Unit',
    checklist: [
      { id: 'c1', label: 'Mwani magalasi 2 amadzi musanapite', sublabel: 'Drink 2 cups of water before arriving', checked: true },
      { id: 'c2', label: 'Tengani buku lachikasu lachipatala', sublabel: 'Bring yellow health passport book', checked: true },
      { id: 'c3', label: 'Idyani chakudya chopepuka m’mawa', sublabel: 'Have a gentle light meal', checked: false },
    ],
  },
  {
    id: 4,
    state: 'upcoming',
    eyebrow: 'MID-POINT CHECK',
    date: '14 Nov 2024',
    title: 'Mid-Treatment Ultrasound Scan',
    detail: 'Kuyezetsa ultrasound yowona momwe mankhwala akuthandizira (Response assessment)',
  },
  {
    id: 5,
    state: 'upcoming',
    eyebrow: 'CYCLE 4',
    date: '28 Nov 2024',
    title: 'Cycle 4 Chemotherapy Infusion',
    detail: 'Oncology Day Clinic, Kamuzu Central Hospital',
  },
  {
    id: 6,
    state: 'upcoming',
    eyebrow: 'NEXT HORIZON',
    date: 'Dec 2024',
    title: 'Post-Chemo Surgical Review',
    detail: 'Kukambirana ndi adotolo a opaleshoni (Consultation with surgical oncology team)',
  },
];

// ---------------------------------------------------------------------------
// TIMELINE NODE — the marker + connecting line on the left of each step.
// This is a separate component because the same little "dot + line" shape
// repeats for every step, just with different colors/icons depending on
// state (completed / next / upcoming).
// ---------------------------------------------------------------------------
function TimelineMarker({ state, isLast }) {
  return (
    <View style={styles.markerColumn}>
      {state === 'completed' && (
        <View style={styles.markerCompleted}>
          <Ionicons name="checkmark" size={14} color="#FFFFFF" />
        </View>
      )}
      {state === 'next' && (
        <View style={styles.markerNext}>
          <View style={styles.markerNextInner} />
        </View>
      )}
      {state === 'upcoming' && <View style={styles.markerUpcoming} />}

      {!isLast && (
        <View
          style={[
            styles.markerLine,
            state === 'completed' && styles.markerLineCompleted,
          ]}
        />
      )}
    </View>
  );
}

function ChecklistItem({ item }) {
  return (
    <View style={styles.checklistRow}>
      <View style={[styles.checklistBox, item.checked && styles.checklistBoxChecked]}>
        {item.checked && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.checklistLabel}>{item.label}</Text>
        <Text style={styles.checklistSublabel}>{item.sublabel}</Text>
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// ONE TIMELINE STEP — renders differently based on `state`. Rather than
// three separate components, this uses conditionals inside one component
// since the three states share most of their layout (eyebrow + title + date)
// and only diverge in the extra content underneath.
// ---------------------------------------------------------------------------
function TimelineStep({ step, isLast, onSendReminder }) {
  const isNext = step.state === 'next';

  return (
    <View style={styles.timelineRow}>
      <TimelineMarker state={step.state} isLast={isLast} />

      <View style={[styles.stepCard, isNext && styles.stepCardNext]}>
        <View style={styles.stepHeaderRow}>
          <Text style={[styles.stepEyebrow, isNext && styles.stepEyebrowNext]}>
            {step.eyebrow}
          </Text>
          <Text style={[styles.stepDate, isNext && styles.stepDateNext]}>
            {step.eyebrowRight || step.date}
          </Text>
        </View>

        <Text style={styles.stepTitle}>{step.title}</Text>
        {step.subtitle && <Text style={styles.stepSubtitle}>{step.subtitle}</Text>}
        {step.detail && <Text style={styles.stepDetail}>{step.detail}</Text>}

        {step.pill && (
          <View style={styles.stepPillRow}>
            <View style={styles.stepPill}>
              <Text style={styles.stepPillText}>{step.pill}</Text>
            </View>
            <Text style={styles.stepPillNote}>{step.pillNote}</Text>
          </View>
        )}

        {step.footnote && (
          <View style={styles.stepFootnoteRow}>
            <Ionicons name="checkmark-circle" size={13} color="#2E9E5B" />
            <Text style={styles.stepFootnoteText}>{step.footnote}</Text>
          </View>
        )}

        {isNext && (
          <>
            <View style={styles.visitInfoBlock}>
              <View style={styles.visitInfoRow}>
                <Ionicons name="calendar" size={15} color="#2F6FE0" />
                <Text style={styles.visitInfoText}>{step.visitDate}</Text>
              </View>
              <View style={styles.visitInfoRow}>
                <Ionicons name="time" size={15} color="#2F6FE0" />
                <Text style={styles.visitInfoText}>{step.visitTime}</Text>
              </View>
              <View style={styles.visitInfoRow}>
                <MaterialIcons name="add-box" size={15} color="#2F6FE0" />
                <Text style={styles.visitInfoText}>{step.visitLocation}</Text>
              </View>
            </View>

            <View style={styles.checklistCard}>
              <Text style={styles.checklistTitle}>Pre-visit Checklist • Zomwe mukuyenera kukonza:</Text>
              {step.checklist.map((item) => (
                <ChecklistItem key={item.id} item={item} />
              ))}
            </View>

            <TouchableOpacity style={styles.reminderButton} onPress={onSendReminder}>
              <Ionicons name="chatbubble-ellipses" size={16} color="#FFFFFF" />
              <Text style={styles.reminderButtonText}>Tumizani Chikumbutso pa SMS (SMS Reminder)</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

function ToBringCard({ items }) {
  return (
    <View style={styles.bringCard}>
      <View style={styles.bringHeaderRow}>
        <Ionicons name="bag-handle-outline" size={18} color="#1F2937" />
        <Text style={styles.bringTitle}>Zofunika Kutenga • What to Bring to KCH</Text>
      </View>
      <Text style={styles.bringSubtitle}>Essential items for your appointment day</Text>

      <View style={styles.bringGrid}>
        {items.map((item, index) => (
          <View key={index} style={styles.bringItem}>
            <Ionicons name={item.icon} size={18} color="#2F6FE0" />
            <Text style={styles.bringItemLabel}>{item.englishLabel}</Text>
            <Text style={styles.bringItemSublabel}>{item.chichewaLabel}</Text>
          </View>
        ))}
      </View>

      <View style={styles.directionsCard}>
        <View style={styles.directionsHeaderRow}>
          <Ionicons name="navigate-outline" size={16} color="#2F6FE0" />
          <Text style={styles.directionsTitle}>Directions inside Kamuzu Central Hospital</Text>
        </View>
        <Text style={styles.directionsText}>
          The Oncology Day Care Unit is situated directly behind Ward 4. Follow the bright blue wall markings from the main corridor entrance.
        </Text>
        <TouchableOpacity style={styles.audioButton}>
          <Ionicons name="volume-medium" size={16} color="#2F6FE0" />
          <Text style={styles.audioButtonText}>Mverani Malangizo a Chichewa (Audio Directions)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function NavigatorStrip({ navigator, onCall }) {
  return (
    <View style={styles.navigatorStrip}>
      <View style={styles.navigatorAvatar}>
        <Ionicons name="person" size={20} color="#5B6472" />
      </View>
      <View style={styles.navigatorInfo}>
        <Text style={styles.navigatorName}>{navigator.name}</Text>
        <Text style={styles.navigatorRole}>{navigator.role}</Text>
      </View>
      <TouchableOpacity style={styles.navigatorCallButton} onPress={onCall}>
        <Ionicons name="call" size={16} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

// ---------------------------------------------------------------------------
// MAIN SCREEN
// ---------------------------------------------------------------------------
export default function CarePathScreen() {
  const { protocol } = carePathData;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Page title block */}
        <View style={styles.titleBlock}>
          <View style={styles.titleEyebrowRow}>
            <MaterialCommunityIcons name="map-marker-path" size={14} color="#2F6FE0" />
            <Text style={styles.titleEyebrow}>ULENDO WANGA • MY CARE PATH</Text>
            <View style={styles.onTrackBadge}>
              <Ionicons name="checkmark-circle" size={12} color="#1E8449" />
              <Text style={styles.onTrackText}>On Track</Text>
            </View>
          </View>
          <Text style={styles.pageTitle}>Ulendo Wanu Wa Mankhwala</Text>
          <Text style={styles.pageSubtitle}>
            Step-by-step milestones to help you and your guardian navigate treatment with peace of mind.
          </Text>
        </View>

        {/* Protocol summary card */}
        <View style={styles.protocolCard}>
          <View style={styles.protocolHeaderRow}>
            <View>
              <Text style={styles.protocolEyebrow}>{protocol.name}</Text>
              <Text style={styles.protocolPlan}>{protocol.plan}</Text>
              <Text style={styles.protocolDetail}>{protocol.detail}</Text>
            </View>
            <View style={styles.dropIconCircle}>
              <Ionicons name="water" size={16} color="#2F6FE0" />
            </View>
          </View>

          <View style={styles.cycleRow}>
            <Text style={styles.cycleText}>Cycle {protocol.currentCycle} of {protocol.totalCycles}</Text>
            <Text style={styles.cyclePercent}>{protocol.percentComplete}% Completed</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${protocol.percentComplete}%` }]} />
          </View>
          <Text style={styles.protocolSummaryNote}>{protocol.summaryNote}</Text>

          <View style={styles.milestoneCallout}>
            <Ionicons name="sunny" size={16} color="#C2650B" />
            <View style={{ flex: 1 }}>
              <Text style={styles.milestoneTitle}>Halftime Milestone Ahead!</Text>
              <Text style={styles.milestoneText}>{protocol.milestoneNote}</Text>
            </View>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.timelineHeaderRow}>
          <Text style={styles.timelineTitle}>Mndandanda wa Ulendo • Care Steps</Text>
          <Text style={styles.timelineUpdated}>Updated today</Text>
        </View>

        <View>
          {timelineSteps.map((step, index) => (
            <TimelineStep
              key={step.id}
              step={step}
              isLast={index === timelineSteps.length - 1}
              onSendReminder={() => alert('SMS reminder sent!')}
            />
          ))}
        </View>

        <ToBringCard items={carePathData.toBring} />

        <NavigatorStrip
          navigator={carePathData.navigator}
          onCall={() => alert('Calling navigator...')}
        />
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
    backgroundColor: '#EAF0FB',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },

  // Title block
  titleBlock: {
    marginBottom: 16,
  },
  titleEyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  titleEyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2F6FE0',
    flex: 1,
  },
  onTrackBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#DCF3E4',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  onTrackText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1E8449',
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1F2937',
    lineHeight: 32,
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#5B6472',
    lineHeight: 19,
  },

  // Protocol card
  protocolCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
  },
  protocolHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  protocolEyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2F6FE0',
    marginBottom: 2,
  },
  protocolPlan: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
  },
  protocolDetail: {
    fontSize: 12,
    color: '#8A93A3',
    marginTop: 2,
  },
  dropIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EAF0FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cycleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cycleText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  cyclePercent: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2F6FE0',
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#E5E9EF',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2F6FE0',
    borderRadius: 4,
  },
  protocolSummaryNote: {
    fontSize: 12,
    color: '#8A93A3',
    marginBottom: 14,
  },
  milestoneCallout: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#FDF0E4',
    borderRadius: 12,
    padding: 12,
  },
  milestoneTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#C2650B',
    marginBottom: 2,
  },
  milestoneText: {
    fontSize: 12,
    color: '#8A6A4F',
    lineHeight: 17,
  },

  // Timeline header
  timelineHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
  },
  timelineUpdated: {
    fontSize: 11,
    color: '#9AA3AF',
  },

  // Timeline row (marker + card)
  timelineRow: {
    flexDirection: 'row',
    gap: 12,
  },
  markerColumn: {
    alignItems: 'center',
    width: 24,
  },
  markerCompleted: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2E9E5B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerNext: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#2F6FE0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerNextInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2F6FE0',
  },
  markerUpcoming: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D2D8E2',
    marginTop: 6,
  },
  markerLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#D2D8E2',
    marginTop: 2,
  },
  markerLineCompleted: {
    backgroundColor: '#2E9E5B',
  },

  // Step card
  stepCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },
  stepCardNext: {
    backgroundColor: '#EAF0FB',
    borderWidth: 1,
    borderColor: '#2F6FE0',
  },
  stepHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  stepEyebrow: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8A93A3',
    letterSpacing: 0.2,
  },
  stepEyebrowNext: {
    color: '#2F6FE0',
  },
  stepDate: {
    fontSize: 11,
    color: '#9AA3AF',
  },
  stepDateNext: {
    color: '#2F6FE0',
    fontWeight: '700',
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  stepSubtitle: {
    fontSize: 12,
    color: '#5B6472',
    marginBottom: 6,
  },
  stepDetail: {
    fontSize: 12,
    color: '#8A93A3',
    lineHeight: 17,
  },
  stepPillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  stepPill: {
    backgroundColor: '#DCF3E4',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  stepPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1E8449',
  },
  stepPillNote: {
    fontSize: 11,
    color: '#8A93A3',
  },
  stepFootnoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 8,
  },
  stepFootnoteText: {
    fontSize: 11,
    color: '#2E9E5B',
    fontWeight: '600',
  },

  // Visit info block (inside "next" step)
  visitInfoBlock: {
    gap: 8,
    marginTop: 10,
    marginBottom: 12,
  },
  visitInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  visitInfoText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
  },

  // Checklist
  checklistCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  checklistTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 10,
  },
  checklistRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  checklistBox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#C7CEDA',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  checklistBoxChecked: {
    backgroundColor: '#2F6FE0',
    borderColor: '#2F6FE0',
  },
  checklistLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
  },
  checklistSublabel: {
    fontSize: 11,
    color: '#8A93A3',
  },

  // Reminder button
  reminderButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#2F6FE0',
    borderRadius: 14,
    paddingVertical: 13,
  },
  reminderButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
    textAlign: 'center',
  },

  // To Bring card
  bringCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginTop: 4,
    marginBottom: 16,
  },
  bringHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  bringTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
  },
  bringSubtitle: {
    fontSize: 12,
    color: '#8A93A3',
    marginBottom: 14,
  },
  bringGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 14,
  },
  bringItem: {
    width: '47%',
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    padding: 12,
    gap: 4,
  },
  bringItemLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
  },
  bringItemSublabel: {
    fontSize: 11,
    color: '#8A93A3',
  },

  // Directions card
  directionsCard: {
    backgroundColor: '#EAF0FB',
    borderRadius: 14,
    padding: 14,
  },
  directionsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  directionsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
  },
  directionsText: {
    fontSize: 12,
    color: '#5B6472',
    lineHeight: 17,
    marginBottom: 12,
  },
  audioButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 11,
  },
  audioButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2F6FE0',
    textAlign: 'center',
  },

  // Navigator strip
  navigatorStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
  },
  navigatorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E5E9EF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigatorInfo: {
    flex: 1,
  },
  navigatorName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
  },
  navigatorRole: {
    fontSize: 11,
    color: '#8A93A3',
  },
  navigatorCallButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1E8449',
    justifyContent: 'center',
    alignItems: 'center',
  },
});