/**
 * PermisoAdmin - Componente de verificación de permisos administrativos
 * Basado en: DESIGN_SYSTEM.md y PROJECT_REQUIREMENTS.md
 *
 * Propósito: Gate component que verifica permisos antes de mostrar contenido admin
 * Comportamiento:
 * - Si tiene permisos: Muestra children
 * - Si no tiene permisos: Muestra mensaje de acceso denegado o null
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { theme, strings } from '../../../constants';
import type { BaseProps } from '../../../types';

export interface PermisoAdminProps extends BaseProps {
  tienePermiso: boolean;
  children: React.ReactNode;
  mostrarMensaje?: boolean;
}

/**
 * Componente PermisoAdmin
 * Según PROJECT_REQUIREMENTS.md RNF-006: Control de acceso
 */
const PermisoAdmin: React.FC<PermisoAdminProps> = ({
  tienePermiso,
  children,
  mostrarMensaje = false,
  testID,
}) => {
  if (tienePermiso) {
    return <>{children}</>;
  }

  if (mostrarMensaje) {
    return (
      <View style={styles.container} testID={testID}>
        <Text style={styles.icono}>🔒</Text>
        <Text style={styles.titulo}>
          {strings.errores.permisos}
        </Text>
        <Text style={styles.mensaje}>
          No tienes permisos para acceder a esta sección administrativa.
        </Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  icono: {
    fontSize: 64,
    marginBottom: theme.spacing.md,
  },
  titulo: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.h2,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.rojoPeligro,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  mensaje: {
    fontFamily: theme.typography.fontFamily.secondary,
    fontSize: theme.typography.fontSize.bodyMedium,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.grisOscuro,
    textAlign: 'center',
  },
});

export default PermisoAdmin;
