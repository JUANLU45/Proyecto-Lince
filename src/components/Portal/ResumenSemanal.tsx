/**
 * ResumenSemanal - Resumen semanal de actividades
 * Basado en: UI_COMPONENTS.md y PROJECT_REQUIREMENTS.md RF-011
 *
 * Propósito: Mostrar resumen de la semana con métricas clave
 * Estilo: Tarjeta con estadísticas destacadas
 *
 * Métricas:
 * - Actividades completadas
 * - Tiempo total de uso
 * - Racha de días
 * - Logros obtenidos
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { theme, strings } from '../../constants';
import type { BaseProps } from '../../types';

export interface ResumenSemanalProps extends BaseProps {
  actividadesCompletadas: number;
  tiempoTotal: number; // en minutos
  rachaDias: number;
  logrosObtenidos: number;
  fechaInicio: Date;
  fechaFin: Date;
}

/**
 * Componente ResumenSemanal
 * Según PROJECT_REQUIREMENTS.md RF-011: Estadísticas para padres
 */
const ResumenSemanal: React.FC<ResumenSemanalProps> = ({
  actividadesCompletadas,
  tiempoTotal,
  rachaDias,
  logrosObtenidos,
  fechaInicio,
  fechaFin,
  testID,
  accessible = true,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const formatearPeriodo = () => {
    const inicio = fechaInicio.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    const fin = fechaFin.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    return inicio + ' - ' + fin;
  };

  const formatearTiempo = () => {
    const horas = Math.floor(tiempoTotal / 60);
    const minutos = tiempoTotal % 60;
    if (horas > 0) {
      return horas + 'h ' + minutos + 'm';
    }
    return minutos + 'm';
  };

  return (
    <View
      style={styles.container}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel || 'Resumen semanal'}
      accessibilityHint={accessibilityHint}
      testID={testID}
    >
      <Text style={styles.titulo}>
        {strings.portalPadres.resumenSemanal.titulo}
      </Text>
      <Text style={styles.periodo}>{formatearPeriodo()}</Text>

      <View style={styles.metricas}>
        {/* Actividades completadas */}
        <View style={styles.metricaCard}>
          <Text style={styles.metricaIcono}>📚</Text>
          <Text style={styles.metricaValor}>{actividadesCompletadas}</Text>
          <Text style={styles.metricaLabel}>
            {strings.portalPadres.resumenSemanal.actividadesCompletadas}
          </Text>
        </View>

        {/* Tiempo total */}
        <View style={styles.metricaCard}>
          <Text style={styles.metricaIcono}>⏱️</Text>
          <Text style={styles.metricaValor}>{formatearTiempo()}</Text>
          <Text style={styles.metricaLabel}>
            {strings.portalPadres.resumenSemanal.tiempoTotal}
          </Text>
        </View>

        {/* Racha de días */}
        <View style={styles.metricaCard}>
          <Text style={styles.metricaIcono}>🔥</Text>
          <Text style={styles.metricaValor}>{rachaDias}</Text>
          <Text style={styles.metricaLabel}>
            {strings.portalPadres.resumenSemanal.rachaDias}
          </Text>
        </View>

        {/* Logros obtenidos */}
        <View style={styles.metricaCard}>
          <Text style={styles.metricaIcono}>🏆</Text>
          <Text style={styles.metricaValor}>{logrosObtenidos}</Text>
          <Text style={styles.metricaLabel}>
            {strings.portalPadres.resumenSemanal.logros}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    ...theme.shadows.small,
  },
  titulo: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.h3,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.xs,
  },
  periodo: {
    fontFamily: theme.typography.fontFamily.secondary,
    fontSize: theme.typography.fontSize.bodySmall,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.grisAdministrativo,
    marginBottom: theme.spacing.md,
  },
  metricas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -theme.spacing.xs,
  },
  metricaCard: {
    width: '50%',
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
  },
  metricaIcono: {
    fontSize: 32,
    marginBottom: theme.spacing.xs,
  },
  metricaValor: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.h2,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.azulDatos,
    marginBottom: theme.spacing.xs,
  },
  metricaLabel: {
    fontFamily: theme.typography.fontFamily.secondary,
    fontSize: theme.typography.fontSize.caption,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
  },
});

export default ResumenSemanal;
