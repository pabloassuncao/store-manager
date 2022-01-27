import { NextFunction, Request, Response, Router } from 'express';
import rescue from 'express-rescue';
import productsService from '../services/productsService';

import utils from './utils';

async function createProduct(req: Request, res: Response) {
  const { name, quantity } = req.body;
  if(!name) {
    console.log('name is null');
    
    throw { code: 'BAD_REQUEST', message: utils.PRODUCT_NAME_NOT_FOUND }
  }

  if((!quantity && quantity !== 0)) {
    console.log('quantity is null');
  
    throw { code: 'BAD_REQUEST', message: utils.PRODUCT_QUANTITY_NOT_FOUND }
  }

  const result = await productsService.create({name, quantity})
  return res.status(utils.HTTP_CREATED_STATUS).send(result).end();
}


const router: Router = Router();

router.post('/', rescue(createProduct));

export default router;