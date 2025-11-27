// Archivo de respaldo para SQLite (mantener por si acaso)
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { hashPassword } from './auth';

const dbPath = path.join(process.cwd(), 'data', 'consultas.db');
const dbDir = path.dirname(dbPath);

// Asegurar que el directorio existe
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

// Crear tablas si no existen
db.exec(`
  CREATE TABLE IF NOT EXISTS consultas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    email TEXT NOT NULL,
    telefono TEXT,
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

// Migrar datos de 'pais' a 'telefono' si existe la columna 'pais'
try {
  const tableInfo = db.prepare("PRAGMA table_info(consultas)").all() as any[];
  const hasPaisColumn = tableInfo.some(col => col.name === 'pais');
  const hasTelefonoColumn = tableInfo.some(col => col.name === 'telefono');
  
  if (hasPaisColumn && !hasTelefonoColumn) {
    // Crear nueva tabla con telefono
    db.exec(`
      CREATE TABLE consultas_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        apellido TEXT NOT NULL,
        email TEXT NOT NULL,
        telefono TEXT,
        mensaje TEXT NOT NULL,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      INSERT INTO consultas_new (id, nombre, apellido, email, telefono, mensaje, fecha)
      SELECT id, nombre, apellido, email, pais as telefono, COALESCE(mensaje, '') as mensaje, fecha FROM consultas;
      DROP TABLE consultas;
      ALTER TABLE consultas_new RENAME TO consultas;
    `);
  }
} catch (error) {
  // Si hay error, simplemente continuar (la tabla ya está correcta o no existe)
  console.log('Migración de base de datos:', error);
}

// El usuario admin se crea automáticamente en el primer login con las credenciales correctas
// Usuario: sebaspado@gmail.com
// Password: Gojira2019!

export default db;

