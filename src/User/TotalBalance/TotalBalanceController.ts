import { Request, Response } from "express";
import { TotalBalanceService } from "./TotalBalanceService";

export class TotalBalanceController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const totalBalanceService = new TotalBalanceService();
    const total = await totalBalanceService.execute({ id });
    return response.json({ total });
  }
}
