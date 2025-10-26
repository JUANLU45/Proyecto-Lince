/**
 * ConfiguracionScreen - Ajustes y preferencias
 * TODO: Implementar completo
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants';
import type { ConfiguracionScreenNavigationProp } from '../types';

interface ConfiguracionScreenProps {
  navigation: ConfiguracionScreenNavigationProp;
}

const ConfiguracionScreen: React.FC<ConfiguracionScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Configuración</Text>
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

export default ConfiguracionScreen;
