/**
 * GraficoProgreso - Gráfico de progreso visual
 * Basado en: UI_COMPONENTS.md y DESIGN_SYSTEM.md líneas 56-65
 *
 * Propósito: Visualizar el progreso del niño de forma gráfica
 * Estilo: Tarjeta con gráfico simple (barras o línea)
 *
 * Colores: azulDatos, verdeDatos, amarilloSol
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { theme } from '../../constants';
import type { BaseProps, DatosGrafico } from '../../types';

export interface GraficoProgresoProps extends BaseProps {
  titulo: string;
  datos: DatosGrafico;
  altura?: number;
}

/**
 * Componente GraficoProgreso
 * Según PROJECT_REQUIREMENTS.md RF-010: Visualización de progreso
 */
const GraficoProgreso: React.FC<GraficoProgresoProps> = ({
  titulo,
  datos,
  altura = 200,
  testID,
  accessible = true,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const maxValue = Math.max(...datos.valores);

  const renderBarras = () => {
    return datos.etiquetas.map((etiqueta, index) => {
      const valor = datos.valores[index];
      const flexValue = valor / maxValue;

      return (
        <View key={index} style={styles.barraContainer}>
          <View style={styles.barraWrapper}>
            <View
              style={[
                styles.barra,
                {
                  flex: flexValue,
                  backgroundColor: theme.colors.azulDatos,
                },
              ]}
            />
          </View>
          <Text style={styles.etiqueta} numberOfLines={1}>
            {etiqueta}
          </Text>
          <Text style={styles.valor}>
            {valor}{datos.unidad || ''}
          </Text>
        </View>
      );
    });
  };

  return (
    <View
      style={styles.container}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel || 'Gráfico: ' + titulo}
      accessibilityHint={accessibilityHint}
      testID={testID}
    >
      <Text style={styles.titulo}>{titulo}</Text>
      <View style={[styles.graficoContainer, { height: altura }]}>
        <View style={styles.barras}>
          {renderBarras()}
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
    marginBottom: theme.spacing.md,
  },
  graficoContainer: {
    width: '100%',
  },
  barras: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  barraContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: theme.spacing.xs,
  },
  barraWrapper: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: theme.spacing.xs,
  },
  barra: {
    width: '100%',
    borderTopLeftRadius: theme.borderRadius.small,
    borderTopRightRadius: theme.borderRadius.small,
    minHeight: 4,
  },
  etiqueta: {
    fontFamily: theme.typography.fontFamily.secondary,
    fontSize: theme.typography.fontSize.caption,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.grisOscuro,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
  valor: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.caption,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.azulDatos,
    textAlign: 'center',
  },
});

export default GraficoProgreso;
