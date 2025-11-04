/**
 * Navegador Principal - Proyecto Lince
 * Basado en: APP_BLUEPRINT.md - Flujos de Usuario
 *
 * Gestiona toda la navegación de la aplicación:
 * - Stack Navigator para flujo principal
 * - Tab Navigator para Portal de Padres
 *
 * MANDAMIENTOS:
 * - NO especulación: Solo código funcional
 * - Imports SOLO desde types/
 * - i18n desde constants/strings
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RootStackParamList, PortalTabParamList } from './types';
import { theme } from '../constants';

import SplashScreen from '../screens/SplashScreen';
import BienvenidaScreen from '../screens/BienvenidaScreen';
import TutorialScreen from '../screens/TutorialScreen';
import MapaMundoScreen from '../screens/MapaMundoScreen';
import VistaIslaScreen from '../screens/VistaIslaScreen';
import PreActividadScreen from '../screens/PreActividadScreen';
import VideoModeladoScreen from '../screens/VideoModeladoScreen';
import ActividadPrincipalScreen from '../screens/ActividadPrincipalScreen';
import PausaActividadScreen from '../screens/PausaActividadScreen';
import RecompensaScreen from '../screens/RecompensaScreen';
import RinconCalmaScreen from '../screens/RinconCalmaScreen';
import DashboardPadresScreen from '../screens/DashboardPadresScreen';
import ProgresoDetalladoScreen from '../screens/ProgresoDetalladoScreen';
import PanelAdminScreen from '../screens/PanelAdminScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<PortalTabParamList>();

/**
 * Portal de Padres Tab Navigator
 * Pantallas: Dashboard, Progreso, Admin
 */
function PortalPadresNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.verdeJungla,
        tabBarInactiveTintColor: theme.colors.grisOscuro,
        tabBarStyle: {
          backgroundColor: theme.colors.blancoPuro,
          borderTopColor: theme.colors.grisClaro,
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: theme.typography.fontSize.bodySmall,
          fontFamily: theme.typography.fontFamily.secondary,
        },
      }}
    >
      <Tab.Screen
        name="DashboardPadres"
        component={DashboardPadresScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarAccessibilityLabel: 'Dashboard de padres',
        }}
      />
      <Tab.Screen
        name="ProgresoDetallado"
        component={ProgresoDetalladoScreen}
        options={{
          tabBarLabel: 'Progreso',
          tabBarAccessibilityLabel: 'Progreso detallado',
        }}
      />
      <Tab.Screen
        name="PanelAdmin"
        component={PanelAdminScreen}
        options={{
          tabBarLabel: 'Admin',
          tabBarAccessibilityLabel: 'Panel administrativo',
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * AppNavigator Principal
 * Stack Navigator con todas las pantallas de la app
 */
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: {
            backgroundColor: theme.colors.blancoPuro,
          },
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="Bienvenida"
          component={BienvenidaScreen}
          options={{
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="Tutorial"
          component={TutorialScreen}
        />

        <Stack.Screen
          name="MapaMundo"
          component={MapaMundoScreen}
          options={{
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="VistaIsla"
          component={VistaIslaScreen}
        />

        <Stack.Screen
          name="PreActividad"
          component={PreActividadScreen}
        />

        <Stack.Screen
          name="VideoModelado"
          component={VideoModeladoScreen}
        />

        <Stack.Screen
          name="ActividadPrincipal"
          component={ActividadPrincipalScreen}
          options={{
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="PausaActividad"
          component={PausaActividadScreen}
        />

        <Stack.Screen
          name="Recompensa"
          component={RecompensaScreen}
          options={{
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="RinconCalma"
          component={RinconCalmaScreen}
          options={{
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="PortalPadres"
          component={PortalPadresNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
