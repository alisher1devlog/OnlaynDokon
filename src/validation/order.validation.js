import Joi from "joi";

const OrderValidation = {
  CreateOrder: Joi.object({
    shippingAddress: Joi.string().min(5).max(255).required(),
    items: Joi.array()
      .items(
        Joi.object({
          product_id: Joi.string().uuid().required(),
          quantity: Joi.number().integer().min(1).required(),
        }),
      )
      .min(1)
      .required(),
  }),

  UpdateOrderStatus: Joi.object({
    status: Joi.string()
      .valid("pending", "shipped", "delivered", "canceled")
      .required(),
  }),
};
export { OrderValidation };
