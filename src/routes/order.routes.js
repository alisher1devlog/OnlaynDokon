import { Router } from "express";
import OrderController from "../controllers/order.controller.js";
import { authGuard } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";
import { OrderValidation } from "../validation/order.validation.js";
import { roleGuard } from "../middlewares/role.middleware.js";

const router = Router();

router.use(authGuard);

router.post(
  "/",
  validate(OrderValidation.CreateOrder),
  OrderController.createOrder,
);

router.get("/my-orders", OrderController.getMyOrders);
router.get("/:id", OrderController.getById);

router.patch(
  "/:id/status",
  authGuard,
  roleGuard("admin", "seller"),
  validate(OrderValidation.UpdateOrderStatus),
  OrderController.updateStatus,
);

export default router;
