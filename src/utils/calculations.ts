/**
 * Funciones de cálculos y matemáticas
 * Basado en: PROJECT_REQUIREMENTS.md
 */

/**
 * Calcula el progreso como porcentaje (0-100)
 */
export const calcularProgreso = (actual: number, total: number): number => {
  if (total === 0) return 0;
  const progreso = (actual / total) * 100;
  return Math.min(100, Math.max(0, progreso));
};

/**
 * Normaliza un valor de un rango a 0-100
 */
export const normalizarValor = (valor: number, min: number, max: number): number => {
  if (max === min) return 0;
  const normalizado = ((valor - min) / (max - min)) * 100;
  return Math.min(100, Math.max(0, normalizado));
};

/**
 * Calcula la precisión de un toque basado en distancia al objetivo
 * Según PROJECT_REQUIREMENTS.md - Tolerancia alta a toques imprecisos
 */
export const calcularPrecisionToque = (
  toqueX: number,
  toqueY: number,
  objetivoX: number,
  objetivoY: number,
  radioTolerancia: number = 50
): number => {
  const distancia = Math.sqrt(
    Math.pow(toqueX - objetivoX, 2) + Math.pow(toqueY - objetivoY, 2)
  );

  if (distancia === 0) return 100;
  if (distancia >= radioTolerancia) return 0;

  // Precisión inversamente proporcional a la distancia
  return Math.max(0, 100 - (distancia / radioTolerancia) * 100);
};

/**
 * Calcula promedio de array de números
 */
export const calcularPromedio = (valores: number[]): number => {
  if (valores.length === 0) return 0;
  const suma = valores.reduce((acc, val) => acc + val, 0);
  return suma / valores.length;
};

/**
 * Calcula el nivel de engagement basado en interacciones
 * Según PROJECT_REQUIREMENTS.md RF-IA-001
 */
export const calcularEngagement = (
  interaccionesExitosas: number,
  interaccionesTotales: number,
  tiempoEnActividad: number, // en segundos
  tiempoEsperado: number // en segundos
): number => {
  if (interaccionesTotales === 0) return 0;

  // Factor de éxito (40% del peso)
  const factorExito = (interaccionesExitosas / interaccionesTotales) * 40;

  // Factor de tiempo (60% del peso) - penaliza abandono temprano
  const factorTiempo = Math.min(tiempoEnActividad / tiempoEsperado, 1) * 60;

  return Math.min(100, factorExito + factorTiempo);
};

/**
 * Calcula nivel de frustración basado en patrones
 * Según PROJECT_REQUIREMENTS.md RF-IA-002
 */
export const calcularFrustracion = (
  fallosConsecutivos: number,
  tiempoSinExito: number, // en segundos
  velocidadToques: number // toques por segundo
): number => {
  // Más fallos consecutivos = más frustración
  const factorFallos = Math.min(fallosConsecutivos * 20, 50);

  // Más tiempo sin éxito = más frustración
  const factorTiempo = Math.min(tiempoSinExito / 30 * 30, 30);

  // Toques muy rápidos pueden indicar frustración
  const factorVelocidad = velocidadToques > 3 ? 20 : 0;

  return Math.min(100, factorFallos + factorTiempo + factorVelocidad);
};

/**
 * Interpola linealmente entre dos valores
 */
export const interpolar = (inicio: number, fin: number, progreso: number): number => {
  return inicio + (fin - inicio) * Math.max(0, Math.min(1, progreso));
};

/**
 * Redondea a N decimales
 */
export const redondear = (valor: number, decimales: number = 2): number => {
  const factor = Math.pow(10, decimales);
  return Math.round(valor * factor) / factor;
};

/**
 * Clamp: limita un valor entre min y max
 */
export const clamp = (valor: number, min: number, max: number): number => {
  return Math.min(max, Math.max(min, valor));
};
