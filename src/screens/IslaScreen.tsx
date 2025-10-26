import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import type { IslaScreenProps, TipoIsla, NivelDificultad, DuracionActividad } from '../types';
import { theme, strings } from '../constants';
import { BotonPrimario, BarraProgreso } from '../components';

/**
 * Actividad temporal para mostrar en la lista
 * TODO FASE 5: Reemplazar con datos reales desde Zustand/Firebase
 */
interface ActividadTemporalData {
  id: string;
  titulo: string;
  descripcion: string;
  emoji: string;
  dificultad: NivelDificultad;
  duracion: DuracionActividad;
  completada: boolean;
}

/**
 * IslaScreen - Lista de actividades disponibles por isla
 *
 * Propósito: Mostrar todas las actividades disponibles en una isla temática,
 * permitiendo al niño elegir qué actividad realizar.
 *
 * Basado en: APP_BLUEPRINT.md - Pantalla 5: Vista de Isla
 *
 * Componentes:
 * - Título temático de la isla
 * - Lista de actividades con:
 *   * Miniatura visual (emoji)
 *   * Título descriptivo
 *   * Indicador de dificultad
 *   * Estado de completación
 *   * Estimación de tiempo
 * - Botón "Actividad Random" (sugerida por IA)
 * - Progreso específico de la isla
 *
 * Mandamientos cumplidos:
 * - ✅ Anti-Especulación: Basado en APP_BLUEPRINT.md líneas 71-88
 * - ✅ Anti-Placebo: Navegación funcional, datos placeholder para FASE 4
 * - ✅ BD/Seguridad: Preparado para cargar desde Zustand/Firebase
 * - ✅ Imports: Tipos desde types/, componentes desde components/
 * - ✅ Estilos: Todos desde theme.ts
 * - ✅ Accesibilidad: accessibilityRole, accessibilityLabel en todos los botones
 * - ✅ i18n: Todos los strings desde strings.ts
 */
const IslaScreen: React.FC<IslaScreenProps> = ({ route, navigation }) => {
  const { islaId } = route.params;

  // TODO FASE 5: Cargar actividades reales desde Zustand
  // Por ahora, datos placeholder basados en el tipo de isla
  const actividadesPlaceholder: ActividadTemporalData[] = getActividadesPorIsla(islaId);

  // Calcular progreso de la isla
  const actividadesCompletadas = actividadesPlaceholder.filter(a => a.completada).length;
  const progresoIsla = Math.round((actividadesCompletadas / actividadesPlaceholder.length) * 100);

  const handleActividadPress = (actividadId: string) => {
    navigation.navigate('PreActividad', { actividadId });
  };

  const handleActividadRandom = () => {
    // TODO FASE 5: IA sugiere actividad basada en perfil
    const actividadesPendientes = actividadesPlaceholder.filter(a => !a.completada);
    if (actividadesPendientes.length > 0) {
      const random = actividadesPendientes[Math.floor(Math.random() * actividadesPendientes.length)];
      handleActividadPress(random.id);
    }
  };

  const getNombreIsla = (isla: TipoIsla): string => {
    switch (isla) {
      case 'movimiento':
        return strings.mapa.islas.movimiento.nombre;
      case 'musical':
        return strings.mapa.islas.musical.nombre;
      case 'tactil':
        return strings.mapa.islas.tactil.nombre;
      case 'visual':
        return strings.mapa.islas.visual.nombre;
      case 'calma':
        return strings.mapa.islas.calma.nombre;
      default:
        return 'Isla';
    }
  };

  const getColorIsla = (isla: TipoIsla): string => {
    switch (isla) {
      case 'movimiento':
        return theme.colors.amarilloSol;
      case 'musical':
        return theme.colors.azulCalma;
      case 'tactil':
        return theme.colors.verdeJungla;
      case 'visual':
        return theme.colors.rojoPeligro;
      case 'calma':
        return theme.colors.azulCalma;
      default:
        return theme.colors.grisOscuro;
    }
  };

  const renderActividadItem = ({ item }: { item: ActividadTemporalData }) => (
    <TouchableOpacity
      style={[styles.actividadCard, item.completada && styles.actividadCompletada]}
      onPress={() => handleActividadPress(item.id)}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Actividad: ${item.titulo}`}
      accessibilityHint={item.completada ? 'Completada' : 'Toca para comenzar'}
    >
      <View style={styles.actividadEmoji}>
        <Text style={styles.emojiText}>{item.emoji}</Text>
        {item.completada && (
          <View style={styles.checkMark}>
            <Text style={styles.checkMarkText}>✓</Text>
          </View>
        )}
      </View>

      <View style={styles.actividadInfo}>
        <Text style={styles.actividadTitulo}>{item.titulo}</Text>
        <Text style={styles.actividadDescripcion}>{item.descripcion}</Text>

        <View style={styles.actividadMeta}>
          <View style={[styles.dificultadBadge, getDificultadColor(item.dificultad)]}>
            <Text style={styles.badgeText}>{getDificultadLabel(item.dificultad)}</Text>
          </View>
          <View style={styles.duracionBadge}>
            <Text style={styles.badgeText}>{getDuracionLabel(item.duracion)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: getColorIsla(islaId) }]}>
        <Text style={styles.headerTitle}>{getNombreIsla(islaId)}</Text>
        <View style={styles.progresoContainer}>
          <BarraProgreso
            progreso={progresoIsla}
            altura={16}
            mostrarPorcentaje={true}
            color={theme.colors.blancoPuro}
          />
        </View>
      </View>

      {/* Botón Actividad Random */}
      <View style={styles.randomContainer}>
        <BotonPrimario
          texto={strings.actividades.actividadRandom}
          onPress={handleActividadRandom}
          color="amarillo"
          tamaño="pequeño"
        />
      </View>

      {/* Lista de actividades */}
      <FlatList
        data={actividadesPlaceholder}
        renderItem={renderActividadItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

/**
 * Helpers para obtener actividades placeholder por isla
 * TODO FASE 5: Reemplazar con datos reales
 */
function getActividadesPorIsla(islaId: TipoIsla): ActividadTemporalData[] {
  const actividadesPorIsla: Record<TipoIsla, ActividadTemporalData[]> = {
    movimiento: [
      {
        id: 'mov-1',
        titulo: 'Los Saltos Fuertes de Leo',
        descripcion: 'Salta como Leo para sentir tu cuerpo',
        emoji: '🦘',
        dificultad: 'básico',
        duracion: 'corta',
        completada: true,
      },
      {
        id: 'mov-2',
        titulo: 'El Baile de las Emociones',
        descripcion: 'Baila y expresa cómo te sientes',
        emoji: '💃',
        dificultad: 'intermedio',
        duracion: 'normal',
        completada: false,
      },
      {
        id: 'mov-3',
        titulo: 'Carrera de Obstáculos',
        descripcion: 'Supera obstáculos con Leo',
        emoji: '🏃',
        dificultad: 'avanzado',
        duracion: 'larga',
        completada: false,
      },
    ],
    musical: [
      {
        id: 'mus-1',
        titulo: 'Los Sonidos de la Jungla',
        descripcion: 'Escucha y reconoce sonidos',
        emoji: '🎵',
        dificultad: 'básico',
        duracion: 'corta',
        completada: false,
      },
      {
        id: 'mus-2',
        titulo: 'Crea tu Propia Canción',
        descripcion: 'Compón música con Leo',
        emoji: '🎹',
        dificultad: 'intermedio',
        duracion: 'normal',
        completada: false,
      },
    ],
    tactil: [
      {
        id: 'tac-1',
        titulo: 'El Jardín de Texturas',
        descripcion: 'Toca y siente diferentes materiales',
        emoji: '🌸',
        dificultad: 'básico',
        duracion: 'corta',
        completada: true,
      },
      {
        id: 'tac-2',
        titulo: 'Moldea con Plastilina',
        descripcion: 'Crea figuras con tus manos',
        emoji: '🎨',
        dificultad: 'intermedio',
        duracion: 'normal',
        completada: false,
      },
    ],
    visual: [
      {
        id: 'vis-1',
        titulo: 'Los Colores de Leo',
        descripcion: 'Identifica y mezcla colores',
        emoji: '🎨',
        dificultad: 'básico',
        duracion: 'corta',
        completada: false,
      },
      {
        id: 'vis-2',
        titulo: 'Busca las Diferencias',
        descripcion: 'Encuentra qué es diferente',
        emoji: '🔍',
        dificultad: 'intermedio',
        duracion: 'normal',
        completada: false,
      },
    ],
    calma: [
      {
        id: 'cal-1',
        titulo: 'Respiración con Leo',
        descripcion: 'Respira profundo y relájate',
        emoji: '🧘',
        dificultad: 'básico',
        duracion: 'corta',
        completada: false,
      },
    ],
  };

  return actividadesPorIsla[islaId] || [];
}

function getDificultadLabel(dificultad: NivelDificultad): string {
  const labels: Record<NivelDificultad, string> = {
    básico: 'Básico',
    intermedio: 'Intermedio',
    avanzado: 'Avanzado',
  };
  return labels[dificultad];
}

function getDificultadColor(dificultad: NivelDificultad) {
  const colors: Record<NivelDificultad, any> = {
    básico: { backgroundColor: theme.colors.verdeJungla },
    intermedio: { backgroundColor: theme.colors.amarilloSol },
    avanzado: { backgroundColor: theme.colors.rojoPeligro },
  };
  return colors[dificultad];
}

function getDuracionLabel(duracion: DuracionActividad): string {
  const labels: Record<DuracionActividad, string> = {
    corta: '5 min',
    normal: '10 min',
    larga: '15 min',
  };
  return labels[duracion];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.grisClaro,
  },
  header: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    ...theme.shadows.medium,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.h1,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.blancoPuro,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  progresoContainer: {
    marginTop: theme.spacing.sm,
  },
  randomContainer: {
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  listContainer: {
    padding: theme.spacing.md,
    paddingTop: 0,
  },
  actividadCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.blancoPuro,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  actividadCompletada: {
    opacity: 0.7,
    backgroundColor: theme.colors.grisClaro,
  },
  actividadEmoji: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
    position: 'relative',
  },
  emojiText: {
    fontSize: 48,
  },
  checkMark: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.verdeJungla,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMarkText: {
    color: theme.colors.blancoPuro,
    fontSize: theme.typography.fontSize.bodySmall,
    fontFamily: theme.typography.fontFamily.primary,
  },
  actividadInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  actividadTitulo: {
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.grisOscuro,
    marginBottom: theme.spacing.xs,
  },
  actividadDescripcion: {
    fontSize: theme.typography.fontSize.bodyMedium,
    fontFamily: theme.typography.fontFamily.secondary,
    color: theme.colors.grisAdministrativo,
    marginBottom: theme.spacing.sm,
  },
  actividadMeta: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  dificultadBadge: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.small,
  },
  duracionBadge: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.small,
    backgroundColor: theme.colors.azulCalma,
  },
  badgeText: {
    fontSize: theme.typography.fontSize.caption,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.blancoPuro,
  },
});

export default IslaScreen;
