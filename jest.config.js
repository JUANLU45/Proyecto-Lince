module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  
  // CONFIGURACIÓN PARA PROYECTO LINCE
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js)',
    '**/*.(test|spec).(ts|tsx|js)',
  ],
  
  // TRANSFORMACIONES
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  
  // EXTENSIONES DE ARCHIVO
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  
  // RESOLUCIÓN DE MÓDULOS CON PATHS
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@assets/(.*)$': '<rootDir>/assets/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@stores/(.*)$': '<rootDir>/src/store/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
  },
  
  // COBERTURA DE CÓDIGO
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}',
    '!src/**/index.ts',
  ],
  
  // UMBRALES DE COBERTURA ESTRICTOS
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    // UMBRALES ESPECÍFICOS PARA COMPONENTES CRÍTICOS
    'src/components/Common/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    'src/services/': {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
    'src/utils/': {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  
  // REPORTES DE COBERTURA
  coverageReporters: [
    'text',
    'html',
    'lcov',
    'json-summary',
  ],
  
  // CONFIGURACIÓN DE TS-JEST
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      isolatedModules: true,
    },
  },
  
  // TIMEOUTS
  testTimeout: 10000,
  
  // IGNORAR ARCHIVOS
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.expo/',
    '/ios/',
    '/android/',
    '/dist/',
    '/build/',
  ],
  
  // CONFIGURACIÓN ESPECÍFICA REACT NATIVE
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-.*|@expo|expo-.*)/)',
  ],
  
  // SETUP PARA MOCKS
  setupFiles: ['<rootDir>/jest.polyfills.js'],
  
  // CONFIGURACIÓN PARA ARCHIVOS ESTÁTICOS
  moduleNameMapping: {
    '\\.(jpg|jpeg|png|gif|svg)$': 'identity-obj-proxy',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  
  // VERBOSIDAD
  verbose: true,
  
  // DETECTAR HANDLES ABIERTOS
  detectOpenHandles: true,
  
  // DETECTAR LEAKS DE MEMORIA
  detectLeaks: true,
  
  // FORCE EXIT DESPUÉS DE TESTS
  forceExit: true,
  
  // CONFIGURACIÓN PARA CI/CD
  ci: process.env.CI === 'true',
  
  // MÁXIMA CONCURRENCIA
  maxConcurrency: 4,
  
  // CONFIGURACIÓN DE REPORTERS
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'coverage',
        outputName: 'junit.xml',
      },
    ],
  ],
  
  // WATCH PLUGINS
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
