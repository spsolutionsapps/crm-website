/**
 * Script para migrar datos desde SQLite a PostgreSQL
 * 
 * Uso:
 * 1. Asegúrate de tener DATABASE_URL configurada en .env
 * 2. Asegúrate de que el archivo data/consultas.db existe
 * 3. Ejecuta: node scripts/migrate-data-from-sqlite.js
 */

const Database = require('better-sqlite3');
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const sqliteDb = new Database(path.join(__dirname, '..', 'data', 'consultas.db'));

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function migrateData() {
  const client = await pgPool.connect();
  
  try {
    console.log('🔄 Iniciando migración de datos...');

    // Migrar consultas
    const consultas = sqliteDb.prepare('SELECT * FROM consultas').all();
    console.log(`📊 Encontradas ${consultas.length} consultas para migrar`);

    for (const consulta of consultas) {
      await client.query(
        `INSERT INTO consultas (id, nombre, apellido, email, telefono, mensaje, fecha)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (id) DO NOTHING`,
        [
          consulta.id,
          consulta.nombre,
          consulta.apellido,
          consulta.email,
          consulta.telefono || null,
          consulta.mensaje,
          consulta.fecha
        ]
      );
    }
    console.log('✅ Consultas migradas');

    // Migrar admin_users
    const adminUsers = sqliteDb.prepare('SELECT * FROM admin_users').all();
    console.log(`👤 Encontrados ${adminUsers.length} usuarios admin para migrar`);

    for (const user of adminUsers) {
      await client.query(
        `INSERT INTO admin_users (id, username, password)
         VALUES ($1, $2, $3)
         ON CONFLICT (username) DO NOTHING`,
        [user.id, user.username, user.password]
      );
    }
    console.log('✅ Usuarios admin migrados');

    // Migrar sessions (opcional, generalmente no es necesario)
    const sessions = sqliteDb.prepare('SELECT * FROM sessions').all();
    console.log(`🔐 Encontradas ${sessions.length} sesiones para migrar`);

    for (const session of sessions) {
      await client.query(
        `INSERT INTO sessions (id, username, expires_at)
         VALUES ($1, $2, $3)
         ON CONFLICT (id) DO NOTHING`,
        [session.id, session.username, session.expires_at]
      );
    }
    console.log('✅ Sesiones migradas');

    console.log('🎉 Migración completada exitosamente!');
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    throw error;
  } finally {
    client.release();
    sqliteDb.close();
    await pgPool.end();
  }
}

migrateData().catch(console.error);

