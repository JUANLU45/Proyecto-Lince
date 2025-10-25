/**
 * Índice central de stores de Zustand
 * Exporta todos los stores de la aplicación
 */

export { usePerfilStore } from './perfilStore';
export { useAIStore } from './aiStore';

// Re-exportar como default también
export { default as usePerfilStoreDefault } from './perfilStore';
export { default as useAIStoreDefault } from './aiStore';
