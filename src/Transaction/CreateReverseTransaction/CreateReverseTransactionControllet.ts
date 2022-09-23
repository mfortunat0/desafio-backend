import { TranscationType } from "@prisma/client";
import { Request, Response } from "express";
import { AppError } from "../../Errors/AppError";
import { CreateReverseTransactionService } from "./CreateReverseTransactionService";

export class CreateReverseTransactionController {
  async handle(request: Request, response: Response) {
    const { value } = request.body;
    const { id: userId } = request.params;

    if (isNaN(Number(value)) || Number(value) <= 0) {
      throw new AppError("Value is not valid", 400);
    }

    const type = TranscationType.ESTORNO;
    const createReverseTransactionService =
      new CreateReverseTransactionService();
    const transaction = await createReverseTransactionService.execute({
      value,
      userId,
      type,
    });
    return response.status(201).json({ transaction });
  }
}
