/**
 * AnalyticsService - Seguimiento de eventos y progreso
 * Basado en: PROJECT_REQUIREMENTS.md RF-004 (Portal para padres con seguimiento)
 *
 * IMPORTANTE: Envía datos de interacción para análisis y generación de insights
 * Según PROJECT_REQUIREMENTS.md RNF-012: Datos anonimizados para análisis de IA
 */

import FirebaseService from './FirebaseService';
import type {
  SesionActividad,
  InteraccionActividad,
  ProgresoNiño,
} from '../types';

/**
 * Servicio de Analytics para tracking de eventos
 * Según TECHNOLOGY.md línea 87: "Envía datos de juego para análisis"
 */
class AnalyticsService {
  private static instance: AnalyticsService;
  private contadorInteracciones = 0;

  private constructor() {}

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  /**
   * Registra el inicio de una sesión de actividad
   * Según PROJECT_REQUIREMENTS.md RF-004: Sistema de seguimiento de progreso
   */
  public async logActividadIniciada(
    perfilId: string,
    actividadId: string,
    dificultad: string
  ): Promise<void> {
    try {
      const analytics = FirebaseService.getAnalytics();
      await analytics().logEvent('actividad_iniciada', {
        perfil_id: perfilId,
        actividad_id: actividadId,
        dificultad,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error('Error logging actividad iniciada:', error);
    }
  }

  /**
   * Registra la completación de una actividad
   * Según PROJECT_REQUIREMENTS.md CA-002: Tiempo promedio de sesión 10-20 min
   */
  public async logActividadCompletada(
    sesion: SesionActividad
  ): Promise<void> {
    try {
      const analytics = FirebaseService.getAnalytics();
      const duracionMinutos = sesion.duracionReal / 60;

      await analytics().logEvent('actividad_completada', {
        perfil_id: sesion.usuarioId,
        actividad_id: sesion.actividadId,
        duracion_segundos: sesion.duracionReal,
        duracion_minutos: duracionMinutos,
        progreso: sesion.progreso,
        interacciones_totales: sesion.interacciones.length,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error('Error logging actividad completada:', error);
    }
  }

  /**
   * Registra una interacción individual durante una actividad
   * Según PROJECT_REQUIREMENTS.md RF-IA-001: Análisis de patrones en tiempo real
   */
  public async logInteraccion(
    perfilId: string,
    actividadId: string,
    interaccion: InteraccionActividad
  ): Promise<void> {
    try {
      // Solo loggear interacciones importantes para no saturar
      // Según PROJECT_REQUIREMENTS.md RNF-006: Consumo de batería optimizado
      this.contadorInteracciones++;
      const debeLoggear = interaccion.exitosa || this.contadorInteracciones % 10 === 0;

      if (debeLoggear) {
        const analytics = FirebaseService.getAnalytics();
        await analytics().logEvent('interaccion_usuario', {
          perfil_id: perfilId,
          actividad_id: actividadId,
          tipo: interaccion.tipo,
          exitosa: interaccion.exitosa,
          precision: interaccion.precision,
          tiempo_respuesta: interaccion.tiempoRespuesta,
        });
      }
    } catch (error) {
      console.error('Error logging interacción:', error);
    }
  }

  /**
   * Registra progreso general del niño
   * Según PROJECT_REQUIREMENTS.md RF-004: Dashboard con métricas
   */
  public async logProgreso(progreso: ProgresoNiño): Promise<void> {
    try {
      const analytics = FirebaseService.getAnalytics();
      await analytics().logEvent('progreso_actualizado', {
        perfil_id: progreso.perfilId,
        actividades_completadas: progreso.actividadesCompletadas,
        tiempo_total_minutos: progreso.tiempoTotal,
        racha_dias: progreso.rachaActual,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error('Error logging progreso:', error);
    }
  }

  /**
   * Registra sugerencia de IA aceptada o rechazada
   * Según PROJECT_REQUIREMENTS.md RF-IA-002: Sugerencias proactivas
   */
  public async logSugerenciaIA(
    perfilId: string,
    sugerenciaId: string,
    tipo: string,
    aceptada: boolean
  ): Promise<void> {
    try {
      const analytics = FirebaseService.getAnalytics();
      await analytics().logEvent('sugerencia_ia', {
        perfil_id: perfilId,
        sugerencia_id: sugerenciaId,
        tipo_sugerencia: tipo,
        aceptada,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error('Error logging sugerencia IA:', error);
    }
  }

  /**
   * Registra uso del Rincón de Calma
   * Según PROJECT_REQUIREMENTS.md RF-007: Rincón de calma para autorregulación
   */
  public async logRinconCalma(
    perfilId: string,
    duracionSegundos: number,
    activadoPor: 'usuario' | 'ia'
  ): Promise<void> {
    try {
      const analytics = FirebaseService.getAnalytics();
      await analytics().logEvent('rincon_calma', {
        perfil_id: perfilId,
        duracion_segundos: duracionSegundos,
        activado_por: activadoPor,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error('Error logging rincón calma:', error);
    }
  }

  /**
   * Registra error de la aplicación
   * Según PROJECT_REQUIREMENTS.md CA-005: Cero crashes críticos
   */
  public async logError(
    error: Error,
    contexto: string,
    severidad: 'low' | 'medium' | 'high' | 'critical'
  ): Promise<void> {
    try {
      const crashlytics = FirebaseService.getCrashlytics();

      // Registrar en Crashlytics según severidad
      await crashlytics().log(`[${severidad.toUpperCase()}] ${contexto}: ${error.message}`);

      if (severidad === 'critical') {
        await crashlytics().recordError(error);
      }

      // También en Analytics para métricas
      const analytics = FirebaseService.getAnalytics();
      await analytics().logEvent('error_app', {
        contexto,
        severidad,
        mensaje: error.message,
        timestamp: Date.now(),
      });
    } catch (e) {
      console.error('Error logging error:', e);
    }
  }

  /**
   * Establece propiedades de usuario para analytics
   * Según PROJECT_REQUIREMENTS.md RNF-012: Datos anonimizados
   */
  public async setUserProperties(
    perfilId: string,
    edad: number,
    nivelDesarrollo: string
  ): Promise<void> {
    try {
      const analytics = FirebaseService.getAnalytics();

      // NO enviamos datos personales, solo metadatos anonimizados
      // Según PROJECT_REQUIREMENTS.md RNF-009: Cumplimiento GDPR
      await analytics().setUserProperty('edad_grupo', this.getGrupoEdad(edad));
      await analytics().setUserProperty('nivel_desarrollo', nivelDesarrollo);
      await analytics().setUserId(perfilId); // ID anonimizado
    } catch (error) {
      console.error('Error setting user properties:', error);
    }
  }

  /**
   * Agrupa edades para anonimización
   * Según PROJECT_REQUIREMENTS.md: Población 3-12 años
   */
  private getGrupoEdad(edad: number): string {
    if (edad < 5) return '3-4';
    if (edad < 7) return '5-6';
    if (edad < 9) return '7-8';
    if (edad < 11) return '9-10';
    return '11-12';
  }
}

export default AnalyticsService.getInstance();
