import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";

// Define the type for the middleware function
const globalMiddlewares = (app: Express): void => {
  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: "64mb" }));

  app.use(cookieParser());
  app.use(morgan("dev"));
  app.use(ExpressMongoSanitize());
};

export default globalMiddlewares;
