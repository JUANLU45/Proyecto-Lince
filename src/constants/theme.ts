/**
 * Sistema de Diseño Centralizado - Proyecto Lince
 * Basado en: DESIGN_SYSTEM.md
 *
 * IMPORTANTE: Todos los componentes DEBEN usar este theme
 * Prohibido valores hardcodeados de colores, tamaños, etc.
 */

// ========================================
// PALETA DE COLORES (DESIGN_SYSTEM.md)
// ========================================

export const colors = {
  // Colores principales
  azulCalma: '#5AB9EA',       // Actividades calmantes, fondos suaves
  verdeJungla: '#4ECDC4',     // Éxito, progreso, naturaleza
  amarilloSol: '#FFE66D',     // Energía, celebración, atención
  rojoPeligro: '#FF6B6B',     // Alertas, errores (uso mínimo)

  // Tonos neutros
  blancoPuro: '#FFFFFF',
  grisClaro: '#F7F7F7',       // Fondos secundarios
  grisOscuro: '#4A4A4A',      // Textos principales

  // Colores administrativos (Panel Admin)
  rojoAdministrativo: '#DC2626',
  grisAdministrativo: '#6B7280',
  azulDatos: '#3B82F6',
  verdeDatos: '#10B981',

  // Estados de UI
  success: '#4ECDC4',
  warning: '#FFE66D',
  error: '#FF6B6B',
  info: '#5AB9EA',

  // Overlays y sombras
  overlay: 'rgba(0, 0, 0, 0.5)',
  sombra: 'rgba(0, 0, 0, 0.2)',
} as const;

// ========================================
// TIPOGRAFÍA (DESIGN_SYSTEM.md)
// ========================================

export const typography = {
  // Familias de fuentes
  fontFamily: {
    primary: 'GoogleSans-Bold',        // Títulos y botones
    secondary: 'GoogleSans-Regular',   // Cuerpo de texto
  },

  // Tamaños de fuente
  fontSize: {
    // Headings según DESIGN_SYSTEM.md
    h1: 32,        // Títulos principales
    h2: 24,        // Subtítulos importantes
    h3: 20,        // Títulos de sección

    // Body text
    bodyLarge: 18,   // Texto principal en actividades
    bodyMedium: 16,  // Texto estándar
    bodySmall: 14,   // Texto secundario

    // Especiales
    button: 18,      // Texto de botones (mínimo para accesibilidad)
    caption: 12,     // Captions y metadatos
  },

  // Pesos de fuente
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    bold: '700' as const,
  },

  // Alturas de línea
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// ========================================
// ESPACIADO (DESIGN_SYSTEM.md)
// ========================================

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

// ========================================
// BORDES Y RADIOS (DESIGN_SYSTEM.md)
// ========================================

export const borderRadius = {
  small: 8,
  medium: 12,
  large: 16,
  round: 999,    // Para elementos completamente redondeados
} as const;

export const borderWidth = {
  thin: 1,
  medium: 2,
  thick: 4,
} as const;

// ========================================
// SOMBRAS (DESIGN_SYSTEM.md)
// ========================================

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

// ========================================
// TAMAÑOS DE COMPONENTES (UI_COMPONENTS.md)
// ========================================

export const componentSizes = {
  // Botones según UI_COMPONENTS.md - altura mínima 60px para accesibilidad
  button: {
    pequeño: { height: 44, paddingHorizontal: 16 },
    mediano: { height: 60, paddingHorizontal: 24 },
    grande: { height: 80, paddingHorizontal: 32 },
  },

  // Avatares y elementos circulares
  avatar: {
    pequeño: 48,
    mediano: 80,
    grande: 120,
  },

  // Iconos
  icon: {
    pequeño: 24,
    mediano: 32,
    grande: 48,
  },

  // Área táctil mínima (accesibilidad)
  minTouchTarget: 44,
} as const;

// ========================================
// ANIMACIONES (UI_COMPONENTS.md)
// ========================================

export const animations = {
  // Duraciones en milisegundos
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },

  // Escalas de animación
  scale: {
    pressed: 0.95,
    hover: 1.05,
  },

  // Tipos de easing
  easing: {
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// ========================================
// BREAKPOINTS (UI_COMPONENTS.md)
// ========================================

export const breakpoints = {
  smartphoneSmall: 350,
  smartphoneStandard: 450,
  smartphoneLarge: 550,
  tabletSmall: 800,
  tabletLarge: 1024,
} as const;

// ========================================
// Z-INDEX (Para gestión de capas)
// ========================================

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  modal: 1200,
  popover: 1300,
  tooltip: 1400,
  notification: 1500,
} as const;

// ========================================
// OPACIDADES
// ========================================

export const opacity = {
  disabled: 0.5,
  hover: 0.8,
  overlay: 0.5,
} as const;

// ========================================
// CONFIGURACIONES DE RENDIMIENTO
// ========================================

export const performance = {
  // Tiempo máximo de respuesta según PROJECT_REQUIREMENTS.md RNF-002
  maxResponseTime: 1000, // 1 segundo

  // Tiempo de respuesta de IA según PROJECT_REQUIREMENTS.md CA-IA-002
  maxAIResponseTime: 2000, // 2 segundos

  // Feedback inmediato según APP_BLUEPRINT.md
  immediateFeedback: 100, // < 100ms

  // FPS objetivo según DEVELOPMENT_PLAN.md
  targetFPS: 60,
} as const;

// ========================================
// EXPORT DEFAULT THEME
// ========================================

const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  borderWidth,
  shadows,
  componentSizes,
  animations,
  breakpoints,
  zIndex,
  opacity,
  performance,
} as const;

export default theme;

// Type exports para uso en TypeScript
export type Theme = typeof theme;
export type ThemeColors = typeof colors;
export type ThemeSpacing = typeof spacing;
