# 🦎 Loading.tsx - Especificación Completa
## Proyecto Lince - Componente de Carga Centralizado

---

## 📋 **DOCUMENTACIÓN VERIFICADA**

### ✅ **APP_BLUEPRINT.md**
- **Línea 55**: "Pantalla de carga inicial con Leo animado" - Loading en splash screen
- **Línea 76**: Estados de carga durante navegación entre actividades  
- **Línea 143**: Loading durante análisis de IA y generación de insights
- **Línea 161**: Estados de carga en exportación de reportes
- **Línea 175**: Loading durante configuración inicial del usuario

### ✅ **DESIGN_SYSTEM.md**
- **Línea 17**: Leo el Lince como icono amigable central
- **Colores primarios**: `azulCalma`, `verdeJungla` para estados positivos
- **Opacidades**: Sistema de transparencias para overlays de carga
- **Sistema centralizado**: Todos los elementos usan colores documentados

### ✅ **PROJECT_REQUIREMENTS.md**
- **RNF-002**: Tiempo de respuesta < 1 segundo - Loading debe ser fluido
- **RNF-003**: Accesibilidad WCAG 2.1 AA - Indicadores accesibles
- **RF-015**: Feedback visual constante durante procesos
- **RF-027**: Estados de carga claros en IA y análisis

### ✅ **TECHNOLOGY.md**
- **React Native + Animated**: Animaciones nativas optimizadas
- **Performance**: Indicadores sin impacto en UI principal
- **Background Processing**: Loading para tareas asíncronas
- **Firebase Integration**: Estados de carga para servicios cloud

### ✅ **UI_COMPONENTS.md**
- **Línea 23**: `Loading.tsx` listado en jerarquía Common/
- **Patrón Modal**: Líneas 71-82 para overlays de carga fullscreen
- **Feedback Visual**: Componentes de retroalimentación visual
- **Accesibilidad**: Línea 345 - Estándares WCAG obligatorios

### ✅ **VERIFICATION_CHECKLIST.md**
- Estados de carga no bloqueen UX crítica
- Performance de animaciones optimizada  
- Accesibilidad completa con lectores pantalla
- Testing de todos los tipos de loading

---

## 🎯 **ESPECIFICACIÓN TÉCNICA**

### **Interface TypeScript**
```typescript
export interface LoadingProps {
  readonly visible: boolean;
  readonly tipo?: TipoLoading;
  readonly mensaje?: string;
  readonly progreso?: number; // 0-100 para barra de progreso
  readonly overlay?: boolean;
  readonly tamaño?: TamañoLoading;
  readonly color?: ColorLoading;
  readonly onCancel?: () => void; // Para loading cancelable
  readonly accessibilityLabel?: string;
  readonly testID?: string;
}

type TipoLoading = 'circular' | 'puntos' | 'barra' | 'leo' | 'texto';
type TamañoLoading = 'pequeño' | 'mediano' | 'grande';
type ColorLoading = 'azul' | 'verde' | 'blanco' | 'gris';
```

### **Tipos de Loading Específicos**

1. **Circular**: Spinner tradicional para cargas rápidas
2. **Puntos**: 3 puntos animados para procesos medianos  
3. **Barra**: Barra de progreso para procesos con porcentaje
4. **Leo**: Leo animado personaje para cargas especiales
5. **Texto**: Solo mensaje de texto para feedback rápido

---

## 🎨 **ESPECIFICACIONES DE DISEÑO**

### **Loading Circular**
- **Tamaño**: Pequeño 24px, Mediano 40px, Grande 56px
- **Grosor línea**: 3px para pequeño, 4px mediano, 6px grande
- **Animación**: Rotación 360° en 1.5s, loop infinito
- **Colores**: Según `ColorLoading` del sistema centralizado

### **Loading Puntos** 
- **Cantidad**: 3 puntos uniformes
- **Tamaño punto**: 8px pequeño, 12px mediano, 16px grande  
- **Separación**: 6px entre puntos
- **Animación**: Bounce secuencial, 0.4s por punto, loop infinito

### **Loading Barra**
- **Alto**: 6px pequeño, 8px mediano, 12px grande
- **Ancho**: 80% del contenedor, máximo 300px
- **Bordes**: Redondeados 4px (consistente con sistema)
- **Progreso**: Animación suave del 0% al valor especificado

### **Loading Leo**  
- **Tamaño**: 60px pequeño, 80px mediano, 120px grande
- **Animación**: Leo saltando (usando patrón LeoAnimado.tsx)
- **Estados**: feliz durante carga, celebrar al completar
- **Uso**: Cargas especiales y primera vez de usuario

### **Loading Texto**
- **Tipografía**: GoogleSans-Medium, tamaños 14px/16px/18px
- **Color**: Según `ColorLoading` del sistema
- **Animación**: Fade in/out suave opcional
- **Posición**: Centro o debajo de otros indicadores

---

## 🔧 **CONFIGURACIONES CENTRALIZADAS**

### **CONFIGURACIONES_TAMAÑO_LOADING**
```typescript
const CONFIGURACIONES_TAMAÑO_LOADING: Record<TamañoLoading, {
  readonly circular: number;
  readonly puntos: number;
  readonly barraAlto: number;
  readonly leoSize: number;
  readonly fontSize: number;
}> = {
  pequeño: {
    circular: 24,
    puntos: 8,
    barraAlto: 6,
    leoSize: 60,
    fontSize: 14,
  },
  mediano: {
    circular: 40,
    puntos: 12,
    barraAlto: 8,
    leoSize: 80,
    fontSize: 16,
  },
  grande: {
    circular: 56,
    puntos: 16,
    barraAlto: 12,
    leoSize: 120,
    fontSize: 18,
  },
} as const;
```

### **COLORES_LOADING**
```typescript
const COLORES_LOADING: Record<ColorLoading, {
  readonly primario: string;
  readonly secundario: string;
  readonly fondo: string;
  readonly texto: string;
}> = {
  azul: {
    primario: Colores.azulCalma, // Color principal del sistema
    secundario: Colores.azulCalma + '60', // 60% opacity
    fondo: Colores.grisClaro,
    texto: Colores.azulCalma,
  },
  verde: {
    primario: Colores.verdeJungla,
    secundario: Colores.verdeJungla + '60',
    fondo: Colores.grisClaro,
    texto: Colores.verdeJungla,
  },
  blanco: {
    primario: Colores.blancoPuro,
    secundario: Colores.blancoPuro + '80',
    fondo: 'transparent',
    texto: Colores.blancoPuro,
  },
  gris: {
    primario: Colores.grisAdministrativo,
    secundario: Colores.grisAdministrativo + '60',
    fondo: Colores.grisClaro,
    texto: Colores.grisAdministrativo,
  },
} as const;
```

### **CONFIGURACION_ANIMACIONES**
```typescript
const ANIMACIONES_LOADING = {
  circular: {
    duracion: 1500, // 1.5s rotación completa
    useNativeDriver: true,
  },
  puntos: {
    duracionPunto: 400, // 0.4s bounce por punto
    delay: 150, // 0.15s delay entre puntos
    useNativeDriver: true,
  },
  barra: {
    duracion: 300, // 0.3s smooth progress update
    useNativeDriver: false, // Width animation
  },
  leo: {
    duracion: 800, // 0.8s jump animation  
    useNativeDriver: true,
  },
} as const;
```

---

## 🎭 **CASOS DE USO PRINCIPALES**

### **Loading Circular**
- Carga de pantallas y navegación
- Peticiones API rápidas  
- Validaciones de formularios
- Refresh de datos

### **Loading Puntos**
- Escribiendo mensajes IA
- Analizando speech-to-text
- Procesando respuestas
- Estados "pensando"

### **Loading Barra**
- Descarga de recursos
- Instalación inicial
- Exportación reportes
- Progreso determinado

### **Loading Leo**  
- Primera carga aplicación
- Completar actividades
- Logros especiales
- Estados celebración

### **Loading Texto**
- Feedback inmediato
- Estados contextuales  
- Confirmaciones rápidas
- Mensajes de proceso

---

## 🔄 **ESTADOS Y TRANSICIONES**

### **Overlay Loading (Fullscreen)**
```typescript
// Similar a Modal.tsx para consistencia
overlay: {
  backgroundColor: Colores.overlayNegro, // 0.5 opacity
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
}
```

### **Inline Loading**
```typescript
// Dentro de componentes existentes
container: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: espaciadoMedio,
}
```

### **Transiciones de Estado**
- **Aparecer**: Fade in 200ms
- **Desaparecer**: Fade out 150ms  
- **Cambio tipo**: Cross-fade 300ms
- **Progreso**: Smooth easing transition

---

## 🧪 **TESTING OBLIGATORIO**

### **Tests Unitarios**
```typescript
describe('Loading', () => {
  it('renders all loading types correctly', () => {
    // Test circular, puntos, barra, leo, texto
  });
  
  it('animates properly with native driver', () => {
    // Test performance of animations
  });
  
  it('handles progress updates smoothly', () => {
    // Test barra type with progress changes
  });
  
  it('applies correct accessibility props', () => {
    // Test WCAG 2.1 AA compliance
  });
  
  it('overlays work correctly', () => {
    // Test fullscreen vs inline variants
  });
  
  it('cancellation works when provided', () => {
    // Test onCancel callback
  });
});
```

### **Performance Tests**
- Verificar animaciones usan useNativeDriver cuando posible
- Validar que overlay no afecta performance de UI
- Confirmar cleanup correcto al desmontar
- Medir impacto de CPU en animaciones

### **Integration Tests**
- Loading con Modal.tsx para overlays
- Loading con AvatarLeo.tsx para tipo "leo"
- Loading con servicios asincrónicos reales
- Loading durante navegación entre pantallas

---

## 🎯 **CRITERIOS ESPECÍFICOS NIÑOS DOWN**

### **Tiempo de Atención**
- **Máximo 3 segundos** antes de mostrar loading
- **Animaciones atractivas** para mantener atención
- **Feedback constante** de que algo está pasando
- **Leo personalizado** para familiaridad

### **Claridad Visual**
- **Colores contrastados** según sistema centralizado
- **Tamaños apropiados** para fácil percepción
- **Movimientos suaves** sin marear
- **Mensajes simples** y positivos

### **Accesibilidad Avanzada**
- **Screen readers** describen estado actual
- **Estimación tiempo** cuando sea posible  
- **Cancelación fácil** si aplica
- **Feedback háptico** en dispositivos compatibles

---

## ⚖️ **CRITERIOS DE CALIDAD**

### ✅ **OBLIGATORIOS**
- [ ] Cero código placebo
- [ ] TypeScript estricto (sin `any`)
- [ ] Error handling para animaciones
- [ ] Accesibilidad WCAG 2.1 AA completa
- [ ] Performance optimizado (useNativeDriver)
- [ ] Testing unitario + integration completo
- [ ] Usa SOLO colores del Design System
- [ ] Compatible con Modal.tsx para overlays
- [ ] Documentación inline completa
- [ ] Calidad de producción (niños Down)
- [ ] Cleanup correcto de timers y animations
- [ ] Soporte para todos los tamaños de pantalla

### 🎯 **OPTIMIZACIÓN ESPECIAL**
- Animaciones que no bloqueen UI principal
- Memoria eficiente para loops infinitos
- Transiciones suaves entre tipos de loading
- Integración perfecta con Leo character system
- Estados de loading contextualmente apropiados

---

**📅 Fecha de especificación**: 23 de septiembre de 2025  
**🎯 Estado**: LISTO PARA IMPLEMENTACIÓN  
**✨ Compatibilidad**: 100% con proyecto existente  
**🦎 Leo Integration**: Totalmente compatible con sistema de personaje