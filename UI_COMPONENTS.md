Archivo: UI_COMPONENTS.md
Preámbulo del Archivo: Motivo y Prohibiciones
Estos componentes UI son para Proyecto Lince, con botones suaves e interactivos para , integrando IA para no verbales con evidencia 2023-2025 (gestures de PubMed). No es un juego: es interfaz para terapeutas IA 24/7. Prohibido especular: solo componentes de código real, por mi misión de ayudarle a comunicarse sin fallar.
Proyecto Lince: Especificación de Componentes UI
1. Arquitectura de Componentes
Jerarquía de Componentes
textApp.tsx
├── Navigation/
│   ├── MainNavigator.tsx
│   ├── StackNavigator.tsx
│   └── TabNavigator.tsx
├── Screens/
│   ├── MapaMundoScreen.tsx
│   ├── ActividadScreen.tsx
│   ├── PortalPadresScreen.tsx
│   ├── ConfiguracionScreen.tsx
│   └── AdminPanelScreen.tsx
├── Components/
│   ├── Common/
│   │   ├── BotonPrimario.tsx
│   │   ├── BotonSecundario.tsx
│   │   ├── Modal.tsx
│   │   └── Loading.tsx
│   ├── Character/
│   │   ├── AvatarLeo.tsx
│   │   ├── LeoAnimado.tsx
│   │   └── LeoEmociones.tsx
│   ├── Activities/
│   │   ├── ActividadContainer.tsx
│   │   ├── AreaInteractiva.tsx
│   │   ├── FeedbackVisual.tsx
│   │   └── BarraProgreso.tsx
│   ├── AI/
│   │   ├── SugerenciaProactiva.tsx
│   │   ├── InsightPadres.tsx
│   │   └── IndicadorIA.tsx
│   └── Portal/
│       ├── GraficoProgreso.tsx
│       ├── ResumenSemanal.tsx
│       ├── MisionMundoReal.tsx
│       └── Admin/
│           ├── GestionBanners.tsx
│           ├── MetricasAdmin.tsx
│           ├── PermisoAdmin.tsx
│           └── DashboardAdmin.tsx
2. Especificaciones de Componentes
2.1 Componentes Comunes
BotonPrimario.tsx
typescriptinterface BotonPrimarioProps {
  texto: string;
  onPress: () => void;
  icono?: string;
  deshabilitado?: boolean;
  tamaño?: 'pequeño' | 'mediano' | 'grande';
  color?: 'azul' | 'verde' | 'amarillo' | 'rojo';
}
Especificaciones de Diseño:

Altura mínima: 60px (táctil fácil para niños)
Bordes redondeados: 12px
Animación: Escala 0.95 al presionar
Sombra: 4px con opacidad 0.2
Tipografía: GoogleSans-Bold, 18px, suave para calma sensorial

Modal.tsx
typescriptinterface ModalProps {
  visible: boolean;
  onClose: () => void;
  titulo?: string;
  children: React.ReactNode;
  tipo?: 'info' | 'confirmacion' | 'alerta';
}
Especificaciones de Diseño:

Fondo: Overlay negro con opacidad 0.5
Contenedor: Fondo blanco, bordes redondeados 16px
Animación: Fade in/out + Scale
Máximo ancho: 90% de pantalla, máximo 400px

2.2 Componentes del Personaje
AvatarLeo.tsx
typescriptinterface AvatarLeoProps {
  emocion: 'feliz' | 'pensativo' | 'animado' | 'calmado' | 'sorprendido';
  tamaño: 'pequeño' | 'mediano' | 'grande';
  animacion?: boolean;
  onPress?: () => void;
}
Estados Emocionales:

Feliz: Ojos brillantes, sonrisa amplia
Pensativo: Garra en barbilla, cejas ligeramente fruncidas
Animado: Salto sutil, ojos muy abiertos
Calmado: Ojos entrecerrados, postura relajada
Sorprendido: Ojos muy abiertos, boca en "O"

LeoAnimado.tsx
typescriptinterface LeoAnimadoProps {
  accion: 'saltar' | 'bailar' | 'pensar' | 'celebrar' | 'dormitar';
  loop?: boolean;
  onAnimacionCompleta?: () => void;
}
Animaciones Específicas:

Saltar: Movimiento vertical suave, 1.5s duración
Bailar: Balanceo lateral con rotación leve
Pensar: Movimiento sutil de cabeza
Celebrar: Secuencia de saltos con confeti
Dormitar: Ojos que se cierran gradualmente

2.3 Componentes de Actividades
ActividadContainer.tsx
typescriptinterface ActividadContainerProps {
  titulo: string;
  progreso: number; // 0-100
  tiempoTranscurrido: number;
  onPausa: () => void;
  onTerminar: () => void;
  children: React.ReactNode;
}
Layout:

Header: Título + barra de progreso + botón pausa
**Área principal...(truncated 3306 characters)...

3. Estados y Animaciones
3.1 Estados de Carga

Inicial: Skeleton loader con formas básicas
Progreso: Barra de progreso con Leo animado
Error: Mensaje amigable con opción de reintentar
Vacío: Ilustración de Leo con mensaje motivacional

3.2 Transiciones entre Pantallas

Slide horizontal: Para navegación entre islas
Fade: Para modales y overlays
Scale + Fade: Para actividades
Push: Para navegación profunda (drill-down)

3.3 Micro-animaciones

Feedback táctil: Escala 0.95 + vibración sutil
Aparición de elementos: Fade in con delay escalonado
Celebración: Confeti + escala pulsante
Error: Shake horizontal suave

4. Responsividad y Adaptabilidad
4.1 Breakpoints

Smartphone pequeño: < 350px ancho
Smartphone estándar: 350-450px ancho
Smartphone grande: 450-550px ancho
Tablet pequeña: 550-800px ancho
Tablet grande: > 800px ancho

4.2 Adaptaciones por Tamaño

Textos: Escala automática basada en tamaño de pantalla
Botones: Mínimo 44px en cualquier dispositivo, suaves
Espaciado: Relativo al tamaño de pantalla
Imágenes: Vectoriales cuando sea posible

5. Accesibilidad
5.1 Estándares

WCAG 2.1 AA: Cumplimiento para contraste y navegación
VoiceOver/TalkBack: Soporte para lectores de pantalla
Tamaños de fuente: Soporte para texto grande del sistema

5.2 Implementación
typescript// Ejemplo de implementación accesible
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Botón para saltar con Leo"
  accessibilityHint="Toca para hacer que Leo salte"
  accessibilityRole="button"
>
  <Text>¡Salta!</Text>
</TouchableOpacity>
6. Testing de Componentes
6.1 Criterios de Testing

Visual: Snapshot testing para consistencia
Funcional: Unit tests para lógica de componentes
Integración: Testing de flujos completos
Accesibilidad: Verificación automática de estándares

6.2 Herramientas

Jest + React Native Testing Library
Storybook para documentación visual
Detox para testing E2E
Accessibility Inspector para validación

Ampliaciones para Monetización

Componente Paywall: Modal suave para premium, integrando IA avanzada
