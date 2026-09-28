import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Card from '../components/Card';
import { colors, spacing, typography } from '../theme/theme';
import { careSteps, nextVisit } from '../data/mockData';

const statusColor = {
  completed: colors.primary,
  next: colors.accent,
  upcoming: colors.textMuted,
};

export default function ScheduleScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: spacing.md }}>
      <Text style={typography.title}>My Care Path</Text>
      <Text style={[typography.body, { marginBottom: spacing.md }]}>
        {nextVisit.cycleLabel} · {nextVisit.percentComplete}% complete
      </Text>

      {careSteps.map((step, i) => (
        <View key={step.id} style={styles.timelineRow}>
          <View style={styles.timelineDotCol}>
            <View style={[styles.dot, { backgroundColor: statusColor[step.status] }]} />
            {i < careSteps.length - 1 && <View style={styles.line} />}
          </View>
          <Card style={{ flex: 1, marginBottom: spacing.lg }}>
            <Text style={typography.small}>{step.date}</Text>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={typography.body}>{step.note}</Text>
          </Card>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  timelineRow: { flexDirection: 'row' },
  timelineDotCol: { alignItems: 'center', width: 28 },
  dot: { width: 14, height: 14, borderRadius: 7, marginTop: 6 },
  line: { width: 2, flex: 1, backgroundColor: colors.border, marginTop: 4 },
  stepTitle: { fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginVertical: 4 },
});
