import database from "mongoose";
import { Mockgoose } from "mockgoose";

const { setHealthUp, setHealthDown, MONGO_DB } = require("apx-health");
setHealthDown(MONGO_DB, "Waiting for the client to connect.");
database.connection.on("connected", () => setHealthUp(MONGO_DB, "Connected"));
database.connection.on("disconnected", () =>
  setHealthDown(MONGO_DB, "Disconnected")
);

const options = {
  bufferCommands: true,
  poolSize: 2,
  promiseLibrary: Promise,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

database.set("debug", process.env.NODE_ENV === "Development");
database.set("useFindAndModify", false);
database.set("useCreateIndex", true);

export const connect = async () => {
  if (process.env.NODE_ENV === "Test") {
    const mockgoose = new Mockgoose(database);
    await mockgoose
      .prepareStorage()
      .then(() => database.connect(process.env.DB_HOST, options))   
  } else {
    return database.connect(process.env.DB_HOST, options)
  }
}


export const close = () => database
  .disconnect();