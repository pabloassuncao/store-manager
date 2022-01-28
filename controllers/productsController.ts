import { NextFunction, Request, Response, Router } from 'express';
import rescue from 'express-rescue';
import productsService from '../services/productsService';

import utils from './utils';

async function validateProduct(req: Request, __res: Response, next: NextFunction) {
  const { name, quantity } = req.body;
  await productsService.validateReqProduct({ name, quantity });
  return next();
}

async function createProduct(req: Request, res: Response) {
  const { name, quantity } = req.body;

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

  const result = await productsService.update({id: Number(id), name, quantity});
  return res.status(utils.HTTP_OK_STATUS).json(result).end();
}

async function deleteProductById(req: Request, res: Response) {
  const { id } = req.params;
  const result = await productsService.deleteById(+id);
  return res.status(utils.HTTP_OK_STATUS).json(result).end();
}

const router: Router = Router();

export default router
  .get('/:id', rescue(findProductById))
  .get('/', rescue(listAllProducts))
  .put('/:id', rescue(validateProduct), rescue(updateProduct))
  .post('/', rescue(validateProduct), rescue(createProduct))
  .delete('/:id', rescue(deleteProductById))
