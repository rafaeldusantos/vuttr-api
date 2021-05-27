import httpStatus from "http-status";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { createUser, findUser } from "../repositories/user.repository";
import { Ilogin, ITokenData, IUser } from "../interfaces/user.interface";
import { NEW_ENTRY_ERRORS } from "../enums";
import HttpException from "../utils/HttpException";
import { errorHandler } from "../utils/ErrorHandler";

const expiresIn = 60 * 60;
const createCookie = (tokenData: ITokenData) =>
  `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;

const createToken = (user: IUser): ITokenData => ({
  expiresIn,
  token: jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn }
  ),
});

export const registration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bodyReq: IUser = req.body;

  try {
    if (await findUser({ email: bodyReq.email })) {
      throw new HttpException(
        httpStatus.UNPROCESSABLE_ENTITY,
        NEW_ENTRY_ERRORS.EMAIL_ALREADY_REGISTERED
      );
    }

    const hashedPassword = await bcrypt.hash(bodyReq.password, 10);
    const user = await createUser({
      ...bodyReq,
      password: hashedPassword,
    });
    user.password = undefined;

    const tokenData = createToken(user);
    res.setHeader("Set-Cookie", [createCookie(tokenData)]);
    res.status(httpStatus.CREATED).json(user);
  } catch (error) {
    return next(errorHandler("register", error));
  }
};

export const logIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logInData: Ilogin = req.body;
  try {
    const user = await findUser({ email: logInData.email });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        logInData.password,
        user.password
      );
      if (isPasswordMatching) {
        user.password = undefined;

        const tokenData = createToken(user);
        res.setHeader("Set-Cookie", [createCookie(tokenData)]);
        res.status(httpStatus.OK).json(user);
      } else {
        throw new HttpException(
          httpStatus.BAD_REQUEST,
          NEW_ENTRY_ERRORS.USER_EMAIL_NOT_FOUND
        );
      }
    } else {
      throw new HttpException(
        httpStatus.BAD_REQUEST,
        NEW_ENTRY_ERRORS.USER_EMAIL_NOT_FOUND
      );
    }
  } catch (error) {
    return next(errorHandler("logIn", error));
  }
};

export const logOut = (_: Request, res: Response) => {
  res.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
  res.send(httpStatus.NO_CONTENT);
}