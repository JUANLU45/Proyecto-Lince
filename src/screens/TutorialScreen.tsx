/**
 * TutorialScreen - Tutorial interactivo con Leo
 * Basado en: APP_BLUEPRINT.md líneas 37-46
 * 
 * Propósito: Enseñar navegación básica con Leo como guía
 * Elementos:
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
  SafeAreaView,
} from 'react-native';
import { theme, strings } from '../constants';
import type { TutorialScreenNavigationProp } from '../types';
import LeoAnimado from '../components/Character/LeoAnimado';
import AreaInteractiva from '../components/Activities/AreaInteractiva';
import BotonPrimario from '../components/Common/BotonPrimario';
import BotonSecundario from '../components/Common/BotonSecundario';
import FeedbackVisual from '../components/Activities/FeedbackVisual';

interface TutorialScreenProps {
  navigation: TutorialScreenNavigationProp;
}

/**
 * Componente TutorialScreen
 * Según PROJECT_REQUIREMENTS.md RF-014: Tutorial interactivo
 */
const TutorialScreen: React.FC<TutorialScreenProps> = ({ navigation }) => {
  const [paso, setPaso] = useState(1);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackPos, setFeedbackPos] = useState({ x: 0, y: 0 });

  const handleTouch = (x: number, y: number) => {
    setFeedbackPos({ x, y });
    setFeedbackVisible(true);
    
    // Avanzar al siguiente paso después del primer toque
    if (paso === 1) {
      setTimeout(() => {
        setPaso(2);
      }, 1000);
    }
  };

  const handleFeedbackComplete = () => {
    setFeedbackVisible(false);
  };

  const handleContinuar = () => {
    // TODO: Marcar tutorial como completado en Zustand
    // Navegar a la app principal
    navigation.replace('App');
  };

  const handleSaltar = () => {
    navigation.replace('App');
  };

  const getMensaje = () => {
    switch (paso) {
      case 1:
        return '¡Toca la pantalla para jugar conmigo!';
      case 2:
        return '¡Muy bien! Así es como interactuamos';
      default:
        return '¡Perfecto! Ya estás listo';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Botón saltar en esquina */}
      <View style={styles.skipContainer}>
        <BotonSecundario
          texto={strings.tutorial.saltar}
          onPress={handleSaltar}
          variante="ghost"
        />
      </View>

      {/* Leo animado */}
      <View style={styles.leoContainer}>
        <LeoAnimado 
          accion={paso === 1 ? 'saltar' : 'celebrar'}
          loop={paso === 1}
        />
      </View>

      {/* Mensaje */}
      <Text style={styles.mensaje}>{getMensaje()}</Text>

      {/* Área interactiva */}
      <View style={styles.areaContainer}>
        <AreaInteractiva onTouch={handleTouch}>
          <View style={styles.areaDemostracion}>
            <Text style={styles.textoArea}>
              {paso === 1 ? '¡Toca aquí!' : '¡Genial!'}
            </Text>
          </View>
        </AreaInteractiva>

        {/* Feedback visual */}
        <FeedbackVisual
          tipo="éxito"
          posicion={feedbackPos}
          visible={feedbackVisible}
          onComplete={handleFeedbackComplete}
        />
      </View>

      {/* Botón continuar (visible después del paso 2) */}
      {paso >= 2 && (
        <View style={styles.buttonContainer}>
          <BotonPrimario
            texto="¡Empezar a jugar!"
            onPress={handleContinuar}
            color="verde"
            tamaño="grande"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.grisClaro,
    padding: theme.spacing.lg,
  },
  skipContainer: {
    alignItems: 'flex-end',
    marginBottom: theme.spacing.md,
  },
  leoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  mensaje: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.h3,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  areaContainer: {
    flex: 1,
    position: 'relative',
  },
  areaDemostracion: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.azulCalma,
    opacity: 0.3,
  },
  textoArea: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.h2,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.blancoPuro,
  },
  buttonContainer: {
    marginTop: theme.spacing.lg,
  },
});

export default TutorialScreen;
