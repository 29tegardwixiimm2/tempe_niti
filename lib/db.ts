import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: '127.0.0.1', // GANTI 'localhost' JADI INI
  user: 'root',
  password: '',
  database: 'db_toko',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});