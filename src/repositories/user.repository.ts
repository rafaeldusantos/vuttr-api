import { FilterUser, IUser } from "../interfaces/user.interface";
import userModel from "../config/db/models/user.model";
import { Types } from "mongoose";

export const createUser = (data: IUser) => userModel.create(data);

export const findUser = (filters: FilterUser) =>
  userModel.findOne(
    {
      ...filters,
    },
    { __v: 0 }
  );

export const findUserById = (id: string) => userModel.findById(id);
