import { Router } from "express";
import AuthController from "./auth.controller";
import { handleInputErrors } from "../../middlewares/inputValidationMiddleware";
import { signInValidation, signUpValidation, updatePasswordValidation, forgotPasswordValidation, resetPasswordValidation } from "../../routesValidations/index";

const router = Router();
const authController = new AuthController();

router.post("/signin", signInValidation, handleInputErrors, authController.signIn);

router.post("/signup", signUpValidation, handleInputErrors, authController.signUp);

router.post("/signout", authController.signOut);

router.post("/forgotPassword", forgotPasswordValidation, handleInputErrors, authController.forgotPassword);

router.post("/resetPassword/:token", resetPasswordValidation, handleInputErrors, authController.resetPassword);

router.patch("/updatePassword", updatePasswordValidation, handleInputErrors, authController.updatePassword);

export { router as authRoutes };
