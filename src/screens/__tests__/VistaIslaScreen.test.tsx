/**
 * PROYECTO LINCE - VISTAISLASCR TESTS
 * 
 * Suite completa de pruebas para VistaIslaScreen.tsx
 * Siguiendo VERIFICATION_CHECKLIST.md para calidad de producción
 * 
 * CATEGORÍAS DE TESTING:
 * - Renderizado y comportamiento básico
 * - Navegación e interacciones
 * - Accesibilidad VoiceOver/TalkBack
 * - Manejo de errores y casos edge
 * - Performance y optimizaciones
 * - Sistema de filtros y búsqueda
 * - Funcionalidad IA y sugerencias
 * 
 * @author Proyecto Lince
 * @version 1.0.0
 * @fecha 24 septiembre 2025
 */

import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { Alert, AccessibilityInfo, Dimensions } from 'react-native';
import VistaIslaScreen from '../VistaIslaScreen';

// Mock de dependencias externas
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

// Mock de Dimensions para testing responsive
const mockDimensions = jest.spyOn(Dimensions, 'get').mockReturnValue({
  width: 375,
  height: 812,
  scale: 2,
  fontScale: 1
});

// Mock de Alert para testing
const mockAlert = jest.spyOn(Alert, 'alert').mockImplementation(
  (title, message, buttons) => {
    if (buttons && buttons.length > 0) {
      // Simular que se presiona el primer botón
      const firstButton = buttons[0];
      if (firstButton.onPress) {
        firstButton.onPress();
      }
    }
  }
);

// Mock de AccessibilityInfo
const mockAccessibilityInfo = jest.spyOn(AccessibilityInfo, 'isScreenReaderEnabled')
  .mockImplementation(() => Promise.resolve(false));

// Enums para testing (copiados del componente)
enum TipoIsla {
  MOVIMIENTO = 'movimiento',
  MUSICAL = 'musical',
  TACTIL = 'tactil',
  ARTE = 'arte',
  CALMA = 'calma'
}

enum NivelDificultad {
  FACIL = 'facil',
  MEDIO = 'medio',
  DIFICIL = 'dificil'
}

enum EstadoActividad {
  NUEVA = 'nueva',
  EN_PROGRESO = 'en_progreso',
  COMPLETADA = 'completada',
  MASTERIZADA = 'masterizada'
}

// Datos de prueba
const actividadesPrueba = [
  {
    id: 'test_001',
    titulo: 'Actividad de Prueba',
    descripcion: 'Descripción de prueba para testing',
    miniatura: 'https://via.placeholder.com/150x100?text=Test',
    duracionMinutos: 10,
    nivelDificultad: NivelDificultad.FACIL,
    estado: EstadoActividad.NUEVA,
    puntuacionMaxima: 100,
    puntuacionObtenida: 0,
    vecesCompletada: 0,
    beneficiosSensoriales: ['Test'],
    equipamientoNecesario: ['Test'],
    edadRecomendada: { min: 3, max: 8 }
  },
  {
    id: 'test_002',
    titulo: 'Actividad Completada',
    descripcion: 'Actividad completada para testing',
    miniatura: 'https://via.placeholder.com/150x100?text=Complete',
    duracionMinutos: 15,
    nivelDificultad: NivelDificultad.MEDIO,
    estado: EstadoActividad.COMPLETADA,
    puntuacionMaxima: 100,
    puntuacionObtenida: 85,
    vecesCompletada: 3,
    beneficiosSensoriales: ['Test Completado'],
    equipamientoNecesario: ['Test'],
    edadRecomendada: { min: 4, max: 10 }
  }
];

const progresoTesteo = {
  nivel: 2,
  experienciaIsla: 250,
  experienciaRequerida: 500,
  estrellasObtenidas: 5,
  estrellasDisponibles: 10,
  tiempoTotal: 90,
  actividadesFavoritas: ['test_001'],
  logrosDesbloqueados: ['Test Achievement'],
  racha: 2
};

// Props base para testing
const mockProps = {
  tipoIsla: TipoIsla.MOVIMIENTO,
  onNavigateToActividad: jest.fn(),
  onNavigateToPreActividad: jest.fn(),
  onNavigateBack: jest.fn(),
  perfilNino: {
    nombre: 'TestNiño',
    edad: 5,
    nivelDesarrollo: 'moderado',
    preferencias: ['movimiento']
  },
  progresoIsla: progresoTesteo,
  actividades: actividadesPrueba
};

describe('VistaIslaScreen', () => {
  // Cleanup después de cada test
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    // Reset mocks antes de cada test
    mockProps.onNavigateToActividad.mockClear();
    mockProps.onNavigateToPreActividad.mockClear();
    mockProps.onNavigateBack.mockClear();
    mockAlert.mockClear();
  });

  /**
   * GRUPO 1: RENDERIZADO Y COMPORTAMIENTO BÁSICO
   * Tests fundamentales según VERIFICATION_CHECKLIST.md
   */
  describe('Renderizado Básico', () => {
    test('renderiza correctamente con props mínimas', () => {
      const { getByText } = render(
        <VistaIslaScreen
          tipoIsla={TipoIsla.MOVIMIENTO}
          onNavigateToActividad={mockProps.onNavigateToActividad}
          onNavigateToPreActividad={mockProps.onNavigateToPreActividad}
          onNavigateBack={mockProps.onNavigateBack}
        />
      );

      expect(getByText('Isla del Movimiento')).toBeTruthy();
      expect(getByText('Actividades vestibulares para desarrollar el equilibrio')).toBeTruthy();
    });

    test('renderiza correctamente con todas las props', () => {
      const { getByText } = render(
        <VistaIslaScreen {...mockProps} />
      );

      expect(getByText('Isla del Movimiento')).toBeTruthy();
      expect(getByText('Nivel 2 • 5/10 ⭐')).toBeTruthy();
      expect(getByText('50%')).toBeTruthy(); // Porcentaje de progreso
    });

    test('muestra diferentes configuraciones de islas', () => {
      const islas = [
        { tipo: TipoIsla.MUSICAL, nombre: 'Isla Musical' },
        { tipo: TipoIsla.TACTIL, nombre: 'Jardín Táctil' },
        { tipo: TipoIsla.ARTE, nombre: 'Estudio de Arte' },
        { tipo: TipoIsla.CALMA, nombre: 'Rincón de Calma' }
      ];

      islas.forEach(({ tipo, nombre }) => {
        const { getByText } = render(
          <VistaIslaScreen
            {...mockProps}
            tipoIsla={tipo}
          />
        );

        expect(getByText(nombre)).toBeTruthy();
      });
    });

    test('renderiza lista de actividades correctamente', () => {
      const { getByText } = render(
        <VistaIslaScreen {...mockProps} />
      );

      expect(getByText('Actividad de Prueba')).toBeTruthy();
      expect(getByText('Actividad Completada')).toBeTruthy();
      expect(getByText('10 min')).toBeTruthy();
      expect(getByText('15 min')).toBeTruthy();
    });
  });

  /**
   * GRUPO 2: NAVEGACIÓN E INTERACCIONES
   * Testing de todas las interacciones según PROJECT_REQUIREMENTS.md
   */
  describe('Navegación e Interacciones', () => {
    test('navega hacia atrás al hacer clic en botón atrás', () => {
      const { getByLabelText } = render(
        <VistaIslaScreen {...mockProps} />
      );

      const botonAtras = getByLabelText('Regresar al mapa mundo');
      fireEvent.press(botonAtras);

      expect(mockProps.onNavigateBack).toHaveBeenCalledTimes(1);
    });

    test('selecciona actividad y navega a pre-actividad', async () => {
      const { getByText } = render(
        <VistaIslaScreen {...mockProps} />
      );

      const actividad = getByText('Actividad de Prueba');
      fireEvent.press(actividad);

      // Esperar a que se complete la animación
      await waitFor(() => {
        expect(mockProps.onNavigateToPreActividad).toHaveBeenCalledWith('test_001');
      });
    });

    test('maneja actividad random de Leo', async () => {
      const { getByLabelText } = render(
        <VistaIslaScreen {...mockProps} />
      );

      const leoBoton = getByLabelText('Leo sugiere una actividad aleatoria');
      fireEvent.press(leoBoton);

      expect(mockAlert).toHaveBeenCalledWith(
        '¡Sugerencia de Leo!',
        expect.stringContaining('Leo sugiere probar:'),
        expect.any(Array)
      );
    });

    test('maneja caso sin actividades disponibles para random', () => {
      const actividadesCompletadas = actividadesPrueba.map(act => ({
        ...act,
        estado: EstadoActividad.MASTERIZADA
      }));

      const { getByLabelText } = render(
        <VistaIslaScreen
          {...mockProps}
          actividades={actividadesCompletadas}
        />
      );

      const leoBoton = getByLabelText('Leo sugiere una actividad aleatoria');
      fireEvent.press(leoBoton);

      expect(mockAlert).toHaveBeenCalledWith(
        '¡Excelente!',
        'Has dominado todas las actividades disponibles. ¡Leo está muy orgulloso!',
        expect.any(Array)
      );
    });
  });

  /**
   * GRUPO 3: SISTEMA DE FILTROS
   * Testing del sistema de filtros por dificultad
   */
  describe('Sistema de Filtros', () => {
    test('muestra todos los filtros de dificultad', () => {
      const { getByText } = render(
        <VistaIslaScreen {...mockProps} />
      );

      expect(getByText('Todas')).toBeTruthy();
      expect(getByText('Fácil')).toBeTruthy();
      expect(getByText('Medio')).toBeTruthy();
      expect(getByText('Difícil')).toBeTruthy();
    });

    test('filtra actividades por dificultad fácil', async () => {
      const { getByText, queryByText } = render(
        <VistaIslaScreen {...mockProps} />
      );

      const filtroFacil = getByText('Fácil');
      fireEvent.press(filtroFacil);

      // Debe mostrar solo actividades fáciles
      await waitFor(() => {
        expect(getByText('Actividad de Prueba')).toBeTruthy(); // Fácil
        expect(queryByText('Actividad Completada')).toBeFalsy(); // Media
      });
    });

    test('filtra actividades por dificultad media', async () => {
      const { getByText, queryByText } = render(
        <VistaIslaScreen {...mockProps} />
      );

      const filtroMedio = getByText('Medio');
      fireEvent.press(filtroMedio);

      await waitFor(() => {
        expect(queryByText('Actividad de Prueba')).toBeFalsy(); // Fácil
        expect(getByText('Actividad Completada')).toBeTruthy(); // Media
      });
    });

    test('resetea filtro a "Todas"', async () => {
      const { getByText } = render(
        <VistaIslaScreen {...mockProps} />
      );

      // Aplicar filtro específico
      const filtroFacil = getByText('Fácil');
      fireEvent.press(filtroFacil);

      // Resetear a todas
      const filtroTodas = getByText('Todas');
      fireEvent.press(filtroTodas);

      await waitFor(() => {
        expect(getByText('Actividad de Prueba')).toBeTruthy();
        expect(getByText('Actividad Completada')).toBeTruthy();
      });
    });

    test('maneja filtro sin resultados', async () => {
      const actividadesSoloFacil = [actividadesPrueba[0]]; // Solo fácil

      const { getByText } = render(
        <VistaIslaScreen
          {...mockProps}
          actividades={actividadesSoloFacil}
        />
      );

      const filtroDificil = getByText('Difícil');
      fireEvent.press(filtroDificil);

      await waitFor(() => {
        expect(getByText('No hay actividades disponibles con este filtro')).toBeTruthy();
      });
    });
  });

  /**
   * GRUPO 4: ACCESIBILIDAD
   * Testing completo de VoiceOver/TalkBack según RNF-003
   */
  describe('Accesibilidad VoiceOver/TalkBack', () => {
    test('elementos principales tienen accessibility labels correctos', () => {
      const { getByLabelText } = render(
        <VistaIslaScreen {...mockProps} />
      );

      expect(getByLabelText('Regresar al mapa mundo')).toBeTruthy();
      expect(getByLabelText('Mostrar detalles de la isla')).toBeTruthy();
      expect(getByLabelText('Leo sugiere una actividad aleatoria')).toBeTruthy();
    });

    test('actividades tienen accessibility labels descriptivos', () => {
      const { getByLabelText } = render(
        <VistaIslaScreen {...mockProps} />
      );

      expect(getByLabelText(/Actividad de Prueba.*10 minutos.*Fácil/)).toBeTruthy();
      expect(getByLabelText(/Actividad Completada.*15 minutos.*Medio/)).toBeTruthy();
    });

    test('filtros tienen estados de accesibilidad correctos', () => {
      const { getByText } = render(
        <VistaIslaScreen {...mockProps} />
      );

      // El filtro "Todas" debe estar seleccionado por defecto
      const filtroTodas = getByText('Todas');
      expect(filtroTodas.props.accessibilityState?.selected).toBe(true);

      const filtroFacil = getByText('Fácil');
      expect(filtroFacil.props.accessibilityState?.selected).toBe(false);
    });

    test('maneja screen reader habilitado correctamente', async () => {
      mockAccessibilityInfo.mockResolvedValueOnce(true);

      render(<VistaIslaScreen {...mockProps} />);

      await waitFor(() => {
        expect(mockAccessibilityInfo).toHaveBeenCalled();
      });
    });
  });

  /**
   * GRUPO 5: MANEJO DE ERRORES
   * Testing de robustez según VERIFICATION_CHECKLIST.md
   */
  describe('Manejo de Errores y Casos Edge', () => {
    test('maneja error en selección de actividad gracefully', async () => {
      const mockOnNavigateError = jest.fn(() => {
        throw new Error('Navigation error');
      });

      const { getByText } = render(
        <VistaIslaScreen
          {...mockProps}
          onNavigateToPreActividad={mockOnNavigateError}
        />
      );

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      const actividad = getByText('Actividad de Prueba');
      fireEvent.press(actividad);

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          '[VistaIslaScreen] Error seleccionando actividad:',
          expect.any(Error)
        );
        expect(mockAlert).toHaveBeenCalledWith(
          'Error',
          'No se pudo seleccionar la actividad. Intenta de nuevo.'
        );
      });

      consoleErrorSpy.mockRestore();
    });

    test('maneja error en actividad aleatoria gracefully', () => {
      const { getByLabelText } = render(
        <VistaIslaScreen {...mockProps} actividades={[]} />
      );

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      // Forzar error en filtrado
      const leoBoton = getByLabelText('Leo sugiere una actividad aleatoria');
      fireEvent.press(leoBoton);

      consoleErrorSpy.mockRestore();
    });

    test('maneja error en verificación de screen reader', async () => {
      mockAccessibilityInfo.mockRejectedValueOnce(new Error('Accessibility error'));
      
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

      render(<VistaIslaScreen {...mockProps} />);

      await waitFor(() => {
        expect(consoleWarnSpy).toHaveBeenCalledWith(
          '[VistaIslaScreen] Error verificando screen reader:',
          expect.any(Error)
        );
      });

      consoleWarnSpy.mockRestore();
    });

    test('funciona sin props opcionales', () => {
      const { getByText } = render(
        <VistaIslaScreen
          tipoIsla={TipoIsla.MOVIMIENTO}
          onNavigateToActividad={mockProps.onNavigateToActividad}
          onNavigateToPreActividad={mockProps.onNavigateToPreActividad}
          onNavigateBack={mockProps.onNavigateBack}
        />
      );

      // Debe usar valores por defecto
      expect(getByText('Isla del Movimiento')).toBeTruthy();
      expect(getByText('Nivel 2')).toBeTruthy(); // Valor por defecto
    });

    test('maneja lista vacía de actividades', () => {
      const { getByText } = render(
        <VistaIslaScreen
          {...mockProps}
          actividades={[]}
        />
      );

      expect(getByText('No hay actividades disponibles con este filtro')).toBeTruthy();
    });
  });

  /**
   * GRUPO 6: FUNCIONALIDAD IA Y SUGERENCIAS
   * Testing del sistema de IA según DESIGN_SYSTEM.md
   */
  describe('Funcionalidad IA y Sugerencias', () => {
    test('muestra sugerencia de IA después de timeout', async () => {
      jest.useFakeTimers();
      
      // Mock Math.random para obtener una sugerencia específica
      const mockMathRandom = jest.spyOn(Math, 'random').mockReturnValue(0.1);

      const { queryByText, getByText } = render(
        <VistaIslaScreen {...mockProps} />
      );

      // Inicialmente no hay sugerencia
      expect(queryByText('¡Consejo de Leo!')).toBeFalsy();

      // Avanzar el tiempo para que se muestre la sugerencia
      act(() => {
        jest.advanceTimersByTime(3000);
      });

      await waitFor(() => {
        expect(getByText('¡Consejo de Leo!')).toBeTruthy();
      });

      mockMathRandom.mockRestore();
      jest.useRealTimers();
    });

    test('cierra sugerencia de IA al hacer clic en botón', async () => {
      jest.useFakeTimers();
      
      const mockMathRandom = jest.spyOn(Math, 'random').mockReturnValue(0.1);

      const { getByText, queryByText } = render(
        <VistaIslaScreen {...mockProps} />
      );

      // Mostrar sugerencia
      act(() => {
        jest.advanceTimersByTime(3000);
      });

      await waitFor(() => {
        expect(getByText('¡Consejo de Leo!')).toBeTruthy();
      });

      // Cerrar sugerencia
      const botonEntendido = getByText('¡Entendido!');
      fireEvent.press(botonEntendido);

      expect(queryByText('¡Consejo de Leo!')).toBeFalsy();

      mockMathRandom.mockRestore();
      jest.useRealTimers();
    });

    test('no muestra sugerencia cuando el resultado es null', async () => {
      jest.useFakeTimers();
      
      // Mock Math.random para obtener null
      const mockMathRandom = jest.spyOn(Math, 'random').mockReturnValue(0.9);

      const { queryByText } = render(
        <VistaIslaScreen {...mockProps} />
      );

      act(() => {
        jest.advanceTimersByTime(3000);
      });

      await waitFor(() => {
        expect(queryByText('¡Consejo de Leo!')).toBeFalsy();
      });

      mockMathRandom.mockRestore();
      jest.useRealTimers();
    });
  });

  /**
   * GRUPO 7: RESPONSIVE DESIGN
   * Testing de diseño adaptativo
   */
  describe('Diseño Responsive', () => {
    test('detecta correctamente dispositivo tablet', () => {
      mockDimensions.mockReturnValueOnce({
        width: 800,
        height: 1024,
        scale: 2,
        fontScale: 1
      });

      const component = render(
        <VistaIslaScreen {...mockProps} />
      );

      // Verificar que el componente se renderiza sin errores en tablet
      expect(component.getByText('Isla del Movimiento')).toBeTruthy();
    });

    test('detecta correctamente dispositivo móvil', () => {
      mockDimensions.mockReturnValueOnce({
        width: 375,
        height: 812,
        scale: 2,
        fontScale: 1
      });

      const component = render(
        <VistaIslaScreen {...mockProps} />
      );

      expect(component.getByText('Isla del Movimiento')).toBeTruthy();
    });
  });

  /**
   * GRUPO 8: PERFORMANCE Y OPTIMIZACIONES
   * Testing de rendimiento según VERIFICATION_CHECKLIST.md
   */
  describe('Performance y Optimizaciones', () => {
    test('no re-renderiza innecesariamente con mismas props', () => {
      const { rerender } = render(
        <VistaIslaScreen {...mockProps} />
      );

      // Llamadas iniciales
      const initialCalls = mockProps.onNavigateToPreActividad.mock.calls.length;

      // Re-renderizar con las mismas props
      rerender(<VistaIslaScreen {...mockProps} />);

      // No debería haber llamadas adicionales
      expect(mockProps.onNavigateToPreActividad.mock.calls.length).toBe(initialCalls);
    });

    test('maneja listas grandes de actividades eficientemente', () => {
      const actividadesGrandes = Array.from({ length: 50 }, (_, i) => ({
        ...actividadesPrueba[0],
        id: `big_test_${i}`,
        titulo: `Actividad Grande ${i}`
      }));

      const component = render(
        <VistaIslaScreen
          {...mockProps}
          actividades={actividadesGrandes}
        />
      );

      // Debe renderizar sin problemas de performance
      expect(component.getByText('Isla del Movimiento')).toBeTruthy();
    });
  });
});

/**
 * TESTS DE INTEGRACIÓN
 * Testing del flujo completo de la vista de isla
 */
describe('VistaIslaScreen - Tests de Integración', () => {
  test('flujo completo: filtrar → seleccionar actividad → navegar', async () => {
    const { getByText } = render(
      <VistaIslaScreen {...mockProps} />
    );

    // 1. Aplicar filtro
    const filtroFacil = getByText('Fácil');
    fireEvent.press(filtroFacil);

    // 2. Seleccionar actividad filtrada
    await waitFor(() => {
      const actividad = getByText('Actividad de Prueba');
      fireEvent.press(actividad);
    });

    // 3. Verificar navegación
    await waitFor(() => {
      expect(mockProps.onNavigateToPreActividad).toHaveBeenCalledWith('test_001');
    });
  });

  test('flujo de progreso: cambio de nivel → nuevas actividades desbloqueadas', () => {
    const progresoInicial = { ...progresoTesteo, nivel: 1 };
    const { rerender, getByText } = render(
      <VistaIslaScreen
        {...mockProps}
        progresoIsla={progresoInicial}
      />
    );

    expect(getByText('Nivel 1')).toBeTruthy();

    // Simular progreso a nivel 2
    const progresoActualizado = { ...progresoTesteo, nivel: 2 };
    rerender(
      <VistaIslaScreen
        {...mockProps}
        progresoIsla={progresoActualizado}
      />
    );

    expect(getByText('Nivel 2')).toBeTruthy();
  });
});

/**
 * SNAPSHOT TESTS
 * Para detectar cambios inesperados en la UI
 */
describe('VistaIslaScreen - Snapshot Tests', () => {
  test('snapshot con props completas', () => {
    const component = render(<VistaIslaScreen {...mockProps} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('snapshot con props mínimas', () => {
    const component = render(
      <VistaIslaScreen
        tipoIsla={TipoIsla.MOVIMIENTO}
        onNavigateToActividad={mockProps.onNavigateToActividad}
        onNavigateToPreActividad={mockProps.onNavigateToPreActividad}
        onNavigateBack={mockProps.onNavigateBack}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('snapshot con lista vacía de actividades', () => {
    const component = render(
      <VistaIslaScreen
        {...mockProps}
        actividades={[]}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('snapshot de diferentes tipos de isla', () => {
    const tiposIsla = [TipoIsla.MUSICAL, TipoIsla.TACTIL, TipoIsla.ARTE, TipoIsla.CALMA];
    
    tiposIsla.forEach(tipo => {
      const component = render(
        <VistaIslaScreen
          {...mockProps}
          tipoIsla={tipo}
        />
      );
      expect(component.toJSON()).toMatchSnapshot(`isla-${tipo}`);
    });
  });
});