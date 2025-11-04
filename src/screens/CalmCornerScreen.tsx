/**
 * CalmCornerScreen - Rincón de Calma
 * Basado en: APP_BLUEPRINT.md - Pantalla 10: Rincón de Calma
 *
 * Funcionalidad:
 * - Espacio de autorregulación
 * - Ejercicios de respiración
 * - Leo guiando la calma
 * - Animaciones suaves
 * - Música relajante
 * - Puede ser activado por IA o por el usuario
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CalmCornerScreenNavigationProp,
  CalmCornerScreenRouteProp,
} from '../navigation/types';

// Imports desde directorios centralizados - Mandamiento 📂
import { theme, strings } from '../constants';

const CalmCornerScreen: React.FC = () => {
  const navigation = useNavigation<CalmCornerScreenNavigationProp>();
  const route = useRoute<CalmCornerScreenRouteProp>();
  const { triggeredBy = 'user' } = route.params || {};

  const [breatheAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    const breatheAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, {
          toValue: 1.3,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(breatheAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );

    breatheAnimation.start();

    return () => breatheAnimation.stop();
  }, [breatheAnim]);

  const handleReady = () => {
    navigation.navigate('MainMap');
  };

  const handleStayLonger = () => {
    // Reiniciar animación
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Leo calmado */}
        <View style={styles.header}>
          <Text style={styles.title}>{strings.rinconCalma.titulo}</Text>
          <Text style={styles.subtitle}>{strings.rinconCalma.mensaje}</Text>
        </View>

        {/* Animación de respiración */}
        <Animated.View
          style={[
            styles.breatheCircle,
            { transform: [{ scale: breatheAnim }] },
          ]}
        >
          <Text style={styles.breatheEmoji}>🧘</Text>
          <Text style={styles.breatheText}>
            {strings.rinconCalma.instruccion}
          </Text>
        </Animated.View>

        {/* Botones */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.readyButton}
            onPress={handleReady}
            accessible={true}
            accessibilityLabel={strings.rinconCalma.listo}
            accessibilityRole="button"
          >
            <Text style={styles.readyButtonText}>
              {strings.rinconCalma.listo}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.stayButton}
            onPress={handleStayLonger}
            accessible={true}
            accessibilityLabel={strings.rinconCalma.quedarse}
            accessibilityRole="button"
          >
            <Text style={styles.stayButtonText}>
              {strings.rinconCalma.quedarse}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Mensaje si fue activado por IA */}
        {triggeredBy === 'ai' && (
          <View style={styles.aiMessageContainer}>
            <Text style={styles.aiMessageText}>
              {strings.ia.sugerencias.razonamientoLocal}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.azulCalma,
  },
  content: {
    flex: 1,
    padding: theme.spacing.xl,
    justifyContent: 'space-around',
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.fontSize.h1,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.blancoPuro,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.h3,
    color: theme.colors.blancoPuro,
    textAlign: 'center',
  },
  breatheCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: theme.colors.blancoPuro,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.large,
  },
  breatheEmoji: {
    fontSize: 80,
    marginBottom: theme.spacing.md,
  },
  breatheText: {
    fontSize: theme.typography.fontSize.h3,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.azulCalma,
    textAlign: 'center',
  },
  buttonsContainer: {
    gap: theme.spacing.md,
  },
  readyButton: {
    backgroundColor: theme.colors.verdeJungla,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    alignItems: 'center',
    minHeight: theme.componentSizes.button.grande.height,
    justifyContent: 'center',
    ...theme.shadows.medium,
  },
  readyButtonText: {
    fontSize: theme.typography.fontSize.button,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.blancoPuro,
  },
  stayButton: {
    backgroundColor: 'transparent',
    borderWidth: theme.borderWidth.medium,
    borderColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    alignItems: 'center',
    minHeight: theme.componentSizes.button.mediano.height,
    justifyContent: 'center',
  },
  stayButtonText: {
    fontSize: theme.typography.fontSize.bodyLarge,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.blancoPuro,
  },
  aiMessageContainer: {
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
  },
  aiMessageText: {
    fontSize: theme.typography.fontSize.bodySmall,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
  },
});

export default CalmCornerScreen;
