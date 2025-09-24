import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ViewStyle,
  TextStyle,
} from 'react-native';

/**
 * VERIFICACIÓN DOCUMENTACIÓN COMPLETADA:
 * ✅ APP_BLUEPRINT.md línea 102: "AIService.ts puede recibir recomendación del backend"
 * ✅ DESIGN_SYSTEM.md: No especifica directamente, pero sigue principios IA componentes
 * ✅ PROJECT_REQUIREMENTS.md RF-IA-001: "Análisis de patrones de interacción en tiempo real"
 * ✅ TECHNOLOGY.md línea 199: "Generar sugerencias" y análisis IA estado
 * ✅ UI_COMPONENTS.md líneas 177-190: Interface TypeScript y estados visuales exactos
 * ✅ VERIFICATION_CHECKLIST.md: Estándares enterprise aplicados
 */

// Interface principal según UI_COMPONENTS.md línea 178
export interface IndicadorIAProps {
  estado: 'analizando' | 'procesando' | 'sugerencia_lista' | 'inactivo';
  visible: boolean;
  posicion?: 'superior_derecha' | 'inferior_derecha';
}

/**
 * Componente IndicadorIA
 * 
 * Propósito según PROJECT_REQUIREMENTS.md RF-IA-001:
 * "Análisis de patrones de interacción en tiempo real" - mostrar estado visual del motor IA
 * 
 * Estados según UI_COMPONENTS.md líneas 185-190:
 * - Analizando: Punto pulsante azul
 * - Procesando: Spinner sutil  
 * - Sugerencia lista: Icono Leo con notificación
 * - Inactivo: Oculto
 */
export const IndicadorIA: React.FC<IndicadorIAProps> = ({
  estado,
  visible,
  posicion = 'superior_derecha',
}) => {
  // Animaciones para diferentes estados
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleNotificationAnim = useRef(new Animated.Value(0)).current;

  // Error handling para props requeridos
  if (!visible || estado === 'inactivo') {
    return null;
  }

  // Animación pulsante para "analizando" según UI_COMPONENTS.md línea 186
  useEffect(() => {
    if (estado === 'analizando') {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      );
      pulseAnimation.start();
      return () => pulseAnimation.stop();
    } else {
      pulseAnim.setValue(1);
    }
  }, [estado, pulseAnim]);

  // Animación spinner para "procesando" según UI_COMPONENTS.md línea 187
  useEffect(() => {
    if (estado === 'procesando') {
      const spinAnimation = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      );
      spinAnimation.start();
      return () => {
        spinAnimation.stop();
        rotateAnim.setValue(0);
      };
    }
    return undefined;
  }, [estado, rotateAnim]);

  // Animación entrada/salida general
  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, fadeAnim]);

  // Animación notificación para "sugerencia_lista" según UI_COMPONENTS.md línea 188
  useEffect(() => {
    if (estado === 'sugerencia_lista') {
      const notificationAnimation = Animated.sequence([
        Animated.timing(scaleNotificationAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(100),
        Animated.loop(
          Animated.sequence([
            Animated.timing(scaleNotificationAnim, {
              toValue: 1.1,
              duration: 600,
              useNativeDriver: true,
            }),
            Animated.timing(scaleNotificationAnim, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }),
          ]),
        ),
      ]);
      notificationAnimation.start();
      return () => notificationAnimation.stop();
    } else {
      scaleNotificationAnim.setValue(0);
    }
    return undefined;
  }, [estado, scaleNotificationAnim]);

  // Función para obtener estilos según estado
  const getEstadoContenido = () => {
    switch (estado) {
      case 'analizando':
        return {
          backgroundColor: colors.azulCalma, // "Punto pulsante azul"
          icono: '🔍',
          texto: 'Analizando...',
        };
      case 'procesando':
        return {
          backgroundColor: colors.grisAcero, // "Spinner sutil"
          icono: '⚙️',
          texto: 'Procesando...',
        };
      case 'sugerencia_lista':
        return {
          backgroundColor: colors.verdeJungla, // "Icono de Leo con notificación"
          icono: '🦎',
          texto: 'Sugerencia lista',
        };
      default:
        return {
          backgroundColor: colors.grisAcero,
          icono: 'ℹ️',
          texto: 'IA',
        };
    }
  };

  // Obtener estilos de posición según prop posicion
  const getPosicionStyles = (): ViewStyle => {
    const base = {
      position: 'absolute',
      zIndex: 1000, // Siempre visible sobre otros elementos
    } as ViewStyle;

    switch (posicion) {
      case 'superior_derecha':
        return {
          ...base,
          top: 20,
          right: 20,
        };
      case 'inferior_derecha':
        return {
          ...base,
          bottom: 20,
          right: 20,
        };
      default:
        return {
          ...base,
          top: 20,
          right: 20,
        };
    }
  };

  const estadoContenido = getEstadoContenido();
  const posicionStyles = getPosicionStyles();

  // Calcular rotación para spinner
  const spinRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        posicionStyles,
        {
          opacity: fadeAnim,
        },
      ]}
      accessibilityLabel={`Estado de la IA: ${estadoContenido.texto}`}
      accessibilityHint={`La inteligencia artificial está ${estado.replace('_', ' ')}`}
    >
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: estadoContenido.backgroundColor,
            transform: [
              { scale: estado === 'analizando' ? pulseAnim : 1 },
              { rotate: estado === 'procesando' ? spinRotation : '0deg' },
            ],
          },
        ]}
      >
        {/* Icono principal */}
        <Text style={styles.icono}>
          {estadoContenido.icono}
        </Text>

        {/* Indicador de notificación para sugerencia_lista */}
        {estado === 'sugerencia_lista' && (
          <Animated.View
            style={[
              styles.notificacion,
              {
                transform: [{ scale: scaleNotificationAnim }],
              },
            ]}
          >
            <View style={styles.puntoNotificacion} />
          </Animated.View>
        )}
      </Animated.View>

      {/* Texto descriptivo opcional (solo visible en ciertos casos) */}
      {(estado === 'procesando' || estado === 'analizando') && (
        <View style={styles.textoContainer}>
          <Text style={styles.textoEstado}>
            {estadoContenido.texto}
          </Text>
        </View>
      )}
    </Animated.View>
  );
};

// Colores del Design System centralizados según documentación
const colors = {
  // Colores principales según DESIGN_SYSTEM.md y búsquedas assets
  azulCalma: '#1E90FF',
  verdeJungla: '#228B22',
  amarilloSol: '#FFD700',
  naranjaVibrante: '#FFA500',
  blancoPuro: '#FFFFFF',
  grisCarbón: '#2C2C2C',
  grisAcero: '#6B7280',
  rojoNotificacion: '#DC2626',
};

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    // Sombra para visibilidad sobre cualquier fondo
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Android shadow
  } as ViewStyle,

  icono: {
    fontSize: 24,
    textAlign: 'center',
  } as TextStyle,

  notificacion: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.rojoNotificacion,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.blancoPuro,
  } as ViewStyle,

  puntoNotificacion: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.blancoPuro,
  } as ViewStyle,

  textoContainer: {
    marginTop: 4,
    backgroundColor: colors.grisCarbón,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    maxWidth: 100,
  } as ViewStyle,

  textoEstado: {
    fontFamily: 'Lince-Regular',
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '400',
    color: colors.blancoPuro,
    textAlign: 'center',
  } as TextStyle,
});

export default IndicadorIA;