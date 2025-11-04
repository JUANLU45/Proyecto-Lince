/**
 * ProgressDetailScreen - Detalle de Progreso
 * Basado en: APP_BLUEPRINT.md - Pantalla 12: Progreso Detallado
 *
 * Funcionalidad:
 * - Ver progreso detallado del niño
 * - Gráficos de evolución
 * - Actividades completadas
 * - Métricas terapéuticas
 * - Exportar reportes
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ProgressDetailScreenNavigationProp,
  ProgressDetailScreenRouteProp,
} from '../navigation/types';

// Imports desde directorios centralizados - Mandamiento 📂
import { theme, strings } from '../constants';

const ProgressDetailScreen: React.FC = () => {
  const navigation = useNavigation<ProgressDetailScreenNavigationProp>();
  const route = useRoute<ProgressDetailScreenRouteProp>();
  const { childId } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleExport = () => {
    // TODO: Implementar exportación de reportes
  };

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

        <Text style={styles.title}>
          {strings.portalPadres.progreso.titulo}
        </Text>

        <TouchableOpacity
          style={styles.exportButton}
          onPress={handleExport}
          accessible={true}
          accessibilityLabel={strings.portalPadres.configuracion.exportar}
          accessibilityRole="button"
        >
          <Text style={styles.exportButtonText}>📄</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progreso general */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progreso General</Text>
          <View style={styles.progressCard}>
            <View style={styles.progressCircle}>
              <Text style={styles.progressValue}>75%</Text>
            </View>
            <Text style={styles.progressText}>
              Completado en las últimas 4 semanas
            </Text>
          </View>
        </View>

        {/* Por isla */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Por Isla Temática</Text>

          {[
            { name: strings.mapa.islas.movimiento.nombre, progress: 80, color: theme.colors.verdeJungla },
            { name: strings.mapa.islas.musical.nombre, progress: 65, color: theme.colors.amarilloSol },
            { name: strings.mapa.islas.tactil.nombre, progress: 70, color: theme.colors.azulCalma },
          ].map((island, index) => (
            <View key={index} style={styles.islandProgressCard}>
              <Text style={styles.islandName}>{island.name}</Text>
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${island.progress}%`, backgroundColor: island.color },
                  ]}
                />
              </View>
              <Text style={styles.progressPercentage}>{island.progress}%</Text>
            </View>
          ))}
        </View>

        {/* Actividades recientes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actividades Recientes</Text>

          {[1, 2, 3].map((index) => (
            <View key={index} style={styles.activityCard}>
              <View style={styles.activityIcon}>
                <Text style={styles.activityIconText}>🎮</Text>
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityName}>Actividad {index}</Text>
                <Text style={styles.activityDate}>
                  {strings.tiempo.hace} 2 {strings.tiempo.dias}
                </Text>
              </View>
              <View style={styles.activityStars}>
                <Text style={styles.starsText}>⭐ 3</Text>
              </View>
            </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...theme.shadows.small,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.azulCalma,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: theme.colors.blancoPuro,
  },
  title: {
    fontSize: theme.typography.fontSize.h2,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.azulCalma,
    flex: 1,
    textAlign: 'center',
  },
  exportButton: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.verdeJungla,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exportButtonText: {
    fontSize: 24,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.h3,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.md,
  },
  progressCard: {
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.xl,
    alignItems: 'center',
    ...theme.shadows.small,
  },
  progressCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: theme.colors.verdeJungla,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  progressValue: {
    fontSize: theme.typography.fontSize.h1 * 1.5,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.blancoPuro,
  },
  progressText: {
    fontSize: theme.typography.fontSize.bodyLarge,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
  },
  islandProgressCard: {
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.small,
  },
  islandName: {
    fontSize: theme.typography.fontSize.bodyLarge,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.sm,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: theme.colors.grisClaro,
    borderRadius: theme.borderRadius.round,
    overflow: 'hidden',
    marginBottom: theme.spacing.xs,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: theme.borderRadius.round,
  },
  progressPercentage: {
    fontSize: theme.typography.fontSize.bodySmall,
    color: theme.colors.grisOscuro,
    textAlign: 'right',
  },
  activityCard: {
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    ...theme.shadows.small,
  },
  activityIcon: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.azulCalma,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  activityIconText: {
    fontSize: 24,
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: theme.typography.fontSize.bodyLarge,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.xs,
  },
  activityDate: {
    fontSize: theme.typography.fontSize.bodySmall,
    color: theme.colors.grisOscuro,
  },
  activityStars: {
    marginLeft: theme.spacing.sm,
  },
  starsText: {
    fontSize: theme.typography.fontSize.bodyLarge,
    fontWeight: theme.typography.fontWeight.bold,
  },
});

export default ProgressDetailScreen;
