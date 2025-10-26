/**
 * SugerenciaProactiva - Modal de sugerencias de IA
 * Basado en: DESIGN_SYSTEM.md líneas 10-21 y UI_COMPONENTS.md
 *
 * Propósito: Comunicar sugerencias del motor de IA de forma no intrusiva
 * Estilo: Modal que aparece suavemente sobre la pantalla actual
 *
 * Diseño:
 * - Fondo: Tarjeta blancoPuro con bordes redondeados
 * - Icono: Leo pensando o bombilla (amarilloSol)
 * - Texto: Título (H2) y descripción (Body)
 * - Acciones: Dos botones (aceptar/rechazar)
 */

import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal as RNModal,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { theme, strings } from '../../constants';
import type { SugerenciaProactivaProps } from '../../types';
import BotonPrimario from '../Common/BotonPrimario';
import BotonSecundario from '../Common/BotonSecundario';

/**
 * Componente SugerenciaProactiva
 * Según PROJECT_REQUIREMENTS.md RF-IA-004: Sugerencias proactivas
 */
const SugerenciaProactiva: React.FC<SugerenciaProactivaProps> = ({
  sugerencia,
  visible,
  onAceptar,
  onRechazar,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, scaleAnim, opacityAnim]);

  const getIcono = () => {
    switch (sugerencia.tipo) {
      case 'descanso':
      case 'rincón_calma':
        return '🧘';
      case 'cambio_actividad':
        return '🎯';
      case 'recompensa':
        return '🎉';
      default:
        return '💡';
    }
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onRechazar}
    >
      <TouchableWithoutFeedback onPress={onRechazar}>
        <Animated.View
          style={[
            styles.overlay,
            { opacity: opacityAnim },
          ]}
        >
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.container,
                {
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              {/* Icono */}
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>{getIcono()}</Text>
              </View>

              {/* Título */}
              <Text style={styles.titulo}>
                {strings.ia.sugerencias.titulo}
              </Text>

              {/* Descripción */}
              <Text style={styles.descripcion}>
                {sugerencia.descripcion}
              </Text>

              {/* Razonamiento (opcional, para desarrollo) */}
              {__DEV__ && sugerencia.razonamiento && (
                <Text style={styles.razonamiento}>
                  {sugerencia.razonamiento}
                </Text>
              )}

              {/* Botones */}
              <View style={styles.acciones}>
                <View style={styles.botonAceptar}>
                  <BotonPrimario
                    texto={strings.ia.sugerencias.aceptar}
                    onPress={onAceptar}
                    color="verde"
                    tamaño="mediano"
                  />
                </View>
                <View style={styles.botonRechazar}>
                  <BotonSecundario
                    texto={strings.ia.sugerencias.rechazar}
                    onPress={onRechazar}
                    variante="ghost"
                  />
                </View>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  container: {
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.lg,
    maxWidth: 400,
    width: '100%',
    ...theme.shadows.large,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  icon: {
    fontSize: 64,
  },
  titulo: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.h2,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  descripcion: {
    fontFamily: theme.typography.fontFamily.secondary,
    fontSize: theme.typography.fontSize.bodyMedium,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    lineHeight: theme.typography.fontSize.bodyMedium * theme.typography.lineHeight.normal,
  },
  razonamiento: {
    fontFamily: theme.typography.fontFamily.secondary,
    fontSize: theme.typography.fontSize.caption,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.grisAdministrativo,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: theme.spacing.md,
  },
  acciones: {
    gap: theme.spacing.sm,
  },
  botonAceptar: {
    marginBottom: theme.spacing.sm,
  },
  botonRechazar: {
    marginTop: 0,
  },
});

export default SugerenciaProactiva;
