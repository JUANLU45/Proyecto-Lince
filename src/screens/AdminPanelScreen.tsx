import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { AdminPanelScreenProps } from '../types';
import { theme } from '../constants';

/**
 * AdminPanelScreen - Panel de administración
 *
 * Placeholder temporal para FASE 4
 * TODO: Implementar funcionalidad completa según APP_BLUEPRINT.md
 */
const AdminPanelScreen: React.FC<AdminPanelScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Panel de Administración</Text>
      <Text style={styles.subtitle}>(En implementación)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.rojoAdministrativo,
  },
  text: {
    fontSize: theme.typography.fontSize.h2,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.blancoPuro,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.bodyMedium,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.blancoPuro,
    marginTop: theme.spacing.sm,
  },
});

export default AdminPanelScreen;
