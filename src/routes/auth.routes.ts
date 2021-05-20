import express from "express";
//import { authMiddleware } from "../middlewares/authenticate.middleware";
import { registration } from "../controllers/authController";

const authRoutes = express.Router();

authRoutes.post("/registration", registration);

export default authRoutes;
