import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';

export default function AppHeader({
  title,
  showBack = false,
  onBack,
  showSearch = false,
  showNotifications = false,
  showSos = true,
  navigation,
}) {
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        {showBack ? (
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={onBack || (() => navigation?.goBack?.())}
          >
            <Ionicons name="arrow-back" size={20} color={colors.onSurface} />
          </TouchableOpacity>
        ) : (
          <View style={styles.logoCircle}>
            <Ionicons name="heart" size={18} color={colors.primary} />
          </View>
        )}

        <View style={{ flex: 1 }}>
          <View style={styles.brandRow}>
            <Text style={styles.brand}>Tikondane</Text>
            <View style={styles.careBadge}>
              <Text style={styles.careText}>Care</Text>
            </View>
          </View>

          {title ? (
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          ) : (
            <View style={styles.patientRow}>
              <Text style={styles.patientName}>Alineti Banda</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.kch}>KCH-4092</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.right}>
        <TouchableOpacity style={styles.langBtn}>
          <Text style={styles.langActive}>NY</Text>
          <Text style={styles.langSlash}>/</Text>
          <Text style={styles.langInactive}>EN</Text>
        </TouchableOpacity>

        {showSearch && (
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="search" size={18} color={colors.onSurface} />
          </TouchableOpacity>
        )}

        {showNotifications && (
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={18} color={colors.onSurface} />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        )}

        {showSos && (
          <TouchableOpacity
            style={styles.sosBtn}
            onPress={() => navigation?.navigate?.('Triage')}
          >
            <Ionicons name="warning" size={14} color="#FFFFFF" />
          </TouchableOpacity>
        )}

        <View style={styles.avatar}>
          <Ionicons name="person" size={14} color="#FFFFFF" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(249,249,255,0.97)',
    borderBottomWidth: 1,
    borderBottomColor: '#e7eeff',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryFixed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brand: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
  careBadge: {
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  careText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#002113',
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.onSurface,
    marginTop: 1,
  },
  patientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 1,
  },
  patientName: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
  },
  dot: {
    fontSize: 10,
    color: colors.outline,
  },
  kch: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  langBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 2,
  },
  langActive: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  langSlash: {
    fontSize: 11,
    color: colors.outline,
  },
  langInactive: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  sosBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});