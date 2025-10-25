Archivo: PROMPTS_TRAINING_FOLDER.md
📁 CARPETA DE PROMPTS PARA ENTRENAMIENTO - PROYECTO LINCE
Prompts para que IA cree scripts – copia y pega, cambia [ruta], y hace automático, robusto con Python. Basado en veraces: Videos Sentdex (URL: https://www.youtube.com/user/sentdex).
🔍 PROMPT PARA CREAR SCRIPT EXTRAER
textActúa como experto ML. Usa pensar paso a paso: Paso 1: Busca URLs veraces (expertos Down, YouTube Sentdex). Paso 2: Crea script Scrapy para extraer. Paso 3: Chequea solo: ¿Veraz? Corrige. Paso 4: Integra PDFs.

RUTA SALIDA: [Cambia por ruta, ej. data/raw.json]

OBLIGATORIO: Automatizado, solo expertos.

Ejemplo: from scrapy import Spider; class ExpertSpider(Spider): ... 

ACCIÓN: Genera script Python real. Ejecuta auto.
🧹 PROMPT PARA CREAR SCRIPT LIMPIAR
textActúa como experto ML. Usa pensar paso a paso: Paso 1: Lee raw. Paso 2: Crea script Pandas para limpiar. Paso 3: Chequea solo calidad. Paso 4: Integra PDFs.

RUTA ENTRADA: [Cambia por ruta]
RUTA SALIDA: [Cambia por ruta]

OBLIGATORIO: Automatizado, robusto.

Ejemplo: import pandas as pd; df = pd.read_json(path); df.drop_duplicates(); df.to_csv(out).

ACCIÓN: Genera script Python real. Ejecuta auto.
📊 PROMPT PARA CREAR SCRIPT ORDENAR
textActúa como experto ML. Usa pensar paso a paso: Paso 1: Lee clean. Paso 2: Crea script Pandas para ordenar. Paso 3: Chequea solo orden. Paso 4: Integra PDFs.

RUTA ENTRADA: [Cambia por ruta]
RUTA SALIDA: [Cambia por ruta]

OBLIGATORIO: Automatizado, milimétrico.

Ejemplo: df.sort_values('type'); df.to_csv(out).

ACCIÓN: Genera script Python real. Ejecuta auto.
💾 PROMPT PARA CREAR SCRIPT GUARDAR
textActúa como experto ML. Usa pensar paso a paso: Paso 1: Lee ordered. Paso 2: Crea script SQLite para guardar. Paso 3: Chequea solo guardado. Paso 4: Integra PDFs.

RUTA ENTRADA: [Cambia por ruta]
RUTA SALIDA: [Cambia por ruta]

OBLIGATORIO: Seguro, automatizado.

Ejemplo: import sqlite3; conn = sqlite3.connect(out); df.to_sql('data', conn).

ACCIÓN: Genera script Python real. Ejecuta auto.
🏋️ PROMPT PARA CREAR SCRIPT ENTRENAR
textActúa como experto ML. Usa pensar paso a paso: Paso 1: Lee db. Paso 2: Crea script PyTorch/Hugging Face para entrenar. Paso 3: Chequea solo precisión. Paso 4: Integra PDFs.

RUTA ENTRADA: [Cambia por ruta]
RUTA MODELO: [Cambia por ruta]

OBLIGATORIO: Automatizado máximo, robusto.

Ejemplo: import torch; model = torch.nn.Module(); trainer.fit(model, data).

ACCIÓN: Genera script Python real. Ejecuta auto.
🔄 PROMPT PARA CREAR SCRIPT MASTER AUTOMATIZADO
textActúa como experto ML. Usa pensar paso a paso: Paso 1: Integra scripts (extraer, limpiar, etc.). Paso 2: Crea master.py para correr todo. Paso 3: Chequea solo total. Paso 4: Integra PDFs.

RUTAS: [Cambia por tus rutas]

OBLIGATORIO: Automatizado total, robusto.

Ejemplo: from extraer import run; run(); from limpiar import run; run(); etc.

ACCIÓN: Genera master script Python real. Ejecuta auto para .
