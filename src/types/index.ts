/**
 * PROYECTO LINCE - TIPOS TYPESCRIPT CENTRALIZADOS
 * 
 * Fuente de verdad: UI_COMPONENTS.md + TECHNOLOGY.md + APP_BLUEPRINT.md + PROJECT_REQUIREMENTS.md
 * Todas las interfaces, tipos y enums documentados oficialmente centralizados.
 * 
 * PROHIBIDO: Crear tipos no documentados o especular sobre estructuras
 * OBLIGATORIO: Usar SOLO estos tipos en toda la aplicación
 * 
 * Fecha: 23 de septiembre de 2025
 * Estado: PRODUCCIÓN - Basado en documentación oficial
 */

// Tipo para elementos React usando React.ReactNode nativo
import { ReactNode } from 'react';

/**
 * =============================================================================
 * TIPOS DE USUARIO Y PERFILES
 * Fuente: TECHNOLOGY.md líneas 279-286 + APP_BLUEPRINT.md línea 23
 * =============================================================================
 */

/**
 * Niveles de desarrollo documentados para niños
 * Fuente: APP_BLUEPRINT.md línea 23 - "Nivel de desarrollo (básico/intermedio/avanzado)"
 */
export type NivelDesarrollo = 'basic' | 'intermediate' | 'advanced';

/**
 * Preferencias sensoriales del niño
 * Fuente: TECHNOLOGY.md línea 284 - Campo de UserProfile
 */
export interface SensoryPreferences {
  auditivo: {
    volumenPreferido: number; // 0.0 a 1.0
    musicaFondoHabilitada: boolean;
    sonidosRetroalimentacionHabilitados: boolean;
  };
  visual: {
    brilloPreferido: number; // 0.0 a 1.0 
    contrastoAlto: boolean;
    animacionesReducidas: boolean;
  };
  tactil: {
    vibracionHabilitada: boolean;
    sensibilidadTouch: 'alta' | 'media' | 'baja';
    toleranciaMultiTouch: boolean;
  };
  vestibular: {
    prefiereMovimientoSuave: boolean;
    dificultadBalance: boolean;
  };
}

/**
 * Objetivos terapéuticos para el niño
 * Fuente: TECHNOLOGY.md línea 285
 */
export interface TherapeuticGoal {
  id: string;
  areaSensorial: 'auditivo' | 'visual' | 'tactil' | 'vestibular' | 'propioceptivo';
  descripcion: string;
  metaEspecifica: string;
  fechaInicio: Date;
  fechaObjetivo: Date;
  progreso: number; // 0-100
  completado: boolean;
  notas?: string;
}

/**
 * Perfil completo del usuario/niño
 * Fuente: TECHNOLOGY.md líneas 279-287
 */
export interface UserProfile {
  id: string;
  name: string;
  age: number;
  developmentLevel: NivelDesarrollo;
  sensoryPreferences: SensoryPreferences;
  currentGoals: TherapeuticGoal[];
  sessionHistory: SessionData[];
  fechaCreacion: Date;
  ultimaActualizacion: Date;
}

/**
 * =============================================================================
 * TIPOS DE ACTIVIDADES Y SESIONES
 * Fuente: TECHNOLOGY.md + UI_COMPONENTS.md + APP_BLUEPRINT.md
 * =============================================================================
 */

/**
 * Métricas de interacción durante una sesión
 * Fuente: TECHNOLOGY.md línea 320 - initializeMetrics()
 */
export interface SessionMetrics {
  tiempoTotalSesion: number; // milisegundos
  numeroInteracciones: number;
  precisionPromedio: number; // 0-1
  tiempoRespuestaPromedio: number; // milisegundos
  numeroErrores: number;
  numeroAciertos: number;
  momentosPausa: number;
  configuracionVolumen: number;
  configuracionDificultad: NivelDesarrollo;
}

/**
 * Evento de interacción individual
 * Fuente: TECHNOLOGY.md línea 298 - addInteractionEvent
 */
export interface InteractionEvent {
  id: string;
  timestamp: number;
  activityId: string;
  tipoInteraccion: TipoInteraccion;
  coordenadas?: { x: number; y: number };
  duracion: number; // milisegundos
  precision: number; // 0-1
  tiempoRespuesta: number; // milisegundos
  exitoso: boolean;
  ayudaUsada: boolean;
}

/**
 * Tipos de interacción documentados
 * Fuente: UI_COMPONENTS.md líneas 139 + 147-149
 */
export type TipoInteraccion = 'tactil' | 'arrastrar' | 'multitouch';

/**
 * Elemento interactivo en actividades
 * Fuente: UI_COMPONENTS.md línea 140 - AreaInteractivaProps
 */
export interface ElementoInteractivo {
  id: string;
  tipo: TipoInteraccion;
  posicion: { x: number; y: number };
  tamaño: { ancho: number; alto: number };
  activo: boolean;
  visible: boolean;
  propiedades?: Record<string, unknown>;
}

/**
 * Datos completos de una sesión de actividad
 * Fuente: TECHNOLOGY.md líneas 291 + 315-322
 */
export interface SessionData {
  id: string;
  activityId: string;
  userId: string;
  startTime: number;
  endTime?: number;
  interactions: InteractionEvent[];
  metrics: SessionMetrics;
  completada: boolean;
  razonTerminacion?: 'completada' | 'pausada' | 'error' | 'usuario_termino';
  configuracionUsada: ConfiguracionActividad;
}

/**
 * Configuración específica de actividad
 * Fuente: APP_BLUEPRINT.md líneas 69-73
 */
export interface ConfiguracionActividad {
  volumen: number; // 0.0 a 1.0
  duracion: 'corta' | 'normal' | 'larga';
  nivelAyuda: 'basico' | 'intermedio' | 'avanzado';
  musicaFondoHabilitada: boolean;
  feedbackVisualHabilitado: boolean;
  feedbackAuditivoHabilitado: boolean;
}

/**
 * Datos de actividad disponible
 * Fuente: UI_COMPONENTS.md + APP_BLUEPRINT.md (islas temáticas)
 */
export interface Activity {
  id: string;
  nombre: string;
  descripcion: string;
  isla: IslaActividad;
  areaSensorial: AreaSensorial;
  dificultadMinima: NivelDesarrollo;
  dificultadMaxima: NivelDesarrollo;
  duracionEstimada: number; // minutos
  objetivosIncluidos: string[];
  requiereAudio: boolean;
  requiereMicrófono: boolean;
  icono: string;
  imagenPreview: string;
  instrucciones: string[];
  habilitada: boolean;
  prioridad: number;
  fechaCreacion: Date;
}

/**
 * Islas temáticas documentadas
 * Fuente: APP_BLUEPRINT.md líneas 37-42
 */
export type IslaActividad = 
  | 'isla_movimiento'      // 🏃 Isla del Movimiento (actividades vestibulares)
  | 'isla_musical'         // 🎵 Isla Musical (actividades auditivas)  
  | 'jardin_tactil'        // 🌸 Jardín Táctil (actividades táctiles)
  | 'estudio_arte'         // 🎨 Estudio de Arte (actividades visuales)
  | 'rincon_calma';        // 🧘 Rincón de Calma (autorregulación)

/**
 * Áreas sensoriales documentadas
 * Fuente: TherapeuticGoal interface + PROJECT_REQUIREMENTS.md
 */
export type AreaSensorial = 'auditivo' | 'visual' | 'tactil' | 'vestibular' | 'propioceptivo';

/**
 * =============================================================================
 * TIPOS DE INTELIGENCIA ARTIFICIAL
 * Fuente: TECHNOLOGY.md líneas 340-370 + APP_BLUEPRINT.md
 * =============================================================================
 */

/**
 * Sugerencia proactiva de IA documentada
 * Fuente: TECHNOLOGY.md líneas 340-347 + UI_COMPONENTS.md líneas 153-160
 */
export interface AISuggestion {
  id: string;
  type: TipoSugerenciaIA;
  message: string;
  confidence: number; // 0-1
  actions: SuggestionAction[];
  timestamp: number;
  userId: string;
  contextData?: Record<string, unknown>;
}

/**
 * Tipos de sugerencia de IA documentados
 * Fuente: TECHNOLOGY.md línea 341 + UI_COMPONENTS.md líneas 160-165
 */
export type TipoSugerenciaIA = 'break' | 'activity_change' | 'celebration' | 'help' | 'descanso' | 'cambio_actividad' | 'celebracion' | 'ayuda';

/**
 * Acción sugerida por IA
 * Fuente: UI_COMPONENTS.md líneas 157-158 - accionPrincipal/accionSecundaria
 */
export interface SuggestionAction {
  id: string;
  label: string;
  action: string;
  parameters?: Record<string, unknown>;
  prioridad: 'principal' | 'secundaria';
}

/**
 * Configuraciones adaptativas de IA
 * Fuente: TECHNOLOGY.md líneas 353-357 + APP_BLUEPRINT.md líneas 216-226
 */
export interface AdaptiveSettings {
  suggestionFrequency: FrecuenciaSugerencia;
  adaptationSpeed: VelocidadAdaptacion;
  parentNotifications: boolean;
  nivelPersonalizacion: NivelPersonalizacionIA;
  tiposDatosPermitidos: TipoDatoIA[];
}

/**
 * Frecuencias de sugerencias documentadas
 * Fuente: APP_BLUEPRINT.md línea 221-222
 */
export type FrecuenciaSugerencia = 'nunca' | 'raramente' | 'normal' | 'frecuentemente';

/**
 * Velocidad de adaptación del algoritmo
 * Fuente: TECHNOLOGY.md línea 355
 */
export type VelocidadAdaptacion = 'slow' | 'medium' | 'fast';

/**
 * Niveles de personalización de IA documentados
 * Fuente: APP_BLUEPRINT.md líneas 216-220
 */
export type NivelPersonalizacionIA = 'basico' | 'intermedio' | 'avanzado';

/**
 * Tipos de datos para análisis de IA
 * Fuente: APP_BLUEPRINT.md líneas 223-226
 */
export type TipoDatoIA = 'tiempo_uso' | 'patrones_interaccion' | 'grabaciones_voz_anonimizadas';

/**
 * Insight generado para padres
 * Fuente: TECHNOLOGY.md línea 351 + UI_COMPONENTS.md líneas 200-207
 */
export interface ParentInsight {
  id: string;
  tipo: TipoInsight;
  titulo: string;
  contenido: string;
  accionesDisponibles: AccionInsight[];
  fechaGeneracion: Date;
  relevancia: number; // 0-1
  categoria: CategoriaInsight;
  datos_contexto?: Record<string, unknown>;
}

/**
 * Tipos de insight documentados
 * Fuente: UI_COMPONENTS.md línea 201
 */
export type TipoInsight = 'progreso' | 'sugerencia' | 'logro' | 'recomendacion';

/**
 * Categorías de insight para organización
 */
export type CategoriaInsight = 'desarrollo' | 'sesiones' | 'objetivos' | 'recomendaciones';

/**
 * Acción disponible en un insight
 * Fuente: UI_COMPONENTS.md línea 204
 */
export interface AccionInsight {
  id: string;
  label: string;
  tipo: 'navegacion' | 'exportar' | 'configurar' | 'contactar';
  parametros?: Record<string, unknown>;
}

/**
 * =============================================================================
 * TIPOS DE COMPONENTES UI
 * Fuente: UI_COMPONENTS.md - Todas las interfaces de componentes
 * =============================================================================
 */

/**
 * Props del botón primario
 * Fuente: UI_COMPONENTS.md líneas 48-55
 */
export interface BotonPrimarioProps {
  texto: string;
  onPress: () => void;
  icono?: string;
  deshabilitado?: boolean;
  tamaño?: TamañoBoton;
  color?: ColorBoton;
}

/**
 * Props del botón secundario
 * Fuente: UI_COMPONENTS.md línea 21 + APP_BLUEPRINT.md líneas 112, 119-123
 */
export interface BotonSecundarioProps {
  readonly texto: string;
  readonly onPress: () => void;
  readonly icono?: string;
  readonly deshabilitado?: boolean;
  readonly tamaño?: TamañoBotonSecundario;
  readonly variante?: VarianteBotonSecundario;
  readonly accessibilityLabel?: string;
  readonly accessibilityHint?: string;
  readonly testID?: string;
}

/**
 * Tamaños de botón documentados
 * Fuente: UI_COMPONENTS.md línea 52
 */
export type TamañoBoton = 'pequeño' | 'mediano' | 'grande';

/**
 * Tamaños específicos para botón secundario
 * Compatible con BotonPrimario pero con diferenciación visual
 */
export type TamañoBotonSecundario = 'pequeño' | 'mediano' | 'grande';

/**
 * Variantes de botón secundario según DESIGN_SYSTEM.md línea 35
 * Para elementos secundarios con menor prominencia visual
 */
export type VarianteBotonSecundario = 'ghost' | 'outline' | 'subtle';

/**
 * Props del componente Loading
 * Fuente: UI_COMPONENTS.md líneas 23, 312 + APP_BLUEPRINT.md líneas 13, 77, 184, 194, 205
 */
export interface LoadingProps {
  readonly visible: boolean;
  readonly tipo?: TipoLoading;
  readonly mensaje?: string;
  readonly progreso?: number; // 0-100 para barra de progreso
  readonly overlay?: boolean;
  readonly tamaño?: TamañoLoading;
  readonly color?: ColorLoading;
  readonly onCancel?: () => void; // Para loading cancelable
  readonly accessibilityLabel?: string;
  readonly testID?: string;
}

/**
 * Tipos de loading según UI_COMPONENTS.md línea 312 + APP_BLUEPRINT.md casos de uso
 */
export type TipoLoading = 'circular' | 'puntos' | 'barra' | 'leo' | 'texto';

/**
 * Tamaños para componente Loading
 */
export type TamañoLoading = 'pequeño' | 'mediano' | 'grande';

/**
 * Colores para Loading usando sistema centralizado
 */
export type ColorLoading = 'azul' | 'verde' | 'blanco' | 'gris';

/**
 * Colores de botón documentados
 * Fuente: UI_COMPONENTS.md línea 53
 */
export type ColorBoton = 'azul' | 'verde' | 'amarillo' | 'rojo';

/**
 * Props del modal
 * Fuente: UI_COMPONENTS.md líneas 67-73
 */
export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  titulo?: string;
  children: ReactNode;
  tipo?: TipoModal;
}

/**
 * Tipos de modal documentados
 * Fuente: UI_COMPONENTS.md línea 72
 */
export type TipoModal = 'info' | 'confirmacion' | 'alerta';

/**
 * Props del avatar de Leo
 * Fuente: UI_COMPONENTS.md líneas 86-91
 */
export interface AvatarLeoProps {
  emocion: EmocionLeo;
  tamaño: TamañoAvatar;
  animacion?: boolean;
  onPress?: () => void;
}

/**
 * Emociones de Leo documentadas
 * Fuente: UI_COMPONENTS.md línea 87
 */
export type EmocionLeo = 'feliz' | 'pensativo' | 'animado' | 'calmado' | 'sorprendido';

/**
 * Tamaños de avatar documentados
 * Fuente: UI_COMPONENTS.md línea 88
 */
export type TamañoAvatar = 'pequeño' | 'mediano' | 'grande';

/**
 * Props de Leo animado
 * Fuente: UI_COMPONENTS.md líneas 103-107
 */
export interface LeoAnimadoProps {
  accion: AccionAnimacionLeo;
  loop?: boolean;
  onAnimacionCompleta?: () => void;
}

/**
 * Acciones de animación de Leo documentadas
 * Fuente: UI_COMPONENTS.md línea 104
 */
export type AccionAnimacionLeo = 'saltar' | 'bailar' | 'pensar' | 'celebrar' | 'dormitar';

/**
 * Props del contenedor de actividad
 * Fuente: UI_COMPONENTS.md líneas 121-128
 */
export interface ActividadContainerProps {
  titulo: string;
  progreso: number; // 0-100
  tiempoTranscurrido: number;
  onPausa: () => void;
  onTerminar: () => void;
  children: ReactNode;
}

/**
 * Props del área interactiva
 * Fuente: UI_COMPONENTS.md líneas 138-143
 */
export interface AreaInteractivaProps {
  tipo: TipoInteraccion;
  elementos: ElementoInteractivo[];
  onInteraccion: (elemento: ElementoInteractivo, tipo: TipoInteraccion) => void;
  sensibilidad?: NivelSensibilidad;
}

/**
 * Niveles de sensibilidad documentados
 * Fuente: UI_COMPONENTS.md línea 142
 */
export type NivelSensibilidad = 'alta' | 'media' | 'baja';

/**
 * Props de sugerencia proactiva
 * Fuente: UI_COMPONENTS.md líneas 153-160
 */
export interface SugerenciaProactivaProps {
  tipo: TipoSugerenciaIA;
  mensaje: string;
  accionPrincipal: AccionSugerencia;
  accionSecundaria?: AccionSugerencia;
  visible: boolean;
  onClose: () => void;
}

/**
 * Acción de sugerencia UI
 * Relacionado con SuggestionAction pero específico para UI
 */
export interface AccionSugerencia {
  label: string;
  onPress: () => void;
  estilo?: 'primario' | 'secundario';
}

/**
 * Props del indicador de IA
 * Fuente: UI_COMPONENTS.md líneas 167-171
 */
export interface IndicadorIAProps {
  estado: EstadoIA;
  visible: boolean;
  posicion?: PosicionIndicador;
}

/**
 * Estados del indicador de IA documentados
 * Fuente: UI_COMPONENTS.md línea 168
 */
export type EstadoIA = 'analizando' | 'procesando' | 'sugerencia_lista' | 'inactivo';

/**
 * Posiciones del indicador documentadas
 * Fuente: UI_COMPONENTS.md línea 170
 */
export type PosicionIndicador = 'superior_derecha' | 'inferior_derecha';

/**
 * Props del gráfico de progreso
 * Fuente: UI_COMPONENTS.md líneas 179-184
 */
export interface GraficoProgresoProps {
  datos: ProgresoDatos[];
  tipo: TipoGrafico;
  periodo: PeriodoGrafico;
  metrica: MetricaGrafico;
}

/**
 * Datos para gráfico de progreso
 */
export interface ProgresoDatos {
  fecha: Date;
  valor: number;
  etiqueta?: string;
  categoria?: string;
}

/**
 * Tipos de gráfico documentados
 * Fuente: UI_COMPONENTS.md línea 181
 */
export type TipoGrafico = 'barras' | 'lineas' | 'circular';

/**
 * Períodos de gráfico documentados
 * Fuente: UI_COMPONENTS.md línea 182
 */
export type PeriodoGrafico = 'semana' | 'mes' | 'trimestre';

/**
 * Métricas de gráfico documentadas
 * Fuente: UI_COMPONENTS.md línea 183
 */
export type MetricaGrafico = 'tiempo_sesion' | 'actividades_completadas' | 'precision';

/**
 * =============================================================================
 * TIPOS DE NAVEGACIÓN Y RUTAS
 * Fuente: APP_BLUEPRINT.md + UI_COMPONENTS.md
 * =============================================================================
 */

/**
 * Parámetros de navegación por pantalla
 * Fuente: APP_BLUEPRINT.md - Especificaciones de pantallas 1-14
 */
export interface RutasNavegacion {
  SplashScreen: undefined;
  BienvenidaConfiguracion: undefined;
  TutorialInteractivo: undefined;
  MapaMundo: undefined;
  VistaIsla: { islaId: IslaActividad };
  PreActividad: { actividadId: string };
  CargaVideoModelado: { actividadId: string };
  ActividadPrincipal: { actividadId: string; configuracion: ConfiguracionActividad };
  RecompensaActividad: { sessionData: SessionData };
  PausaOpciones: { actividadId: string };
  RinconCalma: { duracion?: number; origenPantalla: string };
  PortalConfiguracion: undefined;
  DashboardPortal: undefined;
  ProgresoDetallado: { usuarioId: string; periodo: PeriodoGrafico };
  ConfiguracionAvanzadaIA: undefined;
}

/**
 * =============================================================================
 * TIPOS DE ESTADOS Y STORES
 * Fuente: TECHNOLOGY.md - Zustand stores
 * =============================================================================
 */

/**
 * Estado del store de perfil de usuario
 * Fuente: TECHNOLOGY.md líneas 289-298
 */
export interface UserProfileState {
  profile: UserProfile | null;
  currentSession: SessionData | null;
  
  // Actions
  setProfile: (profile: UserProfile) => void;
  updatePreferences: (preferences: Partial<SensoryPreferences>) => void;
  startSession: (activityId: string) => void;
  endSession: (sessionData: SessionData) => void;
  addInteractionEvent: (event: InteractionEvent) => void;
}

/**
 * Estado del store de IA
 * Fuente: TECHNOLOGY.md líneas 348-365
 */
export interface AIState {
  isAnalyzing: boolean;
  currentSuggestion: AISuggestion | null;
  insightsHistory: ParentInsight[];
  adaptiveSettings: AdaptiveSettings;
  
  // Actions
  setAnalyzing: (analyzing: boolean) => void;
  receiveSuggestion: (suggestion: AISuggestion) => void;
  acceptSuggestion: (suggestionId: string) => void;
  dismissSuggestion: (suggestionId: string) => void;
  addInsight: (insight: ParentInsight) => void;
  updateAdaptiveSettings: (settings: Partial<AdaptiveSettings>) => void;
}

/**
 * =============================================================================
 * TIPOS DE RESPONSIVIDAD Y DISPOSITIVOS
 * Fuente: UI_COMPONENTS.md líneas 219-238
 * =============================================================================
 */

/**
 * Breakpoints documentados para responsividad
 * Fuente: UI_COMPONENTS.md líneas 221-226
 */
export interface Breakpoints {
  smartphonePequeño: number; // < 350px
  smartphoneEstandar: number; // 350-450px
  smartphoneGrande: number; // 450-550px
  tabletPequeña: number; // 550-800px
  tabletGrande: number; // > 800px
}

/**
 * Información del dispositivo actual
 */
export interface DeviceInfo {
  ancho: number;
  alto: number;
  tipo: TipoDispositivo;
  orientacion: OrientacionDispositivo;
  densidad: number;
  escalaFuente: number;
}

/**
 * Tipos de dispositivo
 */
export type TipoDispositivo = 'smartphone' | 'tablet';

/**
 * Orientaciones soportadas
 */
export type OrientacionDispositivo = 'portrait' | 'landscape';

/**
 * =============================================================================
 * TIPOS DE ERROR Y VALIDACIÓN
 * =============================================================================
 */

/**
 * Tipos de error de aplicación
 */
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: Date;
  userId?: string;
  sessionId?: string;
  recovered?: boolean;
}

/**
 * Tipos de validación
 */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings?: ValidationWarning[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationWarning {
  field: string;
  message: string;
  suggestion?: string;
}

/**
 * =============================================================================
 * TIPOS DE ANÁLISIS Y MÉTRICAS
 * Fuente: TECHNOLOGY.md + PROJECT_REQUIREMENTS.md
 * =============================================================================
 */

/**
 * Análisis de imitación de sonidos
 * Fuente: TECHNOLOGY.md líneas 266-273 - SpeechService.analyzeSoundImitation
 */
export interface ImitationAnalysis {
  transcription: string;
  similarity: number; // 0-1
  feedback: string;
  suggestions: string[];
  confidence: number;
  phonetic_match: boolean;
}

/**
 * Métricas de calidad de aplicación
 * Fuente: PROJECT_REQUIREMENTS.md líneas 67-71
 */
export interface QualityMetrics {
  completitudTareas: number; // Debe ser >= 95%
  tiempoPromedioSesion: number; // Objetivo 10-20 minutos
  retencionUsuario: number; // Debe ser > 70% después de 1 semana  
  feedbackPadres: number; // Debe ser > 4.5/5
  crashesCriticos: number; // Debe ser 0
}

/**
 * Configuración de calidad y límites
 * Fuente: PROJECT_REQUIREMENTS.md + DEVELOPMENT_PLAN.md
 */
export interface QualityLimits {
  tiempoRespuestaMaximo: number; // < 1s interacciones
  tiempoRespuestaIA: number; // < 2s IA
  tiempoCargaMaximo: number; // < 3s carga
  fpsMinimo: number; // 60 FPS constantes
  crashRateMaximo: number; // < 0.1%
}

/**
 * =============================================================================
 * EXPORTS DE TIPO UNIÓN PARA VALIDACIÓN
 * =============================================================================
 */

/**
 * Todos los tipos de componentes Props
 */
export type ComponentProps = 
  | BotonPrimarioProps 
  | ModalProps 
  | AvatarLeoProps 
  | LeoAnimadoProps 
  | ActividadContainerProps 
  | AreaInteractivaProps 
  | SugerenciaProactivaProps 
  | IndicadorIAProps 
  | GraficoProgresoProps;

/**
 * Todos los tipos de IA
 */
export type AITypes = AISuggestion | AdaptiveSettings | ParentInsight | SuggestionAction;

/**
 * Todos los tipos de actividad
 */
export type ActivityTypes = Activity | SessionData | InteractionEvent | ConfiguracionActividad;

/**
 * Todos los tipos de usuario
 */
export type UserTypes = UserProfile | SensoryPreferences | TherapeuticGoal;

/**
 * Función helper para validar tipos en runtime
 */
export const esNivelDesarrolloValido = (valor: string): valor is NivelDesarrollo => {
  return ['basic', 'intermediate', 'advanced'].includes(valor);
};

export const esTipoInteraccionValido = (valor: string): valor is TipoInteraccion => {
  return ['tactil', 'arrastrar', 'multitouch'].includes(valor);
};

export const esIslaActividadValida = (valor: string): valor is IslaActividad => {
  return ['isla_movimiento', 'isla_musical', 'jardin_tactil', 'estudio_arte', 'rincon_calma'].includes(valor);
};

export const esTipoSugerenciaIAValida = (valor: string): valor is TipoSugerenciaIA => {
  return ['break', 'activity_change', 'celebration', 'help', 'descanso', 'cambio_actividad', 'celebracion', 'ayuda'].includes(valor);
};

// ============================================================================
// ESTADOS CENTRALIZADOS DISPONIBLES
// ============================================================================

/**
 * NOTA: Los tipos de estados de usuarios (UserProfile, SessionData, etc.) 
 * ya están definidos en este archivo. Los nuevos archivos userStates.ts 
 * y adminStates.ts proveen las constantes y funciones utilitarias.
 * 
 * TIPOS ADMINISTRATIVOS NUEVOS - Solo los que no existían antes
 * Fuente: adminStates.ts + PROJECT_REQUIREMENTS.md RF-ADMIN + UI_COMPONENTS.md Sección 2.6
 */
export type {
  AdminPermissions,
  Banner,
  NuevoBanner,
  MetricasDetalladas,
  ActividadMetrica,
  RetencionData,
  FeedbackStats,
  ErrorMetrica,
  Alerta,
  AccionAuditoria,
  ResumenDashboard,
  AdminSession,
  AdminRole,
  BannerStatus,
  BannerPriority,
  MetricsPeriod,
  ExportFormat,
  AlertType,
  AuditActionType
} from '../constants/adminStates';

// BARRA PROGRESO INTERFACES - Para barras de progreso Activities
export interface BarraProgresoProps {
  readonly progreso: number; // 0-100 según UI_COMPONENTS.md línea 129
  readonly mostrarLeo?: boolean; // Leo animado según línea 314 
  readonly mostrarTexto?: boolean; // Mostrar porcentaje textual
  readonly altura?: number; // Altura personalizable
  readonly animada?: boolean; // Animaciones smooth según DESIGN_SYSTEM.md
  readonly vibracionHitos?: boolean; // Vibración en 25%, 50%, 75%, 100%
  readonly colorProgreso?: string; // Override color (usar Colores.)
  readonly colorFondo?: string; // Override fondo (usar Colores.)
  readonly onProgresoCompleto?: () => void; // Callback al llegar a 100%
  readonly onHito?: (hito: number) => void; // Callback en hitos
  readonly testID?: string; // Para testing automatizado
}