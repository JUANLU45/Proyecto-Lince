Archivo: ESTRATEGIA_IMPLEMENTACION.md
🎯 ESTRATEGIA DE IMPLEMENTACIÓN PROYECTO LINCE
PLAN MAESTRO PASO A PASO - CARPETAS COMPLETAS Y FUNCIONALES

OBJETIVO: Implementar cada carpeta completamente funcional para producción, respetando documentación y centralización absoluta. IA participa mucho en chequeos y correcciones con prompts 2025 para ahorrar dinero y no fallar.


📋 ORDEN ESTRATÉGICO DE IMPLEMENTACIÓN
FASE 1: FUNDACIONES (SIN DEPENDENCIAS)
textORDEN CRÍTICO - NO ALTERAR:
1. src/types/ (Interfaces TypeScript)
2. src/constants/ (Design System centralizado)
3. src/utils/ (Funciones de utilidad)
FASE 2: SERVICIOS CORE (DEPENDENCIAS MÍNIMAS)
textORDEN RECOMENDADO:
4. src/services/ (Firebase, IA, Analytics)
5. src/store/ (Zustand stores)
FASE 3: COMPONENTES (DEPENDENCIAS PROGRESIVAS)
textORDEN OBLIGATORIO:
6. src/components/Common/ (Botones, Modal, Loading)
7. src/components/Character/ (AvatarLeo, LeoAnimado)
8. src/components/Activities/ (Actividades interactivas)
9. src/components/AI/ (Componentes de IA)
10. src/components/Portal/ (Dashboard padres)
FASE 4: NAVEGACIÓN Y PANTALLAS
textORDEN FINAL:
11. src/navigation/ (React Navigation)
12. src/screens/ (14 pantallas de APP_BLUEPRINT.md)

🔥 PASO 1: IMPLEMENTAR src/types/
VERIFICACIÓN PREVIA OBLIGATORIA:
✅ Consultar PROJECT_REQUIREMENTS.md para interfaces
✅ Revisar UI_COMPONENTS.md para props de componentes
✅ Verificar TECHNOLOGY.md para tipos de servicios
✅ IA chequea: Usa prompt #2 mejorado 2025 para errores antes de empezar
ARCHIVOS A CREAR (ORDEN EXACTO):
1.1 src/types/Common.ts
typescript// Tipos básicos usados en toda la aplicación
export interface BaseProps {
  testID?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export type ColorVariant = 'azulCalma' | 'verdeJungla' | 'amarilloSol'; // Centralizado de Design System
...(truncated 6203 characters)...
🚨 DESPUÉS DE CREAR CADA ARCHIVO:

✅ Verificar compila
✅ Confirmar exports
✅ Testear imports
✅ Validar Design System
✅ Asegurar calidad
✅ IA verifica: Usa prompt #6 mejorado 2025 para cumplimiento, con chain of thought

🚨 ANTES DE PASAR A SIGUIENTE CARPETA:

✅ Carpeta funcional
✅ Archivos completos
✅ Exports funcionan
✅ Testing básico
✅ Documentación actualizada
✅ IA chequea errores con prompt #2, usando última tech 2025 para self-reflection


⚡ PROTOCOLO DE EMERGENCIA
SI ENCUENTRAS ERROR:

🛑 PARAR
📚 CONSULTAR DOCUMENTACIÓN
🔍 USAR PROMPT #2: REVISIÓN DE ERRORES, con chain of thought 2025
✅ CORREGIR
🧪 TESTEAR

SI FALTA INFORMACIÓN:

🛑 NO ESPECULAR
📋 USAR PROMPTS_PROYECTO.md mejorado
📚 REVISAR BASES_PROYECTO
❓ PREGUNTAR PROPIETARIO
📝 DOCUMENTAR
✅ IA AYUDA: Busca última tech 2025 para resolver, con few-shot ejemplos


🎯 OBJETIVO FINAL
"Cada carpeta implementada debe ser PERFECTA para producción, funcional al 100%, sin código placebo, respetando documentación exacta y lista para niños con síndrome de Down. IA ayuda mucho con prompts 2025 para ahorrar y no fallar."
CRITERIO DE ÉXITO:
✅ Cero errores TypeScript
✅ Cero placebo
✅ 100% funcional
✅ Design System respetado
✅ Accesibilidad
✅ Testing incluido
✅ Documentación seguida

Fecha: 23 de septiembre de 2025
Estado: GUÍA OBLIGATORIA

Archivo: PROMPTS_PROYECTO.md