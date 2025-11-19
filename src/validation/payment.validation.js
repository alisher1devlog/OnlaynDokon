import Joi from "joi";

const PaymentValidation = {
  CreatePayment: Joi.object({
    order_id: Joi.string().uuid().required(),
    amount: Joi.number().positive().required(),
    method: Joi.string()
      .valid("credit_card", "paypal", "bank_transfer")
      .required(),
    transaction_id: Joi.string().max(100).required(),
  }),
};
export { PaymentValidation };
