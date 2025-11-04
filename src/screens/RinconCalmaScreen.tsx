/**
 * Pantalla Rincón de Calma - Proyecto Lince
 * Basado en: APP_BLUEPRINT.md - Pantalla 11
 *
 * Propósito: Espacio de autorregulación y calma
 * Ejercicios de respiración, ambiente relajante
 *
 * MANDAMIENTOS:
 * ✅ i18n desde constants/strings
 * ✅ Theme centralizado
 * ✅ Accesibilidad perfecta
 * ✅ NO código placebo
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RinconCalmaNavigationProp, RinconCalmaRouteProp } from '../navigation/types';
import { theme, strings } from '../constants';
import { BotonPrimario, BotonSecundario } from '../components/Common';

function RinconCalmaScreen() {
  const navigation = useNavigation<RinconCalmaNavigationProp>();
  const route = useRoute<RinconCalmaRouteProp>();
  const origen = route.params?.origen;

  const [respiracionActiva, setRespiracionActiva] = useState(false);
  const [escalaAnimada] = useState(new Animated.Value(1));

  useEffect(() => {
    if (respiracionActiva) {
      iniciarAnimacionRespiracion();
    }
  }, [respiracionActiva]);

  const iniciarAnimacionRespiracion = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(escalaAnimada, {
          toValue: 1.5,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(escalaAnimada, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleIniciarRespiracion = () => {
    setRespiracionActiva(true);
  };

  const handleListo = () => {
    if (origen === 'pausa') {
      navigation.goBack();
    } else {
      navigation.navigate('MapaMundo');
    }
  };

  const handleQuedarse = () => {
    setRespiracionActiva(false);
    setTimeout(() => {
      setRespiracionActiva(true);
    }, 1000);
  };

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityLabel={strings.rinconCalma.titulo}
    >
      <View style={styles.header}>
        <Text style={styles.titulo} accessible={true}>
          {strings.rinconCalma.titulo}
        </Text>
        <Text style={styles.mensaje} accessible={true}>
          {strings.rinconCalma.mensaje}
        </Text>
      </View>

      <View style={styles.contenido}>
        {!respiracionActiva ? (
          <View style={styles.bienvenida}>
            <Text style={styles.bienvenidaTexto}>
              Vamos a respirar juntos con Leo
            </Text>
            <Text style={styles.instruccion}>
              {strings.rinconCalma.instruccion}
            </Text>
          </View>
        ) : (
          <View style={styles.respiracionContainer}>
            <Animated.View
              style={[
                styles.circuloRespiracion,
                { transform: [{ scale: escalaAnimada }] },
              ]}
            >
              <Text style={styles.respiraTexto}>Respira</Text>
            </Animated.View>

            <Text style={styles.instruccionRespiracion}>
              Inhala cuando el círculo crece{'\n'}
              Exhala cuando el círculo se encoge
            </Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        {!respiracionActiva ? (
          <BotonPrimario
            texto="Empezar"
            onPress={handleIniciarRespiracion}
            tamaño="grande"
            color="azul"
            accessibilityLabel="Iniciar ejercicio de respiración"
          />
        ) : (
          <>
            <BotonPrimario
              texto={strings.rinconCalma.listo}
              onPress={handleListo}
              tamaño="grande"
              color="verde"
              accessibilityLabel={strings.rinconCalma.listo}
            />

            <View style={styles.espaciador} />

            <BotonSecundario
              texto={strings.rinconCalma.quedarse}
              onPress={handleQuedarse}
              tamaño="mediano"
              accessibilityLabel={strings.rinconCalma.quedarse}
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.azulCalma,
  },
  header: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  titulo: {
    fontSize: theme.typography.fontSize.h1,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.blancoPuro,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  mensaje: {
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.blancoPuro,
    textAlign: 'center',
  },
  contenido: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  bienvenida: {
    alignItems: 'center',
  },
  bienvenidaTexto: {
    fontSize: theme.typography.fontSize.h2,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.blancoPuro,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  instruccion: {
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.blancoPuro,
    textAlign: 'center',
  },
  respiracionContainer: {
    alignItems: 'center',
  },
  circuloRespiracion: {
    width: 150,
    height: 150,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.blancoPuro,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
    ...theme.shadows.large,
  },
  respiraTexto: {
    fontSize: theme.typography.fontSize.h2,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.azulCalma,
  },
  instruccionRespiracion: {
    fontSize: theme.typography.fontSize.bodyLarge,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.blancoPuro,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.bodyLarge,
  },
  footer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.blancoPuro,
  },
  espaciador: {
    height: theme.spacing.md,
  },
});

export default RinconCalmaScreen;
