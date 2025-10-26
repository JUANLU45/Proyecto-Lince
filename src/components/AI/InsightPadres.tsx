/**
 * InsightPadres - Tarjeta de insights de IA para padres
 * Basado en: DESIGN_SYSTEM.md líneas 23-33 y UI_COMPONENTS.md
 *
 * Propósito: Mostrar resúmenes y sugerencias generados por IA en portal de padres
 * Estilo: Tarjeta informativa
 *
 * Diseño:
 * - Fondo: Tarjeta blancoPuro con barra lateral de color
 * - Colores: verdeJungla (progreso), amarilloSol (sugerencia), rojoPeligro (alerta)
 * - Icono: Pictograma que resume el contenido
 * - Texto: Título (H2) y resumen (Body)
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { theme, strings } from '../../constants';
import type { InsightPadresProps } from '../../types';

/**
 * Componente InsightPadres
 * Según PROJECT_REQUIREMENTS.md RF-IA-004: Insights para padres
 */
const InsightPadres: React.FC<InsightPadresProps> = ({
  insight,
  expandido = false,
  onPresionar,
}) => {
  const getColorCategoria = () => {
    switch (insight.categoria) {
      case 'progreso':
        return theme.colors.verdeJungla;
      case 'sugerencia':
        return theme.colors.amarilloSol;
      case 'alerta':
        return theme.colors.rojoPeligro;
      case 'celebración':
        return theme.colors.azulCalma;
      default:
        return theme.colors.info;
    }
  };

  const getIcono = () => {
    switch (insight.categoria) {
      case 'progreso':
        return '📈';
      case 'sugerencia':
        return '💡';
      case 'alerta':
        return '⚠️';
      case 'celebración':
        return '🎉';
      default:
        return '📊';
    }
  };

  const getTituloCategoria = () => {
    switch (insight.categoria) {
      case 'progreso':
        return strings.ia.insights.progreso;
      case 'sugerencia':
        return strings.ia.insights.sugerencia;
      case 'alerta':
        return strings.ia.insights.alerta;
      case 'celebración':
        return strings.ia.insights.celebracion;
      default:
        return insight.categoria;
    }
  };

  const containerContent = (
    <>
      {/* Barra lateral de color */}
      <View
        style={[
          styles.barraLateral,
          { backgroundColor: getColorCategoria() },
        ]}
      />

      {/* Contenido */}
      <View style={styles.contenido}>
        {/* Header con icono y categoría */}
        <View style={styles.header}>
          <Text style={styles.icono}>{getIcono()}</Text>
          <Text style={styles.categoria}>{getTituloCategoria()}</Text>
        </View>

        {/* Título */}
        <Text style={styles.titulo}>{insight.titulo}</Text>

        {/* Resumen */}
        <Text style={styles.resumen} numberOfLines={expandido ? undefined : 3}>
          {insight.resumen}
        </Text>

        {/* Detalles (solo si expandido) */}
        {expandido && insight.detalles && (
          <Text style={styles.detalles}>{insight.detalles}</Text>
        )}

        {/* Acción recomendada */}
        {insight.accionRecomendada && (
          <View style={styles.accionContainer}>
            <Text style={styles.accionLabel}>
              {strings.ia.insights.sugerencia}:
            </Text>
            <Text style={styles.accionTexto}>
              {insight.accionRecomendada}
            </Text>
          </View>
        )}
      </View>
    </>
  );

  return onPresionar ? (
    <TouchableOpacity
      style={styles.container}
      onPress={onPresionar}
      activeOpacity={0.7}
      accessible={true}
      accessibilityLabel={strings.accesibilidad.insight + ': ' + insight.titulo}
      accessibilityRole="button"
      accessibilityHint="Toca para ver más detalles"
    >
      {containerContent}
    </TouchableOpacity>
  ) : (
    <View
      style={styles.container}
      accessible={true}
      accessibilityLabel={strings.accesibilidad.insight + ': ' + insight.titulo}
      accessibilityRole="text"
    >
      {containerContent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.md,
    flexDirection: 'row',
    overflow: 'hidden',
    ...theme.shadows.small,
  },
  barraLateral: {
    width: 6,
  },
  contenido: {
    flex: 1,
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  icono: {
    fontSize: 24,
    marginRight: theme.spacing.xs,
  },
  categoria: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.caption,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisAdministrativo,
    textTransform: 'uppercase',
  },
  titulo: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.h3,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.sm,
  },
  resumen: {
    fontFamily: theme.typography.fontFamily.secondary,
    fontSize: theme.typography.fontSize.bodyMedium,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.grisOscuro,
    lineHeight: theme.typography.fontSize.bodyMedium * theme.typography.lineHeight.normal,
  },
  detalles: {
    fontFamily: theme.typography.fontFamily.secondary,
    fontSize: theme.typography.fontSize.bodySmall,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.grisOscuro,
    marginTop: theme.spacing.sm,
    lineHeight: theme.typography.fontSize.bodySmall * theme.typography.lineHeight.normal,
  },
  accionContainer: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.grisClaro,
    borderRadius: theme.borderRadius.small,
  },
  accionLabel: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.caption,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisAdministrativo,
    marginBottom: theme.spacing.xs,
  },
  accionTexto: {
    fontFamily: theme.typography.fontFamily.secondary,
    fontSize: theme.typography.fontSize.bodySmall,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.grisOscuro,
  },
});

export default InsightPadres;
