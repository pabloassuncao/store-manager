import productsModel from "../models/productsModel";
import { productSchema } from "../schemas/productSchema";
import utils, { Product, ProductInfo } from "../controllers/utils";

async function validateReqProduct({name, quantity}: ProductInfo) {
  const prodInfo: ProductInfo = { name, quantity };
  
  const {error} = await productSchema
    .validate(prodInfo);
  
  if(error) {
    throw { code: error.details[0].type, message: error.details[0].message };
  }
  return;
}

async function create({name, quantity}: ProductInfo) {
  const product: Product = await productsModel.findByName(name);

  if(product) {
    throw { code: 'CONFLICT', message: utils.PRODUCT_NAME_ALREADY_EXISTS }
  }

  const resultId = await productsModel.create({name, quantity});

  return { id: resultId.insertId, name, quantity };
}

async function listAll() {
  const products = await productsModel.listAll();
  return products;
}

async function findById(id: number) {
  const product: Product = await productsModel.findById(id);
  
  if(!product) {
    throw { code: 'NOT_FOUND', message: utils.PRODUCT_NOT_FOUND }
  }

  return product;
}

async function update({id, name, quantity}: Product) {
  await findById(id);

  await productsModel.update({id, name, quantity});

  return {id, name, quantity};
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