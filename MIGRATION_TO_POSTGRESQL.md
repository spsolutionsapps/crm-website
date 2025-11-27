# 🗄️ Guía de Migración a PostgreSQL

Esta guía te ayudará a migrar tu aplicación de SQLite a PostgreSQL para producción.

## 📋 ¿Por qué migrar a PostgreSQL?

- ✅ **Mejor para producción**: Escalable y robusto
- ✅ **Soporte en App Platform**: Funciona perfectamente con Digital Ocean
- ✅ **Mejor rendimiento**: Para múltiples usuarios concurrentes
- ✅ **Backups automáticos**: Con Digital Ocean Managed Database
- ✅ **Sin problemas de archivos**: No depende del sistema de archivos

---

## 🚀 Opción 1: Digital Ocean Managed Database (Recomendado)

### Paso 1: Crear Base de Datos en Digital Ocean

1. Ve a **Databases** → **Create Database**
2. Selecciona:
   - **Database Engine**: PostgreSQL
   - **Version**: 15 o superior (recomendado)
   - **Plan**: Basic ($15/mes) o superior
   - **Region**: Misma región que tu App Platform
   - **Database Name**: `sp_landing_page` (o el que prefieras)

3. Haz clic en **Create Database**

### Paso 2: Obtener Connection String

1. Una vez creada, ve a la base de datos
2. En la sección **Connection Details**, copia la **Connection String**
3. Formato: `postgresql://user:password@host:port/database?sslmode=require`

### Paso 3: Configurar Variables de Entorno

En tu **App Platform** o archivo `.env`:

```env
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
```

**Importante**: En App Platform, marca esta variable como **SECRET**.

---

## 🖥️ Opción 2: PostgreSQL Local (Desarrollo)

### Instalar PostgreSQL

**Windows:**
```bash
# Descargar desde https://www.postgresql.org/download/windows/
# O usar Chocolatey:
choco install postgresql
```

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Crear Base de Datos

```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE sp_landing_page;

# Crear usuario (opcional)
CREATE USER sp_user WITH PASSWORD 'tu_password_segura';
GRANT ALL PRIVILEGES ON DATABASE sp_landing_page TO sp_user;

# Salir
\q
```

### Configurar .env

```env
DATABASE_URL=postgresql://sp_user:tu_password_segura@localhost:5432/sp_landing_page
```

---

## 📦 Instalación de Dependencias

```bash
npm install
```

Esto instalará automáticamente `pg` y `@types/pg`.

---

## 🔄 Migración de Datos (Opcional)

Si ya tienes datos en SQLite y quieres migrarlos:

### Paso 1: Preparar Script de Migración

El script `scripts/migrate-data-from-sqlite.js` ya está incluido.

### Paso 2: Configurar Variables

Asegúrate de tener:
- Archivo SQLite en `data/consultas.db`
- Variable `DATABASE_URL` configurada

### Paso 3: Ejecutar Migración

```bash
node scripts/migrate-data-from-sqlite.js
```

Esto migrará:
- ✅ Todas las consultas
- ✅ Usuarios admin
- ✅ Sesiones activas (opcional)

---

## 🏗️ Inicialización Automática

La aplicación **inicializa automáticamente** las tablas cuando detecta `DATABASE_URL`:

- Crea las tablas si no existen
- Crea índices para mejor rendimiento
- Crea usuario admin por defecto si no existe

**No necesitas ejecutar scripts manualmente** - todo se hace automáticamente al iniciar la app.

---

## ✅ Verificación

### 1. Verificar Conexión

Al iniciar la aplicación, deberías ver en los logs:
```
✅ Base de datos PostgreSQL inicializada correctamente
```

Si ves:
```
⚠️  DATABASE_URL no configurada. Usando SQLite como fallback.
```

Significa que la app está usando SQLite (fallback).

### 2. Probar Funcionalidades

- ✅ Crear una consulta desde el formulario
- ✅ Login como admin
- ✅ Ver consultas en el panel admin
- ✅ Eliminar consultas

---

## 🔧 Troubleshooting

### Error: "relation does not exist"

**Solución**: Las tablas se crean automáticamente. Si ves este error:
1. Verifica que `DATABASE_URL` esté configurada
2. Verifica permisos del usuario de la BD
3. Reinicia la aplicación

### Error: "password authentication failed"

**Solución**: 
- Verifica que la contraseña en `DATABASE_URL` sea correcta
- En Digital Ocean, verifica las credenciales en Connection Details

### Error: "connection refused"

**Solución**:
- Verifica que PostgreSQL esté corriendo
- Verifica el host y puerto en `DATABASE_URL`
- En Digital Ocean, verifica que el firewall permita conexiones

### La app sigue usando SQLite

**Solución**:
- Verifica que `DATABASE_URL` esté en `.env` (desarrollo) o en App Platform (producción)
- Reinicia la aplicación
- Verifica que no haya errores de conexión en los logs

---

## 🔄 Rollback a SQLite (Si es necesario)

Si necesitas volver a SQLite temporalmente:

1. **Elimina o comenta** `DATABASE_URL` del `.env`
2. **Cambia** `import db from '@/lib/db'` a `import db from '@/lib/db-sqlite'` en los archivos de API
3. Reinicia la aplicación

**Nota**: El archivo `db-sqlite.ts` se mantiene como respaldo.

---

## 📊 Comparación SQLite vs PostgreSQL

| Característica | SQLite | PostgreSQL |
|---------------|--------|------------|
| Producción | ❌ Limitado | ✅ Excelente |
| Escalabilidad | ❌ Baja | ✅ Alta |
| Concurrentes | ❌ Limitado | ✅ Muchos |
| Backups | ⚠️ Manual | ✅ Automático |
| App Platform | ❌ Problemas | ✅ Perfecto |

---

## 🎯 Próximos Pasos

1. ✅ Configurar `DATABASE_URL` en producción
2. ✅ Migrar datos existentes (si aplica)
3. ✅ Probar todas las funcionalidades
4. ✅ Configurar backups automáticos (Digital Ocean lo hace automáticamente)
5. ✅ Monitorear rendimiento

---

## 📚 Recursos

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [node-postgres (pg) Documentation](https://node-postgres.com/)
- [Digital Ocean Managed Databases](https://www.digitalocean.com/products/managed-databases)

---

## 💡 Tips

- **Desarrollo**: Puedes seguir usando SQLite localmente y PostgreSQL en producción
- **Backups**: Digital Ocean hace backups automáticos diarios
- **Rendimiento**: PostgreSQL es mucho más rápido con múltiples usuarios
- **Escalabilidad**: Puedes escalar fácilmente el plan de la BD según necesites

