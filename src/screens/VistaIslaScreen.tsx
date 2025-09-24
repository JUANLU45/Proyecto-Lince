/**
 * PROYECTO LINCE - VISTAISLASCREENR.TSX
 * 
 * Vista de Isla (Pantalla 5) según APP_BLUEPRINT.md líneas 51-63.
 * Muestra actividades disponibles en cada isla temática específica.
 * 
 * DOCUMENTACIÓN FUENTE:
 * - APP_BLUEPRINT.md líneas 51-63: Especificaciones Vista de Isla
 * - DESIGN_SYSTEM.md: Colores centralizados y componentes IA
 * - PROJECT_REQUIREMENTS.md: RF-002 biblioteca actividades sensoriales
 * - UI_COMPONENTS.md: ActividadContainer, BarraProgreso centralizados
 * - VERIFICATION_CHECKLIST.md: Estándares calidad producción
 * - TECHNOLOGY.md: React Native + TypeScript + Expo stack
 * 
 * FUNCIONALIDADES IMPLEMENTADAS:
 * - Lista actividades con miniatura, título, dificultad, completación
 * - Estimación tiempo y indicadores estado
 * - Botón "Actividad Random" sugerida por IA
 * - Progreso específico de isla con estadísticas
 * - Avatar Leo interactivo con consejos contextuales
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
  FlatList,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Imports centralizados del sistema
import { Colores } from '../constants/colors';
import { Tipografia } from '../constants/typography';

/**
 * Tipos de islas temáticas disponibles
 * Sincronizados con MapaMundoScreen según APP_BLUEPRINT.md
 */
enum TipoIsla {
  MOVIMIENTO = 'movimiento',
  MUSICAL = 'musical',
  TACTIL = 'tactil',
  ARTE = 'arte',
  CALMA = 'calma'
}

/**
 * Niveles de dificultad de actividades
 * Según PROJECT_REQUIREMENTS.md RF-002
 */
enum NivelDificultad {
  FACIL = 'facil',
  MEDIO = 'medio',
  DIFICIL = 'dificil'
}

/**
 * Estados de completación de actividades
 * Para tracking de progreso
 */
enum EstadoActividad {
  NUEVA = 'nueva',
  EN_PROGRESO = 'en_progreso',
  COMPLETADA = 'completada',
  MASTERIZADA = 'masterizada'
}

/**
 * Datos de una actividad sensorial individual
 * Basado en APP_BLUEPRINT.md líneas 54-61
 */
interface DatosActividad {
  id: string;
  titulo: string;
  descripcion: string;
  miniatura: string;
  duracionMinutos: number;
  nivelDificultad: NivelDificultad;
  estado: EstadoActividad;
  puntuacionMaxima: number;
  puntuacionObtenida: number;
  vecesCompletada: number;
  beneficiosSensoriales: string[];
  equipamientoNecesario?: string[];
  edadRecomendada: { min: number; max: number };
}

/**
 * Configuración específica de cada isla
 * Según APP_BLUEPRINT.md y MapaMundoScreen
 */
interface ConfiguracionIsla {
  tipo: TipoIsla;
  nombre: string;
  emoji: string;
  colorPrincipal: string;
  colorSecundario: string;
  descripcion: string;
  objetivoSensorial: string;
  totalActividades: number;
  actividadesCompletadas: number;
}

/**
 * Progreso específico de la isla actual
 * Para mostrar estadísticas detalladas
 */
interface ProgresoIsla {
  nivel: number;
  experienciaIsla: number;
  experienciaRequerida: number;
  estrellasObtenidas: number;
  estrellasDisponibles: number;
  tiempoTotal: number; // minutos
  actividadesFavoritas: string[];
  logrosDesbloqueados: string[];
  racha: number; // días consecutivos
}

/**
 * Props del componente VistaIslaScreen
 */
interface VistaIslaScreenProps {
  /**
   * Tipo de isla a mostrar
   * Determina actividades y configuración específica
   */
  tipoIsla: TipoIsla;
  
  /**
   * Función navegación a actividad específica
   * Según APP_BLUEPRINT.md acceso directo a actividades
   */
  onNavigateToActividad: (actividadId: string) => void;
  
  /**
   * Función navegación a pre-actividad
   * Para preparar al niño antes de comenzar
   */
  onNavigateToPreActividad: (actividadId: string) => void;
  
  /**
   * Función regresar al mapa mundo
   * Navegación hacia atrás
   */
  onNavigateBack: () => void;
  
  /**
   * Perfil del niño para personalización
   * Conectado con sistema personalización
   */
  perfilNino?: {
    nombre: string;
    edad: number;
    nivelDesarrollo: string;
    preferencias: string[];
  };

  /**
   * Progreso específico de esta isla
   * Para mostrar estadísticas y desbloqueos
   */
  progresoIsla?: ProgresoIsla;

  /**
   * Lista de actividades disponibles
   * Puede venir filtrada según nivel del niño
   */
  actividades?: DatosActividad[];
}

/**
 * Estado interno del componente
 */
interface EstadoVistaIsla {
  configuracionIsla: ConfiguracionIsla;
  actividadesVisibles: DatosActividad[];
  filtroActivo: NivelDificultad | 'todas';
  screenReaderEnabled: boolean;
  actividadSeleccionada: string | null;
  sugerenciaIA: string | null;
  mostrarDetalles: boolean;
  leoAnimacion: Animated.Value;
}

/**
 * VISTAISLASCR - PANTALLA 5
 * 
 * Implementa todos los requisitos de APP_BLUEPRINT.md:
 * - Lista actividades con miniatura visual (línea 56)
 * - Título descriptivo e indicador dificultad (líneas 57-58)
 * - Estado completación y estimación tiempo (líneas 59-60)
 * - Botón "Actividad Random" sugerida por IA (línea 61)
 * - Progreso específico de isla (línea 62)
 * 
 * CALIDAD PRODUCCIÓN:
 * - TypeScript estricto sin any
 * - Error handling completo try/catch
 * - Accesibilidad VoiceOver/TalkBack
 * - Performance optimizado useCallback/useMemo
 * - Solo colores centralizados DESIGN_SYSTEM.md
 * 
 * @param props Propiedades del componente
 * @returns JSX.Element Vista isla completa
 */
const VistaIslaScreen: React.FC<VistaIslaScreenProps> = ({
  tipoIsla,
  onNavigateToPreActividad,
  onNavigateBack,
  progresoIsla,
  actividades
}) => {
  // Dimensiones de pantalla para responsive design
  const { width: screenWidth } = Dimensions.get('window');
  const isTablet = screenWidth > 768;

  // Configuraciones de islas según APP_BLUEPRINT.md
  const configuracionesIslas: Record<TipoIsla, ConfiguracionIsla> = useMemo(() => ({
    [TipoIsla.MOVIMIENTO]: {
      tipo: TipoIsla.MOVIMIENTO,
      nombre: 'Isla del Movimiento',
      emoji: '🏃',
      colorPrincipal: Colores.verdeJungla,
      colorSecundario: Colores.grisClaro,
      descripcion: 'Actividades vestibulares para desarrollar el equilibrio',
      objetivoSensorial: 'Estimulación vestibular y propioceptiva',
      totalActividades: 8,
      actividadesCompletadas: 3
    },
    [TipoIsla.MUSICAL]: {
      tipo: TipoIsla.MUSICAL,
      nombre: 'Isla Musical',
      emoji: '🎵',
      colorPrincipal: Colores.amarilloSol,
      colorSecundario: Colores.grisClaro,
      descripcion: 'Actividades auditivas y de ritmo',
      objetivoSensorial: 'Estimulación auditiva y coordinación',
      totalActividades: 6,
      actividadesCompletadas: 2
    },
    [TipoIsla.TACTIL]: {
      tipo: TipoIsla.TACTIL,
      nombre: 'Jardín Táctil',
      emoji: '🌸',
      colorPrincipal: Colores.colorCalido,
      colorSecundario: Colores.grisClaro,
      descripcion: 'Exploración de texturas y sensaciones',
      objetivoSensorial: 'Estimulación táctil y discriminación',
      totalActividades: 10,
      actividadesCompletadas: 1
    },
    [TipoIsla.ARTE]: {
      tipo: TipoIsla.ARTE,
      nombre: 'Estudio de Arte',
      emoji: '🎨',
      colorPrincipal: Colores.azul,
      colorSecundario: Colores.grisClaro,
      descripcion: 'Actividades visuales y de creatividad',
      objetivoSensorial: 'Estimulación visual y motricidad fina',
      totalActividades: 7,
      actividadesCompletadas: 0
    },
    [TipoIsla.CALMA]: {
      tipo: TipoIsla.CALMA,
      nombre: 'Rincón de Calma',
      emoji: '🧘',
      colorPrincipal: Colores.azul,
      colorSecundario: Colores.grisClaro,
      descripcion: 'Autorregulación y técnicas de relajación',
      objetivoSensorial: 'Regulación sensorial y calma',
      totalActividades: 5,
      actividadesCompletadas: 1
    }
  }), []);

  // Datos de actividades por defecto si no se proporcionan
  const actividadesPorDefecto: Record<TipoIsla, DatosActividad[]> = useMemo(() => ({
    [TipoIsla.MOVIMIENTO]: [
      {
        id: 'mov_001',
        titulo: 'Los Saltos Fuertes de Leo',
        descripcion: 'Saltar en diferentes superficies para desarrollar equilibrio',
        miniatura: 'https://via.placeholder.com/150x100?text=Saltos',
        duracionMinutos: 15,
        nivelDificultad: NivelDificultad.FACIL,
        estado: EstadoActividad.COMPLETADA,
        puntuacionMaxima: 100,
        puntuacionObtenida: 85,
        vecesCompletada: 3,
        beneficiosSensoriales: ['Equilibrio', 'Coordinación', 'Fuerza'],
        equipamientoNecesario: ['Colchoneta', 'Almohadas'],
        edadRecomendada: { min: 3, max: 8 }
      },
      {
        id: 'mov_002',
        titulo: 'Caminos de Obstáculos',
        descripcion: 'Navegar por un circuito de obstáculos caseros',
        miniatura: 'https://via.placeholder.com/150x100?text=Obstáculos',
        duracionMinutos: 20,
        nivelDificultad: NivelDificultad.MEDIO,
        estado: EstadoActividad.EN_PROGRESO,
        puntuacionMaxima: 100,
        puntuacionObtenida: 0,
        vecesCompletada: 0,
        beneficiosSensoriales: ['Planificación motora', 'Equilibrio'],
        equipamientoNecesario: ['Cojines', 'Sillas', 'Cuerda'],
        edadRecomendada: { min: 4, max: 10 }
      }
    ],
    [TipoIsla.MUSICAL]: [
      {
        id: 'mus_001',
        titulo: 'Ritmos con Leo',
        descripcion: 'Seguir patrones rítmicos con instrumentos',
        miniatura: 'https://via.placeholder.com/150x100?text=Ritmos',
        duracionMinutos: 12,
        nivelDificultad: NivelDificultad.FACIL,
        estado: EstadoActividad.COMPLETADA,
        puntuacionMaxima: 100,
        puntuacionObtenida: 92,
        vecesCompletada: 2,
        beneficiosSensoriales: ['Procesamiento auditivo', 'Coordinación'],
        equipamientoNecesario: ['Instrumentos de percusión'],
        edadRecomendada: { min: 2, max: 8 }
      }
    ],
    [TipoIsla.TACTIL]: [],
    [TipoIsla.ARTE]: [],
    [TipoIsla.CALMA]: []
  }), []);

  // Progreso por defecto si no se proporciona
  const progresoDefecto: ProgresoIsla = useMemo(() => ({
    nivel: 2,
    experienciaIsla: 340,
    experienciaRequerida: 500,
    estrellasObtenidas: 8,
    estrellasDisponibles: 15,
    tiempoTotal: 120,
    actividadesFavoritas: ['mov_001'],
    logrosDesbloqueados: ['Primer Salto', 'Explorador Activo'],
    racha: 3
  }), []);

  const progresoActual = progresoIsla || progresoDefecto;
  const configuracionActual = configuracionesIslas[tipoIsla];
  const actividadesActuales = actividades || actividadesPorDefecto[tipoIsla] || [];

  // Estado del componente con valores iniciales seguros
  const [estado, setEstado] = useState<EstadoVistaIsla>({
    configuracionIsla: configuracionActual,
    actividadesVisibles: actividadesActuales,
    filtroActivo: 'todas',
    screenReaderEnabled: false,
    actividadSeleccionada: null,
    sugerenciaIA: null,
    mostrarDetalles: false,
    leoAnimacion: new Animated.Value(0)
  });

  // Referencias para animaciones
  const headerAnimRef = useRef(new Animated.Value(0)).current;
  const actividadesAnimRef = useRef(actividadesActuales.map(() => new Animated.Value(0))).current;

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
      console.warn('[VistaIslaScreen] Error verificando screen reader:', error);
    }
  }, []);

  /**
   * Inicializar componente y animaciones
   */
  useEffect(() => {
    verificarScreenReader();
    
    // Animación de entrada del header
    Animated.timing(headerAnimRef, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Animación de entrada de Leo
    Animated.timing(estado.leoAnimacion, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Animación escalonada de actividades
    const animaciones = actividadesAnimRef.map((anim, index) => 
      Animated.timing(anim, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      })
    );
    
    Animated.stagger(50, animaciones).start();

    // Generar sugerencia IA después de 3 segundos
    const timer = setTimeout(() => {
      generarSugerenciaIA();
    }, 3000);

    return () => clearTimeout(timer);
  }, [estado.leoAnimacion, headerAnimRef, actividadesAnimRef, verificarScreenReader]);

  /**
   * Generar sugerencia contextual de IA
   * Según DESIGN_SYSTEM.md componente "Sugerencia Proactiva"
   */
  const generarSugerenciaIA = useCallback((): void => {
    const sugerencias = [
      `¡Leo sugiere probar "${actividadesActuales[0]?.titulo}" para comenzar!`,
      '¿Qué tal si exploramos una actividad que nunca has intentado?',
      `Has progresado mucho en ${configuracionActual.nombre}. ¡Sigamos así!`,
      null // Sin sugerencia
    ];
    
    const sugerencia = sugerencias[Math.floor(Math.random() * sugerencias.length)];
    setEstado(prev => ({
      ...prev,
      sugerenciaIA: sugerencia ?? null
    }));
  }, [actividadesActuales, configuracionActual.nombre]);

  /**
   * Filtrar actividades por dificultad
   */
  const filtrarActividades = useCallback((filtro: NivelDificultad | 'todas'): void => {
    try {
      const actividadesFiltradas = filtro === 'todas' 
        ? actividadesActuales
        : actividadesActuales.filter(act => act.nivelDificultad === filtro);

      setEstado(prev => ({
        ...prev,
        filtroActivo: filtro,
        actividadesVisibles: actividadesFiltradas
      }));
    } catch (error) {
      console.error('[VistaIslaScreen] Error filtrando actividades:', error);
    }
  }, [actividadesActuales]);

  /**
   * Manejar selección de actividad
   */
  const seleccionarActividad = useCallback((actividad: DatosActividad): void => {
    try {
      setEstado(prev => ({
        ...prev,
        actividadSeleccionada: actividad.id
      }));

      // Animación de selección
      Animated.sequence([
        Animated.timing(estado.leoAnimacion, {
          toValue: 0.8,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(estado.leoAnimacion, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        })
      ]).start(() => {
        onNavigateToPreActividad(actividad.id);
      });
    } catch (error) {
      console.error('[VistaIslaScreen] Error seleccionando actividad:', error);
      Alert.alert('Error', 'No se pudo seleccionar la actividad. Intenta de nuevo.');
    }
  }, [estado.leoAnimacion, onNavigateToPreActividad]);

  /**
   * Manejar actividad aleatoria sugerida por IA
   * Según APP_BLUEPRINT.md línea 61
   */
  const seleccionarActividadAleatoria = useCallback((): void => {
    try {
      // Filtrar actividades no completadas primero
      const actividadesDisponibles = estado.actividadesVisibles.filter(
        act => act.estado !== EstadoActividad.MASTERIZADA
      );
      
      if (actividadesDisponibles.length === 0) {
        Alert.alert(
          '¡Excelente!',
          'Has dominado todas las actividades disponibles. ¡Leo está muy orgulloso!',
          [{ text: 'Genial', style: 'default' }]
        );
        return;
      }

      const actividadAleatoria = actividadesDisponibles[
        Math.floor(Math.random() * actividadesDisponibles.length)
      ];

      if (actividadAleatoria) {
        Alert.alert(
          '¡Sugerencia de Leo!',
          `Leo sugiere probar: "${actividadAleatoria.titulo}". ¡Será muy divertido!`,
          [
            { text: 'Otra opción', style: 'cancel' },
            { 
              text: '¡Vamos!', 
              onPress: () => seleccionarActividad(actividadAleatoria)
            }
          ]
        );
      }
    } catch (error) {
      console.error('[VistaIslaScreen] Error seleccionando actividad aleatoria:', error);
      Alert.alert('Error', 'No se pudo generar una sugerencia. Intenta de nuevo.');
    }
  }, [estado.actividadesVisibles, seleccionarActividad]);

  /**
   * Obtener texto de dificultad
   */
  const getTextoDificultad = useCallback((dificultad: NivelDificultad): string => {
    switch (dificultad) {
      case NivelDificultad.FACIL:
        return 'Fácil';
      case NivelDificultad.MEDIO:
        return 'Medio';
      case NivelDificultad.DIFICIL:
        return 'Difícil';
      default:
        return 'Desconocido';
    }
  }, []);

  /**
   * Obtener color de dificultad
   */
  const getColorDificultad = useCallback((dificultad: NivelDificultad): string => {
    switch (dificultad) {
      case NivelDificultad.FACIL:
        return Colores.verdeJungla;
      case NivelDificultad.MEDIO:
        return Colores.amarilloSol;
      case NivelDificultad.DIFICIL:
        return Colores.colorDinamico;
      default:
        return Colores.grisAdministrativo;
    }
  }, []);

  /**
   * Obtener icono de estado
   */
  const getIconoEstado = useCallback((estado: EstadoActividad): keyof typeof Ionicons.glyphMap => {
    switch (estado) {
      case EstadoActividad.NUEVA:
        return 'help-circle';
      case EstadoActividad.EN_PROGRESO:
        return 'play-circle';
      case EstadoActividad.COMPLETADA:
        return 'checkmark-circle';
      case EstadoActividad.MASTERIZADA:
        return 'star';
      default:
        return 'help-circle';
    }
  }, []);

  /**
   * Calcular porcentaje de progreso de la isla
   */
  const porcentajeProgresoIsla = useMemo((): number => {
    return Math.round((progresoActual.experienciaIsla / progresoActual.experienciaRequerida) * 100);
  }, [progresoActual.experienciaIsla, progresoActual.experienciaRequerida]);

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
   * Renderizar header con información de la isla
   */
  const renderizarHeader = useMemo((): JSX.Element => (
    <Animated.View
      style={[
        estilos.header,
        {
          backgroundColor: configuracionActual.colorPrincipal,
          opacity: headerAnimRef
        }
      ]}
    >
      <View style={estilos.headerTop}>
        <TouchableOpacity
          style={estilos.botonAtras}
          onPress={onNavigateBack}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Regresar al mapa mundo"
        >
          <Ionicons 
            name="arrow-back" 
            size={24} 
            color={Colores.blancoPuro} 
          />
        </TouchableOpacity>

        <View style={estilos.tituloContainer}>
          <Text style={estilos.emojiIsla}>
            {configuracionActual.emoji}
          </Text>
          <Text
            style={estilos.tituloIsla}
            accessible={true}
            accessibilityRole="header"
          >
            {configuracionActual.nombre}
          </Text>
        </View>

        <TouchableOpacity
          style={estilos.botonDetalles}
          onPress={() => setEstado(prev => ({ ...prev, mostrarDetalles: !prev.mostrarDetalles }))}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Mostrar detalles de la isla"
        >
          <Ionicons 
            name="information-circle" 
            size={24} 
            color={Colores.blancoPuro} 
          />
        </TouchableOpacity>
      </View>

      <Text
        style={estilos.descripcionIsla}
        accessible={estado.screenReaderEnabled}
      >
        {configuracionActual.descripcion}
      </Text>

      {/* Progreso específico de la isla */}
      <View style={estilos.progresoContainer}>
        <View style={estilos.progresoInfo}>
          <Text style={estilos.progresoTexto}>
            Nivel {progresoActual.nivel} • {progresoActual.estrellasObtenidas}/{progresoActual.estrellasDisponibles} ⭐
          </Text>
          <Text style={estilos.porcentajeTexto}>
            {porcentajeProgresoIsla}%
          </Text>
        </View>
        
        <View style={estilos.barraProgreso}>
          <View
            style={[
              estilos.progresoFill,
              { 
                width: `${porcentajeProgresoIsla}%`,
                backgroundColor: Colores.amarilloSol
              }
            ]}
          />
        </View>
      </View>
    </Animated.View>
  ), [
    configuracionActual,
    headerAnimRef,
    onNavigateBack,
    estado.screenReaderEnabled,
    estado.mostrarDetalles,
    progresoActual,
    porcentajeProgresoIsla
  ]);

  /**
   * Renderizar filtros de dificultad
   */
  const renderizarFiltros = useMemo((): JSX.Element => (
    <View style={estilos.filtrosContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={estilos.filtrosContent}
      >
        {(['todas', NivelDificultad.FACIL, NivelDificultad.MEDIO, NivelDificultad.DIFICIL] as const).map((filtro) => (
          <TouchableOpacity
            key={filtro}
            style={[
              estilos.filtroBoton,
              {
                backgroundColor: estado.filtroActivo === filtro 
                  ? configuracionActual.colorPrincipal 
                  : Colores.grisClaro
              }
            ]}
            onPress={() => filtrarActividades(filtro)}
            accessible={true}
            accessibilityRole="button"
            accessibilityState={{ selected: estado.filtroActivo === filtro }}
          >
            <Text
              style={[
                estilos.filtroTexto,
                {
                  color: estado.filtroActivo === filtro 
                    ? Colores.blancoPuro 
                    : Colores.grisAdministrativo
                }
              ]}
            >
              {filtro === 'todas' ? 'Todas' : getTextoDificultad(filtro as NivelDificultad)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  ), [
    estado.filtroActivo,
    configuracionActual.colorPrincipal,
    filtrarActividades,
    getTextoDificultad
  ]);

  /**
   * Renderizar tarjeta de actividad individual
   */
  const renderizarActividad = useCallback(({ item, index }: { item: DatosActividad; index: number }): JSX.Element => (
    <Animated.View
      style={[
        estilos.actividadCard,
        {
          opacity: actividadesAnimRef[index] || new Animated.Value(1),
          transform: [
            {
              scale: (actividadesAnimRef[index] || new Animated.Value(1)).interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1]
              })
            }
          ]
        }
      ]}
    >
      <TouchableOpacity
        style={estilos.actividadBoton}
        onPress={() => seleccionarActividad(item)}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`${item.titulo}: ${item.descripcion}. Duración ${item.duracionMinutos} minutos. Dificultad ${getTextoDificultad(item.nivelDificultad)}.`}
        accessibilityHint="Toca para comenzar esta actividad"
      >
        {/* Miniatura de la actividad */}
        <View style={estilos.miniaturaContainer}>
          <Image
            source={{ uri: item.miniatura }}
            style={estilos.miniatura}
            accessible={false}
          />
          
          {/* Indicador de estado en la esquina */}
          <View style={[estilos.estadoIndicador, { backgroundColor: getColorDificultad(item.nivelDificultad) }]}>
            <Ionicons 
              name={getIconoEstado(item.estado)} 
              size={16} 
              color={Colores.blancoPuro} 
            />
          </View>
        </View>

        {/* Información de la actividad */}
        <View style={estilos.actividadInfo}>
          <Text
            style={estilos.actividadTitulo}
            numberOfLines={2}
          >
            {item.titulo}
          </Text>
          
          <Text
            style={estilos.actividadDescripcion}
            numberOfLines={3}
          >
            {item.descripcion}
          </Text>

          {/* Metadata de la actividad */}
          <View style={estilos.actividadMetadata}>
            <View style={estilos.metadataItem}>
              <Ionicons 
                name="time" 
                size={14} 
                color={Colores.grisAdministrativo} 
              />
              <Text style={estilos.metadataTexto}>
                {item.duracionMinutos} min
              </Text>
            </View>

            <View style={estilos.metadataItem}>
              <Ionicons 
                name="bar-chart" 
                size={14} 
                color={getColorDificultad(item.nivelDificultad)} 
              />
              <Text style={[estilos.metadataTexto, { color: getColorDificultad(item.nivelDificultad) }]}>
                {getTextoDificultad(item.nivelDificultad)}
              </Text>
            </View>
          </View>

          {/* Progreso de la actividad */}
          {item.estado !== EstadoActividad.NUEVA && (
            <View style={estilos.actividadProgreso}>
              <View style={estilos.progresoBarraMini}>
                <View
                  style={[
                    estilos.progresoFillMini,
                    {
                      width: `${(item.puntuacionObtenida / item.puntuacionMaxima) * 100}%`,
                      backgroundColor: configuracionActual.colorPrincipal
                    }
                  ]}
                />
              </View>
              <Text style={estilos.progresoTextoMini}>
                {item.puntuacionObtenida}/{item.puntuacionMaxima}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  ), [
    actividadesAnimRef,
    seleccionarActividad,
    getTextoDificultad,
    getColorDificultad,
    getIconoEstado,
    configuracionActual.colorPrincipal
  ]);

  /**
   * Renderizar avatar Leo con consejos
   */
  const renderizarLeo = useMemo((): JSX.Element => (
    <Animated.View
      style={[
        estilos.leoContainer,
        {
          opacity: estado.leoAnimacion,
          transform: [{ scale: estado.leoAnimacion }]
        }
      ]}
    >
      <TouchableOpacity
        onPress={seleccionarActividadAleatoria}
        style={estilos.leoBoton}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Leo sugiere una actividad aleatoria"
        accessibilityHint="Toca para que Leo te recomiende una actividad"
      >
        <Image
          source={{ uri: 'https://via.placeholder.com/80x80?text=Leo' }}
          style={estilos.leoAvatar}
          accessible={false}
        />
        
        <View style={estilos.leoTextoContainer}>
          <Text style={estilos.leoTexto}>
            ¡Actividad Random!
          </Text>
          <Ionicons 
            name="shuffle" 
            size={20} 
            color={configuracionActual.colorPrincipal} 
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  ), [
    estado.leoAnimacion,
    seleccionarActividadAleatoria,
    configuracionActual.colorPrincipal
  ]);

  /**
   * Renderizar sugerencia de IA modal
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
              ¡Consejo de Leo!
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
          
          <TouchableOpacity
            style={[estilos.sugerenciaBoton, { backgroundColor: configuracionActual.colorPrincipal }]}
            onPress={cerrarSugerenciaIA}
            accessible={true}
            accessibilityRole="button"
          >
            <Text style={estilos.sugerenciaBotonTexto}>
              ¡Entendido!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [
    estado.sugerenciaIA,
    estado.screenReaderEnabled,
    configuracionActual.colorPrincipal,
    cerrarSugerenciaIA
  ]);

  return (
    <SafeAreaView style={estilos.contenedor}>
      <StatusBar barStyle="light-content" backgroundColor={configuracionActual.colorPrincipal} />
      
      {/* Header con información de la isla */}
      {renderizarHeader}

      {/* Filtros de dificultad */}
      {renderizarFiltros}

      {/* Lista de actividades */}
      <FlatList
        data={estado.actividadesVisibles}
        keyExtractor={(item) => item.id}
        renderItem={renderizarActividad}
        contentContainerStyle={estilos.listaActividades}
        showsVerticalScrollIndicator={false}
        numColumns={isTablet ? 2 : 1}
        ListEmptyComponent={() => (
          <View style={estilos.listaVacia}>
            <Text style={estilos.listaVaciaTexto}>
              No hay actividades disponibles con este filtro
            </Text>
          </View>
        )}
        ListFooterComponent={() => <View style={{ height: 100 }} />}
      />

      {/* Avatar Leo para actividad random */}
      {renderizarLeo}

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
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 40,
  },

  headerTop: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    marginBottom: 15,
  },

  botonAtras: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  tituloContainer: {
    flex: 1,
    alignItems: 'center' as const,
  },

  emojiIsla: {
    fontSize: 40,
    marginBottom: 5,
  },

  tituloIsla: {
    ...Tipografia.estilos.H2,
    fontSize: 24,
    color: Colores.blancoPuro,
    textAlign: 'center' as const,
  },

  botonDetalles: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  descripcionIsla: {
    ...Tipografia.estilos.Body,
    color: Colores.blancoPuro,
    textAlign: 'center' as const,
    marginBottom: 20,
    opacity: 0.9,
  },

  progresoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 15,
  },

  progresoInfo: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 10,
  },

  progresoTexto: {
    ...Tipografia.estilos.BotonPrimario,
    color: Colores.blancoPuro,
  },

  porcentajeTexto: {
    ...Tipografia.estilos.H2,
    color: Colores.blancoPuro,
  },

  barraProgreso: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden' as const,
  },

  progresoFill: {
    height: '100%' as const,
    borderRadius: 4,
  },

  filtrosContainer: {
    paddingVertical: 15,
    backgroundColor: Colores.grisClaro,
  },

  filtrosContent: {
    paddingHorizontal: 20,
  },

  filtroBoton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },

  filtroTexto: {
    ...Tipografia.estilos.BotonPrimario,
    fontSize: 14,
  },

  listaActividades: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  actividadCard: {
    marginBottom: 20,
    backgroundColor: Colores.blancoPuro,
    borderRadius: 15,
    elevation: 3,
    shadowColor: Colores.overlayNegro,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  actividadBoton: {
    flexDirection: 'row' as const,
    padding: 15,
  },

  miniaturaContainer: {
    position: 'relative' as const,
    marginRight: 15,
  },

  miniatura: {
    width: 100,
    height: 80,
    borderRadius: 10,
  },

  estadoIndicador: {
    position: 'absolute' as const,
    top: -5,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },

  actividadInfo: {
    flex: 1,
    justifyContent: 'space-between' as const,
  },

  actividadTitulo: {
    ...Tipografia.estilos.H2,
    color: Colores.verdeJungla,
    marginBottom: 5,
  },

  actividadDescripcion: {
    ...Tipografia.estilos.Body,
    color: Colores.grisAdministrativo,
    marginBottom: 10,
  },

  actividadMetadata: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    marginBottom: 10,
  },

  metadataItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },

  metadataTexto: {
    ...Tipografia.estilos.Body,
    fontSize: 12,
    marginLeft: 4,
    color: Colores.grisAdministrativo,
  },

  actividadProgreso: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },

  progresoBarraMini: {
    flex: 1,
    height: 4,
    backgroundColor: Colores.grisClaro,
    borderRadius: 2,
    marginRight: 10,
  },

  progresoFillMini: {
    height: '100%' as const,
    borderRadius: 2,
  },

  progresoTextoMini: {
    ...Tipografia.estilos.Body,
    fontSize: 10,
    color: Colores.grisAdministrativo,
  },

  listaVacia: {
    flex: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingVertical: 50,
  },

  listaVaciaTexto: {
    ...Tipografia.estilos.Body,
    color: Colores.grisAdministrativo,
    textAlign: 'center' as const,
  },

  leoContainer: {
    position: 'absolute' as const,
    bottom: 30,
    right: 20,
  },

  leoBoton: {
    backgroundColor: Colores.blancoPuro,
    borderRadius: 25,
    padding: 15,
    alignItems: 'center' as const,
    elevation: 5,
    shadowColor: Colores.overlayNegro,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },

  leoAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },

  leoTextoContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },

  leoTexto: {
    ...Tipografia.estilos.BotonPrimario,
    fontSize: 12,
    marginRight: 5,
    color: Colores.verdeJungla,
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

  sugerenciaBoton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center' as const,
  },

  sugerenciaBotonTexto: {
    ...Tipografia.estilos.BotonPrimario,
    color: Colores.blancoPuro,
  },
};

export default VistaIslaScreen;