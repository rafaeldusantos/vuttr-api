import { User } from "../interfaces/user.interface";
import userModel from "../config/db/models/user.model";

export const createUser = (data: User) =>
  userModel.create(data);

export const findBy = (item: any) =>
  userModel.findOne({
    ...item
  });