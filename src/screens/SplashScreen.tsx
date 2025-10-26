/**
 * SplashScreen - Pantalla inicial de carga
 * Basado en: APP_BLUEPRINT.md líneas 6-16
 * 
 * Especificaciones:
 * - Logo de Proyecto Lince con Leo
 * - Animación suave de entrada
 * - Barra de progreso de carga
 * - Duración máxima: 3 segundos
 * - Transición a Onboarding o MapaMundo según estado
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { theme, strings } from '../constants';
import type { SplashScreenNavigationProp } from '../types';
import Loading from '../components/Common/Loading';

interface SplashScreenProps {
  navigation: SplashScreenNavigationProp;
}

/**
 * Componente SplashScreen
 * Según PROJECT_REQUIREMENTS.md RNF-002: Tiempo de carga < 3s
 */
const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Simular carga de recursos (en producción: cargar assets, fonts, etc.)
    const timer = setTimeout(() => {
      // TODO: Verificar si usuario ya completó onboarding
      // Por ahora siempre va a Onboarding
      navigation.replace('Onboarding');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo (placeholder por ahora - en producción usar Image con logo real) */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>🦁</Text>
          <Text style={styles.logoText}>Proyecto Lince</Text>
          <Text style={styles.subtitle}>Con Leo el Lince</Text>
        </View>

        {/* Loading indicator */}
        <View style={styles.loadingContainer}>
          <Loading 
            tipo="inline" 
            mensaje={strings.common.cargando}
          />
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
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  logoEmoji: {
    fontSize: 120,
    marginBottom: theme.spacing.md,
  },
  logoText: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.h1,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.blancoPuro,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily.secondary,
    fontSize: theme.typography.fontSize.bodyLarge,
    color: theme.colors.blancoPuro,
    opacity: theme.opacity.hover,
  },
  loadingContainer: {
    marginTop: theme.spacing.xl,
  },
});

export default SplashScreen;
