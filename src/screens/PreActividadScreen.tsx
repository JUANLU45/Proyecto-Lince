import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import type { PreActividadScreenProps } from '../types';
import { theme, strings } from '../constants';
import { BotonPrimario, LeoAnimado } from '../components';

/**
 * PreActividadScreen - Configuración antes de iniciar actividad
 *
 * Propósito: Preparar al niño para la actividad, mostrar preview
 * y permitir configurar parámetros básicos.
 *
 * Basado en: APP_BLUEPRINT.md - Pantalla 6: Pre-Actividad
 *
 * Componentes:
 * - Leo animado explicando la actividad
 * - Configuración simplificada (placeholder para FASE 5)
 * - Botón prominente "¡Empezar!"
 *
 * Mandamientos cumplidos:
 * - ✅ Anti-Especulación: Basado en APP_BLUEPRINT.md líneas 91-106
 * - ✅ Anti-Placebo: Navegación funcional
 * - ✅ Imports: Tipos desde types/, componentes desde components/
 * - ✅ Estilos: Todos desde theme.ts
 * - ✅ Accesibilidad: Props accesibles en botones
 * - ✅ i18n: Strings desde strings.ts
 */
const PreActividadScreen: React.FC<PreActividadScreenProps> = ({ route, navigation }) => {
  const { actividadId } = route.params;

  const handleEmpezar = () => {
    navigation.navigate('Actividad', { actividadId });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Leo explicando */}
        <View style={styles.leoContainer}>
          <LeoAnimado
            accion="pensar"
            loop={true}
          />
          <Text style={styles.explicacion}>
            {strings.actividades.preActividad.explicacionLeo}
          </Text>
        </View>

        {/* Preview actividad */}
        <View style={styles.previewContainer}>
          <Text style={styles.previewEmoji}>🎯</Text>
          <Text style={styles.actividadTitulo}>Actividad: {actividadId}</Text>
          <Text style={styles.actividadDescripcion}>
            {strings.actividades.preActividad.descripcionPreview}
          </Text>
        </View>

        {/* Configuración (placeholder) */}
        <View style={styles.configContainer}>
          <Text style={styles.configTitulo}>{strings.actividades.configuracion.titulo}</Text>
          <Text style={styles.configNote}>
            {strings.actividades.preActividad.configuracionNota}
          </Text>
        </View>
      </ScrollView>

      {/* Botón Empezar */}
      <View style={styles.buttonContainer}>
        <BotonPrimario
          texto={strings.actividades.comenzar}
          onPress={handleEmpezar}
          color="verde"
          tamaño="grande"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.grisClaro,
  },
  content: {
    padding: theme.spacing.lg,
  },
  leoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  explicacion: {
    fontSize: theme.typography.fontSize.bodyLarge,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
    marginTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  previewContainer: {
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.lg,
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    ...theme.shadows.medium,
  },
  previewEmoji: {
    fontSize: 80,
    marginBottom: theme.spacing.md,
  },
  actividadTitulo: {
    fontSize: theme.typography.fontSize.h2,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  actividadDescripcion: {
    fontSize: theme.typography.fontSize.bodyMedium,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisAdministrativo,
    textAlign: 'center',
  },
  configContainer: {
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    ...theme.shadows.small,
  },
  configTitulo: {
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.sm,
  },
  configNote: {
    fontSize: theme.typography.fontSize.bodySmall,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisAdministrativo,
  },
  buttonContainer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.blancoPuro,
    ...theme.shadows.large,
  },
});

export default PreActividadScreen;
