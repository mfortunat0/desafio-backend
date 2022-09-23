import { Request, Response } from "express";
import { ReportLastTransactionByUserIdService } from "./ReportLastTransactionByUserIdService";

export class ReportLastTransactionByUserIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const reportLastTransactionByIdService =
      new ReportLastTransactionByUserIdService();
    const { csv, total, user } = await reportLastTransactionByIdService.execute(
      {
        id,
      }
    );
    response.set({
      "content-Type": "text/csv",
      "Client-balance": total,
      "Client-id": user.id,
      "Client-name": user.name,
      "Client-email": user.email,
      "Client-birthday": user.birthday.toISOString(),
      "Client-created_at": user.created_at?.toISOString(),
      "Client-openingBalance": user.openingBalance,
    });
    response.attachment("transactions");
    return response.send(csv);
  }
}
