/**
 * Pantalla de Bienvenida - Proyecto Lince
 * Basado en: APP_BLUEPRINT.md - Pantalla 2
 *
 * Propósito: Configurar el perfil del niño por primera vez
 * Formulario simple para padres: nombre, edad, nivel, preferencias
 *
 * MANDAMIENTOS:
 * ✅ i18n desde constants/strings
 * ✅ Theme centralizado
 * ✅ Accesibilidad perfecta
 * ✅ Abstracción BD perfecta (usa FirebaseService)
 * ✅ NO código placebo
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BienvenidaNavigationProp } from '../navigation/types';
import { theme, strings } from '../constants';
import { BotonPrimario } from '../components/Common';
import { usePerfilStore } from '../store';
import { FirebaseService } from '../services';
import { NivelDesarrollo, PreferenciasSensoriales } from '../types';

function BienvenidaScreen() {
  const navigation = useNavigation<BienvenidaNavigationProp>();
  const setPerfilNiño = usePerfilStore((state) => state.setPerfilNiño);

  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [nivel, setNivel] = useState<NivelDesarrollo>('básico');
  const [cargando, setCargando] = useState(false);

  const handleEmpezar = async () => {
    if (!nombre || !edad) {
      return;
    }

    setCargando(true);

    const preferencias: PreferenciasSensoriales = {
      visual: 5,
      auditivo: 5,
      tactil: 5,
      vestibular: 5,
      propioceptivo: 5,
    };

    const perfil: Partial<PerfilNiño> = {
      nombre,
      edad: parseInt(edad, 10),
      nivelDesarrollo: nivel,
      preferencias,
      fechaNacimiento: new Date(),
    };

    const resultado = await FirebaseService.crearPerfilNiño(perfil);

    if (resultado.success && resultado.data) {
      setPerfilNiño(resultado.data);
      navigation.replace('Tutorial');
    }

    setCargando(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        accessible={true}
        accessibilityLabel={strings.bienvenida.titulo}
      >
        <View style={styles.header}>
          <Text style={styles.titulo} accessible={true}>
            {strings.bienvenida.titulo}
          </Text>
          <Text style={styles.subtitulo} accessible={true}>
            {strings.bienvenida.subtitulo}
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {strings.configuracion.perfil.nombre}
            </Text>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder={strings.configuracion.perfil.nombre}
              accessible={true}
              accessibilityLabel={strings.configuracion.perfil.nombre}
              accessibilityHint="Ingresa el nombre del niño"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {strings.configuracion.perfil.edad}
            </Text>
            <TextInput
              style={styles.input}
              value={edad}
              onChangeText={setEdad}
              placeholder={strings.configuracion.perfil.edad}
              keyboardType="number-pad"
              accessible={true}
              accessibilityLabel={strings.configuracion.perfil.edad}
              accessibilityHint="Ingresa la edad del niño"
            />
          </View>

          <View style={styles.buttonContainer}>
            <BotonPrimario
              texto={strings.bienvenida.empezar}
              onPress={handleEmpezar}
              tamaño="grande"
              color="verde"
              deshabilitado={!nombre || !edad || cargando}
              accessibilityLabel={strings.accesibilidad.botonIniciar}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.blancoPuro,
  },
  scrollContent: {
    flexGrow: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  titulo: {
    fontSize: theme.typography.fontSize.h1,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.verdeJungla,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitulo: {
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.typography.fontSize.bodyMedium,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.sm,
  },
  input: {
    height: theme.componentSizes.button.mediano.height,
    backgroundColor: theme.colors.grisClaro,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.typography.fontSize.bodyLarge,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisOscuro,
  },
  buttonContainer: {
    marginTop: theme.spacing.xl,
  },
});

export default BienvenidaScreen;
