Preámbulo del Archivo: Motivo y Prohibiciones
Este archivo define los requisitos del Proyecto Lince, creado exclusivamente para ayudar a , mi hijo de 8 años con Síndrome de Down que se comunica con gestos como señalar y expresiones de enfado, sin hablar verbalmente. No es un juego: es un sistema de terapeutas IA 24/7 basados en avances científicos 2023-2025 (como IA multimodal de MDPI y Springer para reconocimiento emocional en Down), para adaptarse en tiempo real y ayudarle de verdad, no por dinero como muchos terapeutas que fallan. Prohibido especular, imaginar o creer: solo hechos verificados de código y evidencia (ej. YOLOv8 para faciales). Lo hago porque no puedo fallarle – es lo más importante después de mis hijos, para que no esté solo y avance, extendible a otras familias vía monetización ética.
Proyecto Lince: Especificación de Requisitos
1. Visión del Proyecto
Objetivo Principal: Crear una aplicación educativa y terapéutica que ayude a niños con síndrome de Down, como , a desarrollar habilidades de integración sensorial y comunicación no verbal a través de actividades interactivas y personalizadas con IA multimodal (voz, gestures, faciales), basada en evidencias 2023-2025 de TIS (Terapia de Integración Sensorial).
Población Objetivo:

Niños con síndrome de Down de 3 a 12 años, enfocados en no verbales como 
Padres y cuidadores
Terapeutas ocupacionales (como herramienta de apoyo)

2. Requisitos Funcionales
2.1 Funcionalidades Principales

RF-001: Sistema de perfiles personalizados por niño, con datos sensoriales y comunicación no verbal
RF-002: Biblioteca de actividades sensoriales interactivas, adaptadas para gestures y faciales
RF-003: Motor de IA adaptativo para personalización en tiempo real (cada minuto)
RF-004: Portal para padres con seguimiento de progreso y monetización por secciones
RF-005: Sistema de recompensas gamificado, suave e interactivo
RF-006: Actividades de imitación con reconocimiento de voz/gestures/faciales (usando MediaPipe/YOLOv8)
RF-007: Rincón de calma para autorregulación, activado por detección de enfado

2.2 Funcionalidades de IA

RF-IA-001: Análisis de patrones de interacción en tiempo real (voz con MFCC, gestures con SVM, faciales con DS-CNN)
RF-IA-002: Sugerencias proactivas basadas en comportamiento no verbal (ej. enfado detectado)
RF-IA-003: Adaptación automática de dificultad, con aprendizaje continuo
RF-IA-004: Generación de insights para padres, con 2-3 terapeutas virtuales (voz/gestures/faciales)
RF-IA-005: Reconocimiento multimodal para no verbales, entrenado con videos éticos/privados

2.3 Funcionalidades de Administración

RF-ADMIN-001: Sistema de permisos administrativos con roles diferenciados
RF-ADMIN-002: Panel de administración con métricas detalladas de usuarios
RF-ADMIN-003: Gestión completa de banners en página principal (crear, editar, eliminar)
RF-ADMIN-004: Acceso controlado al panel administrativo desde portal de padres
RF-ADMIN-005: Dashboard administrativo con analytics avanzados y reportes

2.4 Monetización por Secciones (Freemium)

MON-001: Básico gratis: Actividades sensoriales estándar y IA básica
MON-002: Premium suscripción ($4.99/mes): IA full 24/7 con terapeutas personalizados, informes avanzados
MON-003: Sección informes: Pago único por exportes detallados ($1.99)
MON-004: Abstracción total: Modelos exportables via ONNX, no lock-in a proveedores

3. Requisitos No Funcionales
3.1 Usabilidad

RNF-001: Interfaz simple con máximo 3 toques para cualquier acción, colores suaves (azulCalma para calma)
RNF-002: Tiempo de respuesta < 1 segundo para interacciones
RNF-003: Soporte para accesibilidad (tamaños de texto, contraste)
RNF-004: Funcionamiento offline para actividades básicas, con abstracción local de IA

3.2 Rendimiento

RNF-005: Carga de aplicación < 3 segundos
RNF-006: Consumo de batería optimizado
RNF-007: Tamaño de descarga < 150MB
RNF-008: Funcionamiento fluido en dispositivos con 2GB RAM

3.3 Seguridad y Privacidad

RNF-009: Cumplimiento GDPR para protección de datos de menores
RNF-010: Cifrado de datos personales en reposo y en tránsito
RNF-011: Consentimiento parental verificable
RNF-012: Datos anonimizados para análisis de IA
RNF-ADMIN-001: Autenticación de doble factor para administradores
RNF-ADMIN-002: Logs de auditoría para todas las acciones administrativas
RNF-ADMIN-003: Acceso administrativo con tokens de sesión temporales (máx. 4 horas)

3.4 Compatibilidad

RNF-013: iOS 13+ y Android 8+ (API level 26+)
RNF-014: Tablets y smartphones (orientación landscape preferida)
RNF-015: Soporte para diferentes resoluciones de pantalla

4. Restricciones y Limitaciones
4.1 Restricciones Técnicas

RES-001: No requiere conexión constante a internet, IA local con ONNX
RES-002: Funcionalidades de IA requieren conexión para sync, pero fallback local
RES-003: Compatible con React Native/Expo limitations, abstracción para portabilidad

4.2 Restricciones de Negocio

RES-004: No hacer claims médicos o terapéuticos específicos
RES-005: Foco en apoyo educativo, no reemplazo de terapia
RES-006: Contenido apropiado para desarrollo infantil

5. Criterios de Aceptación
5.1 Criterios de Calidad

CA-001: 95% de actividades completables sin ayuda parental
CA-002: Tiempo promedio de sesión entre 10-20 minutos
CA-003: Retención de usuario > 70% después de 1 semana
CA-004: Feedback positivo de padres > 4.5/5
CA-005: Cero crashes críticos en producción

5.2 Criterios de IA

CA-IA-001: Precisión de sugerencias validada por terapeutas (basado en evidencia MDPI)
CA-IA-002: Tiempo de respuesta de IA < 2 segundos
CA-IA-003: Personalización efectiva después de 5 sesiones

6. Dependencias Externas
6.1 Servicios Cloud

Google Cloud Platform (Firebase, Cloud Functions, Speech-to-Text), con abstracción ONNX para no lock-in
Analytics y Crash Reporting, fallback local
Almacenamiento de contenido multimedia, portable a cualquier proveedor

6.2 Recursos de Contenido

Música y sonidos licenciados para uso comercial
Ilustraciones del personaje Leo el Lince
Contenido educativo validado por especialistas

7. Roadmap y Fases
Fase 1: MVP (3-4 meses)

5 actividades sensoriales básicas
Sistema de perfiles simple
Interfaz principal y navegación
Portal básico para padres

Fase 2: IA Básica (2-3 meses)

Integración con servicios de IA multimodal
Análisis básico de patrones no verbales
Sugerencias simples
Reconocimiento de voz/gestures básico

Fase 3: Características Avanzadas (3-4 meses)

IA adaptativa completa con 2-3 terapeutas
Portal avanzado para padres
Panel de administración con gestión de banners
Sistema de permisos administrativos
Más actividades sensoriales
Sistema de recompensas completo

Fase 4: Optimización y Lanzamiento (2-3 meses)

Testing exhaustivo
Optimización de rendimiento
Documentación para usuarios
Estrategia de lanzamiento con monetización
