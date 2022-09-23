import { Request, Response } from "express";
import { AppError } from "../../Errors/AppError";
import { CreateUserService } from "./CreateUserService";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, birthday: strBirthday } = request.body;

    if (!new Date(strBirthday).getDate()) {
      throw new AppError(
        "Birthday is not valid, please use this format yyyy/mm/dd",
        400
      );
    }

    if (name.length < 1 || email.length < 1 || password.length < 1) {
      throw new AppError("Fields not filled in correctly", 400);
    }

    const birthday = new Date(strBirthday);
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      name,
      email,
      password,
      birthday,
    });
    return response.status(201).json({ user });
  }
}
