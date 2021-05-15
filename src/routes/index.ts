import express from "express";
import toolsRoutes from "./tools.routes";

const router = express.Router();

router.use(
  "/tools",
  toolsRoutes
);

export default router;