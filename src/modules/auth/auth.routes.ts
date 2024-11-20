import { Router } from "express";
import AuthController from "./auth.controller";

const router = Router();
const authController = new AuthController();


router.post("/signin", authController.signIn);

export { router as authRoutes };
