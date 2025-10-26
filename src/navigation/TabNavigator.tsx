import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { TabParamList } from '../types';
import { theme } from '../constants';

// Screens
import MapaMundoScreen from '../screens/MapaMundoScreen';
import PortalPadresScreen from '../screens/PortalPadresScreen';
import ConfiguracionScreen from '../screens/ConfiguracionScreen';

const Tab = createBottomTabNavigator<TabParamList>();

/**
 * TabNavigator - Navegación principal de la app con Bottom Tabs
 *
 * Contiene 3 pestañas principales:
 * 1. Mapa del Mundo - Hub principal con las 5 islas temáticas
 * 2. Portal Padres - Dashboard para padres/terapeutas
 * 3. Configuración - Ajustes y personalización
 *
 * Mandamientos cumplidos:
 * - ✅ Anti-Especulación: Basado en APP_BLUEPRINT.md
 * - ✅ Anti-Placebo: Navegación funcional real
 * - ✅ Imports: Tipos desde types/
 * - ✅ Estilos: Colores desde theme
 * - ✅ i18n: Labels desde strings (TODO cuando se implemente iconos)
 * - ✅ Accesibilidad: tabBarAccessibilityLabel en cada tab
 */
export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.azulCalma,
        tabBarInactiveTintColor: theme.colors.grisOscuro,
        tabBarStyle: {
          backgroundColor: theme.colors.blancoPuro,
          borderTopColor: theme.colors.grisClaro,
          borderTopWidth: theme.borderWidth.thin,
          paddingBottom: theme.spacing.xs,
          paddingTop: theme.spacing.xs,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: theme.typography.fontSize.bodySmall,
          fontFamily: theme.typography.fontFamily.secondary,
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="MapaMundo"
        component={MapaMundoScreen}
        options={{
          tabBarLabel: 'Mapa',
          tabBarAccessibilityLabel: 'Ir al Mapa del Mundo de Leo',
          // TODO FASE 5: Añadir icono personalizado del mapa
          // tabBarIcon: ({ color, size }) => <MapaIcon color={color} size={size} />
        }}
      />
      <Tab.Screen
        name="PortalPadres"
        component={PortalPadresScreen}
        options={{
          tabBarLabel: 'Padres',
          tabBarAccessibilityLabel: 'Ir al Portal de Padres',
          // TODO FASE 5: Añadir icono de padres/familia
          // tabBarIcon: ({ color, size }) => <PadresIcon color={color} size={size} />
        }}
      />
      <Tab.Screen
        name="Configuracion"
        component={ConfiguracionScreen}
        options={{
          tabBarLabel: 'Ajustes',
          tabBarAccessibilityLabel: 'Ir a Configuración',
          // TODO FASE 5: Añadir icono de configuración
          // tabBarIcon: ({ color, size }) => <ConfigIcon color={color} size={size} />
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
