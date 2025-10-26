/**
 * FeedbackVisual - Feedback visual para interacciones
 * Basado en: UI_COMPONENTS.md y Actividad.ts líneas 86-91
 *
 * Tipos de feedback:
 * - éxito: Animación de confirmación (verde)
 * - intento: Feedback neutral (azul)
 * - celebración: Animación festiva (multicolor)
 */

import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { theme } from '../../constants';
import type { FeedbackVisualProps } from '../../types';

/**
 * Componente FeedbackVisual
 * Según PROJECT_REQUIREMENTS.md RF-015: Feedback visual inmediato
 */
const FeedbackVisual: React.FC<FeedbackVisualProps> = ({
  tipo,
  posicion,
  visible,
  onComplete,
  testID,
  accessible = true,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Animación de aparición
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Animación de desaparición
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          if (onComplete) {
            onComplete();
          }
        });
      }, 800);

      return () => clearTimeout(timer);
    } else {
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
    }
  }, [visible, scaleAnim, opacityAnim, onComplete]);

  if (!visible) {
    return null;
  }

  const getEmoji = () => {
    switch (tipo) {
      case 'éxito':
        return '✓';
      case 'intento':
        return '•';
      case 'celebración':
        return '★';
      default:
        return '•';
    }
  };

  const getColor = () => {
    switch (tipo) {
      case 'éxito':
        return theme.colors.verdeJungla;
      case 'intento':
        return theme.colors.azulCalma;
      case 'celebración':
        return theme.colors.amarilloSol;
      default:
        return theme.colors.azulCalma;
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          left: posicion.x - 30,
          top: posicion.y - 30,
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel || 'Feedback: ' + tipo}
      accessibilityHint={accessibilityHint}
      testID={testID}
      pointerEvents="none"
    >
      <View style={[styles.circle, { backgroundColor: getColor() }]}>
        <Text style={styles.emoji}>{getEmoji()}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  emoji: {
    fontSize: 32,
    color: theme.colors.blancoPuro,
    fontWeight: theme.typography.fontWeight.bold,
  },
});

export default FeedbackVisual;
