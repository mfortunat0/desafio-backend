import { Request, Response } from "express";
import { CreateUserService } from "./CreateUserService";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, birthday: strBirthday } = request.body;
    const birthday = new Date(strBirthday);
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ name, email, birthday });
    return response.status(201).json(user);
  }
}
