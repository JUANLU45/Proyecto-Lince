/**
 * MainMapScreen - Mapa del Mundo de Leo (Hub Central)
 * Basado en: APP_BLUEPRINT.md - Pantalla 4: Mapa del Mundo de Leo
 *
 * Funcionalidad:
 * - Hub central de navegación
 * - Vista isométrica colorida del mundo
 * - Islas temáticas (movimiento, musical, táctil, visual, calma)
 * - Avatar de Leo interactivo
 * - Barra de progreso global
 * - Acceso rápido al portal de padres
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainMapScreenNavigationProp } from '../navigation/types';

// Imports desde directorios centralizados - Mandamiento 📂
import { theme, strings } from '../constants';
import { TipoIsla } from '../types';

const { width } = Dimensions.get('window');

interface Island {
  type: TipoIsla;
  nombre: string;
  descripcion: string;
  color: string;
  emoji: string;
}

const islands: Island[] = [
  {
    type: 'movimiento',
    nombre: strings.mapa.islas.movimiento.nombre,
    descripcion: strings.mapa.islas.movimiento.descripcion,
    color: theme.colors.verdeJungla,
    emoji: '🏃',
  },
  {
    type: 'musical',
    nombre: strings.mapa.islas.musical.nombre,
    descripcion: strings.mapa.islas.musical.descripcion,
    color: theme.colors.amarilloSol,
    emoji: '🎵',
  },
  {
    type: 'tactil',
    nombre: strings.mapa.islas.tactil.nombre,
    descripcion: strings.mapa.islas.tactil.descripcion,
    color: theme.colors.azulCalma,
    emoji: '🌸',
  },
  {
    type: 'visual',
    nombre: strings.mapa.islas.visual.nombre,
    descripcion: strings.mapa.islas.visual.descripcion,
    color: theme.colors.rojoPeligro,
    emoji: '🎨',
  },
  {
    type: 'calma',
    nombre: strings.mapa.islas.calma.nombre,
    descripcion: strings.mapa.islas.calma.descripcion,
    color: theme.colors.azulCalma,
    emoji: '🧘',
  },
];

const MainMapScreen: React.FC = () => {
  const navigation = useNavigation<MainMapScreenNavigationProp>();

  const handleIslandPress = (islandType: TipoIsla) => {
    if (islandType === 'calma') {
      navigation.navigate('CalmCorner', { triggeredBy: 'user' });
    } else {
      navigation.navigate('Island', { islandType });
    }
  };

  const handleParentPortal = () => {
    navigation.navigate('ParentDashboard');
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{strings.mapa.titulo}</Text>

        {/* Botón portal de padres */}
        <TouchableOpacity
          style={styles.parentButton}
          onPress={handleParentPortal}
          accessible={true}
          accessibilityLabel={strings.portalPadres.titulo}
          accessibilityRole="button"
        >
          <Text style={styles.parentButtonText}>👨‍👩‍👧‍👦</Text>
        </TouchableOpacity>

        {/* Botón configuración */}
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handleSettings}
          accessible={true}
          accessibilityLabel={strings.configuracion.titulo}
          accessibilityRole="button"
        >
          <Text style={styles.settingsButtonText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Mapa de islas */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.islandsContainer}>
          {islands.map((island) => (
            <TouchableOpacity
              key={island.type}
              style={[styles.islandCard, { backgroundColor: island.color }]}
              onPress={() => handleIslandPress(island.type)}
              accessible={true}
              accessibilityLabel={`${island.nombre}. ${island.descripcion}`}
              accessibilityRole="button"
            >
              <Text style={styles.islandEmoji}>{island.emoji}</Text>
              <Text style={styles.islandNombre}>{island.nombre}</Text>
              <Text style={styles.islandDescripcion}>
                {island.descripcion}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.grisClaro,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.blancoPuro,
    ...theme.shadows.small,
  },
  title: {
    fontSize: theme.typography.fontSize.h2,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.azulCalma,
    flex: 1,
    textAlign: 'center',
  },
  parentButton: {
    position: 'absolute',
    right: theme.spacing.lg + 50,
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.verdeJungla,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parentButtonText: {
    fontSize: 24,
  },
  settingsButton: {
    position: 'absolute',
    right: theme.spacing.lg,
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.grisOscuro,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButtonText: {
    fontSize: 24,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  islandsContainer: {
    gap: theme.spacing.lg,
  },
  islandCard: {
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.xl,
    alignItems: 'center',
    minHeight: 180,
    justifyContent: 'center',
    ...theme.shadows.medium,
  },
  islandEmoji: {
    fontSize: 64,
    marginBottom: theme.spacing.md,
  },
  islandNombre: {
    fontSize: theme.typography.fontSize.h2,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.blancoPuro,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  islandDescripcion: {
    fontSize: theme.typography.fontSize.bodyLarge,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.blancoPuro,
    textAlign: 'center',
  },
});

export default MainMapScreen;
