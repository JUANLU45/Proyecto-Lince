/**
 * AIService - Servicio de Inteligencia Artificial Multimodal
 * Basado en: PROJECT_REQUIREMENTS.md RF-IA-001 a RF-IA-005
 *
 * IMPORTANTE: Motor de IA adapt según TECHNOLOGY.md línea 88: "Comunica con la IA"
 * Implementa análisis multimodal: voz, gestos, facial
 * Según TECHNOLOGY.md: YOLOv8, MediaPipe, DS-CNN con exportación ONNX
 */

import FirebaseService from './FirebaseService';
import { strings } from '../constants';
import type {
  SugerenciaIA,
  InsightPadres,
  PatronInteraccion,
  DatosAnalisis,
  ConfiguracionIA,
  TerapeutaVirtual,
  EstadoProcesamientoIA,
} from '../types';

/**
 * Clase principal del servicio de IA
 * Según PROJECT_REQUIREMENTS.md RF-003: Motor de IA adaptativo
 */
class AIService {
  private static instance: AIService;
  private configuracion: ConfiguracionIA;
  private procesamientoActivo: EstadoProcesamientoIA;

  private constructor() {
    // Configuración por defecto según PROJECT_REQUIREMENTS.md RF-IA-003
    this.configuracion = {
      adaptacionAutomatica: true,
      frecuenciaAnalisis: 60, // Cada minuto según PROJECT_REQUIREMENTS: adaptación en tiempo real
      umbralesFrustracion: {
        bajo: 30,
        medio: 60,
        alto: 80,
      },
      umbralConfianza: 70, // 70% mínimo de confianza para aceptar predicciones
      terapeutasActivos: ['analistaVoz', 'analistaGestos', 'analistaFacial'], // Los 3 terapeutas según RF-IA-004
      modoOffline: false,
    };

    this.procesamientoActivo = {
      procesando: false,
      progreso: 0,
      etapaActual: 'inicial',
    };
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  /**
   * Analiza un patrón de interacción y genera insights
   * Según PROJECT_REQUIREMENTS.md RF-IA-001: Análisis de patrones en tiempo real
   */
  public async analizarPatron(
    patron: PatronInteraccion
  ): Promise<{ sugerencias: string[]; nivelFrustracion: number; nivelEngagement: number }> {
    try {
      this.procesamientoActivo = {
        procesando: true,
        progreso: 0,
        etapaActual: 'analizando_patron',
      };

      // Delegar a Cloud Function según TECHNOLOGY.md
      const functionsInstance = FirebaseService.getFunctions();
      const analizarPatronFn = functionsInstance().httpsCallable('analizarPatron');

      this.procesamientoActivo.progreso = 50;

      const resultado = await analizarPatronFn({
        tipo: patron.tipo,
        datos: patron.datos,
        confianza: patron.confianza,
        timestamp: patron.timestamp,
      });

      this.procesamientoActivo.progreso = 100;
      this.procesamientoActivo.procesando = false;

      return resultado.data as {
        sugerencias: string[];
        nivelFrustracion: number;
        nivelEngagement: number;
      };
    } catch (error) {
      this.procesamientoActivo.procesando = false;
      this.procesamientoActivo.error = 'Error al analizar patrón';

      // Fallback local básico si falla la IA en cloud
      return this.analisisLocalFallback(patron);
    }
  }

  /**
   * Genera una sugerencia proactiva basada en comportamiento
   * Según PROJECT_REQUIREMENTS.md RF-IA-002: Sugerencias proactivas basadas en comportamiento no verbal
   */
  public async generarSugerencia(
    perfilId: string,
    contexto: {
      actividadActual?: string;
      tiempoEnActividad: number; // segundos
      nivelFrustracion: number; // 0-100
      interaccionesRecientes: number;
    }
  ): Promise<SugerenciaIA | null> {
    try {
      // No generar sugerencias si no hay indicios de necesidad
      if (contexto.nivelFrustracion < this.configuracion.umbralesFrustracion.bajo) {
        return null;
      }

      const functionsInstance = FirebaseService.getFunctions();
      const generarSugerenciaFn = functionsInstance().httpsCallable('generarSugerencia');

      const resultado = await generarSugerenciaFn({
        perfilId,
        contexto,
        umbrales: this.configuracion.umbralesFrustracion,
      });

      return resultado.data as SugerenciaIA;
    } catch (error) {
      // Fallback: Sugerencia básica si frustración alta
      if (contexto.nivelFrustracion >= this.configuracion.umbralesFrustracion.alto) {
        return this.generarSugerenciaFallback(perfilId, contexto);
      }

      return null;
    }
  }

  /**
   * Adapta automáticamente la dificultad de actividades
   * Según PROJECT_REQUIREMENTS.md RF-IA-003: Adaptación automática de dificultad
   */
  public async adaptarDificultad(
    actividadId: string,
    rendimientoReciente: {
      tasaExito: number; // 0-100
      tiempoPromedio: number; // segundos
      intentosPromedio: number;
    }
  ): Promise<'bajar' | 'mantener' | 'subir'> {
    try {
      // Lógica de adaptación según rendimiento
      // Según PROJECT_REQUIREMENTS.md CA-IA-003: Personalización efectiva después de 5 sesiones

      if (rendimientoReciente.tasaExito < 40) {
        // Demasiado difícil
        return 'bajar';
      }

      if (rendimientoReciente.tasaExito > 85 && rendimientoReciente.intentosPromedio < 2) {
        // Demasiado fácil
        return 'subir';
      }

      return 'mantener';
    } catch (error) {
      return 'mantener';
    }
  }

  /**
   * Genera insights para padres
   * Según PROJECT_REQUIREMENTS.md RF-IA-004: Generación de insights para padres
   */
  public async generarInsights(
    perfilId: string,
    periodo: 'dia' | 'semana' | 'mes'
  ): Promise<InsightPadres[]> {
    try {
      const functionsInstance = FirebaseService.getFunctions();
      const generarInsightsFn = functionsInstance().httpsCallable('generarInsights');

      const resultado = await generarInsightsFn({
        perfilId,
        periodo,
        terapeutasActivos: this.configuracion.terapeutasActivos,
      });

      return resultado.data as InsightPadres[];
    } catch (error) {
      return [];
    }
  }

  /**
   * Procesa análisis multimodal (voz, gestos, facial)
   * Según PROJECT_REQUIREMENTS.md RF-IA-005: Reconocimiento multimodal
   * Según TECHNOLOGY.md: YOLOv8 para faciales, MediaPipe para gestos, MFCC para voz
   */
  public async procesarAnalisisMultimodal(
    datos: DatosAnalisis,
    terapeuta: TerapeutaVirtual
  ): Promise<PatronInteraccion> {
    try {
      this.procesamientoActivo = {
        procesando: true,
        progreso: 0,
        etapaActual: `procesando_${terapeuta}`,
      };

      const functionsInstance = FirebaseService.getFunctions();
      const procesarMultimodalFn = functionsInstance().httpsCallable('procesarMultimodal');

      this.procesamientoActivo.progreso = 30;

      const resultado = await procesarMultimodalFn({
        datos,
        terapeuta,
        umbralConfianza: this.configuracion.umbralConfianza,
      });

      this.procesamientoActivo.progreso = 100;
      this.procesamientoActivo.procesando = false;

      return resultado.data as PatronInteraccion;
    } catch (error) {
      this.procesamientoActivo.procesando = false;
      this.procesamientoActivo.error = 'Error en procesamiento multimodal';

      // Retornar patrón básico en caso de error
      return {
        tipo: datos.tipo,
        datos,
        timestamp: new Date(),
        confianza: 0,
        procesadoPor: 'fallback_local',
      };
    }
  }

  /**
   * Actualiza configuración de IA
   * Según PROJECT_REQUIREMENTS.md RF-IA-003: Motor configurable
   */
  public actualizarConfiguracion(
    configuracionParcial: Partial<ConfiguracionIA>
  ): void {
    this.configuracion = {
      ...this.configuracion,
      ...configuracionParcial,
    };
  }

  /**
   * Obtiene configuración actual
   */
  public getConfiguracion(): ConfiguracionIA {
    return { ...this.configuracion };
  }

  /**
   * Obtiene estado de procesamiento actual
   */
  public getEstadoProcesamiento(): EstadoProcesamientoIA {
    return { ...this.procesamientoActivo };
  }

  /**
   * Análisis local básico como fallback
   * Cuando no hay conexión o falla el servicio cloud
   * Según PROJECT_REQUIREMENTS.md RES-002: Fallback local
   */
  private analisisLocalFallback(patron: PatronInteraccion): {
    sugerencias: string[];
    nivelFrustracion: number;
    nivelEngagement: number;
  } {
    // Análisis muy básico local
    const nivelFrustracion = patron.confianza < 50 ? 60 : 30;
    const nivelEngagement = patron.confianza > 70 ? 80 : 50;
    const sugerencias: string[] = [];

    if (nivelFrustracion > 60) {
      sugerencias.push(strings.ia.sugerencias.descansoCorto);
    }

    return {
      sugerencias,
      nivelFrustracion,
      nivelEngagement,
    };
  }

  /**
   * Genera sugerencia básica como fallback
   */
  private generarSugerenciaFallback(
    perfilId: string,
    contexto: { nivelFrustracion: number; tiempoEnActividad: number }
  ): SugerenciaIA {
    return {
      id: `fallback-${Date.now()}`,
      tipo: 'rincón_calma',
      titulo: strings.ia.sugerencias.titulo,
      descripcion: strings.ia.sugerencias.descanso,
      prioridad: contexto.nivelFrustracion > 80 ? 'alta' : 'media',
      timestamp: new Date(),
      razonamiento: strings.ia.sugerencias.razonamientoLocal,
      terapeuta: 'analistaGestos',
    };
  }
}

export default AIService.getInstance();
