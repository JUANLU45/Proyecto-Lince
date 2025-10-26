/**
 * Loading - Componente de carga centralizado
 * Basado en: Loading_SPEC.md
 *
 * Especificaciones:
 * - Fondo: Overlay con opacidad
 * - Animación: Rotación y fade continuo
 * - Colores: Del sistema (azulCalma)
 *
 * Casos de uso (APP_BLUEPRINT.md):
 * - Línea 55: Loading en splash
 * - Línea 76: Durante navegación
 * - Línea 143: Análisis IA
 * - Línea 161: Exportes
 * - Línea 175: Configuración
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { theme, strings } from '../../constants';
import type { BaseProps } from '../../types';

interface LoadingProps extends BaseProps {
  readonly tipo: 'fullscreen' | 'inline' | 'overlay';
  readonly mensaje?: string;
  readonly duracionEstimada?: number;
  readonly onCancel?: () => void;
}

/**
 * Componente Loading
 * Según PROJECT_REQUIREMENTS.md RNF-002: Respuesta < 1 segundo
 * Según PROJECT_REQUIREMENTS.md RNF-003: Accesibilidad WCAG 2.1 AA
 */
const Loading: React.FC<LoadingProps> = ({
  tipo = 'overlay',
  mensaje,
  duracionEstimada,
  onCancel,
  testID,
  accessible = true,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: theme.animations.duration.normal,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ),
    ]).start();

    return () => {
      fadeAnim.stopAnimation();
      rotateAnim.stopAnimation();
    };
  }, [fadeAnim, rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const renderContent = () => (
    <Animated.View
      style={[
        tipo === 'inline' ? styles.inlineContainer : styles.container,
        { opacity: fadeAnim },
      ]}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel || mensaje || strings.common.cargando}
      accessibilityHint={accessibilityHint}
      accessibilityRole="progressbar"
    >
      <View style={styles.content}>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <ActivityIndicator
            size="large"
            color={theme.colors.azulCalma}
            testID={testID}
          />
        </Animated.View>
        {mensaje && (
          <Text style={styles.mensaje}>{mensaje}</Text>
        )}
        {duracionEstimada && duracionEstimada > 0 && (
          <Text style={styles.duracion}>
            {strings.common.tiempoEstimado}: {duracionEstimada}s
          </Text>
        )}
        {onCancel && (
          <TouchableOpacity
            onPress={onCancel}
            style={styles.cancelButton}
            accessible
            accessibilityLabel={strings.accesibilidad.botonCerrar}
            accessibilityRole="button"
          >
            <Text style={styles.cancelText}>{strings.common.cancelar}</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );

  if (tipo === 'fullscreen') {
    return (
      <Modal
        visible
        transparent
        animationType="fade"
        testID={testID}
      >
        <View style={styles.fullscreenOverlay}>
          {renderContent()}
        </View>
      </Modal>
    );
  }

  if (tipo === 'overlay') {
    return (
      <View style={styles.overlayContainer}>
        <View style={styles.overlayBackground} />
        {renderContent()}
      </View>
    );
  }

  return renderContent();
};

const styles = StyleSheet.create({
  fullscreenOverlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: theme.zIndex.modal,
  },
  overlayBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.overlay,
  },
  container: {
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.xl,
    ...theme.shadows.large,
    minWidth: 200,
  },
  inlineContainer: {
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mensaje: {
    fontFamily: theme.typography.fontFamily.secondary,
    fontSize: theme.typography.fontSize.bodyMedium,
    color: theme.colors.grisOscuro,
    marginTop: theme.spacing.md,
    textAlign: 'center',
  },
  duracion: {
    fontFamily: theme.typography.fontFamily.secondary,
    fontSize: theme.typography.fontSize.bodySmall,
    color: theme.colors.grisAdministrativo,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.small,
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.grisAdministrativo,
  },
  cancelText: {
    fontFamily: theme.typography.fontFamily.secondary,
    fontSize: theme.typography.fontSize.bodySmall,
    color: theme.colors.grisAdministrativo,
  },
});

export default Loading;
