import { TranscationType } from "@prisma/client";
import { Request, Response } from "express";
import { AppError } from "../../Errors/AppError";
import { CreateDebitTransactionService } from "./CreateDebitTransactionService";

export class CreateDebitTransactionController {
  async handle(request: Request, response: Response) {
    const { value } = request.body;
    const { id: userId } = request.params;

    if (isNaN(Number(value)) || Number(value) <= 0) {
      throw new AppError("Value is not valid", 400);
    }

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
