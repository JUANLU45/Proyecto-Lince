/**
 * DashboardAdmin - Panel principal administrativo
 * Basado en: DESIGN_SYSTEM.md y UI_COMPONENTS.md
 *
 * Propósito: Vista principal del panel administrativo
 * Componentes:
 * - Resumen de métricas clave
 * - Accesos rápidos a funciones admin
 * - Notificaciones y alertas
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { theme } from '../../../constants';
import type { BaseProps } from '../../../types';
import BotonPrimario from '../../Common/BotonPrimario';

export interface AccesoRapido {
  id: string;
  icono: string;
  titulo: string;
  onPress: () => void;
}

export interface DashboardAdminProps extends BaseProps {
  usuariosActivos: number;
  usuariosTotales: number;
  accesoRapido: AccesoRapido[];
}

/**
 * Componente DashboardAdmin
 * Según DESIGN_SYSTEM.md: Panel Administrativo
 */
const DashboardAdmin: React.FC<DashboardAdminProps> = ({
  usuariosActivos,
  usuariosTotales,
  accesoRapido,
  testID,
  accessible = true,
  accessibilityLabel,
  accessibilityHint,
}) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel || 'Dashboard administrativo'}
      accessibilityHint={accessibilityHint}
      testID={testID}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Panel Administrativo</Text>
        <Text style={styles.subtitulo}>
          Gestión y métricas del sistema
        </Text>
      </View>

      {/* Métricas rápidas */}
      <View style={styles.metricasContainer}>
        <View style={styles.metricaCard}>
          <Text style={styles.metricaIcono}>👥</Text>
          <Text style={styles.metricaValor}>{usuariosActivos}</Text>
          <Text style={styles.metricaLabel}>Activos ahora</Text>
        </View>

        <View style={styles.metricaCard}>
          <Text style={styles.metricaIcono}>📊</Text>
          <Text style={styles.metricaValor}>{usuariosTotales}</Text>
          <Text style={styles.metricaLabel}>Usuarios totales</Text>
        </View>
      </View>

      {/* Accesos rápidos */}
      <View style={styles.accesoContainer}>
        <Text style={styles.seccionTitulo}>Accesos Rápidos</Text>
        <View style={styles.botonesGrid}>
          {accesoRapido.map((acceso) => (
            <View key={acceso.id} style={styles.botonAcceso}>
              <BotonPrimario
                texto={acceso.titulo}
                icono={acceso.icono}
                onPress={acceso.onPress}
                color="azul"
                tamaño="mediano"
                testID={testID + '-' + acceso.id}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.grisClaro,
  },
  contentContainer: {
    padding: theme.spacing.md,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  titulo: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.h1,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.xs,
  },
  subtitulo: {
    fontFamily: theme.typography.fontFamily.secondary,
    fontSize: theme.typography.fontSize.bodyMedium,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.grisAdministrativo,
  },
  metricasContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  metricaCard: {
    flex: 1,
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    alignItems: 'center',
    ...theme.shadows.small,
  },
  metricaIcono: {
    fontSize: 40,
    marginBottom: theme.spacing.sm,
  },
  metricaValor: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.h1,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.azulDatos,
    marginBottom: theme.spacing.xs,
  },
  metricaLabel: {
    fontFamily: theme.typography.fontFamily.secondary,
    fontSize: theme.typography.fontSize.caption,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.grisAdministrativo,
    textAlign: 'center',
  },
  accesoContainer: {
    marginBottom: theme.spacing.lg,
  },
  seccionTitulo: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.h3,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.md,
  },
  botonesGrid: {
    gap: theme.spacing.md,
  },
  botonAcceso: {
    marginBottom: theme.spacing.sm,
  },
});

export default DashboardAdmin;
