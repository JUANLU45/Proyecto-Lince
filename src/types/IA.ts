/**
 * Tipos relacionados con Inteligencia Artificial
 * Basado en: PROJECT_REQUIREMENTS.md RF-IA y TECHNOLOGY.md
 */

// Tipos de análisis de IA multimodal según PROJECT_REQUIREMENTS.md RF-IA-001
export type TipoAnalisisIA = 'voz' | 'gesto' | 'facial';

// Terapeuta virtual según PROJECT_REQUIREMENTS.md RF-IA-004
export type TerapeutaVirtual = 'analistaVoz' | 'analistaGestos' | 'analistaFacial';

// Sugerencia proactiva de IA según DESIGN_SYSTEM.md
export interface SugerenciaIA {
  id: string;
  tipo: 'descanso' | 'cambio_actividad' | 'rincón_calma' | 'recompensa';
  titulo: string;
  descripcion: string;
  prioridad: 'baja' | 'media' | 'alta';
  timestamp: Date;
  aceptada?: boolean;
  razonamiento: string;
  terapeuta: TerapeutaVirtual;
}

// Insight para padres según DESIGN_SYSTEM.md y PROJECT_REQUIREMENTS.md RF-IA-004
export interface InsightPadres {
  id: string;
  fecha: Date;
  categoria: 'progreso' | 'sugerencia' | 'alerta' | 'celebración';
  titulo: string;
  resumen: string;
  detalles?: string;
  accionRecomendada?: string;
  datosVisuales?: DatosGrafico;
  generadoPor: TerapeutaVirtual;
}

// Datos para gráficos de progreso
export interface DatosGrafico {
  tipo: 'linea' | 'barra' | 'circular';
  etiquetas: string[];
  valores: number[];
  unidad?: string;
}

// Análisis de patrón de interacción según PROJECT_REQUIREMENTS.md RF-IA-001
export interface PatronInteraccion {
  tipo: TipoAnalisisIA;
  datos: DatosAnalisis;
  timestamp: Date;
  confianza: number; // 0-100
  procesadoPor: string; // modelo usado (ej: "YOLOv8", "MediaPipe")
}

// Datos de análisis multimodal
export type DatosAnalisis = DatosVoz | DatosGesto | DatosFacial;

// Análisis de voz con MFCC según TECHNOLOGY.md
export interface DatosVoz {
  tipo: 'voz';
  volumen: number; // 0-100
  tono: number;
  duracion: number; // segundos
  emocionDetectada?: 'feliz' | 'enfadado' | 'neutro' | 'triste';
  caracteristicas: number[]; // MFCC features
}

// Análisis de gestos con MediaPipe según TECHNOLOGY.md
export interface DatosGesto {
  tipo: 'gesto';
  gestoDetectado: string; // ej: "señalar", "aplaudir"
  puntos: PuntoGesto[];
  precision: number; // 0-100
  velocidad?: number;
}

// Punto de detección de gesto
export interface PuntoGesto {
  x: number;
  y: number;
  z?: number;
  confianza: number; // 0-100
}

// Análisis facial con YOLOv8/DS-CNN según TECHNOLOGY.md
export interface DatosFacial {
  tipo: 'facial';
  expresion: 'feliz' | 'enfadado' | 'sorprendido' | 'neutro' | 'triste';
  intensidad: number; // 0-100
  boundingBox: {
    x: number;
    y: number;
    ancho: number;
    alto: number;
  };
  puntosFaciales?: PuntoFacial[];
}

// Puntos faciales detectados
export interface PuntoFacial {
  tipo: 'ojo' | 'nariz' | 'boca' | 'ceja';
  x: number;
  y: number;
  confianza: number; // 0-100
}

// Configuración del motor de IA según PROJECT_REQUIREMENTS.md RF-IA-003
export interface ConfiguracionIA {
  adaptacionAutomatica: boolean;
  frecuenciaAnalisis: number; // en segundos
  umbralesFrustracion: {
    bajo: number;
    medio: number;
    alto: number;
  };
  umbralConfianza: number; // 0-100, mínimo para aceptar predicciones
  terapeutasActivos: TerapeutaVirtual[];
  modoOffline: boolean;
}

// Modelo de IA exportable según TECHNOLOGY.md (ONNX)
export interface ModeloIA {
  id: string;
  nombre: string;
  tipo: TipoAnalisisIA;
  version: string;
  formatoExportado: 'onnx' | 'tflite';
  rutaArchivo: string;
  metadatos: {
    precision: number; // accuracy del modelo
    fechaEntrenamiento: Date;
    datasetSize: number;
  };
}

// Props del componente de sugerencia proactiva según UI_COMPONENTS.md
export interface SugerenciaProactivaProps {
  sugerencia: SugerenciaIA;
  visible: boolean;
  onAceptar: () => void;
  onRechazar: () => void;
}

// Props del componente de insight para padres según UI_COMPONENTS.md
export interface InsightPadresProps {
  insight: InsightPadres;
  expandido?: boolean;
  onPresionar?: () => void;
}

// Estado de procesamiento de IA
export interface EstadoProcesamientoIA {
  procesando: boolean;
  progreso: number; // 0-100
  etapaActual: string;
  error?: string;
}
