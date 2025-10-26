import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { IslaScreenProps } from '../types';
import { theme } from '../constants';

/**
 * IslaScreen - Pantalla de lista de actividades por isla
 *
 * Placeholder temporal para FASE 4
 * TODO: Implementar funcionalidad completa según APP_BLUEPRINT.md
 */
const IslaScreen: React.FC<IslaScreenProps> = ({ route }) => {
  const { islaId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Isla: {islaId}</Text>
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

export default IslaScreen;
