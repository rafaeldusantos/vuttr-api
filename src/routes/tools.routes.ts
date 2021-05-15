import express from "express";
import { getTools } from "../controllers/toolsController";

const toolsRoutes = express.Router();

toolsRoutes.get("/", getTools);

export default toolsRoutes;