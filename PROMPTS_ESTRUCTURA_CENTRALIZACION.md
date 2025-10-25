📋 PROMPTS PARA ESTRUCTURA CENTRALIZADA - PROYECTO LINCE
Prompts para crear y manejar estructura centralizada – carpetas modulares como en guías 2025, central en src/types y src/constants para no duplicados. Cambia [detalles], y la IA hace perfecto con tech 2025 (pensar paso a paso, ejemplos, chequear solo).
🔨 PROMPT PARA CREAR ESTRUCTURA CENTRALIZADA COMPLETA
textActúa como desarrollador experto. Usa pensar paso a paso: Paso 1: Revisa docs (TECHNOLOGY.md para carpetas, DESIGN_SYSTEM.md para colores). Paso 2: Crea estructura modular escalable 2025 (src/types para tipos centrales, src/constants para colores/temas/audios). Paso 3: Centraliza todo (no hardcode, usa imports). Paso 4: Integra PDFs (estructura para integración sensorial Down, tipos para personalización). Paso 5: Chequea solo: ¿No duplicados? Corrige. Paso 6: Añade granja/Cantajuegos (constantes para animales/audios cambiables).

OBJETIVO: Crea estructura centralizada modular para app producción, sin duplicados. Basado en guías 2025: Carpetas como src/types, src/constants para todo compartido.

ESTRUCTURA CREAR:
- src/
  - types/ (interfaces como BaseProps, SensoryIntegrationProps para Down)
  - constants/ (COLORS = {azulCalma: '#1E90FF'}, THEMES, GRANJA_ANIMALES = ['vaca', 'gallina'], CANTAJUEGOS_AUDIOS = {gorila: 'path.mp3'})
  - utils/ (funciones como changeAudio(path: string), integrateSensory(data: object))
  - services/ (abstracción central, no dependencias fijas)

OBLIGATORIO: TypeScript estricto, manejo errores, accesibilidad, performance. Integra PDFs: Central para marco estratégico (constantes para integración).

Ejemplo: En constants, export const COLORS = {azulCalma: '#1E90FF', verdeGranja: '#228B22'}; en types, interface IntegrationProps {sensoryType: 'visual' | 'auditiva'}; en utils, función uploadCantajuegos(file: File) { // código real }.

ACCIÓN: Genera código real. Verifica con prompt #1 REVISIÓN CÓDIGO. Di "hecho".
🔍 PROMPT PARA REVISAR ESTRUCTURA CENTRALIZADA
textActúa como desarrollador experto. Usa pensar paso a paso: Paso 1: Lista elementos centrales (types, constants). Paso 2: Chequea duplicados/hardcode. Paso 3: Verifica uso en app. Paso 4: Chequea solo: ¿Cumple PDFs integración? Corrige.

ESTRUCTURA: src/types/ y src/constants/

CRITERIOS: ¿Duplicados? ¿Types estricto? ¿Integra granja (constantes animales)? ¿Cambios fáciles Cantajuegos? ¿Cumple docs?

Ejemplo: Si color fijo, mueve a constants.

ACCIÓN: Lista problemas. Corrige si hay.
🛠️ PROMPT PARA ARREGLAR PROBLEMAS EN ESTRUCTURA CENTRALIZADA
textActúa como desarrollador experto. Usa pensar paso a paso: Paso 1: Identifica con prompt revisar. Paso 2: Arregla central. Paso 3: Integra fixes. Paso 4: Chequea solo: ¿Perfecta?

ESTRUCTURA: src/types/ y src/constants/

PROBLEMAS: [Lista]

OBLIGATORIO: No duplicados. Integra PDFs (central para personalización).

Ejemplo: Problema hardcode audio – Mueve a constants, añade función cambiar.

ACCIÓN: Arregla. Verifica.
📂 PROMPT PARA INTEGRAR NUEVA FEATURE EN ESTRUCTURA CENTRALIZADA
textActúa como desarrollador experto. Usa pensar paso a paso: Paso 1: Consulta docs feature. Paso 2: Añade a types/constants. Paso 3: No rompe. Paso 4: Chequea solo compatibilidad.

FEATURE: [Describe, ej. Añadir constantes para audios Cantajuegos cambiables]

OBLIGATORIO: Central total, fácil cambio.

Ejemplo: Para audios, añade const AUDIOS = {}; función en utils cambiar.

ACCIÓN: Integra. Verifica con prompt revisar.