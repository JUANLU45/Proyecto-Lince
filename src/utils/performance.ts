/**
 * Funciones de utilidad para optimización de rendimiento
 * Basado en: PROJECT_REQUIREMENTS.md RNF-005 a RNF-008 y DEVELOPMENT_PLAN.md
 */

/**
 * Debounce: Retrasa la ejecución de una función hasta que pasen N ms sin llamadas
 * Útil para eventos que disparan frecuentemente (scroll, resize, input)
 */
export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle: Limita la ejecución de una función a una vez cada N ms
 * Útil para eventos que disparan muy frecuentemente
 */
export const throttle = <T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * Mide el tiempo de ejecución de una función
 * Útil para debugging y optimización
 */
export const medirTiempo = async <T>(
  nombre: string,
  func: () => Promise<T> | T
): Promise<T> => {
  const inicio = performance.now();
  const resultado = await func();
  const fin = performance.now();
  const duracion = fin - inicio;

  if (duracion > 1000) {
    console.warn(`⚠️ ${nombre} tardó ${duracion.toFixed(2)}ms (>1s)`);
  }

  return resultado;
};

/**
 * Crea un objeto de caché simple con expiración
 */
export const crearCache = <T>(ttlMs: number = 60000) => {
  const cache = new Map<string, { valor: T; expira: number }>();

  return {
    get: (key: string): T | null => {
      const item = cache.get(key);
      if (!item) return null;

      if (Date.now() > item.expira) {
        cache.delete(key);
        return null;
      }

      return item.valor;
    },

    set: (key: string, valor: T): void => {
      cache.set(key, {
        valor,
        expira: Date.now() + ttlMs,
      });
    },

    clear: (): void => {
      cache.clear();
    },

    delete: (key: string): void => {
      cache.delete(key);
    },
  };
};

/**
 * Chunking: Divide un array grande en chunks más pequeños
 * Útil para procesar datos grandes sin bloquear UI
 */
export const dividirEnChunks = <T>(array: T[], tamaño: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += tamaño) {
    chunks.push(array.slice(i, i + tamaño));
  }
  return chunks;
};

/**
 * Delay: Promesa que se resuelve después de N ms
 * Útil para animaciones y testing
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Retry: Reintenta una función async N veces con delay exponencial
 * Útil para llamadas a APIs que pueden fallar temporalmente
 */
export const retry = async <T>(
  func: () => Promise<T>,
  intentosMaximos: number = 3,
  delayInicial: number = 1000
): Promise<T> => {
  let ultimoError: Error | unknown;

  for (let i = 0; i < intentosMaximos; i++) {
    try {
      return await func();
    } catch (error) {
      ultimoError = error;
      if (i < intentosMaximos - 1) {
        // Delay exponencial: 1s, 2s, 4s, etc.
        const delayMs = delayInicial * Math.pow(2, i);
        await delay(delayMs);
      }
    }
  }

  throw ultimoError;
};

/**
 * Comprueba si el dispositivo tiene suficiente memoria
 * Según PROJECT_REQUIREMENTS.md RNF-008 (funciona con 2GB RAM)
 */
export const tieneMemoriaSuficiente = (): boolean => {
  // @ts-expect-error - navigator.deviceMemory no está en todos los tipos
  const memoryGb = navigator.deviceMemory;
  if (memoryGb === undefined) return true; // Asumimos que sí si no podemos detectar
  return memoryGb >= 2;
};

/**
 * Calcula FPS actual (simplificado)
 * Objetivo: 60 FPS según DEVELOPMENT_PLAN.md
 */
export const medirFPS = (callback: (fps: number) => void): () => void => {
  let lastTime = performance.now();
  let frames = 0;
  let rafId: number;

  const loop = () => {
    frames++;
    const currentTime = performance.now();

    if (currentTime >= lastTime + 1000) {
      const fps = Math.round((frames * 1000) / (currentTime - lastTime));
      callback(fps);
      frames = 0;
      lastTime = currentTime;
    }

    rafId = requestAnimationFrame(loop);
  };

  rafId = requestAnimationFrame(loop);

  // Retorna función para detener medición
  return () => cancelAnimationFrame(rafId);
};
