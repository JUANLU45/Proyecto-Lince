/**
 * Firebase Configuration - Proyecto Lince
 * Configuración centralizada de Firebase
 * 
 * IMPORTANTE: En producción, estas credenciales deben moverse a variables de entorno
 * Usar archivo .env con expo-constants para mayor seguridad
 * 
 * Basado en: VARIABLES_BUSQUEDA.MD - Centralización de configuración
 */

export const firebaseConfig = {
  apiKey: "AIzaSyDIhZQY7jhteaCXOYAmI1Gkhd3_NcezYxg",
  authDomain: "proyecto-lince-b61b6.firebaseapp.com",
  projectId: "proyecto-lince-b61b6",
  storageBucket: "proyecto-lince-b61b6.firebasestorage.app",
  messagingSenderId: "265659354964",
  appId: "1:265659354964:web:b2a04a53738a7e9aacc2c1",
  measurementId: "G-CBDG47QJ1P"
} as const;

/**
 * Nota de Seguridad:
 * 
 * Para producción, reemplazar por:
 * 
 * import Constants from 'expo-constants';
 * 
 * export const firebaseConfig = {
 *   apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
 *   authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
 *   // ... etc
 * };
 * 
 * Y configurar en app.json:
 * {
 *   "expo": {
 *     "extra": {
 *       "firebaseApiKey": process.env.FIREBASE_API_KEY
 *     }
 *   }
 * }
 */
