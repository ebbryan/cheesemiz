import { Router } from "express";
import authRoutes from "@routes/user-auth.route";

const router = Router();

router.use("/user-auth", authRoutes);

export default router;
