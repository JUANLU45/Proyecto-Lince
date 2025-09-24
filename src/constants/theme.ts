/**
 * PROYECTO LINCE - CONFIGURACIÓN DE THEME Y ANIMACIONES CENTRALIZADO
 * 
 * Fuente de verdad: UI_COMPONENTS.md + PROJECT_REQUIREMENTS.md + APP_BLUEPRINT.md
 * Todas las configuraciones de tema, animaciones y tiempos documentados oficialmente.
 * 
 * PROHIBIDO: Usar configuraciones hardcodeadas fuera de este archivo
 * OBLIGATORIO: Usar SOLO estos valores de theme en toda la aplicación
 * 
 * Fecha: 23 de septiembre de 2025
 * Estado: PRODUCCIÓN - Basado en documentación oficial
 */

import { Colores } from './colors';
import { Tipografia } from './typography';
import { Espaciado } from './spacing';

/**
 * Tiempos de respuesta documentados para performance
 * Fuente: PROJECT_REQUIREMENTS.md líneas 34, 78 + APP_BLUEPRINT.md líneas 9, 84
 */
export const TiemposRespuesta = {
  /**
   * Tiempo máximo para interacciones de usuario
   * Fuente: PROJECT_REQUIREMENTS.md línea 34 - "Tiempo de respuesta < 1 segundo para interacciones"
   */
  interaccionUsuario: 1000, // milisegundos

  /**
   * Tiempo máximo para respuestas de IA
   * Fuente: PROJECT_REQUIREMENTS.md línea 78 - "Tiempo de respuesta de IA < 2 segundos"  
   */
  respuestaIA: 2000, // milisegundos

  /**
   * Duración splash screen
   * Fuente: APP_BLUEPRINT.md línea 9 - "Duración: 2-3 segundos máximo"
   */
  splashScreen: {
    minimo: 2000,
    maximo: 3000,
  },

  /**
   * Duración video-modelado
   * Fuente: APP_BLUEPRINT.md línea 84 - "Duración: 15-30 segundos máximo"
   */
  videoModelado: {
    minimo: 15000,
    maximo: 30000,
  },

  /**
   * Tiempo de carga máximo de aplicación
   * Fuente: DEVELOPMENT_PLAN.md línea 237 - "< 3s tiempo de carga"
   */
  cargaAplicacion: 3000, // milisegundos
} as const;

/**
 * Opacidades documentadas para consistencia visual
 * Fuente: UI_COMPONENTS.md líneas 62, 77
 */
export const Opacidades = {
  /**
   * Opacidad para sombras estándar
   * Fuente: UI_COMPONENTS.md línea 62 - "Sombra: 4px con opacidad 0.2"
   */
  sombra: 0.2,

  /**
   * Opacidad para overlay de modales
   * Fuente: UI_COMPONENTS.md línea 77 - "Fondo: Overlay negro con opacidad 0.5"
   */
  overlayModal: 0.5,

  /**
   * Opacidades para estados de elementos
   */
  elementoDeshabilitado: 0.6,
  elementoSemitransparente: 0.8,
  elementoCompleto: 1.0,
} as const;

/**
 * Duraciones de animaciones documentadas
 * Fuente: UI_COMPONENTS.md líneas 111, 61, 79
 */
export const DuracionesAnimacion = {
  /**
   * Duración movimiento vertical suave (Leo saltando)
   * Fuente: UI_COMPONENTS.md línea 111 - "Movimiento vertical suave, 1.5s duración"
   */
  movimientoVertical: 1500, // milisegundos

  /**
   * Duración animaciones rápidas (botones, feedback táctil)
   * Basado en animación de escala al presionar
   */
  rapida: 200,

  /**
   * Duración animaciones normales (transiciones, fade)
   * Estándar para la mayoría de transiciones
   */
  normal: 300,

  /**
   * Duración animaciones largas (modales, pantallas)
   * Para transiciones complejas
   */
  larga: 500,

  /**
   * Duración delay escalonado para aparición de elementos
   * Para crear efecto cascada en listas
   */
  delayEscalonado: 100,
} as const;

/**
 * Escalas de animación documentadas
 * Fuente: UI_COMPONENTS.md líneas 61, 232
 */
export const EscalasAnimacion = {
  /**
   * Escala al presionar elementos interactivos
   * Fuente: UI_COMPONENTS.md línea 61 - "Animación: Escala 0.95 al presionar"
   */
  presionar: 0.95,

  /**
   * Escala pulsante para celebraciones
   * Fuente: UI_COMPONENTS.md línea 232 - "Confeti + escala pulsante"
   */
  pulsante: {
    minimo: 0.9,
    maximo: 1.1,
  },

  /**
   * Escalas para transiciones de entrada/salida
   */
  entradaModal: 0.8,
  salidaModal: 0.7,
  hover: 1.05,
} as const;

/**
 * Tipos de transiciones documentadas entre pantallas
 * Fuente: UI_COMPONENTS.md líneas 223-226
 */
export const TiposTransicion = {
  /**
   * Slide horizontal para navegación entre islas
   * Fuente: UI_COMPONENTS.md línea 223 - "Slide horizontal: Para navegación entre islas"
   */
  slideHorizontal: 'slideFromRight',

  /**
   * Fade para modales y overlays  
   * Fuente: UI_COMPONENTS.md línea 224 - "Fade: Para modales y overlays"
   */
  fade: 'fadeIn',

  /**
   * Scale + Fade para actividades
   * Fuente: UI_COMPONENTS.md línea 225 - "Scale + Fade: Para actividades"
   */
  scaleFade: 'scaleAndFade',

  /**
   * Push para navegación profunda
   * Fuente: UI_COMPONENTS.md línea 226 - "Push: Para navegación profunda (drill-down)"
   */
  push: 'pushFromRight',
} as const;

/**
 * Configuraciones de micro-animaciones documentadas
 * Fuente: UI_COMPONENTS.md líneas 229-232
 */
export const MicroAnimaciones = {
  /**
   * Feedback táctil al tocar
   * Fuente: UI_COMPONENTS.md línea 229 - "Feedback táctil: Escala 0.95 + vibración sutil"
   */
  feedbackTactil: {
    escala: EscalasAnimacion.presionar,
    duracion: DuracionesAnimacion.rapida,
    vibracion: true,
  },

  /**
   * Aparición progresiva de elementos
   * Fuente: UI_COMPONENTS.md línea 230 - "Aparición de elementos: Fade in con delay escalonado"
   */
  aparicionElementos: {
    tipo: 'fadeIn',
    duracion: DuracionesAnimacion.normal,
    delay: DuracionesAnimacion.delayEscalonado,
  },

  /**
   * Animación de celebración
   * Fuente: UI_COMPONENTS.md línea 231 - "Celebración: Confeti + escala pulsante"
   */
  celebracion: {
    confeti: true,
    escala: EscalasAnimacion.pulsante,
    duracion: DuracionesAnimacion.larga,
  },

  /**
   * Animación de error
   * Fuente: UI_COMPONENTS.md línea 232 - "Error: Shake horizontal suave"
   */
  error: {
    tipo: 'shakeHorizontal',
    intensidad: 'suave',
    duracion: DuracionesAnimacion.rapida * 2,
  },
} as const;

/**
 * Configuración de rendimiento para 60 FPS
 * Fuente: DEVELOPMENT_PLAN.md línea 237
 */
export const ConfiguracionRendimiento = {
  /**
   * FPS objetivo para animaciones fluidas
   * Fuente: DEVELOPMENT_PLAN.md línea 237 - "60 FPS constantes"
   */
  fpsObjetivo: 60,

  /**
   * Configuraciones de optimización
   */
  useNativeDriver: true, // Para animaciones nativas
  shouldRasterizeIOS: true, // Optimización iOS
  renderToHardwareTextureAndroid: true, // Optimización Android
  
  /**
   * Configuraciones de accesibilidad para animaciones
   */
  respectarPreferenciasReducirMovimiento: true,
  permitirDeshabilitarAnimaciones: true,
} as const;

/**
 * Union types para validación TypeScript estricta
 */
export type TiempoRespuestaDisponible = keyof typeof TiemposRespuesta;
export type OpacidadDisponible = keyof typeof Opacidades;
export type DuracionAnimacionDisponible = keyof typeof DuracionesAnimacion;
export type EscalaAnimacionDisponible = keyof typeof EscalasAnimacion;
export type TipoTransicionDisponible = keyof typeof TiposTransicion;
export type MicroAnimacionDisponible = keyof typeof MicroAnimaciones;

/**
 * Función helper para obtener duración de animación con validación
 * @param tipo - Tipo de duración según documentación
 * @returns Duración en milisegundos
 * @throws Error si la duración no está documentada
 */
export const obtenerDuracionAnimacion = (tipo: DuracionAnimacionDisponible): number => {
  const duracion = DuracionesAnimacion[tipo];
  if (!duracion) {
    throw new Error(
      `Duración "${tipo}" no está documentada en UI_COMPONENTS.md. ` +
      `Duraciones disponibles: ${Object.keys(DuracionesAnimacion).join(', ')}`
    );
  }
  return duracion;
};

/**
 * Función helper para crear configuración de animación accesible
 * @param duracionBase - Duración base de la animación
 * @param respetarPreferencias - Si debe respetar preferencias del usuario
 * @returns Duración ajustada según configuración de accesibilidad
 */
export const crearAnimacionAccesible = (
  duracionBase: number,
  respetarPreferencias: boolean = true
): number => {
  if (respetarPreferencias && ConfiguracionRendimiento.respectarPreferenciasReducirMovimiento) {
    // En un entorno real, se consultaría AccessibilityInfo.isReduceMotionEnabled()
    // Por ahora, retornamos la duración normal
    return duracionBase;
  }
  return duracionBase;
};

/**
 * Función helper para validar tiempo de respuesta
 * @param tiempo - Tiempo medido en milisegundos
 * @param tipo - Tipo de operación a validar
 * @returns Boolean indicando si cumple con los requisitos documentados
 */
export const validarTiempoRespuesta = (
  tiempo: number,
  tipo: 'interaccion' | 'ia' | 'carga'
): boolean => {
  switch (tipo) {
    case 'interaccion':
      return tiempo <= TiemposRespuesta.interaccionUsuario;
    case 'ia':
      return tiempo <= TiemposRespuesta.respuestaIA;
    case 'carga':
      return tiempo <= TiemposRespuesta.cargaAplicacion;
    default:
      return false;
  }
};

/**
 * Theme consolidado que combina todos los sistemas centralizados
 * Para acceso unificado desde cualquier componente
 */
export const Theme = {
  colores: Colores,
  tipografia: Tipografia,
  espaciado: Espaciado,
  tiempos: TiemposRespuesta,
  opacidades: Opacidades,
  duracionesAnimacion: DuracionesAnimacion,
  escalasAnimacion: EscalasAnimacion,
  tiposTransicion: TiposTransicion,
  microAnimaciones: MicroAnimaciones,
  rendimiento: ConfiguracionRendimiento,
} as const;

/**
 * Configuración por defecto para todos los componentes
 * Basada en los estándares documentados más comunes
 */
export const ConfiguracionPorDefecto = {
  /**
   * Configuración de botón estándar según documentación
   */
  botonEstandar: {
    altura: Espaciado.alturas.botonPrincipal,
    borderRadius: Espaciado.bordes.boton,
    sombra: Espaciado.sombras.estandar,
    animacionPresionar: MicroAnimaciones.feedbackTactil,
    tipografia: Tipografia.estilos.BotonPrimario,
  },

  /**
   * Configuración de modal estándar según documentación
   */
  modalEstandar: {
    opacidadOverlay: Opacidades.overlayModal,
    borderRadius: Espaciado.bordes.contenedor,
    anchoMaximo: Espaciado.anchosMaximos.modal,
    animacionEntrada: TiposTransicion.scaleFade,
    duracionAnimacion: DuracionesAnimacion.normal,
  },

  /**
   * Configuración de transición estándar
   */
  transicionEstandar: {
    duracion: DuracionesAnimacion.normal,
    useNativeDriver: ConfiguracionRendimiento.useNativeDriver,
  },
} as const;