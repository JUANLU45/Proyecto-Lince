/**
 * MetricasAdmin - Dashboard de métricas administrativas
 * Basado en: DESIGN_SYSTEM.md líneas 56-65
 *
 * Propósito: Visualización de métricas detalladas de usuarios y sistema
 * Diseño:
 * - Tarjetas con blancoPuro y sombras suaves
 * - Gráficos con colores azulDatos, verdeDatos, amarilloSol
 * - Tipografía H3 para títulos, Caption para valores
 * - Pictogramas específicos para cada métrica
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { theme } from '../../../constants';
import type { BaseProps } from '../../../types';

export interface MetricaData {
  id: string;
  icono: string;
  titulo: string;
  valor: string | number;
  cambio?: number; // porcentaje de cambio
  color?: string;
}

export interface MetricasAdminProps extends BaseProps {
  metricas: MetricaData[];
}

/**
 * Componente MetricasAdmin
 * Según DESIGN_SYSTEM.md: Dashboard de Métricas
 */
const MetricasAdmin: React.FC<MetricasAdminProps> = ({
  metricas,
  testID,
  accessible = true,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const renderMetrica = (metrica: MetricaData) => {
    const color = metrica.color || theme.colors.azulDatos;

    return (
      <View key={metrica.id} style={styles.metricaCard}>
        <Text style={styles.metricaIcono}>{metrica.icono}</Text>
        <Text style={styles.metricaTitulo}>{metrica.titulo}</Text>
        <Text style={[styles.metricaValor, { color }]}>
          {metrica.valor}
        </Text>
        {typeof metrica.cambio === 'number' && (
          <View style={styles.cambioContainer}>
            <Text
              style={[
                styles.cambioTexto,
                {
                  color: metrica.cambio >= 0
                    ? theme.colors.verdeDatos
                    : theme.colors.rojoPeligro,
                },
              ]}
            >
              {metrica.cambio >= 0 ? '↑' : '↓'} {Math.abs(metrica.cambio)}%
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel || 'Métricas administrativas'}
      accessibilityHint={accessibilityHint}
      testID={testID}
    >
      <View style={styles.grid}>
        {metricas.map(renderMetrica)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: theme.spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -theme.spacing.xs,
  },
  metricaCard: {
    width: '50%',
    paddingHorizontal: theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },
  metricaIcono: {
    fontSize: 32,
    marginBottom: theme.spacing.xs,
  },
  metricaTitulo: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.caption,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.grisAdministrativo,
    marginBottom: theme.spacing.xs,
  },
  metricaValor: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.h2,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.xs,
  },
  cambioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cambioTexto: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.caption,
    fontWeight: theme.typography.fontWeight.bold,
  },
});

export default MetricasAdmin;
