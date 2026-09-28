import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Card from '../components/Card';
import { colors, spacing, typography } from '../theme/theme';
import { medicines as initialMeds } from '../data/mockData';

export default function MedicinesScreen() {
  const [meds, setMeds] = useState(initialMeds);
  const takenCount = meds.filter((m) => m.taken).length;

  const toggle = (id) => {
    setMeds((prev) => prev.map((m) => (m.id === id ? { ...m, taken: !m.taken } : m)));
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: spacing.md }}>
      <View style={styles.headerRow}>
        <Text style={typography.title}>Today's Medicines</Text>
        <Text style={typography.small}>{takenCount} of {meds.length} taken</Text>
      </View>

      {meds.map((med) => (
        <TouchableOpacity key={med.id} onPress={() => toggle(med.id)}>
          <Card style={[styles.medCard, med.taken && styles.medCardTaken]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.medName}>{med.name}</Text>
              <Text style={typography.small}>{med.note}</Text>
              <Text style={typography.small}>Due {med.due}</Text>
            </View>
            <View style={[styles.checkbox, med.taken && styles.checkboxChecked]}>
              {med.taken && <Text style={{ color: '#fff' }}>✓</Text>}
            </View>
          </Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  medCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  medCardTaken: { backgroundColor: colors.primaryLight },
  medName: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  checkbox: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: colors.primary },
});
