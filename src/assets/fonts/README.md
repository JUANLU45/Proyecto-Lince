# Custom Fonts Documentation - Placeholder
#
# ESPECIFICACIONES SEGÚN DOCUMENTACIÓN:
# - TECHNOLOGY.md línea 60: "assets/ # Fuentes, imágenes, sonidos"
# - DESIGN_SYSTEM.md: Sistema tipográfico centralizado
# - PROJECT_REQUIREMENTS.md: Accesibilidad WCAG 2.1 AA
# - UI_COMPONENTS.md: Textos legibles para niños síndrome Down
#
# FUENTES REQUERIDAS SEGÚN DISEÑO SYSTEM:
#
# 1. PRIMARY FONT FAMILY:
# - Archivo: proyecto-lince-primary.ttf
# - Uso: Títulos, headers, navegación principal
# - Características: Sans-serif, friendly, high readability
# - Tamaños: 16px-32px optimized para mobile
#
# 2. BODY TEXT FONT:
# - Archivo: proyecto-lince-body.ttf  
# - Uso: Textos cuerpo, descripción actividades, mensajes
# - Características: Sans-serif, excellent legibility, dyslexia-friendly
# - Tamaños: 14px-18px optimized reading
#
# 3. UI ELEMENTS FONT:
# - Archivo: proyecto-lince-ui.ttf
# - Uso: Botones, labels, navigation items
# - Características: Medium weight, clear at small sizes
# - Tamaños: 12px-16px UI optimized
#
# ACCESIBILIDAD REQUERIDA:
# - Compatible con zoom sistema hasta 200%
# - High contrast ratio para WCAG 2.1 AA
# - Distinción clara entre caracteres similares (b/d, p/q)
# - Spacing optimizado para lectura niños necesidades especiales
# - Compatible con VoiceOver/TalkBack
#
# CARACTERÍSTICAS ESPECÍFICAS SÍNDROME DOWN:
# - Letter spacing aumentado para clarity
# - Character height optimizado reconocimiento
# - Sans-serif para simplicidad visual
# - Weight consistency para no confundir
# - Numbers claramente distinguibles
#
# IMPLEMENTACIÓN TÉCNICA:
# - Formato: TTF/OTF para compatibilidad máxima
# - Subset Latino básico + números + símbolos
# - File size optimizado < 50KB cada font
# - Preload crítico para performance
# - Fallback fonts definidos
#
# INTEGRACIÓN COMPONENTS:
# - Text.tsx: Font family automática según context
# - BotonPrimario/Secundario: UI font específico
# - Headers: Primary font family
# - Body content: Body font optimized
#
# CONFIGURACIÓN EXPO:
# - expo.json: fonts array con asset paths
# - Font.loadAsync() en App startup
# - useFonts hook para component integration
#
# NOTA: Placeholders para fuentes reales custom design proyecto