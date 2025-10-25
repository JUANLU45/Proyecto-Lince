Archivo: CAREFUL_ZONES.md
📋 ZONAS DE CUIDADO EN EL PROYECTO - PROYECTO LINCE
Este archivo lista las zonas clave donde tener más cuidado al hacer el proyecto – para no fallar, basado en docs (REQUIREMENTS para seguridad/rendimiento, PDFs para sensibilidad sensorial en page 1, no especular). Cuida estas para .
1. Privacidad y Seguridad Datos

Cuidado: Datos de  (videos, gestos) siempre local/anónimos, GDPR para menores (RNF-009). No compartir sin consentimiento.
Por qué: PDFs page 1 enfatizan protección en apps terapéuticas.
Cómo: Usa cifrado (RNF-010), logs auditoría (RNF-ADMIN-002).

2. Precisión IA (Voz/Gestures/Faciales)

Cuidado: Modelos (YOLOv8, MFCC) con precisión 95% validada terapeutas (CA-IA-001). No especular, usa datos veraces.
Por qué: PDFs page 1 para personalización sensorial sin errores, page 14 para entrenamiento visual/cognitivo.
Cómo: Entrenamiento automático milimétrico, testea con videos .

3. Accesibilidad para Down

Cuidado: Interfaz simple, colores suaves (RNF-003, WCAG AA). Toques imprecisos tolerados, feedback <100ms.
Por qué: PDFs page 1 para perfil sensorial único, regulación emocional.
Cómo: Labels/hints en componentes, testea con niños.

4. Rendimiento y Offline

Cuidado: App fluida en 2GB RAM (RNF-008), carga <3s (RNF-005), offline básico (RNF-004).
Por qué: Para sesiones 10-20 min sin frustración (CA-002).
Cómo: UseMemo/callback, ONNX local IA.

5. Monetización Ética

Cuidado: Freemium sin presiones (MON-001 básico gratis), avisos no-médico (RES-004).
Por qué: Para ayudar familias, no lucrar.
Cómo: Botones suaves, trials 7 días.

6. Integración Granja/Cantajuegos

Cuidado: Animales/songs sin sobrecarga, cambiables fácil (upload portal).
Por qué: Para  le gustan, sensorial divertido.
Cómo: Constantes centrales, testea performance.

7. Testing y Producción

Cuidado: Cero crashes (CA-005), tests 90% cobertura.
Por qué: Para app estable en producción.
Cómo: Jest/Detox, deploy staging primero.
