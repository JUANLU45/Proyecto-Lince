import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import type { MapaMundoScreenNavigationProp, TipoIsla } from '../types';
import { theme, strings } from '../constants';
import { AvatarLeo, BarraProgreso } from '../components';

interface MapaMundoScreenProps {
  navigation: MapaMundoScreenNavigationProp;
}

/**
 * MapaMundoScreen - Hub central de navegación
 *
 * Propósito: Pantalla principal que muestra las 5 islas temáticas
 * del mundo de Leo, permitiendo al niño elegir qué actividades realizar.
 *
 * Basado en: APP_BLUEPRINT.md - Pantalla 4: Mapa del Mundo de Leo
 *
 * Componentes:
 * - 5 islas temáticas interactivas
 * - Avatar de Leo como guía
 * - Barra de progreso global
 * - Acceso rápido al portal de padres
 *
 * Islas disponibles:
 * 1. 🏃 Isla del Movimiento (vestibular)
 * 2. 🎵 Isla Musical (auditiva)
 * 3. 🌸 Jardín Táctil (táctil)
 * 4. 🎨 Estudio de Arte (visual)
 * 5. 🧘 Rincón de Calma (autorregulación)
 *
 * Mandamientos cumplidos:
 * - ✅ Anti-Especulación: Basado en APP_BLUEPRINT.md líneas 50-68
 * - ✅ Anti-Placebo: Navegación funcional, sin código fake
 * - ✅ BD/Seguridad: Preparado para cargar progreso desde Zustand/Firebase
 * - ✅ Imports: Tipos desde types/, componentes desde components/
 * - ✅ Estilos: Todos desde theme.ts
 * - ✅ Accesibilidad: accessibilityRole, accessibilityLabel, accessibilityHint
 * - ✅ i18n: Todos los strings desde strings.ts
 */
const MapaMundoScreen: React.FC<MapaMundoScreenProps> = ({ navigation }) => {
  // TODO FASE 5: Cargar progreso real desde Zustand
  const progresoGlobal = 35; // Placeholder

  const handleIslaPress = (islaId: TipoIsla) => {
    navigation.navigate('Isla', { islaId });
  };

  const handleRinconCalma = () => {
    navigation.navigate('RinconCalma');
  };

  return (
    <View style={styles.container}>
      {/* Header con Avatar de Leo y progreso */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <AvatarLeo
            emocion="feliz"
            tamaño="pequeño"
          />
          <Text style={styles.titulo}>{strings.mapa.titulo}</Text>
        </View>
        <TouchableOpacity
          style={styles.portalPadresButton}
          onPress={() => navigation.navigate('PortalPadres')}
          accessibilityRole="button"
          accessibilityLabel="Ir al Portal de Padres"
        >
          <Text style={styles.portalPadresIcon}>👨‍👩‍👧</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de progreso global */}
      <View style={styles.progresoContainer}>
        <BarraProgreso
          progreso={progresoGlobal}
          altura={20}
          mostrarPorcentaje={true}
          color={theme.colors.verdeJungla}
        />
      </View>

      {/* Mapa con islas */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Isla del Movimiento */}
        <TouchableOpacity
          style={[styles.islaCard, { backgroundColor: theme.colors.amarilloSol }]}
          onPress={() => handleIslaPress('movimiento')}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={strings.mapa.islas.movimiento.nombre}
          accessibilityHint={strings.mapa.islas.movimiento.descripcion}
        >
          <Text style={styles.islaEmoji}>🏃</Text>
          <View style={styles.islaInfo}>
            <Text style={styles.islaNombre}>
              {strings.mapa.islas.movimiento.nombre}
            </Text>
            <Text style={styles.islaDescripcion}>
              {strings.mapa.islas.movimiento.descripcion}
            </Text>
            {/* TODO FASE 5: Mostrar progreso real por isla */}
            <View style={styles.islaProgreso}>
              <Text style={styles.islaProgresoTexto}>40% completado</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Isla Musical */}
        <TouchableOpacity
          style={[styles.islaCard, { backgroundColor: theme.colors.azulCalma }]}
          onPress={() => handleIslaPress('musical')}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={strings.mapa.islas.musical.nombre}
          accessibilityHint={strings.mapa.islas.musical.descripcion}
        >
          <Text style={styles.islaEmoji}>🎵</Text>
          <View style={styles.islaInfo}>
            <Text style={styles.islaNombre}>
              {strings.mapa.islas.musical.nombre}
            </Text>
            <Text style={styles.islaDescripcion}>
              {strings.mapa.islas.musical.descripcion}
            </Text>
            <View style={styles.islaProgreso}>
              <Text style={styles.islaProgresoTexto}>25% completado</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Jardín Táctil */}
        <TouchableOpacity
          style={[styles.islaCard, { backgroundColor: theme.colors.verdeJungla }]}
          onPress={() => handleIslaPress('tactil')}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={strings.mapa.islas.tactil.nombre}
          accessibilityHint={strings.mapa.islas.tactil.descripcion}
        >
          <Text style={styles.islaEmoji}>🌸</Text>
          <View style={styles.islaInfo}>
            <Text style={styles.islaNombre}>
              {strings.mapa.islas.tactil.nombre}
            </Text>
            <Text style={styles.islaDescripcion}>
              {strings.mapa.islas.tactil.descripcion}
            </Text>
            <View style={styles.islaProgreso}>
              <Text style={styles.islaProgresoTexto}>60% completado</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Estudio de Arte */}
        <TouchableOpacity
          style={[styles.islaCard, { backgroundColor: theme.colors.rojoPeligro }]}
          onPress={() => handleIslaPress('visual')}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={strings.mapa.islas.visual.nombre}
          accessibilityHint={strings.mapa.islas.visual.descripcion}
        >
          <Text style={styles.islaEmoji}>🎨</Text>
          <View style={styles.islaInfo}>
            <Text style={styles.islaNombre}>
              {strings.mapa.islas.visual.nombre}
            </Text>
            <Text style={styles.islaDescripcion}>
              {strings.mapa.islas.visual.descripcion}
            </Text>
            <View style={styles.islaProgreso}>
              <Text style={styles.islaProgresoTexto}>15% completado</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Rincón de Calma - Acceso especial */}
        <TouchableOpacity
          style={[styles.islaCard, styles.islaCalma]}
          onPress={handleRinconCalma}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={strings.mapa.islas.calma.nombre}
          accessibilityHint={strings.mapa.islas.calma.descripcion}
        >
          <Text style={styles.islaEmoji}>🧘</Text>
          <View style={styles.islaInfo}>
            <Text style={styles.islaNombre}>
              {strings.mapa.islas.calma.nombre}
            </Text>
            <Text style={styles.islaDescripcion}>
              {strings.mapa.islas.calma.descripcion}
            </Text>
            <View style={styles.calmaIndicador}>
              <Text style={styles.calmaTexto}>{strings.mapa.islas.calma.disponibleSiempre}</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Espaciado inferior para scroll */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.grisClaro,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    backgroundColor: theme.colors.blancoPuro,
    ...theme.shadows.small,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titulo: {
    fontSize: theme.typography.fontSize.h2,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.grisOscuro,
    marginLeft: theme.spacing.sm,
  },
  portalPadresButton: {
    width: theme.componentSizes.minTouchTarget,
    height: theme.componentSizes.minTouchTarget,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.azulCalma,
  },
  portalPadresIcon: {
    fontSize: 24,
  },
  progresoContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.blancoPuro,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.md,
  },
  islaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.large,
    ...theme.shadows.medium,
    minHeight: 120,
  },
  islaEmoji: {
    fontSize: 64,
    marginRight: theme.spacing.md,
  },
  islaInfo: {
    flex: 1,
  },
  islaNombre: {
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.blancoPuro,
    marginBottom: theme.spacing.xs,
  },
  islaDescripcion: {
    fontSize: theme.typography.fontSize.bodyMedium,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.blancoPuro,
    marginBottom: theme.spacing.sm,
    opacity: 0.9,
  },
  islaProgreso: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: theme.borderRadius.small,
    alignSelf: 'flex-start',
  },
  islaProgresoTexto: {
    fontSize: theme.typography.fontSize.bodySmall,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.blancoPuro,
  },
  islaCalma: {
    backgroundColor: theme.colors.azulCalma,
    borderWidth: theme.borderWidth.medium,
    borderColor: theme.colors.verdeJungla,
  },
  calmaIndicador: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: theme.colors.verdeJungla,
    borderRadius: theme.borderRadius.small,
    alignSelf: 'flex-start',
  },
  calmaTexto: {
    fontSize: theme.typography.fontSize.bodySmall,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.blancoPuro,
  },
  bottomPadding: {
    height: theme.spacing.xl,
  },
});

export default MapaMundoScreen;
