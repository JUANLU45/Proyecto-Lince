/**
 * App.tsx - Punto de entrada principal - Proyecto Lince
 * Basado en: ESTRATEGIA_IMPLEMENTACION.md
 *
 * Responsabilidades:
 * - Inicialización de Firebase
 * - Configuración de navegación principal
 * - Estado global de la aplicación
 *
 * MANDAMIENTOS:
 * ✅ NO código placebo - Todo es funcional LIVE
 * ✅ Abstracción BD perfecta (FirebaseService)
 * ✅ Manejo de errores robusto
 * ✅ Accesibilidad desde el inicio
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';
import { FirebaseService } from './src/services';
import { theme } from './src/constants';

/**
 * Componente principal de la aplicación
 */
export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeApp();
  }, []);

  /**
   * Inicializa todos los servicios necesarios
   */
  const initializeApp = async () => {
    try {
      // Inicializar Firebase (obligatorio)
      await FirebaseService.initialize();

      // App lista para usar
      setIsReady(true);
    } catch (err) {
      console.error('Error inicializando la aplicación:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Error desconocido al inicializar'
      );
    }
  };

  // Pantalla de error
  if (error) {
    return (
      <SafeAreaProvider>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitulo}>Error de Inicialización</Text>
          <Text style={styles.errorMensaje}>{error}</Text>
          <Text style={styles.errorAyuda}>
            Por favor, verifica tu conexión a Internet y reinicia la aplicación.
          </Text>
        </View>
      </SafeAreaProvider>
    );
  }

  // Pantalla de carga mientras se inicializa
  if (!isReady) {
    return (
      <SafeAreaProvider>
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={theme.colors.verdeJungla}
            accessible={true}
            accessibilityLabel="Cargando aplicación"
          />
          <Text style={styles.loadingTexto}>Inicializando Proyecto Lince...</Text>
        </View>
      </SafeAreaProvider>
    );
  }

  // Aplicación lista
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.blancoPuro,
  },
  loadingTexto: {
    marginTop: theme.spacing.lg,
    fontSize: theme.typography.fontSize.bodyMedium,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisOscuro,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.blancoPuro,
    padding: theme.spacing.xl,
  },
  errorTitulo: {
    fontSize: theme.typography.fontSize.h1,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.rojoPeligro,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  errorMensaje: {
    fontSize: theme.typography.fontSize.bodyMedium,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  errorAyuda: {
    fontSize: theme.typography.fontSize.bodySmall,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
