import bodyParser from "body-parser";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";

import { AuthOptions } from "express-oauth2-jwt-bearer";
import { UserController } from "./controllers/user.controller";
import { Clients } from "./interfaces/Clients";
import { errorHandler } from "./middleware/errorHandler";
import { createDeviceRoute } from "./routes/device.route";
import { createWebhook } from "./routes/webhook.route";
import { UserService } from "./services/user.service";

const logger = morgan("combined");

export const visibilityTimeout = 120_000;
export const waitForTransactionTimeout = 10_000;

const ORIGIN_WEB_SDK = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://fireblocks.github.io",
];

function createApp(
  authOpts: AuthOptions,
  clients: Clients,
  webhookPublicKey: string,
) {
  const deviceRoute = createDeviceRoute(clients);
  const webhookRoute = createWebhook(clients, webhookPublicKey);
  const userContoller = new UserController(new UserService());

  const app: Express = express();

  app.use(logger);

  app.use(cors({ origin: ORIGIN_WEB_SDK }));
  app.use(bodyParser.json({ limit: "50mb" }));

  app.get("/", (req: Request, res: Response) => res.send("OK"));

  app.post("/api/login", userContoller.login.bind(userContoller));
  app.use("/api/devices", deviceRoute);
  app.use("/api/webhook", webhookRoute);

  app.use(errorHandler);

  return app;
}

export { createApp };
