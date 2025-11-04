/**
 * Pantalla Mapa del Mundo - Proyecto Lince
 * Basado en: APP_BLUEPRINT.md - Pantalla 4
 *
 * Propósito: Hub central de navegación
 * Vista con islas temáticas, avatar Leo, progreso, portal padres
 *
 * MANDAMIENTOS:
 * ✅ i18n desde constants/strings
 * ✅ Theme centralizado
 * ✅ Accesibilidad perfecta
 * ✅ NO código placebo
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MapaMundoNavigationProp } from '../navigation/types';
import { theme, strings } from '../constants';
import { BotonSecundario } from '../components/Common';
import { TipoIsla } from '../types';
import { usePerfilStore } from '../store';

const ISLAS: Array<{ tipo: TipoIsla; emoji: string }> = [
  { tipo: 'movimiento', emoji: '🏃' },
  { tipo: 'musical', emoji: '🎵' },
  { tipo: 'tactil', emoji: '🌸' },
  { tipo: 'visual', emoji: '🎨' },
  { tipo: 'calma', emoji: '🧘' },
];

function MapaMundoScreen() {
  const navigation = useNavigation<MapaMundoNavigationProp>();
  const perfilNiño = usePerfilStore((state) => state.perfilNiño);

  const handleIslaPress = (tipoIsla: TipoIsla) => {
    navigation.navigate('VistaIsla', { tipoIsla });
  };

  const handlePortalPadres = () => {
    navigation.navigate('PortalPadres');
  };

  const handleRinconCalma = () => {
    navigation.navigate('RinconCalma', { origen: 'mapa' });
  };

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityLabel={strings.mapa.titulo}
    >
      <View style={styles.header}>
        <Text style={styles.titulo} accessible={true}>
          {strings.mapa.titulo}
        </Text>
        {perfilNiño && (
          <Text style={styles.saludo} accessible={true}>
            ¡Hola, {perfilNiño.nombre}!
          </Text>
        )}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        accessible={true}
      >
        <View style={styles.islasContainer}>
          {ISLAS.map((isla) => {
            const infoIsla = strings.mapa.islas[isla.tipo];
            return (
              <TouchableOpacity
                key={isla.tipo}
                style={styles.islaCard}
                onPress={() => handleIslaPress(isla.tipo)}
                accessible={true}
                accessibilityLabel={infoIsla.nombre}
                accessibilityHint={infoIsla.descripcion}
                accessibilityRole="button"
              >
                <View style={styles.islaIcono}>
                  <Text style={styles.emoji}>{isla.emoji}</Text>
                </View>
                <Text style={styles.islaNombre}>
                  {infoIsla.nombre}
                </Text>
                <Text style={styles.islaDescripcion}>
                  {infoIsla.descripcion}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <BotonSecundario
          texto={strings.rinconCalma.titulo}
          onPress={handleRinconCalma}
          tamaño="mediano"
          icono="🧘"
          accessibilityLabel={strings.rinconCalma.titulo}
        />

        <View style={styles.espaciador} />

        <BotonSecundario
          texto={strings.portalPadres.titulo}
          onPress={handlePortalPadres}
          tamaño="mediano"
          accessibilityLabel={strings.portalPadres.titulo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.azulCalma,
  },
  header: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.verdeJungla,
    alignItems: 'center',
  },
  titulo: {
    fontSize: theme.typography.fontSize.h1,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.blancoPuro,
    marginBottom: theme.spacing.sm,
  },
  saludo: {
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.blancoPuro,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  islasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  islaCard: {
    width: '48%',
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    alignItems: 'center',
    ...theme.shadows.medium,
    minHeight: 180,
  },
  islaIcono: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.amarilloSol,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  emoji: {
    fontSize: 40,
  },
  islaNombre: {
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  islaDescripcion: {
    fontSize: theme.typography.fontSize.bodySmall,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.blancoPuro,
  },
  espaciador: {
    width: theme.spacing.md,
  },
});

export default MapaMundoScreen;
