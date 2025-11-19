import { Router } from "express";
import PaymentController from "../controllers/payment.controller.js";
import { authGuard } from "../middlewares/auth.middleware.js";
import { roleGuard } from "../middlewares/role.middleware.js";
import validate from "../middlewares/validation.middleware.js";
import { PaymentValidation } from "../validation/payment.validation.js";

const router = Router();

router.post(
  "/process",
  authGuard,
  validate(PaymentValidation.CreatePayment),
  PaymentController.processPayment,
);
router.get(
  "/history",
  authGuard,
  roleGuard("admin"),
  PaymentController.getAllPayments,
);
export default router;
