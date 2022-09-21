import { Request, Response } from "express";
import { ReportAllTransactionByUserIdService } from "./ReportAllTransactionByUserIdService";

export class ReportAllTransactionByUserIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const reportAllTransactionByIdService =
      new ReportAllTransactionByUserIdService();
    const transactions = await reportAllTransactionByIdService.execute(id);
    response.header("Content-Type", "text/csv");
    response.attachment("transactions");
    return response.send(transactions);
  }
}
