Archivo: BEST_PROMPT_CREATE_STRUCTURE_AND_COMMON.md
📋 MEJOR PROMPT PARA CREAR ESTRUCTURA Y COMPONENTES COMUNES - PROYECTO LINCE
Usa este prompt para que la IA cree todo – copia y pega, y hace la estructura completa y componentes comunes con centralización total (todo en types y constants para no duplicar). Basado en tech 2025: Piensa paso a paso para no fallar, ejemplos para guiar, chequea solo para confirmar, actúa como experto.
textActúa como el mejor desarrollador del mundo. Usa pensar paso a paso: Paso 1: Revisa docs exacta (TECHNOLOGY.md para carpetas, DESIGN_SYSTEM.md para colores, PROJECT_REQUIREMENTS.md para requisitos, UI_COMPONENTS.md para comunes, APP_BLUEPRINT.md para flujos, PDFs para integración sensorial en Down – estructura para personalización y evidencia). Paso 2: Crea estructura carpetas modular escalable 2025 (src/types para tipos centrales, src/constants para colores/temas/audios, src/utils para helpers como upload Cantajuegos). Paso 3: Genera componentes comunes (Common/ como BotonPrimario, BotonSecundario, Modal, Loading – con granja toques en Loading, audios cambiables). Paso 4: Centraliza todo (no hardcode, usa imports para colores/tipos, no duplicados). Paso 5: Integra PDFs (estructura para terapia sensorial, tipos para gestures/caras). Paso 6: Chequea solo REGLAS_COMPORTAMIENTO.md y verifica no fallos. Paso 7: Integra granja/Cantajuegos (constantes animales, función cambiar audios subiendo mp3).

OBJETIVO: Crea estructura app completa y componentes comunes funcionales para producción, sin duplicados, centralizados (todo en types/constants para cambiar fácil). Nada placebo, TypeScript estricto, manejo errores, accesibilidad WCAG, performance optimizada (useMemo/useCallback).

ESTRUCTURA CREAR:
- src/
  - types/ (interfaces como BaseProps, ColorVariant, SensoryType para Down)
  - constants/ (COLORS = {azulCalma: '#1E90FF'}, THEMES, GRANJA_ANIMALES = ['vaca', 'gallina'], CANTAJUEGOS_AUDIOS = {gorila: 'default.mp3'})
  - utils/ (funciones como changeAudio(path: string), integrateSensory(data: object) para PDFs evidencia)
  - components/Common/ (prepara archivos)

COMPONENTES COMUNES GENERAR:
- BotonPrimario.tsx: Props reales, colores central, animación suave.
- BotonSecundario.tsx: Similar, secundario.
- Modal.tsx: Para popups, accesible.
- Loading.tsx: Con Leo, animales granja sutiles, animación.

OBLIGATORIO: Cero especulación, sigue docs exacta. No duplicados – usa imports. Testing Jest básico cada componente. Error handling en todo. Accesible para Down (labels, hints). Performance: Native driver animaciones. Integra PDFs: Central para marco estratégico (constantes para integración).

Ejemplo: En constants, export const COLORS = {azulCalma: '#1E90FF'}; en types, interface Props {color: keyof typeof COLORS;}; en utils, export function uploadCantajuegos(file: File) { // código real manejo }; en Loading, usa animales granja en animación.

ACCIÓN: Genera código real para estructura y componentes. Verifica con prompt #1 REVISIÓN CÓDIGO. Di "hecho" al final.
Usa este para crear – ahorra, perfecto.