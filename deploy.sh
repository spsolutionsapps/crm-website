#!/bin/bash

# Script de despliegue para Digital Ocean Droplet
# Uso: ./deploy.sh

set -e  # Salir si hay algún error

echo "🚀 Iniciando despliegue..."

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: No se encontró package.json. Asegúrate de estar en el directorio del proyecto.${NC}"
    exit 1
fi

# Verificar que Git está configurado
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}⚠️  Advertencia: No se encontró directorio .git${NC}"
fi

# Pull de cambios
echo -e "${YELLOW}📥 Obteniendo últimos cambios de Git...${NC}"
git pull origin main || git pull origin master || echo -e "${YELLOW}⚠️  No se pudo hacer pull (continuando...)${NC}"

# Instalar/actualizar dependencias
echo -e "${YELLOW}📦 Instalando dependencias...${NC}"
npm install

# Crear directorio de datos si no existe
if [ ! -d "data" ]; then
    echo -e "${YELLOW}📁 Creando directorio data...${NC}"
    mkdir -p data
    chmod 755 data
fi

# Verificar que existe archivo .env
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ Error: No se encontró archivo .env${NC}"
    echo -e "${YELLOW}💡 Crea un archivo .env con las variables necesarias${NC}"
    exit 1
fi

# Build del proyecto
echo -e "${YELLOW}🔨 Construyendo proyecto...${NC}"
npm run build

# Reiniciar aplicación con PM2
echo -e "${YELLOW}🔄 Reiniciando aplicación con PM2...${NC}"
if pm2 list | grep -q "sp-landing-page"; then
    pm2 restart sp-landing-page
else
    pm2 start npm --name "sp-landing-page" -- start
    pm2 save
fi

# Mostrar estado
echo -e "${GREEN}✅ Despliegue completado!${NC}"
echo -e "${YELLOW}📊 Estado de la aplicación:${NC}"
pm2 status

echo -e "${YELLOW}📝 Para ver los logs: pm2 logs sp-landing-page${NC}"
echo -e "${YELLOW}📝 Para monitorear: pm2 monit${NC}"

