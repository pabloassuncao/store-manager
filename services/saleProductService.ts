import salesService from "./salesService";
import productsService from "./productsService";
import { Product, Sale, SaleInfo, SaleReqInfo } from "../controllers/utils";

async function createSale(salesRaw: SaleReqInfo[]) {
  console.log(salesRaw);
  
  const sales = await salesService.salesConverter(salesRaw);

  const salesWId = sales.map(async ({productId, quantity}: SaleInfo) => {
    const product: Product = await productsService.findById(productId);

    if(product.quantity < quantity) {
      throw { code: 'UNPROCCESSABLE_ENTITY', message: "dont't have enough quantity" }
    }

    const saleId = await salesService.newSaleId();
    
    return [saleId.insertId, productId, quantity];
  });

  const values: Sale[][] = await Promise.all(salesWId);

  const { insertId } = await salesService.create(values);

  const result = {
    id: insertId,
    itemsSold: salesRaw,
  }
  
  return result;
}

export default {
  createSale,
}