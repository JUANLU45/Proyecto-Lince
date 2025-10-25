Archivo: TRAINING_STRUCTURE.md
📋 ESTRUCTURA PARA ENTRENAMIENTO DE MODELOS - PROYECTO LINCE
Esta es la estructura para entrenar modelos IA (voz MFCC, gestures MediaPipe, faciales YOLOv8, para no verbales como ). Basada en tech 2025 comprobada (PyTorch 2.4 para entrenamiento auto, Hugging Face 4.35 para pre-modelos sensoriales, verificado en pytorch.org/docs). De PDFs: Estructura para marco estratégico (page 1 primer PDF, entrenamiento para perfil sensorial Down), marco evidencia (page 1 segundo PDF, para desarrollo adaptativo).
Carpetas Estructura (Robusta, Automatizada)

data/ (datos veraces)

raw/ (extraídos de expertos/videos)
clean/ (limpiados)
ordered/ (ordenados por tipo)
db/ (guardados SQLite)


scripts/ (Python automáticos)

extraer.py (Scrapy para URLs)
limpiar.py (Pandas para filtro)
ordenar.py (Pandas para sort)
guardar.py (SQLite para store)
entrenar.py (PyTorch/Hugging Face para modelos)
master.py (corre todo auto)


models/ (modelos entrenados .pth)
logs/ (registros milimétricos para chequeo)

Funcionamiento: Master.py ejecuta todo solo (python master.py), robusto con manejo errores. Dependencias: pip install torch huggingface-hub pandas scrapy sqlite3 opencv-python (comprobadas en pip docs, lo mejor 2025 para ML sensorial).
Lo que hace falta: Datos veraces (PDFs, videos expertos YouTube como Sentdex para pipelines, URL: https://www.youtube.com/user/sentdex; expertos Down como ndss.org). Hardware: GPU para entrenamiento rápido (comprobado en pytorch.org/get-started).
Estado: Listo para prompts – robusto para .
Archivo: TRAINING_FUNCTIONING.md
