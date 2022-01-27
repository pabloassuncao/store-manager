import productsModel from "../models/productsModel";
import utils from "../controllers/utils";

async function create({name, quantity}: {name: string, quantity: number}) {
  const product = await productsModel.findByName(name);
  const test: any = product;

  if(test.length > 0) {
    console.log('products already exists', product);
    throw { code: 'CONFLICT', message: utils.PRODUCT_NAME_ALREADY_EXISTS }
  }
  
  if(name.length < 5) {
    console.log('invalid name');
    
    throw { code: 'UNPROCCESSABLE_ENTITY', message: utils.PRODUCT_NAME_INVALID }
  }

  if(typeof quantity !== 'number' || Number(quantity) <= 0 || !Number(quantity)) {
    throw { code: 'UNPROCCESSABLE_ENTITY', message: utils.PRODUCT_QUANTITY_INVALID }
  }

  const [prod] = await productsModel.create({name, quantity});
  const test2: any = prod;

  return { id: test2.insertId, name, quantity };
}

export default {
  create,
}