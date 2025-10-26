/**
 * Tipos relacionados con actividades sensoriales
 * Basado en: PROJECT_REQUIREMENTS.md y APP_BLUEPRINT.md
 */

import { ReactNode } from 'react';
import { BaseProps } from './Common';

// Tipos de islas temáticas según APP_BLUEPRINT.md
export type TipoIsla = 'movimiento' | 'musical' | 'tactil' | 'visual' | 'calma';

// Niveles de dificultad según PROJECT_REQUIREMENTS.md
export type NivelDificultad = 'básico' | 'intermedio' | 'avanzado';

// Duraciones de actividad según APP_BLUEPRINT.md
export type DuracionActividad = 'corta' | 'normal' | 'larga';

// Estado de una actividad
export type EstadoActividad = 'no_iniciada' | 'en_progreso' | 'pausada' | 'completada' | 'abandonada';

// Actividad completa según PROJECT_REQUIREMENTS.md
export interface Actividad {
  id: string;
  nombre: string;
  descripcion: string;
  isla: TipoIsla;
  dificultad: NivelDificultad;
  duracionEstimada: number; // en minutos
  miniatura: string;
  objetivoTerapeutico: string;
  habilidadesDesarrolladas: string[];
  requiereConexion: boolean;
}

// Sesión de actividad
export interface SesionActividad {
  actividadId: string;
  usuarioId: string;
  fechaInicio: Date;
  fechaFin?: Date;
  duracionReal: number; // en segundos
  estado: EstadoActividad;
  progreso: number; // 0-100
  interacciones: InteraccionActividad[];
  resultadoIA?: ResultadoIA;
}

// Interacción dentro de una actividad
export interface InteraccionActividad {
  timestamp: Date;
  tipo: 'toque' | 'gesto' | 'voz' | 'facial';
  precision: number; // 0-100
  tiempoRespuesta: number; // en milisegundos
  exitosa: boolean;
  coordenadas?: { x: number; y: number };
}

// Resultado del análisis de IA de una sesión
export interface ResultadoIA {
  patrones: string[];
  sugerencias: string[];
  nivelFrustracion: number; // 0-100
  nivelEngagement: number; // 0-100
  recomendacionProxima: string;
}

// Props del contenedor de actividad según UI_COMPONENTS.md
export interface ActividadContainerProps extends BaseProps {
  titulo: string;
  progreso: number; // 0-100
  tiempoTranscurrido: number;
  onPausa: () => void;
  onTerminar: () => void;
  children: ReactNode;
}

// Props del área interactiva
export interface AreaInteractivaProps extends BaseProps {
  onTouch: (x: number, y: number) => void;
  onGesture?: (tipo: string) => void;
  sensibilidad?: number; // 0-100 (opcional)
  children?: ReactNode;
}

// Props del feedback visual
export interface FeedbackVisualProps extends BaseProps {
  tipo: 'éxito' | 'intento' | 'celebración';
  posicion: { x: number; y: number };
  visible: boolean;
  onComplete?: () => void;
}

// Props de la barra de progreso
export interface BarraProgresoProps extends BaseProps {
  progreso: number; // 0-100
  color?: string;
  altura?: number;
  mostrarPorcentaje?: boolean;
}

// Configuración de actividad
export interface ConfiguracionActividad {
  volumen: number; // 0-100
  duracion: DuracionActividad;
  nivelAyuda: 'ninguna' | 'mínima' | 'moderada' | 'máxima';
  dificultad: NivelDificultad;
}
