import { Request, Response, Router } from 'express';
import rescue from 'express-rescue';
import productsService from '../services/productsService';

import utils from './utils';

async function createProduct(req: Request, res: Response) {
  const { name, quantity } = req.body;
  if(!name) { 
    throw { code: 'BAD_REQUEST', message: utils.PRODUCT_NAME_NOT_FOUND }
  }

  if((!quantity && quantity !== 0)) {
    throw { code: 'BAD_REQUEST', message: utils.PRODUCT_QUANTITY_NOT_FOUND }
  }

  const result = await productsService.create({name, quantity})
  return res.status(utils.HTTP_CREATED_STATUS).json(result).end();
}

async function listAllProducts(__req: Request, res: Response) {
  const result = await productsService.listAll();
  return res.status(utils.HTTP_OK_STATUS).json(result).end();
}

async function findProductById(req: Request, res: Response) {
  const { id } = req.params;
  const result = await productsService.findById(+id);
  return res.status(utils.HTTP_OK_STATUS).json(result).end();
}

async function updateProduct(req: Request, res: Response) {
  const { id } = req.params;
  const { name, quantity } = req.body;
  if(!name) {
    throw { code: 'BAD_REQUEST', message: utils.PRODUCT_NAME_NOT_FOUND }
  }

  if((!quantity && quantity !== 0)) {
    throw { code: 'BAD_REQUEST', message: utils.PRODUCT_QUANTITY_NOT_FOUND }
  }

  const result = await productsService.update({id: Number(id), name, quantity});
  return res.status(utils.HTTP_OK_STATUS).json(result).end();
}

const router: Router = Router();

router.get('/:id', rescue(findProductById));
router.get('/', rescue(listAllProducts));
router.put('/:id', rescue(updateProduct))
router.post('/', rescue(createProduct));

export default router;