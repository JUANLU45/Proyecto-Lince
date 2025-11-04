/**
 * IslandScreen - Vista de Isla (Ejemplo: Isla del Movimiento)
 * Basado en: APP_BLUEPRINT.md - Pantalla 5: Vista de Isla
 *
 * Funcionalidad:
 * - Mostrar actividades disponibles en cada isla
 * - Lista de actividades con miniatura, título, dificultad, estado
 * - Botón "Actividad Random" (sugerida por IA)
 * - Progreso específico de la isla
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  IslandScreenNavigationProp,
  IslandScreenRouteProp,
} from '../navigation/types';

// Imports desde directorios centralizados - Mandamiento 📂
import { theme, strings } from '../constants';

const IslandScreen: React.FC = () => {
  const navigation = useNavigation<IslandScreenNavigationProp>();
  const route = useRoute<IslandScreenRouteProp>();
  const { islandType } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleActivityPress = (activityId: string) => {
    navigation.navigate('PreActivity', { activityId });
  };

  const handleRandomActivity = () => {
    navigation.navigate('PreActivity', { activityId: 'random-activity-1' });
  };

  const islandInfo = strings.mapa.islas[islandType];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          accessible={true}
          accessibilityLabel={strings.navegacion.volver}
          accessibilityRole="button"
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{islandInfo.nombre}</Text>
          <Text style={styles.subtitle}>{islandInfo.descripcion}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Botón actividad random */}
        <TouchableOpacity
          style={styles.randomButton}
          onPress={handleRandomActivity}
          accessible={true}
          accessibilityLabel={strings.actividades.actividadRandom}
          accessibilityRole="button"
        >
          <Text style={styles.randomButtonEmoji}>🎲</Text>
          <Text style={styles.randomButtonText}>
            {strings.actividades.actividadRandom}
          </Text>
        </TouchableOpacity>

        {/* Lista de actividades */}
        <View style={styles.activitiesContainer}>
          <Text style={styles.sectionTitle}>
            {strings.actividades.titulo}
          </Text>

          {[1, 2, 3].map((index) => (
            <TouchableOpacity
              key={index}
              style={styles.activityCard}
              onPress={() => handleActivityPress(`activity-${islandType}-${index}`)}
              accessible={true}
              accessibilityLabel={`Actividad ${index}`}
              accessibilityRole="button"
            >
              <View style={styles.activityIcon}>
                <Text style={styles.activityIconText}>🎮</Text>
              </View>

              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>
                  Actividad {index}
                </Text>
                <Text style={styles.activityDescription}>
                  Descripción de la actividad
                </Text>

                <View style={styles.activityMeta}>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>Básico</Text>
                  </View>
                  <Text style={styles.timeText}>
                    {strings.common.tiempoEstimado}: 5 {strings.tiempo.minutos}
                  </Text>
                </View>
              </View>

              <View style={styles.activityArrow}>
                <Text style={styles.activityArrowText}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.grisClaro,
  },
  header: {
    backgroundColor: theme.colors.blancoPuro,
    padding: theme.spacing.lg,
    ...theme.shadows.small,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.azulCalma,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  backButtonText: {
    fontSize: 24,
    color: theme.colors.blancoPuro,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.fontSize.h2,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.azulCalma,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.bodyLarge,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  randomButton: {
    backgroundColor: theme.colors.amarilloSol,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
    minHeight: theme.componentSizes.button.grande.height,
    ...theme.shadows.medium,
  },
  randomButtonEmoji: {
    fontSize: 32,
    marginRight: theme.spacing.md,
  },
  randomButtonText: {
    fontSize: theme.typography.fontSize.button,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.blancoPuro,
  },
  activitiesContainer: {
    gap: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.h3,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.md,
  },
  activityCard: {
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...theme.shadows.small,
  },
  activityIcon: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.azulCalma,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  activityIconText: {
    fontSize: 32,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: theme.typography.fontSize.bodyLarge,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.xs,
  },
  activityDescription: {
    fontSize: theme.typography.fontSize.bodyMedium,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.sm,
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  badge: {
    backgroundColor: theme.colors.verdeJungla,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.small,
  },
  badgeText: {
    fontSize: theme.typography.fontSize.bodySmall,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.blancoPuro,
  },
  timeText: {
    fontSize: theme.typography.fontSize.bodySmall,
    color: theme.colors.grisOscuro,
  },
  activityArrow: {
    marginLeft: theme.spacing.sm,
  },
  activityArrowText: {
    fontSize: 24,
    color: theme.colors.azulCalma,
  },
});

export default IslandScreen;
