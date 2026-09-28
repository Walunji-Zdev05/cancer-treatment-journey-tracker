import { View, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../theme/theme';

export default function Card({ children, style, tinted }) {
  return (
    <View style={[styles.card, tinted && styles.tinted, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tinted: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primaryLight,
  },
});
