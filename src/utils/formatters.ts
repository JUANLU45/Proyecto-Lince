/**
 * Funciones de formato para textos, números, fechas, etc.
 * Basado en: PROJECT_REQUIREMENTS.md
 */

import { strings } from '../constants';

/**
 * Formatea segundos a formato legible (ej: "2m 30s", "1h 15m")
 */
export const formatTiempo = (segundos: number): string => {
  if (segundos < 60) {
    return `${Math.floor(segundos)} ${strings.tiempo.segundos}`;
  }

  if (segundos < 3600) {
    const minutos = Math.floor(segundos / 60);
    const segs = Math.floor(segundos % 60);
    if (segs === 0) {
      return `${minutos} ${strings.tiempo.minutos}`;
    }
    return `${minutos}m ${segs}s`;
  }

  const horas = Math.floor(segundos / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  if (minutos === 0) {
    return `${horas} ${strings.tiempo.horas}`;
  }
  return `${horas}h ${minutos}m`;
};

/**
 * Formatea una fecha a string relativo (ej: "Hoy", "Ayer", "Hace 3 días")
 */
export const formatFechaRelativa = (fecha: Date): string => {
  const ahora = new Date();
  const diff = ahora.getTime() - fecha.getTime();
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (dias === 0) return strings.tiempo.hoy;
  if (dias === 1) return strings.tiempo.ayer;
  if (dias < 7) return `${strings.tiempo.hace} ${dias} ${strings.tiempo.dias}`;

  // Si es más de una semana, formato completo
  return fecha.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

/**
 * Formatea un porcentaje con decimales opcionales
 */
export const formatPorcentaje = (valor: number, decimales: number = 0): string => {
  return `${valor.toFixed(decimales)}%`;
};

/**
 * Formatea un número con separadores de miles
 */
export const formatNumero = (numero: number): string => {
  return numero.toLocaleString('es-ES');
};

/**
 * Formatea duraciones en minutos a texto legible
 */
export const formatDuracion = (minutos: number): string => {
  if (minutos < 60) {
    return `${minutos} ${strings.tiempo.minutos}`;
  }
  const horas = Math.floor(minutos / 60);
  const mins = minutos % 60;
  if (mins === 0) {
    return `${horas} ${strings.tiempo.horas}`;
  }
  return `${horas}h ${mins}m`;
};

/**
 * Trunca texto largo y agrega puntos suspensivos
 */
export const truncarTexto = (texto: string, maxLength: number): string => {
  if (texto.length <= maxLength) return texto;
  return `${texto.substring(0, maxLength)}...`;
};

/**
 * Capitaliza la primera letra de un string
 */
export const capitalizarPrimera = (texto: string): string => {
  if (!texto) return '';
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
};

/**
 * Formatea un nombre para display (capitaliza cada palabra)
 */
export const formatNombre = (nombre: string): string => {
  return nombre
    .split(' ')
    .map(palabra => capitalizarPrimera(palabra))
    .join(' ');
};
