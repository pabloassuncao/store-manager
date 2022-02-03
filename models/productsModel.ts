import connection from '../controllers/connection';
import { Product } from '../controllers/utils';
import * as dotenv from 'dotenv';
import { ResultSetHeader } from 'mysql2';
dotenv.config({ path: __dirname+'/.env' });

async function create({name, quantity}: Product ) {
  const sql = `INSERT INTO products (name, quantity) VALUES (?, ?)`;
  const values = [name, quantity];
  
  const [product] = await connection.query<ResultSetHeader>(sql, values);
  
  return product.insertId;
}

async function listAll() {
  const sql = `SELECT * FROM products`;

  const [product] = await connection.query<ResultSetHeader>(sql);
  const result: any = product
  
  return result;
}

async function findByName(name: string) {
  const sql = `SELECT * FROM products WHERE name = ?`;
  const values = [name];

  const [product] = await connection.query<Product[]>(sql, values);
  const result: any = product
  
  return result[0];
}

async function findById(id: Product['id']) {
  const sql = `SELECT * FROM products WHERE id = ?`;
  const values = [id];

  const [product] = await connection.query<Product[]>(sql, values);
  const result: any = product
  
  return result[0];
}

async function update({id, name, quantity}: Product) {
  const sql = `UPDATE products SET name = ?, quantity = ? WHERE id = ?`;
  const values = [name, quantity, id];

  const [product] = await connection.query<ResultSetHeader>(sql, values);
  const result: any = product

  return result;
}

async function deleteById(id: number) {
  const sql = `DELETE FROM products WHERE id = ?`;
  const values = [id];

  await connection.query<ResultSetHeader>(sql, values);

  return;
}

export default {
  listAll,
  findById,
  create,
  findByName,
  update,
  deleteById,
}