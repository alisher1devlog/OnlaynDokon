import { Router } from "express";
import CategoryController from "../controllers/category.controller.js";
import { authGuard } from "../middlewares/auth.middleware.js";
import { roleGuard } from "../middlewares/role.middleware.js";
import validate from "../middlewares/validation.middleware.js";
import CategoryValidation from "../validation/category.validation.js";

const router = Router();

router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);
router.post(
  "/",
  authGuard,
  roleGuard("admin"),
  validate(CategoryValidation.createCategory),
  CategoryController.createCategory,
);
router.patch(
  "/:id",
  authGuard,
  roleGuard("admin"),
  validate(CategoryValidation.updateCategory),
  CategoryController.updateCategory,
);
router.delete(
  "/:id",
  authGuard,
  roleGuard("admin"),
  CategoryController.deleteCategory,
);

export default router;
