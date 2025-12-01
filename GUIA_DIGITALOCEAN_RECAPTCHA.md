# 🐳 Guía Específica: Agregar reCAPTCHA en DigitalOcean App Platform

Esta guía te muestra **exactamente** dónde encontrar y cómo agregar las variables de entorno de reCAPTCHA en DigitalOcean App Platform.

---

## 📍 Método 1: Si ya tienes tu app creada (Más común)

### Paso 1: Entrar a tu aplicación

1. Ve a [DigitalOcean](https://cloud.digitalocean.com/)
2. Inicia sesión con tu cuenta
3. En el menú lateral izquierdo, haz clic en **"Apps"**
4. Busca y haz clic en el nombre de tu aplicación

### Paso 2: Ir a Settings (Configuración)

1. En la parte superior de la página, verás varias pestañas:
   ```
   [Overview] [Runtime Logs] [Settings] [Alerts] [Activity]
   ```
2. Haz clic en la pestaña **"Settings"** (Configuración)

### Paso 3: Buscar "Environment Variables"

1. Desplázate hacia abajo en la página de Settings
2. Busca una sección que dice:
   - **"App-Level Environment Variables"** (Variables de Entorno a Nivel de Aplicación)
   - O simplemente **"Environment Variables"** (Variables de Entorno)

**💡 Si no la encuentras:**
- Busca en la sección **"App-Level Settings"**
- O busca **"Configuration"** → **"Environment Variables"**

### Paso 4: Agregar las variables

**Opción A: Si NO hay variables todavía**

1. Verás un mensaje que dice algo como "No environment variables" o "No hay variables de entorno"
2. Haz clic en el botón **"Add Variable"** o **"Agregar Variable"**

**Opción B: Si YA hay variables**

1. Verás una lista de variables existentes
2. Haz clic en el botón **"Edit"** o **"Editar"** (arriba a la derecha de la lista)

### Paso 5: Agregar la primera variable (Site Key)

1. Haz clic en **"Add Variable"** o **"Agregar Variable"**
2. Llena los campos:
   - **Key** (Clave/Nombre): `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - **Value** (Valor): Pega tu Site Key (la primera llave que copiaste)
   - **Scope**: Deja "App-Level" (no lo cambies)
3. Haz clic en **"Save"** o **"Guardar"**

### Paso 6: Agregar la segunda variable (Secret Key)

1. Haz clic en **"Add Variable"** de nuevo
2. Llena los campos:
   - **Key** (Clave/Nombre): `RECAPTCHA_SECRET_KEY`
   - **Value** (Valor): Pega tu Secret Key (la segunda llave que copiaste)
   - **Scope**: Deja "App-Level"
   - ✅ **MUY IMPORTANTE**: Marca la casilla **"Encrypt"** o **"Secret"** o **"Hide"** (esto oculta el valor)
3. Haz clic en **"Save"** o **"Guardar"**

### Paso 7: Guardar y redesplegar

1. Si hay un botón **"Save Changes"** al final, haz clic en él
2. Si no hay botón, los cambios se guardan automáticamente
3. Ve a la pestaña **"Overview"**
4. Haz clic en el menú **"Actions"** (arriba a la derecha)
5. Selecciona **"Redeploy"** o **"Redesplegar"**
6. Espera a que termine el redespliegue (puede tomar 2-5 minutos)

---

## 📍 Método 2: Si estás creando la app por primera vez

### Durante la creación de la app:

1. Cuando llegues al paso de configuración, busca la sección **"Environment Variables"**
2. Haz clic en **"Add Variable"**
3. Agrega las dos variables como se explica arriba
4. Continúa con la creación de la app

---

## 🔍 ¿No encuentras "Environment Variables"?

### Busca en estos lugares:

1. **Settings** → **App-Level Settings** → **Environment Variables**
2. **Settings** → **Configuration** → **Environment Variables**
3. **Settings** → Desplázate hacia abajo hasta encontrar una sección con variables

### Si usas la versión nueva de DigitalOcean:

1. Ve a **Settings**
2. Busca **"App Spec"** o **"YAML"**
3. Si ves código YAML, las variables están ahí, pero es más complicado
4. Mejor busca el botón **"Edit"** o **"Edit App Spec"** y busca la sección de variables

---

## ✅ Verificar que funcionó

1. Después de redesplegar, ve a tu sitio web
2. Intenta enviar un formulario de contacto
3. Si funciona correctamente, ¡listo! ✅
4. Si no funciona, revisa:
   - Que las llaves estén bien copiadas (sin espacios)
   - Que hayas hecho redeploy después de agregar las variables
   - Que el dominio esté agregado en Google reCAPTCHA

---

## 🆘 ¿Necesitas ayuda?

Si después de seguir estos pasos no encuentras dónde agregar las variables:

1. **Toma una captura de pantalla** de tu página de Settings
2. **Busca en Google**: "DigitalOcean App Platform environment variables screenshot"
3. **Contacta al soporte** de DigitalOcean (tienen chat en vivo)

---

## 📸 Ejemplo visual (cómo debería verse)

```
┌─────────────────────────────────────────────────────┐
│  DigitalOcean - Tu App                              │
│                                                     │
│  [Overview] [Runtime Logs] [Settings] [Alerts]   │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │ Settings                                     │  │
│  │                                               │  │
│  │ App-Level Environment Variables              │  │
│  │                                               │  │
│  │ ┌─────────────────────────────────────────┐ │  │
│  │ │ Key: NODE_ENV                            │ │  │
│  │ │ Value: production                        │ │  │
│  │ │ [Edit] [Delete]                          │ │  │
│  │ └─────────────────────────────────────────┘ │  │
│  │                                               │  │
│  │ [+ Add Variable]                            │  │
│  │                                               │  │
│  │ ┌─────────────────────────────────────────┐ │  │
│  │ │ Key: [NEXT_PUBLIC_RECAPTCHA_SITE_KEY]   │ │  │
│  │ │ Value: [6LdAbC123...xyz789]            │ │  │
│  │ │ Scope: [App-Level ▼]                   │ │  │
│  │ │ [Save] [Cancel]                         │ │  │
│  │ └─────────────────────────────────────────┘ │  │
│  └─────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

---

**¡Mucha suerte! Si tienes dudas, vuelve a leer los pasos con calma. 💪**

