/**
 * Pantalla Vista de Isla - Proyecto Lince
 * Basado en: APP_BLUEPRINT.md - Pantalla 5
 *
 * Propósito: Mostrar actividades disponibles en cada isla
 * Lista de actividades con miniaturas, dificultad, estado
 *
 * MANDAMIENTOS:
 * ✅ i18n desde constants/strings
 * ✅ Theme centralizado
 * ✅ Accesibilidad perfecta
 * ✅ Abstracción BD perfecta
 * ✅ NO código placebo
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { VistaIslaNavigationProp, VistaIslaRouteProp } from '../navigation/types';
import { theme, strings } from '../constants';
import { BotonPrimario, BotonSecundario } from '../components/Common';
import { Actividad, NivelDificultad } from '../types';
import { FirebaseService } from '../services';

const DIFICULTAD_COLORES: Record<NivelDificultad, string> = {
  básico: theme.colors.verdeJungla,
  intermedio: theme.colors.amarilloSol,
  avanzado: theme.colors.rojoPeligro,
};

function VistaIslaScreen() {
  const navigation = useNavigation<VistaIslaNavigationProp>();
  const route = useRoute<VistaIslaRouteProp>();
  const { tipoIsla } = route.params;

  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarActividades = async () => {
      const resultado = await FirebaseService.obtenerActividadesPorIsla(tipoIsla);
      if (resultado.success && resultado.data) {
        setActividades(resultado.data);
      }
      setCargando(false);
    };

    cargarActividades();
  }, [tipoIsla]);

  const handleActividadPress = (actividad: Actividad) => {
    navigation.navigate('PreActividad', { actividad });
  };

  const handleActividadRandom = () => {
    if (actividades.length > 0) {
      const randomIndex = Math.floor(Math.random() * actividades.length);
      handleActividadPress(actividades[randomIndex]);
    }
  };

  const handleVolver = () => {
    navigation.goBack();
  };

  const infoIsla = strings.mapa.islas[tipoIsla];

  const renderActividad = ({ item }: { item: Actividad }) => (
    <TouchableOpacity
      style={styles.actividadCard}
      onPress={() => handleActividadPress(item)}
      accessible={true}
      accessibilityLabel={item.titulo}
      accessibilityHint={`Dificultad ${item.dificultad}, duración ${item.duracionEstimada} minutos`}
      accessibilityRole="button"
    >
      <View style={styles.actividadHeader}>
        <Text style={styles.actividadTitulo}>{item.titulo}</Text>
        <View
          style={[
            styles.dificultadBadge,
            { backgroundColor: DIFICULTAD_COLORES[item.dificultad] },
          ]}
        >
          <Text style={styles.dificultadTexto}>
            {item.dificultad}
          </Text>
        </View>
      </View>

      <Text style={styles.actividadDescripcion}>
        {item.descripcion}
      </Text>

      <View style={styles.actividadFooter}>
        <Text style={styles.duracion}>
          ⏱ {item.duracionEstimada} {strings.tiempo.minutos}
        </Text>
        {item.completada && (
          <Text style={styles.completada}>{strings.actividades.completada}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityLabel={infoIsla.nombre}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleVolver}
          style={styles.botonVolver}
          accessible={true}
          accessibilityLabel={strings.navegacion.volver}
          accessibilityRole="button"
        >
          <Text style={styles.botonVolverTexto}>← {strings.navegacion.volver}</Text>
        </TouchableOpacity>

        <Text style={styles.titulo} accessible={true}>
          {infoIsla.nombre}
        </Text>
        <Text style={styles.descripcion} accessible={true}>
          {infoIsla.descripcion}
        </Text>
      </View>

      <View style={styles.contenido}>
        <View style={styles.randomContainer}>
          <BotonPrimario
            texto={strings.actividades.actividadRandom}
            onPress={handleActividadRandom}
            tamaño="mediano"
            color="amarillo"
            deshabilitado={actividades.length === 0}
            accessibilityLabel={strings.actividades.actividadRandom}
          />
        </View>

        {cargando ? (
          <View style={styles.centrado}>
            <Text style={styles.textoInfo}>{strings.common.cargando}</Text>
          </View>
        ) : actividades.length === 0 ? (
          <View style={styles.centrado}>
            <Text style={styles.textoInfo}>{strings.actividades.noActividades}</Text>
          </View>
        ) : (
          <FlatList
            data={actividades}
            renderItem={renderActividad}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.lista}
            accessible={true}
          />
        )}
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
    backgroundColor: theme.colors.azulCalma,
  },
  botonVolver: {
    marginBottom: theme.spacing.md,
  },
  botonVolverTexto: {
    fontSize: theme.typography.fontSize.bodyLarge,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.blancoPuro,
  },
  titulo: {
    fontSize: theme.typography.fontSize.h1,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.blancoPuro,
    marginBottom: theme.spacing.sm,
  },
  descripcion: {
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.blancoPuro,
  },
  contenido: {
    flex: 1,
  },
  randomContainer: {
    padding: theme.spacing.lg,
  },
  lista: {
    padding: theme.spacing.lg,
    paddingTop: 0,
  },
  actividadCard: {
    backgroundColor: theme.colors.grisClaro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  actividadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  actividadTitulo: {
    flex: 1,
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.grisOscuro,
  },
  dificultadBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.small,
  },
  dificultadTexto: {
    fontSize: theme.typography.fontSize.bodySmall,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.blancoPuro,
    textTransform: 'capitalize',
  },
  actividadDescripcion: {
    fontSize: theme.typography.fontSize.bodyMedium,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.sm,
  },
  actividadFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duracion: {
    fontSize: theme.typography.fontSize.bodySmall,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisOscuro,
  },
  completada: {
    fontSize: theme.typography.fontSize.bodySmall,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.verdeJungla,
  },
  centrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoInfo: {
    fontSize: theme.typography.fontSize.bodyMedium,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisOscuro,
  },
});

export default VistaIslaScreen;
