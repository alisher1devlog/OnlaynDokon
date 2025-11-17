import { Router } from "express";
import ProductController from "../controllers/product.controller.js";
import { authGuard } from "../middlewares/auth.middleware.js";
import { roleGuard } from "../middlewares/role.middleware.js";
import validate from "../middlewares/validation.middleware.js";
import ProductValidation from "../validation/product.validation.js";

const router = Router();

router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.post(
  "/",
  authGuard,
  roleGuard("admin", "seller"),
  validate(ProductValidation.createProduct),
  ProductController.createProduct,
);
router.patch(
  "/:id",
  authGuard,
  roleGuard("admin", "seller"),
  validate(ProductValidation.updateProduct),
  ProductController.updateProduct,
);
router.delete(
  "/:id",
  authGuard,
  roleGuard("admin", "seller"),
  ProductController.deleteProduct,
);

export default router;
