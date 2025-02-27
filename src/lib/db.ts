import Database from 'better-sqlite3';
import path from 'path';

// Path to your SQLite database
const dbPath = path.join(process.cwd(), 'data', 'blog.db');

// Create or open the database
const db = new Database(dbPath);

export default db;