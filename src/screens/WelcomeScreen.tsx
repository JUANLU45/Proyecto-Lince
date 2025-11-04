/**
 * WelcomeScreen - Pantalla de bienvenida y configuración inicial
 * Basado en: APP_BLUEPRINT.md - Pantalla 2: Bienvenida y Configuración Inicial
 *
 * Funcionalidad:
 * - Configurar el perfil del niño por primera vez
 * - Saludo de Leo el Lince
 * - Formulario simple para padres
 * - Redirigir a Tutorial
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WelcomeScreenNavigationProp } from '../navigation/types';

// Imports desde directorios centralizados - Mandamiento 📂
import { theme, strings } from '../constants';
import { usePerfilStore } from '../store';
import { NivelDesarrollo, PerfilNiño } from '../types';

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const { setPerfilActual } = usePerfilStore();

  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [nivel, setNivel] = useState<NivelDesarrollo>('básico');

  const handleContinuar = () => {
    if (nombre.trim() && edad.trim()) {
      const nuevoPerfil: PerfilNiño = {
        id: `temp-${Date.now()}`,
        nombre: nombre.trim(),
        edad: parseInt(edad, 10),
        fechaNacimiento: new Date(),
        nivelDesarrollo: nivel,
        preferencias: {
          visual: 50,
          auditivo: 50,
          tactil: 50,
          vestibular: 50,
          propioceptivo: 50,
        },
        comunicacionNoVerbal: {
          usaGestos: true,
          tiposGestos: [],
          usaExpresiones: true,
          usaVocalizaciones: false,
          nivelComprension: 50,
        },
        objetivosTerapeuticos: [],
        fechaCreacion: new Date(),
        ultimaActualizacion: new Date(),
      };

      setPerfilActual(nuevoPerfil);
      navigation.replace('Tutorial');
    }
  };

  const isFormValid = nombre.trim().length > 0 && edad.trim().length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Saludo de Leo */}
        <View style={styles.header}>
          <Text style={styles.title}>{strings.bienvenida.titulo}</Text>
          <Text style={styles.subtitle}>{strings.bienvenida.subtitulo}</Text>
        </View>

        {/* Formulario */}
        <View style={styles.form}>
          {/* Nombre */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              {strings.configuracion.perfil.nombre}
            </Text>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder={strings.configuracion.perfil.placeholderNombreNino}
              placeholderTextColor={theme.colors.grisOscuro}
              accessible={true}
              accessibilityLabel={strings.configuracion.perfil.nombre}
              autoCapitalize="words"
            />
          </View>

          {/* Edad */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              {strings.configuracion.perfil.edad}
            </Text>
            <TextInput
              style={styles.input}
              value={edad}
              onChangeText={setEdad}
              placeholder={strings.configuracion.perfil.placeholderEdad}
              placeholderTextColor={theme.colors.grisOscuro}
              keyboardType="number-pad"
              accessible={true}
              accessibilityLabel={strings.configuracion.perfil.edad}
            />
          </View>

          {/* Nivel de desarrollo */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>{strings.configuracion.nivelDesarrollo}</Text>
            <View style={styles.nivelContainer}>
              {(['básico', 'intermedio', 'avanzado'] as NivelDesarrollo[]).map(
                (nivelOption) => (
                  <TouchableOpacity
                    key={nivelOption}
                    style={[
                      styles.nivelButton,
                      nivel === nivelOption && styles.nivelButtonActive,
                    ]}
                    onPress={() => setNivel(nivelOption)}
                    accessible={true}
                    accessibilityLabel={`Nivel ${nivelOption}`}
                    accessibilityRole="button"
                  >
                    <Text
                      style={[
                        styles.nivelButtonText,
                        nivel === nivelOption && styles.nivelButtonTextActive,
                      ]}
                    >
                      {nivelOption.charAt(0).toUpperCase() + nivelOption.slice(1)}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>
        </View>

        {/* Botón continuar */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !isFormValid && styles.continueButtonDisabled,
            ]}
            onPress={handleContinuar}
            disabled={!isFormValid}
            accessible={true}
            accessibilityLabel={strings.bienvenida.empezar}
            accessibilityRole="button"
            accessibilityState={{ disabled: !isFormValid }}
          >
            <Text style={styles.continueButtonText}>
              {strings.bienvenida.empezar}
            </Text>
          </TouchableOpacity>
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
  scrollContent: {
    flexGrow: 1,
    padding: theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
    marginTop: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.fontSize.h1,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.azulCalma,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.h3,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
  },
  form: {
    marginBottom: theme.spacing.xl,
  },
  formGroup: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.typography.fontSize.bodyLarge,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.sm,
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
  nivelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  nivelButton: {
    flex: 1,
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    alignItems: 'center',
    minHeight: theme.componentSizes.minTouchTarget,
    justifyContent: 'center',
    borderWidth: theme.borderWidth.medium,
    borderColor: theme.colors.grisClaro,
  },
  nivelButtonActive: {
    backgroundColor: theme.colors.azulCalma,
    borderColor: theme.colors.azulCalma,
  },
  nivelButtonText: {
    fontSize: theme.typography.fontSize.bodyMedium,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.grisOscuro,
  },
  nivelButtonTextActive: {
    color: theme.colors.blancoPuro,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  continueButton: {
    backgroundColor: theme.colors.verdeJungla,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    alignItems: 'center',
    minHeight: theme.componentSizes.button.mediano.height,
    justifyContent: 'center',
    ...theme.shadows.medium,
  },
  continueButtonDisabled: {
    backgroundColor: theme.colors.grisClaro,
    opacity: theme.opacity.disabled,
  },
  continueButtonText: {
    fontSize: theme.typography.fontSize.button,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.blancoPuro,
  },
});

export default WelcomeScreen;
