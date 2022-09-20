import { Request, Response } from "express";
import { DeleteUserService } from "./DeleteUserService";

export class DeleteOneUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const deleteUserService = new DeleteUserService();
    await deleteUserService.execute(id);
    return response.status(204).json();
  }
}
