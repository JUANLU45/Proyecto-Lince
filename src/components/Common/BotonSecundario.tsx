/**
 * BotonSecundario - Botón secundario de la aplicación
 * Basado en: BotonSecundario_SPEC.md
 *
 * Especificaciones:
 * - Altura mínima: 50px (fácil toque para niños)
 * - Bordes redondeados: 8px
 * - Animación: Escala 0.98 al presionar
 * - Sombra: 2px opacidad 0.1
 * - Colores: Gris secundario
 *
 * Casos de uso (APP_BLUEPRINT.md):
 * - Línea 86: "Elegir nueva actividad"
 * - Línea 102: Opciones de menú secundarias
 * - Línea 118: Navegación secundaria en Portal de Padres
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
import type { BaseProps } from '../../types';

interface BotonSecundarioProps extends BaseProps {
  readonly texto: string;
  readonly onPress: () => void;
  readonly icono?: string;
  readonly deshabilitado?: boolean;
  readonly variante?: 'ghost' | 'outline' | 'subtle';
  readonly tamaño?: 'pequeño' | 'mediano' | 'grande';
}

/**
 * Componente BotonSecundario
 * Según PROJECT_REQUIREMENTS.md RNF-003: Accesibilidad WCAG 2.1 AA
 */
const BotonSecundario: React.FC<BotonSecundarioProps> = ({
  texto,
  onPress,
  icono,
  deshabilitado = false,
  variante = 'outline',
  tamaño = 'mediano',
  testID,
  accessible = true,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getVarianteStyles = () => {
    switch (variante) {
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: theme.borderWidth.medium,
          borderColor: theme.colors.grisAdministrativo,
        };
      case 'subtle':
        return {
          backgroundColor: theme.colors.grisClaro,
          borderWidth: 0,
        };
      default:
        return {
          backgroundColor: 'transparent',
          borderWidth: theme.borderWidth.medium,
          borderColor: theme.colors.grisAdministrativo,
        };
    }
  };

  const getTextColor = () => {
    if (deshabilitado) {
      return theme.colors.grisClaro;
    }
    return variante === 'subtle'
      ? theme.colors.grisOscuro
      : theme.colors.grisAdministrativo;
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
          getVarianteStyles(),
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
            <Text style={[styles.icon, { color: getTextColor() }]}>
              {icono}
            </Text>
          )}
          <Text
            style={[
              styles.texto,
              { color: getTextColor() },
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
    height: 50,
    borderRadius: theme.borderRadius.small,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    ...theme.shadows.small,
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
    fontFamily: theme.typography.fontFamily.secondary,
    fontSize: theme.typography.fontSize.bodyMedium,
    fontWeight: theme.typography.fontWeight.medium,
  },
  textoDisabled: {
    opacity: theme.opacity.disabled,
  },
});

export default BotonSecundario;
