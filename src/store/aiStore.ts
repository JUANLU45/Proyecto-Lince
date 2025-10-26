/**
 * AIStore - Store de Zustand para gestión del estado de IA
 * Basado en: PROJECT_REQUIREMENTS.md RF-IA-001 a RF-IA-005
 *
 * IMPORTANTE: Gestiona sugerencias, insights y estado de procesamiento de IA
 * Según TECHNOLOGY.md línea 90: aiStore.ts para estado de IA
 */

import { create } from 'zustand';
import type {
  SugerenciaIA,
  InsightPadres,
  ConfiguracionIA,
  EstadoProcesamientoIA,
  PatronInteraccion,
} from '../types';

/**
 * Interface del store de IA
 * Según PROJECT_REQUIREMENTS.md RF-IA: Funcionalidades de IA
 */
interface AIState {
  // Estado de sugerencias
  sugerenciaActual: SugerenciaIA | null;
  historialSugerencias: SugerenciaIA[];
  sugerenciaVisible: boolean;

  // Estado de insights
  insightsPendientes: InsightPadres[];
  insightsLeidos: string[]; // IDs de insights ya leídos

  // Estado de procesamiento
  estadoProcesamiento: EstadoProcesamientoIA;

  // Configuración de IA
  configuracion: ConfiguracionIA | null;

  // Patrones de interacción recientes
  patronesRecientes: PatronInteraccion[];

  // Métricas de comportamiento actual
  nivelFrustracionActual: number; // 0-100
  nivelEngagementActual: number; // 0-100

  // Acciones para sugerencias
  setSugerenciaActual: (sugerencia: SugerenciaIA | null) => void;
  mostrarSugerencia: () => void;
  ocultarSugerencia: () => void;
  aceptarSugerencia: (sugerenciaId: string) => void;
  rechazarSugerencia: (sugerenciaId: string) => void;
  agregarSugerencia: (sugerencia: SugerenciaIA) => void;

  // Acciones para insights
  setInsights: (insights: InsightPadres[]) => void;
  agregarInsight: (insight: InsightPadres) => void;
  marcarInsightLeido: (insightId: string) => void;
  limpiarInsightsLeidos: () => void;

  // Acciones para procesamiento
  setEstadoProcesamiento: (estado: EstadoProcesamientoIA) => void;
  iniciarProcesamiento: (etapa: string) => void;
  actualizarProgresoProcesamiento: (progreso: number) => void;
  finalizarProcesamiento: () => void;
  errorProcesamiento: (mensaje: string) => void;

  // Acciones para configuración
  setConfiguracion: (config: ConfiguracionIA) => void;
  actualizarConfiguracion: (configParcial: Partial<ConfiguracionIA>) => void;

  // Acciones para patrones
  agregarPatron: (patron: PatronInteraccion) => void;
  limpiarPatrones: () => void;

  // Acciones para métricas
  setNivelFrustracion: (nivel: number) => void;
  setNivelEngagement: (nivel: number) => void;

  // Reset
  reset: () => void;
}

/**
 * Estado inicial del store
 */
const estadoInicial = {
  sugerenciaActual: null,
  historialSugerencias: [],
  sugerenciaVisible: false,
  insightsPendientes: [],
  insightsLeidos: [],
  estadoProcesamiento: {
    procesando: false,
    progreso: 0,
    etapaActual: 'inicial',
  },
  configuracion: null,
  patronesRecientes: [],
  nivelFrustracionActual: 0,
  nivelEngagementActual: 0,
};

/**
 * Store de Zustand para IA
 * Según PROJECT_REQUIREMENTS.md RF-IA-002: Sugerencias proactivas
 */
export const useAIStore = create<AIState>((set) => ({
  ...estadoInicial,

  // Establece la sugerencia actual
  // Según PROJECT_REQUIREMENTS.md RF-IA-002: Sugerencias proactivas
  setSugerenciaActual: (sugerencia) => set({ sugerenciaActual: sugerencia }),

  // Muestra la sugerencia actual al usuario
  mostrarSugerencia: () => set({ sugerenciaVisible: true }),

  // Oculta la sugerencia actual
  ocultarSugerencia: () => set({ sugerenciaVisible: false }),

  // Acepta y procesa una sugerencia
  aceptarSugerencia: (_sugerenciaId) =>
    set((state) => {
      const sugerenciaActualizada = state.sugerenciaActual
        ? { ...state.sugerenciaActual, aceptada: true }
        : null;

      return {
        sugerenciaActual: null,
        sugerenciaVisible: false,
        historialSugerencias: sugerenciaActualizada
          ? [...state.historialSugerencias, sugerenciaActualizada]
          : state.historialSugerencias,
      };
    }),

  // Rechaza una sugerencia
  rechazarSugerencia: (_sugerenciaId) =>
    set((state) => {
      const sugerenciaActualizada = state.sugerenciaActual
        ? { ...state.sugerenciaActual, aceptada: false }
        : null;

      return {
        sugerenciaActual: null,
        sugerenciaVisible: false,
        historialSugerencias: sugerenciaActualizada
          ? [...state.historialSugerencias, sugerenciaActualizada]
          : state.historialSugerencias,
      };
    }),

  // Agrega una nueva sugerencia
  agregarSugerencia: (sugerencia) =>
    set((state) => ({
      sugerenciaActual: sugerencia,
      historialSugerencias: [...state.historialSugerencias, sugerencia],
    })),

  // Establece lista de insights
  // Según PROJECT_REQUIREMENTS.md RF-IA-004: Insights para padres
  setInsights: (insights) => set({ insightsPendientes: insights }),

  // Agrega un nuevo insight
  agregarInsight: (insight) =>
    set((state) => ({
      insightsPendientes: [...state.insightsPendientes, insight],
    })),

  // Marca un insight como leído
  marcarInsightLeido: (insightId) =>
    set((state) => ({
      insightsLeidos: [...state.insightsLeidos, insightId],
      insightsPendientes: state.insightsPendientes.filter(
        (i) => i.id !== insightId
      ),
    })),

  // Limpia historial de insights leídos
  limpiarInsightsLeidos: () => set({ insightsLeidos: [] }),

  // Establece estado de procesamiento
  setEstadoProcesamiento: (estado) => set({ estadoProcesamiento: estado }),

  // Inicia procesamiento de IA
  // Según PROJECT_REQUIREMENTS.md CA-IA-002: < 2 segundos respuesta
  iniciarProcesamiento: (etapa) =>
    set({
      estadoProcesamiento: {
        procesando: true,
        progreso: 0,
        etapaActual: etapa,
      },
    }),

  // Actualiza progreso de procesamiento
  actualizarProgresoProcesamiento: (progreso) =>
    set((state) => ({
      estadoProcesamiento: {
        ...state.estadoProcesamiento,
        progreso,
      },
    })),

  // Finaliza procesamiento exitosamente
  finalizarProcesamiento: () =>
    set({
      estadoProcesamiento: {
        procesando: false,
        progreso: 100,
        etapaActual: 'completado',
      },
    }),

  // Error en procesamiento
  errorProcesamiento: (mensaje) =>
    set({
      estadoProcesamiento: {
        procesando: false,
        progreso: 0,
        etapaActual: 'error',
        error: mensaje,
      },
    }),

  // Establece configuración de IA
  // Según PROJECT_REQUIREMENTS.md RF-IA-003: Adaptación automática
  setConfiguracion: (config) => set({ configuracion: config }),

  // Actualiza configuración parcialmente
  actualizarConfiguracion: (configParcial) =>
    set((state) => ({
      configuracion: state.configuracion
        ? { ...state.configuracion, ...configParcial }
        : null,
    })),

  // Agrega patrón de interacción
  // Según PROJECT_REQUIREMENTS.md RF-IA-001: Análisis de patrones
  agregarPatron: (patron) =>
    set((state) => {
      // Mantener solo los últimos 10 patrones para no saturar memoria
      const nuevosPatrones = [...state.patronesRecientes, patron].slice(-10);
      return { patronesRecientes: nuevosPatrones };
    }),

  // Limpia patrones antiguos
  limpiarPatrones: () => set({ patronesRecientes: [] }),

  // Establece nivel de frustración actual
  // Usado para decisiones de sugerencias proactivas
  setNivelFrustracion: (nivel) =>
    set({ nivelFrustracionActual: Math.min(100, Math.max(0, nivel)) }),

  // Establece nivel de engagement actual
  setNivelEngagement: (nivel) =>
    set({ nivelEngagementActual: Math.min(100, Math.max(0, nivel)) }),

  // Resetea todo el store
  reset: () => set(estadoInicial),
}));

export default useAIStore;
