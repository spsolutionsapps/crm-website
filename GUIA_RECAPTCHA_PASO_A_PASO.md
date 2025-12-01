# 📖 Guía Paso a Paso: Configurar reCAPTCHA (Como para Abuela Marta) 🧓

Hola Marta! 👋 Te voy a guiar paso a paso para proteger tu formulario de contacto. No te preocupes, es más fácil de lo que parece. ¡Vamos paso a paso!

---

## 🎯 ¿Qué vamos a hacer?

Vamos a poner un "guardián invisible" en tu formulario para que solo las personas reales puedan enviar mensajes, y no los robots que envían spam.

---

## 📝 PASO 1: Ir a Google para obtener las llaves

### 1.1. Abre tu navegador (Chrome, Firefox, Edge, etc.)

### 1.2. Ve a esta dirección:
```

```

**💡 Tip:** Puedes copiar y pegar esta dirección en la barra de direcciones de tu navegador y presionar Enter.

### 1.3. Si te pide iniciar sesión:
- Inicia sesión con tu cuenta de Google (Gmail)
- Si no tienes cuenta de Google, créala primero (es gratis)

---

## 📝 PASO 2: Crear un nuevo sitio en reCAPTCHA

### 2.1. Verás una página que dice "Crear"

### 2.2. Llena los siguientes campos:

**Etiqueta:**
- Escribe algo como: `Mi Sitio Web` o `SP Solutions`
- Esto es solo para que tú recuerdes qué es

**Tipo de reCAPTCHA:**
- ✅ **Marca la opción "reCAPTCHA v3"**
- Esta es la versión invisible (no molesta a los usuarios)

**Dominios:**
Aquí es importante. Necesitas agregar los lugares donde vas a usar esto:

1. **Para probar en tu computadora (desarrollo):**
   - Escribe: `localhost`
   - Presiona Enter o haz clic en "Agregar"

2. **Para tu sitio web real (producción):**
   - Escribe tu dominio, por ejemplo: `tudominio.com`
   - Presiona Enter o haz clic en "Agregar"
   - Si tienes `www.tudominio.com`, agrégalo también

**Ejemplo de cómo debería verse:**
```
Dominios:
  localhost
  tudominio.com
  www.tudominio.com
```

### 2.3. Acepta los términos
- ✅ Marca la casilla que dice que aceptas los términos y condiciones

### 2.4. Haz clic en el botón "Enviar"

---

## 📝 PASO 3: Copiar las llaves (claves)

### 3.1. Después de crear el sitio, verás una página con dos "llaves"

Verás algo así:

```
┌─────────────────────────────────────────┐
│  Clave del sitio (Site Key)             │
│  6LdAbC123...xyz789                     │
│  [Copiar]                                │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Clave secreta (Secret Key)              │
│  6LdAbC123...abc456                     │
│  [Copiar]                                │
└─────────────────────────────────────────┘
```

### 3.2. Copia la PRIMERA llave (Site Key):
- Haz clic en el botón "Copiar" que está al lado de "Clave del sitio"
- O selecciona todo el texto y cópialo (Ctrl+C en Windows, Cmd+C en Mac)
- **Guárdala en un lugar seguro** (notas, documento de texto, etc.)

### 3.3. Copia la SEGUNDA llave (Secret Key):
- Haz clic en el botón "Copiar" que está al lado de "Clave secreta"
- O selecciona todo el texto y cópialo
- **Guárdala en un lugar seguro también**

**⚠️ IMPORTANTE:** 
- La primera llave (Site Key) es pública, está bien compartirla
- La segunda llave (Secret Key) es SECRETA, NO la compartas con nadie

---

## 📝 PASO 4: Crear el archivo de configuración

### 4.1. Abre tu proyecto en Visual Studio Code (o el editor que uses)

### 4.2. Busca la carpeta raíz del proyecto
- Debería ser algo como: `crm-website`
- Es la carpeta principal donde está el archivo `package.json`

### 4.3. Crea un archivo nuevo llamado `.env.local`

**Cómo crear el archivo:**
1. Haz clic derecho en la carpeta raíz del proyecto
2. Selecciona "Nuevo archivo" o "New File"
3. Escribe exactamente: `.env.local` (con el punto al inicio)
4. Presiona Enter

**💡 Si no puedes crear archivos que empiezan con punto:**
- Crea un archivo llamado `env.local` primero
- Luego renómbralo a `.env.local`

### 4.4. Abre el archivo `.env.local` y escribe esto:

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=pega_aqui_la_primera_llave
RECAPTCHA_SECRET_KEY=pega_aqui_la_segunda_llave
```

**Ejemplo de cómo debería verse (con llaves de ejemplo):**
```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LdAbC123xyz789abcdefghijklmnop
RECAPTCHA_SECRET_KEY=6LdAbC123abc456secretkeynopqrstuvwxyz
```

**⚠️ IMPORTANTE:**
- NO dejes espacios alrededor del signo `=`
- NO pongas comillas alrededor de las llaves
- Cada llave va en su propia línea

### 4.5. Guarda el archivo
- Presiona `Ctrl+S` (Windows) o `Cmd+S` (Mac)

---

## 📝 PASO 5: Reiniciar el servidor

### 5.1. Si tienes el servidor corriendo, detenlo:
- Ve a la terminal donde está corriendo
- Presiona `Ctrl+C` (Windows) o `Cmd+C` (Mac)

### 5.2. Inicia el servidor de nuevo:
```bash
npm run dev
```

### 5.3. Espera a que termine de cargar
- Verás un mensaje que dice algo como: "Ready on http://localhost:3000"

---

## 📝 PASO 6: Probar que funciona

### 6.1. Abre tu navegador y ve a:
```
http://localhost:3000
```

### 6.2. Navega hasta el formulario de contacto
- Busca la sección de "Contacto" o "Envíanos tu consulta"

### 6.3. Llena el formulario:
- Nombre: Tu nombre
- Apellido: Tu apellido
- Email: tu@email.com
- Teléfono: (opcional)
- Mensaje: Un mensaje de prueba

### 6.4. Haz clic en "Enviar Consulta"

### 6.5. Si todo está bien:
- ✅ Verás un mensaje verde que dice "Consulta enviada correctamente"
- ✅ El formulario se limpiará

### 6.6. Si algo sale mal:
- ❌ Verás un mensaje de error
- Revisa que las llaves estén bien copiadas en el archivo `.env.local`
- Asegúrate de haber reiniciado el servidor después de crear el archivo

---

## 📝 PASO 7: Configurar para producción (cuando subas tu sitio)

Cuando subas tu sitio web a un servidor (como DigitalOcean, Vercel, etc.):

### 7.1. Agrega tu dominio en Google reCAPTCHA:
- Ve de nuevo a [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
- Encuentra tu sitio creado
- Haz clic en "Configuración" o el ícono de lápiz
- Agrega tu dominio de producción (ej: `tudominio.com`)
- Guarda los cambios

### 7.2. Agrega las variables de entorno en DigitalOcean App Platform:

**Si estás creando la app por primera vez:**

1. **Durante la creación de la app**, cuando llegues al paso de "Environment Variables":
   - Verás una sección que dice "Environment Variables" o "Variables de entorno"
   - Haz clic en "Add Variable" o "Agregar Variable"
   - Agrega la primera variable:
     - **Key (Nombre)**: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
     - **Value (Valor)**: Pega tu primera llave (Site Key)
     - **Scope**: Deja "App-Level" (nivel de aplicación)
     - Haz clic en "Save" o "Guardar"
   - Haz clic en "Add Variable" de nuevo
   - Agrega la segunda variable:
     - **Key (Nombre)**: `RECAPTCHA_SECRET_KEY`
     - **Value (Valor)**: Pega tu segunda llave (Secret Key)
     - **Scope**: Deja "App-Level"
     - ✅ **IMPORTANTE**: Marca la casilla "Encrypt" o "Secret" para ocultar esta variable
     - Haz clic en "Save" o "Guardar"

**Si ya tienes la app creada:**

1. **Inicia sesión** en [DigitalOcean](https://cloud.digitalocean.com/)

2. **Ve a tu aplicación**:
   - En el menú lateral izquierdo, haz clic en "Apps"
   - Busca y haz clic en tu aplicación (la que tiene tu sitio web)

3. **Abre la sección de Settings (Configuración)**:
   - En la parte superior de la página, verás varias pestañas: "Overview", "Runtime Logs", "Settings", etc.
   - Haz clic en la pestaña **"Settings"** (Configuración)

4. **Busca "App-Level Environment Variables"**:
   - Desplázate hacia abajo en la página de Settings
   - Busca una sección que dice **"App-Level Environment Variables"** o **"Variables de Entorno a Nivel de Aplicación"**
   - Si no la ves, busca "Environment Variables" o "Variables de entorno"

5. **Agrega las variables**:
   - Haz clic en el botón **"Edit"** o **"Editar"** (si hay variables existentes)
   - O haz clic en **"Add Variable"** o **"Agregar Variable"** (si no hay ninguna)
   
   **Para la primera variable (Site Key):**
   - Haz clic en **"Add Variable"** o **"Agregar Variable"**
   - En el campo **"Key"** o **"Nombre"**, escribe: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - En el campo **"Value"** o **"Valor"**, pega tu primera llave (Site Key)
   - Deja **"Scope"** en "App-Level" o "Nivel de Aplicación"
   - Haz clic en **"Save"** o **"Guardar"**

   **Para la segunda variable (Secret Key):**
   - Haz clic en **"Add Variable"** de nuevo
   - En el campo **"Key"**, escribe: `RECAPTCHA_SECRET_KEY`
   - En el campo **"Value"**, pega tu segunda llave (Secret Key)
   - Deja **"Scope"** en "App-Level"
   - ✅ **MUY IMPORTANTE**: Marca la casilla que dice **"Encrypt"** o **"Secret"** o **"Ocultar"** (esto oculta el valor por seguridad)
   - Haz clic en **"Save"** o **"Guardar"**

6. **Guarda los cambios**:
   - Si hay un botón **"Save Changes"** o **"Guardar Cambios"** al final, haz clic en él
   - Si no hay botón, los cambios se guardan automáticamente

7. **Reinicia la aplicación** (si es necesario):
   - DigitalOcean puede pedirte que hagas un "Redeploy" (redesplegar)
   - Si ves un botón **"Redeploy"** o **"Redesplegar"**, haz clic en él
   - O ve a la pestaña **"Overview"** y haz clic en **"Actions"** → **"Redeploy"**

**💡 Consejos:**
- Si no encuentras "Environment Variables", busca en la pestaña "Settings" → "App-Level Settings"
- Las variables pueden estar en diferentes lugares según la versión de DigitalOcean
- Si tienes problemas, busca en Google: "DigitalOcean App Platform environment variables" y verás imágenes de cómo se ve

**📸 ¿Cómo debería verse?**
```
┌─────────────────────────────────────────────┐
│  App-Level Environment Variables            │
│  ┌───────────────────────────────────────┐  │
│  │ Key: NEXT_PUBLIC_RECAPTCHA_SITE_KEY  │  │
│  │ Value: 6LdAbC123...xyz789            │  │
│  │ Scope: App-Level                     │  │
│  │ [Save]                                │  │
│  └───────────────────────────────────────┘  │
│  ┌───────────────────────────────────────┐  │
│  │ Key: RECAPTCHA_SECRET_KEY             │  │
│  │ Value: 6LdAbC123...abc456 [Encrypt]✓  │  │
│  │ Scope: App-Level                     │  │
│  │ [Save]                                │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### 7.3. Reinicia tu aplicación en el servidor

---

## ❓ Preguntas Frecuentes (FAQ)

### ¿Qué pasa si no configuro las llaves?
- En desarrollo (tu computadora): El formulario funcionará pero mostrará una advertencia
- En producción (tu sitio web): El formulario NO funcionará hasta que las configures

### ¿Puedo usar las mismas llaves para desarrollo y producción?
- Sí, siempre y cuando hayas agregado ambos dominios (`localhost` y `tudominio.com`) en Google reCAPTCHA

### ¿Qué hago si olvidé mis llaves?
- Ve a [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
- Encuentra tu sitio
- Ahí verás ambas llaves de nuevo

### ¿Es gratis?
- Sí, reCAPTCHA v3 es completamente gratis

### ¿Necesito una cuenta de Google?
- Sí, pero es gratis crear una cuenta de Gmail si no tienes

---

## 🎉 ¡Listo!

Si seguiste todos los pasos, tu formulario ahora está protegido contra spam. Los robots maliciosos no podrán enviar mensajes basura, pero las personas reales podrán usar el formulario sin problemas.

**¿Necesitas ayuda?** Revisa que:
1. ✅ Las llaves estén bien copiadas (sin espacios extra)
2. ✅ El archivo `.env.local` esté en la carpeta raíz del proyecto
3. ✅ Hayas reiniciado el servidor después de crear el archivo
4. ✅ Los dominios estén agregados en Google reCAPTCHA

---

**¡Mucha suerte, Marta! 💪 Si tienes alguna duda, vuelve a leer los pasos con calma. ¡Tú puedes!** 🌟

site key 6LcNOx4sAAAAAHVT4YC9NEwPHdNVb0lJerhf7LpP

secret 6LcNOx4sAAAAADXjFNwJb2qjEbVu_EGGdBTrdweO