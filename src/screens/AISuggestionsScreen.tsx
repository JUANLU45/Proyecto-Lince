/**
 * AISuggestionsScreen - Sugerencias de IA
 * Basado en: APP_BLUEPRINT.md - Pantalla 13: Sugerencias de IA
 *
 * Funcionalidad:
 * - Ver sugerencias de IA para padres
 * - Insights detallados
 * - Recomendaciones personalizadas
 * - Análisis de patrones
 * - Sugerencias de actividades
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
import { AISuggestionsScreenNavigationProp } from '../navigation/types';

// Imports desde directorios centralizados - Mandamiento 📂
import { theme, strings } from '../constants';

interface Suggestion {
  tipo: 'progreso' | 'sugerencia' | 'alerta' | 'celebracion';
  titulo: string;
  descripcion: string;
  fecha: string;
}

const suggestions: Suggestion[] = [
  {
    tipo: 'celebracion',
    titulo: strings.ia.insights.celebracion,
    descripcion: 'Ha completado 5 días consecutivos de actividades',
    fecha: strings.tiempo.hoy,
  },
  {
    tipo: 'progreso',
    titulo: strings.ia.insights.progreso,
    descripcion: 'Mejora notable en actividades de movimiento',
    fecha: `${strings.tiempo.hace} 2 ${strings.tiempo.dias}`,
  },
  {
    tipo: 'sugerencia',
    titulo: strings.ia.insights.sugerencia,
    descripcion: 'Considera actividades musicales en las mañanas',
    fecha: `${strings.tiempo.hace} 3 ${strings.tiempo.dias}`,
  },
];

const AISuggestionsScreen: React.FC = () => {
  const navigation = useNavigation<AISuggestionsScreenNavigationProp>();

  const handleBack = () => {
    navigation.goBack();
  };

  const getColorForType = (tipo: Suggestion['tipo']) => {
    switch (tipo) {
      case 'celebracion':
        return theme.colors.amarilloSol;
      case 'progreso':
        return theme.colors.verdeJungla;
      case 'sugerencia':
        return theme.colors.azulCalma;
      case 'alerta':
        return theme.colors.rojoPeligro;
      default:
        return theme.colors.grisOscuro;
    }
  };

  const getEmojiForType = (tipo: Suggestion['tipo']) => {
    switch (tipo) {
      case 'celebracion':
        return '🎉';
      case 'progreso':
        return '📈';
      case 'sugerencia':
        return '💡';
      case 'alerta':
        return '⚠️';
      default:
        return '📝';
    }
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

        <Text style={styles.title}>{strings.ia.sugerencias.titulo}</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Info sobre IA */}
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            La IA analiza los patrones de interacción y genera sugerencias
            personalizadas basadas en el comportamiento y progreso.
          </Text>
        </View>

        {/* Lista de sugerencias */}
        {suggestions.map((suggestion, index) => (
          <View
            key={index}
            style={[
              styles.suggestionCard,
              { borderLeftColor: getColorForType(suggestion.tipo) },
            ]}
          >
            <View style={styles.suggestionHeader}>
              <Text style={styles.suggestionEmoji}>
                {getEmojiForType(suggestion.tipo)}
              </Text>
              <View style={styles.suggestionHeaderText}>
                <Text style={styles.suggestionTitle}>
                  {suggestion.titulo}
                </Text>
                <Text style={styles.suggestionDate}>{suggestion.fecha}</Text>
              </View>
            </View>

            <Text style={styles.suggestionDescription}>
              {suggestion.descripcion}
            </Text>
          </View>
        ))}

        {/* Mensaje si no hay sugerencias */}
        {suggestions.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateEmoji}>🤖</Text>
            <Text style={styles.emptyStateText}>
              {strings.portalPadres.insights.noDisponible}
            </Text>
          </View>
        )}
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
  infoCard: {
    backgroundColor: theme.colors.azulCalma,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  infoText: {
    fontSize: theme.typography.fontSize.bodyMedium,
    color: theme.colors.blancoPuro,
    lineHeight: theme.typography.fontSize.bodyMedium * theme.typography.lineHeight.normal,
  },
  suggestionCard: {
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderLeftWidth: 4,
    ...theme.shadows.small,
  },
  suggestionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  suggestionEmoji: {
    fontSize: 32,
    marginRight: theme.spacing.md,
  },
  suggestionHeaderText: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: theme.typography.fontSize.bodyLarge,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.xs,
  },
  suggestionDate: {
    fontSize: theme.typography.fontSize.bodySmall,
    color: theme.colors.grisOscuro,
  },
  suggestionDescription: {
    fontSize: theme.typography.fontSize.bodyMedium,
    color: theme.colors.grisOscuro,
    lineHeight: theme.typography.fontSize.bodyMedium * theme.typography.lineHeight.normal,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxxl,
  },
  emptyStateEmoji: {
    fontSize: 64,
    marginBottom: theme.spacing.md,
  },
  emptyStateText: {
    fontSize: theme.typography.fontSize.bodyLarge,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
  },
});

export default AISuggestionsScreen;
