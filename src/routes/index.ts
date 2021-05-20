import express from "express";
import { authMiddleware } from "../middlewares/authenticate.middleware";
import authRoutes from "./auth.routes";
import toolsRoutes from "./tools.routes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/tools", authMiddleware, toolsRoutes);

export default router;
