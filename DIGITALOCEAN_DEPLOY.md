# Guía de Despliegue en Digital Ocean

Esta guía te ayudará a desplegar tu proyecto Next.js en Digital Ocean usando **App Platform** (recomendado) o **Droplet**.

## 📋 Pre-requisitos

1. **Cuenta en Digital Ocean** - [Crear cuenta](https://www.digitalocean.com/)
2. **Repositorio Git** - Tu proyecto debe estar en GitHub, GitLab o Bitbucket
3. **Variables de entorno** - Preparar las variables necesarias

---

## 🚀 Opción 1: App Platform (Recomendado - Más Fácil)

App Platform es similar a Vercel/Netlify y es la forma más sencilla de desplegar. **NO necesitas Docker** - App Platform detecta automáticamente que es un proyecto Node.js/Next.js.

### Paso 1: Preparar Variables de Entorno

Las variables de entorno las configurarás directamente en Digital Ocean (no necesitas archivo .env en el repo).

### Paso 2: Configurar en Digital Ocean

1. **Inicia sesión** en [Digital Ocean](https://cloud.digitalocean.com/)
2. Ve a **App Platform** → **Create App**
3. **Conecta tu repositorio**:
   - Selecciona GitHub/GitLab/Bitbucket
   - Autoriza Digital Ocean
   - Selecciona tu repositorio y branch (main/master)

4. **Configuración del Build**:
   - **Type**: Web Service
   - **Build Command**: `npm run build`
   - **Run Command**: `npm start`
   - **HTTP Port**: `3000`
   - **Environment**: Node.js

5. **Variables de Entorno**:
   Agrega estas variables en la sección "Environment Variables":
   ```
   NODE_ENV=production
   NEXTAUTH_SECRET=tu-secret-key-super-segura-aqui
   NEXTAUTH_URL=https://tu-app.ondigitalocean.app
   DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
   GOOGLE_CLIENT_ID=tu-google-client-id (opcional)
   GOOGLE_CLIENT_SECRET=tu-google-client-secret (opcional)
   GITHUB_CLIENT_ID=tu-github-client-id (opcional)
   GITHUB_CLIENT_SECRET=tu-github-client-secret (opcional)
   ```
   
   **Importante**: 
   - Marca `NEXTAUTH_SECRET` y `DATABASE_URL` como **SECRET**
   - `DATABASE_URL` viene de tu Managed Database (ver sección de Base de Datos)

6. **Plan y Región**:
   - Selecciona un plan básico ($5-12/mes)
   - Elige la región más cercana a tus usuarios

7. **Deploy**: Haz clic en "Create Resources" y espera el despliegue

### Paso 3: Configurar Base de Datos PostgreSQL

**✅ RECOMENDADO**: Usar PostgreSQL con Digital Ocean Managed Database.

1. **Crear Managed Database**:
   - Ve a **Databases** → **Create Database**
   - Selecciona **PostgreSQL 15+**
   - Plan: **Basic ($15/mes)** o superior
   - Región: **Misma que tu App**

2. **Obtener Connection String**:
   - En la sección **Connection Details** de tu BD
   - Copia el **Connection String**

3. **Agregar a Variables de Entorno**:
   - En tu App Platform, agrega `DATABASE_URL` con el connection string
   - Marca como **SECRET** ✅

4. **Conectar App a la BD**:
   - En tu App Platform → **Settings** → **Components**
   - Haz clic en tu componente web
   - En **Add Resource**, selecciona tu base de datos
   - Esto conectará automáticamente la BD a tu app

**La aplicación detectará `DATABASE_URL` y usará PostgreSQL automáticamente.**

Para más detalles, consulta `MIGRATION_TO_POSTGRESQL.md` o `POSTGRESQL_SETUP.md`.

---

## 🖥️ Opción 2: Droplet (Más Control)

Si necesitas más control, puedes usar un Droplet (VPS). **NO necesitas Docker** - puedes instalar Node.js directamente en el servidor (más simple y recomendado).

### Paso 1: Crear Droplet

1. Ve a **Droplets** → **Create Droplet**
2. Selecciona:
   - **Image**: Ubuntu 22.04 LTS
   - **Plan**: Basic ($6/mes mínimo)
   - **Region**: Más cercana a tus usuarios
   - **Authentication**: SSH keys (recomendado) o Password

### Paso 2: Configurar el Servidor

Conecta por SSH:
```bash
ssh root@tu-droplet-ip
```

#### Instalar Node.js y PM2

```bash
# Actualizar sistema
apt update && apt upgrade -y

# Instalar Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Instalar PM2 (gestor de procesos)
npm install -g pm2

# Instalar Git
apt install -y git

# Instalar build essentials (necesario para algunas dependencias)
apt install -y build-essential python3
```

#### Instalar Nginx (opcional, para reverse proxy)

```bash
apt install -y nginx
```

### Paso 3: Clonar y Configurar el Proyecto

```bash
# Crear directorio para la app
mkdir -p /var/www/sp-landing-page
cd /var/www/sp-landing-page

# Clonar repositorio
git clone https://github.com/tu-usuario/tu-repo.git .

# Instalar dependencias
npm install

# Crear archivo .env
nano .env
```

**Nota**: Si prefieres usar el script de deploy incluido (`deploy.sh`), puedes usarlo después de la primera configuración manual.

Agrega las variables de entorno en `.env`:
```env
NODE_ENV=production
NEXTAUTH_SECRET=tu-secret-key-super-segura
NEXTAUTH_URL=http://tu-droplet-ip:3000
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret
GITHUB_CLIENT_ID=tu-github-client-id
GITHUB_CLIENT_SECRET=tu-github-client-secret
```

### Paso 4: Build y Deploy

```bash
# Build del proyecto
npm run build

# Crear directorio para base de datos
mkdir -p data
chmod 755 data

# Iniciar con PM2
pm2 start npm --name "sp-landing-page" -- start

# Guardar configuración de PM2
pm2 save

# Configurar PM2 para iniciar al arrancar el servidor
pm2 startup
# Ejecuta el comando que te muestre
```

### Paso 5: Configurar Nginx (Opcional pero Recomendado)

```bash
nano /etc/nginx/sites-available/sp-landing-page
```

Agrega esta configuración:
```nginx
server {
    listen 80;
    server_name tu-dominio.com www.tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Habilitar el sitio:
```bash
ln -s /etc/nginx/sites-available/sp-landing-page /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Paso 6: Configurar Firewall

```bash
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

### Paso 7: Configurar SSL con Let's Encrypt (Opcional)

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d tu-dominio.com -d www.tu-dominio.com
```

---

## 🐳 ¿Por qué hay un Dockerfile?

El `Dockerfile` incluido es **completamente opcional**. Solo lo necesitas si:
- Quieres usar Docker en un Droplet (más complejo)
- App Platform necesita configuración específica (raro)

**Para la mayoría de casos, NO necesitas Docker:**
- ✅ **App Platform**: Detecta Node.js automáticamente, sin Docker
- ✅ **Droplet**: Instala Node.js directamente (más simple)

Puedes ignorar el Dockerfile si no planeas usarlo.

---

## 🔐 Generar NEXTAUTH_SECRET

Para generar un `NEXTAUTH_SECRET` seguro:

```bash
openssl rand -base64 32
```

O en Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 📝 Checklist Pre-Deploy

- [ ] Proyecto en repositorio Git (GitHub/GitLab/Bitbucket)
- [ ] Variables de entorno configuradas
- [ ] `NEXTAUTH_SECRET` generado y configurado
- [ ] `NEXTAUTH_URL` apunta a tu dominio/producción
- [ ] Base de datos configurada (SQLite o alternativa)
- [ ] Build local funciona (`npm run build`)
- [ ] Dependencias instaladas correctamente
- [ ] Archivos sensibles en `.gitignore`

---

## 🔄 Actualizar el Proyecto

### App Platform:
- Haz push a tu repositorio
- App Platform detectará cambios y redeployará automáticamente

### Droplet:
```bash
cd /var/www/sp-landing-page
git pull
npm install
npm run build
pm2 restart sp-landing-page
```

---

## 🐛 Troubleshooting

### Error: "Cannot find module 'bcrypt'"
```bash
npm install
# bcrypt ya está en package.json, solo reinstala dependencias
```

### Error: "Cannot find module 'better-sqlite3'"
```bash
npm install
# better-sqlite3 ya está en package.json
# En algunos sistemas puede necesitar compilación nativa
```

### Error: "Database locked" (SQLite)
- Asegúrate de que solo un proceso accede a la BD
- Considera migrar a PostgreSQL/MySQL

### Error: "Port 3000 already in use"
```bash
# Ver qué proceso usa el puerto
lsof -i :3000
# O matar el proceso
pm2 delete sp-landing-page
pm2 start npm --name "sp-landing-page" -- start
```

### Ver logs en App Platform:
- Ve a la sección "Runtime Logs" en tu app

### Ver logs en Droplet:
```bash
pm2 logs sp-landing-page
```

---

## 💰 Costos Estimados

- **App Platform**: $5-12/mes (básico)
- **Droplet**: $6/mes (mínimo)
- **Managed Database** (opcional): $15/mes

---

## 📚 Recursos Adicionales

- [Digital Ocean App Platform Docs](https://docs.digitalocean.com/products/app-platform/)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)

