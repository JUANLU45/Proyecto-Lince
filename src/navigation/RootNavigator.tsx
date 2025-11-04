/**
 * RootNavigator - Navegador raíz de la aplicación
 * Basado en: APP_BLUEPRINT.md y DEVELOPMENT_PLAN.md
 *
 * Maneja el flujo inicial:
 * 1. Splash Screen (carga)
 * 2. Welcome Screen (primera vez)
 * 3. Tutorial Screen (opcional)
 * 4. App Navigator (aplicación principal)
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList, gentleScreenOptions } from './types';

// Screens - serán importadas cuando se implementen
// Por ahora las declararemos como componentes placeholder que serán reemplazados
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import TutorialScreen from '../screens/TutorialScreen';
import AppNavigator from './AppNavigator';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={gentleScreenOptions}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Tutorial" component={TutorialScreen} />
        <Stack.Screen name="App" component={AppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
