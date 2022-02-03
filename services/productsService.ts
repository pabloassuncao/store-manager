import productsModel from "../models/productsModel";
import { productSchema } from "../schemas/productSchema";
import utils, { Product } from "../controllers/utils";

async function validateReqProduct(prodInfo: Product) {
  const {error} = await productSchema
    .validate(prodInfo);
  
  if(error) {
    throw { code: error.details[0].type, message: error.details[0].message };
  }
  return;
}

async function create(prodInfo: Product) {
  const product: Product = await productsModel.findByName(prodInfo.name);

  if(product) {
    throw { code: 'CONFLICT', message: utils.PRODUCT_NAME_ALREADY_EXISTS }
  }

  const resultId: number = await productsModel.create(prodInfo);

  return { id: resultId, ...prodInfo };
}

async function listAll() {
  const products = await productsModel.listAll();
  return products;
}

async function findById(id: Product['id']) {
  const product: Product = await productsModel.findById(id);
  
  if(!product) {
    throw { code: 'NOT_FOUND', message: utils.PRODUCT_NOT_FOUND }
  }

  return product;
}

async function update(prodInfo: Product) {
  await findById(prodInfo.id);

  await productsModel.update(prodInfo);

  return prodInfo;
}

async function deleteById(id: number) {
  const deletedProduct: Product = await findById(id);

  await productsModel.deleteById(id);

  return deletedProduct;
}


export default {
  create,
  listAll,
  findById,
  update,
  deleteById,
  validateReqProduct,
}