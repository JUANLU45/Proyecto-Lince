/**
 * LeoEmociones - Gestor de emociones de Leo (componente controlado)
 * Basado en: UI_COMPONENTS.md línea 27 (jerarquía de componentes)
 *
 * Propósito: Wrapper de AvatarLeo que facilita el uso con props controladas
 * según el contexto de la actividad y el estado del niño.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import AvatarLeo from './AvatarLeo';
import type { EmocionLeo, Size } from '../../types';

interface LeoEmocionesProps {
  emocion: EmocionLeo;
  tamaño?: Size;
  autoAnimacion?: boolean;
  testID?: string;
}

/**
 * Componente LeoEmociones (controlado)
 * Según PROJECT_REQUIREMENTS.md RF-015: Feedback visual inmediato
 */
const LeoEmociones: React.FC<LeoEmocionesProps> = ({
  emocion,
  tamaño = 'grande',
  autoAnimacion = true,
  testID,
}) => {
  return (
    <View style={styles.container} testID={testID}>
      <AvatarLeo
        emocion={emocion}
        tamaño={tamaño}
        animacion={autoAnimacion}
        testID={`${testID}-avatar`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LeoEmociones;
