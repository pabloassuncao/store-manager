import connection from '../../controllers/connection';
import sinon from 'sinon';
import { expect } from 'chai';
import 'mocha';

import productsModel from '../../models/productsModel'
import { findByQueryMock, findByQueryMockSale, idAndProduct, itemMocked, itemResultMock, listOfItemsMock, newSaleMock, updatedItemMock, updateSaleMock } from './mocks';
import saleModel from '../../models/saleModel';

describe('Testa a camada models', () => {
  describe('Testa a "ProductsModels"', () => {
    afterEach(() => {
      // @ts-ignore
      connection.query.restore()
    });

    describe('Testa a criação de um produto', () => {
      before(() => {
        // @ts-ignore
        sinon.stub(connection, 'query').resolves([itemResultMock]);	
      });

      it('Deve retornar o id do produto adicionado', async () => {
        const result = await productsModel.create(itemMocked)
        expect(result).to.be.equal(itemResultMock.insertId)
      });
    })
    describe('Testa se a função "listAll" retorna uma lista com os produtos', async() => {
      before(() => {
        // @ts-ignore
        sinon.stub(connection, 'query').resolves([listOfItemsMock]);	
      });

      it('Deve retornar uma lista com os produtos', async() => {
        const result = await productsModel.listAll()
        expect(result).to.be.equal(listOfItemsMock)
      });
    })
    describe('Testa se a função "findByName" retorna um produto pelo nome procurado', async() => {
      before(() => {
        // @ts-ignore
        sinon.stub(connection, 'query').resolves([[findByQueryMock]]);	
      });

      it('Deve retornar o produto procurado', async() => {
        const result = await productsModel.findByName('Produto 1')
        expect(result).to.be.equal(findByQueryMock)
      });
    })
    describe('Testa se a função "findById" retorna um produto pelo id procurado', async() => {
      before(() => {
        // @ts-ignore
        sinon.stub(connection, 'query').resolves([[findByQueryMock]]);	
      });

      it('Deve retornar o produto procurado', async() => {
        const result = await productsModel.findById(1)
        expect(result).to.be.equal(findByQueryMock)
      });
    })
    describe('Testa se a função "update" atualiza um produto', async() => {
      before(() => {
        // @ts-ignore
        sinon.stub(connection, 'query').resolves([updatedItemMock]);	
      });

      it('Deve atualizar o produto', async() => {
        const result = await productsModel.update(updatedItemMock)
        expect(result).to.be.equal(updatedItemMock)
      });
    })
    describe('Testa se a função "deleteById" deleta um produto', async() => {
      before(() => {
        // @ts-ignore
        sinon.stub(connection, 'query').resolves([itemResultMock]);	
      });

      it('Deve deletar o produto', async() => {
        const result = await productsModel.deleteById(1)
        expect(result).to.be.equal(undefined)
      });
    })
  });
  describe('Testa a salesModels',() => {
    afterEach(() => {
      // @ts-ignore
      connection.query.restore()
    });

    describe('Testa a criação de um id de venda', () => {
      before(() => {
        // @ts-ignore
        sinon.stub(connection, 'query').resolves([itemResultMock]);	
      });

      it('Deve retornar o id da venda adicionada', async () => {
        const result = await saleModel.newSale()
        expect(result).to.be.equal(1)
      });
    })
    describe('Testa a criação de uma venda', () => {
      before(() => {
        // @ts-ignore
        sinon.stub(connection, 'query').resolves([itemResultMock]);	
      });

      it('Deve retornar o "undefined" da venda adicionada', async () => {
        const result = await saleModel.create(newSaleMock)
        expect(result).to.be.equal(undefined)
      });
    })
    describe('Testa se a função "listAll" retorna uma lista com as vendas', async() => {
      before(() => {
        // @ts-ignore
        sinon.stub(connection, 'query').resolves([listOfItemsMock]);	
      });

      it('Deve retornar uma lista com as vendas', async() => {
        const result = await saleModel.listAll()
        expect(result).to.be.equal(listOfItemsMock)
      });
    })
    describe('Testa se a função "findById" retorna uma venda pelo id procurado', async() => {
      before(() => {
        // @ts-ignore
        sinon.stub(connection, 'query').resolves([[findByQueryMockSale]]);	
      });

      it('Deve retornar a venda procurada', async() => {
        const result = await saleModel.findById(1)
        expect(result[0]).to.deep.equal(findByQueryMockSale)
      });
    })
    describe('Testa se a função update atualiza a venda', async() => {
      before(() => {
        // @ts-ignore
        sinon.stub(connection, 'query').resolves([itemResultMock]);	
      });

      it('Deve atualizar a venda', async() => {
        const result = await saleModel.update([1,2,3])
        expect(result).to.be.equal(undefined)
      }); 
    })
    describe('Testa se a função "deleteById" deleta uma venda', async() => {
      before(() => {
        // @ts-ignore
        sinon.stub(connection, 'query').resolves([itemResultMock]);	
      });

      it('Deve deletar a venda', async() => {
        const result = await saleModel.deleteById(1)
        expect(result).to.be.equal(undefined)
      });
    })
  })
})