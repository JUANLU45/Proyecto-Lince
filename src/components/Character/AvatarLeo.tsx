/**
 * AvatarLeo - Avatar de Leo el Lince con emociones
 * Basado en: UI_COMPONENTS.md líneas 81-95
 *
 * Estados Emocionales:
 * - Feliz: Ojos brillantes, sonrisa amplia
 * - Pensativo: Garra en barbilla, cejas ligeramente fruncidas
 * - Animado: Salto sutil, ojos muy abiertos
 * - Calmado: Ojos entrecerrados, postura relajada
 * - Sorprendido: Ojos muy abiertos, boca en "O"
 */

import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { theme } from '../../constants';
import type { AvatarLeoProps } from '../../types';

/**
 * Componente AvatarLeo
 * Según PROJECT_REQUIREMENTS.md RF-001: Personalización con Leo
 */
const AvatarLeo: React.FC<AvatarLeoProps> = ({
  emocion,
  tamaño,
  animacion = false,
  onPress,
  testID,
  accessible = true,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animacion) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -10,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      bounceAnim.setValue(0);
    }
  }, [animacion, bounceAnim]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: theme.animations.scale.pressed,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getTamañoPixels = () => {
    return theme.componentSizes.avatar[tamaño];
  };

  const getEmocionEmoji = () => {
    switch (emocion) {
      case 'feliz':
        return '😊';
      case 'pensativo':
        return '🤔';
      case 'animado':
        return '🤩';
      case 'calmado':
        return '😌';
      case 'sorprendido':
        return '😮';
      default:
        return '😊';
    }
  };

  const getEmocionColor = () => {
    switch (emocion) {
      case 'feliz':
        return theme.colors.amarilloSol;
      case 'pensativo':
        return theme.colors.azulCalma;
      case 'animado':
        return theme.colors.verdeJungla;
      case 'calmado':
        return theme.colors.azulCalma;
      case 'sorprendido':
        return theme.colors.amarilloSol;
      default:
        return theme.colors.azulCalma;
    }
  };

  const avatarStyle = [
    styles.avatarContainer,
    {
      width: getTamañoPixels(),
      height: getTamañoPixels(),
      backgroundColor: getEmocionColor(),
    },
  ];

  const emojiElement = (
    <Text
      style={[
        styles.emoji,
        { fontSize: getTamañoPixels() * 0.6 },
      ]}
    >
      {getEmocionEmoji()}
    </Text>
  );

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { scale: scaleAnim },
            { translateY: bounceAnim },
          ],
        },
      ]}
    >
      {onPress ? (
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={avatarStyle}
          accessible={accessible}
          accessibilityLabel={accessibilityLabel || `Leo está ${emocion}`}
          accessibilityHint={accessibilityHint}
          accessibilityRole="button"
          testID={testID}
        >
          {emojiElement}
        </TouchableOpacity>
      ) : (
        <View
          style={avatarStyle}
          accessible={accessible}
          accessibilityLabel={accessibilityLabel || `Leo está ${emocion}`}
          accessibilityHint={accessibilityHint}
          testID={testID}
        >
          {emojiElement}
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    borderRadius: theme.borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  emoji: {
    textAlign: 'center',
  },
});

export default AvatarLeo;
