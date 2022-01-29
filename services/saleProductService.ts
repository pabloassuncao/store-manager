import salesService from "./salesService";
import productsService from "./productsService";
import utils, { Product, Sale, SaleFindResponse, SaleInfo, SaleReqInfo } from "../controllers/utils";

async function productsQuantityUpdate(sales: SaleInfo[]) {
  const productsUpdate = sales.map(async ({productId, quantity}: SaleInfo) => {
    const product: Product = await productsService.findById(productId);

    const newQuantity = product.quantity - quantity;

    const result = await productsService.update({
      id: productId,
      name: product.name,
      quantity: newQuantity,
    });

    return result;
  });

  await Promise.all(productsUpdate);

  return;
}

async function revertNewSaleProductUpdate(id: number) {
  const saleToUpdateRaw: SaleFindResponse[] = await salesService.findById(id);
  const salesToUpdate: SaleInfo[] = await salesService.salesConverter(saleToUpdateRaw);

  const productsUpdate = salesToUpdate.map(async ({productId, quantity}: SaleInfo) => {
    const product: Product = await productsService.findById(productId);

    const newQuantity = product.quantity + quantity;

    const result = await productsService.update({
      id: productId,
      name: product.name,
      quantity: newQuantity,
    });

    return result;
  });

  await Promise.all(productsUpdate);

  return;
}

async function salesChecker(sales: SaleInfo[]) {
  const result = sales.map(async (sale: SaleInfo) => {
    const product: Product = await productsService.findById(sale.productId);

    if(product.quantity < sale.quantity) {
      throw { code: 'UNPROCCESSABLE_ENTITY', message: utils.SALE_PRODUCT_QUANTITY_ERROR };
    }
    
    return sale;
  });

  await Promise.all(result);

  return;
}

async function createSale(salesRaw: SaleReqInfo[]) {
  const sales: SaleInfo[] = await salesService.salesConverter(salesRaw);

  await salesChecker(sales);
  
  const saleId = await salesService.newSaleId();

  await productsQuantityUpdate(sales);
  
  const salesWithId: Sale[][] = sales
    .map(({ productId, quantity }: SaleInfo) => ( [saleId.insertId, productId, quantity]));
  
  await salesService.create(salesWithId);

  const result = {
    id: saleId.insertId,
    itemsSold: salesRaw,
  }
  
  return result;
}

async function updateSale(saleId: number, salesRaw: SaleReqInfo[]) {
  const sales: SaleInfo[] = await salesService.salesConverter(salesRaw);

  await revertNewSaleProductUpdate(saleId);

  await salesChecker(sales);

  await productsQuantityUpdate(sales);

  const salesWithId = sales
    .map(({ productId, quantity }: SaleInfo) => ( [quantity, saleId, productId]));

  await salesService.update(salesWithId);

  return {
    saleId,
    itemUpdated: salesRaw,
  }
}

async function deleteSale(id: number) {
  const response = await salesService.findById(id);

  await revertNewSaleProductUpdate(id);
  await salesService.deleteById(id);

  return response;
}

export default {
  createSale,
  updateSale,
  deleteSale,
}
