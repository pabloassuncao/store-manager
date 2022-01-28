import salesService from "./salesService";
import productsService from "./productsService";
import utils, { Product, Sale, SaleInfo, SaleReqInfo } from "../controllers/utils";

async function createSale(salesRaw: SaleReqInfo[]) {
  const sales: SaleInfo[] = await salesService.salesConverter(salesRaw);

  const salesCheck: Promise<SaleInfo>[] = sales.map(async (sale: SaleInfo) => {
    const product: Product = await productsService.findById(sale.productId);

    if(product.quantity < sale.quantity) {
      throw { code: 'UNPROCCESSABLE_ENTITY', message: utils.SALE_PRODUCT_QUANTITY_ERROR };
    }
    
    return sale;
  });

  const values: SaleInfo[] = await Promise.all(salesCheck);
  
  const saleId = await salesService.newSaleId();
  
  const salesWithId: Sale[][] = values
    .map(({ productId, quantity }: SaleInfo) => ( [saleId.insertId, productId, quantity]));
  
  await salesService.create(salesWithId);

  updateProductsQuantity(sales);

  const result = {
    id: saleId.insertId,
    itemsSold: salesRaw,
  }
  
  return result;
}

async function updateProductsQuantity(sales: SaleInfo[]) {
  const products = sales.map(async ({productId, quantity}: SaleInfo) => {
    const product: Product = await productsService.findById(productId);

    const newQuantity = product.quantity - quantity;

    const result = await productsService.update({
      id: productId,
      name: product.name,
      quantity: newQuantity,
    });

    return result;
  });

  await Promise.all(products);

  return;
}

export default {
  createSale,
}