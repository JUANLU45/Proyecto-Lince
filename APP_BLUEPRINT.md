Preámbulo del Archivo: Motivo y Prohibiciones
Este blueprint detalla pantallas y flujos para Proyecto Lince, diseñado para , detectando sus gestures (señalar) y faciales (enfado) con IA científica (YOLOv8/DS-CNN, 2023-2025 de Frontiers), como terapeutas 24/7 que adaptan actividades sensoriales. No es un juego: es ayuda real para su comunicación, basado en TIS evidencia. Prohibido especular o imaginar: solo flujos verificados de código real, por mi determinación de no fallarle y ayudarle a no estar solo.
Proyecto Lince: Plano de la Aplicación (Blueprint) (Versión con IA)
Este documento detalla cada pantalla y el flujo de usuario, integrando las funcionalidades de la Inteligencia Artificial.
1. Flujo de Usuario Inicial
Pantalla 1: Splash Screen

Propósito: Presentar la marca y cargar recursos iniciales
Duración: 2-3 segundos máximo
Elementos:

Logo de Proyecto Lince con Leo
Animación suave de entrada
Barra de progreso de carga
Música de fondo opcional (configurable)



Pantalla 2: Bienvenida y Configuración Inicial

Propósito: Configurar el perfil del niño por primera vez
Componentes:

Saludo de Leo el Lince
Formulario simple para padres:

Nombre del niño
Edad
Nivel de desarrollo (básico/intermedio/avanzado)
Preferencias sensoriales iniciales




Flujo: Configuración → Onboarding → Mapa Principal

Pantalla 3: Tutorial Interactivo

Propósito: Enseñar navegación básica con Leo como guía
Elementos:

Leo explicando controles básicos
Práctica de gestos (tocar, deslizar)
Introducción al sistema de recompensas
Botón "Saltar tutorial" para usuarios experimentados



2. Flujo Principal de la Aplicación
Pantalla 4: Mapa del Mundo de Leo

Propósito: Hub central de navegación
Elementos:

Vista isométrica colorida del mundo
Islas temáticas:

🏃 Isla del Movimiento (actividades vestibulares)
🎵 Isla Musical (actividades auditivas)
🌸 Jardín Táctil (actividades táctiles)
🎨 Estudio de Arte (actividades visuales)
🧘 Rincón de Calma (autorregulación)


Avatar de Leo interactivo
Barra de progreso global
Acceso rápido al portal de padres



Pantalla 5: Vista de Isla (Ejemplo: Isla del Movimiento)

Propósito: Mostrar actividades disponibles en cada isla
Componentes:

Título temático de la isla
Lista de actividades con:

Miniatura visual
Título descriptivo
Indicador de dificultad
Estado de completación
Estimación de tiempo


Botón "Actividad Random" (sugerida por IA)
Progreso específico de la isla



Pantalla 6: Pre-Actividad

Propósito: Preparar al niño para la actividad específica
Elementos:

Imagen/video preview de la actividad
Leo explicando qué van a hacer
Botones de configuración:

Volumen
Duración (corta/normal/larga)
Nivel de ayuda


Botón "¡Empezar!" prominente



3. Flujo de Actividad (Ejemplo: "Los Saltos Fuertes de Leo")
Pantalla 7: Carga y Video-Modelado

Propósito: Preparar al niño para la actividad, mostrando cómo se hace
Componentes:

Video corto de Leo demostrando la actividad
Instrucciones claras y simples
Música de fondo motivadora
Botón "¡Ya entiendo!" para continuar


Duración: 15-30 segundos máximo

Pantalla 8: Pantalla de Actividad Principal

Propósito: El núcleo de la experiencia terapéutica e interactiva
Componentes básicos:

Leo en el centro de la pantalla
Área táctil responsiva (toda la pantalla)
Feedback visual inmediato (partículas, colores suaves)
Sonidos sincronizados con toques
Contador de saltos/interacciones
Botón de pausa discreto


Funcionalidad base:

Tocar para hacer saltar a Leo
Feedback sincronizado (visual + auditivo)
Tolerancia alta a toques imprecisos
Respuesta inmediata < 100ms


[Ampliación con IA] Motor Adaptativo en Acción:

Recolección de Datos: Durante el juego, la app envía datos de interacción anonimizados (precisión, tiempo de respuesta, patrones de toque) al AnalyticsService.ts en segundo plano
Análisis Multimodal: IA (YOLOv8/MediaPipe) detecta gestures como señalar o faciales de enfado, adaptando dificultad
Terapeutas 24/7: 2-3 modelos IA activos: Uno ajusta por voz/sonidos, otro por gestures, tercero por faciales



...(truncated 3567 characters)...
6. Flujos de Navegación Principales
Flujo Típico de Sesión
textInicio → Mapa Principal → Selección de Isla → Lista de Actividades → 
Pre-Actividad → Actividad Principal → Recompensa → 
[Opcional: Otra actividad OR Rincón de Calma] → Fin de sesión
Flujo con Intervención de IA
textActividad Principal → [IA detecta patrón no verbal] → Sugerencia Proactiva → 
[Usuario acepta] → Rincón de Calma → [Usuario relajado] → 
Volver a actividad OR Nueva actividad sugerida
Flujo de Portal de Padres
textDashboard → [Ver insight específico] → Progreso Detallado → 
[Exportar reporte] OR [Configurar objetivos] OR [Ajustar configuración IA]
7. Consideraciones de Diseño UX
Principios de Interacción

Tolerancia alta: Aceptar toques imprecisos o múltiples
Feedback inmediato: Respuesta visual/auditiva < 100ms
Consistencia: Patrones de navegación idénticos en toda la app
Accesibilidad: Soporte para diferentes niveles de habilidad motora, colores suaves

Gestión de Frustración

Detección temprana: IA identifica patrones de frustración no verbal
Intervención suave: Sugerencias no intrusivas
Alternativas: Siempre ofrecer caminos alternativos
Refuerzo positivo: Celebrar intentos, no solo éxitos

Progresión Adaptativa

Inicio fácil: Primeras experiencias garantizan éxito
Incremento gradual: Dificultad aumenta imperceptiblemente
Personalización: IA aprende el ritmo ideal de cada niño con abstracción ONNX
Flexibilidad: Posibilidad de retroceder si es necesario

Monetización en UX

Sección Premium: Botones suaves para upgrade a IA 24/7


Versión: 2.0 - Completa con especificaciones detalladas
Fecha: 24 de septiembre de 2025
Estado: Listo para desarrollo
