/**
 * PROYECTO LINCE - TESTS WELCOMESCREEN
 * 
 * Suite completa de tests para verificar funcionalidad del formulario
 * de configuración inicial según documentación.
 * 
 * COBERTURA:
 * - Renderizado según APP_BLUEPRINT.md líneas 16-25
 * - Validación de formulario según PROJECT_REQUIREMENTS.md
 * - Accesibilidad según RNF-003
 * - Flujo completo de configuración
 * - Estados de error y recuperación
 * 
 * @author Proyecto Lince Team
 * @version 1.0.0
 * @date 24 de septiembre de 2025
 */

import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { AccessibilityInfo, Alert } from 'react-native';

import WelcomeScreen from '../WelcomeScreen';
import type { 
  WelcomeScreenProps, 
  PerfilNino, 
  NivelDesarrollo, 
  PreferenciasSensoriales 
} from '../WelcomeScreen';

// Mocks necesarios
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    AccessibilityInfo: {
      isScreenReaderEnabled: jest.fn().mockResolvedValue(false),
    },
    Alert: {
      alert: jest.fn(),
    },
    Animated: {
      ...RN.Animated,
      timing: jest.fn(() => ({
        start: jest.fn((callback) => callback && callback()),
      })),
      sequence: jest.fn((animations) => ({
        start: jest.fn((callback) => callback && callback()),
      })),
    },
  };
});

describe('WelcomeScreen', () => {
  // Props base para tests
  const propsBase: WelcomeScreenProps = {
    onConfigurationComplete: jest.fn(),
    debugMode: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Renderizado según APP_BLUEPRINT.md líneas 16-25', () => {
    it('debe mostrar saludo de Leo el Lince', () => {
      const { getByText, getByLabelText } = render(<WelcomeScreen {...propsBase} />);
      
      // Verificar saludo según APP_BLUEPRINT.md línea 19
      expect(getByText('¡Hola! Soy Leo el Lince')).toBeTruthy();
      expect(getByLabelText('Leo el Lince te saluda')).toBeTruthy();
      expect(getByText('🦎')).toBeTruthy(); // Placeholder Leo
    });

    it('debe mostrar formulario con todos los campos requeridos', () => {
      const { getByText, getByLabelText } = render(<WelcomeScreen {...propsBase} />);
      
      // Verificar campos según APP_BLUEPRINT.md líneas 21-24
      expect(getByText('Nombre del pequeño explorador *')).toBeTruthy();
      expect(getByText('Edad (en años) *')).toBeTruthy();
      expect(getByText('Nivel de desarrollo *')).toBeTruthy();
      expect(getByText(/¿Qué tipo de actividades le gustan más\?/)).toBeTruthy();
      
      // Verificar campos de formulario accesibles
      expect(getByLabelText('Campo de nombre del niño')).toBeTruthy();
      expect(getByLabelText('Campo de edad del niño')).toBeTruthy();
    });

    it('debe mostrar las tres opciones de nivel de desarrollo', () => {
      const { getByText } = render(<WelcomeScreen {...propsBase} />);
      
      // Verificar opciones según APP_BLUEPRINT.md línea 23
      expect(getByText(/Básico - Para comenzar paso a paso/)).toBeTruthy();
      expect(getByText(/Intermedio - Con algunas habilidades desarrolladas/)).toBeTruthy();
      expect(getByText(/Avanzado - Listo para desafíos complejos/)).toBeTruthy();
    });

    it('debe mostrar todas las preferencias sensoriales', () => {
      const { getByText } = render(<WelcomeScreen {...propsBase} />);
      
      // Verificar preferencias según APP_BLUEPRINT.md línea 24
      expect(getByText(/Visual - Colores, luces, imágenes/)).toBeTruthy();
      expect(getByText(/Auditivo - Sonidos, música, voces/)).toBeTruthy();
      expect(getByText(/Táctil - Texturas, temperatura, presión/)).toBeTruthy();
      expect(getByText(/Vestibular - Movimiento, equilibrio, rotación/)).toBeTruthy();
      expect(getByText(/Proprioceptivo - Posición corporal, fuerza/)).toBeTruthy();
    });
  });

  describe('Validación de campos según PROJECT_REQUIREMENTS.md', () => {
    it('debe validar campo nombre correctamente', async () => {
      const { getByLabelText, getByText, queryByText } = render(<WelcomeScreen {...propsBase} />);
      
      const nombreInput = getByLabelText('Campo de nombre del niño');
      
      // Caso: campo vacío
      fireEvent.changeText(nombreInput, '');
      fireEvent(nombreInput, 'blur');
      
      await waitFor(() => {
        expect(getByText('El nombre es obligatorio')).toBeTruthy();
      });
      
      // Caso: nombre muy corto
      fireEvent.changeText(nombreInput, 'A');
      
      await waitFor(() => {
        expect(getByText('El nombre debe tener al menos 2 caracteres')).toBeTruthy();
      });
      
      // Caso: nombre válido
      fireEvent.changeText(nombreInput, 'Ana María');
      
      await waitFor(() => {
        expect(queryByText('El nombre es obligatorio')).toBeNull();
      });
    });

    it('debe validar campo edad correctamente', async () => {
      const { getByLabelText, getByText, queryByText } = render(<WelcomeScreen {...propsBase} />);
      
      const edadInput = getByLabelText('Campo de edad del niño');
      
      // Caso: edad muy baja
      fireEvent.changeText(edadInput, '1');
      
      await waitFor(() => {
        expect(getByText('La edad mínima es 2 años')).toBeTruthy();
      });
      
      // Caso: edad muy alta
      fireEvent.changeText(edadInput, '20');
      
      await waitFor(() => {
        expect(getByText('La edad máxima es 18 años')).toBeTruthy();
      });
      
      // Caso: edad válida
      fireEvent.changeText(edadInput, '5');
      
      await waitFor(() => {
        expect(queryByText('La edad mínima es 2 años')).toBeNull();
      });
    });

    it('debe requerir al menos una preferencia sensorial', async () => {
      const { getByText, queryByText } = render(<WelcomeScreen {...propsBase} />);
      
      // Intentar guardar sin seleccionar preferencias
      const botonGuardar = getByText(/¡Comenzar la aventura con Leo!/);
      
      // El botón debe estar deshabilitado inicialmente
      expect(botonGuardar.props.accessibilityState?.disabled).toBeTruthy();
      
      // Seleccionar una preferencia
      const preferenciaVisual = getByText(/Visual - Colores, luces, imágenes/);
      fireEvent.press(preferenciaVisual);
      
      // Ahora debe permitir continuar (con otros campos válidos)
      await waitFor(() => {
        expect(queryByText('Debe seleccionar al menos una preferencia sensorial')).toBeNull();
      });
    });
  });

  describe('Interacción de formulario', () => {
    it('debe seleccionar nivel de desarrollo correctamente', () => {
      const { getByText } = render(<WelcomeScreen {...propsBase} />);
      
      const nivelIntermedio = getByText(/Intermedio - Con algunas habilidades desarrolladas/);
      fireEvent.press(nivelIntermedio);
      
      // Verificar selección visual (estado activo)
      expect(nivelIntermedio.props.accessibilityState?.selected).toBeTruthy();
    });

    it('debe permitir selección múltiple de preferencias sensoriales', () => {
      const { getByText } = render(<WelcomeScreen {...propsBase} />);
      
      const visualPref = getByText(/Visual - Colores, luces, imágenes/);
      const auditivoPref = getByText(/Auditivo - Sonidos, música, voces/);
      
      // Seleccionar múltiples preferencias
      fireEvent.press(visualPref);
      fireEvent.press(auditivoPref);
      
      // Verificar estados de selección
      expect(visualPref.props.accessibilityState?.checked).toBeTruthy();
      expect(auditivoPref.props.accessibilityState?.checked).toBeTruthy();
      
      // Deseleccionar una
      fireEvent.press(visualPref);
      expect(visualPref.props.accessibilityState?.checked).toBeFalsy();
      expect(auditivoPref.props.accessibilityState?.checked).toBeTruthy();
    });

    it('debe completar formulario válido correctamente', async () => {
      const onComplete = jest.fn();
      const { getByLabelText, getByText } = render(
        <WelcomeScreen {...propsBase} onConfigurationComplete={onComplete} />
      );
      
      // Llenar todos los campos
      const nombreInput = getByLabelText('Campo de nombre del niño');
      fireEvent.changeText(nombreInput, 'María José');
      
      const edadInput = getByLabelText('Campo de edad del niño');
      fireEvent.changeText(edadInput, '6');
      
      // Seleccionar nivel
      const nivelBasico = getByText(/Básico - Para comenzar paso a paso/);
      fireEvent.press(nivelBasico);
      
      // Seleccionar preferencias
      const tactilPref = getByText(/Táctil - Texturas, temperatura, presión/);
      fireEvent.press(tactilPref);
      
      // Esperar a que el botón se habilite
      await waitFor(() => {
        const botonGuardar = getByText(/¡Comenzar la aventura con Leo!/);
        expect(botonGuardar.props.accessibilityState?.disabled).toBeFalsy();
      });
      
      // Guardar configuración
      const botonGuardar = getByText(/¡Comenzar la aventura con Leo!/);
      fireEvent.press(botonGuardar);
      
      // Simular completación del guardado
      await act(async () => {
        jest.advanceTimersByTime(1000);
      });
      
      await waitFor(() => {
        expect(onComplete).toHaveBeenCalledWith({
          nombre: 'María José',
          edad: 6,
          nivelDesarrollo: 'basico',
          preferenciasSensoriales: {
            visual: false,
            auditivo: false,
            tactil: true,
            vestibular: false,
            proprioceptivo: false,
          },
        });
      });
    });
  });

  describe('Accesibilidad según PROJECT_REQUIREMENTS.md RNF-003', () => {
    it('debe verificar estado del screen reader', async () => {
      render(<WelcomeScreen {...propsBase} />);
      
      await waitFor(() => {
        expect(AccessibilityInfo.isScreenReaderEnabled).toHaveBeenCalled();
      });
    });

    it('debe tener roles de accesibilidad correctos', () => {
      const { getByRole } = render(<WelcomeScreen {...propsBase} />);
      
      // Verificar roles semánticos
      expect(getByRole('image')).toBeTruthy(); // Leo el Lince
      expect(getByRole('header')).toBeTruthy(); // Título de saludo
      expect(getByRole('button')).toBeTruthy(); // Botón guardar
    });

    it('debe tener labels descriptivos para screen readers', () => {
      const { getByLabelText } = render(<WelcomeScreen {...propsBase} />);
      
      // Verificar etiquetas descriptivas
      expect(getByLabelText('Leo el Lince te saluda')).toBeTruthy();
      expect(getByLabelText('Campo de nombre del niño')).toBeTruthy();
      expect(getByLabelText('Campo de edad del niño')).toBeTruthy();
    });

    it('debe proporcionar hints de accesibilidad útiles', () => {
      const { getByLabelText } = render(<WelcomeScreen {...propsBase} />);
      
      const nombreInput = getByLabelText('Campo de nombre del niño');
      const edadInput = getByLabelText('Campo de edad del niño');
      
      expect(nombreInput.props.accessibilityHint).toEqual('Ingresa el nombre del niño o niña');
      expect(edadInput.props.accessibilityHint).toEqual('Ingresa la edad del niño en años, entre 2 y 18');
    });
  });

  describe('Animaciones según UI_COMPONENTS.md', () => {
    it('debe inicializar animaciones de Leo y formulario', () => {
      render(<WelcomeScreen {...propsBase} />);
      
      // Verificar que las animaciones se configuraron
      expect(require('react-native').Animated.timing).toHaveBeenCalled();
      expect(require('react-native').Animated.sequence).toHaveBeenCalled();
    });

    it('debe mostrar Leo antes que el formulario', () => {
      render(<WelcomeScreen {...propsBase} />);
      
      // La animación secuencial debe ejecutarse correctamente
      expect(require('react-native').Animated.sequence).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({}), // Animación de Leo
          expect.objectContaining({}), // Animación del formulario
        ])
      );
    });
  });

  describe('Manejo de errores y estados', () => {
    it('debe manejar error en verificación de screen reader', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      (AccessibilityInfo.isScreenReaderEnabled as jest.Mock)
        .mockRejectedValueOnce(new Error('Screen reader error'));

      render(<WelcomeScreen {...propsBase} />);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          '[WelcomeScreen] Error verificando screen reader:',
          expect.any(Error)
        );
      });

      consoleSpy.mockRestore();
    });

    it('debe mostrar alerta si intenta guardar con formulario inválido', async () => {
      const { getByText } = render(<WelcomeScreen {...propsBase} />);
      
      // Intentar guardar con formulario vacío (forzar habilitación para test)
      const botonGuardar = getByText(/¡Comenzar la aventura con Leo!/);
      
      // Simular click en botón deshabilitado (caso edge)
      fireEvent.press(botonGuardar);
      
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Información incompleta',
          'Por favor, completa todos los campos correctamente antes de continuar.',
          [{ text: 'Entendido', style: 'default' }]
        );
      });
    });

    it('debe manejar error al guardar configuración', async () => {
      const onComplete = jest.fn().mockRejectedValueOnce(new Error('Save error'));
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      const { getByLabelText, getByText } = render(
        <WelcomeScreen {...propsBase} onConfigurationComplete={onComplete} />
      );
      
      // Llenar formulario válido
      fireEvent.changeText(getByLabelText('Campo de nombre del niño'), 'Test');
      fireEvent.changeText(getByLabelText('Campo de edad del niño'), '5');
      fireEvent.press(getByText(/Básico - Para comenzar paso a paso/));
      fireEvent.press(getByText(/Visual - Colores, luces, imágenes/));
      
      // Intentar guardar
      await waitFor(() => {
        const boton = getByText(/¡Comenzar la aventura con Leo!/);
        expect(boton.props.accessibilityState?.disabled).toBeFalsy();
      });
      
      const botonGuardar = getByText(/¡Comenzar la aventura con Leo!/);
      fireEvent.press(botonGuardar);
      
      await act(async () => {
        jest.advanceTimersByTime(1000);
      });

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Error al guardar',
          'No se pudo guardar la configuración. Por favor, inténtalo de nuevo.',
          [{ text: 'Reintentar', style: 'default' }]
        );
      });

      consoleErrorSpy.mockRestore();
    });

    it('debe mostrar estado de cargando durante el guardado', async () => {
      const { getByLabelText, getByText } = render(<WelcomeScreen {...propsBase} />);
      
      // Llenar formulario válido
      fireEvent.changeText(getByLabelText('Campo de nombre del niño'), 'Test');
      fireEvent.changeText(getByLabelText('Campo de edad del niño'), '5');
      fireEvent.press(getByText(/Básico - Para comenzar paso a paso/));
      fireEvent.press(getByText(/Visual - Colores, luces, imágenes/));
      
      await waitFor(() => {
        const boton = getByText(/¡Comenzar la aventura con Leo!/);
        expect(boton.props.accessibilityState?.disabled).toBeFalsy();
      });
      
      // Iniciar guardado
      const botonGuardar = getByText(/¡Comenzar la aventura con Leo!/);
      fireEvent.press(botonGuardar);
      
      // Verificar estado de cargando
      expect(getByText('Guardando...')).toBeTruthy();
      expect(botonGuardar.props.accessibilityState?.busy).toBeTruthy();
    });
  });

  describe('Validaciones edge cases', () => {
    it('debe manejar nombres con caracteres especiales válidos', async () => {
      const { getByLabelText, queryByText } = render(<WelcomeScreen {...propsBase} />);
      
      const nombreInput = getByLabelText('Campo de nombre del niño');
      
      // Nombres válidos con caracteres especiales
      const nombresValidos = [
        'José María',
        'Ana-Sofía', 
        "O'Connor",
        'Niño Jesús',
        'María José',
      ];
      
      for (const nombre of nombresValidos) {
        fireEvent.changeText(nombreInput, nombre);
        
        await waitFor(() => {
          expect(queryByText(/solo puede contener/)).toBeNull();
        });
      }
    });

    it('debe rechazar nombres con caracteres inválidos', async () => {
      const { getByLabelText, getByText } = render(<WelcomeScreen {...propsBase} />);
      
      const nombreInput = getByLabelText('Campo de nombre del niño');
      
      // Nombres inválidos
      const nombresInvalidos = [
        'Test123',
        'User@name',
        'Test#Name',
        'Name$',
      ];
      
      for (const nombre of nombresInvalidos) {
        fireEvent.changeText(nombreInput, nombre);
        
        await waitFor(() => {
          expect(getByText(/solo puede contener letras, espacios, guiones y apostrofes/)).toBeTruthy();
        });
      }
    });
  });
});

/**
 * Tests de integración para validar flujo completo
 */
describe('WelcomeScreen - Integración', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('debe completar flujo desde renderizado hasta configuración exitosa', async () => {
    const onComplete = jest.fn();
    
    const { getByLabelText, getByText } = render(
      <WelcomeScreen 
        onConfigurationComplete={onComplete}
        debugMode={true}
      />
    );

    // Verificar renderizado inicial
    expect(getByText('¡Hola! Soy Leo el Lince')).toBeTruthy();

    // Completar formulario paso a paso
    fireEvent.changeText(getByLabelText('Campo de nombre del niño'), 'Integración Test');
    fireEvent.changeText(getByLabelText('Campo de edad del niño'), '7');
    fireEvent.press(getByText(/Intermedio - Con algunas habilidades desarrolladas/));
    fireEvent.press(getByText(/Auditivo - Sonidos, música, voces/));
    fireEvent.press(getByText(/Vestibular - Movimiento, equilibrio, rotación/));

    // Verificar habilitación del botón
    await waitFor(() => {
      const boton = getByText(/¡Comenzar la aventura con Leo!/);
      expect(boton.props.accessibilityState?.disabled).toBeFalsy();
    });

    // Completar configuración
    const botonGuardar = getByText(/¡Comenzar la aventura con Leo!/);
    fireEvent.press(botonGuardar);

    // Simular tiempo de guardado
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    // Verificar llamada con perfil completo
    await waitFor(() => {
      expect(onComplete).toHaveBeenCalledWith({
        nombre: 'Integración Test',
        edad: 7,
        nivelDesarrollo: 'intermedio',
        preferenciasSensoriales: {
          visual: false,
          auditivo: true,
          tactil: false,
          vestibular: true,
          proprioceptivo: false,
        },
      });
    });
  });
});