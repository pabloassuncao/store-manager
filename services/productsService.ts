import productsModel from "../models/productsModel";
import utils, { Product } from "../controllers/utils";

async function create({name, quantity}: {name: string, quantity: number}) {
  const product: Product = await productsModel.findByName(name);

  if(product) {
    throw { code: 'CONFLICT', message: utils.PRODUCT_NAME_ALREADY_EXISTS }
  }
  
  if(name.length < 5) {
    throw { code: 'UNPROCCESSABLE_ENTITY', message: utils.PRODUCT_NAME_INVALID }
  }

  if(typeof quantity !== 'number' || Number(quantity) <= 0 || !Number(quantity)) {
    throw { code: 'UNPROCCESSABLE_ENTITY', message: utils.PRODUCT_QUANTITY_INVALID }
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

export default {
  create,
  listAll,
  findById,
}