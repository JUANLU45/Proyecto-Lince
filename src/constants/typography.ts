/**
 * PROYECTO LINCE - TIPOGRAFÍA CENTRALIZADA
 * 
 * Fuente de verdad: UI_COMPONENTS.md + DESIGN_SYSTEM.md + PROJECT_REQUIREMENTS.md
 * Todas las fuentes y tamaños documentados oficialmente.
 * 
 * PROHIBIDO: Usar fuentes/tamaños hardcodeados fuera de este archivo
 * OBLIGATORIO: Usar SOLO estos estilos tipográficos en toda la aplicación
 * 
 * Fecha: 23 de septiembre de 2025
 * Estado: PRODUCCIÓN - Basado en documentación oficial
 */

/**
 * Simulación de Platform para desarrollo sin React Native
 * En producción, este import será desde 'react-native'
 */
const Platform = {
  select: (config: { ios?: string; android?: string; default?: string }) => {
    return config.default || config.ios || 'System';
  },
};

/**
 * Fuentes principales del proyecto
 * Fuente: UI_COMPONENTS.md línea 63 + TECHNOLOGY.md línea 1408
 */
export const FuentesPrincipales = {
  /**
   * GoogleSans Bold - Fuente principal para botones y elementos destacados
   * Uso: Botones primarios, elementos de navegación principal
   * Fuente: UI_COMPONENTS.md línea 63
   */
  GoogleSansBold: Platform.select({
    ios: 'GoogleSans-Bold',
    android: 'GoogleSans-Bold',
    default: 'System',
  }),

  /**
   * GoogleSans Regular - Fuente para texto general
   * Derivado de GoogleSans-Bold para consistencia
   */
  GoogleSansRegular: Platform.select({
    ios: 'GoogleSans-Regular',
    android: 'GoogleSans-Regular', 
    default: 'System',
  }),

  /**
   * Fuente del sistema como fallback
   * Para casos donde GoogleSans no esté disponible
   */
  Sistema: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
} as const;

/**
 * Tamaños base documentados
 * Fuente: UI_COMPONENTS.md línea 63
 */
export const TamañosBase = {
  /**
   * Tamaño principal para botones
   * Fuente: UI_COMPONENTS.md línea 63 - "GoogleSans-Bold, 18px"
   */
  botonPrincipal: 18,

  /**
   * Tamaños derivados siguiendo escala tipográfica estándar
   * Basados en el tamaño principal documentado
   */
  pequeño: 14,
  mediano: 16,
  grande: 20,
  extraGrande: 24,
} as const;

/**
 * Estilos semánticos basados en DESIGN_SYSTEM.md
 * Fuente: DESIGN_SYSTEM.md líneas 18, 27
 */
export const EstilosSemánticos = {
  /**
   * H2 - Para títulos principales
   * Fuente: DESIGN_SYSTEM.md línea 18 - "Título (H2)"
   */
  H2: {
    fontFamily: FuentesPrincipales.GoogleSansBold,
    fontSize: TamañosBase.grande,
    fontWeight: 'bold' as const,
    lineHeight: TamañosBase.grande * 1.3,
  },

  /**
   * Body - Para descripciones y contenido general
   * Fuente: DESIGN_SYSTEM.md línea 27 - "el resumen en lenguaje natural (Body)"
   */
  Body: {
    fontFamily: FuentesPrincipales.GoogleSansRegular,
    fontSize: TamañosBase.mediano,
    fontWeight: 'normal' as const,
    lineHeight: TamañosBase.mediano * 1.4,
  },

  /**
   * Botón Primario - Estilo específico para botones principales
   * Fuente: UI_COMPONENTS.md línea 63 - "GoogleSans-Bold, 18px"
   */
  BotonPrimario: {
    fontFamily: FuentesPrincipales.GoogleSansBold,
    fontSize: TamañosBase.botonPrincipal,
    fontWeight: 'bold' as const,
    lineHeight: TamañosBase.botonPrincipal * 1.2,
  },
} as const;

/**
 * Configuración de accesibilidad
 * Fuente: PROJECT_REQUIREMENTS.md línea 35 + UI_COMPONENTS.md líneas 244, 254
 */
export const ConfiguracionAccesibilidad = {
  /**
   * Soporte para texto grande del sistema
   * Fuente: UI_COMPONENTS.md línea 254
   */
  soporteTextoGrande: true,

  /**
   * Escala automática basada en tamaño de pantalla
   * Fuente: UI_COMPONENTS.md línea 244
   */
  escaladoAutomatico: true,

  /**
   * Factores de escala por dispositivo
   * Basado en "escala automática basada en tamaño de pantalla"
   */
  factoresEscala: {
    pequeño: 0.9,    // < 350px ancho
    estandar: 1.0,   // 350-450px ancho
    grande: 1.1,     // 450-550px ancho
    tablet: 1.2,     // > 550px ancho
  },
} as const;

/**
 * Union type para validation de estilos disponibles
 */
export type EstiloTipograficoDisponible = keyof typeof EstilosSemánticos;

/**
 * Union type para fuentes disponibles
 */
export type FuenteDisponible = keyof typeof FuentesPrincipales;

/**
 * Union type para tamaños disponibles
 */
export type TamañoDisponible = keyof typeof TamañosBase;

/**
 * Función helper para obtener estilo tipográfico con validación
 * @param estilo - Nombre del estilo según documentación
 * @returns Objeto con propiedades de estilo React Native
 * @throws Error si el estilo no está documentado
 */
export const obtenerEstiloTipografico = (estilo: EstiloTipograficoDisponible) => {
  const estiloTipografico = EstilosSemánticos[estilo];
  if (!estiloTipografico) {
    throw new Error(
      `Estilo tipográfico "${estilo}" no está documentado en DESIGN_SYSTEM.md o UI_COMPONENTS.md. ` +
      `Estilos disponibles: ${Object.keys(EstilosSemánticos).join(', ')}`
    );
  }
  return estiloTipografico;
};

/**
 * Función helper para calcular tamaño con escalado automático
 * @param tamañoBase - Tamaño base documentado
 * @param anchoDispositivo - Ancho del dispositivo en píxeles
 * @returns Tamaño escalado según configuración de accesibilidad
 */
export const calcularTamañoEscalado = (
  tamañoBase: number, 
  anchoDispositivo: number
): number => {
  if (!ConfiguracionAccesibilidad.escaladoAutomatico) {
    return tamañoBase;
  }

  let factor: number = ConfiguracionAccesibilidad.factoresEscala.estandar;

  if (anchoDispositivo < 350) {
    factor = ConfiguracionAccesibilidad.factoresEscala.pequeño;
  } else if (anchoDispositivo >= 350 && anchoDispositivo < 450) {
    factor = ConfiguracionAccesibilidad.factoresEscala.estandar;
  } else if (anchoDispositivo >= 450 && anchoDispositivo < 550) {
    factor = ConfiguracionAccesibilidad.factoresEscala.grande;
  } else {
    factor = ConfiguracionAccesibilidad.factoresEscala.tablet;
  }

  return Math.round(tamañoBase * factor);
};

/**
 * Función helper para crear estilo con accesibilidad
 * @param estiloBase - Estilo tipográfico base
 * @param anchoDispositivo - Ancho del dispositivo
 * @returns Estilo con tamaño escalado para accesibilidad
 */
export const crearEstiloAccesible = (
  estiloBase: EstiloTipograficoDisponible,
  anchoDispositivo: number
) => {
  const estilo = obtenerEstiloTipografico(estiloBase);
  const tamañoEscalado = calcularTamañoEscalado(estilo.fontSize, anchoDispositivo);
  
  return {
    ...estilo,
    fontSize: tamañoEscalado,
    lineHeight: tamañoEscalado * (estilo.lineHeight / estilo.fontSize),
  };
};

/**
 * Objeto consolidado con todos los estilos tipográficos
 * Para acceso unificado desde cualquier componente
 */
export const Tipografia = {
  fuentes: FuentesPrincipales,
  tamaños: TamañosBase,
  estilos: EstilosSemánticos,
  accesibilidad: ConfiguracionAccesibilidad,
} as const;