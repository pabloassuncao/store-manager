import saleModel from "../models/saleModel";
import { saleSchema } from "../schemas/saleSchema";
import utils, { Sale, SaleReqInfo } from "../controllers/utils";

function salesConverter(sales: SaleReqInfo[]) { 
  const salesParsed: Sale[] = sales.map((sale: SaleReqInfo): Sale => ({
    productId: sale['product_id'],
    quantity: sale['quantity'],
  }));
  
  return salesParsed;
}

async function validateReqSale(salesRaw: SaleReqInfo[]) {
  const sales = salesConverter(salesRaw);
  const errors = sales.map(async (sale: Sale) => {
    const { error } = await saleSchema.validate(sale);

    if (error) {
      throw { code: error.details[0].type, message: error.details[0].message };
    }

    return;
  });

  await Promise.all(errors);

  return;
}

async function newSaleId() {
  const result = await saleModel.newSale();

  return result;
}

async function listAll() {
  const result = await saleModel.listAll();

  return result;
}

async function findById(id: number) {
  const result = await saleModel.findById(id);

  if (result.length === 0) {
    throw { code: 'NOT_FOUND', message: utils.SALE_NOT_FOUND };
  }

  return result;
}

async function create(sales: number[][]) {
  await saleModel.create(sales);
  return;
}

async function update(sales: Sale[]) {
  const result = sales.map(async (sale: Sale) => {
    if (sale.saleId) {
      await saleModel.update([sale.quantity, sale.saleId, sale.productId]);
    }
    return sale;
  });

  await Promise.all(result);
}

async function deleteById(id: number) {
  await saleModel.deleteById(id);
  return;
}

export default {
  create,
  update,
  validateReqSale,
  newSaleId,
  listAll,
  findById,
  salesConverter,
  deleteById,
}