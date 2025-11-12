# 🔥 Pasos Finales para Completar Configuración Firebase

## ✅ YA HECHO

He configurado los archivos básicos de Firebase:
- ✅ `.env` con credenciales
- ✅ `android/app/google-services.json`
- ✅ `ios/GoogleService-Info.plist`

## ⚠️ IMPORTANTE: Faltan 2 Pasos Críticos

### 📱 **PASO 1: Crear Apps Android e iOS en Firebase Console**

#### Para Android:

1. Ve a [Firebase Console](https://console.firebase.google.com/project/proyecto-lince-b61b6)
2. Click en el icono de Android (⚙️) para "Agregar app"
3. Completa:
   - **Package name**: `com.proyectolince.app` (EXACTAMENTE ESTO)
   - **App nickname**: "Proyecto Lince Android"
   - **SHA-1**: (Opcional por ahora, necesario para autenticación)
4. Click "Registrar app"
5. **DESCARGAR** el archivo `google-services.json` generado
6. **REEMPLAZAR** el archivo en: `android/app/google-services.json`

#### Para iOS:

1. En Firebase Console, click en el icono de iOS (⚙️) para "Agregar app"
2. Completa:
   - **Bundle ID**: `com.proyectolince.app` (EXACTAMENTE ESTO)
   - **App nickname**: "Proyecto Lince iOS"
3. Click "Registrar app"
4. **DESCARGAR** el archivo `GoogleService-Info.plist` generado
5. **REEMPLAZAR** el archivo en: `ios/GoogleService-Info.plist`

---

### 🔐 **PASO 2: Activar Servicios en Firebase Console**

#### 2.1 Authentication (Autenticación)

1. En Firebase Console: **Authentication** → **Get Started**
2. Habilitar métodos:
   - ✅ **Email/Password** (requerido)
   - ✅ **Anonymous** (opcional para testing)
3. Click "Save"

#### 2.2 Firestore Database

1. En Firebase Console: **Firestore Database** → **Create database**
2. Modo: **Test mode** (por ahora, cambiaremos a producción después)
3. Región: **us-central1** (o más cercana)
4. Click "Enable"

#### 2.3 Storage

1. En Firebase Console: **Storage** → **Get Started**
2. Modo: **Test mode** (por ahora)
3. Región: **us-central1**
4. Click "Done"

#### 2.4 Reglas de Seguridad (IMPORTANTE)

**Para Firestore**, ve a **Firestore Database** → **Rules** y pega:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Función helper para verificar autenticación
    function isAuthenticated() {
      return request.auth != null;
    }

    // Función helper para verificar propietario
    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    // Perfiles de niños
    match /perfiles/{perfilId} {
      allow read: if isAuthenticated() &&
                     (isOwner(resource.data.uid) ||
                      request.auth.uid in get(/databases/$(database)/documents/perfiles/$(perfilId)).data.padresAutorizados);
      allow create: if isAuthenticated();
      allow update, delete: if isAuthenticated() && isOwner(resource.data.uid);
    }

    // Progreso
    match /progreso/{progresoId} {
      allow read, write: if isAuthenticated() && isOwner(resource.data.uid);
    }

    // Sesiones
    match /sesiones/{sesionId} {
      allow read, write: if isAuthenticated() && isOwner(resource.data.uid);
    }

    // Insights (solo lectura para usuarios, escritura solo Functions)
    match /insights/{insightId} {
      allow read: if isAuthenticated() && isOwner(resource.data.perfilId);
      allow write: if false; // Solo Cloud Functions
    }

    // Actividades (públicas, solo lectura)
    match /actividades/{actividadId} {
      allow read: if true;
      allow write: if false; // Solo admins via Functions
    }

    // Usuarios
    match /usuarios/{userId} {
      allow read, write: if isAuthenticated() && isOwner(userId);
    }
  }
}
```

**Para Storage**, ve a **Storage** → **Rules** y pega:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /uploads/{userId}/{allPaths=**} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null &&
                      request.auth.uid == userId &&
                      request.resource.size < 10 * 1024 * 1024; // Max 10MB
    }
  }
}
```

Click "Publish" en ambos.

---

## 🧪 **PASO 3: Verificar Configuración**

### 3.1 Verificar que node_modules existe

```bash
# Si no existe:
npm install --legacy-peer-deps
```

### 3.2 Iniciar la app

```bash
npm start
```

### 3.3 Testing de Firebase

La app debería:
- ✅ Inicializar sin errores
- ✅ Mostrar pantalla de carga
- ✅ Poder navegar (aunque falten assets)

Para verificar Firebase específicamente, revisa los logs:
```bash
# Debería aparecer:
# "Firebase inicializado correctamente"
# Sin mensajes de error de Firebase
```

---

## 🔧 **Troubleshooting**

### Error: "Default Firebase app not initialized"

**Solución**: Verifica que los archivos `google-services.json` y `GoogleService-Info.plist` tienen los IDs correctos de las apps Android/iOS creadas en Firebase Console.

### Error: "Auth domain not whitelisted"

**Solución**:
1. Ve a Firebase Console → Authentication → Settings
2. En "Authorized domains", añade: `proyecto-lince-b61b6.firebaseapp.com`

### Error: "Storage bucket not configured"

**Solución**: Ve a Firebase Console → Storage → Get Started y activa Storage.

---

## 📋 **Checklist Final**

Antes de continuar con desarrollo, verifica:

- [ ] App Android creada en Firebase Console
- [ ] App iOS creada en Firebase Console
- [ ] `google-services.json` descargado y reemplazado
- [ ] `GoogleService-Info.plist` descargado y reemplazado
- [ ] Authentication activado con Email/Password
- [ ] Firestore Database creado
- [ ] Storage activado
- [ ] Reglas de seguridad configuradas
- [ ] App inicia sin errores de Firebase

---

## 🚀 **Siguiente Paso**

Una vez completados estos pasos:

1. **Assets**: Añadir imágenes, audios, fuentes (ver `01_LEO_IMAGENES.md` a `06_FUENTES_TEXTO.md`)
2. **Testing**: Probar flujos de autenticación
3. **Cloud Functions**: Desplegar funciones de IA (opcional por ahora)

---

**🎯 Estado Actual**: Configuración básica lista. Faltan apps Android/iOS en Firebase Console.

**⏱️ Tiempo estimado**: 15-20 minutos para completar los pasos.
