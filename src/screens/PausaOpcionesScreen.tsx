import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Animated,
  BackHandler,
  Alert,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

// Imports centralizados obligatorios
import { Colores } from '../constants/colors';
import { Tipografia } from '../constants/typography';

/**
 * Pantalla 10: Pausa/Opciones
 * Permite descansos y ajustes durante la actividad según APP_BLUEPRINT.md líneas 115-125
 * 
 * Características principales:
 * - Pantalla semitransparente sobre actividad
 * - Leo en posición relajada  
 * - Opciones: Continuar, Configuración, Rincón Calma, Terminar
 * - Timer opcional pausa estructurada
 * - Integración IA para sugerencias proactivas
 */

// ========================================================================================
// INTERFACES Y TIPOS
// ========================================================================================

interface OpcionPausa {
  id: string;
  titulo: string;
  subtitulo?: string;
  icono: string;
  color: keyof typeof Colores;
  accion: 'continuar' | 'configuracion' | 'rincon_calma' | 'terminar';
  disponible: boolean;
}

interface ConfiguracionPausa {
  volumen: number;
  velocidad: 'lenta' | 'normal' | 'rapida';
  tiempoAutopausa: number | null; // segundos, null = sin autopausa
  sugerenciasIA: boolean;
}

interface EstadoPausa {
  tiempoInicio: number;
  tiempoTranscurrido: number;
  actividadId: string;
  progresoActividad: number;
  sugerenciaIA?: SugerenciaProactiva;
}

interface SugerenciaProactiva {
  tipo: 'descanso' | 'rincon_calma' | 'cambio_configuracion';
  mensaje: string;
  razon: string;
  confianza: number; // 0-1
  timestamp: number;
}

export interface PausaOpcionesScreenProps {
  visible: boolean;
  onContinuar: () => void;
  onConfiguracion: (config: ConfiguracionPausa) => void;
  onRinconCalma: () => void;
  onTerminar: () => void;
  onCerrar: () => void;
  estadoPausa: EstadoPausa;
  configuracionActual: ConfiguracionPausa;
  mostrarTimer?: boolean;
  tiempoMaxPausa?: number; // segundos
}

// ========================================================================================
// COMPONENTE PRINCIPAL
// ========================================================================================

const PausaOpcionesScreen: React.FC<PausaOpcionesScreenProps> = ({
  visible,
  onContinuar,
  onConfiguracion,
  onRinconCalma,
  onTerminar,
  estadoPausa,
  configuracionActual,
  mostrarTimer = true,
  tiempoMaxPausa = 300, // 5 minutos por defecto
}) => {
  // =====================================================================================
  // ESTADO Y HOOKS
  // =====================================================================================
  
  const [timerPausa, setTimerPausa] = useState(0);
  const [sonidoAmbiente, setSonidoAmbiente] = useState<Audio.Sound | null>(null);
  const [mostrandoConfiguracion, setMostrandoConfiguracion] = useState(false);
  const [configTemporal, setConfigTemporal] = useState<ConfiguracionPausa>(configuracionActual);
  const [animacionLeo] = useState(new Animated.Value(1));
  const [animacionModal, setAnimacionModal] = useState(new Animated.Value(0));

  // =====================================================================================
  // EFECTOS DE CICLO DE VIDA
  // =====================================================================================

  // Timer de pausa
  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setTimerPausa(prev => {
        const nuevo = prev + 1;
        
        // Auto-continuar si se alcanza tiempo máximo
        if (tiempoMaxPausa && nuevo >= tiempoMaxPausa) {
          handleContinuar();
          return prev;
        }
        
        return nuevo;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [visible, tiempoMaxPausa]);

  // Animación Leo respirando/relajado
  useEffect(() => {
    if (!visible) return;

    const animarLeoRespirando = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animacionLeo, {
            toValue: 0.95,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(animacionLeo, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animarLeoRespirando();
  }, [visible, animacionLeo]);

  // Animación modal
  useEffect(() => {
    if (visible) {
      Animated.spring(animacionModal, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      setAnimacionModal(new Animated.Value(0));
      setTimerPausa(0);
    }
  }, [visible, animacionModal]);

  // Sonido ambiente relajante
  useEffect(() => {
    const cargarSonidoAmbiente = async () => {
      if (!visible) return;

      try {
        const { sound } = await Audio.Sound.createAsync(
          require('../assets/audio/ambiente_pausa.mp3')
        );
        
        await sound.setVolumeAsync(configuracionActual.volumen * 0.3); // Más suave
        await sound.setIsLoopingAsync(true);
        await sound.playAsync();
        
        setSonidoAmbiente(sound);
      } catch (error) {
        console.warn('Error cargando sonido ambiente:', error);
      }
    };

    cargarSonidoAmbiente();

    return () => {
      if (sonidoAmbiente) {
        sonidoAmbiente.unloadAsync();
        setSonidoAmbiente(null);
      }
    };
  }, [visible, configuracionActual.volumen]);

  // Back handler para Android
  useFocusEffect(
    useCallback(() => {
      if (!visible) return;

      const onBackPress = () => {
        handleCerrarConConfirmacion();
        return true;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [visible])
  );

  // =====================================================================================
  // HANDLERS DE EVENTOS
  // =====================================================================================

  const handleContinuar = useCallback(() => {
    try {
      // Detener sonido ambiente
      if (sonidoAmbiente) {
        sonidoAmbiente.stopAsync();
      }

      // Animar cierre
      Animated.timing(animacionModal, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        onContinuar();
      });
    } catch (error) {
      console.error('Error al continuar actividad:', error);
      onContinuar(); // Continuar de todas formas
    }
  }, [sonidoAmbiente, animacionModal, onContinuar]);

  const handleConfiguracion = useCallback(() => {
    setMostrandoConfiguracion(true);
  }, []);

  const handleGuardarConfiguracion = useCallback(() => {
    try {
      onConfiguracion(configTemporal);
      setMostrandoConfiguracion(false);
    } catch (error) {
      console.error('Error guardando configuración:', error);
      Alert.alert(
        'Error',
        'No se pudieron guardar los cambios. Inténtalo de nuevo.',
        [{ text: 'OK' }]
      );
    }
  }, [configTemporal, onConfiguracion]);

  const handleRinconCalma = useCallback(() => {
    try {
      if (sonidoAmbiente) {
        sonidoAmbiente.stopAsync();
      }
      
      Animated.timing(animacionModal, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        onRinconCalma();
      });
    } catch (error) {
      console.error('Error navegando a Rincón de Calma:', error);
      onRinconCalma(); // Navegar de todas formas
    }
  }, [sonidoAmbiente, animacionModal, onRinconCalma]);

  const handleTerminar = useCallback(() => {
    Alert.alert(
      '¿Terminar actividad?',
      '¿Estás seguro de que quieres terminar la actividad? Se guardará tu progreso.',
      [
        {
          text: 'No, continuar',
          style: 'cancel',
        },
        {
          text: 'Sí, terminar',
          style: 'destructive',
          onPress: () => {
            try {
              if (sonidoAmbiente) {
                sonidoAmbiente.stopAsync();
              }
              
              Animated.timing(animacionModal, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
              }).start(() => {
                onTerminar();
              });
            } catch (error) {
              console.error('Error terminando actividad:', error);
              onTerminar(); // Terminar de todas formas
            }
          },
        },
      ]
    );
  }, [sonidoAmbiente, animacionModal, onTerminar]);

  const handleCerrarConConfirmacion = useCallback(() => {
    Alert.alert(
      'Cerrar pausa',
      '¿Quieres continuar con la actividad?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Continuar',
          onPress: handleContinuar,
        },
      ]
    );
  }, [handleContinuar]);

  // =====================================================================================
  // CONFIGURACIONES Y DATOS
  // =====================================================================================

  const opcionesPausa: OpcionPausa[] = useMemo(() => [
    {
      id: 'continuar',
      titulo: 'Continuar',
      subtitulo: 'Seguir con la actividad',
      icono: 'play',
      color: 'verdeJungla',
      accion: 'continuar',
      disponible: true,
    },
    {
      id: 'configuracion',
      titulo: 'Configuración',
      subtitulo: 'Ajustar volumen y velocidad',
      icono: 'settings',
      color: 'azul',
      accion: 'configuracion',
      disponible: true,
    },
    {
      id: 'rincon_calma',
      titulo: 'Rincón de Calma',
      subtitulo: 'Espacio de relajación',
      icono: 'flower',
      color: 'colorCalido',
      accion: 'rincon_calma',
      disponible: true,
    },
    {
      id: 'terminar',
      titulo: 'Terminar',
      subtitulo: 'Guardar progreso y salir',
      icono: 'stop',
      color: 'rojo',
      accion: 'terminar',
      disponible: true,
    },
  ], []);

  // =====================================================================================
  // FUNCIONES AUXILIARES
  // =====================================================================================

  const formatearTiempo = (segundos: number): string => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const obtenerColorProgreso = (progreso: number): keyof typeof Colores => {
    if (progreso >= 80) return 'verdeJungla';
    if (progreso >= 50) return 'amarillo';
    return 'colorCalido';
  };

  // =====================================================================================
  // RENDER DE SUBCOMPONENTES
  // =====================================================================================

  const renderLeoRelajado = () => (
    <Animated.View 
      style={[
        styles.leoContainer,
        {
          transform: [{ scale: animacionLeo }],
        },
      ]}
    >
      {/* Leo en posición meditativa/relajada */}
      <View style={styles.leoAvatar}>
        <Ionicons 
          name="paw" 
          size={80} 
          color={Colores.colorCalido} 
          style={styles.leoIcono}
        />
        <View style={styles.leoRespiracion} />
      </View>
      
      <Text style={[styles.textoLeo, Tipografia.estilos.Body]}>
        Leo está descansando contigo...
      </Text>
    </Animated.View>
  );

  const renderTimer = () => {
    if (!mostrarTimer) return null;

    const porcentajeTimer = tiempoMaxPausa ? (timerPausa / tiempoMaxPausa) * 100 : 0;

    return (
      <View style={styles.timerContainer}>
        <Text style={[styles.timerTexto, Tipografia.estilos.H2]}>
          Tiempo de pausa
        </Text>
        <Text style={[styles.timerNumero, Tipografia.estilos.H2]}>
          {formatearTiempo(timerPausa)}
        </Text>
        
        {tiempoMaxPausa && (
          <View style={styles.barraProgreso}>
            <View 
              style={[
                styles.progresoFill,
                { 
                  width: `${porcentajeTimer}%`,
                  backgroundColor: Colores[obtenerColorProgreso(100 - porcentajeTimer)]
                }
              ]}
            />
          </View>
        )}
      </View>
    );
  };

  const renderSugerenciaIA = () => {
    const sugerencia = estadoPausa.sugerenciaIA;
    if (!sugerencia || !configuracionActual.sugerenciasIA) return null;

    return (
      <View style={styles.sugerenciaContainer}>
        <Ionicons 
          name="bulb-outline" 
          size={20} 
          color={Colores.amarillo} 
        />
        <View style={styles.sugerenciaTextos}>
          <Text style={[styles.sugerenciaTitulo, Tipografia.estilos.H2]}>
            Sugerencia de Leo
          </Text>
          <Text style={[styles.sugerenciaMensaje, Tipografia.estilos.Body]}>
            {sugerencia.mensaje}
          </Text>
        </View>
      </View>
    );
  };

  const renderOpcionesPausa = () => (
    <View style={styles.opcionesContainer}>
      {opcionesPausa.map((opcion) => (
        <TouchableOpacity
          key={opcion.id}
          style={[
            styles.opcionBoton,
            { borderColor: Colores[opcion.color] },
            !opcion.disponible && styles.opcionDeshabilitada,
          ]}
          onPress={() => {
            switch (opcion.accion) {
              case 'continuar':
                handleContinuar();
                break;
              case 'configuracion':
                handleConfiguracion();
                break;
              case 'rincon_calma':
                handleRinconCalma();
                break;
              case 'terminar':
                handleTerminar();
                break;
            }
          }}
          disabled={!opcion.disponible}
          accessible={true}
          accessibilityLabel={`${opcion.titulo}: ${opcion.subtitulo}`}
          accessibilityRole="button"
          accessibilityHint={`Presiona para ${opcion.titulo.toLowerCase()}`}
        >
          <View style={[styles.opcionIcono, { backgroundColor: Colores[opcion.color] }]}>
            <Ionicons 
              name={opcion.icono as any} 
              size={24} 
              color={Colores.blancoPuro} 
            />
          </View>
          
          <View style={styles.opcionTextos}>
            <Text style={[styles.opcionTitulo, Tipografia.estilos.BotonPrimario]}>
              {opcion.titulo}
            </Text>
            {opcion.subtitulo && (
              <Text style={[styles.opcionSubtitulo, Tipografia.estilos.Body]}>
                {opcion.subtitulo}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderModalConfiguracion = () => (
    <Modal
      visible={mostrandoConfiguracion}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setMostrandoConfiguracion(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalConfiguracion}>
          <Text style={[styles.modalTitulo, Tipografia.estilos.H2]}>
            Configuración
          </Text>
          
          {/* Controles de configuración */}
          <View style={styles.configControles}>
            <Text style={[styles.configLabel, Tipografia.estilos.Body]}>
              Volumen: {Math.round(configTemporal.volumen * 100)}%
            </Text>
            
            <Text style={[styles.configLabel, Tipografia.estilos.Body]}>
              Velocidad: {configTemporal.velocidad}
            </Text>
          </View>
          
          <View style={styles.modalBotones}>
            <TouchableOpacity
              style={[styles.modalBoton, styles.botonCancelar]}
              onPress={() => {
                setConfigTemporal(configuracionActual);
                setMostrandoConfiguracion(false);
              }}
              accessible={true}
              accessibilityLabel="Cancelar cambios"
              accessibilityRole="button"
            >
              <Text style={[styles.textoBotonModal, Tipografia.estilos.BotonPrimario]}>
                Cancelar
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.modalBoton, styles.botonGuardar]}
              onPress={handleGuardarConfiguracion}
              accessible={true}
              accessibilityLabel="Guardar configuración"
              accessibilityRole="button"
            >
              <Text style={[styles.textoBotonModal, Tipografia.estilos.BotonPrimario]}>
                Guardar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // =====================================================================================
  // RENDER PRINCIPAL
  // =====================================================================================

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={handleCerrarConConfirmacion}
      statusBarTranslucent={true}
    >
      <StatusBar backgroundColor="transparent" translucent />
      
      {/* Overlay semitransparente según especificaciones */}
      <View style={styles.overlayPrincipal}>
        <Animated.View 
          style={[
            styles.modalContainer,
            {
              opacity: animacionModal,
              transform: [{
                scale: animacionModal.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                })
              }],
            },
          ]}
        >
          <SafeAreaView style={styles.safeContainer}>
            {/* Header con botón cerrar */}
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.botonCerrar}
                onPress={handleCerrarConConfirmacion}
                accessible={true}
                accessibilityLabel="Cerrar pausa"
                accessibilityRole="button"
              >
                <Ionicons name="close" size={24} color={Colores.grisAdministrativo} />
              </TouchableOpacity>
            </View>

            {/* Contenido principal */}
            <View style={styles.contenidoPrincipal}>
              {renderLeoRelajado()}
              {renderTimer()}
              {renderSugerenciaIA()}
              {renderOpcionesPausa()}
            </View>
          </SafeAreaView>
        </Animated.View>
      </View>

      {/* Modal de configuración */}
      {renderModalConfiguracion()}
    </Modal>
  );
};

// ========================================================================================
// ESTILOS
// ========================================================================================

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  // Layout principal
  overlayPrincipal: {
    flex: 1,
    backgroundColor: Colores.overlayNegro, // rgba(0,0,0,0.5) según especificaciones
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  modalContainer: {
    width: Math.min(width * 0.9, 400), // Máximo 90% o 400px según UI_COMPONENTS.md
    maxHeight: height * 0.8,
    backgroundColor: Colores.contenedorBlanco,
    borderRadius: 16, // Según especificaciones Modal.tsx
    elevation: 10,
    shadowColor: Colores.overlayNegro,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  safeContainer: {
    flex: 1,
    padding: 20,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },

  botonCerrar: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colores.grisClaro,
  },

  // Contenido principal  
  contenidoPrincipal: {
    flex: 1,
    alignItems: 'center',
  },

  // Leo relajado
  leoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },

  leoAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colores.colorCalido + '20',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  leoIcono: {
    textShadowColor: Colores.overlayNegro + '30',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  leoRespiracion: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: Colores.colorCalido + '30',
    backgroundColor: 'transparent',
  },

  textoLeo: {
    marginTop: 15,
    textAlign: 'center',
    color: Colores.grisAdministrativo,
    fontStyle: 'italic',
  },

  // Timer
  timerContainer: {
    alignItems: 'center',
    marginVertical: 20,
    padding: 15,
    backgroundColor: Colores.grisClaro + '50',
    borderRadius: 12,
    minWidth: 200,
  },

  timerTexto: {
    color: Colores.grisAdministrativo,
    marginBottom: 5,
  },

  timerNumero: {
    color: Colores.azul,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  barraProgreso: {
    width: '100%',
    height: 4,
    backgroundColor: Colores.grisClaro,
    borderRadius: 2,
    overflow: 'hidden',
  },

  progresoFill: {
    height: '100%',
    borderRadius: 2,
  },

  // Sugerencia IA
  sugerenciaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colores.amarillo + '20',
    padding: 12,
    borderRadius: 8,
    marginVertical: 15,
    borderLeftWidth: 3,
    borderLeftColor: Colores.amarillo,
  },

  sugerenciaTextos: {
    flex: 1,
    marginLeft: 10,
  },

  sugerenciaTitulo: {
    color: Colores.grisAdministrativo,
    fontWeight: 'bold',
    marginBottom: 2,
  },

  sugerenciaMensaje: {
    color: Colores.grisAdministrativo,
  },

  // Opciones de pausa
  opcionesContainer: {
    width: '100%',
    marginTop: 20,
  },

  opcionBoton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: Colores.blancoPuro,
  },

  opcionDeshabilitada: {
    opacity: 0.5,
  },

  opcionIcono: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  opcionTextos: {
    flex: 1,
  },

  opcionTitulo: {
    color: Colores.grisAdministrativo,
    fontWeight: 'bold',
    marginBottom: 2,
  },

  opcionSubtitulo: {
    color: Colores.grisAdministrativo,
    fontSize: 14,
  },

  // Modal configuración
  modalOverlay: {
    flex: 1,
    backgroundColor: Colores.overlayNegro,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalConfiguracion: {
    width: Math.min(width * 0.8, 350),
    backgroundColor: Colores.contenedorBlanco,
    borderRadius: 16,
    padding: 20,
  },

  modalTitulo: {
    textAlign: 'center',
    color: Colores.grisAdministrativo,
    marginBottom: 20,
  },

  configControles: {
    marginVertical: 20,
  },

  configLabel: {
    color: Colores.grisAdministrativo,
    marginVertical: 10,
  },

  modalBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  modalBoton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },

  botonCancelar: {
    backgroundColor: Colores.grisClaro,
  },

  botonGuardar: {
    backgroundColor: Colores.verdeJungla,
  },

  textoBotonModal: {
    color: Colores.blancoPuro,
    fontWeight: 'bold',
  },
});

export default PausaOpcionesScreen;
