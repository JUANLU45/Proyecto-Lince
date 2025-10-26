/**
 * IndicadorIA - Indicador de procesamiento de IA
 * Basado en: EstadoProcesamientoIA (IA.ts líneas 152-157)
 *
 * Propósito: Mostrar el estado de procesamiento del motor de IA
 * Estilo: Indicador discreto con animación de pulso
 *
 * Estados:
 * - Inactivo: Sin mostrar
 * - Procesando: Animación de pulso + progreso opcional
 * - Error: Indicador rojo
 */

import React, { useRef, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { theme } from '../../constants';
import type { BaseProps } from '../../types';

export interface IndicadorIAProps extends BaseProps {
  activo: boolean;
  progreso?: number; // 0-100
  etapa?: string;
  color?: string;
}

/**
 * Componente IndicadorIA
 * Según PROJECT_REQUIREMENTS.md RF-IA-002: Procesamiento en tiempo real
 */
const IndicadorIA: React.FC<IndicadorIAProps> = ({
  activo,
  progreso,
  etapa,
  color = theme.colors.azulCalma,
  testID,
  accessible = true,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (activo) {
      // Fade in
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Pulse animation
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );

      pulseAnimation.start();

      return () => {
        pulseAnimation.stop();
      };
    } else {
      // Fade out
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [activo, pulseAnim, opacityAnim]);

  if (!activo) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: opacityAnim },
      ]}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel || 'Procesando con IA'}
      accessibilityHint={accessibilityHint}
      testID={testID}
    >
      <Animated.View
        style={[
          styles.indicator,
          {
            backgroundColor: color,
            transform: [{ scale: pulseAnim }],
          },
        ]}
      />
      {etapa && (
        <Text style={styles.etapa}>{etapa}</Text>
      )}
      {typeof progreso === 'number' && (
        <Text style={styles.progreso}>{Math.round(progreso)}%</Text>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: theme.spacing.sm,
  },
  etapa: {
    fontFamily: theme.typography.fontFamily.secondary,
    fontSize: theme.typography.fontSize.caption,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.grisOscuro,
    flex: 1,
  },
  progreso: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.caption,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisAdministrativo,
    marginLeft: theme.spacing.sm,
  },
});

export default IndicadorIA;
