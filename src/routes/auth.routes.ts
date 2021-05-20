import express from "express";
import { authMiddleware } from "../middlewares/authenticate.middleware";
import { 
  registration,
  logIn,
  logOut
} from "../controllers/authController";

const authRoutes = express.Router();

authRoutes.post("/login", logIn);
authRoutes.post("/registration", authMiddleware, registration);
authRoutes.post("/login", authMiddleware, logOut);

export default authRoutes;
