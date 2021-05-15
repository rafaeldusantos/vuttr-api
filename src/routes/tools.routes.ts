import express from "express";
import {
  getTools,
  postTools,
  deleteTools,
} from "../controllers/toolsController";

const toolsRoutes = express.Router();

toolsRoutes.get("/", getTools);
toolsRoutes.post("/", postTools);
toolsRoutes.delete("/:id", deleteTools);

export default toolsRoutes;
