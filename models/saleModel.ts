import connection from '../controllers/connection';
import { Sale, SaleInfo } from '../controllers/utils';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname+'/.env' });

async function newSale() {
  const sql = `INSERT INTO sales (id, date) VALUES (DEFAULT, DEFAULT)`
  const [sale] = await connection.query(sql);
  const result: any = sale

  return result;
}

async function create(sales: Sale[][]) {
  const sql = `
  INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?)`;
  const values = sales;
  
  const [sale] = await connection.query(sql, values);
  const result: any = sale;
  
  return result;
}

async function listAll() {
  const sql = `SELECT * FROM sales`;

  const [sales] = await connection.query(sql);
  
  return sales;
}

async function findById(saleId: number) {
  const sql = `SELECT * FROM sales WHERE id = ?`;
  const values = [saleId];

  const [sale] = await connection.query(sql, values);
  const result: any = sale
  
  return result[0];
}

async function update({saleId, productId, quantity}: Sale) {
  const sql = `UPDATE sale_products SET product_id = ?, quantity = ? WHERE sale_id = ?`;
  const values = [productId, quantity, saleId];

  const [product] = await connection.query(sql, values);
  const result: any = product

  return result;
}

async function deleteById(id: number) {
  const sql = `DELETE FROM sales WHERE id = ?`;
  const values = [id];

  await connection.query(sql, values);

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