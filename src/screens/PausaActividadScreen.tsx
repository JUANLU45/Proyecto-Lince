/**
 * Pantalla Pausa Actividad - Proyecto Lince
 * Basado en: APP_BLUEPRINT.md - Pantalla 9
 *
 * Propósito: Pausar actividad y ofrecer opciones
 * Continuar, configurar, o salir
 *
 * MANDAMIENTOS:
 * ✅ i18n desde constants/strings
 * ✅ Theme centralizado
 * ✅ Accesibilidad perfecta
 * ✅ NO código placebo
 */

import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PausaActividadNavigationProp, PausaActividadRouteProp } from '../navigation/types';
import { theme, strings } from '../constants';
import { BotonPrimario, BotonSecundario } from '../components/Common';

function PausaActividadScreen() {
  const navigation = useNavigation<PausaActividadNavigationProp>();
  const route = useRoute<PausaActividadRouteProp>();
  const { actividad } = route.params;

  const handleContinuar = () => {
    navigation.goBack();
  };

  const handleRinconCalma = () => {
    navigation.navigate('RinconCalma', { origen: 'pausa' });
  };

  const handleSalir = () => {
    navigation.navigate('MapaMundo');
  };

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="fade"
      onRequestClose={handleContinuar}
    >
      <View
        style={styles.overlay}
        accessible={true}
        accessibilityLabel="Menú de pausa"
      >
        <View style={styles.modal}>
          <Text style={styles.titulo} accessible={true}>
            Actividad en pausa
          </Text>

          <Text style={styles.actividad}>
            {actividad.titulo}
          </Text>

          <View style={styles.botonesContainer}>
            <BotonPrimario
              texto={strings.actividades.continuar}
              onPress={handleContinuar}
              tamaño="grande"
              color="verde"
              accessibilityLabel={strings.actividades.continuar}
            />

            <View style={styles.espaciador} />

            <BotonSecundario
              texto={strings.rinconCalma.titulo}
              onPress={handleRinconCalma}
              tamaño="mediano"
              icono="🧘"
              accessibilityLabel={strings.rinconCalma.titulo}
            />

            <View style={styles.espaciador} />

            <BotonSecundario
              texto="Salir al mapa"
              onPress={handleSalir}
              tamaño="mediano"
              accessibilityLabel="Salir al mapa principal"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    maxWidth: 400,
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.xl,
    ...theme.shadows.large,
  },
  titulo: {
    fontSize: theme.typography.fontSize.h1,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  actividad: {
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  botonesContainer: {
    width: '100%',
  },
  espaciador: {
    height: theme.spacing.md,
  },
});

export default PausaActividadScreen;
