/**
 * TutorialScreen - Pantalla de tutorial interactivo
 * Basado en: APP_BLUEPRINT.md - Pantalla 3: Tutorial Interactivo
 *
 * Funcionalidad:
 * - Enseñar navegación básica con Leo como guía
 * - Leo explicando controles básicos
 * - Práctica de gestos (tocar, deslizar)
 * - Introducción al sistema de recompensas
 * - Botón "Saltar tutorial"
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TutorialScreenNavigationProp } from '../navigation/types';

// Imports desde directorios centralizados - Mandamiento 📂
import { theme, strings } from '../constants';

const { width } = Dimensions.get('window');

interface TutorialStep {
  titulo: string;
  descripcion: string;
  instruccion: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    titulo: '¡Bienvenido!',
    descripcion: 'Soy Leo el Lince y voy a ser tu amigo',
    instruccion: 'Toca la pantalla para continuar',
  },
  {
    titulo: 'Toca para jugar',
    descripcion: 'Puedes tocar cualquier parte de la pantalla',
    instruccion: 'Practica tocando aquí',
  },
  {
    titulo: '¡Muy bien!',
    descripcion: 'Así ganamos estrellas y celebramos juntos',
    instruccion: 'Toca para continuar',
  },
  {
    titulo: '¡Listo para empezar!',
    descripcion: 'Vamos a explorar mi mundo',
    instruccion: 'Toca para comenzar',
  },
];

const TutorialScreen: React.FC = () => {
  const navigation = useNavigation<TutorialScreenNavigationProp>();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.replace('App');
    }
  };

  const handleSkip = () => {
    navigation.replace('App');
  };

  const step = tutorialSteps[currentStep];

  return (
    <SafeAreaView style={styles.container}>
      {/* Botón saltar */}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={handleSkip}
        accessible={true}
        accessibilityLabel={strings.tutorial.saltar}
        accessibilityRole="button"
      >
        <Text style={styles.skipButtonText}>{strings.tutorial.saltar}</Text>
      </TouchableOpacity>

      {/* Contenido del tutorial */}
      <TouchableOpacity
        style={styles.content}
        onPress={handleNext}
        activeOpacity={0.9}
        accessible={true}
        accessibilityLabel={step.instruccion}
        accessibilityRole="button"
      >
        <View style={styles.stepContainer}>
          <Text style={styles.titulo}>{step.titulo}</Text>
          <Text style={styles.descripcion}>{step.descripcion}</Text>
          <Text style={styles.instruccion}>{step.instruccion}</Text>
        </View>
      </TouchableOpacity>

      {/* Indicadores de progreso */}
      <View style={styles.indicators}>
        {tutorialSteps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === currentStep && styles.indicatorActive,
            ]}
          />
        ))}
      </View>

      {/* Botón siguiente */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={handleNext}
        accessible={true}
        accessibilityLabel={
          currentStep < tutorialSteps.length - 1
            ? strings.tutorial.siguiente
            : strings.tutorial.finalizar
        }
        accessibilityRole="button"
      >
        <Text style={styles.nextButtonText}>
          {currentStep < tutorialSteps.length - 1
            ? strings.tutorial.siguiente
            : strings.tutorial.finalizar}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.azulCalma,
  },
  skipButton: {
    position: 'absolute',
    top: theme.spacing.lg,
    right: theme.spacing.lg,
    zIndex: 1,
    padding: theme.spacing.sm,
  },
  skipButtonText: {
    fontSize: theme.typography.fontSize.bodyMedium,
    color: theme.colors.blancoPuro,
    fontWeight: theme.typography.fontWeight.bold,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  stepContainer: {
    alignItems: 'center',
    width: '100%',
  },
  titulo: {
    fontSize: theme.typography.fontSize.h1,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.blancoPuro,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  descripcion: {
    fontSize: theme.typography.fontSize.h3,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.blancoPuro,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  instruccion: {
    fontSize: theme.typography.fontSize.bodyLarge,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.amarilloSol,
    textAlign: 'center',
    marginTop: theme.spacing.xxl,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.blancoPuro,
    opacity: 0.3,
  },
  indicatorActive: {
    opacity: 1,
    width: 16,
    height: 16,
  },
  nextButton: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    backgroundColor: theme.colors.verdeJungla,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    alignItems: 'center',
    minHeight: theme.componentSizes.button.mediano.height,
    justifyContent: 'center',
    ...theme.shadows.medium,
  },
  nextButtonText: {
    fontSize: theme.typography.fontSize.button,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.blancoPuro,
  },
});

export default TutorialScreen;
