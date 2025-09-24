/**
 * 🎭 CONTENIDO CENTRALIZADO - PROYECTO LINCE
 * 
 * Estados de Leo, tipos de actividades y mensajes extraídos de:
 * - APP_BLUEPRINT.md
 * - UI_COMPONENTS.md
 * - DESIGN_SYSTEM.md  
 * - PROJECT_REQUIREMENTS.md
 * 
 * ⚠️ ADVERTENCIA: Todo el contenido es DOCUMENTADO y NO ESPECULADO
 * ❌ PROHIBIDO cambiar sin actualizar documentación oficial
 */

// =============================================================================
// 🦁 ESTADOS EMOCIONALES DE LEO - UI_COMPONENTS.md
// =============================================================================

/**
 * Estados emocionales documentados de Leo el Lince
 * Fuente: UI_COMPONENTS.md - AvatarLeoProps interface
 */
export const ESTADOS_EMOCIONALES_LEO = {
  /** Ojos brillantes, sonrisa amplia */
  feliz: 'feliz',
  
  /** Garra en barbilla, cejas ligeramente fruncidas */
  pensativo: 'pensativo',
  
  /** Salto sutil, ojos muy abiertos */
  animado: 'animado',
  
  /** Ojos entrecerrados, postura relajada */
  calmado: 'calmado',
  
  /** Ojos muy abiertos, boca en "O" */
  sorprendido: 'sorprendido',
} as const;

/**
 * Descripciones visuales de cada estado emocional
 * Fuente: UI_COMPONENTS.md - "Estados Emocionales"
 */
export const DESCRIPCIONES_ESTADOS_LEO = {
  [ESTADOS_EMOCIONALES_LEO.feliz]: {
    descripcion: 'Ojos brillantes, sonrisa amplia',
    uso: 'Actividades completadas exitosamente, celebraciones',
  },
  [ESTADOS_EMOCIONALES_LEO.pensativo]: {
    descripcion: 'Garra en barbilla, cejas ligeramente fruncidas',
    uso: 'Procesando sugerencias IA, analizando patrones',
  },
  [ESTADOS_EMOCIONALES_LEO.animado]: {
    descripcion: 'Salto sutil, ojos muy abiertos',
    uso: 'Inicio de actividades, momentos de alta energía',
  },
  [ESTADOS_EMOCIONALES_LEO.calmado]: {
    descripcion: 'Ojos entrecerrados, postura relajada',
    uso: 'Rincón de calma, actividades de relajación',
  },
  [ESTADOS_EMOCIONALES_LEO.sorprendido]: {
    descripcion: 'Ojos muy abiertos, boca en "O"',
    uso: 'Descubrimientos, nuevas actividades, logros inesperados',
  },
} as const;

// =============================================================================
// 🎬 ANIMACIONES DE LEO - UI_COMPONENTS.md
// =============================================================================

/**
 * Acciones animadas documentadas de Leo
 * Fuente: UI_COMPONENTS.md - LeoAnimadoProps interface
 */
export const ANIMACIONES_LEO = {
  /** Movimiento vertical suave, 1.5s duración */
  saltar: 'saltar',
  
  /** Balanceo lateral con rotación leve */
  bailar: 'bailar',
  
  /** Movimiento sutil de cabeza */
  pensar: 'pensar',
  
  /** Secuencia de saltos con confeti */
  celebrar: 'celebrar',
  
  /** Ojos que se cierran gradualmente */
  dormitar: 'dormitar',
} as const;

/**
 * Especificaciones técnicas de las animaciones
 * Fuente: UI_COMPONENTS.md - "Animaciones Específicas"
 */
export const ESPECIFICACIONES_ANIMACIONES = {
  [ANIMACIONES_LEO.saltar]: {
    descripcion: 'Movimiento vertical suave, 1.5s duración',
    duracion: 1500, // ms
    tipo: 'movimiento_vertical',
  },
  [ANIMACIONES_LEO.bailar]: {
    descripcion: 'Balanceo lateral con rotación leve',
    duracion: 2000, // ms (estimado para loop suave)
    tipo: 'movimiento_lateral',
  },
  [ANIMACIONES_LEO.pensar]: {
    descripcion: 'Movimiento sutil de cabeza',
    duracion: 3000, // ms (estimado para reflexión)
    tipo: 'movimiento_cabeza',
  },
  [ANIMACIONES_LEO.celebrar]: {
    descripcion: 'Secuencia de saltos con confeti',
    duracion: 2500, // ms (estimado para celebración completa)
    tipo: 'secuencia_compleja',
  },
  [ANIMACIONES_LEO.dormitar]: {
    descripcion: 'Ojos que se cierran gradualmente',
    duracion: 4000, // ms (estimado para transición suave)
    tipo: 'transicion_gradual',
  },
} as const;

// =============================================================================
// 🏝️ ISLAS TEMÁTICAS Y ACTIVIDADES - APP_BLUEPRINT.md
// =============================================================================

/**
 * Islas temáticas documentadas del mundo de Leo
 * Fuente: APP_BLUEPRINT.md - "Islas temáticas"
 */
export const ISLAS_TEMATICAS = {
  /** 🏃 Isla del Movimiento (actividades vestibulares) */
  movimiento: {
    id: 'isla_movimiento',
    nombre: 'Isla del Movimiento',
    icono: '🏃',
    descripcion: 'actividades vestibulares',
    tipoSensorial: 'vestibular',
  },
  
  /** 🎵 Isla Musical (actividades auditivas) */
  musical: {
    id: 'isla_musical', 
    nombre: 'Isla Musical',
    icono: '🎵',
    descripcion: 'actividades auditivas',
    tipoSensorial: 'auditivo',
  },
  
  /** 🌸 Jardín Táctil (actividades táctiles) */
  tactil: {
    id: 'jardin_tactil',
    nombre: 'Jardín Táctil', 
    icono: '🌸',
    descripcion: 'actividades táctiles',
    tipoSensorial: 'táctil',
  },
  
  /** 🎨 Estudio de Arte (actividades visuales) */
  visual: {
    id: 'estudio_arte',
    nombre: 'Estudio de Arte',
    icono: '🎨', 
    descripcion: 'actividades visuales',
    tipoSensorial: 'visual',
  },
  
  /** 🧘 Rincón de Calma (autorregulación) */
  calma: {
    id: 'rincon_calma',
    nombre: 'Rincón de Calma',
    icono: '🧘',
    descripcion: 'autorregulación',
    tipoSensorial: 'autorregulacion',
  },
} as const;

/**
 * Tipos de áreas sensoriales documentadas
 * Fuente: APP_BLUEPRINT.md - "Por área sensorial"
 */
export const AREAS_SENSORIALES = {
  vestibular: 'vestibular',
  tactil: 'táctil',
  auditiva: 'auditiva', 
  visual: 'visual',
  autorregulacion: 'autorregulación',
} as const;

/**
 * Ejemplo específico de actividad documentada
 * Fuente: APP_BLUEPRINT.md - "Los Saltos Fuertes de Leo"
 */
export const ACTIVIDAD_EJEMPLO = {
  nombre: 'Los Saltos Fuertes de Leo',
  tipo: 'vestibular',
  descripcion: 'Tocar para hacer saltar a Leo',
  duracion: 'configurable',
  feedbackTipo: 'visual + auditivo',
  tolerancia: 'alta a toques imprecisos',
  tiempoRespuesta: 100, // ms
} as const;

// =============================================================================
// 🎯 TIPOS DE SUGERENCIAS IA - UI_COMPONENTS.md
// =============================================================================

/**
 * Tipos de sugerencias proactivas de la IA
 * Fuente: UI_COMPONENTS.md - SugerenciaProactivaProps interface
 */
export const TIPOS_SUGERENCIAS_IA = {
  /** Icono de Leo descansando + fondo suave */
  descanso: 'descanso',
  
  /** Icono de flecha circular + colores dinámicos */
  cambio_actividad: 'cambio_actividad',
  
  /** Icono de trofeo + animación de confeti */
  celebracion: 'celebracion',
  
  /** Icono de bombilla + colores cálidos */
  ayuda: 'ayuda',
} as const;

/**
 * Especificaciones visuales de cada tipo de sugerencia
 * Fuente: UI_COMPONENTS.md - "Tipos de Sugerencia"
 */
export const ESPECIFICACIONES_SUGERENCIAS = {
  [TIPOS_SUGERENCIAS_IA.descanso]: {
    icono: 'Leo descansando',
    fondo: 'suave',
    proposito: 'Autorregulación y pausa',
    colores: 'tonos_calmos',
  },
  [TIPOS_SUGERENCIAS_IA.cambio_actividad]: {
    icono: 'flecha circular',
    fondo: 'dinámico', 
    proposito: 'Variación de estímulos',
    colores: 'tonos_dinamicos',
  },
  [TIPOS_SUGERENCIAS_IA.celebracion]: {
    icono: 'trofeo',
    fondo: 'animación de confeti',
    proposito: 'Refuerzo positivo',
    colores: 'tonos_celebracion',
  },
  [TIPOS_SUGERENCIAS_IA.ayuda]: {
    icono: 'bombilla',
    fondo: 'cálido',
    proposito: 'Asistencia y orientación',
    colores: 'tonos_calidos',
  },
} as const;

// =============================================================================
// 🤖 ESTADOS DE IA - UI_COMPONENTS.md 
// =============================================================================

/**
 * Estados del indicador de IA
 * Fuente: UI_COMPONENTS.md - IndicadorIA interface
 */
export const ESTADOS_INDICADOR_IA = {
  /** Barra de progreso circular pulsante */
  analizando: 'analizando',
  
  /** Spinner con colores gradientes */
  procesando: 'procesando',
  
  /** Icono de Leo con notificación */
  sugerencia_lista: 'sugerencia_lista',
  
  /** Estado neutral sin animación */
  inactivo: 'inactivo',
} as const;

/**
 * Descripciones visuales de los estados de IA
 * Fuente: UI_COMPONENTS.md - "Estados Visuales"
 */
export const DESCRIPCIONES_ESTADOS_IA = {
  [ESTADOS_INDICADOR_IA.analizando]: {
    visual: 'Barra de progreso circular pulsante',
    comportamiento: 'Análisis de patrones en curso',
  },
  [ESTADOS_INDICADOR_IA.procesando]: {
    visual: 'Spinner con colores gradientes', 
    comportamiento: 'Generando sugerencias',
  },
  [ESTADOS_INDICADOR_IA.sugerencia_lista]: {
    visual: 'Icono de Leo con notificación',
    comportamiento: 'Sugerencia lista para mostrar',
  },
  [ESTADOS_INDICADOR_IA.inactivo]: {
    visual: 'Estado neutral sin animación',
    comportamiento: 'IA en reposo',
  },
} as const;

// =============================================================================
// 💬 MENSAJES Y TEXTOS DOCUMENTADOS
// =============================================================================

/**
 * Botones y textos de interfaz documentados
 * Fuente: APP_BLUEPRINT.md
 */
export const TEXTOS_BOTONES = {
  /** Botón "¡Empezar!" prominente */
  empezar: '¡Empezar!',
  
  /** Botones: "Otra vez" / "Elegir nueva actividad" */
  otra_vez: 'Otra vez',
  elegir_nueva_actividad: 'Elegir nueva actividad',
  
  /** Opciones de pausa */
  continuar: 'Continuar',
  terminar_actividad: 'Terminar actividad',
  ir_rincon_calma: 'Ir al Rincón de Calma',
  
  /** Botón de actividad aleatoria */
  actividad_random: 'Actividad Random',
  
  /** Botón de comprensión */
  ya_entiendo: '¡Ya entiendo!',
} as const;

/**
 * Mensajes de ejemplo de sugerencias IA
 * Fuente: DESIGN_SYSTEM.md - Componente "Sugerencia Proactiva"
 */
export const MENSAJES_SUGERENCIAS_IA = {
  titulo_general: '¡Una idea de Leo!',
  
  /** Ejemplos de mensajes documentados */
  descanso: 'A Leo le apetece relajarse un poco. ¿Vamos a su Rincón de Calma?',
  
  /** Botones de acción para sugerencias */
  aceptar: '¡Vamos!',
  declinar: 'Ahora no',
} as const;

/**
 * Mensajes de celebración y recompensas
 * Fuente: APP_BLUEPRINT.md - "Recompensa de Actividad"
 */
export const MENSAJES_CELEBRACION = {
  /** Mensaje de felicitación personalizado */
  ejemplo_felicitacion: 'Mensaje de felicitación personalizado',
  
  /** Resumen de logros ("¡10 saltos perfectos!") */
  ejemplo_logro: '¡10 saltos perfectos!',
  
  /** Descripción de recompensas */
  recompensa_visual: 'estrella, medalla, pegatina',
} as const;

/**
 * Opciones de configuración textual
 * Fuente: APP_BLUEPRINT.md - "Pre-Actividad"
 */
export const TEXTOS_CONFIGURACION = {
  volumen: 'Volumen',
  duracion_corta: 'corta',
  duracion_normal: 'normal', 
  duracion_larga: 'larga',
  nivel_ayuda: 'Nivel de ayuda',
} as const;

// =============================================================================
// 🎮 TIPOS DE INTERACCIÓN - UI_COMPONENTS.md
// =============================================================================

/**
 * Tipos de interacción documentados
 * Fuente: UI_COMPONENTS.md - Interacciones
 */
export const TIPOS_INTERACCION = {
  /** Toque simple con feedback inmediato */
  tactil: {
    tipo: 'Táctil',
    descripcion: 'Toque simple con feedback inmediato',
  },
  
  /** Drag & drop con guías visuales */
  arrastrar: {
    tipo: 'Arrastrar',
    descripcion: 'Drag & drop con guías visuales',
  },
} as const;

// =============================================================================
// 🏆 TIPOS DE NOTIFICACIONES - UI_COMPONENTS.md
// =============================================================================

/**
 * Tipos de notificaciones del sistema
 * Fuente: UI_COMPONENTS.md - NotificacionSistema interface
 */
export const TIPOS_NOTIFICACION = {
  progreso: 'progreso',
  sugerencia: 'sugerencia', 
  logro: 'logro',
  recomendacion: 'recomendacion',
} as const;

// =============================================================================
// 🎨 COMPONENTES VISUALES DE ACTIVIDADES
// =============================================================================

/**
 * Elementos visuales de feedback documentados
 * Fuente: APP_BLUEPRINT.md - Actividad Principal
 */
export const ELEMENTOS_FEEDBACK_VISUAL = {
  /** Feedback visual inmediato (partículas, colores) */
  particulas: 'partículas',
  colores: 'colores',
  
  /** Animación de celebración de Leo */
  celebracion_leo: 'Animación de celebración de Leo',
  
  /** Recompensa visual (estrella, medalla, pegatina) */
  estrella: 'estrella',
  medalla: 'medalla', 
  pegatina: 'pegatina',
} as const;

/**
 * Opciones de relajación del Rincón de Calma
 * Fuente: APP_BLUEPRINT.md - "Rincón de Calma"
 */
export const OPCIONES_RINCON_CALMA = {
  /** Respiración guiada con Leo */
  respiracion_guiada: 'Respiración guiada con Leo',
  
  /** Sonidos de la naturaleza */
  sonidos_naturaleza: 'Sonidos de la naturaleza',
  
  /** Actividad táctil suave (burbujas, agua) */
  actividad_tactil_burbujas: 'burbujas',
  actividad_tactil_agua: 'agua',
} as const;

/**
 * Configuración de timers documentada
 * Fuente: APP_BLUEPRINT.md - "Timer configurable"
 */
export const OPCIONES_TIMER = {
  /** Timer configurable (2, 5, 10 minutos) */
  duraciones: [
    { minutos: 2, ms: 2 * 60 * 1000 },
    { minutos: 5, ms: 5 * 60 * 1000 },
    { minutos: 10, ms: 10 * 60 * 1000 },
  ],
} as const;

// =============================================================================
// 📊 MÉTRICAS DE ACTIVIDADES DOCUMENTADAS
// =============================================================================

/**
 * Métricas registradas en actividades
 * Fuente: APP_BLUEPRINT.md - descripción de actividades
 */
export const METRICAS_ACTIVIDADES = {
  /** Contador de saltos/interacciones */
  contador_interacciones: 'saltos/interacciones',
  
  /** Precisión, tiempo de respuesta, patrones de toque */
  precision: 'precisión',
  tiempo_respuesta: 'tiempo de respuesta', 
  patrones_toque: 'patrones de toque',
  
  /** Tolerancia alta a toques imprecisos */
  tolerancia: 'alta a toques imprecisos',
} as const;

// =============================================================================
// 🧮 FUNCIONES DE VALIDACIÓN DE CONTENIDO
// =============================================================================

/**
 * Valida si un estado emocional de Leo es válido
 */
export const esEstadoLeoValido = (estado: string): estado is keyof typeof ESTADOS_EMOCIONALES_LEO => {
  return Object.values(ESTADOS_EMOCIONALES_LEO).includes(estado as any);
};

/**
 * Valida si una animación de Leo es válida
 */
export const esAnimacionLeoValida = (animacion: string): animacion is keyof typeof ANIMACIONES_LEO => {
  return Object.values(ANIMACIONES_LEO).includes(animacion as any);
};

/**
 * Valida si un tipo de sugerencia IA es válido
 */
export const esTipoSugerenciaValido = (tipo: string): tipo is keyof typeof TIPOS_SUGERENCIAS_IA => {
  return Object.values(TIPOS_SUGERENCIAS_IA).includes(tipo as any);
};

/**
 * Valida si un estado de IA es válido
 */
export const esEstadoIAValido = (estado: string): estado is keyof typeof ESTADOS_INDICADOR_IA => {
  return Object.values(ESTADOS_INDICADOR_IA).includes(estado as any);
};

/**
 * Obtiene la duración de una animación en ms
 */
export const obtenerDuracionAnimacion = (animacion: keyof typeof ANIMACIONES_LEO): number => {
  return ESPECIFICACIONES_ANIMACIONES[animacion]?.duracion || 2000;
};

/**
 * Obtiene las opciones de timer en ms para una duración en minutos
 */
export const obtenerTimerPorMinutos = (minutos: number): number | null => {
  const opcion = OPCIONES_TIMER.duraciones.find(d => d.minutos === minutos);
  return opcion?.ms || null;
};

/**
 * Obtiene el área sensorial de una isla temática
 */
export const obtenerAreaSensorialPorIsla = (islaId: string): string | null => {
  const isla = Object.values(ISLAS_TEMATICAS).find(i => i.id === islaId);
  return isla?.tipoSensorial || null;
};

// =============================================================================
// 📋 EXPORT CONSOLIDADO
// =============================================================================

/**
 * Exportación consolidada de todo el contenido centralizado
 * ⚠️ IMPORTANTE: Todo el contenido es extraído DIRECTAMENTE de la documentación
 * ❌ PROHIBIDO modificar sin actualizar documentos oficiales primero
 */
export const CONTENIDO_CENTRALIZADO = {
  estadosEmocionales: ESTADOS_EMOCIONALES_LEO,
  descripcionesEstados: DESCRIPCIONES_ESTADOS_LEO,
  animaciones: ANIMACIONES_LEO,
  especificacionesAnimaciones: ESPECIFICACIONES_ANIMACIONES,
  islasTematicas: ISLAS_TEMATICAS,
  areasSensoriales: AREAS_SENSORIALES,
  actividadEjemplo: ACTIVIDAD_EJEMPLO,
  tiposSugerenciasIA: TIPOS_SUGERENCIAS_IA,
  especificacionesSugerencias: ESPECIFICACIONES_SUGERENCIAS,
  estadosIndicadorIA: ESTADOS_INDICADOR_IA,
  descripcionesEstadosIA: DESCRIPCIONES_ESTADOS_IA,
  textosBotones: TEXTOS_BOTONES,
  mensajesSugerenciasIA: MENSAJES_SUGERENCIAS_IA,
  mensajesCelebracion: MENSAJES_CELEBRACION,
  textosConfiguracion: TEXTOS_CONFIGURACION,
  tiposInteraccion: TIPOS_INTERACCION,
  tiposNotificacion: TIPOS_NOTIFICACION,
  elementosFeedbackVisual: ELEMENTOS_FEEDBACK_VISUAL,
  opcionesRinconCalma: OPCIONES_RINCON_CALMA,
  opcionesTimer: OPCIONES_TIMER,
  metricasActividades: METRICAS_ACTIVIDADES,
} as const;

export type ContenidoCentralizado = typeof CONTENIDO_CENTRALIZADO;