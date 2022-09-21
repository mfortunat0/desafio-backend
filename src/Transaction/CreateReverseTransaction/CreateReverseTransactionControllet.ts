import { TranscationType } from "@prisma/client";
import { Request, Response } from "express";
import { CreateReverseTransactionService } from "./CreateReverseTransactionService";

export class CreateReverseTransactionController {
  async handle(request: Request, response: Response) {
    const { value } = request.body;
    const { id: userId } = request.params;
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
