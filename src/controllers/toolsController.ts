import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import Joi from "joi";
import { errorHandler } from "../utils/ErrorHandler";
import HttpException from "../utils/HttpException";
import validatePayload from "../utils/ValidatePayload";
import {
  createTools,
  findById,
  listTools,
  removeById,
} from "../repositories/tools.repository";
import {
  IPostToolsRequest,
  IToolsRequestQuery,
} from "../interfaces/tools.interface";
import { NEW_ENTRY_ERRORS } from "../enums";
import { Types } from "mongoose";

const schemaPostToolsRequest = Joi.object({
  title: Joi.string().required(),
  link: Joi.string().uri().required(),
  description: Joi.string(),
  tags: Joi.array().items(Joi.string()).required(),
});

export const getTools = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filter: IToolsRequestQuery = req.query;
    const result = await listTools(filter);

    res.status(httpStatus.OK).json(result);
  } catch (error) {
    return next(errorHandler("getTransactions", error));
  }
};

export const postTools = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bodyReq: IPostToolsRequest = req.body;

  try {
    const errorValidate = validatePayload(bodyReq, schemaPostToolsRequest);
    if (errorValidate) {
      throw new HttpException(
        httpStatus.UNPROCESSABLE_ENTITY,
        errorValidate.details[0].message
      );
    }

    const data = await createTools(bodyReq);

    res.status(httpStatus.CREATED).json(data);
  } catch (error) {
    return next(errorHandler("getTransactions", error));
  }
};

export const deleteTools = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException(
        httpStatus.UNPROCESSABLE_ENTITY,
        NEW_ENTRY_ERRORS.ID_NOT_VALID
      );
    }

    const objId = Types.ObjectId(id);
    const tool = await findById(objId);

    if (!tool) {
      throw new HttpException(
        httpStatus.UNPROCESSABLE_ENTITY,
        NEW_ENTRY_ERRORS.TOOL_NOT_FOUND
      );
    }

    await removeById(objId);

    res.status(httpStatus.NO_CONTENT).json();
  } catch (error) {
    console.log(error);
    return next(errorHandler("deleteTools", error));
  }
};
