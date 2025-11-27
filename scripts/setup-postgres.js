/**
 * Script para configurar PostgreSQL localmente
 * Crea la base de datos y las tablas necesarias
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'Gojira2019!',
  database: 'postgres', // Conectamos a postgres para crear la BD
};

const DB_NAME = process.env.DB_NAME || 'sp_landing_page';

async function setupDatabase() {
  const client = new Client(DB_CONFIG);
  
  try {
    console.log('🔌 Conectando a PostgreSQL...');
    await client.connect();
    console.log('✅ Conectado a PostgreSQL');

    // Crear base de datos si no existe
    console.log(`📦 Creando base de datos '${DB_NAME}'...`);
    const dbCheck = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [DB_NAME]
    );

    if (dbCheck.rows.length === 0) {
      await client.query(`CREATE DATABASE ${DB_NAME}`);
      console.log(`✅ Base de datos '${DB_NAME}' creada`);
    } else {
      console.log(`ℹ️  Base de datos '${DB_NAME}' ya existe`);
    }

    await client.end();

    // Conectar a la nueva base de datos para crear tablas
    const dbClient = new Client({
      ...DB_CONFIG,
      database: DB_NAME,
    });

    await dbClient.connect();
    console.log(`🔌 Conectado a '${DB_NAME}'`);

    // Crear tablas
    console.log('📋 Creando tablas...');
    await dbClient.query(`
      CREATE TABLE IF NOT EXISTS consultas (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        apellido VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        telefono VARCHAR(50),
        mensaje TEXT NOT NULL,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS sessions (
        id VARCHAR(255) PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Crear índices
    console.log('📊 Creando índices...');
    await dbClient.query(`
      CREATE INDEX IF NOT EXISTS idx_consultas_fecha ON consultas(fecha DESC);
      CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
      CREATE INDEX IF NOT EXISTS idx_sessions_username ON sessions(username);
      CREATE INDEX IF NOT EXISTS idx_consultas_email ON consultas(email);
    `);

    console.log('✅ Tablas e índices creados correctamente');

    // Crear usuario admin por defecto
    console.log('👤 Verificando usuario admin...');
    const adminCheck = await dbClient.query(
      'SELECT * FROM admin_users WHERE username = $1',
      ['sebaspado@gmail.com']
    );

    if (adminCheck.rows.length === 0) {
      console.log('⚠️  Usuario admin no encontrado. Se creará automáticamente en el primer login.');
    } else {
      console.log('✅ Usuario admin existe');
    }

    await dbClient.end();

    console.log('\n🎉 ¡Configuración completada exitosamente!');
    console.log(`\n📝 DATABASE_URL: postgresql://${DB_CONFIG.user}:${DB_CONFIG.password}@${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_NAME}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 Asegúrate de que PostgreSQL esté corriendo:');
      console.error('   - Verifica que el servicio esté iniciado');
      console.error('   - Verifica el host y puerto en .env');
    } else if (error.code === '28P01') {
      console.error('\n💡 Error de autenticación:');
      console.error('   - Verifica el usuario y contraseña en .env');
    }
    process.exit(1);
  }
}

setupDatabase();

