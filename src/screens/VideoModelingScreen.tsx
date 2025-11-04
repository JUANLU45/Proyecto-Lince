/**
 * VideoModelingScreen - Carga y Video-Modelado
 * Basado en: APP_BLUEPRINT.md - Pantalla 7: Carga y Video-Modelado
 *
 * Funcionalidad:
 * - Preparar al niño mostrando cómo se hace la actividad
 * - Video corto de Leo demostrando la actividad
 * - Instrucciones claras y simples
 * - Música de fondo motivadora
 * - Duración: 15-30 segundos máximo
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  VideoModelingScreenNavigationProp,
  VideoModelingScreenRouteProp,
} from '../navigation/types';

// Imports desde directorios centralizados - Mandamiento 📂
import { theme, strings } from '../constants';

const VideoModelingScreen: React.FC = () => {
  const navigation = useNavigation<VideoModelingScreenNavigationProp>();
  const route = useRoute<VideoModelingScreenRouteProp>();
  const { activityId } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      handleContinue();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    navigation.navigate('Activity', { activityId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Video simulado con Leo */}
        <View style={styles.videoContainer}>
          <Text style={styles.leoEmoji}>🦎</Text>
          <Text style={styles.leoText}>{strings.videoModeling.leoMuestra}</Text>
        </View>

        {/* Instrucciones */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionTitle}>{strings.videoModeling.comoJugar}</Text>
          <Text style={styles.instructionText}>
            {strings.videoModeling.instrucciones}
          </Text>
        </View>

        {/* Botón para continuar */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          accessible={true}
          accessibilityLabel={strings.tutorial.finalizar}
          accessibilityRole="button"
        >
          <Text style={styles.continueButtonText}>
            {strings.tutorial.finalizar}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.azulCalma,
  },
  content: {
    flex: 1,
    padding: theme.spacing.xl,
    justifyContent: 'space-around',
  },
  videoContainer: {
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.xxl,
    alignItems: 'center',
    minHeight: 300,
    justifyContent: 'center',
  },
  leoEmoji: {
    fontSize: 120,
    marginBottom: theme.spacing.lg,
  },
  leoText: {
    fontSize: theme.typography.fontSize.h2,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.azulCalma,
    textAlign: 'center',
  },
  instructionsContainer: {
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.xl,
  },
  instructionTitle: {
    fontSize: theme.typography.fontSize.h3,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.azulCalma,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: theme.typography.fontSize.bodyLarge,
    color: theme.colors.grisOscuro,
    lineHeight: theme.typography.fontSize.bodyLarge * theme.typography.lineHeight.relaxed,
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

export default VideoModelingScreen;
