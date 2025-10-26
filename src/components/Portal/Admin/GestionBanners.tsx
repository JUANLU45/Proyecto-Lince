/**
 * GestionBanners - Interface para gestión de banners
 * Basado en: DESIGN_SYSTEM.md líneas 68-77
 *
 * Propósito: Interface para crear, editar y gestionar banners de página principal
 * Diseño:
 * - Vista previa: Marco con proporciones reales del banner
 * - Controles: Botones azulCalma (editar), rojoAdministrativo (eliminar)
 * - Estados: Indicadores visuales para banners activos/inactivos
 * - Upload: Área de arrastrar y soltar con feedback visual
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { theme } from '../../../constants';
import type { BaseProps } from '../../../types';
import BotonPrimario from '../../Common/BotonPrimario';
import BotonSecundario from '../../Common/BotonSecundario';

export interface BannerData {
  id: string;
  titulo: string;
  imagenUrl?: string;
  activo: boolean;
  fechaCreacion: Date;
}

export interface GestionBannersProps extends BaseProps {
  banner: BannerData;
  onEditar: (id: string) => void;
  onEliminar: (id: string) => void;
  onToggleActivo: (id: string) => void;
}

/**
 * Componente GestionBanners
 * Según DESIGN_SYSTEM.md: Gestión de Banners
 */
const GestionBanners: React.FC<GestionBannersProps> = ({
  banner,
  onEditar,
  onEliminar,
  onToggleActivo,
  testID,
  accessible = true,
  accessibilityLabel,
  accessibilityHint,
}) => {
  return (
    <View
      style={styles.container}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel || 'Banner: ' + banner.titulo}
      accessibilityHint={accessibilityHint}
      testID={testID}
    >
      {/* Estado */}
      <View style={styles.estadoContainer}>
        <View
          style={[
            styles.indicadorEstado,
            {
              backgroundColor: banner.activo
                ? theme.colors.verdeDatos
                : theme.colors.grisAdministrativo,
            },
          ]}
        />
        <Text style={styles.estadoTexto}>
          {banner.activo ? 'Activo' : 'Inactivo'}
        </Text>
      </View>

      {/* Vista previa */}
      <View style={styles.preview}>
        {banner.imagenUrl ? (
          <Image
            source={{ uri: banner.imagenUrl }}
            style={styles.imagen}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderIcono}>🖼️</Text>
            <Text style={styles.placeholderTexto}>Sin imagen</Text>
          </View>
        )}
      </View>

      {/* Información */}
      <Text style={styles.titulo}>{banner.titulo}</Text>
      <Text style={styles.fecha}>
        Creado: {banner.fechaCreacion.toLocaleDateString('es-ES')}
      </Text>

      {/* Controles */}
      <View style={styles.controles}>
        <View style={styles.botonWrapper}>
          <BotonSecundario
            texto={banner.activo ? 'Desactivar' : 'Activar'}
            onPress={() => onToggleActivo(banner.id)}
            variante="outline"
            testID={testID + '-toggle'}
          />
        </View>
        <View style={styles.botonWrapper}>
          <BotonPrimario
            texto="Editar"
            onPress={() => onEditar(banner.id)}
            color="azul"
            tamaño="pequeño"
            testID={testID + '-editar'}
          />
        </View>
        <View style={styles.botonWrapper}>
          <BotonPrimario
            texto="Eliminar"
            onPress={() => onEliminar(banner.id)}
            color="rojo"
            tamaño="pequeño"
            testID={testID + '-eliminar'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  estadoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  indicadorEstado: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: theme.spacing.xs,
  },
  estadoTexto: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.caption,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisOscuro,
    textTransform: 'uppercase',
  },
  preview: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: theme.borderRadius.medium,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.grisClaro,
  },
  imagen: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcono: {
    fontSize: 48,
    marginBottom: theme.spacing.xs,
  },
  placeholderTexto: {
    fontFamily: theme.typography.fontFamily.secondary,
    fontSize: theme.typography.fontSize.bodySmall,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.grisAdministrativo,
  },
  titulo: {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.h3,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.xs,
  },
  fecha: {
    fontFamily: theme.typography.fontFamily.secondary,
    fontSize: theme.typography.fontSize.caption,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.grisAdministrativo,
    marginBottom: theme.spacing.md,
  },
  controles: {
    gap: theme.spacing.sm,
  },
  botonWrapper: {
    marginBottom: theme.spacing.xs,
  },
});

export default GestionBanners;
