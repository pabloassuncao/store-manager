import saleModel from "../models/saleModel";
import { saleSchema } from "../schemas/saleSchema";
import utils, { Sale, SaleInfo, SaleReqInfo } from "../controllers/utils";

async function salesConverter(sales: SaleReqInfo[]) {
  console.log(sales);
  
  const salesCorreted = sales.map((sale) => ({
    productId: sale['product_id'],
    quantity: sale['quantity'],
  }));
  
  return salesCorreted;
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

async function create(sales: Sale[][]) {
  const result = await saleModel.create(sales);

  return result;
}

export default {
  create,
  validateReqSale,
  newSaleId,
  salesConverter,
}