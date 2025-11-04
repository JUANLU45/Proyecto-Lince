/**
 * Tipos de Navegación - Proyecto Lince
 * Basado en: APP_BLUEPRINT.md
 *
 * Define todas las rutas y parámetros de navegación
 */

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { TipoIsla, Actividad } from '../types';

/**
 * Parámetros del Stack Navigator principal
 */
export type RootStackParamList = {
  Splash: undefined;
  Bienvenida: undefined;
  Tutorial: undefined;
  MapaMundo: undefined;
  VistaIsla: { tipoIsla: TipoIsla };
  PreActividad: { actividad: Actividad };
  VideoModelado: { actividad: Actividad };
  ActividadPrincipal: { actividad: Actividad };
  PausaActividad: { actividad: Actividad };
  Recompensa: {
    actividad: Actividad;
    estrellas: number;
    tiempoCompletado: number;
  };
  RinconCalma: { origen?: string };
  PortalPadres: undefined;
};

/**
 * Parámetros del Tab Navigator del Portal de Padres
 */
export type PortalTabParamList = {
  DashboardPadres: undefined;
  ProgresoDetallado: undefined;
  PanelAdmin: undefined;
};

/**
 * Tipos de navegación para cada pantalla
 */
export type SplashNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;
export type BienvenidaNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Bienvenida'>;
export type TutorialNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Tutorial'>;
export type MapaMundoNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MapaMundo'>;
export type VistaIslaNavigationProp = NativeStackNavigationProp<RootStackParamList, 'VistaIsla'>;
export type PreActividadNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PreActividad'>;
export type VideoModeladoNavigationProp = NativeStackNavigationProp<RootStackParamList, 'VideoModelado'>;
export type ActividadPrincipalNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ActividadPrincipal'>;
export type PausaActividadNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PausaActividad'>;
export type RecompensaNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Recompensa'>;
export type RinconCalmaNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RinconCalma'>;
export type PortalPadresNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PortalPadres'>;

/**
 * Tipos de Route para cada pantalla
 */
export type VistaIslaRouteProp = RouteProp<RootStackParamList, 'VistaIsla'>;
export type PreActividadRouteProp = RouteProp<RootStackParamList, 'PreActividad'>;
export type VideoModeladoRouteProp = RouteProp<RootStackParamList, 'VideoModelado'>;
export type ActividadPrincipalRouteProp = RouteProp<RootStackParamList, 'ActividadPrincipal'>;
export type PausaActividadRouteProp = RouteProp<RootStackParamList, 'PausaActividad'>;
export type RecompensaRouteProp = RouteProp<RootStackParamList, 'Recompensa'>;
export type RinconCalmaRouteProp = RouteProp<RootStackParamList, 'RinconCalma'>;

/**
 * Tipos de navegación del Portal Tab Navigator
 */
export type DashboardPadresNavigationProp = BottomTabNavigationProp<PortalTabParamList, 'DashboardPadres'>;
export type ProgresoDetalladoNavigationProp = BottomTabNavigationProp<PortalTabParamList, 'ProgresoDetallado'>;
export type PanelAdminNavigationProp = BottomTabNavigationProp<PortalTabParamList, 'PanelAdmin'>;
