/**
 * Funciones de utilidad para accesibilidad
 * Basado en: PROJECT_REQUIREMENTS.md RNF-003 y UI_COMPONENTS.md
 */

import { BaseProps } from '../types';

/**
 * Crea props de accesibilidad estándar para un componente
 * Según PROJECT_REQUIREMENTS.md RNF-003
 */
export const crearPropsAccesibilidad = (
  label: string,
  hint?: string,
  role?: 'button' | 'text' | 'image' | 'header' | 'adjustable'
): Partial<BaseProps> & {
  accessibilityRole?: string;
} => {
  return {
    accessible: true,
    accessibilityLabel: label,
    ...(hint && { accessibilityHint: hint }),
    ...(role && { accessibilityRole: role }),
  };
};

/**
 * Verifica si un tamaño de área táctil cumple requisitos de accesibilidad
 * Mínimo 44x44 según UI_COMPONENTS.md
 */
export const validarTamañoTactil = (ancho: number, alto: number): boolean => {
  const MINIMO_TACTIL = 44;
  return ancho >= MINIMO_TACTIL && alto >= MINIMO_TACTIL;
};

/**
 * Calcula el contraste entre dos colores (simplificado)
 * Para cumplir WCAG 2.1 AA según PROJECT_REQUIREMENTS.md
 */
export const calcularContraste = (color1: string, color2: string): number => {
  // Conversión simplificada RGB a luminancia relativa
  const getLuminance = (hex: string): number => {
    const rgb = parseInt(hex.replace('#', ''), 16);
    const r = ((rgb >> 16) & 0xff) / 255;
    const g = ((rgb >> 8) & 0xff) / 255;
    const b = (rgb & 0xff) / 255;

    const [rs, gs, bs] = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Verifica si un contraste cumple WCAG 2.1 AA
 * Requiere ratio de al menos 4.5:1 para texto normal
 */
export const cumpleContrasteAA = (color1: string, color2: string, textoGrande: boolean = false): boolean => {
  const ratio = calcularContraste(color1, color2);
  const minimoRequerido = textoGrande ? 3 : 4.5;
  return ratio >= minimoRequerido;
};

/**
 * Genera un anuncio para lectores de pantalla
 */
export const generarAnuncioAccesibilidad = (mensaje: string, importancia: 'assertive' | 'polite' = 'polite'): {
  announcement: string;
  importancia: string;
} => {
  return {
    announcement: mensaje,
    importancia,
  };
};

/**
 * Formatea tiempo restante para anuncio accesible
 */
export const anunciarTiempoRestante = (segundos: number): string => {
  if (segundos < 60) {
    return `${Math.floor(segundos)} segundos restantes`;
  }
  const minutos = Math.floor(segundos / 60);
  return `${minutos} ${minutos === 1 ? 'minuto' : 'minutos'} restantes`;
};
