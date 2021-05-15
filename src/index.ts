import cors from "cors";
import express from "express";
import {
  errorMiddleware,
  notFoundMiddleware,
} from "./middlewares/error.middleware";
import connect from './config/db/connect';

import { CONFIG } from "./config";
import routes from "./routes";

(async () => {

  const app = express();
  connect(process.env.DB_HOST);

  console.log(connect(process.env.DB_HOST))
  app.get(`/${CONFIG.apiVersion}/healths`, (_, res) =>
    res.send({
      status: "UP",
      version: CONFIG.apiVersion,
    })
  );

  app.use(
    cors(),
    express.json()
  );

  app.use(`/${CONFIG.apiVersion}`, routes);
  app.use(errorMiddleware);
  app.all("*", notFoundMiddleware);

  app.listen(CONFIG.serverPort, () => {
    console.info(`Server running on port ${CONFIG.serverPort}`);
  });
})();
