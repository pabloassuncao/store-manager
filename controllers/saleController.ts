import { NextFunction, Request, Response, Router } from 'express';
import rescue from 'express-rescue';
import saleService from '../services/salesService';
import saleProductService from '../services/saleProductService';

import utils from './utils';

// async function adjustedSales(req: Request, res: Response, next: NextFunction) {
//   const sales = req.body;
//   const result = await saleService.salesConverter(sales);
//   res.locals.sales = result;
//   return next();
// }

async function validateSale(req: Request, __res: Response, next: NextFunction) {
  const sales = req.body;
  await saleService.validateReqSale(sales);
  return next();
}

async function createSale(req: Request, res: Response) {
  const sales = req.body;
  
  const result = await saleProductService.createSale(sales);
  res.status(utils.HTTP_CREATED_STATUS).json(result);
}

const router: Router = Router();

export default router
  .post('/', rescue(validateSale), rescue(createSale))
  // .get('/:id', rescue(findSaleById))
  // .get('/', rescue(listAllSales))
  // .put('/:id', rescue(validateSale), rescue(updateSale))
  // .delete('/:id', rescue(deleteSaleById))
