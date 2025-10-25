/**
 * Índice central de tipos de TypeScript
 * Exporta todos los tipos del proyecto para fácil importación
 */

// Common types
export type {
  BaseProps,
  ColorVariant,
  Size,
  ComponentState,
  BotonProps,
  ModalProps,
  EmocionLeo,
  AccionLeo,
  AvatarLeoProps,
  LeoAnimadoProps,
  APIResponse,
  ErrorInfo,
} from './Common';

// Actividad types
export type {
  TipoIsla,
  NivelDificultad,
  DuracionActividad,
  EstadoActividad,
  Actividad,
  SesionActividad,
  InteraccionActividad,
  ResultadoIA,
  ActividadContainerProps,
  AreaInteractivaProps,
  FeedbackVisualProps,
  BarraProgresoProps,
  ConfiguracionActividad,
} from './Actividad';

// Perfil types
export type {
  NivelDesarrollo,
  PreferenciasSensoriales,
  PerfilNiño,
  ComunicacionNoVerbal,
  PerfilPadre,
  PermisosPadre,
  ProgresoNiño,
  ObjetivoTerapeutico,
  ConfiguracionPerfil,
} from './Perfil';

// IA types
export type {
  TipoAnalisisIA,
  TerapeutaVirtual,
  SugerenciaIA,
  InsightPadres,
  DatosGrafico,
  PatronInteraccion,
  DatosAnalisis,
  DatosVoz,
  DatosGesto,
  PuntoGesto,
  DatosFacial,
  PuntoFacial,
  ConfiguracionIA,
  ModeloIA,
  SugerenciaProactivaProps,
  InsightPadresProps,
  EstadoProcesamientoIA,
} from './IA';
