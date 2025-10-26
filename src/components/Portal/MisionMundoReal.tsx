/**
 * MisionMundoReal - Tarjeta de misión del mundo real
 * Basado en: UI_COMPONENTS.md y PROJECT_REQUIREMENTS.md RF-013
 *
 * Propósito: Mostrar misiones que los padres pueden asignar en el mundo real
 * Estilo: Tarjeta con descripción y botones de acción
 *
 * Estados:
 * - Pendiente: No asignada
 * - Asignada: En progreso
 * - Completada: Marcada como completada
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { theme, strings } from '../../constants';
import type { BaseProps } from '../../types';
import BotonPrimario from '../Common/BotonPrimario';

export interface MisionMundoRealProps extends BaseProps {
  id: string;
  titulo: string;
  descripcion: string;
  estado: 'pendiente' | 'asignada' | 'completada';
  onAsignar?: () => void;
  onCompletar?: () => void;
}

/**
 * Componente MisionMundoReal
 * Según PROJECT_REQUIREMENTS.md RF-013: Transferencia al mundo real
 */
const MisionMundoReal: React.FC<MisionMundoRealProps> = ({
  titulo,
  descripcion,
  estado,
  onAsignar,
  onCompletar,
  testID,
  accessible = true,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const getIcono = () => {
    switch (estado) {
      case 'pendiente':
        return '📋';
      case 'asignada':
        return '⏳';
      case 'completada':
        return '✅';
      default:
        return '📋';
    }
  };

  const getColorEstado = () => {
    switch (estado) {
      case 'pendiente':
        return theme.colors.grisAdministrativo;
      case 'asignada':
        return theme.colors.amarilloSol;
      case 'completada':
        return theme.colors.verdeJungla;
      default:
        return theme.colors.grisAdministrativo;
    }
  };

  return (
    <View
      style={styles.container}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel || 'Misión: ' + titulo}
      accessibilityHint={accessibilityHint}
      testID={testID}
    >
      {/* Barra de estado */}
      <View
        style={[
          styles.barraEstado,
          { backgroundColor: getColorEstado() },
        ]}
      />

      {/* Contenido */}
      <View style={styles.contenido}>
        <View style={styles.header}>
          <Text style={styles.icono}>{getIcono()}</Text>
          <Text style={styles.titulo}>{titulo}</Text>
        </View>

        <Text style={styles.descripcion}>{descripcion}</Text>

        {/* Botones de acción */}
        <View style={styles.acciones}>
          {estado === 'pendiente' && onAsignar && (
            <BotonPrimario
              texto={strings.portalPadres.misionesReales.asignar}
              onPress={onAsignar}
              color="azul"
              tamaño="pequeño"
              testID={testID + '-asignar'}
            />
          )}

          {estado === 'asignada' && onCompletar && (
            <BotonPrimario
              texto={strings.portalPadres.misionesReales.completar}
              onPress={onCompletar}
              color="verde"
              tamaño="pequeño"
              testID={testID + '-completar'}
            />
          )}

          {estado === 'completada' && (
            <View style={styles.completadoBadge}>
              <Text style={styles.completadoTexto}>
                ✓ Completada
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.md,
    flexDirection: 'row',
    overflow: 'hidden',
    ...theme.shadows.small,
  },
  barraEstado: {
    width: 6,
  },
  contenido: {
    flex: 1,
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  icono: {
    fontSize: 24,
    marginRight: theme.spacing.sm,
  },
  titulo: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.h3,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisOscuro,
  },
  descripcion: {
    fontFamily: theme.typography.fontFamily.secondary,
    fontSize: theme.typography.fontSize.bodyMedium,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.md,
    lineHeight: theme.typography.fontSize.bodyMedium * theme.typography.lineHeight.normal,
  },
  acciones: {
    marginTop: theme.spacing.sm,
  },
  completadoBadge: {
    backgroundColor: theme.colors.verdeJungla,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.small,
    alignSelf: 'flex-start',
  },
  completadoTexto: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.bodySmall,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.blancoPuro,
  },
});

export default MisionMundoReal;
