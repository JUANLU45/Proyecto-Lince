/**
 * MapaMundoScreen - Hub central de navegación
 * Basado en: APP_BLUEPRINT.md líneas 50-68
 * 
 * TODO: Implementar completo con las 5 islas temáticas
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants';
import type { MapaMundoScreenNavigationProp } from '../types';

interface MapaMundoScreenProps {
  navigation: MapaMundoScreenNavigationProp;
}

const MapaMundoScreen: React.FC<MapaMundoScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mapa del Mundo de Leo</Text>
      <Text style={styles.subtitle}>(En implementación)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.grisClaro,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.h2,
    color: theme.colors.grisOscuro,
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily.secondary,
    fontSize: theme.typography.fontSize.bodyMedium,
    color: theme.colors.grisAdministrativo,
    marginTop: theme.spacing.sm,
  },
});

export default MapaMundoScreen;
