import connection from '../controllers/connection';
import { Product } from '../controllers/utils';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname+'/.env' });

async function create({name, quantity}: Product) {
  const sql = `INSERT INTO products (name, quantity) VALUES (?, ?)`;
  const values = [name, quantity];
  
  const [product] = await connection.query(sql, values);
  const result: any = product
  
  return result;
}

async function listAll() {
  const sql = `SELECT * FROM products`;

  const [product] = await connection.query(sql);
  
  return product;
}

async function findByName(name: string) {
  const sql = `SELECT * FROM products WHERE name = ?`;
  const values = [name];

  const [product] = await connection.query(sql, values);
  const result: any = product
  
  return result[0];
}

async function findById(id: number) {
  const sql = `SELECT * FROM products WHERE id = ?`;
  const values = [id];

  const [product] = await connection.query(sql, values);
  const result: any = product
  
  return result[0];
}

export default {
  listAll,
  findById,
  create,
  findByName,
}