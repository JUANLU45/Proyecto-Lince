/**
 * Tipos de Navegación - React Navigation
 * Define los parámetros de todas las rutas de la aplicación
 * 
 * Basado en: APP_BLUEPRINT.md y UI_COMPONENTS.md
 */

import type { NavigationProp, RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { TipoIsla } from './Actividad';
import type { SugerenciaIA } from './IA';

/**
 * Root Stack Param List - Todas las pantallas principales
 */
export type RootStackParamList = {
  // Splash y Onboarding
  Splash: undefined;
  Onboarding: undefined;
  Tutorial: undefined;
  
  // App principal (con tabs)
  App: undefined;
  
  // Modals
  Isla: { islaId: TipoIsla };
  PreActividad: { actividadId: string };
  Actividad: { actividadId: string };
  Recompensa: { actividadId: string; puntos: number };
  RinconCalma: undefined;
  SugerenciaIA: { sugerencia: SugerenciaIA };
  ProgresoDetallado: undefined;
  AdminPanel: undefined;
};

/**
 * Tab Navigator Param List - Bottom Tabs
 */
export type TabParamList = {
  MapaMundo: undefined;
  PortalPadres: undefined;
  Configuracion: undefined;
};

/**
 * Navigation Props para cada pantalla
 */
export type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;
export type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;
export type TutorialScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Tutorial'>;
// Composite navigation types para pantallas en TabNavigator que necesitan acceso al Stack
export type MapaMundoScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'MapaMundo'>,
  StackNavigationProp<RootStackParamList>
>;
export type PortalPadresScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'PortalPadres'>,
  StackNavigationProp<RootStackParamList>
>;
export type ConfiguracionScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Configuracion'>,
  StackNavigationProp<RootStackParamList>
>;

// Stack navigation types
export type IslaScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Isla'>;
export type PreActividadScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PreActividad'>;
export type ActividadScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Actividad'>;
export type RecompensaScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Recompensa'>;
export type RinconCalmaScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RinconCalma'>;
export type SugerenciaIAScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SugerenciaIA'>;
export type ProgresoDetalladoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProgresoDetallado'>;
export type AdminPanelScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AdminPanel'>;

/**
 * Route Props para cada pantalla
 */
export type IslaScreenRouteProp = RouteProp<RootStackParamList, 'Isla'>;
export type PreActividadScreenRouteProp = RouteProp<RootStackParamList, 'PreActividad'>;
export type ActividadScreenRouteProp = RouteProp<RootStackParamList, 'Actividad'>;
export type RecompensaScreenRouteProp = RouteProp<RootStackParamList, 'Recompensa'>;
export type SugerenciaIAScreenRouteProp = RouteProp<RootStackParamList, 'SugerenciaIA'>;

/**
 * Helper types combinados
 */
export type IslaScreenProps = {
  navigation: IslaScreenNavigationProp;
  route: IslaScreenRouteProp;
};

export type PreActividadScreenProps = {
  navigation: PreActividadScreenNavigationProp;
  route: PreActividadScreenRouteProp;
};

export type ActividadScreenProps = {
  navigation: ActividadScreenNavigationProp;
  route: ActividadScreenRouteProp;
};

export type RecompensaScreenProps = {
  navigation: RecompensaScreenNavigationProp;
  route: RecompensaScreenRouteProp;
};

export type SugerenciaIAScreenProps = {
  navigation: SugerenciaIAScreenNavigationProp;
  route: SugerenciaIAScreenRouteProp;
};

export type RinconCalmaScreenProps = {
  navigation: RinconCalmaScreenNavigationProp;
};

export type ProgresoDetalladoScreenProps = {
  navigation: ProgresoDetalladoScreenNavigationProp;
};

export type AdminPanelScreenProps = {
  navigation: AdminPanelScreenNavigationProp;
};
