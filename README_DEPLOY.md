# 🚀 Guía Rápida de Despliegue - Digital Ocean

## ⚡ Método Más Simple (Recomendado)

### App Platform - Sin Docker, Sin Configuración Compleja

1. **Sube tu código a GitHub/GitLab/Bitbucket**

2. **Ve a Digital Ocean → App Platform → Create App**

3. **Conecta tu repositorio** y selecciona:
   - **Build Command**: `npm run build`
   - **Run Command**: `npm start`
   - **HTTP Port**: `3000`

4. **Agrega estas variables de entorno**:
   ```
   NODE_ENV=production
   NEXTAUTH_SECRET=genera-uno-seguro
   NEXTAUTH_URL=https://tu-app.ondigitalocean.app
   ```

5. **Deploy** - ¡Listo! 🎉

**No necesitas:**
- ❌ Docker
- ❌ Configuración de servidor
- ❌ Nginx (opcional)
- ❌ Scripts complejos

App Platform hace todo automáticamente.

---

## 📚 Documentación Completa

Para más detalles, opciones avanzadas, o si prefieres usar un Droplet, consulta:
- `DIGITALOCEAN_DEPLOY.md` - Guía completa paso a paso
- `DEPLOY_CHECKLIST.md` - Checklist de verificación

---

## ⚠️ Importante: Base de Datos SQLite

SQLite funciona, pero tiene limitaciones en App Platform (sistema de archivos efímero).

**Para producción, considera:**
- Migrar a PostgreSQL/MySQL (Digital Ocean Managed Database)
- O usar un servicio externo (Supabase, PlanetScale)

---

## 🆘 Problemas Comunes

**Build falla:**
```bash
# Prueba localmente primero
npm install
npm run build
```

**Variables de entorno no funcionan:**
- Verifica que estén marcadas como "SECRET" si son sensibles
- Asegúrate de que `NEXTAUTH_URL` tenga el formato correcto (https://...)

**Base de datos no guarda:**
- En App Platform, SQLite puede perder datos
- Considera migrar a PostgreSQL

