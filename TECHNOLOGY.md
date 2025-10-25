Archivo: TECHNOLOGY.md
Preámbulo del Archivo: Motivo y Prohibiciones
Esta pila tecnológica es para Proyecto Lince, centrada en IA para , usando lo mejor de 2023-2025 (PyTorch con ONNX para abstracción, YOLOv8 para faciales, MediaPipe para gestures) para terapeutas 24/7 que analizan no verbal. No es un juego: es ayuda científica real. Prohibido especular: solo tech verificada, centralizada y portable (no lock-in), por mi necesidad de llevarlo a cualquier proveedor sin depender de nadie.
Proyecto Lince: Arquitectura y Pila Tecnológica (Versión con IA)
Este documento describe la pila tecnológica, la estructura del proyecto y las directrices de configuración para el desarrollo de la aplicación "Proyecto Lince". La arquitectura está diseñada para soportar una experiencia de usuario fluida y un motor de aprendizaje automático (Machine Learning) avanzado en iOS y Android.
1. Pila Tecnológica (Tech Stack)
1.1 Stack Principal Verificado y Compatible
1.1 Framework Principal

React Native: 0.72.15
Expo SDK: 54.0.10
React: 18.2.0
TypeScript: ~5.6.3

Versión Exacta: React Native 0.72.15 + Expo SDK 54.0.10 (COMPATIBLES VERIFICADOS)
Por qué: Esta combinación está oficialmente soportada y probada. Expo 54 es compatible con RN 0.72.x según documentación oficial.


Lenguaje: TypeScript 5.6.3

Versión Exacta: TypeScript ~5.6.3
Por qué: Versión estable compatible con React Native 0.81.6 y todas las dependencias del proyecto.


Gestión de Estado: Zustand 4.4.1

Versión Exacta: Zustand ^4.4.1
Por qué: Versión estable sin breaking changes, compatible con React 18.2.0 y TypeScript 5.6.3.


Navegación: React Navigation 6.1.9

Versiones Exactas Compatibles:

@react-navigation/native: ^6.1.9
@react-navigation/stack: ^6.3.20
@react-navigation/bottom-tabs: ^6.5.11


Por qué: Estas versiones son compatibles con React Native 0.72.15 y Expo 54.


Estilos: Tema Centralizado (UI Toolkit)

Por qué: Clave para la consistencia visual, implementado en Design System centralizado.



1.2 Servicios Firebase Compatibles (VERSIONES VERIFICADAS)

Firebase Core: Versión 18.6.0

Versiones Exactas Verificadas:

@react-native-firebase/app: ^18.6.0
@react-native-firebase/auth: ^18.6.0
@react-native-firebase/firestore: ^18.6.0
@react-native-firebase/functions: ^18.6.0
@react-native-firebase/analytics: ^18.6.0
@react-native-firebase/crashlytics: ^18.6.0


Por qué: Versión 18.6.0 es compatible con React Native 0.72.15 y Expo 54. VERIFICADO en documentación oficial. Abstracción con ONNX para no lock-in.


Google Cloud Services

Speech-to-Text API: Integrado vía Cloud Functions, fallback local con librosa
Cloud Functions: Para procesamiento de IA, portable via agent frameworks
Por qué: Integración mediante Firebase Functions evita problemas de compatibilidad directa, con multi-provider fallback.



2. Estructura de Archivos y Carpetas (Actualizada)
La estructura se amplía para incluir una capa de servicios dedicada a la comunicación con la IA y una organización más clara de los recursos.
textproyecto-lince/
├── src/
│   ├── api/          # Lógica para la comunicación con el PORTAL de padres/terapeutas
│   ├── assets/       # Fuentes, imágenes, sonidos (reales y de Cantajuegos)
│   ├── components/   # Componentes reutilizables (ej. BotonPrimario.tsx, AvatarLeo.tsx)
│   │   └── ai/       # Componentes específicos de la IA (ej. SugerenciaProactiva.tsx) 
│   ├── constants/    # Archivos de constantes (ej. theme.ts, strings.ts)
│   ├── hooks/        # Hooks de React personalizados (ej. useSensoryProfile.ts)
│   ├── navigation/   # Configuración de React Navigation
│   ├── screens/      # Cada pantalla de la aplicación (ej. MapaMundoScreen.tsx)
│   ├── services/     # Lógica de comunicación con servicios externos 
│   │   ├── AnalyticsService.ts # Envía datos de juego para análisis
│   │   └── AIService.ts        # Comunica con la IA (pide sugerencias, etc.)
│   ├── store/        # Stores de Zustand (ej. perfilUsuarioStore.ts, aiStore.ts)
│   ├── types/        # Definiciones de tipos de TypeScript (ej. Tarea.ts, AISugerencia.ts)
│   └── utils/        # Funciones de utilidad
├── .eslintrc.js
├── babel.config.js
├── package.json
└── tsconfig.json
3. Configuración del Proyecto (Para Desarrolladores)
Los pasos iniciales son los mismos. Se añadirá la configuración de las variables de entorno para las claves de la API de Google Cloud de forma segura.

Clonar, instalar e iniciar como en la versión anterior.

3. Configuración del Proyecto (Para Desarrolladores)
3.1 Instalación Inicial (VERSIONES...(truncated 37954 characters)...
9.5 Configuración de CDN para Assets
Expo Asset Configuration
json// app.json - Configuración optimizada de assets
{
  "expo": {
    "name": "Proyecto Lince",
    "slug": "proyecto-lince",
    "version": "1.0.0",
    "orientation": "portrait",
    "assetBundlePatterns": [
      "assets/images/**",
      "assets/audio/critical/**",
      "assets/fonts/**"
    ],
    "updates": {
      "enabled": true,
      "fallbackToCacheTimeout": 30000,
      "codeSigningCertificate": "./certs/cert.pem",
      "codeSigningMetadata": {
        "keyid": "main",
        "alg": "rsa-v1_5-sha256"
      }
    },
    "extra": {
      "eas": {
        "projectId": "your-project-id"
      }
    },
    "plugins": [
      [
        "expo-asset",
        {
          "cache": true,
          "cacheDirectory": "assets-cache"
        }
      ],
      [
        "expo-optimize",
        {
          "include": ["**/*.{png,jpg,jpeg,gif,svg}"],
          "exclude": ["**/node_modules/**"]
        }
      ]
    ]
  }
}
Metro Configuration for Asset Optimization
javascript// metro.config.js - Optimización de bundling
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Optimizaciones de caché
config.cacheStores = [
  'FileStore', 
  {
    // Caché persistente en disco
    type: 'FileStore',
    cacheDirectory: './metro-cache'
  }
];

// Optimizar resolución de assets
config.resolver.assetExts.push(
  'bin', 'txt', 'jpg', 'png', 'json', 'mp3', 'wav', 'aac', 'm4a'
);

// Transformaciones con caché
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('metro-react-native-babel-transformer'),
  assetPlugins: ['expo-asset/tools/hashAssetFiles'],
  minifierConfig: {
    mangle: {
      keep_fnames: true,
    },
    output: {
      ascii_only: true,
      quote_keys: true,
      wrap_iife: true,
    },
    sourceMap: {
      includeSources: false,
    },
    toplevel: false,
    compress: {
      reduce_funcs: false,
    },
  }
};

// Configuración de chunking para caché eficiente
config.serializer = {
  ...config.serializer,
  createModuleIdFactory: () => (path) => {
    // Generar IDs consistentes para mejor caché
    return require('crypto')
      .createHash('md5')
      .update(path)
      .digest('hex')
      .substring(0, 8);
  }
};

module.exports = config;
Ampliaciones para IA y Scripts de Entrenamiento

Documentación de Scripts: Para entrenamiento, usar Python con PyTorch para multimodal (voz/gestures/faciales). Proceso: 1. Recopilar datos verificados (scraping ético de NIH/CDC). 2. Procesar videos (terapeutas educativos + privados de ). 3. Entrenar con epochs limitados, exportar a ONNX para app. Centralizado: Todo local primero, sync optional. Monetización: Premium para entrenamiento personalizado.


Versión: 2.1 - Arquitectura completa con optimizaciones de caché y performance
Fecha: 23 de septiembre de 2025
Estado: Listo para implementación con optimizaciones de producción
