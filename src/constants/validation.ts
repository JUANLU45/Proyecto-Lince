/**
 * 🔍 VALIDACIÓN CENTRALIZADA - PROYECTO LINCE
 * 
 * Límites, métricas y criterios de validación extraídos de:
 * - PROJECT_REQUIREMENTS.md
 * - DEVELOPMENT_PLAN.md  
 * - ERROR_DETECTION.md
 * - TECHNOLOGY.md
 * - UI_COMPONENTS.md
 * - APP_BLUEPRINT.md
 * 
 * ⚠️ ADVERTENCIA: Estos valores son DOCUMENTADOS y NO ESPECULADOS
 * ❌ PROHIBIDO cambiar sin actualizar documentación oficial
 */

// =============================================================================
// 📊 REQUISITOS NO FUNCIONALES - PROJECT_REQUIREMENTS.md
// =============================================================================

/**
 * Límites de usabilidad y interacción
 * Fuente: PROJECT_REQUIREMENTS.md - Sección 3.1
 */
export const LIMITES_USABILIDAD = {
  /** RNF-001: Interfaz simple con máximo 3 toques para cualquier acción */
  maximoToquesAccion: 3,
  
  /** RNF-002: Tiempo de respuesta < 1 segundo para interacciones */
  tiempoRespuestaMaximo: 1000, // ms
} as const;

/**
 * Límites de rendimiento del sistema
 * Fuente: PROJECT_REQUIREMENTS.md - Sección 3.2
 */
export const LIMITES_RENDIMIENTO = {
  /** RNF-005: Carga de aplicación < 3 segundos */
  tiempoCargaMaximo: 3000, // ms
  
  /** RNF-007: Tamaño de descarga < 150MB */
  tamañoDescargaMaximo: 150 * 1024 * 1024, // bytes
  
  /** RNF-008: Funcionamiento fluido en dispositivos con 2GB RAM */
  ramMinimaRequerida: 2 * 1024 * 1024 * 1024, // bytes
} as const;

/**
 * Criterios de aceptación de calidad
 * Fuente: PROJECT_REQUIREMENTS.md - Sección 5.1
 */
export const CRITERIOS_CALIDAD = {
  /** CA-001: 95% de actividades completables sin ayuda parental */
  porcentajeActividadesCompletables: 95, // %
  
  /** CA-002: Tiempo promedio de sesión entre 10-20 minutos */
  tiempoSesionMinimo: 10 * 60 * 1000, // ms
  tiempoSesionMaximo: 20 * 60 * 1000, // ms
  
  /** CA-003: Retención de usuario > 70% después de 1 semana */
  retencionUsuarioMinima: 70, // %
  
  /** CA-004: Feedback positivo de padres > 4.5/5 */
  feedbackMinimoPositivo: 4.5, // puntuación sobre 5
  
  /** CA-005: Cero crashes críticos en producción */
  crashesCriticosMaximos: 0,
} as const;

/**
 * Criterios de validación de IA
 * Fuente: PROJECT_REQUIREMENTS.md - Sección 5.2
 */
export const CRITERIOS_IA = {
  /** CA-IA-002: Tiempo de respuesta de IA < 2 segundos */
  tiempoRespuestaIA: 2000, // ms
  
  /** CA-IA-003: Personalización efectiva después de 5 sesiones */
  sesionesPersonalizacionMinimas: 5,
} as const;

// =============================================================================
// 🎯 LÍMITES DE COMPLEJIDAD - ERROR_DETECTION.md
// =============================================================================

/**
 * Límites estrictos de complejidad de código
 * Fuente: ERROR_DETECTION.md - Sección "LÍMITES ESTRICTOS CONFIGURADOS"
 */
export const LIMITES_COMPLEJIDAD = {
  /** Complejidad ciclomática máxima: 15 por función */
  complejidadCiclomaticaMaxima: 15,
  
  /** Profundidad máxima de anidación: 4 niveles */
  profundidadAnidacionMaxima: 4,
  
  /** Callbacks anidados máximo: 3 niveles */
  callbacksAnidadosMaximo: 3,
  
  /** Parámetros por función máximo: 5 */
  parametrosPorFuncionMaximo: 5,
  
  /** Líneas por archivo máximo: 300 (sin contar espacios y comentarios) */
  lineasPorArchivoMaximo: 300,
  
  /** Líneas por función máximo: 50 (sin contar espacios y comentarios) */
  lineasPorFuncionMaximo: 50,
} as const;

/**
 * Métricas de calidad de código
 * Fuente: ERROR_DETECTION.md - Sección "MÉTRICAS DE CALIDAD"
 */
export const METRICAS_CALIDAD_CODIGO = {
  /** Complejidad Ciclomática */
  complejidad: {
    simple: { min: 1, max: 5 },      // Código simple ✅
    moderado: { min: 6, max: 10 },   // Código moderado ⚠️
    complejo: { min: 11, max: 15 },  // Código complejo ⚠️⚠️
    rechazado: { min: 16 },          // RECHAZADO ❌
  },
  
  /** Cobertura de Tests */
  coberturaTesting: {
    excelente: { min: 90, max: 100 }, // Excelente ✅
    bueno: { min: 80, max: 89 },      // Bueno ⚠️
    aceptable: { min: 70, max: 79 },  // Aceptable ⚠️⚠️
    inaceptable: { max: 69 },         // INACEPTABLE ❌
  },
  
  /** Performance */
  performance: {
    timeToInteractive: 3000, // ms
    bundleSize: 10 * 1024 * 1024, // 10MB en bytes
    memoryUsage: 100 * 1024 * 1024, // 100MB en bytes
  },
} as const;

// =============================================================================
// 🚀 LÍMITES DE PERFORMANCE - DEVELOPMENT_PLAN.md
// =============================================================================

/**
 * Criterios de performance del sistema
 * Fuente: DEVELOPMENT_PLAN.md - Sección "4.3 Criterios de Calidad"
 */
export const CRITERIOS_PERFORMANCE = {
  /** Performance: 60 FPS constantes, < 3s tiempo de carga */
  fpsMinimos: 60,
  tiempoCargaMaximoSistema: 3000, // ms
  
  /** Usabilidad: 95% de tareas completables sin ayuda */
  tareasCompletablesSinAyuda: 95, // %
  
  /** Estabilidad: < 0.1% crash rate en producción */
  crashRateMaximo: 0.1, // %
} as const;

/**
 * Distribución de tests requerida
 * Fuente: DEVELOPMENT_PLAN.md - Testing
 */
export const DISTRIBUCION_TESTS = {
  /** E2E Tests (10%) - Flujos críticos completos */
  e2eTests: 10, // %
  
  /** Integration Tests (20%) - Interacción entre componentes */
  integrationTests: 20, // %
  
  /** Unit Tests (70%) - Lógica individual de componentes */
  unitTests: 70, // %
} as const;

// =============================================================================
// 📱 LÍMITES UI/UX - UI_COMPONENTS.md & APP_BLUEPRINT.md
// =============================================================================

/**
 * Dimensiones mínimas de elementos interactivos
 * Fuente: UI_COMPONENTS.md
 */
export const DIMENSIONES_MINIMAS = {
  /** Altura mínima: 60px (táctil fácil para niños) */
  alturaBotonMinima: 60, // px
  
  /** Botones: Mínimo 44px en cualquier dispositivo */
  tamañoMinimoTactil: 44, // px
  
  /** Máximo ancho: 90% de pantalla, máximo 400px */
  anchoMaximoModal: {
    porcentaje: 90, // %
    pixeles: 400, // px
  },
} as const;

/**
 * Breakpoints responsivos documentados
 * Fuente: UI_COMPONENTS.md - Sección responsividad
 */
export const BREAKPOINTS_RESPONSIVOS = {
  /** Smartphone pequeño: < 350px ancho */
  smartphonePequeño: { max: 349 },
  
  /** Smartphone estándar: 350-450px ancho */
  smartphoneEstandar: { min: 350, max: 450 },
  
  /** Smartphone grande: 450-550px ancho */
  smartphoneGrande: { min: 450, max: 550 },
  
  /** Tablet pequeña: 550-800px ancho */
  tabletPequeña: { min: 550, max: 800 },
  
  /** Tablet grande: > 800px ancho */
  tabletGrande: { min: 800 },
} as const;

/**
 * Tiempos de respuesta de interfaz
 * Fuente: APP_BLUEPRINT.md
 */
export const TIEMPOS_RESPUESTA_UI = {
  /** Duración: 2-3 segundos máximo (splash) */
  splashScreenMaximo: 3000, // ms
  splashScreenMinimo: 2000, // ms
  
  /** Duración: 15-30 segundos máximo (intro) */
  introMaximo: 30000, // ms
  introMinimo: 15000, // ms
  
  /** Respuesta inmediata < 100ms */
  respuestaInmediata: 100, // ms
  
  /** Feedback inmediato: Respuesta visual/auditiva < 100ms */
  feedbackVisualMaximo: 100, // ms
} as const;

/**
 * Configuración de timers de actividades
 * Fuente: APP_BLUEPRINT.md
 */
export const CONFIGURACION_TIMERS = {
  /** Timer configurable (2, 5, 10 minutos) */
  tiemposDisponibles: [
    2 * 60 * 1000,  // 2 minutos en ms
    5 * 60 * 1000,  // 5 minutos en ms
    10 * 60 * 1000, // 10 minutos en ms
  ],
} as const;

// =============================================================================
// 🔧 LÍMITES TÉCNICOS - TECHNOLOGY.md
// =============================================================================

/**
 * Configuración de caché del sistema
 * Fuente: TECHNOLOGY.md - CacheService
 */
export const CONFIGURACION_CACHE = {
  /** CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 horas */
  expiracionCacheGeneral: 24 * 60 * 60 * 1000, // ms
  
  /** CACHE_DURATION = 30 * 60 * 1000; // 30 minutos */
  duracionCacheFirebase: 30 * 60 * 60 * 1000, // ms
  
  /** Caché más largo para insights (2 horas) */
  cacheInsights: 2 * 60 * 60 * 1000, // ms
  
  /** Cachear por 2 horas */
  cacheGeneralLargo: 2 * 60 * 60 * 1000, // ms
  
  /** expiresAt: Date.now() + (12 * 60 * 60 * 1000) // 12 horas para progreso */
  cacheProgreso: 12 * 60 * 60 * 1000, // ms
} as const;

/**
 * Configuración de caché agresivo para optimización de costos
 * Fuente: TECHNOLOGY.md - CostOptimizationService
 */
export const CACHE_AGRESIVO = {
  /** activityCache: 4 * 60 * 60 * 1000, // 4 horas */
  actividadesCache: 4 * 60 * 60 * 1000, // ms
  
  /** userProgressCache: 2 * 60 * 60 * 1000, // 2 horas */
  progresoUsuarioCache: 2 * 60 * 60 * 1000, // ms
  
  /** aiInsightsCache: 6 * 60 * 60 * 1000 // 6 horas */
  insightsIACache: 6 * 60 * 60 * 1000, // ms
} as const;

/**
 * Límites de uso de servicios cloud
 * Fuente: TECHNOLOGY.md - CostOptimizationService
 */
export const LIMITES_SERVICIOS_CLOUD = {
  /** MAX_DAILY_REQUESTS = 50000; // Límite diario */
  requestsDiariosMaximos: 50000,
  
  /** MAX_FIREBASE_READS = 10000; // Límite de lecturas Firestore */
  lectrasFirebaseMaximas: 10000,
  
  /** Approaching Firebase read limit, switching to cache-only mode */
  umbralAdvertenciaFirebase: 0.8, // 80%
  
  /** Approaching Cloud Function limit, reducing AI frequency */
  umbralAdvertenciaCloudFunctions: 0.8, // 80%
} as const;

/**
 * Configuración de batch processing
 * Fuente: TECHNOLOGY.md - FirebaseDataService
 */
export const CONFIGURACION_BATCH = {
  /** BATCH_SIZE = 10 */
  tamañoBatchFirebase: 10,
  
  /** memory: '512MB' */
  memoriaCloudFunctions: 512 * 1024 * 1024, // bytes
} as const;

/**
 * Límites de rotación de claves de seguridad
 * Fuente: TECHNOLOGY.md
 */
export const LIMITES_SEGURIDAD = {
  /** if (keyAge > 24 * 60 * 60) { // Más de 24 horas */
  rotacionClavesMaxima: 24 * 60 * 60 * 1000, // ms
} as const;

// =============================================================================
// 🧮 FUNCIONES DE VALIDACIÓN
// =============================================================================

/**
 * Valida si un tiempo de respuesta es aceptable
 */
export const validarTiempoRespuesta = (tiempo: number): boolean => {
  return tiempo <= LIMITES_USABILIDAD.tiempoRespuestaMaximo;
};

/**
 * Valida si el tamaño de un archivo cumple los límites
 */
export const validarTamañoArchivo = (bytes: number): boolean => {
  return bytes <= LIMITES_RENDIMIENTO.tamañoDescargaMaximo;
};

/**
 * Valida si la complejidad ciclomática es aceptable
 */
export const validarComplejidadCiclomatica = (complejidad: number): 'simple' | 'moderado' | 'complejo' | 'rechazado' => {
  if (complejidad <= METRICAS_CALIDAD_CODIGO.complejidad.simple.max) return 'simple';
  if (complejidad <= METRICAS_CALIDAD_CODIGO.complejidad.moderado.max) return 'moderado';
  if (complejidad <= METRICAS_CALIDAD_CODIGO.complejidad.complejo.max) return 'complejo';
  return 'rechazado';
};

/**
 * Valida si la cobertura de tests es aceptable
 */
export const validarCoberturaTests = (porcentaje: number): 'excelente' | 'bueno' | 'aceptable' | 'inaceptable' => {
  if (porcentaje >= METRICAS_CALIDAD_CODIGO.coberturaTesting.excelente.min) return 'excelente';
  if (porcentaje >= METRICAS_CALIDAD_CODIGO.coberturaTesting.bueno.min) return 'bueno';
  if (porcentaje >= METRICAS_CALIDAD_CODIGO.coberturaTesting.aceptable.min) return 'aceptable';
  return 'inaceptable';
};

/**
 * Valida si el tiempo de sesión está en el rango recomendado
 */
export const validarTiempoSesion = (duracion: number): boolean => {
  return duracion >= CRITERIOS_CALIDAD.tiempoSesionMinimo && 
         duracion <= CRITERIOS_CALIDAD.tiempoSesionMaximo;
};

/**
 * Valida si el dispositivo tiene el breakpoint correcto
 */
export const obtenerBreakpoint = (ancho: number): string => {
  if (ancho <= BREAKPOINTS_RESPONSIVOS.smartphonePequeño.max) return 'smartphonePequeño';
  if (ancho <= BREAKPOINTS_RESPONSIVOS.smartphoneEstandar.max) return 'smartphoneEstandar';
  if (ancho <= BREAKPOINTS_RESPONSIVOS.smartphoneGrande.max) return 'smartphoneGrande';
  if (ancho <= BREAKPOINTS_RESPONSIVOS.tabletPequeña.max) return 'tabletPequeña';
  return 'tabletGrande';
};

/**
 * Valida si se debe usar caché agresivo según límites de uso
 */
export const debeUsarCacheAgresivo = (requestsRealizados: number): boolean => {
  return requestsRealizados > (LIMITES_SERVICIOS_CLOUD.requestsDiariosMaximos * LIMITES_SERVICIOS_CLOUD.umbralAdvertenciaCloudFunctions);
};

/**
 * Valida si es necesario rotar las claves de seguridad
 */
export const necesitaRotacionClaves = (ultimaRotacion: number): boolean => {
  const tiempoTranscurrido = Date.now() - ultimaRotacion;
  return tiempoTranscurrido > LIMITES_SEGURIDAD.rotacionClavesMaxima;
};

// =============================================================================
// 🎯 CONSTANTES DE VERIFICACIÓN
// =============================================================================

/**
 * Todos los criterios que deben cumplirse OBLIGATORIAMENTE
 * Fuente: ERROR_DETECTION.md - "OBJETIVOS DE CALIDAD"
 */
export const OBJETIVOS_CALIDAD_OBLIGATORIOS = {
  erroresESLint: 0,
  erroresTypeScript: 0,
  archivosGrandesPermitidos: 0, // 100% archivos < 300 líneas
  funcionesComplejasPermitidas: 0, // 100% funciones complejidad < 15
  coberturaTestsMinima: 90, // 90%+ cobertura de tests
  compatibilidadAccesibilidad: 100, // 100% accesibilidad compatible
} as const;

/**
 * Métricas de documentación exigidas
 * Fuente: VERIFICATION_CHECKLIST.md
 */
export const METRICAS_DOCUMENTACION = {
  calidadMinima: 9, // sobre 10
  completitudMinima: 95, // %
  usabilidadMinima: 9, // sobre 10
  promedioGeneralMinimo: 9.9, // sobre 10
} as const;

// =============================================================================
// 📋 EXPORT CONSOLIDADO
// =============================================================================

/**
 * Exportación consolidada de todas las validaciones
 * ⚠️ IMPORTANTE: Estos valores son extraídos DIRECTAMENTE de la documentación
 * ❌ PROHIBIDO modificar sin actualizar documentos oficiales primero
 */
export const VALIDACION_CENTRALIZADA = {
  limitesUsabilidad: LIMITES_USABILIDAD,
  limitesRendimiento: LIMITES_RENDIMIENTO,
  criteriosCalidad: CRITERIOS_CALIDAD,
  criteriosIA: CRITERIOS_IA,
  limitesComplejidad: LIMITES_COMPLEJIDAD,
  metricasCalidadCodigo: METRICAS_CALIDAD_CODIGO,
  criteriosPerformance: CRITERIOS_PERFORMANCE,
  distribucionTests: DISTRIBUCION_TESTS,
  dimensionesMinimas: DIMENSIONES_MINIMAS,
  breakpointsResponsivos: BREAKPOINTS_RESPONSIVOS,
  tiemposRespuestaUI: TIEMPOS_RESPUESTA_UI,
  configuracionTimers: CONFIGURACION_TIMERS,
  configuracionCache: CONFIGURACION_CACHE,
  cacheAgresivo: CACHE_AGRESIVO,
  limitesServiciosCloud: LIMITES_SERVICIOS_CLOUD,
  configuracionBatch: CONFIGURACION_BATCH,
  limitesSeguridad: LIMITES_SEGURIDAD,
  objetivosCalidadObligatorios: OBJETIVOS_CALIDAD_OBLIGATORIOS,
  metricasDocumentacion: METRICAS_DOCUMENTACION,
} as const;

export type ValidacionCentralizada = typeof VALIDACION_CENTRALIZADA;