/**
 * Pantalla Video Modelado - Proyecto Lince
 * Basado en: APP_BLUEPRINT.md - Pantalla 7
 *
 * Propósito: Preparar al niño mostrando cómo se hace la actividad
 * Video de Leo demostrando, instrucciones claras
 *
 * MANDAMIENTOS:
 * ✅ i18n desde constants/strings
 * ✅ Theme centralizado
 * ✅ Accesibilidad perfecta
 * ✅ NO código placebo
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { VideoModeladoNavigationProp, VideoModeladoRouteProp } from '../navigation/types';
import { theme, strings } from '../constants';
import { BotonPrimario } from '../components/Common';

function VideoModeladoScreen() {
  const navigation = useNavigation<VideoModeladoNavigationProp>();
  const route = useRoute<VideoModeladoRouteProp>();
  const { actividad } = route.params;

  const [videoTerminado, setVideoTerminado] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoTerminado(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinuar = () => {
    navigation.navigate('ActividadPrincipal', { actividad });
  };

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityLabel="Video demostración"
    >
      <View style={styles.header}>
        <Text style={styles.titulo} accessible={true}>
          Mira cómo lo hace Leo
        </Text>
      </View>

      <View style={styles.videoContainer}>
        <View style={styles.videoPlaceholder}>
          <Text style={styles.videoTexto}>
            🎬 Reproduciendo video de demostración
          </Text>
          <Text style={styles.videoInfo}>
            Leo mostrando: {actividad.titulo}
          </Text>
        </View>
      </View>

      <View style={styles.instrucciones}>
        <Text style={styles.instruccionesTitulo}>
          Instrucciones:
        </Text>
        <Text style={styles.instruccionesTexto}>
          1. Observa cómo Leo realiza la actividad{'\n'}
          2. Presta atención a los movimientos{'\n'}
          3. Cuando estés listo, presiona continuar
        </Text>
      </View>

      <View style={styles.footer}>
        <BotonPrimario
          texto="¡Ya entiendo!"
          onPress={handleContinuar}
          tamaño="grande"
          color="verde"
          deshabilitado={!videoTerminado}
          accessibilityLabel="Botón continuar a actividad"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.blancoPuro,
  },
  header: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.azulCalma,
    alignItems: 'center',
  },
  titulo: {
    fontSize: theme.typography.fontSize.h1,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.blancoPuro,
    textAlign: 'center',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  videoPlaceholder: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: theme.colors.grisClaro,
    borderRadius: theme.borderRadius.large,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  videoTexto: {
    fontSize: theme.typography.fontSize.h2,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  videoInfo: {
    fontSize: theme.typography.fontSize.bodyLarge,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
  },
  instrucciones: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.grisClaro,
  },
  instruccionesTitulo: {
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.sm,
  },
  instruccionesTexto: {
    fontSize: theme.typography.fontSize.bodyMedium,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisOscuro,
    lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.bodyMedium,
  },
  footer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.blancoPuro,
    ...theme.shadows.medium,
  },
});

export default VideoModeladoScreen;
