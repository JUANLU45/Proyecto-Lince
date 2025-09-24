/**
 * Proyecto Lince - Pantalla 9: Recompensa de Actividad
 * 
 * Propósito: Ofrecer refuerzo positivo calmado y satisfactorio tras completar una actividad.
 * Pantalla de celebración que incluye animación de Leo, mensaje personalizado, recompensa visual,
 * resumen de logros y opciones de navegación.
 * 
 * Especificaciones desde APP_BLUEPRINT.md líneas 101-110:
 * - Animación de celebración de Leo
 * - Mensaje de felicitación personalizado
 * - Recompensa visual (estrella, medalla, pegatina)
 * - Resumen de logros ("¡10 saltos perfectos!")
 * - Botones: "Otra vez" / "Elegir nueva actividad"
 * - [IA] Contenido dinámico basado en rendimiento
 * 
 * @author GitHub Copilot
 * @version 1.0.0
 * @since 2025-09-24
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  Alert,
  BackHandler,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { Colores as colors } from '../constants/colors';
import { Tipografia } from '../constants/typography';

// Alias para acceso fácil a estilos tipográficos
const typography = Tipografia.estilos;

// ====================================================================================
// INTERFACES Y TIPOS
// ====================================================================================

/**
 * Props de navegación para RecompensaActividadScreen
 */
export interface RecompensaActividadScreenProps {
  navigation: any;
  route: {
    params: {
      actividadId: string;
      tiempoSesion: number;
      precision: number;
      logrosObtenidos: LogroActividad[];
      recompensaEspecial?: RecompensaEspecial;
      sugerenciaIA?: SugerenciaRecompensa;
    };
  };
}

/**
 * Tipos de recompensas visuales disponibles
 */
export type TipoRecompensa = 'estrella' | 'medalla' | 'pegatina' | 'trofeo' | 'tesoro';

/**
 * Niveles de celebración basados en rendimiento
 */
export type NivelCelebracion = 'excelente' | 'muy_bien' | 'bien' | 'progreso';

/**
 * Información detallada del logro obtenido
 */
export interface LogroActividad {
  id: string;
  tipo: 'precision' | 'tiempo' | 'creatividad' | 'persistencia' | 'mejora';
  descripcion: string;
  valor: number;
  icono: string;
  colorRecompensa: keyof typeof colors;
}

/**
 * Recompensa especial generada por IA
 */
export interface RecompensaEspecial {
  tipo: TipoRecompensa;
  nombre: string;
  descripcion: string;
  colorPersonalizado: string;
  brilloExtra: boolean;
  sonidoEspecial: string;
}

/**
 * Sugerencia de IA para personalización de recompensa
 */
export interface SugerenciaRecompensa {
  mensajePersonalizado: string;
  destacarLogro: string;
  siguienteObjetivo: string;
  nivelDificultadSugerido: 'mantener' | 'incrementar' | 'reducir';
}

/**
 * Métricas de rendimiento de la sesión
 */
export interface MetricasRendimiento {
  tiempoTotal: number;
  interaccionesCorrectas: number;
  interaccionesIncorrectas: number;
  precision: number;
  tiempoPromedioRespuesta: number;
  rachaMaxima: number;
}

/**
 * Datos de la animación de Leo
 */
export interface DatosAnimacionLeo {
  emocion: 'celebrando' | 'orgulloso' | 'saltando' | 'bailando';
  duracion: number;
  intensidad: 'suave' | 'moderada' | 'energica';
  efectosEspeciales: string[];
}

// ====================================================================================
// COMPONENTE PRINCIPAL
// ====================================================================================

const RecompensaActividadScreen: React.FC<RecompensaActividadScreenProps> = ({
  navigation,
  route
}) => {
  // Parámetros de navegación
  const {
    actividadId,
    tiempoSesion,
    precision,
    logrosObtenidos,
    recompensaEspecial,
    sugerenciaIA
  } = route.params;

  // ====================================================================================
  // ESTADO DEL COMPONENTE
  // ====================================================================================

  // Estado de animaciones
  const [, setAnimacionesCompletas] = useState(false);
  const [, setEfectosVisualesActivos] = useState(false);

  // Estado de audio
  const [sonidoCelebracion, setSonidoCelebracion] = useState<Audio.Sound | null>(null);
  const [musicaFondo, setMusicaFondo] = useState<Audio.Sound | null>(null);
  const [audioHabilitado, setAudioHabilitado] = useState(true);

  // Estado de la pantalla
  const [pantallaCargada, setPantallaCargada] = useState(false);
  const [errorCarga, setErrorCarga] = useState<string | null>(null);
  const [nivelCelebracion, setNivelCelebracion] = useState<NivelCelebracion>('bien');

  // ====================================================================================
  // REFERENCIAS DE ANIMACIÓN
  // ====================================================================================

  const animacionLeo = useRef(new Animated.Value(0)).current;
  const animacionRecompensa = useRef(new Animated.Value(0)).current;
  const animacionConfeti = useRef(new Animated.Value(0)).current;
  const animacionLogros = useRef(new Animated.Value(0)).current;
  const animacionBotones = useRef(new Animated.Value(0)).current;
  const animacionBrillo = useRef(new Animated.Value(0)).current;
  const animacionTexto = useRef(new Animated.Value(0)).current;
  const animacionFondo = useRef(new Animated.Value(0)).current;

  // Dimensiones de pantalla
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // ====================================================================================
  // EFECTOS Y CICLO DE VIDA
  // ====================================================================================

  /**
   * Efecto de inicialización de la pantalla
   */
  useEffect(() => {
    inicializarPantalla();
    return () => {
      limpiarRecursos();
    };
  }, []);

  /**
   * Efecto para manejo del botón de retroceso en Android
   */
  useFocusEffect(
    useCallback(() => {
      const manejarRetroceso = () => {
        mostrarDialogoSalir();
        return true;
      };

      if (Platform.OS === 'android') {
        const subscription = BackHandler.addEventListener('hardwareBackPress', manejarRetroceso);
        return () => subscription.remove();
      }

      return () => {};
    }, [])
  );

  /**
   * Efecto para iniciar animaciones secuenciales
   */
  useEffect(() => {
    if (pantallaCargada && !errorCarga) {
      setTimeout(() => {
        iniciarAnimacionesSecuenciales();
      }, 500);
    }
  }, [pantallaCargada, errorCarga]);

  // ====================================================================================
  // FUNCIONES DE INICIALIZACIÓN
  // ====================================================================================

  /**
   * Inicializa todos los componentes de la pantalla
   */
  const inicializarPantalla = async (): Promise<void> => {
    try {
      // Determinar nivel de celebración basado en rendimiento
      const nivel = determinarNivelCelebracion(precision, tiempoSesion, logrosObtenidos);
      setNivelCelebracion(nivel);

      // Cargar recursos de audio
      await cargarRecursosAudio(nivel);

      // Configurar animaciones iniciales
      configurarAnimacionesIniciales();

      // Marcar como cargada
      setPantallaCargada(true);
    } catch (error) {
      console.error('Error inicializando RecompensaActividadScreen:', error);
      setErrorCarga('No se pudo cargar la pantalla de recompensa');
    }
  };

  /**
   * Determina el nivel de celebración basado en métricas de rendimiento
   */
  const determinarNivelCelebracion = (
    precision: number,
    tiempo: number,
    logros: LogroActividad[]
  ): NivelCelebracion => {
    const tiempoOptimo = 300; // 5 minutos en segundos
    const factorTiempo = Math.min(tiempoOptimo / tiempo, 1);
    const cantidadLogros = logros.length;

    if (precision >= 0.9 && factorTiempo >= 0.8 && cantidadLogros >= 3) {
      return 'excelente';
    } else if (precision >= 0.8 && factorTiempo >= 0.6 && cantidadLogros >= 2) {
      return 'muy_bien';
    } else if (precision >= 0.6 && cantidadLogros >= 1) {
      return 'bien';
    }
    return 'progreso';
  };

  /**
   * Carga los recursos de audio apropiados para el nivel de celebración
   */
  const cargarRecursosAudio = async (nivel: NivelCelebracion): Promise<void> => {
    try {
      if (!audioHabilitado) return;

      // Configurar modo de audio
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      // Cargar sonido de celebración basado en nivel
      const rutasSonido = {
        excelente: require('../../assets/audio/celebration-excellent.mp3'),
        muy_bien: require('../../assets/audio/celebration-great.mp3'),
        bien: require('../../assets/audio/celebration-good.mp3'),
        progreso: require('../../assets/audio/celebration-progress.mp3')
      };

      const { sound: sonido } = await Audio.Sound.createAsync(
        rutasSonido[nivel],
        { shouldPlay: false, volume: 0.7 }
      );
      setSonidoCelebracion(sonido);

      // Cargar música de fondo suave
      const { sound: musica } = await Audio.Sound.createAsync(
        require('../../assets/audio/reward-background.mp3'),
        { 
          shouldPlay: true, 
          isLooping: true, 
          volume: 0.3 
        }
      );
      setMusicaFondo(musica);

    } catch (error) {
      console.warn('Error cargando audio:', error);
      setAudioHabilitado(false);
    }
  };

  /**
   * Configura los valores iniciales de las animaciones
   */
  const configurarAnimacionesIniciales = (): void => {
    // Resetear todas las animaciones
    animacionLeo.setValue(0);
    animacionRecompensa.setValue(0);
    animacionConfeti.setValue(0);
    animacionLogros.setValue(0);
    animacionBotones.setValue(0);
    animacionBrillo.setValue(0);
    animacionTexto.setValue(0);
    animacionFondo.setValue(0);
  };

  // ====================================================================================
  // FUNCIONES DE ANIMACIÓN
  // ====================================================================================

  /**
   * Inicia la secuencia completa de animaciones
   */
  const iniciarAnimacionesSecuenciales = (): void => {
    // Secuencia de animaciones escalonadas
    Animated.sequence([
      // 1. Entrada del fondo y Leo
      Animated.parallel([
        Animated.timing(animacionFondo, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(animacionLeo, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),

      // 2. Reproducir sonido y mostrar confeti
      Animated.timing(animacionConfeti, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),

      // 3. Texto de felicitación
      Animated.spring(animacionTexto, {
        toValue: 1,
        tension: 60,
        friction: 10,
        useNativeDriver: true,
      }),

      // 4. Recompensa visual
      Animated.sequence([
        Animated.spring(animacionRecompensa, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        // Efecto de brillo
        Animated.loop(
          Animated.sequence([
            Animated.timing(animacionBrillo, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(animacionBrillo, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
          { iterations: 3 }
        ),
      ]),

      // 5. Logros obtenidos (uno por uno)
      ...logrosObtenidos.map((_, index) =>
        Animated.timing(animacionLogros, {
          toValue: index + 1,
          duration: 600,
          useNativeDriver: true,
        })
      ),

      // 6. Botones de navegación
      Animated.spring(animacionBotones, {
        toValue: 1,
        tension: 80,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setAnimacionesCompletas(true);
    });

    // Reproducir sonido de celebración al inicio del confeti
    setTimeout(() => {
      reproducirSonidoCelebracion();
      setEfectosVisualesActivos(true);
    }, 1300);
  };

  /**
   * Reproduce el sonido de celebración
   */
  const reproducirSonidoCelebracion = async (): Promise<void> => {
    try {
      if (sonidoCelebracion && audioHabilitado) {
        await sonidoCelebracion.playAsync();
      }
    } catch (error) {
      console.warn('Error reproduciendo sonido de celebración:', error);
    }
  };



  // ====================================================================================
  // FUNCIONES DE NAVEGACIÓN
  // ====================================================================================

  /**
   * Navega para repetir la misma actividad
   */
  const repetirActividad = async (): Promise<void> => {
    try {
      // Detener audio
      await detenerAudio();

      // Animación de salida
      Animated.parallel([
        Animated.timing(animacionFondo, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(animacionBotones, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Navegar a la misma actividad
        navigation.navigate('ActividadPrincipal', { 
          actividadId: actividadId,
          repetir: true 
        });
      });

    } catch (error) {
      console.error('Error al repetir actividad:', error);
      Alert.alert(
        'Error',
        'No se pudo repetir la actividad. ¿Quieres intentarlo de nuevo?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Reintentar', onPress: repetirActividad }
        ]
      );
    }
  };

  /**
   * Navega para elegir una nueva actividad
   */
  const elegirNuevaActividad = async (): Promise<void> => {
    try {
      // Detener audio
      await detenerAudio();

      // Animación de salida
      Animated.sequence([
        Animated.timing(animacionLogros, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(animacionRecompensa, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(animacionTexto, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(animacionLeo, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Navegar al mapa de actividades
        navigation.navigate('VistaIsla', { 
          mostrarSeleccionActividad: true 
        });
      });

    } catch (error) {
      console.error('Error al navegar a nueva actividad:', error);
      Alert.alert(
        'Error',
        'No se pudo cargar la selección de actividades.',
        [
          { text: 'Reintentar', onPress: elegirNuevaActividad },
          { text: 'Volver al inicio', onPress: () => navigation.navigate('MapaMundo') }
        ]
      );
    }
  };

  /**
   * Muestra diálogo de confirmación para salir
   */
  const mostrarDialogoSalir = (): void => {
    Alert.alert(
      '¿Quieres salir?',
      'Leo quiere enseñarte más cosas divertidas. ¿Seguro que quieres irte?',
      [
        {
          text: 'No, quedarme',
          style: 'cancel',
        },
        {
          text: 'Sí, salir',
          onPress: async () => {
            await detenerAudio();
            navigation.navigate('MapaMundo');
          },
        },
      ],
      { cancelable: true }
    );
  };

  // ====================================================================================
  // FUNCIONES UTILITARIAS
  // ====================================================================================

  /**
   * Genera mensaje de felicitación personalizado
   */
  const generarMensajeFelicitacion = (): string => {
    if (sugerenciaIA?.mensajePersonalizado) {
      return sugerenciaIA.mensajePersonalizado;
    }

    const mensajes = {
      excelente: [
        '¡Eres increíble!',
        '¡Lo has hecho genial!',
        '¡Leo está muy orgulloso!'
      ],
      muy_bien: [
        '¡Muy buen trabajo!',
        '¡Fantástico!',
        '¡Sigue así!'
      ],
      bien: [
        '¡Buen trabajo!',
        '¡Lo has hecho bien!',
        '¡Estás mejorando!'
      ],
      progreso: [
        '¡Vas por buen camino!',
        '¡Cada vez mejor!',
        '¡Sigue practicando!'
      ]
    };

    const mensajesNivel = mensajes[nivelCelebracion];
    return mensajesNivel[Math.floor(Math.random() * mensajesNivel.length)] || '¡Buen trabajo!';
  };

  /**
   * Obtiene el color de la recompensa basado en el nivel
   */
  const obtenerColorRecompensa = (): keyof typeof colors => {
    if (recompensaEspecial?.colorPersonalizado) {
      return 'amarilloSol'; // Fallback para colores personalizados
    }

    const coloresNivel = {
      excelente: 'amarilloSol' as keyof typeof colors,
      muy_bien: 'verdeJungla' as keyof typeof colors,
      bien: 'azul' as keyof typeof colors,
      progreso: 'colorCalido' as keyof typeof colors
    };

    return coloresNivel[nivelCelebracion];
  };

  /**
   * Genera resumen de logros
   */
  const generarResumenLogros = (): string => {
    if (logrosObtenidos.length === 0) {
      return '¡Has completado la actividad!';
    }

    const logrosPrincipales = logrosObtenidos.slice(0, 2);
    const descripciones = logrosPrincipales.map(logro => logro.descripcion);
    
    if (descripciones.length === 1) {
      return descripciones[0] || '¡Has completado la actividad!';
    } else if (descripciones.length === 2) {
      return `${descripciones[0]} y ${descripciones[1]}`;
    }

    return descripciones.join(', ');
  };

  /**
   * Formatea el tiempo de sesión para mostrar
   */
  const formatearTiempoSesion = (segundos: number): string => {
    const minutos = Math.floor(segundos / 60);
    const seg = segundos % 60;
    
    if (minutos > 0) {
      return `${minutos}m ${seg}s`;
    }
    return `${seg}s`;
  };

  /**
   * Detiene todos los recursos de audio
   */
  const detenerAudio = async (): Promise<void> => {
    try {
      if (sonidoCelebracion) {
        await sonidoCelebracion.stopAsync();
        await sonidoCelebracion.unloadAsync();
      }
      if (musicaFondo) {
        await musicaFondo.stopAsync();
        await musicaFondo.unloadAsync();
      }
    } catch (error) {
      console.warn('Error deteniendo audio:', error);
    }
  };

  /**
   * Limpia todos los recursos utilizados
   */
  const limpiarRecursos = async (): Promise<void> => {
    try {
      await detenerAudio();
      // Limpiar referencias de animación si es necesario
    } catch (error) {
      console.warn('Error limpiando recursos:', error);
    }
  };

  // ====================================================================================
  // COMPONENTES DE RENDERIZADO
  // ====================================================================================

  /**
   * Renderiza la animación de Leo celebrando
   */
  const renderizarLeo = (): JSX.Element => {
    const escalaLeo = animacionLeo.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.5, 1.2, 1],
    });

    const rotacionLeo = animacionLeo.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <Animated.View
        style={[
          estilos.contenedorLeo,
          {
            transform: [
              { scale: escalaLeo },
              { rotate: rotacionLeo },
            ],
          },
        ]}
      >
        <Image
          source={require('../../assets/characters/leo-celebrating.png')}
          style={estilos.imagenLeo}
          resizeMode="contain"
        />
      </Animated.View>
    );
  };

  /**
   * Renderiza el efecto de confeti
   */
  const renderizarConfeti = (): JSX.Element => {
    const opacidadConfeti = animacionConfeti.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0.7],
    });

    return (
      <Animated.View
        style={[
          estilos.contenedorConfeti,
          { opacity: opacidadConfeti },
        ]}
      >
        {/* Elementos de confeti generados dinámicamente */}
        {Array.from({ length: 20 }).map((_, index) => (
          <Animated.View
            key={index}
            style={[
              estilos.particulaConfeti,
              {
                left: Math.random() * screenWidth,
                backgroundColor: colors[obtenerColorRecompensa()],
                transform: [
                  {
                    translateY: animacionConfeti.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-50, screenHeight + 50],
                    }),
                  },
                ],
              },
            ]}
          />
        ))}
      </Animated.View>
    );
  };

  /**
   * Renderiza el mensaje de felicitación
   */
  const renderizarMensajeFelicitacion = (): JSX.Element => {
    const escalaTexto = animacionTexto.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [0.3, 1.1, 1],
    });

    return (
      <Animated.View
        style={[
          estilos.contenedorMensaje,
          {
            transform: [{ scale: escalaTexto }],
          },
        ]}
      >
        <Text style={[estilos.textoFelicitacion, typography.H2]}>
          {generarMensajeFelicitacion()}
        </Text>
        <Text style={[estilos.textoSecundario, typography.Body]}>
          {generarResumenLogros()}
        </Text>
      </Animated.View>
    );
  };

  /**
   * Renderiza la recompensa visual principal
   */
  const renderizarRecompensa = (): JSX.Element => {
    const escalaRecompensa = animacionRecompensa.interpolate({
      inputRange: [0, 0.7, 1],
      outputRange: [0, 1.3, 1],
    });

    const brilloOpacidad = animacionBrillo.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.3, 1, 0.3],
    });

    return (
      <Animated.View
        style={[
          estilos.contenedorRecompensa,
          {
            transform: [{ scale: escalaRecompensa }],
          },
        ]}
      >
        {/* Efecto de brillo */}
        <Animated.View
          style={[
            estilos.efectoBrillo,
            {
              opacity: brilloOpacidad,
              backgroundColor: colors[obtenerColorRecompensa()],
            },
          ]}
        />
        
        {/* Recompensa visual */}
        <View
          style={[
            estilos.recompensaVisual,
            { backgroundColor: colors[obtenerColorRecompensa()] },
          ]}
        >
          <Text style={[estilos.iconoRecompensa, typography.H2]}>
            {obtenerIconoRecompensa()}
          </Text>
        </View>

        {/* Texto de la recompensa */}
        <Text style={[estilos.textoRecompensa, typography.H2]}>
          {obtenerTextoRecompensa()}
        </Text>
      </Animated.View>
    );
  };

  /**
   * Renderiza la lista de logros obtenidos
   */
  const renderizarLogros = (): JSX.Element => {
    return (
      <View style={estilos.contenedorLogros}>
        {logrosObtenidos.map((logro, index) => {
          const opacidadLogro = animacionLogros.interpolate({
            inputRange: [index, index + 0.5, index + 1],
            outputRange: [0, 0.5, 1],
            extrapolate: 'clamp',
          });

          const escalaLogro = animacionLogros.interpolate({
            inputRange: [index, index + 0.5, index + 1],
            outputRange: [0.5, 1.2, 1],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={logro.id}
              style={[
                estilos.itemLogro,
                {
                  opacity: opacidadLogro,
                  transform: [{ scale: escalaLogro }],
                },
              ]}
            >
              <View
                style={[
                  estilos.iconoLogro,
                  { backgroundColor: colors[logro.colorRecompensa] },
                ]}
              >
                <Text style={[estilos.textoIconoLogro, typography.Body]}>
                  {logro.icono}
                </Text>
              </View>
              <Text style={[estilos.descripcionLogro, typography.Body]}>
                {logro.descripcion}
              </Text>
            </Animated.View>
          );
        })}
      </View>
    );
  };

  /**
   * Renderiza los botones de navegación
   */
  const renderizarBotones = (): JSX.Element => {
    const traslacionBotones = animacionBotones.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0],
    });

    return (
      <Animated.View
        style={[
          estilos.contenedorBotones,
          {
            transform: [{ translateY: traslacionBotones }],
          },
        ]}
      >
        <TouchableOpacity
          style={[estilos.boton, estilos.botonSecundario]}
          onPress={repetirActividad}
          accessibilityLabel="Repetir esta actividad"
          accessibilityHint="Toca para jugar de nuevo a la misma actividad"
          accessibilityRole="button"
        >
          <Text style={[estilos.textoBotonSecundario, typography.BotonPrimario]}>
            Otra vez
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[estilos.boton, estilos.botonPrimario]}
          onPress={elegirNuevaActividad}
          accessibilityLabel="Elegir nueva actividad"
          accessibilityHint="Toca para seleccionar una actividad diferente"
          accessibilityRole="button"
        >
          <Text style={[estilos.textoBotonPrimario, typography.BotonPrimario]}>
            Nueva actividad
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // ====================================================================================
  // FUNCIONES AUXILIARES DE RENDERIZADO
  // ====================================================================================

  /**
   * Obtiene el icono apropiado para la recompensa
   */
  const obtenerIconoRecompensa = (): string => {
    if (recompensaEspecial) {
      const iconos = { estrella: '⭐', medalla: '🏅', pegatina: '✨', trofeo: '🏆', tesoro: '💎' };
      return iconos[recompensaEspecial.tipo] || '⭐';
    }

    const iconosNivel = {
      excelente: '🏆',
      muy_bien: '🌟',
      bien: '⭐',
      progreso: '✨'
    };

    return iconosNivel[nivelCelebracion];
  };

  /**
   * Obtiene el texto descriptivo de la recompensa
   */
  const obtenerTextoRecompensa = (): string => {
    if (recompensaEspecial) {
      return recompensaEspecial.nombre;
    }

    const textosNivel = {
      excelente: '¡Súper Estrella!',
      muy_bien: '¡Gran Estrella!',
      bien: '¡Buena Estrella!',
      progreso: '¡Estrella en Progreso!'
    };

    return textosNivel[nivelCelebracion];
  };

  // ====================================================================================
  // RENDERIZADO PRINCIPAL
  // ====================================================================================

  if (errorCarga) {
    return (
      <SafeAreaView style={estilos.contenedorError}>
        <StatusBar backgroundColor={colors.rojo} barStyle="light-content" />
        <Text style={[estilos.textoError, typography.H2]}>{errorCarga}</Text>
        <TouchableOpacity
          style={estilos.botonReintentar}
          onPress={() => {
            setErrorCarga(null);
            setPantallaCargada(false);
            inicializarPantalla();
          }}
        >
          <Text style={[estilos.textoBotonReintentar, typography.BotonPrimario]}>
            Reintentar
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (!pantallaCargada) {
    return (
      <SafeAreaView style={estilos.contenedorCarga}>
        <StatusBar backgroundColor={colors.azul} barStyle="light-content" />
        <Text style={[estilos.textoCarga, typography.Body]}>
          Leo está preparando tu recompensa...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={estilos.contenedor}>
      <StatusBar backgroundColor={colors.azul} barStyle="light-content" />
      
      {/* Fondo animado */}
      <Animated.View
        style={[
          estilos.fondo,
          {
            opacity: animacionFondo,
          },
        ]}
      />

      <ScrollView
        contentContainerStyle={estilos.contenidoScroll}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Leo celebrando */}
        {renderizarLeo()}

        {/* Efecto de confeti */}
        {renderizarConfeti()}

        {/* Mensaje de felicitación */}
        {renderizarMensajeFelicitacion()}

        {/* Recompensa visual principal */}
        {renderizarRecompensa()}

        {/* Lista de logros obtenidos */}
        {renderizarLogros()}

        {/* Métricas de rendimiento */}
        <View style={estilos.contenedorMetricas}>
          <Text style={[estilos.textoMetrica, typography.Body]}>
            Tiempo: {formatearTiempoSesion(tiempoSesion)}
          </Text>
          <Text style={[estilos.textoMetrica, typography.Body]}>
            Precisión: {Math.round(precision * 100)}%
          </Text>
        </View>

        {/* Sugerencia de IA para próximo objetivo */}
        {sugerenciaIA?.siguienteObjetivo && (
          <View style={estilos.contenedorSugerenciaIA}>
            <Text style={[estilos.tituloSugerencia, typography.H2]}>
              Leo tiene una idea:
            </Text>
            <Text style={[estilos.textoSugerencia, typography.Body]}>
              {sugerenciaIA.siguienteObjetivo}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Botones de navegación */}
      {renderizarBotones()}
    </SafeAreaView>
  );
};

// ====================================================================================
// ESTILOS
// ====================================================================================

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colors.blancoPuro,
  },
  fondo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `${colors.azul}15`,
  },
  contenidoScroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 120,
  },
  contenedorError: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blancoPuro,
    padding: 20,
  },
  textoError: {
    color: colors.rojo,
    textAlign: 'center',
    marginBottom: 20,
  },
  botonReintentar: {
    backgroundColor: colors.azul,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  textoBotonReintentar: {
    color: colors.blancoPuro,
  },
  contenedorCarga: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blancoPuro,
  },
  textoCarga: {
    color: colors.azul,
    textAlign: 'center',
  },
  contenedorLeo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagenLeo: {
    width: 120,
    height: 120,
  },
  contenedorConfeti: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  particulaConfeti: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  contenedorMensaje: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  textoFelicitacion: {
    color: colors.azul,
    textAlign: 'center',
    marginBottom: 10,
  },
  textoSecundario: {
    color: colors.grisAdministrativo,
    textAlign: 'center',
  },
  contenedorRecompensa: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  efectoBrillo: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    opacity: 0.3,
  },
  recompensaVisual: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginBottom: 15,
  },
  iconoRecompensa: {
    fontSize: 50,
  },
  textoRecompensa: {
    color: colors.azul,
    textAlign: 'center',
  },
  contenedorLogros: {
    width: '100%',
    marginBottom: 20,
  },
  itemLogro: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.blancoPuro,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconoLogro: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textoIconoLogro: {
    color: colors.blancoPuro,
    fontWeight: 'bold',
  },
  descripcionLogro: {
    flex: 1,
    color: colors.grisAdministrativo,
  },
  contenedorMetricas: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: `${colors.azul}10`,
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  textoMetrica: {
    color: colors.azul,
    fontWeight: '600',
  },
  contenedorSugerenciaIA: {
    backgroundColor: `${colors.verdeJungla}15`,
    padding: 20,
    borderRadius: 16,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: colors.verdeJungla,
  },
  tituloSugerencia: {
    color: colors.verdeJungla,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  textoSugerencia: {
    color: colors.grisAdministrativo,
  },
  contenedorBotones: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  boton: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    minHeight: 60,
  },
  botonPrimario: {
    backgroundColor: colors.azul,
  },
  botonSecundario: {
    backgroundColor: colors.blancoPuro,
    borderWidth: 2,
    borderColor: colors.azul,
  },
  textoBotonPrimario: {
    color: colors.blancoPuro,
    fontWeight: 'bold',
  },
  textoBotonSecundario: {
    color: colors.azul,
    fontWeight: 'bold',
  },
});

export default RecompensaActividadScreen;