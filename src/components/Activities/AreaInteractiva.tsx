/**
 * AreaInteractiva - Área táctil para actividades
 * Basado en: UI_COMPONENTS.md y Actividad.ts líneas 78-83
 *
 * Funcionalidad:
 * - Captura toques con coordenadas
 * - Soporte opcional para gestos
 * - Sensibilidad configurable
 * - Feedback táctil
 */

import React, { useCallback } from 'react';
import {
  View,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { theme } from '../../constants';
import type { AreaInteractivaProps } from '../../types';

/**
 * Componente AreaInteractiva
 * Según PROJECT_REQUIREMENTS.md RF-007: Interacción táctil optimizada
 */
const AreaInteractiva: React.FC<AreaInteractivaProps> = ({
  onTouch,
  children,
  testID,
  accessible = true,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const handleTouch = useCallback((event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    onTouch(locationX, locationY);
  }, [onTouch]);

  return (
    <View
      style={styles.container}
      onTouchEnd={handleTouch}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel || 'Área interactiva'}
      accessibilityHint={accessibilityHint || 'Toca aquí para interactuar'}
      accessibilityRole="button"
      testID={testID}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.medium,
    overflow: 'hidden',
    ...theme.shadows.small,
  },
});

export default AreaInteractiva;
