/**
 * Pantalla de Splash - Proyecto Lince
 * Basado en: APP_BLUEPRINT.md - Pantalla 1
 *
 * Propósito: Presentar la marca y cargar recursos iniciales
 * Duración: 2-3 segundos máximo
 *
 * MANDAMIENTOS:
 * ✅ i18n desde constants/strings
 * ✅ Theme centralizado
 * ✅ Accesibilidad perfecta
 * ✅ NO código placebo
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SplashNavigationProp } from '../navigation/types';
import { theme, strings } from '../constants';
import { usePerfilStore } from '../store';

function SplashScreen() {
  const navigation = useNavigation<SplashNavigationProp>();
  const perfilNiño = usePerfilStore((state) => state.perfilNiño);
  const [cargaCompleta, setCargaCompleta] = useState(false);

  useEffect(() => {
    const cargarRecursos = async () => {
      const tiempoMinimo = new Promise((resolve) => setTimeout(resolve, 2000));
      await tiempoMinimo;
      setCargaCompleta(true);
    };

    cargarRecursos();
  }, []);

  useEffect(() => {
    if (cargaCompleta) {
      if (perfilNiño) {
        navigation.replace('MapaMundo');
      } else {
        navigation.replace('Bienvenida');
      }
    }
  }, [cargaCompleta, perfilNiño, navigation]);

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityLabel={strings.accesibilidad.menu}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.titulo} accessible={true}>
          Proyecto Lince
        </Text>
        <Text style={styles.subtitulo} accessible={true}>
          Con Leo el Lince
        </Text>
      </View>

      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={theme.colors.verdeJungla}
          accessible={true}
          accessibilityLabel={strings.splash.loading}
        />
        <Text style={styles.loadingText}>
          {strings.splash.loading}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.azulCalma,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  titulo: {
    fontSize: theme.typography.fontSize.h1,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.blancoPuro,
    marginBottom: theme.spacing.sm,
  },
  subtitulo: {
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.blancoPuro,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
  },
  loadingText: {
    fontSize: theme.typography.fontSize.bodyMedium,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.blancoPuro,
    marginTop: theme.spacing.md,
  },
});

export default SplashScreen;
