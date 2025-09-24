// CONFIGURACIÓN INICIAL PARA TESTS - PROYECTO LINCE
import 'react-native-gesture-handler/jestSetup';
import '@testing-library/jest-native/extend-expect';

// MOCK REACT NATIVE MODULES
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// MOCK EXPO MODULES
jest.mock('expo-font');
jest.mock('expo-asset');
jest.mock('expo-constants', () => ({
  default: {
    debugMode: false,
    experienceUrl: 'exp://127.0.0.1:19000/--/',
    expoVersion: '50.0.0',
    installationId: 'test-installation-id',
    platform: {
      ios: {
        buildNumber: '1',
        bundleId: 'com.proyectolince.app',
        platform: 'ios',
        version: '1.0.0',
      },
    },
  },
}));

// MOCK REACT NAVIGATION
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      reset: jest.fn(),
      setParams: jest.fn(),
      dispatch: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
      key: 'test-key',
      name: 'test-screen',
    }),
    useFocusEffect: jest.fn(),
  };
});

// MOCK FIREBASE
jest.mock('@react-native-firebase/app', () => ({
  default: () => ({
    onReady: jest.fn(() => Promise.resolve()),
  }),
}));

jest.mock('@react-native-firebase/auth', () => ({
  default: () => ({
    signInAnonymously: jest.fn(() => Promise.resolve()),
    signOut: jest.fn(() => Promise.resolve()),
    currentUser: {
      uid: 'test-uid',
      isAnonymous: true,
    },
  }),
}));

jest.mock('@react-native-firebase/firestore', () => ({
  default: () => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        set: jest.fn(() => Promise.resolve()),
        get: jest.fn(() => Promise.resolve({
          exists: true,
          data: () => ({}),
        })),
        update: jest.fn(() => Promise.resolve()),
        delete: jest.fn(() => Promise.resolve()),
      })),
      add: jest.fn(() => Promise.resolve()),
      where: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({
          docs: [],
          empty: true,
        })),
      })),
    })),
  }),
}));

// MOCK ASYNC STORAGE
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
}));

// MOCK REACT NATIVE SOUND
jest.mock('react-native-sound', () => {
  const mockSound = {
    play: jest.fn(),
    stop: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
    setVolume: jest.fn(),
    release: jest.fn(),
    getDuration: jest.fn(() => 0),
    getCurrentTime: jest.fn(callback => callback(0)),
  };
  
  return jest.fn(() => mockSound);
});

// MOCK HAPTIC FEEDBACK
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(() => Promise.resolve()),
  notificationAsync: jest.fn(() => Promise.resolve()),
  selectionAsync: jest.fn(() => Promise.resolve()),
}));

// MOCK SENSORS
jest.mock('expo-sensors', () => ({
  Accelerometer: {
    addListener: jest.fn(),
    removeAllListeners: jest.fn(),
    setUpdateInterval: jest.fn(),
  },
  Gyroscope: {
    addListener: jest.fn(),
    removeAllListeners: jest.fn(),
    setUpdateInterval: jest.fn(),
  },
}));

// MOCK AI SERVICES
jest.mock('../src/services/ai/AIService', () => ({
  analyzeProgress: jest.fn(() => Promise.resolve({
    score: 85,
    recommendations: ['Continuar con actividades táctiles'],
    improvements: ['Aumentar tiempo de respuesta'],
  })),
  generateActivity: jest.fn(() => Promise.resolve({
    id: 'test-activity',
    type: 'tactil',
    difficulty: 'facil',
    instructions: 'Instrucciones de prueba',
  })),
}));

// CONFIGURACIÓN GLOBAL PARA TESTS
global.__TEST__ = true;

// TIMEOUT PARA TESTS LARGOS
jest.setTimeout(30000);

// MOCK CONSOLE WARNINGS CONOCIDAS
const originalWarn = console.warn;
console.warn = (...args) => {
  const message = args[0];
  
  // IGNORAR WARNINGS CONOCIDAS DE REACT NATIVE
  if (
    typeof message === 'string' &&
    (
      message.includes('Warning: React.createFactory()') ||
      message.includes('Warning: componentWillMount') ||
      message.includes('Warning: componentWillReceiveProps') ||
      message.includes('Animated: `useNativeDriver`')
    )
  ) {
    return;
  }
  
  originalWarn(...args);
};

// CONFIGURACIÓN PARA TESTING LIBRARY
import { configure } from '@testing-library/react-native';

configure({
  asyncUtilTimeout: 5000,
  testIdAttribute: 'testID',
});

// HELPERS GLOBALES PARA TESTS
global.createMockNavigation = () => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
  setParams: jest.fn(),
  dispatch: jest.fn(),
  isFocused: jest.fn(() => true),
  canGoBack: jest.fn(() => false),
  getId: jest.fn(() => 'test-id'),
  getParent: jest.fn(),
  getState: jest.fn(() => ({
    index: 0,
    routes: [],
  })),
});

global.createMockRoute = (params = {}) => ({
  key: 'test-key',
  name: 'test-screen',
  params,
});

// CLEANUP DESPUÉS DE CADA TEST
afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

// SETUP PARA CADA TEST
beforeEach(() => {
  jest.useFakeTimers();
});

// CLEANUP GENERAL
afterAll(() => {
  jest.useRealTimers();
});