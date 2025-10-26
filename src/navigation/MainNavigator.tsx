import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigator from './StackNavigator';

/**
 * MainNavigator - Punto de entrada de la navegación
 *
 * Envuelve toda la aplicación con:
 * - NavigationContainer: Contenedor principal de React Navigation
 * - SafeAreaProvider: Gestión de áreas seguras (notch, home indicator, etc.)
 * - StackNavigator: Navegación principal
 *
 * Este es el componente que se monta en App.tsx
 *
 * Mandamientos cumplidos:
 * - ✅ Anti-Especulación: Basado en React Navigation docs
 * - ✅ Anti-Placebo: Navegación funcional real
 * - ✅ Imports: StackNavigator desde navigation/
 * - ✅ Código es ley: Sin placeholders, todo funcional
 */
export const MainNavigator: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default MainNavigator;
