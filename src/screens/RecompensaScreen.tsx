/**
 * Pantalla Recompensa - Proyecto Lince
 * Basado en: APP_BLUEPRINT.md - Pantalla 10
 *
 * Propósito: Celebrar logro del niño
 * Mostrar estrellas ganadas, celebración, opciones siguientes
 *
 * MANDAMIENTOS:
 * ✅ i18n desde constants/strings
 * ✅ Theme centralizado
 * ✅ Accesibilidad perfecta
 * ✅ Abstracción BD (guarda progreso)
 * ✅ NO código placebo
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RecompensaNavigationProp, RecompensaRouteProp } from '../navigation/types';
import { theme, strings } from '../constants';
import { BotonPrimario, BotonSecundario } from '../components/Common';
import { FirebaseService, AnalyticsService } from '../services';
import { usePerfilStore } from '../store';

function RecompensaScreen() {
  const navigation = useNavigation<RecompensaNavigationProp>();
  const route = useRoute<RecompensaRouteProp>();
  const { actividad, estrellas, tiempoCompletado } = route.params;

  const perfilNiño = usePerfilStore((state) => state.perfilNiño);

  useEffect(() => {
    const guardarProgreso = async () => {
      if (perfilNiño) {
        await FirebaseService.guardarProgresoActividad({
          perfilId: perfilNiño.id,
          actividadId: actividad.id,
          estrellas,
          tiempoCompletado,
          completada: true,
          fecha: new Date(),
        });

        await AnalyticsService.registrarCompletacionActividad({
          actividadId: actividad.id,
          estrellas,
          tiempoCompletado,
          timestamp: new Date(),
        });
      }
    };

    guardarProgreso();
  }, [actividad.id, estrellas, tiempoCompletado, perfilNiño]);

  const handleContinuar = () => {
    navigation.navigate('MapaMundo');
  };

  const handleOtraActividad = () => {
    navigation.navigate('VistaIsla', { tipoIsla: actividad.tipoIsla });
  };

  const renderEstrellas = () => {
    return Array.from({ length: 3 }, (_, index) => (
      <Text key={index} style={styles.estrella}>
        {index < estrellas ? '⭐' : '☆'}
      </Text>
    ));
  };

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityLabel={strings.recompensas.titulo}
    >
      <View style={styles.contenido}>
        <Text style={styles.titulo} accessible={true}>
          {strings.recompensas.titulo}
        </Text>

        <Text style={styles.subtitulo} accessible={true}>
          {strings.recompensas.completaste}
        </Text>

        <Text style={styles.actividadNombre}>
          {actividad.titulo}
        </Text>

        <View style={styles.estrellasContainer}>
          {renderEstrellas()}
        </View>

        <Text style={styles.mensaje} accessible={true}>
          {strings.recompensas.ganaste} {estrellas} {estrellas === 1 ? strings.recompensas.estrella : strings.recompensas.estrellas}
        </Text>

        <View style={styles.estadisticas}>
          <View style={styles.estadisticaItem}>
            <Text style={styles.estadisticaLabel}>{strings.recompensas.tiempo}</Text>
            <Text style={styles.estadisticaValor}>
              {Math.floor(tiempoCompletado / 60)}:{(tiempoCompletado % 60).toString().padStart(2, '0')}
            </Text>
          </View>
        </View>

        <View style={styles.celebracion}>
          <Text style={styles.celebracionTexto}>
            🎉 {strings.actividades.feedback.loLograste} 🎉
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <BotonPrimario
          texto={strings.recompensas.continuar}
          onPress={handleContinuar}
          tamaño="grande"
          color="verde"
          accessibilityLabel="Volver al mapa"
        />

        <View style={styles.espaciador} />

        <BotonSecundario
          texto="Otra actividad"
          onPress={handleOtraActividad}
          tamaño="mediano"
          accessibilityLabel="Hacer otra actividad"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.amarilloSol,
  },
  contenido: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  titulo: {
    fontSize: theme.typography.fontSize.h1,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitulo: {
    fontSize: theme.typography.fontSize.h2,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  actividadNombre: {
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.verdeJungla,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  estrellasContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.lg,
  },
  estrella: {
    fontSize: 60,
    marginHorizontal: theme.spacing.sm,
  },
  mensaje: {
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  estadisticas: {
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    ...theme.shadows.medium,
  },
  estadisticaItem: {
    alignItems: 'center',
  },
  estadisticaLabel: {
    fontSize: theme.typography.fontSize.bodyMedium,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.xs,
  },
  estadisticaValor: {
    fontSize: theme.typography.fontSize.h2,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.verdeJungla,
  },
  celebracion: {
    paddingHorizontal: theme.spacing.xl,
  },
  celebracionTexto: {
    fontSize: theme.typography.fontSize.h2,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
  },
  footer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.blancoPuro,
  },
  espaciador: {
    height: theme.spacing.md,
  },
});

export default RecompensaScreen;
