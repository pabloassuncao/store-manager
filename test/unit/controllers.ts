import sinon from 'sinon';
import { expect } from 'chai';
import 'mocha';

import productsService from '../../services/productsService';
import { listAllProducts } from '../../controllers/productsController';
import salesService from '../../services/salesService';
import saleProductService from '../../services/saleProductService';
import { createSale, listAllSales} from '../../controllers/saleController';
import { listOfItemsMock, saleReqInfoMock, newSaleResponseMock, saleListMock } from './mocks';
import { Req } from '../../controllers/utils';

describe('Testa a camada controller', () => {
  describe('Testa a ProductsController', () => {
    describe("Testa se a função 'ListAll' retorna a lista de produtos", () => {
      const req: Req = {
        // @ts-ignore
        body: {}
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returns({
          end: sinon.stub().returns(undefined),
        }),
      };

      before(() => {
        sinon.stub(productsService, "listAll").resolves(listOfItemsMock);
      });

      after(() => {
        // @ts-ignore
        productsService.listAll.restore();
      });
      it("Testa se retorna a lista com status 200", async () => {
        // @ts-ignore
        await listAllProducts(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it("Deve chamar json com a lista de produtos", async () => {
        // @ts-ignore
        await listAllProducts(req, res);
        expect(res.json.calledWith(listOfItemsMock)).to.be.equal(true);
      });
    });
  });
  describe('Testa a SalesController', () => {
    describe("Testa se a função 'CreateSale' cria uma venda", () => {
      const req: Req = {
        // @ts-ignore
        body: saleReqInfoMock,
      };

      const res = {
        status: () => res,
        json: sinon.stub().returns({
          end: sinon.stub().returns(undefined),
        }),
      };

      before(() => {
        res.status = sinon.stub().returns(res);
        sinon.stub(saleProductService, "createSale").resolves(newSaleResponseMock);
      });

      after(() => {
        // @ts-ignore
        saleProductService.createSale.restore();
      });

      it("Testa se retorna a nova venda com status 201", async () => {
        // @ts-ignore
        await createSale(req, res);
        // @ts-ignore
        expect(res.status.calledWith(201)).to.be.equal(true);
      });

      it("Testa se retorna um objeto com a venda", async () => {
        // @ts-ignore
        await createSale(req, res);
        expect(res.json.calledWith(newSaleResponseMock)).to.be.equal(true);
      });
    });
    describe("Testa se a função 'ListAllSales' retorna a lista de vendas", () => {
      const req = {
        body: {}
      };

      const res = {
        status: () => res,
        json: sinon.stub().returns({
          end: sinon.stub().returns(undefined),
        }),
      };

      before(() => {
        sinon.stub(res, 'status').returns(res);
        sinon.stub(salesService, "listAll").resolves(saleListMock);
      });

      after(() => {
        // @ts-ignore
        salesService.listAll.restore();
      });
      it("Testa se retorna a lista com status 200", async () => {
        // @ts-ignore
        await listAllSales(req, res);
        // @ts-ignore
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it("Deve chamar json com a lista de vendas", async () => {
        // @ts-ignore
        await listAllSales(req, res);
        expect(res.json.calledWith(saleListMock)).to.be.equal(true);
      });
    });
  });
})
