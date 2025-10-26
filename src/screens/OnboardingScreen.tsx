/**
 * OnboardingScreen - Configuración inicial del perfil
 * Basado en: APP_BLUEPRINT.md líneas 19-35
 * 
 * Propósito: Configurar el perfil del niño por primera vez
 * Componentes:
 * - Saludo de Leo el Lince
 * - Formulario simple para padres
 * - Guardar perfil en Zustand + Firebase
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { theme, strings } from '../constants';
import type { OnboardingScreenNavigationProp } from '../types';
import AvatarLeo from '../components/Character/AvatarLeo';
import BotonPrimario from '../components/Common/BotonPrimario';

interface OnboardingScreenProps {
  navigation: OnboardingScreenNavigationProp;
}

/**
 * Componente OnboardingScreen
 * Según PROJECT_REQUIREMENTS.md RF-006: Configuración de perfil
 */
const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');

  const handleContinuar = () => {
    // Validación básica
    if (!nombre.trim() || !edad.trim()) {
      return;
    }

    // TODO: Guardar en Zustand y Firebase via services/
    // Por ahora navegar directo a Tutorial
    navigation.navigate('Tutorial');
  };

  const puedesContinuar = nombre.trim().length > 0 && edad.trim().length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Leo saluda */}
        <View style={styles.leoContainer}>
          <AvatarLeo 
            emocion="feliz" 
            tamaño="grande"
          />
          <Text style={styles.saludo}>
            ¡Hola! Soy Leo el Lince
          </Text>
          <Text style={styles.mensaje}>
            Vamos a conocernos un poco
          </Text>
        </View>

        {/* Formulario */}
        <View style={styles.form}>
          <Text style={styles.label}>
            ¿Cómo te llamas?
          </Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Nombre del niño"
            placeholderTextColor={theme.colors.grisAdministrativo}
            accessible
            accessibilityLabel="Campo de nombre"
          />

          <Text style={styles.label}>
            ¿Cuántos años tienes?
          </Text>
          <TextInput
            style={styles.input}
            value={edad}
            onChangeText={setEdad}
            placeholder="Edad"
            keyboardType="number-pad"
            placeholderTextColor={theme.colors.grisAdministrativo}
            accessible
            accessibilityLabel="Campo de edad"
          />
        </View>

        {/* Botón continuar */}
        <View style={styles.buttonContainer}>
          <BotonPrimario
            texto={strings.common.continuar}
            onPress={handleContinuar}
            deshabilitado={!puedesContinuar}
            color="verde"
            tamaño="grande"
          />
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
    padding: theme.spacing.lg,
  },
  leoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  saludo: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.h2,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisOscuro,
    marginTop: theme.spacing.md,
    textAlign: 'center',
  },
  mensaje: {
    fontFamily: theme.typography.fontFamily.secondary,
    fontSize: theme.typography.fontSize.bodyLarge,
    color: theme.colors.grisOscuro,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  form: {
    marginBottom: theme.spacing.xl,
  },
  label: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.bodyLarge,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  input: {
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    fontFamily: theme.typography.fontFamily.secondary,
    fontSize: theme.typography.fontSize.bodyLarge,
    color: theme.colors.grisOscuro,
    minHeight: theme.componentSizes.minTouchTarget,
    ...theme.shadows.small,
  },
  buttonContainer: {
    marginTop: theme.spacing.lg,
  },
});

export default OnboardingScreen;
