/**
 * FirebaseService - Inicialización y configuración de Firebase
 * Basado en: TECHNOLOGY.md - Firebase Core 18.6.0
 *
 * IMPORTANTE: Servicio de inicialización de Firebase para toda la app
 * Según PROJECT_REQUIREMENTS.md: RNF-009 a RNF-012 (seguridad y privacidad)
 */

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

/**
 * Clase singleton para gestionar Firebase
 * Inicializa todos los servicios necesarios según TECHNOLOGY.md
 */
class FirebaseService {
  private static instance: FirebaseService;
  private initialized: boolean = false;

  private constructor() {}

  /**
   * Obtiene la instancia singleton
   */
  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  /**
   * Inicializa Firebase si aún no está inicializado
   * Según TECHNOLOGY.md: Firebase 18.6.0 compatible con RN 0.72.15
   */
  public async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      // Firebase se inicializa automáticamente con react-native-firebase
      // Solo necesitamos configurar los servicios específicos

      // Habilitar persistencia offline de Firestore
      // Según PROJECT_REQUIREMENTS.md RES-001: No requiere conexión constante
      await firestore().settings({
        persistence: true,
        cacheSizeBytes: firestore.CACHE_SIZE_UNLIMITED,
      });

      // Configurar región de Functions
      // Según TECHNOLOGY.md: Cloud Functions para procesamiento de IA
      functions().useFunctionsEmulator('http://localhost:5001'); // Solo en desarrollo

      this.initialized = true;
    } catch (error) {
      console.error('Error inicializando Firebase:', error);
      throw new Error('No se pudo inicializar Firebase');
    }
  }

  /**
   * Obtiene instancia de Authentication
   * Según PROJECT_REQUIREMENTS.md RNF-011: Consentimiento parental verificable
   */
  public getAuth() {
    return auth;
  }

  /**
   * Obtiene instancia de Firestore
   * Según PROJECT_REQUIREMENTS.md RNF-010: Cifrado de datos
   */
  public getFirestore() {
    return firestore;
  }

  /**
   * Obtiene instancia de Functions
   * Según TECHNOLOGY.md: Cloud Functions para IA
   */
  public getFunctions() {
    return functions;
  }

  /**
   * Obtiene instancia de Analytics
   * Según PROJECT_REQUIREMENTS.md RF-004: Portal con seguimiento de progreso
   */
  public getAnalytics() {
    return analytics;
  }

  /**
   * Obtiene instancia de Crashlytics
   * Según PROJECT_REQUIREMENTS.md CA-005: Cero crashes críticos
   */
  public getCrashlytics() {
    return crashlytics;
  }

  /**
   * Verifica si Firebase está inicializado
   */
  public isInitialized(): boolean {
    return this.initialized;
  }
}

// Exportar instancia singleton
export default FirebaseService.getInstance();
