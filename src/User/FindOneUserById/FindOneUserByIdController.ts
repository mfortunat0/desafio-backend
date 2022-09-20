import { Request, Response } from "express";
import { FindOneUserByIdService } from "./FindOneUserByIdService";

export class FindOneUserByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const findOneUserByIdService = new FindOneUserByIdService();
    const user = await findOneUserByIdService.execute(id);
    return response.json(user);
  }
}
