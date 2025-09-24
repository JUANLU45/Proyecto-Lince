/**
 * PROYECTO LINCE - CONFIGURACIÓN CENTRALIZADA DE APLICACIÓN
 * 
 * Fuente de verdad: TECHNOLOGY.md + PROJECT_REQUIREMENTS.md + APP_BLUEPRINT.md
 * Todas las configuraciones, variables de entorno y constantes de aplicación documentadas.
 * 
 * PROHIBIDO: Usar configuraciones hardcodeadas fuera de este archivo
 * OBLIGATORIO: Usar SOLO estos valores de configuración en toda la aplicación
 * 
 * Fecha: 23 de septiembre de 2025
 * Estado: PRODUCCIÓN - Basado en documentación oficial
 */

// Tipado para variables de entorno de Expo
declare const process: {
  env: {
    EXPO_PUBLIC_FIREBASE_API_KEY?: string;
    EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN?: string;
    EXPO_PUBLIC_FIREBASE_PROJECT_ID?: string;
    EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET?: string;
    EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?: string;
    EXPO_PUBLIC_FIREBASE_APP_ID?: string;
    GOOGLE_CLOUD_PROJECT_ID?: string;
    GOOGLE_CLOUD_SPEECH_API_KEY?: string;
    EXPO_PUBLIC_ENV?: string;
    EXPO_PUBLIC_API_BASE_URL?: string;
    EXPO_PUBLIC_AI_ENDPOINT?: string;
    EXPO_PUBLIC_ANALYTICS_ENABLED?: string;
  };
};

/**
 * Variables de entorno para configuración de servicios externos
 * Fuente: TECHNOLOGY.md líneas 80-96
 */
export const VariablesEntorno = {
  /**
   * Configuración Firebase documentada
   * Fuente: TECHNOLOGY.md líneas 80-83 - "Firebase Configuration"
   */
  firebase: {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '',
  },

  /**
   * Configuración Google Cloud Services
   * Fuente: TECHNOLOGY.md líneas 85-87 - "Google Cloud Services"
   */
  googleCloud: {
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || '',
    speechApiKey: process.env.GOOGLE_CLOUD_SPEECH_API_KEY || '',
  },

  /**
   * Configuración de entornos de desarrollo
   * Fuente: TECHNOLOGY.md líneas 89-92 - "Development/Production Environment"
   */
  environment: {
    current: (process.env.EXPO_PUBLIC_ENV || 'development') as 'development' | 'staging' | 'production',
    apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || '',
  },

  /**
   * Configuración servicios de IA
   * Fuente: TECHNOLOGY.md líneas 94-96 - "AI Service Configuration"
   */
  ai: {
    endpoint: process.env.EXPO_PUBLIC_AI_ENDPOINT || '',
    analyticsEnabled: process.env.EXPO_PUBLIC_ANALYTICS_ENABLED === 'true',
  },
} as const;

/**
 * Configuraciones de rendimiento y límites técnicos
 * Fuente: PROJECT_REQUIREMENTS.md + DEVELOPMENT_PLAN.md
 */
export const ConfiguracionRendimiento = {
  /**
   * Tiempo máximo de carga de aplicación
   * Fuente: PROJECT_REQUIREMENTS.md línea 47 - "RNF-005: Carga de aplicación < 3 segundos"
   */
  tiempoCargaMaximo: 3000, // milisegundos

  /**
   * FPS objetivo para experiencia fluida
   * Fuente: DEVELOPMENT_PLAN.md línea 237 - "Performance: 60 FPS constantes"
   */
  fpsObjetivo: 60,

  /**
   * Tamaño máximo de descarga
   * Fuente: PROJECT_REQUIREMENTS.md línea 49 - "RNF-007: Tamaño de descarga < 150MB"
   */
  tamañoDescargaMaximo: 150 * 1024 * 1024, // 150MB en bytes

  /**
   * Memoria RAM mínima requerida
   * Fuente: PROJECT_REQUIREMENTS.md línea 50 - "RNF-008: Funcionamiento fluido en dispositivos con 2GB RAM"
   */
  memoriaMinima: 2 * 1024 * 1024 * 1024, // 2GB en bytes

  /**
   * Configuraciones de optimización nativa
   * Fuente: TECHNOLOGY.md - Configuraciones de rendimiento React Native
   */
  optimizacionNativa: {
    useNativeDriver: true,
    shouldRasterizeIOS: true,
    renderToHardwareTextureAndroid: true,
  },
} as const;

/**
 * Configuraciones de compatibilidad de dispositivos
 * Fuente: PROJECT_REQUIREMENTS.md líneas 51-53
 */
export const CompatibilidadDispositivos = {
  /**
   * Versiones mínimas de sistemas operativos
   * Fuente: PROJECT_REQUIREMENTS.md línea 51 - "RNF-013: iOS 13+ y Android 8+ (API level 26+)"
   */
  versionesMinimas: {
    ios: '13.0',
    android: 26, // API level para Android 8+
  },

  /**
   * Tipos de dispositivos soportados
   * Fuente: PROJECT_REQUIREMENTS.md línea 52 - "RNF-014: Tablets y smartphones (orientación landscape preferida)"
   */
  tiposDispositivo: ['tablet', 'smartphone'] as const,

  /**
   * Orientación preferida
   * Fuente: PROJECT_REQUIREMENTS.md línea 52 - "orientación landscape preferida"
   */
  orientacionPreferida: 'landscape' as const,

  /**
   * Soporte para diferentes resoluciones
   * Fuente: PROJECT_REQUIREMENTS.md línea 53 - "RNF-015: Soporte para diferentes resoluciones de pantalla"
   */
  resolucionesCompatibles: {
    minima: { ancho: 320, alto: 240 },
    recomendada: { ancho: 768, alto: 1024 },
    maxima: { ancho: 1920, alto: 1080 },
  },
} as const;

/**
 * Configuraciones de caché y almacenamiento local
 * Fuente: TECHNOLOGY.md - Servicios de caché optimizados
 */
export const ConfiguracionCache = {
  /**
   * Duraciones de caché por tipo de contenido
   * Fuente: TECHNOLOGY.md líneas 692-698 - CacheService duraciones
   */
  duraciones: {
    actividades: 24 * 60 * 60 * 1000, // 24 horas
    progresoUsuario: 12 * 60 * 60 * 1000, // 12 horas
    insightsIA: 30 * 60 * 60 * 1000, // 30 minutos
    assets: 7 * 24 * 60 * 60 * 1000, // 7 días
  },

  /**
   * Claves de caché estandarizadas
   * Fuente: TECHNOLOGY.md líneas 693-695
   */
  claves: {
    actividades: 'activities_cache',
    progresoUsuario: 'user_progress_cache',
    insightsIA: 'ai_insights_cache',
    configuracionApp: 'app_config_cache',
  },

  /**
   * Tamaño máximo de caché por categoría
   * Basado en optimizaciones de TECHNOLOGY.md
   */
  tamañosMaximos: {
    totalCache: 50 * 1024 * 1024, // 50MB total
    assets: 30 * 1024 * 1024, // 30MB para assets
    datos: 20 * 1024 * 1024, // 20MB para datos
  },
} as const;

/**
 * Configuraciones de servicios externos y APIs
 * Fuente: PROJECT_REQUIREMENTS.md líneas 84-88 + TECHNOLOGY.md
 */
export const ConfiguracionServiciosExternos = {
  /**
   * Google Cloud Platform services
   * Fuente: PROJECT_REQUIREMENTS.md línea 84 - "Google Cloud Platform (Firebase, Cloud Functions, Speech-to-Text)"
   */
  googleCloud: {
    firebase: {
      habilitado: true,
      persistenciaOffline: true,
    },
    cloudFunctions: {
      habilitado: true,
      timeoutDefault: 60000, // 60 segundos
      region: 'us-central1',
    },
    speechToText: {
      habilitado: true,
      idioma: 'es-ES',
      modelo: 'latest_short',
      encoding: 'WEBM_OPUS',
      sampleRate: 16000,
    },
  },

  /**
   * Analytics y Crash Reporting
   * Fuente: PROJECT_REQUIREMENTS.md línea 85 + DEVELOPMENT_PLAN.md línea 290
   */
  analytics: {
    firebase: {
      habilitado: true,
      recoleccionAutomatica: true,
    },
    crashlytics: {
      habilitado: true,
      reporteAutomatico: true,
    },
  },
} as const;

/**
 * Configuraciones de accesibilidad y experiencia de usuario
 * Fuente: APP_BLUEPRINT.md + PROJECT_REQUIREMENTS.md línea 45
 */
export const ConfiguracionAccesibilidad = {
  /**
   * Configuraciones para niños con necesidades especiales
   * Fuente: PROJECT_REQUIREMENTS.md línea 45 - "RNF-003: Soporte para accesibilidad (tamaños de texto, contraste)"
   */
  soporteAccesibilidad: {
    tamañosTextoGrandes: true,
    contrasteAlto: true,
    navegacionPorTeclado: true,
    lectoresPantalla: true,
  },

  /**
   * Tolerancia de interacción para niños
   * Fuente: APP_BLUEPRINT.md línea 261 - "Tolerancia alta: Aceptar toques imprecisos o múltiples"
   */
  toleranciaInteraccion: {
    toquesImprecisos: true,
    toquesMultiples: true,
    tiempoEsperaExtendido: 2000, // 2 segundos
  },

  /**
   * Configuraciones de feedback inmediato
   * Fuente: APP_BLUEPRINT.md línea 262 - "Feedback inmediato: Respuesta visual/auditiva < 100ms"
   */
  feedbackInmediato: {
    tiempoRespuestaMaximo: 100, // milisegundos
    feedbackVisual: true,
    feedbackAuditivo: true,
    feedbackTactil: true, // vibración
  },
} as const;

/**
 * Configuraciones específicas de actividades y contenido
 * Fuente: APP_BLUEPRINT.md - configuraciones documentadas
 */
export const ConfiguracionActividades = {
  /**
   * Configuraciones de audio y multimedia
   * Fuente: APP_BLUEPRINT.md línea 14 - "Música de fondo opcional (configurable)"
   */
  audio: {
    musicaFondoHabilitada: true,
    volumenDefault: 0.7,
    volumenMinimo: 0.0,
    volumenMaximo: 1.0,
    incrementosVolumen: 0.1,
  },

  /**
   * Configuraciones de duración y tiempo
   * Fuente: APP_BLUEPRINT.md líneas 69-73 + 140
   */
  duraciones: {
    /**
     * Opciones de duración de actividades configurables
     * Fuente: APP_BLUEPRINT.md línea 71 - "Duración (corta/normal/larga)"
     */
    opciones: ['corta', 'normal', 'larga'] as const,
    valores: {
      corta: 5 * 60 * 1000, // 5 minutos
      normal: 10 * 60 * 1000, // 10 minutos
      larga: 15 * 60 * 1000, // 15 minutos
    },

    /**
     * Timer configurable para Rincón de Calma
     * Fuente: APP_BLUEPRINT.md línea 140 - "Timer configurable (2, 5, 10 minutos)"
     */
    rinconCalma: [2, 5, 10] as const, // minutos
  },

  /**
   * Configuraciones de dificultad
   * Fuente: APP_BLUEPRINT.md línea 72 - "Nivel de ayuda"
   */
  nivelesDificultad: {
    basico: {
      ayudaVisual: true,
      ayudaAuditiva: true,
      tiempoExtendido: true,
    },
    intermedio: {
      ayudaVisual: true,
      ayudaAuditiva: false,
      tiempoExtendido: false,
    },
    avanzado: {
      ayudaVisual: false,
      ayudaAuditiva: false,
      tiempoExtendido: false,
    },
  },
} as const;

/**
 * Configuraciones de IA y personalización
 * Fuente: APP_BLUEPRINT.md líneas 215-230
 */
export const ConfiguracionIA = {
  /**
   * Niveles de personalización de IA
   * Fuente: APP_BLUEPRINT.md líneas 216-220 - "Nivel de personalización"
   */
  nivelesPersonalizacion: {
    basico: {
      soloAdaptaDificultad: true,
      sugerenciasOcasionales: false,
      iaProactiva: false,
    },
    intermedio: {
      soloAdaptaDificultad: true,
      sugerenciasOcasionales: true,
      iaProactiva: false,
    },
    avanzado: {
      soloAdaptaDificultad: true,
      sugerenciasOcasionales: true,
      iaProactiva: true,
    },
  },

  /**
   * Frecuencia de sugerencias configurables
   * Fuente: APP_BLUEPRINT.md líneas 221-222 - "Frecuencia de sugerencias"
   */
  frecuenciaSugerencias: ['nunca', 'raramente', 'normalmente', 'frecuentemente'] as const,

  /**
   * Tipos de datos para análisis de IA
   * Fuente: APP_BLUEPRINT.md líneas 223-226 - "Tipos de datos para IA"
   */
  tiposDatos: {
    soloTiempoUso: 'tiempo_uso',
    patronesInteraccion: 'patrones_interaccion',
    grabacionesVoz: 'grabaciones_voz_anonimizadas',
  },

  /**
   * Configuración de privacidad de IA
   * Fuente: APP_BLUEPRINT.md líneas 227-230
   */
  privacidad: {
    datosAnonimizados: true,
    consentimientoParental: true,
    controlRetencionDatos: true,
    opcionBorrarHistorial: true,
  },
} as const;

/**
 * Configuraciones de desarrollo y testing
 * Fuente: DEVELOPMENT_PLAN.md + TECHNOLOGY.md
 */
export const ConfiguracionDesarrollo = {
  /**
   * Configuraciones de testing y calidad
   * Fuente: DEVELOPMENT_PLAN.md líneas 224-238
   */
  testing: {
    /**
     * Cobertura mínima de código
     * Fuente: TECHNOLOGY.md - configuración Jest coverage
     */
    coberturaMinima: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },

    /**
     * Criterios de calidad documentados
     * Fuente: DEVELOPMENT_PLAN.md línea 237-240
     */
    criteriosCalidad: {
      fps: 60,
      tiempoCarga: 3000, // < 3s
      crashRate: 0.001, // < 0.1%
      completitudTareas: 95, // 95%
    },
  },

  /**
   * Configuraciones de CI/CD
   * Fuente: TECHNOLOGY.md - GitHub Actions workflow
   */
  cicd: {
    nodeVersion: '18',
    tiempoLimiteTests: 10 * 60 * 1000, // 10 minutos
    tiempoLimiteBuild: 20 * 60 * 1000, // 20 minutos
  },
} as const;

/**
 * Union types para validación TypeScript estricta
 */
export type EntornoDisponible = typeof VariablesEntorno.environment.current;
export type TipoDispositivoSoportado = typeof CompatibilidadDispositivos.tiposDispositivo[number];
export type OrientacionDisponible = typeof CompatibilidadDispositivos.orientacionPreferida;
export type DuracionActividadDisponible = typeof ConfiguracionActividades.duraciones.opciones[number];
export type NivelPersonalizacionIA = keyof typeof ConfiguracionIA.nivelesPersonalizacion;
export type FrecuenciaSugerenciaIA = typeof ConfiguracionIA.frecuenciaSugerencias[number];

/**
 * Función helper para validar variables de entorno requeridas
 * @returns Array de variables faltantes o vacío si todo está configurado
 * @throws Error si hay variables críticas faltantes
 */
export const validarVariablesEntorno = (): string[] => {
  const variablesFaltantes: string[] = [];

  // Validar Firebase (crítico)
  if (!VariablesEntorno.firebase.apiKey) variablesFaltantes.push('EXPO_PUBLIC_FIREBASE_API_KEY');
  if (!VariablesEntorno.firebase.projectId) variablesFaltantes.push('EXPO_PUBLIC_FIREBASE_PROJECT_ID');
  
  // Validar Google Cloud (crítico para IA)
  if (!VariablesEntorno.googleCloud.projectId) variablesFaltantes.push('GOOGLE_CLOUD_PROJECT_ID');
  
  // Validar IA endpoint (crítico)
  if (!VariablesEntorno.ai.endpoint) variablesFaltantes.push('EXPO_PUBLIC_AI_ENDPOINT');

  if (variablesFaltantes.length > 0) {
    throw new Error(
      `Variables de entorno críticas faltantes: ${variablesFaltantes.join(', ')}. ` +
      `Consulta TECHNOLOGY.md líneas 80-96 para configuración completa.`
    );
  }

  return variablesFaltantes;
};

/**
 * Función helper para obtener configuración de entorno actual
 * @returns Configuración específica del entorno (development/production)
 */
export const obtenerConfiguracionEntorno = () => {
  const esDevelopment = VariablesEntorno.environment.current === 'development';
  
  return {
    esDevelopment,
    esProduccion: !esDevelopment,
    logearDetalles: esDevelopment,
    usarCacheAgresivo: !esDevelopment,
    habilitarDebugTools: esDevelopment,
    usarMinificacion: !esDevelopment,
  };
};

/**
 * Función helper para verificar compatibilidad de dispositivo
 * @param sistemaOperativo - 'ios' o 'android'
 * @param version - Versión del sistema operativo
 * @returns Boolean indicando si el dispositivo es compatible
 */
export const verificarCompatibilidadDispositivo = (
  sistemaOperativo: 'ios' | 'android',
  version: string | number
): boolean => {
  try {
    if (sistemaOperativo === 'ios') {
      const versionIOS = typeof version === 'string' ? parseFloat(version) : version;
      const minimaIOS = parseFloat(CompatibilidadDispositivos.versionesMinimas.ios);
      return versionIOS >= minimaIOS;
    }
    
    if (sistemaOperativo === 'android') {
      const apiLevel = typeof version === 'string' ? parseInt(version) : version;
      return apiLevel >= CompatibilidadDispositivos.versionesMinimas.android;
    }
    
    return false;
  } catch (error) {
    console.error('Error verificando compatibilidad:', error);
    return false;
  }
};

/**
 * Configuración consolidada para acceso unificado
 * Agrupa todas las configuraciones en un objeto central
 */
export const Configuracion = {
  entorno: VariablesEntorno,
  rendimiento: ConfiguracionRendimiento,
  compatibilidad: CompatibilidadDispositivos,
  cache: ConfiguracionCache,
  serviciosExternos: ConfiguracionServiciosExternos,
  accesibilidad: ConfiguracionAccesibilidad,
  actividades: ConfiguracionActividades,
  ia: ConfiguracionIA,
  desarrollo: ConfiguracionDesarrollo,
  
  // Helper functions para uso conveniente
  validarEntorno: validarVariablesEntorno,
  obtenerEntorno: obtenerConfiguracionEntorno,
  verificarCompatibilidad: verificarCompatibilidadDispositivo,
} as const;