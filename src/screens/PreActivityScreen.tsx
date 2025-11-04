/**
 * PreActivityScreen - Preparación para actividad
 * Basado en: APP_BLUEPRINT.md - Pantalla 6: Pre-Actividad
 *
 * Funcionalidad:
 * - Preparar al niño para la actividad específica
 * - Preview de la actividad
 * - Leo explicando qué van a hacer
 * - Configuración (volumen, duración, nivel de ayuda)
 * - Botón "¡Empezar!" prominente
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  PreActivityScreenNavigationProp,
  PreActivityScreenRouteProp,
} from '../navigation/types';

// Imports desde directorios centralizados - Mandamiento 📂
import { theme, strings } from '../constants';
import { DuracionActividad, NivelDificultad } from '../types';

const PreActivityScreen: React.FC = () => {
  const navigation = useNavigation<PreActivityScreenNavigationProp>();
  const route = useRoute<PreActivityScreenRouteProp>();
  const { activityId } = route.params;

  const [duracion, setDuracion] = useState<DuracionActividad>('normal');
  const [volumen, setVolumen] = useState(70);

  const handleStart = () => {
    navigation.navigate('VideoModeling', { activityId });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header con botón back */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          accessible={true}
          accessibilityLabel={strings.navegacion.volver}
          accessibilityRole="button"
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        {/* Vista previa de la actividad */}
        <View style={styles.previewContainer}>
          <Text style={styles.previewEmoji}>🎮</Text>
          <Text style={styles.title}>{strings.actividades.nombreGenerico}</Text>
          <Text style={styles.description}>
            {strings.videoModeling.leoExplica}
          </Text>
        </View>

        {/* Configuración */}
        <View style={styles.configSection}>
          <Text style={styles.configTitle}>
            {strings.actividades.configuracion.titulo}
          </Text>

          {/* Duración */}
          <View style={styles.configGroup}>
            <Text style={styles.configLabel}>
              {strings.actividades.configuracion.duracion}
            </Text>
            <View style={styles.optionsRow}>
              {(['corta', 'normal', 'larga'] as DuracionActividad[]).map(
                (d) => (
                  <TouchableOpacity
                    key={d}
                    style={[
                      styles.optionButton,
                      duracion === d && styles.optionButtonActive,
                    ]}
                    onPress={() => setDuracion(d)}
                    accessible={true}
                    accessibilityLabel={d}
                    accessibilityRole="button"
                  >
                    <Text
                      style={[
                        styles.optionButtonText,
                        duracion === d && styles.optionButtonTextActive,
                      ]}
                    >
                      {d.charAt(0).toUpperCase() + d.slice(1)}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>
        </View>

        {/* Botón empezar */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStart}
          accessible={true}
          accessibilityLabel={strings.actividades.comenzar}
          accessibilityRole="button"
        >
          <Text style={styles.startButtonText}>
            {strings.actividades.comenzar}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.grisClaro,
  },
  scrollContent: {
    padding: theme.spacing.lg,
    flexGrow: 1,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.azulCalma,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  backButtonText: {
    fontSize: 24,
    color: theme.colors.blancoPuro,
  },
  previewContainer: {
    backgroundColor: theme.colors.azulCalma,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.xl,
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  previewEmoji: {
    fontSize: 80,
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSize.h2,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.blancoPuro,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  description: {
    fontSize: theme.typography.fontSize.bodyLarge,
    color: theme.colors.blancoPuro,
    textAlign: 'center',
  },
  configSection: {
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  configTitle: {
    fontSize: theme.typography.fontSize.h3,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.md,
  },
  configGroup: {
    marginBottom: theme.spacing.md,
  },
  configLabel: {
    fontSize: theme.typography.fontSize.bodyLarge,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.sm,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  optionButton: {
    flex: 1,
    backgroundColor: theme.colors.grisClaro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    alignItems: 'center',
    minHeight: theme.componentSizes.minTouchTarget,
    justifyContent: 'center',
  },
  optionButtonActive: {
    backgroundColor: theme.colors.verdeJungla,
  },
  optionButtonText: {
    fontSize: theme.typography.fontSize.bodyMedium,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.grisOscuro,
  },
  optionButtonTextActive: {
    color: theme.colors.blancoPuro,
  },
  startButton: {
    backgroundColor: theme.colors.verdeJungla,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    alignItems: 'center',
    minHeight: theme.componentSizes.button.grande.height,
    justifyContent: 'center',
    marginTop: 'auto',
    ...theme.shadows.large,
  },
  startButtonText: {
    fontSize: theme.typography.fontSize.h3,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.blancoPuro,
  },
});

export default PreActivityScreen;
