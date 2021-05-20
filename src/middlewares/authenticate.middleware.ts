import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import { IDataStoredId } from "../interfaces/user.interface";
import { IRequestWithUser } from "../interfaces/requestWithUser.interface";
import { findUserById } from "../repositories/user.repository";
import { NEW_ENTRY_ERRORS } from "../enums";
import HttpException from "../utils/HttpException";
import { errorHandler } from "../utils/ErrorHandler";

export async function authMiddleware(
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) {
  const cookies = req.cookies;
  const identifier = "authMiddleware";
  if (cookies && cookies.Authorization) {
    const secret = process.env.JWT_SECRET;
    try {
      const verificationResponse = jwt.verify(
        cookies.Authorization,
        secret
      ) as IDataStoredId;
      const id = verificationResponse._id;
      const user = await findUserById(id);
      if (user) {
        req.user = user;
        next();
      } else {
        next(
          errorHandler(
            identifier,
            new HttpException(
              httpStatus.UNAUTHORIZED,
              NEW_ENTRY_ERRORS.UNAUTHORIZED
            )
          )
        );
      }
    } catch (error) {
      next(
        errorHandler(
          identifier,
          new HttpException(
            httpStatus.UNAUTHORIZED,
            NEW_ENTRY_ERRORS.UNAUTHORIZED
          )
        )
      );
    }
  } else {
    next(
      errorHandler(
        identifier,
        new HttpException(
          httpStatus.FORBIDDEN,
          NEW_ENTRY_ERRORS.TOKEN_NO_PROVIDER
        )
      )
    );
  }
}
