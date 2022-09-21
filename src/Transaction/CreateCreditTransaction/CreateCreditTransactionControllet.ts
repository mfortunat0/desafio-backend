import { TranscationType } from "@prisma/client";
import { Request, Response } from "express";
import { CreateCreditTransactionService } from "./CreateCreditTransactionService";

export class CreateCreditTransactionController {
  async handle(request: Request, response: Response) {
    const { value } = request.body;
    const { id: userId } = request.params;
    const type = TranscationType.CREDITO;
    const createCreditTransactionService = new CreateCreditTransactionService();
    const transaction = await createCreditTransactionService.execute({
      value,
      userId,
      type,
    });
    return response.status(201).json({ transaction });
  }
}
