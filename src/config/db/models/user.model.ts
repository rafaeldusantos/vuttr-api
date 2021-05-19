import database from "mongoose";

const stringRequired = { type: String, require: true };

const schema = new database.Schema({
  name: stringRequired,
  email: stringRequired,
  password: stringRequired,
});

export default database.model("User", schema);
