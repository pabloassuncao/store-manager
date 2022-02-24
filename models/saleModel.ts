import connection from '../controllers/connection';
import { Sale, SaleFindResponse, SaleRaw } from '../controllers/utils';
import * as dotenv from 'dotenv';
import { ResultSetHeader } from 'mysql2';
dotenv.config({ path: __dirname+'/.env' });

async function newSale() {
  const sql = `INSERT INTO sales (id) VALUES (DEFAULT)`
  const [sale] = await connection.query<ResultSetHeader>(sql);

  return sale.insertId;
}

async function create(sales: number[][]) {
  const sql = `
  INSERT INTO sales_products (sale_id, product_id, quantity) VALUES ?`;
  const values = [sales];
  
  await connection.query<ResultSetHeader>(sql, values);
  
  return;
}

async function listAll() {
  const sql = `
  SELECT sale_id as saleId, date, product_id, quantity FROM sales 
  inner join sales_products on sales.id = sales_products.sale_id`;

  const [sales] = await connection.query<ResultSetHeader>(sql);
  
  return sales;
}

async function findById(saleId: number) {
  const sql = `
  SELECT date, product_id, quantity FROM sales_products 
  inner join sales on sales.id = sales_products.sale_id
  WHERE sale_id = ?`;
  const values = [saleId];

  const [sale] = await connection.query<SaleRaw[]>(sql, values);
  
  return sale;
}

async function update(salesToUpdate: number[]) {
  const sql = `UPDATE
  sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?`;
  const values = salesToUpdate;
  
  await connection.query<ResultSetHeader>(sql, values);
}

async function deleteById(id: number) {
  const sql1 = `DELETE FROM sales WHERE id = ?`;
  const sql2 = `DELETE FROM sales_products WHERE sale_id = ?`;

  const values = [id];

  await connection.query<ResultSetHeader>(sql1, values);
  await connection.query<ResultSetHeader>(sql2, values);
}

export default {
  listAll,
  findById,
  create,
  update,
  deleteById,
  newSale,
}