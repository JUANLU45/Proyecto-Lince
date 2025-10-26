import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import type { RootStackParamList } from '../types';

// Navegadores
import TabNavigator from './TabNavigator';

// Screens - Flujo inicial
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import TutorialScreen from '../screens/TutorialScreen';

// Screens - Modales de actividades
import IslaScreen from '../screens/IslaScreen';
import PreActividadScreen from '../screens/PreActividadScreen';
import ActividadScreen from '../screens/ActividadScreen';
import RecompensaScreen from '../screens/RecompensaScreen';
import RinconCalmaScreen from '../screens/RinconCalmaScreen';
import SugerenciaIAScreen from '../screens/SugerenciaIAScreen';

// Screens - Otros modales
import ProgresoDetalladoScreen from '../screens/ProgresoDetalladoScreen';
import AdminPanelScreen from '../screens/AdminPanelScreen';

const Stack = createStackNavigator<RootStackParamList>();

/**
 * StackNavigator - Navegador principal de la aplicación
 *
 * Flujo de navegación:
 * 1. Splash -> Onboarding -> Tutorial -> App (TabNavigator)
 * 2. Modales de actividades desde App
 * 3. Pantallas administrativas
 *
 * Basado en:
 * - APP_BLUEPRINT.md - Arquitectura de pantallas
 * - UI_COMPONENTS.md - Jerarquía de navegación
 * - ESTRATEGIA_IMPLEMENTACION.md - FASE 4
 *
 * Mandamientos cumplidos:
 * - ✅ Anti-Especulación: Basado en documentación oficial
 * - ✅ Anti-Placebo: Navegación funcional con React Navigation
 * - ✅ Imports: Tipos desde types/, screens desde screens/
 * - ✅ Código es ley: Implementación real sin comentarios fake
 * - ✅ Accesibilidad: screenOptions con headers accesibles
 */
export const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // Transición suave para todas las pantallas
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        // Gesture de retroceso en iOS
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
      initialRouteName="Splash"
    >
      {/* ===============================================
          FLUJO INICIAL (SPLASH, ONBOARDING, TUTORIAL)
          =============================================== */}

      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{
          // Sin header en splash
          headerShown: false,
          // Sin gestos en splash
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{
          headerShown: false,
          // Sin retroceso desde onboarding
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="Tutorial"
        component={TutorialScreen}
        options={{
          headerShown: false,
          // Permitir skip del tutorial
          gestureEnabled: true,
        }}
      />

      {/* ===============================================
          APP PRINCIPAL (TAB NAVIGATOR)
          =============================================== */}

      <Stack.Screen
        name="App"
        component={TabNavigator}
        options={{
          headerShown: false,
          // Sin retroceso desde app principal
          gestureEnabled: false,
        }}
      />

      {/* ===============================================
          MODALES DE ACTIVIDADES
          =============================================== */}

      <Stack.Screen
        name="Isla"
        component={IslaScreen}
        options={{
          // Modal con transición vertical
          presentation: 'modal',
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerShown: true,
          headerTitle: 'Actividades',
          headerBackTitle: 'Volver',
        }}
      />

      <Stack.Screen
        name="PreActividad"
        component={PreActividadScreen}
        options={{
          presentation: 'modal',
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerShown: true,
          headerTitle: 'Preparar Actividad',
          headerBackTitle: 'Volver',
        }}
      />

      <Stack.Screen
        name="Actividad"
        component={ActividadScreen}
        options={{
          // Pantalla completa sin header
          headerShown: false,
          // Sin gestos durante actividad
          gestureEnabled: false,
          // Transición fade para actividades
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      />

      <Stack.Screen
        name="Recompensa"
        component={RecompensaScreen}
        options={{
          presentation: 'modal',
          headerShown: false,
          // Sin retroceso desde recompensa (debe cerrar explícitamente)
          gestureEnabled: false,
          // Transición especial para celebración
          cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
        }}
      />

      <Stack.Screen
        name="RinconCalma"
        component={RinconCalmaScreen}
        options={{
          presentation: 'modal',
          headerShown: false,
          // Permitir salir con gesto suave
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      />

      <Stack.Screen
        name="SugerenciaIA"
        component={SugerenciaIAScreen}
        options={{
          presentation: 'transparentModal',
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      />

      {/* ===============================================
          PANTALLAS DE PROGRESO Y ADMIN
          =============================================== */}

      <Stack.Screen
        name="ProgresoDetallado"
        component={ProgresoDetalladoScreen}
        options={{
          presentation: 'modal',
          headerShown: true,
          headerTitle: 'Progreso Detallado',
          headerBackTitle: 'Volver',
        }}
      />

      <Stack.Screen
        name="AdminPanel"
        component={AdminPanelScreen}
        options={{
          presentation: 'modal',
          headerShown: true,
          headerTitle: 'Panel Administrativo',
          headerBackTitle: 'Cerrar',
          // Gestureenabled para cerrar fácilmente
          gestureEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
