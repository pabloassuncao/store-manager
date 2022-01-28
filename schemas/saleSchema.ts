import joi from 'joi';
import utils from '../controllers/utils';

export const saleSchema = joi.object().keys({
  productId: joi.number().integer().min(1).required().messages({
    'number.base': utils.SALE_PRODUCT_ID_INVALID,
    'any.required': utils.SALE_PRODUCT_ID_NOT_FOUND,
  }),
  quantity: joi.number().integer().min(1).required().messages({
    'number.min': utils.PRODUCT_QUANTITY_INVALID,
    'number.base': utils.PRODUCT_QUANTITY_INVALID,
    'any.required': utils.PRODUCT_QUANTITY_NOT_FOUND,
  }),
});
