import Joi from "joi";

const CategoryValidation = {
  createCategory: Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().max(500).optional(),
  }),

  updateCategory: Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    description: Joi.string().max(500).optional(),
  }),
};

export default CategoryValidation;
