/**
 * 📱 CONFIGURACIÓN DE DISPOSITIVOS - PROYECTO LINCE
 * 
 * Configuraciones de dispositivo, compatibilidad y especificaciones técnicas extraídas de:
 * - PROJECT_REQUIREMENTS.md
 * - TECHNOLOGY.md
 * - UI_COMPONENTS.md
 * - APP_BLUEPRINT.md
 * 
 * ⚠️ ADVERTENCIA: Todas las configuraciones son DOCUMENTADAS y NO ESPECULADAS
 * ❌ PROHIBIDO cambiar sin actualizar documentación oficial
 */

// =============================================================================
// 📋 REQUISITOS DE COMPATIBILIDAD - PROJECT_REQUIREMENTS.md
// =============================================================================

/**
 * Versiones mínimas soportadas por plataforma
 * Fuente: PROJECT_REQUIREMENTS.md - RNF-013
 */
export const VERSIONES_MINIMAS_PLATAFORMA = {
  /** iOS 13+ y Android 8+ (API level 26+) */
  ios: {
    version: '13.0',
    numeroVersion: 13,
    descripcion: 'iOS 13+',
  },
  android: {
    version: '8.0',
    apiLevel: 26,
    descripcion: 'Android 8+ (API level 26+)',
  },
} as const;

/**
 * Tipos de dispositivos soportados
 * Fuente: PROJECT_REQUIREMENTS.md - RNF-014
 */
export const TIPOS_DISPOSITIVOS_SOPORTADOS = {
  /** Tablets y smartphones (orientación landscape preferida) */
  tablet: {
    tipo: 'tablet',
    orientacionPreferida: 'landscape',
    soportado: true,
  },
  smartphone: {
    tipo: 'smartphone', 
    orientacionPreferida: 'landscape',
    soportado: true,
  },
} as const;

/**
 * Requisitos de hardware mínimos
 * Fuente: PROJECT_REQUIREMENTS.md - RNF-008
 */
export const REQUISITOS_HARDWARE_MINIMOS = {
  /** Funcionamiento fluido en dispositivos con 2GB RAM */
  ramMinima: 2 * 1024 * 1024 * 1024, // 2GB en bytes
  ramMinimaGB: 2,
  descripcion: 'Funcionamiento fluido en dispositivos con 2GB RAM',
} as const;

/**
 * Soporte de resoluciones
 * Fuente: PROJECT_REQUIREMENTS.md - RNF-015
 */
export const SOPORTE_RESOLUCIONES = {
  /** Soporte para diferentes resoluciones de pantalla */
  soporteMultiresolucion: true,
  descripcion: 'Soporte para diferentes resoluciones de pantalla',
} as const;

// =============================================================================
// 📏 BREAKPOINTS RESPONSIVOS - UI_COMPONENTS.md
// =============================================================================

/**
 * Clasificación de dispositivos por ancho de pantalla
 * Fuente: UI_COMPONENTS.md - Sección responsividad
 */
export const CLASIFICACION_DISPOSITIVOS = {
  /** Smartphone pequeño: < 350px ancho */
  smartphonePequeno: {
    tipo: 'smartphone',
    tamaño: 'pequeño',
    anchoMinimo: 0,
    anchoMaximo: 349,
    descripcion: '< 350px ancho',
  },
  
  /** Smartphone estándar: 350-450px ancho */
  smartphoneEstandar: {
    tipo: 'smartphone',
    tamaño: 'estándar',
    anchoMinimo: 350,
    anchoMaximo: 450,
    descripcion: '350-450px ancho',
  },
  
  /** Smartphone grande: 450-550px ancho */
  smartphoneGrande: {
    tipo: 'smartphone', 
    tamaño: 'grande',
    anchoMinimo: 450,
    anchoMaximo: 550,
    descripcion: '450-550px ancho',
  },
  
  /** Tablet pequeña: 550-800px ancho */
  tabletPequena: {
    tipo: 'tablet',
    tamaño: 'pequeña', 
    anchoMinimo: 550,
    anchoMaximo: 800,
    descripcion: '550-800px ancho',
  },
  
  /** Tablet grande: > 800px ancho */
  tabletGrande: {
    tipo: 'tablet',
    tamaño: 'grande',
    anchoMinimo: 800,
    anchoMaximo: Number.MAX_SAFE_INTEGER,
    descripcion: '> 800px ancho',
  },
} as const;

/**
 * Dimensiones mínimas para elementos táctiles
 * Fuente: UI_COMPONENTS.md - "Botones: Mínimo 44px en cualquier dispositivo"
 */
export const DIMENSIONES_MINIMAS_TACTILES = {
  /** Botones: Mínimo 44px en cualquier dispositivo */
  botonMinimoUniversal: 44, // px
  descripcion: 'Mínimo 44px en cualquier dispositivo',
  aplicaA: 'todos los elementos táctiles',
} as const;

// =============================================================================
// ⚙️ CONFIGURACIÓN EXPO - TECHNOLOGY.md
// =============================================================================

/**
 * Configuración principal de la aplicación Expo
 * Fuente: TECHNOLOGY.md - app.json completo
 */
export const CONFIGURACION_EXPO_APP = {
  /** "name": "Proyecto Lince" */
  nombre: 'Proyecto Lince',
  
  /** "slug": "proyecto-lince" */
  slug: 'proyecto-lince',
  
  /** "version": "1.0.0" */
  version: '1.0.0',
  
  /** "orientation": "portrait" */
  orientacion: 'portrait',
} as const;

/**
 * Patrones de assets incluidos en el bundle
 * Fuente: TECHNOLOGY.md - assetBundlePatterns
 */
export const PATRONES_ASSETS_BUNDLE = {
  /** "assets/images/**" */
  imagenes: 'assets/images/**',
  
  /** "assets/audio/critical/**" */
  audioCritico: 'assets/audio/critical/**',
  
  /** "assets/fonts/**" */
  fuentes: 'assets/fonts/**',
} as const;

/**
 * Configuración de actualizaciones OTA
 * Fuente: TECHNOLOGY.md - updates configuration
 */
export const CONFIGURACION_ACTUALIZACIONES = {
  /** "enabled": true */
  habilitado: true,
  
  /** "fallbackToCacheTimeout": 30000 */
  timeoutFallbackCache: 30000, // ms
  
  /** Certificado de firma de código */
  rutaCertificado: './certs/cert.pem',
  
  /** Configuración de metadata de firma */
  metadataFirma: {
    keyid: 'main',
    algoritmo: 'rsa-v1_5-sha256',
  },
} as const;

// =============================================================================
// 🏗️ COMANDOS DE BUILD Y PLATAFORMA - TECHNOLOGY.md
// =============================================================================

/**
 * Comandos de desarrollo por plataforma
 * Fuente: TECHNOLOGY.md - package.json scripts
 */
export const COMANDOS_DESARROLLO = {
  /** "start": "expo start" */
  inicio: 'expo start',
  
  /** "android": "expo start --android" */
  android: 'expo start --android',
  
  /** "ios": "expo start --ios" */
  ios: 'expo start --ios',
  
  /** "web": "expo start --web" */
  web: 'expo start --web',
} as const;

/**
 * Comandos de build por plataforma
 * Fuente: TECHNOLOGY.md - EAS Build configuration
 */
export const COMANDOS_BUILD = {
  /** "build:android": "eas build --platform android" */
  buildAndroid: 'eas build --platform android',
  
  /** "build:ios": "eas build --platform ios" */
  buildIOS: 'eas build --platform ios',
} as const;

/**
 * Configuración de EAS Build por plataforma
 * Fuente: TECHNOLOGY.md - eas.json
 */
export const CONFIGURACION_EAS_BUILD = {
  /** Configuración iOS */
  ios: {
    plataforma: 'ios',
    configuracion: 'release',
  },
  
  /** Configuración Android */
  android: {
    plataforma: 'android',
    configuracion: 'release',
  },
} as const;

// =============================================================================
// 🔧 VERSIONES Y DEPENDENCIAS - TECHNOLOGY.md
// =============================================================================

/**
 * Versiones mínimas de herramientas de desarrollo
 * Fuente: TECHNOLOGY.md - Verificación de versiones
 */
export const VERSIONES_HERRAMIENTAS_DESARROLLO = {
  /** node --version  # v18.0.0+ */
  node: {
    versionMinima: '18.0.0',
    comando: 'node --version',
    descripcion: 'v18.0.0+',
  },
  
  /** npm --version   # 8.0.0+ */
  npm: {
    versionMinima: '8.0.0', 
    comando: 'npm --version',
    descripcion: '8.0.0+',
  },
  
  /** git --version */
  git: {
    comando: 'git --version',
    requerido: true,
  },
  
  /** expo doctor */
  expo: {
    comando: 'expo doctor',
    proposito: 'Verificar configuración de Expo',
  },
} as const;

/**
 * Versión mínima de EAS CLI
 * Fuente: TECHNOLOGY.md - EAS configuration
 */
export const VERSION_EAS_CLI = {
  /** "version": ">= 3.0.0" */
  versionMinima: '3.0.0',
  operador: '>=',
  descripcion: '>= 3.0.0',
} as const;

// =============================================================================
// 🎯 ASSETS CRÍTICOS - TECHNOLOGY.md
// =============================================================================

/**
 * Assets críticos que deben precargarse
 * Fuente: TECHNOLOGY.md - AssetCacheService.preloadCriticalAssets()
 */
export const ASSETS_CRITICOS = {
  /** Imágenes de Leo el Lince */
  imagenesLeo: [
    'assets/characters/leo-default.png',
    'assets/characters/leo-happy.png', 
    'assets/characters/leo-thinking.png',
  ],
  
  /** Fondos de islas */
  fondosIslas: [
    'assets/backgrounds/movement-island.png',
    'assets/backgrounds/music-island.png',
    'assets/backgrounds/tactile-garden.png',
  ],
  
  /** Iconos esenciales */
  iconosEsenciales: [
    'assets/icons/play-button.png',
    'assets/icons/pause-button.png', 
    'assets/icons/home-button.png',
  ],
} as const;

/**
 * Assets de audio críticos
 * Fuente: TECHNOLOGY.md - AssetCacheService.preloadAudioAssets()
 */
export const ASSETS_AUDIO_CRITICOS = {
  /** Música de fondo */
  musicaFondo: [
    'assets/audio/background-calm.mp3',
    'assets/audio/background-energetic.mp3',
  ],
  
  /** Sonidos de feedback */
  sonidosFeedback: [
    'assets/audio/success-sound.wav',
    'assets/audio/tap-feedback.wav',
    'assets/audio/error-gentle.wav',
  ],
} as const;

// =============================================================================
// 📦 CONFIGURACIÓN METRO BUNDLER - TECHNOLOGY.md
// =============================================================================

/**
 * Extensiones de assets soportadas por Metro
 * Fuente: TECHNOLOGY.md - metro.config.js
 */
export const EXTENSIONES_ASSETS_SOPORTADAS = [
  'bin',
  'txt',
  'jpg',
  'png', 
  'json',
  'mp3',
  'wav',
  'aac',
  'm4a',
] as const;

/**
 * Configuración de caché de Metro
 * Fuente: TECHNOLOGY.md - metro.config.js cacheStores
 */
export const CONFIGURACION_CACHE_METRO = {
  /** Tipo de store de caché */
  tipoStore: 'FileStore',
  
  /** Directorio de caché */
  directorioCache: './metro-cache',
  
  /** Caché persistente habilitado */
  persistente: true,
} as const;

/**
 * Configuración de optimización de minificación
 * Fuente: TECHNOLOGY.md - minifierConfig
 */
export const CONFIGURACION_MINIFICACION = {
  /** Mantener nombres de funciones */
  mantenerNombresFunciones: true,
  
  /** Solo ASCII en output */
  soloASCII: true,
  
  /** Envolver IIFE */
  envolverIIFE: true,
  
  /** No incluir fuentes en source map */
  incluirFuentesSourceMap: false,
  
  /** No comprimir funciones reduce */
  comprimirReduceFuncs: false,
} as const;

// =============================================================================
// 🌍 VARIABLES DE ENTORNO - TECHNOLOGY.md
// =============================================================================

/**
 * Variables de entorno de Firebase requeridas
 * Fuente: TECHNOLOGY.md - Configuración .env
 */
export const VARIABLES_ENTORNO_FIREBASE = {
  /** EXPO_PUBLIC_FIREBASE_API_KEY */
  apiKey: 'EXPO_PUBLIC_FIREBASE_API_KEY',
  
  /** EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN */
  authDomain: 'EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN',
  
  /** EXPO_PUBLIC_FIREBASE_PROJECT_ID */
  projectId: 'EXPO_PUBLIC_FIREBASE_PROJECT_ID',
} as const;

/**
 * Variables de entorno generales
 * Fuente: TECHNOLOGY.md - Configuración general .env
 */
export const VARIABLES_ENTORNO_GENERALES = {
  /** EXPO_PUBLIC_ENV */
  entorno: 'EXPO_PUBLIC_ENV',
  
  /** EXPO_PUBLIC_API_BASE_URL */
  urlBaseAPI: 'EXPO_PUBLIC_API_BASE_URL',
  
  /** EXPO_PUBLIC_AI_ENDPOINT */
  endpointIA: 'EXPO_PUBLIC_AI_ENDPOINT',
  
  /** EXPO_PUBLIC_ANALYTICS_ENABLED */
  analyticsHabilitado: 'EXPO_PUBLIC_ANALYTICS_ENABLED',
} as const;

// =============================================================================
// 🧮 FUNCIONES DE DETECCIÓN DE DISPOSITIVO
// =============================================================================

/**
 * Determina el tipo de dispositivo basado en el ancho de pantalla
 */
export const determinarTipoDispositivo = (anchoPixeles: number): keyof typeof CLASIFICACION_DISPOSITIVOS => {
  if (anchoPixeles <= CLASIFICACION_DISPOSITIVOS.smartphonePequeno.anchoMaximo) {
    return 'smartphonePequeno';
  }
  if (anchoPixeles <= CLASIFICACION_DISPOSITIVOS.smartphoneEstandar.anchoMaximo) {
    return 'smartphoneEstandar';
  }
  if (anchoPixeles <= CLASIFICACION_DISPOSITIVOS.smartphoneGrande.anchoMaximo) {
    return 'smartphoneGrande';
  }
  if (anchoPixeles <= CLASIFICACION_DISPOSITIVOS.tabletPequena.anchoMaximo) {
    return 'tabletPequena';
  }
  return 'tabletGrande';
};

/**
 * Valida si la versión de iOS es compatible
 */
export const esVersionIOSCompatible = (versioniOS: string): boolean => {
  const versionNumero = parseFloat(versioniOS);
  return versionNumero >= VERSIONES_MINIMAS_PLATAFORMA.ios.numeroVersion;
};

/**
 * Valida si el nivel de API de Android es compatible
 */
export const esAPIAndroidCompatible = (apiLevel: number): boolean => {
  return apiLevel >= VERSIONES_MINIMAS_PLATAFORMA.android.apiLevel;
};

/**
 * Valida si la RAM del dispositivo es suficiente
 */
export const esRAMSuficiente = (ramBytes: number): boolean => {
  return ramBytes >= REQUISITOS_HARDWARE_MINIMOS.ramMinima;
};

/**
 * Obtiene la orientación preferida según el tipo de dispositivo
 */
export const obtenerOrientacionPreferida = (tipoDispositivo: 'tablet' | 'smartphone'): string => {
  return TIPOS_DISPOSITIVOS_SOPORTADOS[tipoDispositivo].orientacionPreferida;
};

/**
 * Verifica si un asset está en la lista de assets críticos
 */
export const esAssetCritico = (rutaAsset: string): boolean => {
  const todosAssetsCriticos = [
    ...ASSETS_CRITICOS.imagenesLeo,
    ...ASSETS_CRITICOS.fondosIslas,
    ...ASSETS_CRITICOS.iconosEsenciales,
    ...ASSETS_AUDIO_CRITICOS.musicaFondo,
    ...ASSETS_AUDIO_CRITICOS.sonidosFeedback,
  ];
  
  return todosAssetsCriticos.some(asset => asset.includes(rutaAsset));
};

/**
 * Obtiene las dimensiones mínimas para elementos táctiles
 */
export const obtenerDimensionMinimaTouch = (): number => {
  return DIMENSIONES_MINIMAS_TACTILES.botonMinimoUniversal;
};

/**
 * Valida si una extensión de archivo es soportada por Metro
 */
export const esExtensionSoportada = (extension: string): boolean => {
  const extLimpia = extension.startsWith('.') ? extension.slice(1) : extension;
  return EXTENSIONES_ASSETS_SOPORTADAS.includes(extLimpia as any);
};

// =============================================================================
// 📋 EXPORT CONSOLIDADO
// =============================================================================

/**
 * Exportación consolidada de todas las configuraciones de dispositivo
 * ⚠️ IMPORTANTE: Todas las configuraciones son extraídas DIRECTAMENTE de la documentación
 * ❌ PROHIBIDO modificar sin actualizar documentos oficiales primero
 */
export const CONFIGURACION_DISPOSITIVOS = {
  versionesMinimas: VERSIONES_MINIMAS_PLATAFORMA,
  tiposDispositivosSoportados: TIPOS_DISPOSITIVOS_SOPORTADOS,
  requisitosHardware: REQUISITOS_HARDWARE_MINIMOS,
  soporteResoluciones: SOPORTE_RESOLUCIONES,
  clasificacionDispositivos: CLASIFICACION_DISPOSITIVOS,
  dimensionesMinimasTactiles: DIMENSIONES_MINIMAS_TACTILES,
  configuracionExpoApp: CONFIGURACION_EXPO_APP,
  patronesAssetsBundle: PATRONES_ASSETS_BUNDLE,
  configuracionActualizaciones: CONFIGURACION_ACTUALIZACIONES,
  comandosDesarrollo: COMANDOS_DESARROLLO,
  comandosBuild: COMANDOS_BUILD,
  configuracionEASBuild: CONFIGURACION_EAS_BUILD,
  versionesHerramientasDesarrollo: VERSIONES_HERRAMIENTAS_DESARROLLO,
  versionEASCLI: VERSION_EAS_CLI,
  assetsCriticos: ASSETS_CRITICOS,
  assetsAudioCriticos: ASSETS_AUDIO_CRITICOS,
  extensionesAssetsSoportadas: EXTENSIONES_ASSETS_SOPORTADAS,
  configuracionCacheMetro: CONFIGURACION_CACHE_METRO,
  configuracionMinificacion: CONFIGURACION_MINIFICACION,
  variablesEntornoFirebase: VARIABLES_ENTORNO_FIREBASE,
  variablesEntornoGenerales: VARIABLES_ENTORNO_GENERALES,
} as const;

export type ConfiguracionDispositivos = typeof CONFIGURACION_DISPOSITIVOS;