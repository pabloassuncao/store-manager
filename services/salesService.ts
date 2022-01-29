import saleModel from "../models/saleModel";
import { saleSchema } from "../schemas/saleSchema";
import utils, { Sale, SaleInfo, SaleReqInfo } from "../controllers/utils";

async function salesConverter(sales: SaleReqInfo[]) { 
  const salesParsed = sales.map((sale) => ({
    productId: sale['product_id'],
    quantity: sale['quantity'],
  }));
  
  return salesParsed;
}

async function validateReqSale(salesRaw: SaleReqInfo[]) {
  const sales = await salesConverter(salesRaw);
  const errors = sales.map(async (sale: SaleInfo) => {
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

async function create(sales: Sale[][]) {
  const result = await saleModel.create(sales);

  return result;
}

async function update(sales: number[][]) {
  const result = sales.map(async (sale: number[]) => {
    await saleModel.update(sale);
    return sale;
  });

  await Promise.all(result);

  return result;
}

async function deleteById(id: number) {
  const result = await saleModel.deleteById(id);

  return result;
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