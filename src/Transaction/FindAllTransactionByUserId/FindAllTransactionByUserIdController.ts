import { Request, Response } from "express";
import { AppError } from "../../Errors/AppError";
import { FindAllTransactionByUserIdService } from "./FindAllTransactionByUserIdService";

export class FindAllTransactionByUserIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { skip, take } = request.query;

    if (isNaN(Number(skip)) || Number(skip) < 0) {
      throw new AppError("Skip param is not valid", 400);
    }

    if (isNaN(Number(take)) || Number(take) < 0) {
      throw new AppError("Take param is not valid", 400);
    }

    const findAllTransactionByUserIdService =
      new FindAllTransactionByUserIdService();
    const transactions = await findAllTransactionByUserIdService.execute({
      id,
      skip: Number(skip),
      take: Number(take),
    });
    return response.json({ transactions });
  }
}
