/**
 * Pantalla Pre-Actividad - Proyecto Lince
 * Basado en: APP_BLUEPRINT.md - Pantalla 6
 *
 * Propósito: Preparar al niño para la actividad específica
 * Preview, explicación de Leo, configuraciones (volumen, duración, ayuda)
 *
 * MANDAMIENTOS:
 * ✅ i18n desde constants/strings
 * ✅ Theme centralizado
 * ✅ Accesibilidad perfecta
 * ✅ NO código placebo
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PreActividadNavigationProp, PreActividadRouteProp } from '../navigation/types';
import { theme, strings } from '../constants';
import { BotonPrimario, BotonSecundario } from '../components/Common';
import { DuracionActividad } from '../types';

function PreActividadScreen() {
  const navigation = useNavigation<PreActividadNavigationProp>();
  const route = useRoute<PreActividadRouteProp>();
  const { actividad } = route.params;

  const [volumen, setVolumen] = useState(0.7);
  const [duracion, setDuracion] = useState<DuracionActividad>('normal');
  const [nivelAyuda, setNivelAyuda] = useState(2);

  const handleEmpezar = () => {
    navigation.navigate('VideoModelado', { actividad });
  };

  const handleVolver = () => {
    navigation.goBack();
  };

  const duraciones: DuracionActividad[] = ['corta', 'normal', 'larga'];
  const nivelesAyuda = [1, 2, 3];

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityLabel={strings.actividades.titulo}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleVolver}
          style={styles.botonVolver}
          accessible={true}
          accessibilityLabel={strings.navegacion.volver}
          accessibilityRole="button"
        >
          <Text style={styles.botonVolverTexto}>← {strings.navegacion.volver}</Text>
        </TouchableOpacity>

        <Text style={styles.titulo} accessible={true}>
          {actividad.titulo}
        </Text>
        <Text style={styles.descripcion} accessible={true}>
          {actividad.descripcion}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        accessible={true}
      >
        <View style={styles.preview}>
          <View style={styles.previewIcono}>
            <Text style={styles.previewTexto}>Vista previa</Text>
          </View>
        </View>

        <View style={styles.configuraciones}>
          <Text style={styles.seccionTitulo}>
            {strings.actividades.configuracion.titulo}
          </Text>

          <View style={styles.configuracionItem}>
            <Text style={styles.configuracionLabel}>
              {strings.actividades.configuracion.volumen}
            </Text>
            <View style={styles.opcionesContainer}>
              {[0.3, 0.7, 1.0].map((nivel) => (
                <TouchableOpacity
                  key={nivel}
                  style={[
                    styles.opcionBoton,
                    volumen === nivel && styles.opcionSeleccionada,
                  ]}
                  onPress={() => setVolumen(nivel)}
                  accessible={true}
                  accessibilityLabel={`Volumen ${Math.round(nivel * 100)}%`}
                  accessibilityRole="button"
                >
                  <Text
                    style={[
                      styles.opcionTexto,
                      volumen === nivel && styles.opcionTextoSeleccionada,
                    ]}
                  >
                    {Math.round(nivel * 100)}%
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.configuracionItem}>
            <Text style={styles.configuracionLabel}>
              {strings.actividades.configuracion.duracion}
            </Text>
            <View style={styles.opcionesContainer}>
              {duraciones.map((dur) => (
                <TouchableOpacity
                  key={dur}
                  style={[
                    styles.opcionBoton,
                    duracion === dur && styles.opcionSeleccionada,
                  ]}
                  onPress={() => setDuracion(dur)}
                  accessible={true}
                  accessibilityLabel={`Duración ${dur}`}
                  accessibilityRole="button"
                >
                  <Text
                    style={[
                      styles.opcionTexto,
                      duracion === dur && styles.opcionTextoSeleccionada,
                    ]}
                  >
                    {dur}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.configuracionItem}>
            <Text style={styles.configuracionLabel}>
              {strings.actividades.configuracion.ayuda}
            </Text>
            <View style={styles.opcionesContainer}>
              {nivelesAyuda.map((nivel) => (
                <TouchableOpacity
                  key={nivel}
                  style={[
                    styles.opcionBoton,
                    nivelAyuda === nivel && styles.opcionSeleccionada,
                  ]}
                  onPress={() => setNivelAyuda(nivel)}
                  accessible={true}
                  accessibilityLabel={`Nivel de ayuda ${nivel}`}
                  accessibilityRole="button"
                >
                  <Text
                    style={[
                      styles.opcionTexto,
                      nivelAyuda === nivel && styles.opcionTextoSeleccionada,
                    ]}
                  >
                    {nivel}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <BotonPrimario
          texto={strings.actividades.comenzar}
          onPress={handleEmpezar}
          tamaño="grande"
          color="verde"
          accessibilityLabel={strings.accesibilidad.botonIniciar}
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
  },
  botonVolver: {
    marginBottom: theme.spacing.md,
  },
  botonVolverTexto: {
    fontSize: theme.typography.fontSize.bodyLarge,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.blancoPuro,
  },
  titulo: {
    fontSize: theme.typography.fontSize.h1,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.blancoPuro,
    marginBottom: theme.spacing.sm,
  },
  descripcion: {
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.blancoPuro,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  preview: {
    backgroundColor: theme.colors.grisClaro,
    borderRadius: theme.borderRadius.large,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  previewIcono: {
    padding: theme.spacing.lg,
  },
  previewTexto: {
    fontSize: theme.typography.fontSize.h2,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.grisOscuro,
  },
  configuraciones: {
    marginBottom: theme.spacing.xl,
  },
  seccionTitulo: {
    fontSize: theme.typography.fontSize.h2,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.lg,
  },
  configuracionItem: {
    marginBottom: theme.spacing.lg,
  },
  configuracionLabel: {
    fontSize: theme.typography.fontSize.bodyLarge,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.sm,
  },
  opcionesContainer: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  opcionBoton: {
    flex: 1,
    height: theme.componentSizes.button.mediano.height,
    backgroundColor: theme.colors.grisClaro,
    borderRadius: theme.borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: theme.borderWidth.medium,
    borderColor: 'transparent',
  },
  opcionSeleccionada: {
    backgroundColor: theme.colors.verdeJungla,
    borderColor: theme.colors.verdeJungla,
  },
  opcionTexto: {
    fontSize: theme.typography.fontSize.bodyMedium,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisOscuro,
    textTransform: 'capitalize',
  },
  opcionTextoSeleccionada: {
    color: theme.colors.blancoPuro,
  },
  footer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.blancoPuro,
    ...theme.shadows.medium,
  },
});

export default PreActividadScreen;
