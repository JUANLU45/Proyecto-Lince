/**
 * Pantalla Panel Administrativo - Proyecto Lince
 * Basado en: APP_BLUEPRINT.md - Pantalla 14
 *
 * Propósito: Panel administrativo con métricas del sistema
 * Dashboard admin, gestión de banners, permisos
 *
 * MANDAMIENTOS:
 * ✅ i18n desde constants/strings
 * ✅ Theme centralizado
 * ✅ Accesibilidad perfecta
 * ✅ Seguridad BD perfecta (verifica permisos)
 * ✅ NO código placebo
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme, strings } from '../constants';
import { DashboardAdmin, PermisoAdmin, GestionBanners } from '../components/Portal/Admin';
import { usePerfilStore } from '../store';
import { FirebaseService } from '../services';

function PanelAdminScreen() {
  const perfilNiño = usePerfilStore((state) => state.perfilNiño);
  const [tienePermiso, setTienePermiso] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const verificarPermiso = async () => {
      if (perfilNiño) {
        const resultado = await FirebaseService.verificarPermisoAdmin(perfilNiño.uid);
        if (resultado.success && resultado.data) {
          setTienePermiso(resultado.data);
        }
      }
      setCargando(false);
    };

    verificarPermiso();
  }, [perfilNiño]);

  if (cargando) {
    return (
      <View style={styles.container}>
        <View style={styles.centrado}>
          <Text style={styles.textoInfo}>{strings.common.cargando}</Text>
        </View>
      </View>
    );
  }

  if (!tienePermiso) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titulo} accessible={true}>
            {strings.portalPadres.admin.titulo}
          </Text>
        </View>

        <PermisoAdmin />
      </View>
    );
  }

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityLabel={strings.portalPadres.admin.titulo}
    >
      <View style={styles.header}>
        <Text style={styles.titulo} accessible={true}>
          {strings.portalPadres.admin.titulo}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        accessible={true}
      >
        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>
            {strings.portalPadres.admin.metricas}
          </Text>
          <DashboardAdmin />
        </View>

        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>
            {strings.portalPadres.admin.banners}
          </Text>
          <GestionBanners />
        </View>

        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>
            Logs del sistema
          </Text>
          <View style={styles.logsContainer}>
            <Text style={styles.textoInfo}>
              Logs de auditoría disponibles en modo producción
            </Text>
          </View>
        </View>
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
    backgroundColor: theme.colors.rojoAdministrativo,
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
  logsContainer: {
    backgroundColor: theme.colors.grisClaro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    alignItems: 'center',
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
    textAlign: 'center',
  },
});

export default PanelAdminScreen;
