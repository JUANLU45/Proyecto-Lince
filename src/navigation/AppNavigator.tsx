/**
 * AppNavigator - Navegador principal de la aplicación
 * Basado en: APP_BLUEPRINT.md
 *
 * Flujo completo de la aplicación:
 * - MainMap (Hub central)
 * - Islas y actividades
 * - Portal de padres
 * - Configuración
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppStackParamList, gentleScreenOptions } from './types';

// Screens - serán importadas cuando se implementen
import MainMapScreen from '../screens/MainMapScreen';
import IslandScreen from '../screens/IslandScreen';
import PreActivityScreen from '../screens/PreActivityScreen';
import VideoModelingScreen from '../screens/VideoModelingScreen';
import ActivityScreen from '../screens/ActivityScreen';
import RewardScreen from '../screens/RewardScreen';
import CalmCornerScreen from '../screens/CalmCornerScreen';
import ParentDashboardScreen from '../screens/ParentDashboardScreen';
import ProgressDetailScreen from '../screens/ProgressDetailScreen';
import AISuggestionsScreen from '../screens/AISuggestionsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator<AppStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainMap"
      screenOptions={gentleScreenOptions}
    >
      {/* Hub Central - Mapa del Mundo de Leo */}
      <Stack.Screen
        name="MainMap"
        component={MainMapScreen}
        options={{
          headerShown: false,
          gestureEnabled: false, // No permitir swipe back desde mapa principal
        }}
      />

      {/* Flujo de Islas y Actividades */}
      <Stack.Screen
        name="Island"
        component={IslandScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PreActivity"
        component={PreActivityScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="VideoModeling"
        component={VideoModelingScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          headerShown: false,
          gestureEnabled: false, // No permitir swipe back durante actividad
        }}
      />

      {/* Recompensas y Calma */}
      <Stack.Screen
        name="Reward"
        component={RewardScreen}
        options={{
          headerShown: false,
          gestureEnabled: false, // No permitir salir hasta terminar animación
        }}
      />

      <Stack.Screen
        name="CalmCorner"
        component={CalmCornerScreen}
        options={{
          headerShown: false,
          presentation: 'modal', // Presentación como modal para diferenciarlo
        }}
      />

      {/* Portal de Padres */}
      <Stack.Screen
        name="ParentDashboard"
        component={ParentDashboardScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ProgressDetail"
        component={ProgressDetailScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AIsuggestions"
        component={AISuggestionsScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* Configuración */}
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
