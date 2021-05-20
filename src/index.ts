import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";

import {
  errorMiddleware,
  notFoundMiddleware,
} from "./middlewares/error.middleware";
import connect from "./config/db/connect";
import { CONFIG } from "./config";
import routes from "./routes";
import * as swaggerDocument from "../swagger.json";

(async () => {
  const app = express();
  connect(process.env.DB_HOST);

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
})();
