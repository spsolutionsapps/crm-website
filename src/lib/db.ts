import { Pool, QueryResult } from 'pg';
import { hashPassword } from './auth';

// Configuración de conexión PostgreSQL (solo si hay DATABASE_URL)
let pool: Pool | null = null;

if (process.env.DATABASE_URL) {
  // Determinar si usar SSL basado en la URL o el entorno
  const useSSL = process.env.DATABASE_URL.includes('sslmode=require') || 
                 (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL.includes('localhost'));
  
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: useSSL ? { rejectUnauthorized: false } : false,
    max: 20, // Máximo de conexiones en el pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
}

// Interfaz para mantener compatibilidad con better-sqlite3
interface DBResult {
  changes?: number;
  lastInsertRowid?: number;
}

interface PreparedStatement {
  run(...params: any[]): DBResult | Promise<DBResult>;
  get(...params: any[]): any | Promise<any>;
  all(...params: any[]): any[] | Promise<any[]>;
}

interface Database {
  prepare(query: string): PreparedStatement;
  exec(query: string): void | Promise<void>;
}

// Helper para convertir queries de SQLite (? placeholders) a PostgreSQL ($1, $2, etc.)
function convertQuery(query: string): string {
  let paramIndex = 1;
  return query.replace(/\?/g, () => `$${paramIndex++}`);
}

// Wrapper para mantener compatibilidad con la API de better-sqlite3
// Nota: Las funciones ahora son async, pero mantienen la misma interfaz
class PostgreSQLAdapter implements Database {
  async exec(query: string): Promise<void> {
    if (!pool) throw new Error('PostgreSQL pool no inicializado');
    await pool.query(query);
  }

  prepare(query: string): PreparedStatement {
    return {
      async run(...params: any[]): Promise<DBResult> {
        if (!pool) throw new Error('PostgreSQL pool no inicializado');
        const pgQuery = convertQuery(query);
        const result: QueryResult = await pool.query(pgQuery, params);
        return {
          changes: result.rowCount || 0,
          lastInsertRowid: result.rows[0]?.id,
        };
      },
      async get(...params: any[]): Promise<any> {
        if (!pool) throw new Error('PostgreSQL pool no inicializado');
        const pgQuery = convertQuery(query);
        const result: QueryResult = await pool.query(pgQuery, params);
        return result.rows[0] || null;
      },
      async all(...params: any[]): Promise<any[]> {
        if (!pool) throw new Error('PostgreSQL pool no inicializado');
        const pgQuery = convertQuery(query);
        const result: QueryResult = await pool.query(pgQuery, params);
        return result.rows;
      },
    };
  }
}

// Función para inicializar las tablas
async function initializeDatabase(db: Database) {
  try {
    // Crear tablas si no existen
    await db.exec(`
      CREATE TABLE IF NOT EXISTS consultas (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        apellido VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        telefono VARCHAR(50),
        asunto VARCHAR(255),
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

      -- Crear índices para mejorar rendimiento
      CREATE INDEX IF NOT EXISTS idx_consultas_fecha ON consultas(fecha DESC);
      CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
      CREATE INDEX IF NOT EXISTS idx_sessions_username ON sessions(username);
    `);

    // Verificar si existe la columna 'pais' y migrar a 'telefono' si es necesario
    if (!pool) throw new Error('PostgreSQL pool no inicializado');
    const tableInfo = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'consultas' AND column_name IN ('pais', 'telefono')
    `);

    const hasPaisColumn = tableInfo.rows.some((col: any) => col.column_name === 'pais');
    const hasTelefonoColumn = tableInfo.rows.some((col: any) => col.column_name === 'telefono');

    if (hasPaisColumn && !hasTelefonoColumn) {
      await db.exec(`
        ALTER TABLE consultas ADD COLUMN telefono VARCHAR(50);
        UPDATE consultas SET telefono = pais WHERE telefono IS NULL;
        ALTER TABLE consultas DROP COLUMN pais;
      `);
    }

    const asuntoCheck = await pool.query(`
      SELECT column_name FROM information_schema.columns
      WHERE table_name = 'consultas' AND column_name = 'asunto'
    `);
    if (asuntoCheck.rows.length === 0) {
      await db.exec(`ALTER TABLE consultas ADD COLUMN asunto VARCHAR(255)`);
    }

    // Crear usuario admin por defecto si no existe (usando ON CONFLICT para evitar errores)
    const adminUser = await db.prepare('SELECT * FROM admin_users WHERE username = ?').get('sebaspado@gmail.com');
    if (!adminUser) {
      try {
        const hashedPassword = await hashPassword('Gojira2019!');
        await db.prepare('INSERT INTO admin_users (username, password) VALUES (?, ?) ON CONFLICT (username) DO NOTHING').run('sebaspado@gmail.com', hashedPassword);
      } catch (error: any) {
        // Ignorar error si el usuario ya existe (puede ocurrir en builds concurrentes)
        if (error.code !== '23505') {
          console.error('Error creando usuario admin:', error);
        }
      }
    }

    console.log('✅ Base de datos PostgreSQL inicializada correctamente');
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error);
    // No lanzar error para permitir que la app inicie
    // pero registrar el error para debugging
  }
}

// Fallback a SQLite si no hay DATABASE_URL
let db: Database;

if (process.env.DATABASE_URL) {
  // Usar PostgreSQL
  db = new PostgreSQLAdapter();
  initializeDatabase(db).catch(console.error);
} else {
  // Fallback a SQLite (opcional)
  console.warn('⚠️  DATABASE_URL no configurada. Intentando usar SQLite como fallback...');
  try {
    // Intentar cargar better-sqlite3 (puede no estar instalado)
    let Database;
    try {
      Database = require('better-sqlite3');
    } catch (e) {
      throw new Error(
        'better-sqlite3 no está instalado. ' +
        'Por favor instala PostgreSQL y configura DATABASE_URL, ' +
        'o instala better-sqlite3 con: npm install better-sqlite3 (requiere Visual Studio Build Tools en Windows)'
      );
    }
    
    const path = require('path');
    const fs = require('fs');
    
    const dbPath = path.join(process.cwd(), 'data', 'consultas.db');
    const dbDir = path.dirname(dbPath);
    
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    
    const sqliteDb = new Database(dbPath);
    
    // Crear tablas si no existen
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS consultas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        apellido TEXT NOT NULL,
        email TEXT NOT NULL,
        telefono TEXT,
        asunto TEXT,
        mensaje TEXT NOT NULL,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS admin_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        expires_at DATETIME NOT NULL
      );
    `);

    const sqliteCols = sqliteDb.prepare('PRAGMA table_info(consultas)').all() as { name: string }[];
    if (!sqliteCols.some((c) => c.name === 'asunto')) {
      try {
        sqliteDb.exec('ALTER TABLE consultas ADD COLUMN asunto TEXT');
      } catch (_) {}
    }
    
    db = sqliteDb as any;
    console.log('✅ SQLite inicializado como fallback');
  } catch (error: any) {
    console.error('❌ Error inicializando SQLite:', error.message);
    throw new Error(
      'No se pudo inicializar ninguna base de datos. ' +
      'Por favor configura DATABASE_URL para PostgreSQL o instala better-sqlite3.'
    );
  }
}

// Exportar pool para uso directo si es necesario (solo para PostgreSQL)
export { pool };

// Exportar db con la misma interfaz
export default db;
