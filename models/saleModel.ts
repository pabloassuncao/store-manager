import connection from '../controllers/connection';
import { Sale, SaleInfo } from '../controllers/utils';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname+'/.env' });

async function newSale() {
  const sql = `INSERT INTO sales (id) VALUES (DEFAULT)`
  const [sale] = await connection.query(sql);
  
  const result: any = sale

  return result;
}

async function create(sales: Sale[][]) {
  const sql = `
  INSERT INTO sales_products (sale_id, product_id, quantity) VALUES ?`;
  const values = [sales];
  
  const [sale] = await connection.query(sql, values);
  const result: any = sale;
  
  return result;
}

async function listAll() {
  const sql = `
  SELECT sale_id as saleId, date, product_id, quantity FROM sales 
  inner join sales_products on sales.id = sales_products.sale_id`;

  const [sales] = await connection.query(sql);
  const result: any = sales
  
  return result;
}

async function findById(saleId: number) {
  const sql = `
  SELECT date, product_id, quantity FROM sales_products 
  inner join sales on sales.id = sales_products.sale_id
  WHERE sale_id = ?`;
  const values = [saleId];

  const [sale] = await connection.query(sql, values);
  const result: any = sale
  
  return result;
}

async function update(salesToUpdate: number[]) {
  const sql = `UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?`;
  const values = salesToUpdate;

  const [product] = await connection.query(sql, values);
  const result: any = product

  return result;
}

async function deleteById(id: number) {
  const sql1 = `DELETE FROM sales WHERE id = ?`;
  const sql2 = `DELETE FROM sales_products WHERE sale_id = ?`;

  const values = [id];

  await connection.query(sql1, values);
  await connection.query(sql2, values);

  return;
}

export default {
  listAll,
  findById,
  create,
  update,
  deleteById,
  newSale,
}