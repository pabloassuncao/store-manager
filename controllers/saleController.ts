import { NextFunction, Request, Response, Router } from 'express';
import rescue from 'express-rescue';
import saleService from '../services/salesService';
import saleProductService from '../services/saleProductService';

import utils from './utils';

export async function validateSale(req: Request, __res: Response, next: NextFunction) {
  const sales = req.body;
  await saleService.validateReqSale(sales);
  return next();
}

export async function createSale(req: Request, res: Response) {
  const sales = req.body;
  
  const result = await saleProductService.createSale(sales);
  res.status(utils.HTTP_CREATED_STATUS).json(result);
}

export async function findSaleById(req: Request, res: Response) {
  const id = req.params.id;
  const result = await saleService.findById(+id);
  res.status(utils.HTTP_OK_STATUS).json(result);
}
  
export async function listAllSales(__req: Request, res: Response) {
  const result = await saleService.listAll();
  res.status(utils.HTTP_OK_STATUS).json(result);
}

export async function updateSale(req: Request, res: Response) {
  const id = req.params.id;
  const sale = req.body;
  const result = await saleProductService.updateSale(+id, sale);
  res.status(utils.HTTP_OK_STATUS).json(result);
}

export async function deleteSaleById(req: Request, res: Response) {
  const id = req.params.id;
  const result = await saleProductService.deleteSale(+id);
  res.status(utils.HTTP_OK_STATUS).json(result);
}

const router: Router = Router();

export default router
  .post('/', rescue(validateSale), rescue(createSale))
  .get('/:id', rescue(findSaleById))
  .get('/', rescue(listAllSales))
  .put('/:id', rescue(validateSale), rescue(updateSale))
  .delete('/:id', rescue(deleteSaleById))
  // .put('/:id', rescue(validateSale), rescue(updateSale))
