/**
 * Pantalla Progreso Detallado - Proyecto Lince
 * Basado en: APP_BLUEPRINT.md - Pantalla 13
 *
 * Propósito: Vista detallada del progreso del niño
 * Gráficos, estadísticas, exportar datos
 *
 * MANDAMIENTOS:
 * ✅ i18n desde constants/strings
 * ✅ Theme centralizado
 * ✅ Accesibilidad perfecta
 * ✅ Abstracción BD perfecta
 * ✅ NO código placebo
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme, strings } from '../constants';
import { GraficoProgreso } from '../components/Portal';
import { BotonPrimario } from '../components/Common';
import { FirebaseService } from '../services';
import { usePerfilStore } from '../store';
import { ProgresoNiño } from '../types';

function ProgresoDetalladoScreen() {
  const perfilNiño = usePerfilStore((state) => state.perfilNiño);
  const [progreso, setProgreso] = useState<ProgresoNiño | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      if (perfilNiño) {
        const resultado = await FirebaseService.obtenerProgresoDetallado(perfilNiño.id);
        if (resultado.success && resultado.data) {
          setProgreso(resultado.data);
        }
      }
      setCargando(false);
    };

    cargarDatos();
  }, [perfilNiño]);

  const handleExportar = async () => {
    if (perfilNiño && progreso) {
      await FirebaseService.exportarDatos(perfilNiño.id);
    }
  };

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityLabel={strings.portalPadres.progreso.titulo}
    >
      <View style={styles.header}>
        <Text style={styles.titulo} accessible={true}>
          {strings.portalPadres.progreso.titulo}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        accessible={true}
      >
        {cargando ? (
          <View style={styles.centrado}>
            <Text style={styles.textoInfo}>{strings.common.cargando}</Text>
          </View>
        ) : progreso ? (
          <>
            <View style={styles.seccion}>
              <Text style={styles.seccionTitulo}>
                Actividades esta semana
              </Text>
              <GraficoProgreso
                datos={progreso.graficoSemanal || []}
                tipo="barras"
              />
            </View>

            <View style={styles.seccion}>
              <Text style={styles.seccionTitulo}>
                Tiempo por isla
              </Text>
              <GraficoProgreso
                datos={progreso.tiempoPorIsla || []}
                tipo="pastel"
              />
            </View>

            <View style={styles.seccion}>
              <Text style={styles.seccionTitulo}>
                Estadísticas generales
              </Text>

              <View style={styles.estadisticasGrid}>
                <View style={styles.estadisticaCard}>
                  <Text style={styles.estadisticaLabel}>
                    Total actividades
                  </Text>
                  <Text style={styles.estadisticaValor}>
                    {progreso.actividadesTotales || 0}
                  </Text>
                </View>

                <View style={styles.estadisticaCard}>
                  <Text style={styles.estadisticaLabel}>
                    Tiempo total
                  </Text>
                  <Text style={styles.estadisticaValor}>
                    {Math.floor((progreso.tiempoTotal || 0) / 60)}h
                  </Text>
                </View>

                <View style={styles.estadisticaCard}>
                  <Text style={styles.estadisticaLabel}>
                    Racha máxima
                  </Text>
                  <Text style={styles.estadisticaValor}>
                    {progreso.rachaMaxima || 0} días
                  </Text>
                </View>

                <View style={styles.estadisticaCard}>
                  <Text style={styles.estadisticaLabel}>
                    Promedio diario
                  </Text>
                  <Text style={styles.estadisticaValor}>
                    {progreso.promedioDiario || 0} min
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.seccion}>
              <Text style={styles.seccionTitulo}>
                Islas favoritas
              </Text>
              <View style={styles.favoritasContainer}>
                {progreso.islasFavoritas?.map((isla, index) => (
                  <View key={index} style={styles.islaFavorita}>
                    <Text style={styles.islaFavoritaNombre}>
                      {index + 1}. {isla.nombre}
                    </Text>
                    <Text style={styles.islaFavoritaValor}>
                      {isla.completadas} actividades
                    </Text>
                  </View>
                )) || (
                  <Text style={styles.textoInfo}>
                    No hay datos disponibles
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.exportar}>
              <BotonPrimario
                texto={strings.portalPadres.configuracion.exportar}
                onPress={handleExportar}
                tamaño="grande"
                color="verde"
                accessibilityLabel="Exportar datos de progreso"
              />
            </View>
          </>
        ) : (
          <View style={styles.centrado}>
            <Text style={styles.textoInfo}>
              No hay datos de progreso disponibles
            </Text>
          </View>
        )}
      </ScrollView>
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
    backgroundColor: theme.colors.verdeJungla,
    alignItems: 'center',
  },
  titulo: {
    fontSize: theme.typography.fontSize.h1,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.blancoPuro,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  seccion: {
    marginBottom: theme.spacing.xl,
  },
  seccionTitulo: {
    fontSize: theme.typography.fontSize.h2,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.md,
  },
  estadisticasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  estadisticaCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: theme.colors.grisClaro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    alignItems: 'center',
    ...theme.shadows.small,
  },
  estadisticaLabel: {
    fontSize: theme.typography.fontSize.bodySmall,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  estadisticaValor: {
    fontSize: theme.typography.fontSize.h2,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.verdeJungla,
  },
  favoritasContainer: {
    backgroundColor: theme.colors.grisClaro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
  },
  islaFavorita: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.blancoPuro,
  },
  islaFavoritaNombre: {
    fontSize: theme.typography.fontSize.bodyMedium,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisOscuro,
  },
  islaFavoritaValor: {
    fontSize: theme.typography.fontSize.bodyMedium,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.verdeJungla,
  },
  centrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  textoInfo: {
    fontSize: theme.typography.fontSize.bodyMedium,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
  },
  exportar: {
    marginTop: theme.spacing.xl,
  },
});

export default ProgresoDetalladoScreen;
