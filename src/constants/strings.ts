/**
 * Textos y strings de la aplicación - Proyecto Lince
 * Basado en: APP_BLUEPRINT.md y PROJECT_REQUIREMENTS.md
 *
 * Centralización de todos los textos para facilitar:
 * - Mantenimiento
 * - Consistencia
 * - Futura internacionalización (i18n)
 */

export const strings = {
  // ========================================
  // STRINGS COMUNES Y REUTILIZABLES
  // ========================================

  common: {
    cargando: 'Cargando...',
    cancelar: 'Cancelar',
    aceptar: 'Aceptar',
    guardar: 'Guardar',
    cerrar: 'Cerrar',
    tiempoEstimado: 'Tiempo estimado',
  },

  // ========================================
  // PANTALLAS PRINCIPALES
  // ========================================

  splash: {
    loading: 'Cargando...',
  },

  bienvenida: {
    titulo: '¡Hola! Soy Leo el Lince',
    subtitulo: 'Vamos a jugar y aprender juntos',
    empezar: '¡Empezar!',
  },

  tutorial: {
    titulo: 'Aprende a jugar',
    siguiente: 'Siguiente',
    saltar: 'Saltar tutorial',
    finalizar: '¡Entendido!',
  },

  // ========================================
  // MAPA DEL MUNDO (Pantalla Principal)
  // ========================================

  mapa: {
    titulo: 'El Mundo de Leo',
    islas: {
      movimiento: {
        nombre: 'Isla del Movimiento',
        descripcion: 'Salta, baila y muévete con Leo',
      },
      musical: {
        nombre: 'Isla Musical',
        descripcion: 'Escucha y crea sonidos divertidos',
      },
      tactil: {
        nombre: 'Jardín Táctil',
        descripcion: 'Toca y siente diferentes texturas',
      },
      visual: {
        nombre: 'Estudio de Arte',
        descripcion: 'Explora colores y formas',
      },
      calma: {
        nombre: 'Rincón de Calma',
        descripcion: 'Relájate y respira tranquilo',
      },
    },
  },

  // ========================================
  // ACTIVIDADES
  // ========================================

  actividades: {
    titulo: 'Elige una actividad',
    actividadRandom: '¡Sorpréndeme!',
    comenzar: '¡Empezar!',
    pausar: 'Pausar',
    continuar: 'Continuar',
    terminar: 'Terminar',
    volverIntentar: 'Volver a intentar',
    vistaPrevia: 'Vista previa',
    completada: '✓ Completada',
    noActividades: 'No hay actividades disponibles',

    // Botones de configuración
    configuracion: {
      titulo: 'Configuración',
      volumen: 'Volumen',
      duracion: 'Duración',
      ayuda: 'Nivel de ayuda',
    },

    // Mensajes de retroalimentación
    feedback: {
      excelente: '¡Excelente!',
      muybien: '¡Muy bien!',
      genial: '¡Genial!',
      sigue: '¡Sigue así!',
      loLograste: '¡Lo lograste!',
      intenta: '¡Inténtalo de nuevo!',
    },
  },

  // ========================================
  // RINCÓN DE CALMA
  // ========================================

  rinconCalma: {
    titulo: 'Rincón de Calma',
    mensaje: 'Vamos a respirar juntos',
    instruccion: 'Sigue a Leo',
    listo: 'Ya estoy mejor',
    quedarse: 'Quedarme un poco más',
    respira: 'Respira',
  },

  // ========================================
  // SISTEMA DE RECOMPENSAS
  // ========================================

  recompensas: {
    titulo: '¡Felicitaciones!',
    completaste: '¡Completaste la actividad!',
    ganaste: 'Ganaste',
    estrella: 'estrella',
    estrellas: 'estrellas',
    insignia: 'insignia nueva',
    continuar: 'Continuar',
    tiempo: 'Tiempo',
  },

  // ========================================
  // PORTAL DE PADRES
  // ========================================

  portalPadres: {
    titulo: 'Portal de Padres',
    bienvenida: 'Bienvenido/a',

    // Secciones
    progreso: {
      titulo: 'Progreso',
      tiempoHoy: 'Tiempo hoy',
      actividadesCompletadas: 'Actividades completadas',
      rachaActual: 'Racha actual',
      dias: 'días',
    },

    resumenSemanal: {
      titulo: 'Resumen Semanal',
      actividadesCompletadas: 'Actividades',
      tiempoTotal: 'Tiempo',
      rachaDias: 'Racha',
      logros: 'Logros',
    },

    insights: {
      titulo: 'Insights de IA',
      verMas: 'Ver más',
      noDisponible: 'No hay insights disponibles aún',
    },

    misionesReales: {
      titulo: 'Misiones del Mundo Real',
      asignar: 'Asignar misión',
      completar: 'Marcar como completada',
    },

    configuracion: {
      titulo: 'Configuración',
      perfil: 'Perfil del niño',
      objetivos: 'Objetivos terapéuticos',
      exportar: 'Exportar datos',
      ayuda: 'Ayuda',
    },

    // Panel Administrativo
    admin: {
      titulo: 'Panel Administrativo',
      acceso: 'Administración',
      metricas: 'Métricas del Sistema',
      banners: 'Gestión de Banners',
      usuarios: 'Usuarios',
      logs: 'Logs de Auditoría',
      sinPermiso: 'No tienes permisos para acceder',
    },
  },

  // ========================================
  // SUGERENCIAS DE IA
  // ========================================

  ia: {
    sugerencias: {
      titulo: '¡Una idea de Leo!',
      descanso: 'Parece que necesitas un pequeño descanso. ¿Vamos al Rincón de Calma?',
      descansoCorto: 'Considera tomar un descanso',
      cambioActividad: 'Quizás te guste probar esta otra actividad',
      celebracion: '¡Estás haciendo un trabajo increíble hoy!',
      razonamientoLocal: 'Nivel de frustración detectado por análisis local',
      aceptar: '¡Sí, vamos!',
      rechazar: 'Ahora no',
      cerrar: 'Cerrar',
    },

    insights: {
      progreso: 'Progreso destacado',
      sugerencia: 'Sugerencia',
      alerta: 'Atención',
      celebracion: '¡Celebración!',
    },
  },

  // ========================================
  // ERRORES Y MENSAJES DEL SISTEMA
  // ========================================

  errores: {
    general: 'Algo salió mal. Por favor, intenta de nuevo.',
    conexion: 'No hay conexión a internet',
    timeout: 'La operación tardó demasiado',
    noEncontrado: 'No encontrado',
    permisos: 'No tienes permisos para esta acción',
    reintentar: 'Reintentar',
    cancelar: 'Cancelar',
  },

  // ========================================
  // NAVEGACIÓN
  // ========================================

  navegacion: {
    inicio: 'Inicio',
    actividades: 'Actividades',
    progreso: 'Progreso',
    perfil: 'Perfil',
    volver: 'Volver',
    cerrar: 'Cerrar',
  },

  // ========================================
  // ACCESIBILIDAD (Labels para screen readers)
  // ========================================

  accesibilidad: {
    botonIniciar: 'Botón para iniciar actividad',
    botonPausar: 'Botón para pausar',
    botonCerrar: 'Botón para cerrar',
    botonVolver: 'Botón para volver atrás',
    avatarLeo: 'Leo el Lince',
    barraProgreso: 'Barra de progreso',
    menu: 'Menú principal',
    areaInteractiva: 'Área interactiva',
    tocarAquiInteractuar: 'Toca aquí para interactuar',
    feedback: 'Feedback',
    porCiento: 'por ciento',
    insight: 'Insight',
    procesandoIA: 'Procesando con IA',
  },

  // ========================================
  // CONFIGURACIÓN Y PREFERENCIAS
  // ========================================

  configuracion: {
    titulo: 'Configuración',
    perfil: {
      titulo: 'Perfil',
      nombre: 'Nombre',
      edad: 'Edad',
      foto: 'Foto de perfil',
    },
    preferencias: {
      titulo: 'Preferencias',
      volumen: 'Volumen',
      notificaciones: 'Notificaciones',
      modoOscuro: 'Modo oscuro',
    },
    guardar: 'Guardar cambios',
    cancelar: 'Cancelar',
  },

  // ========================================
  // TIEMPO Y FECHAS
  // ========================================

  tiempo: {
    segundos: 'segundos',
    minutos: 'minutos',
    minuto: 'minuto',
    horas: 'horas',
    dias: 'días',
    hoy: 'Hoy',
    ayer: 'Ayer',
    hace: 'Hace',
    restantes: 'restantes',
    estaSemana: 'Esta semana',
  },

  // ========================================
  // MONETIZACIÓN
  // ========================================

  premium: {
    titulo: '¡Desbloquea más!',
    descripcion: 'Accede a características premium',
    caracteristicas: [
      'IA completa 24/7',
      'Informes avanzados',
      'Actividades ilimitadas',
      'Sin anuncios',
    ],
    precio: '$4.99/mes',
    suscribir: 'Suscribirse',
    masTarde: 'Más tarde',
  },
} as const;

export default strings;

// Type export para TypeScript
export type Strings = typeof strings;
