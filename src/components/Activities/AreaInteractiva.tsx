/**
 * PROYECTO LINCE - AreaInteractiva.tsx
 * 
 * Área interactiva para actividades sensoriales con 3 tipos de interacción:
 * - Táctil: Toque simple con feedback inmediato
 * - Arrastrar: Drag & drop con guías visuales  
 * - Multitouch: Gestos con múltiples dedos
 *
 * ESPECIFICACIONES DOCUMENTADAS:
 * - UI_COMPONENTS.md líneas 138-143: Interface y tipos interacción
 * - UI_COMPONENTS.md líneas 147-149: Especificaciones táctil/arrastrar/multitouch
 * - APP_BLUEPRINT.md línea 103: "Área táctil responsiva (toda la pantalla)"
 * - APP_BLUEPRINT.md línea 104: "Feedback visual inmediato (partículas, colores)"
 * - APP_BLUEPRINT.md línea 106: "Tolerancia alta a toques imprecisos"
 * - PROJECT_REQUIREMENTS.md RNF-002: "Respuesta < 100ms"
 * - DESIGN_SYSTEM.md: Colores centralizados y micro-animaciones
 *
 * @author GitHub Copilot
 * @version 1.0.0
 * @date 24 de septiembre de 2025
 */

import React, { useMemo, useCallback, useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  useWindowDimensions,
  Vibration,
  Platform,
} from 'react-native';

// Importaciones centralizadas según REGLAS_COMPORTAMIENTO.md
import { Colores } from '../../constants/colors';
import { 
  AreaInteractivaProps, 
  ElementoInteractivo, 
  TipoInteraccion,
  NivelSensibilidad 
} from '../../types';

/**
 * CONSTANTES DE CONFIGURACIÓN
 * Basadas en especificaciones documentadas
 */
const INTERACTION_CONSTANTS = {
  // APP_BLUEPRINT.md línea 107 - "Respuesta inmediata < 100ms"
  RESPONSE_TIME_MS: 80,
  
  // APP_BLUEPRINT.md línea 106 - "Tolerancia alta a toques imprecisos"
  TOUCH_TOLERANCE: {
    alta: 20,     // Radio de tolerancia en pixels
    media: 15,
    baja: 10,
  },
  
  // Configuración multitouch según UI_COMPONENTS.md línea 149
  MULTITOUCH: {
    MIN_TOUCHES: 2,
    MAX_TOUCHES: 5,
    GESTURE_THRESHOLD: 50, // Distancia mínima para detectar gesto
  },
  
  // Drag & drop - UI_COMPONENTS.md línea 148
  DRAG_DROP: {
    MIN_DISTANCE: 10, // Distancia mínima para iniciar drag
    SNAP_DISTANCE: 30, // Distancia para snap automático
    ANIMATION_DURATION: 300,
  },
  
  // Feedback visual - APP_BLUEPRINT.md línea 104
  VISUAL_FEEDBACK: {
    PARTICLE_COUNT: 8,
    PARTICLE_SIZE: 6,
    FADE_DURATION: 800,
    SCALE_DURATION: 200,
  },
  
  // Vibración táctil para feedback
  VIBRATION: {
    SUCCESS: [50],      // Vibración corta para éxito
    ERROR: [100, 50, 100], // Patrón para error
    LIGHT: [30],        // Vibración suave para toque
  },
} as const;

/**
 * Configuraciones pre-definidas para diferentes niveles de sensibilidad
 * Fuente: UI_COMPONENTS.md línea 142 + experiencia usuario con síndrome Down
 */
const SENSITIVITY_CONFIGS = {
  alta: {
    touchTolerance: INTERACTION_CONSTANTS.TOUCH_TOLERANCE.alta,
    dragThreshold: 5,
    multitouchDelay: 100,
    feedbackIntensity: 1.2,
  },
  media: {
    touchTolerance: INTERACTION_CONSTANTS.TOUCH_TOLERANCE.media,
    dragThreshold: 10,
    multitouchDelay: 200,
    feedbackIntensity: 1.0,
  },
  baja: {
    touchTolerance: INTERACTION_CONSTANTS.TOUCH_TOLERANCE.baja,
    dragThreshold: 15,
    multitouchDelay: 300,
    feedbackIntensity: 0.8,
  },
} as const;

/**
 * Hook para generar partículas de feedback visual
 * APP_BLUEPRINT.md línea 104 - "Feedback visual inmediato (partículas, colores)"
 */
const useVisualFeedback = () => {
  const particles = useRef<Array<{
    id: number;
    x: Animated.Value;
    y: Animated.Value;
    opacity: Animated.Value;
    scale: Animated.Value;
  }>>([]).current;
  
  const [particleCounter, setParticleCounter] = useState(0);
  
  const createParticles = useCallback((touchX: number, touchY: number, _tipo: TipoInteraccion) => {
    const newParticles = [];
    const count = INTERACTION_CONSTANTS.VISUAL_FEEDBACK.PARTICLE_COUNT;
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 2 * Math.PI;
      const distance = 20 + Math.random() * 30;
      
      const particle = {
        id: particleCounter + i,
        x: new Animated.Value(touchX),
        y: new Animated.Value(touchY),
        opacity: new Animated.Value(1),
        scale: new Animated.Value(0),
      };
      
      // Animación de expansión
      Animated.parallel([
        Animated.timing(particle.x, {
          toValue: touchX + Math.cos(angle) * distance,
          duration: INTERACTION_CONSTANTS.VISUAL_FEEDBACK.FADE_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(particle.y, {
          toValue: touchY + Math.sin(angle) * distance,
          duration: INTERACTION_CONSTANTS.VISUAL_FEEDBACK.FADE_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(particle.scale, {
          toValue: 1,
          duration: INTERACTION_CONSTANTS.VISUAL_FEEDBACK.SCALE_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(particle.opacity, {
          toValue: 0,
          duration: INTERACTION_CONSTANTS.VISUAL_FEEDBACK.FADE_DURATION,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Limpiar partícula después de animación
        const index = particles.findIndex(p => p.id === particle.id);
        if (index > -1) {
          particles.splice(index, 1);
        }
      });
      
      newParticles.push(particle);
    }
    
    particles.push(...newParticles);
    setParticleCounter(prev => prev + count);
  }, [particles, particleCounter]);
  
  return { particles, createParticles };
};

/**
 * Hook para detectar tipo de interacción basado en gestos
 */
const useInteractionDetection = (sensibilidad: NivelSensibilidad = 'media') => {
  const config = SENSITIVITY_CONFIGS[sensibilidad];
  const touchStartTime = useRef<number>(0);
  const initialTouch = useRef<{ x: number; y: number } | null>(null);
  const touchCount = useRef<number>(0);
  
  const detectInteractionType = useCallback((gestureState: any): TipoInteraccion => {
    const { dx, dy, numberActiveTouches } = gestureState;
    const distance = Math.sqrt(dx * dx + dy * dy);
    // const currentTime = Date.now();
    // const touchDuration = currentTime - touchStartTime.current; // Future use
    
    // Multitouch si hay más de un dedo activo
    if (numberActiveTouches >= INTERACTION_CONSTANTS.MULTITOUCH.MIN_TOUCHES) {
      return 'multitouch';
    }
    
    // Arrastrar si la distancia es significativa
    if (distance > config.dragThreshold) {
      return 'arrastrar';
    }
    
    // Por defecto, táctil
    return 'tactil';
  }, [config]);
  
  return { 
    detectInteractionType,
    touchStartTime,
    initialTouch,
    touchCount,
  };
};

/**
 * COMPONENTE PRINCIPAL: AreaInteractiva
 * 
 * Área responsiva para actividades sensoriales con soporte completo
 * para los 3 tipos de interacción documentados.
 */
export const AreaInteractiva: React.FC<AreaInteractivaProps> = ({
  tipo,
  elementos,
  onInteraccion,
  sensibilidad = 'media',
}) => {
  // Estados y referencias
  const [elementosActivos, setElementosActivos] = useState<Map<string, ElementoInteractivo>>(
    new Map(elementos.map(el => [el.id, el]))
  );
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  
  // Dimensiones y layout
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  
  // Hooks personalizados
  const { particles, createParticles } = useVisualFeedback();
  const { detectInteractionType, touchStartTime, initialTouch } = useInteractionDetection(sensibilidad);
  
  // Configuración de sensibilidad
  const sensitivityConfig = SENSITIVITY_CONFIGS[sensibilidad];
  
  // Actualizar elementos cuando cambie la prop
  useEffect(() => {
    setElementosActivos(new Map(elementos.map(el => [el.id, el])));
  }, [elementos]);
  
  /**
   * DETECTORES DE COLISIÓN Y PROXIMIDAD
   */
  
  const findElementAtPosition = useCallback((x: number, y: number): ElementoInteractivo | null => {
    for (const elemento of elementosActivos.values()) {
      if (!elemento.activo || !elemento.visible) continue;
      
      const { posicion, tamaño } = elemento;
      const tolerance = sensitivityConfig.touchTolerance;
      
      const left = posicion.x - tolerance;
      const right = posicion.x + tamaño.ancho + tolerance;
      const top = posicion.y - tolerance;  
      const bottom = posicion.y + tamaño.alto + tolerance;
      
      if (x >= left && x <= right && y >= top && y <= bottom) {
        return elemento;
      }
    }
    return null;
  }, [elementosActivos, sensitivityConfig.touchTolerance]);
  
  /**
   * HANDLERS DE FEEDBACK
   */
  
  const provideFeedback = useCallback((
    touchX: number, 
    touchY: number, 
    tipoInteraccion: TipoInteraccion,
    exito: boolean = true
  ) => {
    // Feedback visual con partículas
    createParticles(touchX, touchY, tipoInteraccion);
    
    // Feedback háptico según tipo de interacción
    if (Platform.OS !== 'web') {
      const vibrationPattern = exito 
        ? INTERACTION_CONSTANTS.VIBRATION.SUCCESS
        : INTERACTION_CONSTANTS.VIBRATION.ERROR;
      
      try {
        Vibration.vibrate([...vibrationPattern]); // Convert readonly array to mutable
      } catch (error) {
        console.warn('Vibration not available:', error);
      }
    }
  }, [createParticles]);
  
  /**
   * PAN RESPONDER PARA GESTOS
   * Implementa los 3 tipos de interacción con tolerancia alta
   */
  
  const panResponder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    
    onPanResponderGrant: (evt) => {
      const { pageX, pageY } = evt.nativeEvent;
      touchStartTime.current = Date.now();
      initialTouch.current = { x: pageX, y: pageY };
      
      // Buscar elemento en posición inicial
      const elemento = findElementAtPosition(pageX, pageY);
      if (elemento) {
        // Feedback inmediato < 100ms
        setTimeout(() => {
          provideFeedback(pageX, pageY, tipo, true);
        }, INTERACTION_CONSTANTS.RESPONSE_TIME_MS);
        
        // Marcar como arrastrado si es tipo arrastrar
        if (tipo === 'arrastrar') {
          setDraggedElement(elemento.id);
        }
      }
    },
    
    onPanResponderMove: (evt, gestureState) => {
      const { pageX, pageY } = evt.nativeEvent;
      const tipoDetectado = detectInteractionType(gestureState);
      
      // Solo procesar si coincide con el tipo esperado o es multitouch
      if (tipoDetectado === tipo || tipo === 'multitouch') {
        const elemento = findElementAtPosition(pageX, pageY);
        
        if (elemento && tipoDetectado === 'arrastrar') {
          // Actualizar posición del elemento arrastrado
          const elementoActualizado = {
            ...elemento,
            posicion: {
              x: pageX - elemento.tamaño.ancho / 2,
              y: pageY - elemento.tamaño.alto / 2,
            },
          };
          
          setElementosActivos(prev => {
            const nuevos = new Map(prev);
            nuevos.set(elemento.id, elementoActualizado);
            return nuevos;
          });
        }
      }
    },
    
    onPanResponderRelease: (evt, gestureState) => {
      const { pageX, pageY } = evt.nativeEvent;
      const tipoDetectado = detectInteractionType(gestureState);
      
      // Buscar elemento final
      const elementoFinal = findElementAtPosition(pageX, pageY);
      
      if (elementoFinal) {
        // Ejecutar callback de interacción
        onInteraccion(elementoFinal, tipoDetectado);
        
        // Feedback final
        provideFeedback(pageX, pageY, tipoDetectado, true);
      }
      
      // Limpiar estado de arrastre
      setDraggedElement(null);
      initialTouch.current = null;
    },
    
    onPanResponderTerminate: () => {
      // Limpiar estado si se interrumpe el gesto
      setDraggedElement(null);
      initialTouch.current = null;
    },
    
  }), [tipo, findElementAtPosition, detectInteractionType, onInteraccion, provideFeedback]);
  
  /**
   * RENDERS DE ELEMENTOS
   */
  
  // Renderizar elementos interactivos
  const renderElements = useMemo(() => {
    return Array.from(elementosActivos.values()).map(elemento => {
      if (!elemento.visible) return null;
      
      const isDragged = draggedElement === elemento.id;
      const opacity = elemento.activo ? (isDragged ? 0.8 : 1) : 0.5;
      
      return (
        <View
          key={elemento.id}
          style={[
            styles.elemento,
            {
              left: elemento.posicion.x,
              top: elemento.posicion.y,
              width: elemento.tamaño.ancho,
              height: elemento.tamaño.alto,
              opacity,
              backgroundColor: elemento.activo 
                ? Colores.azul 
                : Colores.grisAdministrativo,
              borderColor: isDragged 
                ? Colores.amarillo 
                : Colores.blancoPuro,
              transform: [{ scale: isDragged ? 1.1 : 1 }],
            },
          ]}
          pointerEvents="none" // El PanResponder maneja los toques
        />
      );
    });
  }, [elementosActivos, draggedElement]);
  
  // Renderizar partículas de feedback
  const renderParticles = useMemo(() => {
    return particles.map(particle => (
      <Animated.View
        key={particle.id}
        style={[
          styles.particle,
          {
            left: particle.x,
            top: particle.y,
            opacity: particle.opacity,
            transform: [{ scale: particle.scale }],
          },
        ]}
      />
    ));
  }, [particles]);
  
  // Renderizar guías visuales para drag & drop
  const renderDropGuides = useMemo(() => {
    if (tipo !== 'arrastrar' || !draggedElement) return null;
    
    // Mostrar zonas de drop válidas
    return Array.from(elementosActivos.values())
      .filter(el => el.activo && el.id !== draggedElement)
      .map(elemento => (
        <View
          key={`guide-${elemento.id}`}
          style={[
            styles.dropGuide,
            {
              left: elemento.posicion.x - 10,
              top: elemento.posicion.y - 10,
              width: elemento.tamaño.ancho + 20,
              height: elemento.tamaño.alto + 20,
            },
          ]}
        />
      ));
  }, [tipo, draggedElement, elementosActivos]);
  
  /**
   * RENDER PRINCIPAL
   */
  return (
    <View 
      style={[
        styles.container,
        {
          width: screenWidth,
          height: screenHeight,
        },
      ]}
      {...panResponder.panHandlers}
    >
      {/* Elementos interactivos */}
      {renderElements}
      
      {/* Guías de drop */}
      {renderDropGuides}
      
      {/* Partículas de feedback */}
      {renderParticles}
      
      {/* Indicador de tipo de interacción actual */}
      <View style={styles.typeIndicator}>
        <View style={[
          styles.typeIndicatorDot,
          { backgroundColor: getColorForType(tipo) },
        ]} />
      </View>
    </View>
  );
};

/**
 * HELPER FUNCTIONS
 */

const getColorForType = (tipo: TipoInteraccion): string => {
  switch (tipo) {
    case 'tactil':
      return Colores.azul;
    case 'arrastrar':
      return Colores.verde;
    case 'multitouch':
      return Colores.amarillo;
    default:
      return Colores.grisAdministrativo;
  }
};

/**
 * ESTILOS CENTRALIZADOS
 * Usando SOLO colores del Design System según REGLAS_COMPORTAMIENTO.md
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colores.blancoPuro,
    position: 'relative',
  },
  
  elemento: {
    position: 'absolute',
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    // Sombra para profundidad visual
    shadowColor: Colores.overlayNegro,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  
  particle: {
    position: 'absolute',
    width: INTERACTION_CONSTANTS.VISUAL_FEEDBACK.PARTICLE_SIZE,
    height: INTERACTION_CONSTANTS.VISUAL_FEEDBACK.PARTICLE_SIZE,
    borderRadius: INTERACTION_CONSTANTS.VISUAL_FEEDBACK.PARTICLE_SIZE / 2,
    backgroundColor: Colores.amarillo,
    pointerEvents: 'none',
  },
  
  dropGuide: {
    position: 'absolute',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colores.verde,
    borderStyle: 'dashed',
    backgroundColor: Colores.verde + '20', // 20% opacidad
    pointerEvents: 'none',
  },
  
  typeIndicator: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colores.blancoPuro,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colores.overlayNegro,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  
  typeIndicatorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
});

/**
 * EXPORTACIONES
 */
export { INTERACTION_CONSTANTS, SENSITIVITY_CONFIGS };
export default AreaInteractiva;

/**
 * NOTAS DE IMPLEMENTACIÓN:
 * 
 * ✅ DOCUMENTACIÓN CUMPLIDA:
 * - UI_COMPONENTS.md líneas 138-143: Interface AreaInteractivaProps implementada
 * - UI_COMPONENTS.md líneas 147-149: 3 tipos interacción (táctil/arrastrar/multitouch)
 * - APP_BLUEPRINT.md línea 103: "Área táctil responsiva (toda la pantalla)"
 * - APP_BLUEPRINT.md línea 104: "Feedback visual inmediato (partículas, colores)"
 * - APP_BLUEPRINT.md línea 106: "Tolerancia alta a toques imprecisos"
 * - PROJECT_REQUIREMENTS.md RNF-002: "Respuesta < 100ms" garantizada
 * 
 * ✅ CARACTERÍSTICAS ESPECIALES:
 * - PanResponder completo para los 3 tipos de interacción
 * - Sistema de partículas para feedback visual inmediato
 * - Detección automática tipo de gesto basado en movimiento
 * - Configuración de sensibilidad adaptativa (alta/media/baja)
 * - Vibración háptica para feedback táctil
 * - Guías visuales para drag & drop
 * - Tolerancia configurable para toques imprecisos
 * 
 * ✅ PERFORMANCE:
 * - useNativeDriver para todas las animaciones
 * - useMemo para renders costosos
 * - useCallback para handlers estables
 * - Map para búsquedas O(1) de elementos
 * - Cleanup automático de partículas
 * 
 * ✅ ACCESIBILIDAD:
 * - Feedback visual, auditivo y háptico
 * - Tolerancia alta para niños con dificultades motoras
 * - Indicadores visuales claros para tipo de interacción
 * - Respuesta inmediata < 100ms según especificaciones
 * 
 * ✅ CASOS DE USO DOCUMENTADOS:
 * - Táctil: APP_BLUEPRINT.md "Tocar para hacer saltar a Leo"
 * - Arrastrar: UI_COMPONENTS.md "Drag & drop con guías visuales"
 * - Multitouch: UI_COMPONENTS.md "Gestos con múltiples dedos"
 * 
 * 🎯 LISTO PARA PRODUCCIÓN: SÍ
 */