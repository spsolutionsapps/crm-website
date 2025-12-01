# Configuración de reCAPTCHA

Este proyecto utiliza Google reCAPTCHA v3 para proteger el formulario de contacto contra spam.

## Pasos para configurar reCAPTCHA

### 1. Obtener las claves de reCAPTCHA

1. Ve a [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create)
2. Crea un nuevo sitio con las siguientes configuraciones:
   - **Etiqueta**: Nombre descriptivo (ej: "SP Solutions Website")
   - **Tipo de reCAPTCHA**: reCAPTCHA v3
   - **Dominios**: Agrega tus dominios (ej: `localhost` para desarrollo, `tudominio.com` para producción)
   - Acepta los términos y condiciones
3. Después de crear el sitio, obtendrás:
   - **Site Key** (clave pública)
   - **Secret Key** (clave privada)

### 2. Configurar variables de entorno

Agrega las siguientes variables a tu archivo `.env.local` (o `.env` en producción):

```env
# reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=tu_site_key_aqui
RECAPTCHA_SECRET_KEY=tu_secret_key_aqui
```

**Importante:**
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` es pública y se expone al cliente
- `RECAPTCHA_SECRET_KEY` es privada y solo se usa en el servidor
- **NUNCA** compartas tu Secret Key públicamente

### 3. Verificar la configuración

1. Reinicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre el formulario de contacto en tu navegador
3. Intenta enviar un formulario
4. Si todo está configurado correctamente, el formulario debería funcionar normalmente

### 4. Modo de desarrollo

Si no has configurado las claves de reCAPTCHA:
- En desarrollo, el formulario funcionará sin validación (con una advertencia en consola)
- En producción, el formulario **requerirá** un token válido de reCAPTCHA

## Cómo funciona

1. **Frontend**: Cuando el usuario envía el formulario, se genera un token de reCAPTCHA automáticamente (invisible para el usuario)
2. **Backend**: El servidor valida el token con Google antes de guardar la consulta
3. **Protección**: Solo se aceptan formularios con tokens válidos y con un score mínimo de 0.5

## Solución de problemas

### Error: "reCAPTCHA no está disponible"
- Verifica que `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` esté configurada
- Recarga la página

### Error: "Verificación de seguridad fallida"
- Verifica que `RECAPTCHA_SECRET_KEY` esté configurada correctamente
- Asegúrate de que el dominio esté registrado en Google reCAPTCHA Admin Console
- Verifica que estés usando reCAPTCHA v3 (no v2)

### El formulario no envía en producción
- Asegúrate de que ambos keys estén configurados en las variables de entorno del servidor
- Verifica que el dominio de producción esté agregado en Google reCAPTCHA Admin Console

## Recursos adicionales

- [Documentación oficial de reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3)
- [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)

