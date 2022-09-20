import { Request, Response } from "express";
import { FindAllUserService } from "./FindAllUserService";

export class FindAllUserController {
  async handle(request: Request, response: Response) {
    const findAllUserService = new FindAllUserService();
    const users = await findAllUserService.execute();
    return response.json(users);
  }
}
