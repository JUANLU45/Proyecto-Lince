/**
 * SplashScreen - Pantalla de carga inicial
 * Basado en: APP_BLUEPRINT.md - Pantalla 1: Splash Screen
 *
 * Funcionalidad:
 * - Mostrar logo de Proyecto Lince con Leo
 * - Animación suave de entrada
 * - Barra de progreso de carga
 * - Cargar recursos iniciales
 * - Duración: 2-3 segundos máximo
 * - Redirigir a Welcome o MainMap según estado de onboarding
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SplashScreenNavigationProp } from '../navigation/types';

// Imports desde directorios centralizados - Mandamiento 📂
import { theme } from '../constants';
import { strings } from '../constants';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animación de entrada suave
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: theme.animations.duration.slow,
      useNativeDriver: true,
    }).start();

    // Simular carga de recursos
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          navigation.replace('Welcome');
        }, 500);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [fadeAnim, navigation]);

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityLabel={strings.accesibilidad.feedback}
    >
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Logo y título */}
        <View style={styles.logoContainer}>
          <Text style={styles.title}>Proyecto Lince</Text>
          <Text style={styles.subtitle}>{strings.splash.subtitulo}</Text>
        </View>

        {/* Barra de progreso */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {strings.splash.loading}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.azulCalma,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  title: {
    fontSize: theme.typography.fontSize.h1,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.blancoPuro,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.h3,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.blancoPuro,
    textAlign: 'center',
  },
  progressContainer: {
    alignItems: 'center',
    width: '80%',
    marginTop: theme.spacing.xl,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.round,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.verdeJungla,
    borderRadius: theme.borderRadius.round,
  },
  progressText: {
    fontSize: theme.typography.fontSize.bodyMedium,
    color: theme.colors.blancoPuro,
    fontWeight: theme.typography.fontWeight.medium,
  },
});

export default SplashScreen;
