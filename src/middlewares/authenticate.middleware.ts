import jwt, { Secret, VerifyErrors } from "jsonwebtoken";
import httpStatus from "http-status";

import { NextFunction, Request, Response } from "express";
import HttpException from "../utils/HttpException";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(httpStatus.FORBIDDEN)
      .send(new HttpException(httpStatus.FORBIDDEN, 'No token provided.'));
  }
  // jwt.verify(String(token), process.env.SECRET, (err: VerifyErrors, decoded: Secret) => {
  //   if (err) {
  //     return res.status(httpStatus.UNAUTHORIZED)
  //       .json(new HttpException(httpStatus.UNAUTHORIZED, err));
  //   }
  //   //res.decoded = decoded;
  //   return next();
  // });
};
