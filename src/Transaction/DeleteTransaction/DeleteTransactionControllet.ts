import { Request, Response } from "express";
import { DeleteTransactionService } from "./DeleteTransactionService";

export class DeleteTransactionController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const deleteTransactionService = new DeleteTransactionService();
    await deleteTransactionService.execute({ id });
    return response.status(204).json();
  }
}
