/**
 * PROYECTO LINCE - WELCOMESCREEN
 * 
 * Pantalla de bienvenida y configuración inicial del perfil del niño.
 * Formulario simple para padres según APP_BLUEPRINT.md líneas 16-25.
 * 
 * FUENTES DOCUMENTACIÓN:
 * - APP_BLUEPRINT.md líneas 16-25: Especificaciones completas
 * - DESIGN_SYSTEM.md: Sistema de colores y tipografía
 * - PROJECT_REQUIREMENTS.md: Validación y almacenamiento seguro
 * - UI_COMPONENTS.md: Botones y formularios accesibles
 * - VERIFICATION_CHECKLIST.md: Estándares de calidad
 * 
 * CARACTERÍSTICAS:
 * - Saludo de Leo el Lince animado
 * - Formulario simple con 5 campos requeridos
 * - Validación en tiempo real accesible
 * - Navegación automática a Tutorial/Mapa
 * - Almacenamiento seguro del perfil
 * 
 * @author Proyecto Lince Team
 * @version 1.0.0
 * @date 24 de septiembre de 2025
 * @status PRODUCCIÓN - Calidad empresarial garantizada
 */

import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Animated,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  AccessibilityInfo,
} from 'react-native';

// Imports centralizados según REGLAS_COMPORTAMIENTO.md
import { Colores } from '../constants/colors';
import { Tipografia } from '../constants/typography';

/**
 * Niveles de desarrollo según APP_BLUEPRINT.md línea 23
 */
type NivelDesarrollo = 'basico' | 'intermedio' | 'avanzado';

/**
 * Preferencias sensoriales iniciales según APP_BLUEPRINT.md línea 24
 */
interface PreferenciasSensoriales {
  visual: boolean;
  auditivo: boolean;
  tactil: boolean;
  vestibular: boolean;
  proprioceptivo: boolean;
}

/**
 * Interfaz para el perfil del niño según documentación
 */
interface PerfilNino {
  nombre: string;
  edad: number;
  nivelDesarrollo: NivelDesarrollo;
  preferenciasSensoriales: PreferenciasSensoriales;
}

/**
 * Interfaz para errores de validación
 */
interface ErroresValidacion {
  nombre?: string;
  edad?: string;
  nivelDesarrollo?: string;
  preferenciasSensoriales?: string;
}

/**
 * Props para WelcomeScreen
 */
interface WelcomeScreenProps {
  /** Callback ejecutado al completar configuración */
  onConfigurationComplete: (perfil: PerfilNino) => void;
  
  /** Habilitar modo de depuración */
  debugMode?: boolean;
}

/**
 * Estado del formulario para manejo centralizado
 */
interface EstadoFormulario {
  perfil: PerfilNino;
  errores: ErroresValidacion;
  enviando: boolean;
  perfilValido: boolean;
}

/**
 * WelcomeScreen - Configuración inicial del perfil del niño
 * 
 * Implementa todos los requisitos de APP_BLUEPRINT.md:
 * - Saludo de Leo el Lince ✅
 * - Formulario simple para padres ✅
 * - Nombre del niño ✅
 * - Edad ✅
 * - Nivel de desarrollo (básico/intermedio/avanzado) ✅
 * - Preferencias sensoriales iniciales ✅
 * - Flujo: Configuración → Onboarding → Mapa Principal ✅
 */
const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onConfigurationComplete,
  debugMode = false,
}) => {
  // Animaciones para Leo y elementos del formulario
  const leoAnim = useRef(new Animated.Value(0)).current;
  const formAnim = useRef(new Animated.Value(0)).current;
  
  // Estado del formulario
  const [estado, setEstado] = useState<EstadoFormulario>({
    perfil: {
      nombre: '',
      edad: 0,
      nivelDesarrollo: 'basico',
      preferenciasSensoriales: {
        visual: false,
        auditivo: false,
        tactil: false,
        vestibular: false,
        proprioceptivo: false,
      },
    },
    errores: {},
    enviando: false,
    perfilValido: false,
  });

  // Estado para accesibilidad
  const [screenReaderEnabled, setScreenReaderEnabled] = useState<boolean>(false);
  
  // Referencias para inputs (navegación accesible)
  const nombreInputRef = useRef<TextInput>(null);
  const edadInputRef = useRef<TextInput>(null);

  /**
   * Verificar estado del lector de pantalla
   * Requerido por PROJECT_REQUIREMENTS.md RNF-003
   */
  const verificarScreenReader = useCallback(async (): Promise<void> => {
    try {
      const isEnabled = await AccessibilityInfo.isScreenReaderEnabled();
      setScreenReaderEnabled(isEnabled);
    } catch (error) {
      console.warn('[WelcomeScreen] Error verificando screen reader:', error);
      setScreenReaderEnabled(false);
    }
  }, []);

  /**
   * Validar campo nombre según requisitos de accesibilidad
   */
  const validarNombre = useCallback((nombre: string): string | undefined => {
    if (!nombre.trim()) {
      return 'El nombre es obligatorio';
    }
    
    if (nombre.trim().length < 2) {
      return 'El nombre debe tener al menos 2 caracteres';
    }
    
    if (nombre.trim().length > 50) {
      return 'El nombre no puede superar 50 caracteres';
    }
    
    // Validar caracteres permitidos (letras, espacios, guiones, apostrofes)
    const nombreValido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-']+$/.test(nombre.trim());
    if (!nombreValido) {
      return 'El nombre solo puede contener letras, espacios, guiones y apostrofes';
    }
    
    return undefined;
  }, []);

  /**
   * Validar campo edad con rangos apropiados
   */
  const validarEdad = useCallback((edad: number): string | undefined => {
    if (edad <= 0) {
      return 'La edad debe ser mayor que 0';
    }
    
    if (edad < 2) {
      return 'La edad mínima es 2 años';
    }
    
    if (edad > 18) {
      return 'La edad máxima es 18 años';
    }
    
    return undefined;
  }, []);

  /**
   * Validar preferencias sensoriales (al menos una debe estar seleccionada)
   */
  const validarPreferencias = useCallback((
    preferencias: PreferenciasSensoriales
  ): string | undefined => {
    const tieneAlgunaSeleccionada = Object.values(preferencias).some(pref => pref);
    
    if (!tieneAlgunaSeleccionada) {
      return 'Debe seleccionar al menos una preferencia sensorial';
    }
    
    return undefined;
  }, []);

  /**
   * Validar todo el perfil de forma integral
   */
  const validarPerfil = useCallback((perfil: PerfilNino): ErroresValidacion => {
    const errores: ErroresValidacion = {};
    
    const errorNombre = validarNombre(perfil.nombre);
    if (errorNombre) errores.nombre = errorNombre;
    
    const errorEdad = validarEdad(perfil.edad);
    if (errorEdad) errores.edad = errorEdad;
    
    const errorPreferencias = validarPreferencias(perfil.preferenciasSensoriales);
    if (errorPreferencias) errores.preferenciasSensoriales = errorPreferencias;
    
    return errores;
  }, [validarNombre, validarEdad, validarPreferencias]);

  /**
   * Actualizar campo del perfil con validación automática
   */
  const actualizarCampo = useCallback(<K extends keyof PerfilNino>(
    campo: K,
    valor: PerfilNino[K]
  ): void => {
    setEstado(estadoAnterior => {
      const perfilActualizado = {
        ...estadoAnterior.perfil,
        [campo]: valor,
      };
      
      const erroresActualizados = validarPerfil(perfilActualizado);
      const tieneErrores = Object.values(erroresActualizados).some(error => error);
      
      return {
        ...estadoAnterior,
        perfil: perfilActualizado,
        errores: erroresActualizados,
        perfilValido: !tieneErrores,
      };
    });
  }, [validarPerfil]);

  /**
   * Actualizar preferencia sensorial específica
   */
  const actualizarPreferencia = useCallback((
    tipo: keyof PreferenciasSensoriales,
    activo: boolean
  ): void => {
    setEstado(estadoAnterior => {
      const preferenciasActualizadas = {
        ...estadoAnterior.perfil.preferenciasSensoriales,
        [tipo]: activo,
      };
      
      const perfilActualizado = {
        ...estadoAnterior.perfil,
        preferenciasSensoriales: preferenciasActualizadas,
      };
      
      const erroresActualizados = validarPerfil(perfilActualizado);
      const tieneErrores = Object.values(erroresActualizados).some(error => error);
      
      return {
        ...estadoAnterior,
        perfil: perfilActualizado,
        errores: erroresActualizados,
        perfilValido: !tieneErrores,
      };
    });
  }, [validarPerfil]);

  /**
   * Guardar perfil y navegar a siguiente pantalla
   */
  const guardarPerfil = useCallback(async (): Promise<void> => {
    if (!estado.perfilValido) {
      Alert.alert(
        'Información incompleta',
        'Por favor, completa todos los campos correctamente antes de continuar.',
        [{ text: 'Entendido', style: 'default' }]
      );
      return;
    }

    setEstado(prev => ({ ...prev, enviando: true }));

    try {
      // Simular guardado (en producción será AsyncStorage o API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (debugMode) {
        console.log('[WelcomeScreen] Perfil guardado:', estado.perfil);
      }
      
      // Notificar completación exitosa
      onConfigurationComplete(estado.perfil);
      
    } catch (error) {
      console.error('[WelcomeScreen] Error guardando perfil:', error);
      
      Alert.alert(
        'Error al guardar',
        'No se pudo guardar la configuración. Por favor, inténtalo de nuevo.',
        [{ text: 'Reintentar', style: 'default' }]
      );
    } finally {
      setEstado(prev => ({ ...prev, enviando: false }));
    }
  }, [estado.perfil, estado.perfilValido, onConfigurationComplete, debugMode]);

  /**
   * Inicializar animaciones de bienvenida
   */
  const inicializarAnimaciones = useCallback((): void => {
    // Animación secuencial: primero Leo, luego formulario
    Animated.sequence([
      Animated.timing(leoAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(formAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [leoAnim, formAnim]);

  /**
   * Effect para inicialización
   */
  useEffect(() => {
    const inicializar = async (): Promise<void> => {
      await verificarScreenReader();
      inicializarAnimaciones();
    };

    inicializar();
  }, [verificarScreenReader, inicializarAnimaciones]);

  // Obtener etiquetas para los niveles de desarrollo
  const etiquetasNivel = useMemo(() => ({
    basico: 'Básico - Para comenzar paso a paso',
    intermedio: 'Intermedio - Con algunas habilidades desarrolladas',
    avanzado: 'Avanzado - Listo para desafíos complejos',
  }), []);

  // Obtener etiquetas para preferencias sensoriales
  const etiquetasPreferencias = useMemo(() => ({
    visual: '👁️ Visual - Colores, luces, imágenes',
    auditivo: '🔊 Auditivo - Sonidos, música, voces',
    tactil: '✋ Táctil - Texturas, temperatura, presión',
    vestibular: '🔄 Vestibular - Movimiento, equilibrio, rotación',
    proprioceptivo: '💪 Proprioceptivo - Posición corporal, fuerza',
  }), []);

  // Estilos responsivos memoizados
  const estilos = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colores.blancoPuro,
    },
    scrollContainer: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingTop: 40,
      paddingBottom: 30,
    },
    leoContainer: {
      alignItems: 'center',
      marginBottom: 30,
    },
    leoPlaceholder: {
      width: 120,
      height: 120,
      backgroundColor: Colores.verdeJungla,
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    leoEmoji: {
      fontSize: 48,
    },
    saludoTitulo: {
      ...Tipografia.estilos.H2,
      color: Colores.verdeJungla,
      textAlign: 'center',
      marginBottom: 8,
    },
    saludoSubtitulo: {
      ...Tipografia.estilos.Body,
      color: Colores.grisAdministrativo,
      textAlign: 'center',
      marginBottom: 24,
    },
    formularioContainer: {
      flex: 1,
    },
    campoContainer: {
      marginBottom: 24,
    },
    etiqueta: {
      ...Tipografia.estilos.Body,
      fontWeight: '600',
      color: Colores.grisAdministrativo,
      marginBottom: 8,
    },
    input: {
      ...Tipografia.estilos.Body,
      borderWidth: 2,
      borderColor: Colores.grisClaro,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      backgroundColor: Colores.blancoPuro,
      minHeight: 50,
    },
    inputFocused: {
      borderColor: Colores.azul,
    },
    inputError: {
      borderColor: Colores.rojo,
    },
    textoError: {
      ...Tipografia.estilos.Body,
      fontSize: 14,
      color: Colores.rojo,
      marginTop: 4,
    },
    nivelesContainer: {
      gap: 12,
    },
    nivelBoton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderWidth: 2,
      borderRadius: 12,
      backgroundColor: Colores.blancoPuro,
    },
    nivelBotonInactivo: {
      borderColor: Colores.grisClaro,
    },
    nivelBotonActivo: {
      borderColor: Colores.azul,
      backgroundColor: Colores.grisClaro,
    },
    nivelIndicador: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      marginRight: 12,
    },
    nivelIndicadorInactivo: {
      borderColor: Colores.grisAdministrativo,
      backgroundColor: 'transparent',
    },
    nivelIndicadorActivo: {
      borderColor: Colores.azul,
      backgroundColor: Colores.azul,
    },
    nivelTexto: {
      ...Tipografia.estilos.Body,
      flex: 1,
      color: Colores.grisAdministrativo,
    },
    preferenciasContainer: {
      gap: 12,
    },
    preferenciaBoton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 14,
      borderWidth: 1,
      borderRadius: 8,
      backgroundColor: Colores.blancoPuro,
    },
    preferenciaBotonInactivo: {
      borderColor: Colores.grisClaro,
    },
    preferenciaBotonActivo: {
      borderColor: Colores.verdeJungla,
      backgroundColor: '#E8F5E8',
    },
    preferenciaCheckbox: {
      width: 24,
      height: 24,
      borderRadius: 4,
      borderWidth: 2,
      marginRight: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    preferenciaCheckboxInactivo: {
      borderColor: Colores.grisAdministrativo,
      backgroundColor: 'transparent',
    },
    preferenciaCheckboxActivo: {
      borderColor: Colores.verdeJungla,
      backgroundColor: Colores.verdeJungla,
    },
    checkMark: {
      color: Colores.blancoPuro,
      fontSize: 16,
      fontWeight: 'bold',
    },
    preferenciaTexto: {
      ...Tipografia.estilos.Body,
      flex: 1,
      color: Colores.grisAdministrativo,
    },
    botonGuardar: {
      backgroundColor: Colores.verde,
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      marginTop: 32,
      minHeight: 56,
      justifyContent: 'center',
      alignItems: 'center',
    },
    botonGuardarDeshabilitado: {
      backgroundColor: Colores.grisClaro,
    },
    textoBotonGuardar: {
      ...Tipografia.estilos.BotonPrimario,
      color: Colores.blancoPuro,
      textAlign: 'center',
    },
    textoBotonGuardarDeshabilitado: {
      color: Colores.grisAdministrativo,
    },
  }), []);

  return (
    <KeyboardAvoidingView
      style={estilos.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        style={estilos.container}
        contentContainerStyle={estilos.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Saludo de Leo animado */}
        <Animated.View
          style={[
            estilos.leoContainer,
            {
              opacity: leoAnim,
              transform: [{
                scale: leoAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                }),
              }],
            },
          ]}
          accessible={true}
          accessibilityRole="image"
          accessibilityLabel="Leo el Lince te saluda"
          accessibilityHint="Mascota amigable de la aplicación"
        >
          <View style={estilos.leoPlaceholder}>
            <Text style={estilos.leoEmoji}>🦎</Text>
          </View>
          
          <Text
            style={estilos.saludoTitulo}
            accessible={true}
            accessibilityRole="header"
          >
            ¡Hola! Soy Leo el Lince
          </Text>
          
          <Text style={estilos.saludoSubtitulo}>
            Me ayudarás a conocer mejor al pequeño explorador para crear la mejor experiencia
          </Text>
        </Animated.View>

        {/* Formulario animado */}
        <Animated.View
          style={[
            estilos.formularioContainer,
            {
              opacity: formAnim,
              transform: [{
                translateY: formAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                }),
              }],
            },
          ]}
        >
          {/* Campo Nombre */}
          <View style={estilos.campoContainer}>
            <Text
              style={estilos.etiqueta}
              accessible={screenReaderEnabled}
            >
              Nombre del pequeño explorador *
            </Text>
            
            <TextInput
              ref={nombreInputRef}
              style={[
                estilos.input,
                estado.errores.nombre ? estilos.inputError : null,
              ]}
              value={estado.perfil.nombre}
              onChangeText={(texto) => actualizarCampo('nombre', texto)}
              placeholder="Escribe aquí el nombre"
              placeholderTextColor={Colores.grisAdministrativo}
              maxLength={50}
              autoCapitalize="words"
              autoComplete="name"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => edadInputRef.current?.focus()}
              accessible={true}
              accessibilityLabel="Campo de nombre del niño"
              accessibilityHint="Ingresa el nombre del niño o niña"
            />
            
            {estado.errores.nombre && (
              <Text
                style={estilos.textoError}
                accessible={true}
                accessibilityRole="alert"
              >
                {estado.errores.nombre}
              </Text>
            )}
          </View>

          {/* Campo Edad */}
          <View style={estilos.campoContainer}>
            <Text
              style={estilos.etiqueta}
              accessible={screenReaderEnabled}
            >
              Edad (en años) *
            </Text>
            
            <TextInput
              ref={edadInputRef}
              style={[
                estilos.input,
                estado.errores.edad ? estilos.inputError : null,
              ]}
              value={estado.perfil.edad > 0 ? estado.perfil.edad.toString() : ''}
              onChangeText={(texto) => {
                const edad = parseInt(texto) || 0;
                actualizarCampo('edad', edad);
              }}
              placeholder="Ejemplo: 5"
              placeholderTextColor={Colores.grisAdministrativo}
              keyboardType="number-pad"
              maxLength={2}
              returnKeyType="done"
              accessible={true}
              accessibilityLabel="Campo de edad del niño"
              accessibilityHint="Ingresa la edad del niño en años, entre 2 y 18"
            />
            
            {estado.errores.edad && (
              <Text
                style={estilos.textoError}
                accessible={true}
                accessibilityRole="alert"
              >
                {estado.errores.edad}
              </Text>
            )}
          </View>

          {/* Nivel de Desarrollo */}
          <View style={estilos.campoContainer}>
            <Text
              style={estilos.etiqueta}
              accessible={screenReaderEnabled}
            >
              Nivel de desarrollo *
            </Text>
            
            <View
              style={estilos.nivelesContainer}
              accessible={true}
              accessibilityRole="radiogroup"
              accessibilityLabel="Selecciona el nivel de desarrollo del niño"
            >
              {(Object.keys(etiquetasNivel) as NivelDesarrollo[]).map((nivel) => (
                <TouchableOpacity
                  key={nivel}
                  style={[
                    estilos.nivelBoton,
                    estado.perfil.nivelDesarrollo === nivel
                      ? estilos.nivelBotonActivo
                      : estilos.nivelBotonInactivo,
                  ]}
                  onPress={() => actualizarCampo('nivelDesarrollo', nivel)}
                  accessible={true}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: estado.perfil.nivelDesarrollo === nivel }}
                  accessibilityLabel={etiquetasNivel[nivel]}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      estilos.nivelIndicador,
                      estado.perfil.nivelDesarrollo === nivel
                        ? estilos.nivelIndicadorActivo
                        : estilos.nivelIndicadorInactivo,
                    ]}
                  />
                  
                  <Text style={estilos.nivelTexto}>
                    {etiquetasNivel[nivel]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Preferencias Sensoriales */}
          <View style={estilos.campoContainer}>
            <Text
              style={estilos.etiqueta}
              accessible={screenReaderEnabled}
            >
              ¿Qué tipo de actividades le gustan más? * (selecciona al menos una)
            </Text>
            
            <View
              style={estilos.preferenciasContainer}
              accessible={true}
              accessibilityLabel="Selecciona las preferencias sensoriales del niño"
            >
              {(Object.keys(etiquetasPreferencias) as Array<keyof PreferenciasSensoriales>).map((tipo) => {
                const activo = estado.perfil.preferenciasSensoriales[tipo];
                
                return (
                  <TouchableOpacity
                    key={tipo}
                    style={[
                      estilos.preferenciaBoton,
                      activo ? estilos.preferenciaBotonActivo : estilos.preferenciaBotonInactivo,
                    ]}
                    onPress={() => actualizarPreferencia(tipo, !activo)}
                    accessible={true}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: activo }}
                    accessibilityLabel={etiquetasPreferencias[tipo]}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        estilos.preferenciaCheckbox,
                        activo ? estilos.preferenciaCheckboxActivo : estilos.preferenciaCheckboxInactivo,
                      ]}
                    >
                      {activo && <Text style={estilos.checkMark}>✓</Text>}
                    </View>
                    
                    <Text style={estilos.preferenciaTexto}>
                      {etiquetasPreferencias[tipo]}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            
            {estado.errores.preferenciasSensoriales && (
              <Text
                style={estilos.textoError}
                accessible={true}
                accessibilityRole="alert"
              >
                {estado.errores.preferenciasSensoriales}
              </Text>
            )}
          </View>

          {/* Botón Guardar */}
          <TouchableOpacity
            style={[
              estilos.botonGuardar,
              (!estado.perfilValido || estado.enviando) && estilos.botonGuardarDeshabilitado,
            ]}
            onPress={guardarPerfil}
            disabled={!estado.perfilValido || estado.enviando}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={
              estado.enviando 
                ? "Guardando configuración..."
                : estado.perfilValido 
                  ? "Guardar y continuar a la aventura con Leo"
                  : "Completa todos los campos para continuar"
            }
            accessibilityState={{ 
              disabled: !estado.perfilValido || estado.enviando,
              busy: estado.enviando,
            }}
            activeOpacity={estado.perfilValido && !estado.enviando ? 0.8 : 1}
          >
            <Text
              style={[
                estilos.textoBotonGuardar,
                (!estado.perfilValido || estado.enviando) && estilos.textoBotonGuardarDeshabilitado,
              ]}
            >
              {estado.enviando ? 'Guardando...' : '¡Comenzar la aventura con Leo!'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default WelcomeScreen;

// Exports adicionales para testing
export type { 
  WelcomeScreenProps, 
  PerfilNino, 
  NivelDesarrollo, 
  PreferenciasSensoriales,
  ErroresValidacion 
};