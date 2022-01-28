import joi from 'joi';
import utils from '../controllers/utils';

export const productSchema = joi.object().keys({
  name: joi.string().min(5).required().messages({
    'string.base': "name must be a string",
    'string.min': utils.PRODUCT_NAME_INVALID,
    'any.required': utils.PRODUCT_NAME_NOT_FOUND,
  }),
  quantity: joi.number().integer().min(1).required().messages({
    'number.min': utils.PRODUCT_QUANTITY_INVALID,
    'number.base': utils.PRODUCT_QUANTITY_INVALID,
    'any.required': utils.PRODUCT_QUANTITY_NOT_FOUND,
  }),
});
