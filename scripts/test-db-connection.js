/**
 * Script para probar la conexión a PostgreSQL
 */

const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function testConnection() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL no está configurada en .env');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('🔌 Probando conexión a PostgreSQL...');
    const result = await pool.query('SELECT NOW(), version()');
    console.log('✅ Conexión exitosa!');
    console.log(`📅 Fecha/Hora del servidor: ${result.rows[0].now}`);
    console.log(`🗄️  Versión: ${result.rows[0].version.split(' ')[0]} ${result.rows[0].version.split(' ')[1]}`);
    
    // Verificar tablas
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log(`\n📋 Tablas encontradas (${tables.rows.length}):`);
    tables.rows.forEach(row => {
      console.log(`   - ${row.table_name}`);
    });

    await pool.end();
    console.log('\n✅ Todo funciona correctamente!');
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    process.exit(1);
  }
}

testConnection();

