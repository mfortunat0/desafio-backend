import { TranscationType } from "@prisma/client";
import { Request, Response } from "express";
import { AppError } from "../../Errors/AppError";
import { CreateCreditTransactionService } from "./CreateCreditTransactionService";

export class CreateCreditTransactionController {
  async handle(request: Request, response: Response) {
    const { value } = request.body;
    const { id: userId } = request.params;

    if (isNaN(Number(value)) || Number(value) <= 0) {
      throw new AppError("Value is not valid", 400);
    }

    const type = TranscationType.CREDITO;
    const createCreditTransactionService = new CreateCreditTransactionService();
    const transaction = await createCreditTransactionService.execute({
      value: Number(value),
      userId,
      type,
    });
    return response.status(201).json({ transaction });
  }
}
