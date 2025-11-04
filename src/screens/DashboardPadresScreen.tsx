/**
 * Pantalla Dashboard Padres - Proyecto Lince
 * Basado en: APP_BLUEPRINT.md - Pantalla 12
 *
 * Propósito: Vista general del progreso del niño
 * Resumen semanal, insights IA, misiones reales
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
import { useNavigation } from '@react-navigation/native';
import { DashboardPadresNavigationProp } from '../navigation/types';
import { theme, strings } from '../constants';
import { ResumenSemanal, MisionMundoReal } from '../components/Portal';
import { BotonSecundario } from '../components/Common';
import { FirebaseService } from '../services';
import { usePerfilStore, useAIStore } from '../store';
import { ProgresoNiño } from '../types';

function DashboardPadresScreen() {
  const navigation = useNavigation<DashboardPadresNavigationProp>();
  const perfilNiño = usePerfilStore((state) => state.perfilNiño);
  const insights = useAIStore((state) => state.insights);

  const [progreso, setProgreso] = useState<ProgresoNiño | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarProgreso = async () => {
      if (perfilNiño) {
        const resultado = await FirebaseService.obtenerProgresoNiño(perfilNiño.id);
        if (resultado.success && resultado.data) {
          setProgreso(resultado.data);
        }
      }
      setCargando(false);
    };

    cargarProgreso();
  }, [perfilNiño]);

  const handleVerProgreso = () => {
    navigation.navigate('ProgresoDetallado');
  };

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityLabel={strings.portalPadres.titulo}
    >
      <View style={styles.header}>
        <Text style={styles.titulo} accessible={true}>
          {strings.portalPadres.titulo}
        </Text>
        {perfilNiño && (
          <Text style={styles.bienvenida}>
            {strings.portalPadres.bienvenida}, {perfilNiño.nombre}
          </Text>
        )}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        accessible={true}
      >
        {cargando ? (
          <View style={styles.centrado}>
            <Text style={styles.textoInfo}>{strings.common.cargando}</Text>
          </View>
        ) : (
          <>
            <View style={styles.seccion}>
              <Text style={styles.seccionTitulo}>
                {strings.portalPadres.progreso.titulo}
              </Text>

              <View style={styles.tarjetasProgreso}>
                <View style={styles.tarjetaProgreso}>
                  <Text style={styles.tarjetaLabel}>
                    {strings.portalPadres.progreso.tiempoHoy}
                  </Text>
                  <Text style={styles.tarjetaValor}>
                    {progreso?.tiempoHoy || 0} min
                  </Text>
                </View>

                <View style={styles.tarjetaProgreso}>
                  <Text style={styles.tarjetaLabel}>
                    {strings.portalPadres.progreso.actividadesCompletadas}
                  </Text>
                  <Text style={styles.tarjetaValor}>
                    {progreso?.actividadesCompletadas || 0}
                  </Text>
                </View>

                <View style={styles.tarjetaProgreso}>
                  <Text style={styles.tarjetaLabel}>
                    {strings.portalPadres.progreso.rachaActual}
                  </Text>
                  <Text style={styles.tarjetaValor}>
                    {progreso?.rachaActual || 0} {strings.portalPadres.progreso.dias}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.seccion}>
              <Text style={styles.seccionTitulo}>
                {strings.portalPadres.resumenSemanal.titulo}
              </Text>
              <ResumenSemanal
                actividadesCompletadas={progreso?.actividadesSemana || 0}
                tiempoTotal={progreso?.tiempoSemana || 0}
                rachaDias={progreso?.rachaActual || 0}
              />
            </View>

            <View style={styles.seccion}>
              <Text style={styles.seccionTitulo}>
                {strings.portalPadres.insights.titulo}
              </Text>
              {insights.length > 0 ? (
                <View style={styles.insightsContainer}>
                  {insights.slice(0, 3).map((insight, index) => (
                    <View key={index} style={styles.insightCard}>
                      <Text style={styles.insightTitulo}>{insight.titulo}</Text>
                      <Text style={styles.insightMensaje}>{insight.mensaje}</Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={styles.textoInfo}>
                  {strings.portalPadres.insights.noDisponible}
                </Text>
              )}
            </View>

            <View style={styles.seccion}>
              <Text style={styles.seccionTitulo}>
                {strings.portalPadres.misionesReales.titulo}
              </Text>
              <MisionMundoReal />
            </View>

            <View style={styles.botonesAccion}>
              <BotonSecundario
                texto={strings.portalPadres.insights.verMas}
                onPress={handleVerProgreso}
                tamaño="mediano"
                accessibilityLabel="Ver progreso detallado"
              />
            </View>
          </>
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
    marginBottom: theme.spacing.sm,
  },
  bienvenida: {
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.secondary,
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
  tarjetasProgreso: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  tarjetaProgreso: {
    flex: 1,
    minWidth: 100,
    backgroundColor: theme.colors.azulCalma,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    alignItems: 'center',
    ...theme.shadows.small,
  },
  tarjetaLabel: {
    fontSize: theme.typography.fontSize.bodySmall,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.blancoPuro,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  tarjetaValor: {
    fontSize: theme.typography.fontSize.h2,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.blancoPuro,
  },
  insightsContainer: {
    gap: theme.spacing.md,
  },
  insightCard: {
    backgroundColor: theme.colors.grisClaro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
  },
  insightTitulo: {
    fontSize: theme.typography.fontSize.bodyLarge,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.xs,
  },
  insightMensaje: {
    fontSize: theme.typography.fontSize.bodyMedium,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisOscuro,
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
  botonesAccion: {
    marginTop: theme.spacing.lg,
  },
});

export default DashboardPadresScreen;
