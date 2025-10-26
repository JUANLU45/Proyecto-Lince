import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { RinconCalmaScreenProps } from '../types';
import { theme } from '../constants';

/**
 * RinconCalmaScreen - Espacio de calma y relajación
 *
 * Placeholder temporal para FASE 4
 * TODO: Implementar funcionalidad completa según APP_BLUEPRINT.md
 */
const RinconCalmaScreen: React.FC<RinconCalmaScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Rincón de Calma</Text>
      <Text style={styles.subtitle}>(En implementación)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.azulCalma,
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

export default RinconCalmaScreen;
