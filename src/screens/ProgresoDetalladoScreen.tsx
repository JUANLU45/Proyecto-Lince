import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ProgresoDetalladoScreenProps } from '../types';
import { theme } from '../constants';

/**
 * ProgresoDetalladoScreen - Vista detallada del progreso del niño
 *
 * Placeholder temporal para FASE 4
 * TODO: Implementar funcionalidad completa según APP_BLUEPRINT.md
 */
const ProgresoDetalladoScreen: React.FC<ProgresoDetalladoScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Progreso Detallado</Text>
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

export default ProgresoDetalladoScreen;
