import salesService from "./salesService";
import productsService from "./productsService";
import utils, { Product, Sale, SaleFindResponse, SaleReqInfo } from "../controllers/utils";

async function productsQuantityUpdate(sales: Sale[]) {
  const productsUpdate = sales.map(async ({productId, quantity}: Sale) => {
    const product: Product = await productsService.findById(productId);

    product.quantity -= quantity;

    const result = await productsService.update(product);

    return result;
  });

  await Promise.all(productsUpdate);

  return;
}

async function revertNewSaleProductUpdate(id: number) {
  const saleToUpdateRaw: SaleFindResponse[] = await salesService.findById(id);
  const salesToUpdate: Sale[] = await salesService.salesConverter(saleToUpdateRaw);

  const productsUpdate = salesToUpdate.map(async (sale: Sale) => {
    const product: Product = await productsService.findById(sale.productId);
    
    product.quantity += sale.quantity;

    const result = await productsService.update(product);

    return result;
  });

  await Promise.all(productsUpdate);

  return;
}

async function salesChecker(sales: Sale[]) {
  const result = sales.map(async (sale: Sale) => {
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
  const sales: Sale[] = await salesService.salesConverter(salesRaw);

  await salesChecker(sales);
  
  const saleId = await salesService.newSaleId();

  await productsQuantityUpdate(sales);
  
  const salesWithId: number[][] = sales
    .map(({ productId, quantity }: Sale) => ( [saleId, productId, quantity]));
  
  await salesService.create(salesWithId);

  const result = {
    id: saleId,
    itemsSold: salesRaw,
  }
  
  return result;
}

async function updateSale(saleId: number, salesRaw: SaleReqInfo[]) {
  const sales: Sale[] = await salesService.salesConverter(salesRaw);

  await salesChecker(sales);

  await revertNewSaleProductUpdate(saleId);

  await productsQuantityUpdate(sales);

  const salesWithId: Sale[] = sales
    .map(({ productId, quantity }: Sale) => ( { quantity, saleId, productId }));

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
