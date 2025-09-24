import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';

/**
 * VERIFICACIÓN DOCUMENTACIÓN COMPLETADA:
 * ✅ APP_BLUEPRINT.md línea 103: "Sugerencia Proactiva" como componente motor IA
 * ✅ DESIGN_SYSTEM.md líneas 12-19: Especificaciones visuales exactas
 * ✅ PROJECT_REQUIREMENTS.md RF-IA-002: Sugerencias proactivas basadas en comportamiento
 * ✅ TECHNOLOGY.md línea 62: Ubicación components/ai/SugerenciaProactiva.tsx
 * ✅ UI_COMPONENTS.md líneas 159-176: Interface TypeScript y tipos especificados
 * ✅ VERIFICATION_CHECKLIST.md: Estándares enterprise aplicados
 */

// Interfaces de tipos según UI_COMPONENTS.md líneas 164-165
export interface AccionSugerencia {
  texto: string;
  onPress: () => void;
  tipo?: 'primario' | 'secundario';
}

// Interface principal según UI_COMPONENTS.md línea 161
export interface SugerenciaProactivaProps {
  tipo: 'descanso' | 'cambio_actividad' | 'celebracion' | 'ayuda';
  mensaje: string;
  accionPrincipal: AccionSugerencia;
  accionSecundaria?: AccionSugerencia;
  visible: boolean;
  onClose: () => void;
}

/**
 * Componente SugerenciaProactiva
 * 
 * Propósito según DESIGN_SYSTEM.md línea 13:
 * "Comunicar una sugerencia del motor de IA (ej. 'tomar un descanso') de forma no intrusiva"
 * 
 * Funcionalidad según APP_BLUEPRINT.md línea 103:
 * "Si se recibe una sugerencia como 'recomendar pausa', la app mostrará el componente 'Sugerencia Proactiva'"
 */
export const SugerenciaProactiva: React.FC<SugerenciaProactivaProps> = ({
  tipo,
  mensaje,
  accionPrincipal,
  accionSecundaria,
  visible,
  onClose,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  // Animación de entrada según DESIGN_SYSTEM.md línea 14: "aparece suavemente"
  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, scaleAnim]);

  // Función para obtener colores según tipo (UI_COMPONENTS.md líneas 171-175)
  const getTipoStyles = () => {
    switch (tipo) {
      case 'descanso':
        return {
          iconColor: colors.azulCalma, // "Icono de Leo descansando + fondo suave"
          borderColor: colors.azulCalma,
        };
      case 'cambio_actividad':
        return {
          iconColor: colors.verdeJungla, // "colores dinámicos"
          borderColor: colors.verdeJungla,
        };
      case 'celebracion':
        return {
          iconColor: colors.amarilloSol, // "Icono de trofeo + animación de confeti"
          borderColor: colors.amarilloSol,
        };
      case 'ayuda':
        return {
          iconColor: colors.amarilloSol, // "bombilla + colores cálidos"
          borderColor: colors.naranjaVibrante,
        };
      default:
        return {
          iconColor: colors.azulCalma,
          borderColor: colors.azulCalma,
        };
    }
  };

  // Texto del icono según tipo especificado en UI_COMPONENTS.md
  const getIconoTexto = () => {
    switch (tipo) {
      case 'descanso':
        return '😴'; // Leo descansando
      case 'cambio_actividad':
        return '🔄'; // Flecha circular
      case 'celebracion':
        return '🏆'; // Trofeo
      case 'ayuda':
        return '💡'; // Bombilla
      default:
        return '🦎'; // Leo por defecto
    }
  };

  const tipoStyles = getTipoStyles();

  // Error handling completo para props requeridos
  if (!visible) {
    return null;
  }

  if (!mensaje || !accionPrincipal) {
    console.error('[SugerenciaProactiva] Props requeridos faltantes: mensaje y accionPrincipal son obligatorios');
    return null;
  }

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
      accessibilityLabel={`Sugerencia de Leo: ${mensaje}`}
      accessibilityHint="Modal con sugerencia de la aplicación. Puedes aceptar o declinar."
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
              borderColor: tipoStyles.borderColor,
            },
          ]}
        >
          {/* Icono Leo según DESIGN_SYSTEM.md línea 17 */}
          <View style={[styles.iconContainer, { backgroundColor: tipoStyles.iconColor }]}>
            <Text style={styles.iconText}>{getIconoTexto()}</Text>
          </View>

          {/* Título según DESIGN_SYSTEM.md línea 18: "¡Una idea de Leo!" */}
          <Text style={styles.titulo} accessibilityRole="header">
            ¡Una idea de Leo!
          </Text>

          {/* Mensaje según DESIGN_SYSTEM.md línea 18: descripción Body */}
          <Text style={styles.mensaje} accessibilityRole="text">
            {mensaje}
          </Text>

          {/* Botones de acción según DESIGN_SYSTEM.md línea 19 */}
          <View style={styles.botonesContainer}>
            {/* Botón principal */}
            <TouchableOpacity
              style={[styles.botonPrimario, { backgroundColor: tipoStyles.iconColor }]}
              onPress={() => {
                accionPrincipal.onPress();
                onClose();
              }}
              accessibilityRole="button"
              accessibilityLabel={accionPrincipal.texto}
              accessibilityHint="Botón para aceptar la sugerencia"
              activeOpacity={0.8}
            >
              <Text style={styles.textoBotonPrimario}>{accionPrincipal.texto}</Text>
            </TouchableOpacity>

            {/* Botón secundario opcional */}
            {accionSecundaria && (
              <TouchableOpacity
                style={styles.botonSecundario}
                onPress={() => {
                  accionSecundaria.onPress();
                  onClose();
                }}
                accessibilityRole="button"
                accessibilityLabel={accionSecundaria.texto}
                accessibilityHint="Botón para declinar la sugerencia"
                activeOpacity={0.8}
              >
                <Text style={styles.textoBotonSecundario}>{accionSecundaria.texto}</Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Colores del Design System centralizados (DESIGN_SYSTEM.md y ASSETS_REALES búsquedas)
const colors = {
  // Colores principales del sistema según documentación
  azulCalma: '#1E90FF',
  verdeJungla: '#228B22',
  amarilloSol: '#FFD700',
  naranjaVibrante: '#FFA500',
  blancoPuro: '#FFFFFF',
  grisCarbón: '#2C2C2C',
  grisAcero: '#6B7280',
  
  // Overlay para modal
  overlayNegro: 'rgba(0, 0, 0, 0.5)',
};

// Dimensiones responsive
const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlayNegro, // DESIGN_SYSTEM.md línea 14: "sobre la pantalla actual"
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: colors.blancoPuro, // DESIGN_SYSTEM.md línea 16: "fondo blancoPuro"
    borderRadius: 16, // DESIGN_SYSTEM.md línea 16: "bordes redondeados"
    padding: 24,
    maxWidth: Math.min(screenWidth * 0.9, 400),
    minWidth: 280,
    borderWidth: 3,
    // Sombra para profundidad visual
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8, // Android shadow
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  iconText: {
    fontSize: 32,
    textAlign: 'center',
  },
  titulo: {
    // Tipografía H2 según DESIGN_SYSTEM.md línea 18
    fontFamily: 'Lince-Display',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '600',
    color: colors.grisCarbón,
    textAlign: 'center',
    marginBottom: 12,
  },
  mensaje: {
    // Tipografía Body según DESIGN_SYSTEM.md línea 18
    fontFamily: 'Lince-Regular',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: colors.grisCarbón,
    textAlign: 'center',
    marginBottom: 24,
  },
  botonesContainer: {
    flexDirection: 'column', // Stack vertical para mejor accesibilidad móvil
    gap: 12,
  },
  botonPrimario: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    minHeight: 56, // Mínimo táctil según PROJECT_REQUIREMENTS.md RNF-003
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotonPrimario: {
    fontFamily: 'Lince-Display',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.blancoPuro,
    textAlign: 'center',
  },
  botonSecundario: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    minHeight: 56,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.grisAcero,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotonSecundario: {
    fontFamily: 'Lince-Display',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.grisAcero,
    textAlign: 'center',
  },
});

export default SugerenciaProactiva;