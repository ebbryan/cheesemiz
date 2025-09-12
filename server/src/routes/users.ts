import usersController from "@modules/users/users.controller";
import { Router } from "express";

const router = Router();

router.post("/register", usersController.registerUser);
// router.post("/login", UsersController.login);
// router.post("/verify-otp", UsersController.verifyOTP);

export default router;
