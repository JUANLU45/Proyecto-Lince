/**
 * BARRA PROGRESO COMPONENT
 * 
 * Componente especializado para barras de progreso de actividades según:
 * - APP_BLUEPRINT.md línea 48: "Barra de progreso global" 
 * - APP_BLUEPRINT.md línea 62: "Progreso específico de la isla"
 * - UI_COMPONENTS.md línea 138: "Header: Título + barra de progreso + botón pausa"
 * - UI_COMPONENTS.md línea 314: "Progreso: Barra de progreso con Leo animado"
 * 
 * CARACTERÍSTICAS ESPECIALES NIÑOS SÍNDROME DOWN:
 * - Leo animado moviéndose con el progreso visual y motivacional
 * - Animaciones suaves sin ser distractoras pero estimulantes
 * - Colores diferenciados según progreso (verde = éxito, amarillo = en proceso)
 * - Feedback háptico opcional en hitos de progreso
 * - Tamaños accesibles para motricidad fina limitada
 */

import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { View, Text, Animated, StyleSheet, Vibration } from 'react-native';
import { Colores } from '../../constants/colors';

// INTERFACES - Estrictamente tipadas según especificaciones documentadas
export interface BarraProgresoProps {
  readonly progreso: number; // 0-100 según UI_COMPONENTS.md línea 129
  readonly mostrarLeo?: boolean; // Leo animado según línea 314 "con Leo animado"
  readonly mostrarTexto?: boolean; // Mostrar porcentaje textual para accesibilidad
  readonly altura?: number; // Altura personalizable para diferentes contextos
  readonly animada?: boolean; // Animaciones smooth según DESIGN_SYSTEM.md
  readonly vibracionHitos?: boolean; // Vibración en 25%, 50%, 75%, 100%
  readonly colorProgreso?: string; // Override color si necesario (usar Colores.)
  readonly colorFondo?: string; // Override fondo si necesario (usar Colores.)
  readonly onProgresoCompleto?: () => void; // Callback al llegar a 100%
  readonly onHito?: (hito: number) => void; // Callback en hitos 25/50/75/100
  readonly testID?: string; // Para testing automatizado
}

// CONSTANTES PROGRESO - Configuración centralizada según especificaciones
const PROGRESO_CONSTANTS = {
  ALTURA_DEFAULT: 16,
  ALTURA_LEO: 24, // Mayor para acomodar Leo animado
  DURACION_ANIMACION: 800, // Smooth según DESIGN_SYSTEM.md micro-animaciones
  LEO_EMOJI: '🦎', // Leo el Lince oficial
  LEO_SIZE: 20, // Tamaño Leo adecuado para accesibilidad
  HITOS: [25, 50, 75, 100], // Puntos de feedback háptico
  VIBRACION_PATTERN: [0, 50], // Patrón sutil de vibración
  BORDER_RADIUS: 12, // Bordes redondeados según DESIGN_SYSTEM.md
  LEO_OFFSET: -2, // Offset vertical para centrar Leo
} as const;

// HELPER - Configuración rápida para casos comunes documentados
const createBarraProgreso = (progreso: number, conLeo: boolean = true) => ({
  progreso,
  mostrarLeo: conLeo,
  mostrarTexto: true,
  animada: true,
  vibracionHitos: true,
});

const BarraProgreso: React.FC<BarraProgresoProps> = ({
  progreso,
  mostrarLeo = true, // Leo por defecto según línea 314
  mostrarTexto = true, // Texto por defecto para accesibilidad
  altura = PROGRESO_CONSTANTS.ALTURA_DEFAULT,
  animada = true, // Animaciones por defecto según DESIGN_SYSTEM.md
  vibracionHitos = false, // Opcional para no saturar
  colorProgreso,
  colorFondo,
  onProgresoCompleto,
  onHito,
  testID = 'barra-progreso',
}) => {
  // REFS Y VALORES ANIMADOS
  const progresoAnimado = useRef(new Animated.Value(0)).current;
  const leoAnimado = useRef(new Animated.Value(0)).current;
  const hitosAlcanzados = useRef(new Set<number>()).current;

  // MEMOIZACIÓN - Cálculos costosos optimizados
  const alturaFinal = useMemo(() => {
    return mostrarLeo ? Math.max(altura, PROGRESO_CONSTANTS.ALTURA_LEO) : altura;
  }, [altura, mostrarLeo]);

  const progressColor = useMemo(() => {
    if (colorProgreso) return colorProgreso;
    // Colores según progreso: verde éxito, amarillo en proceso
    return progreso >= 100 ? Colores.verde : Colores.amarillo;
  }, [colorProgreso, progreso]);

  const backgroundColor = useMemo(() => {
    return colorFondo || Colores.grisClaro;
  }, [colorFondo]);

  const progresoSeguro = useMemo(() => {
    return Math.max(0, Math.min(100, progreso));
  }, [progreso]);

  // HANDLERS - Callbacks con validación de hitos
  const manejarHito = useCallback((nuevoProgreso: number) => {
    PROGRESO_CONSTANTS.HITOS.forEach(hito => {
      if (nuevoProgreso >= hito && !hitosAlcanzados.has(hito)) {
        hitosAlcanzados.add(hito);
        
        // Vibración háptica si está habilitada
        if (vibracionHitos) {
          try {
            Vibration.vibrate([...PROGRESO_CONSTANTS.VIBRACION_PATTERN]);
          } catch (error) {
            console.warn('Vibration not supported:', error);
          }
        }
        
        // Callbacks de hitos
        onHito?.(hito);
        if (hito === 100) {
          onProgresoCompleto?.();
        }
      }
    });
  }, [vibracionHitos, onHito, onProgresoCompleto, hitosAlcanzados]);

  // EFECTOS - Animaciones sincronizadas progreso + Leo
  const valorAnteriorRef = useRef(0);
  useEffect(() => {
    const valorAnterior = valorAnteriorRef.current;
    const nuevoValor = progresoSeguro;
    valorAnteriorRef.current = nuevoValor;

    if (animada) {
      // Animación smooth del progreso
      Animated.timing(progresoAnimado, {
        toValue: nuevoValor,
        duration: PROGRESO_CONSTANTS.DURACION_ANIMACION,
        useNativeDriver: false, // Layout animation required
      }).start();

      // Animación sincronizada de Leo
      if (mostrarLeo) {
        Animated.timing(leoAnimado, {
          toValue: nuevoValor,
          duration: PROGRESO_CONSTANTS.DURACION_ANIMACION,
          useNativeDriver: false, // Transform positioning required
        }).start();
      }
    } else {
      // Update inmediato sin animación
      progresoAnimado.setValue(nuevoValor);
      if (mostrarLeo) {
        leoAnimado.setValue(nuevoValor);
      }
    }

    // Verificar hitos solo si progreso aumentó
    if (nuevoValor > valorAnterior) {
      manejarHito(nuevoValor);
    }
  }, [progresoSeguro, animada, mostrarLeo, manejarHito, progresoAnimado, leoAnimado]);

  // RENDER - Estructura completa barra + Leo + texto
  return (
    <View style={[styles.container, { height: alturaFinal }]} testID={testID}>
      {/* BARRA BASE - Fondo gris según especificaciones */}
      <View
        style={[
          styles.barraBase,
          {
            height: altura,
            backgroundColor,
            borderRadius: PROGRESO_CONSTANTS.BORDER_RADIUS,
          },
        ]}
        testID={`${testID}-base`}
      >
        {/* BARRA PROGRESO - Animada con colores dinámicos */}
        <Animated.View
          style={[
            styles.barraProgreso,
            {
              height: altura,
              backgroundColor: progressColor,
              borderRadius: PROGRESO_CONSTANTS.BORDER_RADIUS,
              width: progresoAnimado.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
                extrapolate: 'clamp',
              }),
            },
          ]}
          testID={`${testID}-relleno`}
        />
      </View>

      {/* LEO ANIMADO - Moviéndose con el progreso según línea 314 */}
      {mostrarLeo && (
        <Animated.View
          style={[
            styles.leoContainer,
            {
              left: leoAnimado.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '95%'], // 95% para no salir del contenedor
                extrapolate: 'clamp',
              }),
              top: PROGRESO_CONSTANTS.LEO_OFFSET,
            },
          ]}
          testID={`${testID}-leo`}
        >
          <Text style={[styles.leoEmoji, { fontSize: PROGRESO_CONSTANTS.LEO_SIZE }]}>
            {PROGRESO_CONSTANTS.LEO_EMOJI}
          </Text>
        </Animated.View>
      )}

      {/* TEXTO PORCENTAJE - Accesibilidad y feedback visual claro */}
      {mostrarTexto && (
        <View style={styles.textoContainer} testID={`${testID}-texto`}>
          <Text style={styles.textoProgreso}>
            {Math.round(progresoSeguro)}%
          </Text>
        </View>
      )}
    </View>
  );
};

// ESTILOS - Optimizados para accesibilidad y clarity visual
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center', // Centrar verticalmente todos los elementos
    marginVertical: 8, // Espaciado según DESIGN_SYSTEM.md
  },
  barraBase: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden', // Evitar overflow del progreso
    // Bordes y colores aplicados dinámicamente
  },
  barraProgreso: {
    position: 'absolute',
    top: 0,
    left: 0,
    // Dimensiones y colores aplicados dinámicamente
    // Animación width aplicada via Animated.View
  },
  leoContainer: {
    position: 'absolute',
    width: PROGRESO_CONSTANTS.LEO_SIZE,
    height: PROGRESO_CONSTANTS.LEO_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    // Posición left animada dinámicamente
    zIndex: 10, // Sobre la barra de progreso
  },
  leoEmoji: {
    // fontSize aplicado dinámicamente
    textAlign: 'center',
    // Emoji Leo oficial del proyecto
  },
  textoContainer: {
    position: 'absolute',
    top: -24, // Arriba de la barra para no interferir
    right: 0,
    minWidth: 40, // Espacio suficiente para "100%"
  },
  textoProgreso: {
    fontSize: 12,
    fontWeight: '600',
    color: Colores.grisAdministrativo,
    textAlign: 'right',
    // Contraste optimizado para accesibilidad WCAG 2.1 AA
  },
});

export default BarraProgreso;

// EXPORTS ADICIONALES - Para testing y configuración rápida
export { PROGRESO_CONSTANTS, createBarraProgreso };

/**
 * CASOS DE USO ESPECÍFICOS IMPLEMENTADOS:
 * 
 * 1. APP_BLUEPRINT.md línea 48 - "Barra de progreso global":
 *    <BarraProgreso progreso={globalProgress} mostrarLeo={true} />
 * 
 * 2. APP_BLUEPRINT.md línea 62 - "Progreso específico de la isla":
 *    <BarraProgreso progreso={islandProgress} vibracionHitos={true} />
 * 
 * 3. UI_COMPONENTS.md línea 138 - Header con barra progreso:
 *    <BarraProgreso progreso={activityProgress} altura={12} mostrarTexto={false} />
 * 
 * 4. DESIGN_SYSTEM.md - Micro-animaciones suaves:
 *    <BarraProgreso progreso={value} animada={true} />
 * 
 * 5. Configuración rápida con helper:
 *    const config = createBarraProgreso(75, true);
 *    <BarraProgreso {...config} />
 * 
 * INTEGRACIÓN CON OTROS COMPONENTES:
 * - ActividadContainer: Progreso de actividad específica en header
 * - IslaView: Progreso específico de cada isla sensorial
 * - Dashboard: Progreso global del niño
 * - Portal Padres: Visualización progreso para seguimiento familiar
 */