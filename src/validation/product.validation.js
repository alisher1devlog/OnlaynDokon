import Joi from "joi";
// currency
const ProductValidation = {
  createProduct: Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(1000).optional(),
    category_id: Joi.string().uuid().required(),
    price: Joi.number().positive().required(),
    currency: Joi.string().valid("UZS", "USD", "EUR").default("UZS").optional(),
    stock_quantity: Joi.number().integer().min(0).required(),
    imge_url: Joi.string().uri().optional(),
  }),
  updateProduct: Joi.object({
    name: Joi.string().min(3).max(100).optional(),
    description: Joi.string().max(1000).optional(),
    category_id: Joi.string().uuid().optional(),
    price: Joi.number().positive().optional(),
    currency: Joi.string().valid("UZS", "USD", "EUR").optional(),
    stock_quantity: Joi.number().integer().min(0).optional(),
    imge_url: Joi.string().uri().optional(),
  }),
};

export default ProductValidation;
