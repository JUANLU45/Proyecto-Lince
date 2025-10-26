/**
 * Tipos relacionados con perfiles de usuario
 * Basado en: PROJECT_REQUIREMENTS.md
 */

// Nivel de desarrollo según PROJECT_REQUIREMENTS.md
export type NivelDesarrollo = 'básico' | 'intermedio' | 'avanzado';

// Preferencias sensoriales según PROJECT_REQUIREMENTS.md
export interface PreferenciasSensoriales {
  visual: number; // 0-100
  auditivo: number; // 0-100
  tactil: number; // 0-100
  vestibular: number; // 0-100
  propioceptivo: number; // 0-100
}

// Perfil completo del niño según PROJECT_REQUIREMENTS.md RF-001
export interface PerfilNiño {
  id: string;
  nombre: string;
  edad: number;
  fechaNacimiento: Date;
  nivelDesarrollo: NivelDesarrollo;
  preferencias: PreferenciasSensoriales;
  comunicacionNoVerbal: ComunicacionNoVerbal;
  objetivosTerapeuticos: string[];
  avatarUrl?: string;
  fechaCreacion: Date;
  ultimaActualizacion: Date;
}

// Comunicación no verbal según PROJECT_REQUIREMENTS.md
export interface ComunicacionNoVerbal {
  usaGestos: boolean;
  tiposGestos: string[]; // ej: "señalar", "aplaudir"
  usaExpresiones: boolean;
  usaVocalizaciones: boolean;
  nivelComprension: number; // 0-100
}

// Perfil de padre/cuidador
export interface PerfilPadre {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  relacion: 'padre' | 'madre' | 'tutor' | 'terapeuta';
  niñosAsociados: string[]; // IDs de perfiles de niños
  permisos: PermisosPadre;
  fechaRegistro: Date;
}

// Permisos de padre según PROJECT_REQUIREMENTS.md RF-ADMIN
export interface PermisosPadre {
  verProgreso: boolean;
  modificarConfiguracion: boolean;
  exportarDatos: boolean;
  accesoAdmin: boolean;
}

// Progreso del niño según PROJECT_REQUIREMENTS.md RF-004
export interface ProgresoNiño {
  perfilId: string;
  actividadesCompletadas: number;
  tiempoTotal: number; // en minutos
  actividadesFavoritas: string[];
  habilidadesMejoradas: Record<string, number>; // habilidad -> progreso (0-100)
  patronesComportamiento: string[];
  ultimaSesion: Date;
  rachaActual: number; // días consecutivos
}

// Objetivo terapéutico personalizado
export interface ObjetivoTerapeutico {
  id: string;
  perfilId: string;
  descripcion: string;
  tipo: 'sensorial' | 'comunicación' | 'motriz' | 'cognitivo';
  fechaInicio: Date;
  fechaObjetivo?: Date;
  progresoActual: number; // 0-100
  metrica: string;
  completado: boolean;
}

// Configuración de la app para el perfil
export interface ConfiguracionPerfil {
  volumenGlobal: number; // 0-100
  modoOscuro: boolean;
  tamañoTexto: 'normal' | 'grande' | 'muy_grande';
  notificacionesActivas: boolean;
  recordatoriosDiarios: boolean;
  horaRecordatorio?: string; // formato HH:mm
  duracionSesionPreferida: number; // en minutos
}
