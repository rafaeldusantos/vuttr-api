import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/ErrorHandler";

export const getTools = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({ message: "Tools OK" });
  } catch (error) {
    return next(errorHandler("getTransactions", error));
  }
};