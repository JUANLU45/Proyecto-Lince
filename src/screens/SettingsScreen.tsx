/**
 * SettingsScreen - Configuración
 * Basado en: APP_BLUEPRINT.md - Pantalla 14: Configuración
 *
 * Funcionalidad:
 * - Configuración de la aplicación
 * - Perfil del niño
 * - Preferencias (volumen, notificaciones)
 * - Objetivos terapéuticos
 * - Ayuda y soporte
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingsScreenNavigationProp } from '../navigation/types';

// Imports desde directorios centralizados - Mandamiento 📂
import { theme, strings } from '../constants';
import { usePerfilStore } from '../store';

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { perfilActual, actualizarPerfil } = usePerfilStore();

  const [nombre, setNombre] = useState(perfilActual?.nombre || '');
  const [edad, setEdad] = useState(perfilActual?.edad?.toString() || '');
  const [notificaciones, setNotificaciones] = useState(true);
  const [volumen, setVolumen] = useState(70);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    if (nombre.trim() && edad.trim()) {
      actualizarPerfil({
        nombre: nombre.trim(),
        edad: parseInt(edad, 10),
      });
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          accessible={true}
          accessibilityLabel={strings.navegacion.volver}
          accessibilityRole="button"
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{strings.configuracion.titulo}</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Perfil del niño */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {strings.configuracion.perfil.titulo}
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {strings.configuracion.perfil.nombre}
            </Text>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Nombre"
              placeholderTextColor={theme.colors.grisOscuro}
              accessible={true}
              accessibilityLabel={strings.configuracion.perfil.nombre}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {strings.configuracion.perfil.edad}
            </Text>
            <TextInput
              style={styles.input}
              value={edad}
              onChangeText={setEdad}
              placeholder="Edad"
              keyboardType="number-pad"
              placeholderTextColor={theme.colors.grisOscuro}
              accessible={true}
              accessibilityLabel={strings.configuracion.perfil.edad}
            />
          </View>
        </View>

        {/* Preferencias */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {strings.configuracion.preferencias.titulo}
          </Text>

          <View style={styles.preferenceRow}>
            <Text style={styles.preferenceLabel}>
              {strings.configuracion.preferencias.notificaciones}
            </Text>
            <Switch
              value={notificaciones}
              onValueChange={setNotificaciones}
              trackColor={{
                false: theme.colors.grisClaro,
                true: theme.colors.verdeJungla,
              }}
              thumbColor={theme.colors.blancoPuro}
              accessible={true}
              accessibilityLabel={strings.configuracion.preferencias.notificaciones}
            />
          </View>

          <View style={styles.preferenceRow}>
            <Text style={styles.preferenceLabel}>
              {strings.configuracion.preferencias.volumen}
            </Text>
            <Text style={styles.volumeText}>{volumen}%</Text>
          </View>
        </View>

        {/* Objetivos terapéuticos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {strings.portalPadres.configuracion.objetivos}
          </Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              Configura los objetivos terapéuticos específicos en consulta con
              el terapeuta ocupacional.
            </Text>
          </View>
        </View>

        {/* Ayuda */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {strings.portalPadres.configuracion.ayuda}
          </Text>

          <TouchableOpacity
            style={styles.helpButton}
            accessible={true}
            accessibilityLabel="Centro de ayuda"
            accessibilityRole="button"
          >
            <Text style={styles.helpButtonText}>📚 Centro de ayuda</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.helpButton}
            accessible={true}
            accessibilityLabel="Contactar soporte"
            accessibilityRole="button"
          >
            <Text style={styles.helpButtonText}>📧 Contactar soporte</Text>
          </TouchableOpacity>
        </View>

        {/* Botón guardar */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          accessible={true}
          accessibilityLabel={strings.configuracion.guardar}
          accessibilityRole="button"
        >
          <Text style={styles.saveButtonText}>
            {strings.configuracion.guardar}
          </Text>
        </TouchableOpacity>
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
    backgroundColor: theme.colors.blancoPuro,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...theme.shadows.small,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.azulCalma,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  backButtonText: {
    fontSize: 24,
    color: theme.colors.blancoPuro,
  },
  title: {
    fontSize: theme.typography.fontSize.h2,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.azulCalma,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.h3,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.md,
  },
  inputGroup: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.typography.fontSize.bodyLarge,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.xs,
  },
  input: {
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    fontSize: theme.typography.fontSize.bodyLarge,
    color: theme.colors.grisOscuro,
    minHeight: theme.componentSizes.minTouchTarget,
    borderWidth: theme.borderWidth.medium,
    borderColor: theme.colors.grisClaro,
  },
  preferenceRow: {
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
    minHeight: theme.componentSizes.minTouchTarget,
  },
  preferenceLabel: {
    fontSize: theme.typography.fontSize.bodyLarge,
    color: theme.colors.grisOscuro,
  },
  volumeText: {
    fontSize: theme.typography.fontSize.bodyLarge,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.azulCalma,
  },
  infoCard: {
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
  },
  infoText: {
    fontSize: theme.typography.fontSize.bodyMedium,
    color: theme.colors.grisOscuro,
    lineHeight: theme.typography.fontSize.bodyMedium * theme.typography.lineHeight.normal,
  },
  helpButton: {
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    minHeight: theme.componentSizes.minTouchTarget,
    justifyContent: 'center',
  },
  helpButtonText: {
    fontSize: theme.typography.fontSize.bodyLarge,
    color: theme.colors.azulCalma,
  },
  saveButton: {
    backgroundColor: theme.colors.verdeJungla,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    alignItems: 'center',
    minHeight: theme.componentSizes.button.grande.height,
    justifyContent: 'center',
    marginTop: theme.spacing.xl,
    ...theme.shadows.medium,
  },
  saveButtonText: {
    fontSize: theme.typography.fontSize.button,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.blancoPuro,
  },
});

export default SettingsScreen;
