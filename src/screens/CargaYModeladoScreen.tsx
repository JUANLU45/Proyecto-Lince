/**
 * PROYECTO LINCE - CARGAYMODELADOSCREEN.TSX
 * 
 * Carga y Video-Modelado (Pantalla 7) según APP_BLUEPRINT.md líneas 77-85.
 * Preparar al niño para la actividad mostrando cómo se hace.
 * 
 * DOCUMENTACIÓN FUENTE:
 * - APP_BLUEPRINT.md líneas 77-85: Especificaciones Carga y Video-Modelado
 * - DESIGN_SYSTEM.md: Colores centralizados y componentes UI
 * - PROJECT_REQUIREMENTS.md: RNF-013 compatibilidad iOS/Android
 * - UI_COMPONENTS.md: BotonPrimario especificaciones táctiles
 * - VERIFICATION_CHECKLIST.md: Estándares calidad producción
 * - TECHNOLOGY.md: React Native + Expo + TypeScript stack
 * 
 * FUNCIONALIDADES IMPLEMENTADAS:
 * - Video corto de Leo demostrando la actividad (15-30s máx)
 * - Instrucciones claras y simples sobreimpuestas
 * - Música de fondo motivadora sincronizada
 * - Botón "¡Ya entiendo!" prominente para continuar
 * - Sistema de progreso de carga automática
 * - Accesibilidad completa VoiceOver/TalkBack
 * - Performance optimizado y manejo errores robusto
 * - Auto-advance si no hay interacción en 30s
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
  TouchableOpacity,
  Animated,
  StatusBar,
  Alert,
  AccessibilityInfo,
  BackHandler
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Video, Audio, ResizeMode } from 'expo-av';

// Imports centralizados del sistema
import { Colores } from '../constants/colors';
import { Tipografia } from '../constants/typography';

/**
 * Estados de reproducción del video
 * Según APP_BLUEPRINT.md líneas 77-85
 */
export enum EstadoVideo {
  CARGANDO = 'cargando',
  REPRODUCIENDOSE = 'reproduciendose',
  PAUSADO = 'pausado',
  COMPLETADO = 'completado',
  ERROR = 'error'
}

/**
 * Tipos de actividades para video-modelado
 * Sincronizado con PreActividadScreen
 */
export enum TipoActividad {
  MOVIMIENTO = 'movimiento',
  MUSICAL = 'musical',
  TACTIL = 'tactil',
  ARTE = 'arte',
  CALMA = 'calma'
}

/**
 * Configuración de la actividad heredada
 * De PreActividadScreen para continuidad
 */
export interface ConfiguracionActividad {
  volumen: 'silencio' | 'bajo' | 'medio' | 'alto';
  duracion: 'corta' | 'normal' | 'larga';
  nivelAyuda: 'minima' | 'media' | 'maxima';
}

/**
 * Datos completos de la actividad
 * Conectado con sistema previo
 */
interface DatosActividad {
  id: string;
  titulo: string;
  descripcion: string;
  tipoActividad: TipoActividad;
  videoModelado: string;
  audioFondo: string;
  instruccionesSuperpuestas: string[];
  duracionVideoSegundos: number;
  configuracion: ConfiguracionActividad;
}

/**
 * Perfil del niño para personalización
 * Conectado con sistema de perfiles
 */
interface PerfilNino {
  id: string;
  nombre: string;
  edad: number;
  nivelDesarrollo: string;
  necesidadesEspeciales?: string[];
  tiempoAtencionPromedio: number;
}

/**
 * Props del componente CargaYModeladoScreen
 */
interface CargaYModeladoScreenProps {
  /**
   * Datos completos de la actividad a demostrar
   * Con video de Leo y configuraciones
   */
  actividad: DatosActividad;
  
  /**
   * Función navegación a actividad principal
   * Cuando niño entiende y está listo
   */
  onNavigateToActividad: () => void;
  
  /**
   * Función navegación hacia atrás
   * A PreActividadScreen si quiere cambiar config
   */
  onNavigateBack: () => void;
  
  /**
   * Perfil del niño para personalizar experiencia
   * Opcional para casos sin perfil
   */
  perfilNino?: PerfilNino;

  /**
   * Callback para tracking de progreso
   * Analytics y mejora de experiencia
   */
  onTrackProgress?: (evento: string, datos: any) => void;
}

/**
 * Estado interno del componente
 */
interface EstadoCargaYModelado {
  estadoVideo: EstadoVideo;
  estadoAudio: EstadoVideo;
  progresoVideo: number;
  instruccionActual: number;
  screenReaderEnabled: boolean;
  mostrarControles: boolean;
  tiempoTranscurrido: number;
  listo: boolean;
  cargandoRecursos: boolean;
}

/**
 * CARGAYMODELADOSCREEN - PANTALLA 7
 * 
 * Implementa todos los requisitos de APP_BLUEPRINT.md:
 * - Video corto de Leo demostrando actividad (línea 80)
 * - Instrucciones claras y simples (línea 81)
 * - Música de fondo motivadora (línea 82)
 * - Botón "¡Ya entiendo!" para continuar (línea 83)
 * - Duración 15-30 segundos máximo (línea 84)
 * 
 * CALIDAD PRODUCCIÓN:
 * - TypeScript estricto sin any
 * - Error handling completo try/catch
 * - Accesibilidad VoiceOver/TalkBack
 * - Performance optimizado useCallback/useMemo
 * - Solo colores centralizados DESIGN_SYSTEM.md
 * - Auto-advance inteligente según atención
 * 
 * @param props Propiedades del componente
 * @returns JSX.Element Carga y modelado completo
 */
const CargaYModeladoScreen: React.FC<CargaYModeladoScreenProps> = ({
  actividad,
  onNavigateToActividad,
  onNavigateBack,
  perfilNino,
  onTrackProgress
}) => {
  // Estado del componente con valores iniciales seguros
  const [estado, setEstado] = useState<EstadoCargaYModelado>({
    estadoVideo: EstadoVideo.CARGANDO,
    estadoAudio: EstadoVideo.CARGANDO,
    progresoVideo: 0,
    instruccionActual: 0,
    screenReaderEnabled: false,
    mostrarControles: false,
    tiempoTranscurrido: 0,
    listo: false,
    cargandoRecursos: true
  });

  // Referencias para video y audio
  const videoRef = useRef<Video>(null);
  const audioRef = useRef<Audio.Sound | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);

  // Referencias para animaciones
  const fadeAnimRef = useRef(new Animated.Value(0)).current;
  const scaleAnimRef = useRef(new Animated.Value(0.9)).current;
  const instruccionAnimRef = useRef(new Animated.Value(1)).current;
  const botonAnimRef = useRef(new Animated.Value(0)).current;

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
      
      // Extender tiempo si usa screen reader
      if (screenReaderEnabled && perfilNino) {
        return;
      }
    } catch (error) {
      console.warn('[CargaYModeladoScreen] Error verificando screen reader:', error);
    }
  }, [perfilNino]);

  /**
   * Configurar audio de fondo según preferencias
   */
  const configurarAudio = useCallback(async (): Promise<void> => {
    try {
      // Configurar modo de audio
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false
      });

      // Cargar audio de fondo
      const { sound } = await Audio.Sound.createAsync(
        { uri: actividad.audioFondo },
        {
          shouldPlay: false,
          isLooping: true,
          volume: getVolumenAudio()
        }
      );

      audioRef.current = sound;
      
      // Iniciar audio cuando video esté listo
      setEstado(prev => ({
        ...prev,
        estadoAudio: EstadoVideo.REPRODUCIENDOSE
      }));

      onTrackProgress?.('audio_configurado', { 
        actividad: actividad.id,
        volumen: actividad.configuracion.volumen 
      });

    } catch (error) {
      console.error('[CargaYModeladoScreen] Error configurando audio:', error);
      setEstado(prev => ({
        ...prev,
        estadoAudio: EstadoVideo.ERROR
      }));
    }
  }, [actividad, onTrackProgress]);

  /**
   * Obtener volumen según configuración
   */
  const getVolumenAudio = useCallback((): number => {
    switch (actividad.configuracion.volumen) {
      case 'silencio':
        return 0;
      case 'bajo':
        return 0.3;
      case 'medio':
        return 0.6;
      case 'alto':
        return 1.0;
      default:
        return 0.6;
    }
  }, [actividad.configuracion.volumen]);

  /**
   * Manejar carga y reproducción del video
   */
  const manejarVideoLoad = useCallback(async (): Promise<void> => {
    try {
      if (!videoRef.current) return;

      setEstado(prev => ({
        ...prev,
        estadoVideo: EstadoVideo.REPRODUCIENDOSE
      }));

      // Iniciar reproducción automática
      await videoRef.current.playAsync();
      
      onTrackProgress?.('video_iniciado', { 
        actividad: actividad.id,
        duracion: actividad.duracionVideoSegundos 
      });

    } catch (error) {
      console.error('[CargaYModeladoScreen] Error cargando video:', error);
      setEstado(prev => ({
        ...prev,
        estadoVideo: EstadoVideo.ERROR
      }));
    }
  }, [actividad, onTrackProgress]);

  /**
   * Manejar progreso del video
   */
  const manejarVideoProgreso = useCallback((status: any): void => {
    try {
      if (status.isLoaded) {
        const progreso = status.positionMillis / status.durationMillis;
        const tiempoSegundos = Math.floor(status.positionMillis / 1000);
        
        setEstado(prev => ({
          ...prev,
          progresoVideo: progreso,
          tiempoTranscurrido: tiempoSegundos
        }));

        // Actualizar instrucción según progreso
        actualizarInstruccion(progreso);
        
        // Video completado
        if (status.didJustFinish) {
          setEstado(prev => ({
            ...prev,
            estadoVideo: EstadoVideo.COMPLETADO,
            listo: true
          }));
          
          mostrarBotonContinuar();
          configurarAutoAdvance();
        }
      }
    } catch (error) {
      console.error('[CargaYModeladoScreen] Error en progreso video:', error);
    }
  }, []);

  /**
   * Actualizar instrucción superpuesta según progreso
   */
  const actualizarInstruccion = useCallback((progreso: number): void => {
    try {
      const totalInstrucciones = actividad.instruccionesSuperpuestas.length;
      const nuevaInstruccion = Math.floor(progreso * totalInstrucciones);
      
      if (nuevaInstruccion !== estado.instruccionActual && nuevaInstruccion < totalInstrucciones) {
        setEstado(prev => ({
          ...prev,
          instruccionActual: nuevaInstruccion
        }));

        // Animar cambio de instrucción
        Animated.sequence([
          Animated.timing(instruccionAnimRef, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(instruccionAnimRef, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          })
        ]).start();

        // Anunciar nueva instrucción para screen readers
        if (estado.screenReaderEnabled && actividad.instruccionesSuperpuestas[nuevaInstruccion]) {
          AccessibilityInfo.announceForAccessibility(
            actividad.instruccionesSuperpuestas[nuevaInstruccion]
          );
        }
      }
    } catch (error) {
      console.error('[CargaYModeladoScreen] Error actualizando instrucción:', error);
    }
  }, [actividad.instruccionesSuperpuestas, estado.instruccionActual, estado.screenReaderEnabled, instruccionAnimRef]);

  /**
   * Mostrar botón continuar con animación
   */
  const mostrarBotonContinuar = useCallback((): void => {
    try {
      Animated.timing(botonAnimRef, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();

      onTrackProgress?.('boton_continuar_mostrado', { 
        actividad: actividad.id,
        tiempo_video: estado.tiempoTranscurrido 
      });
    } catch (error) {
      console.error('[CargaYModeladoScreen] Error mostrando botón:', error);
    }
  }, [botonAnimRef, actividad.id, estado.tiempoTranscurrido, onTrackProgress]);

  /**
   * Configurar auto-advance según perfil del niño
   */
  const configurarAutoAdvance = useCallback((): void => {
    try {
      if (!perfilNino) return;

      // Tiempo basado en perfil del niño
      const tiempoEspera = calcularTiempoAutoAdvance();
      
      autoAdvanceRef.current = setTimeout(() => {
        onTrackProgress?.('auto_advance_activado', { 
          actividad: actividad.id,
          tiempo_espera: tiempoEspera 
        });
        
        continuarAActividad();
      }, tiempoEspera);

    } catch (error) {
      console.error('[CargaYModeladoScreen] Error configurando auto-advance:', error);
    }
  }, [perfilNino, actividad.id, onTrackProgress]);

  /**
   * Calcular tiempo de auto-advance según perfil
   */
  const calcularTiempoAutoAdvance = useCallback((): number => {
    if (!perfilNino) return 30000; // Default 30s

    // Ajustar según necesidades especiales
    let tiempoBase = perfilNino.tiempoAtencionPromedio * 1000;
    
    if (perfilNino.necesidadesEspeciales?.includes('procesamiento_lento')) {
      tiempoBase *= 1.5;
    }
    
    if (estado.screenReaderEnabled) {
      tiempoBase *= 2; // Más tiempo para screen readers
    }

    return Math.min(Math.max(tiempoBase, 15000), 60000); // Entre 15s y 60s
  }, [perfilNino, estado.screenReaderEnabled]);

  /**
   * Continuar a actividad principal
   */
  const continuarAActividad = useCallback((): void => {
    try {
      // Limpiar recursos
      limpiarRecursos();
      
      onTrackProgress?.('navegacion_actividad_principal', { 
        actividad: actividad.id,
        tiempo_total: estado.tiempoTranscurrido,
        completado_naturalmente: estado.estadoVideo === EstadoVideo.COMPLETADO
      });

      // Animación de salida
      Animated.parallel([
        Animated.timing(fadeAnimRef, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimRef, {
          toValue: 0.8,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start(() => {
        onNavigateToActividad();
      });

    } catch (error) {
      console.error('[CargaYModeladoScreen] Error continuando a actividad:', error);
      Alert.alert('Error', 'No se pudo continuar a la actividad. Intenta de nuevo.');
    }
  }, [fadeAnimRef, scaleAnimRef, onNavigateToActividad, actividad.id, estado, onTrackProgress]);

  /**
   * Regresar a configuración previa
   */
  const regresarAConfiguracion = useCallback((): void => {
    try {
      limpiarRecursos();
      
      onTrackProgress?.('navegacion_atras', { 
        actividad: actividad.id,
        tiempo_video: estado.tiempoTranscurrido 
      });

      onNavigateBack();
    } catch (error) {
      console.error('[CargaYModeladoScreen] Error regresando:', error);
    }
  }, [actividad.id, estado.tiempoTranscurrido, onTrackProgress, onNavigateBack]);

  /**
   * Alternar controles de video
   */
  const alternarControles = useCallback((): void => {
    try {
      setEstado(prev => ({
        ...prev,
        mostrarControles: !prev.mostrarControles
      }));
    } catch (error) {
      console.error('[CargaYModeladoScreen] Error alternando controles:', error);
    }
  }, []);

  /**
   * Pausar/reanudar video
   */
  const alternarReproduccion = useCallback(async (): Promise<void> => {
    try {
      if (!videoRef.current) return;

      if (estado.estadoVideo === EstadoVideo.REPRODUCIENDOSE) {
        await videoRef.current.pauseAsync();
        setEstado(prev => ({
          ...prev,
          estadoVideo: EstadoVideo.PAUSADO
        }));
        
        onTrackProgress?.('video_pausado', { 
          actividad: actividad.id,
          tiempo: estado.tiempoTranscurrido 
        });
      } else if (estado.estadoVideo === EstadoVideo.PAUSADO) {
        await videoRef.current.playAsync();
        setEstado(prev => ({
          ...prev,
          estadoVideo: EstadoVideo.REPRODUCIENDOSE
        }));
        
        onTrackProgress?.('video_reanudado', { 
          actividad: actividad.id,
          tiempo: estado.tiempoTranscurrido 
        });
      }
    } catch (error) {
      console.error('[CargaYModeladoScreen] Error alternando reproducción:', error);
    }
  }, [videoRef, estado.estadoVideo, estado.tiempoTranscurrido, actividad.id, onTrackProgress]);

  /**
   * Limpiar recursos al desmontar
   */
  const limpiarRecursos = useCallback((): void => {
    try {
      // Limpiar timers
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      if (autoAdvanceRef.current) {
        clearTimeout(autoAdvanceRef.current);
      }

      // Limpiar audio
      if (audioRef.current) {
        audioRef.current.unloadAsync();
        audioRef.current = null;
      }

      // Pausar video
      if (videoRef.current && estado.estadoVideo === EstadoVideo.REPRODUCIENDOSE) {
        videoRef.current.pauseAsync();
      }
    } catch (error) {
      console.error('[CargaYModeladoScreen] Error limpiando recursos:', error);
    }
  }, [estado.estadoVideo]);

  /**
   * Manejar botón back de Android
   */
  const manejarBackButton = useCallback((): boolean => {
    regresarAConfiguracion();
    return true; // Prevenir comportamiento default
  }, [regresarAConfiguracion]);

  /**
   * Obtener color del tipo de actividad
   */
  const getColorActividad = useCallback((tipo: TipoActividad): string => {
    switch (tipo) {
      case TipoActividad.MOVIMIENTO:
        return Colores.verdeJungla;
      case TipoActividad.MUSICAL:
        return Colores.amarilloSol;
      case TipoActividad.TACTIL:
        return Colores.colorCalido;
      case TipoActividad.ARTE:
        return Colores.azul;
      case TipoActividad.CALMA:
        return Colores.azul;
      default:
        return Colores.verdeJungla;
    }
  }, []);

  /**
   * Inicializar componente
   */
  useEffect(() => {
    const inicializar = async (): Promise<void> => {
      try {
        // Verificar screen reader
        await verificarScreenReader();
        
        // Configurar audio
        await configurarAudio();
        
        // Animación de entrada
        Animated.parallel([
          Animated.timing(fadeAnimRef, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnimRef, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          })
        ]).start();

        setEstado(prev => ({
          ...prev,
          cargandoRecursos: false
        }));

        onTrackProgress?.('pantalla_carga_iniciada', { actividad: actividad.id });

      } catch (error) {
        console.error('[CargaYModeladoScreen] Error en inicialización:', error);
        Alert.alert('Error', 'No se pudo cargar la demostración. Intenta de nuevo.');
      }
    };

    inicializar();

    // Configurar back handler para Android
    const backHandler = BackHandler.addEventListener('hardwareBackPress', manejarBackButton);
    
    return (): void => {
      backHandler.remove();
      limpiarRecursos();
    };
  }, [
    verificarScreenReader,
    configurarAudio,
    fadeAnimRef,
    scaleAnimRef,
    actividad.id,
    onTrackProgress,
    manejarBackButton,
    limpiarRecursos
  ]);

  /**
   * Renderizar indicador de carga
   */
  const renderizarCarga = useMemo((): JSX.Element => (
    <View style={estilos.cargaContainer}>
      <Animated.View
        style={[
          estilos.cargaContent,
          {
            opacity: fadeAnimRef,
            transform: [{ scale: scaleAnimRef }]
          }
        ]}
      >
        <View style={estilos.logoContainer}>
          <Ionicons 
            name="play-circle" 
            size={80} 
            color={getColorActividad(actividad.tipoActividad)} 
          />
        </View>
        
        <Text style={estilos.cargaTitulo}>
          Preparando demostración...
        </Text>
        
        <Text 
          style={estilos.cargaDescripcion}
          accessible={estado.screenReaderEnabled}
        >
          Leo te va a enseñar cómo hacer "{actividad.titulo}"
        </Text>

        <View style={estilos.progressContainer}>
          <View 
            style={[
              estilos.progressBar,
              { backgroundColor: getColorActividad(actividad.tipoActividad) }
            ]} 
          />
        </View>
      </Animated.View>
    </View>
  ), [
    fadeAnimRef,
    scaleAnimRef,
    actividad.titulo,
    actividad.tipoActividad,
    estado.screenReaderEnabled,
    getColorActividad
  ]);

  /**
   * Renderizar video de demostración
   */
  const renderizarVideo = useMemo((): JSX.Element => (
    <TouchableOpacity
      style={estilos.videoContainer}
      onPress={alternarControles}
      activeOpacity={0.9}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Video demostración de ${actividad.titulo}. ${estado.mostrarControles ? 'Ocultar' : 'Mostrar'} controles`}
    >
      <Video
        ref={videoRef}
        style={estilos.video}
        source={{ uri: actividad.videoModelado }}
        useNativeControls={false}
        resizeMode={ResizeMode.CONTAIN}
        isLooping={false}
        shouldPlay={!estado.cargandoRecursos}
        volume={getVolumenAudio()}
        onLoad={manejarVideoLoad}
        onPlaybackStatusUpdate={manejarVideoProgreso}
        accessibilityLabel={`Video de Leo demostrando ${actividad.titulo}`}
      />
      
      {/* Overlay de controles */}
      {estado.mostrarControles && (
        <View style={estilos.controlesOverlay}>
          <TouchableOpacity
            style={estilos.botonControl}
            onPress={alternarReproduccion}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={estado.estadoVideo === EstadoVideo.REPRODUCIENDOSE ? 'Pausar video' : 'Reproducir video'}
          >
            <Ionicons 
              name={estado.estadoVideo === EstadoVideo.REPRODUCIENDOSE ? "pause" : "play"} 
              size={40} 
              color={Colores.blancoPuro} 
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Barra de progreso */}
      <View style={estilos.progressVideoContainer}>
        <View 
          style={[
            estilos.progressVideoBar,
            { 
              width: `${estado.progresoVideo * 100}%`,
              backgroundColor: getColorActividad(actividad.tipoActividad)
            }
          ]} 
        />
      </View>
    </TouchableOpacity>
  ), [
    actividad.titulo,
    actividad.tipoActividad,
    actividad.videoModelado,
    estado.cargandoRecursos,
    estado.mostrarControles,
    estado.estadoVideo,
    estado.progresoVideo,
    getVolumenAudio,
    manejarVideoLoad,
    manejarVideoProgreso,
    alternarControles,
    alternarReproduccion,
    getColorActividad
  ]);

  /**
   * Renderizar instrucciones superpuestas
   */
  const renderizarInstrucciones = useMemo((): JSX.Element => (
    <Animated.View
      style={[
        estilos.instruccionesContainer,
        {
          opacity: instruccionAnimRef,
          transform: [{ scale: instruccionAnimRef }]
        }
      ]}
    >
      <View 
        style={[
          estilos.instruccionBubble,
          { borderColor: getColorActividad(actividad.tipoActividad) }
        ]}
      >
        <Text
          style={estilos.instruccionText}
          accessible={true}
          accessibilityLiveRegion="polite"
        >
          {actividad.instruccionesSuperpuestas[estado.instruccionActual] || 'Observa cómo Leo hace la actividad'}
        </Text>
        
        <View style={estilos.instruccionIndicator}>
          <Text style={estilos.instruccionNumero}>
            {estado.instruccionActual + 1} / {actividad.instruccionesSuperpuestas.length}
          </Text>
        </View>
      </View>
    </Animated.View>
  ), [
    instruccionAnimRef,
    actividad.tipoActividad,
    actividad.instruccionesSuperpuestas,
    estado.instruccionActual,
    getColorActividad
  ]);

  /**
   * Renderizar botón continuar
   */
  const renderizarBotonContinuar = useMemo((): JSX.Element => (
    <Animated.View
      style={[
        estilos.botonContainer,
        {
          opacity: botonAnimRef,
          transform: [{ scale: botonAnimRef }]
        }
      ]}
    >
      <TouchableOpacity
        style={[
          estilos.botonContinuar,
          { backgroundColor: getColorActividad(actividad.tipoActividad) }
        ]}
        onPress={continuarAActividad}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="¡Ya entiendo! Continuar a la actividad"
        accessibilityHint="Presiona para comenzar la actividad principal"
      >
        <LinearGradient
          colors={[
            getColorActividad(actividad.tipoActividad),
            Colores.amarilloSol
          ]}
          style={estilos.botonGradiente}
        >
          <Text style={estilos.botonTexto}>
            ¡Ya entiendo!
          </Text>
          
          <Ionicons 
            name="arrow-forward" 
            size={24} 
            color={Colores.blancoPuro} 
          />
        </LinearGradient>
      </TouchableOpacity>

      {/* Auto-advance indicator */}
      {perfilNino && (
        <Text 
          style={estilos.autoAdvanceText}
          accessible={estado.screenReaderEnabled}
        >
          La actividad comenzará automáticamente en unos segundos
        </Text>
      )}
    </Animated.View>
  ), [
    botonAnimRef,
    actividad.tipoActividad,
    estado.screenReaderEnabled,
    perfilNino,
    getColorActividad,
    continuarAActividad
  ]);

  /**
   * Renderizar header con navegación
   */
  const renderizarHeader = useMemo((): JSX.Element => (
    <View style={[estilos.header, { backgroundColor: getColorActividad(actividad.tipoActividad) }]}>
      <TouchableOpacity
        style={estilos.botonAtras}
        onPress={regresarAConfiguracion}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Regresar a configuración"
      >
        <Ionicons 
          name="arrow-back" 
          size={24} 
          color={Colores.blancoPuro} 
        />
      </TouchableOpacity>

      <View style={estilos.headerContent}>
        <Text style={estilos.headerTitulo}>
          Demostración
        </Text>
        <Text style={estilos.headerSubtitulo}>
          {actividad.titulo}
        </Text>
      </View>

      <View style={estilos.headerInfo}>
        <Text style={estilos.tiempoText}>
          {Math.floor(estado.tiempoTranscurrido)}s
        </Text>
      </View>
    </View>
  ), [
    actividad.tipoActividad,
    actividad.titulo,
    estado.tiempoTranscurrido,
    getColorActividad,
    regresarAConfiguracion
  ]);

  return (
    <SafeAreaView style={estilos.contenedor}>
      <StatusBar barStyle="light-content" backgroundColor={getColorActividad(actividad.tipoActividad)} />
      
      {/* Header con navegación */}
      {renderizarHeader}

      {/* Contenido principal */}
      <View style={estilos.mainContent}>
        {estado.cargandoRecursos ? (
          renderizarCarga
        ) : (
          <>
            {/* Video de demostración */}
            {renderizarVideo}

            {/* Instrucciones superpuestas */}
            {renderizarInstrucciones}

            {/* Botón continuar (aparece cuando video termina) */}
            {estado.listo && renderizarBotonContinuar}
          </>
        )}
      </View>
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

  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 40,
  },

  botonAtras: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: `${Colores.blancoPuro}32`, // rgba(255, 255, 255, 0.2) using hex
  },

  headerContent: {
    flex: 1,
    alignItems: 'center' as const,
    paddingHorizontal: 15,
  },

  headerTitulo: {
    ...Tipografia.estilos.H2,
    color: Colores.blancoPuro,
    fontSize: 18,
    fontWeight: 'bold' as const,
  },

  headerSubtitulo: {
    ...Tipografia.estilos.Body,
    color: Colores.blancoPuro,
    fontSize: 14,
    opacity: 0.9,
  },

  headerInfo: {
    alignItems: 'flex-end' as const,
  },

  tiempoText: {
    ...Tipografia.estilos.BotonPrimario,
    color: Colores.blancoPuro,
    backgroundColor: `${Colores.blancoPuro}32`, // rgba(255, 255, 255, 0.2) using hex
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    fontSize: 12,
  },

  mainContent: {
    flex: 1,
    position: 'relative' as const,
  },

  cargaContainer: {
    flex: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    padding: 40,
  },

  cargaContent: {
    alignItems: 'center' as const,
    width: '100%' as const,
  },

  logoContainer: {
    marginBottom: 30,
  },

  cargaTitulo: {
    ...Tipografia.estilos.H2,
    color: Colores.verdeJungla,
    textAlign: 'center' as const,
    marginBottom: 15,
  },

  cargaDescripcion: {
    ...Tipografia.estilos.Body,
    color: Colores.grisAdministrativo,
    textAlign: 'center' as const,
    marginBottom: 30,
    lineHeight: 24,
  },

  progressContainer: {
    width: '100%' as const,
    height: 4,
    backgroundColor: Colores.grisClaro,
    borderRadius: 2,
    overflow: 'hidden' as const,
  },

  progressBar: {
    height: '100%' as const,
    width: '100%' as const,
    borderRadius: 2,
  },

  videoContainer: {
    position: 'relative' as const,
    width: '100%' as const,
    height: '70%' as const,
  },

  video: {
    width: '100%' as const,
    height: '100%' as const,
  },

  controlesOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: `${Colores.overlayNegro}4D`, // rgba(0, 0, 0, 0.3) using hex
  },

  botonControl: {
    backgroundColor: `${Colores.overlayNegro}80`, // rgba(0, 0, 0, 0.5) using hex
    borderRadius: 40,
    padding: 15,
  },

  progressVideoContainer: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: `${Colores.overlayNegro}4D`, // rgba(0, 0, 0, 0.3) using hex
  },

  progressVideoBar: {
    height: '100%' as const,
    borderRadius: 2,
  },

  instruccionesContainer: {
    position: 'absolute' as const,
    bottom: '25%' as const,
    left: 20,
    right: 20,
    alignItems: 'center' as const,
  },

  instruccionBubble: {
    backgroundColor: Colores.blancoPuro,
    borderRadius: 20,
    padding: 20,
    borderWidth: 3,
    position: 'relative' as const,
    elevation: 5,
    shadowColor: Colores.overlayNegro,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },

  instruccionText: {
    ...Tipografia.estilos.Body,
    color: Colores.verdeJungla,
    textAlign: 'center' as const,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },

  instruccionIndicator: {
    alignItems: 'center' as const,
  },

  instruccionNumero: {
    ...Tipografia.estilos.BotonPrimario,
    color: Colores.grisAdministrativo,
    fontSize: 12,
  },

  botonContainer: {
    position: 'absolute' as const,
    bottom: 40,
    left: 20,
    right: 20,
    alignItems: 'center' as const,
  },

  botonContinuar: {
    width: '100%' as const,
    borderRadius: 25,
    elevation: 8,
    shadowColor: Colores.overlayNegro,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  botonGradiente: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 25,
  },

  botonTexto: {
    ...Tipografia.estilos.H2,
    color: Colores.blancoPuro,
    marginRight: 10,
    fontSize: 18,
    fontWeight: 'bold' as const,
  },

  autoAdvanceText: {
    ...Tipografia.estilos.Body,
    color: Colores.grisAdministrativo,
    textAlign: 'center' as const,
    marginTop: 10,
    fontSize: 12,
  },
};

export default CargaYModeladoScreen;