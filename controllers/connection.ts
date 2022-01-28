import mysql, { Pool } from 'mysql2/promise';
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

const connection: Pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'StoreManager',
});

export default connection;