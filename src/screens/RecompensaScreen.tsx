import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { RecompensaScreenProps } from '../types';
import { theme } from '../constants';

/**
 * RecompensaScreen - Pantalla de celebración y recompensas
 *
 * Placeholder temporal para FASE 4
 * TODO: Implementar funcionalidad completa según APP_BLUEPRINT.md
 */
const RecompensaScreen: React.FC<RecompensaScreenProps> = ({ route }) => {
  const { actividadId, puntos } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>¡Recompensa!</Text>
      <Text style={styles.subtitle}>Actividad: {actividadId}</Text>
      <Text style={styles.subtitle}>Puntos: {puntos}</Text>
      <Text style={styles.subtitle}>(En implementación)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.amarilloSol,
  },
  text: {
    fontSize: theme.typography.fontSize.h1,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.grisOscuro,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.bodyMedium,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisOscuro,
    marginTop: theme.spacing.sm,
  },
});

export default RecompensaScreen;
