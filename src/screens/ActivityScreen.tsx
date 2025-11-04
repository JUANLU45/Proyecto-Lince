/**
 * ActivityScreen - Pantalla de Actividad Principal
 * Basado en: APP_BLUEPRINT.md - Pantalla 8: Pantalla de Actividad Principal
 *
 * Funcionalidad:
 * - Núcleo de la experiencia terapéutica e interactiva
 * - Leo en el centro de la pantalla
 * - Área táctil responsiva (toda la pantalla)
 * - Feedback visual inmediato
 * - Sonidos sincronizados con toques
 * - Contador de interacciones
 * - Motor adaptativo de IA en segundo plano
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ActivityScreenNavigationProp,
  ActivityScreenRouteProp,
} from '../navigation/types';

// Imports desde directorios centralizados - Mandamiento 📂
import { theme, strings } from '../constants';

const ActivityScreen: React.FC = () => {
  const navigation = useNavigation<ActivityScreenNavigationProp>();
  const route = useRoute<ActivityScreenRouteProp>();
  const { activityId } = route.params;

  const [interacciones, setInteracciones] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleTouch = () => {
    setInteracciones((prev) => prev + 1);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleFinish = () => {
    navigation.navigate('Reward', {
      activityId,
      stars: 3,
      timeSpent: 300,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header con controles */}
      <View style={styles.header}>
        <View style={styles.counter}>
          <Text style={styles.counterText}>{interacciones}</Text>
        </View>

        <TouchableOpacity
          style={styles.pauseButton}
          onPress={handlePause}
          accessible={true}
          accessibilityLabel={strings.actividades.pausar}
          accessibilityRole="button"
        >
          <Text style={styles.pauseButtonText}>
            {isPaused ? '▶️' : '⏸️'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Área interactiva */}
      <Pressable
        style={styles.interactiveArea}
        onPress={handleTouch}
        accessible={true}
        accessibilityLabel={strings.accesibilidad.areaInteractiva}
        accessibilityHint={strings.accesibilidad.tocarAquiInteractuar}
      >
        <View style={styles.leoContainer}>
          <Text style={styles.leoEmoji}>🦎</Text>
          <Text style={styles.leoMessage}>
            {interacciones === 0
              ? '¡Toca la pantalla!'
              : strings.actividades.feedback.sigue}
          </Text>
        </View>

        {interacciones > 0 && (
          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackText}>
              {strings.actividades.feedback.muybien}
            </Text>
          </View>
        )}
      </Pressable>

      {/* Botón terminar */}
      <TouchableOpacity
        style={styles.finishButton}
        onPress={handleFinish}
        accessible={true}
        accessibilityLabel={strings.actividades.terminar}
        accessibilityRole="button"
      >
        <Text style={styles.finishButtonText}>
          {strings.actividades.terminar}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.azulCalma,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  counter: {
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.round,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: theme.typography.fontSize.h2,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.azulCalma,
  },
  pauseButton: {
    backgroundColor: theme.colors.amarilloSol,
    borderRadius: theme.borderRadius.round,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseButtonText: {
    fontSize: 24,
  },
  interactiveArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leoContainer: {
    alignItems: 'center',
  },
  leoEmoji: {
    fontSize: 120,
    marginBottom: theme.spacing.lg,
  },
  leoMessage: {
    fontSize: theme.typography.fontSize.h2,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.blancoPuro,
    textAlign: 'center',
  },
  feedbackContainer: {
    position: 'absolute',
    top: '20%',
    backgroundColor: theme.colors.verdeJungla,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
  },
  feedbackText: {
    fontSize: theme.typography.fontSize.h3,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.blancoPuro,
  },
  finishButton: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    backgroundColor: theme.colors.verdeJungla,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    alignItems: 'center',
    minHeight: theme.componentSizes.button.mediano.height,
    justifyContent: 'center',
  },
  finishButtonText: {
    fontSize: theme.typography.fontSize.button,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.blancoPuro,
  },
});

export default ActivityScreen;
