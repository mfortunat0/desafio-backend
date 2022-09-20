import "dotenv/config";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { AppError } from "./Errors/AppError";
import { route } from "./routes";

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(route);
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      response.status(error.statusCode).json({
        message: error.message,
      });
    } else {
      response.status(500).json({
        error: error.message,
      });
    }
  }
);

app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));
