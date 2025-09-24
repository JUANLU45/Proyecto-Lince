/**
 * PROYECTO LINCE - ESPACIADO Y DIMENSIONES CENTRALIZADOS
 * 
 * Fuente de verdad: UI_COMPONENTS.md + DESIGN_SYSTEM.md
 * Todas las dimensiones, espaciados y breakpoints documentados oficialmente.
 * 
 * PROHIBIDO: Usar dimensiones hardcodeadas fuera de este archivo
 * OBLIGATORIO: Usar SOLO estos valores de espaciado en toda la aplicación
 * 
 * Fecha: 23 de septiembre de 2025
 * Estado: PRODUCCIÓN - Basado en documentación oficial
 */

/**
 * Alturas mínimas documentadas para accesibilidad
 * Fuente: UI_COMPONENTS.md líneas 59, 245
 */
export const AlturasMinimas = {
  /**
   * Altura mínima para botones principales - táctil fácil para niños
   * Fuente: UI_COMPONENTS.md línea 59 - "Altura mínima: 60px (táctil fácil para niños)"
   */
  botonPrincipal: 60,

  /**
   * Altura mínima universal para todos los elementos interactivos
   * Fuente: UI_COMPONENTS.md línea 245 - "Botones: Mínimo 44px en cualquier dispositivo"
   */
  elementoInteractivo: 44,

  /**
   * Altura recomendada para elementos de navegación
   * Derivada del estándar de accesibilidad 44px con margen de seguridad
   */
  navegacion: 48,
} as const;

/**
 * Bordes redondeados documentados
 * Fuente: UI_COMPONENTS.md líneas 60, 78 + DESIGN_SYSTEM.md líneas 16, 25
 */
export const BorderesRedondeados = {
  /**
   * Radio para botones y elementos pequeños
   * Fuente: UI_COMPONENTS.md línea 60 - "Bordes redondeados: 12px"
   */
  boton: 12,

  /**
   * Radio para contenedores y modales
   * Fuente: UI_COMPONENTS.md línea 78 - "bordes redondeados 16px"
   */
  contenedor: 16,

  /**
   * Radio mínimo para elementos sutiles
   * Derivado para consistencia visual
   */
  sutil: 8,

  /**
   * Radio para tarjetas grandes
   * Derivado del contenedor para elementos más grandes
   */
  tarjeta: 20,
} as const;

/**
 * Configuración de sombras documentadas
 * Fuente: UI_COMPONENTS.md línea 62
 */
export const Sombras = {
  /**
   * Sombra estándar para botones y elementos interactivos
   * Fuente: UI_COMPONENTS.md línea 62 - "Sombra: 4px con opacidad 0.2"
   */
  estandar: {
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  /**
   * Sombra sutil para elementos secundarios
   * Derivada de la sombra estándar con menor intensidad
   */
  sutil: {
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  /**
   * Sombra pronunciada para modales y overlays
   * Derivada de la sombra estándar con mayor intensidad
   */
  pronunciada: {
    elevation: 8,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
} as const;

/**
 * Breakpoints de dispositivos documentados
 * Fuente: UI_COMPONENTS.md líneas 237-241
 */
export const Breakpoints = {
  /**
   * Smartphone pequeño
   * Fuente: UI_COMPONENTS.md línea 237 - "< 350px ancho"
   */
  smartphonePequeño: 350,

  /**
   * Smartphone estándar
   * Fuente: UI_COMPONENTS.md línea 238 - "350-450px ancho"
   */
  smartphoneEstandar: 450,

  /**
   * Smartphone grande
   * Fuente: UI_COMPONENTS.md línea 239 - "450-550px ancho"
   */
  smartphoneGrande: 550,

  /**
   * Tablet pequeña
   * Fuente: UI_COMPONENTS.md línea 240 - "550-800px ancho"
   */
  tabletPequeña: 800,

  /**
   * Tablet grande
   * Fuente: UI_COMPONENTS.md línea 241 - "> 800px ancho"
   * Valor máximo práctico para el diseño
   */
  tabletGrande: 1200,
} as const;

/**
 * Anchos máximos documentados
 * Fuente: UI_COMPONENTS.md línea 80
 */
export const AnchosMaximos = {
  /**
   * Ancho máximo para modales
   * Fuente: UI_COMPONENTS.md línea 80 - "máximo 400px"
   */
  modal: 400,

  /**
   * Porcentaje máximo de pantalla para modales
   * Fuente: UI_COMPONENTS.md línea 80 - "90% de pantalla"
   */
  modalPorcentaje: 0.9,

  /**
   * Ancho máximo para contenido principal
   * Derivado de las mejores prácticas de legibilidad
   */
  contenidoPrincipal: 680,

  /**
   * Ancho máximo para elementos de navegación
   * Optimizado para tablets grandes
   */
  navegacion: 1024,
} as const;

/**
 * Sistema de espaciado relativo al tamaño de pantalla
 * Fuente: UI_COMPONENTS.md línea 246
 */
export const EspaciadoRelativo = {
  /**
   * Espaciado base - unidad mínima de espaciado
   * Basado en múltiplos de 4px para consistencia visual
   */
  base: 4,

  /**
   * Espaciado pequeño - para elementos relacionados
   */
  pequeño: 8,

  /**
   * Espaciado mediano - espaciado estándar entre elementos
   */
  mediano: 16,

  /**
   * Espaciado grande - separación entre secciones
   */
  grande: 24,

  /**
   * Espaciado extra grande - márgenes principales
   */
  extraGrande: 32,

  /**
   * Espaciado masivo - separación entre pantallas/vistas
   */
  masivo: 48,
} as const;

/**
 * Union types para validación TypeScript estricta
 */
export type AlturaDisponible = keyof typeof AlturasMinimas;
export type BordeDisponible = keyof typeof BorderesRedondeados;
export type SombraDisponible = keyof typeof Sombras;
export type BreakpointDisponible = keyof typeof Breakpoints;
export type AnchoMaximoDisponible = keyof typeof AnchosMaximos;
export type EspaciadoDisponible = keyof typeof EspaciadoRelativo;

/**
 * Función helper para obtener altura mínima con validación
 * @param tipo - Tipo de altura según documentación
 * @returns Valor en píxeles
 * @throws Error si la altura no está documentada
 */
export const obtenerAlturaMinima = (tipo: AlturaDisponible): number => {
  const altura = AlturasMinimas[tipo];
  if (!altura) {
    throw new Error(
      `Altura "${tipo}" no está documentada en UI_COMPONENTS.md. ` +
      `Alturas disponibles: ${Object.keys(AlturasMinimas).join(', ')}`
    );
  }
  return altura;
};

/**
 * Función helper para obtener espaciado responsivo
 * @param espaciado - Tipo de espaciado base
 * @param anchoDispositivo - Ancho del dispositivo en píxeles
 * @returns Valor de espaciado escalado según dispositivo
 */
export const obtenerEspaciadoResponsivo = (
  espaciado: EspaciadoDisponible,
  anchoDispositivo: number
): number => {
  const valorBase = EspaciadoRelativo[espaciado];
  
  // Escalar según breakpoints documentados
  if (anchoDispositivo < Breakpoints.smartphonePequeño) {
    return Math.round(valorBase * 0.8);
  } else if (anchoDispositivo >= Breakpoints.tabletPequeña) {
    return Math.round(valorBase * 1.2);
  }
  
  return valorBase;
};

/**
 * Función helper para determinar tipo de dispositivo
 * @param anchoDispositivo - Ancho del dispositivo en píxeles
 * @returns Tipo de dispositivo según breakpoints documentados
 */
export const determinarTipoDispositivo = (anchoDispositivo: number): string => {
  if (anchoDispositivo < Breakpoints.smartphonePequeño) {
    return 'smartphonePequeño';
  } else if (anchoDispositivo < Breakpoints.smartphoneEstandar) {
    return 'smartphoneEstandar';
  } else if (anchoDispositivo < Breakpoints.smartphoneGrande) {
    return 'smartphoneGrande';
  } else if (anchoDispositivo < Breakpoints.tabletPequeña) {
    return 'tabletPequeña';
  } else {
    return 'tabletGrande';
  }
};

/**
 * Función helper para validar ancho de modal según documentación
 * @param anchoDispositivo - Ancho del dispositivo en píxeles
 * @returns Ancho óptimo para modal respetando límites documentados
 */
export const calcularAnchoModal = (anchoDispositivo: number): number => {
  const anchoPorcentaje = anchoDispositivo * AnchosMaximos.modalPorcentaje;
  return Math.min(anchoPorcentaje, AnchosMaximos.modal);
};

/**
 * Objeto consolidado con todos los valores de espaciado
 * Para acceso unificado desde cualquier componente
 */
export const Espaciado = {
  alturas: AlturasMinimas,
  bordes: BorderesRedondeados,
  sombras: Sombras,
  breakpoints: Breakpoints,
  anchosMaximos: AnchosMaximos,
  espaciadoRelativo: EspaciadoRelativo,
} as const;