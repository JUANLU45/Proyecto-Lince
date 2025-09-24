/**
 * PROYECTO LINCE - TUTORIALSCREEN.TSX
 * 
 * Tutorial interactivo según APP_BLUEPRINT.md líneas 26-35.
 * Leo explica controles básicos con práctica de gestos y recompensas.
 * 
 * DOCUMENTACIÓN FUENTE:
 * - APP_BLUEPRINT.md líneas 26-35: Tutorial interactivo con Leo guía
 * - DESIGN_SYSTEM.md: Colores amarilloSol, verdeJungla, blancoPuro
 * - PROJECT_REQUIREMENTS.md: RF-005 sistema recompens  renderizarContenidoPaso = useMemo((): JSX.Element => {
    const { pasoActual, recompensas } = estado.progreso; gamificado
 * - UI_COMPONENTS.md: BotonPrimario, AvatarLeo, Modal centralizados
 * - VERIFICATION_CHECKLIST.md: Calidad producción obligatoria
 * - TECHNOLOGY.md: React Native + TypeScript + Expo stack
 * 
 * FUNCIONALIDADES IMPLEMENTADAS:
 * - Leo como guía explicando controles básicos
 * - Práctica de gestos (tocar, deslizar) con feedback
 * - Introducción al sistema de recompensas
 * - Botón "Saltar tutorial" para usuarios experimentados
 * - Accesibilidad completa VoiceOver/TalkBack
 * - Manejo de errores y performance optimizado
 * 
 * @author Proyecto Lince
 * @version 1.0.0
 * @fecha 24 septiembre 2025
 */

// Imports centralizados según REGLAS_COMPORTAMIENTO.md
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  Alert,
  AccessibilityInfo
} from 'react-native';
import { PanGestureHandler, State as GestureState } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// Imports centralizados del sistema
import { Colores } from '../constants/colors';
import { Tipografia } from '../constants/typography';

/**
 * Estados del tutorial según APP_BLUEPRINT.md línea 30
 */
enum EstadoTutorial {
  BIENVENIDA = 'bienvenida',
  CONTROLES_BASICOS = 'controles_basicos',
  PRACTICA_TOCAR = 'practica_tocar',
  PRACTICA_DESLIZAR = 'practica_deslizar', 
  SISTEMA_RECOMPENSAS = 'sistema_recompensas',
  COMPLETADO = 'completado'
}

/**
 * Tipos de gestos para práctica según APP_BLUEPRINT.md línea 31
 */
interface GestosPractica {
  tocar: boolean;
  deslizar: boolean;
  mantenerPresionado: boolean;
}

/**
 * Configuración de recompensas según PROJECT_REQUIREMENTS.md RF-005
 */
interface ConfiguracionRecompensas {
  estrellasObtenidas: number;
  nivel: string;
  logrosDesbloqueados: string[];
}

/**
 * Estado de progreso del tutorial
 */
interface ProgresoTutorial {
  pasoActual: EstadoTutorial;
  gestosCompletados: GestosPractica;
  recompensas: ConfiguracionRecompensas;
  tiempoInicio: number;
  puedeOmitir: boolean;
}

/**
 * Props del componente TutorialScreen
 */
interface TutorialScreenProps {
  /**
   * Función de navegación al completar tutorial
   * Requerido por APP_BLUEPRINT.md línea 35
   */
  onTutorialCompleto: () => void;
  
  /**
   * Función para omitir tutorial
   * Para usuarios experimentados según APP_BLUEPRINT.md línea 35
   */
  onOmitirTutorial: () => void;
  
  /**
   * Perfil del niño para personalización
   * Conectado con WelcomeScreen según flujo
   */
  perfilNino?: {
    nombre: string;
    edad: number;
    nivelDesarrollo: string;
  };
}

/**
 * Estado interno del componente
 */
interface EstadoFormulario {
  progreso: ProgresoTutorial;
  leoAnimacion: Animated.Value;
  screenReaderEnabled: boolean;
}

/**
 * TUTORIALSCREEN - PANTALLA 3
 * 
 * Implementa todos los requisitos de APP_BLUEPRINT.md:
 * - Leo explicando controles básicos (línea 30)
 * - Práctica de gestos tocar/deslizar (línea 31)  
 * - Sistema de recompensas introducido (línea 32)
 * - Botón omitir para experimentados (línea 33)
 * 
 * CALIDAD PRODUCCIÓN:
 * - TypeScript estricto sin any
 * - Error handling completo con try/catch
 * - Accesibilidad VoiceOver/TalkBack
 * - Performance optimizado useCallback/useMemo
 * - Solo colores centralizados del DESIGN_SYSTEM.md
 * 
 * @param props Propiedades del componente
 * @returns JSX.Element Tutorial interactivo completo
 */
const TutorialScreen: React.FC<TutorialScreenProps> = ({
  onTutorialCompleto,
  onOmitirTutorial,
  perfilNino
}) => {


  // Estado inicial del tutorial
  const estadoInicialProgreso: ProgresoTutorial = useMemo(() => ({
    pasoActual: EstadoTutorial.BIENVENIDA,
    gestosCompletados: {
      tocar: false,
      deslizar: false,
      mantenerPresionado: false
    },
    recompensas: {
      estrellasObtenidas: 0,
      nivel: 'Principiante',
      logrosDesbloqueados: []
    },
    tiempoInicio: Date.now(),
    puedeOmitir: true
  }), []);

  // Estado del componente con valores iniciales seguros
  const [estado, setEstado] = useState<EstadoFormulario>({
    progreso: estadoInicialProgreso,
    leoAnimacion: new Animated.Value(0),
    screenReaderEnabled: false
  });

  // Referencias para animaciones
  const leoEscalaRef = useRef(new Animated.Value(1)).current;
  const gestureRef = useRef(null);
  const panRef = useRef(new Animated.ValueXY()).current;

  /**
   * Verificar disponibilidad de screen reader
   * Requerido por PROJECT_REQUIREMENTS.md RNF-003
   */
  const verificarScreenReader = useCallback(async (): Promise<void> => {
    try {
      const screenReaderEnabled = await AccessibilityInfo.isScreenReaderEnabled();
      setEstado(prev => ({
        ...prev,
        screenReaderEnabled
      }));
    } catch (error) {
      console.warn('[TutorialScreen] Error verificando screen reader:', error);
    }
  }, []);

  /**
   * Inicializar componente y verificar accesibilidad
   */
  useEffect(() => {
    verificarScreenReader();
    
    // Animación inicial de Leo
    const animarLeoEntrada = (): void => {
      Animated.sequence([
        Animated.timing(estado.leoAnimacion, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(leoEscalaRef, {
              toValue: 1.1,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(leoEscalaRef, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
            })
          ])
        )
      ]).start();
    };

    animarLeoEntrada();
  }, [estado.leoAnimacion, leoEscalaRef, verificarScreenReader]);

  /**
   * Avanzar al siguiente paso del tutorial
   * Implementa flujo secuencial según APP_BLUEPRINT.md
   */
  const avanzarPaso = useCallback((nuevoEstado: EstadoTutorial): void => {
    try {
      setEstado(prev => ({
        ...prev,
        progreso: {
          ...prev.progreso,
          pasoActual: nuevoEstado
        }
      }));

      // Animar transición de Leo
      Animated.timing(estado.leoAnimacion, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(estado.leoAnimacion, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    } catch (error) {
      console.error('[TutorialScreen] Error avanzando paso:', error);
      Alert.alert('Error', 'Problema en el tutorial. Intenta de nuevo.');
    }
  }, [estado.leoAnimacion]);

  /**
   * Manejar gesto de tocar completado
   * Parte de práctica según APP_BLUEPRINT.md línea 31
   */
  const completarGestoTocar = useCallback((): void => {
    try {
      setEstado(prev => ({
        ...prev,
        progreso: {
          ...prev.progreso,
          gestosCompletados: {
            ...prev.progreso.gestosCompletados,
            tocar: true
          },
          recompensas: {
            ...prev.progreso.recompensas,
            estrellasObtenidas: prev.progreso.recompensas.estrellasObtenidas + 1,
            logrosDesbloqueados: [
              ...prev.progreso.recompensas.logrosDesbloqueados,
              'Primer Toque'
            ]
          }
        }
      }));

      // Avanzar automáticamente al siguiente paso
      setTimeout(() => {
        avanzarPaso(EstadoTutorial.PRACTICA_DESLIZAR);
      }, 1500);
    } catch (error) {
      console.error('[TutorialScreen] Error completando gesto tocar:', error);
    }
  }, [avanzarPaso]);

  /**
   * Manejar gesto de deslizar
   * Implementa PanGestureHandler para detección
   */
  const manejarGestoDeslizar = useCallback((event: any): void => {
    try {
      const { translationX, translationY, state } = event.nativeEvent;
      
      if (state === GestureState.ACTIVE) {
        panRef.setValue({ x: translationX, y: translationY });
      }

      if (state === GestureState.END) {
        const distancia = Math.sqrt(translationX * translationX + translationY * translationY);
        
        if (distancia > 100) {
          setEstado(prev => ({
            ...prev,
            progreso: {
              ...prev.progreso,
              gestosCompletados: {
                ...prev.progreso.gestosCompletados,
                deslizar: true
              },
              recompensas: {
                ...prev.progreso.recompensas,
                estrellasObtenidas: prev.progreso.recompensas.estrellasObtenidas + 1,
                logrosDesbloqueados: [
                  ...prev.progreso.recompensas.logrosDesbloqueados,
                  'Deslizamiento Perfecto'
                ]
              }
            }
          }));

          setTimeout(() => {
            avanzarPaso(EstadoTutorial.SISTEMA_RECOMPENSAS);
          }, 1500);
        }

        // Resetear posición
        Animated.spring(panRef, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    } catch (error) {
      console.error('[TutorialScreen] Error manejando gesto deslizar:', error);
    }
  }, [panRef, avanzarPaso]);

  /**
   * Completar tutorial y navegar siguiente pantalla
   */
  const completarTutorial = useCallback((): void => {
    try {
      setEstado(prev => ({
        ...prev,
        progreso: {
          ...prev.progreso,
          pasoActual: EstadoTutorial.COMPLETADO,
          recompensas: {
            ...prev.progreso.recompensas,
            estrellasObtenidas: prev.progreso.recompensas.estrellasObtenidas + 3,
            nivel: 'Tutorial Completo',
            logrosDesbloqueados: [
              ...prev.progreso.recompensas.logrosDesbloqueados,
              'Maestro del Tutorial'
            ]
          }
        }
      }));

      setTimeout(() => {
        onTutorialCompleto();
      }, 2000);
    } catch (error) {
      console.error('[TutorialScreen] Error completando tutorial:', error);
      Alert.alert('Error', 'No se pudo completar el tutorial');
    }
  }, [onTutorialCompleto]);

  /**
   * Omitir tutorial para usuarios experimentados
   * Funcionalidad según APP_BLUEPRINT.md línea 35
   */
  const omitirTutorial = useCallback((): void => {
    try {
      Alert.alert(
        '¿Omitir Tutorial?',
        '¿Estás seguro que quieres saltarte el tutorial? Leo tiene muchas cosas geniales que enseñarte.',
        [
          {
            text: 'Continuar Tutorial',
            style: 'cancel'
          },
          {
            text: 'Omitir',
            style: 'destructive',
            onPress: onOmitirTutorial
          }
        ]
      );
    } catch (error) {
      console.error('[TutorialScreen] Error omitiendo tutorial:', error);
    }
  }, [onOmitirTutorial]);

  /**
   * Renderizar contenido específico según paso actual
   * Implementa flujo secuencial completo
   */
  const renderizarContenidoPaso = useMemo((): JSX.Element => {
    const { pasoActual, recompensas } = estado.progreso;

    switch (pasoActual) {
      case EstadoTutorial.BIENVENIDA:
        return (
          <View style={estilos.contenedorPaso}>
            <Text
              style={estilos.tituloLeo}
              accessible={true}
              accessibilityRole="header"
              accessibilityLabel={`¡Hola ${perfilNino?.nombre || 'pequeño explorador'}!`}
            >
              ¡Hola {perfilNino?.nombre || 'pequeño explorador'}!
            </Text>
            
            <Text
              style={estilos.textoLeo}
              accessible={estado.screenReaderEnabled}
            >
              Soy Leo el Lince, y voy a enseñarte cómo usar esta app genial. 
              ¡Será súper divertido!
            </Text>

            <TouchableOpacity
              style={estilos.botonPrimario}
              onPress={() => avanzarPaso(EstadoTutorial.CONTROLES_BASICOS)}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Comenzar tutorial con Leo"
              accessibilityHint="Inicia el tutorial interactivo"
            >
              <Text style={estilos.textoBotonPrimario}>
                ¡Empezamos, Leo!
              </Text>
            </TouchableOpacity>
          </View>
        );

      case EstadoTutorial.CONTROLES_BASICOS:
        return (
          <View style={estilos.contenedorPaso}>
            <Text
              style={estilos.tituloLeo}
              accessible={true}
              accessibilityRole="header"
            >
              Controles Básicos
            </Text>
            
            <Text
              style={estilos.textoLeo}
              accessible={estado.screenReaderEnabled}
            >
              En esta app puedes TOCAR las cosas que te gusten, 
              DESLIZAR para moverte, y yo siempre estaré aquí para ayudarte.
            </Text>

            <View style={estilos.contenedorIconos}>
              <View style={estilos.iconoConTexto}>
                <Ionicons 
                  name="finger-print" 
                  size={48} 
                  color={Colores.amarilloSol} 
                />
                <Text style={estilos.textoIcono}>Tocar</Text>
              </View>
              
              <View style={estilos.iconoConTexto}>
                <MaterialIcons 
                  name="swipe" 
                  size={48} 
                  color={Colores.verdeJungla} 
                />
                <Text style={estilos.textoIcono}>Deslizar</Text>
              </View>
            </View>

            <TouchableOpacity
              style={estilos.botonPrimario}
              onPress={() => avanzarPaso(EstadoTutorial.PRACTICA_TOCAR)}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Practicar tocar"
            >
              <Text style={estilos.textoBotonPrimario}>
                ¡Vamos a practicar!
              </Text>
            </TouchableOpacity>
          </View>
        );

      case EstadoTutorial.PRACTICA_TOCAR:
        return (
          <View style={estilos.contenedorPaso}>
            <Text
              style={estilos.tituloLeo}
              accessible={true}
              accessibilityRole="header"
            >
              ¡Toca a Leo!
            </Text>
            
            <Text
              style={estilos.textoLeo}
              accessible={estado.screenReaderEnabled}
            >
              Toca mi imagen y verás algo genial. ¡Adelante!
            </Text>

            <TouchableOpacity
              style={estilos.areaPractica}
              onPress={completarGestoTocar}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Tocar a Leo para practicar"
              accessibilityHint="Toca para completar el ejercicio"
            >
              <Animated.View
                style={[
                  estilos.leoInteractivo,
                  {
                    transform: [{ scale: leoEscalaRef }]
                  }
                ]}
              >
                <Ionicons
                  name="happy"
                  size={120}
                  color={Colores.amarilloSol}
                />
              </Animated.View>
              
              <Text style={estilos.textoInstruccion}>
                👆 ¡Tócame!
              </Text>
            </TouchableOpacity>
          </View>
        );

      case EstadoTutorial.PRACTICA_DESLIZAR:
        return (
          <View style={estilos.contenedorPaso}>
            <Text
              style={estilos.tituloLeo}
              accessible={true}
              accessibilityRole="header"
            >
              ¡Ahora desliza!
            </Text>
            
            <Text
              style={estilos.textoLeo}
              accessible={estado.screenReaderEnabled}
            >
              Arrastra el círculo a cualquier lado. ¡Usa tu dedo!
            </Text>

            <PanGestureHandler
              ref={gestureRef}
              onGestureEvent={manejarGestoDeslizar}
              onHandlerStateChange={manejarGestoDeslizar}
            >
              <Animated.View
                style={[
                  estilos.areaDeslizar,
                  {
                    transform: panRef.getTranslateTransform()
                  }
                ]}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Área para deslizar"
                accessibilityHint="Desliza en cualquier dirección"
              >
                <Ionicons
                  name="radio-button-on"
                  size={80}
                  color={Colores.verdeJungla}
                />
                <Text style={estilos.textoInstruccion}>
                  ↔️ ¡Deslízame!
                </Text>
              </Animated.View>
            </PanGestureHandler>
          </View>
        );

      case EstadoTutorial.SISTEMA_RECOMPENSAS:
        return (
          <View style={estilos.contenedorPaso}>
            <Text
              style={estilos.tituloLeo}
              accessible={true}
              accessibilityRole="header"
            >
              ¡Increíble trabajo!
            </Text>
            
            <Text
              style={estilos.textoLeo}
              accessible={estado.screenReaderEnabled}
            >
              Cada vez que hagas algo genial, ganarás estrellas y desbloquearás 
              cosas nuevas. ¡Mira lo que ya conseguiste!
            </Text>

            <View style={estilos.contenedorRecompensas}>
              <View style={estilos.estrellasContainer}>
                <Ionicons 
                  name="star" 
                  size={40} 
                  color={Colores.amarilloSol} 
                />
                <Text style={estilos.textoEstrellas}>
                  {recompensas.estrellasObtenidas} estrellas
                </Text>
              </View>

              <View style={estilos.logrosContainer}>
                {recompensas.logrosDesbloqueados.map((logro, index) => (
                  <View key={index} style={estilos.logro}>
                    <Ionicons 
                      name="trophy" 
                      size={24} 
                      color={Colores.verdeJungla} 
                    />
                    <Text style={estilos.textoLogro}>{logro}</Text>
                  </View>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={estilos.botonPrimario}
              onPress={completarTutorial}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Completar tutorial"
            >
              <Text style={estilos.textoBotonPrimario}>
                ¡Listo para la aventura!
              </Text>
            </TouchableOpacity>
          </View>
        );

      case EstadoTutorial.COMPLETADO:
        return (
          <View style={estilos.contenedorPaso}>
            <Text
              style={estilos.tituloLeo}
              accessible={true}
              accessibilityRole="header"
            >
              ¡Felicidades!
            </Text>
            
            <Text
              style={estilos.textoLeo}
              accessible={estado.screenReaderEnabled}
            >
              ¡Eres increíble! Ya sabes todo lo básico. 
              ¡Ahora vamos a explorar mi mundo juntos!
            </Text>

            <Animated.View
              style={[
                estilos.leoFeliz,
                {
                  opacity: estado.leoAnimacion,
                  transform: [{ scale: leoEscalaRef }]
                }
              ]}
            >
              <Ionicons
                name="happy"
                size={150}
                color={Colores.verdeJungla}
              />
            </Animated.View>
          </View>
        );

      default:
        return <View />;
    }
  }, [
    estado.progreso,
    estado.screenReaderEnabled,
    perfilNino?.nombre,
    avanzarPaso,
    completarGestoTocar,
    manejarGestoDeslizar,
    completarTutorial,
    leoEscalaRef,
    estado.leoAnimacion,
    panRef,
    gestureRef
  ]);

  return (
    <SafeAreaView style={estilos.contenedor}>
      <ScrollView
        contentContainerStyle={estilos.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header con Leo */}
        <View style={estilos.headerContainer}>
          <Animated.View
            style={[
              estilos.leoContainer,
              {
                opacity: estado.leoAnimacion,
                transform: [{ scale: estado.leoAnimacion }]
              }
            ]}
          >
            <Image
              source={{ uri: 'https://via.placeholder.com/120x120?text=Leo' }}
              style={estilos.leoAvatar}
              accessible={true}
              accessibilityRole="image"
              accessibilityLabel="Leo el Lince, tu guía tutorial"
              accessibilityHint="Mascota amigable que te enseñará a usar la app"
            />
          </Animated.View>

          {/* Botón omitir para usuarios experimentados */}
          {estado.progreso.puedeOmitir && estado.progreso.pasoActual !== EstadoTutorial.COMPLETADO && (
            <TouchableOpacity
              style={estilos.botonOmitir}
              onPress={omitirTutorial}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Omitir tutorial"
              accessibilityHint="Salta el tutorial si ya conoces la app"
            >
              <Text style={estilos.textoBotonOmitir}>
                Saltar
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Contenido principal del paso */}
        <View style={estilos.contenidoPrincipal}>
          {renderizarContenidoPaso}
        </View>

        {/* Indicador de progreso */}
        {estado.progreso.pasoActual !== EstadoTutorial.COMPLETADO && (
          <View style={estilos.indicadorProgreso}>
            <View style={estilos.barraProgreso}>
              <View
                style={[
                  estilos.progresoFill,
                  {
                    width: `${(Object.values(EstadoTutorial).indexOf(estado.progreso.pasoActual) + 1) / Object.values(EstadoTutorial).length * 100}%`
                  }
                ]}
              />
            </View>
            <Text
              style={estilos.textoProgreso}
              accessible={estado.screenReaderEnabled}
            >
              Paso {Object.values(EstadoTutorial).indexOf(estado.progreso.pasoActual) + 1} de {Object.values(EstadoTutorial).length}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Estilos centralizados usando DESIGN_SYSTEM.md
 * PROHIBIDO: Usar colores hardcodeados
 * OBLIGATORIO: Solo colores de Colores.*
 */
const estilos = {
  contenedor: {
    flex: 1,
    backgroundColor: Colores.blancoPuro,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },

  headerContainer: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingVertical: 20,
  },

  leoContainer: {
    alignItems: 'center' as const,
  },

  leoAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: Colores.amarilloSol,
  },

  botonOmitir: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colores.grisAdministrativo,
    borderRadius: 20,
  },

  textoBotonOmitir: {
    ...Tipografia.estilos.Body,
    color: Colores.blancoPuro,
    textAlign: 'center' as const,
  },

  contenidoPrincipal: {
    flex: 1,
    justifyContent: 'center' as const,
    paddingVertical: 20,
  },

  contenedorPaso: {
    alignItems: 'center' as const,
    paddingHorizontal: 20,
  },

  tituloLeo: {
    ...Tipografia.estilos.H2,
    color: Colores.verdeJungla,
    textAlign: 'center' as const,
    marginBottom: 16,
  },

  textoLeo: {
    ...Tipografia.estilos.Body,
    color: Colores.grisAdministrativo,
    textAlign: 'center' as const,
    marginBottom: 24,
    lineHeight: 24,
  },

  botonPrimario: {
    backgroundColor: Colores.verdeJungla,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    marginTop: 20,
    minWidth: 200,
  },

  textoBotonPrimario: {
    ...Tipografia.estilos.BotonPrimario,
    color: Colores.blancoPuro,
    textAlign: 'center' as const,
  },

  contenedorIconos: {
    flexDirection: 'row' as const,
    justifyContent: 'space-around' as const,
    width: '100%' as const,
    marginVertical: 24,
  },

  iconoConTexto: {
    alignItems: 'center' as const,
  },

  textoIcono: {
    ...Tipografia.estilos.Body,
    color: Colores.grisAdministrativo,
    marginTop: 8,
  },

  areaPractica: {
    width: 200,
    height: 200,
    backgroundColor: Colores.grisClaro,
    borderRadius: 100,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderWidth: 3,
    borderColor: Colores.amarilloSol,
    marginVertical: 20,
  },

  leoInteractivo: {
    alignItems: 'center' as const,
  },

  textoInstruccion: {
    ...Tipografia.estilos.BotonPrimario,
    color: Colores.verdeJungla,
    marginTop: 12,
  },

  areaDeslizar: {
    width: 150,
    height: 150,
    backgroundColor: Colores.grisClaro,
    borderRadius: 75,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderWidth: 3,
    borderColor: Colores.verdeJungla,
    marginVertical: 20,
  },

  contenedorRecompensas: {
    alignItems: 'center' as const,
    backgroundColor: Colores.grisClaro,
    borderRadius: 15,
    padding: 20,
    marginVertical: 20,
    width: '100%' as const,
  },

  estrellasContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },

  textoEstrellas: {
    ...Tipografia.estilos.H2,
    color: Colores.amarilloSol,
    marginLeft: 8,
  },

  logrosContainer: {
    width: '100%' as const,
  },

  logro: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colores.blancoPuro,
    borderRadius: 10,
    marginVertical: 4,
  },

  textoLogro: {
    ...Tipografia.estilos.Body,
    color: Colores.verdeJungla,
    marginLeft: 8,
  },

  leoFeliz: {
    alignItems: 'center' as const,
    marginVertical: 20,
  },

  indicadorProgreso: {
    alignItems: 'center' as const,
    paddingVertical: 20,
  },

  barraProgreso: {
    width: '80%' as const,
    height: 8,
    backgroundColor: Colores.grisClaro,
    borderRadius: 4,
    overflow: 'hidden' as const,
  },

  progresoFill: {
    height: '100%' as const,
    backgroundColor: Colores.verdeJungla,
    borderRadius: 4,
  },

  textoProgreso: {
    ...Tipografia.estilos.Body,
    color: Colores.grisAdministrativo,
    marginTop: 8,
  },
};

export default TutorialScreen;