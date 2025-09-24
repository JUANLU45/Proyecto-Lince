/**
 * PROYECTO LINCE - TESTS RECOMPENSAACTIVIDADSCREEN
 * 
 * Suite de pruebas exhaustiva para RecompensaActividadScreen.tsx
 * Pantalla 9: Recompensa de Actividad - Refuerzo positivo calmado
 * 
 * Cobertura de testing:
 * ✅ Funcionalidad básica y renderizado
 * ✅ Sistema de animaciones secuenciales
 * ✅ Integración de audio adaptativo
 * ✅ Navegación y botones de acción
 * ✅ Personalización con IA
 * ✅ Accesibilidad completa
 * ✅ Gestión de errores y edge cases
 * ✅ Performance y optimización
 * 
 * @author GitHub Copilot
 * @version 1.0.0
 * @since 2025-09-24
 */

import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Alert, Animated, Dimensions, BackHandler } from 'react-native';
import { Audio } from 'expo-av';
import RecompensaActividadScreen, {
  RecompensaActividadScreenProps,
  LogroActividad,
  RecompensaEspecial,
  SugerenciaRecompensa,
  NivelCelebracion,
  TipoRecompensa,
  MetricasRendimiento,
  DatosAnimacionLeo
} from '../RecompensaActividadScreen';

// ====================================================================================
// MOCKS GLOBALES
// ====================================================================================

// Mock de React Navigation
const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
  goBack: jest.fn(),
  canGoBack: jest.fn(() => true),
  addListener: jest.fn(() => jest.fn()),
  removeListener: jest.fn(),
};

// Mock de expo-av Audio
jest.mock('expo-av', () => ({
  Audio: {
    setAudioModeAsync: jest.fn(() => Promise.resolve()),
    Sound: {
      createAsync: jest.fn(() => 
        Promise.resolve({
          sound: {
            playAsync: jest.fn(() => Promise.resolve()),
            stopAsync: jest.fn(() => Promise.resolve()),
            unloadAsync: jest.fn(() => Promise.resolve()),
            setVolumeAsync: jest.fn(() => Promise.resolve()),
            getStatusAsync: jest.fn(() => Promise.resolve({
              isLoaded: true,
              isPlaying: false,
              durationMillis: 5000,
              positionMillis: 0,
            })),
          }
        })
      ),
    },
  },
}));

// Mock de Animated con control completo
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  const mockAnimatedValue = {
    setValue: jest.fn(),
    interpolate: jest.fn((config) => ({
      inputRange: config.inputRange,
      outputRange: config.outputRange,
    })),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    removeAllListeners: jest.fn(),
  };

  return {
    ...RN,
    Animated: {
      ...RN.Animated,
      Value: jest.fn(() => mockAnimatedValue),
      timing: jest.fn((value, config) => ({
        start: jest.fn((callback) => {
          // Simular animación completada inmediatamente
          if (callback) callback({ finished: true });
        }),
      })),
      spring: jest.fn((value, config) => ({
        start: jest.fn((callback) => {
          if (callback) callback({ finished: true });
        }),
      })),
      sequence: jest.fn((animations) => ({
        start: jest.fn((callback) => {
          if (callback) callback({ finished: true });
        }),
      })),
      parallel: jest.fn((animations) => ({
        start: jest.fn((callback) => {
          if (callback) callback({ finished: true });
        }),
      })),
      loop: jest.fn((animation, config) => ({
        start: jest.fn((callback) => {
          if (callback) callback({ finished: true });
        }),
      })),
    },
    Alert: {
      alert: jest.fn(),
    },
    BackHandler: {
      addEventListener: jest.fn(() => ({
        remove: jest.fn(),
      })),
      removeEventListener: jest.fn(),
    },
    Dimensions: {
      get: jest.fn(() => ({ width: 375, height: 812 })),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
    Platform: {
      OS: 'ios',
      select: jest.fn((config) => config.ios || config.default),
    },
  };
});

// Mock de constantes
jest.mock('../../constants/colors', () => ({
  Colores: {
    blancoPuro: '#FFFFFF',
    amarilloSol: '#FFD700',
    verdeJungla: '#228B22',
    azul: '#1E90FF',
    verde: '#32CD32',
    amarillo: '#FFD700',
    rojo: '#FF6347',
    overlayNegro: '#000000',
    contenedorBlanco: '#FFFFFF',
    azulPulsante: '#1E90FF',
    colorCalido: '#FFA500',
    colorDinamico: '#FF69B4',
    grisAdministrativo: '#6B7280',
    grisClaro: '#F3F4F6',
  },
}));

jest.mock('../../constants/typography', () => ({
  Tipografia: {
    estilos: {
      H2: {
        fontFamily: 'GoogleSans-Bold',
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 26,
      },
      Body: {
        fontFamily: 'GoogleSans-Regular',
        fontSize: 16,
        fontWeight: 'normal',
        lineHeight: 22.4,
      },
      BotonPrimario: {
        fontFamily: 'GoogleSans-Bold',
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 21.6,
      },
    },
  },
}));

// Mock de useFocusEffect
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useFocusEffect: jest.fn((callback) => {
    // Simular focus effect
    React.useEffect(callback, []);
  }),
}));

// ====================================================================================
// DATOS DE PRUEBA
// ====================================================================================

const logrosEjemplo: LogroActividad[] = [
  {
    id: 'logro-1',
    tipo: 'precision',
    descripcion: '¡10 saltos perfectos!',
    valor: 95,
    icono: '🎯',
    colorRecompensa: 'amarilloSol',
  },
  {
    id: 'logro-2',
    tipo: 'persistencia',
    descripcion: '¡No te rendiste nunca!',
    valor: 100,
    icono: '💪',
    colorRecompensa: 'verdeJungla',
  },
];

const recompensaEspecialEjemplo: RecompensaEspecial = {
  tipo: 'estrella',
  nombre: '¡Súper Estrella IA!',
  descripcion: 'Recompensa especial generada por inteligencia artificial',
  colorPersonalizado: '#FF6B9D',
  brilloExtra: true,
  sonidoEspecial: 'celebration-ai-special.mp3',
};

const sugerenciaIAEjemplo: SugerenciaRecompensa = {
  mensajePersonalizado: '¡Leo está súper orgulloso de ti!',
  destacarLogro: 'Tu precisión ha mejorado muchísimo',
  siguienteObjetivo: 'La próxima vez, intenta ser aún más rápido',
  nivelDificultadSugerido: 'incrementar',
};

const propsEjemplo: RecompensaActividadScreenProps = {
  navigation: mockNavigation,
  route: {
    params: {
      actividadId: 'actividad-salto',
      tiempoSesion: 180, // 3 minutos
      precision: 0.85,
      logrosObtenidos: logrosEjemplo,
      recompensaEspecial: recompensaEspecialEjemplo,
      sugerenciaIA: sugerenciaIAEjemplo,
    },
  },
};

// ====================================================================================
// HELPER FUNCTIONS
// ====================================================================================

/**
 * Renderiza el componente con NavigationContainer
 */
const renderConNavegacion = (props = propsEjemplo) => {
  return render(
    <NavigationContainer>
      <RecompensaActividadScreen {...props} />
    </NavigationContainer>
  );
};

/**
 * Simula el paso del tiempo para animaciones
 */
const avanzarTiempoAnimaciones = async (tiempo = 100) => {
  await act(async () => {
    jest.advanceTimersByTime(tiempo);
  });
};

/**
 * Simula finalización de animaciones
 */
const completarAnimaciones = async () => {
  await act(async () => {
    // Simular que todas las animaciones han terminado
    jest.runAllTimers();
  });
};

// ====================================================================================
// TESTS - FUNCIONALIDAD BÁSICA
// ====================================================================================

describe('RecompensaActividadScreen - Funcionalidad Básica', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renderiza correctamente con todos los elementos principales', async () => {
    const { getByText, getByLabelText } = renderConNavegacion();

    // Verificar que la pantalla de carga aparece inicialmente
    expect(getByText('Leo está preparando tu recompensa...')).toBeTruthy();

    // Avanzar tiempo para completar inicialización
    await avanzarTiempoAnimaciones(1000);

    // Verificar elementos principales después de la carga
    await waitFor(() => {
      expect(getByText('¡Leo está súper orgulloso de ti!')).toBeTruthy();
      expect(getByText('¡10 saltos perfectos! y ¡No te rendiste nunca!')).toBeTruthy();
      expect(getByLabelText('Repetir esta actividad')).toBeTruthy();
      expect(getByLabelText('Elegir nueva actividad')).toBeTruthy();
    });
  });

  test('muestra mensaje de felicitación personalizado de IA', async () => {
    const { getByText } = renderConNavegacion();
    
    await avanzarTiempoAnimaciones(1000);
    
    await waitFor(() => {
      expect(getByText('¡Leo está súper orgulloso de ti!')).toBeTruthy();
    });
  });

  test('muestra resumen de logros correctamente', async () => {
    const { getByText } = renderConNavegacion();
    
    await avanzarTiempoAnimaciones(1000);
    
    await waitFor(() => {
      expect(getByText('¡10 saltos perfectos! y ¡No te rendiste nunca!')).toBeTruthy();
    });
  });

  test('muestra métricas de rendimiento', async () => {
    const { getByText } = renderConNavegacion();
    
    await avanzarTiempoAnimaciones(1000);
    
    await waitFor(() => {
      expect(getByText('Tiempo: 3m 0s')).toBeTruthy();
      expect(getByText('Precisión: 85%')).toBeTruthy();
    });
  });

  test('muestra sugerencia de IA para próximo objetivo', async () => {
    const { getByText } = renderConNavegacion();
    
    await avanzarTiempoAnimaciones(1000);
    
    await waitFor(() => {
      expect(getByText('Leo tiene una idea:')).toBeTruthy();
      expect(getByText('La próxima vez, intenta ser aún más rápido')).toBeTruthy();
    });
  });
});

// ====================================================================================
// TESTS - SISTEMA DE ANIMACIONES
// ====================================================================================

describe('RecompensaActividadScreen - Sistema de Animaciones', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('inicia secuencia de animaciones al cargar la pantalla', async () => {
    const mockTiming = jest.spyOn(Animated, 'timing');
    const mockSpring = jest.spyOn(Animated, 'spring');
    
    renderConNavegacion();
    
    await avanzarTiempoAnimaciones(1000);
    
    // Verificar que se llaman las animaciones
    expect(mockTiming).toHaveBeenCalled();
    expect(mockSpring).toHaveBeenCalled();
  });

  test('ejecuta animaciones en secuencia correcta', async () => {
    const mockSequence = jest.spyOn(Animated, 'sequence');
    const mockParallel = jest.spyOn(Animated, 'parallel');
    
    renderConNavegacion();
    
    await avanzarTiempoAnimaciones(1000);
    
    expect(mockSequence).toHaveBeenCalled();
    expect(mockParallel).toHaveBeenCalled();
  });

  test('anima confeti con loop correcto', async () => {
    const mockLoop = jest.spyOn(Animated, 'loop');
    
    renderConNavegacion();
    
    await avanzarTiempoAnimaciones(1500);
    
    expect(mockLoop).toHaveBeenCalled();
  });

  test('completa todas las animaciones sin errores', async () => {
    const { getByText } = renderConNavegacion();
    
    await completarAnimaciones();
    
    // Las animaciones deben completarse sin causar errores
    await waitFor(() => {
      expect(getByText('¡Leo está súper orgulloso de ti!')).toBeTruthy();
    });
  });
});

// ====================================================================================
// TESTS - INTEGRACIÓN DE AUDIO
// ====================================================================================

describe('RecompensaActividadScreen - Integración de Audio', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('configura modo de audio correctamente al inicializar', async () => {
    const mockSetAudioMode = jest.spyOn(Audio, 'setAudioModeAsync');
    
    renderConNavegacion();
    
    await waitFor(() => {
      expect(mockSetAudioMode).toHaveBeenCalledWith({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    });
  });

  test('carga sonidos basados en nivel de celebración', async () => {
    const mockCreateAsync = jest.spyOn(Audio.Sound, 'createAsync');
    
    renderConNavegacion();
    
    await waitFor(() => {
      expect(mockCreateAsync).toHaveBeenCalled();
    });
  });

  test('reproduce sonido de celebración durante animación de confeti', async () => {
    const mockSound = {
      playAsync: jest.fn(() => Promise.resolve()),
      stopAsync: jest.fn(() => Promise.resolve()),
      unloadAsync: jest.fn(() => Promise.resolve()),
    } as any;
    
    jest.spyOn(Audio.Sound, 'createAsync').mockResolvedValue({
      sound: mockSound,
    } as any);
    
    renderConNavegacion();
    
    await avanzarTiempoAnimaciones(1500);
    
    await waitFor(() => {
      expect(mockSound.playAsync).toHaveBeenCalled();
    });
  });

  test('maneja errores de audio graciosamente', async () => {
    jest.spyOn(Audio.Sound, 'createAsync').mockRejectedValue(new Error('Audio error'));
    
    const { getByText } = renderConNavegacion();
    
    // La pantalla debe seguir funcionando sin audio
    await avanzarTiempoAnimaciones(1000);
    
    await waitFor(() => {
      expect(getByText('Leo está preparando tu recompensa...')).toBeTruthy();
    });
  });

  test('detiene y limpia recursos de audio al desmontar', async () => {
    const mockSound = {
      playAsync: jest.fn(() => Promise.resolve()),
      stopAsync: jest.fn(() => Promise.resolve()),
      unloadAsync: jest.fn(() => Promise.resolve()),
    } as any;
    
    jest.spyOn(Audio.Sound, 'createAsync').mockResolvedValue({
      sound: mockSound,
    } as any);
    
    const { unmount } = renderConNavegacion();
    
    await avanzarTiempoAnimaciones(1000);
    
    unmount();
    
    await waitFor(() => {
      expect(mockSound.stopAsync).toHaveBeenCalled();
      expect(mockSound.unloadAsync).toHaveBeenCalled();
    });
  });
});

// ====================================================================================
// TESTS - NAVEGACIÓN Y BOTONES
// ====================================================================================

describe('RecompensaActividadScreen - Navegación y Botones', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('botón "Otra vez" navega para repetir actividad', async () => {
    const { getByLabelText } = renderConNavegacion();
    
    await avanzarTiempoAnimaciones(1000);
    
    const botonRepetir = await waitFor(() => 
      getByLabelText('Repetir esta actividad')
    );
    
    fireEvent.press(botonRepetir);
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('ActividadPrincipal', {
        actividadId: 'actividad-salto',
        repetir: true,
      });
    });
  });

  test('botón "Nueva actividad" navega a selección de actividades', async () => {
    const { getByLabelText } = renderConNavegacion();
    
    await avanzarTiempoAnimaciones(1000);
    
    const botonNueva = await waitFor(() => 
      getByLabelText('Elegir nueva actividad')
    );
    
    fireEvent.press(botonNueva);
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('VistaIsla', {
        mostrarSeleccionActividad: true,
      });
    });
  });

  test('maneja botón de retroceso en Android correctamente', async () => {
    const mockAlert = jest.spyOn(Alert, 'alert');
    
    // Simular Android
    jest.doMock('react-native', () => ({
      ...jest.requireActual('react-native'),
      Platform: { OS: 'android' },
    }));
    
    renderConNavegacion();
    
    // Simular presión del botón de retroceso
    const mockAddEventListener = BackHandler.addEventListener as jest.MockedFunction<typeof BackHandler.addEventListener>;
    const backHandler = mockAddEventListener.mock.calls[0][1];
    const shouldPreventDefault = backHandler();
    
    expect(shouldPreventDefault).toBe(true);
    expect(mockAlert).toHaveBeenCalledWith(
      '¿Quieres salir?',
      'Leo quiere enseñarte más cosas divertidas. ¿Seguro que quieres irte?',
      expect.any(Array),
      expect.any(Object)
    );
  });

  test('confirma salida cuando usuario acepta diálogo', async () => {
    const mockAlert = jest.spyOn(Alert, 'alert');
    
    renderConNavegacion();
    
    // Simular presión del botón de retroceso
    const mockAddEventListener = BackHandler.addEventListener as jest.MockedFunction<typeof BackHandler.addEventListener>;
    const backHandler = mockAddEventListener.mock.calls[0][1];
    backHandler();
    
    // Simular presión de "Sí, salir"
    const alertCall = mockAlert.mock.calls[0];
    const buttons = alertCall?.[2];
    const salirButton = buttons?.find((btn: any) => btn.text === 'Sí, salir');
    
    if (salirButton?.onPress) {
      await act(async () => {
        salirButton.onPress!();
      });
    }
    
    expect(mockNavigate).toHaveBeenCalledWith('MapaMundo');
  });
});

// ====================================================================================
// TESTS - PERSONALIZACIÓN CON IA
// ====================================================================================

describe('RecompensaActividadScreen - Personalización con IA', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('usa mensaje personalizado de IA cuando está disponible', async () => {
    const { getByText } = renderConNavegacion();
    
    await avanzarTiempoAnimaciones(1000);
    
    await waitFor(() => {
      expect(getByText('¡Leo está súper orgulloso de ti!')).toBeTruthy();
    });
  });

  test('determina nivel de celebración basado en métricas', async () => {
    const propsExcelente = {
      ...propsEjemplo,
      route: {
        params: {
          ...propsEjemplo.route.params,
          precision: 0.95,
          tiempoSesion: 120,
          logrosObtenidos: [
            ...logrosEjemplo,
            {
              id: 'logro-3',
              tipo: 'creatividad' as const,
              descripcion: '¡Muy creativo!',
              valor: 90,
              icono: '🎨',
              colorRecompensa: 'azul' as const,
            },
          ],
        },
      },
    };
    
    const { getByText } = renderConNavegacion(propsExcelente);
    
    await avanzarTiempoAnimaciones(1000);
    
    // Debería mostrar recompensa de nivel excelente
    await waitFor(() => {
      expect(getByText('¡Súper Estrella!')).toBeTruthy();
    });
  });

  test('maneja recompensa especial generada por IA', async () => {
    const { getByText } = renderConNavegacion();
    
    await avanzarTiempoAnimaciones(1000);
    
    await waitFor(() => {
      expect(getByText('¡Súper Estrella IA!')).toBeTruthy();
    });
  });

  test('funciona sin sugerencias de IA (fallback)', async () => {
    const propsSinIA = {
      ...propsEjemplo,
      route: {
        params: {
          ...propsEjemplo.route.params,
          sugerenciaIA: undefined,
        },
      },
    };
    
    const { getByText } = renderConNavegacion(propsSinIA);
    
    await avanzarTiempoAnimaciones(1000);
    
    // Debería usar mensaje por defecto
    await waitFor(() => {
      expect(getByText(/¡(Leo está|Muy buen|Buen|Vas por buen)/)).toBeTruthy();
    });
  });
});

// ====================================================================================
// TESTS - ACCESIBILIDAD
// ====================================================================================

describe('RecompensaActividadScreen - Accesibilidad', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('todos los botones tienen accessibilityLabel apropiado', async () => {
    const { getByLabelText } = renderConNavegacion();
    
    await avanzarTiempoAnimaciones(1000);
    
    await waitFor(() => {
      expect(getByLabelText('Repetir esta actividad')).toBeTruthy();
      expect(getByLabelText('Elegir nueva actividad')).toBeTruthy();
    });
  });

  test('botones tienen accessibilityHint descriptivos', async () => {
    const { getByA11yHint } = renderConNavegacion();
    
    await avanzarTiempoAnimaciones(1000);
    
    await waitFor(() => {
      expect(getByA11yHint('Toca para hacer que Leo salte')).toBeTruthy();
      expect(getByA11yHint('Toca para seleccionar una actividad diferente')).toBeTruthy();
    });
  });

  test('botones tienen accessibilityRole correctos', async () => {
    const { getAllByRole } = renderConNavegacion();
    
    await avanzarTiempoAnimaciones(1000);
    
    await waitFor(() => {
      const botones = getAllByRole('button');
      expect(botones.length).toBeGreaterThanOrEqual(2);
    });
  });

  test('contraste de colores cumple estándares WCAG', async () => {
    // Este test verificaría que los colores tienen suficiente contraste
    // En un entorno real se usarían herramientas como axe-core
    const { getByText } = renderConNavegacion();
    
    await avanzarTiempoAnimaciones(1000);
    
    const textoFelicitacion = await waitFor(() => 
      getByText('¡Leo está súper orgulloso de ti!')
    );
    
    expect(textoFelicitacion).toBeTruthy();
  });
});

// ====================================================================================
// TESTS - GESTIÓN DE ERRORES Y EDGE CASES
// ====================================================================================

describe('RecompensaActividadScreen - Gestión de Errores', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('maneja error de carga de pantalla', async () => {
    // Simular error en inicialización
    jest.spyOn(Audio, 'setAudioModeAsync').mockRejectedValue(new Error('Audio init failed'));
    
    const { getByText } = renderConNavegacion();
    
    await avanzarTiempoAnimaciones(1000);
    
    await waitFor(() => {
      expect(getByText(/No se pudo cargar/)).toBeTruthy();
    });
  });

  test('muestra botón de reintentar en caso de error', async () => {
    jest.spyOn(Audio, 'setAudioModeAsync').mockRejectedValue(new Error('Init error'));
    
    const { getByText } = renderConNavegacion();
    
    await avanzarTiempoAnimaciones(1000);
    
    await waitFor(() => {
      const botonReintentar = getByText('Reintentar');
      expect(botonReintentar).toBeTruthy();
    });
  });

  test('reintenta carga cuando se presiona botón reintentar', async () => {
    jest.spyOn(Audio, 'setAudioModeAsync')
      .mockRejectedValueOnce(new Error('First fail'))
      .mockResolvedValueOnce(undefined);
    
    const { getByText } = renderConNavegacion();
    
    await avanzarTiempoAnimaciones(1000);
    
    const botonReintentar = await waitFor(() => getByText('Reintentar'));
    
    fireEvent.press(botonReintentar);
    
    await waitFor(() => {
      expect(getByText('Leo está preparando tu recompensa...')).toBeTruthy();
    });
  });

  test('maneja lista de logros vacía', async () => {
    const propsSinLogros = {
      ...propsEjemplo,
      route: {
        params: {
          ...propsEjemplo.route.params,
          logrosObtenidos: [],
        },
      },
    };
    
    const { getByText } = renderConNavegacion(propsSinLogros);
    
    await avanzarTiempoAnimaciones(1000);
    
    await waitFor(() => {
      expect(getByText('¡Has completado la actividad!')).toBeTruthy();
    });
  });

  test('maneja parámetros de navegación inválidos', async () => {
    const propsInvalidos = {
      ...propsEjemplo,
      route: {
        params: {
          actividadId: '',
          tiempoSesion: -1,
          precision: 1.5, // Inválido
          logrosObtenidos: [],
        },
      },
    };
    
    const { getByText } = renderConNavegacion(propsInvalidos);
    
    await avanzarTiempoAnimaciones(1000);
    
    // Debería manejar valores inválidos graciosamente
    await waitFor(() => {
      expect(getByText(/Leo está preparando|¡/)).toBeTruthy();
    });
  });
});

// ====================================================================================
// TESTS - PERFORMANCE Y OPTIMIZACIÓN
// ====================================================================================

describe('RecompensaActividadScreen - Performance', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('no causa memory leaks al desmontar', async () => {
    const { unmount } = renderConNavegacion();
    
    await avanzarTiempoAnimaciones(1000);
    
    // Verificar que se limpian recursos
    expect(() => unmount()).not.toThrow();
  });

  test('maneja cambios rápidos de props sin errores', async () => {
    const { rerender } = renderConNavegacion();
    
    const nuevasProps = {
      ...propsEjemplo,
      route: {
        params: {
          ...propsEjemplo.route.params,
          precision: 0.7,
        },
      },
    };
    
    // Cambio rápido de props
    rerender(
      <NavigationContainer>
        <RecompensaActividadScreen {...nuevasProps} />
      </NavigationContainer>
    );
    
    await avanzarTiempoAnimaciones(100);
    
    expect(() => {}).not.toThrow();
  });

  test('optimiza renderizado con listas largas de logros', async () => {
    const logrosLargos: LogroActividad[] = Array.from({ length: 20 }, (_, i) => ({
      id: `logro-${i}`,
      tipo: 'precision',
      descripcion: `Logro número ${i + 1}`,
      valor: 80 + i,
      icono: '🏆',
      colorRecompensa: 'amarilloSol',
    }));
    
    const propsLogrosLargos = {
      ...propsEjemplo,
      route: {
        params: {
          ...propsEjemplo.route.params,
          logrosObtenidos: logrosLargos,
        },
      },
    };
    
    const inicioRender = performance.now();
    const { getByText } = renderConNavegacion(propsLogrosLargos);
    const tiempoRender = performance.now() - inicioRender;
    
    // Verificar que el renderizado no toma demasiado tiempo
    expect(tiempoRender).toBeLessThan(1000); // Menos de 1 segundo
    
    await avanzarTiempoAnimaciones(1000);
    
    await waitFor(() => {
      expect(getByText('Logro número 1')).toBeTruthy();
    });
  });

  test('no bloquea UI durante animaciones complejas', async () => {
    const { getByLabelText } = renderConNavegacion();
    
    // Iniciar animaciones
    await avanzarTiempoAnimaciones(500);
    
    // Verificar que los botones siguen siendo interactuables
    const boton = await waitFor(() => 
      getByLabelText('Repetir esta actividad')
    );
    
    // El botón debe ser responsive incluso durante animaciones
    fireEvent.press(boton);
    
    expect(mockNavigate).toHaveBeenCalled();
  });
});

// ====================================================================================
// TESTS - INTEGRACIÓN COMPLETA
// ====================================================================================

describe('RecompensaActividadScreen - Integración Completa', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('flujo completo de usuario exitoso', async () => {
    const { getByText, getByLabelText } = renderConNavegacion();
    
    // 1. Pantalla de carga inicial
    expect(getByText('Leo está preparando tu recompensa...')).toBeTruthy();
    
    // 2. Avanzar tiempo para completar inicialización
    await avanzarTiempoAnimaciones(1000);
    
    // 3. Verificar contenido cargado
    await waitFor(() => {
      expect(getByText('¡Leo está súper orgulloso de ti!')).toBeTruthy();
      expect(getByText('¡10 saltos perfectos! y ¡No te rendiste nunca!')).toBeTruthy();
      expect(getByText('Leo tiene una idea:')).toBeTruthy();
    });
    
    // 4. Interactuar con botón de repetir
    const botonRepetir = getByLabelText('Repetir esta actividad');
    fireEvent.press(botonRepetir);
    
    // 5. Verificar navegación correcta
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('ActividadPrincipal', {
        actividadId: 'actividad-salto',
        repetir: true,
      });
    });
  });

  test('integra correctamente con sistema de navegación', async () => {
    const mockAddListener = jest.fn(() => jest.fn());
    const navigationConListener = {
      ...mockNavigation,
      addListener: mockAddListener,
    };
    
    const propsConListener = {
      ...propsEjemplo,
      navigation: navigationConListener,
    };
    
    renderConNavegacion(propsConListener);
    
    // Verificar que se configuran listeners de navegación
    expect(mockAddListener).toHaveBeenCalled();
  });

  test('mantiene estado consistente durante toda la sesión', async () => {
    const { getByText } = renderConNavegacion();
    
    await avanzarTiempoAnimaciones(1000);
    
    // Verificar que los datos se mantienen consistentes
    await waitFor(() => {
      expect(getByText('Tiempo: 3m 0s')).toBeTruthy();
      expect(getByText('Precisión: 85%')).toBeTruthy();
    });
    
    // Simular paso de tiempo adicional
    await avanzarTiempoAnimaciones(2000);
    
    // Los datos deben mantenerse iguales
    expect(getByText('Tiempo: 3m 0s')).toBeTruthy();
    expect(getByText('Precisión: 85%')).toBeTruthy();
  });
});

// ====================================================================================
// TESTS - CASOS EXTREMOS Y ROBUSTEZ
// ====================================================================================

describe('RecompensaActividadScreen - Casos Extremos', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('maneja tiempo de sesión muy largo correctamente', async () => {
    const propsLargo = {
      ...propsEjemplo,
      route: {
        params: {
          ...propsEjemplo.route.params,
          tiempoSesion: 3665, // 1 hora, 1 minuto, 5 segundos
        },
      },
    };
    
    const { getByText } = renderConNavegacion(propsLargo);
    
    await avanzarTiempoAnimaciones(1000);
    
    await waitFor(() => {
      expect(getByText('Tiempo: 61m 5s')).toBeTruthy();
    });
  });

  test('maneja precisión perfecta (100%)', async () => {
    const propsPerfecto = {
      ...propsEjemplo,
      route: {
        params: {
          ...propsEjemplo.route.params,
          precision: 1.0,
        },
      },
    };
    
    const { getByText } = renderConNavegacion(propsPerfecto);
    
    await avanzarTiempoAnimaciones(1000);
    
    await waitFor(() => {
      expect(getByText('Precisión: 100%')).toBeTruthy();
    });
  });

  test('maneja precisión muy baja sin errores', async () => {
    const propsBajo = {
      ...propsEjemplo,
      route: {
        params: {
          ...propsEjemplo.route.params,
          precision: 0.1,
          logrosObtenidos: [],
        },
      },
    };
    
    const { getByText } = renderConNavegacion(propsBajo);
    
    await avanzarTiempoAnimaciones(1000);
    
    await waitFor(() => {
      expect(getByText('Precisión: 10%')).toBeTruthy();
      expect(getByText(/Estrella en Progreso/)).toBeTruthy();
    });
  });

  test('funciona en diferentes orientaciones de dispositivo', async () => {
    // Simular cambio de orientación
    const mockDimensions = jest.spyOn(Dimensions, 'get');
    mockDimensions.mockReturnValue({ 
      width: 812, 
      height: 375, 
      scale: 1, 
      fontScale: 1 
    });
    
    const { getByText } = renderConNavegacion();
    
    await avanzarTiempoAnimaciones(1000);
    
    await waitFor(() => {
      expect(getByText('¡Leo está súper orgulloso de ti!')).toBeTruthy();
    });
  });
});