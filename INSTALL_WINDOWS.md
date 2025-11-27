# 🪟 Instalación en Windows - Solución de Problemas

## ❌ Error: better-sqlite3 requiere Visual Studio Build Tools

Si ves este error al instalar:
```
gyp ERR! find VS You need to install the latest version of Visual Studio
gyp ERR! find VS including the "Desktop development with C++" workload.
```

## ✅ Soluciones

### Opción 1: Usar Solo PostgreSQL (Recomendado) ✅

**No necesitas instalar better-sqlite3** si usas PostgreSQL:

1. **Instala PostgreSQL localmente**:
   - Descarga desde: https://www.postgresql.org/download/windows/
   - O usa Chocolatey: `choco install postgresql`

2. **Crea una base de datos**:
   ```bash
   psql -U postgres
   CREATE DATABASE sp_landing_page;
   \q
   ```

3. **Configura .env**:
   ```env
   DATABASE_URL=postgresql://postgres:tu_password@localhost:5432/sp_landing_page
   ```

4. **Instala dependencias** (sin better-sqlite3):
   ```bash
   npm install --no-optional
   # O simplemente:
   npm install
   ```

5. **¡Listo!** La app usará PostgreSQL automáticamente.

---

### Opción 2: Instalar Visual Studio Build Tools (Solo si necesitas SQLite)

Si realmente necesitas SQLite como fallback:

1. **Instala Visual Studio Build Tools**:
   - Descarga: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022
   - Instala con el workload "Desktop development with C++"

2. **Luego instala better-sqlite3**:
   ```bash
   npm install better-sqlite3
   ```

---

## 🎯 Recomendación

**Para producción**: Usa PostgreSQL (no necesitas better-sqlite3)
**Para desarrollo**: Usa PostgreSQL local o configura DATABASE_URL

better-sqlite3 es ahora **opcional** y solo se usa como fallback si no hay `DATABASE_URL`.

---

## ✅ Verificar Instalación

Después de instalar, ejecuta:
```bash
npm run dev
```

Deberías ver:
- `✅ Base de datos PostgreSQL inicializada correctamente` (si hay DATABASE_URL)
- O un mensaje de error claro si falta configuración

---

## 🆘 Si aún tienes problemas

1. **Limpia node_modules**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Instala solo dependencias necesarias**:
   ```bash
   npm install --no-optional
   ```

3. **Verifica que DATABASE_URL esté configurada** en `.env`

