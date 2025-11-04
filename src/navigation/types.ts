/**
 * Tipos de navegación - Proyecto Lince
 * Basado en: APP_BLUEPRINT.md y @react-navigation/native
 *
 * Define todos los tipos de navegación y parámetros de pantallas
 * para garantizar type-safety en la navegación.
 */

import { TipoIsla, NivelDificultad } from '../types';

// ========================================
// ROOT NAVIGATOR (Stack principal)
// ========================================

export type RootStackParamList = {
  // Flujo inicial
  Splash: undefined;
  Welcome: undefined;
  Tutorial: undefined;

  // Flujo principal de la app
  App: undefined;
};

// ========================================
// APP NAVIGATOR (Flujo principal de la aplicación)
// ========================================

export type AppStackParamList = {
  // Hub central
  MainMap: undefined;

  // Flujo de islas y actividades
  Island: {
    islandType: TipoIsla;
  };

  PreActivity: {
    activityId: string;
  };

  VideoModeling: {
    activityId: string;
  };

  Activity: {
    activityId: string;
    duracion?: 'corta' | 'normal' | 'larga';
    nivel?: NivelDificultad;
  };

  // Flujo de recompensas y calma
  Reward: {
    activityId: string;
    stars: number;
    timeSpent: number;
  };

  CalmCorner: {
    triggeredBy?: 'ai' | 'user' | 'auto';
  };

  // Portal de padres
  ParentDashboard: undefined;

  ProgressDetail: {
    childId: string;
  };

  AIsuggestions: undefined;

  // Configuración
  Settings: undefined;
};

// ========================================
// TIPOS DE NAVEGACIÓN (Para uso en componentes)
// ========================================

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Root Navigator
export type RootNavigationProp = StackNavigationProp<RootStackParamList>;
export type RootRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

// App Navigator
export type AppNavigationProp = StackNavigationProp<AppStackParamList>;
export type AppRouteProp<T extends keyof AppStackParamList> = RouteProp<
  AppStackParamList,
  T
>;

// ========================================
// TIPOS ESPECÍFICOS POR PANTALLA
// ========================================

// Splash Screen
export type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;

// Welcome Screen
export type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

// Tutorial Screen
export type TutorialScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Tutorial'
>;

// MainMap Screen
export type MainMapScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'MainMap'
>;

// Island Screen
export type IslandScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'Island'
>;
export type IslandScreenRouteProp = RouteProp<AppStackParamList, 'Island'>;

// PreActivity Screen
export type PreActivityScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'PreActivity'
>;
export type PreActivityScreenRouteProp = RouteProp<
  AppStackParamList,
  'PreActivity'
>;

// VideoModeling Screen
export type VideoModelingScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'VideoModeling'
>;
export type VideoModelingScreenRouteProp = RouteProp<
  AppStackParamList,
  'VideoModeling'
>;

// Activity Screen
export type ActivityScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'Activity'
>;
export type ActivityScreenRouteProp = RouteProp<AppStackParamList, 'Activity'>;

// Reward Screen
export type RewardScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'Reward'
>;
export type RewardScreenRouteProp = RouteProp<AppStackParamList, 'Reward'>;

// CalmCorner Screen
export type CalmCornerScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'CalmCorner'
>;
export type CalmCornerScreenRouteProp = RouteProp<
  AppStackParamList,
  'CalmCorner'
>;

// ParentDashboard Screen
export type ParentDashboardScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'ParentDashboard'
>;

// ProgressDetail Screen
export type ProgressDetailScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'ProgressDetail'
>;
export type ProgressDetailScreenRouteProp = RouteProp<
  AppStackParamList,
  'ProgressDetail'
>;

// AISuggestions Screen
export type AISuggestionsScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'AIsuggestions'
>;

// Settings Screen
export type SettingsScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'Settings'
>;

// ========================================
// OPCIONES DE NAVEGACIÓN COMUNES
// ========================================

export const defaultScreenOptions = {
  headerShown: false,
  gestureEnabled: true,
  cardStyleInterpolator: ({ current: { progress } }: any) => ({
    cardStyle: {
      opacity: progress,
    },
  }),
};

// Opciones de animación suaves para niños
export const gentleScreenOptions = {
  ...defaultScreenOptions,
  animationEnabled: true,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 300,
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 300,
      },
    },
  },
};
