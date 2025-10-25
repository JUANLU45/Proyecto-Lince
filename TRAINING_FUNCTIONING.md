Archivo: TRAINING_FUNCTIONING.md
📋 FUNCIONAMIENTO DEL ENTRENAMIENTO - PROYECTO LINCE
Guía para cómo funciona el entrenamiento automático, milimétrico y profesional (para voz/gestures/caras de ). Basado en tech 2025 comprobada (PyTorch para entrenamiento adaptativo como en PDFs page 1, Hugging Face para robustez multimodal).
Funcionamiento Paso a Paso (Automatizado)

Extraer: Script extraer.py usa Scrapy para sacar datos veraces (textos PDFs, frames videos expertos). Automatizado: Corre solo con URLs listadas (e.g., ndss.org para Down, YouTube Sentdex para ML pipelines).
Limpiar: Limpiar.py con Pandas quita ruido (duplicados, normaliza datos sensoriales como enfado de PDFs). Automatizado: Función run_clean(input_path) procesa y salida limpia.
Ordenar: Ordenar.py con Pandas ordena por tipo (voz, gestures, faciales). Automatizado: df.sort_values('type'), salida ordenada.
Guardar: Guardar.py usa SQLite para store seguro. Automatizado: conn.insert(data), con backups.
Entrenar: Entrenar.py con PyTorch/Hugging Face carga data, entrena modelos (YOLOv8 para faciales, MFCC para voz). Automatizado: Trainer.fit con early stop, epochs milimétricos.

Todo robusto: Manejo errores en cada script (try/except), logs detallados. Funciona: python master.py – corre pipeline completo. De PDFs: Funcionamiento para regulación emocional (page 1 primer PDF), evidencia adaptativa (segundo PDF).
Dependencias: torch, huggingface-hub, pandas, scrapy, sqlite3, opencv-python (instala con pip, comprobadas para 2025).
Lo que hace falta: Datos iniciales (videos /expertos), GPU para rápido (si no, CPU ok).
Estado: Profesional para .
Archivo: TRAINING_REQUIREMENTS.md
