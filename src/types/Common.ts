/**
 * Tipos básicos usados en toda la aplicación
 * Basado en: UI_COMPONENTS.md y DESIGN_SYSTEM.md
 */

import { ReactNode } from 'react';

export interface BaseProps {
  testID?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

// Tipos de colores del Design System centralizado
export type ColorVariant = 'azulCalma' | 'verdeJungla' | 'amarilloSol' | 'rojoPeligro' | 'grisClaro' | 'grisOscuro' | 'blancoPuro';

// Tamaños estándar para componentes
export type Size = 'pequeño' | 'mediano' | 'grande';

// Estados de los componentes
export type ComponentState = 'normal' | 'hover' | 'pressed' | 'disabled' | 'loading';

// Tipos de botones según UI_COMPONENTS.md
export interface BotonProps extends BaseProps {
  texto: string;
  onPress: () => void;
  icono?: string;
  deshabilitado?: boolean;
  tamaño?: Size;
  color?: 'azul' | 'verde' | 'amarillo' | 'rojo';
}

// Props para modales según UI_COMPONENTS.md
export interface ModalProps extends BaseProps {
  visible: boolean;
  onClose: () => void;
  titulo?: string;
  children: ReactNode;
  tipo?: 'info' | 'confirmacion' | 'alerta';
}

// Tipos de emociones de Leo según UI_COMPONENTS.md
export type EmocionLeo = 'feliz' | 'pensativo' | 'animado' | 'calmado' | 'sorprendido';

// Acciones animadas de Leo según UI_COMPONENTS.md
export type AccionLeo = 'saltar' | 'bailar' | 'pensar' | 'celebrar' | 'dormitar';

// Props del avatar Leo
export interface AvatarLeoProps extends BaseProps {
  emocion: EmocionLeo;
  tamaño: Size;
  animacion?: boolean;
  onPress?: () => void;
}

// Props de Leo animado
export interface LeoAnimadoProps extends BaseProps {
  accion: AccionLeo;
  loop?: boolean;
  onAnimacionCompleta?: () => void;
}

// Tipos de respuesta de API
export interface APIResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

// Tipos de errores
export interface ErrorInfo {
  code: string;
  message: string;
  timestamp: Date;
  details?: Record<string, unknown>;
}
