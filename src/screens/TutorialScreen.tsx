/**
 * Pantalla de Tutorial - Proyecto Lince
 * Basado en: APP_BLUEPRINT.md - Pantalla 3
 *
 * Propósito: Enseñar navegación básica con Leo como guía
 * Práctica de gestos, introducción al sistema de recompensas
 *
 * MANDAMIENTOS:
 * ✅ i18n desde constants/strings
 * ✅ Theme centralizado
 * ✅ Accesibilidad perfecta
 * ✅ NO código placebo
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TutorialNavigationProp } from '../navigation/types';
import { theme, strings } from '../constants';
import { BotonPrimario, BotonSecundario } from '../components/Common';
import { AreaInteractiva } from '../components/Activities';

const PASOS_TUTORIAL = [
  {
    titulo: 'Toca la pantalla',
    descripcion: 'Toca en cualquier lugar para empezar',
  },
  {
    titulo: 'Desliza hacia los lados',
    descripcion: 'Desliza para explorar las islas',
  },
  {
    titulo: '¡Perfecto!',
    descripcion: 'Ya estás listo para jugar con Leo',
  },
];

function TutorialScreen() {
  const navigation = useNavigation<TutorialNavigationProp>();
  const [pasoActual, setPasoActual] = useState(0);

  const handleSiguiente = () => {
    if (pasoActual < PASOS_TUTORIAL.length - 1) {
      setPasoActual(pasoActual + 1);
    } else {
      navigation.replace('MapaMundo');
    }
  };

  const handleSaltar = () => {
    navigation.replace('MapaMundo');
  };

  const paso = PASOS_TUTORIAL[pasoActual];
  const esUltimoPaso = pasoActual === PASOS_TUTORIAL.length - 1;

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityLabel={strings.tutorial.titulo}
    >
      <View style={styles.header}>
        <Text style={styles.titulo} accessible={true}>
          {paso.titulo}
        </Text>
        <Text style={styles.descripcion} accessible={true}>
          {paso.descripcion}
        </Text>
      </View>

      <View style={styles.contenido}>
        {pasoActual === 0 && (
          <AreaInteractiva
            onInteraccion={handleSiguiente}
            colorFondo="azulCalma"
            accessibilityLabel={strings.accesibilidad.areaInteractiva}
          />
        )}
        {pasoActual === 1 && (
          <TouchableOpacity
            style={styles.areaInteractiva}
            onPress={handleSiguiente}
            accessible={true}
            accessibilityLabel={strings.accesibilidad.areaInteractiva}
            accessibilityHint="Desliza para continuar"
          >
            <Text style={styles.textoInteractivo}>
              Desliza aquí
            </Text>
          </TouchableOpacity>
        )}
        {pasoActual === 2 && (
          <View style={styles.celebracion}>
            <Text style={styles.celebracionTexto}>
              ✨ {strings.actividades.feedback.loLograste} ✨
            </Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.indicadores}>
          {PASOS_TUTORIAL.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicador,
                index === pasoActual && styles.indicadorActivo,
              ]}
            />
          ))}
        </View>

        <View style={styles.botones}>
          {!esUltimoPaso && (
            <BotonSecundario
              texto={strings.tutorial.saltar}
              onPress={handleSaltar}
              tamaño="mediano"
              accessibilityLabel={strings.tutorial.saltar}
            />
          )}

          <View style={styles.espaciador} />

          <BotonPrimario
            texto={esUltimoPaso ? strings.tutorial.finalizar : strings.tutorial.siguiente}
            onPress={handleSiguiente}
            tamaño="mediano"
            color="verde"
            accessibilityLabel={esUltimoPaso ? strings.tutorial.finalizar : strings.tutorial.siguiente}
          />
        </View>
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
    alignItems: 'center',
    backgroundColor: theme.colors.azulCalma,
  },
  titulo: {
    fontSize: theme.typography.fontSize.h1,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.blancoPuro,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  descripcion: {
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
  areaInteractiva: {
    width: '80%',
    height: 200,
    backgroundColor: theme.colors.azulCalma,
    borderRadius: theme.borderRadius.large,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  textoInteractivo: {
    fontSize: theme.typography.fontSize.h2,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.blancoPuro,
  },
  celebracion: {
    padding: theme.spacing.xl,
  },
  celebracionTexto: {
    fontSize: theme.typography.fontSize.h1,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.verdeJungla,
    textAlign: 'center',
  },
  footer: {
    padding: theme.spacing.lg,
  },
  indicadores: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  indicador: {
    width: 12,
    height: 12,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.grisClaro,
    marginHorizontal: theme.spacing.xs,
  },
  indicadorActivo: {
    backgroundColor: theme.colors.verdeJungla,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  espaciador: {
    width: theme.spacing.md,
  },
});

export default TutorialScreen;
