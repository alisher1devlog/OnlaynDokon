import Joi from "joi";

const AuthValidation = {
  signup: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("customer", "seller").optional(),
  }),
  verifyOtp: Joi.object({
    email: Joi.string().email().required(),
    otp_code: Joi.string().length(6).required(),
  }),
  signin: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export default AuthValidation;
