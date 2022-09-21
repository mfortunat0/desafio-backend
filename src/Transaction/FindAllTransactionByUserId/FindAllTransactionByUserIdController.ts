import { Request, Response } from "express";
import { FindAllTransactionByUserIdService } from "./FindAllTransactionByUserIdService";

export class FindAllTransactionByUserIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const findAllTransactionByUserIdService =
      new FindAllTransactionByUserIdService();
    const transactions = await findAllTransactionByUserIdService.execute(id);
    return response.json({ transactions });
  }
}
