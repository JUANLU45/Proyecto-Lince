import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { PreActividadScreenProps } from '../types';
import { theme } from '../constants';

/**
 * PreActividadScreen - Configuración antes de iniciar actividad
 *
 * Placeholder temporal para FASE 4
 * TODO: Implementar funcionalidad completa según APP_BLUEPRINT.md
 */
const PreActividadScreen: React.FC<PreActividadScreenProps> = ({ route }) => {
  const { actividadId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pre-Actividad: {actividadId}</Text>
      <Text style={styles.subtitle}>(En implementación)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.grisClaro,
  },
  text: {
    fontSize: theme.typography.fontSize.h2,
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

export default PreActividadScreen;
