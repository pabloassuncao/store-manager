import connection from '../controllers/connection';
import { Product } from '../controllers/utils';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname+'/.env' });

async function create({name, quantity}: Product) {
  const sql = `INSERT INTO products (name, quantity) VALUES (?, ?)`;
  const values = [name, quantity];
  console.log('inside model');
  
  const product = await connection.query(sql, values);
  
  return product;
}

async function findByName(name: string) {
  const sql = `SELECT * FROM products WHERE name = ?`;
  const values = [name];

  const [product] = await connection.query(sql, values);
  
  return product;
}

export default {
  create,
  findByName,
}