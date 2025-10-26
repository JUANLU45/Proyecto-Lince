import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { SugerenciaIAScreenProps } from '../types';
import { theme } from '../constants';

/**
 * SugerenciaIAScreen - Modal de sugerencias de IA
 *
 * Placeholder temporal para FASE 4
 * TODO: Implementar funcionalidad completa según APP_BLUEPRINT.md
 */
const SugerenciaIAScreen: React.FC<SugerenciaIAScreenProps> = ({ route }) => {
  const { sugerencia } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sugerencia de IA</Text>
      <Text style={styles.subtitle}>Tipo: {sugerencia.tipo}</Text>
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

export default SugerenciaIAScreen;
