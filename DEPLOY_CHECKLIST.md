# ✅ Checklist de Despliegue en Digital Ocean

Usa esta lista para asegurarte de que todo esté listo antes de desplegar.

## 📦 Preparación del Código

- [ ] **Dependencias instaladas**
  ```bash
  npm install
  ```
  Verifica que `bcrypt` y `better-sqlite3` estén instalados

- [ ] **Build local funciona**
  ```bash
  npm run build
  npm start
  ```
  Verifica que no haya errores

- [ ] **Código en repositorio Git**
  ```bash
  git add .
  git commit -m "Preparación para deploy"
  git push origin main
  ```

## 🔐 Variables de Entorno

- [ ] **NEXTAUTH_SECRET generado**
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
  ```
  Guarda este valor de forma segura

- [ ] **NEXTAUTH_URL configurado**
  - Para desarrollo: `http://localhost:3000`
  - Para producción: `https://tu-dominio.com` o `https://tu-app.ondigitalocean.app`

- [ ] **OAuth configurado (opcional)**
  - [ ] Google OAuth: `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET`
  - [ ] GitHub OAuth: `GITHUB_CLIENT_ID` y `GITHUB_CLIENT_SECRET`

## 🗄️ Base de Datos

- [ ] **Decidir estrategia de base de datos**
  - [ ] Mantener SQLite (limitado en App Platform)
  - [ ] Migrar a PostgreSQL/MySQL (recomendado)
  - [ ] Usar servicio externo (Supabase, PlanetScale)

- [ ] **Directorio data/ tiene permisos**
  - En Droplet: `chmod 755 data`
  - En App Platform: considerar volumen persistente

## 🌐 Dominio y DNS (Opcional)

- [ ] **Dominio configurado**
  - [ ] Dominio comprado
  - [ ] DNS apuntando a Digital Ocean
  - [ ] SSL/HTTPS configurado (Let's Encrypt o App Platform)

## 💻 Digital Ocean - App Platform

- [ ] **Cuenta creada**
  - [ ] Cuenta verificada
  - [ ] Método de pago configurado

- [ ] **App creada**
  - [ ] Repositorio conectado
  - [ ] Branch correcto seleccionado (main/master)
  - [ ] Build command: `npm run build`
  - [ ] Run command: `npm start`
  - [ ] Port: `3000`

- [ ] **Variables de entorno agregadas**
  - [ ] `NODE_ENV=production`
  - [ ] `NEXTAUTH_SECRET` (como SECRET)
  - [ ] `NEXTAUTH_URL` (tu URL de producción)
  - [ ] OAuth variables (si aplica)

- [ ] **Plan seleccionado**
  - [ ] Plan básico ($5-12/mes) o superior

## 🖥️ Digital Ocean - Droplet (Alternativa)

- [ ] **Droplet creado**
  - [ ] Ubuntu 22.04 LTS
  - [ ] Plan mínimo $6/mes
  - [ ] SSH keys configuradas

- [ ] **Servidor configurado**
  - [ ] Node.js 20.x instalado
  - [ ] PM2 instalado
  - [ ] Git instalado
  - [ ] Nginx instalado (opcional)

- [ ] **Aplicación desplegada**
  - [ ] Repositorio clonado
  - [ ] Dependencias instaladas
  - [ ] Build ejecutado
  - [ ] PM2 iniciado
  - [ ] PM2 startup configurado

- [ ] **Nginx configurado** (si aplica)
  - [ ] Configuración creada
  - [ ] Sitio habilitado
  - [ ] SSL configurado

- [ ] **Firewall configurado**
  - [ ] Puertos 22, 80, 443 abiertos

## 🧪 Pruebas Post-Deploy

- [ ] **Aplicación accesible**
  - [ ] URL carga correctamente
  - [ ] No hay errores en consola
  - [ ] Estilos cargan correctamente

- [ ] **Funcionalidades probadas**
  - [ ] Formulario de contacto funciona
  - [ ] Login admin funciona
  - [ ] Base de datos guarda datos
  - [ ] Blog carga correctamente
  - [ ] Portfolio muestra imágenes

- [ ] **Logs revisados**
  - [ ] No hay errores críticos
  - [ ] Variables de entorno cargadas
  - [ ] Base de datos conectada

## 📊 Monitoreo

- [ ] **Logs configurados**
  - [ ] App Platform: Runtime Logs habilitados
  - [ ] Droplet: `pm2 logs` funcionando

- [ ] **Alertas configuradas** (opcional)
  - [ ] Alertas de downtime
  - [ ] Alertas de uso de recursos

## 🔄 Actualización Futura

- [ ] **Proceso de actualización documentado**
  - [ ] App Platform: Push a Git = Auto-deploy
  - [ ] Droplet: Script de actualización creado

## 📝 Notas Importantes

### SQLite en Producción
⚠️ **ADVERTENCIA**: SQLite no es ideal para producción en App Platform porque:
- El sistema de archivos es efímero
- Puede perder datos en reinicios
- No escala bien con múltiples instancias

**Recomendación**: Migrar a PostgreSQL o MySQL para producción.

### Base Path
El proyecto está configurado con `basePath: /sp-solutions` en producción.
Asegúrate de que tu dominio/DNS esté configurado correctamente si usas un subdirectorio.

### Archivos Estáticos
Las imágenes están en `/public/images/` y deberían funcionar correctamente.
Verifica que todas las rutas de imágenes sean correctas.

---

## 🆘 Si algo falla

1. **Revisa los logs**:
   - App Platform: Runtime Logs
   - Droplet: `pm2 logs sp-landing-page`

2. **Verifica variables de entorno**:
   - Todas están configuradas
   - Valores correctos (sin espacios extra)

3. **Verifica build local**:
   - `npm run build` funciona sin errores

4. **Base de datos**:
   - Directorio `data/` existe
   - Permisos correctos
   - SQLite no está bloqueado

5. **Puertos y firewall**:
   - Puerto 3000 disponible
   - Firewall permite tráfico

