import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
const { setHealthDown, MONGO_DB } = require("apx-health");
import {
  errorMiddleware,
  notFoundMiddleware,
} from "./middlewares/error.middleware";
import { connect } from "./config/db/connect";
import { CONFIG } from "./config";
import routes from "./routes";
import swaggerDocument from "../swagger.json";


const app = express();

if (CONFIG.isLocalDev) {
  swaggerDocument.servers = [{url: `http://localhost:${CONFIG.serverPort}`}]
}

connect()
  .then(() => console.info("Database Connected"))
  .catch(() => setHealthDown(MONGO_DB, "Database connection failed"));;

app.get("/healths", (_, res) =>
  res.send({
    status: "UP",
    version: CONFIG.apiVersion,
  })
);

app.use(
  cors(),
  express.json(),
  cookieParser(),
  routes
);

app.use(routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorMiddleware);
app.all("*", notFoundMiddleware);

app.listen(CONFIG.serverPort, () => {
  console.info(`Server running on port ${CONFIG.serverPort}`);
});

export default app;