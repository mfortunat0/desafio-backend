import { TranscationType } from "@prisma/client";
import { Request, Response } from "express";
import { CreateDebitTransactionService } from "./CreateDebitTransactionService";

export class CreateDebitTransactionController {
  async handle(request: Request, response: Response) {
    const { value } = request.body;
    const { id: userId } = request.params;
    const type = TranscationType.DEBITO;
    const createDebitTransactionService = new CreateDebitTransactionService();
    const transaction = await createDebitTransactionService.execute({
      value,
      userId,
      type,
    });
    return response.status(201).json({ transaction });
  }
}
