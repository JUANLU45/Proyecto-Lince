/**
 * PortalPadresScreen - Dashboard para padres
 * TODO: Implementar completo
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants';
import type { PortalPadresScreenNavigationProp } from '../types';

interface PortalPadresScreenProps {
  navigation: PortalPadresScreenNavigationProp;
}

const PortalPadresScreen: React.FC<PortalPadresScreenProps> = ({ navigation: _navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Portal de Padres</Text>
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

export default PortalPadresScreen;
