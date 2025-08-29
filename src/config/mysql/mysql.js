import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

class DB {
  constructor() {
    if (!DB.instance) {
      DB.instance = this;
      this.pool = mysql.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
    }

    return DB.instance;
  }

  async testConnection() {
    try {
      const connection = await this.pool.getConnection();
      console.log(`🐬${process.env.HOST}::Conexión exitosa con la base de datos ${process.env.DB}`);
      connection.release();
    } catch (err) {
      console.error('🖤 Error al conectar a la base de datos:', err);
    }
  }

  getPool() {
    return this.pool;
  }
}

const dbInstance = new DB();
export default dbInstance;