/**
 * Modal - Componente modal reutilizable
 * Basado en: UI_COMPONENTS.md líneas 65-78
 *
 * Especificaciones:
 * - Fondo: Overlay negro con opacidad 0.5
 * - Contenedor: Fondo blanco, bordes redondeados 16px
 * - Animación: Fade in/out + Scale
 * - Máximo ancho: 90% de pantalla, máximo 400px
 */

import React, { useEffect, useRef } from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { theme, strings } from '../../constants';
import type { ModalProps } from '../../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MAX_WIDTH = Math.min(SCREEN_WIDTH * 0.9, 400);

/**
 * Componente Modal
 * Según PROJECT_REQUIREMENTS.md RNF-003: Accesibilidad WCAG 2.1 AA
 */
const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  titulo,
  children,
  tipo = 'info',
  testID,
  accessible = true,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: theme.animations.duration.normal,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: theme.animations.duration.fast,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: theme.animations.duration.fast,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, scaleAnim]);

  const getHeaderColor = () => {
    switch (tipo) {
      case 'info':
        return theme.colors.azulCalma;
      case 'confirmacion':
        return theme.colors.verdeJungla;
      case 'alerta':
        return theme.colors.amarilloSol;
      default:
        return theme.colors.azulCalma;
    }
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      testID={testID}
    >
      <Animated.View
        style={[
          styles.overlay,
          { opacity: fadeAnim },
        ]}
      >
        <TouchableOpacity
          style={styles.overlayTouchable}
          activeOpacity={1}
          onPress={onClose}
          accessible={false}
        />
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ scale: scaleAnim }],
              opacity: fadeAnim,
            },
          ]}
          accessible={accessible}
          accessibilityLabel={accessibilityLabel || titulo}
          accessibilityHint={accessibilityHint}
          accessibilityRole="alert"
          accessibilityViewIsModal
        >
          {titulo && (
            <View style={[styles.header, { borderTopColor: getHeaderColor() }]}>
              <Text style={styles.titulo}>{titulo}</Text>
              <TouchableOpacity
                onPress={onClose}
                style={styles.closeButton}
                accessible
                accessibilityLabel={strings.accesibilidad.botonCerrar}
                accessibilityRole="button"
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.content}>
            {children}
          </View>
        </Animated.View>
      </Animated.View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.large,
    width: MAX_WIDTH,
    maxHeight: '80%',
    ...theme.shadows.large,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderTopLeftRadius: theme.borderRadius.large,
    borderTopRightRadius: theme.borderRadius.large,
    borderTopWidth: theme.borderWidth.thick,
  },
  titulo: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.h2,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisOscuro,
    flex: 1,
  },
  closeButton: {
    width: theme.componentSizes.minTouchTarget,
    height: theme.componentSizes.minTouchTarget,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: theme.typography.fontSize.h2,
    color: theme.colors.grisAdministrativo,
    fontWeight: theme.typography.fontWeight.bold,
  },
  content: {
    padding: theme.spacing.md,
  },
});

export default Modal;
