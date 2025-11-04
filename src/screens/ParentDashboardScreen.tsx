/**
 * ParentDashboardScreen - Dashboard de Padres
 * Basado en: APP_BLUEPRINT.md - Pantalla 11: Portal de Padres (Dashboard)
 *
 * Funcionalidad:
 * - Dashboard principal del portal de padres
 * - Resumen de progreso
 * - Insights de IA
 * - Acceso a detalles, configuración, y más
 * - Panel administrativo para usuarios con permisos
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ParentDashboardScreenNavigationProp } from '../navigation/types';

// Imports desde directorios centralizados - Mandamiento 📂
import { theme, strings } from '../constants';
import { usePerfilStore } from '../store';

const ParentDashboardScreen: React.FC = () => {
  const navigation = useNavigation<ParentDashboardScreenNavigationProp>();
  const { perfilActual } = usePerfilStore();

  const handleBack = () => {
    navigation.navigate('MainMap');
  };

  const handleProgressDetail = () => {
    if (perfilActual?.id) {
      navigation.navigate('ProgressDetail', { childId: perfilActual.id });
    }
  };

  const handleAISuggestions = () => {
    navigation.navigate('AIsuggestions');
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
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

        <Text style={styles.title}>{strings.portalPadres.titulo}</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Bienvenida */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>
            {strings.portalPadres.bienvenida}
          </Text>
          {perfilActual?.nombre && (
            <Text style={styles.childName}>{perfilActual.nombre}</Text>
          )}
        </View>

        {/* Resumen semanal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {strings.portalPadres.resumenSemanal.titulo}
          </Text>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>
                {strings.portalPadres.resumenSemanal.actividadesCompletadas}
              </Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statValue}>2.5h</Text>
              <Text style={styles.statLabel}>
                {strings.portalPadres.resumenSemanal.tiempoTotal}
              </Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statValue}>5</Text>
              <Text style={styles.statLabel}>
                {strings.portalPadres.progreso.dias}
              </Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>
                {strings.portalPadres.resumenSemanal.logros}
              </Text>
            </View>
          </View>
        </View>

        {/* Insights de IA */}
        <TouchableOpacity
          style={styles.insightsCard}
          onPress={handleAISuggestions}
          accessible={true}
          accessibilityLabel={strings.portalPadres.insights.titulo}
          accessibilityRole="button"
        >
          <View style={styles.insightsHeader}>
            <Text style={styles.insightsTitle}>
              {strings.portalPadres.insights.titulo}
            </Text>
            <Text style={styles.insightsLink}>
              {strings.portalPadres.insights.verMas} →
            </Text>
          </View>
          <Text style={styles.insightsText}>
            {perfilActual?.nombre} está progresando bien en actividades de movimiento
          </Text>
        </TouchableOpacity>

        {/* Acciones rápidas */}
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleProgressDetail}
            accessible={true}
            accessibilityLabel={strings.portalPadres.progreso.titulo}
            accessibilityRole="button"
          >
            <Text style={styles.actionEmoji}>📊</Text>
            <Text style={styles.actionText}>
              {strings.portalPadres.progreso.titulo}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleSettings}
            accessible={true}
            accessibilityLabel={strings.portalPadres.configuracion.titulo}
            accessibilityRole="button"
          >
            <Text style={styles.actionEmoji}>⚙️</Text>
            <Text style={styles.actionText}>
              {strings.portalPadres.configuracion.titulo}
            </Text>
          </TouchableOpacity>
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
    ...theme.shadows.small,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.azulCalma,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  backButtonText: {
    fontSize: 24,
    color: theme.colors.blancoPuro,
  },
  title: {
    fontSize: theme.typography.fontSize.h2,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.azulCalma,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  welcomeCard: {
    backgroundColor: theme.colors.azulCalma,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },
  welcomeText: {
    fontSize: theme.typography.fontSize.h3,
    color: theme.colors.blancoPuro,
    marginBottom: theme.spacing.xs,
  },
  childName: {
    fontSize: theme.typography.fontSize.h2,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.blancoPuro,
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    alignItems: 'center',
    ...theme.shadows.small,
  },
  statValue: {
    fontSize: theme.typography.fontSize.h1,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.verdeJungla,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    fontSize: theme.typography.fontSize.bodyMedium,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
  },
  insightsCard: {
    backgroundColor: theme.colors.amarilloSol,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  insightsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  insightsTitle: {
    fontSize: theme.typography.fontSize.h3,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.blancoPuro,
  },
  insightsLink: {
    fontSize: theme.typography.fontSize.bodyMedium,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.blancoPuro,
  },
  insightsText: {
    fontSize: theme.typography.fontSize.bodyLarge,
    color: theme.colors.blancoPuro,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  actionButton: {
    flex: 1,
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
    ...theme.shadows.small,
  },
  actionEmoji: {
    fontSize: 48,
    marginBottom: theme.spacing.sm,
  },
  actionText: {
    fontSize: theme.typography.fontSize.bodyMedium,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
  },
});

export default ParentDashboardScreen;
