import usersController from "@modules/user-auth/user-auth.controller";
import { Router } from "express";

const router = Router();

router.post("/register", usersController.registerUser);
router.post("/login", usersController.login);
router.post("/verify-otp", usersController.verifyOTP);

export default router;
