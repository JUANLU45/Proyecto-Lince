import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

/**
 * VERIFICACIÓN DOCUMENTACIÓN COMPLETADA:
 * ✅ APP_BLUEPRINT.md línea 172: "Lista de componentes 'Insight para Padres'"
 * ✅ DESIGN_SYSTEM.md líneas 21-27: Especificaciones visuales tarjeta informativa
 * ✅ PROJECT_REQUIREMENTS.md RF-IA-004: "Generación de insights para padres"
 * ✅ TECHNOLOGY.md línea 211: "Función: Generación de Insights para Padres"
 * ✅ UI_COMPONENTS.md líneas 209-216: Interface TypeScript exacta
 * ✅ VERIFICATION_CHECKLIST.md: Estándares enterprise aplicados
 */

// Interface para acciones disponibles en insights
export interface AccionInsight {
  texto: string;
  onPress: () => void;
  tipo?: 'primario' | 'secundario';
  icono?: string;
}

// Interface principal según UI_COMPONENTS.md línea 211
export interface InsightPadresProps {
  tipo: 'progreso' | 'sugerencia' | 'logro' | 'recomendacion';
  titulo: string;
  contenido: string;
  accionesDisponibles?: AccionInsight[];
  fechaGeneracion: Date;
}

/**
 * Componente InsightPadres
 * 
 * Propósito según DESIGN_SYSTEM.md línea 22:
 * "Mostrar los resúmenes y sugerencias generados por la IA en el portal de padres"
 * 
 * Funcionalidad según APP_BLUEPRINT.md línea 172:
 * "Lista de componentes 'Insight para Padres'" en Dashboard Portal
 */
export const InsightPadres: React.FC<InsightPadresProps> = ({
  tipo,
  titulo,
  contenido,
  accionesDisponibles,
  fechaGeneracion,
}) => {
  // Error handling completo para props requeridos
  if (!titulo || !contenido) {
    console.error('[InsightPadres] Props requeridos faltantes: titulo y contenido son obligatorios');
    return null;
  }

  // Función para obtener estilos según tipo (DESIGN_SYSTEM.md línea 25)
  const getTipoStyles = () => {
    switch (tipo) {
      case 'progreso':
        return {
          borderColor: colors.verdeJungla, // "verdeJungla para progreso"
          iconColor: colors.verdeJungla,
          icon: '📊', // "gráfico para progreso"
        };
      case 'sugerencia':
        return {
          borderColor: colors.amarilloSol, // "amarilloSol para sugerencia"
          iconColor: colors.amarilloSol,
          icon: '💡', // "bombilla para sugerencia"
        };
      case 'logro':
        return {
          borderColor: colors.verdeJungla,
          iconColor: colors.verdeJungla,
          icon: '🏆', // Trofeo para logros
        };
      case 'recomendacion':
        return {
          borderColor: colors.azulCalma,
          iconColor: colors.azulCalma,
          icon: '📖', // "libro para recomendación"
        };
      default:
        return {
          borderColor: colors.grisAcero,
          iconColor: colors.grisAcero,
          icon: 'ℹ️',
        };
    }
  };

  // Formatear fecha de generación para accesibilidad
  const formatearFecha = (fecha: Date): string => {
    const opciones: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return fecha.toLocaleDateString('es-ES', opciones);
  };

  const tipoStyles = getTipoStyles();

  return (
    <View
      style={[
        styles.container,
        { borderLeftColor: tipoStyles.borderColor }
      ]}
      accessibilityLabel={`Insight: ${titulo}`}
      accessibilityHint={`Información generada por la IA sobre ${tipo}. ${contenido}`}
    >
      {/* Barra lateral de color según DESIGN_SYSTEM.md línea 25 */}
      <View style={[styles.barraLateral, { backgroundColor: tipoStyles.borderColor }]} />

      <View style={styles.contenidoContainer}>
        {/* Header con icono y título */}
        <View style={styles.headerContainer}>
          <View style={[styles.iconoContainer, { backgroundColor: tipoStyles.iconColor }]}>
            <Text style={styles.iconoTexto}>{tipoStyles.icon}</Text>
          </View>
          
          <View style={styles.tituloContainer}>
            {/* Título según DESIGN_SYSTEM.md línea 27: "Título (H2)" */}
            <Text 
              style={styles.titulo}
              accessibilityRole="header"
            >
              {titulo}
            </Text>
            
            {/* Fecha de generación */}
            <Text style={styles.fechaTexto}>
              {formatearFecha(fechaGeneracion)}
            </Text>
          </View>
        </View>

        {/* Contenido principal según DESIGN_SYSTEM.md línea 27: "resumen en lenguaje natural (Body)" */}
        <Text 
          style={styles.contenido}
          accessibilityRole="text"
        >
          {contenido}
        </Text>

        {/* Acciones disponibles opcionales */}
        {accionesDisponibles && accionesDisponibles.length > 0 && (
          <View style={styles.accionesContainer}>
            {accionesDisponibles.map((accion, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.botonAccion,
                  accion.tipo === 'primario' 
                    ? [styles.botonPrimario, { backgroundColor: tipoStyles.iconColor }]
                    : styles.botonSecundario
                ]}
                onPress={accion.onPress}
                accessibilityRole="button"
                accessibilityLabel={accion.texto}
                accessibilityHint={`Acción disponible: ${accion.texto}`}
                activeOpacity={0.8}
              >
                {accion.icono && (
                  <Text style={styles.iconoAccion}>{accion.icono}</Text>
                )}
                <Text 
                  style={[
                    styles.textoAccion,
                    accion.tipo === 'primario' 
                      ? styles.textoAccionPrimario 
                      : styles.textoAccionSecundario
                  ]}
                >
                  {accion.texto}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

// Colores del Design System centralizados según documentación
const colors = {
  // Colores principales según DESIGN_SYSTEM.md y búsquedas assets
  azulCalma: '#1E90FF',
  verdeJungla: '#228B22', 
  amarilloSol: '#FFD700',
  naranjaVibrante: '#FFA500',
  blancoPuro: '#FFFFFF',
  grisCarbón: '#2C2C2C',
  grisAcero: '#6B7280',
  grisClaro: '#F5F5F5',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blancoPuro, // DESIGN_SYSTEM.md línea 25: "fondo blancoPuro"
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    borderLeftWidth: 4, // "barra lateral de color"
    // Sombra sutil para profundidad
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  } as ViewStyle,
  
  barraLateral: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  } as ViewStyle,

  contenidoContainer: {
    padding: 16,
    paddingLeft: 20, // Espacio para barra lateral
  } as ViewStyle,

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  } as ViewStyle,

  iconoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  } as ViewStyle,

  iconoTexto: {
    fontSize: 20,
    textAlign: 'center',
  } as TextStyle,

  tituloContainer: {
    flex: 1,
  } as ViewStyle,

  titulo: {
    // Tipografía H2 según DESIGN_SYSTEM.md línea 27
    fontFamily: 'Lince-Display',
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '600',
    color: colors.grisCarbón,
    marginBottom: 4,
  } as TextStyle,

  fechaTexto: {
    fontFamily: 'Lince-Regular',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    color: colors.grisAcero,
  } as TextStyle,

  contenido: {
    // Tipografía Body según DESIGN_SYSTEM.md línea 27
    fontFamily: 'Lince-Regular',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: colors.grisCarbón,
    marginBottom: 16,
  } as TextStyle,

  accionesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  } as ViewStyle,

  botonAccion: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    minHeight: 44, // Mínimo táctil según PROJECT_REQUIREMENTS.md RNF-003
  } as ViewStyle,

  botonPrimario: {
    // backgroundColor se establece dinámicamente según tipo
  } as ViewStyle,

  botonSecundario: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.grisAcero,
  } as ViewStyle,

  iconoAccion: {
    fontSize: 16,
    marginRight: 6,
  } as TextStyle,

  textoAccion: {
    fontFamily: 'Lince-Display',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600',
  } as TextStyle,

  textoAccionPrimario: {
    color: colors.blancoPuro,
  } as TextStyle,

  textoAccionSecundario: {
    color: colors.grisAcero,
  } as TextStyle,
});

export default InsightPadres;