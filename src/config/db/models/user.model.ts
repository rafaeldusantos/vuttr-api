import database from "mongoose";
import { IUser } from "../../../interfaces/user.interface";

const stringRequired = { type: String, require: true };

const schema = new database.Schema({
  name: stringRequired,
  email: stringRequired,
  password: stringRequired,
});

export default database.model<IUser>("User", schema);
