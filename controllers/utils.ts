// Types
export interface Product {
  id?: number;
  name: string;
  quantity: number;
}

export interface Err {
  code: keyof typeof ERR_CODES;
  message: string;
}

// PATH

// Messages
const PRODUCT_NAME_NOT_FOUND = '"name" is required';
const PRODUCT_NAME_INVALID = '"name" length must be at least 5 characters long'
const PRODUCT_NAME_ALREADY_EXISTS = 'Product already exists';
const PRODUCT_QUANTITY_NOT_FOUND = '"quantity" is required';
const PRODUCT_QUANTITY_INVALID = '"quantity" must be a number larger than or equal to 1'

// HTTP response status codes
const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_OK_NO_CONTENT_STATUS = 204;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_UNAUTHORIZED_STATUS = 401;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_CONFLICT_STATUS = 409;
const HTTP_UNPROCCESSABLE_ENTITY_STATUS = 422;
const HTTP_INTERNAL_SERVER_ERROR_STATUS = 500;

// Errors code
const ERR_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCCESSABLE_ENTITY: 422,
}

// Routes
const PRODUCTS_ROUTE = '/products';

// Port
const PORT = '3000';

// Functions

// Export

export default {
  HTTP_OK_STATUS,
  HTTP_CREATED_STATUS,
  HTTP_OK_NO_CONTENT_STATUS,
  HTTP_BAD_REQUEST_STATUS,
  HTTP_UNAUTHORIZED_STATUS,
  HTTP_NOT_FOUND_STATUS,
  HTTP_CONFLICT_STATUS,
  HTTP_UNPROCCESSABLE_ENTITY_STATUS,
  HTTP_INTERNAL_SERVER_ERROR_STATUS,
  PRODUCTS_ROUTE,
  PORT,
  PRODUCT_NAME_NOT_FOUND,
  PRODUCT_NAME_INVALID,
  PRODUCT_NAME_ALREADY_EXISTS,
  PRODUCT_QUANTITY_NOT_FOUND,
  PRODUCT_QUANTITY_INVALID,
  ERR_CODES,
}