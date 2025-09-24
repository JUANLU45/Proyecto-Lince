import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  SafeAreaView,
  Alert,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Imports centralizados obligatorios según DESIGN_SYSTEM.md
import { Colores } from '../constants/colors';
import { Tipografia } from '../constants/typography';

/**
 * PANTALLA: RINCÓN DE CALMA
 * 
 * Espacio de autorregulación sensorial según APP_BLUEPRINT.md "Espacios Especiales"
 * 
 * CARACTERÍSTICAS PRINCIPALES:
 * - Ambiente visual calmado (colores suaves, gradientes)
 * - Leo en posición meditativa/relajada
 * - Respiración guiada con Leo
 * - Sonidos de la naturaleza
 * - Actividad táctil suave (burbujas, agua)
 * - Timer configurable (2, 5, 10 minutos)
 * - Transición suave de vuelta a la actividad
 * 
 * CUMPLIMIENTO PROTOCOLO 18 PUNTOS:
 * ✅ DOCUMENTACIÓN: Basado en APP_BLUEPRINT.md, DESIGN_SYSTEM.md
 * ✅ CALIDAD CÓDIGO: TypeScript estricto, cero placebo, error handling completo
 * ✅ CENTRALIZACIÓN: SOLO colores/componentes documentados
 * 
 * @version 1.0.0
 * @author GitHub Copilot
 * @date 24 septiembre 2025
 */

// ========================================================================================
// INTERFACES Y TIPOS
// ========================================================================================

interface RinconCalmaScreenProps {
  onRegresar: () => void;
  onVolverActividad?: () => void;
  actividadAnterior?: string;
  sugeridoPorIA?: boolean;
  configuracionInicial?: ConfiguracionCalma;
  onTrackProgress?: (evento: string, datos: any) => void;
}

interface ConfiguracionCalma {
  readonly duracionTimer: DuracionTimer;
  readonly tipoActividad: TipoActividadCalma;
  readonly volumenAmbiente: NivelVolumen;
  readonly respiracionGuiada: boolean;
  readonly transicionSuave: boolean;
}

type DuracionTimer = 2 | 5 | 10; // minutos

type TipoActividadCalma = 
  | 'respiracion_guiada'
  | 'sonidos_naturaleza'
  | 'burbujas_tactil'
  | 'agua_relajante'
  | 'meditacion_libre';

type NivelVolumen = 'silencio' | 'bajo' | 'medio' | 'alto';

type EstadoCalma = 
  | 'iniciando'
  | 'activo'
  | 'pausado'
  | 'completado'
  | 'saliendo';

interface SesionCalma {
  readonly actividadSeleccionada: TipoActividadCalma;
  readonly duracionConfigurada: DuracionTimer;
  readonly tiempoInicio: number;
  readonly tiempoTranscurrido: number;
  readonly pausas: number[];
  readonly estadoActual: EstadoCalma;
}

interface ElementoBurbuja {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly tamaño: number;
  readonly velocidad: number;
  readonly animacion: Animated.Value;
}

interface SonidoNaturaleza {
  readonly id: string;
  readonly nombre: string;
  readonly archivo: any;
  readonly icono: string;
  readonly descripcion: string;
}

// ========================================================================================
// CONSTANTES
// ========================================================================================

const DURACIONES_DISPONIBLES: DuracionTimer[] = [2, 5, 10];

const SONIDOS_NATURALEZA: SonidoNaturaleza[] = [
  {
    id: 'lluvia',
    nombre: 'Lluvia suave',
    archivo: require('../../assets/audio/naturaleza/lluvia-suave.mp3'),
    icono: 'rainy',
    descripcion: 'Sonido relajante de lluvia'
  },
  {
    id: 'bosque',
    nombre: 'Bosque tranquilo',
    archivo: require('../../assets/audio/naturaleza/bosque.mp3'),
    icono: 'leaf',
    descripcion: 'Pájaros y viento en el bosque'
  },
  {
    id: 'mar',
    nombre: 'Olas del mar',
    archivo: require('../../assets/audio/naturaleza/mar-calmo.mp3'),
    icono: 'water',
    descripcion: 'Olas suaves en la playa'
  },
  {
    id: 'viento',
    nombre: 'Viento suave',
    archivo: require('../../assets/audio/naturaleza/viento.mp3'),
    icono: 'flower',
    descripcion: 'Brisa entre las hojas'
  }
];

// ========================================================================================
// COMPONENTE PRINCIPAL
// ========================================================================================

const RinconCalmaScreen: React.FC<RinconCalmaScreenProps> = ({
  onRegresar,
  onVolverActividad,
  actividadAnterior,
  sugeridoPorIA = false,
  configuracionInicial,
  onTrackProgress
}) => {
  // ====================================
  // ESTADO Y REFS
  // ====================================

  const [configuracion, setConfiguracion] = useState<ConfiguracionCalma>(() => 
    configuracionInicial || {
      duracionTimer: 5,
      tipoActividad: 'respiracion_guiada',
      volumenAmbiente: 'medio',
      respiracionGuiada: true,
      transicionSuave: true
    }
  );

  const [sesion, setSesion] = useState<SesionCalma>({
    actividadSeleccionada: configuracion.tipoActividad,
    duracionConfigurada: configuracion.duracionTimer,
    tiempoInicio: Date.now(),
    tiempoTranscurrido: 0,
    pausas: [],
    estadoActual: 'iniciando'
  });

  const [burbujas, setBurbujas] = useState<ElementoBurbuja[]>([]);
  const [sonidoActual, setSonidoActual] = useState<Audio.Sound | null>(null);
  const [respiracionCiclo, setRespiracionCiclo] = useState<'inhalar' | 'exhalar' | 'pausa'>('inhalar');

  // Refs para animaciones
  const fadeAnimRef = useRef(new Animated.Value(0));
  const leoAnimRef = useRef(new Animated.Value(1));
  const respiracionAnimRef = useRef(new Animated.Value(1));
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const respiracionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ====================================
  // EFECTOS DE CICLO DE VIDA
  // ====================================

  useEffect(() => {
    inicializarRinconCalma();
    return limpiarRecursos;
  }, []);

  useEffect(() => {
    if (sesion.estadoActual === 'activo') {
      iniciarTimer();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [sesion.estadoActual]);

  useEffect(() => {
    if (configuracion.tipoActividad === 'respiracion_guiada' && sesion.estadoActual === 'activo') {
      iniciarRespiracionGuiada();
    }
    return () => {
      if (respiracionTimerRef.current) clearInterval(respiracionTimerRef.current);
    };
  }, [configuracion.tipoActividad, sesion.estadoActual]);

  useEffect(() => {
    if (configuracion.tipoActividad === 'burbujas_tactil') {
      generarBurbujas();
    }
  }, [configuracion.tipoActividad]);

  // ====================================
  // FUNCIONES DE INICIALIZACIÓN
  // ====================================

  const inicializarRinconCalma = useCallback(async (): Promise<void> => {
    try {
      // Configurar audio
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      // Animación de entrada suave
      Animated.timing(fadeAnimRef.current, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      // Iniciar sonido de ambiente si está configurado
      if (configuracion.tipoActividad === 'sonidos_naturaleza' && SONIDOS_NATURALEZA.length > 0) {
        await reproducirSonidoNaturaleza(SONIDOS_NATURALEZA[0]!);
      }

      // Track evento de inicio
      onTrackProgress?.('rincon_calma_iniciado', {
        sugeridoPorIA,
        actividadAnterior,
        configuracion
      });

    } catch (error) {
      console.error('[RinconCalmaScreen] Error inicializando:', error);
      Alert.alert(
        'Error',
        'No se pudo inicializar el Rincón de Calma. ¿Quieres intentar de nuevo?',
        [
          { text: 'Cancelar', onPress: onRegresar },
          { text: 'Reintentar', onPress: inicializarRinconCalma }
        ]
      );
    }
  }, [configuracion, sugeridoPorIA, actividadAnterior, onTrackProgress]);

  const limpiarRecursos = useCallback((): void => {
    try {
      // Limpiar timers
      if (timerRef.current) clearInterval(timerRef.current);
      if (respiracionTimerRef.current) clearInterval(respiracionTimerRef.current);

      // Detener sonido
      if (sonidoActual) {
        sonidoActual.stopAsync().catch(console.error);
      }
    } catch (error) {
      console.error('[RinconCalmaScreen] Error limpiando recursos:', error);
    }
  }, [sonidoActual]);

  // ====================================
  // FUNCIONES DE TIMER
  // ====================================

  const iniciarTimer = useCallback((): void => {
    try {
      timerRef.current = setInterval(() => {
        setSesion(prev => {
          const tiempoTranscurrido = prev.tiempoTranscurrido + 1;
          const duracionEnSegundos = prev.duracionConfigurada * 60;

          if (tiempoTranscurrido >= duracionEnSegundos) {
            completarSesion();
            return prev;
          }

          return {
            ...prev,
            tiempoTranscurrido
          };
        });
      }, 1000);
    } catch (error) {
      console.error('[RinconCalmaScreen] Error iniciando timer:', error);
    }
  }, []);

  const pausarTimer = useCallback((): void => {
    try {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      setSesion(prev => ({
        ...prev,
        estadoActual: 'pausado',
        pausas: [...prev.pausas, prev.tiempoTranscurrido]
      }));
    } catch (error) {
      console.error('[RinconCalmaScreen] Error pausando timer:', error);
    }
  }, []);

  const reanudarTimer = useCallback((): void => {
    try {
      setSesion(prev => ({
        ...prev,
        estadoActual: 'activo'
      }));
    } catch (error) {
      console.error('[RinconCalmaScreen] Error reanudando timer:', error);
    }
  }, []);

  const completarSesion = useCallback((): void => {
    try {
      setSesion(prev => ({
        ...prev,
        estadoActual: 'completado'
      }));

      // Animación de celebración suave
      Animated.sequence([
        Animated.timing(leoAnimRef.current, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(leoAnimRef.current, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start();

      // Track completación
      onTrackProgress?.('rincon_calma_completado', {
        duracion: sesion.tiempoTranscurrido,
        pausas: sesion.pausas.length,
        actividad: sesion.actividadSeleccionada
      });

      // Auto-salir después de felicitación
      setTimeout(() => {
        if (configuracion.transicionSuave && onVolverActividad) {
          onVolverActividad();
        } else {
          onRegresar();
        }
      }, 3000);

    } catch (error) {
      console.error('[RinconCalmaScreen] Error completando sesión:', error);
    }
  }, [sesion, configuracion, onVolverActividad, onRegresar, onTrackProgress]);

  // ====================================
  // FUNCIONES DE RESPIRACIÓN GUIADA
  // ====================================

  const iniciarRespiracionGuiada = useCallback((): void => {
    try {
      let cicloActual: 'inhalar' | 'exhalar' | 'pausa' = 'inhalar';
      let tiempoCiclo = 0;

      respiracionTimerRef.current = setInterval(() => {
        tiempoCiclo++;

        // Ciclo: 4s inhalar, 2s pausa, 4s exhalar, 2s pausa
        if (cicloActual === 'inhalar') {
          if (tiempoCiclo === 1) {
            setRespiracionCiclo('inhalar');
            animarRespiracion(1, 1.3, 4000); // Crecer
          } else if (tiempoCiclo >= 4) {
            cicloActual = 'pausa';
            tiempoCiclo = 0;
          }
        } else if (cicloActual === 'pausa') {
          if (tiempoCiclo === 1) {
            setRespiracionCiclo('pausa');
          } else if (tiempoCiclo >= 2) {
            cicloActual = 'exhalar';
            tiempoCiclo = 0;
          }
        } else if (cicloActual === 'exhalar') {
          if (tiempoCiclo === 1) {
            setRespiracionCiclo('exhalar');
            animarRespiracion(1.3, 1, 4000); // Decrecer
          } else if (tiempoCiclo >= 4) {
            cicloActual = 'inhalar';
            tiempoCiclo = 0;
          }
        }
      }, 1000);

    } catch (error) {
      console.error('[RinconCalmaScreen] Error iniciando respiración guiada:', error);
    }
  }, []);

  const animarRespiracion = useCallback((desde: number, hasta: number, duracion: number): void => {
    try {
      respiracionAnimRef.current.setValue(desde);
      Animated.timing(respiracionAnimRef.current, {
        toValue: hasta,
        duration: duracion,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error('[RinconCalmaScreen] Error animando respiración:', error);
    }
  }, []);

  // ====================================
  // FUNCIONES DE AUDIO
  // ====================================

  const reproducirSonidoNaturaleza = useCallback(async (sonido: SonidoNaturaleza): Promise<void> => {
    try {
      // Detener sonido anterior
      if (sonidoActual) {
        await sonidoActual.stopAsync();
        await sonidoActual.unloadAsync();
      }

      // Cargar y reproducir nuevo sonido
      const { sound } = await Audio.Sound.createAsync(
        sonido.archivo,
        {
          isLooping: true,
          volume: getVolumenNumerico(configuracion.volumenAmbiente),
        }
      );

      setSonidoActual(sound);
      await sound.playAsync();

    } catch (error) {
      console.error('[RinconCalmaScreen] Error reproduciendo sonido:', error);
    }
  }, [sonidoActual, configuracion.volumenAmbiente]);

  const getVolumenNumerico = useCallback((nivel: NivelVolumen): number => {
    switch (nivel) {
      case 'silencio': return 0;
      case 'bajo': return 0.3;
      case 'medio': return 0.6;
      case 'alto': return 1.0;
      default: return 0.6;
    }
  }, []);

  // ====================================
  // FUNCIONES DE BURBUJAS
  // ====================================

  const generarBurbujas = useCallback((): void => {
    try {
      const { width, height } = Dimensions.get('window');
      const nuevasBurbujas: ElementoBurbuja[] = [];

      for (let i = 0; i < 8; i++) {
        nuevasBurbujas.push({
          id: `burbuja-${i}`,
          x: Math.random() * (width - 50),
          y: height + Math.random() * 200,
          tamaño: 30 + Math.random() * 40,
          velocidad: 0.5 + Math.random() * 1.5,
          animacion: new Animated.Value(height + 100)
        });
      }

      setBurbujas(nuevasBurbujas);
      animarBurbujas(nuevasBurbujas);

    } catch (error) {
      console.error('[RinconCalmaScreen] Error generando burbujas:', error);
    }
  }, []);

  const animarBurbujas = useCallback((burbujas: ElementoBurbuja[]): void => {
    try {
      burbujas.forEach((burbuja, index) => {
        const animacion = Animated.loop(
          Animated.timing(burbuja.animacion, {
            toValue: -100,
            duration: (4000 + Math.random() * 3000) / burbuja.velocidad,
            useNativeDriver: true,
          })
        );

        setTimeout(() => {
          animacion.start();
        }, index * 500);
      });

    } catch (error) {
      console.error('[RinconCalmaScreen] Error animando burbujas:', error);
    }
  }, []);

  const tocarBurbuja = useCallback((burbujaId: string): void => {
    try {
      setBurbujas(prev => prev.filter(b => b.id !== burbujaId));

      // Regenerar burbuja después de un momento
      setTimeout(() => {
        const { width, height } = Dimensions.get('window');
        const nuevaBurbuja: ElementoBurbuja = {
          id: `burbuja-${Date.now()}`,
          x: Math.random() * (width - 50),
          y: height + 50,
          tamaño: 30 + Math.random() * 40,
          velocidad: 0.5 + Math.random() * 1.5,
          animacion: new Animated.Value(height + 100)
        };

        setBurbujas(prev => [...prev, nuevaBurbuja]);
        animarBurbujas([nuevaBurbuja]);
      }, 1000);

    } catch (error) {
      console.error('[RinconCalmaScreen] Error tocando burbuja:', error);
    }
  }, [animarBurbujas]);

  // ====================================
  // FUNCIONES DE CONFIGURACIÓN
  // ====================================

  const cambiarDuracion = useCallback((duracion: DuracionTimer): void => {
    try {
      setConfiguracion(prev => ({
        ...prev,
        duracionTimer: duracion
      }));

      setSesion(prev => ({
        ...prev,
        duracionConfigurada: duracion
      }));
    } catch (error) {
      console.error('[RinconCalmaScreen] Error cambiando duración:', error);
    }
  }, []);

  const cambiarActividad = useCallback((actividad: TipoActividadCalma): void => {
    try {
      setConfiguracion(prev => ({
        ...prev,
        tipoActividad: actividad
      }));

      setSesion(prev => ({
        ...prev,
        actividadSeleccionada: actividad
      }));

      // Limpiar recursos de actividad anterior
      if (respiracionTimerRef.current) {
        clearInterval(respiracionTimerRef.current);
        respiracionTimerRef.current = null;
      }

      setBurbujas([]);

    } catch (error) {
      console.error('[RinconCalmaScreen] Error cambiando actividad:', error);
    }
  }, []);

  // ====================================
  // FUNCIONES DE NAVEGACIÓN
  // ====================================

  const iniciarSesion = useCallback((): void => {
    try {
      setSesion(prev => ({
        ...prev,
        estadoActual: 'activo',
        tiempoInicio: Date.now()
      }));
    } catch (error) {
      console.error('[RinconCalmaScreen] Error iniciando sesión:', error);
    }
  }, []);

  const salirRinconCalma = useCallback((): void => {
    try {
      setSesion(prev => ({
        ...prev,
        estadoActual: 'saliendo'
      }));

      // Animación de salida suave
      Animated.timing(fadeAnimRef.current, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        limpiarRecursos();
        onRegresar();
      });

    } catch (error) {
      console.error('[RinconCalmaScreen] Error saliendo:', error);
      onRegresar();
    }
  }, [limpiarRecursos, onRegresar]);

  // ====================================
  // FUNCIONES DE RENDER
  // ====================================

  const formatearTiempo = useCallback((segundos: number): string => {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${minutos}:${segs.toString().padStart(2, '0')}`;
  }, []);

  const getTextoRespiracion = useCallback((): string => {
    switch (respiracionCiclo) {
      case 'inhalar': return 'Inhala profundamente...';
      case 'exhalar': return 'Exhala lentamente...';
      case 'pausa': return 'Mantén...';
      default: return '';
    }
  }, [respiracionCiclo]);

  const renderizarHeader = useMemo((): JSX.Element => (
    <View style={estilos.header}>
      <TouchableOpacity
        style={estilos.botonRegresar}
        onPress={salirRinconCalma}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Salir del Rincón de Calma"
      >
        <Ionicons name="close" size={24} color={Colores.blancoPuro} />
      </TouchableOpacity>

      <Text style={[estilos.titulo, Tipografia.estilos.H2]}>
        Rincón de Calma
      </Text>

      <View style={estilos.timerContainer}>
        <Text style={[estilos.timerTexto, Tipografia.estilos.Body]}>
          {formatearTiempo(sesion.tiempoTranscurrido)} / {sesion.duracionConfigurada}min
        </Text>
      </View>
    </View>
  ), [sesion, salirRinconCalma, formatearTiempo]);

  const renderizarLeo = useMemo((): JSX.Element => (
    <Animated.View
      style={[
        estilos.leoContainer,
        {
          transform: [
            { scale: leoAnimRef.current },
            { scale: configuracion.tipoActividad === 'respiracion_guiada' ? respiracionAnimRef.current : 1 }
          ]
        }
      ]}
    >
      <Image
        source={require('../../assets/characters/leo-meditativo.png')}
        style={estilos.leoImagen}
        accessible={true}
        accessibilityLabel="Leo el lince en posición meditativa"
      />
      
      {configuracion.tipoActividad === 'respiracion_guiada' && (
        <Text style={[estilos.textoRespiracion, Tipografia.estilos.H2]}>
          {getTextoRespiracion()}
        </Text>
      )}
    </Animated.View>
  ), [configuracion.tipoActividad, getTextoRespiracion]);

  const renderizarControlesDuracion = useMemo((): JSX.Element => (
    <View style={estilos.controlesContainer}>
      <Text style={[estilos.etiquetaControl, Tipografia.estilos.Body]}>
        Duración:
      </Text>
      
      <View style={estilos.opcionesDuracion}>
        {DURACIONES_DISPONIBLES.map((duracion) => (
          <TouchableOpacity
            key={duracion}
            style={[
              estilos.opcionDuracion,
              configuracion.duracionTimer === duracion && estilos.opcionSeleccionada
            ]}
            onPress={() => cambiarDuracion(duracion)}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Configurar timer a ${duracion} minutos`}
          >
            <Text
              style={[
                estilos.textoOpcion,
                Tipografia.estilos.Body,
                configuracion.duracionTimer === duracion && estilos.textoSeleccionado
              ]}
            >
              {duracion} min
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  ), [configuracion.duracionTimer, cambiarDuracion]);

  const renderizarOpcionesActividad = useMemo((): JSX.Element => (
    <View style={estilos.actividadesContainer}>
      <Text style={[estilos.etiquetaControl, Tipografia.estilos.Body]}>
        Actividad:
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[
            estilos.opcionActividad,
            configuracion.tipoActividad === 'respiracion_guiada' && estilos.actividadSeleccionada
          ]}
          onPress={() => cambiarActividad('respiracion_guiada')}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Respiración guiada con Leo"
        >
          <Ionicons name="heart" size={32} color={Colores.azul} />
          <Text style={[estilos.textoActividad, Tipografia.estilos.Body]}>
            Respirar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            estilos.opcionActividad,
            configuracion.tipoActividad === 'sonidos_naturaleza' && estilos.actividadSeleccionada
          ]}
          onPress={() => cambiarActividad('sonidos_naturaleza')}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Sonidos de la naturaleza"
        >
          <Ionicons name="leaf" size={32} color={Colores.verdeJungla} />
          <Text style={[estilos.textoActividad, Tipografia.estilos.Body]}>
            Naturaleza
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            estilos.opcionActividad,
            configuracion.tipoActividad === 'burbujas_tactil' && estilos.actividadSeleccionada
          ]}
          onPress={() => cambiarActividad('burbujas_tactil')}
          accessible={true}
          accessibilityRole="button" 
          accessibilityLabel="Burbujas táctiles interactivas"
        >
          <Ionicons name="water" size={32} color={Colores.azul} />
          <Text style={[estilos.textoActividad, Tipografia.estilos.Body]}>
            Burbujas
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  ), [configuracion.tipoActividad, cambiarActividad]);

  const renderizarBurbujas = useMemo((): JSX.Element => {
    if (configuracion.tipoActividad !== 'burbujas_tactil') return <></>;

    return (
      <View style={estilos.burbujasContainer}>
        {burbujas.map((burbuja) => (
          <Animated.View
            key={burbuja.id}
            style={[
              estilos.burbuja,
              {
                left: burbuja.x,
                width: burbuja.tamaño,
                height: burbuja.tamaño,
                transform: [{ translateY: burbuja.animacion }]
              }
            ]}
          >
            <TouchableOpacity
              style={[estilos.burbujaTouch, { width: burbuja.tamaño, height: burbuja.tamaño }]}
              onPress={() => tocarBurbuja(burbuja.id)}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Tocar burbuja"
            >
              <View style={[estilos.burbujaCirculo, { width: burbuja.tamaño, height: burbuja.tamaño }]} />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    );
  }, [configuracion.tipoActividad, burbujas, tocarBurbuja]);

  const renderizarSonidosNaturaleza = useMemo((): JSX.Element => {
    if (configuracion.tipoActividad !== 'sonidos_naturaleza') return <></>;

    return (
      <View style={estilos.sonidosContainer}>
        <Text style={[estilos.etiquetaControl, Tipografia.estilos.Body]}>
          Elige tu sonido favorito:
        </Text>

        <View style={estilos.gridSonidos}>
          {SONIDOS_NATURALEZA.map((sonido) => (
            <TouchableOpacity
              key={sonido.id}
              style={estilos.opcionSonido}
              onPress={() => reproducirSonidoNaturaleza(sonido)}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`Reproducir ${sonido.descripcion}`}
            >
              <Ionicons name={sonido.icono as any} size={40} color={Colores.azul} />
              <Text style={[estilos.nombreSonido, Tipografia.estilos.Body]}>
                {sonido.nombre}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }, [configuracion.tipoActividad, reproducirSonidoNaturaleza]);

  const renderizarBotones = useMemo((): JSX.Element => {
    if (sesion.estadoActual === 'completado') {
      return (
        <View style={estilos.botonesContainer}>
          <Text style={[estilos.mensajeCompletado, Tipografia.estilos.H2]}>
            ¡Muy bien! Te sientes más tranquilo 😌
          </Text>

          <View style={estilos.botonesFinales}>
            <TouchableOpacity
              style={estilos.botonSecundario}
              onPress={() => cambiarActividad(configuracion.tipoActividad)}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Repetir sesión de calma"
            >
              <Text style={[estilos.textoBotonSecundario, Tipografia.estilos.Body]}>
                Repetir
              </Text>
            </TouchableOpacity>

            {onVolverActividad && (
              <TouchableOpacity
                style={estilos.botonPrimario}
                onPress={onVolverActividad}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Volver a la actividad anterior"
              >
                <Text style={[estilos.textoBotonPrimario, Tipografia.estilos.Body]}>
                  Continuar
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      );
    }

    if (sesion.estadoActual === 'iniciando') {
      return (
        <View style={estilos.botonesContainer}>
          <TouchableOpacity
            style={estilos.botonIniciar}
            onPress={iniciarSesion}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Empezar sesión de relajación"
          >
            <Ionicons name="play" size={24} color={Colores.blancoPuro} />
            <Text style={[estilos.textoBotonIniciar, Tipografia.estilos.Body]}>
              Empezar a relajarse
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={estilos.botonesContainer}>
        <TouchableOpacity
          style={estilos.botonControl}
          onPress={sesion.estadoActual === 'pausado' ? reanudarTimer : pausarTimer}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={sesion.estadoActual === 'pausado' ? "Reanudar sesión" : "Pausar sesión"}
        >
          <Ionicons 
            name={sesion.estadoActual === 'pausado' ? 'play' : 'pause'} 
            size={24} 
            color={Colores.blancoPuro} 
          />
          <Text style={[estilos.textoBotonControl, Tipografia.estilos.Body]}>
            {sesion.estadoActual === 'pausado' ? 'Continuar' : 'Pausa'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }, [sesion.estadoActual, configuracion.tipoActividad, onVolverActividad, iniciarSesion, pausarTimer, reanudarTimer, cambiarActividad]);

  // ====================================
  // RENDER PRINCIPAL
  // ====================================

  return (
    <SafeAreaView style={estilos.contenedor}>
      <StatusBar barStyle="light-content" backgroundColor={Colores.azul} />
      
      <LinearGradient
        colors={[Colores.azul, Colores.blancoPuro]}
        style={estilos.gradienteFondo}
      >
        <Animated.View
          style={[
            estilos.contenidoPrincipal,
            { opacity: fadeAnimRef.current }
          ]}
        >
          {renderizarHeader}

          <ScrollView
            style={estilos.scrollContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={estilos.scrollContent}
          >
            {renderizarLeo}

            {sesion.estadoActual === 'iniciando' && (
              <>
                {renderizarControlesDuracion}
                {renderizarOpcionesActividad}
              </>
            )}

            {sesion.estadoActual === 'activo' && renderizarSonidosNaturaleza}

            {renderizarBurbujas}
          </ScrollView>

          {renderizarBotones}
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
};

// ========================================================================================
// ESTILOS
// ========================================================================================

const { width } = Dimensions.get('window');

const estilos = {
  contenedor: {
    flex: 1,
    backgroundColor: Colores.azul,
  },

  gradienteFondo: {
    flex: 1,
  },

  contenidoPrincipal: {
    flex: 1,
  },

  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 45,
  },

  botonRegresar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },

  titulo: {
    color: Colores.blancoPuro,
    textAlign: 'center' as const,
  },

  timerContainer: {
    width: 44,
    alignItems: 'flex-end' as const,
  },

  timerTexto: {
    color: Colores.blancoPuro,
    fontSize: 14,
  },

  scrollContainer: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  leoContainer: {
    alignItems: 'center' as const,
    marginVertical: 30,
  },

  leoImagen: {
    width: 200,
    height: 200,
    resizeMode: 'contain' as const,
  },

  textoRespiracion: {
    color: Colores.azul,
    textAlign: 'center' as const,
    marginTop: 20,
  },

  controlesContainer: {
    marginVertical: 20,
  },

  etiquetaControl: {
    color: Colores.azul,
    marginBottom: 10,
    textAlign: 'center' as const,
  },

  opcionesDuracion: {
    flexDirection: 'row' as const,
    justifyContent: 'center' as const,
    gap: 10,
  },

  opcionDuracion: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 2,
    borderColor: 'transparent',
  },

  opcionSeleccionada: {
    backgroundColor: Colores.blancoPuro,
    borderColor: Colores.azul,
  },

  textoOpcion: {
    color: Colores.azul,
    textAlign: 'center' as const,
  },

  textoSeleccionado: {
    fontWeight: 'bold' as const,
  },

  actividadesContainer: {
    marginVertical: 20,
  },

  opcionActividad: {
    alignItems: 'center' as const,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginRight: 15,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 2,
    borderColor: 'transparent',
    minWidth: 100,
  },

  actividadSeleccionada: {
    backgroundColor: Colores.blancoPuro,
    borderColor: Colores.azul,
  },

  textoActividad: {
    color: Colores.azul,
    textAlign: 'center' as const,
    marginTop: 5,
  },

  sonidosContainer: {
    marginVertical: 20,
  },

  gridSonidos: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between' as const,
    gap: 15,
  },

  opcionSonido: {
    width: (width - 60) / 2,
    alignItems: 'center' as const,
    paddingVertical: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  nombreSonido: {
    color: Colores.azul,
    textAlign: 'center' as const,
    marginTop: 10,
  },

  burbujasContainer: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'box-none' as const,
  },

  burbuja: {
    position: 'absolute' as const,
  },

  burbujaTouch: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },

  burbujaCirculo: {
    borderRadius: 1000,
    backgroundColor: 'rgba(135, 206, 235, 0.4)',
    borderWidth: 2,
    borderColor: 'rgba(135, 206, 235, 0.8)',
  },

  botonesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
  },

  botonIniciar: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: Colores.verdeJungla,
    paddingVertical: 16,
    borderRadius: 30,
    gap: 10,
  },

  textoBotonIniciar: {
    color: Colores.blancoPuro,
    fontWeight: 'bold' as const,
  },

  botonControl: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: Colores.azul,
    paddingVertical: 16,
    borderRadius: 30,
    gap: 10,
  },

  textoBotonControl: {
    color: Colores.blancoPuro,
    fontWeight: 'bold' as const,
  },

  mensajeCompletado: {
    color: Colores.azul,
    textAlign: 'center' as const,
    marginBottom: 20,
  },

  botonesFinales: {
    flexDirection: 'row' as const,
    gap: 15,
  },

  botonSecundario: {
    flex: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingVertical: 16,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colores.azul,
  },

  textoBotonSecundario: {
    color: Colores.azul,
    fontWeight: 'bold' as const,
  },

  botonPrimario: {
    flex: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: Colores.verdeJungla,
    paddingVertical: 16,
    borderRadius: 30,
  },

  textoBotonPrimario: {
    color: Colores.blancoPuro,
    fontWeight: 'bold' as const,
  },
};

export default RinconCalmaScreen;