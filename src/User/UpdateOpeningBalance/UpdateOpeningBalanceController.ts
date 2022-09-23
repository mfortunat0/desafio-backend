import { Request, Response } from "express";
import { AppError } from "../../Errors/AppError";
import { UpdateOpeningBalanceService } from "./UpdateOpeningBalanceService";

export class UpdateOpeningBalanceController {
  handle(request: Request, response: Response) {
    console.log("asd");
    const { value } = request.body;

    if (Number(value) < 1) {
      throw new AppError("Value is not valid", 400);
    }

    const updateOpeningBalanceService = new UpdateOpeningBalanceService();
    updateOpeningBalanceService.execute({ value: Number(value) });
    response.status(204).json();
  }
}
