Archivo: ERROR_DETECTION.md
Preámbulo del Archivo: Motivo y Prohibiciones
Esta configuración de errores es para Proyecto Lince, para asegurar cero fallos en IA para . No es un juego: es detección real para terapeutas 24/7. Prohibido especular: solo reglas verificadas, por mi seriedad en no fallarle.
🔍 CONFIGURACIÓN DE DETECCIÓN DE ERRORES PROYECTO LINCE
Sistema de Control de Calidad Automatizado

OBJETIVO: Detectar errores perfectamente y garantizar código de producción


🚨 LÍMITES ESTRICTOS CONFIGURADOS
📏 LÍMITES DE COMPLEJIDAD

Complejidad ciclomática máxima: 15 por función
Profundidad máxima de anidación: 4 niveles
Callbacks anidados máximo: 3 niveles
Parámetros por función máximo: 5

📄 LÍMITES DE ARCHIVO

Líneas por archivo máximo: 300 (sin contar espacios y comentarios)
Líneas por función máximo: 50 (sin contar espacios y comentarios)
Si excede: Dividir en componentes más pequeños


🛠️ HERRAMIENTAS DE DETECCIÓN
1. ESLint - Análisis de código en tiempo real
bash# Ejecutar análisis completo
npm run lint

# Análisis con corrección automática
npm run lint:fix

# Análisis específico de complejidad
npm run lint:complexity
2. TypeScript Compiler - Verificación de tipos estricta
bash# Verificación completa de tipos
npm run type-check

# Verificación en modo watch
npm run type-check:watch
3. Prettier - Formato consistente
bash# Formatear todos los archivos
npm run format

# Verificar formato sin cambios
npm run format:check
4. Husky + Lint-staged - Control pre-commit

Bloquea commits con errores
Ejecuta linting automático
Verifica formato antes de commit


🎯 ERRORES DETECTADOS AUTOMÁTICAMENTE
❌ CÓDIGO PLACEBO (CERO TOLERANCIA)

console.log() en producción → ERROR
TODO comments → ERROR
debugger statements → ERROR
Variables no usadas → ERROR
Imports no utilizados → ERROR
Código inalcanzable → ERROR

🔒 TYPESCRIPT ESTRICTO

Uso de any → ERROR
Asignaciones no seguras → ERROR
Accesos no seguros → ERROR
Booleanos no estrictos → ERROR

🎨 DESIGN SYSTEM

Colores hardcodeados → ERROR
Estilos inline → ERROR
Texto fuera de componentes Text → ERROR

♿ ACCESIBILIDAD

Imágenes sin alt text → ERROR
Labels sin controles asociados → ERROR
Elementos distractores → ERROR
Props ARIA incorrectos → ERROR

📱 REACT NATIVE ESPECÍFICO

Estilos no utilizados → ERROR
Componentes de plataforma mixtos → ERROR
Performance anti-patterns → ERROR

Ampliaciones para IA

Modelos sin ONNX export → ERROR
Dependencias con lock-in → ERROR


📊 MÉTRICAS DE CALIDAD
Complejidad Ciclomática
text1-5:   Código simple ✅
6-10:  Código moderado ⚠️
11-15: Código complejo ⚠️⚠️
16+:   RECHAZADO ❌
Cobertura de Tests
text90-100%: Excelente ✅
80-89%:  Bueno ⚠️
70-79%:  Aceptable ⚠️⚠️
<70%:    INACEPTABLE ❌
Performance

Time to Interactive < 3s
Bundle size < 10MB
Memory usage < 100MB


🚀 COMANDOS DE VERIFICACIÓN
Verificación Completa Pre-Deploy
bashnpm run verify:all
Verificación de Complejidad
bashnpm run verify:complexity
Verificación de Tamaño de Archivos
bashnpm run verify:file-size
Verificación de Accesibilidad
bashnpm run verify:a11y

🔧 CONFIGURACIÓN VS CODE
Extensiones Requeridas
json{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-json"
  ]
}
Settings.json
json{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "typescript.preferences.strictNullChecks": true,
  "typescript.preferences.noImplicitAny": true,
  "eslint.validate": ["typescript", "typescriptreact"]
}

🚨 PROTOCOLO DE ERRORES CRÍTICOS
Si ESLint encuentra errores:

NO IGNORAR NUNCA las reglas
CORREGIR INMEDIATAMENTE
NO HACER COMMIT hasta resolver
DIVIDIR ARCHIVO si excede 300 líneas
REFACTORIZAR FUNCIÓN si excede complejidad 15

Si TypeScript encuentra errores:

NO USAR any como solución
DEFINIR TIPOS APROPIADOS
VERIFICAR INTERFACES
VALIDAR PROPS REQUERIDOS

Flujo de Resolución de Errores:
textError detectado → Analizar causa → Aplicar solución → Verificar → Commit

📈 MÉTRICAS DE MONITOREO
Dashboard de Calidad

Complejidad promedio por archivo
Líneas de código por componente
Cobertura de tests por módulo
Errores de accesibilidad pendientes
Performance score

Reportes Automáticos

Reporte diario de calidad de código
Alertas de complejidad excesiva
Notificaciones de archivos grandes
Métricas de performance


🎯 OBJETIVOS DE CALIDAD
Estándares Mínimos

✅ 0 errores de ESLint
✅ 0 errores de TypeScript
✅ 100% archivos < 300 líneas
✅ 100% funciones complejidad < 15
✅ 90%+ cobertura de tests
✅ 100% accesibilidad compatible

Proceso de Mejora Continua

Medición diaria de métricas
Identificación de patrones problemáticos
Refactoring proactivo
Optimización de performance
Actualización de estándares
