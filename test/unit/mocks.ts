import { ErrorReport } from "joi";
import { OkPacket, ResultSetHeader } from "mysql2";
import { Product, Sale, SaleReqInfo } from "../../controllers/utils";

// @ts-ignore
export const itemMocked: Product = {
  name: 'chocolate',
  quantity: 10
}

export const newSaleResponseMock = {
  id: 1,
  itemsSold: [{
    product_id: 1,
    quantity: 5
  }],
}

export const saleListMock =  [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "product_id": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "product_id": 2,
    "quantity": 2
  }
]

// @ts-ignore
export const itemResponseMocked: Product = {
  id: 1,
  name: 'chocolate',
  quantity: 10
}

//@ts-ignore
export const itemResultMock: ResultSetHeader = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 1,
  info: '',
  warningStatus: 0,
  serverStatus: 2,
  changedRows: 0
}

export const listOfItemsMock = [
  {
    id: 1,
    name: 'chocolate',
    quantity: 10
  },
  {
    id: 2,
    name: 'pizza',
    quantity: 15
  }
]

export const findByQueryMock = { id: 1, name: 'chocolate', quantity: 10 }

// @ts-ignore
export const updatedItemMock: Product = { id: 1, name: 'banana', quantity: 15 }

export const saleInfoMock: SaleReqInfo = {
  product_id: 1,
  quantity: 5
}

export const newSaleMock: number[][] = [[1, 3, 54], [1, 2, 12]]

export const findByQueryMockSale = {
  date: '00-00-0000', 
  product_id: 1, 
  quantity: 5,
}

export const saleReqInfoMock: SaleReqInfo[] = [{
  product_id: 1,
  quantity: 5
}]

export const saleInfoParsedMock: Sale[] = [{
  productId: 1,
  quantity: 5
}]

export const saleInfoWIDParsedMock: Sale[] = [{
  saleId: 1,
  productId: 1,
  quantity: 5
}]

export const idAndProduct = [[12]]

export const updateSaleMock = [[1, 1]]

export const errorMock = {
  message: 'any.required',
  details: [{
    message: '"quantity" is required',
    path: ['quantity'],
    type: 'any.required',
    context: { label: 'quantity', key: 'quantity', value: undefined }
  }]
}