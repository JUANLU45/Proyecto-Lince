/**
 * Pantalla Actividad Principal - Proyecto Lince
 * Basado en: APP_BLUEPRINT.md - Pantalla 8
 *
 * Propósito: Núcleo de la experiencia terapéutica e interactiva
 * Leo en centro, área táctil, feedback inmediato, contador
 *
 * MANDAMIENTOS:
 * ✅ i18n desde constants/strings
 * ✅ Theme centralizado
 * ✅ Accesibilidad perfecta
 * ✅ IA adaptativa (usa AIService)
 * ✅ NO código placebo
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActividadPrincipalNavigationProp, ActividadPrincipalRouteProp } from '../navigation/types';
import { theme, strings } from '../constants';
import { AreaInteractiva, BarraProgreso, FeedbackVisual } from '../components/Activities';
import { BotonSecundario } from '../components/Common';
import { AIService, AnalyticsService } from '../services';
import { useAIStore } from '../store';

function ActividadPrincipalScreen() {
  const navigation = useNavigation<ActividadPrincipalNavigationProp>();
  const route = useRoute<ActividadPrincipalRouteProp>();
  const { actividad } = route.params;

  const [interacciones, setInteracciones] = useState(0);
  const [progreso, setProgreso] = useState(0);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [tiempoInicio] = useState(Date.now());
  const timerRef = useRef<NodeJS.Timeout>();

  const sugerenciaActiva = useAIStore((state) => state.sugerenciaActiva);

  const objetivo = 20;

  useEffect(() => {
    const iniciarSesion = async () => {
      await AnalyticsService.registrarInicioActividad({
        actividadId: actividad.id,
        timestamp: new Date(),
      });
    };

    iniciarSesion();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [actividad.id]);

  const handleInteraccion = async () => {
    const nuevasInteracciones = interacciones + 1;
    setInteracciones(nuevasInteracciones);

    const nuevoProgreso = Math.min((nuevasInteracciones / objetivo) * 100, 100);
    setProgreso(nuevoProgreso);

    setMostrarFeedback(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setMostrarFeedback(false);
    }, 500);

    await AnalyticsService.registrarInteraccion({
      actividadId: actividad.id,
      tipoInteraccion: 'toque',
      timestamp: new Date(),
      precision: 1.0,
    });

    if (nuevasInteracciones % 5 === 0) {
      await AIService.analizarComportamiento({
        actividadId: actividad.id,
        interacciones: nuevasInteracciones,
        tiempoTranscurrido: Date.now() - tiempoInicio,
      });
    }

    if (nuevasInteracciones >= objetivo) {
      handleCompletarActividad();
    }
  };

  const handleCompletarActividad = () => {
    const tiempoCompletado = Math.floor((Date.now() - tiempoInicio) / 1000);
    const estrellasGanadas = calcularEstrellas(tiempoCompletado, interacciones);

    navigation.replace('Recompensa', {
      actividad,
      estrellas: estrellasGanadas,
      tiempoCompletado,
    });
  };

  const calcularEstrellas = (tiempo: number, interacciones: number): number => {
    if (interacciones >= objetivo && tiempo < 30) return 3;
    if (interacciones >= objetivo && tiempo < 60) return 2;
    return 1;
  };

  const handlePausar = () => {
    navigation.navigate('PausaActividad', { actividad });
  };

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityLabel={actividad.titulo}
    >
      <View style={styles.header}>
        <BarraProgreso
          progreso={progreso}
          color="verdeJungla"
          accessibilityLabel={strings.accesibilidad.barraProgreso}
        />

        <View style={styles.contador}>
          <Text style={styles.contadorTexto}>
            {interacciones} / {objetivo}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.botonPausa}
          onPress={handlePausar}
          accessible={true}
          accessibilityLabel={strings.accesibilidad.botonPausar}
          accessibilityRole="button"
        >
          <Text style={styles.botonPausaTexto}>⏸</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.areaJuego}>
        <AreaInteractiva
          onInteraccion={handleInteraccion}
          colorFondo="azulCalma"
          mostrarFeedback={mostrarFeedback}
          accessibilityLabel={strings.accesibilidad.areaInteractiva}
          accessibilityHint={strings.accesibilidad.tocarAquiInteractuar}
        />

        {mostrarFeedback && (
          <FeedbackVisual
            tipo="excelente"
            mensaje={strings.actividades.feedback.excelente}
          />
        )}
      </View>

      {sugerenciaActiva && (
        <View style={styles.sugerenciaContainer}>
          <Text style={styles.sugerenciaTexto}>
            💡 {sugerenciaActiva.mensaje}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.blancoPuro,
  },
  header: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.blancoPuro,
    ...theme.shadows.small,
  },
  contador: {
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  contadorTexto: {
    fontSize: theme.typography.fontSize.h2,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.verdeJungla,
  },
  botonPausa: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.grisClaro,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.small,
  },
  botonPausaTexto: {
    fontSize: 24,
  },
  areaJuego: {
    flex: 1,
    position: 'relative',
  },
  sugerenciaContainer: {
    position: 'absolute',
    bottom: theme.spacing.lg,
    left: theme.spacing.lg,
    right: theme.spacing.lg,
    backgroundColor: theme.colors.amarilloSol,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    ...theme.shadows.medium,
  },
  sugerenciaTexto: {
    fontSize: theme.typography.fontSize.bodyLarge,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
  },
});

export default ActividadPrincipalScreen;
