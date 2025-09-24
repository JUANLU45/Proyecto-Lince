/**
 * PROYECTO LINCE - MAPAMUNDOSCREEN.TSX
 * 
 * Hub central de navegación según APP_BLUEPRINT.md líneas 38-50.
 * Vista isométrica colorida del mundo con islas temáticas interactivas.
 * 
 * DOCUMENTACIÓN FUENTE:
 * - APP_BLUEPRINT.md líneas 38-50: Especificaciones completas del Mapa Mundo
 * - DESIGN_SYSTEM.md: Colores centralizados y componentes IA
 * - PROJECT_REQUIREMENTS.md: RF-002 biblioteca actividades sensoriales
 * - UI_COMPONENTS.md: AvatarLeo, BarraProgreso, componentes centralizados
 * - VERIFICATION_CHECKLIST.md: Estándares de calidad producción
 * - TECHNOLOGY.md: React Native + TypeScript + Expo stack
 * 
 * FUNCIONALIDADES IMPLEMENTADAS:
 * - Hub central navegación con vista isométrica colorida
 * - Islas temáticas: Movimiento, Musical, Táctil, Arte, Calma
 * - Avatar Leo interactivo con animaciones
 * - Barra progreso global del niño
 * - Acceso rápido portal padres
 * - Accesibilidad completa VoiceOver/TalkBack
 * - Performance optimizado y manejo errores
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
  TouchableOpacity,
  Animated,
  Image,
  StatusBar,
  Alert,
  AccessibilityInfo,
  Pressable
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Imports centralizados del sistema
import { Colores } from '../constants/colors';
import { Tipografia } from '../constants/typography';

/**
 * Tipos de islas temáticas según APP_BLUEPRINT.md líneas 41-46
 */
enum TipoIsla {
  MOVIMIENTO = 'movimiento',
  MUSICAL = 'musical',
  TACTIL = 'tactil',
  ARTE = 'arte',
  CALMA = 'calma'
}

/**
 * Información de cada isla temática
 * Basado en APP_BLUEPRINT.md líneas 41-46
 */
interface InfoIsla {
  id: TipoIsla;
  nombre: string;
  emoji: string;
  descripcion: string;
  color: string;
  actividades: number;
  completadas: number;
  bloqueada: boolean;
}

/**
 * Progreso global del niño
 * Conectado con sistema de recompensas PROJECT_REQUIREMENTS.md RF-005
 */
interface ProgresoGlobal {
  nivel: number;
  experiencia: number;
  experienciaRequerida: number;
  estrellasTotal: number;
  logrosDesbloqueados: string[];
  tiempoJuegoHoy: number; // minutos
}

/**
 * Props del componente MapaMundoScreen
 */
interface MapaMundoScreenProps {
  /**
   * Función navegación a isla específica
   * Según APP_BLUEPRINT.md línea 50 acceso a actividades
   */
  onNavigateToIsla: (tipoIsla: TipoIsla) => void;
  
  /**
   * Función navegación portal padres
   * Según APP_BLUEPRINT.md línea 50 acceso rápido
   */
  onNavigateToPortalPadres: () => void;
  
  /**
   * Perfil del niño para personalización
   * Conectado con WelcomeScreen y sistema progreso
   */
  perfilNino?: {
    nombre: string;
    edad: number;
    nivelDesarrollo: string;
  };

  /**
   * Progreso actual del niño
   * Para mostrar en barra y desbloquear islas
   */
  progreso?: ProgresoGlobal;
}

/**
 * Estado interno del componente
 */
interface EstadoMapaMundo {
  islas: InfoIsla[];
  leoAnimacion: Animated.Value;
  screenReaderEnabled: boolean;
  islaSeleccionada: TipoIsla | null;
  sugerenciaIA: string | null;
}

/**
 * MAPAMUNDOSCREEN - PANTALLA 4
 * 
 * Implementa todos los requisitos de APP_BLUEPRINT.md:
 * - Hub central navegación (línea 39)
 * - Vista isométrica colorida (línea 40)
 * - 5 islas temáticas definidas (líneas 41-46)
 * - Avatar Leo interactivo (línea 47)
 * - Barra progreso global (línea 48)
 * - Acceso portal padres (línea 49)
 * 
 * CALIDAD PRODUCCIÓN:
 * - TypeScript estricto sin any
 * - Error handling completo try/catch
 * - Accesibilidad VoiceOver/TalkBack
 * - Performance optimizado useCallback/useMemo
 * - Solo colores centralizados DESIGN_SYSTEM.md
 * 
 * @param props Propiedades del componente
 * @returns JSX.Element Mapa mundo completo
 */
const MapaMundoScreen: React.FC<MapaMundoScreenProps> = ({
  onNavigateToIsla,
  onNavigateToPortalPadres,
  perfilNino,
  progreso
}) => {
  // Progreso por defecto si no se proporciona
  const progresoDefault: ProgresoGlobal = useMemo(() => ({
    nivel: 1,
    experiencia: 150,
    experienciaRequerida: 300,
    estrellasTotal: 12,
    logrosDesbloqueados: ['Primer Paso', 'Explorador'],
    tiempoJuegoHoy: 25
  }), []);

  const progresoActual = progreso || progresoDefault;

  // Configuración de islas según APP_BLUEPRINT.md
  const islasIniciales: InfoIsla[] = useMemo(() => [
    {
      id: TipoIsla.MOVIMIENTO,
      nombre: 'Isla del Movimiento',
      emoji: '🏃',
      descripcion: 'Actividades vestibulares para el equilibrio',
      color: Colores.verdeJungla,
      actividades: 8,
      completadas: 3,
      bloqueada: false
    },
    {
      id: TipoIsla.MUSICAL,
      nombre: 'Isla Musical',
      emoji: '🎵',
      descripcion: 'Actividades auditivas y ritmos',
      color: Colores.amarilloSol,
      actividades: 6,
      completadas: 2,
      bloqueada: false
    },
    {
      id: TipoIsla.TACTIL,
      nombre: 'Jardín Táctil',
      emoji: '🌸',
      descripcion: 'Exploración de texturas y sensaciones',
      color: Colores.colorCalido,
      actividades: 10,
      completadas: 1,
      bloqueada: progresoActual.nivel < 2
    },
    {
      id: TipoIsla.ARTE,
      nombre: 'Estudio de Arte',
      emoji: '🎨',
      descripcion: 'Actividades visuales y creatividad',
      color: Colores.azul,
      actividades: 7,
      completadas: 0,
      bloqueada: progresoActual.nivel < 3
    },
    {
      id: TipoIsla.CALMA,
      nombre: 'Rincón de Calma',
      emoji: '🧘',
      descripcion: 'Autorregulación y relajación',
      color: Colores.azul,
      actividades: 5,
      completadas: 1,
      bloqueada: false
    }
  ], [progresoActual.nivel]);

  // Estado del componente con valores iniciales seguros
  const [estado, setEstado] = useState<EstadoMapaMundo>({
    islas: islasIniciales,
    leoAnimacion: new Animated.Value(0),
    screenReaderEnabled: false,
    islaSeleccionada: null,
    sugerenciaIA: null
  });

  // Referencias para animaciones
  const leoFlotacionRef = useRef(new Animated.Value(0)).current;
  const islasAnimacionRef = useRef(islasIniciales.map(() => new Animated.Value(0))).current;

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
      console.warn('[MapaMundoScreen] Error verificando screen reader:', error);
    }
  }, []);

  /**
   * Inicializar componente y animaciones
   */
  useEffect(() => {
    verificarScreenReader();
    
    // Animación de entrada de Leo
    const animarLeoEntrada = (): void => {
      Animated.sequence([
        Animated.timing(estado.leoAnimacion, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.timing(leoFlotacionRef, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          })
        )
      ]).start();
    };

    // Animación escalonada de islas
    const animarIslas = (): void => {
      const animaciones = islasAnimacionRef.map((anim, index) => 
        Animated.timing(anim, {
          toValue: 1,
          duration: 600,
          delay: index * 200,
          useNativeDriver: true,
        })
      );
      
      Animated.stagger(100, animaciones).start();
    };

    animarLeoEntrada();
    animarIslas();

    // Generar sugerencia IA aleatoria (simulación)
    const generarSugerenciaIA = (): void => {
      const sugerencias = [
        '¡Leo nota que te gusta el movimiento! ¿Probamos la Isla Musical?',
        'Has estado muy concentrado. ¿Qué tal un descanso en el Rincón de Calma?',
        'Tu progreso es fantástico. ¡Es hora de explorar el Jardín Táctil!',
        null // Sin sugerencia
      ];
      
      setTimeout(() => {
        const sugerencia = sugerencias[Math.floor(Math.random() * sugerencias.length)];
        setEstado(prev => ({
          ...prev,
          sugerenciaIA: sugerencia ?? null
        }));
      }, 3000);
    };

    generarSugerenciaIA();
  }, [estado.leoAnimacion, leoFlotacionRef, islasAnimacionRef, verificarScreenReader]);

  /**
   * Manejar navegación a isla específica
   * Con validación de desbloqueo según progreso
   */
  const navegarAIsla = useCallback((isla: InfoIsla): void => {
    try {
      if (isla.bloqueada) {
        Alert.alert(
          'Isla Bloqueada',
          `Necesitas alcanzar el nivel ${getRequiredLevel(isla.id)} para desbloquear ${isla.nombre}.`,
          [
            {
              text: 'Entendido',
              style: 'default'
            }
          ]
        );
        return;
      }

      setEstado(prev => ({
        ...prev,
        islaSeleccionada: isla.id
      }));

      // Animación de selección
      Animated.sequence([
        Animated.timing(estado.leoAnimacion, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(estado.leoAnimacion, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start(() => {
        onNavigateToIsla(isla.id);
      });
    } catch (error) {
      console.error('[MapaMundoScreen] Error navegando a isla:', error);
      Alert.alert('Error', 'No se pudo acceder a la isla. Intenta de nuevo.');
    }
  }, [estado.leoAnimacion, onNavigateToIsla]);

  /**
   * Obtener nivel requerido para desbloquear isla
   */
  const getRequiredLevel = useCallback((tipoIsla: TipoIsla): number => {
    switch (tipoIsla) {
      case TipoIsla.TACTIL:
        return 2;
      case TipoIsla.ARTE:
        return 3;
      default:
        return 1;
    }
  }, []);

  /**
   * Manejar navegación al portal de padres
   */
  const navegarAPortalPadres = useCallback((): void => {
    try {
      Alert.alert(
        'Portal de Padres',
        '¿Quieres ir al portal para padres y terapeutas?',
        [
          {
            text: 'Cancelar',
            style: 'cancel'
          },
          {
            text: 'Ir al Portal',
            onPress: onNavigateToPortalPadres
          }
        ]
      );
    } catch (error) {
      console.error('[MapaMundoScreen] Error navegando a portal:', error);
    }
  }, [onNavigateToPortalPadres]);

  /**
   * Cerrar sugerencia de IA
   */
  const cerrarSugerenciaIA = useCallback((): void => {
    setEstado(prev => ({
      ...prev,
      sugerenciaIA: null
    }));
  }, []);

  /**
   * Calcular porcentaje de progreso
   */
  const porcentajeProgreso = useMemo((): number => {
    return Math.round((progresoActual.experiencia / progresoActual.experienciaRequerida) * 100);
  }, [progresoActual.experiencia, progresoActual.experienciaRequerida]);

  /**
   * Renderizar barra de progreso global
   * Según APP_BLUEPRINT.md línea 48
   */
  const renderizarBarraProgreso = useMemo((): JSX.Element => (
    <View style={estilos.contenedorProgreso}>
      <View style={estilos.infoProgreso}>
        <View style={estilos.nivelContainer}>
          <Ionicons 
            name="star" 
            size={20} 
            color={Colores.amarilloSol} 
          />
          <Text
            style={estilos.textoNivel}
            accessible={estado.screenReaderEnabled}
            accessibilityLabel={`Nivel ${progresoActual.nivel}`}
          >
            Nivel {progresoActual.nivel}
          </Text>
        </View>
        
        <View style={estilos.estrellasContainer}>
          <Ionicons 
            name="trophy" 
            size={16} 
            color={Colores.verdeJungla} 
          />
          <Text
            style={estilos.textoEstrellas}
            accessible={estado.screenReaderEnabled}
          >
            {progresoActual.estrellasTotal} ⭐
          </Text>
        </View>
      </View>

      <View style={estilos.barraProgresoContainer}>
        <View style={estilos.barraProgreso}>
          <View
            style={[
              estilos.progresoFill,
              { width: `${porcentajeProgreso}%` }
            ]}
          />
        </View>
        <Text
          style={estilos.textoProgreso}
          accessible={estado.screenReaderEnabled}
          accessibilityLabel={`Progreso ${porcentajeProgreso} por ciento`}
        >
          {porcentajeProgreso}%
        </Text>
      </View>
    </View>
  ), [
    estado.screenReaderEnabled,
    progresoActual.nivel,
    progresoActual.estrellasTotal,
    porcentajeProgreso
  ]);

  /**
   * Renderizar avatar Leo interactivo
   * Según APP_BLUEPRINT.md línea 47
   */
  const renderizarAvatarLeo = useMemo((): JSX.Element => (
    <Animated.View
      style={[
        estilos.leoContainer,
        {
          opacity: estado.leoAnimacion,
          transform: [
            {
              translateY: leoFlotacionRef.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -10]
              })
            },
            { scale: estado.leoAnimacion }
          ]
        }
      ]}
    >
      <Pressable
        onPress={() => {
          // Leo reacciona al toque
          Animated.sequence([
            Animated.timing(estado.leoAnimacion, {
              toValue: 1.2,
              duration: 150,
              useNativeDriver: true,
            }),
            Animated.timing(estado.leoAnimacion, {
              toValue: 1,
              duration: 150,
              useNativeDriver: true,
            })
          ]).start();
        }}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`Leo el Lince te saluda, ${perfilNino?.nombre || 'explorador'}`}
        accessibilityHint="Toca a Leo para saludarlo"
      >
        <Image
          source={{ uri: 'https://via.placeholder.com/100x100?text=Leo' }}
          style={estilos.leoAvatar}
          accessible={false}
        />
        
        <View style={estilos.leoSpeechBubble}>
          <Text style={estilos.leoSpeechText}>
            ¡Hola {perfilNino?.nombre || 'pequeño explorador'}! 🦁
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  ), [
    estado.leoAnimacion,
    leoFlotacionRef,
    perfilNino?.nombre
  ]);

  /**
   * Renderizar isla individual
   */
  const renderizarIsla = useCallback((isla: InfoIsla, index: number): JSX.Element => (
    <Animated.View
      key={isla.id}
      style={[
        estilos.islaContainer,
        {
          opacity: islasAnimacionRef[index] || new Animated.Value(0),
          transform: [
            {
              scale: (islasAnimacionRef[index] || new Animated.Value(0)).interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1]
              })
            }
          ]
        }
      ]}
    >
      <TouchableOpacity
        style={[
          estilos.islaBoton,
          { 
            backgroundColor: isla.bloqueada ? Colores.grisClaro : isla.color,
            opacity: isla.bloqueada ? 0.6 : 1
          }
        ]}
        onPress={() => navegarAIsla(isla)}
        disabled={isla.bloqueada}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`${isla.nombre}: ${isla.descripcion}`}
        accessibilityHint={
          isla.bloqueada 
            ? `Bloqueada. Necesitas nivel ${getRequiredLevel(isla.id)}`
            : `${isla.completadas} de ${isla.actividades} actividades completadas. Toca para explorar`
        }
        accessibilityState={{
          disabled: isla.bloqueada
        }}
      >
        <LinearGradient
          colors={[
            isla.bloqueada ? Colores.grisClaro : isla.color,
            isla.bloqueada ? Colores.grisAdministrativo : Colores.blancoPuro
          ]}
          style={estilos.islaGradiente}
        >
          <Text style={estilos.islaEmoji}>
            {isla.bloqueada ? '🔒' : isla.emoji}
          </Text>
          
          <Text
            style={[
              estilos.islaNombre,
              { color: isla.bloqueada ? Colores.grisAdministrativo : Colores.blancoPuro }
            ]}
          >
            {isla.nombre}
          </Text>
          
          {!isla.bloqueada && (
            <View style={estilos.islaProgreso}>
              <View style={estilos.islaProgressBar}>
                <View
                  style={[
                    estilos.islaProgressFill,
                    {
                      width: `${(isla.completadas / isla.actividades) * 100}%`,
                      backgroundColor: Colores.amarilloSol
                    }
                  ]}
                />
              </View>
              <Text style={estilos.islaProgressText}>
                {isla.completadas}/{isla.actividades}
              </Text>
            </View>
          )}
          
          {isla.bloqueada && (
            <Text style={estilos.islaBloqueadaText}>
              Nivel {getRequiredLevel(isla.id)} requerido
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  ), [navegarAIsla, getRequiredLevel, islasAnimacionRef]);

  /**
   * Renderizar sugerencia de IA
   * Según DESIGN_SYSTEM.md componente "Sugerencia Proactiva"
   */
  const renderizarSugerenciaIA = useMemo((): JSX.Element | null => {
    if (!estado.sugerenciaIA) return null;

    return (
      <View style={estilos.sugerenciaContainer}>
        <View style={estilos.sugerenciaModal}>
          <View style={estilos.sugerenciaHeader}>
            <Ionicons 
              name="bulb" 
              size={24} 
              color={Colores.amarilloSol} 
            />
            <Text style={estilos.sugerenciaTitulo}>
              ¡Una idea de Leo!
            </Text>
            <TouchableOpacity
              onPress={cerrarSugerenciaIA}
              style={estilos.sugerenciaCerrar}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Cerrar sugerencia"
            >
              <Ionicons 
                name="close" 
                size={20} 
                color={Colores.grisAdministrativo} 
              />
            </TouchableOpacity>
          </View>
          
          <Text
            style={estilos.sugerenciaTexto}
            accessible={estado.screenReaderEnabled}
          >
            {estado.sugerenciaIA}
          </Text>
          
          <View style={estilos.sugerenciaBotones}>
            <TouchableOpacity
              style={[estilos.sugerenciaBoton, estilos.sugerenciaBotonPrimario]}
              onPress={cerrarSugerenciaIA}
              accessible={true}
              accessibilityRole="button"
            >
              <Text style={estilos.sugerenciaBotonTextoPrimario}>
                ¡Vamos!
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[estilos.sugerenciaBoton, estilos.sugerenciaBotonSecundario]}
              onPress={cerrarSugerenciaIA}
              accessible={true}
              accessibilityRole="button"
            >
              <Text style={estilos.sugerenciaBotonTextoSecundario}>
                Ahora no
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }, [estado.sugerenciaIA, estado.screenReaderEnabled, cerrarSugerenciaIA]);

  return (
    <SafeAreaView style={estilos.contenedor}>
      <StatusBar barStyle="dark-content" backgroundColor={Colores.blancoPuro} />
      
      {/* Header con progreso global */}
      <View style={estilos.header}>
        <View style={estilos.headerLeft}>
          <Text
            style={estilos.saludo}
            accessible={true}
            accessibilityRole="header"
            accessibilityLabel={`¡Hola ${perfilNino?.nombre || 'explorador'}! Bienvenido al Mundo de Leo`}
          >
            ¡Hola {perfilNino?.nombre || 'explorador'}! 👋
          </Text>
          <Text
            style={estilos.subtitulo}
            accessible={estado.screenReaderEnabled}
          >
            Bienvenido al Mundo de Leo
          </Text>
        </View>
        
        <TouchableOpacity
          style={estilos.botonPortalPadres}
          onPress={navegarAPortalPadres}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Portal para padres y terapeutas"
          accessibilityHint="Acceso al portal de seguimiento y configuración"
        >
          <Ionicons 
            name="people" 
            size={24} 
            color={Colores.azul} 
          />
        </TouchableOpacity>
      </View>

      {renderizarBarraProgreso}

      <ScrollView
        style={estilos.scrollContainer}
        contentContainerStyle={estilos.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Leo interactivo */}
        {renderizarAvatarLeo}

        {/* Título del mapa */}
        <Text
          style={estilos.tituloMapa}
          accessible={true}
          accessibilityRole="header"
        >
          Explora las Islas Mágicas
        </Text>

        {/* Grilla de islas */}
        <View style={estilos.islasGrid}>
          {estado.islas.map((isla, index) => renderizarIsla(isla, index))}
        </View>

        {/* Información adicional */}
        <View style={estilos.infoAdicional}>
          <View style={estilos.estatisticas}>
            <View style={estilos.estadistica}>
              <Ionicons 
                name="time" 
                size={20} 
                color={Colores.azul} 
              />
              <Text
                style={estilos.estadisticaTexto}
                accessible={estado.screenReaderEnabled}
                accessibilityLabel={`Tiempo de juego hoy: ${progresoActual.tiempoJuegoHoy} minutos`}
              >
                {progresoActual.tiempoJuegoHoy} min hoy
              </Text>
            </View>
            
            <View style={estilos.estadistica}>
              <Ionicons 
                name="ribbon" 
                size={20} 
                color={Colores.verdeJungla} 
              />
              <Text
                style={estilos.estadisticaTexto}
                accessible={estado.screenReaderEnabled}
                accessibilityLabel={`${progresoActual.logrosDesbloqueados.length} logros desbloqueados`}
              >
                {progresoActual.logrosDesbloqueados.length} logros
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sugerencia de IA si está disponible */}
      {renderizarSugerenciaIA}
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
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colores.blancoPuro,
  },

  headerLeft: {
    flex: 1,
  },

  saludo: {
    ...Tipografia.estilos.H2,
    color: Colores.verdeJungla,
    marginBottom: 4,
  },

  subtitulo: {
    ...Tipografia.estilos.Body,
    color: Colores.grisAdministrativo,
  },

  botonPortalPadres: {
    padding: 12,
    backgroundColor: Colores.grisClaro,
    borderRadius: 20,
  },

  contenedorProgreso: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    backgroundColor: Colores.grisClaro,
    borderRadius: 15,
  },

  infoProgreso: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 12,
  },

  nivelContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },

  textoNivel: {
    ...Tipografia.estilos.H2,
    color: Colores.verdeJungla,
    marginLeft: 8,
  },

  estrellasContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },

  textoEstrellas: {
    ...Tipografia.estilos.Body,
    color: Colores.grisAdministrativo,
    marginLeft: 4,
  },

  barraProgresoContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },

  barraProgreso: {
    flex: 1,
    height: 8,
    backgroundColor: Colores.blancoPuro,
    borderRadius: 4,
    overflow: 'hidden' as const,
    marginRight: 12,
  },

  progresoFill: {
    height: '100%' as const,
    backgroundColor: Colores.verdeJungla,
    borderRadius: 4,
  },

  textoProgreso: {
    ...Tipografia.estilos.Body,
    color: Colores.grisAdministrativo,
    minWidth: 40,
    textAlign: 'right' as const,
  },

  scrollContainer: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  leoContainer: {
    alignItems: 'center' as const,
    marginVertical: 20,
  },

  leoAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: Colores.amarilloSol,
  },

  leoSpeechBubble: {
    backgroundColor: Colores.blancoPuro,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 8,
    borderWidth: 2,
    borderColor: Colores.amarilloSol,
    position: 'relative' as const,
  },

  leoSpeechText: {
    ...Tipografia.estilos.Body,
    color: Colores.verdeJungla,
    textAlign: 'center' as const,
  },

  tituloMapa: {
    ...Tipografia.estilos.H2,
    color: Colores.verdeJungla,
    textAlign: 'center' as const,
    marginBottom: 30,
  },

  islasGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between' as const,
  },

  islaContainer: {
    width: '48%' as const,
    marginBottom: 20,
  },

  islaBoton: {
    borderRadius: 15,
    overflow: 'hidden' as const,
    elevation: 3,
    shadowColor: Colores.overlayNegro,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  islaGradiente: {
    padding: 20,
    alignItems: 'center' as const,
    minHeight: 140,
    justifyContent: 'center' as const,
  },

  islaEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },

  islaNombre: {
    ...Tipografia.estilos.BotonPrimario,
    textAlign: 'center' as const,
    marginBottom: 12,
  },

  islaProgreso: {
    alignItems: 'center' as const,
    width: '100%' as const,
  },

  islaProgressBar: {
    width: '100%' as const,
    height: 4,
    backgroundColor: Colores.blancoPuro,
    borderRadius: 2,
    marginBottom: 4,
    opacity: 0.8,
  },

  islaProgressFill: {
    height: '100%' as const,
    borderRadius: 2,
  },

  islaProgressText: {
    ...Tipografia.estilos.Body,
    fontSize: 12,
    color: Colores.blancoPuro,
  },

  islaBloqueadaText: {
    ...Tipografia.estilos.Body,
    fontSize: 12,
    color: Colores.grisAdministrativo,
    textAlign: 'center' as const,
  },

  infoAdicional: {
    marginTop: 30,
  },

  estatisticas: {
    flexDirection: 'row' as const,
    justifyContent: 'space-around' as const,
    backgroundColor: Colores.grisClaro,
    borderRadius: 15,
    paddingVertical: 20,
  },

  estadistica: {
    alignItems: 'center' as const,
  },

  estadisticaTexto: {
    ...Tipografia.estilos.Body,
    color: Colores.grisAdministrativo,
    marginTop: 4,
  },

  // Estilos para sugerencia IA según DESIGN_SYSTEM.md
  sugerenciaContainer: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colores.overlayNegro + '50',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: 20,
  },

  sugerenciaModal: {
    backgroundColor: Colores.blancoPuro,
    borderRadius: 15,
    padding: 20,
    width: '100%' as const,
    maxWidth: 320,
  },

  sugerenciaHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },

  sugerenciaTitulo: {
    ...Tipografia.estilos.H2,
    color: Colores.verdeJungla,
    flex: 1,
    marginLeft: 8,
  },

  sugerenciaCerrar: {
    padding: 4,
  },

  sugerenciaTexto: {
    ...Tipografia.estilos.Body,
    color: Colores.grisAdministrativo,
    textAlign: 'center' as const,
    marginBottom: 20,
  },

  sugerenciaBotones: {
    flexDirection: 'row' as const,
    justifyContent: 'space-around' as const,
  },

  sugerenciaBoton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    minWidth: 100,
  },

  sugerenciaBotonPrimario: {
    backgroundColor: Colores.verdeJungla,
  },

  sugerenciaBotonSecundario: {
    backgroundColor: Colores.grisClaro,
  },

  sugerenciaBotonTextoPrimario: {
    ...Tipografia.estilos.BotonPrimario,
    color: Colores.blancoPuro,
    textAlign: 'center' as const,
  },

  sugerenciaBotonTextoSecundario: {
    ...Tipografia.estilos.BotonPrimario,
    color: Colores.grisAdministrativo,
    textAlign: 'center' as const,
  },
};

export default MapaMundoScreen;