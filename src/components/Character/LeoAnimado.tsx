/**
 * LeoAnimado - Leo el Lince con animaciones
 * Basado en: UI_COMPONENTS.md líneas 96-108
 *
 * Animaciones Específicas:
 * - Saltar: Movimiento vertical suave, 1.5s duración
 * - Bailar: Balanceo lateral con rotación leve
 * - Pensar: Movimiento sutil de cabeza
 * - Celebrar: Secuencia de saltos con confeti
 * - Dormitar: Ojos que se cierran gradualmente
 */

import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { theme } from '../../constants';
import type { LeoAnimadoProps } from '../../types';

/**
 * Componente LeoAnimado
 * Según PROJECT_REQUIREMENTS.md RF-015: Feedback visual inmediato
 */
const LeoAnimado: React.FC<LeoAnimadoProps> = ({
  accion,
  loop = false,
  onAnimacionCompleta,
  testID,
  accessible = true,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const getAnimacion = () => {
      switch (accion) {
        case 'saltar':
          return Animated.sequence([
            Animated.timing(translateY, {
              toValue: -60,
              duration: 750,
              useNativeDriver: true,
            }),
            Animated.timing(translateY, {
              toValue: 0,
              duration: 750,
              useNativeDriver: true,
            }),
          ]);

        case 'bailar':
          return Animated.parallel([
            Animated.sequence([
              Animated.timing(translateX, {
                toValue: 20,
                duration: 400,
                useNativeDriver: true,
              }),
              Animated.timing(translateX, {
                toValue: -20,
                duration: 400,
                useNativeDriver: true,
              }),
              Animated.timing(translateX, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
              }),
            ]),
            Animated.sequence([
              Animated.timing(rotate, {
                toValue: 0.1,
                duration: 400,
                useNativeDriver: true,
              }),
              Animated.timing(rotate, {
                toValue: -0.1,
                duration: 400,
                useNativeDriver: true,
              }),
              Animated.timing(rotate, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
              }),
            ]),
          ]);

        case 'pensar':
          return Animated.sequence([
            Animated.timing(rotate, {
              toValue: 0.05,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(rotate, {
              toValue: -0.05,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(rotate, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ]);

        case 'celebrar':
          return Animated.sequence([
            Animated.parallel([
              Animated.timing(translateY, {
                toValue: -80,
                duration: 400,
                useNativeDriver: true,
              }),
              Animated.timing(scale, {
                toValue: 1.2,
                duration: 400,
                useNativeDriver: true,
              }),
            ]),
            Animated.parallel([
              Animated.timing(translateY, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
              }),
              Animated.timing(scale, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
              }),
            ]),
            Animated.parallel([
              Animated.timing(translateY, {
                toValue: -40,
                duration: 300,
                useNativeDriver: true,
              }),
            ]),
            Animated.timing(translateY, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ]);

        case 'dormitar':
          return Animated.sequence([
            Animated.timing(scale, {
              toValue: 0.95,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]);

        default:
          return Animated.timing(translateY, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          });
      }
    };

    const animaciones = getAnimacion();

    if (loop) {
      Animated.loop(animaciones).start();
    } else {
      animaciones.start(({ finished }) => {
        if (finished && onAnimacionCompleta) {
          onAnimacionCompleta();
        }
      });
    }

    return () => {
      translateY.stopAnimation();
      translateX.stopAnimation();
      rotate.stopAnimation();
      scale.stopAnimation();
    };
  }, [accion, loop, onAnimacionCompleta, translateY, translateX, rotate, scale]);

  const getEmoji = () => {
    switch (accion) {
      case 'saltar':
        return '🦎⬆️';
      case 'bailar':
        return '🦎💃';
      case 'pensar':
        return '🦎🤔';
      case 'celebrar':
        return '🦎🎉';
      case 'dormitar':
        return '🦎😴';
      default:
        return '🦎';
    }
  };

  const rotateInterpolation = rotate.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-57.3deg', '57.3deg'],
  });

  return (
    <View
      style={styles.container}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel || `Leo está ${accion === 'saltar' ? 'saltando' : accion === 'bailar' ? 'bailando' : accion === 'pensar' ? 'pensando' : accion === 'celebrar' ? 'celebrando' : 'dormitando'}`}
      accessibilityHint={accessibilityHint}
      testID={testID}
    >
      <Animated.View
        style={[
          styles.leoContainer,
          {
            transform: [
              { translateY },
              { translateX },
              { rotate: rotateInterpolation },
              { scale },
            ],
          },
        ]}
      >
        <Text style={styles.leo}>{getEmoji()}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  leoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  leo: {
    fontSize: theme.componentSizes.avatar.grande,
    textAlign: 'center',
  },
});

export default LeoAnimado;
