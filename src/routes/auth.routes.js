import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import validate from "../middlewares/validation.middleware.js";
import AuthValidation from "../validation/auth.validation.js";
import { authGuard } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", validate(AuthValidation.signup), AuthController.signup);

router.post("/signin", AuthController.signin);

router.post(
  "/verify-otp",
  validate(AuthValidation.verifyOtp),
  AuthController.verifyOtp,
);

router.get("/profile", authGuard, AuthController.getProfiles);

router.post("/logout", authGuard, AuthController.logOut);

router.patch(
  "/profile",
  authGuard,
  validate(AuthValidation.updateProfile),
  AuthController.updateProfile,
);

router.post("/refresh-token", AuthController.refreshToken);

export default router;
