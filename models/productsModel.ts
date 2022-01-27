import connection from '../controllers/connection';
import { Product, ProductInfo } from '../controllers/utils';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname+'/.env' });

async function create({name, quantity}: ProductInfo) {
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

async function update({id, name, quantity}: Product) {
  const sql = `UPDATE products SET name = ?, quantity = ? WHERE id = ?`;
  const values = [name, quantity, id];

  const [product] = await connection.query(sql, values);
  const result: any = product

  return result;
}

export default {
  listAll,
  findById,
  create,
  findByName,
  update,
}