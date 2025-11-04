/**
 * PerfilStore - Store de Zustand para gestión de perfiles de usuario
 * Basado en: PROJECT_REQUIREMENTS.md RF-001 (Perfiles personalizados)
 *
 * IMPORTANTE: Gestiona el estado de perfiles de niños y padres
 * Según TECHNOLOGY.md: Zustand 4.4.1 para gestión de estado
 */

import { create } from 'zustand';
import type {
  PerfilNiño,
  PerfilPadre,
  ProgresoNiño,
  ConfiguracionPerfil,
} from '../types';

/**
 * Interface del store de perfiles
 * Según PROJECT_REQUIREMENTS.md RF-001: Sistema de perfiles personalizados
 */
interface PerfilState {
  // Estado
  perfilActual: PerfilNiño | null;
  perfilNiño: PerfilNiño | null; // Alias para compatibilidad
  perfilesPadre: PerfilPadre | null;
  progreso: ProgresoNiño | null;
  configuracion: ConfiguracionPerfil | null;
  cargando: boolean;
  error: string | null;

  // Acciones para perfiles de niño
  setPerfilActual: (perfil: PerfilNiño) => void;
  setPerfilNiño: (perfil: PerfilNiño) => void; // Alias para compatibilidad
  actualizarPerfil: (datosActualizados: Partial<PerfilNiño>) => void;
  limpiarPerfil: () => void;

  // Acciones para perfiles de padre
  setPerfilPadre: (perfil: PerfilPadre) => void;

  // Acciones para progreso
  setProgreso: (progreso: ProgresoNiño) => void;
  actualizarProgreso: (datosActualizados: Partial<ProgresoNiño>) => void;
  incrementarActividadesCompletadas: () => void;
  actualizarRacha: (dias: number) => void;

  // Acciones para configuración
  setConfiguracion: (config: ConfiguracionPerfil) => void;
  actualizarConfiguracion: (configActualizada: Partial<ConfiguracionPerfil>) => void;

  // Acciones de estado
  setCargando: (cargando: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

/**
 * Estado inicial del store
 */
const estadoInicial = {
  perfilActual: null,
  perfilesPadre: null,
  progreso: null,
  configuracion: null,
  cargando: false,
  error: null,
};

/**
 * Store de Zustand para perfiles
 * Según TECHNOLOGY.md: Zustand para gestión de estado centralizada
 */
export const usePerfilStore = create<PerfilState>((set, get) => ({
  ...estadoInicial,

  // Getter alias para perfilNiño
  get perfilNiño() {
    return get().perfilActual;
  },

  // Establece el perfil actual del niño
  setPerfilActual: (perfil) => set({ perfilActual: perfil, error: null }),

  // Alias para compatibilidad
  setPerfilNiño: (perfil) => set({ perfilActual: perfil, error: null }),

  // Actualiza datos del perfil actual
  // Según PROJECT_REQUIREMENTS.md RF-001: Perfiles personalizados por niño
  actualizarPerfil: (datosActualizados) =>
    set((state) => ({
      perfilActual: state.perfilActual
        ? { ...state.perfilActual, ...datosActualizados, ultimaActualizacion: new Date() }
        : null,
    })),

  // Limpia el perfil actual (cerrar sesión)
  limpiarPerfil: () => set({ perfilActual: null, progreso: null }),

  // Establece el perfil del padre/tutor
  setPerfilPadre: (perfil) => set({ perfilesPadre: perfil, error: null }),

  // Establece el progreso del niño
  // Según PROJECT_REQUIREMENTS.md RF-004: Sistema de seguimiento
  setProgreso: (progreso) => set({ progreso, error: null }),

  // Actualiza progreso parcialmente
  actualizarProgreso: (datosActualizados) =>
    set((state) => ({
      progreso: state.progreso
        ? { ...state.progreso, ...datosActualizados, ultimaSesion: new Date() }
        : null,
    })),

  // Incrementa contador de actividades completadas
  // Según PROJECT_REQUIREMENTS.md CA-002: Tiempo promedio de sesión
  incrementarActividadesCompletadas: () =>
    set((state) => ({
      progreso: state.progreso
        ? {
            ...state.progreso,
            actividadesCompletadas: state.progreso.actividadesCompletadas + 1,
            ultimaSesion: new Date(),
          }
        : null,
    })),

  // Actualiza racha de días consecutivos
  // Métrica importante para engagement
  actualizarRacha: (dias) =>
    set((state) => ({
      progreso: state.progreso
        ? { ...state.progreso, rachaActual: dias }
        : null,
    })),

  // Establece configuración del perfil
  setConfiguracion: (config) => set({ configuracion: config, error: null }),

  // Actualiza configuración parcialmente
  actualizarConfiguracion: (configActualizada) =>
    set((state) => ({
      configuracion: state.configuracion
        ? { ...state.configuracion, ...configActualizada }
        : null,
    })),

  // Establece estado de carga
  setCargando: (cargando) => set({ cargando }),

  // Establece mensaje de error
  setError: (error) => set({ error, cargando: false }),

  // Resetea todo el store al estado inicial
  reset: () => set(estadoInicial),
}));

export default usePerfilStore;
