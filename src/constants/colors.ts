/**
 * PROYECTO LINCE - COLORES CENTRALIZADOS
 * 
 * Fuente de verdad: DESIGN_SYSTEM.md + UI_COMPONENTS.md
 * Todos los colores documentados oficialmente.
 * 
 * PROHIBIDO: Usar colores hardcodeados fuera de este archivo
 * OBLIGATORIO: Usar SOLO estos colores en toda la aplicación
 * 
 * Fecha: 23 de septiembre de 2025
 * Estado: PRODUCCIÓN - Basado en documentación oficial
 */

/**
 * Colores principales del Design System
 * Fuente: DESIGN_SYSTEM.md líneas 16, 17, 25
 */
export const ColoresPrincipales = {
  /**
   * Color blanco puro para fondos de tarjetas y contenedores
   * Uso: Fondo de modales, tarjetas, contenedores principales
   */
  blancoPuro: '#FFFFFF',

  /**
   * Color amarillo sol para elementos de atención y sugerencias
   * Uso: Iconos de bombilla, sugerencias de IA, elementos de destacado
   */
  amarilloSol: '#FFD700',

  /**
   * Color verde jungla para progreso y elementos positivos
   * Uso: Barras laterales de progreso, indicadores de éxito
   */
  verdeJungla: '#228B22',
} as const;

/**
 * Colores para botones y elementos interactivos
 * Fuente: UI_COMPONENTS.md línea 54
 */
export const ColoresBotones = {
  /**
   * Azul para botones primarios y elementos destacados
   * Uso: Botones principales, indicadores de análisis IA
   */
  azul: '#1E90FF',

  /**
   * Verde para confirmaciones y acciones positivas
   * Uso: Botones de confirmación, elementos de éxito
   */
  verde: '#32CD32',

  /**
   * Amarillo para advertencias y elementos de atención
   * Uso: Botones de advertencia, elementos que requieren atención
   */
  amarillo: '#FFD700',

  /**
   * Rojo para cancelaciones y elementos de alerta
   * Uso: Botones de cancelar, elementos de error o alerta
   */
  rojo: '#FF6347',
} as const;

/**
 * Colores para overlays y elementos de interfaz
 * Fuente: UI_COMPONENTS.md líneas 77-78
 */
export const ColoresInterfaz = {
  /**
   * Negro para overlays de modales
   * Uso: Fondo de overlay con opacidad 0.5
   */
  overlayNegro: '#000000',

  /**
   * Blanco para contenedores de modales
   * Uso: Fondo de contenedores principales
   */
  contenedorBlanco: '#FFFFFF',
} as const;

/**
 * Colores especiales para estados específicos
 * Fuente: UI_COMPONENTS.md líneas 167, 169, 181
 */
export const ColoresEspeciales = {
  /**
   * Azul pulsante para indicadores de análisis IA
   * Uso: Punto pulsante cuando IA está analizando
   */
  azulPulsante: '#1E90FF',

  /**
   * Colores cálidos para elementos de ayuda
   * Uso: Iconos de bombilla y elementos de ayuda
   */
  colorCalido: '#FFA500',

  /**
   * Colores dinámicos para cambios de actividad
   * Uso: Iconos de flecha circular y transiciones
   */
  colorDinamico: '#FF69B4',
} as const;

/**
 * Colores administrativos para elementos secundarios
 * Fuente: DESIGN_SYSTEM.md línea 35
 */
export const ColoresAdministrativos = {
  /**
   * Gris administrativo para elementos secundarios de interfaz
   * Uso: Botones secundarios, elementos menos prominentes
   */
  grisAdministrativo: '#6B7280',

  /**
   * Gris claro para fondos sutiles
   * Uso: Fondos de elementos secundarios
   */
  grisClaro: '#F3F4F6',
} as const;

/**
 * Union type de todos los colores disponibles
 * Para uso en TypeScript con validación estricta
 */
export type ColorDisponible = 
  | keyof typeof ColoresPrincipales
  | keyof typeof ColoresBotones
  | keyof typeof ColoresInterfaz
  | keyof typeof ColoresEspeciales
  | keyof typeof ColoresAdministrativos;

/**
 * Objeto consolidado con todos los colores
 * Para acceso unificado desde cualquier componente
 */
export const Colores = {
  ...ColoresPrincipales,
  ...ColoresBotones,
  ...ColoresInterfaz,
  ...ColoresEspeciales,
  ...ColoresAdministrativos,
} as const;

/**
 * Función helper para obtener color con validación
 * @param nombreColor - Nombre del color según documentación
 * @returns Valor hexadecimal del color
 * @throws Error si el color no está documentado
 */
export const obtenerColor = (nombreColor: ColorDisponible): string => {
  const color = Colores[nombreColor];
  if (!color) {
    throw new Error(
      `Color "${nombreColor}" no está documentado en DESIGN_SYSTEM.md o UI_COMPONENTS.md. ` +
      `Colores disponibles: ${Object.keys(Colores).join(', ')}`
    );
  }
  return color;
};

/**
 * Función helper para crear rgba con opacidad
 * @param nombreColor - Nombre del color base
 * @param opacidad - Valor de opacidad entre 0 y 1
 * @returns Color en formato rgba
 */
export const colorConOpacidad = (nombreColor: ColorDisponible, opacidad: number): string => {
  const colorHex = obtenerColor(nombreColor);
  
  // Convertir hex a rgb
  const r = parseInt(colorHex.slice(1, 3), 16);
  const g = parseInt(colorHex.slice(3, 5), 16);
  const b = parseInt(colorHex.slice(5, 7), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacidad})`;
};