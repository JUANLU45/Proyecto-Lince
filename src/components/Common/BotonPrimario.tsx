/**
 * BotonPrimario - Botón principal de la aplicación
 * Basado en: UI_COMPONENTS.md líneas 48-64
 *
 * Especificaciones:
 * - Altura mínima: 60px (táctil fácil para niños)
 * - Bordes redondeados: 12px
 * - Animación: Escala 0.95 al presionar
 * - Sombra: 4px con opacidad 0.2
 * - Tipografía: GoogleSans-Bold, 18px
 */

import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  View,
} from 'react-native';
import { theme } from '../../constants';
import type { BotonProps } from '../../types';

/**
 * Componente BotonPrimario
 * Según PROJECT_REQUIREMENTS.md RNF-003: Accesibilidad WCAG 2.1 AA
 */
const BotonPrimario: React.FC<BotonProps> = ({
  texto,
  onPress,
  icono,
  deshabilitado = false,
  tamaño = 'mediano',
  color = 'azul',
  testID,
  accessible = true,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

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

  const getBackgroundColor = () => {
    if (deshabilitado) {
      return theme.colors.grisClaro;
    }

    switch (color) {
      case 'azul':
        return theme.colors.azulCalma;
      case 'verde':
        return theme.colors.verdeJungla;
      case 'amarillo':
        return theme.colors.amarilloSol;
      case 'rojo':
        return theme.colors.rojoPeligro;
      default:
        return theme.colors.azulCalma;
    }
  };

  const getTamañoStyles = () => {
    return theme.componentSizes.button[tamaño];
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={deshabilitado}
        style={[
          styles.button,
          getTamañoStyles(),
          { backgroundColor: getBackgroundColor() },
          deshabilitado && styles.buttonDisabled,
        ]}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel || texto}
        accessibilityHint={accessibilityHint}
        accessibilityRole="button"
        accessibilityState={{ disabled: deshabilitado }}
        testID={testID}
      >
        <View style={styles.content}>
          {icono && (
            <Text style={styles.icon}>{icono}</Text>
          )}
          <Text
            style={[
              styles.texto,
              deshabilitado && styles.textoDisabled,
            ]}
          >
            {texto}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    borderRadius: theme.borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  buttonDisabled: {
    opacity: theme.opacity.disabled,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: theme.typography.fontSize.h3,
    marginRight: theme.spacing.sm,
  },
  texto: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.button,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.blancoPuro,
  },
  textoDisabled: {
    color: theme.colors.grisOscuro,
  },
});

export default BotonPrimario;
