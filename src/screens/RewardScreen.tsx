/**
 * RewardScreen - Pantalla de Recompensa
 * Basado en: APP_BLUEPRINT.md - Pantalla 9: Pantalla de Recompensa
 *
 * Funcionalidad:
 * - Celebrar logros
 * - Leo celebrando
 * - Mostrar estrellas ganadas
 * - Animación de celebración
 * - Feedback positivo
 * - Opciones: continuar o volver al mapa
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  RewardScreenNavigationProp,
  RewardScreenRouteProp,
} from '../navigation/types';

// Imports desde directorios centralizados - Mandamiento 📂
import { theme, strings } from '../constants';

const RewardScreen: React.FC = () => {
  const navigation = useNavigation<RewardScreenNavigationProp>();
  const route = useRoute<RewardScreenRouteProp>();
  const { activityId, stars, timeSpent } = route.params;

  const [scaleAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 10,
      friction: 3,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  const handleContinue = () => {
    navigation.navigate('MainMap');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Leo celebrando */}
        <Animated.View
          style={[
            styles.celebrationContainer,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Text style={styles.leoEmoji}>🦎</Text>
          <Text style={styles.celebrationText}>
            {strings.actividades.feedback.loLograste}
          </Text>
        </Animated.View>

        {/* Estrellas */}
        <View style={styles.starsContainer}>
          <Text style={styles.starsTitle}>{strings.recompensas.ganaste}</Text>
          <View style={styles.starsRow}>
            {[...Array(stars)].map((_, index) => (
              <Text key={index} style={styles.star}>
                ⭐
              </Text>
            ))}
          </View>
          <Text style={styles.starsText}>
            {stars} {stars === 1 ? strings.recompensas.estrella : strings.recompensas.estrellas}
          </Text>
        </View>

        {/* Tiempo */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            {strings.common.tiempoEstimado}: {Math.floor(timeSpent / 60)}{' '}
            {strings.tiempo.minutos}
          </Text>
        </View>

        {/* Botón continuar */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          accessible={true}
          accessibilityLabel={strings.recompensas.continuar}
          accessibilityRole="button"
        >
          <Text style={styles.continueButtonText}>
            {strings.recompensas.continuar}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.amarilloSol,
  },
  content: {
    flex: 1,
    padding: theme.spacing.xl,
    justifyContent: 'space-around',
  },
  celebrationContainer: {
    alignItems: 'center',
  },
  leoEmoji: {
    fontSize: 120,
    marginBottom: theme.spacing.lg,
  },
  celebrationText: {
    fontSize: theme.typography.fontSize.h1,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.blancoPuro,
    textAlign: 'center',
  },
  starsContainer: {
    alignItems: 'center',
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.xl,
  },
  starsTitle: {
    fontSize: theme.typography.fontSize.h3,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.md,
  },
  starsRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  star: {
    fontSize: 48,
  },
  starsText: {
    fontSize: theme.typography.fontSize.bodyLarge,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.grisOscuro,
  },
  statsContainer: {
    alignItems: 'center',
  },
  statsText: {
    fontSize: theme.typography.fontSize.bodyLarge,
    color: theme.colors.blancoPuro,
    fontWeight: theme.typography.fontWeight.bold,
  },
  continueButton: {
    backgroundColor: theme.colors.verdeJungla,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    alignItems: 'center',
    minHeight: theme.componentSizes.button.grande.height,
    justifyContent: 'center',
    ...theme.shadows.large,
  },
  continueButtonText: {
    fontSize: theme.typography.fontSize.h3,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.blancoPuro,
  },
});

export default RewardScreen;
