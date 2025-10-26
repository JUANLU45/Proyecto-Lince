/**
 * Funciones de validación de datos
 * Basado en: PROJECT_REQUIREMENTS.md
 */

/**
 * Valida que un email tenga formato correcto
 */
export const validarEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Valida que un nombre no esté vacío y tenga longitud apropiada
 */
export const validarNombre = (nombre: string): boolean => {
  const nombreTrimmed = nombre.trim();
  return nombreTrimmed.length >= 2 && nombreTrimmed.length <= 50;
};

/**
 * Valida que una edad esté en el rango apropiado (3-12 años según PROJECT_REQUIREMENTS.md)
 */
export const validarEdad = (edad: number): boolean => {
  return edad >= 3 && edad <= 12 && Number.isInteger(edad);
};

/**
 * Valida que un valor esté en el rango 0-100
 */
export const validarPorcentaje = (valor: number): boolean => {
  return valor >= 0 && valor <= 100;
};

/**
 * Valida que un valor de volumen sea válido (0-100)
 */
export const validarVolumen = (volumen: number): boolean => {
  return validarPorcentaje(volumen);
};

/**
 * Valida que un número de teléfono tenga formato básico correcto
 */
export const validarTelefono = (telefono: string): boolean => {
  // Acepta formatos: +34123456789, 123456789, etc.
  const regex = /^[\d\s+\-()]{9,}$/;
  return regex.test(telefono);
};

/**
 * Valida que una URL sea válida
 */
export const validarURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Valida que un objeto no tenga propiedades vacías
 */
export const validarObjetoNoVacio = (obj: Record<string, unknown>): boolean => {
  return Object.keys(obj).length > 0;
};

/**
 * Valida coordenadas de toque (0-100 normalizado)
 */
export const validarCoordenadas = (x: number, y: number): boolean => {
  return validarPorcentaje(x) && validarPorcentaje(y);
};
