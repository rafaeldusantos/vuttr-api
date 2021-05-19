import httpStatus from "http-status";
import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from "express";
import { createUser, findBy } from "../repositories/user.repository";
import { User } from "../interfaces/user.interface";
import { NEW_ENTRY_ERRORS } from "../enums";
import HttpException from "../utils/HttpException";
import { errorHandler } from "../utils/ErrorHandler";

export const registration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bodyReq: User = req.body;

  try {
    if (await findBy({ email: bodyReq.email })) {
      throw new HttpException(
        httpStatus.UNPROCESSABLE_ENTITY,
        NEW_ENTRY_ERRORS.EMAIL_ALREADY_REGISTERED
      );
    }

    const hashedPassword = await bcrypt.hash(bodyReq.password, 10);
    const result = await createUser({
      ...bodyReq,
      password: hashedPassword,
    });
    
    delete bodyReq.password;

    res.status(httpStatus.OK).json(result);
  } catch (error) {
    return next(errorHandler("register", error));
  }
};