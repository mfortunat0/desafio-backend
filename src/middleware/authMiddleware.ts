import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../Errors/AppError";

const ensureAuthenticate = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError("Not authorized", 401);
  }

  const payload = verify(token, process.env.SECRET + "");

  if (!payload) {
    throw new AppError("Not authorized", 401);
  }

  response.locals.userId = payload.sub;
  next();
};

export { ensureAuthenticate };
