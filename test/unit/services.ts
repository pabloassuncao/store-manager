import sinon from 'sinon';
import { expect } from 'chai';
import 'mocha';

import productsModel from '../../models/productsModel'
import productsService from '../../services/productsService';
import salesService from '../../services/salesService';
import { errorMock, findByQueryMock, findByQueryMockSale, itemMocked, itemResponseMocked, itemResultMock, listOfItemsMock, saleInfoParsedMock, saleInfoWIDParsedMock, saleReqInfoMock, updatedItemMock, updateSaleMock } from './mocks';
import { productSchema } from '../../schemas/productSchema';
import saleModel from '../../models/saleModel';
import { saleSchema } from '../../schemas/saleSchema';
import connection from '../../controllers/connection';
import { query } from 'express';

// @ts-ignore

describe('Testa a camada services', () => {
  describe('Testa a "ProductsServices"', () => {
    describe('Testa a validação de um produto', () => {
      before(() => {
        sinon.stub(productSchema, 'validate')
          .onFirstCall().resolves({})
          .onSecondCall().resolves({ code: 'any.required', message: '"quantity" is required' });
      });

      after(() => {
        // @ts-ignore
        productSchema.validate.restore();
      });

      it('Deve retornar "undefined", isto é, sem erro', async () => {
        const result = await productsService.validateReqProduct(itemMocked)
        expect(result).to.be.equal(undefined);
      });

      it('Deve retornar um erro, pois o campo "quantity" é obrigatório', async () => {
        try {
          // @ts-ignore
          await productsService.validateReqProduct({ name: 'chocolate' })
        } catch (error) {
          expect(error).to.be.deep.equal({ code: 'any.required', message: '"quantity" is required' });
        }
      });
    });
    describe('Testa a criação de produto', () => {
      before(() => {
        sinon.stub(productsModel, 'create').resolves(itemResultMock.insertId);	
        sinon.stub(productsModel, 'findByName').resolves(undefined);
      });

      after(() => {
        // @ts-ignore
        productsModel.create.restore();
        // @ts-ignore
        productsModel.findByName.restore();
      });

      it('Deve retornar o objeto do produto criado', async () => {
        const result = await productsService.create(itemMocked)
        expect(result).to.deep.equal(itemResponseMocked)
      });
    });
    describe('Testa se a função "listAll" retorna uma lista com os produtos', async() => {
      before(() => {
        sinon.stub(productsModel, 'listAll').resolves(listOfItemsMock);	
      });

      after(() => {
        // @ts-ignore
        productsModel.listAll.restore();
      });

      it('Deve retornar uma lista com os produtos', async() => {
        const result = await productsService.listAll()
        expect(result).to.deep.equal(listOfItemsMock)
      });
    });
    describe('Testa se a função "findById" retorna um produto pelo id procurado', async() => {
      before(() => {
        sinon.stub(productsModel, 'findById').resolves(findByQueryMock);	
      });

      after(() => {
        // @ts-ignore
        productsModel.findById.restore();
      });

      it('Deve retornar o produto procurado', async() => {
        const result = await productsService.findById(1)
        expect(result).to.deep.equal(findByQueryMock)
      });
    });
    describe('Testa se o produto pode ser atualizado', async () => {
      before(() => {
        sinon.stub(productsModel, 'update').resolves(undefined);
        sinon.stub(productsModel, 'findById').resolves(updatedItemMock);
      });

      after(() => {
        // @ts-ignore
        productsModel.update.restore();
        // @ts-ignore
        productsModel.findById.restore();
      });

      it('Deve retornar o produto atualizado', async () => {
        const result = await productsService.update(itemResponseMocked)
        expect(result).to.be.deep.equal(itemResponseMocked)
      });
    });
    describe('Testa se o produto pode ser deletado', async () => {
      before(() => {
        sinon.stub(productsModel, 'deleteById').resolves(undefined);
        sinon.stub(productsModel, 'findById').resolves(updatedItemMock);
      });

      after(() => {
        // @ts-ignore
        productsModel.deleteById.restore();
        // @ts-ignore
        productsModel.findById.restore();
      });

      it('Deve retornar o produto deletado', async () => {
        const result = await productsService.deleteById(1)
        expect(result).to.be.deep.equal(updatedItemMock)
      });
    });
  });
  describe('Testa a "SaleServices"', () => {
    describe('Testa o corretor das informações de sale', () => {
      it('Deve retornar as informações de sale atualizadas', async () => {
        const result = await salesService.salesConverter(saleReqInfoMock)
        expect(result).to.be.deep.equal(saleInfoParsedMock)
      });
    });
    describe('Testa a criação de um id venda', () => {
      before(() => {
        sinon.stub(saleModel, 'newSale').resolves(itemResultMock.insertId);
      });

      after(() => {
        // @ts-ignore
        saleModel.newSale.restore();
      });

      it('Deve criar uma compra atualizado', async () => {
        const result = await salesService.newSaleId()
        expect(result).to.be.equal(itemResultMock.insertId)
      });
    });
    describe('Testa a criação de venda', () => {
      before(() => {
        sinon.stub(saleModel, 'create').resolves(undefined);
      })

      after(() => {
        // @ts-ignore
        saleModel.create.restore();
      })

      it('Deve criar uma compra atualizado', async () => {
        const result = await salesService.create([[1, 2, 3]])
        expect(result).to.be.equal(undefined)
      });
    });
    describe('Testa se as infromações de sale estão corretas', () => {
      before(() => {
        sinon.stub(salesService,'salesConverter').returns(saleInfoParsedMock);
        sinon.stub(saleSchema, 'validate')
          .onFirstCall().resolves(undefined)
          .onSecondCall().resolves(errorMock);
        // @ts-ignore
        sinon.stub(connection, 'query').resolves(undefined);
      })

      after(() => {
        // @ts-ignore
        salesService.salesConverter.restore();
        // @ts-ignore
        saleSchema.validate.restore();
        // @ts-ignore
        connection.query.restore();
      })

      it('Deve retornar undefined, isto é, sem erro atualizado', async () => {
        const result = await salesService.create([[1, 2, 3]])
        expect(result).to.be.equal(undefined)
      });

      // it('Deve retornar erro de validação', async () => {
      //   const result = await salesService.create([[1, 2]])
      //   // @ts-ignore
      //   expect(result).to.Throw({ code: errorMock.details[0].type, message: errorMock.details[0].message })
      // });
    });
    describe('Testa se a função "listAll" retorna uma lista com as vendas', async() => {
      before(() => {
        sinon.stub(saleModel, 'listAll').resolves(listOfItemsMock);	
      });

      after(() => {
        // @ts-ignore
        saleModel.listAll.restore();
      });

      it('Deve retornar uma lista com as vendas', async() => {
        const result = await salesService.listAll()
        expect(result).to.deep.equal(listOfItemsMock)
      });
    });
    describe('Testa se a função "findById" retorna uma venda pelo id procurado', async() => {
      before(() => {
        sinon.stub(saleModel, 'findById')
          .onFirstCall().resolves([findByQueryMockSale])
          .onSecondCall().resolves([]);
      });

      after(() => {
        // @ts-ignore
        saleModel.findById.restore();
      });

      it('Deve retornar a venda procurada', async() => {
        const result = await salesService.findById(1)
        expect(result).to.deep.equal([findByQueryMockSale])
      });

      // it('Deve retornar not found', async() => {
      //   expect(async () => await salesService.findById(2))
      //     .to.throw('Sale not found')
      // });
    });
    describe('Testa se a função "update" retorna uma venda atualizada', async() => {
      before(() => {
        // @ts-ignore
        sinon.stub(connection, 'query').resolves([[findByQueryMockSale]]);
        sinon.stub(salesService, 'findById').resolves([findByQueryMockSale]);
        sinon.stub(salesService, 'salesConverter').resolves(saleInfoParsedMock);
      });

      after(() => {
        // @ts-ignore
        salesService.findById.restore();
        // @ts-ignore
        salesService.salesConverter.restore();
        // @ts-ignore
        connection.query.restore();
      });

      it('Deve retornar a venda atualizada', async() => {
        const result = await salesService.update(saleInfoWIDParsedMock)
        expect(result).to.be.deep.equal(undefined)
      });
    });
    describe('Testa se a função "deleteById" deleta uma venda', async() => {
      before(() => {
        sinon.stub(saleModel, 'deleteById').resolves(undefined);
      });

      after(() => {
        // @ts-ignore
        saleModel.deleteById.restore();
      });

      it('Deve retornar a venda deletada', async() => {
        const result = await salesService.deleteById(1)
        expect(result).to.be.equal(undefined)
      });
    });
  });
  describe('Testa a saleProductsServices', () => {
    describe('Testa se a função "create" cria uma venda', async() => {
    });
  });
});