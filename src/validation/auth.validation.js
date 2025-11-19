import Joi from "joi";

const AuthValidation = {
  signup: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phoneNumber: Joi.string().length(13).optional(),
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
  updateProfile: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).optional(),
    phone_number: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .optional(),
    address: Joi.string().max(500).optional(),
  }),
};
export default AuthValidation;
