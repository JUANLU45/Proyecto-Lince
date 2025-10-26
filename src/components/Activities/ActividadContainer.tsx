/**
 * ActividadContainer - Contenedor para actividades sensoriales
 * Basado en: UI_COMPONENTS.md líneas 111-122
 *
 * Layout:
 * - Header: Título + barra de progreso + botón pausa
 * - Área principal: Contenido de la actividad
 * - Footer: Botón terminar
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { theme, strings } from '../../constants';
import type { ActividadContainerProps } from '../../types';
import BotonPrimario from '../Common/BotonPrimario';
import BotonSecundario from '../Common/BotonSecundario';
import BarraProgreso from './BarraProgreso';

/**
 * Componente ActividadContainer
 * Según PROJECT_REQUIREMENTS.md RF-001: Estructura de actividades
 */
const ActividadContainer: React.FC<ActividadContainerProps> = ({
  titulo,
  progreso,
  tiempoTranscurrido,
  onPausa,
  onTerminar,
  children,
  testID,
  accessible = true,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const [pausado, setPausado] = useState(false);

  const formatearTiempo = (segundos: number): string => {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    const segsStr = segs.toString().padStart(2, '0');
    return minutos + ':' + segsStr;
  };

  const handlePausa = () => {
    setPausado(!pausado);
    onPausa();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={styles.wrapper}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel || strings.actividades.titulo + ': ' + titulo}
        accessibilityHint={accessibilityHint}
        testID={testID}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.titulo}>{titulo}</Text>
            <Text style={styles.tiempo}>{formatearTiempo(tiempoTranscurrido)}</Text>
          </View>
          <BarraProgreso
            progreso={progreso}
            altura={8}
            mostrarPorcentaje={false}
          />
          <View style={styles.headerActions}>
            <BotonSecundario
              texto={pausado ? strings.actividades.continuar : strings.actividades.pausar}
              onPress={handlePausa}
              variante="outline"
              testID={testID + '-pausa'}
              accessibilityLabel={strings.accesibilidad.botonPausar}
            />
          </View>
        </View>

        {/* Área Principal */}
        <View style={styles.content}>
          {children}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <BotonPrimario
            texto={strings.actividades.terminar}
            onPress={onTerminar}
            color="azul"
            tamaño="grande"
            testID={testID + '-terminar'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.grisClaro,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },
  header: {
    paddingVertical: theme.spacing.md,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  titulo: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.h2,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisOscuro,
  },
  tiempo: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.bodyMedium,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.grisOscuro,
  },
  headerActions: {
    marginTop: theme.spacing.sm,
  },
  content: {
    flex: 1,
    marginVertical: theme.spacing.md,
  },
  footer: {
    paddingVertical: theme.spacing.md,
  },
});

export default ActividadContainer;
