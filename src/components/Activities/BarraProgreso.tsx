/**
 * BarraProgreso - Barra de progreso visual
 * Basado en: UI_COMPONENTS.md y Actividad.ts líneas 94-99
 *
 * Especificaciones:
 * - Altura configurable (default 8px)
 * - Animación suave de progreso
 * - Opción de mostrar porcentaje
 * - Colores del sistema de diseño
 */

import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { theme } from '../../constants';
import type { BarraProgresoProps } from '../../types';

/**
 * Componente BarraProgreso
 * Según PROJECT_REQUIREMENTS.md RF-015: Feedback visual inmediato
 */
const BarraProgreso: React.FC<BarraProgresoProps> = ({
  progreso,
  color = theme.colors.verdeJungla,
  altura = 8,
  mostrarPorcentaje = false,
  testID,
  accessible = true,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progreso,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progreso, animatedWidth]);

  const widthInterpolated = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View
      accessible={accessible}
      accessibilityLabel={accessibilityLabel || 'Barra de progreso: ' + Math.round(progreso) + ' por ciento'}
      accessibilityHint={accessibilityHint}
      accessibilityRole="progressbar"
      testID={testID}
    >
      <View style={[styles.container, { height: altura }]}>
        <View style={styles.background}>
          <Animated.View
            style={[
              styles.fill,
              {
                width: widthInterpolated,
                backgroundColor: color,
              },
            ]}
          />
        </View>
      </View>
      {mostrarPorcentaje && (
        <Text style={styles.porcentaje}>
          {Math.round(progreso)}%
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    backgroundColor: theme.colors.grisClaro,
    borderRadius: theme.borderRadius.small,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: theme.borderRadius.small,
  },
  porcentaje: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.caption,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
});

export default BarraProgreso;
