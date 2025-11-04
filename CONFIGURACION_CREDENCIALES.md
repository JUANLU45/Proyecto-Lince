# 🔐 Guía de Configuración de Credenciales - Proyecto Lince

## 📋 Índice

1. [Firebase Setup](#1-firebase-setup)
2. [Google Cloud Setup](#2-google-cloud-setup)
3. [Stripe Setup](#3-stripe-setup)
4. [Variables de Entorno](#4-variables-de-entorno)
5. [Configuración Android](#5-configuración-android)
6. [Configuración iOS](#6-configuración-ios)
7. [Verificación](#7-verificación)

---

## 1. Firebase Setup

### 1.1 Crear Proyecto Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Click en "Agregar proyecto"
3. Nombre: `proyecto-lince`
4. Habilita Google Analytics (recomendado)
5. Configura Analytics (región, términos)

### 1.2 Configurar Authentication

1. En Firebase Console: **Authentication** > **Get Started**
2. Habilita los siguientes métodos:
   - ✅ Email/Password
   - ✅ Google (opcional)
3. En **Settings** > **Authorized domains**:
   - Agrega tu dominio de producción

### 1.3 Configurar Firestore Database

1. En Firebase Console: **Firestore Database** > **Create database**
2. Modo: **Producción** (con reglas de seguridad)
3. Región: `us-central1` (o más cercana a tus usuarios)
4. Configura las reglas de seguridad:

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
                      request.auth.uid in resource.data.padresAutorizados);
      allow create: if isAuthenticated();
      allow update, delete: if isAuthenticated() && isOwner(resource.data.uid);
    }

    // Progreso
    match /progreso/{progresoId} {
      allow read, write: if isAuthenticated() && isOwner(resource.data.perfilId);
    }

    // Sesiones de actividades
    match /sesiones/{sesionId} {
      allow read, write: if isAuthenticated() && isOwner(resource.data.usuarioId);
    }

    // Insights (solo lectura para usuarios)
    match /insights/{insightId} {
      allow read: if isAuthenticated() && isOwner(resource.data.perfilId);
      allow write: if false; // Solo Cloud Functions pueden escribir
    }

    // Actividades (públicas, solo lectura)
    match /actividades/{actividadId} {
      allow read: if true;
      allow write: if false; // Solo admins
    }

    // Administración
    match /usuarios/{userId} {
      allow read: if isAuthenticated() && isOwner(userId);
      allow write: if isAuthenticated() && isOwner(userId);
    }
  }
}
```

### 1.4 Configurar Firebase Storage

1. En Firebase Console: **Storage** > **Get Started**
2. Modo: **Producción**
3. Región: `us-central1`
4. Configura reglas de seguridad:

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

### 1.5 Obtener Credenciales de Firebase

#### Para Android:

1. En Firebase Console: **Project Settings** > **Your apps** > **Android**
2. Click "Add app" / "Agregar app"
3. Package name: `com.proyectolince.app`
4. Descarga `google-services.json`
5. **IMPORTANTE**: Coloca el archivo en: `android/app/google-services.json`

#### Para iOS:

1. En Firebase Console: **Project Settings** > **Your apps** > **iOS**
2. Click "Add app" / "Agregar app"
3. Bundle ID: `com.proyectolince.app`
4. Descarga `GoogleService-Info.plist`
5. **IMPORTANTE**: Coloca el archivo en: `ios/GoogleService-Info.plist`

#### Credenciales para .env:

En **Project Settings** > **General**, copia los valores de "Firebase SDK snippet":

```env
FIREBASE_ANDROID_API_KEY=AIzaSy...
FIREBASE_ANDROID_AUTH_DOMAIN=proyecto-lince.firebaseapp.com
FIREBASE_ANDROID_PROJECT_ID=proyecto-lince
FIREBASE_ANDROID_STORAGE_BUCKET=proyecto-lince.appspot.com
FIREBASE_ANDROID_MESSAGING_SENDER_ID=123456789012
FIREBASE_ANDROID_APP_ID=1:123456789012:android:abc123def456
```

---

## 2. Google Cloud Setup

### 2.1 Activar APIs Necesarias

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona el proyecto Firebase creado anteriormente
3. En **APIs & Services** > **Library**, activa:
   - ✅ Cloud Speech-to-Text API
   - ✅ Cloud Vision API
   - ✅ Cloud Functions API
   - ✅ Cloud Firestore API
   - ✅ Cloud Storage API

### 2.2 Crear Service Account

1. **IAM & Admin** > **Service Accounts**
2. Click "Create Service Account"
3. Nombre: `proyecto-lince-ai-service`
4. Roles:
   - Cloud Functions Invoker
   - Cloud Speech Client
   - Cloud Vision Client
   - Firestore User
5. Click "Create Key" > JSON
6. **IMPORTANTE**: Guarda el archivo como `serviceAccountKey.json` en la raíz del proyecto
7. **CRÍTICO**: ⚠️ NO commitear este archivo a Git (ya está en .gitignore)

### 2.3 Configurar Cloud Functions

#### Instalar Firebase CLI:

```bash
npm install -g firebase-tools
firebase login
firebase init functions
```

#### Crear funciones de IA:

Crea los archivos en `functions/src/`:

**functions/src/index.ts**:

```typescript
import * as functions from 'firebase-functions';
import * as speech from '@google-cloud/speech';
import * as vision from '@google-cloud/vision';

// Inicializar clientes
const speechClient = new speech.SpeechClient();
const visionClient = new vision.ImageAnnotatorClient();

// Función: Análisis de Voz
export const analizarVoz = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Usuario no autenticado');
  }

  // Implementar análisis de voz con Speech-to-Text
  // ... código de análisis ...
});

// Función: Análisis Facial
export const analizarFacial = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Usuario no autenticado');
  }

  // Implementar análisis facial con Vision API
  // ... código de análisis ...
});

// Función: Generar Sugerencia IA
export const generarSugerencia = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Usuario no autenticado');
  }

  // Lógica de generación de sugerencias
  // ... código de IA ...
});
```

#### Desplegar:

```bash
firebase deploy --only functions
```

---

## 3. Stripe Setup

### 3.1 Crear Cuenta Stripe

1. Ve a [Stripe Dashboard](https://dashboard.stripe.com/)
2. Crea una cuenta o inicia sesión
3. Activa tu cuenta (requiere verificación de identidad)

### 3.2 Obtener API Keys

1. En Dashboard: **Developers** > **API keys**
2. Copia:
   - **Publishable key** (pk_test_... para test, pk_live_... para producción)
   - **Secret key** (sk_test_... para test, sk_live_... para producción)

### 3.3 Configurar Webhooks

1. **Developers** > **Webhooks** > **Add endpoint**
2. URL: `https://us-central1-proyecto-lince.cloudfunctions.net/stripeWebhook`
3. Eventos a escuchar:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.deleted`
4. Copia el **Webhook signing secret** (whsec_...)

### 3.4 Crear Productos y Precios

1. **Products** > **Add product**
2. Productos sugeridos:
   - **Gratis**: $0/mes (funcionalidades básicas)
   - **Premium**: $9.99/mes (todas las funcionalidades + análisis IA avanzado)
   - **Familia**: $14.99/mes (hasta 3 perfiles)

---

## 4. Variables de Entorno

### 4.1 Crear archivo .env

```bash
cp .env.example .env
```

### 4.2 Rellenar credenciales

Edita `.env` con las credenciales obtenidas en los pasos anteriores.

### 4.3 Cargar variables en la app

Las variables se cargan automáticamente con `react-native-dotenv`. No se requiere configuración adicional.

---

## 5. Configuración Android

### 5.1 Archivos necesarios

- ✅ `android/app/google-services.json` (descargado en paso 1.5)
- ✅ `android/app/build.gradle` (ya configurado)
- ✅ `android/build.gradle` (ya configurado)

### 5.2 Verificar gradle

En `android/app/build.gradle`, debe estar:

```gradle
apply plugin: 'com.google.gms.google-services'
```

### 5.3 Compilar

```bash
cd android
./gradlew assembleDebug
```

---

## 6. Configuración iOS

### 6.1 Archivos necesarios

- ✅ `ios/GoogleService-Info.plist` (descargado en paso 1.5)
- ✅ `ios/Podfile` (ya configurado)

### 6.2 Instalar pods

```bash
cd ios
pod install
```

### 6.3 Abrir Xcode

```bash
open Proyecto-Lince.xcworkspace
```

En Xcode:
1. Verifica que `GoogleService-Info.plist` esté en el target
2. Verifica Bundle ID: `com.proyectolince.app`
3. Configura signing (requiere Apple Developer Account)

---

## 7. Verificación

### 7.1 Verificar Firebase

```bash
npm run start
```

En la app:
1. Intenta registrarte con email/password
2. Verifica que el usuario aparezca en Firebase Console > Authentication

### 7.2 Verificar Firestore

1. Completa el perfil del niño
2. Verifica que el documento aparezca en Firebase Console > Firestore Database

### 7.3 Verificar Storage

1. Sube una imagen (si la funcionalidad está implementada)
2. Verifica que aparezca en Firebase Console > Storage

### 7.4 Verificar Cloud Functions

```bash
firebase functions:log
```

Revisa los logs para ver si las funciones se ejecutan correctamente.

### 7.5 Verificar Stripe

1. Realiza una compra de prueba
2. Usa tarjeta de prueba: `4242 4242 4242 4242`
3. Verifica en Stripe Dashboard > Payments

---

## 🚨 Seguridad Crítica

### NO COMMITEAR A GIT:

- ❌ `.env`
- ❌ `serviceAccountKey.json`
- ❌ `google-services.json`
- ❌ `GoogleService-Info.plist`
- ❌ Cualquier archivo con credenciales

### SIEMPRE usar:

- ✅ `.env.example` (sin valores reales)
- ✅ `.gitignore` actualizado
- ✅ Variables de entorno en CI/CD
- ✅ Secret management en producción

---

## 📞 Soporte

Si tienes problemas con la configuración:

1. Revisa los logs: `npx react-native log-android` o `npx react-native log-ios`
2. Verifica Firebase Console > Usage & quotas
3. Consulta la documentación oficial:
   - [Firebase Docs](https://firebase.google.com/docs)
   - [Google Cloud Docs](https://cloud.google.com/docs)
   - [Stripe Docs](https://stripe.com/docs)
   - [React Native Firebase](https://rnfirebase.io/)

---

**✅ Configuración completa: ¡Tu app está lista para funcionar!**
