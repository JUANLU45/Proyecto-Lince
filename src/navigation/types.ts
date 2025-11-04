/**
 * Tipos de navegación - Proyecto Lince
 * Basado en: APP_BLUEPRINT.md y @react-navigation/native
 *
 * Define todos los tipos de navegación y parámetros de pantallas
 * para garantizar type-safety en la navegación.
 */

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { TipoIsla, NivelDificultad, DuracionActividad } from '../types';

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Tutorial: undefined;
  App: undefined;
};

export type AppStackParamList = {
  MainMap: undefined;

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
    duracion?: DuracionActividad;
    nivel?: NivelDificultad;
  };

  Reward: {
    activityId: string;
    stars: number;
    timeSpent: number;
  };

  CalmCorner: {
    triggeredBy?: 'ai' | 'user' | 'auto';
  };

  ParentDashboard: undefined;

  ProgressDetail: {
    childId: string;
  };

  AIsuggestions: undefined;

  Settings: undefined;
};

export type RootNavigationProp = StackNavigationProp<RootStackParamList>;
export type RootRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

export type AppNavigationProp = StackNavigationProp<AppStackParamList>;
export type AppRouteProp<T extends keyof AppStackParamList> = RouteProp<
  AppStackParamList,
  T
>;

export type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;

export type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

export type TutorialScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Tutorial'
>;

export type MainMapScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'MainMap'
>;

export type IslandScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'Island'
>;
export type IslandScreenRouteProp = RouteProp<AppStackParamList, 'Island'>;

export type PreActivityScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'PreActivity'
>;
export type PreActivityScreenRouteProp = RouteProp<
  AppStackParamList,
  'PreActivity'
>;

export type VideoModelingScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'VideoModeling'
>;
export type VideoModelingScreenRouteProp = RouteProp<
  AppStackParamList,
  'VideoModeling'
>;

export type ActivityScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'Activity'
>;
export type ActivityScreenRouteProp = RouteProp<AppStackParamList, 'Activity'>;

export type RewardScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'Reward'
>;
export type RewardScreenRouteProp = RouteProp<AppStackParamList, 'Reward'>;

export type CalmCornerScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'CalmCorner'
>;
export type CalmCornerScreenRouteProp = RouteProp<
  AppStackParamList,
  'CalmCorner'
>;

export type ParentDashboardScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'ParentDashboard'
>;

export type ProgressDetailScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'ProgressDetail'
>;
export type ProgressDetailScreenRouteProp = RouteProp<
  AppStackParamList,
  'ProgressDetail'
>;

export type AISuggestionsScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'AIsuggestions'
>;

export type SettingsScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'Settings'
>;

export const defaultScreenOptions = {
  headerShown: false,
  gestureEnabled: true,
  cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
};

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
