import { NextFunction, Request, Response } from "express";
import { AppError } from "../Errors/AppError";
import { UserRepository } from "../Repository/UserRepository";

const ensureAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { userId } = response.locals;
  const userRepository = new UserRepository();
  const user = await userRepository.findOneById(userId);
  if (!user.admin) {
    throw new AppError("Is not a admin", 403);
  }
  next();
};

export { ensureAdmin };
