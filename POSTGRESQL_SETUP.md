# ⚡ Setup Rápido de PostgreSQL

## 🎯 Para Digital Ocean App Platform

### 1. Crear Managed Database

1. Ve a **Databases** → **Create Database**
2. Selecciona **PostgreSQL 15+**
3. Plan: **Basic ($15/mes)** o superior
4. Región: **Misma que tu App**

### 2. Configurar en App Platform

1. Ve a tu **App** → **Settings** → **App-Level Environment Variables**
2. Agrega:
   ```
   DATABASE_URL = [Connection String de tu BD]
   ```
3. Marca como **SECRET** ✅
4. **Save** y redeploy

### 3. ¡Listo! 🎉

La app detectará `DATABASE_URL` y usará PostgreSQL automáticamente.

---

## 🖥️ Para Desarrollo Local

### 1. Instalar PostgreSQL

**Windows:**
- Descarga desde: https://www.postgresql.org/download/windows/
- O: `choco install postgresql`

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux:**
```bash
sudo apt install postgresql
sudo systemctl start postgresql
```

### 2. Crear Base de Datos

```bash
psql -U postgres

CREATE DATABASE sp_landing_page;
\q
```

### 3. Configurar .env

Crea/edita `.env`:
```env
DATABASE_URL=postgresql://postgres:tu_password@localhost:5432/sp_landing_page
```

### 4. Instalar Dependencias

```bash
npm install
```

### 5. Iniciar App

```bash
npm run dev
```

La app creará las tablas automáticamente.

---

## ✅ Verificar que Funciona

Deberías ver en los logs:
```
✅ Base de datos PostgreSQL inicializada correctamente
```

Si ves:
```
⚠️  DATABASE_URL no configurada. Usando SQLite como fallback.
```

Significa que está usando SQLite (verifica tu `.env`).

---

## 🆘 Problemas Comunes

**"password authentication failed"**
- Verifica la contraseña en `DATABASE_URL`

**"connection refused"**
- Verifica que PostgreSQL esté corriendo
- Verifica host/puerto en `DATABASE_URL`

**"relation does not exist"**
- Reinicia la app (las tablas se crean automáticamente)

