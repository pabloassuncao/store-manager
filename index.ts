import express, { Request, Response, Application, NextFunction } from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname+'/.env' });

import productsController from './controllers/productsController';
import utils, { Err } from './controllers/utils';
import saleController from './controllers/saleController';

const app: Application = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request: Request, response: Response): void => {
  response.status(utils.HTTP_OK_STATUS).send();
});

app.use(utils.PRODUCTS_ROUTE, productsController)

app.use(utils.SALES_ROUTE, saleController)

app.use((err: Err, __req: Request, res: Response, __next: NextFunction) => {
  const status = utils.ERR_CODES[err.code];
  console.log('entrou no erro');
  console.log(err);

  if (status) {
    return res.status(status).json({ message: err.message }).end();
  }
  else {
    return res
      .status(utils.HTTP_INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: 'Internal server error' }).end();
  }
});

app.listen(process.env.PORT,() => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
